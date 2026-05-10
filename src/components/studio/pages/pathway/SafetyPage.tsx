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

const DECISIONS: readonly { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Acceptable Use Statement",
    body: "What AI may and may not do in your organization, written clearly enough that any staff member can apply it without asking.",
  },
  {
    n: "02",
    title: "Care Boundaries",
    body: "The categories of human relationship — pastoral, clinical, counseling, member care — that remain fully human regardless of what AI can do.",
  },
  {
    n: "03",
    title: "Disclosure Standards",
    body: "When AI involvement must be communicated to the people you serve, and how.",
  },
  {
    n: "04",
    title: "Vendor & Tool Inventory",
    body: "Every AI tool currently in use across your staff, by whom, with what data, under what terms.",
  },
  {
    n: "05",
    title: "Data Handling Protocol",
    body: "What data may be shared with AI, by whom, under what circumstances, with what review.",
  },
  {
    n: "06",
    title: "Incident Response Plan",
    body: "What happens when AI produces harmful or inaccurate output under your name — who decides, who communicates, who fixes it.",
  },
  {
    n: "07",
    title: "Named Refusals",
    body: "The specific applications of AI your organization commits to refusing on principle, regardless of vendor pitch or operational pressure.",
  },
];

const PROCESS: readonly { eyebrow: string; title: string; body: string }[] = [
  {
    eyebrow: "Week 1 — Step 01",
    title: "Day-one alignment",
    body: "A 90-minute facilitated session with your senior leadership. We surface what you already know, what is contested, and what nobody has decided yet. Sets the boundaries for the next two weeks.",
  },
  {
    eyebrow: "Week 1 — Step 02",
    title: "Drafting",
    body: "We author the seven decisions against your specific organizational context. You review iteratively, asynchronously, with one named owner per decision on your side.",
  },
  {
    eyebrow: "Week 2 — Step 03",
    title: "Synchronous review",
    body: "A two-hour session in week two. Leadership reads the drafts together, surfaces remaining disagreement, and decides what to keep, what to revise, and what to refuse.",
  },
  {
    eyebrow: "Week 2 — Step 04",
    title: "Ratification handoff",
    body: "Final versions delivered as a board-ready packet. You walk into your next leadership meeting with the answer.",
  },
];

export function SafetyPage() {
  return (
    <div className="pathway-safety">
      <PathwayStageRail variant="safety" />

      {/* Hero */}
      <section className={cn(SECTION, "bg-section")} id="hero" aria-labelledby="hero-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20")}>
            <div className="lg:col-span-7">
              <span className="mb-6 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 01 — Safety
              </span>
              <h1
                id="hero-title"
                className="mb-8 max-w-4xl font-serif-display text-5xl italic leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                AI is being used inside your organization.{" "}
                <span className="whitespace-nowrap sm:whitespace-normal">
                  Most leaders{" "}
                  <span className="font-serif-display italic">have not yet decided</span> what is safe.
                </span>
              </h1>
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Two weeks of facilitated work. Your senior leadership writes down seven decisions about how AI is and
                isn&apos;t used in your organization. Your board ratifies them. The work is yours when it&apos;s done.
              </p>
              <p className="mb-12 max-w-lg font-serif-display text-xl italic leading-snug text-foreground md:text-2xl">
                Two weeks. $1,000. Seven decisions your board can ratify.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#field-guide"
                  className="inline-flex bg-inverse-surface px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Download the free Safety Field Guide
                </Link>
                <Link
                  href="/contact?interest=safety"
                  className="border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent"
                >
                  Start a conversation
                </Link>
              </div>
              <p className="mt-10 max-w-md text-sm text-muted-foreground">
                Read the{" "}
                <Link
                  href="/articles/safety-before-speed"
                  className="text-foreground underline decoration-pathway-accent decoration-1 underline-offset-4 hover:decoration-2"
                >
                  Safety Before Speed
                </Link>{" "}
                field essay first if you&apos;d like to know how we think before we work together.
              </p>
            </div>

            <aside className="border-t border-border/40 bg-background p-10 md:p-12 lg:col-span-5">
              <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What this produces
              </span>
              <p className="mb-8 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground md:text-3xl">
                Seven decisions,{" "}
                <span className="text-muted-foreground/90">each written and ready for review and ratification.</span>
              </p>
              <ul className="space-y-1">
                {[
                  "Acceptable Use Statement",
                  "Care Boundaries",
                  "Disclosure Standards",
                  "Vendor & Tool Inventory",
                  "Data Handling Protocol",
                  "Incident Response Plan",
                  "Named Refusals",
                ].map((label, i) => (
                  <li
                    key={label}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-3",
                      i < 6 && "border-b border-border/55",
                    )}
                  >
                    <span className="font-serif-display text-xl italic text-pathway-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.95rem] text-foreground">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs italic leading-relaxed text-muted-foreground">
                Plus a one-page summary your board, elder team, or trustees can ratify in a single meeting.
              </p>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* Why this stage exists */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="why-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Why this stage exists
              </p>
              <h2
                id="why-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Safety is not a ban.{" "}
                <span className="block md:inline">
                  It is the first step toward exploring the value of AI within your own organization. Skip it and the
                  exploration itself is uncertain and risky.
                </span>
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                AI is being used inside your organization right now — on personal accounts, in the margins of real
                work, with no shared frame for what&apos;s allowed. Safety brings that use into the open by naming three
                layers your senior leadership owns together.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-border/30 md:grid-cols-3">
              {(
                [
                  ["i.", "Governance", "Who decides what, with what authority, under what review. Plain enough to read aloud in three minutes. Specific enough to apply when a staff member asks at 9pm."],
                  ["ii.", "Commitments", "The handful of sentences your leadership agrees are true enough to lose money over. What you owe the people you serve in language. What you refuse to automate about their stories."],
                  ["iii.", "Boundaries", "Explicit statements about where AI belongs and where it does not. Fundraising. Pastoral correspondence. Board materials. Donor research. Implicit norms feel adequate until pressure arrives."],
                ] as const
              ).map(([roman, title, body]) => (
                <div key={title} className="bg-background p-10 md:p-12">
                  <span className="mb-6 block font-serif-display text-3xl italic text-pathway-accent">{roman}</span>
                  <h3 className="mb-4 text-xl text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Seven decisions grid */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="decisions-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What you&apos;ll produce
              </p>
              <h2
                id="decisions-title"
                className="mb-6 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Seven decisions. Each one written, scoped, and ready to ratify.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Each decision is drafted with your leadership team and written in language your board can read without
                translation. By week two, your organization has the foundation any later stage of the Path is built on. The
                work is yours when it&apos;s done.
              </p>
            </div>

            <div className="grid grid-cols-1 border-t border-l border-border/40 sm:grid-cols-2 lg:grid-cols-4">
              {DECISIONS.map((d) => (
                <article
                  key={d.n}
                  className="flex min-h-[280px] flex-col justify-between border-r border-b border-border/40 p-10 transition-colors hover:bg-background md:min-h-[320px] md:p-12"
                >
                  <span className="font-serif-display text-3xl italic text-pathway-accent">{d.n}</span>
                  <div>
                    <h3 className="mb-3 font-serif-display text-2xl italic leading-tight tracking-tight text-foreground">
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                  </div>
                </article>
              ))}
              <div className="flex min-h-[280px] flex-col justify-between border-r border-b border-inverse-surface bg-inverse-surface p-10 text-primary-foreground md:min-h-[320px] md:p-12">
                <span className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-primary-foreground/60">
                  Ratification packet
                </span>
                <p className="font-serif-display text-2xl italic leading-tight">
                  All seven decisions compiled in a format your board, elder team, or trustees can review and ratify in a
                  single meeting.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* How the work happens */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="process-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                How the work happens
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
              Your senior team owns this work from day one. We facilitate. We do not delegate Safety to a side
              project, and we do not let you delegate it to your most technical staff member.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pull quote */}
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
                — Safety Before Speed ·{" "}
                <Link
                  href="/articles/safety-before-speed"
                  className="underline decoration-pathway-accent underline-offset-4 transition-colors hover:text-foreground"
                >
                  Movemental field essay
                </Link>
              </cite>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="pricing-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-border/55 pb-10 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  What it costs
                </p>
                <h2
                  id="pricing-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  One thousand dollars. Two weeks. Net 15.
                </h2>
              </div>
              <div className="text-left font-light tracking-tight md:text-right">
                <div className="text-5xl leading-none text-foreground md:text-6xl">$1,000</div>
                <div className="mt-2 text-[0.62rem] uppercase tracking-eyebrow text-muted-foreground">
                  USD · Net 15 from signing
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
                    "Two weeks of facilitated work",
                    "All seven decisions drafted, reviewed, and finalized",
                    "Board-ready ratification packet",
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
              <div>
                <h3 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">Terms</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Invoiced at engagement start. Payment Net 15. Final packet releases on payment. Engagement requires
                  participation from at least two senior leaders authorized to ratify governance decisions on the
                  organization&apos;s behalf.
                </p>
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
              Who this is for
            </p>
            <h2
              id="fit-title"
              className="mb-16 max-w-3xl font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
            >
              Begin here, or wait — depending on where you actually are.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
              <div>
                <h3 className="mb-10 font-serif-display text-3xl italic text-foreground">Begin here if…</h3>
                <ul className="space-y-1">
                  {[
                    "You know AI is being used by staff and you have not yet decided what is permitted.",
                    "Your board, elders, denomination, accreditor, or major donors have asked about your AI position — and you do not have one yet in writing.",
                    `You want to move on the obvious AI opportunities, but not before you have decided what your organization will and won't do.`,
                    "At least two senior leaders are willing to commit four hours over two weeks.",
                  ].map((t, i, arr) => (
                    <li key={t} className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}>
                      <p className="text-lg leading-snug text-foreground">{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/40 bg-background p-10 md:p-12">
                <h3 className="mb-10 font-serif-display text-3xl italic text-foreground">Wait if…</h3>
                <ul className="space-y-1">
                  {[
                    "You are looking for software to buy rather than decisions to make.",
                    "Your organization has already written and ratified all seven decisions in a form your senior team can defend in public.",
                    "You prefer to wait for the legal and regulatory landscape to settle before deciding what your organization stands for.",
                    "You want a policy PDF you can file in a drive no one opens. The seven decisions are written to be used, not stored.",
                  ].map((t, i, arr) => (
                    <li key={t} className={cn("py-6 opacity-70", i < arr.length - 1 && "border-b border-border/55")}>
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
                of micro-church practice to questions of what mission-driven organizations should and should not publish.
              </PathwayVoiceFallback>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Field Guide */}
      <section className={cn(SECTION, "bg-section")} id="field-guide" aria-labelledby="field-guide-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-center gap-16 lg:grid-cols-12")}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Read before you commit
              </p>
              <h2
                id="field-guide-title"
                className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Start with the Field Guide.
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
                <em className="font-serif-display not-italic">It Starts With Safety</em> is a sixteen-page Field Guide
                that walks through the seven decisions in detail and includes a self-assessment your leadership team can
                take together in 30 minutes. If after reading you decide to walk through the framework yourselves, do it.
                The Field Guide is free, and we would rather you do this work well on your own than sign an engagement
                you do not need.
              </p>
              <ToolkitDownloadForm
                source="pathway-safety-field-guide"
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
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="#field-guide"
                className="inline-flex bg-background px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:bg-primary-foreground"
              >
                Download the free Field Guide
              </Link>
              <Link
                href="/contact?interest=safety"
                className="inline-flex border border-primary-foreground px-10 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-inverse-surface"
              >
                Start a conversation
              </Link>
            </div>
            <p className="mt-12 text-xs text-inverse-foreground/55">
              Two weeks. $1,000. Seven decisions. The work is yours when it&apos;s done.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
