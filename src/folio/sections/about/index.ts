import { defineSection } from "@/folio/core/define";
import { aboutSchema, type AboutContent } from "./schema";
import { AboutProse } from "./variants/prose";
import { AboutSideBySide } from "./variants/side-by-side";
import { AboutStatsInline } from "./variants/stats-inline";

export const aboutSection = defineSection<AboutContent>({
  id: "about",
  name: "About",
  description: "Who you are: paragraphs, portrait, stats, highlights.",
  category: "core",
  navLabel: "About",
  schema: aboutSchema,
  variants: {
    prose: AboutProse,
    "side-by-side": AboutSideBySide,
    "stats-inline": AboutStatsInline,
  },
  defaultVariant: "prose",
  defaultMotion: "fade-up",
});
