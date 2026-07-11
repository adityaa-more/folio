import { z } from "zod";

export const skillsSchema = z.object({
  heading: z.string().default("Skills"),
  kicker: z.string().optional(),
  groups: z
    .array(
      z.object({
        label: z.string().min(1),
        items: z
          .array(
            z.object({
              name: z.string().min(1),
              /** 1–5, used by the bars variant. */
              level: z.number().int().min(1).max(5).optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1, "skills needs at least one group"),
});

export type SkillsContent = z.infer<typeof skillsSchema>;
