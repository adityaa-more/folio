"use client";

import { buildSkeleton, type ZodLike } from "@/folio/builder/skeleton";
import { cn } from "@/lib/utils";

/**
 * Generic form field driven by a section's Zod schema (zod v4 `def.type`
 * introspection). Renders inputs for primitives, fieldsets for objects,
 * repeatable rows for arrays, key/value rows for records, and a type
 * selector for discriminated unions (bento tiles).
 */

const TEXTAREA_KEY =
  /(description|summary|text|quote|paragraph|answer|bio|tagline|intro|subheadline)/i;
const IMAGE_KEY = /(^src$|image|avatar|cover)/i;

function labelFor(key: string): string {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Strips optional/default wrappers; reports whether the field may be empty. */
function unwrap(schema: ZodLike): { inner: ZodLike; optional: boolean } {
  let inner = schema;
  let optional = false;
  while (inner.def.type === "optional" || inner.def.type === "default" || inner.def.type === "nullable") {
    if (inner.def.type === "optional" || inner.def.type === "nullable") optional = true;
    inner = inner.def.innerType as ZodLike;
  }
  return { inner, optional };
}

const inputClass =
  "w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-400 focus:outline-none";

export function Field({
  name,
  schema,
  value,
  onChange,
}: {
  name: string;
  schema: ZodLike;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const { inner, optional } = unwrap(schema);
  const def = inner.def;

  const label = (
    <span className="mb-1 block text-xs font-medium text-zinc-400">
      {labelFor(name)}
      {optional ? <span className="ms-1 text-zinc-600">(optional)</span> : null}
    </span>
  );

  switch (def.type) {
    case "string": {
      const text = typeof value === "string" ? value : "";
      const isTextarea = TEXTAREA_KEY.test(name) || text.length > 90;
      const isImage = IMAGE_KEY.test(name) && /^https?:\/\//.test(text);
      const commit = (raw: string) =>
        onChange(raw === "" && optional ? undefined : raw);
      return (
        <label className="block">
          {label}
          {isTextarea ? (
            <textarea
              value={text}
              rows={3}
              onChange={(event) => commit(event.target.value)}
              className={inputClass}
            />
          ) : (
            <input
              type="text"
              value={text}
              onChange={(event) => commit(event.target.value)}
              className={inputClass}
            />
          )}
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={text}
              alt=""
              className="mt-2 h-16 w-24 rounded border border-zinc-700 object-cover"
            />
          ) : null}
        </label>
      );
    }

    case "number": {
      const num = typeof value === "number" ? String(value) : "";
      return (
        <label className="block">
          {label}
          <input
            type="number"
            value={num}
            onChange={(event) => {
              const raw = event.target.value;
              onChange(raw === "" ? undefined : Number(raw));
            }}
            className={inputClass}
          />
        </label>
      );
    }

    case "boolean":
      return (
        <label className="flex items-center gap-2 text-xs font-medium text-zinc-400">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            className="size-3.5 accent-emerald-400"
          />
          {labelFor(name)}
        </label>
      );

    case "enum": {
      const options = (inner.options ?? []) as string[];
      return (
        <label className="block">
          {label}
          <select
            value={typeof value === "string" ? value : (options[0] ?? "")}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    }

    case "literal":
      return null; // fixed by the schema (e.g. discriminator) — nothing to edit

    case "object": {
      const objectValue = (value ?? {}) as Record<string, unknown>;
      return (
        <fieldset className="rounded border border-zinc-800 p-3">
          <legend className="px-1 text-xs font-medium text-zinc-500">
            {labelFor(name)}
          </legend>
          <div className="flex flex-col gap-3">
            {Object.entries(inner.shape ?? {}).map(([key, childSchema]) => (
              <Field
                key={key}
                name={key}
                schema={childSchema}
                value={objectValue[key]}
                onChange={(childValue) =>
                  onChange({ ...objectValue, [key]: childValue })
                }
              />
            ))}
          </div>
        </fieldset>
      );
    }

    case "array": {
      const items = Array.isArray(value) ? value : [];
      const element = inner.element as ZodLike;
      const move = (index: number, delta: number) => {
        const target = index + delta;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
      };
      return (
        <div>
          {label}
          <div className="flex flex-col gap-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded border border-zinc-800 bg-zinc-950/50 p-2.5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-wider text-zinc-600">
                    {labelFor(name)} {index + 1}
                  </span>
                  <span className="flex gap-1">
                    <button type="button" title="Move up" onClick={() => move(index, -1)}
                      className="rounded border border-zinc-700 px-1.5 text-xs text-zinc-400 hover:border-zinc-500">↑</button>
                    <button type="button" title="Move down" onClick={() => move(index, 1)}
                      className="rounded border border-zinc-700 px-1.5 text-xs text-zinc-400 hover:border-zinc-500">↓</button>
                    <button
                      type="button"
                      title="Remove"
                      onClick={() => onChange(items.filter((_, i) => i !== index))}
                      className="rounded border border-zinc-700 px-1.5 text-xs text-red-400 hover:border-red-500"
                    >
                      ✕
                    </button>
                  </span>
                </div>
                <ElementField
                  name={name}
                  schema={element}
                  value={item}
                  onChange={(itemValue) =>
                    onChange(items.map((v, i) => (i === index ? itemValue : v)))
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange([...items, buildSkeleton(element, name)])}
              className="self-start rounded border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 hover:border-emerald-400 hover:text-emerald-300"
            >
              ＋ add {labelFor(name).toLowerCase().replace(/s$/, "")}
            </button>
          </div>
        </div>
      );
    }

    case "record": {
      const recordValue = (value ?? {}) as Record<string, string>;
      const entries = Object.entries(recordValue);
      return (
        <div>
          {label}
          <div className="flex flex-col gap-1.5">
            {entries.map(([key, entryValue], index) => (
              <div key={index} className="flex gap-1.5">
                <input
                  type="text"
                  value={key}
                  placeholder="name (e.g. github)"
                  onChange={(event) => {
                    const next = entries.map(([k, v], i) =>
                      i === index ? [event.target.value, v] : [k, v],
                    );
                    onChange(Object.fromEntries(next));
                  }}
                  className={cn(inputClass, "w-32 shrink-0")}
                />
                <input
                  type="text"
                  value={entryValue}
                  placeholder="https://…"
                  onChange={(event) => {
                    const next = { ...recordValue, [key]: event.target.value };
                    onChange(next);
                  }}
                  className={inputClass}
                />
                <button
                  type="button"
                  title="Remove"
                  onClick={() => {
                    const next = { ...recordValue };
                    delete next[key];
                    onChange(Object.keys(next).length ? next : optional ? undefined : {});
                  }}
                  className="shrink-0 rounded border border-zinc-700 px-2 text-xs text-red-400 hover:border-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...recordValue, "": "" })}
              className="self-start rounded border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 hover:border-emerald-400 hover:text-emerald-300"
            >
              ＋ add entry
            </button>
          </div>
        </div>
      );
    }

    case "union": {
      // Discriminated union (bento tiles): type selector + branch fields.
      const discriminator = def.discriminator;
      const branches = (def.options ?? []) as ZodLike[];
      if (!discriminator || branches.length === 0) return null;

      const branchTag = (branch: ZodLike): string =>
        String(branch.shape?.[discriminator]?.def.values?.[0] ?? "");
      const currentTag = String(
        (value as Record<string, unknown> | undefined)?.[discriminator] ??
          branchTag(branches[0]),
      );
      const currentBranch =
        branches.find((branch) => branchTag(branch) === currentTag) ?? branches[0];
      const objectValue = (value ?? {}) as Record<string, unknown>;

      return (
        <div className="flex flex-col gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-zinc-400">
              {labelFor(discriminator)}
            </span>
            <select
              value={currentTag}
              onChange={(event) => {
                const nextBranch = branches.find(
                  (branch) => branchTag(branch) === event.target.value,
                );
                if (nextBranch)
                  onChange(buildSkeleton(nextBranch, name) as Record<string, unknown>);
              }}
              className={inputClass}
            >
              {branches.map((branch) => (
                <option key={branchTag(branch)} value={branchTag(branch)}>
                  {branchTag(branch)}
                </option>
              ))}
            </select>
          </label>
          {Object.entries(currentBranch.shape ?? {})
            .filter(([key]) => key !== discriminator)
            .map(([key, childSchema]) => (
              <Field
                key={key}
                name={key}
                schema={childSchema}
                value={objectValue[key]}
                onChange={(childValue) =>
                  onChange({ ...objectValue, [key]: childValue })
                }
              />
            ))}
        </div>
      );
    }

    default:
      return (
        <p className="text-xs text-amber-400">
          Field &quot;{name}&quot; ({def.type}) isn&apos;t editable here — edit its file
          directly.
        </p>
      );
  }
}

/**
 * Array elements skip the redundant fieldset border when the element is an
 * object — the row container already frames it.
 */
function ElementField({
  name,
  schema,
  value,
  onChange,
}: {
  name: string;
  schema: ZodLike;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const { inner } = unwrap(schema);
  if (inner.def.type === "object") {
    const objectValue = (value ?? {}) as Record<string, unknown>;
    return (
      <div className="flex flex-col gap-3">
        {Object.entries(inner.shape ?? {}).map(([key, childSchema]) => (
          <Field
            key={key}
            name={key}
            schema={childSchema}
            value={objectValue[key]}
            onChange={(childValue) =>
              onChange({ ...objectValue, [key]: childValue })
            }
          />
        ))}
      </div>
    );
  }
  return <Field name={name} schema={schema} value={value} onChange={onChange} />;
}
