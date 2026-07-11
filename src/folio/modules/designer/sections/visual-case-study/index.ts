import { defineSection } from "@/folio/core/define";
import { visualCaseStudySchema, type VisualCaseStudyContent } from "./schema";
import { VisualCaseStudyAlternating } from "./variants/alternating";

export const visualCaseStudySection = defineSection<VisualCaseStudyContent>({
  id: "visual-case-study",
  name: "Visual Case Study",
  description: "Image-led project spreads with alternating layout.",
  category: "designer",
  navLabel: "Work",
  schema: visualCaseStudySchema,
  variants: {
    alternating: VisualCaseStudyAlternating,
  },
  defaultVariant: "alternating",
  defaultMotion: "floating-cards",
});
