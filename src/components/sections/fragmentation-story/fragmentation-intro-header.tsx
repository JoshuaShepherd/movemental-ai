import type { ReactNode } from "react";

import { Container } from "@/components/primitives/container";
import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";

type Props = {
  /** Small label above the headline — lets each route self-identify. */
  eyebrow: ReactNode;
  /** Optional block rendered below the canonical copy (e.g. permalinks, notes). */
  secondary?: ReactNode;
};

/**
 * Canonical heading for every `/fragmentation*` route.
 * The copy is intentionally identical across variants so the problem statement
 * doesn't drift between parallel versions of the narrative.
 */
export function FragmentationIntroHeader({ eyebrow, secondary }: Props) {
  return (
    <Section id="intro" variant="midnight" spacing="lg" className="scroll-mt-16">
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-4 text-inverse-foreground/60">{eyebrow}</Eyebrow>
            <Display
              as="h1"
              size="sm"
              className="text-balance text-inverse-foreground"
            >
              The informational and relational intelligence supporting your organizational or
              movement leadership work is{" "}
              <em className="not-italic text-pathway-accent">fragmented</em>.
            </Display>
          </div>
          <div className="min-w-0 max-w-prose space-y-5 text-inverse-foreground/80">
            <p className="wrap-break-word text-lg leading-relaxed">
              What you know and have created is scattered across books, websites, documents,
              videos, podcasts, and more.
            </p>
            <p className="wrap-break-word text-lg leading-relaxed">
              Who you know is spread across platforms, conversations, inboxes and memory.
            </p>
            <div className="space-y-2 border-l border-inverse-foreground/20 pl-4 text-inverse-foreground/90">
              <p className="text-lg leading-snug font-medium">So nothing works together.</p>
              <p className="text-lg leading-snug font-medium">Nothing compounds.</p>
              <p className="text-lg leading-snug font-medium">
                And neither people, Google, nor AI can fully understand or extend your work.
              </p>
            </div>
            {secondary ? <div className="pt-1">{secondary}</div> : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
