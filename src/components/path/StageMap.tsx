import { stageMeta } from "./data/shared";

/**
 * StageMap — 4-up hairline-grid card overview of the four stages.
 *
 * Uses the tonal-stacking gap-px trick: outer surface is `bg-border`
 * (hairline color) with `gap-px`, inner cells are `bg-background`. No 1px
 * solid section borders.
 */
export function StageMap() {
  return (
    <nav
      aria-label="Path overview"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-card border border-border bg-border"
    >
      {stageMeta.map((stage) => (
        <a
          key={stage.num}
          href="#path"
          className="group relative block bg-background p-6 sm:p-7 transition-colors hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <span className="absolute right-5 top-5 text-[0.68rem] font-medium uppercase tracking-eyebrow text-ink-soft">
            {stage.protect}
          </span>
          <p className="font-serif italic text-ink-soft text-[1rem] leading-none mb-3">
            {stage.num} / 04
          </p>
          <h3 className="font-serif italic font-normal text-[clamp(1.5rem,2.2vw,1.85rem)] leading-none tracking-tight text-foreground mb-2">
            {stage.name}
          </h3>
          <p className="text-[0.92rem] leading-[1.5] text-muted-foreground max-w-[28ch]">
            {stage.mapDesc}
          </p>
        </a>
      ))}
    </nav>
  );
}
