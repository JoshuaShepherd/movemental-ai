import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/primitives";
import { AudienceLabel, AudienceSerifEm } from "@/components/sections/audience-concept";
import { ArticleCard, ShelfHeader } from "@/components/sections/article-cards";
import { toArticleSummary } from "@/lib/articles";
import {
  SERIES_META,
  listSeriesArticles,
} from "@/lib/articles-collections";
import type { SeriesKey } from "@/lib/articles-schema";
import { SERIES_KEYS } from "@/lib/articles-schema";
import { canonicalPageUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: SeriesKey }> {
  return SERIES_KEYS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!SERIES_KEYS.includes(slug as SeriesKey)) return { title: "Series not found" };
  const meta = SERIES_META[slug as SeriesKey];
  const url = canonicalPageUrl(`/articles/series/${slug}`);
  return {
    title: `${meta.title} · Series`,
    description: meta.deck,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${meta.title} — Movemental`,
      description: meta.deck,
      type: "website",
    },
  };
}

export default async function SeriesPage({ params }: PageProps) {
  const { slug } = await params;
  if (!SERIES_KEYS.includes(slug as SeriesKey)) notFound();
  const seriesKey = slug as SeriesKey;
  const items = listSeriesArticles(seriesKey);
  if (!items.length) notFound();
  const meta = SERIES_META[seriesKey];

  return (
    <div data-articles="series" className="text-pretty">
      <Section
        variant="default"
        spacing="sm"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.78rem] text-muted-foreground">
            <Link href="/articles" className="font-medium text-foreground underline-offset-4 hover:underline">Articles</Link>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span>Series</span>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span aria-current="page">{meta.title}</span>
          </nav>
          <AudienceLabel>Series</AudienceLabel>
          <h1 className="mt-2 max-w-[26ch] text-balance text-display text-foreground">
            {meta.title.split(" ").length > 1 ? (
              <>
                {meta.title.split(" ").slice(0, -1).join(" ")}{" "}
                <AudienceSerifEm>{meta.title.split(" ").at(-1)}</AudienceSerifEm>
              </>
            ) : (
              <AudienceSerifEm>{meta.title}</AudienceSerifEm>
            )}
          </h1>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">{meta.deck}</p>
        </Container>
      </Section>

      <Section variant="section" spacing="sm" className="scroll-mt-(--site-chrome-total)">
        <Container>
          <ShelfHeader title="In order" count={items.length} />
          <ol className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {items.map((article) => (
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
    </div>
  );
}
