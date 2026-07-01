import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/articles/article-detail";
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

export default async function ArticleSlugPage({ params }: Params) {
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
      <ArticleDetail article={article} relatedSlugs={related} />
    </>
  );
}
