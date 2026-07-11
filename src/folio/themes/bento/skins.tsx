import type {
  BadgeProps,
  ButtonProps,
  CardProps,
  FooterProps,
  NavProps,
  SectionHeadingProps,
  SectionShellProps,
  SkinComponents,
} from "@/folio/core/types";
import { cn } from "@/lib/utils";

/*
 * bento skins.
 * Tile language: every surface is a rounded, softly-shadowed card that
 * lifts and scales on hover (CSS spring-feel via cubic-bezier overshoot).
 * Nav is a floating dock pinned to the bottom of the viewport.
 */

const springHover =
  "transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:scale-[1.015]";

function BentoSectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-[calc(var(--f-space-section)/2)]", className)}
    >
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">{children}</div>
    </section>
  );
}

function BentoSectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10", className)}>
      {subtitle ? (
        <p className="mb-3 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-accent shadow-token">
          {subtitle}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl font-medium tracking-[var(--f-tracking)] text-foreground sm:text-4xl">
        {title}
      </h2>
    </header>
  );
}

function BentoCard({ children, href, className }: CardProps) {
  const classes = cn(
    "block rounded-token border border-border bg-card p-6 shadow-token",
    href && springHover,
    href && "hover:border-accent/40",
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

function BentoButton({ children, href, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium",
        springHover,
        variant === "primary" && "bg-accent text-white shadow-token",
        variant === "ghost" &&
          "border border-border bg-card text-foreground shadow-token hover:border-accent/40",
        className,
      )}
    >
      {children}
    </a>
  );
}

function BentoBadge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

function BentoNav({ name, items }: NavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-6">
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-card/85 p-1.5 shadow-token backdrop-blur-md">
        <a
          href="#top"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-white"
        >
          {name[0]?.toUpperCase()}
        </a>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent/10 hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function BentoFooter({ name, socials }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-28">
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">
        <div className="flex flex-col items-start justify-between gap-4 rounded-token border border-border bg-card p-6 shadow-token sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {year} {name}
          </p>
          {socials ? (
            <div className="flex gap-2">
              {Object.entries(socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium capitalize text-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
                >
                  {platform}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

export const bentoSkins: Partial<SkinComponents> = {
  SectionShell: BentoSectionShell,
  SectionHeading: BentoSectionHeading,
  Card: BentoCard,
  Button: BentoButton,
  Badge: BentoBadge,
  Nav: BentoNav,
  Footer: BentoFooter,
};
