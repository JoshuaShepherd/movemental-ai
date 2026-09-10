import { ArticleDetail } from "@/components/articles/article-detail";
import type { Article } from "@/lib/articles";

interface ArticleReaderViewProps {
  article: Article;
  relatedSlugs: readonly string[];
}

/**
 * Staging view for Movemental Article Detail reader.
 * Matches design specification in Movemental Article.dc.html.
 */
export function ArticleReaderView({ article, relatedSlugs }: ArticleReaderViewProps) {
  return <ArticleDetail article={article} relatedSlugs={relatedSlugs} />;
}
