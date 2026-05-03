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

const PREFIX = "sandbox/";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listArticleSlugs()
    .filter((slug) => slug.startsWith(PREFIX))
    .map((slug) => ({ slug: slug.slice(PREFIX.length) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return buildArticleMetadata(`${PREFIX}${slug}`);
}

export default async function SandboxArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const logicalSlug = `${PREFIX}${slug}`;
  const article = getArticle(logicalSlug);
  if (!article) notFound();

  const related = buildRelatedSummaries(logicalSlug);
  const shareUrl = canonicalPageUrl(articleUrlPath(logicalSlug));
  const jsonLd = buildArticleJsonLd(logicalSlug);

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
