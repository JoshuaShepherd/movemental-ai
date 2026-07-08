"use client";

import { useCallback, useEffect, useRef } from "react";

import { buildSummaryText } from "@/lib/visual-style-finder/utils/export";
import { generatePalette } from "@/lib/visual-style-finder/utils/palette-generator";

import { ColorsStep } from "./colors-step";
import { FooterBar } from "./footer-bar";
import { ImagesStep } from "./images-step";
import { rawCopyText } from "./clipboard";
import { ResultsStep } from "./results-step";
import { StepNav } from "./step-nav";
import { StyleFinderToast } from "./toast";
import { TemplatesStep } from "./templates-step";
import { TypographyStep } from "./typography-step";
import { useToast } from "./use-toast";
import { useWizardState } from "./use-wizard-state";

export function StyleFinderWizard() {
  const { state, dispatch, currentStep } = useWizardState();
  const { message, visible, toast } = useToast();
  const stageRef = useRef<HTMLElement>(null);

  const onCopied = useCallback((label: string) => toast(label), [toast]);

  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0 });
  }, [state.page]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (currentStep !== "colors" || state.colorMode !== "generate") return;
      if (e.code !== "Space" && e.key !== " ") return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      e.preventDefault();
      dispatch({
        type: "SET_GEN",
        gen: generatePalette(state.genFamily, state.gen),
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStep, state.colorMode, state.gen, state.genFamily, dispatch]);

  const copySummary = async () => {
    try {
      await rawCopyText(buildSummaryText(state.sel));
      toast("Selections copied");
    } catch {
      toast("Copy failed");
    }
  };

  return (
    <div className="h-dvh overflow-hidden bg-[var(--color-ink-band-bg)] text-foreground">
      <StepNav
        page={state.page}
        sel={state.sel}
        onStepClick={(i) => dispatch({ type: "SET_PAGE", page: i })}
      />

      <main
        ref={stageRef}
        aria-live="polite"
        className="absolute inset-x-0 top-[52px] bottom-[52px] overflow-y-auto overflow-x-hidden p-2.5 scroll-smooth"
      >
        {currentStep === "typography" ? (
          <TypographyStep
            selected={state.sel.type}
            activeType={state.activeType}
            onSetActive={(id) => dispatch({ type: "SET_ACTIVE_TYPE", id })}
            onToggle={(id) => dispatch({ type: "TOGGLE", kind: "type", id })}
            onCopied={onCopied}
          />
        ) : null}

        {currentStep === "templates" ? (
          <TemplatesStep
            selected={state.sel.templates}
            onToggle={(id) => dispatch({ type: "TOGGLE", kind: "templates", id })}
            onCopied={onCopied}
          />
        ) : null}

        {currentStep === "images" ? (
          <ImagesStep
            selected={state.sel.images}
            onToggle={(id) => dispatch({ type: "TOGGLE", kind: "images", id })}
            onCopied={onCopied}
          />
        ) : null}

        {currentStep === "colors" ? (
          <ColorsStep
            selected={state.sel.palettes}
            colorMode={state.colorMode}
            genFamily={state.genFamily}
            gen={state.gen}
            generated={state.sel.generated}
            onColorModeChange={(mode) => dispatch({ type: "SET_COLOR_MODE", mode })}
            onGenFamilyChange={(family) => dispatch({ type: "SET_GEN_FAMILY", family })}
            onGenChange={(gen) => dispatch({ type: "SET_GEN", gen })}
            onToggle={(id) => dispatch({ type: "TOGGLE", kind: "palettes", id })}
            onSaveGenerated={() => {
              if (!state.gen.length) return;
              dispatch({
                type: "ADD_GENERATED",
                palette: {
                  id: `gen${Date.now()}`,
                  nm: `Generated ${String(state.sel.generated.length + 1).padStart(2, "0")}`,
                  c: state.gen.map((c) => c.hex.toUpperCase()),
                  roles: state.gen.map((c) => c.role),
                },
              });
              toast("Saved to results");
            }}
            onCopied={onCopied}
          />
        ) : null}

        {currentStep === "results" ? <ResultsStep sel={state.sel} onCopied={onCopied} /> : null}
      </main>

      <FooterBar
        page={state.page}
        currentStep={currentStep}
        colorMode={state.colorMode}
        sel={state.sel}
        onBack={() => dispatch({ type: "PREV" })}
        onNext={() => dispatch({ type: "NEXT" })}
        onReset={() => dispatch({ type: "RESET" })}
        onCopySummary={() => void copySummary()}
      />

      <StyleFinderToast message={message} visible={visible} />
    </div>
  );
}
