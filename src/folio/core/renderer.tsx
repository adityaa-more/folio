import type {
  ContentMap,
  FolioPlugin,
  MotionPreset,
  NavItem,
  SectionDefinition,
  SectionVariant,
  SiteConfig,
  ThemeDefinition,
  ThemeRuntime,
} from "./types";
import { parseSectionContent } from "./define";
import { sectionRegistry } from "@/folio/sections/registry";
import { themeRegistry } from "@/folio/themes/registry";
import { motionRegistry } from "@/folio/motion/registry";
import { builtinModules, getModule } from "@/folio/modules/registry";
import { defaultSkins } from "@/folio/ui/default-skins";

/**
 * The layout engine. Runs on the server at build time:
 * config → merged registries → resolved section tree → rendered page.
 * Every unknown id fails the build with a pointed error listing what exists.
 */

interface ResolvedSection {
  key: string;
  anchorId: string;
  Variant: SectionVariant;
  content: unknown;
  preset: MotionPreset;
  navLabel?: string;
}

export function buildRegistries(config: SiteConfig) {
  const plugins: FolioPlugin[] = [
    ...(config.modules ?? []).map(getModule),
    ...(config.plugins ?? []),
  ];

  let sections = sectionRegistry;
  let themes = themeRegistry;
  let presets = motionRegistry;

  for (const plugin of plugins) {
    if (plugin.sections?.length) sections = sections.withItems(plugin.sections);
    if (plugin.themes?.length) themes = themes.withItems(plugin.themes);
    if (plugin.motionPresets?.length)
      presets = presets.withItems(plugin.motionPresets);
  }

  return { sections, themes, presets };
}

/** Theme definition + default skins merged — what sections actually receive. */
export function resolveThemeRuntime(themeDef: ThemeDefinition): ThemeRuntime {
  return {
    ...themeDef,
    skins: { ...defaultSkins, ...themeDef.skins },
  };
}

export function resolvePortfolio(config: SiteConfig, content: ContentMap) {
  const { sections, themes, presets } = buildRegistries(config);

  const theme = resolveThemeRuntime(themes.get(config.theme));

  const resolved: ResolvedSection[] = config.sections
    .filter((entry) => entry.enabled !== false)
    .map((entry, index) => {
      const def = sections.get(entry.id) as SectionDefinition;

      const variantName = entry.variant ?? def.defaultVariant;
      const Variant = def.variants[variantName];
      if (!Variant) {
        throw new Error(
          `[folio] Section "${def.id}" has no variant "${variantName}". Available: ${Object.keys(def.variants).join(", ")}`,
        );
      }

      const presetId =
        entry.motion ?? theme.motionLanguage.sectionEnter ?? def.defaultMotion;
      const preset = presets.get(presetId);

      const contentKey = entry.content ?? entry.id;
      const parsed = parseSectionContent(
        def.id,
        contentKey,
        def.schema,
        content[contentKey],
      );

      return {
        key: `${entry.id}-${index}`,
        anchorId: contentKey,
        Variant: Variant as SectionVariant,
        content: parsed,
        preset,
        navLabel: def.navLabel,
      };
    });

  return { theme, resolved };
}

export function PortfolioRenderer({
  config,
  content,
}: {
  config: SiteConfig;
  content: ContentMap;
}) {
  const { theme, resolved } = resolvePortfolio(config, content);
  const { Nav, Footer, SectionShell } = theme.skins;

  const navItems: NavItem[] = resolved
    .filter((section) => section.navLabel)
    .map((section) => ({ id: section.anchorId, label: section.navLabel! }));

  return (
    <>
      <Nav name={config.profile.name} items={navItems} />
      <main id="top">
        {resolved.map((section, index) => (
          <SectionShell key={section.key} id={section.anchorId} index={index}>
            <section.Variant
              content={section.content}
              motion={section.preset}
              theme={theme}
              intensity={config.motion.intensity}
            />
          </SectionShell>
        ))}
      </main>
      <Footer name={config.profile.name} socials={config.profile.socials} />
    </>
  );
}

export { builtinModules };
