import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import {
  SANDBOX_FIELD_GUIDE_COVER_IMAGE,
  SANDBOX_FIELD_GUIDE_DISPLAY_TITLE,
  SANDBOX_FIELD_GUIDE_PDF_PATH,
} from "@/lib/sandbox-field-guide";
import { canonicalPageUrl } from "@/lib/site-url";

const GUIDE_TITLE = SANDBOX_FIELD_GUIDE_DISPLAY_TITLE;
const GUIDE_SUBTITLE = "A field guide for the Sandbox stage";
const GUIDE_DESCRIPTION =
  "Volume Two of the Movemental Field Guides. What disciplined experimentation actually looks like once Safety is in place — how to set up a sandbox, evaluate vendor claims aggressively, and build the portfolio of proof that earns the right to train your team.";
const GUIDE_AUTHORS = ["Joshua Shepherd", "Brad Brisco", "Alan Hirsch"];
const GUIDE_PUBLISHER = "Movemental";
const GUIDE_DATE = "2026-05-13";
const OG_TITLE = `${GUIDE_TITLE} — Movemental Field Guide`;

export const metadata: Metadata = {
  title: GUIDE_TITLE,
  description: GUIDE_DESCRIPTION,
  alternates: { canonical: canonicalPageUrl("/field-guides/sandbox") },
  openGraph: {
    type: "article",
    url: canonicalPageUrl("/field-guides/sandbox"),
    title: OG_TITLE,
    description: GUIDE_DESCRIPTION,
    authors: GUIDE_AUTHORS,
    images: [
      { url: SANDBOX_FIELD_GUIDE_COVER_IMAGE, width: 1600, height: 873, alt: OG_TITLE },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: GUIDE_DESCRIPTION,
    images: [SANDBOX_FIELD_GUIDE_COVER_IMAGE],
  },
};

const fieldGuideDisclaimer = (
  <>
    We send the Field Guide immediately and one follow-up email a week later asking how it
    went. Nothing else.
  </>
);

function MetaStrip() {
  const items = [
    "Volume Two",
    "Free",
    "Sandbox stage",
    "No drip campaign",
  ];
  return (
    <div
      className="my-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 font-sans text-sm font-semibold uppercase tracking-wider text-outline"
      aria-label="Field guide details"
    >
      {items.map((label, i) => (
        <Fragment key={label}>
          {i > 0 ? (
            <span className="size-1 shrink-0 rounded-none bg-outline" aria-hidden />
          ) : null}
          <span>{label}</span>
        </Fragment>
      ))}
    </div>
  );
}

const INSIDE_SECTIONS = [
  {
    eyebrow: "Setting up",
    title: "How to constitute a sandbox without it becoming a sideshow.",
    body:
      "Sandbox is not a hackathon or a "try it and see" zone. It is a constrained, instrumented environment where AI tools are tested against the real work, with named owners, defined exit criteria, and a regular cadence of "what did we learn — and what should change about how we work."",
  },
  {
    eyebrow: "Evaluating vendors",
    title: "How to read a vendor claim aggressively.",
    body:
      "The marketing pages are not the evidence. The evaluation discipline is: ask for the system prompt, ask for the eval suite, ask about data residency, ask what the model can and cannot do with your tenant. Vendors who cannot answer have not earned a pilot.",
  },
  {
    eyebrow: "Building the portfolio",
    title: "How to assemble proof a board will accept.",
    body:
      "By the end of Sandbox, you have a documented portfolio of what worked, what failed, where the formation risks landed, and what the next stage (Skills) will need to address. The portfolio is the artifact that earns the right to train staff broadly in Stage Three.",
  },
];

export default function FieldGuideSandboxPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${GUIDE_TITLE}: ${GUIDE_SUBTITLE}`,
    description: GUIDE_DESCRIPTION,
    author: GUIDE_AUTHORS.map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "Organization",
      name: GUIDE_PUBLISHER,
      url: canonicalPageUrl("/"),
    },
    datePublished: GUIDE_DATE,
    dateModified: GUIDE_DATE,
    inLanguage: "en-US",
    image: canonicalPageUrl(SANDBOX_FIELD_GUIDE_COVER_IMAGE),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalPageUrl("/field-guides/sandbox"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="bg-background text-foreground">
        <div className="pt-24 md:pt-28">
          {/* Hero */}
          <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-8 py-16 md:py-24 lg:grid-cols-2">
            <div>
              <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                Field Guide &middot; Volume Two
              </p>
              <h1 className="mb-6 font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {GUIDE_TITLE}
              </h1>
              <p className="mb-4 max-w-prose font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
                {GUIDE_SUBTITLE}.
              </p>
              <p className="max-w-prose font-sans text-base leading-relaxed text-foreground/80 md:text-lg">
                {GUIDE_DESCRIPTION}
              </p>
              <MetaStrip />
              <ToolkitDownloadForm
                source="sandbox-field-guide-page"
                variant="page"
                layout="stacked"
                submitLabel="Send me Volume Two"
                disclaimer={fieldGuideDisclaimer}
                successMessage="Volume Two is on its way. Check your inbox."
              />
              <p className="mt-6 font-sans text-sm text-muted-foreground">
                Prefer to skip the form?{" "}
                <a
                  href={SANDBOX_FIELD_GUIDE_PDF_PATH}
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Download the PDF directly
                </a>
                .
              </p>
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-elevated">
              <Image
                src={SANDBOX_FIELD_GUIDE_COVER_IMAGE}
                alt="Cover of It Continues With Exploration field guide, Volume Two"
                width={900}
                height={1200}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </section>

          {/* What's inside */}
          <section className="bg-section px-8 py-24 md:py-32">
            <div className="mx-auto max-w-7xl">
              <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                What&rsquo;s inside
              </p>
              <h2 className="mb-12 max-w-3xl font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl">
                Three disciplines, named explicitly.
              </h2>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
                {INSIDE_SECTIONS.map((section) => (
                  <article key={section.eyebrow}>
                    <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {section.eyebrow}
                    </p>
                    <h3 className="mb-4 font-serif italic text-2xl font-normal text-foreground md:text-[1.625rem]">
                      {section.title}
                    </h3>
                    <p className="font-sans text-[1rem] leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA — second download capture */}
          <section className="bg-inverse-surface px-8 py-24 text-inverse-foreground md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-inverse-foreground/70">
                Volume Two
              </p>
              <h2 className="mb-6 font-serif-display text-4xl italic leading-tight tracking-tight text-inverse-foreground md:text-5xl">
                Get the field guide your sandbox needs.
              </h2>
              <p className="mb-10 font-sans text-lg leading-relaxed text-inverse-foreground/80">
                Free. Self-contained. The handoff document between your safety work and the
                team training that comes next.
              </p>
              <ToolkitDownloadForm
                source="sandbox-field-guide-page-bottom"
                variant="page"
                layout="stacked"
                submitLabel="Send me Volume Two"
                disclaimer={fieldGuideDisclaimer}
                successMessage="Volume Two is on its way. Check your inbox."
                inputClassName="bg-transparent text-inverse-foreground placeholder:text-inverse-foreground/50"
                buttonClassName="bg-inverse-foreground text-inverse-surface hover:bg-inverse-foreground/90"
                labelClassName="text-inverse-foreground"
                footerClassName="text-inverse-foreground/70"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
