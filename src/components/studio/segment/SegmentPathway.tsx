"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { SafetyContent } from "@/components/studio/path/stages/SafetyContent";
import { SandboxContent } from "@/components/studio/path/stages/SandboxContent";
import { SkillsContent } from "@/components/studio/path/stages/SkillsContent";
import { SolutionsContent } from "@/components/studio/path/stages/SolutionsContent";
import { cn } from "@/lib/utils";

interface SegmentPathwayProps {
  audience: "churches" | "nonprofits" | "institutions";
}

const FAQ_SECTION_TITLE: Record<SegmentPathwayProps["audience"], string> = {
  churches: "Common questions from church leaders",
  nonprofits: "Common questions from nonprofit leaders",
  institutions: "Common questions from institutional leaders",
};

const commonDeliverables = {
  safety: [
    "AI Use & Trust Charter",
    "Roles & Decision Rights",
    "Data Hygiene Audit",
    "AI Risk Register",
    "Acceptable Use Policy",
  ],
  sandbox: [
    "Facilitated discovery sprints",
    "Private sandbox environment",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Use Case Portfolio",
  ],
  skills: [
    "The Movemental AI Wisdom course",
    "Up to 15 participant seats",
    "LMS-hosted recipe library",
    "Facilitator Track",
    "Pre/post capability assessments",
  ],
  solutions: [
    "Integration: Ingest intelligence",
    "Activation: Native AI workflows",
    "Transformation: Adaptive training",
    "Multiplication: Strategic linking",
  ],
};

const segmentData = {
  churches: {
    hero: {
      h1: "Your church is being asked to take a position on AI.",
      subhead:
        "Most churches don’t have a clean answer yet. The Movemental AI Path is a four-step sequence — Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment — designed so AI lands on a church that’s ready for it, instead of amplifying problems that were already there.",
      nonNegotiable:
        "Step 1 is the human work. We won’t build solutions on top of a church that hasn’t done it — ours or yours.",
      cards: [
        {
          heading: "Our board is asking and we need a position.",
          body: "Start with Step 1: Safety Documentation. A 14-document governance package drafted in two weeks, ratified in your voice.",
          cta: "Start with Safety Documentation",
          href: "/pathway/safety",
        },
        {
          heading: "Our staff is already experimenting and we need a framework.",
          body: "Start with Step 2: Sandbox Discovery. A structured environment where your team identifies what’s worth building and what isn’t.",
          cta: "Start with Sandbox Discovery",
          href: "/pathway/sandbox",
        },
        {
          heading: "We’re ready to rebuild our digital infrastructure.",
          body: "Start a conversation about Step 4: Solutions Deployment. We’ll confirm your Safety Documentation is in place — ours or yours — before we build.",
          cta: "Talk about Solutions Deployment",
          href: "/contact?interest=solutions-deployment-churches",
        },
      ],
    },
    stops: [
      {
        num: "01",
        name: "Safety Documentation",
        duration: "2 weeks",
        price: "$5,000",
        outcome: "A charter your elder board can sign.",
        deliverables: commonDeliverables.safety,
        href: "/pathway/safety",
      },
      {
        num: "02",
        name: "Sandbox Discovery",
        duration: "4 weeks",
        price: "$15,000",
        outcome: "Pastoral and operational use cases proven safe.",
        deliverables: commonDeliverables.sandbox,
        href: "/pathway/sandbox",
      },
      {
        num: "03",
        name: "Skills Development",
        duration: "8 weeks",
        price: "from $4,800/yr",
        outcome: "Staff trained to lead AI work without losing the plot.",
        deliverables: commonDeliverables.skills,
        href: "/pathway/skills",
      },
      {
        num: "04",
        name: "Solutions Deployment",
        duration: "8-12 weeks",
        price: "from $30K",
        outcome: "Sermons, formation, member care, and communications, integrated.",
        deliverables: commonDeliverables.solutions,
        href: "/pathway/solutions",
      },
    ],
    faqs: [
      {
        q: "Will this conflict with our theology around discernment, presence, and pastoral care?",
        a: "No. The path is designed precisely so AI serves pastoral work rather than replacing it. Safety Documentation specifically codifies where AI must not go.",
      },
      {
        q: "What if our staff isn't technical?",
        a: "Most aren't. The path assumes that. Skills Development is built for non-technical staff to become competent — not engineers, leaders.",
      },
      {
        q: "Do we have to do all four stages?",
        a: "No. Many continue; none are forced.",
      },
    ],
  },
  nonprofits: {
    hero: {
      h1: "Your nonprofit can’t afford to get AI wrong.",
      subhead:
        "Donor data is sacred. Beneficiary data is sacred. Mission integrity is non-negotiable. The Movemental AI Path is a four-step sequence — Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment — designed to protect what matters most while the organization adopts what matters next.",
      nonNegotiable:
        "Step 1 is the human work. We won’t build solutions on top of a nonprofit that hasn’t done it — ours or yours.",
      cards: [
        {
          heading: "Our board wants clarity before our staff goes further.",
          body: "Start with Step 1: Safety Documentation. A governance package built around your mission, your data, and your beneficiaries — drafted in two weeks.",
          cta: "Start with Safety Documentation",
          href: "/pathway/safety",
        },
        {
          heading: "We have ideas. We need a way to evaluate them honestly.",
          body: "Start with Step 2: Sandbox Discovery. Structured discovery that surfaces real opportunities and names real risks — before you commit to any tool.",
          cta: "Start with Sandbox Discovery",
          href: "/pathway/sandbox",
        },
        {
          heading: "We’re ready to integrate the work we already have.",
          body: "Start a conversation about Step 4: Solutions Deployment. We’ll confirm your Safety Documentation is in place — ours or yours — before we build.",
          cta: "Talk about Solutions Deployment",
          href: "/contact?interest=solutions-deployment-nonprofits",
        },
      ],
    },
    stops: [
      {
        num: "01",
        name: "Safety Documentation",
        duration: "2 weeks",
        price: "$5,000",
        outcome: "Donor and beneficiary data, governed and protected.",
        deliverables: commonDeliverables.safety,
        href: "/pathway/safety",
      },
      {
        num: "02",
        name: "Sandbox Discovery",
        duration: "4 weeks",
        price: "$15,000",
        outcome: "Mission-aligned use cases, validated.",
        deliverables: commonDeliverables.sandbox,
        href: "/pathway/sandbox",
      },
      {
        num: "03",
        name: "Skills Development",
        duration: "8 weeks",
        price: "from $4,800/yr",
        outcome: "A team that can lead AI work without compromising the mission.",
        deliverables: commonDeliverables.skills,
        href: "/pathway/skills",
      },
      {
        num: "04",
        name: "Solutions Deployment",
        duration: "8-12 weeks",
        price: "from $30K",
        outcome: "Programs, donors, communications, integrated and multiplied.",
        deliverables: commonDeliverables.solutions,
        href: "/pathway/solutions",
      },
    ],
    faqs: [
      {
        q: "How do you protect beneficiary and donor data?",
        a: "The Sandbox is privacy-protected and publishing-prevented by design. Safety Documentation codifies the data handling standards before anything touches a model.",
      },
      {
        q: "Can we afford this?",
        a: "The full Pathway is $65,000. A single comparable engagement at a Big Four consultancy starts at $250,000 and doesn't include the platform.",
      },
      {
        q: "What if we're already using ChatGPT informally?",
        a: "That's exactly when Safety Documentation matters most. Informal use without a charter is the most common path to a problem.",
      },
    ],
  },
  institutions: {
    hero: {
      h1: "Your institution is being asked to lead on AI — internally and externally.",
      subhead:
        "Seminaries, training networks, and denominational bodies face the AI question twice — for their own institution, and for the leaders they’re forming. The Movemental AI Path is a four-step sequence — Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment — designed to address both at once.",
      nonNegotiable:
        "Step 1 is the human work. We won’t build solutions on top of an institution that hasn’t done it — ours or yours.",
      cards: [
        {
          heading: "We need an institutional position and a teachable framework.",
          body: "Start with Step 1: Safety Documentation. A charter that governs your institution and serves as a teaching artifact for the leaders and organizations you serve.",
          cta: "Start with Safety Documentation",
          href: "/pathway/safety",
        },
        {
          heading: "We want a Sandbox that doubles as a learning case study.",
          body: "Start with Step 2: Sandbox Discovery. Structured discovery that produces both internal use cases and a published artifact you can extend to your network.",
          cta: "Start with Sandbox Discovery",
          href: "/pathway/sandbox",
        },
        {
          heading: "We’re ready to rebuild our infrastructure and connect our network.",
          body: "Start a conversation about Step 4: Solutions Deployment, including network deployment across member entities. We’ll confirm your Safety Documentation is in place — ours or yours — before we build.",
          cta: "Talk about Solutions Deployment",
          href: "/contact?interest=network-engagement",
        },
      ],
    },
    stops: [
      {
        num: "01",
        name: "Safety Documentation",
        duration: "2 weeks",
        price: "$5,000",
        outcome: "Institutional charter and a teachable governance framework.",
        deliverables: commonDeliverables.safety,
        href: "/pathway/safety",
      },
      {
        num: "02",
        name: "Sandbox Discovery",
        duration: "4 weeks",
        price: "$15,000",
        outcome: "Use cases proven, plus a living teaching artifact.",
        deliverables: commonDeliverables.sandbox,
        href: "/pathway/sandbox",
      },
      {
        num: "03",
        name: "Skills Development",
        duration: "8 weeks",
        price: "from $4,800/yr",
        outcome: "Your staff and your students learning the same wisdom.",
        deliverables: commonDeliverables.skills,
        href: "/pathway/skills",
      },
      {
        num: "04",
        name: "Solutions Deployment",
        duration: "8-12 weeks",
        price: "from $30K",
        outcome: "Curriculum, network, and scholarship, integrated as infrastructure.",
        deliverables: commonDeliverables.solutions,
        href: "/pathway/solutions",
      },
    ],
    faqs: [
      {
        q: "Can we white-label or extend this to the organizations we serve?",
        a: "Yes. Many of our institutional engagements include extension rights or referral structures.",
      },
      {
        q: "Does this work for accredited programs?",
        a: "Yes. Skills Development includes assessment, certification, and credentialing structures compatible with accredited learning environments.",
      },
      {
        q: "What does Solutions Deployment look like for a multi-entity institution?",
        a: "Multi-entity Solutions Deployment engagements are quoted custom under our Network Engagements structure, typically starting at $60,000 and scaling by scope.",
      },
    ],
  },
};

export function SegmentPathway({ audience }: SegmentPathwayProps) {
  const data = segmentData[audience];

  const [activeStage, setActiveStage] = useState(0);
  const pathwaySectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const meterRef = useRef<HTMLDivElement>(null);

  // Active panel — IntersectionObserver center band (parity with path/PathStickySection).
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<number, number>();

    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.set(i, entry.intersectionRatio || 0.001);
            } else {
              visible.delete(i);
            }
          }
          if (visible.size > 0) {
            let bestIndex = 0;
            let bestRatio = -1;
            visible.forEach((ratio, idx) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                bestIndex = idx;
              }
            });
            setActiveStage(bestIndex);
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Meter fill — same progress model as path/PathStickySection.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = pathwaySectionRef.current;
        if (!el || !meterRef.current) return;
        const rect = el.getBoundingClientRect();
        const viewport = window.innerHeight || 0;
        const total = rect.height + viewport;
        const traveled = viewport - rect.top;
        const pct = Math.max(0, Math.min(1, traveled / total));
        meterRef.current.style.height = `${pct * 100}%`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleJump = useCallback((index: number) => {
    const target = panelRefs.current[index];
    if (!target) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const StageComponents = [SafetyContent, SandboxContent, SkillsContent, SolutionsContent];

  return (
    <>
      <section className="band-default border-border border-b pt-24 pb-12 md:pt-32">
        <Container>
          <Reveal>
            <h1 className="font-serif-display mb-6 max-w-4xl text-4xl text-foreground italic md:text-5xl lg:text-6xl">
              {data.hero.h1}
            </h1>
            <p className="mb-6 max-w-4xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              {data.hero.subhead}
            </p>
            <p className="mb-12 max-w-4xl text-base text-muted-foreground italic">
              {data.hero.nonNegotiable}
            </p>

            <div className="mb-16 grid gap-6 md:grid-cols-3">
              {data.hero.cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-card border-border hover:border-primary/40 flex flex-col rounded-card border p-8 transition-colors"
                >
                  <h2 className="mb-4 text-lg font-semibold leading-snug text-foreground md:text-xl">
                    {card.heading}
                  </h2>
                  <p className="text-muted-foreground mb-6 grow text-[1.0625rem] leading-relaxed">{card.body}</p>
                  <Link
                    href={card.href}
                    className="text-primary mt-auto inline-flex items-center text-sm font-semibold transition-opacity hover:opacity-80"
                  >
                    {card.cta} <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-section border-border mx-auto mb-8 max-w-6xl rounded-card border p-8 md:p-10">
              <h3 className="font-serif-display mb-8 text-2xl italic">What are the outcomes?</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {data.stops.map((stop, i) => (
                  <div key={i} className="flex h-full flex-col">
                    <div className="text-primary mb-2 text-xs font-semibold uppercase tracking-eyebrow">
                      Stage {stop.num}
                    </div>
                    <h4 className="mb-4 font-medium text-foreground">{stop.name}</h4>

                    <div className="text-muted-foreground mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                      <span className="bg-background rounded px-2 py-1">{stop.duration}</span>
                      <span className="bg-background rounded px-2 py-1">{stop.price}</span>
                    </div>

                    <div className="mb-6 flex-grow text-sm leading-relaxed font-medium text-foreground">{stop.outcome}</div>

                    <div className="mb-6">
                      <h5 className="text-muted-foreground mb-3 text-[10px] font-bold uppercase tracking-eyebrow">
                        Key Deliverables
                      </h5>
                      <ul className="space-y-2">
                        {stop.deliverables.map((item, j) => (
                          <li key={j} className="flex items-start text-xs text-foreground/80">
                            <span className="text-primary mt-0.5 mr-2" aria-hidden="true">
                              —
                            </span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {stop.href ? (
                      <Link
                        href={stop.href}
                        className="text-primary mt-auto inline-flex items-center text-sm font-semibold transition-opacity hover:opacity-80"
                      >
                        View details <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section
        ref={pathwaySectionRef}
        className="band-section bg-background border-border border-b"
        id="pathway-details"
      >
        <div className="mx-auto w-full max-w-max px-4 sm:px-6 lg:px-12">
          <div className="grid min-h-0 grid-cols-1 gap-10 min-[960px]:grid-cols-[33%_1fr] min-[960px]:gap-12 lg:gap-16">
            <div
              className="relative hidden min-[960px]:block min-[960px]:self-start"
              aria-label="Path stages"
            >
              <div
                className="rounded-card bg-section border-border relative flex gap-8 border p-8 min-[960px]:sticky min-[960px]:top-[var(--site-chrome-total,4.25rem)] min-[960px]:max-h-[calc(100dvh-var(--site-chrome-total,4.25rem))] min-[960px]:overflow-y-auto"
              >
                <div className="rounded-card pointer-events-none absolute inset-0 bg-linear-to-br from-background/40 to-transparent" />

                <div className="relative h-[400px] w-1 flex-shrink-0 rounded-full bg-border">
                  <div
                    ref={meterRef}
                    className="bg-foreground absolute top-0 left-0 w-full rounded-full transition-all duration-100 ease-linear"
                    style={{ height: "0%" }}
                  />
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-between py-1">
                    {[0, 1, 2, 3].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleJump(i)}
                        className={cn(
                          "bg-section h-4 w-4 rounded-full border-2 transition-colors",
                          activeStage >= i ? "border-foreground" : "border-border hover:border-foreground/40",
                        )}
                        aria-label={`Jump to stage ${data.stops[i]?.num ?? i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex w-full flex-col justify-center">
                  <div className="mb-6 flex gap-1">
                    {[0, 1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                          dot === activeStage ? "bg-primary" : "bg-border",
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-foreground/50 mb-2 text-xs font-semibold uppercase tracking-eyebrow transition-all">
                    Stage {data.stops[activeStage]?.num} of 04
                  </div>
                  <h3 className="font-serif-display mb-6 text-3xl italic transition-all">
                    {data.stops[activeStage]?.name}
                  </h3>

                  <div key={activeStage} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="mb-6 text-[1.0625rem] leading-relaxed font-medium text-foreground">
                      {data.stops[activeStage]?.outcome}
                    </p>

                    {data.stops[activeStage]?.href ? (
                      <Link
                        href={data.stops[activeStage]!.href!}
                        className="text-primary inline-flex items-center text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                      >
                        View details <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              {data.stops.map((stop, i) => {
                const Content = StageComponents[i];
                return (
                  <article
                    key={i}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    id={`stage-${stop.num}`}
                    className="stage-panel scroll-mt-[calc(var(--site-chrome-total,4.25rem)+1rem)] border-border min-h-[70vh] border-b py-16 last:min-h-[50vh] last:border-b-0 lg:py-24"
                  >
                    <div className="mb-10 flex items-center gap-4 md:hidden">
                      <span className="text-foreground/60 text-sm font-semibold uppercase tracking-eyebrow">
                        Stage {stop.num} of 04 <span className="text-border mx-2">/</span>{" "}
                        <em className="text-foreground shrink-0">{stop.name}</em>
                      </span>
                    </div>
                    <Content />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="band-section bg-section py-20 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-serif-display mb-12 text-3xl text-foreground italic md:text-4xl">
              {FAQ_SECTION_TITLE[audience]}
            </h2>
            <div className="max-w-4xl space-y-8">
              {data.faqs.map((faq, i) => (
                <div key={i} className="bg-card border-border rounded-card border p-8">
                  <h3 className="mb-4 text-lg font-medium text-foreground md:text-xl">{faq.q}</h3>
                  <p className="text-muted-foreground text-[1.0625rem] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {audience === "institutions" ? (
              <div className="border-primary/20 bg-primary/5 mt-12 max-w-4xl rounded-card border p-8">
                <h3 className="mb-3 text-xl font-semibold text-foreground">Network Engagements</h3>
                <p className="text-primary/90 mb-6 text-[1.0625rem] leading-relaxed">
                  For denominations, training networks, and multi-site organizations, Solutions Deployment extends across entities —
                  shared governance, linked platforms, federated intelligence. These engagements are quoted per
                  conversation. Most start at $60,000 and scale with scope.
                </p>
                <Link href="/contact" className="btn-pill btn-pill--primary inline-flex text-sm">
                  Talk about a Network Engagement
                </Link>
              </div>
            ) : null}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
