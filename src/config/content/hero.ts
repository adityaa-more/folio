import type { HeroContent } from "@/folio/sections/hero/schema";

export const hero: HeroContent = {
  headline: "Software that feels effortless.",
  subheadline:
    "Full-stack developer crafting fast, humane web products — from database schema to the last easing curve.",
  availability: "Available for select projects",
  actions: [
    { label: "View work", href: "#projects", variant: "primary" },
    { label: "Get in touch", href: "#contact", variant: "ghost" },
  ],
};
