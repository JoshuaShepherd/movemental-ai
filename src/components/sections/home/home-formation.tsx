import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { formationColumns, homeNarrativeBridges } from "./home-data";

/**
 * §8 · Formation — stage band 04.
 */
export function HomeFormation() {
  return (
    <Section id="formation" variant="default" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">Formation</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            This is where transformation actually happens.
          </Display>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {homeNarrativeBridges.activationToFormation}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
          {formationColumns.map((col) => (
            <Reveal key={col.id} delay={col.id === "relational" ? 140 : 0}>
              <PathwayColumn label={col.label} stops={col.stops} tone={col.id} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Information informs.
          </p>
          <p className="mt-1 text-lg leading-relaxed text-muted-foreground">
            Relationships form.
          </p>
          <p className="mt-4 text-xl font-semibold text-foreground">
            Together, they transform.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function PathwayColumn({
  label,
  stops,
  tone,
}: {
  label: string;
  stops: readonly string[];
  tone: "informational" | "relational";
}) {
  const dot =
    tone === "relational"
      ? "bg-primary text-primary-foreground"
      : "bg-inverse-surface text-inverse-foreground";

  return (
    <div className="rounded-(--radius-md) bg-card p-8 shadow-ambient">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
        {label}
      </p>
      <ol className="mt-6 space-y-4">
        {stops.map((stop, i) => (
          <li key={stop} className="flex items-start gap-4">
            <span
              className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${dot}`}
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="text-base leading-snug text-foreground">{stop}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
