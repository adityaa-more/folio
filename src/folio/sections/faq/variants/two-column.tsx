import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { FaqContent } from "../schema";

export function FaqTwoColumn({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<FaqContent>) {
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
      <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
        {content.items.map((item) => (
          <MotionItem key={item.question}>
            <div className="border-t border-border pt-5">
              <h3 className="font-heading text-xl text-foreground">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </div>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
