import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Reveal, Section } from "@/components/primitives";
import { cn } from "@/lib/utils";

const FOUNDERS = [
  {
    name: "Brad Brisco",
    role: "Co-founder & CEO",
    bio: "Brad has led church planting at the North American Mission Board for over a decade and is one of the most respected voices in the missional church movement in North America. He has authored and co-authored multiple books on missional ecclesiology, including Missional Essentials and The Missional Quest. Brad's network of senior pastors, church planters, and denominational leaders is what makes Movemental's warm-distribution model possible.",
    link: { href: "https://www.namb.net", label: "Brad's work at NAMB" },
    image: { src: "/images/voices/brad-brisco.webp", alt: "Brad Brisco" },
  },
  {
    name: "Alan Hirsch",
    role: "Co-founder & Chief Missiologist",
    bio: "Alan is the founder of Forge Mission Training Network, 5Q, and Movement Leaders Collective. He is the author of more than a dozen books on missional church, including The Forgotten Ways, which is one of the most-cited works in missional ecclesiology of the past two decades. Alan's missiological depth shapes the theological foundation of Movemental's path: that human formation must precede technological deployment.",
    link: { href: "https://alanhirsch.org", label: "Alan's work at alanhirsch.org" },
    image: { src: "/images/voices/alan-hirsch.webp", alt: "Alan Hirsch" },
  },
  {
    name: "Joshua Shepherd",
    role: "Founder & CTO",
    bio: "Josh is the technical founder behind Movemental's platform. He spent six months building the AI-native infrastructure that lets a small team deliver sophisticated governance, formation, and deployment work at scale. Bilingual in English and Spanish, with a background in operations and system design, Josh leads engagement facilitation alongside Brad and Alan.",
    link: {
      href: "https://www.linkedin.com/in/joshuajshepherd/",
      label: "Connect with Josh on LinkedIn",
    },
    image: { src: "/images/voices/josh-shepherd.webp", alt: "Joshua Shepherd" },
  },
] as const;

const PATH_STAGES = [
  { number: "01", title: "Safety", body: "Policy, governance, and institutional baseline." },
  { number: "02", title: "Sandbox", body: "Secure experimentation environments." },
  { number: "03", title: "Skills", body: "Human formation and literacy." },
  { number: "04", title: "Solutions", body: "Strategic deployment of technology." },
] as const;

const COMMITMENTS = [
  { number: "01", title: "Formation before efficiency" },
  { number: "02", title: "Amplification, not replacement" },
  { number: "03", title: "Named refusals" },
] as const;

function FounderLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dim"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      <ArrowRight
        className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
        strokeWidth={1.5}
        aria-hidden
      />
    </Link>
  );
}

/**
 * About — production editorial page migrated from static HTML (Movemental About).
 * Composes site `(site)` layout chrome; uses semantic tokens and primitives only.
 */
export function AboutPageContent() {
  return (
    <div className="text-pretty">
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="about-hero-title"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container width="default" className="max-w-5xl">
          <Reveal>
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-inverse-muted">
              About Movemental
            </p>
            <h1
              id="about-hero-title"
              className="mb-12 max-w-4xl font-serif text-5xl font-medium leading-tight tracking-tight text-inverse-foreground md:text-6xl lg:text-7xl"
            >
              We built the path through AI that mission-driven organizations actually need.
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-inverse-muted md:text-2xl">
              Movemental is a company built by missional practitioners for missional organizations. We help
              churches, nonprofits, and institutions adopt AI safely, build real capability, and lead their
              people through the work — without losing trust, credibility, or identity.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg" aria-labelledby="about-founders-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The team behind Movemental
            </p>
            <h2
              id="about-founders-title"
              className="mb-20 max-w-2xl font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl"
            >
              Built by people who have spent their lives in this work.
            </h2>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              {FOUNDERS.map((founder) => (
                <article key={founder.name} className="flex flex-col">
                  <div className="relative mb-8 aspect-square w-full overflow-hidden bg-section">
                    <Image
                      src={founder.image.src}
                      alt={founder.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mb-4 font-serif text-2xl font-medium text-foreground">{founder.name}</h3>
                  <p className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    {founder.role}
                  </p>
                  <p className="mb-8 grow text-base leading-relaxed text-muted-foreground">{founder.bio}</p>
                  <FounderLink href={founder.link.href} label={founder.link.label} />
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" aria-labelledby="about-origin-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2
                  id="about-origin-title"
                  className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl lg:sticky lg:top-32"
                >
                  AI is already inside your organization. Most leaders don&apos;t have a path through it.
                </h2>
              </div>
              <div className="space-y-8 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
                <p>
                  In late 2025, Brad and Alan began hearing the same conversation everywhere they went. Senior
                  pastors, denominational executives, executive directors — all asking the same questions about AI
                  and getting the same vague answers.
                </p>
                <p>
                  The marketplace offered two unhelpful options. On one side, consumer tech companies selling
                  unbridled efficiency without moral reflection. On the other, theoretical academics issuing warnings
                  without practical frameworks for action.
                </p>
                <blockquote className="my-12 border-l border-border pl-6 font-serif text-3xl italic leading-tight text-foreground">
                  &ldquo;The path is what we built. The path is what we sell.&rdquo;
                </blockquote>
                <p>
                  Mission-driven organizations don&apos;t just need software. They need governance, theological
                  reflection, policy, and a phased approach to deployment that brings their people along. They need a
                  path.
                </p>
                <p>
                  Movemental was founded to build that path. We combined deep missiological insight with
                  enterprise-grade technical infrastructure to create a structured engagement model that actually works
                  for complex institutions.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg" aria-labelledby="about-path-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <h2
              id="about-path-title"
              className="mb-16 font-serif text-4xl font-medium tracking-tight text-foreground"
            >
              Four stages, in the order that makes them work.
            </h2>
            <div className="flex flex-col border-t border-border md:flex-row">
              {PATH_STAGES.map((stage, i) => (
                <div
                  key={stage.number}
                  className={cn(
                    "flex-1 border-b border-border py-8 md:border-b-0",
                    i === 0 && "md:pr-8 md:border-r md:border-border",
                    i > 0 && i < PATH_STAGES.length - 1 && "md:border-r md:border-border md:px-8",
                    i === PATH_STAGES.length - 1 && "md:pl-8"
                  )}
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    {stage.number}
                  </p>
                  <h3 className="mb-2 font-serif text-2xl font-medium text-foreground">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground">{stage.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link
                href="/pathway"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dim"
              >
                See the full path
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="midnight" spacing="lg" aria-labelledby="about-commitments-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-inverse-muted">
                  What we believe
                </p>
                <h2
                  id="about-commitments-title"
                  className="font-serif text-4xl font-medium leading-tight tracking-tight text-inverse-foreground md:text-5xl"
                >
                  Three commitments that shape every engagement.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {COMMITMENTS.map((c) => (
                  <div key={c.number} className="mb-8 border-t border-inverse-border pt-8">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-inverse-muted">{c.number}</p>
                    <h3 className="font-serif text-2xl font-medium text-inverse-foreground">{c.title}</h3>
                  </div>
                ))}
                <p className="border-l border-status-caution pl-6 font-serif text-xl italic leading-relaxed text-status-caution">
                  These are not slogans. They are the operational commitments that shape every line of code we ship and
                  every artifact we facilitate.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg" aria-labelledby="about-closing-title">
        <Container width="reading" className="max-w-3xl text-center">
          <Reveal>
            <h2
              id="about-closing-title"
              className="mb-8 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl"
            >
              If you&apos;ve read this far, the next step is a conversation.
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
              We don&apos;t pitch. We don&apos;t demo. We sit down with leaders to understand the specific contours of
              their context and determine if our path is the right mechanism for their mission.
            </p>
            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-dim"
              >
                Start a conversation
              </Link>
              <Link
                href="/field-guide"
                className="inline-flex items-center justify-center border border-border bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-eyebrow text-primary transition-colors hover:border-foreground/40"
              >
                Read the Field Guide first
              </Link>
            </div>
            <p className="font-serif italic text-muted-foreground">
              Or{" "}
              <Link
                href="/toolkit"
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                download the free Safety toolkit
              </Link>
              …
            </p>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
