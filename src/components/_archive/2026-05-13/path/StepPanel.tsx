import type { ReactNode } from "react";

import { StepPanelEyebrow } from "./StepPanelEyebrow";

/**
 * StepPanel — wrapper for one of the four right-side scrolling panels.
 *
 * Hosts the eyebrow row, the "step-panel sentence" (with `<em>` rendered as
 * Instrument Serif italic via base styles), and a slot for the per-stage
 * content (Safety checklist, Sandbox flow, Skills 8-week, Solutions blueprint).
 */
export function StepPanel({
  index,
  name,
  sentence,
  panelId,
  children,
}: {
  index: number;
  name: string;
  /** Sentence body — supports `<em>` for italic-serif emphasis. */
  sentence: string;
  panelId: string;
  children: ReactNode;
}) {
  return (
    <article
      data-panel={index}
      id={panelId}
      className="flex flex-col justify-center min-h-[90vh] py-10 sm:py-14 lg:py-20 border-b border-border last:border-b-0 last:min-h-[80vh]"
    >
      <StepPanelEyebrow index={index} name={name} />
      <p
        className="font-sans font-normal text-foreground tracking-tight text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] max-w-[26ch] [&_em]:font-serif [&_em]:italic [&_em]:font-normal"
        dangerouslySetInnerHTML={{ __html: sentence }}
      />
      {children}
    </article>
  );
}
