import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { CodeShowcaseContent } from "../schema";

/**
 * Dependency-free code presentation: editor-chrome header, mono body,
 * theme-token styling. Syntax highlighting stays out of core on purpose —
 * a shiki plugin can override this variant later.
 */
export function CodeShowcaseStacked({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<CodeShowcaseContent>) {
  const { SectionHeading } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <div className="grid gap-8 lg:grid-cols-2">
        {content.snippets.map((snippet) => (
          <MotionItem key={snippet.title}>
            <figure className="overflow-hidden rounded-token border border-border">
              <figcaption className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-2.5">
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <span aria-hidden className="flex gap-1.5">
                    <span className="size-2.5 rounded-full border border-border" />
                    <span className="size-2.5 rounded-full border border-border" />
                    <span className="size-2.5 rounded-full bg-accent" />
                  </span>
                  {snippet.title}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-muted">
                  {snippet.language}
                </span>
              </figcaption>
              <pre className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed text-foreground">
                <code>{snippet.code}</code>
              </pre>
              {snippet.description ? (
                <p className="border-t border-border px-4 py-3 text-xs text-muted">
                  {snippet.description}
                </p>
              ) : null}
            </figure>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
