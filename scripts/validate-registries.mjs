#!/usr/bin/env node
/**
 * Registry consistency checks — the CI quality gate behind `pnpm validate`.
 *
 * Static analysis (no TS execution — registries import React components):
 *   Presets   every preset has a reducedMotion fallback, id matches its
 *             filename, and is registered in motion/registry.ts.
 *   Sections  every section folder (core + module) has schema.ts, index.ts,
 *             at least one variant; defaultVariant exists in the variants map;
 *             defaultMotion is a real preset id; id matches the folder name;
 *             the section is registered.
 *   Themes    every non-stub theme folder has index.ts / tokens.css / fonts.ts,
 *             is registered, and its motionLanguage.sectionEnter is a real
 *             preset id.
 *   Content   every registered section id has a demo-content key in
 *             src/config/content/index.ts (warning — sections whose content
 *             derives elsewhere can ignore it).
 *
 * Exit code 1 on any error; warnings don't fail the run.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = (...parts) => path.join(root, "src", "folio", ...parts);

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const read = (file) => fs.readFileSync(file, "utf8");
const exists = (file) => fs.existsSync(file);

/** Extract a string-literal field like `id: "hero"` from a define* call. */
function stringField(source, field) {
  const match = source.match(new RegExp(`${field}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`));
  return match ? match[1] : null;
}

/** Extract the keys of the `variants: { split: HeroSplit, ... }` map. */
function variantKeys(source) {
  const match = source.match(/variants\s*:\s*\{([^}]*)\}/);
  if (!match) return null;
  return [...match[1].matchAll(/(?:^|,)\s*(?:["']([^"']+)["']|([A-Za-z_$][\w$]*))\s*:/g)]
    .map((m) => m[1] ?? m[2]);
}

const listDirs = (dir) =>
  exists(dir)
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
        .map((entry) => entry.name)
    : [];

const rel = (file) => path.relative(root, file).replaceAll("\\", "/");

/* ---------------------------------------------------------------- */
/* Motion presets                                                    */
/* ---------------------------------------------------------------- */

const presetsDir = src("motion", "presets");
const motionRegistrySource = read(src("motion", "registry.ts"));
const presetIds = new Set();

for (const file of fs.readdirSync(presetsDir).filter((f) => f.endsWith(".ts"))) {
  const source = read(path.join(presetsDir, file));
  const where = rel(path.join(presetsDir, file));
  const id = stringField(source, "id");
  const expected = path.basename(file, ".ts");

  if (!id) {
    fail(`${where}: no id found in definePreset call`);
    continue;
  }
  presetIds.add(id);
  if (id !== expected)
    fail(`${where}: preset id "${id}" should match its filename ("${expected}")`);

  const reduced = stringField(source, "reducedMotion");
  if (!reduced)
    fail(`${where}: missing required reducedMotion fallback ("fade" | "none")`);
  else if (!["fade", "none"].includes(reduced))
    fail(`${where}: reducedMotion "${reduced}" must be "fade" or "none"`);

  if (!motionRegistrySource.includes(`./presets/${expected}`))
    fail(`src/folio/motion/registry.ts: preset "${id}" (${where}) is not registered`);
}

/* ---------------------------------------------------------------- */
/* Sections — core + profession modules                              */
/* ---------------------------------------------------------------- */

const sectionDirs = [];
for (const name of listDirs(src("sections")))
  sectionDirs.push({
    dir: src("sections", name),
    name,
    registrySource: read(src("sections", "registry.ts")),
    registryFile: "src/folio/sections/registry.ts",
    registryRef: `./${name}`,
  });
for (const moduleName of listDirs(src("modules"))) {
  const moduleIndex = src("modules", moduleName, "index.ts");
  if (!exists(moduleIndex)) continue;
  for (const name of listDirs(src("modules", moduleName, "sections")))
    sectionDirs.push({
      dir: src("modules", moduleName, "sections", name),
      name,
      registrySource: read(moduleIndex),
      registryFile: `src/folio/modules/${moduleName}/index.ts`,
      registryRef: `./sections/${name}`,
    });
}

const sectionIds = [];

for (const { dir, name, registrySource, registryFile, registryRef } of sectionDirs) {
  const where = rel(dir);

  if (!exists(path.join(dir, "schema.ts")))
    fail(`${where}: missing schema.ts (every section validates its content)`);

  const indexFile = path.join(dir, "index.ts");
  if (!exists(indexFile)) {
    fail(`${where}: missing index.ts (defineSection entry point)`);
    continue;
  }

  const variantsDir = path.join(dir, "variants");
  const variantFiles = exists(variantsDir)
    ? fs.readdirSync(variantsDir).filter((f) => f.endsWith(".tsx"))
    : [];
  if (variantFiles.length === 0)
    fail(`${where}: no variants/*.tsx — a section needs at least one layout`);

  const source = read(indexFile);
  const id = stringField(source, "id");
  if (!id) {
    fail(`${where}/index.ts: no id found in defineSection call`);
    continue;
  }
  sectionIds.push(id);
  if (id !== name)
    fail(`${where}/index.ts: section id "${id}" should match its folder name ("${name}")`);
  if (!source.includes("schema:"))
    fail(`${where}/index.ts: defineSection has no schema field`);

  const keys = variantKeys(source);
  const defaultVariant = stringField(source, "defaultVariant");
  if (!keys) fail(`${where}/index.ts: could not find a variants map`);
  if (!defaultVariant) fail(`${where}/index.ts: missing defaultVariant`);
  if (keys && defaultVariant && !keys.includes(defaultVariant))
    fail(
      `${where}/index.ts: defaultVariant "${defaultVariant}" is not in the variants map (${keys.join(", ")})`,
    );

  const defaultMotion = stringField(source, "defaultMotion");
  if (!defaultMotion) fail(`${where}/index.ts: missing defaultMotion`);
  else if (!presetIds.has(defaultMotion))
    fail(
      `${where}/index.ts: defaultMotion "${defaultMotion}" is not a registered preset (${[...presetIds].join(", ")})`,
    );

  if (!registrySource.includes(registryRef))
    fail(`${registryFile}: section "${id}" (${where}) is not registered`);
}

const duplicates = sectionIds.filter((id, i) => sectionIds.indexOf(id) !== i);
for (const id of new Set(duplicates)) fail(`duplicate section id "${id}"`);

/* ---------------------------------------------------------------- */
/* Themes                                                            */
/* ---------------------------------------------------------------- */

const themeRegistrySource = read(src("themes", "registry.ts"));

for (const name of listDirs(src("themes"))) {
  const dir = src("themes", name);
  const where = rel(dir);

  for (const required of ["index.ts", "tokens.css", "fonts.ts"])
    if (!exists(path.join(dir, required))) fail(`${where}: missing ${required}`);

  const indexFile = path.join(dir, "index.ts");
  if (!exists(indexFile)) continue;
  const source = read(indexFile);

  const id = stringField(source, "id");
  if (id && id !== name)
    fail(`${where}/index.ts: theme id "${id}" should match its folder name ("${name}")`);

  const sectionEnter = stringField(source, "sectionEnter");
  if (!sectionEnter) fail(`${where}/index.ts: missing motionLanguage.sectionEnter`);
  else if (!presetIds.has(sectionEnter))
    fail(
      `${where}/index.ts: sectionEnter "${sectionEnter}" is not a registered preset (${[...presetIds].join(", ")})`,
    );

  if (!themeRegistrySource.includes(`./${name}`))
    fail(`src/folio/themes/registry.ts: theme "${id ?? name}" (${where}) is not registered`);
}

/* ---------------------------------------------------------------- */
/* Demo content coverage                                             */
/* ---------------------------------------------------------------- */

const contentIndex = path.join(root, "src", "config", "content", "index.ts");
if (exists(contentIndex)) {
  const source = read(contentIndex);
  const mapMatch = source.match(/export const content[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (mapMatch) {
    const contentKeys = new Set(
      [...mapMatch[1].matchAll(/^\s*(?:["']([^"']+)["']|([A-Za-z_$][\w$]*))\s*[:,]/gm)].map(
        (m) => m[1] ?? m[2],
      ),
    );
    for (const id of sectionIds)
      if (!contentKeys.has(id))
        warn(`src/config/content/index.ts: no demo content for section "${id}"`);
  } else {
    warn("src/config/content/index.ts: could not locate the content map");
  }
}

/* ---------------------------------------------------------------- */
/* Report                                                            */
/* ---------------------------------------------------------------- */

for (const message of warnings) console.warn(`⚠ ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`✖ ${message}`);
  console.error(`\n${errors.length} registry error(s).`);
  process.exit(1);
}
console.log(
  `✔ Registries valid — ${sectionIds.length} sections, ${presetIds.size} motion presets, ${listDirs(src("themes")).length} themes.` +
    (warnings.length ? ` ${warnings.length} warning(s).` : ""),
);
