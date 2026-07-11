import type { SectionHeadingProps } from "@/folio/core/types";
import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10", className)}>
      <h2 className="font-heading text-3xl tracking-[var(--f-tracking)] text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-prose text-base text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
