import { cn } from "@/lib/utils";

import type { SystemLayer } from "../ui/types";
import { SYSTEM_LAYERS } from "../ui/types";

/**
 * SequenceFlow — communicates that the order of operations matters.
 *
 * Renders the eight system layers in build sequence as a vertical
 * flow with connecting lines. Each step includes the layer name,
 * a brief rationale for its position in the sequence, and an
 * optional note about what it unlocks for the next layer.
 *
 * The visual rhythm is vertical (not a horizontal timeline) because
 * this content reads top-to-bottom on every viewport.
 */

export interface SequenceStep {
  layer: SystemLayer;
  /** Why this layer comes at this point in the sequence. */
  rationale: string;
  /** What this layer unlocks for the layers that follow. */
  unlocks?: string;
}

export interface SequenceFlowProps {
  steps?: SequenceStep[];
  className?: string;
}

const DEFAULT_STEPS: SequenceStep[] = [
  {
    layer: SYSTEM_LAYERS[0], // Books
    rationale:
      "The corpus comes first — everything downstream depends on having structured, searchable source material.",
    unlocks: "Provides the grounding layer for transcripts, articles, and AI.",
  },
  {
    layer: SYSTEM_LAYERS[1], // Media
    rationale:
      "Existing talks and interviews are already out there. Organizing them creates immediate credibility surface area.",
    unlocks: "Becomes the raw material for transcripts.",
  },
  {
    layer: SYSTEM_LAYERS[2], // Transcripts
    rationale:
      "Spoken content becomes textual — suddenly discoverable, citable, and usable by AI.",
    unlocks: "Feeds the article layer and trains the AI grounding layer.",
  },
  {
    layer: SYSTEM_LAYERS[3], // Articles
    rationale:
      "Evergreen articles are the primary entry point for search and AI citation. They must be built on the corpus, not invented from scratch.",
    unlocks: "Creates the organic traffic that pathways convert into formation.",
  },
  {
    layer: SYSTEM_LAYERS[4], // Pathways
    rationale:
      "Now there is enough structured content to curate meaningful learning sequences.",
    unlocks: "Establishes the formation architecture that courses formalize.",
  },
  {
    layer: SYSTEM_LAYERS[5], // Courses
    rationale:
      "Courses add time, community, and assessment to what pathways introduced. They are the primary revenue layer.",
    unlocks: "Generates the revenue that sustains the system.",
  },
  {
    layer: SYSTEM_LAYERS[6], // AI
    rationale:
      "A grounded AI layer needs the full corpus, transcripts, and articles to speak accurately. Built too early, it hallucinates.",
    unlocks: "Multiplies discoverability and makes the corpus conversational.",
  },
  {
    layer: SYSTEM_LAYERS[7], // Translations
    rationale:
      "Translation multiplies the entire system into new language markets — but only after the system is coherent in the original language.",
  },
];

export function SequenceFlow({
  steps = DEFAULT_STEPS,
  className,
}: SequenceFlowProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical connecting line */}
      <div
        className="absolute left-[15px] top-4 bottom-4 w-px bg-elevated sm:left-[19px]"
        aria-hidden
      />

      <ol className="relative space-y-8">
        {steps.map((step, i) => (
          <li key={step.layer.id} className="relative pl-12 sm:pl-14">
            {/* Step marker */}
            <div
              className={cn(
                "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10 sm:text-sm",
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-section text-muted-foreground"
              )}
            >
              {i + 1}
            </div>

            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {step.layer.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.rationale}
            </p>
            {step.unlocks && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Unlocks:</span>{" "}
                {step.unlocks}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
