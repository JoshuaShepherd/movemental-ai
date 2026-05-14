import Link from "next/link";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  FeatureSplit,
  LightHeroPhotoBackdrop,
  Prose,
  Reveal,
  Section,
  SurfaceCard,
} from "@/components/primitives";
import {
  EditorialShowcaseIntro,
  GhostCtaPanel,
  IconFeatureCard,
} from "@/components/editorial-stitch";
import { Button } from "@/components/ui/button";

import { modularSprints, staticReality } from "./services-data";

export function ServicesPageContent() {
  return (
    <>
      <LightHeroPhotoBackdrop
        spacing="lg"
        imageSrc="/images/site/hero-desk-overhead-organized.webp"
        imageAlt="Overhead view of an organized desk with index cards and tools, editorial photograph."
        className="text-center"
      >
        <Container>
          <Eyebrow className="mb-4 animate-fade-in [animation-delay:100ms]">
            Digital curator &amp; strategy
          </Eyebrow>
          <Display size="lg" className="mx-auto max-w-4xl animate-fade-up">
            Your work was never meant to live in books, PDFs, and scattered content
          </Display>
          <Prose className="mx-auto mt-6 max-w-2xl text-lg animate-fade-up [animation-delay:200ms]">
            <p>
              We turn your body of work into a structured system that people can discover, move through, and engage —
              generating formation and sustainable economics where that is the right goal.
            </p>
          </Prose>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-up [animation-delay:400ms]">
            <Button asChild className="h-auto rounded-md px-8 py-4 text-base font-semibold shadow-none">
              <Link href="/contact">Start a conversation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-md border-border bg-card px-8 py-4 text-base font-semibold shadow-none hover:bg-section"
            >
              <Link href="/faq">FAQ</Link>
            </Button>
          </div>
        </Container>
      </LightHeroPhotoBackdrop>

      <Section variant="section" spacing="lg">
        <Reveal>
          <Container>
            <EditorialShowcaseIntro
              className="mb-12 md:mb-16"
              eyebrowTone="muted"
              eyebrow="The problem shape"
              titleAs="h2"
              title="Artifacts without a system do not steward attention"
              description="Most leaders are not short on insight. They are short on infrastructure — a single place where teaching, trust, and next steps stay connected."
            />
            <div className="grid gap-8 md:grid-cols-3">
              {staticReality.map((item) => (
                <IconFeatureCard
                  key={item.eyebrow}
                  icon={item.icon}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </Container>
        </Reveal>
      </Section>

      <Section spacing="lg">
        <Reveal>
          <Container>
            <FeatureSplit
              intro={
                <>
                  <Eyebrow className="mb-4 text-primary">Two tracks</Eyebrow>
                  <Display size="md" as="h2" className="max-w-xl text-balance">
                    Same posture — different containers
                  </Display>
                  <Prose className="mt-6">
                    <p>
                      <strong>Movement leaders</strong> need an owned environment for voice, pathways, courses, and
                      grounded AI. <strong>Organizations</strong> need integrated systems for content, fundraising,
                      governance, and capability building.
                    </p>
                  </Prose>
                </>
              }
            >
              <SurfaceCard tone="on-background" className="gap-6 p-8 sm:p-10">
                <p className="text-base leading-relaxed text-muted-foreground">
                  Organizational depth:{" "}
                  <Link href="/contact" className="font-medium text-primary hover:underline">
                    Contact
                  </Link>
                  . Modular work:{" "}
                  <Link href="/contact" className="font-medium text-primary hover:underline">
                    start a conversation
                  </Link>
                  .
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  We do not pick a &quot;primary&quot; audience in the headline — both belong here because the
                  underlying failure mode is the same: excellent work that cannot move as a system.
                </p>
              </SurfaceCard>
            </FeatureSplit>
          </Container>
        </Reveal>
      </Section>

      <Section variant="section" spacing="lg">
        <Reveal>
          <Container>
            <EditorialShowcaseIntro
              className="mb-12 md:mb-16"
              eyebrowTone="muted"
              eyebrow="Modular sprint map"
              titleAs="h2"
              title="Five four-week style sprints (conceptual)"
              description="Discovery first where appropriate, then vertical builds. Exact scoping is always conversational — not a rigid conveyor belt."
            />
            <div className="grid gap-8 md:grid-cols-3">
              {modularSprints.map((s) => (
                <IconFeatureCard
                  key={s.eyebrow}
                  icon={s.icon}
                  eyebrow={s.eyebrow}
                  title={s.title}
                  description={s.description}
                />
              ))}
            </div>
            <Prose className="mx-auto mt-10 max-w-2xl text-center text-sm">
              <p>
                For sprint sequencing and scope,{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  talk with the team
                </Link>{" "}
                — economics and phasing are aligned on the first calls, not on legacy service URLs.
              </p>
            </Prose>
          </Container>
        </Reveal>
      </Section>

      <Section spacing="lg">
        <Reveal>
          <Container>
            <Display size="sm" as="h2">
              Investment range
            </Display>
            <Prose className="mt-4">
              <p>
                <strong>Movement leaders:</strong> No upfront build fee. The 90/10 revenue-share model means you pay
                nothing until your platform generates revenue.{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Ask about economics on a call
                </Link>
                .
              </p>
              <p>
                <strong>Organizations:</strong> 4-week modular builds typically range from <strong>$12,000 to $40,000</strong>{" "}
                depending on scope and complexity. Discovery Labs start at the lower end; multi-sprint engagements are
                scoped conversationally. Most organizations recoup their investment within 6–12 months through
                operational efficiency and new revenue channels.
              </p>
            </Prose>
          </Container>
        </Reveal>
      </Section>

      <Section variant="section" spacing="lg">
        <Reveal>
          <Container className="text-center">
            <GhostCtaPanel
              title="Tell us what you are trying to protect"
              description="We will respond with clarity — including when the honest answer is &quot;not a fit.&quot;"
              ctaLabel="Start a conversation"
              ctaHref="/contact"
            />
            <div className="mt-10">
              <ArrowLink href="/fragmentation" tone="foreground" size="md">
                Fragmentation story
              </ArrowLink>
            </div>
          </Container>
        </Reveal>
      </Section>
    </>
  );
}
