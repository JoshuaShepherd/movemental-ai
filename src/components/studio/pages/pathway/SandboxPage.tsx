"use client";

import Link from "next/link";

import { PathwayStageRail } from "@/components/pathway/pathway-stage-rail";
import { PathwayVoiceFallback } from "@/components/pathway/pathway-voice-fallback";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import { cn } from "@/lib/utils";

const MAX = "mx-auto w-full max-w-[var(--container-max)] px-6 sm:px-8 lg:px-12";
const SECTION = "py-16 md:py-24 lg:py-28";

const PHASES: readonly { eyebrow: string; title: string; body: string }[] = [
  {
    eyebrow: "Phase 01",
    title: "Scoping",
    body: "A two-hour session with your working group and senior leadership. We translate the seven decisions from Safety into the rules of the sandbox: which use cases are in bounds, which data may be used, what gets logged, what triggers escalation. Sets the constraints for the rest of the engagement.",
  },
  {
    eyebrow: "Phase 02",
    title: "Exploration",
    body: "Your working group runs use cases against real organizational work, drawing from Movemental's tested library and adapting to your specific functions. Every use case is logged with hypothesis, output, observation, and a draft adjudication. We facilitate working sessions during this stretch to surface patterns, sharpen adjudications, and adjust scope as needed.",
  },
  {
    eyebrow: "Phase 03",
    title: "Adjudication",
    body: "A three-hour synchronous session where the working group and senior leadership read the experiment log together. Each use case gets its final color. Patterns are named. The Use Case Portfolio is finalized.",
  },
  {
    eyebrow: "Phase 04",
    title: "Discernment and handoff",
    body: "We draft the Discernment Memo and Sandbox Readiness Assessment based on the portfolio and the working group's experience. Senior leadership reviews and refines. Final documents delivered as a working set — not as a finished deliverable, but as the operational foundation for what comes next.",
  },
];

export function SandboxPage() {
  return (
    <div className="pathway-sandbox">
      <PathwayStageRail variant="sandbox" />

      {/* Hero */}
      <section className={cn(SECTION, "bg-section")} id="hero" aria-labelledby="sandbox-hero-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20")}>
            <div className="lg:col-span-7">
              <span className="mb-6 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 02 — Sandbox
              </span>
              <h1
                id="sandbox-hero-title"
                className="mb-8 max-w-4xl font-serif-display text-5xl italic leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                You cannot determine the value, or ethics, of AI for your organization until you have actually used it
                organizationally.
              </h1>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Sandbox is the work of discovering, through experiment and experience, what valuable custom AI use cases
                exist for your organization. We pause publication, set clear privacy guardrails, and use the time to
                explore — alongside a curated library of AI use cases Movemental has tested across churches, nonprofits,
                and institutions for years.
              </p>
              <p className="mb-12 max-w-xl font-serif-display text-xl italic leading-snug text-foreground md:text-2xl">
                $15,000. Around ten hours of in-person training. A curated set of use cases proven across the field,
                applied to your specific work.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?interest=sandbox"
                  className="inline-flex bg-inverse-surface px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Begin Sandbox
                </Link>
                <Link
                  href="#field-guide"
                  className="border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent"
                >
                  Read the Field Guide first
                </Link>
              </div>
              <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
                Sandbox builds on the seven decisions produced in Safety. If you have not yet completed Safety,{" "}
                <Link
                  href="/pathway/safety"
                  className="text-foreground underline decoration-pathway-accent decoration-1 underline-offset-4 hover:decoration-2"
                >
                  start there
                </Link>{" "}
                first.
              </p>
            </div>

            <aside className="border-t border-border/40 bg-background p-10 md:p-12 lg:col-span-5">
              <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What this produces
              </span>
              <p className="mb-8 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                A living laboratory, plus the documents that hold what you learn.
              </p>
              <ul className="space-y-1">
                {(
                  [
                    ["01", "Use Case Portfolio"],
                    ["02", "Discernment Memo"],
                    ["03", "Sandbox Readiness Assessment"],
                  ] as const
                ).map(([num, label], i) => (
                  <li
                    key={num}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-3",
                      i < 2 && "border-b border-border/55",
                    )}
                  >
                    <span className="font-serif-display text-xl italic text-pathway-accent">{num}</span>
                    <span className="text-[0.95rem] text-foreground">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs italic leading-relaxed text-muted-foreground">
                Each one drafted with your team and used as an active working tool — not filed as a deliverable.
              </p>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* Why Sandbox exists */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="why-sandbox-title">
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
                Sandbox is not a pilot. It is safe exploration of what AI is for in your organization.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A pilot asks whether a vendor tool works. Sandbox asks what your organization is becoming as it uses AI.
                Three commitments make the exploration safe enough to be honest.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-border/30 md:grid-cols-3">
              {(
                [
                  ["i.", "Safe scope", "We pause publication. AI use during Sandbox stays internal — no donor-facing edges, no signature-gravity communications, no public output under your name. Failure inside the sandbox costs nothing; what we learn from it costs nothing either."],
                  ["ii.", "Privacy guardrails", "We set clear rules for what data may be used, by whom, with which tools. Donor records, member directories, clinical notes, and protected information stay outside the sandbox unless explicit guardrails permit otherwise. Once those rules are set, your team is free to explore."],
                  ["iii.", "Real work", "Inside the boundaries, your team applies AI to actual organizational work. The learning comes from doing — drafting, research, analysis, planning, communication — not from speculating about what AI might be useful for in some other organization."],
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
                The test we apply to every use case: take the AI out of the story. If what remains is people doing
                valuable human work that AI helped them do faster, the use is humanly valuable. If what remains is AI
                output dressed up to look like human work, the use is suspect.
              </p>
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* What Movemental brings */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="library-title">
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
                theological institutions. Your sandbox engagement opens that library to your team and applies it to your
                actual work.
              </p>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
                The library includes use cases for sermon and teaching preparation, donor communications, grant writing,
                administrative workflows, pastoral correspondence templates, board materials, curriculum development,
                research synthesis, member care, program reporting, and dozens of other functions specific to mission-driven
                organizations. Each use case comes with a tested recipe: the prompt structure, the guardrails, the failure
                modes Movemental has already encountered, and the adjudication (green, yellow, or red) that emerged from
                prior testing.
              </p>
              <p className="max-w-2xl font-serif-display text-lg italic leading-snug text-foreground md:text-xl">
                Your team does not have to invent the use cases. You evaluate them — applied to your specific context —
                and decide which belong in your organization&apos;s portfolio.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What this stage produces */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="produces-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What this stage produces
              </p>
              <h2
                id="produces-title"
                className="mb-6 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Three working documents. Each one drafted, used, and ready to ratify.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Each document is produced through real exploration, not authored in isolation and handed back. By the end
                of the engagement, your organization has the evidence it needs to decide what comes next — and the
                documents to defend that decision to your board.
              </p>
            </div>

            <div className="grid grid-cols-1 border-t border-l border-border/40 md:grid-cols-2">
              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 p-10 transition-colors hover:bg-surface-highest md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">01</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Use Case Portfolio
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  The catalog of AI use cases your team explored, each adjudicated as green, yellow, or red.
                </p>
                <ul className="space-y-0 border-t border-border/40 text-sm text-muted-foreground">
                  <li className="border-b border-border/55 py-4">
                    <strong className="text-foreground">Green light:</strong> Clear human benefit, no meaningful negative
                    consequences. Deploy readily.
                  </li>
                  <li className="border-b border-border/55 py-4">
                    <strong className="text-foreground">Yellow light:</strong> Real benefit only with sufficient guardrails
                    in place. Most use cases land here.
                  </li>
                  <li className="py-4">
                    <strong className="text-foreground">Red light:</strong> Causes harm regardless of how carefully it is
                    deployed. Goes into the Named Refusals document from Safety.
                  </li>
                </ul>
                <p className="mt-auto pt-6 text-sm italic text-muted-foreground">
                  The portfolio is the operational memory of the work.
                </p>
              </article>

              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 p-10 transition-colors hover:bg-surface-highest md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">02</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Discernment Memo
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  The leadership document that names what your organization learned about AI in your specific context.
                  Surfaces the patterns the use case adjudications make visible. Names what your team would deploy, what
                  it would refuse, and what it needs to learn before deciding.
                </p>
                <p className="mt-8 text-sm italic text-muted-foreground">The memo is what your board reads.</p>
              </article>

              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 p-10 transition-colors hover:bg-surface-highest md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">03</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Sandbox Readiness Assessment
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  The honest evaluation of whether your organization is ready to move to Skills, and where the readiness
                  gaps are. Specific to your team&apos;s actual capacity, not a generic readiness checklist.
                </p>
                <p className="mt-8 text-sm italic text-muted-foreground">
                  The assessment is what determines what comes next.
                </p>
              </article>

              <div className="flex min-h-[320px] flex-col justify-between border-r border-b border-inverse-surface bg-inverse-surface p-10 text-primary-foreground md:p-12">
                <div>
                  <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-primary-foreground/60">
                    Bridge to Skills
                  </p>
                  <p className="mb-6 font-serif-display text-2xl italic leading-tight md:text-3xl">
                    Sandbox is not the end of the path.
                  </p>
                  <p className="text-sm leading-relaxed text-primary-foreground/75">
                    The Readiness Assessment names where your team has the capacity to lead AI work and where it does
                    not. Most organizations leave Sandbox knowing they are ready for Skills in some areas and not others
                    — and that knowledge is what makes Skills worthwhile when it happens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* How the work happens */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="how-work-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                How the work happens
              </p>
              <h2
                id="how-work-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Around ten hours of in-person training, structured around your team&apos;s pace.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The Sandbox course structure is flexible. Most engagements run over four to six weeks, with around ten
                hours of in-person training delivered in sessions calibrated to your team&apos;s availability. Between
                sessions, your working group runs use cases against real organizational work using Movemental&apos;s
                training materials, recipe library, and supporting technology.
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
              {PHASES.map((step) => (
                <li key={step.title} className="relative border-l-2 border-pathway-accent pl-6">
                  <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                    {step.eyebrow}
                  </span>
                  <h3 className="mb-3 font-serif-display text-2xl italic tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-16 max-w-2xl font-serif-display text-base italic leading-relaxed text-muted-foreground">
              Sandbox is run by your working group, not by us. We facilitate, we provide the tested library, we hold the
              boundaries — but the evidence is yours and the decisions are yours.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pull quote */}
      <section className={cn(SECTION, "bg-section")} aria-label="Pull quote from the field">
        <Reveal>
          <div className={cn(MAX, "flex max-w-5xl")}>
            <div className="mr-10 w-0.5 shrink-0 self-stretch bg-pathway-accent md:mr-12" aria-hidden />
            <div className="max-w-4xl">
              <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                From the field
              </p>
              <p className="mb-10 font-serif-display text-3xl italic leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl">
                We thought we knew what AI was good for. The Sandbox showed us we were wrong about half of it, and right
                about the other half in ways we hadn&apos;t articulated. The Use Case Portfolio is the document I show
                our board when they ask what our actual position on AI is.
              </p>
              <div className="border-t border-border/40 pt-6">
                <p className="text-sm text-muted-foreground">Executive director, $8M nonprofit</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="sandbox-pricing-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 grid grid-cols-1 items-end gap-8 border-b border-border/55 pb-10 md:grid-cols-3 md:gap-12">
              <div className="md:col-span-2">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  What it costs
                </p>
                <h2
                  id="sandbox-pricing-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  Fifteen thousand dollars. Around ten hours of in-person training. Structured around your team.
                </h2>
              </div>
              <div className="text-left font-light tracking-tight md:col-span-1 md:text-right">
                <div className="text-5xl leading-none text-foreground md:text-6xl lg:text-7xl">$15,000</div>
                <div className="mt-3 text-[0.62rem] uppercase tracking-eyebrow text-muted-foreground">
                  USD · 50% at signing, 50% at completion
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
              <div>
                <h3 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                  What&apos;s included
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {[
                    "Around ten hours of in-person training across the engagement",
                    "Access to Movemental's tested library of AI use cases for churches, nonprofits, and institutions",
                    "Use Case Portfolio adjudicated against your organization",
                    "Discernment Memo",
                    "Sandbox Readiness Assessment",
                    "Working experiment log infrastructure for your team",
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
              <div>
                <h3 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  What&apos;s not included
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {[
                    "Production deployment of any use case",
                    "Custom integrations or build work",
                    "Ongoing facilitation beyond the engagement",
                    "Software tools or platform fees for AI vendors",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">Terms</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  50% invoiced at engagement start, 50% at completion. Payment Net 15 on each invoice. Engagement
                  requires a designated working group of three to five staff plus participation from at least two senior
                  leaders authorized to ratify governance decisions. Sandbox requires Safety to be complete or in active
                  engagement.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Who this is for */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="sandbox-fit-title">
        <Reveal>
          <div className={MAX}>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Who this is for
            </p>
            <h2
              id="sandbox-fit-title"
              className="mb-16 max-w-4xl font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
            >
              Begin here, or wait — depending on where you actually are.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
              <div>
                <h3 className="mb-10 font-serif-display text-2xl italic text-foreground md:text-3xl">Begin here if…</h3>
                <ul className="space-y-1">
                  {[
                    "You have completed Safety, or you are willing to complete Safety alongside Sandbox.",
                    "Your team is asking what AI is actually for in your specific work, and you cannot answer the question from the outside.",
                    "You have at least three to five staff who can commit to the in-person training and the work between sessions.",
                    "You want evidence about AI in your organization before you commit to deployment, training, or vendor selection.",
                    "You are willing to use the Use Case Portfolio internally and let it shape actual decisions.",
                  ].map((t, i, arr) => (
                    <li key={t} className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}>
                      <p className="text-lg leading-snug text-foreground">{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/40 bg-background p-10 md:p-12">
                <h3 className="mb-10 font-serif-display text-2xl italic text-foreground opacity-90 md:text-3xl">
                  Wait if…
                </h3>
                <ul className="space-y-1">
                  {[
                    "You have not yet completed Safety. Sandbox without Safety is exploration without rules; it produces enthusiasm and confusion in roughly equal measure.",
                    "You are looking for vendor recommendations rather than organizational learning.",
                    "Your team cannot commit to the in-person training. Sandbox does not work as a side project run by one staff member.",
                    "You expect to deploy at the end of Sandbox regardless of what the evidence shows. The Readiness Assessment exists to surface real gaps; if you are not willing to act on those gaps, the work is wasted.",
                    "You want a pilot of a specific tool. Sandbox is methodology-driven, not vendor-driven.",
                  ].map((t, i, arr) => (
                    <li
                      key={t}
                      className={cn("py-6 opacity-70", i < arr.length - 1 && "border-b border-border/55")}
                    >
                      <p className="text-lg leading-snug text-muted-foreground">{t}</p>
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
                See all Movement Voices →
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
                Church planting strategist with three decades in the field. His Manchester PhD on the misuse of leadership
                power shapes how Movement Voices think about authority and AI.
              </PathwayVoiceFallback>
              <PathwayVoiceFallback
                initials="RS"
                name="L. Rowland Smith"
                role="National Director, Forge America · Founder, Pando Collective"
              >
                Veteran missional practitioner based in the Colorado Front Range. Brings curatorial judgment and decades
                of micro-church practice to questions of what mission-driven organizations should and should not publish.
              </PathwayVoiceFallback>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Field Guide */}
      <section className={cn(SECTION, "bg-section")} id="field-guide" aria-labelledby="sandbox-field-guide-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-center gap-16 lg:grid-cols-12")}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Read before you commit
              </p>
              <h2
                id="sandbox-field-guide-title"
                className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Start with the Field Guide.
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
                It Starts With Safety is a sixteen-page Field Guide that walks through the full Movemental Path, with
                Safety as the foundation and Sandbox as the next step. It includes a self-assessment your leadership team
                can take together in 30 minutes to determine whether you are ready for Sandbox or need to begin with
                Safety. The Field Guide is free, and we would rather you do this work well on your own than sign an
                engagement you do not need.
              </p>
              <ToolkitDownloadForm
                source="pathway-sandbox-field-guide"
                variant="page"
                layout="stacked"
                submitLabel="Send me the Field Guide"
                emailLabel="Work email address"
                organizationLabel="Organization"
                successMessage="Check your email for the Field Guide."
                inputClassName="focus:border-pathway-accent"
                disclaimer={
                  <>
                    No drip campaign. We send the Field Guide and one follow-up email a week later asking how it went.
                  </>
                }
                buttonClassName="bg-inverse-surface text-primary-foreground hover:opacity-90"
                className="max-w-md"
              />
            </div>
            <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:mx-0">
              <ToolkitCover stageFoot="Stage 01 · Vol. 01" />
              <p className="mt-5 text-center text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Movemental · Vol. 01 · 16 pages
              </p>
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
              You cannot determine what AI is for from the outside. Begin the work.
            </h2>
            <p className="lede mx-auto mb-14 max-w-2xl text-inverse-foreground/80">
              Sandbox is the stage where most organizations discover what they actually think about AI in their context.
              Until that work happens, every later decision — about deployment, about training, about vendor selection —
              is built on guessing rather than evidence.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="/contact?interest=sandbox"
                className="inline-flex bg-background px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:bg-primary-foreground"
              >
                Start a conversation
              </Link>
              <Link
                href="#field-guide"
                className="inline-flex border border-primary-foreground px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-inverse-surface"
              >
                Read the Field Guide first
              </Link>
            </div>
            <p className="mx-auto mt-12 max-w-xl text-xs leading-relaxed text-inverse-foreground/55">
              $15,000. Around ten hours of in-person training. A tested library applied to your work. The work is yours
              when it&apos;s done.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
