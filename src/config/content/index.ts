import type { ContentMap } from "@/folio/core/types";
import type { CaseStudiesContent } from "@/folio/sections/case-studies/schema";
import { getCaseStudies } from "@/folio/content/mdx";
import { about } from "./about";
import { bento } from "./bento";
import { codeShowcase } from "./code-showcase";
import { contact } from "./contact";
import { experience } from "./experience";
import { faq } from "./faq";
import { gallery } from "./gallery";
import { githubStats } from "./github-stats";
import { hero } from "./hero";
import { metrics } from "./metrics";
import { projects } from "./projects";
import { skills } from "./skills";
import { techStack } from "./tech-stack";
import { testimonials } from "./testimonials";
import { visualCaseStudy } from "./visual-case-study";

/** Case-study cards derive from the MDX files in /content/case-studies. */
const caseStudies: CaseStudiesContent = {
  heading: "Case Studies",
  kicker: "The long versions",
  items: getCaseStudies().map((entry) => ({
    title: entry.frontmatter.title,
    summary: entry.frontmatter.summary,
    slug: entry.slug,
    client: entry.frontmatter.client,
    date: entry.frontmatter.date,
    tags: entry.frontmatter.tags,
    cover: entry.frontmatter.cover,
  })),
};

/**
 * Section content, keyed by section id (or by a SectionConfig.content key if
 * one section renders twice with different data). Each entry is validated
 * against its section's schema at build time.
 */
export const content: ContentMap = {
  about,
  bento,
  "code-showcase": codeShowcase,
  contact,
  experience,
  faq,
  gallery,
  "github-stats": githubStats,
  hero,
  metrics,
  projects,
  skills,
  "tech-stack": techStack,
  testimonials,
  "visual-case-study": visualCaseStudy,
  "case-studies": caseStudies,
};
