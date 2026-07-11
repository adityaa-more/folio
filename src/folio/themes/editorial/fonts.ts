import { Archivo, Playfair_Display } from "next/font/google";

const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-editorial-heading",
  display: "swap",
  preload: false,
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-editorial-body",
  display: "swap",
  preload: false,
});

/** Applied to <html>; tokens.css maps these vars onto --f-font-* tokens. */
export const editorialFontClassName = `${heading.variable} ${body.variable}`;
