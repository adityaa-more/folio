import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import siteConfig from "@/config/site.config";
import { themeRegistry } from "@/folio/themes/registry";
import { buildColorOverrideCss } from "@/folio/core/colors";
import { MotionProvider } from "@/folio/motion/components/motion-provider";
import { cn } from "@/lib/utils";

const theme = themeRegistry.get(siteConfig.theme);
const colorOverrideCss = buildColorOverrideCss(siteConfig.colors);

export const metadata: Metadata = {
  title: `${siteConfig.profile.name} — ${siteConfig.profile.profession}`,
  description: siteConfig.profile.tagline ?? siteConfig.profile.bio,
};

/** Applies .dark before paint when mode is "system" — avoids a light flash. */
const systemModeScript = `if(window.matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark")`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme={theme.id}
      data-force-motion={
        siteConfig.motion.respectReducedMotion === false ? "" : undefined
      }
      className={cn(
        theme.fontClassName,
        siteConfig.mode === "dark" && "dark",
        "antialiased",
      )}
      suppressHydrationWarning
    >
      <head>
        {siteConfig.mode === "system" ? (
          <script dangerouslySetInnerHTML={{ __html: systemModeScript }} />
        ) : null}
        {colorOverrideCss ? (
          <style
            id="folio-color-overrides"
            dangerouslySetInnerHTML={{ __html: colorOverrideCss }}
          />
        ) : null}
      </head>
      <body
        className="min-h-svh bg-background font-body text-foreground"
        suppressHydrationWarning
      >
        <MotionProvider
          respectReducedMotion={siteConfig.motion.respectReducedMotion ?? true}
        >
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
