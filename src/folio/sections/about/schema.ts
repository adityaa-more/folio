import { z } from "zod";

export const aboutSchema = z.object({
  heading: z.string().default("About"),
  kicker: z.string().optional(),
  paragraphs: z.array(z.string().min(1)).min(1),
  image: z
    .object({ src: z.string().min(1), alt: z.string().min(1) })
    .optional(),
  stats: z
    .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
    .default([]),
  highlights: z.array(z.string()).default([]),
});

export type AboutContent = z.infer<typeof aboutSchema>;
