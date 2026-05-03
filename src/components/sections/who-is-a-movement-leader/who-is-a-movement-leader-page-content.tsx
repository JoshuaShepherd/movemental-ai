import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

const marks = [
  {
    num: "01",
    title: "They produce formation, not just information",
    text: "Their work changes people. Not temporarily. Not superficially. It shapes identity, influences decisions, and alters direction.",
  },
  {
    num: "02",
    title: "Their impact extends beyond direct contact",
    text: "People carry their ideas forward, build on their frameworks, or teach what they have learned to others. This is the beginning of multiplication.",
  },
  {
    num: "03",
    title: "They operate from embodied credibility",
    text: "Their authority is not manufactured. It comes from lived experience, tested ideas, and real-world application.",
  },
  {
    num: "04",
    title: "They build systems, even when they do not call them systems",
    text: "Movement leaders tend to create pathways, patterns, tools, or repeatable environments. They move instinctively toward structure that can support growth and transfer.",
  },
  {
    num: "05",
    title: "They think in terms of reproducibility",
    text: "Can this be taught? Can this be repeated? Can others carry this forward? They are not trying to remain the center of everything.",
  },
  {
    num: "06",
    title: "They carry responsibility for people",
    text: "They do not treat people as an audience to capture. They feel accountable for what happens to individuals, communities, and leaders over time.",
  },
  {
    num: "07",
    title: "They value depth over reach",
    text: "They are oriented toward substance, transformation, and long-term impact. They would rather build something durable than something briefly loud.",
  },
  {
    num: "08",
    title: "They are already doing the work",
    text: "Movement leaders are not defined by aspiration alone. Their systems may be incomplete and their visibility may be low, but the underlying work is already real.",
  },
  {
    num: "09",
    title: "They eventually feel the infrastructure gap",
    text: "What they are doing is working, but it is not holding together. The problem is no longer just content. It is system.",
  },
  {
    num: "10",
    title: "They often stand at points of intersection",
    text: "Many movement leaders work between fields, institutions, communities, or paradigms. That gives them unusual perspective and catalytic potential.",
  },
  {
    num: "11",
    title: "They are drawn toward networks, not just personal platforms",
    text: "They understand that credibility and impact grow through connected ecosystems. They are participants in scenius.",
  },
  {
    num: "12",
    title: "They can exist without a strong platform, but they should not have to",
    text: "Their leadership exists regardless, but better infrastructure would help it become more visible, usable, and durable.",
  },
] as const;

const domains = [
  "AI and technology",
  "Social innovation",
  "Justice and advocacy",
  "Education and formation",
  "Youth and next-generation leadership",
  "Digital communities",
  "Hybrid institutional spaces",
] as const;

const notDefinedBy = [
  "Follower count",
  "Content volume",
  "Production quality",
  "Branding sophistication",
  "Algorithmic success",
  "Whether they write explicitly about movement theory",
] as const;

const commonThreads = [
  {
    title: "They take responsibility for people, not just ideas",
    text: "Formation is relational and accountable—not only intellectual.",
  },
  {
    title: "They build environments, not just outputs",
    text: "The conditions for growth matter as much as the artifacts they publish.",
  },
  {
    title: "They think in terms of formation, not just communication",
    text: "They measure depth and transfer, not only reach and impressions.",
  },
  {
    title: "They see beyond immediate results into generational impact",
    text: "They work with a longer horizon than a single launch cycle.",
  },
] as const;

/**
 * Working definition of movement leadership (formative, multiplying impact) —
 * complements the full audience narrative at `/movement-leaders`.
 */
export function WhoIsAMovementLeaderPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg" className="text-center" id="top">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Category definition</Eyebrow>
            <Display size="lg" className="mx-auto max-w-4xl text-balance">
              Who is a movement leader?
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                The term <strong className="text-inverse-foreground">movement leader</strong> is often misunderstood.
                Movement leadership is not defined primarily by platform size, topic, or visibility. It is defined by a
                deeper pattern:{" "}
                <strong className="text-inverse-foreground">
                  the capacity to form people in ways that multiply beyond one&apos;s direct presence.
                </strong>{" "}
                The same pattern shows up across the{" "}
                <Link
                  href="/book/read/two-intelligences"
                  className="font-medium text-inverse-foreground underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
                >
                  two intelligences
                </Link>{" "}
                that carry serious work — informational and relational — and it stalls hardest when{" "}
                <strong className="text-inverse-foreground">integration</strong> never becomes a shared foundation.
              </p>
              <p>
                Inside Movemental, movement leaders are a distinct{" "}
                <strong className="text-inverse-foreground">trusted-voice and ecosystem layer</strong>, not a parallel
                audience segment beside churches, nonprofits, and institutions. Their public bodies of work carry the
                kind of fragmented informational and relational intelligence the platform exists to serve.{" "}
                <Link
                  href="/voices"
                  className="font-medium text-inverse-foreground underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
                >
                  See the trusted voices shaping the work
                </Link>
                , or read{" "}
                <Link
                  href="/movement-leaders"
                  className="font-medium text-inverse-foreground underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
                >
                  For movement leaders
                </Link>{" "}
                for the full fragmentation shape, five moves, and practitioner invitation.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <Display size="md" as="h2" className="text-balance">
              A movement leader is someone who forms people in ways that multiply
            </Display>
            <Prose className="mt-6 max-w-3xl">
              <p>
                At its simplest, a movement leader is someone whose work consistently produces transformation that
                extends beyond their direct presence. Not just influence. Not just information. Not just ideas.{" "}
                <strong>But formation that reproduces.</strong>
              </p>
              <p>
                This can happen in churches, nonprofits, networks, communities, companies, digital ecosystems,
                educational spaces, justice work, and emerging fields. The domain does not define the movement.{" "}
                <strong>The pattern of impact does.</strong>
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <Reveal>
            <Display size="md" as="h2" className="text-balance">
              The category has to be larger than its earliest examples
            </Display>
            <Prose className="mt-6 max-w-3xl">
              <p>
                In earlier phases, movement leadership was often centered in missiology, church planting, apostolic
                frameworks, and theological writing. That remains foundational. <strong>But it is no longer sufficient.</strong>
              </p>
              <p>Today, the same pattern of movemental impact is appearing in places like:</p>
            </Prose>
            <div className="mt-6 flex flex-wrap gap-3">
              {domains.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground"
                >
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <Display size="md" as="h2" className="text-balance">
              What these leaders have in common
            </Display>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {commonThreads.map((c) => (
                <div key={c.title}>
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg" id="marks">
        <Container>
          <Reveal>
            <Display size="md" as="h2" className="text-balance">
              The marks of a movement leader
            </Display>
            <Prose className="mt-4 max-w-3xl">
              <p>
                These are not a rigid checklist. No one expresses all of them equally. But together they describe the
                pattern.
              </p>
            </Prose>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {marks.map((m) => (
                <div key={m.num}>
                  <span className="text-sm font-semibold text-muted-foreground">{m.num}</span>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <Reveal>
            <Display size="md" as="h2" className="text-balance">
              What movement leaders are not defined by
            </Display>
            <Prose className="mt-6 max-w-3xl">
              <p>Movement leadership should not be confused with online popularity or content productivity.</p>
            </Prose>
            <div className="mt-6 flex flex-wrap gap-3">
              {notDefinedBy.map((n) => (
                <span
                  key={n}
                  className="rounded-full bg-elevated px-4 py-2 text-sm font-medium text-foreground"
                >
                  {n}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Display size="md" as="h2" className="text-balance text-inverse-foreground">
              Why this matters now
            </Display>
            <Prose className="mt-6 max-w-3xl text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                In an era of AI-saturated content, movement leaders become more important, not less. Content is becoming
                abundant. Credibility is becoming scarce. Trust is becoming harder to establish.
              </p>
              <p>
                In that environment, the leaders who can produce real formation with real integrity in ways that multiply
                become disproportionately important.
              </p>
            </Prose>
            <p className="mt-6 font-medium text-inverse-foreground">
              When content becomes cheap, formative credibility becomes more valuable.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="sm">
        <Container>
          <Reveal>
            <Display size="sm" as="h2" className="text-balance">
              A better question than &quot;Do I fit?&quot;
            </Display>
            <ul className="mt-6 max-w-2xl space-y-2 text-muted-foreground">
              <li>Does my work consistently shape people in ways that extend beyond me?</li>
              <li>Am I building something others can carry forward?</li>
              <li>Do I feel responsibility for what happens to people through my work?</li>
              <li>Is the next constraint in my work no longer content alone, but system and continuity?</li>
            </ul>
            <Prose className="mt-6 max-w-2xl">
              <p>
                If the answer is yes, even in early form, you are likely already carrying the weight of movement
                leadership.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="text-center">
          <Reveal>
            <Display size="md" as="h2" className="mx-auto max-w-3xl text-balance">
              If this describes your work, you should not have to build alone
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl">
              <p>
                Movemental exists for leaders whose work is already forming people and whose next challenge is
                coherence, continuity, and scale without losing integrity.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <ArrowLink href="/contact" size="lg">
                Start a conversation
              </ArrowLink>
              <ArrowLink href="/movement-leaders" tone="foreground">
                See the full movement-leaders narrative
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="invitation" variant="section" spacing="lg">
        <Container className="mx-auto max-w-lg text-center">
          <Reveal>
            <Eyebrow className="mb-4">Canon and cadence</Eyebrow>
            <Display size="sm" as="h2" className="text-balance">
              Go deeper, or stay close
            </Display>
            <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <Link
                href="/articles/two-intelligences-integration"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Two intelligences, one integration thesis
              </Link>
              <Link
                href={SSSS_FIELD_GUIDE_PATH}
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                AI Stewardship Sequence field guide
              </Link>
              <Link
                href={BOOK_HUB_PATH}
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Read the field guide (book)
              </Link>
              <Link
                href="/fragmentation"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Walk the six stages
              </Link>
            </div>
            <p className="mt-8 text-base text-muted-foreground">
              One note per month on formation, infrastructure, and what we&rsquo;re learning.
            </p>
            <div className="mt-6">
              <NewsletterForm source="who-is-a-movement-leader-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
