import { defineSection } from "@/folio/core/define";
import { techStackSchema, type TechStackContent } from "./schema";
import { TechStackGrid } from "./variants/grid";

export const techStackSection = defineSection<TechStackContent>({
  id: "tech-stack",
  name: "Tech Stack",
  description: "Categorized tools with tenure notes.",
  category: "developer",
  navLabel: "Stack",
  schema: techStackSchema,
  variants: {
    grid: TechStackGrid,
  },
  defaultVariant: "grid",
  defaultMotion: "stagger-grid",
});
