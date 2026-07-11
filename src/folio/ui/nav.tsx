import type { NavProps } from "@/folio/core/types";

/**
 * Default topbar nav. Links are anchor jumps to section shells (each shell
 * renders id={sectionId}). Themes override this skin for floating / sidebar /
 * command-palette navigation.
 */
export function Nav({ name, items }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[var(--f-maxw)] items-center justify-between px-6 py-4">
        <a href="#top" className="font-heading text-lg text-foreground">
          {name}
        </a>
        <div className="hidden items-center gap-6 sm:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
