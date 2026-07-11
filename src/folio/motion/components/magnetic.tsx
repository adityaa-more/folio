"use client";

import { useContext, useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { ReducedMotionPolicyContext } from "./motion-provider";

/**
 * Pointer-follow wrapper: the child leans toward the cursor and springs
 * back on leave. Desktop-only interaction — touch devices and reduced-motion
 * users get a static element (pointer events with no hover capability skip
 * the effect naturally since mouseenter never fires meaningfully).
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  /** 0–1: how far toward the cursor the element leans. */
  strength?: number;
  className?: string;
}) {
  const respectReducedMotion = useContext(ReducedMotionPolicyContext);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleMove = (event: React.MouseEvent) => {
    if (
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </m.div>
  );
}
