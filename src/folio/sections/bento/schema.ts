import { z } from "zod";

const baseTile = {
  /** Grid footprint: sm = 1×1, wide = 2×1, tall = 1×2, lg = 2×2. */
  size: z.enum(["sm", "wide", "tall", "lg"]).default("sm"),
};

export const bentoSchema = z.object({
  heading: z.string().optional(),
  kicker: z.string().optional(),
  tiles: z
    .array(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("text"),
          title: z.string().min(1),
          text: z.string().optional(),
          ...baseTile,
        }),
        z.object({
          type: z.literal("link"),
          title: z.string().min(1),
          text: z.string().optional(),
          href: z.string().min(1),
          ...baseTile,
        }),
        z.object({
          type: z.literal("stat"),
          value: z.string().min(1),
          label: z.string().min(1),
          ...baseTile,
        }),
        z.object({
          type: z.literal("image"),
          src: z.string().min(1),
          alt: z.string().min(1),
          ...baseTile,
        }),
      ]),
    )
    .min(1, "bento needs at least one tile"),
});

export type BentoContent = z.infer<typeof bentoSchema>;
