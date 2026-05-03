import { notFound } from "next/navigation";

import { ArticleDetailPageContent } from "@/components/sections/article-detail/article-detail-page-content";
import {
  articleUrlPath,
  buildArticleJsonLd,
  buildArticleMetadata,
  buildRelatedSummaries,
} from "@/lib/article-page-helpers";
import { getArticle, listArticleSlugs } from "@/lib/articles";
import { canonicalPageUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listArticleSlugs()
    .filter((slug) => !slug.includes("/"))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return buildArticleMetadata(slug);
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = buildRelatedSummaries(slug);
  const shareUrl = canonicalPageUrl(articleUrlPath(slug));
  const jsonLd = buildArticleJsonLd(slug);

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <ArticleDetailPageContent article={article} related={related} shareUrl={shareUrl} />
    </>
  );
}
