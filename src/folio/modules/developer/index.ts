import { definePlugin } from "@/folio/core/define";
import type { SectionDefinition } from "@/folio/core/types";
import { githubStatsSection } from "./sections/github-stats";
import { techStackSection } from "./sections/tech-stack";
import { codeShowcaseSection } from "./sections/code-showcase";

/**
 * Developer profession module. Activate with `modules: ["developer"]` —
 * adds github-stats, tech-stack, and code-showcase to the section registry.
 */
export const developerModule = definePlugin({
  name: "developer",
  sections: [
    githubStatsSection,
    techStackSection,
    codeShowcaseSection,
  ] as SectionDefinition[],
});
