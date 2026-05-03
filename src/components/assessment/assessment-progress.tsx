"use client";

import { cn } from "@/lib/utils";

const BAR_SEGMENTS = 28;

type Props = {
  /** 0–1 filled portion. */
  progress: number;
  leftLabel: string;
  rightLabel: string;
  className?: string;
};

/**
 * Restrained segmented progress rail used by the integrity diagnostic.
 * Pure visual — no question-state logic lives here.
 */
export function AssessmentProgress({ progress, leftLabel, rightLabel, className }: Props) {
  const filled = Math.min(1, Math.max(0, progress));
  const activeCount = Math.round(filled * BAR_SEGMENTS);

  return (
    <div className={cn("mb-8 w-full", className)}>
      <div
        className="flex h-1 w-full gap-1.5"
        role="progressbar"
        aria-valuenow={Math.round(filled * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: BAR_SEGMENTS }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-full min-w-0 flex-1 rounded-full transition-colors duration-normal ease-out",
              i < activeCount ? "bg-primary" : "bg-elevated",
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 text-[10px] font-bold uppercase tracking-eyebrow">
        <span className="text-primary">{leftLabel}</span>
        <span className="text-muted-foreground">{rightLabel}</span>
      </div>
    </div>
  );
}
