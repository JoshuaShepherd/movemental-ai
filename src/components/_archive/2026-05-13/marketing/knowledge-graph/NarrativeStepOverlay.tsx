"use client";

import { cn } from "@/lib/utils";

export function NarrativeStepOverlay({
  title,
  lede,
  callout,
  active,
  reducedMotion,
}: {
  title: string;
  lede: string;
  callout: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 rounded-md border border-border bg-card/95 p-4 shadow-ambient backdrop-blur-sm transition-opacity duration-500",
        active ? "opacity-100" : "opacity-0",
        reducedMotion && "transition-none",
      )}
      role="status"
      aria-live="polite"
    >
      <p className="text-xs font-medium uppercase tracking-eyebrow text-primary">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{lede}</p>
      <p className="mt-2 border-t border-border pt-2 text-sm text-muted-foreground">
        {callout}
      </p>
    </div>
  );
}
