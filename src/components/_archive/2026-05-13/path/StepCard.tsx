"use client";

import { cn } from "@/lib/utils";

import { stageMeta } from "./data/shared";

/**
 * StepCard — the active rail card. On desktop (≥960px), all four cards stack
 * absolutely on top of each other; only the matching `activeIndex` is
 * visible (opacity + transform). On mobile they render in normal flow with
 * a hairline divider between them.
 */
export function StepCard({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      {stageMeta.map((stage, i) => {
        const isActive = i === activeIndex;
        return (
          <article
            key={stage.num}
            aria-live={isActive ? "polite" : undefined}
            className={cn(
              // mobile flow — stacked with hairline divider
              "relative",
              i > 0 &&
                "max-[959px]:mt-8 max-[959px]:pt-8 max-[959px]:border-t max-[959px]:border-border",
              // desktop sticky stack — absolute, only active visible
              "min-[960px]:absolute min-[960px]:top-0 min-[960px]:left-0 min-[960px]:right-0",
              "min-[960px]:transition-[opacity,transform] min-[960px]:duration-500 min-[960px]:ease-out",
              "min-[960px]:will-change-[opacity,transform]",
              isActive
                ? "min-[960px]:opacity-100 min-[960px]:translate-y-0 min-[960px]:pointer-events-auto"
                : "min-[960px]:opacity-0 min-[960px]:translate-y-[18px] min-[960px]:pointer-events-none",
            )}
          >
            <div className="font-serif italic font-normal text-foreground leading-[0.9] tracking-[-0.04em] text-[clamp(4rem,9vw,7.5rem)] mb-5 block">
              {stage.num}
              <span className="text-[0.42em] text-ink-soft italic ml-[0.4em] align-[0.55em]">
                /04
              </span>
            </div>
            <h3 className="font-sans font-medium tracking-display text-foreground leading-none text-[clamp(2.4rem,4.4vw,3.6rem)] mb-5">
              <em>{stage.name}</em>
            </h3>
            <p className="font-serif italic font-normal text-foreground text-[clamp(1.15rem,1.5vw,1.35rem)] leading-[1.4] max-w-[24ch] mb-6">
              {stage.tagline}
            </p>
          </article>
        );
      })}
    </>
  );
}
