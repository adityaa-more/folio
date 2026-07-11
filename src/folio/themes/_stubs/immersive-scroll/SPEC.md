# immersive-scroll — theme spec

Scroll IS the interface: sticky scenes, scroll-linked progress, sections
that pin and hand off. The most motion-dependent theme.

## Tokens
| Token | Dark (primary mode) | Light |
|---|---|---|
| bg | #0c0c0e | #f4f4f4 |
| fg | #f5f5f5 | #111114 |
| accent | #ff5c39 | #e0431f |
| border | #26262a | #dcdcde |
| radius | 0.5rem | — |
| maxw | full-bleed scenes, 60rem text | — |

Fonts: wide display sans (e.g. Syne / Unbounded) headings, neutral body.

## Skins
- **SectionShell**: each section = min-h-screen "scene" with sticky inner content; a fixed scroll-progress rail on the right maps sections to dots.
- **SectionHeading**: word-by-word reveal tied to scroll (useScroll + stagger).
- **Card**: minimal — content floats on the scene, not boxed.
- **Nav**: hidden until scroll-up; progress dots double as nav.
- **Hero fullscreen variant**: headline scales down and pins as you scroll past.

## Motion language
`sectionEnter: "parallax"` (phase 4 preset), stagger 0.1, durationScale 1.0, easing [0.33, 1, 0.68, 1], hover "none". Heavy use of `useScrollProgress` hook (motion/hooks).

## Signature moves
Pinned scenes, scroll-scrubbed headline reveals, parallax image layers.
CRITICAL: reduced-motion fallback must degrade to plain stacked sections —
test this first, not last. Mobile: disable pinning below 768px.
