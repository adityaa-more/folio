import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { SkillsContent } from "../schema";

export function SkillsGroupedBadges({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<SkillsContent>) {
  const { SectionHeading, Badge } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <div className="space-y-10">
        {content.groups.map((group) => (
          <MotionItem key={group.label}>
            <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-[12rem_1fr]">
              <h3 className="text-xs uppercase tracking-[0.25em] text-muted">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </div>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
