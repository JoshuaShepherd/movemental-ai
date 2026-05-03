import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";

/**
 * §13 · Final CTA — Midnight band.
 *
 * "You don't need another tool. You need your intelligence to exist
 * as a system." Three CTAs: Build your system · See the full
 * breakdown · Talk to us.
 */
export function HomeCta() {
  return (
    <Section id="cta" variant="midnight" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4 text-inverse-foreground/60">The invitation</Eyebrow>
          <Display size="md" as="h2" className="text-balance text-inverse-foreground">
            You don&apos;t need another tool. You need your intelligence to exist as a
            system.
          </Display>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="h-auto rounded-md px-8 py-4 text-base font-semibold shadow-none"
            >
              <Link href="/contact">Build your system</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-md border-inverse-foreground/30 bg-transparent px-8 py-4 text-base font-semibold text-inverse-foreground shadow-none hover:bg-inverse-foreground/10 hover:text-inverse-foreground"
            >
              <Link href="/fragmentation">See the full breakdown</Link>
            </Button>
            <Link
              href="/contact"
              className="text-sm font-semibold uppercase tracking-eyebrow text-inverse-foreground/70 underline-offset-4 hover:text-inverse-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Talk to us
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
