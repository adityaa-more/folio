import { z } from "zod";

export const faqSchema = z.object({
  heading: z.string().default("FAQ"),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      }),
    )
    .min(1, "faq needs at least one item"),
});

export type FaqContent = z.infer<typeof faqSchema>;
