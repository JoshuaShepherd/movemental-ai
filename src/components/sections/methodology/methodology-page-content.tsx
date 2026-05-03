import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";

import { MethodologyExtendedSections } from "./methodology-extended-sections";

const links = [
  {
    title: "The fragmentation thesis",
    href: "/fragmentation",
    description: "Why informational and relational coherence matters for institutions that care about formation.",
  },
  {
    title: "Sandbox canon hub",
    href: "/articles/sandbox",
    description: "Nine curriculum pieces in reading order, grouped by sandbox layer, with links into each article.",
  },
  {
    title: "Sandbox Season offering",
    href: "/services/sandbox-season",
    description: "Twelve weeks, cohort shape, deliverables, and what is explicitly out of scope.",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Published zones and milestone-weighted structure for the Sandbox Season.",
  },
] as const;

export function MethodologyPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Methodology</Eyebrow>
            <Display size="lg" className="max-w-4xl text-balance">
              A map, not a substitute for the territory
            </Display>
            <Prose className="mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                This page orients you. The long-form articles are the territory. The Sandbox Season page is where the
                work becomes a contract. Move between them in whatever order matches how you decide.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            {links.map((item) => (
              <Reveal key={item.href}>
                <article className="flex h-full flex-col gap-3 rounded-2xl bg-card p-8 shadow-none">
                  <h2 className="font-serif text-[clamp(1.25rem,2vw,1.5rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-[0.95rem] leading-normal text-muted-foreground">{item.description}</p>
                  <div className="mt-auto pt-4">
                    <ArrowLink href={item.href}>Open</ArrowLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <MethodologyExtendedSections />

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-4">Visual catalog</Eyebrow>
              <Display size="sm" as="h2" className="text-balance">
                Eight patterns, built for sharing
              </Display>
              <Prose className="mx-auto mt-4">
                <p>
                  The scrollable catalog is the fastest way to brief a board or senior team without sending a
                  thirty-minute read. Pair it with the article when someone needs the full argument.
                </p>
              </Prose>
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <ArrowLink href="/methodology/eight-patterns">Open eight patterns</ArrowLink>
                <ArrowLink href="/articles/the-purpose-of-sandbox" tone="foreground">
                  Start with purpose of Sandbox
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
