import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { siteConfigSchema, formatConfigError } from "@/folio/core/schema";
import {
  payloadToConfig,
  serializeConfig,
} from "@/folio/builder/serialize-config";
import {
  DERIVED_CONTENT_KEYS,
  serializeContentFile,
  serializeContentIndex,
} from "@/folio/builder/serialize-content";
import { parseSectionContent } from "@/folio/core/define";
import { buildRegistries } from "@/folio/core/renderer";
import type { BuilderSavePayload } from "@/folio/builder/types";
import type { SiteConfig } from "@/folio/core/types";

const CONFIG_PATH = path.join(process.cwd(), "src", "config", "site.config.ts");
const CONTENT_DIR = path.join(process.cwd(), "src", "config", "content");

/**
 * Dev-only: writes builder state back to disk —
 * site.config.ts + one file per edited content key + regenerated content
 * index. Everything validates before anything is written.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    // Stays off even in FOLIO_DEMO deployments — saving writes to the repo's
    // source files, which only makes sense on a local checkout.
    return NextResponse.json(
      {
        error:
          "Saving is disabled on this demo — clone the repo and run `pnpm dev` to build your own.",
      },
      { status: 403 },
    );
  }

  let payload: BuilderSavePayload;
  try {
    payload = (await request.json()) as BuilderSavePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const config = payloadToConfig(payload);

  const parsed = siteConfigSchema.safeParse(config);
  if (!parsed.success) {
    return NextResponse.json(
      { error: formatConfigError(parsed.error, "builder state") },
      { status: 422 },
    );
  }

  const content = payload.content ?? {};
  const dirtyKeys = (payload.dirtyContent ?? []).filter(
    (key) => !DERIVED_CONTENT_KEYS.has(key),
  );

  // Cross-check ids + validate all touched content — same guarantees the
  // renderer gives at build time. Nothing is written until all checks pass.
  try {
    const { sections, themes, presets } = buildRegistries(config as SiteConfig);
    themes.get(config.theme);
    for (const entry of config.sections) {
      const def = sections.get(entry.id);
      if (entry.variant && !def.variants[entry.variant]) {
        throw new Error(
          `[folio] Section "${entry.id}" has no variant "${entry.variant}".`,
        );
      }
      if (entry.motion) presets.get(entry.motion);
      const contentKey = entry.content ?? entry.id;
      if (!DERIVED_CONTENT_KEYS.has(contentKey)) {
        parseSectionContent(def.id, contentKey, def.schema, content[contentKey]);
      }
    }
    for (const key of dirtyKeys) {
      if (sections.has(key)) {
        const def = sections.get(key);
        parseSectionContent(def.id, key, def.schema, content[key]);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 422 },
    );
  }

  fs.writeFileSync(CONFIG_PATH, serializeConfig(payload), "utf8");
  for (const key of dirtyKeys) {
    fs.writeFileSync(
      path.join(CONTENT_DIR, `${key}.ts`),
      serializeContentFile(key, content[key]),
      "utf8",
    );
  }
  if (dirtyKeys.length > 0) {
    fs.writeFileSync(
      path.join(CONTENT_DIR, "index.ts"),
      serializeContentIndex(Object.keys(content)),
      "utf8",
    );
  }

  return NextResponse.json({ ok: true, wroteContentFiles: dirtyKeys });
}
