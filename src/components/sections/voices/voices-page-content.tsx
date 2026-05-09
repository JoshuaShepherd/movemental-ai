import Link from "next/link";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  AudienceInvitationSection,
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";
import { COMMITTED_VOICES } from "@/lib/committed-voices";

import { VoiceCard } from "./voice-card";

/**
 * `/voices` — Movement Voices hub.
 *
 * Canonical doctrine: `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`.
 * Related plan: `docs/build/plans/movement-leaders-network-social-proof.md`.
 *
 * Posture: credibility, corpus, and ecosystem — **not** audience funnel and
 * **not** recruitment. Movement leaders are a distinct trusted-voice layer,
 * not a parallel audience segment beside churches / nonprofits / institutions.
 * Founders live on `/about`; this page names the trusted voices whose public
 * work shapes the platform.
 */
export function VoicesPageContent() {
  return (
    <div data-voices="concept-modern" className="text-pretty">
      <Section
        variant="default"
        spacing="lg"
        className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10"
        aria-labelledby="voices-hero-title"
      >
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Movement Voices</AudienceLabel>
          </RevealOnScroll>
          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-[clamp(3rem,6vw,5.5rem)]">
            <div>
              <RevealOnScroll delaySec={0.06}>
                <h1
                  id="voices-hero-title"
                  className="text-display max-w-[24ch] text-balance text-foreground"
                >
                  Built with and within a real{" "}
                  <AudienceSerifEm>movement-leadership ecosystem</AudienceSerifEm>.
                </h1>
              </RevealOnScroll>
              <RevealOnScroll
                delaySec={0.12}
                className="mt-6 max-w-[54ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-muted-foreground"
              >
                <p>
                  Movemental is stewarded by three founders —{" "}
                  <Link href="/about" className="font-medium text-primary underline-offset-4 hover:underline">
                    Brad Brisco, Alan Hirsch, and Joshua Shepherd
                  </Link>{" "}
                  — and shaped in conversation with trusted movement leaders whose public work
                  carries the kind of informational and relational intelligence the platform exists
                  to serve. This page names them. It is not an audience segment and not a roster
                  you apply to join; it is the credibility, corpus, and ecosystem layer behind the
                  product.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.18} className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#voices">Meet the trusted voices</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/about">Read about the team</Link>
                </Button>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.22}>
              <aside
                className="max-w-[36ch] bg-card px-5 py-5 font-serif text-[1.1rem] font-normal italic leading-relaxed text-foreground shadow-ambient"
                aria-label="How to read this page"
              >
                <p>
                  &ldquo;Credibility is cumulative, not performative. The people named here are
                  inside the work — not endorsing it from a distance.&rdquo;
                </p>
              </aside>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section
        id="how-to-read-this"
        variant="section"
        spacing="lg"
        aria-labelledby="how-to-read-this-title"
      >
        <Container width="narrow">
          <RevealOnScroll>
            <AudienceLabel>How to read this page</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2
              id="how-to-read-this-title"
              className="mt-2 max-w-[38ch] text-balance text-h2 text-foreground"
            >
              A <AudienceSerifEm>trusted-voice layer</AudienceSerifEm>, not another audience funnel.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.12}
            className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground"
          >
            <p>
              Churches, nonprofits, and institutions are the primary implementation audiences for
              Movemental. <strong className="font-medium text-foreground">The leaders named on
              this page are a different layer.</strong> Their public bodies of work &mdash;
              frameworks, teaching, networks, cohort practice &mdash; are what make Movemental
              legible as a serious platform, and what the platform is being built to carry without
              flattening.
            </p>
            <p>
              Each card links inward to a longer editorial read; curated outbound links live one
              click deeper. We do not imply that every organization a person leads endorses
              Movemental the company &mdash; the relationship is with the person.
            </p>
            <p className="text-sm">
              <Link
                href="/about"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Team
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link
                href="/movement-leaders"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                For movement leaders
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link
                href="/who-is-a-movement-leader"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Who is a movement leader?
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link
                href="/organizations"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Organizations (implementation)
              </Link>
              <span className="mx-2 text-ink-soft">·</span>
              <Link
                href="/fragmentation"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Fragmentation story
              </Link>
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section
        id="voices"
        variant="default"
        spacing="lg"
        aria-labelledby="voices-title"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
            <div>
              <RevealOnScroll>
                <AudienceLabel>Movement Voices</AudienceLabel>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.06}>
                <h2
                  id="voices-title"
                  className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground"
                >
                  Three voices, <AudienceSerifEm>three distinct shapes</AudienceSerifEm> of public work.
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll
              delaySec={0.1}
              className="max-w-[54ch] text-base leading-relaxed text-muted-foreground"
            >
              <p>
                Names are listed alphabetically by surname, not ranked by audience size. Each card
                opens a longer editorial bio with credentials, featured works, and a small set of
                outbound links the person actually wants you to follow.
              </p>
            </RevealOnScroll>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {COMMITTED_VOICES.map((voice, i) => (
              <RevealOnScroll key={voice.slug} delaySec={0.05 * i}>
                <VoiceCard voice={voice} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <AudienceInvitationSection
        variant="section"
        label="Continue"
        titleId="voices-invitation-title"
        title={
          <>
            See the problem these voices <AudienceSerifEm>say yes to fixing in public</AudienceSerifEm>.
          </>
        }
        body={
          <p>
            The fragmentation story explains why a credibility platform exists at all. The team
            page explains who is on the hook to build it. The organizations page is where
            implementation happens. Start wherever fits the question you actually have.
          </p>
        }
        primaryCta={{ label: "Read the fragmentation story", href: "/fragmentation" }}
        secondaryCta={{ label: "Meet the team", href: "/about" }}
        tertiaryCta={{ label: "Start a conversation", href: "/contact" }}
      />
    </div>
  );
}
