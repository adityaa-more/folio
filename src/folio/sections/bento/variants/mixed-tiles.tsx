import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import { cn } from "@/lib/utils";
import type { BentoContent } from "../schema";

const SPAN: Record<string, string> = {
  sm: "",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  lg: "sm:col-span-2 sm:row-span-2",
};

export function BentoMixedTiles({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<BentoContent>) {
  const { SectionHeading, Card } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      {content.heading ? (
        <MotionItem>
          <SectionHeading title={content.heading} subtitle={content.kicker} />
        </MotionItem>
      ) : null}
      <div className="grid auto-rows-[minmax(9rem,auto)] grid-cols-1 gap-5 sm:grid-cols-3">
        {content.tiles.map((tile, index) => (
          <MotionItem
            key={`${tile.type}-${index}`}
            className={cn(SPAN[tile.size], "min-w-0")}
          >
            {tile.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                className="size-full rounded-token border border-border object-cover"
              />
            ) : tile.type === "stat" ? (
              <Card className="flex h-full flex-col justify-end">
                <p className="font-heading text-4xl text-foreground">{tile.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {tile.label}
                </p>
              </Card>
            ) : (
              <Card
                href={tile.type === "link" ? tile.href : undefined}
                className="flex h-full flex-col justify-between gap-4"
              >
                <h3 className="font-heading text-xl text-foreground">
                  {tile.title}
                </h3>
                <div>
                  {tile.text ? (
                    <p className="text-sm leading-relaxed text-muted">{tile.text}</p>
                  ) : null}
                  {tile.type === "link" ? (
                    <span className="mt-3 inline-block text-xs uppercase tracking-[0.25em] text-accent">
                      Open →
                    </span>
                  ) : null}
                </div>
              </Card>
            )}
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
