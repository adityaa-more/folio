import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ProjectsContent } from "../schema";

export function ProjectsGrid({
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
      <div className="grid gap-8 sm:grid-cols-2">
        {content.items.map((project) => (
          <MotionItem key={project.title}>
            <Card href={project.link ?? project.repo} className="h-full">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-2xl text-foreground">
                  {project.title}
                </h3>
                {project.year ? (
                  <span className="shrink-0 text-xs text-muted">{project.year}</span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              {project.tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ) : null}
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
