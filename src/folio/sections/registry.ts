import { Registry } from "@/folio/core/registry";
import type { SectionDefinition } from "@/folio/core/types";
import { heroSection } from "./hero";
import { aboutSection } from "./about";
import { projectsSection } from "./projects";
import { caseStudiesSection } from "./case-studies";
import { experienceSection } from "./experience";
import { skillsSection } from "./skills";
import { metricsSection } from "./metrics";
import { testimonialsSection } from "./testimonials";
import { gallerySection } from "./gallery";
import { bentoSection } from "./bento";
import { faqSection } from "./faq";
import { contactSection } from "./contact";

export const sectionRegistry = new Registry<SectionDefinition>("section", [
  heroSection,
  aboutSection,
  projectsSection,
  caseStudiesSection,
  experienceSection,
  skillsSection,
  metricsSection,
  testimonialsSection,
  gallerySection,
  bentoSection,
  faqSection,
  contactSection,
] as SectionDefinition[]);
