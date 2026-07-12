"use client";

import type { SectionDefinition } from "@/folio/core/types";

export function AddSectionButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center py-2">
      <button
        type="button"
        onClick={onClick}
        title="Insert a section here"
        className="flex items-center gap-1.5 rounded-full border border-zinc-600 bg-zinc-950 px-3.5 py-1.5 text-xs text-zinc-300 shadow transition-colors hover:border-emerald-400 hover:text-emerald-300"
      >
        <span className="text-sm leading-none">＋</span> Add section
      </button>
    </div>
  );
}

export function AddSectionDrawer({
  sections,
  onPick,
  onClose,
}: {
  sections: SectionDefinition[];
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  const byCategory = new Map<string, SectionDefinition[]>();
  for (const def of sections) {
    const list = byCategory.get(def.category) ?? [];
    list.push(def);
    byCategory.set(def.category, list);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-black/50"
      />
      <aside className="fixed inset-y-0 right-0 z-[90] w-full max-w-sm overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-5 text-zinc-100">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Add section
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-200"
          >
            esc
          </button>
        </div>

        {[...byCategory.entries()].map(([category, defs]) => (
          <div key={category} className="mb-6">
            <h3 className="mb-2 text-xs uppercase tracking-[0.25em] text-emerald-300">
              {category}
            </h3>
            <div className="flex flex-col gap-2">
              {defs.map((def) => (
                <button
                  key={def.id}
                  type="button"
                  onClick={() => onPick(def.id)}
                  className="rounded border border-zinc-700 p-3 text-left transition-colors hover:border-emerald-400"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{def.name}</span>
                    <span className="text-xs text-zinc-500">
                      {Object.keys(def.variants).length} variant
                      {Object.keys(def.variants).length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    {def.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
