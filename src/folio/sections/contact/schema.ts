import { z } from "zod";

export const contactSchema = z.object({
  heading: z.string().default("Get in touch"),
  text: z.string().optional(),
  email: z.string().email(),
  /** e.g. "Currently booking for Q4 2026" */
  note: z.string().optional(),
  socials: z.record(z.string(), z.string().url()).optional(),
});

export type ContactContent = z.infer<typeof contactSchema>;
