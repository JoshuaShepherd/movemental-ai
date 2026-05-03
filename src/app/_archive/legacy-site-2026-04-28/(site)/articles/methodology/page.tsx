import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/primitives";
import { AudienceLabel, AudienceSerifEm } from "@/components/sections/audience-concept";
import { ArticleCard, ShelfHeader } from "@/components/sections/article-cards";
import { toArticleSummary } from "@/lib/articles";
import {
  listCaseStudies,
  listFieldGuides,
  listMethodology,
} from "@/lib/articles-collections";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Methodology & evidence";
const description =
  "How Movemental actually runs — fragmentation inventory, the AI Stewardship Sequence assessment backbone, field guides, and a long-horizon case study.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/articles/methodology") },
  openGraph: {
    url: canonicalPageUrl("/articles/methodology"),
    title: `${title} — Movemental`,
    description,
    type: "website",
  },
};

export default function MethodologyPage() {
  const methodology = listMethodology();
  const fieldGuides = listFieldGuides();
  const caseStudies = listCaseStudies();

  return (
    <div data-articles="methodology" className="text-pretty">
      <Section
        variant="default"
        spacing="sm"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.78rem] text-muted-foreground">
            <Link href="/articles" className="font-medium text-foreground underline-offset-4 hover:underline">Articles</Link>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span aria-current="page">Methodology</span>
          </nav>
          <AudienceLabel>Methodology &amp; evidence</AudienceLabel>
          <h1 className="mt-2 max-w-[26ch] text-balance text-display text-foreground">
            How the <AudienceSerifEm>work</AudienceSerifEm> is actually structured.
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            The methodology pieces inventory the diagnostic instruments. The field guides are the lead magnets senior leaders can share with a board. Case studies show what a decade of this work looks like in practice.
          </p>
        </Container>
      </Section>

      {methodology.length ? (
        <Section variant="section" spacing="sm" className="scroll-mt-(--site-chrome-total)" aria-labelledby="methodology-shelf">
          <Container>
            <ShelfHeader title={<span id="methodology-shelf">Methodology</span>} count={methodology.length} />
            <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {methodology.map((article) => (
                <li key={article.slug} className="h-full">
                  <ArticleCard article={toArticleSummary(article)} variant="default" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {fieldGuides.length ? (
        <Section variant="default" spacing="sm" className="scroll-mt-(--site-chrome-total)" aria-labelledby="field-guides-shelf">
          <Container>
            <ShelfHeader title={<span id="field-guides-shelf">Field guides</span>} count={fieldGuides.length} />
            <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {fieldGuides.map((article) => (
                <li key={article.slug} className="h-full">
                  <ArticleCard article={toArticleSummary(article)} variant="featured" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {caseStudies.length ? (
        <Section variant="section" spacing="sm" className="scroll-mt-(--site-chrome-total)" aria-labelledby="case-studies-shelf">
          <Container>
            <ShelfHeader title={<span id="case-studies-shelf">Case studies</span>} count={caseStudies.length} />
            <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:gap-5">
              {caseStudies.map((article) => (
                <li key={article.slug} className="h-full">
                  <ArticleCard article={toArticleSummary(article)} variant="featured" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </div>
  );
}
