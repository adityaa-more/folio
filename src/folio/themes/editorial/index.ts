import { defineTheme } from "@/folio/core/define";
import { editorialFontClassName } from "./fonts";
import { editorialSkins } from "./skins";

/**
 * editorial — magazine front page: oversized serif headlines, thick rules,
 * numbered sections, editorial-red accent. Motion language: measured
 * fade-ups, nothing that would fight the typography.
 */
export const editorial = defineTheme({
  id: "editorial",
  name: "Editorial",
  description:
    "Magazine-grade layout: display serif, thick rules, numbered spreads.",
  fontClassName: editorialFontClassName,
  skins: editorialSkins,
  motionLanguage: {
    sectionEnter: "fade-up",
    stagger: 0.09,
    hover: "invert",
    easing: [0.25, 1, 0.5, 1],
    durationScale: 0.9,
  },
  layout: {
    density: "normal",
    nav: "topbar",
  },
});
