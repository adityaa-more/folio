import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ContactContent } from "../schema";

export function ContactMinimalLinks({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<ContactContent>) {
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
      className="flex flex-col items-center py-16 text-center"
    >
      {content.note ? (
        <MotionItem>
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-accent">
            {content.note}
          </p>
        </MotionItem>
      ) : null}
      <MotionItem>
        <h2 className="text-balance font-heading text-4xl tracking-[var(--f-tracking)] text-foreground sm:text-6xl">
          {content.heading}
        </h2>
      </MotionItem>
      {content.text ? (
        <MotionItem>
          <p className="mt-6 max-w-md text-pretty text-muted">{content.text}</p>
        </MotionItem>
      ) : null}
      <MotionItem>
        <a
          href={`mailto:${content.email}`}
          className="mt-12 inline-block font-heading text-2xl italic text-accent underline-offset-8 transition-opacity duration-300 hover:opacity-70 sm:text-3xl"
        >
          {content.email}
        </a>
      </MotionItem>
      {content.socials ? (
        <MotionItem>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
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
    </MotionBlock>
  );
}
