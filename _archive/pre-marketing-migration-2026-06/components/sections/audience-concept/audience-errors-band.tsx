import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";

import { AudienceLabel } from "./audience-label";

/** Full-width `.errors` band — nonprofits-style two equal errors + coda. */
export function AudienceErrorsBand({
  sectionId,
  titleId,
  label,
  title,
  pairLines,
  coda,
}: {
  sectionId?: string;
  titleId?: string;
  label: string;
  title: React.ReactNode;
  pairLines: [string, string];
  coda?: React.ReactNode;
}) {
  return (
    <Section
      id={sectionId}
      variant="section"
      spacing="lg"
      aria-labelledby={titleId}
      className={sectionId ? "scroll-mt-(--site-chrome-total)" : undefined}
    >
      <Container className="max-w-[740px]">
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.08}>
          <div
            id={titleId}
            className="text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.15] tracking-tight text-foreground"
          >
            {title}
          </div>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.12} className="mt-2">
          <p className="border-t border-border py-3.5 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-normal text-muted-foreground">
            {pairLines[0]}
          </p>
          <p className="border-t border-b border-border py-3.5 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-normal text-muted-foreground">
            {pairLines[1]}
          </p>
          {coda ? (
            <div className="mt-4 max-w-[58ch] text-[1.05rem] leading-relaxed text-muted-foreground">
              {coda}
            </div>
          ) : null}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
