import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { TestimonialsContent } from "../schema";

export function TestimonialsSingleFeatured({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<TestimonialsContent>) {
  const [featured, ...rest] = content.items;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
      className="flex flex-col items-center text-center"
    >
      <MotionItem>
        <p className="mb-10 text-xs uppercase tracking-[0.35em] text-accent">
          {content.kicker ?? content.heading}
        </p>
      </MotionItem>
      <MotionItem>
        <blockquote className="max-w-3xl text-balance font-heading text-3xl italic leading-snug text-foreground sm:text-4xl">
          “{featured.quote}”
        </blockquote>
      </MotionItem>
      <MotionItem>
        <p className="mt-8 text-sm text-foreground">{featured.author}</p>
        <p className="mt-1 text-xs text-muted">
          {[featured.role, featured.company].filter(Boolean).join(", ")}
        </p>
      </MotionItem>
      {rest.length > 0 ? (
        <MotionItem className="mt-16 w-full">
          <div className="grid gap-x-12 gap-y-8 text-left sm:grid-cols-2">
            {rest.map((testimonial) => (
              <div key={testimonial.author} className="border-t border-border pt-5">
                <blockquote className="text-sm italic leading-relaxed text-muted">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-3 text-xs text-foreground">
                  {testimonial.author}
                  <span className="text-muted">
                    {testimonial.company ? ` · ${testimonial.company}` : ""}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </MotionItem>
      ) : null}
    </MotionBlock>
  );
}
