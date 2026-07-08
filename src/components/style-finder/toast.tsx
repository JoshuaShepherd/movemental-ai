"use client";

import { cn } from "@/lib/utils";

type StyleFinderToastProps = {
  message: string | null;
  visible: boolean;
};

export function StyleFinderToast({ message, visible }: StyleFinderToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-[calc(52px+12px)] left-1/2 z-50 -translate-x-1/2 rounded px-4 py-2 font-mono text-[0.72rem] tracking-wide",
        "bg-[var(--color-ink-band-ink)] text-[var(--color-ink-band-paper)] shadow-md transition-[opacity,transform] duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      {message ?? "Copied"}
    </div>
  );
}
