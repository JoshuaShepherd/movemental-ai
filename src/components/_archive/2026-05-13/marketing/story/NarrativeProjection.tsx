import { cn } from "@/lib/utils";

/**
 * NarrativeProjection — the closing statement that ties the story together.
 *
 * Not a chart, not a projection with fake numbers. Instead, a structured
 * "what this means" summary that connects the pieces: individual capacity
 * expansion → network compounding → the mission Movemental exists to serve.
 *
 * Designed to sit near the bottom of the story page as the final beat
 * before a CTA.
 */

export interface NarrativeProjectionProps {
  /** Individual-level summary (what one leader gets). */
  individualStatement?: string;
  /** Network-level summary (what the collective gets). */
  networkStatement?: string;
  /** The mission-level framing (why this matters beyond metrics). */
  missionStatement?: string;
  className?: string;
}

export function NarrativeProjection({
  individualStatement = "Each leader's realized capacity expands across five dimensions — not by the same amount, and not through the same mechanism. The system layers interact, and the order in which they're built shapes the outcome.",
  networkStatement = "At network scale, the system compounds. Shared infrastructure, cross-referenced corpora, multilingual replication, and collective AI grounding create effects that no single leader could produce alone.",
  missionStatement = "This is what Movemental builds toward: not a bigger platform, but a connected system where the work of formation is coherent, sustainable, and increasingly powerful over time.",
  className,
}: NarrativeProjectionProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {[
        { label: "For one leader", text: individualStatement },
        { label: "At network scale", text: networkStatement },
        { label: "The mission", text: missionStatement },
      ].map((block, i) => (
        <div key={block.label} className="flex gap-6">
          {/* Step marker — escalating tonal weight */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                i === 0 && "bg-section text-muted-foreground",
                i === 1 && "bg-elevated text-foreground",
                i === 2 && "bg-primary text-primary-foreground"
              )}
            >
              {i + 1}
            </div>
            {i < 2 && (
              <div className="mt-2 h-full w-px bg-elevated" aria-hidden />
            )}
          </div>

          <div className="pb-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              {block.label}
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              {block.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
