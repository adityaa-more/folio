import { definePlugin } from "@/folio/core/define";
import type { SectionDefinition } from "@/folio/core/types";
import { visualCaseStudySection } from "./sections/visual-case-study";

/**
 * Designer profession module. Activate with `modules: ["designer"]`.
 * Pairs with the core gallery section (masonry/filmstrip) for image grids.
 */
export const designerModule = definePlugin({
  name: "designer",
  sections: [visualCaseStudySection] as SectionDefinition[],
});
