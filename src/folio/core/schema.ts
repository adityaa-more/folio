import { z } from "zod";

/**
 * Build-time validation for site.config.ts. Section/theme/preset ids are
 * validated against the merged registries in the renderer (plugins can add
 * ids, so the schema can't know the full set).
 */

export const profileSchema = z.object({
  name: z.string().min(1, "profile.name is required"),
  profession: z.string().min(1, "profile.profession is required"),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  avatar: z.string().optional(),
  socials: z.record(z.string(), z.string().url()).optional(),
});

export const sectionConfigSchema = z.object({
  id: z.string().min(1),
  enabled: z.boolean().optional(),
  variant: z.string().optional(),
  motion: z.string().optional(),
  content: z.string().optional(),
});

const colorTokenOverridesSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tertiary: z.string().optional(),
  background: z.string().optional(),
  foreground: z.string().optional(),
  muted: z.string().optional(),
  border: z.string().optional(),
  card: z.string().optional(),
});

export const colorOverridesSchema = colorTokenOverridesSchema.extend({
  light: colorTokenOverridesSchema.optional(),
  dark: colorTokenOverridesSchema.optional(),
});

export const siteConfigSchema = z.object({
  profile: profileSchema,
  theme: z.string().min(1),
  mode: z.enum(["dark", "light", "system"]),
  colors: colorOverridesSchema.optional(),
  sections: z
    .array(sectionConfigSchema)
    .min(1, "sections must contain at least one section"),
  motion: z.object({
    intensity: z.enum(["off", "subtle", "normal", "expressive"]),
    respectReducedMotion: z.boolean().optional(),
  }),
  modules: z.array(z.string()).optional(),
  // FolioPlugin objects contain components/functions — not zod-validatable.
  plugins: z.array(z.unknown()).optional(),
});

/** Formats a ZodError into a pointed, human-readable build error. */
export function formatConfigError(error: z.ZodError, source: string): string {
  const lines = error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(".") : "(root)";
    return `  • ${path} — ${issue.message}`;
  });
  return `[folio] Invalid ${source}:\n${lines.join("\n")}`;
}
