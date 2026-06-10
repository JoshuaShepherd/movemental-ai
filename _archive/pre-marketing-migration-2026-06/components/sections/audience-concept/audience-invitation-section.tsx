import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";

import { AudienceLabel } from "./audience-label";

/** Paper `.invitation` — matches homepage HTML (not midnight). */
export function AudienceInvitationSection({
  id = "invitation",
  variant = "default",
  label,
  title,
  titleId,
  body,
  bodySoft,
  primaryCta,
  secondaryCta,
  tertiaryCta,
}: {
  id?: string;
  variant?: "default" | "section" | "midnight";
  label: string;
  title: React.ReactNode;
  titleId: string;
  body: React.ReactNode;
  bodySoft?: React.ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
}) {
  return (
    <Section
      id={id}
      variant={variant}
      spacing="lg"
      aria-labelledby={titleId}
      className="scroll-mt-(--site-chrome-total)"
    >
      <Container className="max-w-[740px]">
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.06}>
          <h2 id={titleId} className="text-h1 max-w-[22ch] text-balance text-foreground">
            {title}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll
          delaySec={0.12}
          className="mt-8 max-w-[52ch] space-y-3 text-[1.15rem] leading-relaxed text-muted-foreground"
        >
          <div>{body}</div>
          {bodySoft ? (
            <p className="text-[1.05rem] text-ink-soft">{bodySoft}</p>
          ) : null}
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.2} className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="ml-1 size-4" aria-hidden />
            </Link>
          </Button>
          {secondaryCta ? (
            <Button asChild variant="ghost" size="lg">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
          {tertiaryCta ? (
            <Button asChild variant="ghost" size="lg">
              <Link href={tertiaryCta.href}>{tertiaryCta.label}</Link>
            </Button>
          ) : null}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
