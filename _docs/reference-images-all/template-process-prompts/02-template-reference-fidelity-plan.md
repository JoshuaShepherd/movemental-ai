# Template Reference Fidelity Plan

## Overview

This document is a **full prompted solution** to the issues identified in the template differentiation and reference-fidelity thread. It addresses:

1. **Color and typography** — Templates sharing one palette and font family (e.g. all movement-leader variants using `--mvmt-*` and Geist only) so they resemble each other instead of their reference images.
2. **Spacing, effects, and component treatment** — Same spacing scale, radius, shadows, and button/card styling across variants, further reducing differentiation.
3. **Layout and imagery** — Same proportions, grid, and image treatment instead of matching each reference’s structure and style.
4. **Lack of reconciliation** — No per-variant design extraction or “reconciliation note” before building, so reference style is not retained.

The plan uses the **archived reference images** in `_docs/reference-archive/` as the source of truth. Each template variant is revised or built so it **retains the style of its corresponding archived reference** via per-variant tokens, reconciliation notes, and the cohesive-design checklist.

**Input**: Archived reference images + manifests in `_docs/reference-archive/{page-type}/`  
**Output**: Per-variant design tokens, reconciliation notes, and template components that match reference style (color, typography, spacing, effects, layout, imagery).

---

## Reference to Archived Images

### Where to Look

- **Archive root**: `_docs/reference-archive/`
- **By page type**: `_docs/reference-archive/{page-type}/` (e.g. `books-page/`, `testimonials-page/`, `assessments-page/`, `reader-page/`, `search-page/`, `about-page/`, `auth-page/`, `cta-page/`, `special-page/`, `articles/`, `content-page/`, `courses-page/`, `landing-page/`, `lead-magnet-page/`, `pricing-page/`, `faq-page/`, `chatbot-page/`, `orgs-page/`).
- **Manifest**: Each page-type folder has a `manifest.json` that maps:
  - `archived_as` (e.g. `books-product-showcase-01.png`) → `template_path` (e.g. `components/layouts/movement-leader/books-product-showcase.tsx`) and `variant_id`.

### How to Use the Archive in This Plan

1. **Before revising or building a template**: Open the archived image for that variant (e.g. `_docs/reference-archive/books-page/books-product-showcase-01.png`).
2. **Extract design from the reference**: Note primary/secondary/accent colors, font style (serif vs sans, weight), spacing density (tight vs airy), radius (sharp vs pill), shadows (flat vs elevated), layout proportions, and image treatment.
3. **Reconciliation note**: Document these choices in a short note (see Phase 2) so the implementation matches the reference.
4. **Token and component work**: Implement using per-variant tokens and the checklist in Phase 4.

Manifest fields like `reference` (when present) describe the original app/source and help interpret the image.

---

## Problem Summary (From Thread)

| Issue | Current State | Desired State |
|-------|----------------|----------------|
| **Color** | One shared palette per template family (e.g. `--mvmt-*` for all movement-leader variants). | Per-variant palette (or per–lead-reference) from `_docs/_guides/color-palettes-2026.md`, scoped so each variant matches its reference. |
| **Typography** | One font setup per family (e.g. Geist only for movement-leader). | Per-variant font pairing from `_docs/_guides/typography-2026.md`; serif/sans mix where the reference has it. |
| **Spacing** | Same scale (e.g. `p-4`, `gap-6`, `py-12`) across variants. | Per-variant spacing tokens derived from reference (tight vs relaxed rhythm). |
| **Effects** | Same radius and shadow scale everywhere. | Per-variant radius and shadow tokens from reference (flat vs soft vs strong shadow). |
| **Layout** | Same grid, hero height, section order. | Proportions and structure from reference (column ratios, density, section order). |
| **Components** | Same button/card/link treatment. | Button shape (pill vs rect), card style (border vs shadow), link treatment from reference. |
| **Imagery** | Same aspect ratios and placement. | Image treatment from reference (split, full-bleed, grid, shadow, radius). |
| **Documentation** | No reconciliation note per variant. | Short reconciliation note per variant; cohesive-design checklist before lock. |
| **Isolation** | Template body sometimes uses global tokens. | Template body uses only template-prefixed tokens (see [Template Styling Isolation](../template-styling-isolation.md)). |

---

## Phase 1: Audit Current State (Optional)

Use this phase to see which variants already have reference-specific tokens and which do not.

### Step 1.1: List Variants and Their References

For each page type that has archived references:

1. Read `_docs/reference-archive/{page-type}/manifest.json`.
2. Build a table: `variant_id` | `archived_as` | `template_path` | `reference` (if in manifest).
3. Note which `template_path` values are `null` (reference not yet implemented).

### Step 1.2: Check Token Usage in Components

For each `template_path` that exists:

1. Open the component file.
2. Search for: `--mvmt-*`, `--assess-*`, `--chat-*`, or global tokens like `bg-primary`, `text-foreground`, `rounded-lg`, `shadow-md`, hardcoded hex/rgb.
3. Record: Does this variant use **only** a template-prefixed token set for colors, typography, spacing, and effects? Or does it share family-wide tokens and/or global utilities?

### Step 1.3: Check globals.css for Per-Variant Tokens

1. Open `app/globals.css`.
2. Confirm: Today, tokens are defined per **template family** (e.g. `.template-movement-leader { --mvmt-* }`), not per **variant** (e.g. no `.template-movement-leader--product-showcase` or variant-specific overrides).
3. Note: Implementing per-variant fidelity will require either **(a)** variant-specific CSS classes and token blocks, or **(b)** a single “family” block that gets overridden per route/variant via data attributes or wrapper classes. The plan below uses **(b)** with variant-level overrides where needed.

**Output**: A short audit table or list of which page types/variants need token and component revisions.

---

## Phase 2: Per-Variant Design Extraction From Archived References

For **each** template variant that should match a reference (using the manifest’s `archived_as` → image path):

### Step 2.1: Open the Archived Reference Image

- Path: `_docs/reference-archive/{page-type}/{archived_as}` (e.g. `_docs/reference-archive/books-page/books-product-showcase-01.png`).
- View the image and, if helpful, the manifest’s `reference` text for context (e.g. “Apple Shop Mac - horizontal scrollable product cards”).

### Step 2.2: Fill a Reconciliation Note (Design Extraction)

Create or update a reconciliation note for this variant. Store it in a predictable place (e.g. `_docs/reference-archive/{page-type}/reconciliation-{variant_id}.md` or a single `reconciliation-notes.md` with a section per variant). Include:

**Color**

- Primary background and surface (hex or describe).
- Text: primary, secondary, muted.
- Accent/CTA color.
- Border color and opacity.
- Map to a palette from `_docs/_guides/color-palettes-2026.md` (palette ID + primary/secondary/tertiary/accent), or list custom hex values if no exact match.

**Typography**

- Heading style: serif vs sans; weight (e.g. bold, semibold).
- Body style: font and weight.
- Relative scale: is the headline much larger than body, or only slightly?
- Map to a pairing from `_docs/_guides/typography-2026.md` (pairing ID + heading/body fonts).

**Spacing**

- Section padding (tight / medium / generous).
- Card/internal padding.
- Gaps between cards and between sections.
- Choose base unit (e.g. 4px or 8px) and list key values (e.g. section py: 48px, card p: 24px, gap: 16px).

**Effects**

- Corner radius: none / small / medium / large / pill. List for buttons, cards, inputs.
- Shadows: none / subtle / medium / strong. List for cards and elevated elements.
- Borders: none / thin / medium; color treatment.

**Layout**

- Hero/section proportions (e.g. 50/50 split, 60/40, full-bleed).
- Grid: columns and gaps for cards/lists.
- Section order and density (how much content per fold).

**Components**

- Button: shape (pill vs rounded-rect), fill vs outline, hover (color change vs lift).
- Cards: flat vs elevated, border vs shadow, radius.
- Links: underline vs no underline, accent vs neutral.

**Imagery**

- Placement: split, full-bleed, grid, sidebar.
- Aspect ratio(s) and dominant size.
- Treatment: shadow, radius, overlay, border.

### Step 2.3: Lead Reference and Borrowings (If Multiple References)

If this page type was built from several references (e.g. one “lead” for layout and others for patterns):

- State which archived image is the **lead** for this variant (layout, proportions, spatial rhythm).
- List any **borrowings** (e.g. “card style from books-minimal-grid”) and note that they must be restyled to match the lead’s spacing, type, color, and effects (see [Cohesive Design From Multiple References](../design-system/cohesive-design-from-references.md)).

**Output**: One reconciliation note per variant, linked from the manifest or stored next to the archive.

---

## Phase 3: Token Strategy (Per-Variant Color, Typography, Spacing, Effects)

Templates must remain isolated: use only template-prefixed tokens for template body content ([Template Styling Isolation](../template-styling-isolation.md)). To support per-variant reference fidelity without infinite CSS blocks, use one of these approaches.

### Option A: Variant-Specific Wrapper Class (Recommended for High Fidelity)

- Define a wrapper class per variant, e.g. `template-movement-leader template-movement-leader--product-showcase`.
- In `app/globals.css`, under `.template-movement-leader`, add blocks like:
  - `.template-movement-leader--product-showcase { /* overrides for this variant */ }`
- In the variant’s page or layout, ensure the wrapper includes the variant modifier when that variant is active.
- Override only what differs: e.g. `--mvmt-primary`, `--mvmt-accent`, `--mvmt-font-display`, `--mvmt-font-body`, `--mvmt-radius-md`, `--mvmt-shadow-card`, `--mvmt-spacing-section`.

**Palette and fonts**: Set overrides from the reconciliation note; palette values from `_docs/_guides/color-palettes-2026.md`, fonts from `_docs/_guides/typography-2026.md`. Ensure required fonts are loaded in `app/layout.tsx`.

### Option B: Data Attribute + Single Family Block

- Use a data attribute on the template wrapper, e.g. `data-variant="product-showcase"`.
- In CSS: `.template-movement-leader[data-variant="product-showcase"] { /* overrides */ }`.
- Same override list as in Option A; only the selector mechanism differs.

### Step 3.1: Define or Extend Tokens in globals.css

For each variant that gets its own look:

1. Add a block (Option A or B) that sets at least:
   - **Color**: primary, secondary, accent, surface, text-primary, text-secondary, text-muted, border (from reconciliation note / palette guide).
   - **Typography**: font-heading, font-body; optional type scale if different from family default.
   - **Spacing**: section, card, gap (from reconciliation note).
   - **Effects**: radius-sm/md/lg, shadow-card, shadow-elevated (from reconciliation note).
2. Keep token names under the same family prefix (e.g. `--mvmt-*`) so existing components keep working; overrides change the values when the variant wrapper/attribute is present.

### Step 3.2: Ensure No Global Token Bleed

- Template body content must not rely on Shadcn/global tokens (`--primary`, `--background`, etc.) for the template’s look. Replace with template-prefixed tokens.
- Use global tokens only for intentional shared UI (e.g. nav, modals, app shell).

**Output**: Updated `app/globals.css` with per-variant overrides and, if needed, new font imports in `app/layout.tsx`.

---

## Phase 4: Implementation Workflow (Build or Revise Template)

When **building** a new template or **revising** an existing one to match its archived reference:

### Step 4.1: Use the Reconciliation Note

- Read the reconciliation note for this variant (from Phase 2).
- Ensure tokens (Phase 3) reflect that note (palette, fonts, spacing, effects).

### Step 4.2: Layout and Proportions From Reference

- Structure sections and columns to match the reference (hero height, split ratio, grid columns, section order).
- Use spacing tokens from the reconciliation note for padding and gaps (e.g. `py-[var(--mvmt-spacing-section)]`, `gap-[var(--mvmt-spacing-gap)]`).

### Step 4.3: Component Styling From Reference

- Buttons: use radius and shadow from the note (e.g. pill vs rounded-rect; flat vs shadow).
- Cards: match border vs shadow and radius.
- Links: match underline and color treatment.
- Use only template-prefixed tokens (e.g. `bg-[var(--mvmt-surface)]`, `rounded-[var(--mvmt-radius-md)]`).

### Step 4.4: Imagery From Reference

- Follow [Hero Template Image Revision](hero-template-image-revision.md) where applicable (hero variants).
- Match placement (split, full-bleed, grid), aspect ratio, and treatment (shadow, radius).
- Use author images from `public/media-library/` and match style (dark/B&W vs light/casual) to the reference mood.

### Step 4.5: Copy and Movement Leader Context

- Keep copy in movement leader context (see [Mobbin Design Implementation](mobbin-design-implementation.md) Phase 5.2). Do not reintroduce generic e-commerce or generic app copy.

### Step 4.6: Cohesive-Design Checklist Before Lock

Before marking the template done, run through ([Cohesive Design From Multiple References](../design-system/cohesive-design-from-references.md)):

- [ ] **Spacing**: Same base unit and rhythm in all main sections (from this variant’s tokens)?
- [ ] **Typography**: One clear hierarchy; no orphaned font sizes or weights?
- [ ] **Color**: Backgrounds, text, and accents follow this variant’s token set?
- [ ] **Components**: Buttons, cards, and links match the reference (radius, weight, hover)?
- [ ] **Lead reference**: Would the reference’s designer recognize this as a coherent variation?

- [ ] **Contrast**: Body text and muted text on their backgrounds meet WCAG AA (or documented exception). No hardcoded low-contrast opacity (e.g. `text-white/60`) for body text; use tokens.

**Output**: Template component(s) that use only template-prefixed tokens and match the archived reference in color, typography, spacing, effects, layout, and imagery.

**If templates still look the same or contrast issues appear:** See [Template Fidelity Diagnosis](template-fidelity-diagnosis.md) for common causes (variant not on wrapper, partial overrides, no contrast check).

---

## Phase 5: Per-Template Revision Workflow (Using the Archive)

Use this workflow when executing the plan on **existing** templates that already have a corresponding archived reference.

### Step 5.1: Select Page Type and Variant

- Pick a page type (e.g. books, testimonials, assessments).
- From `_docs/reference-archive/{page-type}/manifest.json`, pick one `variant_id` whose `template_path` is not null.

### Step 5.2: Load Reference and Reconciliation

1. Open the archived image: `_docs/reference-archive/{page-type}/{archived_as}`.
2. Open or create the reconciliation note for this variant (Phase 2).
3. If the note is missing, complete Phase 2 (design extraction) for this variant first.

### Step 5.3: Add or Update Tokens

1. If the variant does not yet have its own token overrides, add a block in `app/globals.css` (Option A or B from Phase 3).
2. Set color, typography, spacing, and effects from the reconciliation note; pull palette and font pairing from the 2026 guides where applicable.
3. Ensure the template’s page or layout applies the variant wrapper class or data attribute when this variant is active.

### Step 5.4: Revise Component to Match Reference

1. Open the component at `template_path`.
2. Replace any global or hardcoded styles with template-prefixed tokens.
3. Adjust layout (proportions, grid, section order) to match the reference.
4. Adjust components (buttons, cards, links) to match the reconciliation note.
5. Adjust imagery (placement, aspect ratio, treatment) to match the reference.

### Step 5.5: Run Checklist and Lock

- Run the cohesive-design checklist (Phase 4.6).
- If anything fails, fix in the template; do not defer to “we’ll fix it in customization.”
- Optionally update the manifest to add `reconciliation_note` path or `palette_id` / `typography_id` for traceability.

Repeat Step 5.1–5.5 for each variant you want to bring to reference fidelity.

---

## Phase 6: Avoiding Over-Normalization

When reusing patterns across variants or borrowing from a second reference:

- **Do**: Extract the **pattern** (e.g. “card with image + title + meta”) and **restyle** it to the **lead reference’s** spacing, type, color, and effects.
- **Do not**: Reuse the same component with the same radius, shadow, and padding everywhere; that makes all variants look alike.
- **Do**: Use variant-specific tokens so the same structural pattern can look tight and flat in one variant and generous and elevated in another.
- Document borrowings in the reconciliation note so future edits keep the lead reference as the source of truth.

---

## Execution Checklists

### Master Checklist (Full Plan)

- [ ] Phase 1: Audit completed (optional); list of variants needing work is clear.
- [ ] Phase 2: Reconciliation notes exist for all variants that should match a reference; notes include color, typography, spacing, effects, layout, components, imagery.
- [ ] Phase 3: Per-variant token overrides added in `app/globals.css` (and fonts in `app/layout.tsx` where needed); no template body uses global tokens for template-specific look.
- [ ] Phase 4: Implementation workflow applied to each new or revised template; layout, components, and imagery match reconciliation note.
- [ ] Phase 5: Revision workflow applied to each targeted existing variant; each passes cohesive-design checklist.
- [ ] Phase 6: Borrowings and pattern reuse documented; variants use variant-specific tokens, not one shared component style.

### Per-Variant Checklist

- [ ] Archived reference image opened and used as source of truth.
- [ ] Reconciliation note created/updated (color, typography, spacing, effects, layout, components, imagery).
- [ ] Palette and font pairing selected from 2026 guides and documented; fonts loaded if new.
- [ ] Token overrides added for this variant in `globals.css`; wrapper class or data attribute applied when variant is active.
- [ ] Component uses only template-prefixed tokens; layout and proportions match reference.
- [ ] Buttons, cards, links match reference (shape, shadow, radius).
- [ ] Imagery placement, aspect ratio, and treatment match reference.
- [ ] Cohesive-design checklist passed before lock.

---

## Related Documentation

| Doc | Purpose |
|-----|---------|
| [Template Fidelity Diagnosis](template-fidelity-diagnosis.md) | Why templates looked the same and contrast issues appeared; fixes and checklist updates. |
| [Template Styling Isolation](../template-styling-isolation.md) | Token prefix per template family; no global bleed for template body. |
| [Cohesive Design From Multiple References](../design-system/cohesive-design-from-references.md) | Lead reference, reconciliation, checklist. |
| [Mobbin Design Implementation](mobbin-design-implementation.md) | End-to-end template build workflow; palette and typography selection. |
| [Hero Template Image Revision](hero-template-image-revision.md) | Image prominence and treatment for hero variants. |
| [Reference Image Archive](../reference-image-archive.md) | Active vs archive paths; manifest and naming. |
| [Color Palettes 2026](../_guides/color-palettes-2026.md) | Curated palettes for per-variant color. |
| [Typography 2026](../_guides/typography-2026.md) | Curated font pairings for per-variant typography. |

---

## Archive Layout Quick Reference

```
_docs/reference-archive/
├── about-page/
├── articles/
├── assessments-page/
├── auth-page/
├── books-page/
├── chatbot-page/
├── content-page/
├── courses-page/
├── cta-page/
├── faq-page/
├── landing-page/
├── lead-magnet-page/
├── orgs-page/
├── pricing-page/
├── reader-page/
├── search-page/
├── special-page/
├── testimonials-page/
└── {page-type}/
    ├── manifest.json    # archived_as → template_path, variant_id, reference
    ├── {page-type}-{descriptor}-01.png
    └── ...
```

Use `manifest.json` in each folder to map archived images to template components and to drive the per-variant reconciliation and revision workflow above.
