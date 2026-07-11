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
 * terminal skins.
 * Everything reads like a shell session: prompt lines open each section,
 * headings are markdown comments, buttons are [ bracketed ], badges are
 * <tags>. Hover language is inversion — fg/bg flip, like a selection block.
 */

function TerminalSectionShell({ id, children, index, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("py-[calc(var(--f-space-section)/2)]", className)}
    >
      <div className="mx-auto w-full max-w-[var(--f-maxw)] px-6">
        <p className="mb-8 text-sm text-muted">
          <span className="text-accent">➜</span> ~/portfolio{" "}
          <span className="text-muted">git:(</span>
          <span className="text-accent">main</span>
          <span className="text-muted">)</span> ./{id}
          {index === 0 ? "" : ""}
        </p>
        {children}
      </div>
    </section>
  );
}

function TerminalSectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10", className)}>
      <h2 className="text-2xl text-foreground sm:text-3xl">
        <span className="text-accent"># </span>
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm text-muted">
          <span className="text-border">{"//"} </span>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

function TerminalCard({ children, href, className }: CardProps) {
  const classes = cn(
    "block border border-border bg-card p-5 transition-colors duration-100",
    href && "hover:border-accent hover:bg-accent/10",
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

function TerminalButton({ children, href, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 text-sm transition-colors duration-100",
        variant === "primary" &&
          "bg-accent px-4 py-2 font-medium text-background hover:bg-foreground",
        variant === "ghost" &&
          "border border-border px-4 py-2 text-foreground hover:border-accent hover:text-accent",
        className,
      )}
    >
      <span aria-hidden>[</span>
      {children}
      <span aria-hidden>]</span>
    </a>
  );
}

function TerminalBadge({ children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center text-xs text-muted", className)}>
      <span aria-hidden className="text-border">
        {"<"}
      </span>
      {children}
      <span aria-hidden className="text-border">
        {"/>"}
      </span>
    </span>
  );
}

function TerminalNav({ name, items }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-[var(--f-maxw)] items-center justify-between gap-6 overflow-x-auto px-6 py-3.5">
        <a href="#top" className="whitespace-nowrap text-sm text-foreground">
          <span className="text-accent">{name.toLowerCase().replace(/\s+/g, "")}@folio</span>
          <span className="text-muted">:~$</span>
          <span
            aria-hidden
            className="ms-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-accent"
          />
        </a>
        <div className="flex items-center gap-5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap text-sm text-muted transition-colors duration-100 hover:text-accent"
            >
              ./{item.label.toLowerCase().replace(/\s+/g, "-")}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function TerminalFooter({ name, socials }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[var(--f-maxw)] flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          <span className="text-accent">➜</span> exit 0{" "}
          <span className="text-border">
            {"//"} © {year} {name}
          </span>
        </p>
        {socials ? (
          <div className="flex gap-5">
            {Object.entries(socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors duration-100 hover:text-accent"
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

export const terminalSkins: Partial<SkinComponents> = {
  SectionShell: TerminalSectionShell,
  SectionHeading: TerminalSectionHeading,
  Card: TerminalCard,
  Button: TerminalButton,
  Badge: TerminalBadge,
  Nav: TerminalNav,
  Footer: TerminalFooter,
};
