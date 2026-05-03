import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";
import { cn } from "@/lib/utils";

const INFORMATIONAL = [
  "Teachings",
  "Frameworks",
  "Research",
  "Stories",
  "Content",
  "Documents",
  "Curriculum",
  "Accumulated wisdom",
] as const;

const RELATIONAL = [
  "People",
  "Collaborators",
  "Donors",
  "Leaders",
  "Groups",
  "Faculty",
  "Networks",
  "Communication history",
  "Trust and context",
] as const;

const PRINCIPLES = [
  {
    n: "01",
    t: "Formation over growth",
    b: "Success is measured by transformation, not traffic.",
  },
  {
    n: "02",
    t: "Humans over hacks",
    b: "AI can assist, but it does not replace human responsibility.",
  },
  {
    n: "03",
    t: "Scenius over genius",
    b: "Credibility grows in networks of real people, not isolated personal brands.",
  },
  {
    n: "04",
    t: "Technology serves mission",
    b: "Tools are ordered to purpose, not the other way around.",
  },
] as const;

const CONTRASTS = [
  {
    t: "A generic creator platform.",
    b: "It is built for work that carries formative and communal responsibility — not attention at any cost.",
  },
  {
    t: "Just a content engine.",
    b: "It connects knowledge, relationships, pathways, and support into one working system.",
  },
  {
    t: "Anti-technology.",
    b: "It uses technology seriously, but refuses to let technology become the mission.",
  },
  {
    t: "Merely a set of tools.",
    b: "It is a system for integrating fragmented intelligence into coherent, usable, formational infrastructure.",
  },
] as const;

// Canonical doctrine: churches, nonprofits, and institutions are the primary
// implementation audiences. Movement leaders are a distinct trusted-voice /
// ecosystem layer and appear separately below — not as a fourth peer chip.
// See docs/build/strategy/movement-leaders-as-ecosystem-layer.md.
const IMPLEMENTATION_AUDIENCES = [
  { label: "Churches", href: "/churches" },
  { label: "Nonprofits & ministries", href: "/nonprofits" },
  { label: "Networks, institutions & bridges", href: "/institutions" },
] as const;

const TRUST = [
  {
    n: "01",
    t: "Grounded in real work",
    b: "The vision is shaped by real movement, formation, and organizational challenges — not abstract product theory.",
  },
  {
    n: "02",
    t: "Values made explicit",
    b: "The commitments behind the system are named openly, not implied after the fact.",
  },
  {
    n: "03",
    t: "Inspectable architecture",
    b: "The arguments, systems, and models can be examined in public through the fragmentation story, the book, the AI Stewardship Sequence field guide, and long-form writing.",
  },
  {
    n: "04",
    t: "Built around responsibility",
    b: "The goal is not extraction, automation theater, or platform lock-in, but durable intelligence and trustworthy use.",
  },
] as const;

const TEAM = [
  {
    name: "Joshua Shepherd",
    initials: "JS",
    role: "Founder & Lead Engineer",
    bio: "Full-stack architect working at the intersection of platform infrastructure, AI systems, and movement-oriented technology. Builds the system layer that holds Movemental together.",
  },
  {
    name: "Alan Hirsch",
    initials: "AH",
    role: "Missional Strategist",
    bio: "Movement thinker, author, and founding influence behind Movemental's formation philosophy. Decades of work in missional theology, church planting, and leadership development.",
  },
  {
    name: "Brad Brisco",
    initials: "BB",
    role: "Strategic Partner",
    bio: "Missional church strategist, author, and multiplication leader helping churches and planters bridge institutional structures and grassroots mission.",
  },
] as const;

const WHY_AFFECTS = [
  { idx: "A", text: "What can be found." },
  { idx: "B", text: "What can be trusted." },
  { idx: "C", text: "What can be formed." },
  { idx: "D", text: "What can compound." },
  { idx: "E", text: "What AI can meaningfully understand or extend." },
] as const;

/**
 * About — Concept Modern editorial page. Mirrors
 * `docs/html/about-modern.html` (the approved visual/content source).
 * Server Component by default; `RevealOnScroll` is the only client leaf.
 */
export function AboutPageContent() {
  return (
    <div data-editorial="concept-modern" className="text-pretty">
      {/* SECTION 1 — HERO ------------------------------------------------ */}
      <Section
        id="top"
        variant="default"
        spacing="lg"
        aria-labelledby="hero-title"
        className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">About Movemental</Eyebrow>
          </RevealOnScroll>

          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-[clamp(3rem,6vw,5.5rem)]">
            <div>
              <RevealOnScroll delaySec={0.08}>
                <h1
                  id="hero-title"
                  className="text-display max-w-[18ch] text-balance text-foreground"
                >
                  Built for work that is meant to{" "}
                  <em>form people</em>, not just attract attention.
                </h1>
              </RevealOnScroll>

              <RevealOnScroll
                delaySec={0.18}
                className="mt-6 space-y-4 sm:mt-8"
              >
                <p className="max-w-[52ch] text-pretty text-[clamp(1.1rem,1.6vw,1.22rem)] leading-normal text-muted-foreground">
                  Movemental exists because some of the most important work in
                  the world is structurally under-supported online.
                </p>
                <p className="max-w-[52ch] text-pretty text-[clamp(1.1rem,1.6vw,1.22rem)] leading-normal text-muted-foreground">
                  Leaders, churches, nonprofits, and institutions may have deep
                  teaching, real credibility, and meaningful communities — yet
                  still lack the system that helps that work endure, connect,
                  and compound.
                </p>
                <p className="max-w-[52ch] text-pretty text-[clamp(1.1rem,1.6vw,1.22rem)] leading-normal text-muted-foreground">
                  Movemental responds to that gap by building systems that
                  bring fragmented informational and relational intelligence
                  into one coherent platform.
                </p>
              </RevealOnScroll>

              <RevealOnScroll
                delaySec={0.3}
                className="mt-7 max-w-[52ch] text-sm text-ink-soft"
              >
                <span className="font-medium text-foreground">
                  Our public spine:
                </span>{" "}
                Fragmentation &rarr; Integration &rarr; Activation &rarr;
                Formation &rarr; Multiplication &rarr; Movement.
              </RevealOnScroll>

              <RevealOnScroll
                delaySec={0.38}
                className="mt-8 flex flex-wrap gap-3 sm:mt-10"
              >
                <Button asChild size="lg">
                  <Link href="/fragmentation">
                    See the fragmentation story
                    <ArrowRight className="arrow ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="#principles">See how it works</Link>
                </Button>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delaySec={0.44} className="lg:pl-6">
              <figure
                className="mx-auto aspect-[5/6] w-full max-w-[440px]"
                aria-hidden
              >
                <svg
                  viewBox="0 0 440 528"
                  className="h-full w-full text-foreground"
                  role="img"
                  aria-label="Layered intelligence — a quiet architectural composition"
                >
                  <title>A system, not a feed</title>
                  <rect
                    x="16"
                    y="16"
                    width="408"
                    height="496"
                    rx="4"
                    className="fill-section"
                    opacity="0.55"
                  />
                  <rect
                    x="52"
                    y="90"
                    width="336"
                    height="92"
                    rx="3"
                    className="fill-card stroke-border"
                    strokeWidth="1"
                  />
                  <rect
                    x="52"
                    y="196"
                    width="336"
                    height="92"
                    rx="3"
                    className="fill-section"
                  />
                  <rect
                    x="52"
                    y="302"
                    width="336"
                    height="92"
                    rx="3"
                    className="fill-card stroke-border"
                    strokeWidth="1"
                  />
                  <rect
                    x="52"
                    y="408"
                    width="336"
                    height="58"
                    rx="3"
                    className="fill-section"
                  />
                  <text
                    x="68"
                    y="118"
                    className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  >
                    L1 · Informational
                  </text>
                  <text
                    x="68"
                    y="224"
                    className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  >
                    L2 · Relational
                  </text>
                  <text
                    x="68"
                    y="330"
                    className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  >
                    L3 · Pathways
                  </text>
                  <text
                    x="68"
                    y="434"
                    className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  >
                    L4 · Movement
                  </text>

                  <g transform="translate(240, 140)" stroke="currentColor" fill="none">
                    <circle r="5" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="-8" r="4" className="fill-background" />
                    <circle cx="40" cy="4" r="4" className="fill-background" />
                    <circle cx="60" cy="-10" r="4" className="fill-background" />
                    <circle cx="80" cy="2" r="4" className="fill-background" />
                    <circle cx="100" cy="-6" r="4" className="fill-background" />
                    <line x1="0" y1="0" x2="20" y2="-8" opacity="0.7" />
                    <line x1="20" y1="-8" x2="40" y2="4" opacity="0.7" />
                    <line x1="40" y1="4" x2="60" y2="-10" opacity="0.7" />
                    <line x1="60" y1="-10" x2="80" y2="2" opacity="0.7" />
                    <line x1="80" y1="2" x2="100" y2="-6" opacity="0.7" />
                  </g>

                  <g transform="translate(240, 246)" stroke="currentColor" fill="none">
                    <circle r="4" className="fill-background" />
                    <circle cx="28" cy="-14" r="4" className="fill-background" />
                    <circle cx="50" cy="6" r="4" fill="currentColor" stroke="none" />
                    <circle cx="78" cy="-8" r="4" className="fill-background" />
                    <circle cx="100" cy="8" r="4" className="fill-background" />
                    <line x1="0" y1="0" x2="28" y2="-14" opacity="0.28" />
                    <line x1="0" y1="0" x2="50" y2="6" opacity="0.7" />
                    <line x1="28" y1="-14" x2="50" y2="6" opacity="0.7" />
                    <line x1="50" y1="6" x2="78" y2="-8" opacity="0.7" />
                    <line x1="50" y1="6" x2="100" y2="8" opacity="0.28" />
                    <line x1="78" y1="-8" x2="100" y2="8" opacity="0.7" />
                  </g>

                  <g transform="translate(240, 352)" stroke="currentColor" fill="none">
                    <circle r="5" fill="currentColor" stroke="none" />
                    <line x1="10" y1="0" x2="26" y2="0" opacity="0.7" />
                    <circle cx="34" r="5" className="fill-background" />
                    <line x1="42" y1="0" x2="58" y2="0" opacity="0.7" />
                    <circle cx="66" r="5" className="fill-background" />
                    <line x1="74" y1="0" x2="90" y2="0" opacity="0.7" />
                    <circle cx="98" r="5" className="fill-background" />
                  </g>

                  <g transform="translate(240, 440)" stroke="currentColor" fill="none">
                    <path
                      d="M0,0 C20,-12 40,12 60,0 S100,-12 120,0"
                      opacity="0.7"
                    />
                    <circle r="3" fill="currentColor" stroke="none" />
                    <circle cx="60" r="3" fill="currentColor" stroke="none" />
                    <circle cx="120" r="3" fill="currentColor" stroke="none" />
                  </g>

                  <line
                    x1="72"
                    y1="90"
                    x2="72"
                    y2="466"
                    stroke="currentColor"
                    opacity="0.28"
                  />
                </svg>
                <figcaption className="mt-3 text-center text-[0.78rem] uppercase tracking-eyebrow text-ink-soft">
                  A system, not a feed
                </figcaption>
              </figure>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* SECTION 2 — WHY MOVEMENTAL HAD TO EXIST ------------------------- */}
      <Section
        id="why"
        variant="section"
        spacing="lg"
        aria-labelledby="why-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container className="max-w-[740px]">
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Origin</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="why-title"
              className="text-h2 max-w-[24ch] text-balance text-foreground"
            >
              Why Movemental had to exist
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.14}
            className="mt-7 max-w-[58ch] space-y-4 text-[1.08rem] leading-[1.7] text-muted-foreground"
          >
            <p>The internet made publishing easier and coherence harder.</p>
            <p>
              The people and organizations doing some of the deepest formative
              work often operate through fragmented tools, disconnected content,
              rented platforms, and thin digital continuity.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.2}
            className="mt-8 max-w-[56ch] border-t border-border"
          >
            <ol aria-label="What fragmentation affects">
              {WHY_AFFECTS.map((row) => (
                <li
                  key={row.idx}
                  className="flex items-baseline gap-3 border-b border-border py-3.5 text-[1rem] text-foreground"
                >
                  <span className="shrink-0 text-[0.78rem] font-medium tabular-nums tracking-eyebrow text-ink-soft">
                    {row.idx}
                  </span>
                  <span>{row.text}</span>
                </li>
              ))}
            </ol>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.26}
            className="mt-8 max-w-[58ch] text-[1.08rem] leading-[1.7] text-muted-foreground"
          >
            <p>
              Movemental exists to respond to that reality — not by replacing
              embodied work, but by building digital systems that can support it.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* SECTION 3 — THE PROBLEM ----------------------------------------- */}
      <Section
        id="problem"
        variant="default"
        spacing="lg"
        aria-labelledby="problem-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
            <div>
              <RevealOnScroll>
                <Eyebrow withDot className="mb-5">What we actually solve</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.08}>
                <h2
                  id="problem-title"
                  className="text-h2 max-w-[24ch] text-balance text-foreground"
                >
                  The problem is not just content. It is{" "}
                  <em>fragmented intelligence</em>.
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.14}>
              <p className="max-w-[50ch] text-[1.08rem] leading-[1.65] text-muted-foreground">
                Most serious organizations already have knowledge. They already
                have relationships. What they often lack is a coherent system
                where those two forms of intelligence can{" "}
                <strong className="font-medium text-foreground">
                  work together
                </strong>
                .
              </p>
            </RevealOnScroll>
          </div>

          <div className="mt-10 grid border-t border-border sm:grid-cols-2">
            <RevealOnScroll
              delaySec={0.06}
              className="border-b border-border py-8 sm:border-b-0 sm:border-r sm:pr-9"
            >
              <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                01 · Informational intelligence
              </p>
              <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.4vw,2rem)] font-normal italic leading-tight tracking-tight text-foreground">
                What the work knows.
              </h3>
              <p className="mt-3 max-w-[42ch] text-[1rem] leading-[1.55] text-muted-foreground">
                The teachings, frameworks, research, and accumulated wisdom
                that a body of work carries.
              </p>
              <ul className="mt-4 grid gap-1.5 text-[0.96rem] text-foreground">
                {INFORMATIONAL.map((item) => (
                  <li key={item} className="inline-flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="size-1 -translate-y-0.5 rounded-full bg-foreground/55"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            <RevealOnScroll
              delaySec={0.14}
              className="border-b border-border py-8 sm:border-b-0 sm:pl-9"
            >
              <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                02 · Relational intelligence
              </p>
              <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.4vw,2rem)] font-normal italic leading-tight tracking-tight text-foreground">
                Who the work is actually with.
              </h3>
              <p className="mt-3 max-w-[42ch] text-[1rem] leading-[1.55] text-muted-foreground">
                The people, trust, and context that carry the work — and make
                it possible in the first place.
              </p>
              <ul className="mt-4 grid gap-1.5 text-[0.96rem] text-foreground">
                {RELATIONAL.map((item) => (
                  <li key={item} className="inline-flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="size-1 -translate-y-0.5 rounded-full bg-foreground/55"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            delaySec={0.22}
            className="mt-[clamp(2.5rem,5vw,3.5rem)] aspect-[16/7] w-full"
          >
            <svg
              viewBox="0 0 880 360"
              className="h-full w-full text-foreground"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Informational and relational intelligence converging into one coherent system"
            >
              <title>Informational + relational intelligence converging</title>
              <g transform="translate(120, 180)" stroke="currentColor" fill="none">
                <circle r="4" fill="currentColor" stroke="none" />
                <circle cx="-50" cy="-60" r="3.5" className="fill-background" />
                <circle cx="30" cy="-80" r="3.5" className="fill-background" />
                <circle cx="-70" cy="10" r="3.5" className="fill-background" />
                <circle cx="-10" cy="60" r="3.5" className="fill-background" />
                <circle cx="50" cy="40" r="3.5" className="fill-background" />
                <circle cx="-30" cy="90" r="3.5" className="fill-background" />
                <circle cx="60" cy="-30" r="3.5" className="fill-background" />
                <line x1="0" y1="0" x2="-50" y2="-60" opacity="0.28" />
                <line x1="0" y1="0" x2="30" y2="-80" opacity="0.28" />
                <line x1="0" y1="0" x2="-70" y2="10" opacity="0.28" />
                <line x1="0" y1="0" x2="-10" y2="60" opacity="0.28" />
                <line x1="0" y1="0" x2="50" y2="40" opacity="0.28" />
                <line x1="0" y1="0" x2="-30" y2="90" opacity="0.28" />
                <line x1="0" y1="0" x2="60" y2="-30" opacity="0.28" />
                <text
                  x="-70"
                  y="-100"
                  className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  stroke="none"
                >
                  Informational
                </text>
              </g>

              <g transform="translate(760, 180)" stroke="currentColor" fill="none">
                <circle r="4" fill="currentColor" stroke="none" />
                <circle cx="-30" cy="-70" r="3.5" className="fill-background" />
                <circle cx="40" cy="-60" r="3.5" className="fill-background" />
                <circle cx="60" cy="20" r="3.5" className="fill-background" />
                <circle cx="-60" cy="30" r="3.5" className="fill-background" />
                <circle cx="20" cy="80" r="3.5" className="fill-background" />
                <circle cx="-40" cy="90" r="3.5" className="fill-background" />
                <circle cx="70" cy="-20" r="3.5" className="fill-background" />
                <line x1="0" y1="0" x2="-30" y2="-70" opacity="0.7" />
                <line x1="-30" y1="-70" x2="40" y2="-60" opacity="0.7" />
                <line x1="40" y1="-60" x2="70" y2="-20" opacity="0.7" />
                <line x1="70" y1="-20" x2="60" y2="20" opacity="0.7" />
                <line x1="60" y1="20" x2="20" y2="80" opacity="0.7" />
                <line x1="20" y1="80" x2="-40" y2="90" opacity="0.7" />
                <line x1="-40" y1="90" x2="-60" y2="30" opacity="0.7" />
                <line x1="-60" y1="30" x2="-30" y2="-70" opacity="0.7" />
                <line x1="0" y1="0" x2="60" y2="20" opacity="0.7" />
                <line x1="0" y1="0" x2="-60" y2="30" opacity="0.7" />
                <text
                  x="-35"
                  y="-100"
                  className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  stroke="none"
                >
                  Relational
                </text>
              </g>

              <g transform="translate(440, 180)" stroke="currentColor">
                <rect
                  x="-100"
                  y="-50"
                  width="200"
                  height="100"
                  rx="6"
                  className="fill-card stroke-border"
                  strokeWidth="1"
                />
                <text
                  x="-45"
                  y="-64"
                  className="fill-ink-soft text-[11px] font-medium uppercase tracking-eyebrow"
                  stroke="none"
                >
                  Movemental
                </text>
                <circle r="6" fill="currentColor" stroke="none" />
                <line x1="-220" y1="0" x2="-100" y2="0" opacity="0.7" fill="none" />
                <line x1="100" y1="0" x2="220" y2="0" opacity="0.7" fill="none" />
                <line x1="-60" y1="-20" x2="60" y2="-20" opacity="0.28" fill="none" />
                <line x1="-60" y1="20" x2="60" y2="20" opacity="0.28" fill="none" />
              </g>
            </svg>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.28}
            className="mt-[clamp(2rem,4vw,2.75rem)] max-w-[58ch] space-y-3 text-[1.08rem] leading-[1.65] text-muted-foreground"
          >
            <p>
              When these remain fragmented, the work cannot fully compound. It
              becomes harder to transmit, harder to steward, and harder for
              either humans or AI to use responsibly.
            </p>
            <p className="font-medium text-foreground">
              Movemental exists to make that intelligence coherent.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* SECTION 4 — BUILT FROM WITHIN ----------------------------------- */}
      <Section
        id="origin"
        variant="section"
        spacing="lg"
        aria-labelledby="origin-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Posture</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="origin-title"
              className="text-h2 max-w-[26ch] text-balance text-foreground"
            >
              Built from within the movement world, not imported into it.
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-[clamp(3rem,5vw,4rem)]">
            <RevealOnScroll
              delaySec={0.14}
              className="max-w-prose space-y-[1.1rem] text-[1.08rem] leading-[1.7] text-muted-foreground"
            >
              <p>
                Movemental did not begin as a generic software product
                searching for a market.
              </p>
              <p>
                It emerged from real questions inside the worlds of{" "}
                <strong className="font-medium text-foreground">
                  movement leadership, missional theology, church planting,
                  formation, organizational intelligence, and responsible AI
                  use.
                </strong>
              </p>
              <p>
                That matters because the product is shaped by the problem as it
                is actually lived: fragmented bodies of work, weak digital
                continuity, distributed relationships, and a growing need to
                use AI without surrendering voice, judgment, or mission.
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              delaySec={0.22}
              className="border-t border-border"
              aria-label="What this means in practice"
            >
              <h3 className="mt-5 mb-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                What that means in practice
              </h3>
              <ul>
                {[
                  "Built in conversation with real movement leaders and organizational practitioners.",
                  "Shaped by formation, not generic growth logic.",
                  "Designed for work that already exists in embodied form.",
                  "Built to support responsibility, not replace it.",
                ].map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-3.5 text-[1rem] leading-[1.45] text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* SECTION 5 — PRINCIPLES ------------------------------------------ */}
      <Section
        id="principles"
        variant="default"
        spacing="lg"
        aria-labelledby="principles-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Principles</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="principles-title"
              className="text-h2 max-w-[24ch] text-balance text-foreground"
            >
              What holds Movemental together.
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid border-t border-border sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <RevealOnScroll
                key={p.n}
                delaySec={0.08 + i * 0.08}
                className={cn(
                  "grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-border py-8",
                  "sm:pr-9",
                  "sm:odd:border-r sm:odd:border-border",
                  "sm:even:pl-9 sm:even:pr-0",
                  "sm:[&:nth-last-child(-n+2)]:border-b-0"
                )}
              >
                <span className="text-[0.78rem] font-medium tabular-nums tracking-eyebrow text-ink-soft">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.7rem)] font-medium leading-tight tracking-tight text-foreground">
                    {p.t}
                  </h3>
                  <p className="mt-2 max-w-[42ch] text-[1rem] leading-[1.55] text-muted-foreground">
                    {p.b}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 6 — IS AND IS NOT --------------------------------------- */}
      <Section
        id="how"
        variant="section"
        spacing="lg"
        aria-labelledby="contrast-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Clarifications</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="contrast-title"
              className="text-h2 max-w-[24ch] text-balance text-foreground"
            >
              What Movemental is — and is not.
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid border-t border-border sm:grid-cols-2">
            {CONTRASTS.map((c, i) => (
              <RevealOnScroll
                key={c.t}
                delaySec={0.08 + i * 0.08}
                className={cn(
                  "flex flex-col gap-1.5 border-b border-border py-8",
                  "sm:pr-9",
                  "sm:odd:border-r sm:odd:border-border",
                  "sm:even:pl-9 sm:even:pr-0",
                  "sm:[&:nth-last-child(-n+2)]:border-b-0"
                )}
              >
                <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  Not
                </span>
                <h3 className="font-serif text-[clamp(1.45rem,2.2vw,1.85rem)] font-normal italic leading-tight tracking-tight text-foreground">
                  {c.t}
                </h3>
                <p className="max-w-[44ch] text-[1rem] leading-[1.55] text-muted-foreground">
                  {c.b}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 7 — WHO IT SERVES --------------------------------------- */}
      <Section
        id="audiences"
        variant="default"
        spacing="lg"
        aria-labelledby="audiences-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container className="max-w-[740px]">
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Who we serve</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="audiences-title"
              className="text-h2 max-w-[24ch] text-balance text-foreground"
            >
              Who Movemental serves.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.14}
            className="mt-7 space-y-6"
          >
            <div>
              <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                Organizations &mdash; primary implementation audiences
              </p>
              <ul className="flex flex-wrap gap-2.5" aria-label="Implementation audiences">
                {IMPLEMENTATION_AUDIENCES.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="inline-flex items-center gap-2 rounded-pill border border-border bg-card px-4 py-2 text-[0.92rem] font-medium text-foreground transition-colors hover:border-foreground"
                    >
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-foreground/60"
                      />
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                Movement leaders &mdash; trusted-voice and ecosystem layer
              </p>
              <p className="max-w-[58ch] text-[0.98rem] leading-[1.6] text-muted-foreground">
                Movement leaders are not a fourth parallel segment. Their public bodies of work
                carry the kind of fragmented informational and relational intelligence the platform
                exists to serve, and their standing shapes what we build. See the{" "}
                <Link
                  href="/voices"
                  className="font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
                >
                  trusted voices shaping the work
                </Link>
                , the{" "}
                <Link
                  href="/who-is-a-movement-leader"
                  className="font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
                >
                  working definition
                </Link>
                , or the{" "}
                <Link
                  href="/movement-leaders"
                  className="font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
                >
                  practitioner fit page
                </Link>
                .
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.22}
            className="mt-8 max-w-[58ch] text-[1.08rem] leading-[1.65] text-muted-foreground"
          >
            <p>
              The three organization types differ, but they share one structural
              problem: they are responsible for forming people, stewarding
              meaning, and carrying real relational weight, yet often lack the
              system that brings their work together. Movemental exists to help
              that work become more coherent, durable, and usable &mdash; built
              with and within the movement-leadership ecosystem, not imported
              into it.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* SECTION 8 — WHY TRUST IT ---------------------------------------- */}
      <Section
        id="trust"
        variant="section"
        spacing="lg"
        aria-labelledby="trust-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Why trust it</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="trust-title"
              className="text-h2 max-w-[26ch] text-balance text-foreground"
            >
              Trust built from clarity, not hype.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.14}
            className="mt-6 max-w-[54ch] text-[clamp(1.15rem,1.9vw,1.35rem)] font-medium leading-snug tracking-tight text-foreground"
          >
            <p>
              The commitments behind Movemental are named openly, and the
              reasoning behind them is available to inspect in long-form.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid border-t border-border sm:grid-cols-2">
            {TRUST.map((t, i) => (
              <RevealOnScroll
                key={t.n}
                delaySec={0.08 + i * 0.08}
                className={cn(
                  "grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-border py-8",
                  "sm:pr-9",
                  "sm:odd:border-r sm:odd:border-border",
                  "sm:even:pl-9 sm:even:pr-0",
                  "sm:[&:nth-last-child(-n+2)]:border-b-0"
                )}
              >
                <span className="text-[0.78rem] font-medium tabular-nums tracking-eyebrow text-ink-soft">
                  {t.n}
                </span>
                <div>
                  <h3 className="text-[clamp(1.05rem,1.5vw,1.2rem)] font-medium leading-tight tracking-tight text-foreground">
                    {t.t}
                  </h3>
                  <p className="mt-2 max-w-[44ch] text-[0.98rem] leading-[1.55] text-muted-foreground">
                    {t.b}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll
            delaySec={0.4}
            className="mt-[clamp(2rem,4vw,2.5rem)] flex flex-wrap items-baseline gap-x-7 gap-y-2 border-t border-border pt-6 text-[0.95rem] text-muted-foreground"
          >
            <span>Inspect the reasoning:</span>
            <Link
              href="/fragmentation"
              className="border-b border-border pb-px font-medium text-foreground transition-colors hover:border-foreground"
            >
              Fragmentation story
            </Link>
            <Link
              href="/book"
              className="border-b border-border pb-px font-medium text-foreground transition-colors hover:border-foreground"
            >
              Book
            </Link>
            <Link
              href={SSSS_FIELD_GUIDE_PATH}
              className="border-b border-border pb-px font-medium text-foreground transition-colors hover:border-foreground"
            >
              AI Stewardship Sequence field guide
            </Link>
            <Link
              href="/faq"
              className="border-b border-border pb-px font-medium text-foreground transition-colors hover:border-foreground"
            >
              FAQ
            </Link>
            <Link
              href="/articles"
              className="border-b border-border pb-px font-medium text-foreground transition-colors hover:border-foreground"
            >
              Articles
            </Link>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* SECTION 9 — WHO IS BUILDING THIS -------------------------------- */}
      <Section
        id="team"
        variant="default"
        spacing="lg"
        aria-labelledby="team-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Who is building this</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="team-title"
              className="text-h2 max-w-[24ch] text-balance text-foreground"
            >
              Who is building this.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.14}
            className="mt-6 max-w-[54ch] text-[1.08rem] leading-[1.65] text-muted-foreground"
          >
            <p>
              Movemental is being built by people working at the intersection
              of platform infrastructure, formation, movement leadership, and
              strategic partnership.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-[clamp(2rem,3vw,2.25rem)] sm:grid-cols-3">
            {TEAM.map((person, i) => (
              <RevealOnScroll
                key={person.name}
                delaySec={0.1 + i * 0.08}
                className="flex flex-col gap-4"
              >
                <article className="flex flex-col gap-4">
                  <figure
                    aria-hidden
                    className="relative flex aspect-[4/5] items-end overflow-hidden rounded-md border border-border-soft bg-section p-5"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(120% 70% at 80% 0%, rgba(25, 21, 15, 0.08) 0%, rgba(25, 21, 15, 0) 60%)",
                      }}
                    />
                    <span className="relative font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal italic leading-none tracking-tight text-foreground">
                      {person.initials}
                    </span>
                  </figure>
                  <div>
                    <p className="text-[1.08rem] font-medium text-foreground">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-[0.82rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      {person.role}
                    </p>
                    <p className="mt-3 text-[0.98rem] leading-[1.55] text-muted-foreground">
                      {person.bio}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll
            delaySec={0.36}
            className="mt-[clamp(2rem,4vw,2.5rem)] text-[0.95rem] text-muted-foreground"
          >
            <Link
              href="/team"
              className="border-b border-border pb-px font-medium text-foreground transition-colors hover:border-foreground"
            >
              See full team &rarr;
            </Link>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* SECTION 10 — CLOSING MIDNIGHT CTA ------------------------------- */}
      <Section
        id="closing"
        variant="midnight"
        spacing="lg"
        aria-labelledby="closing-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container className="max-w-[740px]">
          <RevealOnScroll>
            <Eyebrow withDot inverse className="mb-5">Begin</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08}>
            <h2
              id="closing-title"
              className="text-h1 max-w-[22ch] text-balance text-inverse-foreground"
            >
              If the work matters, the <em>infrastructure</em> matters
              too.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.16}
            className="mt-6 max-w-[52ch] text-[1.1rem] leading-[1.6] text-inverse-foreground/70"
          >
            <p>
              Movemental exists to help serious work become more coherent,
              credible, and sustainable online.
            </p>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.24}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="arrow ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10 hover:text-inverse-foreground"
            >
              <Link href="/fragmentation">Explore the fragmentation story</Link>
            </Button>
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
