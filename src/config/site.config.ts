import { defineConfig } from "@/folio/core/define";

/**
 * Your entire site, from one file.
 * - Reorder `sections` to rearrange the page.
 * - `enabled: false` hides a section without deleting its config.
 * - Swap `theme` to restyle everything at once.
 * - `colors` recolors any theme without touching theme code.
 */
export default defineConfig({
  profile: {
    name: "Jordan Vale",
    profession: "Full-Stack Developer",
    tagline: "Software that feels effortless.",
    location: "Lisbon, Portugal",
    email: "jordan@example.dev",
    socials: {
      github: "https://github.com/jordanvale",
      linkedin: "https://linkedin.com/in/jordanvale",
    },
  },

  theme: "editorial",
  mode: "system",

  /**
   * Make any theme yours — every value optional, any CSS color works.
   * Tokens: primary (main accent), secondary, tertiary, background,
   * foreground, muted, border, card. Top-level = both modes;
   * light: {…} / dark: {…} refine one mode. Delete this block to get the
   * theme's stock palette back.
   */


  // Profession modules — each adds specialized sections to the registry.
  modules: ["developer"],

  sections: [
    { id: "hero", variant: "centered" },
    { id: "about", variant: "stats-inline" },
    { id: "projects", variant: "list" },
    { id: "case-studies" },
    { id: "github-stats" },
    { id: "tech-stack" },
    { id: "code-showcase", enabled: false },
    { id: "experience", variant: "timeline" },
    { id: "skills", variant: "grouped-badges", enabled: false },
    { id: "metrics", variant: "counters-row" },
    { id: "testimonials", variant: "single-featured" },
    { id: "bento", enabled: false },
    { id: "gallery", enabled: false },
    { id: "faq", variant: "accordion" },
    { id: "contact", variant: "minimal-links" },
  ],

  motion: {
    intensity: "normal",
    // Dev preview: play full motion even though this device has OS Reduced
    // Motion enabled. Set back to true (or remove) before deploying.
    respectReducedMotion: false,
  },
});
