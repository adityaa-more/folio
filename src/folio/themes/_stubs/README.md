# Theme stubs — contribution targets

Each folder here specs a theme that is designed but not yet built. Pick one,
follow its SPEC.md, and use the four shipped themes as reference
implementations (`luxury-minimal`, `terminal`, `editorial`, `bento`).

## Anatomy of a theme

```
themes/<id>/
├── fonts.ts     # next/font instances (preload: false), export <id>FontClassName
├── tokens.css   # [data-theme="<id>"] { --f-* } + dark block (both selectors:
│                #   [data-theme="<id>"].dark  AND  .dark [data-theme="<id>"])
├── skins.tsx    # Partial<SkinComponents> — override rendering STRUCTURE, not just colors
└── index.ts     # defineTheme({...}) — id, fonts, skins, motionLanguage, layout
```

Then: register in `themes/registry.ts`, add the tokens.css @import in
`app/globals.css`.

## Acceptance checklist

- [ ] Light AND dark token sets
- [ ] Skins reinterpret structure (a Card should be recognizably different from every other theme, not a palette swap)
- [ ] Motion language tuned: sectionEnter preset, stagger, durationScale, easing, hover verb
- [ ] All 12 sections × variants readable in `/showcase?theme=<id>` at 360 / 768 / 1440 px
- [ ] Honors reduced motion (comes free if you stick to MotionBlock + tokens)
- [ ] No hardcoded colors — everything through `--f-*` tokens
