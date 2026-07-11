import { z } from "zod";

export const experienceSchema = z.object({
  heading: z.string().default("Experience"),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        role: z.string().min(1),
        company: z.string().min(1),
        start: z.string().min(1),
        end: z.string().optional(),
        location: z.string().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).default([]),
      }),
    )
    .min(1, "experience needs at least one item"),
});

export type ExperienceContent = z.infer<typeof experienceSchema>;
