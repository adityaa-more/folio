import type {
  ColorOverrides,
  FolioPlugin,
  MotionIntensity,
  Profile,
} from "@/folio/core/types";

/** One row in the builder's section list — mirrors SectionConfig. */
export interface BuilderSectionEntry {
  id: string;
  variant?: string;
  motion?: string;
  enabled: boolean;
}

/** Everything the builder edits. */
export interface BuilderState {
  theme: string;
  mode: "dark" | "light" | "system";
  intensity: MotionIntensity;
  colors?: ColorOverrides;
  sections: BuilderSectionEntry[];
}

/** Config fields the builder carries through untouched. */
export interface BuilderPassthrough {
  profile: Profile;
  modules?: string[];
  respectReducedMotion?: boolean;
  /** Present in config but not serializable — builder refuses to save over it. */
  hasPlugins?: boolean;
  plugins?: FolioPlugin[];
}

export interface BuilderSavePayload {
  state: BuilderState;
  passthrough: Omit<BuilderPassthrough, "plugins">;
}
