import { defineConfig } from "@/folio/core/define";

/**
 * Example: startup founder on the bento theme — dense tile grid, traction
 * metrics up top, ventures as projects. Uses core sections only (the founder
 * module is spec'd in src/folio/modules/_stubs/founder).
 * Copy over src/config/site.config.ts (and fill src/config/content) to use.
 */
export default defineConfig({
  profile: {
    name: "Your Name",
    profession: "Founder",
    tagline: "Building the boring infrastructure everyone depends on.",
    email: "you@example.com",
    socials: {
      linkedin: "https://linkedin.com/in/you",
      twitter: "https://twitter.com/you",
    },
  },

  theme: "bento",
  mode: "system",

  colors: {
    primary: "#f59e0b",
    dark: { primary: "#fbbf24" },
  },

  sections: [
    { id: "hero", variant: "split", motion: "rise" },
    { id: "metrics", variant: "counters-row" },
    { id: "bento", motion: "stagger-grid" },
    { id: "projects", variant: "grid", motion: "floating-cards" },
    { id: "experience", variant: "timeline" },
    { id: "testimonials", variant: "scroller" },
    { id: "faq", variant: "accordion" },
    { id: "contact", variant: "split" },
  ],

  motion: {
    intensity: "normal",
  },
});
