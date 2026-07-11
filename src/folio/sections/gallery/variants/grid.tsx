import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import { cn } from "@/lib/utils";
import type { GalleryContent } from "../schema";

const ASPECT: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
};

export function GalleryGrid({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<GalleryContent>) {
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
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {content.images.map((image) => (
          <MotionItem key={image.src}>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={cn(
                  "w-full rounded-token object-cover",
                  ASPECT[image.aspect],
                )}
              />
              {image.caption ? (
                <figcaption className="mt-2 text-xs text-muted">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
