import Link from "next/link";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { homeNarrativeBridges, homeStages } from "./home-data";

/**
 * §5 · The system — clarity / compressed canonical model.
 *
 * Tonal `section` band reads as the explicit answer to hero → consequence → turn.
 */
export function HomeSystem() {
  return (
    <Section id="system" variant="section" spacing="lg" className="scroll-mt-16">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">The system</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            From fragmentation to movement.
          </Display>
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-primary">
            {homeNarrativeBridges.systemAnswerLabel}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Six stages. One continuous system. Each card below opens the same story on{" "}
            <Link href="/fragmentation" className="font-medium text-primary underline-offset-4 hover:underline">
              the fragmentation walkthrough
            </Link>
            —tunable by audience when you are ready to go deeper.
          </p>
        </Reveal>

        <Reveal delay={160} stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeStages.map((stage) => (
            <Link
              key={stage.id}
              href={stage.href}
              className="group/stage flex flex-col rounded-(--radius-md) bg-card p-6 shadow-ambient transition-colors hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p className="font-mono text-xs font-semibold text-primary">
                {String(stage.index).padStart(2, "0")}
              </p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                {stage.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.oneLiner}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-primary">
                Read the stage
                <span aria-hidden className="transition-transform group-hover/stage:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </Reveal>

        <div className="mt-12 flex justify-center">
          <ArrowLink href="/fragmentation" size="md">
            Walk the full story
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
