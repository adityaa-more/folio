# Motion system

Two kinds of motion:

1. **Presets** — serializable entrance animations, applied per section from config (`motion: "blur-reveal"`) or a theme's motion language.
2. **Interaction components** — client wrappers for pointer effects: `Magnetic`, `Spotlight`, `Tilt`, `TypewriterText`, `ParallaxLayer` (`src/folio/motion/components/`). Used inside variants and skins.

## Preset anatomy

```ts
export const blurReveal = definePreset({
  id: "blur-reveal",
  name: "Blur Reveal",
  container: { hidden: {}, visible: {} },          // section wrapper variants
  item: {                                          // each <MotionItem>
    hidden: { opacity: 0, y: 18, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 },
  viewport: { once: true, margin: "-60px" },
  reducedMotion: "fade",                           // REQUIRED: "fade" | "none"
});
```

One file in `src/folio/motion/presets/`, one line in `motion/registry.ts`.

Shipped: `fade-up` · `blur-reveal` · `stagger-grid` · `cinematic-reveal` · `floating-cards` · `rise`.

## Guarantees the runtime gives you

`MotionBlock` (the only client boundary in the render path) handles:

- **prefers-reduced-motion** — collapses to your declared fallback; the fade fallback still animates to the preset's full resting pose so no blur/transform residue sticks
- **intensity knob** — config `motion.intensity: off | subtle | normal | expressive` scales durations; `off` renders static
- **theme durationScale** — luxury runs your preset slow, terminal runs it snappy
- **SSR safety** — matchMedia reads happen post-hydration; server HTML always matches the first client render

Dev preview on a reduced-motion OS: `motion: { respectReducedMotion: false }` in config (remove before deploy).

## Rules

- Animate transform / opacity / filter / clip-path only — nothing that reflows layout
- Presets must stay plain serializable data (they cross the server→client boundary)
- Pointer-effect components must be inert on touch and under reduced motion (see `Tilt` for the pattern)
