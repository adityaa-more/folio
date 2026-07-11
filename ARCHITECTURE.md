# Folio — Universal Portfolio Framework: Architecture & Build Plan

## Context

Build "the shadcn/ui of portfolio websites" in the empty `folio/` directory: an open-source, config-driven Next.js portfolio framework — not a template. Users fork the repo, edit typed config files (theme, sections, colors, animations, content), and deploy. Contributors add new sections, themes, and motion presets through well-defined registry contracts.

User decisions (locked):
- **Repo model:** single config-driven Next.js app, internally structured so a CLI/registry monorepo can be extracted in v2.
- **Theme scope:** 4 fully-built visual systems + spec'd stubs for 8 more as contribution targets.
- **Content:** structured data in typed TS files (Zod-validated); long-form (case studies, blog) in MDX.

No AI features, no drag-and-drop. Everything driven by config + registries.

---

## 1. Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router, RSC) | Static export capable, streaming, image optimization |
| Language | TypeScript, `strict: true` | Config DX depends on it |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Theme tokens as CSS variables, zero-config |
| Motion | `motion` (framer-motion v12+) with `LazyMotion` + `domAnimation` | ~-30kb vs full bundle |
| Validation | Zod | Config validated at build time with readable errors |
| MDX | `content-collections` (`@content-collections/mdx`) | Contentlayer successor, typed frontmatter |
| Package manager | pnpm | Monorepo-ready |
| Lint/format | ESLint + Prettier, `prettier-plugin-tailwindcss` | Contribution consistency |
| Fonts | `next/font` per theme | Each theme declares its own font pairing |

---

## 2. Folder Structure

```
folio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # loads theme, fonts, providers
│   │   ├── page.tsx                # renders <PortfolioRenderer />
│   │   ├── globals.css             # Tailwind v4 entry, base tokens
│   │   ├── case-studies/[slug]/page.tsx
│   │   └── blog/[slug]/page.tsx
│   │
│   ├── folio/                      # ★ THE FRAMEWORK (extractable to packages/ in v2)
│   │   ├── core/
│   │   │   ├── renderer.tsx        # layout engine: config → resolved section tree
│   │   │   ├── registry.ts         # generic Registry<T> + merge logic (plugins)
│   │   │   ├── define.ts           # defineConfig / defineSection / defineTheme /
│   │   │   │                       #   definePreset / definePlugin helpers
│   │   │   ├── schema.ts           # Zod schemas for SiteConfig
│   │   │   └── types.ts            # all public contracts
│   │   │
│   │   ├── sections/
│   │   │   ├── registry.ts         # section registry (id → SectionDefinition)
│   │   │   ├── hero/
│   │   │   │   ├── index.ts        # defineSection({...}) — meta, schema, variants
│   │   │   │   ├── schema.ts       # Zod props schema for this section's content
│   │   │   │   └── variants/
│   │   │   │       ├── centered.tsx
│   │   │   │       ├── split.tsx
│   │   │   │       └── fullscreen.tsx
│   │   │   ├── about/ …
│   │   │   ├── projects/ …
│   │   │   ├── experience/ …
│   │   │   ├── skills/ …
│   │   │   ├── testimonials/ …
│   │   │   ├── metrics/ …
│   │   │   ├── gallery/ …
│   │   │   ├── bento/ …
│   │   │   ├── faq/ …
│   │   │   ├── contact/ …
│   │   │   └── case-studies/ …
│   │   │
│   │   ├── themes/
│   │   │   ├── registry.ts
│   │   │   ├── luxury-minimal/
│   │   │   │   ├── index.ts        # defineTheme({...})
│   │   │   │   ├── tokens.css      # [data-theme="luxury-minimal"] { --f-* vars }
│   │   │   │   ├── fonts.ts        # next/font declarations
│   │   │   │   └── skins.tsx       # themed Card/Button/Nav/SectionShell overrides
│   │   │   ├── terminal/ …
│   │   │   ├── editorial/ …
│   │   │   ├── bento/ …
│   │   │   └── _stubs/             # 8 spec'd themes as SPEC.md contribution targets
│   │   │
│   │   ├── motion/
│   │   │   ├── registry.ts         # preset name → MotionPreset
│   │   │   ├── presets/
│   │   │   │   ├── fade-up.ts, blur-reveal.ts, cinematic-reveal.ts,
│   │   │   │   ├── floating-cards.ts, parallax.ts, stagger-grid.ts,
│   │   │   │   ├── typewriter.ts, magnetic-hover.ts, spotlight.ts, tilt.ts
│   │   │   ├── components/
│   │   │   │   ├── motion-block.tsx    # <MotionBlock preset="blur-reveal">
│   │   │   │   ├── motion-item.tsx     # stagger children
│   │   │   │   ├── magnetic.tsx        # pointer-follow wrapper
│   │   │   │   └── spotlight.tsx       # cursor spotlight wrapper
│   │   │   └── hooks/
│   │   │       ├── use-reduced-motion.ts
│   │   │       └── use-scroll-progress.ts
│   │   │
│   │   ├── modules/                # profession modules = plugins
│   │   │   ├── developer/          # github-stats, tech-stack, code-showcase sections
│   │   │   ├── designer/           # visual case-study, gallery-masonry sections
│   │   │   ├── photographer/       # immersive-gallery, lightbox sections
│   │   │   ├── writer/             # editorial-index, featured-writing sections
│   │   │   └── founder/            # traction-timeline, startup-metrics sections
│   │   │
│   │   └── ui/                     # shared primitives (theme-skinnable)
│   │       ├── card.tsx, button.tsx, badge.tsx, section-shell.tsx,
│   │       ├── nav.tsx, footer.tsx, avatar.tsx, icon.tsx
│   │       └── …
│   │
│   ├── config/                     # ★ THE USER EDITS ONLY THIS
│   │   ├── site.config.ts
│   │   └── content/
│   │       ├── profile.ts, projects.ts, experience.ts,
│   │       ├── skills.ts, testimonials.ts, metrics.ts, faq.ts
│   │
│   └── lib/                        # cn(), formatters, misc utils
│
├── content/                        # MDX long-form
│   ├── case-studies/*.mdx
│   └── blog/*.mdx
│
├── scripts/
│   └── new-section.ts              # pnpm new:section <name> — scaffolds folder
│
├── docs/                           # CONTRIBUTING, theme spec, section spec, plugin spec
├── content-collections.ts
├── next.config.ts, tsconfig.json, package.json
└── README.md
```

Key rule: `src/folio/**` never imports from `src/config/**`. Config flows in through the renderer only. This is what makes v2 package extraction possible.

---

## 3. Core Contracts (`src/folio/core/types.ts`)

```ts
// ---- Sections ----
export interface SectionDefinition<TProps = unknown> {
  id: string;                              // "hero"
  name: string;
  description: string;
  schema: z.ZodType<TProps>;               // validates content at build
  variants: Record<string, SectionVariant<TProps>>;  // "centered" | "split" | …
  defaultVariant: string;
  defaultMotion: string;                   // preset name
  category: "core" | "developer" | "designer" | …;
}

export type SectionVariant<TProps> = React.ComponentType<{
  content: TProps;
  motion: ResolvedMotionPreset;
  theme: ThemeRuntime;                     // active theme's skins + tokens
}>;

// ---- Themes ----
export interface ThemeDefinition {
  id: string;                              // "luxury-minimal"
  name: string;
  description: string;
  fonts: { heading: NextFont; body: NextFont; mono?: NextFont };
  tokensCss: string;                       // path/import of tokens.css
  skins: Partial<SkinRegistry>;            // Card, Button, Nav, SectionShell overrides
  motionLanguage: {                        // theme's default animation vocabulary
    sectionEnter: string;                  // preset name, e.g. "blur-reveal"
    stagger: number;
    hover: "lift" | "glow" | "scale" | "none" | "invert";
    easing: [number, number, number, number];
    durationScale: number;                 // 1 = normal, terminal=0.6 (snappy), luxury=1.4
  };
  layout: {
    maxWidth: string; sectionGap: string; density: "airy" | "normal" | "dense";
    nav: "floating" | "topbar" | "sidebar" | "command";
  };
}

// ---- Motion ----
export interface MotionPreset {
  id: string;
  container?: Variants;                    // framer-motion variants
  item?: Variants;                         // for staggered children
  transition?: Transition;
  viewport?: { once: boolean; margin: string };
  reducedMotion: "fade" | "none";          // fallback behavior
  mobile?: Partial<MotionPreset>;          // degraded variant for touch/small
}

// ---- Config ----
export interface SiteConfig {
  profile: { name: string; profession: string; … };
  theme: ThemeId;
  mode: "dark" | "light" | "system";
  colors?: { accent?: string; … };         // optional overrides of theme tokens
  sections: SectionConfig[];               // ORDER = render order
  motion: { intensity: "off" | "subtle" | "normal" | "expressive"; overrides?: Record<string,string> };
  modules: ModuleId[];                     // profession plugins to activate
  plugins?: FolioPlugin[];
}

export interface SectionConfig {
  id: string;                              // must exist in merged registry
  enabled?: boolean;                       // default true — the on/off toggle
  variant?: string;                        // else section's defaultVariant
  motion?: string;                         // else theme.motionLanguage.sectionEnter
  content?: string;                        // key into content files, default = id
}

// ---- Plugins (profession modules use this same interface) ----
export interface FolioPlugin {
  name: string;
  sections?: SectionDefinition[];
  themes?: ThemeDefinition[];
  motionPresets?: MotionPreset[];
}
```

**Unification decision:** profession modules ARE plugins — `modules: ["developer"]` in config just activates a built-in `FolioPlugin`. One extension mechanism, not two. Third parties ship npm packages exporting a `FolioPlugin`.

---

## 4. Layout Engine (`core/renderer.tsx`)

Pipeline, runs at build time (RSC):

1. `defineConfig()` already Zod-validated `site.config.ts` — bad theme id / unknown section id / malformed content fails the build with a pointed error ("Section 'projects' content invalid: projects[2].link — expected url").
2. Merge registries: built-ins + activated modules + user plugins (`Registry.merge`, duplicate ids error loudly).
3. For each `sections[]` entry with `enabled !== false`: resolve `SectionDefinition` → variant component → motion preset (per-section override → theme motion language → section default) → content (from `config/content/*` or MDX collection).
4. Render inside `<SectionShell>` (theme skin controls spacing/background/borders per theme).
5. Each section variant loaded via `next/dynamic` — only configured sections enter the bundle.

Server/client split: section shells and static content are RSC; only `MotionBlock`/interactive wrappers are `"use client"`. Motion components wrap children — content stays server-rendered.

---

## 5. Theme System

Themes are **complete visual systems**, implemented as three cooperating layers:

**Layer 1 — Design tokens (CSS variables).** Each theme ships `tokens.css`:
```css
[data-theme="luxury-minimal"] {
  --f-bg: 40 20% 97%; --f-fg: 30 10% 12%; --f-accent: 35 40% 45%;
  --f-radius: 0px; --f-border-w: 1px; --f-shadow: none;
  --f-space-section: clamp(6rem, 12vw, 10rem);
  --f-tracking-heading: 0.02em; …
}
[data-theme="luxury-minimal"].dark { … }
```
Tailwind v4 `@theme inline` maps these to utilities (`bg-background`, `rounded-token`, …). `colors` overrides in user config are injected as inline CSS vars on `<html>` — user accent recolors any theme without touching theme code. Dark/light: every theme defines both palettes; `.dark` class strategy.

**Layer 2 — Skins (component overrides).** Base `ui/` primitives (Card, Button, Nav, SectionShell) read a `SkinContext`. Themes override rendering strategy, not just colors — Terminal's Card renders `┌─┐` box-drawing borders and a title bar; Editorial's Card is borderless with a hairline top rule and drop-cap support; Bento's Card is a spring-animated tile. Sections compose primitives, so every section automatically re-skins under every theme. **This is the mechanism that makes themes feel radically different, not palette swaps.**

**Layer 3 — Motion language.** Theme declares default easing, duration scale, stagger, hover behavior, and section-enter preset. Sections inherit it; users can override per-section.

### The 4 launch themes

| Theme | Fonts | Layout | Signature moves |
|---|---|---|---|
| **luxury-minimal** | serif display + humanist sans | max-w-4xl, huge whitespace, no borders | slow long-easing fades, hairline rules, hover = subtle opacity, floating minimal nav |
| **terminal** | mono everywhere | full-width, dense, 1px borders | typewriter headings, instant snappy transitions, blinking cursor, command-palette nav, scanline bg option |
| **editorial** | high-contrast serif + grotesque | asymmetric 12-col magazine grid | oversized headlines, column rules, image-caption discipline, scroll-linked headline reveals, topbar nav w/ issue-number styling |
| **bento** | geometric sans | dense responsive grid of tiles, everything is a card | spring physics hover (scale+tilt), stagger-grid entrance, glassy tiles, sidebar-free floating dock nav |

8 stubs in `themes/_stubs/*/SPEC.md`: cinematic, cyber-grid, floating-glass, brutalist-motion, saas, magazine-story, immersive-scroll, dashboard. Each SPEC.md: token table, skin behaviors, motion language, reference screenshots section — ready-made `good first theme` issues.

---

## 6. Motion Preset System

- Presets are pure data (variants + transition), consumed by `<MotionBlock>` / `<MotionItem>` client wrappers. Adding a preset = one file + registry line.
- `LazyMotion` + `m.` components keep bundle small; `domAnimation` feature set only.
- Every preset must define `reducedMotion` fallback (enforced by type) — `prefers-reduced-motion` collapses to fade or none.
- `mobile` sub-preset: heavy effects (parallax, tilt, magnetic) degrade to simple fades on touch/small viewports.
- `motion.intensity` global knob in config: `off | subtle | normal | expressive` scales durations/distances; `off` renders static.
- Interaction presets (magnetic-hover, spotlight, tilt) are wrapper components, not variants — used by skins and section variants.

Launch presets (~10): `fade-up`, `blur-reveal`, `cinematic-reveal` (clip-path wipe), `stagger-grid`, `floating-cards`, `parallax`, `typewriter`, `magnetic-hover`, `spotlight`, `tilt`.

---

## 7. Section Blocks — v1 catalog

Core (each: Zod content schema + 2–3 variants, all theme-skinned, all motion-capable):

| Section | Variants |
|---|---|
| hero | centered, split, fullscreen |
| about | prose, side-by-side, stats-inline |
| projects | grid, list, featured+grid |
| experience | timeline, cards, compact-list |
| skills | grouped-badges, bars, marquee |
| testimonials | carousel, grid, single-featured |
| metrics | counters-row, stat-cards |
| gallery | masonry, grid, filmstrip |
| bento | mixed-tiles (links, stats, socials, now-playing-style tiles) |
| case-studies | cards-list (links into MDX pages) |
| faq | accordion, two-column |
| contact | form+socials, minimal-links, terminal-prompt |

Profession module sections (v1 ships **developer** + **designer** fully; photographer/writer/founder as spec'd stubs):
- `developer`: github-stats (build-time fetch of contribution data, cached JSON fallback), tech-stack (categorized logos), code-showcase (shiki-highlighted snippets).
- `designer`: gallery-masonry (focal-point aware), visual-case-study (image-led layout preset for MDX case studies).

---

## 8. Example User Config (the product's core UX)

```ts
// src/config/site.config.ts
import { defineConfig } from "@/folio/core/define";

export default defineConfig({
  profile: { name: "Rahul Sharma", profession: "Full-Stack Developer",
             tagline: "I build fast, humane web software.",
             socials: { github: "rahulsharma", linkedin: "…" } },

  theme: "terminal",
  mode: "system",
  colors: { accent: "#22d3ee" },          // optional — recolors theme

  modules: ["developer"],

  sections: [
    { id: "hero", variant: "split", motion: "typewriter" },
    { id: "github-stats" },               // from developer module
    { id: "projects", variant: "featured+grid" },
    { id: "experience", variant: "timeline" },
    { id: "skills", enabled: false },     // toggled off, config kept
    { id: "testimonials" },
    { id: "contact", variant: "terminal-prompt" },
  ],

  motion: { intensity: "normal" },
});
```

Rearranging layout = reordering this array. Toggling = `enabled: false`. Restyling entire site = changing one `theme` string.

---

## 9. Developer Experience

- **Typed everything:** `defineConfig` generics narrow `theme`, section `id`, `variant`, `motion` to literal unions derived from registries — autocomplete for every knob, typos are type errors.
- **Build-time Zod validation** with human error messages pointing at the config path.
- **Scaffolding:** `pnpm new:section <name>` generates section folder (index/schema/variant/README) pre-wired to registry. Same pattern later for `new:theme`, `new:preset`.
- **Showcase route:** `/showcase` (dev-only) renders every section × every variant under the active theme; `?theme=` query switches themes. This is the contributor's visual test bench and doubles as the docs screenshots source.
- **Docs in-repo:** `docs/sections.md`, `docs/themes.md` (theme authoring spec), `docs/motion.md`, `docs/plugins.md`, `CONTRIBUTING.md` with the section/theme acceptance checklist (responsive, dark+light, reduced-motion, all 4 themes).
- **Quality gates:** `tsc --noEmit` + ESLint + a `validate-registries` script (every section has schema, defaultVariant exists, every preset has reducedMotion) in CI.

## 10. Scalability Strategy

- Registry pattern everywhere → adding sections/themes/presets never touches core.
- `next/dynamic` per section variant → bundle scales with what a user enables, not with catalog size.
- Only the configured theme's `tokens.css` + fonts are imported (config is static → tree-shaking works).
- RSC-first: motion wrappers are the only client boundary.
- `src/folio/` has zero imports from app/config → v2 monorepo extraction is a file move: `packages/core`, `packages/sections`, `packages/themes`, `packages/cli` (shadcn-style `folio add <section>` copying from the same registry metadata).

---

## Implementation Phases (build order)

**Phase 1 — Skeleton + core (foundation everything depends on)**
Scaffold Next.js 15 + TS + Tailwind v4 + pnpm. Build `folio/core/` (types, Registry, define helpers, Zod schemas, renderer). Base `ui/` primitives + SkinContext. `site.config.ts` + content file schemas. One theme (luxury-minimal) + 3 presets (fade-up, blur-reveal, stagger-grid) + 3 sections (hero, projects, contact) to prove the whole pipeline end-to-end.

**Phase 2 — Section catalog**
Remaining 9 core sections with variants + content schemas. MDX pipeline (content-collections) + case-studies/blog routes.

**Phase 3 — Themes**
terminal, editorial, bento — full token sheets, skins, motion languages, fonts. `/showcase` route. 8 theme stubs with SPEC.md.

**Phase 4 — Motion catalog + modules**
Remaining presets (typewriter, cinematic-reveal, parallax, floating-cards, magnetic, spotlight, tilt) with mobile/reduced-motion fallbacks. Developer + designer modules as plugins; plugin merge logic; 3 module stubs.

**Phase 5 — DX + open-source polish**
`new:section` scaffolder, validate-registries CI script, docs/, CONTRIBUTING.md, README with quickstart, example configs per profession (`examples/*.config.ts`), demo content.

## Verification

- `pnpm build` passes with default config; deliberately break config (bad theme id, bad url in projects) → build fails with pointed Zod message.
- Run dev server; verify each of 4 themes end-to-end via `theme:` swap — nav, cards, typography, motion language all change character, dark+light both.
- `/showcase` renders all sections × variants under each theme with no layout breakage at 360px / 768px / 1440px.
- Toggle `enabled: false`, reorder `sections[]`, override `variant`/`motion` per section → page reflects config.
- OS reduced-motion on → animations collapse to fades; `motion.intensity: "off"` → static page.
- Activate `modules: ["developer"]` → github-stats/tech-stack sections available; omit → using their ids fails build with clear error.
- Lighthouse on built output: perf ≥ 95, a11y ≥ 95 for luxury-minimal + terminal.
