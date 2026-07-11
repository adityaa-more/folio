import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { TestimonialsContent } from "../schema";

function Attribution({
  author,
  role,
  company,
}: {
  author: string;
  role?: string;
  company?: string;
}) {
  const detail = [role, company].filter(Boolean).join(", ");
  return (
    <footer className="mt-6">
      <p className="text-sm text-foreground">{author}</p>
      {detail ? <p className="mt-0.5 text-xs text-muted">{detail}</p> : null}
    </footer>
  );
}

export function TestimonialsGrid({
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
      <div className="grid gap-8 sm:grid-cols-2">
        {content.items.map((testimonial) => (
          <MotionItem key={testimonial.author}>
            <Card className="h-full">
              <blockquote className="font-heading text-xl italic leading-relaxed text-foreground">
                “{testimonial.quote}”
              </blockquote>
              <Attribution
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
