import { notFound } from "next/navigation";
import siteConfig from "@/config/site.config";
import { content } from "@/config/content";
import type { BuilderPassthrough, BuilderState } from "@/folio/builder/types";
import { devToolsEnabled } from "@/lib/demo";
import { BuilderClient } from "./builder-client";

export const metadata = { title: "Folio Builder" };

/**
 * Visual builder (dev-only): server shell that snapshots the current config
 * and the content map (fs-derived, server-only import) and hands both to the
 * client UI as serializable props.
 */
export default function BuilderPage() {
  if (!devToolsEnabled) notFound();

  const initialState: BuilderState = {
    theme: siteConfig.theme,
    mode: siteConfig.mode,
    intensity: siteConfig.motion.intensity,
    colors: siteConfig.colors,
    // Start with a blank canvas — the builder is an exploration surface.
    // The user builds their page up section by section via the ＋ buttons;
    // it doesn't preload the current config's section list.
    sections: [],
  };

  const passthrough: BuilderPassthrough = {
    profile: siteConfig.profile,
    modules: siteConfig.modules,
    respectReducedMotion: siteConfig.motion.respectReducedMotion,
    hasPlugins: Boolean(siteConfig.plugins?.length),
  };

  return (
    <BuilderClient
      initialState={initialState}
      passthrough={passthrough}
      content={content}
    />
  );
}
