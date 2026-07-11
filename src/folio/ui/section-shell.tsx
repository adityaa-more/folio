import type { SectionShellProps } from "@/folio/core/types";
import { cn } from "@/lib/utils";

/**
 * Default section wrapper: vertical rhythm + centered measure, both driven
 * by theme tokens. Themes override this skin to add rules, alternating
 * backgrounds, grid gutters, etc.
 */
export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section id={id} className={cn("py-[calc(var(--f-space-section)/2)]", className)}>
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">{children}</div>
    </section>
  );
}
