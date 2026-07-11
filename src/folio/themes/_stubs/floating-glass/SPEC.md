# floating-glass — theme spec

Frosted layers over a soft aurora gradient: translucent cards, heavy
backdrop-blur, floating depth.

## Tokens
| Token | Light | Dark |
|---|---|---|
| bg | aurora gradient base #f5f6fb | #0b0d16 |
| fg | #17192a | #eef0fa |
| accent | #7c5cff | #9d85ff |
| card | rgb(255 255 255 / 0.55) | rgb(255 255 255 / 0.06) |
| border | rgb(255 255 255 / 0.6) | rgb(255 255 255 / 0.12) |
| radius | 1.5rem | — |
| shadow | large soft ambient | deeper ambient |

Fonts: rounded-friendly sans (e.g. Plus Jakarta Sans) everywhere.

## Skins
- **SectionShell**: fixed aurora blobs (two radial-gradient pseudo layers) behind content; sections float above.
- **Card**: backdrop-blur-xl translucent panel, 1px white-alpha border, hover lifts with deeper shadow.
- **Nav**: floating glass pill top-center (like luxury but frosted + rounded).
- **Button**: glass pill; primary = accent fill with inner highlight.
- **SectionHeading**: gradient text option on the title.

## Motion language
`sectionEnter: "floating-cards"` (phase 4 preset — slow y-drift + fade), stagger 0.1, durationScale 1.1, easing [0.22, 1, 0.36, 1], hover "lift".

## Signature moves
Depth: parallax between aurora layer and cards; everything hovers, nothing sits.
Perf note: cap backdrop-blur surfaces visible at once; blur is GPU-expensive on mobile.
