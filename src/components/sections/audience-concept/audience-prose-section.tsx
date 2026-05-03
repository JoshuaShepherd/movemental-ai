import type { ComponentProps } from "react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";

import { AudienceLabel } from "./audience-label";

/** Label + display title + freeform body (stakes, orientation, authority intros). */
export function AudienceProseSection({
  id,
  variant = "default",
  spacing = "lg",
  label,
  title,
  titleAs: TitleTag = "h2",
  titleId,
  className,
  containerWidth = "default",
  children,
}: {
  id?: string;
  variant?: ComponentProps<typeof Section>["variant"];
  spacing?: "sm" | "lg";
  label: string;
  title: React.ReactNode;
  titleAs?: "h2" | "h3";
  titleId: string;
  className?: string;
  containerWidth?: "default" | "narrow" | "reading";
  children: React.ReactNode;
}) {
  return (
    <Section
      id={id}
      variant={variant}
      spacing={spacing}
      aria-labelledby={titleId}
      className={className}
    >
      <Container width={containerWidth}>
        <RevealOnScroll>
          <AudienceLabel>{label}</AudienceLabel>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.06}>
          <TitleTag
            id={titleId}
            className="max-w-[32ch] text-balance text-h2 text-foreground"
          >
            {title}
          </TitleTag>
        </RevealOnScroll>
        <RevealOnScroll delaySec={0.12} className="mt-8">
          <div className="max-w-prose space-y-4 text-lg leading-relaxed text-muted-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_strong]:font-medium [&_strong]:text-foreground">
            {children}
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
