import { defineSection } from "@/folio/core/define";
import { testimonialsSchema, type TestimonialsContent } from "./schema";
import { TestimonialsGrid } from "./variants/grid";
import { TestimonialsSingleFeatured } from "./variants/single-featured";
import { TestimonialsScroller } from "./variants/scroller";

export const testimonialsSection = defineSection<TestimonialsContent>({
  id: "testimonials",
  name: "Testimonials",
  description: "Quotes from clients and colleagues.",
  category: "core",
  schema: testimonialsSchema,
  variants: {
    grid: TestimonialsGrid,
    "single-featured": TestimonialsSingleFeatured,
    scroller: TestimonialsScroller,
  },
  defaultVariant: "grid",
  defaultMotion: "stagger-grid",
});
