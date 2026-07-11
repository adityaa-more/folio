import type { CardProps } from "@/folio/core/types";
import { cn } from "@/lib/utils";

export function Card({ children, href, className }: CardProps) {
  const classes = cn(
    "block rounded-token border border-border bg-card p-6 shadow-token transition-colors",
    href && "hover:border-accent",
    className,
  );
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return <div className={classes}>{children}</div>;
}
