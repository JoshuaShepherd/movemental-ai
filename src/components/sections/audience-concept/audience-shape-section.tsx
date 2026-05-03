import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";

import { AudienceLabel } from "./audience-label";

export type AudienceFailure = {
  num: string;
  title: string;
  body: React.ReactNode;
};

/** `.shape` + `.failure` grid — parity with audience prototype CSS. */
export function AudienceShapeSection({
  id = "shape",
  label,
  title,
  titleId,
  lede,
  failures,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  titleId: string;
  lede: React.ReactNode;
  failures: AudienceFailure[];
}) {
  return (
    <Section
      id={id}
      variant="default"
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
            <div className="max-w-[54ch] text-[1.1rem] leading-relaxed text-muted-foreground">
              {lede}
            </div>
          </RevealOnScroll>
        </div>

        <ol className="mt-14 grid list-none border-t border-border p-0 sm:grid-cols-2 lg:grid-cols-3">
          {failures.map((f, i) => (
            <li
              key={f.num}
              className="border-b border-border sm:border-r sm:pr-6 sm:nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:nth-[3n]:border-r-0"
            >
              <RevealOnScroll delaySec={0.05 + i * 0.05}>
                <div className="flex flex-col gap-3 py-7 pr-0">
                  <span className="text-label font-medium tabular-nums tracking-eyebrow text-ink-soft">
                    {f.num}
                  </span>
                  <h3 className="font-serif text-[clamp(1.25rem,1.7vw,1.45rem)] font-normal italic leading-tight tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <div className="text-[0.95rem] leading-relaxed text-muted-foreground">
                    {f.body}
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
