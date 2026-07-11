#!/usr/bin/env node
/**
 * Scaffolds a new section block:
 *   pnpm new:section <kebab-name> [--category core|developer|designer|photographer|writer|founder]
 *
 * Generates src/folio/sections/<name>/{schema.ts,index.ts,variants/default.tsx}
 * pre-wired to the section contract. Prints the two manual wiring steps
 * (registry + content entry) when done.
 */
import fs from "node:fs";
import path from "node:path";

const [, , rawName, ...rest] = process.argv;

if (!rawName || !/^[a-z][a-z0-9-]*$/.test(rawName)) {
  console.error(
    "Usage: pnpm new:section <kebab-name> [--category core]\n" +
      "Name must be kebab-case, e.g. `pnpm new:section awards`",
  );
  process.exit(1);
}

const categoryFlag = rest.indexOf("--category");
const category = categoryFlag !== -1 ? rest[categoryFlag + 1] : "core";

const pascal = rawName
  .split("-")
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("");
const camel = pascal[0].toLowerCase() + pascal.slice(1);

const dir = path.join(process.cwd(), "src", "folio", "sections", rawName);
if (fs.existsSync(dir)) {
  console.error(`Section folder already exists: ${dir}`);
  process.exit(1);
}

const schemaTs = `import { z } from "zod";

export const ${camel}Schema = z.object({
  heading: z.string().default("${pascal}"),
  kicker: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .min(1, "${rawName} needs at least one item"),
});

export type ${pascal}Content = z.infer<typeof ${camel}Schema>;
`;

const variantTsx = `import type { SectionVariantProps } from "@/folio/core/types";
import { MotionBlock, MotionItem } from "@/folio/motion/components/motion-block";
import type { ${pascal}Content } from "../schema";

export function ${pascal}Default({
  content,
  motion,
  theme,
  intensity,
}: SectionVariantProps<${pascal}Content>) {
  const { SectionHeading, Card } = theme.skins;
  return (
    <MotionBlock
      preset={motion}
      intensity={intensity}
      durationScale={theme.motionLanguage.durationScale}
    >
      <MotionItem>
        <SectionHeading title={content.heading} subtitle={content.kicker} />
      </MotionItem>
      <div className="grid gap-8 sm:grid-cols-2">
        {content.items.map((item) => (
          <MotionItem key={item.title}>
            <Card className="h-full">
              <h3 className="font-heading text-2xl text-foreground">{item.title}</h3>
              {item.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              ) : null}
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionBlock>
  );
}
`;

const indexTs = `import { defineSection } from "@/folio/core/define";
import { ${camel}Schema, type ${pascal}Content } from "./schema";
import { ${pascal}Default } from "./variants/default";

export const ${camel}Section = defineSection<${pascal}Content>({
  id: "${rawName}",
  name: "${pascal}",
  description: "TODO: one-line description shown in the builder.",
  category: "${category}",
  // navLabel: "${pascal}", // uncomment to appear in the nav
  schema: ${camel}Schema,
  variants: {
    default: ${pascal}Default,
  },
  defaultVariant: "default",
  defaultMotion: "fade-up",
});
`;

fs.mkdirSync(path.join(dir, "variants"), { recursive: true });
fs.writeFileSync(path.join(dir, "schema.ts"), schemaTs);
fs.writeFileSync(path.join(dir, "index.ts"), indexTs);
fs.writeFileSync(path.join(dir, "variants", "default.tsx"), variantTsx);

console.log(`✔ Created src/folio/sections/${rawName}/

Next steps:
  1. Register it — src/folio/sections/registry.ts:
       import { ${camel}Section } from "./${rawName}";
       (add to the array)
  2. Add demo content — src/config/content/${rawName}.ts + key "${rawName}" in src/config/content/index.ts
  3. See it — pnpm dev → /showcase (sidebar) or /builder (＋ Add section)
`);
