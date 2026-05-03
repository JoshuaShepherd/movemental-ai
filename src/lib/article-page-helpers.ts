import type { Metadata } from "next";

import { getArticle, type ArticleSummary } from "@/lib/articles";
import { buildRelatedSummariesFor } from "@/lib/articles-collections";
import { canonicalPageUrl } from "@/lib/site-url";

export function articleUrlPath(logicalSlug: string): string {
  return `/articles/${logicalSlug}`;
}

export async function buildArticleMetadata(logicalSlug: string): Promise<Metadata> {
  const article = getArticle(logicalSlug);
  if (!article) return { title: "Article not found" };

  const pageUrl = article.canonicalUrl ?? canonicalPageUrl(articleUrlPath(logicalSlug));
  const description = article.deck || article.excerpt || undefined;

  return {
    title: article.title,
    description,
    authors: article.author ? [{ name: article.author }] : undefined,
    alternates: { canonical: pageUrl },
    openGraph: {
      url: pageUrl,
      title: article.title,
      description,
      type: "article",
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      ...(article.author ? { authors: [article.author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

/** Build JSON-LD `Article` / `BlogPosting` structured data for a detail page. */
export function buildArticleJsonLd(logicalSlug: string): Record<string, unknown> | null {
  const article = getArticle(logicalSlug);
  if (!article) return null;
  const url = article.canonicalUrl ?? canonicalPageUrl(articleUrlPath(logicalSlug));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.deck || article.excerpt || undefined,
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Movemental",
    },
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt ?? article.publishedAt ?? undefined,
    articleSection: article.canonSection ?? undefined,
    keywords: article.topics.length ? article.topics.join(", ") : undefined,
  };
}

export function buildRelatedSummaries(logicalSlug: string, limit = 3): ArticleSummary[] {
  return buildRelatedSummariesFor(logicalSlug, limit);
}
