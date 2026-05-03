"use client";

import { PathMeter } from "./PathMeter";
import { StepCard } from "./StepCard";

/**
 * PathRail — left sticky rail surface that hosts the meter + active step
 * card. On desktop (≥960px) this becomes the visible "card" with subtle
 * radial-gradient overlay; on mobile the rail flattens to inline flow.
 */
export function PathRail({
  activeIndex,
  progress,
  onJump,
}: {
  activeIndex: number;
  progress: number;
  onJump: (index: number) => void;
}) {
  return (
    <aside aria-hidden="false" className="relative">
      <div
        className="
          relative
          min-[960px]:sticky min-[960px]:top-[var(--site-header-height,4.25rem)]
          min-[960px]:h-[calc(100vh-var(--site-header-height,4.25rem))]
          min-[960px]:py-12 min-[960px]:px-8
          min-[960px]:bg-section min-[960px]:rounded-card min-[960px]:border min-[960px]:border-border
          overflow-hidden
        "
      >
        {/* subtle radial wash on the rail surface — desktop only */}
        <span
          aria-hidden="true"
          className="hidden min-[960px]:block absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(25,21,15,0.04),transparent_60%)]"
        />

        <div className="relative h-full flex flex-col justify-center">
          <PathMeter
            activeIndex={activeIndex}
            progress={progress}
            onJump={onJump}
          />
          <div className="relative min-[960px]:pl-9 min-[960px]:min-h-[60vh]">
            <StepCard activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </aside>
  );
}
