# dashboard — theme spec

The portfolio as an admin panel: sidebar navigation, dense data-UI cards,
table-like lists, status chips. Native habitat for QA/analytics/founder
profession modules.

## Tokens
| Token | Light | Dark (primary mode) |
|---|---|---|
| bg | #f8fafc | #0b0f14 |
| fg | #0f172a | #e2e8f0 |
| accent | #2563eb | #3b82f6 |
| border | #e2e8f0 | #1c2733 |
| card | #ffffff | #111823 |
| radius | 0.5rem | — |
| shadow | xs | none (borders do the work) |

Fonts: UI sans (e.g. Inter) + mono for numbers/labels.

## Skins
- **Nav**: fixed left sidebar (collapses to bottom tabs on mobile) — section links with icons + active state; profile block at top.
- **SectionShell**: page-content area offset by sidebar width; section title bar with breadcrumb ("Portfolio / Projects").
- **Card**: data-panel — header row with label + kebab affordance, tabular body, mono numbers.
- **Badge**: status chip with dot (green/amber semantics).
- **Metrics section**: KPI cards with delta arrows and sparkline placeholders.
- **Experience compact-list**: renders as a table with column headers.
- **Button**: standard UI button, sm size default.

## Motion language
`sectionEnter: "fade-up"`, stagger 0.04, durationScale 0.6, easing [0.25, 1, 0.5, 1], hover "lift" (1px). Motion stays out of the way — this theme sells density and clarity.

## Signature moves
Sidebar layout (the only theme that changes the page chrome), KPI deltas, mono tabular numbers.
