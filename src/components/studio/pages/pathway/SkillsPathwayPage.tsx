"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const learningOutcomes = [
  "Mastery of intentional prompting frameworks.",
  "Ethical navigation of synthetic outputs.",
  "Integration of AI into strategic planning workflows.",
  "Development of organizational AI guidelines.",
  "Critical evaluation of generative models vs. human insight.",
  "Data privacy and security best practices in AI contexts.",
  "Fostering a culture of responsible AI experimentation.",
  "Long-term vision casting for AI alignment with core mission.",
];

const modules = [
  { num: "01", title: "Foundations of Synthesis", body: "Understanding the transition from information retrieval to generative synthesis." },
  { num: "02", title: "The Architecture of Prompting", body: "Deconstructing complex requests into structured, logical parameters." },
  { num: "03", title: "Ethical Friction", body: "Identifying and navigating the moral ambiguities of synthetic generation." },
  { num: "04", title: "Strategic Integration", body: "Embedding AI workflows seamlessly into existing institutional processes." },
  { num: "05", title: "Data Stewardship", body: "Protecting organizational knowledge in an era of open models." },
  { num: "06", title: "The Limits of the Machine", body: "Recognizing when human intuition and context must override algorithmic output." },
  { num: "07", title: "Cultural Adoption", body: "Leading teams through the anxiety and disruption of technological shifts." },
  { num: "08", title: "The Discerning Organization", body: "Finalizing a localized thesis for AI utilization within your specific mission context." },
];

const engagementLevels = [
  {
    title: "Self-Paced License",
    price: "$4,800/year",
    body: "Independent access to the core curriculum for individuals seeking immediate upskilling without cohort constraints.",
    cta: "Select",
    href: "/contact?interest=skills-self-paced",
    variant: "primary" as const,
    badge: null,
  },
  {
    title: "Cohort",
    price: "$15,000",
    body: "The definitive 8-week guided experience. Facilitated discussion, peer learning, and direct access to Movemental strategists.",
    cta: "Select",
    href: "/contact?interest=skills-cohort",
    variant: "midnight" as const,
    badge: "Recommended",
  },
  {
    title: "Network Skills",
    price: "from $60,000",
    body: "Enterprise-scale deployment for large organizations. Custom cohorts run internally to align entire departments simultaneously.",
    cta: "Inquire",
    href: "/contact?interest=skills-network",
    variant: "ghost" as const,
    badge: null,
  },
  {
    title: "Train-the-Facilitator",
    price: "$25,000",
    body: "Equip your internal leadership to teach the Movemental Skills curriculum autonomously, ensuring long-term institutional knowledge.",
    cta: "Inquire",
    href: "/contact?interest=skills-train-trainer",
    variant: "ghost" as const,
    badge: null,
  },
];

export function SkillsPathwayPage() {
  useEffect(() => {
    document.title = "Stage 03: Skills | Movemental";
  }, []);

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <section className="mb-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Stage 03 of the Movemental AI Path
              </p>
              <h1 className="font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-7xl">
                Skills Development.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Eight weeks. Eight modules. The formational deepening that turns practitioners into discerners — staff who can lead AI work in your organization with wisdom, not just operate it competently.
              </p>
              <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center">
                <Link href="#engagement-levels" className="btn-pill btn-pill--primary px-8 py-4 text-base">
                  Begin a Skills Cohort →
                </Link>
                <Link href="/field-guide" className="btn-pill btn-pill--ghost px-8 py-4 text-base">
                  Field Guide
                </Link>
              </div>
              <Link href="/pathway/sandbox" className="inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-dim">
                Why Skills comes third →
              </Link>
              <p className="border-t border-border pt-8 font-serif-display text-lg italic text-muted-foreground">
                8 weeks · $15,000 cohort · self-paced / network / train-the-facilitator
              </p>
            </div>
            <div className="lg:col-span-6">
              <div
                className="flex aspect-4/5 max-h-[min(600px,70vh)] w-full items-center justify-center bg-section"
                aria-hidden
              >
                <p className="max-w-xs px-6 text-center text-sm leading-relaxed text-muted-foreground">
                  Editorial treatment: architectural detail photography from Stitch export — replaced with tonal surface per movemental asset policy until a licensed still is added.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="bg-section py-20 md:py-24">
          <Reveal>
            <div className="mx-auto max-w-6xl space-y-14 px-0">
              <h2 className="font-serif-display border-b border-border pb-4 text-4xl italic text-foreground">
                Practitioner to Discerner
              </h2>
              <div className="grid gap-12 md:grid-cols-3">
                <div className="md:col-span-2 grid gap-8 md:grid-cols-2">
                  <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                    <p>
                      A practitioner knows the tools. They can navigate interfaces, construct complex prompts, and extract functional outputs. They are efficient operators of the machine.
                    </p>
                    <p>
                      However, an organization built solely on practitioners will eventually hit a ceiling of innovation—or worse, a crisis of alignment. Technical proficiency without philosophical grounding is inherently fragile in the face of exponential change.
                    </p>
                  </div>
                  <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                    <p>
                      A discerner transcends operation. They understand not just how to prompt an AI, but why they are doing it, and what the secondary and tertiary effects of that action might be on the organization&apos;s culture and mission.
                    </p>
                    <p>
                      Skills development at Movemental is not merely software training; it is philosophical calibration. It equips your leaders to navigate the ambiguity of the AI era with institutional wisdom.
                    </p>
                  </div>
                </div>
                <div className="border-l border-border pl-8 md:col-span-1">
                  <blockquote className="font-serif-display text-2xl italic leading-snug text-foreground">
                    &ldquo;A practitioner runs the recipe well. A discerner understands the chemistry of the ingredients, and knows when to rewrite the book entirely.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 font-serif-display text-4xl italic text-foreground">Learning outcomes.</h2>
              <div className="grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
                {learningOutcomes.map((line, i) => (
                  <div key={line} className="flex items-baseline gap-4 border-b border-border py-4">
                    <span className="w-12 shrink-0 font-mono text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-lg text-foreground">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="bg-section py-20 md:py-24">
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 max-w-3xl space-y-4">
                <h2 className="font-serif-display text-4xl italic text-foreground">Course architecture.</h2>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  An eight-module rhythm designed for deep immersion and practical application. Each module builds upon the previous, creating a comprehensive framework for institutional discernment.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-4">
                {modules.map((m) => (
                  <div key={m.num} className="flex h-full flex-col bg-section p-8">
                    <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      Module {m.num}
                    </span>
                    <h3 className="mb-4 font-serif-display text-2xl italic text-foreground">{m.title}</h3>
                    <p className="mt-auto text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="py-20 md:py-28" id="engagement-levels">
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 border-b border-border pb-4 font-serif-display text-4xl italic text-foreground">
                Four ways to engage Skills.
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                {engagementLevels.map((tier) => (
                  <div
                    key={tier.title}
                    className={
                      tier.variant === "midnight"
                        ? "relative flex flex-col border border-inverse-border bg-inverse-surface p-8 text-inverse-foreground"
                        : "relative flex flex-col border border-border bg-card p-8 text-foreground transition-colors hover:bg-section"
                    }
                  >
                    {tier.badge ? (
                      <span
                        className={
                          tier.variant === "midnight"
                            ? "absolute -top-3 left-8 bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-foreground"
                            : "absolute -top-3 left-8 bg-inverse-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-inverse-foreground"
                        }
                      >
                        {tier.badge}
                      </span>
                    ) : null}
                    <h3 className="font-serif-display text-2xl italic">{tier.title}</h3>
                    <p className="mt-2 font-serif-display text-xl italic opacity-90">{tier.price}</p>
                    <p className="mb-8 mt-6 grow text-sm leading-relaxed opacity-90">{tier.body}</p>
                    {tier.variant === "midnight" ? (
                      <Link
                        href={tier.href}
                        className="w-full bg-inverse-foreground py-3 text-center text-sm font-semibold uppercase tracking-eyebrow text-inverse-surface hover:opacity-90"
                      >
                        {tier.cta}
                      </Link>
                    ) : tier.variant === "primary" ? (
                      <Link href={tier.href} className="btn-pill btn-pill--primary w-full justify-center py-3">
                        {tier.cta}
                      </Link>
                    ) : (
                      <Link
                        href={tier.href}
                        className="w-full border border-border py-3 text-center text-sm font-semibold uppercase tracking-eyebrow hover:border-primary hover:text-primary"
                      >
                        {tier.cta}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="band-midnight py-24 md:py-32">
          <Container>
            <Reveal>
              <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
                <div className="md:col-span-7">
                  <blockquote className="font-serif-display text-4xl italic leading-tight text-inverse-foreground md:text-5xl">
                    &ldquo;The primary constraint on organizational adaptation is no longer technological access; it is the philosophical capacity of staff to wield new tools thoughtfully.&rdquo;
                  </blockquote>
                </div>
                <div className="space-y-6 text-lg text-inverse-foreground/80 md:col-span-5">
                  <p>
                    As noted in the <em>Virtuous 2026 Strategic Foresight Report</em>, the democratization of AI means every employee is now a potential point of leverage—or a point of failure. Without a shared framework for discernment, decentralized AI use leads to brand dilution, ethical breaches, and strategic drift.
                  </p>
                  <p>Investing in Skills is not an operational expense; it is a vital risk mitigation strategy and a necessary precursor to scalable innovation.</p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <h2 className="font-serif-display text-4xl italic text-foreground">The Critical Third Step.</h2>
              <p className="text-xl text-muted-foreground">
                Skills cannot be rushed. It must follow the foundational understanding built in Stage 01 and the unconstrained exploration of Stage 02 Sandbox. Only then are teams prepared to codify their practices into institutional competencies.
              </p>
              <div className="flex flex-col justify-center gap-6 pt-4 sm:flex-row">
                <Link href="#engagement-levels" className="btn-pill btn-pill--primary px-8 py-4">
                  View cohort options
                </Link>
                <Link href="/field-guide" className="btn-pill btn-pill--ghost px-8 py-4">
                  Read Field Guide
                </Link>
                <Link href="/contact" className="px-8 py-4 text-sm font-medium text-primary underline underline-offset-4">
                  Contact advisory
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </Container>

      <section className="border-t border-border bg-section py-12">
        <Container>
          <div className="flex flex-col items-stretch justify-between gap-10 md:flex-row md:items-center">
            <Link href="/pathway/sandbox" className="group flex flex-col gap-2 text-muted-foreground hover:text-foreground">
              <span className="text-xs font-semibold uppercase tracking-eyebrow">Previous stage</span>
              <span className="font-serif-display inline-flex items-center gap-2 text-2xl italic transition-all group-hover:translate-x-0.5">
                <ArrowRight className="size-6 rotate-180" aria-hidden />
                Stage 02 Sandbox
              </span>
            </Link>
            <div className="hidden h-16 w-px bg-border md:block" />
            <Link href="/pathway/solutions" className="group flex flex-col items-end gap-2 text-muted-foreground hover:text-foreground md:text-right">
              <span className="text-xs font-semibold uppercase tracking-eyebrow">Next stage</span>
              <span className="font-serif-display inline-flex items-center gap-2 text-2xl italic transition-all group-hover:translate-x-0.5">
                Stage 04 Solutions
                <ArrowRight className="size-6" aria-hidden />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
