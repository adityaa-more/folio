import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Long-form content pipeline. MDX files live in /content/<collection>/*.mdx
 * with zod-validated frontmatter. Reads are synchronous fs at build time —
 * server-only (routes, config/content), never import from client components.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export const caseStudyFrontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().min(1),
  client: z.string().optional(),
  role: z.string().optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const blogFrontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatter>;
export type BlogFrontmatter = z.infer<typeof blogFrontmatter>;

export interface MdxEntry<TFrontmatter> {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
}

function loadCollection<TFrontmatter>(
  collection: string,
  schema: z.ZodType<TFrontmatter>,
): MdxEntry<TFrontmatter>[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        const lines = parsed.error.issues.map(
          (issue) => `  • ${issue.path.join(".") || "(root)"} — ${issue.message}`,
        );
        throw new Error(
          `[folio] Invalid frontmatter in content/${collection}/${file}:\n${lines.join("\n")}`,
        );
      }
      return { slug, frontmatter: parsed.data, body: content };
    })
    .sort((a, b) =>
      String((b.frontmatter as { date?: string }).date ?? "").localeCompare(
        String((a.frontmatter as { date?: string }).date ?? ""),
      ),
    );
}

export function getCaseStudies(): MdxEntry<CaseStudyFrontmatter>[] {
  return loadCollection("case-studies", caseStudyFrontmatter);
}

export function getCaseStudy(slug: string): MdxEntry<CaseStudyFrontmatter> | undefined {
  return getCaseStudies().find((entry) => entry.slug === slug);
}

export function getBlogPosts(): MdxEntry<BlogFrontmatter>[] {
  return loadCollection("blog", blogFrontmatter);
}

export function getBlogPost(slug: string): MdxEntry<BlogFrontmatter> | undefined {
  return getBlogPosts().find((entry) => entry.slug === slug);
}
