# writer module — spec

Activate: `modules: ["writer"]`

## Sections
- **featured-writing** — hand-picked pieces: publication, title, deck, link; variants: `editorial-index` (numbered list rows), `clips-grid` (publication-first cards).
- **publications** — logo/name wall of outlets written for.
- **writing-index** — auto-derived from the blog MDX collection (same pattern as core case-studies section): every post as a dated index row, grouped by year.

## Content schema sketch
```ts
featuredWriting: { items: [{ title, publication, deck?, date?, href }] }
publications: { items: [{ name, href? }] }
writingIndex: {} // derived from getBlogPosts() in config/content
```

## Notes
- writing-index derives from `getBlogPosts()` — zero manual upkeep.
- Typography-first: no images required anywhere.
- Best paired with editorial / magazine-story themes.
