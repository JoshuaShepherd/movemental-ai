import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { ResearchPaper } from "@/components/mv/legacy/research-views";
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
    title: `${item.title} | Movemental Research`,
    description: item.subtitle ?? item.abstract.replace(/\{\/?hl\}/g, ""),
    alternates: { canonical: canonicalPageUrl(`/research/${slug}`) },
    openGraph: {
      title: item.title,
      description: item.subtitle ?? item.abstract.replace(/\{\/?hl\}/g, ""),
      type: "article",
      url: canonicalPageUrl(`/research/${slug}`) ?? undefined,
    },
  };
}

export default async function V2ResearchArticlePage({ params }: Params) {
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
      <MvHeader />
      <ResearchPaper item={item} />
      <MvFooter />
    </>
  );
}
