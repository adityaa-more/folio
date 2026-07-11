# Section blocks

A section is a folder under `src/folio/sections/<id>/`:

```
<id>/
├── schema.ts       # Zod schema for the section's content + inferred type
├── index.ts        # defineSection({...}) — metadata, schema, variants
└── variants/       # one component per layout
    ├── grid.tsx
    └── list.tsx
```

Scaffold one: `pnpm new:section <kebab-name>`.

## The contract

```ts
export const projectsSection = defineSection<ProjectsContent>({
  id: "projects",               // unique across the merged registry
  name: "Projects",             // shown in builder + showcase
  description: "…",             // shown in the builder's add-section drawer
  category: "core",             // or a profession: developer, designer, …
  navLabel: "Work",             // optional — appears in the nav when set
  schema: projectsSchema,       // validates user content at build time
  variants: { grid: ProjectsGrid, list: ProjectsList },
  defaultVariant: "grid",
  defaultMotion: "stagger-grid",
});
```

Register in `src/folio/sections/registry.ts` (module sections register via their plugin instead).

## Variant components

Every variant receives the same props:

```ts
{ content: TContent; motion: MotionPreset; theme: ThemeRuntime; intensity: MotionIntensity }
```

Rules that keep sections theme-proof:

- Compose `theme.skins.*` (SectionShell wraps you automatically; use SectionHeading, Card, Button, Badge) — that's how one section looks native in every theme.
- Style with token utilities only: `text-foreground`, `text-muted`, `text-accent` (+`-2`/`-3`), `border-border`, `bg-card`, `font-heading`, `rounded-token`, `shadow-token`, `max-w-[var(--f-maxw)]`.
- Wrap animated content in `<MotionBlock preset={motion} intensity={intensity} durationScale={theme.motionLanguage.durationScale}>`, stagger children with `<MotionItem>`.

## Content

User data lives in `src/config/content/<id>.ts`, keyed `"<id>"` in `src/config/content/index.ts`, validated against your schema at build time. A section can render twice with different data via `{ id: "gallery", content: "gallery-travel" }`.
