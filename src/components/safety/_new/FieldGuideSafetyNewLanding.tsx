import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import { SAFETY_FIELD_GUIDE_COVER_IMAGE } from "@/lib/safety-field-guide";

const META_PILLS = ["33 pages", "Free", "Self-assessment included", "No drip campaign"];

const FIELD_GUIDE_DISCLAIMER: ReactNode = (
  <>
    We send the Field Guide immediately and one follow-up email a week later asking how it went. Nothing else.
  </>
);

function MetaPills() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-muted-foreground"
      aria-label="Field Guide details"
    >
      {META_PILLS.map((label, i) => (
        <Fragment key={label}>
          {i > 0 ? (
            <span className="size-1 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
          ) : null}
          <span>{label}</span>
        </Fragment>
      ))}
    </div>
  );
}

const AUDIENCES = [
  {
    title: "Executive Pastors",
    body: "For leaders managing complex congregational dynamics, staff teams, and sensitive pastoral care data. The guide provides clarity on what AI should never touch, preserving the sanctity of human ministry.",
  },
  {
    title: "Executive Directors",
    body: "For non-profit leaders handling donor information, beneficiary data, and public trust. The guide offers a framework to ensure efficiency tools do not compromise ethical commitments or legal compliance.",
  },
  {
    title: "Institutional Presidents",
    body: "For heads of educational or legacy institutions overseeing academic integrity and institutional reputation. The guide establishes high-level policy requirements to guide faculty, staff, and student engagement.",
  },
] as const;

export function FieldGuideSafetyNewLanding() {
  return (
    <div className="bg-background text-foreground">
      <div className="pt-24 md:pt-28">
        {/* 1. Hero / primary lead capture */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-8 py-16 md:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Free Field Guide · Volume One
            </span>
            <h1 className="font-serif-display text-5xl font-normal italic leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <em>It</em> Starts With Safety.
            </h1>
            <p className="max-w-xl font-sans text-xl font-light leading-relaxed text-muted-foreground md:text-2xl">
              A 33-page protocol defining the foundational decisions required to protect your
              organization&rsquo;s mission and people in the era of artificial intelligence.
            </p>
            <MetaPills />
            {/* fieldGuide defaults to "safety" on the API; the form doesn't accept it as a prop. */}
            <ToolkitDownloadForm
              source="field-guide-safety-new-hero"
              variant="page"
              layout="stacked"
              emailLabel="Email Address"
              organizationLabel="Organization"
              organizationOptional={false}
              disclaimer={FIELD_GUIDE_DISCLAIMER}
              successMessage="Check your email for the Field Guide."
              className="mt-2 border-t border-border pt-8"
              footerClassName="not-italic"
            />
          </div>
          <figure className="relative w-full overflow-hidden border border-border bg-section shadow-ambient aspect-video lg:aspect-4/5">
            <Image
              src={SAFETY_FIELD_GUIDE_COVER_IMAGE}
              alt="It Starts With Safety — Movemental Safety Field Guide cover"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <figcaption className="sr-only">
              Movemental Safety Field Guide — Stage 01 · Volume One
            </figcaption>
          </figure>
        </section>

        {/* 2. One-section explainer */}
        <section className="bg-background px-8 pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl space-y-6 font-sans text-lg leading-relaxed text-muted-foreground">
            <p>
              The Field Guide produces a complete AI Organizational Guidebook&nbsp;&mdash; five layers, ratifiable
              by your board, walkable in one to two months by your team alone. The order is fixed; the
              shape of each layer is yours.
            </p>
            <p>
              SafeGuide is the path you walk when the Field Guide is your only companion. If you want
              facilitation, that&rsquo;s SafeStart&nbsp;&mdash; $1,000, two weeks, drafted with you inside a
              dashboard. The page about that is{" "}
              <Link
                href="/pathway/safety-new#safestart"
                className="text-foreground underline-offset-4 hover:underline"
              >
                here
              </Link>
              .
            </p>
          </div>
        </section>

        {/* 3. Audience block */}
        <section className="bg-background px-8 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="mx-auto mb-16 max-w-2xl text-center font-serif-display text-3xl font-semibold italic md:text-4xl">
              Written for senior leaders at three kinds of mission-driven organizations.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {AUDIENCES.map((col) => (
                <div key={col.title} className="flex flex-col gap-4 border-t border-border pt-8">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">
                    {col.title}
                  </h3>
                  <p className="font-sans leading-relaxed text-muted-foreground">{col.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Self-assessment note */}
        <section className="bg-elevated px-8 py-16 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
            <h2 className="font-serif-display text-2xl font-semibold italic leading-snug text-foreground md:text-3xl">
              Most leadership teams take the self-assessment within two weeks of receiving the Field Guide.
            </h2>
            <p className="font-sans text-lg leading-relaxed text-muted-foreground">
              The 30-minute team self-assessment lives inside the PDF. Many teams use it independently to
              draft their initial AI policies. For organizations requiring deeper alignment, expert
              facilitation, or customized policy drafting, SafeStart provides a guided container.
            </p>
          </div>
        </section>

        {/* 5. Midnight bottom band — second lead capture */}
        <section className="band-midnight px-8 py-24 md:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-inverse-muted">
              Free Field Guide · Volume One
            </span>
            <h2 className="font-serif-display text-4xl font-normal italic leading-[1.05] tracking-tight text-inverse-foreground md:text-5xl">
              <em>It</em> Starts With Safety.
            </h2>
            {/* Cream tile wraps the form so it retains native styling on the midnight band. */}
            <div className="w-full max-w-xl bg-card p-8 text-left shadow-ambient">
              <ToolkitDownloadForm
                source="field-guide-safety-new-footer"
                variant="page"
                layout="stacked"
                emailLabel="Email Address"
                organizationLabel="Organization"
                organizationOptional={false}
                disclaimer={FIELD_GUIDE_DISCLAIMER}
                successMessage="Check your email for the Field Guide."
                footerClassName="not-italic"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
