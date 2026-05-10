"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Reusable display of the four stages of the Movemental Path. Used on the
 * homepage, segment pages (churches/nonprofits/institutions), and the Pathway
 * overview page. Stage numbering is two-digit; public stage names:
 *
 *   01 Safety
 *   02 Sandbox
 *   03 Skills
 *   04 Solutions
 */

export type PathwayStageShort = "Safety" | "Sandbox" | "Skills" | "Solutions";

export interface PathwayStop {
  num: "01" | "02" | "03" | "04";
  name: PathwayStageShort;
  outcome: string;
  href: string;
}

export const DEFAULT_PATHWAY_STOPS: readonly PathwayStop[] = [
  {
    num: "01",
    name: "Safety",
    outcome: "Your AI policy, drafted and board-ready.",
    href: "/pathway/safety",
  },
  {
    num: "02",
    name: "Sandbox",
    outcome: "Use cases proven, risks documented.",
    href: "/pathway/sandbox",
  },
  {
    num: "03",
    name: "Skills",
    outcome: "Your team trained to lead this work.",
    href: "/pathway/skills",
  },
  {
    num: "04",
    name: "Solutions",
    outcome: "Your intelligence integrated, activated, multiplied.",
    href: "/pathway/solutions",
  },
];

interface PathwayComponentProps {
  /**
   * The four stops in stage order. Defaults to the canonical homepage outcomes.
   * Pass segment-specific outcomes via the same shape.
   */
  stops?: readonly PathwayStop[];
  /**
   * Index (0-3) of the stop currently being detailed below the component.
   * When set, that card receives the active state.
   */
  activeIndex?: number;
  /** Optional small line shown above the row of cards. */
  contextLine?: string;
  className?: string;
}

export function PathwayComponent({
  stops = DEFAULT_PATHWAY_STOPS,
  activeIndex,
  contextLine,
  className,
}: PathwayComponentProps) {
  return (
    <div className={cn("w-full", className)}>
      {contextLine ? (
        <p className="mb-8 max-w-(--prose-max) font-serif text-xl italic leading-snug tracking-tight text-foreground md:mb-10 md:text-2xl">
          {contextLine}
        </p>
      ) : null}

      <ol
        aria-label="The Movemental Path"
        className="grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-4 md:gap-x-0"
      >
        {stops.map((stop, idx) => {
          const isActive = activeIndex === idx;
          const isLast = idx === stops.length - 1;
          return (
            <li
              key={stop.num}
              className={cn(
                "relative flex",
                !isLast && "md:pr-px",
              )}
            >
              <Link
                href={stop.href}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group relative flex w-full flex-col gap-3 border-t-2 py-6 pr-6 transition-[color,border-color,opacity] duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-border text-foreground/90 hover:border-foreground/40",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      "text-xs font-medium uppercase tracking-eyebrow",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {stop.num}
                  </span>
                  <span className="text-lg font-semibold tracking-tight md:text-xl">
                    {stop.name}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {stop.outcome}
                </p>

                {/* Forward-motion connector to the next stage. */}
                {!isLast ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-px top-6 hidden h-px w-6 translate-x-full bg-border md:block"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
