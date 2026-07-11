import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { HeroContent } from "../schema";

function monogram(headline: string): string {
  return headline
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function HeroSplit({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<HeroContent>) {
  const { Button } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
      className="grid min-h-[70vh] items-center gap-12 pt-24 sm:grid-cols-[3fr_2fr]"
    >
      <div>
        {content.availability ? (
          <MotionItem>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-accent">
              {content.availability}
            </p>
          </MotionItem>
        ) : null}
        <MotionItem>
          <h1 className="text-balance font-heading text-5xl leading-tight tracking-[var(--f-tracking)] text-foreground sm:text-6xl">
            {content.headline}
          </h1>
        </MotionItem>
        {content.intro ?? content.subheadline ? (
          <MotionItem>
            <p className="mt-6 max-w-lg text-pretty text-lg text-muted">
              {content.intro ?? content.subheadline}
            </p>
          </MotionItem>
        ) : null}
        {content.actions.length > 0 ? (
          <MotionItem>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {content.actions.map((action) => (
                <Button key={action.href} href={action.href} variant={action.variant}>
                  {action.label}
                </Button>
              ))}
            </div>
          </MotionItem>
        ) : null}
      </div>
      <MotionItem className="hidden justify-end sm:flex">
        {content.image ? (
          // Plain <img>: remote sources shouldn't force users into next.config image allowlists.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="aspect-[4/5] w-full max-w-sm rounded-token object-cover"
          />
        ) : (
          <div className="flex aspect-square w-full max-w-sm items-center justify-center border border-border">
            <span className="font-heading text-8xl italic text-accent">
              {monogram(content.headline)}
            </span>
          </div>
        )}
      </MotionItem>
    </MotionBlock>
  );
}
