import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ExperienceContent } from "../schema";

export function ExperienceCards({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<ExperienceContent>) {
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
        {content.items.map((job) => (
          <MotionItem key={`${job.company}-${job.start}`}>
            <Card className="h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {job.start} — {job.end ?? "Present"}
              </p>
              <h3 className="mt-3 font-heading text-2xl text-foreground">
                {job.role}
              </h3>
              <p className="mt-1 text-sm text-accent">{job.company}</p>
              {job.summary ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {job.summary}
                </p>
              ) : null}
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
