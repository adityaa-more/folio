import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { AboutContent } from "../schema";

export function AboutStatsInline({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<AboutContent>) {
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
      <div className="max-w-2xl">
        {content.paragraphs.map((paragraph) => (
          <MotionItem key={paragraph.slice(0, 32)}>
            <p className="mb-6 text-pretty text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          </MotionItem>
        ))}
      </div>
      {content.stats.length > 0 ? (
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
          {content.stats.map((stat) => (
            <MotionItem key={stat.label} className="bg-background p-6">
              <p className="font-heading text-4xl text-foreground">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </MotionItem>
          ))}
        </div>
      ) : null}
    </MotionBlock>
  );
}
