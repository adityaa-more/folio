import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ProjectsContent } from "../schema";

export function ProjectsList({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<ProjectsContent>) {
  const { SectionHeading, Card, Badge } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.subheading} />
      </MotionItem>
      <div className="flex flex-col gap-10">
        {content.items.map((project, index) => (
          <MotionItem key={project.title}>
            <Card href={project.link ?? project.repo}>
              <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                <span className="font-heading text-sm italic text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-3xl text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {project.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
                {project.year ? (
                  <span className="text-xs text-muted">{project.year}</span>
                ) : null}
              </div>
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
