import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { SkillsContent } from "../schema";

/**
 * Infinite CSS marquee (keyframes in globals.css, halted under
 * prefers-reduced-motion). Track is duplicated for a seamless loop; the
 * second copy is aria-hidden.
 */
export function SkillsMarquee({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<SkillsContent>) {
  const { SectionHeading } = theme.skins;
  const allSkills = content.groups.flatMap((group) => group.items);

  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {allSkills.map((skill) => (
        <span
          key={skill.name}
          className="flex items-center whitespace-nowrap px-6 font-heading text-2xl text-muted"
        >
          {skill.name}
          <span className="ms-12 size-1 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  );

  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <MotionItem>
        <div className="overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max f-marquee-track">
            {track(false)}
            {track(true)}
          </div>
        </div>
      </MotionItem>
    </MotionBlock>
  );
}
