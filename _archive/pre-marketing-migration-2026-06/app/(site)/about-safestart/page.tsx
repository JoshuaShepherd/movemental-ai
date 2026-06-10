import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { Container } from "@/components/studio/Container";
import { BtnPill } from "@/components/sections-mock/primitives";
import { SafeStartFaq } from "@/components/sections/about-safestart/safestart-faq";
import { SITE_FOUNDERS } from "@/lib/site-founders";
import { getCommittedSeatsLine } from "@/lib/committed-seats";

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

const WEEK_ONE = [
  "Initial leadership session: 90 minutes, full team present",
  "Vendor and tool inventory completed by your team",
  "Data classification mapping reviewed with Movemental",
  "First Statement and Policy drafts produced",
  "Mid-week working session: 60 minutes, key decision-makers",
];

const WEEK_TWO = [
  "Context, Rules, and Response Plans drafted",
  "Full five-layer Guidebook reviewed in a working session",
  "Board-ratification packet prepared",
  "Final session: walkthrough of the ratifiable Guidebook",
  "Your board ratifies; your staff can use it Monday morning",
];

const GUIDEBOOK_LAYERS = [
  {
    num: "01",
    title: "Statement",
    body: "what your organization believes about AI.",
  },
  {
    num: "02",
    title: "Policy",
    body: "what you will and will not do, operationally.",
  },
  {
    num: "03",
    title: "Context",
    body: "the data, vendors, and care boundaries your work actually involves.",
  },
  {
    num: "04",
    title: "Rules",
    body: "specific governance for data handling, disclosure, and care decisions.",
  },
  {
    num: "05",
    title: "Response Plans",
    body: "what you do when something goes wrong.",
  },
];

// DRAFT(josh-revise): Facilitator role descriptions are first-pass placeholders
// that make each founder's contribution to the SafeStart engagement clear.
// Revise these two-line descriptions in your editorial pass.
const FACILITATORS: ReadonlyArray<{
  slug: (typeof SITE_FOUNDERS)[number]["slug"];
  role: string;
}> = [
  {
    slug: "brad-brisco",
    role:
      "Brad leads the policy conversation and the board-prep work — translating missional commitments into language a governing body can ratify.",
  },
  {
    slug: "alan-hirsch",
    role:
      "Alan brings the missional and theological frame, holding the engagement to a standard beyond compliance — what AI should and should not do inside formation work.",
  },
  {
    slug: "joshua-shepherd",
    role:
      "Josh handles the technical layers — vendor inventory, data classification, integration with your existing stack — and stays available between sessions for the questions that surface mid-week.",
  },
];

function CommittedSeatsLine({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground ${className}`}
    >
      {getCommittedSeatsLine()}
    </p>
  );
}

function MidnightSeatsLine() {
  return (
    <p className="text-[11px] font-medium uppercase tracking-eyebrow text-inverse-muted">
      {getCommittedSeatsLine()}
    </p>
  );
}

export default function SafeStartPage() {
  return (
    <>
      {/* Hero — unchanged copy; adds scarcity line beneath the load-bearing sentence */}
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
            <CommittedSeatsLine className="mt-8" />
          </div>
        </Container>
      </section>

      {/* What's Included — unchanged */}
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

      {/* What the two weeks look like — NEW */}
      <section
        className="band-default border-t border-border py-16 md:py-20"
        aria-labelledby="safestart-two-weeks"
      >
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:gap-12">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground md:col-span-3">
              The engagement
            </p>
            <div className="md:col-span-9">
              <h2
                id="safestart-two-weeks"
                className="font-serif italic text-foreground text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em]"
              >
                What the two weeks look like.
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Two weeks of focused work, structured so your leadership team
                can ratify a Guidebook by the end.
              </p>
            </div>
          </div>

          <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Week one
              </p>
              <p className="mb-5 font-serif italic text-foreground text-[1.125rem] leading-snug md:text-[1.25rem]">
                Discovery and drafting.
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {WEEK_ONE.map((item) => (
                  <li key={item} className="pl-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Week two
              </p>
              <p className="mb-5 font-serif italic text-foreground text-[1.125rem] leading-snug md:text-[1.25rem]">
                Refinement and ratification.
              </p>
              <ul className="m-0 space-y-3 p-0 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {WEEK_TWO.map((item) => (
                  <li key={item} className="pl-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-2xl font-serif italic text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Total time commitment from your leadership team: roughly 6 hours
            over two weeks, plus team prep work.
          </p>
        </Container>
      </section>

      {/* Who facilitates — NEW */}
      <section
        className="band-default border-t border-border py-16 md:py-20"
        aria-labelledby="safestart-facilitates"
      >
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:gap-12">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground md:col-span-3">
              Facilitation
            </p>
            <div className="md:col-span-9">
              <h2
                id="safestart-facilitates"
                className="font-serif italic text-foreground text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em]"
              >
                Who will be in the room.
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                The Movemental team works alongside your leadership in every
                session.
              </p>
            </div>
          </div>

          <ul className="grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {FACILITATORS.map(({ slug, role }) => {
              const founder = SITE_FOUNDERS.find((f) => f.slug === slug);
              if (!founder) return null;
              return (
                <li key={slug}>
                  <div className="flex items-start gap-4">
                    <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/60 sm:w-28">
                      <Image
                        src={founder.portrait}
                        alt={`Portrait of ${founder.name}`}
                        width={960}
                        height={1200}
                        className="h-full w-full object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1 pt-1">
                      <h3 className="text-base font-medium tracking-tight text-foreground">
                        {founder.name}
                      </h3>
                      <p className="text-[13px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                        {founder.shortTitle}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {role}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* What you walk away with — NEW (five-layer Guidebook) */}
      <section
        className="band-default border-t border-border py-16 md:py-20"
        aria-labelledby="safestart-artifact"
      >
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:gap-12">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground md:col-span-3">
              The artifact
            </p>
            <div className="md:col-span-9">
              <h2
                id="safestart-artifact"
                className="font-serif italic text-foreground text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em]"
              >
                The five-layer Guidebook.
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                One document. Your board ratifies it. Your staff uses it. The
                whole organization gets it.
              </p>
            </div>
          </div>

          <ol className="m-0 grid grid-cols-1 border-t border-border md:grid-cols-2 lg:grid-cols-5">
            {GUIDEBOOK_LAYERS.map((layer, idx) => (
              <li
                key={layer.num}
                className={[
                  "flex flex-col border-b border-border p-6 md:p-8",
                  idx % 2 === 0 ? "md:border-r" : "",
                  // On lg, every column except the last has a right border
                  "lg:border-r lg:last:border-r-0",
                ].join(" ")}
              >
                <div
                  aria-hidden
                  className="mb-6 border-b border-border pb-3 font-serif italic font-normal leading-none text-foreground/30 text-[clamp(2.5rem,5vw,3.5rem)]"
                >
                  {layer.num}
                </div>
                <h3 className="mb-3 font-serif text-xl italic leading-tight tracking-tight text-foreground md:text-2xl">
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {layer.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            The Guidebook is yours. Movemental does not retain rights, license
            your content, or store proprietary versions. You can publish it,
            share it, file it with your board, or rebuild it without us.
          </p>
        </Container>
      </section>

      {/* SafeGuide / SafeStart comparison — restructured for asymmetry */}
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
            {/* Field Guide — lighter weight, kept honest */}
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

            {/* SafeStart — heavier emphasis: filled section background + accent border */}
            <article className="flex flex-col border border-foreground/20 bg-section p-8 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                  SafeStart · $1,000
                </p>
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-primary">
                  Recommended
                </p>
              </div>
              <h3 className="mt-3 font-serif text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                Facilitated SafeStart
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground md:text-base">
                External pacing, third-party adjudication, and a finished
                artifact that is alive rather than filed away. Two weeks, your
                leadership team in the room with ours, a ratifiable Guidebook at
                the end. Most organizations begin here.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  href="/contact?interest=safestart"
                  className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-eyebrow text-background transition-colors duration-200 hover:bg-primary-dim"
                >
                  Start SafeStart
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <CommittedSeatsLine className="mt-4" />
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* FAQ — NEW */}
      <section
        className="band-default border-t border-border py-16 md:py-20"
        aria-labelledby="safestart-faq"
      >
        <Container>
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:gap-12">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground md:col-span-3">
              Questions you might have
            </p>
            <h2
              id="safestart-faq"
              className="font-serif italic text-foreground text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] md:col-span-9"
            >
              Before you commit.
            </h2>
          </div>

          <SafeStartFaq />
        </Container>
      </section>

      {/* Final CTA — differentiated buttons + scarcity */}
      <section
        className="band-midnight final-cta"
        aria-labelledby="safestart-cta"
      >
        <div className="container final-cta__inner text-center">
          <h2 id="safestart-cta" className="display mx-auto max-w-3xl">
            Begin the Guidebook your board can ratify.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-inverse-muted md:text-xl">
            Two weeks of facilitated work, or forty pages of the same method on
            your own. Both end in the same five-layer Organizational Guidebook.
          </p>
          <div className="hero-actions final-cta__actions mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
            <div className="flex flex-col items-center gap-1.5">
              <BtnPill href="/contact?interest=safestart" variant="primary">
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
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-inverse-muted/80">
                Free · 40 pages · the full method
              </span>
            </div>
          </div>
          <div className="mt-10">
            <MidnightSeatsLine />
          </div>
        </div>
      </section>
    </>
  );
}
