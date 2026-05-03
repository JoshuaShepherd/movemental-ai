import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { entryPoints } from "./home-data";

/**
 * §12 · Entry points — "Where do you start?"
 *
 * Three tuned paths: Churches · Nonprofits · Institutions.
 * Each card links to its existing audience page.
 */
export function HomeEntryPoints() {
  return (
    <Section id="entry-points" variant="section" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">Entry points</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            Where do you start?
          </Display>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Pick the path closest to your context—the same six-stage spine applies; only the
            emphasis shifts.
          </p>
        </Reveal>

        <Reveal delay={160} stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {entryPoints.map((entry) => (
            <Link
              key={entry.id}
              href={entry.href}
              className="group/entry flex flex-col rounded-(--radius-lg) bg-card p-8 shadow-ambient transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
                {entry.eyebrow}
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {entry.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {entry.blurb}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-primary">
                Start here
                <span aria-hidden className="transition-transform group-hover/entry:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
