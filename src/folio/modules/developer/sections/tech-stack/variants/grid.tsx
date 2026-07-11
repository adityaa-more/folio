import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { TechStackContent } from "../schema";

export function TechStackGrid({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<TechStackContent>) {
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.categories.map((category) => (
          <MotionItem key={category.label}>
            <Card className="h-full">
              <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">
                {category.label}
              </h3>
              <ul className="space-y-2.5">
                {category.items.map((tool) => (
                  <li
                    key={tool.name}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <span className="text-foreground">{tool.name}</span>
                    {tool.note ? (
                      <span className="text-xs text-muted">{tool.note}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
