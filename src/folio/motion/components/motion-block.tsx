"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { m, type Transition, type Variants } from "motion/react";
import type {
  MotionIntensity,
  MotionPreset,
  MotionState,
} from "@/folio/core/types";
import { ReducedMotionPolicyContext } from "./motion-provider";

/**
 * <MotionBlock> applies a motion preset to a section; <MotionItem> marks the
 * staggered children inside it. Presets are plain serializable data resolved
 * on the server — these are the only client components in the render path,
 * so section content itself stays server-rendered.
 *
 * Honors, in order: motion.intensity "off" → static; prefers-reduced-motion →
 * the preset's declared fallback ("fade" or "none"); otherwise the preset,
 * with durations scaled by intensity × the theme's durationScale.
 */

const INTENSITY_SCALE: Record<Exclude<MotionIntensity, "off">, number> = {
  subtle: 0.75,
  normal: 1,
  expressive: 1.2,
};

interface ResolvedMotionContext {
  item?: { hidden: MotionState; visible: MotionState };
  itemTransition: Transition;
  disabled: boolean;
  fadeOnly: boolean;
}

const MotionPresetContext = createContext<ResolvedMotionContext>({
  itemTransition: {},
  disabled: true,
  fadeOnly: false,
});

/**
 * SSR-safe prefers-reduced-motion. Returns false on the server AND on the
 * first client render so hydration always matches the server HTML, then
 * updates after mount. (motion's useReducedMotion reads matchMedia during the
 * hydration render, which mismatches for reduced-motion users.)
 */
function useReducedMotionSafe(): boolean {
  const respectReducedMotion = useContext(ReducedMotionPolicyContext);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return respectReducedMotion && reduced;
}

export interface MotionBlockProps {
  preset: MotionPreset;
  intensity: MotionIntensity;
  /** Theme motion-language multiplier (luxury ≈ 1.4, terminal ≈ 0.6). */
  durationScale?: number;
  className?: string;
  children: ReactNode;
}

export function MotionBlock({
  preset,
  intensity,
  durationScale = 1,
  className,
  children,
}: MotionBlockProps) {
  const prefersReduced = useReducedMotionSafe();

  const disabled =
    intensity === "off" || (prefersReduced && preset.reducedMotion === "none");
  const fadeOnly =
    !disabled && prefersReduced && preset.reducedMotion === "fade";

  const scale = disabled
    ? 1
    : INTENSITY_SCALE[intensity as Exclude<MotionIntensity, "off">] *
      durationScale;

  const itemTransition: Transition = {
    duration: (preset.transition?.duration ?? 0.6) * scale,
    delay: preset.transition?.delay,
    ease: preset.transition?.ease as Transition["ease"],
    type: preset.transition?.type,
    stiffness: preset.transition?.stiffness,
    damping: preset.transition?.damping,
    mass: preset.transition?.mass,
  };

  const context: ResolvedMotionContext = {
    item: preset.item,
    itemTransition,
    disabled,
    fadeOnly,
  };

  if (disabled) {
    return (
      <MotionPresetContext.Provider value={context}>
        <div className={className}>{children}</div>
      </MotionPresetContext.Provider>
    );
  }

  const containerVariants: Variants = {
    // Under fadeOnly, skip the preset's hidden pose (blur/transform) — the
    // visible pose below still restores any residue from pre-fallback renders.
    hidden: fadeOnly
      ? {}
      : { ...(preset.container?.hidden as Variants["hidden"]) },
    visible: {
      ...(preset.container?.visible as object),
      transition: {
        duration: itemTransition.duration,
        ease: itemTransition.ease,
        staggerChildren: fadeOnly
          ? 0
          : (preset.transition?.staggerChildren ?? 0) * scale,
        delayChildren: (preset.transition?.delayChildren ?? 0) * scale,
      },
    },
  };

  return (
    <MotionPresetContext.Provider value={context}>
      <m.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: preset.viewport?.once ?? true,
          margin: preset.viewport?.margin as `${number}px`,
          amount: preset.viewport?.amount,
        }}
        variants={containerVariants}
      >
        {children}
      </m.div>
    </MotionPresetContext.Provider>
  );
}

export interface MotionItemProps {
  className?: string;
  children: ReactNode;
}

export function MotionItem({ className, children }: MotionItemProps) {
  const { item, itemTransition, disabled, fadeOnly } =
    useContext(MotionPresetContext);

  if (disabled || !item) {
    return <div className={className}>{children}</div>;
  }

  // fadeOnly still animates TO the preset's full resting pose: the element
  // may carry blur/transform inline styles from the pre-fallback hidden
  // state (reduced-motion flips on after hydration), and animating opacity
  // alone would leave that residue frozen on screen.
  const variants: Variants = fadeOnly
    ? {
        hidden: { opacity: 0 },
        visible: {
          ...(item.visible as object),
          opacity: 1,
          transition: { duration: 0.4 },
        },
      }
    : {
        hidden: item.hidden as Variants["hidden"],
        visible: {
          ...(item.visible as object),
          transition: itemTransition,
        },
      };

  return (
    <m.div className={className} variants={variants}>
      {children}
    </m.div>
  );
}
