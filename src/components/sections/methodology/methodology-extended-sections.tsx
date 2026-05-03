import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
  SurfaceCard,
} from "@/components/primitives";

const ssssStages = [
  {
    name: "Safety",
    blurb:
      "Named boundaries before speed: what data may be touched, what workflows are out of play, and who holds the veto when pressure arrives.",
    href: "/articles/safety-before-speed",
    canon: "Canon #14",
  },
  {
    name: "Sandbox",
    blurb:
      "Structured exploration on real work — small cohort, shared document, honest scoring — so judgment forms where anecdotes used to live.",
    href: "/articles/the-purpose-of-sandbox",
    canon: "Canon #15",
  },
  {
    name: "Skills",
    blurb:
      "Formation on the highest-risk use cases the portfolio surfaces. Training transfers technique; Skills deepens the person doing the deciding.",
    href: "/articles/skills-as-formation-not-training",
    canon: "Canon #16",
  },
  {
    name: "Solutions",
    blurb:
      "Production and procurement only after the organization knows what it is buying tools to do. Solutions is deployment against validated demand.",
    href: "/articles/why-solutions-come-last",
    canon: "Canon #17",
  },
] as const;

export function MethodologyExtendedSections() {
  return (
    <>
      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">The AI Stewardship Sequence</Eyebrow>
            <Display size="md" as="h2" className="max-w-3xl text-balance text-inverse-foreground">
              Safety, Sandbox, Skills, Solutions
            </Display>
            <Prose className="mt-6 max-w-2xl text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                The sequence is sequential in logic, not mandatory in contract. Many organizations will run Sandbox
                and carry the rest internally. The point is to see where you are, and what each stage is allowed to
                assume from the last.
              </p>
            </Prose>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ssssStages.map((stage) => (
              <Reveal key={stage.name}>
                <SurfaceCard tone="midnight" className="h-full gap-4">
                  <span className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
                    {stage.canon}
                  </span>
                  <h3 className="font-serif text-[clamp(1.2rem,2vw,1.45rem)] font-normal italic leading-tight tracking-[-0.005em]">
                    {stage.name}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-inverse-foreground/80">{stage.blurb}</p>
                  <div className="mt-auto pt-2">
                    <ArrowLink href={stage.href} className="text-inverse-foreground [&_svg]:text-inverse-foreground">
                      Read {stage.name.toLowerCase()}
                    </ArrowLink>
                  </div>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Inside Sandbox</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Three layers, eight patterns, four scores, one flag
              </Display>
              <Prose className="mt-4">
                <p>
                  The articles below are the territory. This section only names the load-bearing shapes so you know
                  which door to open.
                </p>
              </Prose>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <SurfaceCard tone="on-background" className="h-full gap-4">
                <h3 className="font-serif text-[clamp(1.15rem,2vw,1.35rem)] font-normal italic text-foreground">
                  Three layers of sandbox work
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  Pattern recognition, structured experiments, and honest scoring stack in order. Skip a layer and
                  the work still looks busy while formation quietly fails.
                </p>
                <ArrowLink href="/articles/sandbox/the-three-layers-of-sandbox-work">Open the piece</ArrowLink>
              </SurfaceCard>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="h-full gap-4">
                <h3 className="font-serif text-[clamp(1.15rem,2vw,1.35rem)] font-normal italic text-foreground">
                  Eight patterns where value hides
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  A quarterly scan through eight lenses on real work, producing named candidates instead of brainstormed
                  vapor. The visual catalog lives on its own page for sharing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <ArrowLink href="/methodology/eight-patterns">Open visual catalog</ArrowLink>
                  <ArrowLink href="/articles/sandbox/the-eight-patterns-where-value-hides" tone="foreground">
                    Read the article
                  </ArrowLink>
                </div>
              </SurfaceCard>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="h-full gap-4">
                <h3 className="font-serif text-[clamp(1.15rem,2vw,1.35rem)] font-normal italic text-foreground">
                  Four-dimension scoring
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  Time saved, quality moved, risk introduced, repeatability — scored honestly, with yellow as the default
                  for uncertainty. Green without a written reason is not allowed.
                </p>
                <ArrowLink href="/articles/sandbox/scoring-value-honestly">Open the piece</ArrowLink>
              </SurfaceCard>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="h-full gap-4">
                <h3 className="font-serif text-[clamp(1.15rem,2vw,1.35rem)] font-normal italic text-foreground">
                  Ethical and relational flag
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  The question scoring cannot answer: what might this do to formation, trust, or voice if it ships?
                  Personalization always passes through this gate first.
                </p>
                <ArrowLink href="/articles/sandbox/the-ethical-and-relational-flag">Open the piece</ArrowLink>
              </SurfaceCard>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <Reveal>
              <div>
                <Eyebrow className="mb-4">Season rhythm</Eyebrow>
                <Display size="md" as="h2" className="text-balance">
                  Twelve weeks on purpose
                </Display>
                <Prose className="mt-6">
                  <p>
                    Weekly ninety-minute working sessions with async work between them. Three experiment cycles across
                    twelve weeks so the eye develops between passes. Compression turns the sandbox into theater; spacing
                    is what makes reflection-in-action real.
                  </p>
                  <p>
                    The calendar on the Sandbox Season page is the same shape run with clients: orient, discover, test,
                    judge, assemble.
                  </p>
                </Prose>
                <div className="mt-6">
                  <ArrowLink href="/services/sandbox-season">See the twelve-week calendar</ArrowLink>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="gap-4">
                <h3 className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">Canon index</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  All nine sandbox markdown pieces are listed by layer and order on the hub page. Start anywhere you
                  have a live question; return to the hub when you need the map again.
                </p>
                <ArrowLink href="/articles/sandbox">Open sandbox canon hub</ArrowLink>
              </SurfaceCard>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
