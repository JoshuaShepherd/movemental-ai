"use client";

import { cn } from "@/lib/utils";

import { stageMeta } from "./data/shared";

/**
 * PathMeter — vertical 1px ink track with four interactive ticks.
 *
 * `activeIndex` is the current stage (0-3). `progress` (0-1) drives the
 * height of the ink fill bar. Ticks are buttons; clicking one calls
 * `onJump(i)` so the parent can scrollIntoView the matching panel.
 */
export function PathMeter({
  activeIndex,
  progress,
  onJump,
}: {
  activeIndex: number;
  /** 0-1 — fraction of the path section scrolled through. */
  progress: number;
  onJump: (index: number) => void;
}) {
  return (
    <div
      role="navigation"
      aria-label="Path stages"
      className="hidden min-[960px]:block absolute inset-y-0 left-0 w-px"
    >
      {/* track */}
      <span aria-hidden="true" className="absolute inset-0 bg-border" />
      {/* ink fill — height bound to scroll progress */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-px bg-foreground origin-top transition-[height] duration-300 ease-out"
        style={{ height: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
      />

      {stageMeta.map((stage, i) => {
        const top = (i / (stageMeta.length - 1)) * 100;
        const isActive = i === activeIndex;
        const isPassed = i < activeIndex;
        return (
          <button
            key={stage.num}
            type="button"
            aria-label={`Jump to ${stage.name}`}
            title={stage.name}
            onClick={() => onJump(i)}
            style={{ top: `${top}%` }}
            className={cn(
              "absolute -left-[7px] w-[15px] h-[15px] -translate-y-1/2 rounded-full border cursor-pointer transition-[background,border-color,transform] duration-200 ease-out",
              "focus-visible:outline-2 focus-visible:outline focus-visible:outline-foreground focus-visible:outline-offset-2",
              isActive
                ? "bg-foreground border-foreground scale-[1.3]"
                : isPassed
                  ? "bg-foreground border-foreground"
                  : "bg-background border-ink-soft hover:border-foreground hover:scale-110",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full transition-colors duration-200",
                isActive || isPassed ? "bg-background" : "bg-ink-soft",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
