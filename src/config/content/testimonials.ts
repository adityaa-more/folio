import type { TestimonialsContent } from "@/folio/sections/testimonials/schema";

export const testimonials: TestimonialsContent = {
  heading: "Kind words",
  kicker: "From people I've worked with",
  items: [
    {
      quote:
        "Jordan is the rare engineer who improves the product, the codebase, and the team at the same time. The reporting engine they built became our main sales demo.",
      author: "Priya Nair",
      role: "VP Engineering",
      company: "Ledgerline",
    },
    {
      quote:
        "The block registry changed how our whole agency works. Forty sites, one codebase, and designers who can ship without filing tickets.",
      author: "Daniel Kwan",
      role: "Founder",
      company: "Corelane",
    },
    {
      quote:
        "Every review from Jordan made me a better engineer. They explain the why, not just the what.",
      author: "Sofia Almeida",
      role: "Senior Developer",
      company: "Brightfold Studio",
    },
  ],
};
