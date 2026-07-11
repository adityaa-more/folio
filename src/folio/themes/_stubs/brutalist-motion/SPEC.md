# brutalist-motion — theme spec

Raw and loud: system-feeling grotesque, harsh black borders, hard offset
shadows, aggressive snap animations. Anti-polish, deliberately.

## Tokens
| Token | Light (primary mode) | Dark |
|---|---|---|
| bg | #fdfd96-tinted paper #fffef2 | #111111 |
| fg | #000000 | #ffffff |
| accent | #ff3b30 | #ffe600 |
| border | #000000 (2px!) | #ffffff |
| radius | 0 | 0 |
| shadow | 6px 6px 0 #000 (hard offset) | 6px 6px 0 accent |

Fonts: heavy grotesque (e.g. Archivo Black) headings, mono or grotesque body.

## Skins
- **Card**: 2px border + hard offset shadow; hover shifts the card INTO the shadow (translate 6px, shadow 0) — tactile press.
- **SectionHeading**: massive, sometimes rotated -1deg; subtitle in a marker-highlight span (accent bg).
- **SectionShell**: thick divider bars; section id stamped as oversized outlined text behind content.
- **Nav**: full-width black bar, links as bordered blocks that invert on hover.
- **Button**: border-2 + offset shadow + press-in hover; uppercase.
- **Badge**: bordered, no rounding, shadow-none.

## Motion language
`sectionEnter: "fade-up"` tuned hard: stagger 0.03, durationScale 0.4, easing [0.9, 0, 0.1, 1] (snap), hover "invert". Entrances overshoot slightly then snap.

## Signature moves
Press-in shadows, marker highlights, big rotated stamps. Nothing eases gently.
