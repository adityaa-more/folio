import type { BadgeProps } from "@/folio/core/types";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-token border border-border px-2.5 py-0.5 text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
