import { definePreset } from "@/folio/core/define";

export const rise = definePreset({
  id: "rise",
  name: "Rise",
  description:
    "Long-travel ascent with a scale settle — parallax-adjacent depth without scroll-linking.",
  container: {
    hidden: {},
    visible: {},
  },
  item: {
    hidden: { opacity: 0, y: 110, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  transition: {
    duration: 0.9,
    ease: [0.33, 1, 0.68, 1],
    staggerChildren: 0.1,
  },
  viewport: { once: true, margin: "-40px", amount: 0.2 },
  reducedMotion: "fade",
});
