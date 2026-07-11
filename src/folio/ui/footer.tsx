import type { FooterProps } from "@/folio/core/types";

export function Footer({ name, socials }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[var(--f-maxw)] flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          © {year} {name}
        </p>
        {socials ? (
          <div className="flex gap-5">
            {Object.entries(socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm capitalize text-muted transition-colors hover:text-foreground"
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
