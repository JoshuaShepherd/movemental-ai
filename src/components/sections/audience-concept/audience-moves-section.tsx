import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";

import { AudienceLabel } from "./audience-label";

export type AudienceMove = {
  num: string;
  title: string;
  paragraphs: React.ReactNode[];
};

/** `.moves` band — alt surface + stacked `.move` rows. */
export function AudienceMovesSection({
  id = "moves",
  label,
  title,
  titleId,
  lede,
  moves,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  titleId: string;
  /** Optional intro line(s) above the list (nonprofits “In practice”). */
  lede?: React.ReactNode;
  moves: AudienceMove[];
}) {
  return (
    <Section
      id={id}
      variant="section"
      spacing="lg"
      aria-labelledby={titleId}
      className="scroll-mt-(--site-chrome-total)"
    >
      <Container>
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.06}>
          <h2 id={titleId} className="max-w-[28ch] text-balance text-h2 text-foreground">
            {title}
          </h2>
        </RevealOnScroll>
        {lede ? (
          <RevealOnScroll delaySec={0.1} className="mt-4 max-w-[54ch] text-[1.1rem] leading-relaxed text-muted-foreground">
            {lede}
          </RevealOnScroll>
        ) : null}

        <ol className="mt-12 list-none border-t border-border p-0">
          {moves.map((m, i) => (
            <li key={m.num} className="border-b border-border">
              <RevealOnScroll delaySec={0.04 + i * 0.04}>
                <div className="grid gap-5 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:py-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-label font-medium tabular-nums tracking-eyebrow text-ink-soft">
                      {m.num}
                    </span>
                    <h3 className="max-w-[22ch] font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] font-normal italic leading-tight tracking-tight text-foreground">
                      {m.title}
                    </h3>
                  </div>
                  <div className="flex max-w-[58ch] flex-col gap-3 text-base leading-relaxed text-muted-foreground [&_em]:font-serif [&_em]:italic [&_strong]:font-medium [&_strong]:text-foreground">
                    {m.paragraphs.map((p, j) => (
                      <div key={j}>{p}</div>
                    ))}
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
