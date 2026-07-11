import { defineTheme } from "@/folio/core/define";
import { luxuryFontClassName } from "./fonts";
import { luxurySkins } from "./skins";

/**
 * luxury-minimal — serif display, huge whitespace, hairline rules.
 * Motion language: slow blur-reveals with long easing; hover = opacity only.
 * tokens.css is imported via app/globals.css (token sheets are scoped by
 * [data-theme], so coexisting sheets stay inert).
 */
export const luxuryMinimal = defineTheme({
  id: "luxury-minimal",
  name: "Luxury Minimal",
  description:
    "Serif display, generous whitespace, hairline rules, unhurried blur-reveal motion.",
  fontClassName: luxuryFontClassName,
  skins: luxurySkins,
  motionLanguage: {
    sectionEnter: "blur-reveal",
    stagger: 0.12,
    hover: "none",
    easing: [0.22, 1, 0.36, 1],
    durationScale: 1.25,
  },
  layout: {
    density: "airy",
    nav: "floating",
  },
});
