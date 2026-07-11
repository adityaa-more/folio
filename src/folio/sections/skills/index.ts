import { defineSection } from "@/folio/core/define";
import { skillsSchema, type SkillsContent } from "./schema";
import { SkillsGroupedBadges } from "./variants/grouped-badges";
import { SkillsBars } from "./variants/bars";
import { SkillsMarquee } from "./variants/marquee";

export const skillsSection = defineSection<SkillsContent>({
  id: "skills",
  name: "Skills",
  description: "Grouped capabilities: badges, level bars, or a marquee.",
  category: "core",
  navLabel: "Skills",
  schema: skillsSchema,
  variants: {
    "grouped-badges": SkillsGroupedBadges,
    bars: SkillsBars,
    marquee: SkillsMarquee,
  },
  defaultVariant: "grouped-badges",
  defaultMotion: "fade-up",
});
