"use client";

import Link from "next/link";

import { FieldGuideAuthorBios } from "@/components/pathway/field-guide-author-bios";
import { FieldGuideSeriesMast } from "@/components/pathway/field-guide-series-mast";
import { PathwayStageRail } from "@/components/pathway/pathway-stage-rail";
import { PathwayVoiceFallback } from "@/components/pathway/pathway-voice-fallback";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import { cn } from "@/lib/utils";

const MAX = "mx-auto w-full max-w-[var(--container-max)] px-6 sm:px-8 lg:px-12";
const SECTION = "py-16 md:py-24 lg:py-28";

/**
 * The five canonical layers of the Safety Guidebook, each anchoring the working
 * artifacts the field guide produces. The seven specific deliverables from the
 * earlier framing are nested under the layer they belong to.
 */
const LAYERS: ReadonlyArray<{
  n: string;
  layer: string;
  description: string;
  artifacts: ReadonlyArray<string>;
}> = [
  {
    n: "01",
    layer: "Statement",
    description:
      "The AI Use Charter — a brief, public-facing declaration of what AI is and is not for in your organization. It is the document a donor, board member, or reporter reads to know where you stand.",
    artifacts: ["AI Use Charter"],
  },
  {
    n: "02",
    layer: "Policy",
    description:
      "The operational policies your staff actually use. They translate the Charter into specific guidance for the people who make AI decisions at 9pm on a Tuesday.",
    artifacts: ["Acceptable Use Policy", "Communication to the Constituent Base"],
  },
  {
    n: "03",
    layer: "Context",
    description:
      "The boundaries of human presence your mission cannot abdicate. Pastoral, programmatic, educational, clinical — named specifically, not as categories.",
    artifacts: ["Pastoral, Programmatic & Educational Care Boundaries"],
  },
  {
    n: "04",
    layer: "Rules",
    description:
      "The rules your organization sets about data and disclosure: what may be shared with AI, by whom, under what review; and when AI involvement must be named to the people you serve.",
    artifacts: ["Data Handling Standards", "Disclosure & Attribution Standard"],
  },
  {
    n: "05",
    layer: "Response Plans",
    description:
      "The plans your organization has in place for when AI is used against you or produces harmful output under your name. Pre-arranged protocols, not improvised reactions.",
    artifacts: ["Voice Cloning & Impersonation Response Plan"],
  },
];

const PROCESS: ReadonlyArray<{ eyebrow: string; title: string; body: string }> = [
  {
    eyebrow: "Week 1 — Phase 01",
    title: "Day-one alignment",
    body: "A 90-minute facilitated session with your senior leadership. We surface what you already know, what is contested, and what nobody has decided yet. Sets the boundaries for the next two weeks.",
  },
  {
    eyebrow: "Week 1 — Phase 02",
    title: "Drafting",
    body: "We author the five layers against your specific organizational context. You review iteratively, asynchronously, with one named owner per layer on your side.",
  },
  {
    eyebrow: "Week 2 — Phase 03",
    title: "Synchronous review",
    body: "A two-hour session in week two. Leadership reads the drafts together, surfaces remaining disagreement, and decides what to keep, what to revise, and what to refuse.",
  },
  {
    eyebrow: "Week 2 — Phase 04",
    title: "Ratification handoff",
    body: "Final versions land inside your private organizational dashboard, where your leadership team reviews, comments, revises, and ratifies each artifact. You walk into your next leadership meeting with the answer approved, or with the dashboard open in front of the room.",
  },
];

const FIELD_GUIDE_INSIDE: ReadonlyArray<string> = [
  "The five layers — Statement, Policy, Context, Rules, Response Plans — with the seven artifacts that sit inside them.",
  "Five Named Refusals: the specific applications of AI your organization commits to refusing on principle.",
  "A self-assessment your leadership team can take together in 30 minutes.",
  "A SafeGuide vs. SafeStart comparison so you can choose between running the work yourselves or hiring facilitation.",
  "Citations across MIT NANDA, BCG, McKinsey, the FBI Internet Crime Report, Forvis Mazars, Virtuous, and Barna.",
];

export function SafetyPage() {
  return (
    <div className="pathway-safety">
      <PathwayStageRail variant="safety" />
      <FieldGuideSeriesMast active="vol-01" />

      {/* Hero */}
      <section className={cn(SECTION, "bg-section")} id="hero" aria-labelledby="hero-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20")}>
            <div className="lg:col-span-7">
              <span className="mb-6 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 01 // Safety
              </span>
              <h1
                id="hero-title"
                className="mb-8 max-w-4xl font-serif-display text-[clamp(2.25rem,7vw,4.5rem)] italic leading-[0.95] tracking-tight text-foreground"
              >
                AI is being used inside your organization. Most leaders{" "}
                <span className="font-serif-display italic">have not yet decided</span> what is safe.
              </h1>
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                The Safety stage is where your organization produces its AI Organizational Guidebook — five layers,
                ratified by your board, that govern what AI is and is not used for in your work. The free field guide
                walks you through the work. SafeStart is the two-week facilitated version.
              </p>
              <div className="mb-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#field-guide"
                  className="inline-flex bg-pathway-accent px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-opacity hover:opacity-90"
                >
                  Read the Field Guide (free)
                </Link>
                <Link
                  href="/contact?interest=safestart"
                  className="border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent"
                >
                  Talk to us about SafeStart
                </Link>
              </div>
              <p className="max-w-xl text-sm italic leading-relaxed text-muted-foreground">
                Volume One of the Movemental Field Guides. 33 pages. By Brad Brisco, Alan Hirsch, and Joshua Shepherd.
              </p>
            </div>

            <aside className="border-t border-border/40 bg-background p-10 md:p-12 lg:col-span-5">
              <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What this produces
              </span>
              <p className="mb-8 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                A five-layer Guidebook,{" "}
                <span className="text-muted-foreground/90">
                  with the seven working artifacts nested inside, ready to ratify.
                </span>
              </p>
              <ul className="space-y-1">
                {LAYERS.map((layer, i) => (
                  <li
                    key={layer.layer}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-3",
                      i < LAYERS.length - 1 && "border-b border-border/55",
                    )}
                  >
                    <span className="font-serif-display text-xl italic text-pathway-accent">{layer.n}</span>
                    <span className="text-[0.95rem] text-foreground">{layer.layer}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs italic leading-relaxed text-muted-foreground">
                Delivered inside a private dashboard your leadership uses to review, comment, revise, and ratify each
                artifact in a single working session.
              </p>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* Why this stage exists — five-layer architecture */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="why-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                The architecture of Safety
              </p>
              <h2
                id="why-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Safety produces a five-layer Guidebook.{" "}
                <span className="block md:inline">
                  Each layer does a different kind of work. Skip any of them and the others cannot hold.
                </span>
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                AI is being used inside your organization right now — on personal accounts, in the margins of real work,
                with no shared frame for what&apos;s allowed. Safety brings that use into the open by naming five layers
                your senior leadership owns together.
              </p>
            </div>
            <ol className="grid grid-cols-1 border-t border-l border-border/40 sm:grid-cols-2 lg:grid-cols-5">
              {LAYERS.map((layer) => (
                <li
                  key={layer.layer}
                  className="flex min-h-[280px] flex-col justify-between border-r border-b border-border/40 p-8 md:p-10"
                >
                  <span className="font-serif-display text-3xl italic text-pathway-accent">{layer.n}</span>
                  <div>
                    <h3 className="mb-3 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground">
                      {layer.layer}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
                    <ul className="space-y-1.5">
                      {layer.artifacts.map((a) => (
                        <li
                          key={a}
                          className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground"
                        >
                          + {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-12 max-w-2xl text-sm italic leading-relaxed text-muted-foreground">
              The seven artifacts inside the five layers are what your board reviews and ratifies. The layers are the
              memory of why each artifact exists.
            </p>
          </div>
        </Reveal>
      </section>

      {/* How the work happens — SafeStart facilitation */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="process-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                SafeStart — the facilitated version of Safety. $1,000.
              </p>
              <h2
                id="process-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Two weeks of facilitated work.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Two weeks. Four phases. Eight hours of synchronous work plus drafting between sessions. We facilitate
                with your leadership team — we do not draft policy alone and hand it over.
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
              {PROCESS.map((step) => (
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
              Your senior team owns this work from day one. We draft against your specific organizational context; you
              review, revise, and ratify. We do not delegate Safety to a side project, and we do not let you delegate it
              to your most technical staff member.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pull quote — attributed to Volume One */}
      <section className={cn(SECTION, "bg-section")} aria-label="Pull quote">
        <Reveal>
          <div className={cn(MAX, "relative flex max-w-4xl")}>
            <div className="mr-10 w-0.5 shrink-0 self-stretch bg-pathway-accent md:mr-12" aria-hidden />
            <div>
              <p className="mb-8 font-serif-display text-3xl italic leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Safety is not the enemy of speed. It is the condition under which your organization is still itself when
                the speed arrives.
              </p>
              <cite className="block text-[0.7rem] font-semibold uppercase tracking-eyebrow not-italic text-muted-foreground">
                — <em className="not-italic">It Starts With Safety</em>, Movemental Field Guide Vol. 1, page 9
              </cite>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pricing — SafeStart engagement */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="pricing-title">
        <Reveal>
          <div className={MAX}>
            <p className="mb-3 max-w-2xl text-sm italic leading-relaxed text-muted-foreground">
              Or read the free field guide and run Safety with your own team.
            </p>
            <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-border/55 pb-10 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  SafeStart engagement
                </p>
                <h2
                  id="pricing-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  One thousand dollars. Two weeks.
                </h2>
              </div>
              <div className="text-left font-light tracking-tight md:text-right">
                <div className="text-5xl leading-none text-foreground md:text-6xl">$1,000</div>
                <div className="mt-2 text-[0.62rem] uppercase tracking-eyebrow text-muted-foreground">
                  USD · Net 15 · Two-week engagement
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                  What&apos;s included
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {[
                    "Two weeks of focused work",
                    "Five-layer Guidebook drafted by Movemental against your specific organizational context",
                    "Private organizational dashboard for review, revision, and ratification",
                    "Export to PDF for archival or external review",
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
                    "Ongoing legal counsel",
                    "Implementation beyond the leadership team",
                    "Software tools or platform fees",
                    "Custom integrations or build work",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Who this is for */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="fit-title">
        <Reveal>
          <div className={MAX}>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Begin here or wait
            </p>
            <h2
              id="fit-title"
              className="mb-16 max-w-3xl font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
            >
              Begin here if this is your situation. The data is why now.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
              <div>
                <h3 className="mb-10 font-serif-display text-3xl italic text-foreground">Begin here if…</h3>
                <ul className="space-y-1">
                  {[
                    "You’re ready to read the field guide and start the work yourself.",
                    "You know AI is being used by staff and you have not yet decided what is permitted.",
                    "Your board, elders, denomination, accreditor, or major donors have asked about your AI position — and you do not have one yet in writing.",
                    "You want to move on the obvious AI opportunities, but not before you have decided what your organization will and won’t do.",
                  ].map((t, i, arr) => (
                    <li key={t} className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}>
                      <p className="text-lg leading-snug text-foreground">{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/40 bg-background p-10 md:p-12">
                <h3 className="mb-10 font-serif-display text-3xl italic text-foreground">Why now.</h3>
                <ul className="space-y-0">
                  {(
                    [
                      {
                        body: "92% of nonprofits report using AI in some form. 47% have no governance policy in place.",
                        source: "VIRTUOUS / FUNDRAISING.AI · 2026 · N=346",
                      },
                      {
                        body: "60% of faith leaders use AI monthly. 5% have any AI policy.",
                        source: "BARNA / PUSHPAY · 2026 · N=1,306",
                      },
                      {
                        body: "AI fraud losses reached $893 million in 2025. Voice cloning attacks rose 400% year over year.",
                        source: "FBI INTERNET CRIME REPORT · 2025",
                      },
                      {
                        body: "AI governance is increasingly treated as fiduciary responsibility, with board liability exposure when leaders fail to act.",
                        source: "FORVIS MAZARS · FEBRUARY 2026",
                      },
                    ] as const
                  ).map((item, i, arr) => (
                    <li
                      key={item.source}
                      className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}
                    >
                      <p className="text-lg leading-snug text-foreground">{item.body}</p>
                      <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                        {item.source}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Movement Voices — methodology partners */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="voices-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Movement Voices
                </p>
                <h2
                  id="voices-title"
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

      {/* Field Guide — primary lead magnet */}
      <section className={cn(SECTION, "bg-section")} id="field-guide" aria-labelledby="field-guide-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12")}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                The Movemental Field Guides · Volume One
              </p>
              <h2
                id="field-guide-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                It Starts With Safety.
              </h2>
              <p className="mb-3 max-w-xl text-lg leading-relaxed text-foreground">
                A field guide for building your AI Organizational Guidebook.
              </p>
              <p className="mb-8 max-w-xl text-sm italic leading-relaxed text-muted-foreground">
                By Brad Brisco, Alan Hirsch, and Joshua Shepherd. 33 pages. Approximately 75 minutes of focused reading.
                Edition 1.1 · May 2026.
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
                Grounded in current research from MIT NANDA, BCG, McKinsey, the FBI Internet Crime Report, Forvis Mazars,
                Virtuous, and Barna. The guide is free. We would rather you do this work well on your own than sign an
                engagement you do not need.
              </p>
              <ToolkitDownloadForm
                source="pathway-safety-field-guide"
                variant="page"
                layout="stacked"
                submitLabel="Read the Field Guide"
                emailLabel="Work email address"
                organizationLabel="Organization"
                organizationOptional={false}
                successMessage="Check your email — the field guide is on its way."
                inputClassName="focus:border-pathway-accent"
                disclaimer={
                  <>
                    We send the guide immediately, plus three short follow-up emails over the next two weeks extending
                    its argument. Unsubscribe at any time. No marketing drip.
                  </>
                }
                buttonClassName="bg-inverse-surface text-primary-foreground hover:opacity-90"
                className="max-w-md"
              />
              <FieldGuideAuthorBios className="mt-16" />
            </div>
            <div className="order-1 mx-auto w-full max-w-lg lg:order-2 lg:col-span-5 lg:mx-0">
              <ToolkitCover stageFoot="Vol. 01 · Safety" />
              <p className="mt-5 text-center text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Movemental Field Guides · Vol. 01 · 33 pages
              </p>
              <div className="mt-6 border border-border/40 bg-background p-6 text-sm leading-relaxed text-muted-foreground">
                <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  Forthcoming
                </p>
                <p>
                  Vol. 02 · <em className="not-italic">It Continues With Exploration</em> · Sandbox
                </p>
                <p>Vol. 03 · Skills · forthcoming</p>
                <p>Vol. 04 · Solutions · forthcoming</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="band-midnight relative overflow-hidden" aria-labelledby="closing-title">
        <div className={cn(MAX, "relative z-10 py-6 text-center")}>
          <Reveal>
            <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
              Begin Safety
            </p>
            <h2
              id="closing-title"
              className="mx-auto mb-10 max-w-3xl font-serif-display text-4xl italic leading-[0.95] tracking-tight text-inverse-foreground md:text-5xl lg:text-6xl"
            >
              AI is already inside your organization.{" "}
              <span className="text-inverse-foreground/55">Start with what is safe.</span>
            </h2>
            <p className="lede mx-auto mb-14 max-w-2xl text-inverse-foreground/80">
              Most organizations who walk the Path begin here. Safety is the prerequisite for every later stage. Without
              it, what comes next is built on assumptions you have not made.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="#field-guide"
                className="inline-flex items-center justify-center bg-pathway-accent px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-opacity hover:opacity-90"
              >
                Read the Field Guide
              </Link>
              <Link
                href="/contact?interest=safestart"
                className="inline-flex items-center justify-center border border-primary-foreground px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-inverse-surface"
              >
                Talk to us about SafeStart
              </Link>
              <Link
                href="/pathway/sandbox"
                className="inline-flex items-center justify-center px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-inverse-foreground/80 underline decoration-pathway-accent/60 underline-offset-4 transition-colors hover:text-inverse-foreground"
              >
                Continue to Stage 02 · Sandbox →
              </Link>
            </div>
            <p className="mt-12 text-xs text-inverse-foreground/55">
              Two weeks. $1,000. A five-layer Guidebook, customized to your organization, ratified inside your private
              dashboard.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
