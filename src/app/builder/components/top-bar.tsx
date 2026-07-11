"use client";

import { useState } from "react";
import type { ThemeDefinition } from "@/folio/core/types";
import type { BuilderState } from "@/folio/builder/types";
import { cn } from "@/lib/utils";
import { ColorForm } from "./color-form";

const INTENSITIES = ["off", "subtle", "normal", "expressive"] as const;
const MODES = ["light", "dark", "system"] as const;

export function TopBar({
  state,
  onChange,
  themes,
  onSave,
  onReset,
  onReplayAll,
  saving,
  status,
}: {
  state: BuilderState;
  onChange: (state: BuilderState) => void;
  themes: ThemeDefinition[];
  onSave: () => void;
  onReset: () => void;
  onReplayAll: () => void;
  saving: boolean;
  status: { kind: "ok" | "err"; text: string } | null;
}) {
  const [colorsOpen, setColorsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-[70] border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 text-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          folio builder
        </span>

        <span className="text-xs text-zinc-500">theme:</span>
        <div className="flex items-center gap-1.5">
          {themes.map((themeDef) => (
            <button
              key={themeDef.id}
              type="button"
              onClick={() => onChange({ ...state, theme: themeDef.id })}
              className={cn(
                "rounded border px-2.5 py-1 text-xs transition-colors",
                state.theme === themeDef.id
                  ? "border-emerald-400 text-emerald-300"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200",
              )}
            >
              {themeDef.name}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-zinc-400">
          mode
          <select
            value={state.mode}
            onChange={(event) =>
              onChange({ ...state, mode: event.target.value as BuilderState["mode"] })
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-1 text-zinc-200"
          >
            {MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs text-zinc-400">
          motion
          <select
            value={state.intensity}
            onChange={(event) =>
              onChange({
                ...state,
                intensity: event.target.value as BuilderState["intensity"],
              })
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-1 text-zinc-200"
          >
            {INTENSITIES.map((intensity) => (
              <option key={intensity} value={intensity}>
                {intensity}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() => setColorsOpen((open) => !open)}
          className={cn(
            "rounded border px-2.5 py-1 text-xs transition-colors",
            colorsOpen
              ? "border-emerald-400 text-emerald-300"
              : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200",
          )}
        >
          colors {state.colors && Object.keys(state.colors).length ? "●" : ""}
        </button>

        <button
          type="button"
          onClick={onReplayAll}
          className="rounded border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
        >
          replay animations
        </button>

        <div className="ms-auto flex items-center gap-2">
          {status ? (
            <span
              className={cn(
                "max-w-md truncate text-xs",
                status.kind === "ok" ? "text-emerald-300" : "text-red-400",
              )}
              title={status.text}
            >
              {status.text}
            </span>
          ) : null}
          <button
            type="button"
            onClick={onReset}
            className="rounded border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
          >
            reset
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded bg-emerald-500 px-3.5 py-1 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
          >
            {saving ? "saving…" : "save"}
          </button>
        </div>
      </div>

      <p className="border-t border-zinc-800/60 px-4 py-1.5 text-[0.7rem] text-zinc-500">
        Pick a theme to restyle everything · every section has Layout &
        Animation menus · ＋ adds a section · hide keeps a section in your
        config without showing it · Save writes src/config/site.config.ts
      </p>

      {colorsOpen ? (
        <ColorForm
          colors={state.colors}
          onChange={(colors) => onChange({ ...state, colors })}
        />
      ) : null}
    </div>
  );
}
