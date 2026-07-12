/**
 * Builds a starter draft value for a section's content from its Zod schema —
 * used when a section is added in the builder before any content exists, and
 * as the template for new array rows in the content form.
 *
 * Introspection targets zod v4: every schema exposes `def.type` plus
 * type-specific fields (shape / element / options / innerType / values).
 */

export interface ZodLike {
  def: {
    type: string;
    innerType?: ZodLike;
    defaultValue?: unknown;
    discriminator?: string;
    options?: ZodLike[];
    values?: unknown[];
    valueType?: ZodLike;
  };
  shape?: Record<string, ZodLike>;
  element?: ZodLike;
  options?: unknown[];
  safeParse: (value: unknown) => {
    success: boolean;
    data?: unknown;
    error?: { issues: Array<{ path: PropertyKey[]; message: string }> };
  };
}

const PLACEHOLDER: Record<string, string> = {
  headline: "Your headline here",
  heading: "Heading",
  title: "Title",
  name: "Name",
  label: "Label",
  question: "Your question?",
  answer: "Your answer.",
  quote: "A short quote.",
  author: "Author Name",
  email: "you@example.com",
  src: "https://picsum.photos/seed/folio/800/600",
  alt: "Describe the image",
  href: "#",
  url: "https://example.com",
  link: "https://example.com",
  slug: "example",
  summary: "One-line summary.",
  description: "Short description.",
  role: "Role",
  company: "Company",
  start: "2024",
  value: "42",
  username: "yourname",
};

function placeholderFor(key: string): string {
  const lower = key.toLowerCase();
  for (const [match, text] of Object.entries(PLACEHOLDER)) {
    if (lower === match || lower.endsWith(match)) return text;
  }
  return "Text";
}

export function buildSkeleton(schema: ZodLike, key = ""): unknown {
  const def = schema.def;
  switch (def.type) {
    case "default":
      return def.defaultValue;
    case "optional":
    case "nullable":
      return undefined;
    case "string":
      return placeholderFor(key);
    case "number": {
      const lower = key.toLowerCase();
      if (lower.includes("percent")) return 50;
      if (lower.includes("level")) return 3;
      return 1;
    }
    case "boolean":
      return false;
    case "enum":
      return (schema.options as unknown[])?.[0];
    case "literal":
      return def.values?.[0];
    case "array":
      return [buildSkeleton(schema.element as ZodLike, key)];
    case "object": {
      const result: Record<string, unknown> = {};
      for (const [k, child] of Object.entries(schema.shape ?? {})) {
        const v = buildSkeleton(child, k);
        if (v !== undefined) result[k] = v;
      }
      return result;
    }
    case "union":
      return buildSkeleton((def.options as ZodLike[])[0], key);
    case "record":
      return {};
    default:
      return undefined;
  }
}
