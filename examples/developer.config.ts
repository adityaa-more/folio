import { defineConfig } from "@/folio/core/define";

/**
 * Example: full-stack developer on the terminal theme.
 * Copy over src/config/site.config.ts (and fill src/config/content) to use.
 */
export default defineConfig({
  profile: {
    name: "Your Name",
    profession: "Full-Stack Developer",
    tagline: "Ship fast. Break nothing.",
    email: "you@example.com",
    socials: {
      github: "https://github.com/you",
      linkedin: "https://linkedin.com/in/you",
    },
  },

  theme: "terminal",
  mode: "dark",

  colors: {
    // phosphor amber instead of stock green
    primary: "#e8a33d",
  },

  modules: ["developer"],

  sections: [
    { id: "hero", variant: "split", motion: "fade-up" },
    { id: "github-stats" },
    { id: "projects", variant: "grid", motion: "stagger-grid" },
    { id: "tech-stack" },
    { id: "code-showcase" },
    { id: "experience", variant: "compact-list" },
    { id: "contact", variant: "split" },
  ],

  motion: {
    intensity: "normal",
  },
});
