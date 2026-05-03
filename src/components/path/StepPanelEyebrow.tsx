import { cn } from "@/lib/utils";

/**
 * StepPanelEyebrow — the "Stage 0X of 04 · <name>" row above each panel
 * sentence. 4 dots indicate progress (passed / active / future).
 */
export function StepPanelEyebrow({
  index,
  name,
}: {
  /** 0-based stage index. */
  index: number;
  /** Display name ("Safety", "Sandbox", …). */
  name: string;
}) {
  return (
    <p className="inline-flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground mb-6">
      <span aria-hidden="true" className="inline-flex items-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "inline-block w-1.5 h-1.5 rounded-full transition-colors",
              i < index
                ? "bg-foreground"
                : i === index
                  ? "bg-foreground"
                  : "bg-border",
            )}
          />
        ))}
      </span>
      Stage {String(index + 1).padStart(2, "0")} of 04
      <span className="font-serif italic normal-case tracking-normal text-foreground text-[0.95rem]">
        {name}
      </span>
    </p>
  );
}
