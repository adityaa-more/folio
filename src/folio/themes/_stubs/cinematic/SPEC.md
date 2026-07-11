# cinematic — theme spec

Film-title sequence energy: near-black canvas, huge letterspaced type,
slow clip-path wipes, letterbox framing.

## Tokens
| Token | Light | Dark (primary mode) |
|---|---|---|
| bg | #eceae6 | #08080a |
| fg | #141416 | #f4f2ee |
| accent | #b8860b (brass) | #d4a72c |
| border | #d8d5cf | #232328 |
| radius / shadow | 0 / none | 0 / none |
| maxw / density | 80rem / airy | — |

Fonts: condensed display (e.g. Oswald / Bebas-like) + neutral sans body.

## Skins
- **SectionShell**: letterbox — thin full-width top/bottom bars (2px fg) framing each section; section id as a small "scene 01" slate label.
- **SectionHeading**: all-caps, tracking 0.3em+, huge; subtitle as a subdued "directed by"-style credit line.
- **Card**: frame-like border with corner ticks (registration marks), hover dims everything except the hovered card (group opacity trick).
- **Nav**: minimal top-right credits block; links appear as end-credit rows.
- **Button**: outlined, all-caps, wide tracking; hover fills like a fade-in.

## Motion language
`sectionEnter: "cinematic-reveal"` (clip-path wipe preset — phase 4), stagger 0.15, durationScale 1.5, easing [0.83, 0, 0.17, 1], hover "none".

## Signature moves
Slow wipes, long cross-fades, a vignette on the hero. Nothing bounces.
