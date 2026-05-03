import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Library,
  MessageSquareText,
  Network,
  Route,
} from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { LogoStrip } from "@/components/primitives/logo-strip";
import { Button } from "@/components/ui/button";
import { listArticles } from "@/lib/articles";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";
import { cn } from "@/lib/utils";

const SAMPLER_SLUGS = [
  "two-intelligences-integration",
  "the-movemental-thesis",
  "ai-collapses-the-cost-of-integration",
] as const;

const FOUNDATION_NODES = [
  {
    tag: "Library",
    body: "Your knowledge, frameworks, documents, and media — gathered into one coherent, queryable whole.",
    Icon: Library,
  },
  {
    tag: "Graph",
    body: "The people, relationships, and trust the mission actually moves through — made legible to the whole organization.",
    Icon: Network,
  },
  {
    tag: "Voice",
    body: "A canonical articulation of how the work sounds — so extensions of it still sound like the work.",
    Icon: MessageSquareText,
  },
  {
    tag: "Pathways",
    body: "The routes by which people move through what's integrated — so formation becomes architectural, not accidental.",
    Icon: Route,
  },
] as const;

type CoFounder = {
  name: string;
  role: string;
  initials: string;
  portrait: string | null;
  body: string;
};

const CO_FOUNDERS: readonly CoFounder[] = [
  {
    name: "Alan Hirsch",
    role: "Co-founder",
    initials: "AH",
    portrait: "/headshots/alan-hirsch.webp",
    body:
      "Author of The Forgotten Ways and co-founder of Forge, 100 Movements, and Movement Leaders Collective. The missional movement work the field has relied on for thirty years.",
  },
  {
    name: "Brad Brisco",
    role: "Co-founder",
    initials: "BB",
    portrait: "/headshots/brad-brisco.webp",
    body:
      "Director of Bi-Vocational Church Planting at the North American Mission Board. Author of Missional Essentials and Next Door as It Is In Heaven. Missional practice inside institutions.",
  },
  {
    name: "Josh Shepherd",
    role: "Co-founder",
    initials: "JS",
    portrait: "/headshots/joshua-shepherd.webp",
    body:
      "Founder and operator. A decade building content, community, and infrastructure for movement leaders. The platform came out of that work.",
  },
] as const;

const PATH_STEPS = [
  {
    n: "01",
    t: "Safety",
    b: "Set the governance, convictions, and boundaries before experimentation outruns judgment — so speed never becomes drift.",
    href: "/articles/safety-before-speed",
  },
  {
    n: "02",
    t: "Sandbox",
    b: "Create a bounded space for real experimentation and honest learning before any capability reaches the whole organization.",
    href: "/articles/sandbox-discovery",
  },
  {
    n: "03",
    t: "Skills",
    b: "Build the human capacity to discern, supervise, and lead with these tools — not just use them.",
    href: "/articles/the-skill-of-ai",
  },
  {
    n: "04",
    t: "Solutions",
    b: "Deploy workflows, agents, and systems only after the foundation can actually hold them.",
    href: "/articles/solutions-deployment",
  },
] as const;

const AUTHORITY_STATEMENTS = [
  {
    n: "01",
    t: "Leadership and formation, not tools.",
    body: "AI pressures judgment, voice, trust, and organizational coherence. Those are leadership problems — and they precede any tool choice. Our work begins where the leadership work begins.",
  },
  {
    n: "02",
    t: "Shaped inside real organizational questions.",
    body: "Movemental was built alongside real movement, church, nonprofit, and institutional work — not imported from generic software logic. The product reflects what the work asked for.",
  },
  {
    n: "03",
    t: "Conditions before capabilities.",
    body: "Before tools, workflows, and agents can be trustworthy, the foundation has to hold. That is where we begin — and why downstream deployments last.",
  },
] as const;

const AUDIENCE_HUBS = [
  {
    tag: "Nonprofits",
    title: "For nonprofits",
    body: "Donor letters, impact reports, and program frameworks scattered across drives — and donor histories, partner dynamics, and staff memory held in individual heads. Integrate both, and the story the world hears still sounds like yours.",
    href: "/nonprofits",
  },
  {
    tag: "Churches",
    title: "For churches",
    body: "Teaching archives, pastoral care notes, and discipleship pathways in five tools — and relational memory of who is in what season living only in the staff that happens to still be there. Integrate both, and formation becomes architectural.",
    href: "/churches",
  },
  {
    tag: "Institutions",
    title: "For institutions",
    body: "Curriculum, faculty knowledge, and accreditation artifacts across decades of systems — and alumni, donor, and partner relationships no single department sees whole. Integrate both, and the institution remembers itself.",
    href: "/institutions",
  },
] as const;

const INTELLIGENCES = [
  {
    tag: "Informational",
    title: "Informational intelligence",
    body: (
      <>
        The <em>content</em> side of the organization &mdash; frameworks,
        documents, teaching, pathways, donor letters, pastoral care notes,
        faculty knowledge, institutional memory. Scattered, it cannot compound
        or form people. Integrated, it becomes something an organization
        &mdash; and eventually its models &mdash; can actually stand on.
      </>
    ),
  },
  {
    tag: "Relational",
    title: "Relational intelligence",
    body: (
      <>
        The <em>people</em> side of the organization &mdash; trust, authority,
        communication, leadership, and the graph of real relationships that
        carries a mission forward. AI cannot replace this layer; it can only
        be useful when the relational layer is coherent enough to supervise
        it.
      </>
    ),
  },
] as const;

const NOT_THIS = [
  "Not a content refresh. The ache is not that you need a better deck.",
  "Not a new platform. The ache is not that you need another tool.",
  "Not AI adoption. AI made the fragmentation tax visible; it is not the work itself.",
  "Not a shortcut around leadership. Integration surfaces the decisions you have been avoiding.",
] as const;

const PRODUCES = [
  "An integrated library of your core knowledge, frameworks, and media.",
  "A legible relational graph of the people and networks the work actually moves through.",
  "A recoverable voice — a canonical articulation of how your work sounds.",
  "Pathways that form people, not just inform them.",
] as const;

const ERRORS = [
  {
    n: "01",
    t: "To head recklessly down a potentially unsafe path.",
  },
  {
    n: "02",
    t: "To stand still in an already unsafe place.",
  },
] as const;

/**
 * Homepage — parity with `docs/html/homepage-concept-modern-v2/`.
 * Global `SiteNav` + `SiteFooter` remain layout chrome; this composes `main`
 * only.
 */
export function HomeConceptModernPageContent() {
  const allArticles = listArticles();
  const samplerArticles = SAMPLER_SLUGS
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => a != null);

  return (
    <div data-editorial="concept-modern" className="text-pretty">
      {/* HERO ------------------------------------------------------------- */}
      <Section
        id="top"
        variant="default"
        spacing="lg"
        aria-labelledby="hero-title"
        className="relative scroll-mt-(--site-chrome-total) pt-6 md:pt-10"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5 max-w-[58ch]">
              For organizations navigating AI with people, formation, and
              mission at stake
            </Eyebrow>
          </RevealOnScroll>

          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-[clamp(3rem,6vw,5.25rem)]">
            <div>
              <RevealOnScroll delaySec={0.05}>
                <h1
                  id="hero-title"
                  className="max-w-[18ch] text-balance text-[clamp(2.6rem,6.2vw,5rem)] font-medium leading-[1.02] tracking-display text-foreground"
                >
                  There is a <em>wiser</em> way to navigate AI.
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.12} className="mt-6 sm:mt-8">
                <p className="max-w-[54ch] text-pretty text-[clamp(1.15rem,1.7vw,1.3rem)] leading-normal tracking-tight text-muted-foreground">
                  Between fearful avoidance and reckless adoption is a
                  narrower, wiser path. We help mission-driven organizations
                  walk it with clarity, judgment, and integrity.
                </p>
              </RevealOnScroll>
              <RevealOnScroll
                delaySec={0.18}
                className="mt-8 flex flex-wrap gap-3 sm:mt-10"
              >
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start with clarity
                    <ArrowRight className="arrow ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="#path">See the framework</Link>
                </Button>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delaySec={0.24}>
              <aside
                className="max-w-[36ch] border-l-2 border-foreground pl-5 text-[1.02rem] leading-relaxed text-muted-foreground"
                aria-label="A note to leadership"
              >
                <Eyebrow withDot className="mb-3">
                  A note to leadership
                </Eyebrow>
                <div className="space-y-2">
                  <p>You&rsquo;re not being asked to master AI.</p>
                  <p>
                    You&rsquo;re being asked to lead faithfully on a new
                    frontier.
                  </p>
                  <p>That requires a different path.</p>
                </div>
              </aside>
            </RevealOnScroll>
          </div>
        </Container>

        {/* Hairline gradient rule at hero bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-(--container-max) px-[clamp(1.25rem,4vw,2.5rem)]"
        >
          <div className="h-px w-full bg-[linear-gradient(90deg,transparent_0%,var(--border)_18%,var(--border)_82%,transparent_100%)]" />
        </div>
      </Section>

      {/* TWO EQUAL ERRORS ------------------------------------------------- */}
      <Section
        variant="section"
        spacing="sm"
        aria-label="The two equal errors"
      >
        <Container width="narrow">
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Orientation</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <p className="max-w-[22ch] text-balance text-[clamp(1.9rem,4vw,3.1rem)] font-medium leading-[1.12] tracking-display text-foreground">
              When it comes to AI, there are{" "}
              <em data-emphasis="serif">two equal errors.</em>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.12} className="mt-[clamp(1.25rem,2.2vw,1.75rem)]">
            <ol className="grid list-none border-t border-border p-0 sm:grid-cols-2 sm:divide-x sm:divide-border">
              {ERRORS.map((err) => (
                <li
                  key={err.n}
                  className="flex flex-col gap-2 border-b border-border px-0 py-5 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-snug text-muted-foreground sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                >
                  <span className="text-xs font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                    {err.n}
                  </span>
                  <span className="tracking-tight text-foreground">
                    {err.t}
                  </span>
                </li>
              ))}
            </ol>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.2}
            className="mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[58ch] text-[1.02rem] leading-relaxed text-muted-foreground"
          >
            <p>
              Most organizations oscillate between these without realizing that{" "}
              <span className="font-medium text-foreground">
                both fail the same way
              </span>{" "}
              &mdash; they treat AI as a tool problem when it is, structurally,
              a problem of{" "}
              <span className="font-medium text-foreground">integration</span>:
              the informational and relational intelligence an organization
              runs on has never been brought together into a coherent
              foundation.
            </p>
            <Link
              href="#path"
              className="group mt-4 inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              See the path
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* STAKES ----------------------------------------------------------- */}
      <Section
        id="stakes"
        variant="default"
        spacing="lg"
        aria-labelledby="stakes-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">What&rsquo;s at stake</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <h2
              id="stakes-title"
              className="max-w-[26ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-display text-foreground"
            >
              Can your organization&rsquo;s mission, voice, and{" "}
              <em>integrity</em> survive contact with AI?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.12}
            className="mt-[clamp(2.25rem,4vw,3rem)] grid gap-8 border-t border-border pt-[clamp(2rem,3.5vw,2.75rem)] md:grid-cols-3 md:gap-10"
          >
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                Move too fast.
              </h3>
              <p className="text-[1.05rem] leading-normal text-muted-foreground">
                You risk losing integrity.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                Move too slow.
              </h3>
              <p className="text-[1.05rem] leading-normal text-muted-foreground">
                You risk losing impact.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.75rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                The real challenge.
              </h3>
              <p className="text-[1.05rem] leading-normal text-muted-foreground">
                It is not choosing speed or caution. It is learning to move
                with integrity.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.2}
            className="mt-[clamp(2rem,3.5vw,2.75rem)] max-w-[58ch] leading-relaxed"
          >
            <p className="text-[1.08rem] font-medium text-foreground">
              This is not primarily a tool problem.
            </p>
            <p className="mt-2 text-[1.05rem] text-muted-foreground">
              It is a problem of judgment, responsibility, and organizational
              coherence &mdash; and it is answered by building the foundation
              before deploying the tools.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* THE PATH FORWARD ------------------------------------------------- */}
      <Section
        id="path"
        variant="section"
        spacing="lg"
        aria-labelledby="path-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
            <div>
              <RevealOnScroll>
                <Eyebrow withDot className="mb-5">Process</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.05}>
                <h2
                  id="path-title"
                  className="max-w-[26ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-display text-foreground"
                >
                  The path forward
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.1}>
              <p className="max-w-[54ch] text-[1.08rem] leading-relaxed text-muted-foreground">
                <strong className="font-medium text-foreground">
                  Safety is the first step &mdash; but not the end.
                </strong>{" "}
                From there, organizations build the{" "}
                <span className="font-medium text-foreground">foundation</span>{" "}
                underneath AI: an integrated library, a legible relational
                graph, a coherent voice, and pathways that actually form
                people.
              </p>
            </RevealOnScroll>
          </div>

          <ol className="mt-[clamp(2.5rem,5vw,3.5rem)] grid list-none border-t border-border p-0 sm:grid-cols-2 lg:grid-cols-4">
            {PATH_STEPS.map((step, i) => (
              <li
                key={step.n}
                className={cn(
                  "relative flex flex-col gap-3.5 border-b border-border py-[clamp(1.75rem,3vw,2.25rem)] pr-0",
                  "sm:border-r sm:pr-[clamp(1.25rem,2vw,1.75rem)]",
                  "sm:nth-[2n]:border-r-0 sm:nth-[2n]:pr-0",
                  "lg:border-b-0 lg:border-r lg:pr-[clamp(1.25rem,2vw,1.75rem)]",
                  "lg:nth-[2n]:border-r lg:nth-[2n]:pr-[clamp(1.25rem,2vw,1.75rem)]",
                  "lg:nth-[4n]:border-r-0 lg:nth-[4n]:pr-0"
                )}
              >
                {/* Step dot marker on top rail */}
                <span
                  aria-hidden
                  className="absolute -top-[3px] left-0 size-1.5 rounded-full bg-foreground"
                />
                <RevealOnScroll delaySec={0.08 + i * 0.08}>
                  <div className="flex flex-col gap-3.5">
                    <span className="text-xs font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                      {step.n}
                    </span>
                    <h3 className="font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                      {step.t}
                    </h3>
                    <p className="text-[0.98rem] leading-normal text-muted-foreground">
                      {step.b}
                    </p>
                    <Link
                      href={step.href}
                      className="group mt-1 inline-flex items-center gap-1.5 self-start border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
                    >
                      Learn more
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </RevealOnScroll>
              </li>
            ))}
          </ol>

          <RevealOnScroll
            delaySec={0.4}
            className="mt-[clamp(2rem,3.5vw,2.5rem)] max-w-[58ch] border-t border-border pt-[clamp(1.5rem,2.5vw,2rem)]"
          >
            <p className="text-balance text-[clamp(1.2rem,2.2vw,1.45rem)] font-medium leading-snug tracking-tight text-foreground">
              Most organizations try to begin with solutions.
            </p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
              That is why the results do not hold. Movemental begins earlier
              &mdash; with the safety, the sandbox, and the skills that make
              every later solution actually work.
            </p>
            <Link
              href="/book/read/the-six-stages-at-a-glance"
              className="group mt-4 inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              The book is specific about this
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.48}
            className="mt-[clamp(1.75rem,3vw,2.25rem)] max-w-[58ch]"
          >
            <p className="text-[1.05rem] leading-relaxed text-muted-foreground">
              The{" "}
              <span className="font-medium text-foreground">
                AI Stewardship Sequence — Safety, Sandbox, Skills, Solutions
              </span>{" "}
              is how an organization safely{" "}
              <span className="font-medium text-foreground">enters</span> AI.
              What comes after safe entry is a longer trajectory &mdash;{" "}
              <span className="font-medium text-foreground">
                Fragmentation, Integration, Activation, Formation,
                Multiplication, Movement
              </span>{" "}
              &mdash; the six stages by which an organization becomes a field
              rather than a franchise. The sequence is the on-ramp. The
              trajectory is the road.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/fragmentation"
                className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                Walk the six stages
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href={BOOK_HUB_PATH}
                className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                Read the book
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href={SSSS_FIELD_GUIDE_PATH}
                className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                AI Stewardship Sequence field guide
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* WHAT MUST COME TOGETHER — two intelligences ---------------------- */}
      <Section
        id="unfold"
        variant="default"
        spacing="lg"
        aria-labelledby="unfold-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Two intelligences</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <h2
              id="unfold-title"
              className="max-w-[26ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-display text-foreground"
            >
              What must come together
            </h2>
          </RevealOnScroll>

          <div className="mt-[clamp(2rem,4vw,2.75rem)] grid gap-5 md:grid-cols-2 md:gap-6">
            {INTELLIGENCES.map((layer, i) => (
              <RevealOnScroll key={layer.tag} delaySec={0.1 + i * 0.08}>
                <article className="flex h-full flex-col gap-5 rounded-card bg-card p-[clamp(1.75rem,3vw,2.4rem)]">
                  <header className="flex flex-col gap-3">
                    <span className="text-[0.78rem] font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                      {layer.tag}
                    </span>
                    <h3 className="font-serif text-[clamp(1.45rem,2.3vw,1.8rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                      {layer.title}
                    </h3>
                  </header>
                  <p className="max-w-[44ch] text-[1.02rem] leading-[1.7] text-muted-foreground">
                    {layer.body}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll
            delaySec={0.3}
            className="mt-[clamp(2rem,3.5vw,2.75rem)] max-w-[58ch]"
          >
            <p className="text-balance text-[1.08rem] font-medium leading-relaxed text-foreground">
              AI becomes genuinely useful only when both are coherent enough
              to support responsible action.
            </p>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                Ungrounded AI produces fluent approximation
              </span>{" "}
              on top of organizational scatter &mdash; confident text that
              sounds like you and isn&rsquo;t.{" "}
              <span className="font-medium text-foreground">Grounded AI</span>{" "}
              &mdash; retrieval over an integrated informational corpus routed
              through a legible relational graph &mdash; produces faithful
              extension of the work. The difference is the foundation
              underneath.
            </p>
            <Link
              href="/book/read/two-intelligences"
              className="group mt-4 inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Read Chapter 2 &mdash; Two intelligences
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* RECENT WRITING — content sampler -------------------------------- */}
      {samplerArticles.length > 0 && (
        <Section
          id="writing"
          variant="default"
          spacing="lg"
          aria-labelledby="writing-title"
          className="scroll-mt-(--site-chrome-total)"
        >
          <Container>
            <div className="grid gap-3 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end md:gap-12">
              <div>
                <RevealOnScroll>
                  <Eyebrow withDot className="mb-5">Recent writing</Eyebrow>
                </RevealOnScroll>
                <RevealOnScroll delaySec={0.05}>
                  <h2
                    id="writing-title"
                    className="max-w-[26ch] text-balance text-[clamp(1.65rem,3.2vw,2.35rem)] font-medium leading-tight tracking-display text-foreground"
                  >
                    Three pieces for the reader who wants to go deeper.
                  </h2>
                </RevealOnScroll>
              </div>
            </div>

            <div className="mt-[clamp(2rem,4vw,2.75rem)] grid gap-4 md:grid-cols-3 md:gap-5">
              {samplerArticles.map((article, i) => (
                <RevealOnScroll key={article.slug} delaySec={0.1 + i * 0.08}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group relative flex h-full flex-col gap-3 rounded-card bg-card p-[clamp(1.5rem,2.6vw,2rem)] transition-transform duration-250 ease-out hover:-translate-y-0.5"
                  >
                    <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      {article.eyebrow}
                    </span>
                    <h3 className="font-serif text-[clamp(1.25rem,2vw,1.55rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                      {article.title}
                    </h3>
                    <p className="flex-1 text-[0.98rem] leading-normal text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 self-start border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors group-hover:border-foreground">
                      Read &mdash; {article.readTime}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll
              delaySec={0.34}
              className="mt-[clamp(2rem,3.5vw,2.5rem)]"
            >
              <Link
                href="/articles"
                className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                All writing
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </RevealOnScroll>
          </Container>
        </Section>
      )}

      {/* WHERE THIS LANDS — elevated audience cards ----------------------- */}
      <Section
        id="audiences"
        variant="section"
        spacing="lg"
        aria-labelledby="audiences-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <div className="grid gap-3 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:items-end md:gap-12">
            <RevealOnScroll>
              <h2
                id="audiences-title"
                className="max-w-[28ch] text-balance text-[clamp(1.65rem,3.2vw,2.35rem)] font-medium leading-tight tracking-display text-foreground"
              >
                Where this lands
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.06}>
              <p className="max-w-[54ch] text-[1.05rem] leading-relaxed text-muted-foreground">
                The same path applies across contexts.{" "}
                <span className="font-medium text-foreground">
                  What changes is where fragmentation appears and what must be
                  integrated first.
                </span>
              </p>
            </RevealOnScroll>
          </div>

          <div className="mt-[clamp(2rem,4vw,2.75rem)] grid gap-4 md:grid-cols-3 md:gap-5">
            {AUDIENCE_HUBS.map((hub, i) => (
              <RevealOnScroll key={hub.href} delaySec={0.1 + i * 0.08}>
                <Link
                  href={hub.href}
                  className="group relative flex h-full flex-col gap-3 rounded-card bg-card p-[clamp(1.5rem,2.6vw,2rem)] transition-transform duration-250 ease-out hover:-translate-y-0.5"
                >
                  <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                    {hub.tag}
                  </span>
                  <h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.65rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                    {hub.title}
                  </h3>
                  <p className="flex-1 text-[0.98rem] leading-normal text-muted-foreground">
                    {hub.body}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 self-start border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors group-hover:border-foreground">
                    Go deeper
                    <ArrowRight
                      className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* FOUNDATION — scroll-stop system map ---------------------------- */}
      <Section
        id="foundation"
        variant="default"
        spacing="lg"
        aria-labelledby="foundation-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">The foundation</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <h2
              id="foundation-title"
              className="max-w-[26ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-display text-foreground"
            >
              What integration actually produces, underneath the path.
            </h2>
          </RevealOnScroll>

          <div
            className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-px overflow-hidden rounded-card bg-border sm:grid-cols-2 lg:grid-cols-4"
            aria-label="The four integration outputs"
          >
            {FOUNDATION_NODES.map((node, i) => (
              <RevealOnScroll key={node.tag} delaySec={0.1 + i * 0.12}>
                <div className="flex h-full flex-col gap-4 bg-card p-[clamp(1.5rem,2.8vw,2.2rem)]">
                  <node.Icon
                    className="size-7 shrink-0 text-foreground"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.65rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                      {node.tag}
                    </h3>
                    <p className="text-[0.98rem] leading-normal text-muted-foreground">
                      {node.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll
            delaySec={0.58}
            className="mt-[clamp(2rem,3.5vw,2.5rem)]"
          >
            <Link
              href="/book/read/the-library-the-pathways-the-voice"
              className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Read Chapter 11 &mdash; The library, the pathways, the voice
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* ABOUT — co-founders + origin + authority statements ------------- */}
      <Section
        id="about"
        variant="default"
        spacing="lg"
        aria-labelledby="authority-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container>
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">About</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <h2
              id="authority-title"
              className="max-w-[28ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-display text-foreground"
            >
              We work at the intersection of leadership, formation, technology,
              and <em>mission</em>.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.1}
            className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[54ch] text-balance text-[clamp(1.15rem,2vw,1.35rem)] font-medium leading-snug tracking-tight text-foreground"
          >
            We do not begin with AI tools. We begin with the foundation layer
            &mdash; the integrated library, graph, voice, and pathways
            underneath AI &mdash; because nothing downstream holds without it.
          </RevealOnScroll>

          <div className="mt-[clamp(2.25rem,4vw,3rem)] grid gap-4 md:grid-cols-3 md:gap-5">
            {CO_FOUNDERS.map((founder, i) => (
              <RevealOnScroll key={founder.name} delaySec={0.15 + i * 0.08}>
                <article className="flex h-full flex-col gap-4 rounded-card bg-card p-[clamp(1.5rem,2.6vw,2rem)]">
                  <header className="flex items-center gap-4">
                    {founder.portrait ? (
                      <Image
                        src={founder.portrait}
                        alt={founder.name}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex size-16 shrink-0 items-center justify-center rounded-full bg-section text-base font-medium text-foreground"
                      >
                        {founder.initials}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h3 className="font-serif text-[1.25rem] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                        {founder.name}
                      </h3>
                      <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                        {founder.role}
                      </p>
                    </div>
                  </header>
                  <p className="text-[0.98rem] leading-normal text-muted-foreground">
                    {founder.body}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll
            delaySec={0.42}
            className="mt-[clamp(2rem,3.5vw,2.75rem)] max-w-[64ch] text-[1.05rem] leading-relaxed text-muted-foreground"
          >
            <p>
              Movemental came together around a shared recognition. The arrival
              of AI was about to make something visible that had always been
              there: the informational and relational fragmentation underneath
              mission-driven organizations. For Alan, that fragmentation had
              been the quiet cost inside the movement question for thirty
              years. For Brad, it was the invisible tax inside the institutions
              he serves. For Josh, it was the problem every leader he had tried
              to help compounding their work had hit. The three of us stopped
              working around it separately and started building the foundation
              layer together.
            </p>
          </RevealOnScroll>

          <ol className="mt-[clamp(2rem,4vw,2.75rem)] grid list-none border-t border-border p-0 min-[900px]:grid-cols-3">
            {AUTHORITY_STATEMENTS.map((row, i) => (
              <li
                key={row.n}
                className={cn(
                  "flex flex-col gap-3.5 border-b border-border py-[clamp(1.75rem,3vw,2.25rem)]",
                  "min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:py-[clamp(1.75rem,3vw,2.25rem)]",
                  i === 0
                    ? "min-[900px]:pl-0 min-[900px]:pr-[clamp(1.5rem,2.5vw,2rem)]"
                    : "min-[900px]:px-[clamp(1.5rem,2.5vw,2rem)]",
                  i === 2 && "min-[900px]:border-r-0 min-[900px]:pr-0"
                )}
              >
                <RevealOnScroll delaySec={0.14 + i * 0.08}>
                  <span className="text-xs font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
                    {row.n}
                  </span>
                  <p className="mt-3 text-balance font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] font-normal italic leading-snug tracking-[-0.005em] text-foreground">
                    {row.t}
                  </p>
                  <p className="mt-3 max-w-[38ch] text-[0.98rem] leading-normal text-muted-foreground">
                    {row.body}
                  </p>
                </RevealOnScroll>
              </li>
            ))}
          </ol>

        </Container>
      </Section>

      {/* GROUNDING — what this is not / what this produces ---------------- */}
      <Section
        id="grounding"
        variant="section"
        spacing="lg"
        aria-labelledby="grounding-title"
        className="scroll-mt-(--site-chrome-total)"
      >
        <Container width="narrow">
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Grounding</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <h2
              id="grounding-title"
              className="max-w-[26ch] text-balance text-[clamp(1.9rem,3.8vw,2.8rem)] font-medium leading-[1.08] tracking-display text-foreground"
            >
              What this is &mdash; and what it is not.
            </h2>
          </RevealOnScroll>

          <div className="mt-[clamp(2rem,4vw,2.75rem)] grid gap-10 border-t border-border pt-[clamp(2rem,3.5vw,2.75rem)] md:grid-cols-2 md:gap-12 md:divide-x md:divide-border">
            <RevealOnScroll delaySec={0.1}>
              <div className="md:pr-10">
                <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  What this is not
                </p>
                <ul className="mt-5 flex flex-col gap-3 text-[1.02rem] leading-relaxed text-muted-foreground">
                  {NOT_THIS.map((line) => (
                    <li key={line} className="flex items-baseline gap-3">
                      <span
                        aria-hidden
                        className="mt-2 block size-1 shrink-0 rounded-full bg-muted-foreground/60"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.18}>
              <div className="md:pl-10">
                <p className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  What this produces
                </p>
                <ul className="mt-5 flex flex-col gap-3 text-[1.02rem] leading-relaxed text-foreground">
                  {PRODUCES.map((line) => (
                    <li key={line} className="flex items-baseline gap-3">
                      <span
                        aria-hidden
                        className="mt-2 block size-1 shrink-0 rounded-full bg-foreground"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            delaySec={0.26}
            className="mt-[clamp(1.75rem,3vw,2.25rem)] flex flex-wrap gap-x-5 gap-y-2"
          >
            <Link
              href={BOOK_HUB_PATH}
              className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Read the book
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href={SSSS_FIELD_GUIDE_PATH}
              className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              AI Stewardship Sequence field guide
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* PULL QUOTE — midnight authority band ----------------------------- */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-label="From the book"
      >
        <Container width="narrow">
          <RevealOnScroll>
            <figure className="flex flex-col gap-6">
              <blockquote className="max-w-[28ch] text-balance font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal italic leading-[1.1] tracking-[-0.01em] text-inverse-foreground">
                The map, read honestly, is not six mountains to climb one
                after the other. It is one landscape, seen from
                progressively closer in.
              </blockquote>
              <figcaption className="text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
                From the book &mdash; Chapter 5
              </figcaption>
            </figure>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* INVITATION — gradient band --------------------------------------- */}
      <Section
        id="invitation"
        variant="default"
        spacing="lg"
        aria-labelledby="invitation-title"
        className="scroll-mt-(--site-chrome-total) py-[clamp(5.5rem,11vw,9rem)]"
        style={{
          background:
            "linear-gradient(180deg, var(--background) 0%, var(--section) 55%, var(--background) 100%)",
        }}
      >
        <Container width="narrow">
          <RevealOnScroll>
            <Eyebrow withDot className="mb-5">Begin</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.05}>
            <h2
              id="invitation-title"
              className="max-w-[24ch] text-balance text-[clamp(2.4rem,5.2vw,4rem)] font-medium leading-[1.05] tracking-display text-foreground"
            >
              Start{" "}
              <span className="font-medium text-foreground">
                before the cost of confusion compounds.
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.12}
            className="mt-[clamp(1.75rem,3vw,2.25rem)] grid max-w-[54ch] gap-3"
          >
            <p className="text-[1.15rem] leading-relaxed text-muted-foreground">
              Don&rsquo;t guess your way through AI. Begin with a path that can
              hold its shape in year three &mdash;{" "}
              <span className="font-medium text-foreground">
                a coherent voice, pathways that still form people, and
                judgment that still travels with the work
              </span>
              .
            </p>
            <p className="text-[1.02rem] leading-relaxed text-ink-soft">
              You don&rsquo;t have to figure this out alone. We&rsquo;ll help
              you begin &mdash; wisely.
            </p>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.18}
            className="mt-[clamp(2rem,3.5vw,2.5rem)]"
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Start with clarity
                <ArrowRight className="arrow ml-1 size-4" aria-hidden />
              </Link>
            </Button>
          </RevealOnScroll>

          <RevealOnScroll
            delaySec={0.24}
            className="mt-[clamp(2.25rem,4vw,3rem)] flex max-w-[44ch] flex-col gap-3 border-t border-border pt-[clamp(1.5rem,2.5vw,2rem)]"
          >
            <p className="text-xs font-medium uppercase tracking-eyebrow text-ink-soft">
              Or begin quieter
            </p>
            <p className="text-[1.02rem] leading-relaxed text-muted-foreground">
              One note per month on formation, infrastructure, and what we&rsquo;re
              learning.
            </p>
            <NewsletterForm source="home-invitation" />
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
