import { definePreset } from "@/folio/core/define";

export const cinematicReveal = definePreset({
  id: "cinematic-reveal",
  name: "Cinematic Reveal",
  description:
    "Clip-path wipe from the bottom, like a title card — slow, deliberate.",
  container: {
    hidden: {},
    visible: {},
  },
  item: {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 24, opacity: 0.001 },
    visible: { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 },
  },
  transition: {
    duration: 1.1,
    ease: [0.83, 0, 0.17, 1],
    staggerChildren: 0.18,
  },
  viewport: { once: true, margin: "-80px" },
  reducedMotion: "fade",
});
