# saas — theme spec

Startup landing-page language applied to a person: clean gradient accents,
feature-card grids, social-proof styling, generous friendly rounding.

## Tokens
| Token | Light (primary mode) | Dark |
|---|---|---|
| bg | #ffffff | #0a0a0f |
| fg | #0f172a | #f1f5f9 |
| accent | #6366f1 → gradient to #8b5cf6 | same, brighter |
| border | #e2e8f0 | #1e293b |
| radius | 0.75rem | — |
| shadow | sm + colored accent shadow on primary CTAs | — |

Fonts: Inter/Geist-style sans everywhere; headings semibold, tight tracking.

## Skins
- **SectionHeading**: centered, gradient kicker pill above, subtitle centered below (landing-page pattern).
- **Card**: soft border + hover ring-accent; feature-card feel with icon slot.
- **Nav**: classic SaaS topbar — logo left, links center, primary CTA button right.
- **Button**: primary = gradient fill + colored shadow; ghost = subtle border.
- **Footer**: multi-column link footer.
- **Metrics section styling**: monochrome logos row + big gradient numbers.

## Motion language
`sectionEnter: "fade-up"`, stagger 0.08, durationScale 0.8, easing [0.21, 0.47, 0.32, 0.98], hover "lift".

## Signature moves
Gradient text on hero headline, CTA glow, checkmark lists. Testimonials = social proof wall.
