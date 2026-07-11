import { defineSection } from "@/folio/core/define";
import { githubStatsSchema, type GithubStatsContent } from "./schema";
import { GithubStatsCards } from "./variants/cards";

export const githubStatsSection = defineSection<GithubStatsContent>({
  id: "github-stats",
  name: "GitHub Stats",
  description:
    "Contribution stats, language distribution, pinned repos. Content-driven (fill numbers or generate them in CI).",
  category: "developer",
  navLabel: "GitHub",
  schema: githubStatsSchema,
  variants: {
    cards: GithubStatsCards,
  },
  defaultVariant: "cards",
  defaultMotion: "stagger-grid",
});
