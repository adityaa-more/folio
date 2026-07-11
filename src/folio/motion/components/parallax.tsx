"use client";

import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { ReducedMotionPolicyContext } from "./motion-provider";

/**
 * Scroll-linked parallax layer: the child translates against scroll at
 * `speed` (0 = pinned to page, 1 = normal flow; negatives move opposite).
 * Static under reduced motion and below the `minWidth` breakpoint —
 * parallax on small screens is usually jank, not delight.
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  minWidth = 768,
  className,
}: {
  children: ReactNode;
  /** Displacement factor: 0.3 → drifts 30% of scroll distance. */
  speed?: number;
  minWidth?: number;
  className?: string;
}) {
  const respectReducedMotion = useContext(ReducedMotionPolicyContext);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      `(min-width: ${minWidth}px)${respectReducedMotion ? " and (prefers-reduced-motion: no-preference)" : ""}`,
    );
    const update = () => setActive(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [minWidth, respectReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 200 * speed;
  const raw = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <m.div ref={ref} className={className} style={active ? { y } : undefined}>
      {children}
    </m.div>
  );
}
