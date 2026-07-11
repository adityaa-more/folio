import { z } from "zod";

export const projectsSchema = z.object({
  heading: z.string().default("Selected Work"),
  subheading: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        tags: z.array(z.string()).default([]),
        link: z.string().url().optional(),
        repo: z.string().url().optional(),
        year: z.string().optional(),
        featured: z.boolean().default(false),
      }),
    )
    .min(1, "projects needs at least one item"),
});

export type ProjectsContent = z.infer<typeof projectsSchema>;
