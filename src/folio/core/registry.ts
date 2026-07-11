/**
 * Generic id-keyed registry. Sections, themes, and motion presets each get
 * one. Plugins extend registries via `withItems` — duplicates fail loudly so
 * two plugins can never silently shadow each other.
 */
export class Registry<T extends { id: string }> {
  private map: Map<string, T>;

  constructor(
    private readonly kind: string,
    items: T[] = [],
  ) {
    this.map = new Map();
    for (const item of items) this.register(item);
  }

  register(item: T): void {
    if (this.map.has(item.id)) {
      throw new Error(
        `[folio] Duplicate ${this.kind} id "${item.id}". Every ${this.kind} needs a unique id.`,
      );
    }
    this.map.set(item.id, item);
  }

  has(id: string): boolean {
    return this.map.has(id);
  }

  get(id: string): T {
    const item = this.map.get(id);
    if (!item) {
      throw new Error(
        `[folio] Unknown ${this.kind} "${id}". Available: ${[...this.map.keys()].join(", ")}`,
      );
    }
    return item;
  }

  all(): T[] {
    return [...this.map.values()];
  }

  ids(): string[] {
    return [...this.map.keys()];
  }

  /** New registry containing this one's items plus `items`. */
  withItems(items: T[]): Registry<T> {
    return new Registry(this.kind, [...this.all(), ...items]);
  }
}
