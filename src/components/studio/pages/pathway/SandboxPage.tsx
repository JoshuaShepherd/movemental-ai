"use client";

import Link from "next/link";

import { FieldGuideAuthorBios } from "@/components/pathway/field-guide-author-bios";
import { FieldGuideSeriesMast } from "@/components/pathway/field-guide-series-mast";
import { PathwayStageRail } from "@/components/pathway/pathway-stage-rail";
import { PathwayVoiceFallback } from "@/components/pathway/pathway-voice-fallback";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import {
  SANDBOX_FIELD_GUIDE_COVER_IMAGE,
  SANDBOX_FIELD_GUIDE_DISPLAY_TITLE,
} from "@/lib/sandbox-field-guide";
import { cn } from "@/lib/utils";

const MAX = "mx-auto w-full max-w-[var(--container-max)] px-6 sm:px-8 lg:px-12";
const SECTION = "py-16 md:py-24 lg:py-28";

/**
 * The eight canonical phases of Sandbox, as the field guide names them.
 * Boundaries → Assessment → Experimenting → Iteration → Reflection → Ethics Review
 * → Discerning → Future Plan. Together they produce a board-facing Future Plan.
 */
const PHASES: ReadonlyArray<{ eyebrow: string; title: string; body: string }> = [
  {
    eyebrow: "Phase 01",
    title: "Boundaries",
    body: "We set the three boundaries — Publication, Privacy, Personal — that make the Sandbox safe enough to be honest. The boundaries become the operating environment for everything that follows.",
  },
  {
    eyebrow: "Phase 02",
    title: "Assessment",
    body: "We assess where each member of the working group is — current AI familiarity, role-specific exposure, comfort with the tools — and adapt the Sandbox curriculum to meet your team where they are.",
  },
  {
    eyebrow: "Phase 03",
    title: "Experimenting",
    body: "Your team runs Movemental’s pre-tested starter use cases against real organizational work, documenting findings in your private dashboard. The library is configured to your work before your team touches it.",
  },
  {
    eyebrow: "Phase 04",
    title: "Iteration",
    body: "What worked is refined; what didn’t is rebuilt or set aside. The point is not to defend the first attempt — the point is to discover, through iteration, what produces real value in your context.",
  },
  {
    eyebrow: "Phase 05",
    title: "Reflection",
    body: "We hold a session that asks not what AI did, but what the people doing the work noticed in themselves. Personal boundaries — fatigue, parasocial attachment, reality recalibration — surface here.",
  },
  {
    eyebrow: "Phase 06",
    title: "Ethics Review",
    body: "We surface the ethical questions each use case raises — about voice, disclosure, whose work is being represented. Some resolve cleanly; others surface tensions worth holding in writing.",
  },
  {
    eyebrow: "Phase 07",
    title: "Discerning",
    body: "Every use case is adjudicated green, yellow, or red — what to deploy readily, what to deploy with guardrails, what to refuse outright. The result is the Use Case Portfolio.",
  },
  {
    eyebrow: "Phase 08",
    title: "Future Plan",
    body: "Your leadership reads the evidence and decides: what to deploy, what to defer, what to refuse, what to learn next. The Future Plan is the board-facing output of Sandbox.",
  },
];

const FIELD_GUIDE_INSIDE: ReadonlyArray<string> = [
  "The eight phases — Boundaries through Future Plan — and what each one produces.",
  "The three boundaries: Publication, Privacy, Personal — including the personal boundaries no other Sandbox work names.",
  "Movemental’s adjudication framework: green / yellow / red, with worked examples.",
  "Templates for the Use Case Portfolio, Discernment Memo, and Sandbox Readiness Assessment.",
  "A SandboxGuide vs. SandboxLive comparison so you can choose between running it yourselves or hiring facilitation.",
  "Citations across MIT NANDA, BCG, McKinsey, and the leading nonprofit AI benchmarks.",
];

export function SandboxPage() {
  return (
    <div className="pathway-sandbox">
      <PathwayStageRail variant="sandbox" />
      <FieldGuideSeriesMast active="vol-02" />

      {/* Cross-promotion to Safety — visible to readers who land on Sandbox directly */}
      <section className="bg-section" aria-label="If you haven’t completed Safety">
        <div className={cn(MAX, "flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between")}>
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-semibold uppercase tracking-eyebrow text-pathway-accent">You’re on Sandbox.</span>{" "}
            If you haven’t completed Safety yet, start there — Sandbox depends on it.
          </p>
          <Link
            href="/pathway/safety"
            className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2"
          >
            Go to Stage 01 · Safety →
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className={cn(SECTION, "bg-background")} id="hero" aria-labelledby="sandbox-hero-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20")}>
            <div className="lg:col-span-7">
              <span className="mb-6 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 02 // Sandbox
              </span>
              <h1
                id="sandbox-hero-title"
                className="mb-8 max-w-4xl font-serif-display text-[clamp(2.25rem,7vw,4.5rem)] italic leading-[0.95] tracking-tight text-foreground"
              >
                Safety told you what’s allowed. Sandbox is where you find out{" "}
                <span className="font-serif-display italic">what’s valuable.</span>
              </h1>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                The Sandbox stage is where your team tries AI against your actual work, in eight bounded phases, and
                produces a board-ready Future Plan naming what your organization will deploy, modify, or refuse. The
                free field guide walks you through the work. SandboxLive is the facilitated version, with roughly ten
                hours of in-person teaching per cohort.
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <Link
                  href="#field-guide"
                  className="inline-flex items-center gap-2 bg-pathway-accent px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-opacity hover:opacity-90"
                >
                  <LockIcon className="h-3.5 w-3.5" aria-hidden />
                  Read the Sandbox Field Guide
                </Link>
                <Link
                  href="/contact?interest=sandboxlive"
                  className="border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent"
                >
                  Talk to us about SandboxLive
                </Link>
              </div>
              <p className="mb-8 max-w-md text-xs italic leading-relaxed text-muted-foreground">
                For organizations that have completed Safety. Three paths through the gate — completed SafeStart,
                self-attestation, or Movemental review.
              </p>
              <p className="max-w-xl text-sm italic leading-relaxed text-muted-foreground">
                Volume Two of the Movemental Field Guides. 48 pages. By Brad Brisco, Alan Hirsch, and Joshua Shepherd.
              </p>
            </div>

            <aside className="border-t border-border/40 bg-section p-10 md:p-12 lg:col-span-5">
              <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What this produces
              </span>
              <p className="mb-8 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                A Future Plan.{" "}
                <span className="text-muted-foreground/90">
                  Together, three documents constitute the board-facing output of Sandbox.
                </span>
              </p>
              <ul className="space-y-1">
                {(
                  [
                    ["01", "Use Case Portfolio", "Green / yellow / red verdicts on every use case the Sandbox surfaced (from Phase 07)."],
                    ["02", "Discernment Memo", "The synthesis of what the cohort learned and what your organization commits to (from Phase 08)."],
                    ["03", "Sandbox Readiness Assessment", "Whether you’re ready to move to Skills, and where the readiness gaps are."],
                  ] as const
                ).map(([num, label, body], i) => (
                  <li
                    key={num}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-4",
                      i < 2 && "border-b border-border/55",
                    )}
                  >
                    <span className="font-serif-display text-xl italic text-pathway-accent">{num}</span>
                    <div>
                      <p className="text-[0.95rem] text-foreground">{label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs italic leading-relaxed text-foreground">
                Together, these three documents constitute your Future Plan — the board-facing output of Sandbox.
              </p>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* Why Sandbox exists — replaces the pilot framing */}
      <section className={cn(SECTION, "bg-section")} aria-labelledby="why-sandbox-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Why this stage exists
              </p>
              <h2
                id="why-sandbox-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Sandbox is a place to play, learn, and discover, safely.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                It cannot be turned into more than that. Or less. The three boundaries — Publication, Privacy, Personal
                — make the exploration safe enough to be honest about what you find.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-border/30 md:grid-cols-3">
              {(
                [
                  [
                    "i.",
                    "Publication",
                    "What may leave the Sandbox during exploration. Default: nothing. No donor-facing edges, no signature-gravity communications, no public output under your name. Failure inside the sandbox costs nothing; what we learn from it costs nothing either.",
                  ],
                  [
                    "ii.",
                    "Privacy",
                    "What data may enter the Sandbox. Drawn from your Guidebook’s Data Handling Rules — donor records, member directories, clinical notes, and protected information stay outside unless explicit guardrails permit otherwise.",
                  ],
                  [
                    "iii.",
                    "Personal",
                    "Safeguards for the people doing the work — cognitive fatigue, parasocial attachment, and reality recalibration that prolonged AI work produces. No other Sandbox consulting work names this. It is the field guide’s most distinctive contribution.",
                  ],
                ] as const
              ).map(([roman, title, body]) => (
                <div key={title} className="bg-background p-10 md:p-12">
                  <span className="mb-6 block font-serif-display text-3xl italic text-pathway-accent">{roman}</span>
                  <h3 className="mb-4 text-xl text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
            <blockquote className="mt-20 max-w-3xl border-l-2 border-pathway-accent/80 py-2 pl-6 md:mt-24 md:pl-10">
              <p className="font-serif-display text-2xl italic leading-snug tracking-tight text-foreground md:text-3xl">
                You cannot decide what AI is for in your organization by reading about other organizations. The value,
                the risks, and the ethical questions specific to your work only become visible when your team has
                actually done the work with AI alongside it.
              </p>
              <cite className="mt-6 block text-[0.7rem] font-semibold uppercase tracking-eyebrow not-italic text-muted-foreground">
                — <em className="not-italic">It Continues With Exploration</em>, Movemental Field Guide Vol. 2
              </cite>
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* What Movemental brings */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="library-title">
        <Reveal>
          <div className={MAX}>
            <div className="max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What Movemental brings
              </p>
              <h2
                id="library-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Years of tested AI use cases, applied to your specific organization.
              </h2>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Sandbox is not your team starting from scratch. Movemental has spent years compiling, testing, and
                verifying AI use cases specifically as they intersect with the functions of churches, nonprofits, and
                theological institutions. Your Sandbox engagement opens that library to your team and applies it to your
                actual work.
              </p>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
                The library includes use cases for sermon and teaching preparation, donor communications, grant writing,
                administrative workflows, pastoral correspondence templates, board materials, curriculum development,
                research synthesis, member care, program reporting, and dozens of other functions specific to
                mission-driven organizations. Each use case comes with a tested recipe: the prompt structure, the
                guardrails, the failure modes Movemental has already encountered, and the adjudication (green, yellow,
                or red) that emerged from prior testing.
              </p>
              <p className="max-w-2xl font-serif-display text-lg italic leading-snug text-foreground md:text-xl">
                Your team does not invent the use cases from scratch. You evaluate Movemental’s pre-tested library
                against your specific work, document what produces value and what does not, and decide which use cases
                belong in your organization’s portfolio.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Future Plan — three documents that compose it */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="produces-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                The Future Plan
              </p>
              <h2
                id="produces-title"
                className="mb-6 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Three documents. Together, they constitute the board-facing output of Sandbox.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Each document is produced through real exploration, not authored in isolation and handed back. By the
                end of the engagement, your organization has the evidence it needs to decide what comes next — and the
                documents to defend that decision to your board.
              </p>
            </div>

            <div className="grid grid-cols-1 border-t border-l border-border/40 md:grid-cols-2">
              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 bg-background p-10 transition-colors hover:bg-section md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">01</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Use Case Portfolio
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  From Phase 07 — green / yellow / red verdicts on every AI use case the Sandbox surfaced.
                </p>
                <ul className="space-y-0 border-t border-border/40 text-sm text-muted-foreground">
                  <li className="border-b border-border/55 py-4">
                    <strong className="text-foreground">Green light:</strong> Clear human benefit, no meaningful
                    negative consequences. Deploy readily.
                  </li>
                  <li className="border-b border-border/55 py-4">
                    <strong className="text-foreground">Yellow light:</strong> Real benefit only with sufficient
                    guardrails in place. Most use cases land here.
                  </li>
                  <li className="py-4">
                    <strong className="text-foreground">Red light:</strong> Causes harm regardless of how carefully it
                    is deployed. Goes into the Named Refusals document from Safety.
                  </li>
                </ul>
                <p className="mt-auto pt-6 text-sm italic text-muted-foreground">
                  The portfolio is the operational memory of the work.
                </p>
              </article>

              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 bg-background p-10 transition-colors hover:bg-section md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">02</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Discernment Memo
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  From Phase 08 — the synthesis of what the cohort learned and what your organization commits to. The
                  patterns the adjudications make visible, named in leadership language. What your team would deploy,
                  what it would refuse, and what it needs to learn before deciding.
                </p>
                <p className="mt-8 text-sm italic text-muted-foreground">The memo is what your board reads.</p>
              </article>

              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 bg-background p-10 transition-colors hover:bg-section md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">03</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Sandbox Readiness Assessment
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  Companion to Phase 08 — the honest evaluation of whether your organization is ready to move to Skills,
                  and where the readiness gaps are. Specific to your team’s actual capacity, not a generic checklist.
                </p>
                <p className="mt-8 text-sm italic text-muted-foreground">
                  The assessment is what determines what comes next.
                </p>
              </article>

              <div className="flex min-h-[320px] flex-col justify-between border-r border-b border-inverse-surface bg-inverse-surface p-10 text-primary-foreground md:p-12">
                <div>
                  <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-primary-foreground/60">
                    Together, the Future Plan
                  </p>
                  <p className="mb-6 font-serif-display text-2xl italic leading-tight md:text-3xl">
                    The board-facing output of Sandbox.
                  </p>
                  <p className="text-sm leading-relaxed text-primary-foreground/75">
                    The three documents live together in your private organizational dashboard alongside the experiment
                    log. Read together, they tell your board what your organization has decided about AI in your
                    context, and what would have to be true to move to Skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* How the work happens — eight phases */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="how-work-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                SandboxLive — the facilitated version of Sandbox. $15,000.
              </p>
              <h2
                id="how-work-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Eight phases. Built around your team&apos;s actual work, supported by your private dashboard, learning
                surfaces, and pre-tested use case library.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The course structure is flexible — most engagements run four to six weeks at a cadence calibrated to
                your team&apos;s availability. Around ten hours of in-person training are distributed across the eight
                phases below. Between sessions, your working group runs use cases against real organizational work,
                supported by your private dashboard, Movemental&apos;s adaptive learning surfaces, the pre-tested recipe
                library, and the guided experimentation tools.
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 lg:grid-cols-4">
              {PHASES.map((step) => (
                <li key={step.title} className="relative border-l-2 border-pathway-accent pl-6">
                  <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                    {step.eyebrow}
                  </span>
                  <h3 className="mb-3 font-serif-display text-2xl italic tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-16 max-w-2xl font-serif-display text-base italic leading-relaxed text-muted-foreground">
              Movemental teaches the recipes and the process — testing for value in the form of wise efficiency,
              revenue, or work quality, and surfacing ethical questions worth resolving. We then guide your leadership
              through what to do with the evidence. The discernment and the deployment decisions are yours; we equip you
              to make them well.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="sandbox-pricing-title">
        <Reveal>
          <div className={MAX}>
            <p className="mb-3 max-w-2xl text-sm italic leading-relaxed text-muted-foreground">
              Or read the free field guide and run Sandbox with your own team.
            </p>
            <div className="mb-16 grid grid-cols-1 items-end gap-8 border-b border-border/55 pb-10 md:grid-cols-3 md:gap-12">
              <div className="md:col-span-2">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  SandboxLive engagement
                </p>
                <h2
                  id="sandbox-pricing-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  Fifteen thousand dollars. Around ten hours of in-person training.
                </h2>
              </div>
              <div className="text-left font-light tracking-tight md:col-span-1 md:text-right">
                <div className="text-5xl leading-none text-foreground md:text-6xl lg:text-7xl">$15,000</div>
                <div className="mt-3 text-[0.62rem] uppercase tracking-eyebrow text-muted-foreground">
                  USD · Four-to-six-week engagement
                </div>
              </div>
            </div>
            <div className="max-w-2xl">
              <h3 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                What&apos;s included
              </h3>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "Around ten hours of in-person training across the engagement",
                  "Access to Movemental's pre-tested AI use case library for churches, nonprofits, and institutions",
                  "Org-adapted starter use cases configured to your work",
                  "Private organizational dashboard for the engagement, with experiment log, learning surfaces, and guided experimentation tools",
                  "Use Case Portfolio adjudicated against your organization",
                  "Discernment Memo",
                  "Sandbox Readiness Assessment",
                  "One follow-up call within 30 days of completion",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="shrink-0 text-pathway-accent">
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Begin here or wait */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="sandbox-fit-title">
        <Reveal>
          <div className={MAX}>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Begin here or wait
            </p>
            <h2
              id="sandbox-fit-title"
              className="mb-16 max-w-4xl font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
            >
              Begin here if this is your situation. Wait if it isn’t — Sandbox depends on Safety.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
              <div>
                <h3 className="mb-10 font-serif-display text-2xl italic text-foreground md:text-3xl">Begin here if…</h3>
                <ul className="space-y-1">
                  {[
                    "You have completed Safety — through SafeStart, your own work, or another partner.",
                    "Your team is asking what AI is actually for in your specific work, and you cannot answer the question from the outside.",
                    "You have at least three to five staff who can commit to the in-person training and the work between sessions.",
                    "You want evidence about AI in your organization before you commit to deployment, training, or vendor selection.",
                  ].map((t, i, arr) => (
                    <li key={t} className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}>
                      <p className="text-lg leading-snug text-foreground">{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/40 bg-background p-10 md:p-12">
                <h3 className="mb-8 font-serif-display text-2xl italic text-foreground opacity-90 md:mb-10 md:text-3xl">
                  Wait if…
                </h3>
                <ul className="space-y-1">
                  {[
                    {
                      title: "You have not yet done the Safety work.",
                      body: (
                        <>
                          Read the{" "}
                          <Link
                            href="/pathway/safety#field-guide"
                            className="text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2"
                          >
                            Safety field guide
                          </Link>{" "}
                          first — Sandbox depends on it. Reading Sandbox without Safety in place will frustrate you.
                        </>
                      ),
                    },
                    {
                      title: "You can’t commit three to five staff to the work.",
                      body: (
                        <>
                          Sandbox is a team practice, not an individual study. If only one or two staff can commit,
                          you’re better off reading the field guide first and revisiting in a season when more
                          attention is available.
                        </>
                      ),
                    },
                    {
                      title: "You want a vendor pilot, not exploration.",
                      body: (
                        <>
                          Sandbox is a place to play, learn, and discover, safely. It cannot be turned into more than
                          that. Or less. If you need a vendor pilot, do that work separately.
                        </>
                      ),
                    },
                  ].map((c, i, arr) => (
                    <li key={c.title} className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}>
                      <p className="text-lg leading-snug text-foreground">{c.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Movement Voices */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="sandbox-voices-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Movement Voices
                </p>
                <h2
                  id="sandbox-voices-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  The methodology is shaped with leaders whose work and credibility predate AI.
                </h2>
              </div>
              <Link
                href="/voices"
                className="self-start border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent md:self-end"
              >
                See all trusted voices →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
              <PathwayVoiceFallback
                initials="LR"
                name="Rev. Dr. Liz Rios"
                role="Founder, Passion2Plant · Director, Púlpito Fellows"
              >
                Latina theologian and church planter. Brings a mujerista lens to questions of language, voice, and what
                mission-driven organizations owe the people they serve.
              </PathwayVoiceFallback>
              <PathwayVoiceFallback
                initials="JW"
                name="JR Woodward"
                role="National Director, V3 · Author, The Scandal of Leadership"
              >
                Church planting strategist with three decades in the field. His Manchester PhD on the misuse of
                leadership power shapes how Movement Voices think about authority and AI.
              </PathwayVoiceFallback>
              <PathwayVoiceFallback
                initials="RS"
                name="L. Rowland Smith"
                role="National Director, Forge America · Founder, Pando Collective"
              >
                Veteran missional practitioner based in the Colorado Front Range. Brings curatorial judgment and decades
                of micro-church practice to questions of what mission-driven organizations should and should not put
                their name on.
              </PathwayVoiceFallback>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Field Guide — gated lead magnet */}
      <section className={cn(SECTION, "bg-section")} id="field-guide" aria-labelledby="sandbox-field-guide-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12")}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                The Movemental Field Guides · Volume Two
              </p>
              <h2
                id="sandbox-field-guide-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                It Continues With Exploration.
              </h2>
              <p className="mb-3 max-w-xl text-lg leading-relaxed text-foreground">
                A field guide for running your AI Sandbox — eight phases that produce a board-ready Future Plan.
              </p>
              <p className="mb-8 max-w-xl text-sm italic leading-relaxed text-muted-foreground">
                By Brad Brisco, Alan Hirsch, and Joshua Shepherd. 48 pages. Approximately 105 minutes of focused reading.
                Edition 1.0 · May 2026.
              </p>
              <ul className="mb-10 space-y-3 border-y border-border/40 py-6">
                {FIELD_GUIDE_INSIDE.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.25rem_1fr] items-baseline gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span aria-hidden className="text-pathway-accent">
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                The Sandbox field guide is sequenced after Safety because the work it describes depends on Safety being
                substantially complete. The three-path download gate ships in the next release; for now, complete Safety
                first, then{" "}
                <Link href="/contact?interest=sandbox-field-guide" className="text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2">
                  contact us
                </Link>{" "}
                if you need the PDF before then.
              </p>
              <div
                className="max-w-xl border border-border/40 bg-background p-6 text-sm leading-relaxed text-muted-foreground"
                aria-live="polite"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  Field guide access
                </p>
                <p className="mt-2">
                  Gated delivery for Volume Two is temporarily simplified while we finish server-side verification. Start
                  with{" "}
                  <Link href="/pathway/safety" className="text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2">
                    Safety
                  </Link>{" "}
                  if you have not already.
                </p>
              </div>
              <FieldGuideAuthorBios className="mt-16" />
            </div>
            <div className="order-1 mx-auto w-full max-w-lg lg:order-2 lg:col-span-5 lg:mx-0">
              <ToolkitCover
                appearance="raster"
                coverSrc={SANDBOX_FIELD_GUIDE_COVER_IMAGE}
                title={SANDBOX_FIELD_GUIDE_DISPLAY_TITLE}
                ariaLabel={`${SANDBOX_FIELD_GUIDE_DISPLAY_TITLE} — Movemental Field Guide Volume Two`}
              />
              <p className="mt-5 text-center text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Movemental Field Guides · Vol. 02 · 48 pages
              </p>
              <div className="mt-6 border border-border/40 bg-background p-6 text-sm leading-relaxed text-muted-foreground">
                <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  Series
                </p>
                <p>
                  Vol. 01 · <em className="not-italic">It Starts With Safety</em> ·{" "}
                  <Link
                    href="/field-guides/safety"
                    className="text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2"
                  >
                    Read Vol. 01
                  </Link>
                </p>
                <p>
                  Vol. 02 · <em className="not-italic">It Continues With Exploration</em> · this volume
                </p>
                <p>Vol. 03 · Skills · forthcoming</p>
                <p>Vol. 04 · Solutions · forthcoming</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="band-midnight relative overflow-hidden" aria-labelledby="sandbox-closing-title">
        <div className={cn(MAX, "relative z-10 py-6 text-center")}>
          <Reveal>
            <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
              Begin Sandbox
            </p>
            <h2
              id="sandbox-closing-title"
              className="mx-auto mb-10 max-w-3xl font-serif-display text-4xl italic leading-[0.95] tracking-tight text-inverse-foreground md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Safety told you what’s allowed.{" "}
              <span className="text-inverse-foreground/55">Sandbox is where you find out what’s valuable.</span>
            </h2>
            <p className="lede mx-auto mb-14 max-w-2xl text-inverse-foreground/80">
              Sandbox is the stage where most organizations discover what they actually think about AI in their
              context. Until that work happens, every later decision — about deployment, about training, about vendor
              selection — is built on guessing rather than evidence.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="#field-guide"
                className="inline-flex items-center justify-center gap-2 bg-pathway-accent px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-opacity hover:opacity-90"
              >
                <LockIcon className="h-3.5 w-3.5" aria-hidden />
                Read the Sandbox Field Guide
              </Link>
              <Link
                href="/contact?interest=sandboxlive"
                className="inline-flex items-center justify-center border border-primary-foreground px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-inverse-surface"
              >
                Talk to us about SandboxLive
              </Link>
            </div>
            <p className="mx-auto mt-12 max-w-xl text-xs leading-relaxed text-inverse-foreground/55">
              $15,000. Around ten hours of in-person training. A pre-tested library applied to your work. The
              discernment and the decisions are yours, equipped to be made well.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function LockIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}
