import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";

import { AudienceLabel } from "./audience-label";

export type AudienceHeroCta = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

export function AudienceConceptHero({
  label,
  title,
  subhead,
  supportBlocks,
  errorsBlock,
  ctas,
  aside,
}: {
  /** Content after the label dot (plain or `.audience-tag` serif from HTML). */
  label: React.ReactNode;
  title: React.ReactNode;
  subhead: React.ReactNode;
  /** Extra paragraphs in main column (churches hero support). */
  supportBlocks?: React.ReactNode;
  /** Optional “two equal errors” block inside hero (churches / institutions). */
  errorsBlock?: React.ReactNode;
  ctas: AudienceHeroCta[];
  aside?: {
    body: React.ReactNode;
    attribution?: string;
    ariaLabel?: string;
  };
}) {
  return (
    <Section
      variant="default"
      spacing="lg"
      className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10"
    >
      <Container>
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>

        <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-[clamp(3rem,6vw,5.5rem)]">
          <div>
            <RevealOnScroll delaySec={0.06}>
              <h1 className="text-display max-w-[20ch] text-balance text-foreground">
                {title}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.12} className="mt-6 sm:mt-8">
              <div className="max-w-[50ch] text-pretty text-[clamp(1.15rem,1.7vw,1.3rem)] leading-normal tracking-tight text-muted-foreground">
                {subhead}
              </div>
            </RevealOnScroll>
            {supportBlocks ? (
              <RevealOnScroll delaySec={0.18} className="mt-6 max-w-[50ch] space-y-4 text-base leading-relaxed text-muted-foreground">
                {supportBlocks}
              </RevealOnScroll>
            ) : null}
            {errorsBlock ? (
              <RevealOnScroll delaySec={0.22} className="mt-7">
                {errorsBlock}
              </RevealOnScroll>
            ) : null}
            <RevealOnScroll delaySec={0.26} className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              {ctas.map((c) =>
                c.variant === "ghost" ? (
                  <Button key={c.href + c.label} asChild variant="ghost" size="lg">
                    <Link href={c.href}>{c.label}</Link>
                  </Button>
                ) : (
                  <Button key={c.href + c.label} asChild size="lg">
                    <Link href={c.href}>
                      {c.label}
                      <ArrowRight className="ml-1 size-4" aria-hidden />
                    </Link>
                  </Button>
                )
              )}
            </RevealOnScroll>
          </div>
          {aside ? (
            <RevealOnScroll delaySec={0.28}>
              <aside
                className="max-w-[36ch] border-l-2 border-foreground pl-5 font-serif text-[1.1rem] font-normal italic leading-relaxed text-foreground"
                aria-label={aside.ariaLabel ?? "Supporting note"}
              >
                <div className="space-y-3">{aside.body}</div>
                {aside.attribution ? (
                  <p className="mt-3 font-sans text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft not-italic">
                    {aside.attribution}
                  </p>
                ) : null}
              </aside>
            </RevealOnScroll>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
