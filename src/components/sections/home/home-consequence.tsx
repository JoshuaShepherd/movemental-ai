import Link from "next/link";

import {
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";

import { BOOK_READ_INSPECTABLE_DIAGNOSIS } from "./home-data";

const STAKES = [
  {
    title: "Coherence",
    body: "Teams ship fluent fragments; the public sees disconnected versions of the same mission.",
  },
  {
    title: "Interpretation",
    body: "Search, assistants, and newcomers infer from whatever surface is handy—not from one canonical whole.",
  },
  {
    title: "Representation",
    body: "when the foundation splinters, trust becomes expensive: every channel restates what should be verified once.",
  },
] as const;

/**
 * §3 · Consequence — weight / urgency (Midnight).
 *
 * Locks: `home-page-fragmentation-funnel-narrative.md` §2.1 row 3 (amended headline + hinge).
 * No placeholder “sources”; book carries inspectable diagnosis + citations.
 */
export function HomeConsequence() {
  return (
    <Section id="consequence" variant="midnight" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-6 text-inverse-foreground/60">The consequence</Eyebrow>
          <Display size="md" as="h2" className="text-balance text-inverse-foreground">
            When intelligence fragments, coherence is the first thing that breaks.
          </Display>
          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-inverse-foreground/75">
            Not because truth is gone.
            <br className="hidden sm:block" /> Because coherence is gone.
          </p>
          <Prose className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-inverse-foreground/80">
            <p>
              Coherence loss shows up as mixed signals across sites and decks, as interpretation
              failure when search and AI can only see part of the corpus, and as representational
              drift when no one surface bears the weight of a single accountable whole.
            </p>
          </Prose>
          <p className="mt-8">
            <Link
              href={BOOK_READ_INSPECTABLE_DIAGNOSIS}
              className="text-sm font-semibold uppercase tracking-eyebrow text-primary underline-offset-4 hover:underline"
            >
              Read the inspectable diagnosis
            </Link>
          </p>
        </Reveal>
        <Reveal delay={160}>
          <StakesTriad />
        </Reveal>
      </Container>
    </Section>
  );
}

function StakesTriad() {
  return (
    <ul className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
      {STAKES.map((item) => (
        <li
          key={item.title}
          className="rounded-(--radius-md) bg-inverse-foreground/5 px-4 py-5 text-left shadow-ambient"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-primary">
            {item.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-inverse-foreground/85">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
