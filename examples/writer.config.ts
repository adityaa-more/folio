import { defineConfig } from "@/folio/core/define";

/**
 * Example: writer / journalist on the editorial theme — type-led, ruled
 * layouts, long-form case studies as clips. Uses core sections only (the
 * writer module is spec'd in src/folio/modules/_stubs/writer).
 * Copy over src/config/site.config.ts (and fill src/config/content) to use.
 */
export default defineConfig({
  profile: {
    name: "Your Name",
    profession: "Writer & Editor",
    tagline: "Clear sentences about complicated things.",
    email: "you@example.com",
    socials: {
      twitter: "https://twitter.com/you",
      substack: "https://you.substack.com",
    },
  },

  theme: "editorial",
  mode: "light",

  sections: [
    { id: "hero", variant: "centered", motion: "blur-reveal" },
    { id: "case-studies" }, // long-form pieces from content/case-studies/*.mdx
    { id: "about", variant: "prose" },
    { id: "experience", variant: "compact-list" },
    { id: "testimonials", variant: "single-featured" },
    { id: "faq", variant: "two-column" },
    { id: "contact", variant: "minimal-links" },
  ],

  motion: {
    intensity: "subtle",
  },
});
