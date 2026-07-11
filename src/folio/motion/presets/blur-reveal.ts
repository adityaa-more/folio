import { definePreset } from "@/folio/core/define";

export const blurReveal = definePreset({
  id: "blur-reveal",
  name: "Blur Reveal",
  description:
    "Content resolves out of a soft blur — cinematic, unhurried. Signature move of luxury-minimal.",
  container: {
    hidden: {},
    visible: {},
  },
  item: {
    hidden: { opacity: 0, y: 18, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  transition: {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
    staggerChildren: 0.12,
  },
  viewport: { once: true, margin: "-60px" },
  reducedMotion: "fade",
});
