# Template Reference Second Pass (Cleanup & Fidelity)

## Overview

This prompt is a **utility for another pass** through a chosen group or section of templates. Use it when:

- The [Template Reference Fidelity Plan](template-reference-fidelity-plan.md) missed something for specific variants.
- Not all pages or templates were covered by the main plan.
- You want to **clean up** and **further implement** reference-image style for a subset of templates (e.g. one page type, or only “detail” variants, or a short list of variant IDs).
- A template exists but still doesn’t match its archived reference after a first pass.

The workflow is **reference-image first**: open the archived reference again, compare it to the current implementation, then fix gaps (color, typography, spacing, effects, layout, components, imagery) while keeping **movement leader content** (copy, author names, network names, vocabulary).

**Input**: A **scoped set** of templates (by page type and/or variant IDs) + archived reference images in `_docs/reference-archive/`.  
**Output**: Updated components and optional token/reconciliation updates so the scoped templates better match their reference images with movemental content preserved.

---

## When to Use This Prompt

| Situation | Use This Prompt |
|-----------|------------------|
| Main plan didn’t cover all variants | Yes — scope to the uncovered page types/variants and run the second pass. |
| A template still looks off after the main plan | Yes — scope to that variant (or its page type) and do another pass with the reference. |
| You want to improve only one page type (e.g. testimonials) | Yes — scope to that page type and run the pass on all its variants. |
| You want to improve only “detail” or “hero” style variants | Yes — scope to those variant IDs and run the pass. |
| Full first-time implementation from scratch | Prefer the [Template Reference Fidelity Plan](template-reference-fidelity-plan.md); use this for cleanup after or for gaps. |

---

## Scope: Choosing a Group or Section of Templates

Before starting, define **which** templates are in scope.

### Option A: By Page Type

- Choose one or more page types (e.g. `testimonials-page`, `books-page`, `assessments-page`).
- All variants in that page type’s manifest (with a non-null `template_path`) are in scope.

### Option B: By Variant List

- Choose a list of `variant_id` values (e.g. `["product-showcase", "detail-split", "minimal-grid"]`).
- Only those variants are in scope; get their `template_path` and `archived_as` from the manifest(s).

### Option C: By Category or Pattern

- Choose a category (e.g. “all detail templates”, “all dark themes”, “all hero variants”).
- From the relevant manifest(s), list the `variant_id` and `template_path` that match; those are in scope.

**Output**: A clear list of in-scope items: each with `page_type`, `variant_id`, `archived_as`, `template_path`. Use `_docs/reference-archive/{page_type}/manifest.json` to build this list.

---

## Reference Images (Archive)

- **Archive root**: `_docs/reference-archive/`
- **By page type**: `_docs/reference-archive/{page-type}/` (e.g. `testimonials-page/`, `books-page/`).
- **Manifest**: `_docs/reference-archive/{page-type}/manifest.json` — maps `archived_as` → `template_path`, `variant_id`, and optional `reference`.

For each in-scope variant, the reference image path is:  
`_docs/reference-archive/{page-type}/{archived_as}`.

---

## Second-Pass Workflow

Do the following **for each in-scope variant**. Order can be by page type then variant, or by priority.

### Step 1: Open Reference and Implementation Side by Side

1. Open the archived reference image: `_docs/reference-archive/{page-type}/{archived_as}`.
2. Open the current implementation: the file at `template_path` (e.g. `components/layouts/movement-leader/books-product-showcase.tsx`).
3. If a reconciliation note exists (e.g. from the main plan), open it: `_docs/reference-archive/{page-type}/reconciliation-{variant_id}.md` or the shared reconciliation notes file.

### Step 2: Compare Reference vs Implementation

Compare reference and implementation and note **gaps** in:

| Dimension | What to check |
|-----------|----------------|
| **Color** | Background, surface, text primary/secondary/muted, accent, borders. Does the implementation use the right palette or tokens? |
| **Typography** | Font (serif vs sans), weights, heading/body hierarchy. Does it match the reference? |
| **Spacing** | Section padding, card padding, gaps. Is the rhythm tighter or looser than the reference? |
| **Effects** | Radius (buttons, cards, inputs), shadows (flat vs elevated), borders. |
| **Layout** | Column ratios, grid columns/gaps, section order, hero/section height. |
| **Components** | Button shape (pill vs rect), card style (border vs shadow), link treatment (underline, color). |
| **Imagery** | Placement (split, full-bleed, grid), aspect ratio, size, shadow/radius/overlay. |

List concrete gaps (e.g. “Reference has pill buttons; implementation has rounded-rect” or “Reference uses larger section padding”).

### Step 3: Preserve Movement Leader Content

- **Do not** change copy to generic or non-movement language. Keep movement leader vocabulary (discipleship, multiplication, movement catalyst, books/courses/podcasts, network names, author names).
- **Do** fix style only: colors, fonts, spacing, effects, layout, component styling, image treatment.
- If the reference suggests a different tone (e.g. more formal wording), adapt within movement leader context; do not copy the reference’s product or app copy verbatim.

See [Mobbin Design Implementation](mobbin-design-implementation.md) Phase 5.2 for movement leader copy rules.

### Step 4: Implement Fixes

1. **Tokens**: If the gap is color, typography, spacing, or effects, add or adjust per-variant tokens in `app/globals.css` (see [Template Reference Fidelity Plan](template-reference-fidelity-plan.md) Phase 3). Ensure the variant’s wrapper class or data attribute is applied when this variant is active.
2. **Layout**: Adjust markup and classes so proportions, grid, and section order match the reference (use template-prefixed tokens for spacing).
3. **Components**: Update button, card, and link styling to match the reference (radius, shadow, border).
4. **Imagery**: Adjust placement, aspect ratio, and treatment (shadow, radius) to match the reference; keep using author images from `public/media-library/` and movement-appropriate style.
5. **Template-prefixed tokens only**: Do not use global Shadcn tokens (`--primary`, `--background`, etc.) for template body content; use the template’s prefix (e.g. `--mvmt-*`). See [Template Styling Isolation](../template-styling-isolation.md).

### Step 5: Update Reconciliation Note (If Exists)

If the variant has a reconciliation note, update it to reflect any new decisions (e.g. “Button: pill, shadow-sm” or “Section padding: 48px”). If no note exists and you made non-obvious choices, add a short note or a few lines in a shared doc so future passes stay consistent.

### Step 6: Run Cohesive-Design Checklist

Before marking the variant done for this pass:

- [ ] **Spacing**: Base unit and rhythm match the reference in main sections.
- [ ] **Typography**: Clear hierarchy; no orphaned sizes/weights.
- [ ] **Color**: Backgrounds, text, accents follow the reference (and tokens).
- [ ] **Components**: Buttons, cards, links match reference (shape, shadow, radius).
- [ ] **Reference**: Would the reference’s designer recognize this as a coherent variation?
- [ ] **Content**: Movement leader copy and vocabulary preserved.

If anything fails, fix it in the template.

---

## Execution Checklist (This Pass)

- [ ] Scope defined: list of in-scope variants with `page_type`, `variant_id`, `archived_as`, `template_path`.
- [ ] For each in-scope variant:
  - [ ] Reference image opened; implementation and optional reconciliation note opened.
  - [ ] Comparison done; gaps listed (color, typography, spacing, effects, layout, components, imagery).
  - [ ] Movement leader content preserved; only style and structure changed.
  - [ ] Fixes implemented (tokens, layout, components, imagery); template-prefixed tokens only.
  - [ ] Reconciliation note updated or created if needed.
  - [ ] Cohesive-design checklist passed.

---

## Relation to the Main Plan

- **Main plan**: [Template Reference Fidelity Plan](template-reference-fidelity-plan.md) — full solution (audit, reconciliation notes, token strategy, implementation and revision workflows). Use it for broad, first-pass coverage.
- **This prompt**: Second pass on a **chosen group or section** of templates. Use it to clean up and further implement reference style when the main plan missed something or didn’t cover all pages/templates, and to keep movemental content intact.

Both use the same archive (`_docs/reference-archive/`), the same cohesion checklist, and the same rule: template body uses only template-prefixed tokens and movement leader copy.
