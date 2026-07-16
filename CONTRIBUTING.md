# Contributing to Folio

Sections, themes, motion presets, and profession modules are all registry-driven — adding one never touches core. That's the deal: **make the extension point cheaper than the fork.**

## Setup

```bash
pnpm install
pnpm dev
# your two workbenches:
#   /showcase  — every section × variant under any theme
#   /builder   — the end-user experience you're contributing to
```

Quality gates (all must pass — CI runs them, or run everything at once with `pnpm ci`):

```bash
pnpm validate    # registry consistency: schemas, defaultVariant, reducedMotion, wiring
pnpm typecheck && pnpm lint && pnpm build
```

## Contributing a section

```bash
pnpm new:section awards
```

Then follow the printed steps (register + demo content). Checklist before PR:

- [ ] Zod content schema with helpful messages; sensible `.default()`s
- [ ] At least one variant; every variant renders through `MotionBlock`/`MotionItem`
- [ ] Uses theme skins (`theme.skins.Card`, `SectionHeading`, …) and tokens only — no hardcoded colors/fonts
- [ ] Readable in **all four themes** at 360 / 768 / 1440 px (`/showcase`)
- [ ] Demo content added so `/builder` can offer it
- [ ] Dark + light both fine

## Contributing a theme

Pick a stub from `src/folio/themes/_stubs/` (each has a full SPEC.md) or propose a new one. Anatomy + acceptance checklist: [`src/folio/themes/_stubs/README.md`](src/folio/themes/_stubs/README.md).

The bar: a theme must **reinterpret structure** (card chrome, nav pattern, section furniture, motion language), not swap colors. If a screenshot of your theme could be mistaken for an existing one, it isn't done.

## Contributing a motion preset

One file in `src/folio/motion/presets/` + registry line. Rules:

- [ ] `reducedMotion` fallback declared (`"fade"` or `"none"`) — the type forces it
- [ ] Serializable data only (crosses the server→client boundary)
- [ ] No layout-thrashing properties; stick to transform/opacity/filter/clip-path
- [ ] Test at `intensity: "subtle"` and `"expressive"`

## Contributing a profession module

A module is a `FolioPlugin` — sections + optional themes/presets bundled under `src/folio/modules/<id>/`, registered in `modules/registry.ts`. Stubs with full specs: `src/folio/modules/_stubs/{photographer,writer,founder}`.

## PR conventions

- One section/theme/preset per PR
- Screenshots (light + dark) in the PR description — `/showcase?theme=<id>` makes this easy
- No new runtime dependencies without discussion in an issue first
