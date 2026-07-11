import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ExperienceContent } from "../schema";

export function ExperienceCompactList({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<ExperienceContent>) {
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
      <div>
        {content.items.map((job) => (
          <MotionItem key={`${job.company}-${job.start}`}>
            <div className="grid gap-2 border-t border-border py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {job.start} — {job.end ?? "Now"}
              </p>
              <div>
                <h3 className="font-heading text-xl text-foreground">
                  {job.role}
                  <span className="text-muted"> · {job.company}</span>
                </h3>
              </div>
              {job.location ? (
                <p className="text-xs text-muted">{job.location}</p>
              ) : null}
            </div>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
