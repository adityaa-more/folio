"use client";

import { useEffect, useMemo, useState } from "react";
import { buildRegistries, resolveThemeRuntime } from "@/folio/core/renderer";
import { buildColorOverrideCss } from "@/folio/core/colors";
import type {
  ContentMap,
  NavItem,
  SectionDefinition,
  SiteConfig,
} from "@/folio/core/types";
import type {
  BuilderPassthrough,
  BuilderSectionEntry,
  BuilderState,
} from "@/folio/builder/types";
import { cn } from "@/lib/utils";
import { TopBar } from "./components/top-bar";
import { SectionFrame } from "./components/section-frame";
import { AddSectionButton, AddSectionDrawer } from "./components/add-section-drawer";

export function BuilderClient({
  initialState,
  passthrough,
  content,
}: {
  initialState: BuilderState;
  passthrough: BuilderPassthrough;
  content: ContentMap;
}) {
  const [state, setState] = useState<BuilderState>(initialState);
  const [replayNonce, setReplayNonce] = useState(0);
  const [drawerAt, setDrawerAt] = useState<number | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Merged registries (modules included) — same merge the renderer does.
  const registries = useMemo(
    () =>
      buildRegistries({ modules: passthrough.modules } as unknown as SiteConfig),
    [passthrough.modules],
  );

  const themeDef = registries.themes.get(state.theme);
  const theme = resolveThemeRuntime(themeDef);
  const { Nav, Footer, SectionShell } = theme.skins;

  // Preview dark mode on the real root so :root.dark override selectors match.
  useEffect(() => {
    const dark =
      state.mode === "dark" ||
      (state.mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  }, [state.mode]);

  const colorCss = buildColorOverrideCss(state.colors);

  const patchSection = (index: number, patch: Partial<BuilderSectionEntry>) =>
    setState((prev) => ({
      ...prev,
      sections: prev.sections.map((entry, i) =>
        i === index ? { ...entry, ...patch } : entry,
      ),
    }));

  const moveSection = (index: number, delta: -1 | 1) =>
    setState((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.sections.length) return prev;
      const sections = [...prev.sections];
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...prev, sections };
    });

  const removeSection = (index: number) =>
    setState((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));

  const insertSection = (index: number, id: string) => {
    setState((prev) => {
      const sections = [...prev.sections];
      sections.splice(index, 0, { id, enabled: true });
      return { ...prev, sections };
    });
    setDrawerAt(null);
  };

  const save = async () => {
    if (passthrough.hasPlugins) {
      setStatus({
        kind: "err",
        text: "Config uses code plugins — builder can't serialize those. Edit site.config.ts by hand.",
      });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      const response = await fetch("/api/builder/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state,
          passthrough: {
            profile: passthrough.profile,
            modules: passthrough.modules,
            respectReducedMotion: passthrough.respectReducedMotion,
          },
        }),
      });
      const body = await response.json();
      setStatus(
        response.ok
          ? { kind: "ok", text: "Saved to src/config/site.config.ts — refresh / to see it live." }
          : { kind: "err", text: body.error ?? "Save failed" },
      );
    } catch (error) {
      setStatus({ kind: "err", text: String(error) });
    } finally {
      setSaving(false);
    }
  };

  const navItems: NavItem[] = state.sections
    .filter((entry) => entry.enabled && registries.sections.has(entry.id))
    .map((entry) => {
      const def = registries.sections.get(entry.id);
      return def.navLabel ? { id: entry.id, label: def.navLabel } : null;
    })
    .filter((item): item is NavItem => item !== null);

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <TopBar
        state={state}
        onChange={setState}
        themes={registries.themes.all()}
        onSave={save}
        onReset={() => setState(initialState)}
        onReplayAll={() => setReplayNonce((nonce) => nonce + 1)}
        saving={saving}
        status={status}
      />

      {/* ------- live preview, theme-scoped like /showcase ------- */}
      <div
        data-theme={theme.id}
        className={cn(
          theme.fontClassName,
          "bg-background font-body text-foreground antialiased",
        )}
      >
        {colorCss ? <style dangerouslySetInnerHTML={{ __html: colorCss }} /> : null}

        <Nav name={passthrough.profile.name} items={navItems} />

        <main id="top">
          {state.sections.length === 0 ? (
            <div className="mx-auto flex min-h-[50vh] w-full max-w-[var(--f-maxw)] flex-col items-center justify-center px-6 text-center">
              <p className="font-heading text-2xl text-foreground">
                Blank canvas.
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Pick a theme up top, then add sections one at a time with the
                ＋ button below. Preview updates live; Save writes it to your
                config.
              </p>
            </div>
          ) : null}
          <AddSectionButton onClick={() => setDrawerAt(0)} />
          {state.sections.map((entry, index) => {
            if (!registries.sections.has(entry.id)) {
              return (
                <SectionFrame
                  key={`${entry.id}-${index}`}
                  entry={entry}
                  variants={[]}
                  presets={[]}
                  onPatch={(patch) => patchSection(index, patch)}
                  onMove={(delta) => moveSection(index, delta)}
                  onRemove={() => removeSection(index)}
                  error={`Unknown section "${entry.id}" — module inactive?`}
                />
              );
            }

            const def = registries.sections.get(entry.id) as SectionDefinition;
            const variantName = entry.variant ?? def.defaultVariant;
            const Variant = def.variants[variantName] ?? def.variants[def.defaultVariant];
            const presetId = entry.motion ?? theme.motionLanguage.sectionEnter;
            const preset = registries.presets.has(presetId)
              ? registries.presets.get(presetId)
              : registries.presets.get("fade-up");

            const raw = content[entry.id];
            const parsed = raw !== undefined ? def.schema.safeParse(raw) : null;

            return (
              <div key={`${entry.id}-${index}`}>
                <SectionFrame
                  entry={entry}
                  variants={Object.keys(def.variants)}
                  presets={registries.presets.ids()}
                  themePresetId={theme.motionLanguage.sectionEnter}
                  onPatch={(patch) => patchSection(index, patch)}
                  onMove={(delta) => moveSection(index, delta)}
                  onRemove={() => removeSection(index)}
                  error={
                    raw === undefined
                      ? `No content for "${entry.id}" — add an entry in src/config/content`
                      : parsed && !parsed.success
                        ? `Content invalid for "${entry.id}"`
                        : undefined
                  }
                >
                  {entry.enabled && parsed?.success ? (
                    <SectionShell id={`${entry.id}-${index}`} index={index}>
                      <Variant
                        key={`${variantName}-${presetId}-${state.theme}-${state.intensity}-${replayNonce}`}
                        content={parsed.data}
                        motion={preset}
                        theme={theme}
                        intensity={state.intensity}
                      />
                    </SectionShell>
                  ) : null}
                </SectionFrame>
                <AddSectionButton onClick={() => setDrawerAt(index + 1)} />
              </div>
            );
          })}
        </main>

        <Footer
          name={passthrough.profile.name}
          socials={passthrough.profile.socials}
        />
      </div>

      {drawerAt !== null ? (
        <AddSectionDrawer
          sections={registries.sections.all()}
          content={content}
          onPick={(id) => insertSection(drawerAt, id)}
          onClose={() => setDrawerAt(null)}
        />
      ) : null}
    </div>
  );
}
