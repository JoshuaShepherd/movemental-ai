import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { cn } from "@/lib/utils";

import { AudienceLabel } from "./audience-label";

export type AudiencePathStep = {
  num: string;
  label: string;
  body: React.ReactNode;
};

/** Safety → Sandbox → Skills → Solutions grid — homepage path parity. */
export function AudiencePathSection({
  id = "path",
  variant = "section",
  label,
  title,
  titleId,
  lede,
  steps,
  stepsEyebrow,
  coda,
}: {
  id?: string;
  variant?: "default" | "section";
  label: string;
  title: React.ReactNode;
  titleId: string;
  lede: React.ReactNode;
  steps: AudiencePathStep[];
  /** Optional small label row above the step grid (churches “The sequence”). */
  stepsEyebrow?: string;
  coda?: React.ReactNode;
}) {
  return (
    <Section
      id={id}
      variant={variant}
      spacing="lg"
      aria-labelledby={titleId}
      className="scroll-mt-(--site-chrome-total)"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <RevealOnScroll>
              <AudienceLabel>{label}</AudienceLabel>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.06}>
              <h2 id={titleId} className="text-balance text-h2 text-foreground">
                {title}
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delaySec={0.1}>
            <div className="max-w-[50ch] text-[1.1rem] leading-relaxed text-muted-foreground">
              {lede}
            </div>
          </RevealOnScroll>
        </div>

        {stepsEyebrow ? (
          <RevealOnScroll delaySec={0.14} className="mt-10">
            <AudienceLabel className="mb-2">{stepsEyebrow}</AudienceLabel>
          </RevealOnScroll>
        ) : null}

        <ol
          className={cn(
            "grid list-none border-t border-border p-0 sm:grid-cols-2 lg:grid-cols-4",
            stepsEyebrow ? "mt-6" : "mt-14"
          )}
        >
          {steps.map((step, i) => (
            <li
              key={step.num}
              className="border-b border-border sm:border-r sm:pr-6 sm:nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:nth-[4n]:border-r-0"
            >
              <RevealOnScroll delaySec={0.05 + i * 0.08}>
                <div className="flex flex-col gap-3.5 py-7 pr-0">
                  <span className="text-label font-medium tabular-nums tracking-eyebrow text-ink-soft">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-[clamp(1.5rem,2.2vw,1.85rem)] font-normal italic leading-tight tracking-tight text-foreground">
                    {step.label}
                  </h3>
                  <div className="space-y-2 text-[0.98rem] leading-normal text-muted-foreground">
                    {step.body}
                  </div>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
        {coda ? (
          <RevealOnScroll delaySec={0.36} className="mt-10 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            {coda}
          </RevealOnScroll>
        ) : null}
      </Container>
    </Section>
  );
}
