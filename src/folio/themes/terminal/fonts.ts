import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-terminal-mono",
  display: "swap",
  preload: false,
});

/** Applied to <html>; tokens.css maps this var onto both --f-font-* tokens. */
export const terminalFontClassName = mono.variable;
