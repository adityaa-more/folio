# photographer module — spec

Activate: `modules: ["photographer"]`

## Sections
- **immersive-gallery** — full-bleed image sequences; variants: `full-bleed` (edge-to-edge stack with captions), `lightbox-grid` (grid opening a keyboard-navigable lightbox — needs a small client component), `story` (one image per viewport, filmstrip progress).
- **series** — grouped bodies of work: series title, statement, cover, image count; links to a gallery anchor or MDX page.
- **exif-strip** — optional camera/film metadata row under images (mono type).

## Content schema sketch
```ts
immersiveGallery: { images: [{ src, alt, caption?, location?, exif?: { camera?, lens?, film? } }] }
series: { items: [{ title, statement, cover: {src, alt}, count?, href? }] }
```

## Notes
- Reuse core gallery variants where possible; this module adds the immersive + metadata layer.
- Images dominate: keep chrome minimal, lazy-load below the fold, aspect data in content to avoid CLS.
- Best paired with luxury-minimal / magazine-story / immersive-scroll themes.
