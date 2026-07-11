import { defineSection } from "@/folio/core/define";
import { bentoSchema, type BentoContent } from "./schema";
import { BentoMixedTiles } from "./variants/mixed-tiles";

export const bentoSection = defineSection<BentoContent>({
  id: "bento",
  name: "Bento Grid",
  description: "Mixed tile grid: text, links, stats, images in one mosaic.",
  category: "core",
  schema: bentoSchema,
  variants: {
    "mixed-tiles": BentoMixedTiles,
  },
  defaultVariant: "mixed-tiles",
  defaultMotion: "stagger-grid",
});
