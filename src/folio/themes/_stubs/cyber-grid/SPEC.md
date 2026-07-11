# cyber-grid — theme spec

Neon-on-dark engineering grid: visible background gridlines, glow accents,
angular cut corners, scanline flourishes.

## Tokens
| Token | Light | Dark (primary mode) |
|---|---|---|
| bg | #eef1f6 | #05070d |
| fg | #10131c | #dbe4ff |
| accent | #0b5fff | #38e8ff (cyan glow) |
| border | #c8d0e0 | #1a2438 |
| radius | 0 (use clip-path cut corners on cards) | — |
| shadow | none | 0 0 24px accent/20 (glow) |

Fonts: squarish techno sans for headings (e.g. Chakra Petch), compact sans body, mono for labels.

## Skins
- **SectionShell**: faint background grid via repeating-linear-gradient tokens; section label as `[SYS://section-id]` chip.
- **Card**: cut top-right corner (clip-path), 1px border, hover = border glow + subtle inner scanlines.
- **SectionHeading**: heading prefixed by a glitch-underscore; subtitle in mono.
- **Nav**: top HUD bar with bracketed links `[ WORK ]`, active state glows.
- **Button**: parallelogram skew, glow on hover.

## Motion language
`sectionEnter: "fade-up"`, stagger 0.05, durationScale 0.7, easing [0.16, 1, 0.3, 1], hover "glow". Optional glitch-in preset (phase 4+).

## Signature moves
Glow pulses, grid parallax on hero, corner-cut cards. Dark mode is the hero mode.
