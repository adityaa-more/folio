import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { siteConfigSchema, formatConfigError } from "@/folio/core/schema";
import {
  payloadToConfig,
  serializeConfig,
} from "@/folio/builder/serialize-config";
import { buildRegistries } from "@/folio/core/renderer";
import type { BuilderSavePayload } from "@/folio/builder/types";
import type { SiteConfig } from "@/folio/core/types";

const CONFIG_PATH = path.join(process.cwd(), "src", "config", "site.config.ts");

/** Dev-only: writes the builder's state back to src/config/site.config.ts. */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
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

  // Cross-check ids against merged registries — same guarantees the renderer gives.
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
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 422 },
    );
  }

  fs.writeFileSync(CONFIG_PATH, serializeConfig(payload), "utf8");
  return NextResponse.json({ ok: true });
}
