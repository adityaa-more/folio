import { defineSection } from "@/folio/core/define";
import { metricsSchema, type MetricsContent } from "./schema";
import { MetricsCountersRow } from "./variants/counters-row";
import { MetricsStatCards } from "./variants/stat-cards";

export const metricsSection = defineSection<MetricsContent>({
  id: "metrics",
  name: "Metrics",
  description: "Numbers that back the story — animated count-up on scroll.",
  category: "core",
  schema: metricsSchema,
  variants: {
    "counters-row": MetricsCountersRow,
    "stat-cards": MetricsStatCards,
  },
  defaultVariant: "counters-row",
  defaultMotion: "fade-up",
});
