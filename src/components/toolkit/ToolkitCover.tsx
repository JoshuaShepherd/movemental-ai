import { cn } from "@/lib/utils";

/**
 * Typographic toolkit cover (Option A from the implementation prompt).
 *
 * Cream surface, eyebrow above, italic display title, hairline rule, and a
 * small subtitle below. Renders as a flat 2D book cover — no images, all
 * tokens — so it stays crisp at any size and theme-tracks via semantic
 * variables.
 */
export function ToolkitCover({ className, size = "lg" }: { className?: string; size?: "sm" | "lg" }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden bg-section text-foreground shadow-ambient",
        className,
      )}
      role="img"
      aria-label='"It Starts With Safety" — a 16-page Movemental field guide'
    >
      <div className="pointer-events-none absolute inset-3 border border-border" aria-hidden />
      <div className={cn("flex w-full flex-col items-center px-6 text-center", size === "lg" ? "gap-6" : "gap-3")}>
        <span
          className={cn(
            "block font-medium uppercase tracking-eyebrow text-muted-foreground",
            size === "lg" ? "text-[11px]" : "text-[9px]",
          )}
        >
          Movemental Field Guide
        </span>
        <h3
          className={cn(
            "font-serif-display italic leading-[0.92] tracking-tight",
            size === "lg" ? "text-4xl md:text-[2.75rem]" : "text-2xl",
          )}
        >
          It Starts<br />With Safety
        </h3>
        <span
          className={cn("block h-px w-10 bg-border", size === "lg" ? "my-2" : "my-1")}
          aria-hidden
        />
        <p
          className={cn(
            "max-w-[18ch] text-muted-foreground",
            size === "lg" ? "text-xs" : "text-[10px]",
          )}
        >
          A sixteen-page protocol for organizational leaders.
        </p>
      </div>
      <span
        className={cn(
          "absolute bottom-6 text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground",
        )}
        aria-hidden
      >
        Stage 01
      </span>
    </div>
  );
}
