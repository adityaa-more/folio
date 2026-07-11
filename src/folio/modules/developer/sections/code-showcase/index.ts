import { defineSection } from "@/folio/core/define";
import { codeShowcaseSchema, type CodeShowcaseContent } from "./schema";
import { CodeShowcaseStacked } from "./variants/stacked";

export const codeShowcaseSection = defineSection<CodeShowcaseContent>({
  id: "code-showcase",
  name: "Code Showcase",
  description: "Snippets in editor chrome — the code you're proud of.",
  category: "developer",
  schema: codeShowcaseSchema,
  variants: {
    stacked: CodeShowcaseStacked,
  },
  defaultVariant: "stacked",
  defaultMotion: "fade-up",
});
