import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ContactContent } from "../schema";

export function ContactSplit({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<ContactContent>) {
  const { SectionHeading } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
      className="grid gap-12 py-8 sm:grid-cols-2"
    >
      <div>
        <MotionItem>
          <SectionHeading title={content.heading} subtitle={content.note} />
        </MotionItem>
        {content.text ? (
          <MotionItem>
            <p className="max-w-md text-pretty leading-relaxed text-muted">
              {content.text}
            </p>
          </MotionItem>
        ) : null}
      </div>
      <div className="flex flex-col gap-6 sm:items-end sm:text-right">
        <MotionItem>
          <a
            href={`mailto:${content.email}`}
            className="font-heading text-2xl italic text-accent transition-opacity duration-300 hover:opacity-70"
          >
            {content.email}
          </a>
        </MotionItem>
        {content.socials ? (
          <MotionItem>
            <div className="flex flex-col gap-3 sm:items-end">
              {Object.entries(content.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.25em] text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {platform}
                </a>
              ))}
            </div>
          </MotionItem>
        ) : null}
      </div>
    </MotionBlock>
  );
}
