import { defineTheme } from "@/folio/core/define";
import { terminalFontClassName } from "./fonts";
import { terminalSkins } from "./skins";

/**
 * terminal — mono everywhere, prompt lines, bracketed buttons, phosphor
 * accent. Motion language: instant and snappy (durationScale 0.5, tight
 * stagger); hover = inversion, like a selection block.
 */
export const terminal = defineTheme({
  id: "terminal",
  name: "Terminal",
  description:
    "Shell-session portfolio: monospace, 1px borders, prompt lines, snappy motion.",
  fontClassName: terminalFontClassName,
  skins: terminalSkins,
  motionLanguage: {
    sectionEnter: "fade-up",
    stagger: 0.04,
    hover: "invert",
    easing: [0.16, 1, 0.3, 1],
    durationScale: 0.5,
  },
  layout: {
    density: "dense",
    nav: "topbar",
  },
});
