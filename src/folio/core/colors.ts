import type { ColorOverrides, ColorTokenOverrides } from "./types";

/**
 * Turns siteConfig.colors into a CSS override block injected after the theme
 * token sheets. `!important` is deliberate: user overrides must beat every
 * theme selector regardless of specificity or import order, in both modes.
 */

const TOKEN_TO_VAR: Record<keyof ColorTokenOverrides, string> = {
  primary: "--f-accent",
  secondary: "--f-accent-2",
  tertiary: "--f-accent-3",
  background: "--f-bg",
  foreground: "--f-fg",
  muted: "--f-muted",
  border: "--f-border",
  card: "--f-card",
};

function declarations(tokens: ColorTokenOverrides): string {
  return (Object.keys(TOKEN_TO_VAR) as Array<keyof ColorTokenOverrides>)
    .filter((key) => tokens[key])
    .map((key) => `${TOKEN_TO_VAR[key]}: ${tokens[key]} !important;`)
    .join(" ");
}

export function buildColorOverrideCss(colors: ColorOverrides | undefined): string {
  if (!colors) return "";
  const { light, dark, ...both } = colors;

  const rules: string[] = [];
  const bothDecls = declarations(both);
  if (bothDecls) rules.push(`:root, :root [data-theme] { ${bothDecls} }`);

  const lightDecls = light ? declarations(light) : "";
  if (lightDecls)
    rules.push(
      `:root:not(.dark), :root:not(.dark) [data-theme] { ${lightDecls} }`,
    );

  const darkDecls = dark ? declarations(dark) : "";
  if (darkDecls)
    rules.push(`:root.dark, :root.dark [data-theme] { ${darkDecls} }`);

  return rules.join("\n");
}
