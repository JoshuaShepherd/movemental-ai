import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";

import { OrganizationsSegmentNav } from "./organizations-segment-nav";

const SEGMENT_CARDS = [
  {
    title: "Churches",
    body: "Integrate formation, care, and memory.",
    href: "/churches",
  },
  {
    title: "Nonprofits",
    body: "Integrate mission, money, and memory.",
    href: "/nonprofits",
  },
  {
    title: "Institutions",
    body: "Integrate across entities, generations, and accreditors.",
    href: "/institutions",
  },
] as const;

/**
 * Organizations hub — orients visitors to the three org-shaped audience routes
 * (same path; different integration points).
 */
export function OrganizationsHubContent() {
  return (
    <div data-audience="organizations-hub" className="text-pretty">
      <OrganizationsSegmentNav />

      <Section
        variant="default"
        spacing="lg"
        aria-labelledby="orgs-hub-title"
        className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10"
      >
        <Container>
          <RevealOnScroll>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              <span
                className="size-1.5 shrink-0 rounded-full bg-foreground/80"
                aria-hidden
              />
              Organizations &mdash; where Movemental is implemented
            </p>
          </RevealOnScroll>

          <RevealOnScroll delaySec={0.08}>
            <h1
              id="orgs-hub-title"
              className="text-display max-w-[20ch] text-balance text-foreground"
            >
              The same path. Different integration points.
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delaySec={0.16} className="mt-6 max-w-[52ch] text-pretty text-[clamp(1.1rem,1.7vw,1.25rem)] leading-normal tracking-tight text-muted-foreground">
            <p>
              Churches, nonprofits, and institutions are the primary implementation audiences for
              Movemental &mdash; the organizations inside which the system is actually adopted,
              run, and stewarded. They all pay the same fragmentation tax on informational and
              relational intelligence, and Movemental helps each navigate AI with people,
              formation, and mission at stake &mdash; foundation first. Choose where you are
              leading.
            </p>
            <p className="mt-4 text-[0.95rem] text-ink-soft">
              Movement leaders are a distinct{" "}
              <Link
                href="/voices"
                className="font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
              >
                trusted-voice layer
              </Link>{" "}
              that shapes the work from the field &mdash; not a fourth implementation segment
              beside the three above.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delaySec={0.24} className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Start with clarity
                <ArrowRight className="arrow ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/fragmentation">See the six-stage arc</Link>
            </Button>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" aria-labelledby="orgs-segments-title">
        <Container>
          <RevealOnScroll>
            <h2
              id="orgs-segments-title"
              className="text-h2 max-w-[28ch] text-balance text-foreground"
            >
              Where are you leading?
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.08} className="mt-4 max-w-[48ch] text-[1.05rem] leading-relaxed text-muted-foreground">
            Each doorway goes deeper on tension, path, and next step for that context — not a
            separate product line.
          </RevealOnScroll>

          <div className="mt-10 grid border-t border-border min-[820px]:grid-cols-3">
            {SEGMENT_CARDS.map((hub, i) => (
              <div
                key={hub.href}
                className="border-b border-border py-6 min-[820px]:border-b-0 min-[820px]:border-r min-[820px]:border-border min-[820px]:py-7 min-[820px]:pr-6 min-[820px]:last:border-r-0"
              >
                <RevealOnScroll delaySec={0.1 + i * 0.08}>
                  <h3 className="font-serif text-[clamp(1.2rem,1.8vw,1.4rem)] font-normal italic leading-tight tracking-tight text-foreground">
                    {hub.title}
                  </h3>
                  <p className="mt-2.5 max-w-[34ch] text-[0.95rem] leading-normal text-muted-foreground">
                    {hub.body}
                  </p>
                  <Link
                    href={hub.href}
                    className="mt-4 inline-flex border-b border-border pb-px text-sm font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    Go deeper
                  </Link>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
