import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudies, getCaseStudy } from "@/folio/content/mdx";

export function generateStaticParams() {
  return getCaseStudies().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title, description: entry.frontmatter.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();

  const { frontmatter, body } = entry;

  return (
    <main className="mx-auto w-full max-w-[var(--f-maxw)] px-6 pb-24 pt-32">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-foreground"
      >
        ← Back
      </Link>
      <header className="mb-14 mt-10">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
          Case Study{frontmatter.client ? ` — ${frontmatter.client}` : ""}
        </p>
        <h1 className="text-balance font-heading text-4xl tracking-[var(--f-tracking)] text-foreground sm:text-6xl">
          {frontmatter.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted">
          {frontmatter.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted">
          {frontmatter.role ? <span>Role — {frontmatter.role}</span> : null}
          <span>{frontmatter.date}</span>
          {frontmatter.tags.length > 0 ? (
            <span>{frontmatter.tags.join(" · ")}</span>
          ) : null}
        </div>
      </header>
      <hr className="mb-14 border-border" />
      <article className="mdx-prose">
        <MDXRemote source={body} />
      </article>
    </main>
  );
}
