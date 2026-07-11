import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { AboutContent } from "../schema";

export function AboutSideBySide({
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
      className="grid gap-12 sm:grid-cols-[2fr_3fr]"
    >
      <div>
        <MotionItem>
          <SectionHeading title={content.heading} subtitle={content.kicker} />
        </MotionItem>
        {content.image ? (
          <MotionItem>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="aspect-[4/5] w-full max-w-xs rounded-token object-cover"
            />
          </MotionItem>
        ) : null}
      </div>
      <div>
        {content.paragraphs.map((paragraph) => (
          <MotionItem key={paragraph.slice(0, 32)}>
            <p className="mb-6 text-pretty leading-relaxed text-muted">
              {paragraph}
            </p>
          </MotionItem>
        ))}
        {content.stats.length > 0 ? (
          <MotionItem>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {content.stats.map((stat) => (
                <div key={stat.label} className="border-t border-border pt-4">
                  <p className="font-heading text-3xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </MotionItem>
        ) : null}
      </div>
    </MotionBlock>
  );
}
