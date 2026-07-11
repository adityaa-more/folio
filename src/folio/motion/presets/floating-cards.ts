import { definePreset } from "@/folio/core/define";

export const floatingCards = definePreset({
  id: "floating-cards",
  name: "Floating Cards",
  description:
    "Cards drift up with a slight settle-rotate — weightless, glassy feel.",
  container: {
    hidden: {},
    visible: {},
  },
  item: {
    hidden: { opacity: 0, y: 48, rotate: -1.5, scale: 0.98 },
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
  },
  transition: {
    duration: 1.0,
    ease: [0.22, 1, 0.36, 1],
    staggerChildren: 0.12,
  },
  viewport: { once: true, margin: "-60px" },
  reducedMotion: "fade",
});
