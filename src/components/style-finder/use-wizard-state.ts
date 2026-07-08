"use client";

import { useCallback, useReducer } from "react";

import { WIZARD_PAGES } from "@/lib/visual-style-finder/constants";
import type { ColorFamilyId, ColorMode, GenColumn, GeneratedPalette, SelectionState, WizardStep } from "@/lib/visual-style-finder/types";

export type WizardAction =
  | { type: "SET_PAGE"; page: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESET" }
  | { type: "SET_COLOR_MODE"; mode: ColorMode }
  | { type: "SET_ACTIVE_TYPE"; id: string }
  | { type: "TOGGLE"; kind: keyof SelectionState; id: string }
  | { type: "SET_GEN_FAMILY"; family: ColorFamilyId | "any" }
  | { type: "SET_GEN"; gen: GenColumn[] }
  | { type: "ADD_GENERATED"; palette: GeneratedPalette }
  | { type: "REMOVE_GENERATED"; index: number };

export type WizardStore = {
  page: number;
  sel: SelectionState;
  colorMode: ColorMode;
  activeType: string;
  genFamily: ColorFamilyId | "any";
  gen: GenColumn[];
};

const emptySel = (): SelectionState => ({
  type: new Set(),
  templates: new Set(),
  images: new Set(),
  palettes: new Set(),
  generated: [],
});

const initialState: WizardStore = {
  page: 0,
  sel: emptySel(),
  colorMode: "curated",
  activeType: "tp01",
  genFamily: "ink",
  gen: [],
};

function toggleSet(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

function wizardReducer(state: WizardStore, action: WizardAction): WizardStore {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: Math.max(0, Math.min(action.page, WIZARD_PAGES.length - 1)) };
    case "NEXT":
      return { ...state, page: Math.min(state.page + 1, WIZARD_PAGES.length - 1) };
    case "PREV":
      return { ...state, page: Math.max(state.page - 1, 0) };
    case "RESET":
      return { ...initialState, sel: emptySel() };
    case "SET_COLOR_MODE":
      return { ...state, colorMode: action.mode };
    case "SET_ACTIVE_TYPE":
      return { ...state, activeType: action.id };
    case "TOGGLE": {
      const kind = action.kind;
      if (kind === "generated") return state;
      const sel = { ...state.sel };
      sel[kind] = toggleSet(sel[kind] as Set<string>, action.id);
      return { ...state, sel };
    }
    case "SET_GEN_FAMILY":
      return { ...state, genFamily: action.family };
    case "SET_GEN":
      return { ...state, gen: action.gen };
    case "ADD_GENERATED":
      return { ...state, sel: { ...state.sel, generated: [...state.sel.generated, action.palette] } };
    case "REMOVE_GENERATED":
      return {
        ...state,
        sel: {
          ...state.sel,
          generated: state.sel.generated.filter((_, i) => i !== action.index),
        },
      };
    default:
      return state;
  }
}

export function useWizardState() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const currentStep = WIZARD_PAGES[state.page]!;

  const goToStep = useCallback((step: WizardStep) => {
    const idx = WIZARD_PAGES.indexOf(step);
    if (idx >= 0) dispatch({ type: "SET_PAGE", page: idx });
  }, []);

  return { state, dispatch, currentStep, WIZARD_PAGES };
}
