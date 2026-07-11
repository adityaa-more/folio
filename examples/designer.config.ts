import { defineConfig } from "@/folio/core/define";

/**
 * Example: product designer on the editorial theme.
 * Copy over src/config/site.config.ts (and fill src/config/content) to use.
 */
export default defineConfig({
  profile: {
    name: "Your Name",
    profession: "Product Designer",
    tagline: "Interfaces people don't have to think about.",
    email: "you@example.com",
    socials: {
      dribbble: "https://dribbble.com/you",
      linkedin: "https://linkedin.com/in/you",
    },
  },

  theme: "editorial",
  mode: "system",

  colors: {
    primary: "#4338ca",
    dark: { primary: "#a5b4fc" },
  },

  modules: ["designer"],

  sections: [
    { id: "hero", variant: "fullscreen", motion: "cinematic-reveal" },
    { id: "visual-case-study", motion: "floating-cards" },
    { id: "gallery", variant: "masonry" },
    { id: "about", variant: "side-by-side" },
    { id: "testimonials", variant: "single-featured" },
    { id: "contact", variant: "minimal-links" },
  ],

  motion: {
    intensity: "expressive",
  },
});
