import type { Metadata } from "next";
import Link from "next/link";

import { Container, Display, Section } from "@/components/primitives";
import { AudienceLabel, AudienceSerifEm } from "@/components/sections/audience-concept";
import {
  CANON_SECTIONS_ORDER,
  CANON_SECTION_META,
  listBySection,
  listCanonOrdered,
} from "@/lib/articles-collections";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "The Movemental Canon";
const description =
  "One argument in four movements and a synthesis — the 23-piece Movemental canon, in reading order.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/articles/canon") },
  openGraph: {
    url: canonicalPageUrl("/articles/canon"),
    title: `${title} — Movemental`,
    description,
    type: "website",
  },
};

export default function CanonPage() {
  const total = listCanonOrdered().length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div data-articles="canon" className="text-pretty">
      <Section variant="midnight" spacing="lg" as="header" className="pt-28 md:pt-32">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-[0.78rem] text-inverse-foreground/55"
          >
            <Link href="/articles" className="font-medium text-inverse-foreground/65 hover:text-inverse-foreground">
              Articles
            </Link>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span aria-current="page">Canon</span>
          </nav>
          <AudienceLabel className="text-inverse-foreground/70">The canon</AudienceLabel>
          <Display
            as="h1"
            size="lg"
            className="mt-4 max-w-[22ch] text-balance text-inverse-foreground"
          >
            One argument, <AudienceSerifEm>in four movements</AudienceSerifEm>.
          </Display>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-inverse-foreground/75">
            Read the canon top-to-bottom, or enter at the section that names what you are living. The order is the framework — each piece creates the preconditions for the next.
          </p>
          <p className="mt-4 text-[0.78rem] uppercase tracking-eyebrow text-inverse-foreground/60">
            <span className="tabular-nums">{pad(total)}</span> pieces · ~8 hours of reading
          </p>
        </Container>
      </Section>

      {CANON_SECTIONS_ORDER.map((section) => {
        const items = listBySection(section);
        if (!items.length) return null;
        const meta = CANON_SECTION_META[section];

        return (
          <Section
            key={section}
            id={section}
            variant="default"
            spacing="sm"
            aria-labelledby={`canon-${section}-title`}
            className="scroll-mt-(--site-chrome-total)"
          >
            <Container>
              <div className="max-w-[60ch] border-b border-border pb-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
                  Section {CANON_SECTIONS_ORDER.indexOf(section) + 1}
                </p>
                <h2
                  id={`canon-${section}-title`}
                  className="mt-2 text-balance font-serif text-[clamp(1.6rem,3vw,2.25rem)] italic font-normal leading-snug tracking-tight text-foreground"
                >
                  {meta.title}
                </h2>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
                  {meta.deck}
                </p>
              </div>
              <ol className="mt-8 divide-y divide-border">
                {items.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex flex-col gap-2 py-6 transition-colors hover:bg-section/30 md:flex-row md:items-start md:gap-8 md:py-7"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 font-serif text-[2rem] italic font-normal leading-none tracking-tight text-primary/30 tabular-nums md:text-[2.5rem] md:text-primary/25 md:group-hover:text-primary/40"
                      >
                        {pad(article.canonOrder ?? 0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[1.1rem] font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[1.2rem]">
                          {article.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 max-w-[68ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                          {article.deck ?? article.excerpt}
                        </p>
                        <p className="mt-3 text-[0.74rem] uppercase tabular-nums tracking-eyebrow text-ink-soft">
                          {article.readTime}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </Container>
          </Section>
        );
      })}

      <Section variant="section" spacing="sm">
        <Container>
          <div className="mx-auto max-w-[56ch] text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
              Finished the canon?
            </p>
            <h2 className="mt-2 text-balance text-[clamp(1.4rem,2.4vw,1.75rem)] font-semibold leading-snug tracking-tight text-foreground">
              Read the <AudienceSerifEm>book</AudienceSerifEm>, or begin a <AudienceSerifEm>Sandbox Season</AudienceSerifEm>.
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-normal hover:-translate-y-0.5"
              >
                Read the book
              </Link>
              <Link
                href="/services/sandbox-season"
                className="inline-flex items-center rounded-pill border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform duration-normal hover:-translate-y-0.5"
              >
                Sandbox Season
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
