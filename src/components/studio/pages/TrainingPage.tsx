"use client";

import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const buyersMeanCards = [
  { num: "01", title: "Workshops", body: "One-off sessions focused on prompt engineering basics." },
  { num: "02", title: "Courses", body: "Pre-recorded video series on generic productivity tools." },
  { num: "03", title: "Certifications", body: "High-level badges that confirm completion but not competence." },
  { num: "04", title: "Bootcamps", body: "Intensive technique-heavy sprints with limited institutional context." },
];

const whereWorks = [
  "Tool discovery",
  "Individual productivity",
  "Low-stakes automation",
  "Generic drafting",
  "Technique fluency",
];

const whereFallsShort = [
  "Theological alignment",
  "Institutional governance",
  "Mission-critical logic",
  "Multi-tenant security",
  "Formation of judgment",
];

const movementalEight = [
  { num: "01", title: "Governance" },
  { num: "02", title: "Ingestion" },
  { num: "03", title: "Chain-of-Thought" },
  { num: "04", title: "Relational Map" },
  { num: "05", title: "Agent Specs" },
  { num: "06", title: "Validation" },
  { num: "07", title: "Scaling" },
  { num: "08", title: "Gov Refresher" },
];

const guidanceCards = [
  { context: "If you lack governance", label: "Start with Safety", href: "/pathway/safety" },
  { context: "If you have Safety only", label: "Move to Sandbox", href: "/pathway/sandbox" },
  { context: "If you have Safety + Sandbox", label: "Focus on Skills", href: "/pathway/skills" },
  { context: "If you have all three", label: "See Solutions", href: "/pathway/solutions" },
];

export function TrainingPage() {
  useEffect(() => {
    document.title = "AI Training for Mission-Driven Organizations | Movemental";
  }, []);

  return (
    <div className="pt-24 pb-0 md:pt-32">
      <Container>
        <Reveal>
          <section className="mb-24 flex flex-col gap-10 border-b border-border pb-20">
            <h1 className="max-w-4xl font-serif-display text-5xl italic leading-[0.95] tracking-tight text-foreground md:text-7xl md:leading-none">
              AI training for mission-driven organizations.
            </h1>
            <p className="max-w-3xl font-serif-display text-3xl italic leading-tight text-primary md:text-4xl">
              Techniques transfer how to use tools. Judgment forms how to use power.
            </p>
            <div className="mt-4 flex max-w-3xl flex-col gap-8">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                In the Movemental framework, Training is synonymous with Stage 03: Skills. It is where we move from experimentation to industrial-grade proficiency. Both matter; the difference matters more — particularly for churches, nonprofits, and institutions.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/pathway/skills" className="btn-pill btn-pill--primary inline-flex items-center gap-2 px-8 py-4">
                  Read about Stage 03: Skills
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link href="/field-guide" className="btn-pill btn-pill--ghost px-8 py-4">
                  Read the Field Guide
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="bg-section py-20 md:py-24">
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 max-w-3xl space-y-4">
                <h2 className="font-serif-display text-4xl italic text-foreground md:text-5xl">What buyers usually mean by AI training.</h2>
                <p className="font-serif-display text-2xl italic leading-snug text-primary">
                  Most offerings focus on the &lsquo;how&rsquo; of the tool rather than the &lsquo;why&rsquo; of the mission.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
                {buyersMeanCards.map((c) => (
                  <div key={c.num} className="flex flex-col gap-4 bg-section p-8">
                    <span className="text-xs font-semibold uppercase tracking-eyebrow text-primary">{c.num}</span>
                    <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 max-w-2xl border-t border-border pt-8">
                <p className="text-lg font-medium text-foreground">This category does technique transfer. It does not do institutional formation.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-16 max-w-3xl font-serif-display text-4xl italic leading-tight text-foreground md:text-5xl">
                Where standard AI training works and where it doesn&apos;t.
              </h2>
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                <div className="grid gap-12 md:grid-cols-2 lg:col-span-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <CheckCircle className="size-5 text-primary" aria-hidden />
                      <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-foreground">Where it works</h3>
                    </div>
                    <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                      {whereWorks.map((item) => (
                        <li key={item} className="flex gap-4">
                          <span className="mt-2 size-1.5 shrink-0 bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <XCircle className="size-5 text-destructive" aria-hidden />
                      <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-foreground">Where it falls short</h3>
                    </div>
                    <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                      {whereFallsShort.map((item) => (
                        <li key={item} className="flex gap-4">
                          <span className="mt-2 size-1.5 shrink-0 bg-destructive" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="flex h-full flex-col justify-center border-l-2 border-primary bg-section p-8">
                    <p className="mb-6 font-serif-display text-2xl italic leading-snug text-foreground">
                      &ldquo;92% of mission-driven leaders believe AI is a lever. Only 7% believe they have the judgment to pull it safely.&rdquo;
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">Source: Virtuous-2026</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-border py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-6xl space-y-8">
              <h2 className="font-serif-display text-5xl italic text-foreground">What Movemental does instead.</h2>
              <p className="max-w-3xl text-xl text-primary">An introduction to Stage 03: Skills.</p>
              <div className="grid gap-24 lg:grid-cols-2">
                <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    The Movemental path is built on the belief that skill without safety is a liability. We don&apos;t just teach prompts; we build workflows that respect the unique intellectual architecture of your organization.
                  </p>
                  <Link href="/pathway/skills" className="btn-pill btn-pill--primary inline-flex items-center gap-2 px-8 py-4">
                    Read the full Stage 03: Skills page
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {movementalEight.map((m) => (
                    <div key={m.num} className="border-b border-border pb-4">
                      <span className="text-xs font-semibold tracking-widest text-primary">{m.num}</span>
                      <h4 className="mt-1 text-base font-medium text-foreground">{m.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-border py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-6xl space-y-12">
              <div>
                <span className="mb-6 block text-xs font-semibold uppercase tracking-eyebrow text-primary">Our guidance</span>
                <h2 className="max-w-4xl font-serif-display text-5xl italic leading-tight text-foreground md:text-6xl">
                  If you came here for training, <span className="italic text-primary">here&apos;s what we recommend.</span>
                </h2>
                <p className="mt-8 max-w-2xl text-xl text-muted-foreground">Deployment depends on actual readiness, not wished-for skill.</p>
              </div>
              <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
                {guidanceCards.map((g) => (
                  <div key={g.label} className="flex min-h-[240px] flex-col justify-between bg-card p-10 transition-colors hover:bg-section">
                    <p className="text-sm text-muted-foreground">{g.context}</p>
                    <div className="mt-8 flex items-center gap-3">
                      <ArrowRight className="size-5 text-primary shrink-0" aria-hidden />
                      <Link href={g.href} className="text-sm font-semibold uppercase tracking-eyebrow text-foreground hover:text-primary">
                        {g.label}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </Container>

      <section className="band-midnight mt-16 flex flex-col items-center px-6 py-24 text-center md:px-12 md:py-32">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl font-serif-display text-5xl italic leading-tight text-inverse-foreground md:text-7xl">
              The path is <span className="text-inverse-muted italic">the path.</span>
            </h2>
            <p className="mx-auto mb-12 mt-8 max-w-2xl text-xl text-inverse-foreground/80">
              Don&apos;t ask &lsquo;what training?&rsquo; Ask &lsquo;where are we?&rsquo;
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link href="/contact" className="btn-pill bg-inverse-foreground px-10 py-5 text-inverse-surface hover:bg-inverse-muted">
                Start a conversation
              </Link>
              <Link
                href="/field-guide"
                className="inline-flex items-center justify-center border border-inverse-border px-10 py-5 text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground hover:border-inverse-foreground"
              >
                Read the Field Guide
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
