# Assessments / Quiz Templates - Completion Prompt

## Objective

Polish the assessments template set. This is the most complete category — 15 variants with a populated manifest. Focus is on fidelity reconciliation and style cleanup.

## Current State

**15 variants implemented:**
assessments-avatar-survey, assessments-binary-choice, assessments-dark-floating, assessments-dark-intro, assessments-hubspot-duplicate, assessments-long-form, assessments-modal-quiz, assessments-mood-gradient, assessments-nps-scale, assessments-progress-quiz, assessments-scale-options, assessments-section-intro, assessments-template-picker, assessments-udemy-quiz, assessments-visual-cards

**Switcher:** `components/layouts/movement-leader/assessments-template-switcher.tsx`
**Route:** `app/templates/movement-leader/assessments/page.tsx`
**Manifest:** `_docs/reference-archive/assessments/manifest.json` (complete)

**Reference sources:** Framer, HubSpot, Headspace, Hims, WeTransfer, Kajabi, Typeform, Udemy, HoneyBook

## Reference Images

Located in `_docs/reference-images-all/` with prefix `assessments-*` (~15 images). All mapped in the existing manifest.

## Required Work

### 1. Fidelity Reconciliation Pass

This category has the manifest but may not have gone through the full fidelity pass. For each of the 15 variants:

1. Open the reference image listed in `_docs/reference-archive/assessments/manifest.json`
2. Compare to the running component
3. Follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md`
4. Document and fix gaps
5. Verify against `00-iron-clad-rules.md` checklist

### 2. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate all inline `style={{}}` to Tailwind utilities. This category likely has the highest density of inline styles given it was built early.

### 3. Token Override Audit

Verify every variant has a `[data-variant="assess-*"]` block in `globals.css` with appropriate token overrides. Cross-reference the manifest sources (Headspace = soft gradients, HubSpot = clean corporate, etc.) to ensure tokens match the design language.

### 4. Export Verification

Confirm all 15 variants are exported from `index.ts` and the switcher type union is complete.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/assessments-*.tsx` |
| Template switcher | `components/layouts/movement-leader/assessments-template-switcher.tsx` |
| Page route | `app/templates/movement-leader/assessments/page.tsx` |
| Manifest | `_docs/reference-archive/assessments/manifest.json` |
| Reference images | `_docs/reference-images-all/assessments-*` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
