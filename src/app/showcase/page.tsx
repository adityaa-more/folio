import { notFound } from "next/navigation";
import Link from "next/link";
import siteConfig from "@/config/site.config";
import { content } from "@/config/content";
import { buildRegistries, resolvePortfolio } from "@/folio/core/renderer";
import { themeRegistry } from "@/folio/themes/registry";
import { devToolsEnabled } from "@/lib/demo";
import { cn } from "@/lib/utils";

/**
 * Contributor test bench (dev-only). Sidebar picks one section × variant at a
 * time (URL-driven, no client JS); ?view=all restores the full stacked sweep
 * for eyeballing everything at once. Switch themes via the pills.
 */
export default async function ShowcasePage({
  searchParams,
}: {
  searchParams: Promise<{
    theme?: string;
    section?: string;
    variant?: string;
    view?: string;
  }>;
}) {
  if (!devToolsEnabled) notFound();

  const params = await searchParams;
  const themeId = params.theme ?? siteConfig.theme;
  if (!themeRegistry.has(themeId)) notFound();

  // Merged registries — includes sections added by active profession modules.
  const { sections: mergedSections } = buildRegistries(siteConfig);
  const allDefs = mergedSections.all();
  const showAll = params.view === "all";

  const activeDef = showAll
    ? null
    : (allDefs.find((def) => def.id === params.section) ?? allDefs[0]);
  const activeVariant =
    activeDef && activeDef.variants[params.variant ?? ""]
      ? params.variant!
      : activeDef?.defaultVariant;

  const sections = showAll
    ? allDefs.flatMap((def) =>
        Object.keys(def.variants).map((variant) => ({ id: def.id, variant })),
      )
    : [{ id: activeDef!.id, variant: activeVariant }];

  const { theme, resolved } = resolvePortfolio(
    { ...siteConfig, theme: themeId, sections },
    content,
  );
  const { Nav, Footer, SectionShell } = theme.skins;

  const link = (query: Record<string, string | undefined>) => {
    const merged = { theme: themeId, ...query };
    const search = Object.entries(merged)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join("&");
    return `/showcase?${search}`;
  };

  return (
    <div className="flex min-h-svh bg-zinc-950 text-zinc-100">
      {/* -------- sidebar: sections × variants -------- */}
      <aside className="sticky top-0 flex h-svh w-56 shrink-0 flex-col overflow-y-auto border-r border-zinc-800 p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          showcase
        </p>
        <Link
          href={link({ view: "all" })}
          className={cn(
            "mb-4 rounded border px-2.5 py-1.5 text-center text-xs transition-colors",
            showAll
              ? "border-emerald-400 text-emerald-300"
              : "border-zinc-700 text-zinc-400 hover:text-zinc-200",
          )}
        >
          show everything stacked
        </Link>
        <nav className="flex flex-col gap-3">
          {allDefs.map((def) => (
            <div key={def.id}>
              <Link
                href={link({ section: def.id })}
                className={cn(
                  "text-sm transition-colors",
                  !showAll && activeDef?.id === def.id
                    ? "font-semibold text-emerald-300"
                    : "text-zinc-300 hover:text-white",
                )}
              >
                {def.name}
              </Link>
              <div className="mt-1 flex flex-wrap gap-1">
                {Object.keys(def.variants).map((variant) => (
                  <Link
                    key={variant}
                    href={link({ section: def.id, variant })}
                    className={cn(
                      "rounded border px-1.5 py-0.5 text-[0.65rem] transition-colors",
                      !showAll &&
                        activeDef?.id === def.id &&
                        activeVariant === variant
                        ? "border-emerald-400 text-emerald-300"
                        : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300",
                    )}
                  >
                    {variant}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* -------- main: theme pills + preview -------- */}
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-[60] flex flex-wrap items-center gap-2 border-b border-zinc-800 bg-zinc-950/95 px-6 py-3 backdrop-blur">
          <span className="me-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            theme:
          </span>
          {themeRegistry.all().map((entry) => (
            <Link
              key={entry.id}
              href={link({
                theme: entry.id,
                section: showAll ? undefined : activeDef?.id,
                variant: showAll ? undefined : activeVariant,
                view: showAll ? "all" : undefined,
              })}
              className={cn(
                "rounded border px-3 py-1 text-xs transition-colors",
                entry.id === theme.id
                  ? "border-emerald-400 text-emerald-300"
                  : "border-zinc-700 text-zinc-400 hover:text-zinc-200",
              )}
            >
              {entry.name}
            </Link>
          ))}
        </div>

        <div
          data-theme={theme.id}
          className={cn(
            theme.fontClassName,
            "min-h-[calc(100svh-49px)] bg-background font-body text-foreground",
          )}
        >
          <Nav
            name={siteConfig.profile.name}
            items={[
              { id: "projects", label: "Work" },
              { id: "contact", label: "Contact" },
            ]}
          />
          <main id="top">
            {resolved.map((section, index) => {
              const entry = sections[index];
              return (
                <div key={section.key}>
                  {showAll ? (
                    <p className="mx-auto w-full max-w-[var(--f-maxw)] px-6 pt-10 text-xs uppercase tracking-[0.25em] text-accent">
                      ▸ {entry.id} / {entry.variant}
                    </p>
                  ) : null}
                  <SectionShell id={`${section.anchorId}-${index}`} index={index}>
                    <section.Variant
                      content={section.content}
                      motion={section.preset}
                      theme={theme}
                      intensity={siteConfig.motion.intensity}
                    />
                  </SectionShell>
                </div>
              );
            })}
          </main>
          <Footer
            name={siteConfig.profile.name}
            socials={siteConfig.profile.socials}
          />
        </div>
      </div>
    </div>
  );
}
