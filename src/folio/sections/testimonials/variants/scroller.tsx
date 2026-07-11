import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { TestimonialsContent } from "../schema";

/** Horizontal scroll-snap rail — no JS carousel, works with keyboard + touch. */
export function TestimonialsScroller({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<TestimonialsContent>) {
  const { SectionHeading, Card } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <MotionItem>
        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4">
          {content.items.map((testimonial) => (
            <div
              key={testimonial.author}
              className="w-[min(85%,26rem)] shrink-0 snap-start"
            >
              <Card className="h-full">
                <blockquote className="font-heading text-lg italic leading-relaxed text-foreground">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-5 text-sm text-foreground">{testimonial.author}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </MotionItem>
    </MotionBlock>
  );
}
