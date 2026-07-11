import { definePreset } from "@/folio/core/define";

export const fadeUp = definePreset({
  id: "fade-up",
  name: "Fade Up",
  description: "Content fades in while drifting up. The quiet default.",
  container: {
    hidden: {},
    visible: {},
  },
  item: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    staggerChildren: 0.1,
  },
  viewport: { once: true, margin: "-80px" },
  reducedMotion: "fade",
});