import type { ExperienceContent } from "@/folio/sections/experience/schema";

export const experience: ExperienceContent = {
  heading: "Experience",
  kicker: "Where I've been",
  items: [
    {
      role: "Lead Engineer",
      company: "Ledgerline",
      start: "2024",
      location: "Remote",
      summary:
        "Own the reporting platform: event-sourced ledger, projection pipeline, and the dashboard that reads from it.",
      highlights: [
        "Took month-end P&L rollups from 40 minutes to 0.8 seconds",
        "Grew the platform team from 2 to 7 engineers",
      ],
    },
    {
      role: "Architect & Frontend Lead",
      company: "Corelane",
      start: "2021",
      end: "2024",
      location: "Lisbon",
      summary:
        "Designed the block registry that let one CMS deployment power forty client sites without forks.",
      highlights: [
        "61 typed blocks in production, zero forks in 18 months",
        "Cut new-site setup from 3 weeks to 2 days",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Brightfold Studio",
      start: "2018",
      end: "2021",
      location: "Porto",
      summary:
        "Client work across fintech and e-commerce: React frontends, Node services, and the deployment glue between them.",
      highlights: [],
    },
  ],
};
