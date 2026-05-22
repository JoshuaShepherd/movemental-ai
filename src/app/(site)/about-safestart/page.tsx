import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { Container } from "@/components/studio/Container";
import { BtnPill } from "@/components/sections-mock/primitives";

export const metadata: Metadata = {
  title: "SafeStart — the $1,000 engagement",
  description:
    "Two weeks of facilitated work that produces a board-ratifiable AI Organizational Guidebook in five layers your leadership can sign and your team can follow.",
};

const PRODUCES = [
  "Acceptable Use Policy and Named Refusals",
  "Vendor & Tool Inventory and Data Classification",
  "Data Handling, Disclosure, and Care Boundaries",
  "Incident Response Plan",
];

const SIGNALS = [
  "Board has ratified your AI position",
  "Staff know what is permitted and what is not",
  "No unmanaged AI use",
  "You can answer the question “what is our AI policy?” in one paragraph",
];

const IF_SKIPPED = [
  "Staff create habits before standards exist",
  "Risk surfaces after damage is done",
  "Leadership becomes reactive instead of proactive",
];

export default function SafeStartPage() {
  return (
    <>
      <section
        className="band-default pt-16 pb-12 md:pt-20 md:pb-16"
        aria-labelledby="safestart-h1"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
              The $1,000 engagement
            </p>
            <h1
              id="safestart-h1"
              className="mt-4 font-serif italic font-normal text-foreground leading-[1.02] tracking-[-0.02em] text-[clamp(3rem,7vw,5.5rem)]"
            >
              SafeStart.
            </h1>
            <p className="mt-6 font-serif italic text-foreground text-[1.25rem] leading-[1.45] md:text-[1.5rem]">
              Two weeks of facilitated work that produces a board-ratifiable AI
              Organizational Guidebook in five layers your leadership can sign
              and your team can follow.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="band-default border-t border-border py-16 md:py-20"
        aria-labelledby="safestart-included"
      >
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:gap-12">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground md:col-span-3">
              What’s included
            </p>
            <h2
              id="safestart-included"
              className="font-serif italic text-foreground text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] md:col-span-9"
            >
              A complete, ratifiable Safety stage — facilitated end to end.
            </h2>
          </div>

          <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-8">
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                What this stage produces
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {PRODUCES.map((item) => (
                  <li key={item} className="pl-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                How you know it’s in place
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {SIGNALS.map((item) => (
                  <li key={item} className="pl-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                If this stage is skipped
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {IF_SKIPPED.map((item) => (
                  <li key={item} className="pl-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            SafeStart is the facilitated form of the Safety stage on the
            Movemental Path.{" "}
            <Link
              href="/pathway"
              className="border-b border-foreground/30 pb-0.5 text-foreground transition-colors hover:border-foreground"
            >
              See the full four-stage path →
            </Link>
          </p>
        </Container>
      </section>

      <section
        className="band-default border-t border-border py-16 md:py-20"
        aria-labelledby="safestart-vs-fieldguide"
      >
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:gap-12">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground md:col-span-3">
              Two paths to the same Guidebook
            </p>
            <h2
              id="safestart-vs-fieldguide"
              className="font-serif italic text-foreground text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] md:col-span-9"
            >
              Self-directed with the Field Guide, or facilitated with SafeStart.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <article className="flex flex-col border border-border p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Field Guide · free
              </p>
              <h3 className="mt-3 font-serif text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                SafeGuide
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                If you have time, alignment, internal capacity, and the
                discipline of finishing what you start — the Field Guide is
                enough. Same method, same five layers, self-directed.
              </p>
              <Link
                href="/field-guides/safety"
                className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium uppercase tracking-eyebrow text-foreground"
              >
                <Download className="size-4" aria-hidden />
                Download the Field Guide
              </Link>
            </article>

            <article className="flex flex-col border border-border bg-section/50 p-8 md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                SafeStart · $1,000
              </p>
              <h3 className="mt-3 font-serif text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                Facilitated SafeStart
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                If your leadership team would benefit from external pacing and
                third-party adjudication, SafeStart is the facilitated path —
                two weeks, ratifiable Guidebook, the work done with you.
              </p>
              <Link
                href="/contact?interest=safestart"
                className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium uppercase tracking-eyebrow text-foreground"
              >
                Start SafeStart
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>
          </div>
        </Container>
      </section>

      <section
        className="band-midnight final-cta"
        aria-labelledby="safestart-cta"
      >
        <div className="container final-cta__inner text-center">
          <h2
            id="safestart-cta"
            className="display mx-auto max-w-3xl"
          >
            Begin the Guidebook your board can ratify.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-inverse-muted md:text-xl">
            Two weeks of facilitated work, or forty pages of the same method on
            your own. Both end in the same five-layer Organizational Guidebook.
          </p>
          <div className="hero-actions final-cta__actions mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
            <div className="flex flex-col items-center gap-1.5">
              <BtnPill
                href="/contact?interest=safestart"
                variant="primary"
              >
                Start SafeStart
              </BtnPill>
              <span className="text-[12px] font-medium uppercase tracking-eyebrow text-inverse-muted">
                $1,000 · two weeks · ratifiable Guidebook
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <BtnPill href="/field-guides/safety" variant="ghost">
                Download the Field Guide first
              </BtnPill>
              <span className="text-[12px] font-medium uppercase tracking-eyebrow text-inverse-muted">
                Free · 40 pages · the full method
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
