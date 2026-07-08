import type { WizardStep } from "./types";

export const WIZARD_PAGES: WizardStep[] = ["typography", "templates", "images", "colors", "results"];

export const SELECTION_STEPS = WIZARD_PAGES.filter((p) => p !== "results") as Exclude<
  WizardStep,
  "results"
>[];

export const STEP_LABELS: Record<string, string> = {
  approaches: "Approaches",
  typography: "Typography",
  templates: "Templates",
  images: "Images",
  colors: "Colors",
  palettes: "Colors",
  generator: "Colors",
  results: "Results",
};

export function stepKey(step: Exclude<WizardStep, "results">): string {
  const idx = SELECTION_STEPS.indexOf(step);
  return `Step ${idx + 1} of ${SELECTION_STEPS.length}`;
}

export function stepNum(step: Exclude<WizardStep, "results">): number {
  return SELECTION_STEPS.indexOf(step) + 1;
}

export function totalSelected(sel: {
  type: Set<string>;
  templates: Set<string>;
  images: Set<string>;
  palettes: Set<string>;
  generated: unknown[];
}): number {
  return sel.type.size + sel.templates.size + sel.images.size + sel.palettes.size + sel.generated.length;
}
