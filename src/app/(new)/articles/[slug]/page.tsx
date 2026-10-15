import { notFound } from "next/navigation";

import { ArticleReader } from "@/components/mv/legacy/article-reader";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { getArticle, listArticleSlugs } from "@/lib/articles";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildRelatedSummaries,
} from "@/lib/article-page-helpers";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listArticleSlugs()
    .filter((slug) => !slug.includes("/"))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  return buildArticleMetadata(slug);
}

export default async function V2ArticleSlugPage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = buildArticleJsonLd(slug);
  const related = buildRelatedSummaries(slug).map((item) => item.slug);

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <MvHeader />
      <ArticleReader article={article} relatedSlugs={related} />
      <MvFooter />
    </>
  );
}
