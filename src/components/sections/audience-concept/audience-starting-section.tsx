import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";

import { AudienceLabel } from "./audience-label";

export type AudienceQuestion = {
  num: string;
  prompt: string;
  gloss: string;
};

export function AudienceStartingSection({
  id = "starting",
  label,
  title,
  titleId,
  intro,
  questions,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  titleId: string;
  intro: React.ReactNode;
  questions: AudienceQuestion[];
}) {
  return (
    <Section
      id={id}
      variant="section"
      spacing="lg"
      aria-labelledby={titleId}
      className="scroll-mt-(--site-chrome-total)"
    >
      <Container className="max-w-[740px]">
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.06}>
          <h2 id={titleId} className="text-balance text-h2 text-foreground">
            {title}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.12} className="mt-6 max-w-prose space-y-4 text-[1.1rem] leading-relaxed text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
          {intro}
        </RevealOnScroll>

        <ol className="mt-10 list-none border-t border-border p-0">
          {questions.map((q, i) => (
            <li key={q.num} className="border-b border-border py-6">
              <RevealOnScroll delaySec={0.08 + i * 0.06}>
                <div className="grid gap-2 sm:grid-cols-[3.5rem_1fr] sm:items-baseline sm:gap-6">
                  <span className="text-label font-medium tabular-nums tracking-eyebrow text-ink-soft">
                    {q.num}
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="font-serif text-[clamp(1.2rem,1.8vw,1.45rem)] font-normal italic leading-snug tracking-tight text-foreground">
                      {q.prompt}
                    </p>
                    <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                      {q.gloss}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
