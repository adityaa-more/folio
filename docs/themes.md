# Themes

A theme is a complete visual system in three layers. Full anatomy + acceptance checklist: [`src/folio/themes/_stubs/README.md`](../src/folio/themes/_stubs/README.md). Eight spec'd stub themes await implementation there.

## Layer 1 — tokens (`tokens.css`)

Scoped CSS variables; both selector forms for dark so root pages AND wrapper previews (`/showcase`, `/builder`) work:

```css
[data-theme="my-theme"] { --f-bg: …; --f-fg: …; --f-accent: …; --f-accent-2: …;
  --f-accent-3: …; --f-muted: …; --f-border: …; --f-card: …; --f-radius: …;
  --f-shadow: …; --f-tracking: …; --f-space-section: …; --f-maxw: …;
  --f-font-heading: …; --f-font-body: …; }
[data-theme="my-theme"].dark, .dark [data-theme="my-theme"] { /* dark values */ }
```

Add the sheet to `src/app/globals.css` `@import` list. Sheets are inert unless their `data-theme` matches — coexistence is free. User `colors` config overrides any token with `!important` — never rely on a token being exactly your value.

## Layer 2 — skins (`skins.tsx`)

Override any subset of `SkinComponents` (SectionShell, SectionHeading, Card, Button, Badge, Nav, Footer). **Reinterpret structure, not color**: Terminal's SectionShell prints a shell prompt; Editorial's prints a thick rule + folio number. Unoverridden skins fall back to `src/folio/ui/` defaults.

## Layer 3 — motion language (`index.ts`)

```ts
motionLanguage: {
  sectionEnter: "blur-reveal",   // default preset for every section
  stagger: 0.12,
  hover: "none" | "lift" | "glow" | "scale" | "invert",
  easing: [0.22, 1, 0.36, 1],
  durationScale: 1.25,           // luxury slow ≈1.25, terminal snappy ≈0.5
}
```

## Fonts (`fonts.ts`)

`next/font` instances with `preload: false` (all registered themes' fonts enter the module graph; only the active one should cost bandwidth). Export a joined `variable` className; reference the vars in your tokens.

## Register

Add to `src/folio/themes/registry.ts`. Verify in `/showcase?theme=my-theme` — every section, both modes, three breakpoints.
