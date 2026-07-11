import { z } from "zod";

export const codeShowcaseSchema = z.object({
  heading: z.string().default("Code"),
  kicker: z.string().optional(),
  snippets: z
    .array(
      z.object({
        title: z.string().min(1),
        language: z.string().min(1),
        description: z.string().optional(),
        code: z.string().min(1),
      }),
    )
    .min(1),
});

export type CodeShowcaseContent = z.infer<typeof codeShowcaseSchema>;
