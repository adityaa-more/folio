import type { MetricsContent } from "@/folio/sections/metrics/schema";

export const metrics: MetricsContent = {
  items: [
    { value: 8, suffix: "+", label: "Years shipping" },
    { value: 61, label: "Blocks in production" },
    { value: 4000, suffix: "+", label: "GitHub stars" },
    { value: 12, label: "Engineers mentored" },
  ],
};
