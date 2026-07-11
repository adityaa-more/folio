import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import { cn } from "@/lib/utils";
import type { VisualCaseStudyContent } from "../schema";

/** Image-led rows, image side alternating — the classic design-portfolio spread. */
export function VisualCaseStudyAlternating({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<VisualCaseStudyContent>) {
  const { SectionHeading, Badge, Button } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <div className="flex flex-col gap-16 sm:gap-24">
        {content.items.map((study, index) => (
          <MotionItem key={study.title}>
            <article
              className={cn(
                "grid items-center gap-8 sm:grid-cols-2 sm:gap-12",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.image.src}
                alt={study.image.alt}
                loading="lazy"
                className={cn(
                  "aspect-[4/3] w-full rounded-token border border-border object-cover",
                  index % 2 === 1 && "sm:order-2",
                )}
              />
              <div>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-heading text-3xl text-foreground">
                    {study.title}
                  </h3>
                  {study.year ? (
                    <span className="text-xs text-muted">{study.year}</span>
                  ) : null}
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  {study.description}
                </p>
                {study.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                ) : null}
                {study.link ? (
                  <div className="mt-7">
                    <Button href={study.link} variant="ghost">
                      View project
                    </Button>
                  </div>
                ) : null}
              </div>
            </article>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
