import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { GalleryContent } from "../schema";

/** CSS-columns masonry — images keep natural aspect, no JS layout. */
export function GalleryMasonry({
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
      <div className="columns-2 gap-6 sm:columns-3">
        {content.images.map((image) => (
          <MotionItem key={image.src} className="mb-6 break-inside-avoid">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full rounded-token object-cover"
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
