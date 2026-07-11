import type { ButtonProps } from "@/folio/core/types";
import { cn } from "@/lib/utils";

export function Button({ children, href, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-token px-5 py-2.5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-foreground text-background hover:bg-accent hover:text-background",
        variant === "ghost" &&
          "border border-border text-foreground hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}
