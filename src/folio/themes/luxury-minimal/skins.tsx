import type {
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
 * luxury-minimal skins.
 * Structural re-interpretation, not a palette swap: hairline rules instead of
 * boxes, uppercase letter-spaced labels, a floating pill nav, link-style
 * buttons. Hover language is opacity, never lift or glow.
 */

function LuxurySectionShell({ id, children, index, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-[calc(var(--f-space-section)/2)]", className)}
    >
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">
        {index > 0 ? <hr className="mb-[calc(var(--f-space-section)/2)] border-border" /> : null}
        {children}
      </div>
    </section>
  );
}

function LuxurySectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-14", className)}>
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
        {subtitle ?? "—"}
      </p>
      <h2 className="font-heading text-4xl tracking-[var(--f-tracking)] text-foreground sm:text-5xl">
        {title}
      </h2>
    </header>
  );
}

function LuxuryCard({ children, href, className }: CardProps) {
  const classes = cn(
    "block border-t border-border pt-6 transition-opacity duration-300",
    href && "hover:opacity-70",
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

function LuxuryButton({ children, href, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] transition-opacity duration-300 hover:opacity-70",
        variant === "primary" &&
          "border border-foreground px-7 py-3.5 text-foreground",
        variant === "ghost" && "border-b border-accent pb-1 text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}

function LuxuryNav({ name, items }: NavProps) {
  return (
    <nav className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <div className="flex items-center gap-8 border border-border bg-background/85 px-8 py-3.5 backdrop-blur-md">
        <a
          href="#top"
          className="font-heading text-base italic text-foreground"
        >
          {name}
        </a>
        <div className="hidden items-center gap-6 sm:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[0.65rem] uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function LuxuryFooter({ name, socials }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-14 pt-[calc(var(--f-space-section)/2)]">
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">
        <hr className="mb-10 border-border" />
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            © {year} {name}
          </p>
          {socials ? (
            <div className="flex gap-8">
              {Object.entries(socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:text-foreground"
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

export const luxurySkins: Partial<SkinComponents> = {
  SectionShell: LuxurySectionShell,
  SectionHeading: LuxurySectionHeading,
  Card: LuxuryCard,
  Button: LuxuryButton,
  Nav: LuxuryNav,
  Footer: LuxuryFooter,
};
