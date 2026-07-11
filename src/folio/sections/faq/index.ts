import { defineSection } from "@/folio/core/define";
import { faqSchema, type FaqContent } from "./schema";
import { FaqAccordion } from "./variants/accordion";
import { FaqTwoColumn } from "./variants/two-column";

export const faqSection = defineSection<FaqContent>({
  id: "faq",
  name: "FAQ",
  description: "Common questions — native-details accordion or two columns.",
  category: "core",
  schema: faqSchema,
  variants: {
    accordion: FaqAccordion,
    "two-column": FaqTwoColumn,
  },
  defaultVariant: "accordion",
  defaultMotion: "fade-up",
});
