import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { cn } from "@/lib/utils";

import { AudienceLabel } from "./audience-label";

export type AudienceOutcome = {
  num: string;
  title: string;
  body: React.ReactNode;
};

export function AudienceOutcomesSection({
  id,
  label,
  title,
  titleId,
  outcomes,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  titleId: string;
  outcomes: AudienceOutcome[];
}) {
  return (
    <Section
      id={id}
      variant="default"
      spacing="lg"
      aria-labelledby={titleId}
      className={id ? "scroll-mt-(--site-chrome-total)" : undefined}
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

        <ol className="mt-12 grid list-none border-t border-border p-0 md:grid-cols-3">
          {outcomes.map((o, i) => (
            <li
              key={o.num}
              className={cn(
                "border-b border-border py-7 md:border-b-0 md:border-r md:py-8 md:last:border-r-0",
                i === 0 ? "md:pl-0 md:pr-8" : "md:px-8",
                i === 2 && "md:pr-0"
              )}
            >
              <RevealOnScroll delaySec={0.05 + i * 0.08}>
                <div className="flex flex-col gap-3">
                  <span className="text-label font-medium tabular-nums tracking-eyebrow text-ink-soft">
                    {o.num}
                  </span>
                  <h3 className="font-serif text-[clamp(1.3rem,1.9vw,1.6rem)] font-normal italic leading-snug tracking-tight text-foreground">
                    {o.title}
                  </h3>
                  <p className="text-[0.98rem] leading-relaxed text-muted-foreground [&_em]:font-serif [&_em]:italic">
                    {o.body}
                  </p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
