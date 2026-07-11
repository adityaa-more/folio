import type { AboutContent } from "@/folio/sections/about/schema";

export const about: AboutContent = {
  heading: "About",
  kicker: "The short version",
  paragraphs: [
    "I'm a full-stack developer who cares as much about the last easing curve as the database schema behind it.",
    "Over eight years I've shipped finance platforms, CMS tooling, and open-source libraries — always chasing the same thing: software that feels effortless to the person using it. I work across the stack, but my home turf is the seam where design systems meet data.",
    "Away from the keyboard: film photography, long walks along the Lisbon waterfront, and an ever-growing stack of half-read architecture books.",
  ],
  stats: [
    { value: "8+", label: "Years shipping" },
    { value: "40", label: "Sites on one platform" },
    { value: "61", label: "Blocks in production" },
  ],
  highlights: [
    "Design-system-driven frontend architecture",
    "Event-sourced backends on PostgreSQL",
    "Open-source maintainer, 4k+ GitHub stars",
    "Mentored 12 engineers to senior",
  ],
};
