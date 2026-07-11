"use client";

import { useContext, useEffect, useState } from "react";
import { ReducedMotionPolicyContext } from "./motion-provider";

/**
 * Types text character by character with a blinking caret. Terminal theme's
 * signature. SSR renders the FULL text (SEO + no-JS + hydration safety);
 * typing starts after mount. Reduced motion → text stays fully rendered.
 */
export function TypewriterText({
  text,
  speed = 35,
  startDelay = 200,
  caret = true,
  className,
}: {
  text: string;
  /** ms per character. */
  speed?: number;
  startDelay?: number;
  caret?: boolean;
  className?: string;
}) {
  const respectReducedMotion = useContext(ReducedMotionPolicyContext);
  const [visibleChars, setVisibleChars] = useState(text.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let index = 0;
    let interval: ReturnType<typeof setInterval>;
    // State updates start inside the timeout (not the effect body) so the
    // full SSR text stays until typing actually begins.
    const start = setTimeout(() => {
      setVisibleChars(0);
      setTyping(true);
      interval = setInterval(() => {
        index += 1;
        setVisibleChars(index);
        if (index >= text.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, respectReducedMotion]);

  return (
    <span className={className}>
      <span aria-hidden>{text.slice(0, visibleChars)}</span>
      {/* Reserve layout for untyped characters so nothing reflows. */}
      <span aria-hidden className="invisible">
        {text.slice(visibleChars)}
      </span>
      <span className="sr-only">{text}</span>
      {caret ? (
        <span
          aria-hidden
          className={
            "ms-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.1em] bg-accent " +
            (typing ? "" : "animate-pulse")
          }
        />
      ) : null}
    </span>
  );
}
