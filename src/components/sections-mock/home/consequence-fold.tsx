import { SectionHead } from "@/components/sections-mock/primitives";

const TOO_FAST: readonly string[] = [
  "Tools spread without coordination",
  "Staff define their own standards",
  "Risk increases without visibility",
  "Work does not compound",
];

const TOO_SLOW: readonly string[] = [
  "AI use goes underground",
  "Leaders lose visibility",
  "Staff experiment without guidance",
  "The organization reacts instead of leading",
];

export function ConsequenceFold() {
  return (
    <section
      className="band-default"
      id="consequence"
      aria-labelledby="consequence-heading"
    >
      <div className="container">
        <SectionHead
          eyebrow="When the sequence is skipped"
          display={
            <>
              What happens when organizations <em>rush — or hesitate.</em>
            </>
          }
          displayId="consequence-heading"
          lede="Most organizations are already using AI. The problem is not adoption — it is the lack of order."
        />

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16 lg:gap-24">
          <article aria-labelledby="too-fast">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Path one
            </p>
            <h3
              id="too-fast"
              className="mt-2 font-serif text-3xl italic leading-tight tracking-tight text-foreground"
            >
              Move too fast
            </h3>
            <ul className="mt-6 flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
              {TOO_FAST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article aria-labelledby="too-slow">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Path two
            </p>
            <h3
              id="too-slow"
              className="mt-2 font-serif text-3xl italic leading-tight tracking-tight text-foreground"
            >
              Move too slow
            </h3>
            <ul className="mt-6 flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
              {TOO_SLOW.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-12 max-w-(--prose-max) font-serif text-2xl italic leading-snug tracking-tight text-foreground md:mt-16">
          Both paths create the same outcome: fragmentation, confusion, and
          loss of leadership clarity.
        </p>
      </div>
    </section>
  );
}
