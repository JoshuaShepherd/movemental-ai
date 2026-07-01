import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResearchArticle } from "@/components/research/research-article";
import { allResearchSlugs, getResearchItem } from "@/lib/research/data";
import { buildResearchArticleJsonLd } from "@/lib/research/article-schema";
import { canonicalPageUrl } from "@/lib/site-url";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allResearchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.subtitle ?? item.abstract.replace(/\{\/?hl\}/g, ""),
    alternates: { canonical: canonicalPageUrl(`/research/${slug}`) },
    openGraph: {
      title: item.title,
      description: item.subtitle ?? item.abstract.replace(/\{\/?hl\}/g, ""),
      type: "article",
      url: canonicalPageUrl(`/research/${slug}`),
    },
  };
}

export default async function ResearchArticlePage({ params }: Params) {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) notFound();
  const jsonLd = buildResearchArticleJsonLd(item);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchArticle item={item} />
    </>
  );
}
