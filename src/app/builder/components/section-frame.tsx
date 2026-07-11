"use client";

import type { ReactNode } from "react";
import type { BuilderSectionEntry } from "@/folio/builder/types";
import { cn } from "@/lib/utils";

export function SectionFrame({
  entry,
  variants,
  presets,
  themePresetId,
  onPatch,
  onMove,
  onRemove,
  error,
  children,
}: {
  entry: BuilderSectionEntry;
  variants: string[];
  presets: string[];
  themePresetId?: string;
  onPatch: (patch: Partial<BuilderSectionEntry>) => void;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  error?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group/frame relative border-y border-dashed border-transparent transition-colors",
        "hover:border-zinc-600",
        !entry.enabled && "opacity-100",
      )}
    >
      {/* control strip — builder chrome, deliberately theme-independent.
          Always visible: hover-revealed controls are invisible to non-devs. */}
      <div className="sticky top-[76px] z-[65] flex justify-center">
        <div className="pointer-events-auto -mb-9 flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/95 px-3 py-1.5 text-xs text-zinc-300 shadow-lg backdrop-blur">
          <span className="font-semibold text-emerald-300">{entry.id}</span>

          {variants.length > 1 ? (
            <label className="flex items-center gap-1 text-zinc-500" title="How this section is laid out">
              layout
              <select
                value={entry.variant ?? variants[0]}
                onChange={(event) => onPatch({ variant: event.target.value })}
                className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-1 text-zinc-200"
              >
                {variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {presets.length > 0 ? (
            <label
              className="flex items-center gap-1 text-zinc-500"
              title="How this section animates in — pick one to preview it instantly"
            >
              animation
              <select
                value={entry.motion ?? ""}
                onChange={(event) =>
                  onPatch({ motion: event.target.value || undefined })
                }
                className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-1 text-zinc-200"
              >
                <option value="">
                  theme default{themePresetId ? ` (${themePresetId})` : ""}
                </option>
                {presets.map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <button type="button" onClick={() => onMove(-1)} title="Move up"
            className="rounded border border-zinc-700 px-2 py-1 hover:border-zinc-500">↑</button>
          <button type="button" onClick={() => onMove(1)} title="Move down"
            className="rounded border border-zinc-700 px-2 py-1 hover:border-zinc-500">↓</button>
          <button
            type="button"
            onClick={() => onPatch({ enabled: !entry.enabled })}
            title={
              entry.enabled
                ? "Hide section — stays in your config, easy to bring back"
                : "Show section again"
            }
            className={cn(
              "rounded border px-2 py-1",
              entry.enabled
                ? "border-zinc-700 hover:border-zinc-500"
                : "border-amber-500 text-amber-300",
            )}
          >
            {entry.enabled ? "hide" : "show"}
          </button>
          <button type="button" onClick={onRemove} title="Remove section from the page"
            className="rounded border border-zinc-700 px-2 py-1 text-red-400 hover:border-red-500">✕</button>
        </div>
      </div>

      {error ? (
        <div className="mx-auto my-6 w-full max-w-[var(--f-maxw)] px-6">
          <p className="rounded border border-amber-600/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-300">
            {error}
          </p>
        </div>
      ) : null}

      {!entry.enabled && !error ? (
        <div className="mx-auto my-4 w-full max-w-[var(--f-maxw)] px-6">
          <p className="rounded border border-zinc-700 border-dashed px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-zinc-500">
            {entry.id} — hidden (saved as enabled: false)
          </p>
        </div>
      ) : null}

      {children}
    </div>
  );
}
