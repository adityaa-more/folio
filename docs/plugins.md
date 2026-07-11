# Modules & plugins

One extension mechanism: `FolioPlugin`.

```ts
export interface FolioPlugin {
  name: string;
  sections?: SectionDefinition[];
  themes?: ThemeDefinition[];
  motionPresets?: MotionPreset[];
}
```

At render time the built-in registries merge with every active plugin's items (`buildRegistries`, `src/folio/core/renderer.tsx`). Duplicate ids throw — two plugins can never silently shadow each other.

## Profession modules = built-in plugins

```ts
// site.config.ts
modules: ["developer"],   // adds github-stats, tech-stack, code-showcase
```

Shipped: `developer`, `designer`. Spec'd stubs: `photographer`, `writer`, `founder` (`src/folio/modules/_stubs/`).

A module lives in `src/folio/modules/<id>/`:

```
<id>/
├── index.ts          # definePlugin({ name: "<id>", sections: [...] })
└── sections/         # same section anatomy as core (see docs/sections.md)
```

Register in `src/folio/modules/registry.ts` (`builtinModules`). Module sections need content entries like any section — the builder's add-drawer shows them once the module is active and content exists.

## Third-party plugins

Ship an npm package exporting a `FolioPlugin`; users add it directly:

```ts
import { threeDPortfolio } from "folio-plugin-3d";

export default defineConfig({
  plugins: [threeDPortfolio],
  sections: [{ id: "model-viewer" }],
});
```

Note: configs using code `plugins` can't be saved by the visual builder (components aren't serializable) — hand-edit those configs.
