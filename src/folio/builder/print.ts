/**
 * Shared TS-source printer for builder-generated files. Stable, hand-formatted
 * output (2-space indent, trailing commas, keys unquoted when valid
 * identifiers) so repeated saves produce minimal git diffs.
 */

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export function printKey(key: string): string {
  return IDENTIFIER.test(key) ? key : JSON.stringify(key);
}

export function printValue(value: unknown, indent: string): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const inner = indent + "  ";
    const items = value.map((item) => `${inner}${printValue(item, inner)},`);
    return `[\n${items.join("\n")}\n${indent}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) return "{}";
    const inner = indent + "  ";
    const lines = entries.map(
      ([k, v]) => `${inner}${printKey(k)}: ${printValue(v, inner)},`,
    );
    return `{\n${lines.join("\n")}\n${indent}}`;
  }
  throw new Error(`[folio] Cannot serialize value of type ${typeof value}`);
}

/** Drops undefined entries and empty plain objects so output stays minimal. */
export function prune(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(prune);
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => [k, prune(v)] as const)
      .filter(
        ([, v]) =>
          v !== undefined &&
          !(
            v &&
            typeof v === "object" &&
            !Array.isArray(v) &&
            Object.keys(v).length === 0
          ),
      );
    return Object.fromEntries(entries);
  }
  return value;
}

export function camelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
}
