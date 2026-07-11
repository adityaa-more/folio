import { Registry } from "@/folio/core/registry";
import type { MotionPreset } from "@/folio/core/types";
import { fadeUp } from "./presets/fade-up";
import { blurReveal } from "./presets/blur-reveal";
import { staggerGrid } from "./presets/stagger-grid";
import { cinematicReveal } from "./presets/cinematic-reveal";
import { floatingCards } from "./presets/floating-cards";
import { rise } from "./presets/rise";

export const motionRegistry = new Registry<MotionPreset>("motion preset", [
  fadeUp,
  blurReveal,
  staggerGrid,
  cinematicReveal,
  floatingCards,
  rise,
]);
