import { z } from "zod";

export const testimonialsSchema = z.object({
  heading: z.string().default("Kind words"),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        author: z.string().min(1),
        role: z.string().optional(),
        company: z.string().optional(),
        avatar: z.string().optional(),
      }),
    )
    .min(1, "testimonials needs at least one item"),
});

export type TestimonialsContent = z.infer<typeof testimonialsSchema>;
