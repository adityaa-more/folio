import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { CaseStudiesContent } from "../schema";

export function CaseStudiesCardsList({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<CaseStudiesContent>) {
  const { SectionHeading, Card, Badge } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <div className="flex flex-col gap-10">
        {content.items.map((study) => (
          <MotionItem key={study.slug}>
            <Card href={`/case-studies/${study.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-heading text-3xl text-foreground">
                  {study.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {[study.client, study.date].filter(Boolean).join(" · ")}
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {study.summary}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {study.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
                <span className="ms-auto text-xs uppercase tracking-[0.25em] text-accent">
                  Read case study →
                </span>
              </div>
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
