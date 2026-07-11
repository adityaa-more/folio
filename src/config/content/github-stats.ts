import type { GithubStatsContent } from "@/folio/modules/developer/sections/github-stats/schema";

/**
 * Content-driven by design: fill these by hand, or generate this file in CI
 * from the GitHub API so builds never depend on a live network call.
 */
export const githubStats: GithubStatsContent = {
  heading: "Open source",
  username: "jordanvale",
  stats: [
    { value: "4.2k", label: "Stars earned" },
    { value: "1,180", label: "Contributions / yr" },
    { value: "38", label: "Public repos" },
    { value: "214", label: "PRs merged" },
  ],
  languages: [
    { name: "TypeScript", percent: 58 },
    { name: "JavaScript", percent: 17 },
    { name: "CSS", percent: 12 },
    { name: "Go", percent: 8 },
    { name: "Other", percent: 5 },
  ],
  pinned: [
    {
      name: "shipmate",
      description:
        "Release automation CLI — changelogs, semver bumps, and publishing in one command.",
      stars: "3.1k",
      url: "https://github.com/example/shipmate",
    },
    {
      name: "zod-form-kit",
      description:
        "Generate accessible React forms straight from zod schemas.",
      stars: "740",
      url: "https://github.com/example/zod-form-kit",
    },
  ],
};
