"use client";

import { useState } from "react";
import type { SectionDefinition } from "@/folio/core/types";
import type { ZodLike } from "@/folio/builder/skeleton";
import { Field } from "./field";

/**
 * Right-side drawer for editing one section's content. Works on a local
 * draft; Apply validates against the section's schema and hands the parsed
 * value back (live preview updates instantly). Nothing touches disk until
 * the builder's global Save.
 */
export function ContentPanel({
  def,
  initialValue,
  readOnlyReason,
  onApply,
  onClose,
}: {
  def: SectionDefinition;
  initialValue: unknown;
  /** Set for derived content (case-studies) — panel renders a notice only. */
  readOnlyReason?: string;
  onApply: (parsed: unknown) => void;
  onClose: () => void;
}) {
  const schema = def.schema as unknown as ZodLike;
  const [draft, setDraft] = useState<unknown>(initialValue);
  const [errors, setErrors] = useState<string[]>([]);

  const apply = () => {
    const result = schema.safeParse(draft);
    if (!result.success) {
      setErrors(
        (result.error?.issues ?? []).map(
          (issue) =>
            `${issue.path.join(".") || "(root)"} — ${issue.message}`,
        ),
      );
      return;
    }
    setErrors([]);
    onApply(result.data);
  };

  const rootShape = (schema as ZodLike).shape ?? {};

  return (
    <>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-black/50"
      />
      <aside className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 text-zinc-100">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
          <h2 className="text-sm font-semibold">
            Edit content — <span className="text-emerald-300">{def.name}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-200"
          >
            esc
          </button>
        </div>

        {readOnlyReason ? (
          <p className="m-5 rounded border border-amber-600/50 bg-amber-950/30 p-4 text-sm text-amber-300">
            {readOnlyReason}
          </p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex flex-col gap-4">
                {Object.entries(rootShape).map(([key, childSchema]) => (
                  <Field
                    key={key}
                    name={key}
                    schema={childSchema}
                    value={(draft as Record<string, unknown> | undefined)?.[key]}
                    onChange={(childValue) =>
                      setDraft({
                        ...((draft ?? {}) as Record<string, unknown>),
                        [key]: childValue,
                      })
                    }
                  />
                ))}
              </div>
            </div>

            {errors.length > 0 ? (
              <div className="max-h-32 overflow-y-auto border-t border-red-900/50 bg-red-950/30 px-5 py-3">
                {errors.map((error) => (
                  <p key={error} className="text-xs text-red-400">
                    • {error}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-2 border-t border-zinc-800 px-5 py-3.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
              >
                cancel
              </button>
              <button
                type="button"
                onClick={apply}
                className="rounded bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
              >
                apply
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
