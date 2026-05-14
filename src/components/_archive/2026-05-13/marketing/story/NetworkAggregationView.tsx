import { cn } from "@/lib/utils";

/**
 * NetworkAggregationView — the "at ~100 leaders" moment.
 *
 * Communicates how shared infrastructure can compound beyond a single
 * tenant: community effects, discoverability, and product maturity—
 * not Metcalfe-style open-scale "network effects."
 */

export interface NetworkEffect {
  label: string;
  description: string;
}

export interface NetworkAggregationViewProps {
  /** Number of leaders in the network. */
  leaderCount?: number;
  /** Shared-infrastructure effects to highlight (bounded cohort, not infinite scale). */
  effects?: NetworkEffect[];
  className?: string;
}

const DEFAULT_EFFECTS: NetworkEffect[] = [
  {
    label: "Shared product maturity",
    description:
      "Guardrails, evaluation, and retrieval patterns improve for every tenant as the product hardens—without commingling private corpora into one model.",
  },
  {
    label: "Cross-referencing",
    description:
      "Related ideas surface across leaders when structure, linking, and permissions make those relationships legible—not because an algorithm silently fuses everyone's work.",
  },
  {
    label: "Translation economies",
    description:
      "Infrastructure for one language translation serves every leader on the rails. Marginal cost for an additional leader in an existing language stays low.",
  },
  {
    label: "Ecosystem legibility",
    description:
      "Outbound linking, shared standards, and machine-readable structure can improve discoverability—while human credibility still lives in relationships and peer recognition.",
  },
];

export function NetworkAggregationView({
  leaderCount = 100,
  effects = DEFAULT_EFFECTS,
  className,
}: NetworkAggregationViewProps) {
  /* Generate a grid of dots to represent leaders. Cap at 100 for rendering. */
  const dotCount = Math.min(leaderCount, 100);
  const gridCols = Math.ceil(Math.sqrt(dotCount));

  return (
    <div className={cn("space-y-10", className)}>
      {/* Dot field */}
      <div className="flex flex-col items-center gap-6">
        <div
          className="inline-grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: dotCount }).map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary/70"
              style={{
                /* Subtle variation so the field reads as organic, not mechanical */
                opacity: 0.4 + (((i * 7 + 3) % 10) / 10) * 0.6,
              }}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-foreground">
          {leaderCount} leaders
        </p>
      </div>

      {/* Shared infrastructure at bounded scale */}
      <div className="grid gap-6 sm:grid-cols-2">
        {effects.map((effect) => (
          <div key={effect.label} className="rounded-xl bg-card p-6">
            <h4 className="text-sm font-semibold text-foreground">
              {effect.label}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {effect.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
