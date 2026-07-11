"use client";

import { createContext } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * When false, MotionBlock ignores the visitor's prefers-reduced-motion and
 * plays presets in full. Wired from siteConfig.motion.respectReducedMotion.
 */
export const ReducedMotionPolicyContext = createContext(true);

/**
 * Wraps the app once. LazyMotion + `m.` components keep the motion runtime
 * to the domAnimation feature set (~-30kb vs the full `motion` import).
 */
export function MotionProvider({
  children,
  respectReducedMotion = true,
}: {
  children: ReactNode;
  respectReducedMotion?: boolean;
}) {
  return (
    <ReducedMotionPolicyContext.Provider value={respectReducedMotion}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </ReducedMotionPolicyContext.Provider>
  );
}
