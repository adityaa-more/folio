import { Cormorant_Garamond, Inter } from "next/font/google";

// preload: false on every theme font — all registered themes' fonts enter the
// module graph, but only the active theme's are used; preloading them all
// would waste bandwidth on every page load.
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-luxury-heading",
  display: "swap",
  preload: false,
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-luxury-body",
  display: "swap",
  preload: false,
});

/** Applied to <html>; tokens.css maps these vars onto --f-font-* tokens. */
export const luxuryFontClassName = `${heading.variable} ${body.variable}`;
