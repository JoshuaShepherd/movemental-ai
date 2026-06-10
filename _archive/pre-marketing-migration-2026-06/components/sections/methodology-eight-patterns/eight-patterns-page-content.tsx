import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

import { eightPatterns, valueTypeLabels } from "./eight-patterns-data";

export function EightPatternsPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Sandbox · Pattern recognition</Eyebrow>
            <Display size="lg" className="max-w-4xl text-balance">
              The eight patterns <em>where value hides</em>
            </Display>
            <Prose className="mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                A catalog, not a menu. You scan real work through eight lenses once a quarter, write specific
                candidates, then filter before any experiment runs. The long argument lives in the canon article; this
                page is built for orientation and shareability.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg" className="overflow-hidden">
        <Container>
          <Eyebrow className="mb-6">Scroll the catalog</Eyebrow>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground md:hidden">
            Swipe horizontally to move through all eight patterns.
          </p>
        </Container>
        <div className="pb-2">
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[clamp(1.25rem,4vw,2.5rem)] pb-6 pt-1 [scrollbar-width:thin] md:grid md:max-w-(--container-max) md:snap-none md:grid-cols-2 md:gap-8 md:overflow-visible md:px-[clamp(1.25rem,4vw,2.5rem)] md:pb-0 lg:grid-cols-3 xl:grid-cols-4">
            {eightPatterns.map((p) => (
              <article
                key={p.num}
                className={`w-[min(88vw,20rem)] shrink-0 snap-center md:w-auto ${
                  p.flagged ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background md:ring-offset-4" : ""
                }`}
              >
                <SurfaceCard
                  tone="on-background"
                  className={`h-full min-h-[280px] gap-4 ${p.flagged ? "bg-card" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      Pattern {p.num}
                      {p.flagged ? " · Flagged" : ""}
                    </span>
                    <span className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-primary">
                      {valueTypeLabels[p.valueType]}
                    </span>
                  </div>
                  <h2 className="font-serif text-[clamp(1.2rem,2.2vw,1.45rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                    {p.name}
                  </h2>
                  <p className="text-[0.95rem] leading-normal text-muted-foreground">{p.shape}</p>
                  <details className="group rounded-xl bg-section/80 p-3">
                    <summary className="cursor-pointer text-[0.82rem] font-semibold text-foreground outline-none transition-colors hover:text-primary">
                      Three example domains
                    </summary>
                    <ul className="mt-3 space-y-2 text-[0.88rem] leading-snug text-muted-foreground">
                      {p.domains.map((d) => (
                        <li key={d} className="pl-3 [text-indent:-0.65rem]">
                          <span className="text-foreground/50" aria-hidden>
                            ·{" "}
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <div>
                    <p className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">Typical trap</p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-muted-foreground">{p.trap}</p>
                  </div>
                </SurfaceCard>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Display size="sm" as="h2" className="text-balance">
                Templates and full depth
              </Display>
              <Prose className="mx-auto mt-4">
                <p>
                  The one-page scan worksheet ships behind a simple request flow so teams can run the exercise without
                  waiting on sales. The article carries definitions, cadence, and how the scan feeds experiments.
                </p>
              </Prose>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/resources/templates"
                  className="inline-flex h-auto items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-transform duration-200 ease-out hover:-translate-y-0.5"
                >
                  Request the template pack
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </Link>
                <ArrowLink href="/articles/sandbox/the-eight-patterns-where-value-hides" tone="foreground">
                  Read the full canon article
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
