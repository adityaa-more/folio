import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { HeroContent } from "../schema";

export function HeroFullscreen({
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
      className="flex min-h-svh flex-col justify-end pb-24 pt-24"
    >
      {content.availability ? (
        <MotionItem>
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-accent">
            {content.availability}
          </p>
        </MotionItem>
      ) : null}
      <MotionItem>
        <h1 className="max-w-4xl text-balance font-heading text-6xl leading-[1.05] tracking-[var(--f-tracking)] text-foreground sm:text-8xl">
          {content.headline}
        </h1>
      </MotionItem>
      <div className="mt-12 flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
        {content.subheadline ?? content.intro ? (
          <MotionItem>
            <p className="max-w-md text-pretty text-lg text-muted">
              {content.subheadline ?? content.intro}
            </p>
          </MotionItem>
        ) : null}
        {content.actions.length > 0 ? (
          <MotionItem>
            <div className="flex flex-wrap items-center gap-6">
              {content.actions.map((action) => (
                <Button key={action.href} href={action.href} variant={action.variant}>
                  {action.label}
                </Button>
              ))}
            </div>
          </MotionItem>
        ) : null}
      </div>
    </MotionBlock>
  );
}
