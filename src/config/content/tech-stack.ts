import type { TechStackContent } from "@/folio/modules/developer/sections/tech-stack/schema";

export const techStack: TechStackContent = {
  heading: "Stack",
  kicker: "Daily drivers",
  categories: [
    {
      label: "Frontend",
      items: [
        { name: "TypeScript", note: "8 yrs" },
        { name: "Next.js / React", note: "7 yrs" },
        { name: "Tailwind CSS", note: "5 yrs" },
        { name: "Motion", note: "4 yrs" },
      ],
    },
    {
      label: "Backend & Data",
      items: [
        { name: "Node.js", note: "8 yrs" },
        { name: "PostgreSQL", note: "6 yrs" },
        { name: "Redis", note: "4 yrs" },
        { name: "Go", note: "learning" },
      ],
    },
    {
      label: "Tooling",
      items: [
        { name: "pnpm workspaces" },
        { name: "GitHub Actions" },
        { name: "Playwright" },
        { name: "Vercel" },
      ],
    },
  ],
};
