import { defineSection } from "@/folio/core/define";
import { caseStudiesSchema, type CaseStudiesContent } from "./schema";
import { CaseStudiesCardsList } from "./variants/cards-list";

export const caseStudiesSection = defineSection<CaseStudiesContent>({
  id: "case-studies",
  name: "Case Studies",
  description: "Index of long-form MDX case studies with links to full pages.",
  category: "core",
  navLabel: "Case Studies",
  schema: caseStudiesSchema,
  variants: {
    "cards-list": CaseStudiesCardsList,
  },
  defaultVariant: "cards-list",
  defaultMotion: "fade-up",
});
