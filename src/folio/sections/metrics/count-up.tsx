"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ReducedMotionPolicyContext } from "@/folio/motion/components/motion-provider";

/**
 * Animates 0 → value when scrolled into view. Skips straight to the final
 * value under prefers-reduced-motion. Fixed locale so server/client always
 * format identically.
 */
export function CountUp({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const respectReducedMotion = useContext(ReducedMotionPolicyContext);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced =
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // duration 0 jumps straight to the final value under reduced motion —
    // same code path, no synchronous setState in the effect body.
    const controls = animate(0, value, {
      duration: reduced ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, respectReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
