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

const WEEK_PHASES: readonly { eyebrow: string; title: string; body: string }[] = [
  {
    eyebrow: "Weeks 1–2",
    title: "Discernment foundations",
    body: "The cohort reads AI output together against your team's real material. We name what generic lift looks like, what missing proper nouns sound like, and how to tell when AI is confidently wrong. Practice work between sessions is on material you bring from your organization.",
  },
  {
    eyebrow: "Weeks 3–4",
    title: "Authorship discipline",
    body: "The cohort works through the distinction between drafting with AI and being drafted by AI. Your team practices editing AI output until it carries your voice, and learns to recognize when AI involvement has crossed into authorship. Voice-fidelity tooling supports the practice.",
  },
  {
    eyebrow: "Weeks 5–6",
    title: "Stewardship judgment",
    body: "The cohort works through the categories where AI does not belong, drawing on the Care Boundaries from Safety. Senior leaders practice naming the line in real situations from their own organizations. Peer feedback sharpens the calls.",
  },
  {
    eyebrow: "Weeks 7–8",
    title: "Integration and certification",
    body: "The cohort integrates the three capacities through a culminating project on your organization's real work. Each leader presents and defends their judgment to the cohort. Certification is granted on the basis of demonstrated capacity, not attendance. Platform access continues for twelve months from cohort completion.",
  },
];

export function SkillsPathwayPage() {
  return (
    <div className="pathway-skills">
      <PathwayStageRail variant="skills" />

      {/* Hero */}
      <section className={cn(SECTION, "bg-section")} id="hero" aria-labelledby="skills-hero-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20")}>
            <div className="lg:col-span-7">
              <span className="mb-6 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 03 — Skills
              </span>
              <h1
                id="skills-hero-title"
                className="mb-8 max-w-4xl font-serif-display text-5xl italic leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                Training transfers technique. Formation reshapes judgment.
              </h1>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Skills is an eight-week formation cohort that produces leaders capable of stewarding AI inside their
                organizations — not staff who have learned to use a tool. The work happens against your team&apos;s
                actual material, in a small peer group of leaders from comparable organizations, with year-long platform
                access for continued practice after the cohort ends.
              </p>
              <p className="mb-12 max-w-xl font-serif-display text-xl italic leading-snug text-foreground md:text-2xl">
                $15,000 for the cohort. $5,000 per year for platform access. Eight weeks of formation that produce leaders,
                not users.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?interest=skills"
                  className="inline-flex bg-inverse-surface px-7 py-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Begin Skills
                </Link>
                <Link
                  href="#field-guide"
                  className="border-b border-foreground pb-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-pathway-accent hover:text-pathway-accent"
                >
                  Read the Field Guide first
                </Link>
              </div>
              <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
                Skills builds on what your organization learned in Sandbox. If you have not yet completed Sandbox,{" "}
                <Link
                  href="/pathway/sandbox"
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
                Three formed capacities, plus the platform that holds the practice.
              </p>
              <ul className="space-y-1">
                {(
                  [
                    ["01", "Discernment"],
                    ["02", "Authorship"],
                    ["03", "Stewardship"],
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
                Each capacity formed through real work, real reflection, and real community over eight weeks — and held
                by year-long platform access after.
              </p>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* Why Skills exists */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="why-skills-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Why this stage exists
              </p>
              <h2
                id="why-skills-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                Most AI training transfers technique. Skills forms judgment.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A staff member who has learned to use ChatGPT has acquired a skill. A leader who can tell the difference
                between AI output that serves your mission and AI output that flattens it has acquired judgment. Three
                capacities make the difference, and they are formed through practice, not lectures.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-border/30 md:grid-cols-3">
              {(
                [
                  [
                    "i.",
                    "Discernment",
                    "The capacity to recognize generic lift, missing proper nouns, theology or ethics that would be true anywhere, and the statistical-center drift that makes AI output sound plausible while being wrong for your specific work. Discernment is what your team learns by reading AI output against your actual context, again and again, until the patterns become visible.",
                  ],
                  [
                    "ii.",
                    "Authorship",
                    "The capacity to hold the pen — to use AI as infrastructure without letting it author what carries your name. Authorship is what makes the difference between a leader who uses AI and a leader who is being used by it. Formed through supervised practice on your team's real work, not on case studies from other organizations.",
                  ],
                  [
                    "iii.",
                    "Stewardship",
                    "The capacity to know what must remain unmediated even when mediation is cheap. The pastoral conversation, the formation moment, the relational repair, the judgment call that defines what kind of organization you are. Stewardship names what AI does not touch, regardless of how capable it becomes.",
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
          </div>
        </Reveal>
      </section>

      {/* What Movemental brings */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="curriculum-title">
        <Reveal>
          <div className={MAX}>
            <div className="max-w-3xl">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What Movemental brings
              </p>
              <h2
                id="curriculum-title"
                className="mb-8 font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
              >
                A formation curriculum specific to mission-driven leadership, plus the platform that holds the practice.
              </h2>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Skills is not a generic AI literacy course. The eight-week curriculum is built specifically for senior
                leaders in churches, nonprofits, and theological institutions, drawing on the same library of tested use
                cases your team explored in Sandbox and adding the formation work that turns competent users into
                trustworthy stewards.
              </p>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Each week pairs a core teaching with supervised practice on your team&apos;s actual material. Cohort
                sessions happen with leaders from comparable organizations — small enough that everyone is known, large
                enough that the peer learning is real. Between sessions, your platform license gives your team access to
                the recipe library, working agent infrastructure, voice-fidelity tooling, and supporting technology
                that make the practice repeatable. The platform stays with you after the cohort ends.
              </p>
              <p className="max-w-2xl font-serif-display text-lg italic leading-snug text-foreground md:text-xl">
                The curriculum and the platform are how Movemental encodes years of work into something your team can
                practice with after we are gone.
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
                Three formed capacities. Each one built through practice, not transferred through lecture.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                By the end of the eight weeks, your team has the discernment to evaluate AI output against your specific
                mission, the authorship discipline to hold the pen on what carries your name, and the stewardship
                judgment to know what AI does not touch. Year-long platform access keeps the practice alive after the
                cohort ends.
              </p>
            </div>

            <div className="grid grid-cols-1 border-t border-l border-border/40 md:grid-cols-2">
              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 p-10 transition-colors hover:bg-surface-highest md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">01</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Discernment
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  The capacity to read AI output against your specific mission and identify what does not belong. Formed
                  through repeated practice on your team&apos;s real material, with feedback from peers and facilitators
                  who can name what generic lift looks like.
                </p>
                <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  What it looks like in practice
                </p>
                <ul className="space-y-0 border-t border-border/40 text-sm text-muted-foreground">
                  <li className="border-b border-border/55 py-3">Catching theology or ethics that would be true anywhere</li>
                  <li className="border-b border-border/55 py-3">Recognizing missing proper nouns and missing institutional memory</li>
                  <li className="py-3">Identifying when AI output sounds confident and is wrong</li>
                </ul>
                <p className="mt-auto pt-6 text-sm italic text-muted-foreground">
                  Discernment is the capacity that makes everything else possible.
                </p>
              </article>

              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 p-10 transition-colors hover:bg-surface-highest md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">02</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Authorship
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  The capacity to hold the pen. AI assists; you author. The discipline of using AI as infrastructure
                  without letting it become the voice your community hears under your name.
                </p>
                <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  What it looks like in practice
                </p>
                <ul className="space-y-0 border-t border-border/40 text-sm text-muted-foreground">
                  <li className="border-b border-border/55 py-3">Knowing when to draft yourself and when to draft with AI</li>
                  <li className="border-b border-border/55 py-3">Editing AI output until it carries your voice, not the model&apos;s</li>
                  <li className="py-3">Refusing to ship work that is mostly machine wearing your name</li>
                </ul>
                <p className="mt-auto pt-6 text-sm italic text-muted-foreground">
                  Authorship is what protects the credibility your organization has built over decades.
                </p>
              </article>

              <article className="flex min-h-[320px] flex-col border-r border-b border-border/40 p-10 transition-colors hover:bg-surface-highest md:p-12">
                <span className="font-serif-display text-3xl italic text-pathway-accent">03</span>
                <h3 className="mt-4 mb-4 font-serif-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                  Stewardship
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  The capacity to know what must remain unmediated. The pastoral conversation, the formation moment, the
                  human covenant. Stewardship names what AI does not touch — and protects it.
                </p>
                <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-foreground">
                  What it looks like in practice
                </p>
                <ul className="space-y-0 border-t border-border/40 text-sm text-muted-foreground">
                  <li className="border-b border-border/55 py-3">Drawing the line where Care Boundaries from Safety apply</li>
                  <li className="border-b border-border/55 py-3">Recognizing when efficiency is the wrong question</li>
                  <li className="py-3">Modeling, for staff, what mature AI use actually looks like</li>
                </ul>
                <p className="mt-auto pt-6 text-sm italic text-muted-foreground">
                  Stewardship is what keeps the organization recognizable as itself.
                </p>
              </article>

              <div className="flex min-h-[320px] flex-col justify-between border-r border-b border-inverse-surface bg-inverse-surface p-10 text-primary-foreground md:p-12">
                <div>
                  <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-primary-foreground/60">
                    Platform access
                  </p>
                  <p className="mb-6 font-serif-display text-2xl italic leading-tight md:text-3xl">
                    The practice continues after the cohort ends.
                  </p>
                  <p className="text-sm leading-relaxed text-primary-foreground/75">
                    Year-long platform access keeps your team in the recipe library, the working agent infrastructure,
                    the voice-fidelity tooling, and the operational scaffolding that supports continued practice. Skills
                    is eight weeks of formation; the platform is what makes the formation hold.
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
                Eight weeks. Small cohort. Real material.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Skills runs as an eight-week cohort with six to twelve leaders from comparable organizations. Roughly
                twenty-four hours of synchronous facilitation across the eight weeks, plus practice work between
                sessions. Cohorts run on a published calendar; you select the cohort that fits your timing.
              </p>
            </div>
            <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
              {WEEK_PHASES.map((step) => (
                <li key={step.eyebrow} className="relative border-l-2 border-pathway-accent pl-6">
                  <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                    {step.eyebrow}
                  </span>
                  <h3 className="mb-3 font-serif-display text-2xl italic tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-16 max-w-2xl font-serif-display text-base italic leading-relaxed text-muted-foreground">
              Skills is formation, which means the cohort is the curriculum. Your team learns from peers as much as from
              facilitators, and the peer relationships often outlast the cohort itself.
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
                We sent two staff to the Skills cohort thinking it would be an AI training. By week three, our
                communications director had stopped sending drafts to me until she had read them as our community would.
                That is not a skill. That is judgment. I cannot put a price on what changed in her.
              </p>
              <div className="border-t border-border/40 pt-6">
                <p className="text-sm text-muted-foreground">Senior pastor, multisite congregation</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section className={cn(SECTION, "bg-background")} aria-labelledby="skills-pricing-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 grid grid-cols-1 items-end gap-8 border-b border-border/55 pb-10 md:grid-cols-3 md:gap-12">
              <div className="md:col-span-2">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  What it costs
                </p>
                <h2
                  id="skills-pricing-title"
                  className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
                >
                  Fifteen thousand for the cohort. Five thousand per year for platform access.
                </h2>
              </div>
              <div className="text-left font-light tracking-tight md:col-span-1 md:text-right">
                <div className="text-4xl leading-none text-foreground md:text-5xl lg:text-6xl">
                  $15,000<span className="text-2xl font-light text-muted-foreground md:text-3xl"> cohort</span>
                </div>
                <div className="mt-3 text-3xl leading-none text-foreground md:text-4xl lg:text-5xl">
                  $5,000<span className="text-xl font-light text-muted-foreground md:text-2xl"> / year platform</span>
                </div>
                <div className="mt-4 text-[0.62rem] uppercase tracking-eyebrow text-muted-foreground">
                  USD · 50% at signing, 50% at cohort start
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
                    "Eight-week formation cohort with six to twelve leaders from comparable organizations",
                    "Roughly twenty-four hours of synchronous facilitation",
                    "Curriculum specific to mission-driven leadership",
                    "Twelve months of platform access from cohort completion",
                    "Recipe library, working agent infrastructure, voice-fidelity tooling",
                    "Certification on demonstrated capacity",
                    "Cohort alumni access for peer learning beyond the eight weeks",
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
                    "Custom curriculum for individual organizations",
                    "One-on-one coaching outside cohort sessions",
                    "Production deployment of AI use cases",
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
                  Cohort fee: 50% invoiced at registration, 50% at cohort start. Platform license: invoiced annually at
                  cohort start, renewable. Payment Net 15. Each organization may send up to two leaders to a cohort. Skills
                  requires Sandbox to be complete; certification requires participation in at least seven of eight cohort
                  sessions.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Who this is for */}
      <section className={cn(SECTION, "bg-surface-highest")} aria-labelledby="skills-fit-title">
        <Reveal>
          <div className={MAX}>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Who this is for
            </p>
            <h2
              id="skills-fit-title"
              className="mb-16 max-w-4xl font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl"
            >
              Begin here, or wait — depending on where you actually are.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
              <div>
                <h3 className="mb-10 font-serif-display text-2xl italic text-foreground md:text-3xl">Begin here if…</h3>
                <ul className="space-y-1">
                  {[
                    "You have completed Sandbox and the Readiness Assessment named Skills as the right next step.",
                    "You have one or two senior leaders ready to invest eight weeks in formation, not training.",
                    "Your organization is preparing to use AI in work that touches your community, your donors, your students, or your members — and you want the people leading that work to be formed, not just enabled.",
                    "You believe the difference between using AI well and using it poorly is judgment, not technique.",
                    "You want your team's AI capability to outlast any one staff member's tenure.",
                  ].map((t, i, arr) => (
                    <li key={t} className={cn("py-6", i < arr.length - 1 && "border-b border-border/55")}>
                      <p className="text-lg leading-snug text-foreground">{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/40 bg-background p-10 md:p-12">
                <h3 className="mb-10 font-serif-display text-2xl italic text-foreground opacity-90 md:text-3xl">Wait if…</h3>
                <ul className="space-y-1">
                  {[
                    "You have not yet completed Sandbox. Skills without Sandbox is formation without evidence; the work has nothing concrete to form against.",
                    "You are looking for AI tool training. Skills is formation; if you want training, the Sandbox library and the Field Guide will serve you better.",
                    "You cannot commit one or two leaders to eight weeks of cohort work. Sending someone for parts of it produces uneven formation.",
                    "You expect the cohort to certify staff who have not done the practice work between sessions. We do not certify attendance.",
                    "You want bespoke one-on-one coaching. Skills is peer-formed by design; the cohort is the curriculum.",
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
      <section className={cn(SECTION, "bg-background")} aria-labelledby="skills-voices-title">
        <Reveal>
          <div className={MAX}>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Movement Voices
                </p>
                <h2
                  id="skills-voices-title"
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
      <section className={cn(SECTION, "bg-section")} id="field-guide" aria-labelledby="skills-field-guide-title">
        <Reveal>
          <div className={cn(MAX, "grid grid-cols-1 items-center gap-16 lg:grid-cols-12")}>
            <div className="order-2 lg:order-1 lg:col-span-7">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Read before you commit
              </p>
              <h2
                id="skills-field-guide-title"
                className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Start with the Field Guide.
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
                It Starts With Safety is a sixteen-page Field Guide that walks through the full Movemental Path. The
                self-assessment included will help you evaluate whether your organization is ready for Skills, or whether
                you should begin earlier in the path. The Field Guide is free, and we would rather you do this work well in
                the right order than skip stages and have to backfill later.
              </p>
              <ToolkitDownloadForm
                source="pathway-skills-field-guide"
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
      <section className="band-midnight relative overflow-hidden" aria-labelledby="skills-closing-title">
        <div className={cn(MAX, "relative z-10 py-6 text-center")}>
          <Reveal>
            <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
              Begin Skills
            </p>
            <h2
              id="skills-closing-title"
              className="mx-auto mb-10 max-w-3xl font-serif-display text-4xl italic leading-[0.95] tracking-tight text-inverse-foreground md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Training transfers technique. Formation reshapes judgment. Begin the formation.
            </h2>
            <p className="lede mx-auto mb-14 max-w-2xl text-inverse-foreground/80">
              Skills is the stage that produces leaders capable of holding the pen on AI work inside your organization.
              Without it, the seven decisions from Safety and the use case portfolio from Sandbox are documents without
              the human capacity to apply them.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="/contact?interest=skills"
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
              $15,000 cohort. $5,000 per year platform. Eight weeks of formation. Twelve months of practice held by the
              platform after.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
