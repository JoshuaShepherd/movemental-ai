import type { Metadata } from "next";
import Link from "next/link";

import { FieldGuideMarkdown } from "@/components/field-guide/FieldGuideMarkdown";
import { FieldGuideToc } from "@/components/field-guide/FieldGuideToc";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import { getFieldGuide } from "@/lib/field-guide";
import { canonicalPageUrl } from "@/lib/site-url";

const SLUG = "it-starts-with-safety";
const PDF_HREF = "/downloads/it-starts-with-safety-v1.pdf";

const guide = getFieldGuide(SLUG);

const ogTitle = `${guide.title} — Movemental Field Guide`;

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: canonicalPageUrl("/field-guide/safety") },
  openGraph: {
    type: "article",
    url: canonicalPageUrl("/field-guide/safety"),
    title: ogTitle,
    description: guide.description,
    authors: guide.authors,
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: guide.description,
  },
};

export default function FieldGuideSafetyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${guide.title}: ${guide.subtitle}`,
    description: guide.description,
    author: guide.authors.map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: guide.publisher,
      url: canonicalPageUrl("/"),
    },
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalPageUrl("/field-guide/safety") },
  };

  return (
    <div className="field-guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article aria-labelledby="field-guide-title">
        <header className="field-guide-cover bg-background pt-20 pb-16 md:pt-28 md:pb-20">
          <Container>
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                A Movemental Field Guide
              </p>
              <h1
                id="field-guide-title"
                className="font-serif-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                It Starts With <em className="italic">Safety.</em>
              </h1>
              <p className="mt-8 max-w-3xl font-serif-display text-2xl italic leading-snug text-muted-foreground md:text-3xl">
                {guide.subtitle}
              </p>
              <div className="mt-12 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
                <span>By {guide.authors.join(", ")}</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span>
                  Version {guide.version} · {guide.publisher} · 2026
                </span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={PDF_HREF} className="btn-pill btn-pill--primary" download>
                  Download the PDF
                </a>
                <a href="#contents" className="btn-pill btn-pill--ghost">
                  Read in your browser
                </a>
                <Link href="/contact?interest=safety" className="btn-pill btn-pill--ghost">
                  Start a conversation
                </Link>
              </div>
            </Reveal>
          </Container>
        </header>

        <section className="border-t border-border bg-section py-16 md:py-20" id="contents">
          <Container>
            <Reveal>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
                <aside className="field-guide-toc-shell hidden lg:block">
                  <div className="sticky top-28">
                    <FieldGuideToc entries={guide.toc} />
                  </div>
                </aside>
                <div className="field-guide-body">
                  <FieldGuideMarkdown markdown={guide.body} />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-elevated py-16 md:py-20" aria-labelledby="field-guide-form-title">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Send the PDF to your inbox
                </p>
                <h2
                  id="field-guide-form-title"
                  className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
                >
                  Take it with you.
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
                  We will send the PDF immediately and follow up once over the following week. Nothing else.
                </p>
                <div className="mx-auto max-w-md">
                  <ToolkitDownloadForm source="field-guide-safety" variant="page" layout="stacked" />
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a href={PDF_HREF} className="btn-pill btn-pill--ghost" download>
                    Download the PDF directly
                  </a>
                  <Link href="/pathway/safety" className="btn-pill btn-pill--ghost">
                    See the Safety stage
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </article>
    </div>
  );
}
