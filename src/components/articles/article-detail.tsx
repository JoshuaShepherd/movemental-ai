import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { DocumentGraphNav } from "@/components/linking/document-graph-nav";
import { RelatedArticlesLinks } from "@/components/linking/related-articles-links";
import { RelatedResearchLinks } from "@/components/linking/related-research-links";
import type { Article } from "@/lib/articles";
import { articleUrlPath } from "@/lib/article-page-helpers";

import styles from "./article.module.css";

type ArticleDetailProps = {
  article: Article;
  relatedSlugs: readonly string[];
};

/** `/articles/[slug]` — Ink Band markdown reader. */
export function ArticleDetail({ article, relatedSlugs }: ArticleDetailProps) {
  const researchSlugs = article.topics.includes("ai-credibility")
    ? (["ai-credibility-crisis", "seo-geo-discoverability"] as const)
    : article.topics.includes("content-strategy")
      ? (["seo-geo-discoverability"] as const)
      : ([] as const);

  return (
    <InkBandUtilityShell>
      <article className={styles.prose}>
        <Link className={styles.back} href="/articles">
          ← Articles
        </Link>
        <p className={styles.eyebrow}>{article.eyebrow}</p>
        <h1 className={styles.title}>{article.title}</h1>
        {article.deck ? <p className={styles.deck}>{article.deck}</p> : null}
        <p className={styles.meta}>
          {article.author} · {article.readTime}
          {article.publishedAt ? ` · ${article.publishedAt.slice(0, 10)}` : ""}
        </p>
        <div className={styles.body}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>
        <RelatedResearchLinks slugs={researchSlugs} />
        <RelatedArticlesLinks slugs={relatedSlugs} />
        <DocumentGraphNav current="articles" />
      </article>
    </InkBandUtilityShell>
  );
}

export function ArticleHubCard({
  slug,
  title,
  excerpt,
  eyebrow,
  readTime,
}: {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  readTime: string;
}) {
  return (
    <Link href={articleUrlPath(slug)} className={styles.hubCard}>
      <p className={styles.hubCardTitle}>{title}</p>
      <p className={styles.hubCardMeta}>
        {eyebrow} · {readTime}
        {excerpt ? ` — ${excerpt.slice(0, 120)}${excerpt.length > 120 ? "…" : ""}` : ""}
      </p>
    </Link>
  );
}
