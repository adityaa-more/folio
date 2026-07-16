import { defineConfig } from "@/folio/core/define";

/**
 * Example: photographer on the luxury-minimal theme — image-led, slow motion,
 * gallery front and center. Uses core sections only (the photographer module
 * is spec'd in src/folio/modules/_stubs/photographer — contributions welcome).
 * Copy over src/config/site.config.ts (and fill src/config/content) to use.
 */
export default defineConfig({
  profile: {
    name: "Your Name",
    profession: "Photographer",
    tagline: "Light, patience, and the decisive half-second.",
    email: "you@example.com",
    socials: {
      instagram: "https://instagram.com/you",
      behance: "https://behance.net/you",
    },
  },

  theme: "luxury-minimal",
  mode: "dark",

  colors: {
    primary: "#d4a373",
  },

  sections: [
    { id: "hero", variant: "fullscreen", motion: "cinematic-reveal" },
    { id: "gallery", variant: "masonry", motion: "stagger-grid" },
    { id: "about", variant: "prose" },
    { id: "projects", variant: "list" }, // commissions / exhibitions
    { id: "testimonials", variant: "single-featured" },
    { id: "contact", variant: "minimal-links" },
  ],

  motion: {
    intensity: "expressive",
  },
});
