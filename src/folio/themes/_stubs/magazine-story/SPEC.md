# magazine-story — theme spec

Long-read feature-article aesthetic (editorial's sibling, but story-first
instead of front-page): drop caps, pull quotes, generous serif measure,
photo-led sections.

## Tokens
| Token | Light (primary mode) | Dark |
|---|---|---|
| bg | #faf7f0 (cream) | #17140e |
| fg | #22201c | #ece6d8 |
| accent | #205e3b (forest) | #7fbf9a |
| border | #ddd6c8 | #322d22 |
| radius | 0 | — |
| maxw | 44rem text measure, images break out wider | — |

Fonts: readable text serif (e.g. Source Serif / Newsreader) body AND headings; italic small caps for kickers.

## Skins
- **SectionShell**: narrow text column; images/galleries break out to a wider measure (grid with negative margins).
- **SectionHeading**: chapter-style — small caps kicker, roman numeral, centered title, short flourish rule.
- **Card**: article-teaser row — serif headline + deck + byline-style meta.
- **Nav**: minimal top rule with centered small-caps name; links hide behind a "Contents" dropdown-style anchor list.
- **About prose variant**: enable drop cap via first-letter styling.
- **Button**: text link with long em-dash lead-in.

## Motion language
`sectionEnter: "blur-reveal"`, stagger 0.12, durationScale 1.2, easing [0.22, 1, 0.36, 1], hover "none".

## Signature moves
Drop caps, pull-quote styling for testimonials, figure captions with hairline rules.
