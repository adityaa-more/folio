import { z } from "zod";

export const metricsSchema = z.object({
  heading: z.string().optional(),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        /** Numeric part, animated by the counters-row variant. */
        value: z.number(),
        /** Appended verbatim: "+", "%", "k", "yrs"… */
        suffix: z.string().optional(),
        label: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .min(1, "metrics needs at least one item"),
});

export type MetricsContent = z.infer<typeof metricsSchema>;
