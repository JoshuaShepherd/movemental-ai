import { cn } from "@/lib/utils";

/**
 * Tonal "Canon · Problem · 08 of 23" badge shown under the eyebrow on canon
 * detail pages. Same treatment is reused for series pieces
 * ("Series · Fragmentation · 02 of 04").
 *
 * No border, no background fill — hairline bottom rule instead, to keep the
 * midnight hero breathing.
 */
export function SeriesPositionBadge({
  kind,
  label,
  position,
  total,
  inverse,
  className,
}: {
  kind: "Canon" | "Series";
  /** Second segment — section name for canon, series name for series. */
  label: string;
  /** 1-based index in the sequence. */
  position: number;
  /** Total pieces in the sequence. */
  total: number;
  /** Render white-on-midnight when true (for article heroes). */
  inverse?: boolean;
  className?: string;
}) {
  const toneLabel = inverse ? "text-inverse-foreground/70" : "text-muted-foreground";
  const toneStrong = inverse ? "text-inverse-foreground" : "text-foreground";
  const rule = inverse ? "bg-inverse-foreground/25" : "bg-border";
  const padded = String(position).padStart(2, "0");
  const paddedTotal = String(total).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.74rem] font-medium uppercase tracking-eyebrow",
        toneLabel,
        className,
      )}
    >
      <span className={cn("font-semibold", toneStrong)}>{kind}</span>
      <span aria-hidden className={cn("h-3 w-px", rule)} />
      <span>{label}</span>
      <span aria-hidden className={cn("h-3 w-px", rule)} />
      <span className="tabular-nums">
        <span className={toneStrong}>{padded}</span> <span className="opacity-60">/ {paddedTotal}</span>
      </span>
    </div>
  );
}
