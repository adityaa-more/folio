import type { SkillsContent } from "@/folio/sections/skills/schema";

export const skills: SkillsContent = {
  heading: "Skills",
  kicker: "Tools of choice",
  groups: [
    {
      label: "Frontend",
      items: [
        { name: "TypeScript", level: 5 },
        { name: "React / Next.js", level: 5 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Motion / animation", level: 4 },
      ],
    },
    {
      label: "Backend",
      items: [
        { name: "Node.js", level: 5 },
        { name: "PostgreSQL", level: 4 },
        { name: "GraphQL / tRPC", level: 4 },
        { name: "Redis", level: 3 },
      ],
    },
    {
      label: "Practice",
      items: [
        { name: "Design systems", level: 5 },
        { name: "Event sourcing", level: 4 },
        { name: "CI/CD & DX tooling", level: 4 },
        { name: "Technical writing", level: 4 },
      ],
    },
  ],
};
