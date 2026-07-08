"use client";

import { STEP_LABELS, totalSelected, WIZARD_PAGES } from "@/lib/visual-style-finder/constants";
import { cn } from "@/lib/utils";

type StepNavProps = {
  page: number;
  sel: Parameters<typeof totalSelected>[0];
  onStepClick: (index: number) => void;
};

export function StepNav({ page, sel, onStepClick }: StepNavProps) {
  const tally = totalSelected(sel);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[52px] items-center justify-between border-b border-[var(--color-ink-band-border)] bg-[color-mix(in_srgb,var(--color-ink-band-bg)_92%,transparent)] px-[clamp(12px,3vw,22px)] backdrop-blur-sm">
      <div className="whitespace-nowrap font-serif text-[1.05rem] font-semibold tracking-tight">
        Style&nbsp;Finder<span className="text-[var(--color-ink-band-blue)]">.</span>
      </div>

      <nav className="flex items-center gap-0.5" aria-label="Wizard steps">
        {WIZARD_PAGES.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => onStepClick(i)}
            className={cn(
              "flex items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] whitespace-nowrap transition-colors",
              i === page ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              i < page && "text-foreground",
            )}
          >
            <span
              className={cn(
                "grid size-[1.15rem] shrink-0 place-items-center rounded-full border text-[0.6rem]",
                i === page && "border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-blue)] text-white",
                i < page && "border-[var(--color-ink-band-blue)] text-[var(--color-ink-band-blue)]",
                i > page && "border-[var(--color-ink-band-border)] text-muted-foreground",
              )}
            >
              {i + 1}
            </span>
            <span className="hidden sm:inline">{STEP_LABELS[p]}</span>
          </button>
        ))}
      </nav>

      <div className="whitespace-nowrap font-mono text-[0.66rem] tracking-wide text-muted-foreground">
        <b className="text-[var(--color-ink-band-blue)]">{tally}</b> selected
      </div>
    </header>
  );
}
