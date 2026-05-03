import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { homeNarrativeBridges, infraTracks } from "./home-data";

/**
 * §9 · Multiplication — stage band 05.
 */
export function HomeMultiplication() {
  return (
    <Section id="multiplication" variant="section" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">Multiplication</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            Now your system can scale.
          </Display>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {homeNarrativeBridges.formationToMultiplication}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            You&apos;re not scaling content. You&apos;re scaling a system.
          </p>
        </Reveal>

        <div className="mt-16 space-y-8">
          {infraTracks.map((track, trackIndex) => (
            <Reveal key={track.id} delay={trackIndex * 120}>
              <InfrastructureTrack track={track} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function InfrastructureTrack({
  track,
}: {
  track: (typeof infraTracks)[number];
}) {
  const isRel = track.id === "relational";
  return (
    <div
      className={
        isRel
          ? "rounded-(--radius-lg) bg-primary/5 p-8 shadow-ambient"
          : "rounded-(--radius-lg) bg-card p-8 shadow-ambient"
      }
    >
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
          {track.label}
        </p>
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          {isRel ? "Relational" : "Informational"}
        </p>
      </header>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {track.items.map((item) => (
          <div
            key={item.title}
            className={
              isRel
                ? "rounded-(--radius-md) bg-card p-4"
                : "rounded-(--radius-md) bg-section p-4"
            }
          >
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
