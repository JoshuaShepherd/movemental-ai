import type { ResearchItem } from "@/lib/research/data";
import { canonicalPageUrl } from "@/lib/site-url";

/** ScholarlyArticle JSON-LD for `/research/[slug]` pages. */
export function buildResearchArticleJsonLd(item: ResearchItem): Record<string, unknown> {
  const url = canonicalPageUrl(`/research/${item.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: item.title,
    description: item.subtitle ?? item.abstract.replace(/\{\/?hl\}/g, ""),
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "Movemental",
      url: canonicalPageUrl("/agent/about"),
    },
    ...(item.year ? { datePublished: `${item.year}-01-01` } : {}),
    keywords: item.kind,
  };
}
