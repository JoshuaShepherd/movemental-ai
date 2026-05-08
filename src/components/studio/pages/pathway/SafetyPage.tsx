"use client";

import Link from "next/link";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import { ToolkitOpenButton } from "@/components/toolkit/ToolkitOpenButton";

const ARTIFACTS: readonly { number: string; title: string; body: string }[] = [
  {
    number: "01",
    title: "Acceptable Use Statement",
    body: "A signed organizational position on what AI may and may not do in your context. Names the boundaries before tools are deployed.",
  },
  {
    number: "02",
    title: "Care Boundaries",
    body: "The explicit list of pastoral, counseling, and high-trust interactions where AI must not be used. Protects the human covenant.",
  },
  {
    number: "03",
    title: "Disclosure Standards",
    body: "The rules your organization follows when AI has contributed to communication, content, or decisions. Protects trust with your community.",
  },
  {
    number: "04",
    title: "Vendor and Tool Inventory",
    body: "A documented list of every AI tool currently in use, by whom, for what, with what data. Establishes situational awareness.",
  },
  {
    number: "05",
    title: "Data Handling Protocol",
    body: "The standard for what data may be shared with AI tools, by whom, under what circumstances. Protects donor, member, and staff data.",
  },
  {
    number: "06",
    title: "Incident Response Plan",
    body: "The procedure your organization follows when AI produces harmful, inaccurate, or inappropriate output. Protects against the failures that are coming.",
  },
  {
    number: "07",
    title: "Named Refusals",
    body: "The specific applications of AI that your organization commits to refuse on principle, regardless of pressure. Establishes integrity.",
  },
];

const PROCESS_STEPS: readonly {
  week: string;
  title: string;
  body: string;
}[] = [
  {
    week: "Week 1",
    title: "Day 1 Kickoff",
    body: "A 90-minute leadership session maps your organization's current AI friction, the questions your staff are already asking, and the artifacts your governance structure can ratify.",
  },
  {
    week: "Week 1",
    title: "Drafting",
    body: "We produce the first iteration of all seven artifacts in collaboration with the working group, in language your board can read without translation.",
  },
  {
    week: "Week 2",
    title: "Review and ratification",
    body: "A working session refines language with the leadership team. Edge cases are named. Refusals are sharpened. The documents pass through your governance structure.",
  },
  {
    week: "Week 2",
    title: "Final Day Handoff",
    body: "Seven ratifiable documents are delivered to your governance team along with a one-page board summary. The work is yours.",
  },
];

const PRICING_INCLUDED: readonly string[] = [
  "Roughly 8 hours of synchronous facilitation",
  "Asynchronous drafting and editing",
  "Final 7-artifact documentation package",
  "Board-ready ratification summary",
];

const PRICING_NOT_INCLUDED: readonly string[] = [
  "Direct board member lobbying",
  "Ongoing technical AI monitoring",
  "Legal representation or counsel",
];

export function SafetyPage() {
  return (
    <div className="safety-page">
      {/* ---------------------------------------------------------------- *
       * Section 1 — Hero
       * ---------------------------------------------------------------- */}
      <section
        className="border-b border-border bg-background py-20 md:py-28"
        id="hero"
        aria-labelledby="safety-hero-title"
      >
        <Container>
          <Reveal>
            <div className="max-w-5xl">
              <span className="mb-6 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 01 — Safety Documentation
              </span>
              <h1
                id="safety-hero-title"
                className="mb-10 max-w-4xl font-serif-display text-5xl italic leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                Begin with the questions your people are already asking.
              </h1>
              <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    Safety is the first stage of the Movemental path. In two weeks of facilitated work, your
                    organization produces seven ratifiable governance artifacts that answer the questions your staff,
                    board, and community are already asking about AI. The cost is $1,000. The artifacts are concrete.
                    The work is yours when it&apos;s done.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <ToolkitOpenButton source="safety-hero" variant="primary">
                      Download the free Safety toolkit
                    </ToolkitOpenButton>
                    <Link href="/contact?interest=safety" className="btn-pill btn-pill--ghost">
                      Start a conversation
                    </Link>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <p className="font-serif-display text-xl italic leading-snug text-muted-foreground md:text-2xl">
                    Two weeks. $1,000. Seven artifacts your board can ratify.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- *
       * Section 2 — Seven artifacts grid
       * ---------------------------------------------------------------- */}
      <section className="bg-section py-20 md:py-28" aria-labelledby="safety-artifacts-title">
        <Container>
          <Reveal>
            <div className="mb-20 max-w-3xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What you&apos;ll produce
              </span>
              <h2
                id="safety-artifacts-title"
                className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Seven artifacts. Each one ratifiable.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Each artifact is named, scoped, and produced in collaboration with your team. By the end of two weeks,
                your organization has the foundation for any AI deployment that follows. The work is not theoretical.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
              {ARTIFACTS.map((artifact) => (
                <article key={artifact.number} className="flex flex-col gap-4">
                  <span className="font-serif-display text-4xl italic text-muted-foreground/60">
                    {artifact.number}
                  </span>
                  <h3 className="font-serif-display text-xl text-foreground">{artifact.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{artifact.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- *
       * Section 3 — How the work happens
       * ---------------------------------------------------------------- */}
      <section className="bg-background py-20 md:py-28" aria-labelledby="safety-process-title">
        <Container>
          <Reveal>
            <div className="mb-16 max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                The process
              </span>
              <h2
                id="safety-process-title"
                className="font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                Two weeks of facilitated work.
              </h2>
            </div>
            <div className="relative">
              <div
                className="absolute left-0 right-0 top-12 hidden h-px bg-border md:block"
                aria-hidden
              />
              <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {PROCESS_STEPS.map((step, i) => (
                  <li key={step.title} className="relative flex flex-col gap-3 bg-background pt-0 md:pt-8">
                    <span
                      className="hidden h-2 w-2 rounded-full bg-primary md:block md:absolute md:left-0 md:top-11"
                      aria-hidden
                    />
                    <span className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
                      {step.week}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif-display text-2xl text-foreground">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-16 max-w-2xl text-lg italic leading-relaxed text-muted-foreground">
              Total facilitator time: roughly 8 hours synchronous plus async drafting support.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- *
       * Section 4 — Toolkit lead capture (cover + form)
       * ---------------------------------------------------------------- */}
      <section
        className="bg-elevated py-20 md:py-28"
        aria-labelledby="safety-toolkit-title"
        id="toolkit"
      >
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
              <div className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:col-span-5 lg:mx-0">
                <ToolkitCover />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Not ready yet?
                </span>
                <h2
                  id="safety-toolkit-title"
                  className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
                >
                  Start with the free toolkit.
                </h2>
                <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Before you commit to a facilitated engagement, read the toolkit. &ldquo;It Starts With Safety&rdquo;
                  is a 16-page field guide that names the seven artifacts, walks through why governance precedes
                  deployment, and includes a self-assessment your leadership team can complete in 30 minutes. The
                  toolkit is free.
                </p>
                <div className="max-w-xl">
                  <ToolkitDownloadForm source="safety-page" variant="page" layout="inline" />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- *
       * Section 5 — Pricing
       * ---------------------------------------------------------------- */}
      <section className="bg-background py-20 md:py-28" aria-labelledby="safety-pricing-title">
        <Container>
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Pricing
              </span>
              <h2
                id="safety-pricing-title"
                className="font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
              >
                $1,000. Net 15 from signing.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-primary">
                  What&apos;s included
                </h3>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                  {PRICING_INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden>+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                  What&apos;s not
                </h3>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                  {PRICING_NOT_INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                  Payment terms
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We operate on a flat fee. $1,000 is invoiced upon engagement; Net 15 terms apply. No hidden
                  retainers, no &ldquo;success&rdquo; fees.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- *
       * Section 6 — Closing CTA (Midnight band)
       * ---------------------------------------------------------------- */}
      <section
        className="band-midnight relative overflow-hidden"
        aria-labelledby="safety-closing-title"
        id="closing"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--inverse-surface) 0%, color-mix(in oklab, var(--inverse-surface) 75%, var(--foreground)) 100%)",
          }}
          aria-hidden
        />
        <Container className="relative z-10 text-center">
          <Reveal>
            <h2
              id="safety-closing-title"
              className="display mx-auto mb-8 max-w-3xl text-inverse-foreground"
            >
              Begin with <em>Safety.</em>
            </h2>
            <p className="lede mx-auto mb-12 max-w-2xl text-inverse-foreground/80">
              Most organizations who walk the Movemental path begin here. It is the necessary prerequisite for any
              technological deployment. Without Safety, progress is just speed without direction.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <ToolkitOpenButton source="safety-closing" variant="midnight-primary">
                Download the free toolkit
              </ToolkitOpenButton>
              <Link href="/contact?interest=safety" className="btn-pill btn-pill--ghost">
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
