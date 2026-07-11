import type { ComponentType, ReactNode } from "react";
import type { z } from "zod";

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

/**
 * A single animation state: a plain object of animatable values.
 * Kept as a loose record so presets stay serializable (they cross the
 * server → client boundary as props).
 */
export type MotionState = Record<string, string | number | number[]>;

export interface MotionTransition {
  duration?: number;
  delay?: number;
  ease?: [number, number, number, number] | string;
  staggerChildren?: number;
  delayChildren?: number;
  type?: "tween" | "spring";
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface MotionPreset {
  id: string;
  name: string;
  description?: string;
  /** Variants applied to the section container. */
  container?: { hidden: MotionState; visible: MotionState };
  /** Variants applied to each staggered child (via <MotionItem>). */
  item?: { hidden: MotionState; visible: MotionState };
  transition?: MotionTransition;
  viewport?: { once?: boolean; margin?: string; amount?: number };
  /** What happens under prefers-reduced-motion. Required — no preset ships without a fallback. */
  reducedMotion: "fade" | "none";
}

export type MotionIntensity = "off" | "subtle" | "normal" | "expressive";

/* ------------------------------------------------------------------ */
/* Skins — theme-overridable UI primitives                             */
/* ------------------------------------------------------------------ */

export interface SectionShellProps {
  id: string;
  children: ReactNode;
  /** Render order index — themes may alternate backgrounds, rules, etc. */
  index: number;
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface NavProps {
  name: string;
  items: NavItem[];
}

export interface FooterProps {
  name: string;
  socials?: Record<string, string>;
}

export interface SkinComponents {
  SectionShell: ComponentType<SectionShellProps>;
  SectionHeading: ComponentType<SectionHeadingProps>;
  Card: ComponentType<CardProps>;
  Button: ComponentType<ButtonProps>;
  Badge: ComponentType<BadgeProps>;
  Nav: ComponentType<NavProps>;
  Footer: ComponentType<FooterProps>;
}

/* ------------------------------------------------------------------ */
/* Themes                                                              */
/* ------------------------------------------------------------------ */

export interface ThemeMotionLanguage {
  /** Default section-enter preset id, e.g. "blur-reveal". */
  sectionEnter: string;
  /** Default stagger between child items, in seconds. */
  stagger: number;
  hover: "lift" | "glow" | "scale" | "invert" | "none";
  easing: [number, number, number, number];
  /** Multiplies every duration. luxury ≈ 1.4 (slow), terminal ≈ 0.6 (snappy). */
  durationScale: number;
}

export interface ThemeLayout {
  density: "airy" | "normal" | "dense";
  nav: "floating" | "topbar" | "sidebar" | "command";
}

export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  /**
   * next/font variable classNames, joined — applied to <html>.
   * The theme's tokens.css maps these vars onto --f-font-* tokens.
   */
  fontClassName: string;
  skins?: Partial<SkinComponents>;
  motionLanguage: ThemeMotionLanguage;
  layout: ThemeLayout;
}

/** A theme with default skins merged in — what sections actually receive. */
export interface ThemeRuntime extends Omit<ThemeDefinition, "skins"> {
  skins: SkinComponents;
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export interface SectionVariantProps<TContent = unknown> {
  content: TContent;
  motion: MotionPreset;
  theme: ThemeRuntime;
  intensity: MotionIntensity;
}

export type SectionVariant<TContent = unknown> = ComponentType<
  SectionVariantProps<TContent>
>;

export type SectionCategory =
  | "core"
  | "developer"
  | "designer"
  | "photographer"
  | "writer"
  | "founder";

export interface SectionDefinition<TContent = unknown> {
  id: string;
  name: string;
  description: string;
  category: SectionCategory;
  /** Human label used for nav links. */
  navLabel?: string;
  /** Validates the user's content for this section at build time. */
  schema: z.ZodType<TContent>;
  variants: Record<string, SectionVariant<TContent>>;
  defaultVariant: string;
  /** Fallback motion preset when neither config nor theme specify one. */
  defaultMotion: string;
}

/* ------------------------------------------------------------------ */
/* Plugins — profession modules use this same interface                */
/* ------------------------------------------------------------------ */

export interface FolioPlugin {
  name: string;
  sections?: SectionDefinition[];
  themes?: ThemeDefinition[];
  motionPresets?: MotionPreset[];
}

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

export interface SocialLinks {
  [platform: string]: string;
}

export interface Profile {
  name: string;
  profession: string;
  tagline?: string;
  bio?: string;
  location?: string;
  email?: string;
  avatar?: string;
  socials?: SocialLinks;
}

export interface SectionConfig {
  /** Must exist in the merged section registry. */
  id: string;
  /** The on/off toggle — default true. Config is kept when disabled. */
  enabled?: boolean;
  /** Layout variant — defaults to the section's defaultVariant. */
  variant?: string;
  /** Motion preset override — defaults to theme.motionLanguage.sectionEnter. */
  motion?: string;
  /** Key into the content map — defaults to the section id. */
  content?: string;
}

/**
 * One overridable palette. Any CSS color value works (#hex, oklch(), hsl()…).
 * primary/secondary/tertiary are the accent ladder: primary drives links,
 * kickers, highlights; secondary/tertiary are extra slots themes and custom
 * sections can lean on (utilities: text-accent, text-accent-2, text-accent-3).
 */
export interface ColorTokenOverrides {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  background?: string;
  foreground?: string;
  muted?: string;
  border?: string;
  card?: string;
}

/**
 * Top-level values apply to BOTH light and dark mode; the `light` / `dark`
 * sub-objects refine one mode. Overrides beat any theme's tokens — this is
 * how two people on the same theme end up with unmistakably different sites.
 */
export interface ColorOverrides extends ColorTokenOverrides {
  light?: ColorTokenOverrides;
  dark?: ColorTokenOverrides;
}

export interface SiteConfig {
  profile: Profile;
  theme: string;
  mode: "dark" | "light" | "system";
  /** Optional token overrides — recolor any theme without touching it. */
  colors?: ColorOverrides;
  /** Render order = array order. */
  sections: SectionConfig[];
  motion: {
    intensity: MotionIntensity;
    /**
     * When false, presets ignore the visitor's prefers-reduced-motion and
     * always play in full. Default true — leave it on for real deployments;
     * flip it off to preview the full motion language on a reduced-motion
     * device.
     */
    respectReducedMotion?: boolean;
  };
  /** Built-in profession modules to activate, e.g. ["developer"]. */
  modules?: string[];
  plugins?: FolioPlugin[];
}

/** The user's content map: section content key → data validated by that section's schema. */
export type ContentMap = Record<string, unknown>;
