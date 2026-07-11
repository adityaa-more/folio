import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ExperienceContent } from "../schema";

export function ExperienceTimeline({
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
      <ol className="relative border-s border-border">
        {content.items.map((job) => (
          <MotionItem key={`${job.company}-${job.start}`} className="relative ps-8 pb-12 last:pb-0">
            <span className="absolute -start-[3.5px] top-2 size-[7px] rounded-full bg-accent" />
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {job.start} — {job.end ?? "Present"}
              {job.location ? ` · ${job.location}` : ""}
            </p>
            <h3 className="mt-2 font-heading text-2xl text-foreground">
              {job.role}
            </h3>
            <p className="mt-1 text-sm text-accent">{job.company}</p>
            {job.summary ? (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {job.summary}
              </p>
            ) : null}
            {job.highlights.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex max-w-xl gap-3 text-sm text-muted">
                    <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-border" />
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}
          </MotionItem>
        ))}
      </ol>
    </MotionBlock>
  );
}
