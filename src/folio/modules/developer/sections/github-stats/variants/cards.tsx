import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { GithubStatsContent } from "../schema";

const LANGUAGE_OPACITY = [1, 0.75, 0.5, 0.3, 0.18];

export function GithubStatsCards({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<GithubStatsContent>) {
  const { SectionHeading, Card } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading
          title={content.heading}
          subtitle={content.kicker ?? `@${content.username}`}
        />
      </MotionItem>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {content.stats.map((stat) => (
          <MotionItem key={stat.label}>
            <Card className="h-full">
              <p className="font-heading text-3xl text-foreground">{stat.value}</p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </p>
            </Card>
          </MotionItem>
        ))}
      </div>

      {content.languages.length > 0 ? (
        <MotionItem className="mt-10">
          <div className="flex h-2 w-full overflow-hidden rounded-token">
            {content.languages.map((language, index) => (
              <div
                key={language.name}
                className="bg-accent"
                style={{
                  width: `${language.percent}%`,
                  opacity: LANGUAGE_OPACITY[index] ?? 0.12,
                }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
            {content.languages.map((language, index) => (
              <span key={language.name} className="flex items-center gap-2 text-xs text-muted">
                <span
                  className="size-2 rounded-full bg-accent"
                  style={{ opacity: LANGUAGE_OPACITY[index] ?? 0.12 }}
                />
                {language.name} {language.percent}%
              </span>
            ))}
          </div>
        </MotionItem>
      ) : null}

      {content.pinned.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {content.pinned.map((repo) => (
            <MotionItem key={repo.name}>
              <Card href={repo.url} className="h-full">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-lg text-foreground">{repo.name}</h3>
                  {repo.stars ? (
                    <span className="shrink-0 text-xs text-muted">★ {repo.stars}</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {repo.description}
                </p>
              </Card>
            </MotionItem>
          ))}
        </div>
      ) : null}
    </MotionBlock>
  );
}
