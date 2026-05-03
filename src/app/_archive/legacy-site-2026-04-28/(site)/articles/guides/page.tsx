import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/primitives";
import { AudienceLabel, AudienceSerifEm } from "@/components/sections/audience-concept";
import { ArticleCard, ShelfHeader } from "@/components/sections/article-cards";
import { toArticleSummary } from "@/lib/articles";
import { listGuides, listSeriesArticles, SERIES_META } from "@/lib/articles-collections";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Guides";
const description =
  "Practical Movemental guides — the six-piece content-strategy sequence, AI credibility in 2026, and nonprofit stack use cases.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/articles/guides") },
  openGraph: {
    url: canonicalPageUrl("/articles/guides"),
    title: `${title} — Movemental`,
    description,
    type: "website",
  },
};

export default function GuidesPage() {
  const allGuides = listGuides();
  const contentStrategy = listSeriesArticles("content-strategy");
  const standalone = allGuides.filter((g) => g.series !== "content-strategy");

  return (
    <div data-articles="guides" className="text-pretty">
      <Section
        variant="default"
        spacing="sm"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.78rem] text-muted-foreground">
            <Link href="/articles" className="font-medium text-foreground underline-offset-4 hover:underline">Articles</Link>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span aria-current="page">Guides</span>
          </nav>
          <AudienceLabel>Guides</AudienceLabel>
          <h1 className="mt-2 max-w-[24ch] text-balance text-display text-foreground">
            How the <AudienceSerifEm>work</AudienceSerifEm> actually runs.
          </h1>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
            Practical pieces a leader can act on this week — SEO/GEO-shaped, argued honestly, and linked into the canon.
          </p>
        </Container>
      </Section>

      {contentStrategy.length ? (
        <Section
          variant="section"
          spacing="sm"
          aria-labelledby="cs-series-title"
          className="scroll-mt-(--site-chrome-total)"
        >
          <Container>
            <ShelfHeader
              title={
                <span id="cs-series-title">
                  <AudienceSerifEm>Series</AudienceSerifEm> · {SERIES_META["content-strategy"].title}
                </span>
              }
              deck={SERIES_META["content-strategy"].deck}
              count={contentStrategy.length}
            />
            <ol className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {contentStrategy.map((article) => (
                <li key={article.slug} className="h-full">
                  <ArticleCard
                    article={toArticleSummary(article)}
                    variant="canon"
                    numeral={article.seriesOrder}
                  />
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      ) : null}

      {standalone.length ? (
        <Section
          variant="default"
          spacing="sm"
          aria-labelledby="standalone-guides-title"
          className="scroll-mt-(--site-chrome-total)"
        >
          <Container>
            <ShelfHeader
              title={<span id="standalone-guides-title">Standalone guides</span>}
              count={standalone.length}
            />
            <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {standalone.map((article) => (
                <li key={article.slug} className="h-full">
                  <ArticleCard article={toArticleSummary(article)} variant="default" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section variant="section" spacing="sm">
        <Container>
          <p className="text-sm text-muted-foreground">
            Looking for a specific piece? Try the{" "}
            <Link href="/articles/archive" className="font-medium text-foreground underline-offset-4 hover:underline">
              full archive
            </Link>
            .
          </p>
        </Container>
      </Section>
    </div>
  );
}
