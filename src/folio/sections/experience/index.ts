import { defineSection } from "@/folio/core/define";
import { experienceSchema, type ExperienceContent } from "./schema";
import { ExperienceTimeline } from "./variants/timeline";
import { ExperienceCards } from "./variants/cards";
import { ExperienceCompactList } from "./variants/compact-list";

export const experienceSection = defineSection<ExperienceContent>({
  id: "experience",
  name: "Experience",
  description: "Roles and tenure: timeline, cards, or compact rows.",
  category: "core",
  navLabel: "Experience",
  schema: experienceSchema,
  variants: {
    timeline: ExperienceTimeline,
    cards: ExperienceCards,
    "compact-list": ExperienceCompactList,
  },
  defaultVariant: "timeline",
  defaultMotion: "fade-up",
});
