import { defineSection } from "@/folio/core/define";
import { projectsSchema, type ProjectsContent } from "./schema";
import { ProjectsGrid } from "./variants/grid";
import { ProjectsList } from "./variants/list";

export const projectsSection = defineSection<ProjectsContent>({
  id: "projects",
  name: "Projects",
  description: "Selected work: title, description, tags, links.",
  category: "core",
  navLabel: "Work",
  schema: projectsSchema,
  variants: {
    grid: ProjectsGrid,
    list: ProjectsList,
  },
  defaultVariant: "grid",
  defaultMotion: "stagger-grid",
});
