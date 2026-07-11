import type { ProjectsContent } from "@/folio/sections/projects/schema";

export const projects: ProjectsContent = {
  heading: "Selected Work",
  subheading: "A few things built with care.",
  items: [
    {
      title: "Ledgerline",
      description:
        "Real-time expense platform for finance teams — event-sourced ledger, sub-second reporting across two million transactions.",
      tags: ["Next.js", "PostgreSQL", "tRPC"],
      link: "https://example.com/ledgerline",
      year: "2026",
      featured: true,
    },
    {
      title: "Corelane CMS",
      description:
        "Headless CMS with visual block editing and instant preview, powering forty client sites from one deployment.",
      tags: ["TypeScript", "GraphQL", "Redis"],
      link: "https://example.com/corelane",
      year: "2025",
      featured: false,
    },
    {
      title: "Shipmate CLI",
      description:
        "Open-source release automation — changelog generation, semver bumps, and registry publishing in one command.",
      tags: ["Node.js", "Open Source"],
      repo: "https://github.com/example/shipmate",
      year: "2025",
      featured: false,
    },
    {
      title: "Atlas Docs",
      description:
        "Documentation engine with full-text search and versioned content, serving 300k monthly readers.",
      tags: ["Next.js", "MDX", "Algolia"],
      link: "https://example.com/atlas",
      year: "2024",
      featured: false,
    },
  ],
};
