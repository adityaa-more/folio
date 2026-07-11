"use client";

import { useContext, useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { ReducedMotionPolicyContext } from "./motion-provider";

/**
 * 3D card tilt toward the cursor with spring return. Bento's signature
 * hover. Touch devices never fire mousemove-with-hover, so it stays flat;
 * reduced-motion users get a static card.
 */
export function Tilt({
  children,
  maxDeg = 7,
  className,
}: {
  children: ReactNode;
  maxDeg?: number;
  className?: string;
}) {
  const respectReducedMotion = useContext(ReducedMotionPolicyContext);
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxDeg, -maxDeg]), {
    stiffness: 250,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxDeg, maxDeg]), {
    stiffness: 250,
    damping: 20,
  });

  const handleMove = (event: React.MouseEvent) => {
    if (
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </m.div>
  );
}
