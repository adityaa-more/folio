import { z } from "zod";

export const heroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  intro: z.string().optional(),
  /** e.g. "Available for freelance — Q3 2026" */
  availability: z.string().optional(),
  actions: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().min(1),
        variant: z.enum(["primary", "ghost"]).default("primary"),
      }),
    )
    .default([]),
  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
    })
    .optional(),
});

export type HeroContent = z.infer<typeof heroSchema>;
