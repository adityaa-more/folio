import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { FaqContent } from "../schema";

/** Native <details> accordion — zero JS, keyboard accessible. */
export function FaqAccordion({
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
      <div className="max-w-2xl">
        {content.items.map((item) => (
          <MotionItem key={item.question}>
            <details className="group border-t border-border py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-heading text-xl text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="text-accent transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
