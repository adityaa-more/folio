import { z } from "zod";

export const visualCaseStudySchema = z.object({
  heading: z.string().default("Selected Work"),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        image: z.object({
          src: z.string().min(1),
          alt: z.string().min(1),
        }),
        tags: z.array(z.string()).default([]),
        link: z.string().optional(),
        year: z.string().optional(),
      }),
    )
    .min(1),
});

export type VisualCaseStudyContent = z.infer<typeof visualCaseStudySchema>;
