import { Container } from "@/components/primitives";
import {
  CanonProgressStrip,
} from "@/components/sections/article-cards";
import type { Article, ArticleSummary } from "@/lib/articles";
import {
  CANON_SECTIONS_ORDER,
  CANON_SECTION_META,
  adjacentCanon,
  adjacentSeries,
  listBySection,
  listCanonOrdered,
  listSeriesArticles,
} from "@/lib/articles-collections";

import { ArticleHero } from "./article-hero";
import { ArticleMarkdown } from "./article-markdown";
import { ArticleTocMobile } from "./article-toc-mobile";
import { ArticleTocRail } from "./article-toc-rail";
import { ContinueReading } from "./continue-reading";
import { PrevNextStrip } from "./prev-next-strip";
import { ReadingPathRail } from "./reading-path-rail";
import { ReadingProgress } from "./reading-progress";
import { SandboxCanonArticleCta } from "./sandbox-canon-article-cta";
import { ShareStrip } from "./share-strip";

export function ArticleDetailPageContent({
  article,
  related,
  shareUrl,
}: {
  article: Article;
  related: ArticleSummary[];
  /** Canonical article URL for share/copy (matches metadata `openGraph.url`). */
  shareUrl: string;
}) {
  const isCanon = article.shape === "canon";
  const hasSeries = article.series != null;
  const canonTotal = listCanonOrdered().length;

  const canonGroups = isCanon
    ? CANON_SECTIONS_ORDER.map((section) => ({
        section,
        title: CANON_SECTION_META[section].title,
        items: listBySection(section),
      })).filter((g) => g.items.length > 0)
    : [];

  const seriesItems = hasSeries && article.series ? listSeriesArticles(article.series) : [];

  const canonAdjacent = isCanon ? adjacentCanon(article.slug) : { prev: null, next: null };
  const seriesAdjacent = !isCanon && hasSeries ? adjacentSeries(article.slug) : { prev: null, next: null };

  const continueHeading = isCanon
    ? `More in the ${article.canonSection ? CANON_SECTION_META[article.canonSection].title.toLowerCase() : "canon"}`
    : hasSeries
      ? "More in this series"
      : "More from the Movemental library";

  return (
    <>
      <ReadingProgress />
      <ArticleHero article={article} canonTotal={canonTotal} />

      <Container className="pt-14 md:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
          <article>
            <ArticleTocMobile items={article.toc} />
            {isCanon && article.canonOrder != null ? (
              <CanonProgressStrip current={article.canonOrder} total={canonTotal} className="mb-10" />
            ) : null}
            <ArticleMarkdown markdown={article.body} />
            {isCanon ? (
              <PrevNextStrip label="Canon — previous and next" prev={canonAdjacent.prev} next={canonAdjacent.next} />
            ) : hasSeries ? (
              <PrevNextStrip label="Series — previous and next" prev={seriesAdjacent.prev} next={seriesAdjacent.next} />
            ) : null}
            <ShareStrip title={article.title} canonicalUrl={shareUrl} />
            {article.slug.startsWith("sandbox/") ? <SandboxCanonArticleCta /> : null}
          </article>
          {isCanon ? (
            <ReadingPathRail
              mode="canon"
              title="Canon"
              currentSlug={article.slug}
              groups={canonGroups.map((g) => ({ title: g.title, items: g.items }))}
            />
          ) : hasSeries && article.series ? (
            <ReadingPathRail
              mode="series"
              title={article.series}
              currentSlug={article.slug}
              items={seriesItems}
            />
          ) : (
            <ArticleTocRail items={article.toc} />
          )}
        </div>
      </Container>

      <ContinueReading articles={related} heading={continueHeading} />
    </>
  );
}
