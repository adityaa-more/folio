import { z } from "zod";

export const techStackSchema = z.object({
  heading: z.string().default("Stack"),
  kicker: z.string().optional(),
  categories: z
    .array(
      z.object({
        label: z.string().min(1),
        items: z
          .array(
            z.object({
              name: z.string().min(1),
              /** Short qualifier: "daily driver", "5 yrs", "learning"… */
              note: z.string().optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

export type TechStackContent = z.infer<typeof techStackSchema>;
