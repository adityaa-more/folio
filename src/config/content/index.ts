import type { ContentMap } from "@/folio/core/types";
import type { CaseStudiesContent } from "@/folio/sections/case-studies/schema";
import { getCaseStudies } from "@/folio/content/mdx";
import { hero } from "./hero";
import { about } from "./about";
import { projects } from "./projects";
import { experience } from "./experience";
import { skills } from "./skills";
import { metrics } from "./metrics";
import { testimonials } from "./testimonials";
import { gallery } from "./gallery";
import { bento } from "./bento";
import { faq } from "./faq";
import { contact } from "./contact";
import { githubStats } from "./github-stats";
import { techStack } from "./tech-stack";
import { codeShowcase } from "./code-showcase";

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
  hero,
  about,
  projects,
  "case-studies": caseStudies,
  experience,
  skills,
  metrics,
  testimonials,
  gallery,
  bento,
  faq,
  contact,
  // developer module sections
  "github-stats": githubStats,
  "tech-stack": techStack,
  "code-showcase": codeShowcase,
};
