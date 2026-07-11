"use client";

import { useState } from "react";
import type { ColorOverrides, ColorTokenOverrides } from "@/folio/core/types";
import { cn } from "@/lib/utils";

const TOKENS: Array<{ key: keyof ColorTokenOverrides; label: string }> = [
  { key: "primary", label: "primary" },
  { key: "secondary", label: "secondary" },
  { key: "tertiary", label: "tertiary" },
  { key: "background", label: "background" },
  { key: "foreground", label: "foreground" },
  { key: "muted", label: "muted" },
  { key: "border", label: "border" },
  { key: "card", label: "card" },
];

type Scope = "both" | "light" | "dark";
const HEX = /^#[0-9a-fA-F]{6}$/;

function getScopeTokens(colors: ColorOverrides | undefined, scope: Scope): ColorTokenOverrides {
  if (!colors) return {};
  if (scope === "both") {
    const both = { ...colors };
    delete both.light;
    delete both.dark;
    return both;
  }
  return colors[scope] ?? {};
}

/** Drops empty strings / empty sub-objects so state stays minimal. */
function cleanColors(colors: ColorOverrides): ColorOverrides | undefined {
  const clean = (tokens: ColorTokenOverrides): ColorTokenOverrides =>
    Object.fromEntries(
      Object.entries(tokens).filter(([, value]) => value && String(value).trim()),
    );
  const { light, dark, ...both } = colors;
  const result: ColorOverrides = { ...clean(both) };
  const cleanLight = light ? clean(light) : {};
  const cleanDark = dark ? clean(dark) : {};
  if (Object.keys(cleanLight).length) result.light = cleanLight;
  if (Object.keys(cleanDark).length) result.dark = cleanDark;
  return Object.keys(result).length ? result : undefined;
}

export function ColorForm({
  colors,
  onChange,
}: {
  colors: ColorOverrides | undefined;
  onChange: (colors: ColorOverrides | undefined) => void;
}) {
  const [scope, setScope] = useState<Scope>("both");
  const tokens = getScopeTokens(colors, scope);

  const setToken = (key: keyof ColorTokenOverrides, value: string) => {
    const next: ColorOverrides = { ...(colors ?? {}) };
    if (scope === "both") {
      next[key] = value || undefined;
    } else {
      next[scope] = { ...(next[scope] ?? {}), [key]: value || undefined };
    }
    onChange(cleanColors(next));
  };

  return (
    <div className="border-t border-zinc-800 px-4 py-3">
      <div className="mb-3 flex items-center gap-2">
        {(["both", "light", "dark"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setScope(tab)}
            className={cn(
              "rounded border px-2.5 py-0.5 text-xs transition-colors",
              scope === tab
                ? "border-emerald-400 text-emerald-300"
                : "border-zinc-700 text-zinc-400 hover:text-zinc-200",
            )}
          >
            {tab === "both" ? "both modes" : tab}
          </button>
        ))}
        <span className="ms-2 text-xs text-zinc-500">
          any CSS color works — hex, oklch(), hsl(). Empty = theme default.
        </span>
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="ms-auto rounded border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-400 hover:text-zinc-200"
        >
          clear all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
        {TOKENS.map(({ key, label }) => {
          const value = tokens[key] ?? "";
          return (
            <label key={key} className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-20 shrink-0">{label}</span>
              <input
                type="color"
                value={HEX.test(value) ? value : "#888888"}
                onChange={(event) => setToken(key, event.target.value)}
                className="h-6 w-7 shrink-0 cursor-pointer rounded border border-zinc-700 bg-transparent"
                aria-label={`${label} color picker`}
              />
              <input
                type="text"
                value={value}
                placeholder="theme"
                onChange={(event) => setToken(key, event.target.value)}
                className="w-full min-w-0 rounded border border-zinc-700 bg-zinc-900 px-1.5 py-1 font-mono text-[0.7rem] text-zinc-200 placeholder:text-zinc-600"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
