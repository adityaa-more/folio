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
 * editorial skins.
 * Magazine discipline: thick rules open sections like page furniture,
 * numbered folios, oversized serif headlines, black block buttons. Every
 * section reads like a spread.
 */

function EditorialSectionShell({ id, children, index, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-[calc(var(--f-space-section)/2)]", className)}
    >
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">
        <div className="mb-10 flex items-baseline justify-between border-t-4 border-border pt-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {id.replace(/-/g, " ")}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}

function EditorialSectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-12", className)}>
      <h2 className="max-w-4xl text-balance font-heading text-5xl font-bold tracking-[var(--f-tracking)] text-foreground sm:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 border-s-2 border-accent ps-4 text-sm uppercase tracking-[0.15em] text-muted">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

function EditorialCard({ children, href, className }: CardProps) {
  const classes = cn(
    "group block border-t border-border pt-5 transition-colors duration-200",
    className,
  );
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cn(classes, "hover:text-accent")}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return <div className={classes}>{children}</div>;
}

function EditorialButton({ children, href, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200",
        variant === "primary" &&
          "bg-foreground px-6 py-3.5 text-background hover:bg-accent",
        variant === "ghost" &&
          "border-b-2 border-foreground pb-1 text-foreground hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}

function EditorialBadge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-muted",
        "after:mx-2 after:inline-block after:size-1 after:rounded-full after:bg-accent last:after:hidden",
        className,
      )}
    >
      {children}
    </span>
  );
}

function EditorialNav({ name, items }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b-4 border-border bg-background">
      <div className="mx-auto flex w-full max-w-[var(--f-maxw)] items-center justify-between gap-6 px-6 py-4">
        <a
          href="#top"
          className="font-heading text-2xl font-black italic text-foreground"
        >
          {name}.
        </a>
        <div className="hidden items-center gap-7 sm:flex">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:text-accent"
            >
              <span className="me-1.5 text-accent">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function EditorialFooter({ name, socials }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-4 border-border">
      <div className="mx-auto flex w-full max-w-[var(--f-maxw)] flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-baseline">
        <p className="font-heading text-lg italic text-foreground">
          {name}. <span className="not-italic text-muted">Est. {year}</span>
        </p>
        {socials ? (
          <div className="flex gap-6">
            {Object.entries(socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-accent"
              >
                {platform}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

export const editorialSkins: Partial<SkinComponents> = {
  SectionShell: EditorialSectionShell,
  SectionHeading: EditorialSectionHeading,
  Card: EditorialCard,
  Button: EditorialButton,
  Badge: EditorialBadge,
  Nav: EditorialNav,
  Footer: EditorialFooter,
};
