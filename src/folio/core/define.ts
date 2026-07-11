import type { z } from "zod";
import type {
  FolioPlugin,
  MotionPreset,
  SectionDefinition,
  SiteConfig,
  ThemeDefinition,
} from "./types";
import { formatConfigError, siteConfigSchema } from "./schema";

/**
 * define* helpers: identity functions that give authors full type inference
 * plus cheap invariant checks that fail at module-eval time (= build time)
 * instead of at render time.
 */

export function defineSection<TContent>(
  def: SectionDefinition<TContent>,
): SectionDefinition<TContent> {
  if (!def.variants[def.defaultVariant]) {
    throw new Error(
      `[folio] Section "${def.id}": defaultVariant "${def.defaultVariant}" is not in variants (${Object.keys(def.variants).join(", ")}).`,
    );
  }
  return def;
}

export function defineTheme(def: ThemeDefinition): ThemeDefinition {
  return def;
}

export function definePreset(preset: MotionPreset): MotionPreset {
  return preset;
}

export function definePlugin(plugin: FolioPlugin): FolioPlugin {
  return plugin;
}

export function defineConfig(config: SiteConfig): SiteConfig {
  const result = siteConfigSchema.safeParse(config);
  if (!result.success) {
    throw new Error(formatConfigError(result.error, "site.config.ts"));
  }
  return config;
}

/** Validates one section's content against its schema with a pointed error. */
export function parseSectionContent<TContent>(
  sectionId: string,
  contentKey: string,
  schema: z.ZodType<TContent>,
  raw: unknown,
): TContent {
  if (raw === undefined) {
    throw new Error(
      `[folio] Section "${sectionId}" expects content under key "${contentKey}" in src/config/content, but none was found.`,
    );
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    const lines = result.error.issues.map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      return `  • ${contentKey}.${path} — ${issue.message}`;
    });
    throw new Error(
      `[folio] Section "${sectionId}" content invalid:\n${lines.join("\n")}`,
    );
  }
  return result.data;
}
