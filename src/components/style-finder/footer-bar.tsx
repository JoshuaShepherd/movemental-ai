"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { totalSelected, WIZARD_PAGES } from "@/lib/visual-style-finder/constants";
import type { ColorMode, WizardStep } from "@/lib/visual-style-finder/types";

type FooterBarProps = {
  page: number;
  currentStep: WizardStep;
  colorMode: ColorMode;
  sel: Parameters<typeof totalSelected>[0];
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
  onCopySummary: () => void;
};

export function FooterBar({
  page,
  currentStep,
  colorMode,
  sel,
  onBack,
  onNext,
  onReset,
  onCopySummary,
}: FooterBarProps) {
  const counts: Partial<Record<WizardStep, number>> = {
    typography: sel.type.size,
    templates: sel.templates.size,
    images: sel.images.size,
  };

  let hint: ReactNode;
  if (currentStep === "colors") {
    hint =
      colorMode === "generate" ? (
        <>
          press <b>space</b> or Generate · lock a swatch to keep it while you roll · Save to keep
        </>
      ) : (
        <>
          <b>{sel.palettes.size}</b> selected · pick as many as you like · copy icon → Stitch
        </>
      );
  } else if (currentStep !== "results") {
    hint = (
      <>
        <b>{counts[currentStep] ?? 0}</b> selected · pick as many as you like · copy icon → Stitch
      </>
    );
  } else {
    hint = (
      <>
        <b>{totalSelected(sel)}</b> selected in total
      </>
    );
  }

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 flex h-[52px] items-center justify-between gap-3 border-t border-[var(--color-ink-band-border)] bg-[color-mix(in_srgb,var(--color-ink-band-bg)_92%,transparent)] px-[clamp(12px,3vw,22px)] backdrop-blur-sm">
      <div className="min-w-0 truncate text-[0.78rem] text-muted-foreground">{hint}</div>
      <div className="flex shrink-0 items-center gap-2">
        {page > 0 ? (
          <Button type="button" variant="ghost" size="sm" onClick={onBack}>
            Back
          </Button>
        ) : null}
        {currentStep !== "results" ? (
          <Button type="button" variant="primary" size="sm" onClick={onNext}>
            {page === WIZARD_PAGES.length - 2 ? "See results" : "Continue"}
          </Button>
        ) : (
          <>
            <Button type="button" variant="ghost" size="sm" onClick={onReset}>
              Start over
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={onCopySummary}>
              Copy selections
            </Button>
          </>
        )}
      </div>
    </footer>
  );
}
