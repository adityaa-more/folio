import { z } from "zod";

export const caseStudiesSchema = z.object({
  heading: z.string().default("Case Studies"),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        /** Links to /case-studies/<slug> (MDX page). */
        slug: z.string().min(1),
        client: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()).default([]),
        cover: z.string().optional(),
      }),
    )
    .min(1, "case-studies needs at least one item"),
});

export type CaseStudiesContent = z.infer<typeof caseStudiesSchema>;
