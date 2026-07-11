import type { CodeShowcaseContent } from "@/folio/modules/developer/sections/code-showcase/schema";

export const codeShowcase: CodeShowcaseContent = {
  heading: "Code I'm proud of",
  kicker: "Small and sharp",
  snippets: [
    {
      title: "registry.ts",
      language: "TypeScript",
      description:
        "The whole extension system in 30 lines — duplicates fail loudly, unknown ids list what exists.",
      code: `export class Registry<T extends { id: string }> {
  private map = new Map<string, T>();

  register(item: T): void {
    if (this.map.has(item.id)) {
      throw new Error(\`Duplicate id "\${item.id}"\`);
    }
    this.map.set(item.id, item);
  }

  get(id: string): T {
    const item = this.map.get(id);
    if (!item) {
      throw new Error(
        \`Unknown "\${id}". Available: \${[...this.map.keys()].join(", ")}\`,
      );
    }
    return item;
  }
}`,
    },
    {
      title: "use-event-fold.ts",
      language: "TypeScript",
      description:
        "Ledger projection folding — the core of the 40-minutes-to-0.8s reporting rewrite.",
      code: `export function fold<S, E>(
  events: readonly E[],
  reducer: (state: S, event: E) => S,
  initial: S,
): S {
  let state = initial;
  for (const event of events) {
    state = reducer(state, event);
  }
  return state;
}`,
    },
  ],
};
