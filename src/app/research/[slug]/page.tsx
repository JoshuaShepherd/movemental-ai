import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResearchArticle } from "@/components/research/research-article";
import { allResearchSlugs, getResearchItem } from "@/lib/research/data";

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
  };
}

export default async function ResearchArticlePage({ params }: Params) {
  const { slug } = await params;
  const item = getResearchItem(slug);
  if (!item) notFound();
  return <ResearchArticle item={item} />;
}
