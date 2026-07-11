import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { SkillsContent } from "../schema";

export function SkillsBars({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<SkillsContent>) {
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
      <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
        {content.groups.map((group) => (
          <MotionItem key={group.label}>
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-muted">
              {group.label}
            </h3>
            <div className="space-y-4">
              {group.items.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    {skill.level ? (
                      <span className="text-xs text-muted">{skill.level}/5</span>
                    ) : null}
                  </div>
                  <div className="h-px w-full bg-border">
                    <div
                      className="h-px bg-accent"
                      style={{ width: `${((skill.level ?? 5) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
