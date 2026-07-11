import { Inter, Space_Grotesk } from "next/font/google";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-bento-heading",
  display: "swap",
  preload: false,
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-bento-body",
  display: "swap",
  preload: false,
});

/** Applied to <html>; tokens.css maps these vars onto --f-font-* tokens. */
export const bentoFontClassName = `${heading.variable} ${body.variable}`;
