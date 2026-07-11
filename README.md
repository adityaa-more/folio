# Folio

**The universal portfolio framework.** Not a template — a section-driven, theme-driven, config-driven system for building portfolios that don't look like anyone else's.

Think *shadcn/ui for portfolio websites*: composable section blocks, complete visual systems (not palette swaps), a motion preset library, and profession modules — all driven from one typed config file, with a visual builder on top.

```
Next.js 16 · TypeScript · Tailwind CSS v4 · Motion (framer-motion) · Zod · MDX
```

## Why

Every portfolio template locks you into one look. Folio inverts it:

- **16+ section blocks** (hero, projects, experience, skills, testimonials, metrics, gallery, bento, FAQ, case studies…), each with multiple layouts
- **4 complete themes** that change typography, spacing, borders, nav design, and animation language — Luxury Minimal, Terminal, Editorial, Interactive Bento (+8 spec'd for contribution)
- **Motion presets** (`blur-reveal`, `cinematic-reveal`, `stagger-grid`, `floating-cards`…) applied per section, with reduced-motion fallbacks built into the contract
- **Full palette override** — primary/secondary/tertiary + every token, per light/dark mode, in config
- **Profession modules** — `modules: ["developer"]` adds GitHub stats, tech stack, code showcase; `designer` adds visual case studies. Modules are plugins; third parties can ship their own
- **Visual builder** at `/builder` — click together theme, sections, layouts, animations, colors; Save writes your config file

## Quickstart

```bash
# 1. fork/clone, then
pnpm install
pnpm dev

# 2. build visually
open http://localhost:3000/builder

# 3. or edit config directly
#    src/config/site.config.ts   ← theme, sections, colors, motion
#    src/config/content/*.ts     ← your actual text/data
#    content/case-studies/*.mdx  ← long-form writing

# 4. ship
pnpm build
```

## The config is the product

```ts
// src/config/site.config.ts
export default defineConfig({
  profile: { name: "You", profession: "Developer", /* … */ },

  theme: "terminal",            // one string = complete restyle
  mode: "system",

  colors: {                      // make any theme yours
    primary: "#e8a33d",
    dark: { primary: "#ffd166" },
  },

  modules: ["developer"],        // profession sections

  sections: [                    // order = page order
    { id: "hero", variant: "split" },
    { id: "github-stats" },
    { id: "projects", variant: "grid", motion: "stagger-grid" },
    { id: "skills", enabled: false },   // toggled off, config kept
    { id: "contact" },
  ],

  motion: { intensity: "normal" },
});
```

Reorder the array to rearrange the page. Every id, variant, and preset is validated at build time — typos fail the build with a message that tells you what exists.

## Explore

| Route | What |
|---|---|
| `/` | Your portfolio |
| `/builder` | Visual builder (dev-only) — edits + saves your config |
| `/showcase` | Every section × variant under any theme (dev-only) — the contributor test bench |
| `/case-studies/[slug]`, `/blog/[slug]` | MDX long-form pages |

## Themes

Each theme is a complete visual system: design tokens, component *skins* (a Terminal card renders prompt chrome; an Editorial card is a ruled magazine row — structural, not cosmetic), and a motion language (easing, speed, stagger, hover verb).

Shipped: `luxury-minimal` · `terminal` · `editorial` · `bento`.
Spec'd for contribution (see `src/folio/themes/_stubs/`): cinematic, cyber-grid, floating-glass, brutalist-motion, saas, magazine-story, immersive-scroll, dashboard.

## Extend

```bash
pnpm new:section awards        # scaffolds a section block, pre-wired
```

- Sections: [docs/sections.md](docs/sections.md)
- Themes: [docs/themes.md](docs/themes.md)
- Motion presets: [docs/motion.md](docs/motion.md)
- Modules & plugins: [docs/plugins.md](docs/plugins.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)

Example configs per profession live in [examples/](examples/).

## Deploy (no GitHub account needed)

You don't need a GitHub account to use or ship Folio. Grab the code, edit it, deploy it.

**1. Get the code** — either:
- **Download ZIP** — on the repo page, *Code → Download ZIP*, then unzip. (No account, no git.)
- **Clone** — `git clone <repo-url>` (public repo needs no login, just git installed).

**2. Make it yours:**
```bash
cd folio
pnpm install
pnpm dev            # edit at http://localhost:3000/builder,
                    # or hand-edit src/config/site.config.ts + src/config/content/
```

**3. Deploy free to Vercel via CLI** — no GitHub, just one free Vercel account:
```bash
npm i -g vercel
vercel              # first run: sign up / log in (email works — GitHub not required)
                    # accept the defaults, it auto-detects Next.js
vercel --prod       # publish — you get a *.vercel.app URL
```

The deploy folder is the **repo root** — single Next.js app, nothing to configure. Re-run `vercel --prod` to publish future edits. `/builder` and `/showcase` auto-disable in the production build.

> Hosting anywhere needs one account with that host (Vercel/Netlify/etc.) — that's unavoidable. But no version-control account is required.

## Accessibility & performance

Reduced-motion fallback is part of the motion-preset contract (required field, not an afterthought). Sections render on the server; the only client JS in the render path is the motion layer (LazyMotion, domAnimation subset). Static output — deploy anywhere.

## License

[MIT](LICENSE)
