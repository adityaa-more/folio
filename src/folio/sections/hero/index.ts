import { defineSection } from "@/folio/core/define";
import { heroSchema, type HeroContent } from "./schema";
import { HeroCentered } from "./variants/centered";
import { HeroSplit } from "./variants/split";
import { HeroFullscreen } from "./variants/fullscreen";

export const heroSection = defineSection<HeroContent>({
  id: "hero",
  name: "Hero",
  description: "Opening statement: headline, intro, availability, actions.",
  category: "core",
  schema: heroSchema,
  variants: {
    centered: HeroCentered,
    split: HeroSplit,
    fullscreen: HeroFullscreen,
  },
  defaultVariant: "centered",
  defaultMotion: "fade-up",
});
