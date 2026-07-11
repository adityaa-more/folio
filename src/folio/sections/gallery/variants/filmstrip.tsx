import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { GalleryContent } from "../schema";

/** Horizontal scroll-snap strip — cinematic browse, touch friendly. */
export function GalleryFilmstrip({
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
      <MotionItem>
        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4">
          {content.images.map((image) => (
            <figure
              key={image.src}
              className="w-[min(80%,32rem)] shrink-0 snap-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-token object-cover"
              />
              {image.caption ? (
                <figcaption className="mt-2 text-xs text-muted">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </MotionItem>
    </MotionBlock>
  );
}
