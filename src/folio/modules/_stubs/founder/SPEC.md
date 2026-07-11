# founder module — spec

Activate: `modules: ["founder"]`

## Sections
- **traction-timeline** — company milestones on a time axis: raise, launch, revenue marks; variants: `horizontal-scrub` (scroll-snap rail), `vertical` (reuse experience-timeline styling).
- **startup-metrics** — KPI wall with deltas: MRR, users, growth %; reuses core CountUp; variant `kpi-cards` with up/down arrows and period labels.
- **ventures** — portfolio of companies: logo, one-liner, role (founder/advisor/investor), status (active/acquired/wound-down chip).
- **press** — coverage list: outlet, headline, date, link.

## Content schema sketch
```ts
tractionTimeline: { items: [{ date, title, detail?, kind: "raise"|"launch"|"milestone" }] }
startupMetrics: { items: [{ value: number, suffix?, label, delta?: { value, direction: "up"|"down" }, period? }] }
ventures: { items: [{ name, oneLiner, role, status, href? }] }
```

## Notes
- Numbers are claims — content files keep them explicit and versioned.
- Best paired with saas / dashboard / bento themes.
