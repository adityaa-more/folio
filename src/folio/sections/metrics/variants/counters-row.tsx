import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import { CountUp } from "../count-up";
import type { MetricsContent } from "../schema";

export function MetricsCountersRow({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<MetricsContent>) {
  const { SectionHeading } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      {content.heading ? (
        <MotionItem>
          <SectionHeading title={content.heading} subtitle={content.kicker} />
        </MotionItem>
      ) : null}
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
        {content.items.map((metric) => (
          <MotionItem key={metric.label} className="text-center">
            <CountUp
              value={metric.value}
              suffix={metric.suffix}
              className="font-heading text-5xl text-foreground"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
              {metric.label}
            </p>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
