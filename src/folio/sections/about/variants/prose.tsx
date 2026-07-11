import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { AboutContent } from "../schema";

export function AboutProse({
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
            <p className="mb-6 text-pretty text-lg leading-relaxed text-muted first:font-heading first:text-2xl first:leading-snug first:text-foreground">
              {paragraph}
            </p>
          </MotionItem>
        ))}
      </div>
      {content.highlights.length > 0 ? (
        <MotionItem>
          <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {content.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-t border-border pt-3 text-sm text-muted"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </MotionItem>
      ) : null}
    </MotionBlock>
  );
}
