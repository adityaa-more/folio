"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cursor spotlight: a soft radial glow tracks the pointer across the
 * wrapped surface (classic bento/cyber card treatment). Pure CSS-var
 * update on mousemove — no re-renders, inert on touch.
 */
export function Spotlight({
  children,
  className,
  size = 320,
}: {
  children: ReactNode;
  className?: string;
  /** Glow diameter in px. */
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("group/spot relative overflow-hidden", className)}
      style={{ "--spot-size": `${size}px` } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--f-accent) 14%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
