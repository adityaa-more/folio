import { definePreset } from "@/folio/core/define";

export const staggerGrid = definePreset({
  id: "stagger-grid",
  name: "Stagger Grid",
  description:
    "Cards scale and fade in one after another — built for grids of items.",
  container: {
    hidden: {},
    visible: {},
  },
  item: {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  transition: {
    duration: 0.55,
    ease: [0.21, 0.47, 0.32, 0.98],
    staggerChildren: 0.08,
  },
  viewport: { once: true, margin: "-40px" },
  reducedMotion: "fade",
});
