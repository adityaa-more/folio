import { z } from "zod";

export const githubStatsSchema = z.object({
  heading: z.string().default("GitHub"),
  kicker: z.string().optional(),
  username: z.string().min(1),
  stats: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      }),
    )
    .min(1),
  /** Top languages with percentage 0–100 (renders a distribution bar). */
  languages: z
    .array(
      z.object({
        name: z.string().min(1),
        percent: z.number().min(0).max(100),
      }),
    )
    .default([]),
  pinned: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        stars: z.string().optional(),
        url: z.string().url(),
      }),
    )
    .default([]),
});

export type GithubStatsContent = z.infer<typeof githubStatsSchema>;
