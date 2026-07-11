import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import { CountUp } from "../count-up";
import type { MetricsContent } from "../schema";

export function MetricsStatCards({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<MetricsContent>) {
  const { SectionHeading, Card } = theme.skins;
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
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((metric) => (
          <MotionItem key={metric.label}>
            <Card className="h-full">
              <CountUp
                value={metric.value}
                suffix={metric.suffix}
                className="font-heading text-4xl text-foreground"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
                {metric.label}
              </p>
              {metric.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {metric.description}
                </p>
              ) : null}
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
