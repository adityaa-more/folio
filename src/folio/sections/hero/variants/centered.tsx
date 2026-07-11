import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { HeroContent } from "../schema";

export function HeroCentered({
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
      className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center"
    >
      {content.availability ? (
        <MotionItem>
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-accent">
            {content.availability}
          </p>
        </MotionItem>
      ) : null}
      <MotionItem>
        <h1 className="max-w-3xl text-balance font-heading text-5xl leading-tight tracking-[var(--f-tracking)] text-foreground sm:text-7xl">
          {content.headline}
        </h1>
      </MotionItem>
      {content.subheadline ? (
        <MotionItem>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted">
            {content.subheadline}
          </p>
        </MotionItem>
      ) : null}
      {content.actions.length > 0 ? (
        <MotionItem>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {content.actions.map((action) => (
              <Button key={action.href} href={action.href} variant={action.variant}>
                {action.label}
              </Button>
            ))}
          </div>
        </MotionItem>
      ) : null}
    </MotionBlock>
  );
}
