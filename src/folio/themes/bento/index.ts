import { defineTheme } from "@/folio/core/define";
import { bentoFontClassName } from "./fonts";
import { bentoSkins } from "./skins";

/**
 * bento — everything is a tile: big radii, soft shadows, springy hover
 * with overshoot easing, floating dock nav pinned to the bottom.
 */
export const bento = defineTheme({
  id: "bento",
  name: "Interactive Bento",
  description:
    "Tile mosaic: rounded glassy cards, spring hover, floating dock navigation.",
  fontClassName: bentoFontClassName,
  skins: bentoSkins,
  motionLanguage: {
    sectionEnter: "stagger-grid",
    stagger: 0.06,
    hover: "scale",
    easing: [0.34, 1.56, 0.64, 1],
    durationScale: 0.8,
  },
  layout: {
    density: "normal",
    nav: "floating",
  },
});
