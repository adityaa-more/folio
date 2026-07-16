import type { VisualCaseStudyContent } from "@/folio/modules/designer/sections/visual-case-study/schema";

/**
 * Demo content for the designer module's visual-case-study section.
 * Images from picsum.photos (placeholder service) — swap for your own.
 */
export const visualCaseStudy: VisualCaseStudyContent = {
  heading: "Selected Work",
  kicker: "Design case studies",
  items: [
    {
      title: "Corelane onboarding redesign",
      description:
        "Rebuilt the first-run experience around a single guided flow. Activation up 34%, support tickets on setup down by half.",
      image: {
        src: "https://picsum.photos/seed/folio-vcs1/1200/800",
        alt: "Onboarding flow screens laid out on a grid",
      },
      tags: ["Product design", "Onboarding"],
      year: "2025",
    },
    {
      title: "Ledgerline design system",
      description:
        "Token-driven component library spanning web and mobile. One source of truth, four brands themed off it.",
      image: {
        src: "https://picsum.photos/seed/folio-vcs2/1200/800",
        alt: "Design system component sheet",
      },
      tags: ["Design systems", "Tokens"],
      year: "2024",
    },
    {
      title: "Fieldnote brand identity",
      description:
        "Identity and art direction for a field-research startup — wordmark, type pairing, and a photography language the team can shoot themselves.",
      image: {
        src: "https://picsum.photos/seed/folio-vcs3/1200/800",
        alt: "Brand identity spread with wordmark and posters",
      },
      tags: ["Branding", "Art direction"],
      year: "2024",
    },
  ],
};
