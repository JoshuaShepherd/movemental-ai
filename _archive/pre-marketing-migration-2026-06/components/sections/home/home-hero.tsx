import Link from "next/link";

import { Container, Display, Prose, Reveal, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";

import { HomeHeroTabbedAudiences } from "./home-hero-tabbed-audiences";
import { homeHeroSupportingParagraph } from "./home-data";

/**
 * §1 · Hero — tension + promise (felt beat).
 *
 * Locked Display + CTAs: `home-page-fragmentation-funnel-narrative.md` §2.1.
 * Body leans resolution; `#problem` makes fragmentation legible.
 * Right column: tabbed Stitch / exemplar HTML previews (`HomeHeroTabbedAudiences`).
 */
export function HomeHero() {
  return (
    <Section
      id="hero"
      spacing="lg"
      className="-mt-16 pt-[calc(4rem+clamp(4rem,10vw,7rem))] pb-[clamp(4rem,10vw,6rem)]"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <Reveal>
            <Display size="lg" className="max-w-2xl text-balance">
              Your intelligence is fragmented. That&apos;s why it doesn&apos;t compound, form
              people, or scale.
            </Display>
            <Prose className="mt-8 max-w-xl text-lg">
              <p>{homeHeroSupportingParagraph}</p>
            </Prose>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="h-auto rounded-md px-8 py-4 text-base font-semibold shadow-none"
              >
                <Link href="#system">See how it works</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-md border-border bg-card px-8 py-4 text-base font-semibold shadow-none hover:bg-section"
              >
                <Link href="/fragmentation">View the full story</Link>
              </Button>
            </div>
          </Reveal>
          <HomeHeroTabbedAudiences />
        </div>
      </Container>
    </Section>
  );
}
