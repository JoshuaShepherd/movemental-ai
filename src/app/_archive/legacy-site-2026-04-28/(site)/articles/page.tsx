import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import {
  AudienceInvitationSection,
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";
import { ArticleCard, ShelfHeader } from "@/components/sections/article-cards";
import { toArticleSummary, type Article } from "@/lib/articles";
import {
  CANON_SECTIONS_ORDER,
  CANON_SECTION_META,
  listBySection,
  listCanonOrdered,
  listFeatured,
  listGuides,
  listMethodologyAndEvidence,
  listPlaybooks,
} from "@/lib/articles-collections";
import { listSandboxCanonHubEntries } from "@/lib/sandbox-canon";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Articles";
const description =
  "Essays, field notes, and guides from the Movemental library — the argument behind the platform, the strategies that work, and the methodology behind every engagement.";
const ogTitle = "Articles — Movemental";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/articles") },
  openGraph: {
    url: canonicalPageUrl("/articles"),
    title: ogTitle,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
  },
};

function pickCanonEntryPoints(): Article[] {
  const canon = listCanonOrdered();
  const out: Article[] = [];
  for (const section of CANON_SECTIONS_ORDER) {
    const inSection = canon.filter((a) => a.canonSection === section);
    if (!inSection.length) continue;
    const preferred = inSection.find((a) => a.featuredInSection) ?? inSection[0];
    out.push(preferred);
  }
  return out;
}

export default function ArticlesIndexPage() {
  const featured = listFeatured().slice(0, 3);
  const canonEntryPoints = pickCanonEntryPoints();
  const canonCount = listCanonOrdered().length;
  const guides = listGuides().slice(0, 3);
  const guideCount = listGuides().length;
  const playbooks = listPlaybooks();
  const methodology = listMethodologyAndEvidence().slice(0, 3);
  const methodologyCount = listMethodologyAndEvidence().length;
  const sandboxCanonCount = listSandboxCanonHubEntries().length;

  return (
    <div data-articles="concept-modern" className="text-pretty">
      <Section
        variant="default"
        spacing="sm"
        className="scroll-mt-(--site-chrome-total) pt-6 md:pt-8"
      >
        <Container>
          <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <AudienceLabel>Writing</AudienceLabel>
              <h1 className="mt-2 text-balance text-display text-foreground">Articles</h1>
              <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-muted-foreground">
                The argument behind the platform. Read the <AudienceSerifEm>canon</AudienceSerifEm> top-to-bottom, jump into a shelf, or search the <Link href="/articles/archive" className="font-medium text-foreground underline-offset-4 hover:underline">full archive</Link>.
              </p>
            </div>
            <nav
              aria-label="Articles page sections"
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground lg:shrink-0 lg:pb-1"
            >
              <Link href="#start" className="text-foreground underline-offset-4 hover:underline">
                Start here
              </Link>
              <span className="text-ink-soft" aria-hidden>·</span>
              <Link href="#canon" className="text-foreground underline-offset-4 hover:underline">
                Canon
              </Link>
              <span className="text-ink-soft" aria-hidden>·</span>
              <Link href="#guides" className="text-foreground underline-offset-4 hover:underline">
                Guides
              </Link>
              <span className="text-ink-soft" aria-hidden>·</span>
              <Link href="#playbooks" className="text-foreground underline-offset-4 hover:underline">
                Playbooks
              </Link>
              <span className="text-ink-soft" aria-hidden>·</span>
              <Link href="#methodology" className="text-foreground underline-offset-4 hover:underline">
                Methodology
              </Link>
              <span className="text-ink-soft" aria-hidden>·</span>
              <Link href="#sandbox" className="text-foreground underline-offset-4 hover:underline">
                Sandbox
              </Link>
            </nav>
          </header>

          {featured.length ? (
            <div id="start" className="mt-10 scroll-mt-(--site-chrome-total)">
              <ShelfHeader
                title={<>Start <AudienceSerifEm>here</AudienceSerifEm></>}
                deck="Three pieces that, together, explain what Movemental is arguing and why now."
              />
              <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {featured.map((article) => (
                  <li key={article.slug} className="h-full">
                    <ArticleCard article={toArticleSummary(article)} variant="featured" />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>

      <Section
        id="canon"
        variant="section"
        spacing="sm"
        aria-labelledby="canon-shelf-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <ShelfHeader
            title={<span id="canon-shelf-title">The canon</span>}
            deck="One argument in four movements and a synthesis. Read it in order, or enter at any section."
            count={canonCount}
            seeAllHref="/articles/canon"
            seeAllLabel="Read the staircase"
          />
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {canonEntryPoints.map((article) => (
              <li key={article.slug} className="h-full">
                <ArticleCard article={toArticleSummary(article)} variant="canon" />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[0.8rem] text-muted-foreground">
            {CANON_SECTIONS_ORDER.map((section) => {
              const items = listBySection(section);
              if (!items.length) return null;
              return (
                <Link
                  key={section}
                  href={`/articles/canon#${section}`}
                  className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {CANON_SECTION_META[section].title}
                  <span className="tabular-nums text-ink-soft">({items.length})</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section
        id="guides"
        variant="default"
        spacing="sm"
        aria-labelledby="guides-shelf-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <ShelfHeader
            title={<span id="guides-shelf-title">Guides</span>}
            deck="Six-piece content-strategy sequence, AI credibility in 2026, and the Movemental stack for nonprofits."
            count={guideCount}
            seeAllHref="/articles/guides"
          />
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {guides.map((article) => (
              <li key={article.slug} className="h-full">
                <ArticleCard article={toArticleSummary(article)} variant="default" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="playbooks"
        variant="section"
        spacing="sm"
        aria-labelledby="playbooks-shelf-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <ShelfHeader
            title={<span id="playbooks-shelf-title">Playbooks</span>}
            deck="Audience-specific integration playbooks — movement leader, nonprofit, church, institution."
            count={playbooks.length}
            seeAllHref="/articles/playbooks"
          />
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {playbooks.map((article) => (
              <li key={article.slug} className="h-full">
                <ArticleCard article={toArticleSummary(article)} variant="default" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="methodology"
        variant="default"
        spacing="sm"
        aria-labelledby="methodology-shelf-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <ShelfHeader
            title={<span id="methodology-shelf-title">Methodology &amp; evidence</span>}
            deck="How the work actually runs — fragmentation inventory, AI Stewardship Sequence checklist, and a long-horizon case study."
            count={methodologyCount}
            seeAllHref="/articles/methodology"
          />
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {methodology.map((article) => (
              <li key={article.slug} className="h-full">
                <ArticleCard article={toArticleSummary(article)} variant="default" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="sandbox"
        variant="section"
        spacing="sm"
        aria-labelledby="sandbox-shelf-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-card p-6 shadow-ambient md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-2xl">
              <p id="sandbox-shelf-title" className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Sandbox curriculum
              </p>
              <h2 className="mt-2 text-balance text-[clamp(1.4rem,2.4vw,1.75rem)] font-semibold leading-snug tracking-tight text-foreground">
                {sandboxCanonCount} articles, <AudienceSerifEm>one season design</AudienceSerifEm>
              </h2>
              <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                The public argument behind the Sandbox Season — structured exploration, pattern recognition, scoring, ethics, portfolio assembly.
              </p>
            </div>
            <Link
              href="/articles/sandbox"
              className="group inline-flex items-center gap-2 self-start whitespace-nowrap rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-ambient transition-transform duration-normal hover:-translate-y-0.5"
            >
              Read the curriculum
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>

      <RevealOnScroll>
        <AudienceInvitationSection
          id="subscribe"
          label="Stay with the writing"
          titleId="articles-invitation-title"
          title={
            <>
              New pieces land here <AudienceSerifEm>before anywhere else</AudienceSerifEm>.
            </>
          }
          body={
            <p>
              If you want the library as it grows, subscribe. One email per piece, no digest, no filler.
            </p>
          }
          bodySoft="Prefer to read a whole argument end to end? The book gathers the thesis in one place."
          primaryCta={{ label: "Get new writing", href: "/contact" }}
          secondaryCta={{ label: "Read the book", href: "/book" }}
        />
      </RevealOnScroll>
    </div>
  );
}
