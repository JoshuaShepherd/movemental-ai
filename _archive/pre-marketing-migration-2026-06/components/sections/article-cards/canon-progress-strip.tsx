import { cn } from "@/lib/utils";

/**
 * Typographic "progress strip" rendered below the hero on canon detail pages.
 * Shows position in the 23-piece staircase as a typographic mark instead of a
 * filled bar — Concept Modern / DESIGN.md §17: no decorative graphics.
 */
export function CanonProgressStrip({
  current,
  total = 23,
  className,
}: {
  /** 1-based canon order. */
  current: number;
  total?: number;
  className?: string;
}) {
  const dots: Array<{ i: number; active: boolean }> = Array.from({ length: total }, (_, i) => ({
    i: i + 1,
    active: i + 1 === current,
  }));

  return (
    <div
      role="presentation"
      className={cn(
        "flex items-center gap-3 font-medium uppercase tracking-eyebrow text-ink-soft",
        "text-[0.72rem]",
        className,
      )}
    >
      <span className="tabular-nums text-foreground">
        {String(current).padStart(2, "0")}
      </span>
      <span aria-hidden className="flex flex-1 items-center gap-[0.2rem] text-ink-soft/60">
        {dots.map(({ i, active }) => (
          <span
            key={i}
            className={cn(
              "h-px transition-colors duration-normal",
              active ? "w-6 bg-foreground" : "w-1 bg-ink-soft/40",
            )}
          />
        ))}
      </span>
      <span className="tabular-nums">{String(total).padStart(2, "0")}</span>
    </div>
  );
}
