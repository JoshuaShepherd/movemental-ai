# Page audit checklist

Use this for **any** marketing route under `src/app/(site)/`. Score each row: **Pass** / **Fix** / **N/A**. A page ships only when all applicable rows are **Pass**.

---

## A. Token compliance

- [ ] **A1** No raw hex or `rgb()` in TSX/CSS modules (except comments). Exception: none.
- [ ] **A2** No Tailwind default palette (`slate-*`, `gray-*`, `blue-*`, `zinc-*`, etc.) in marketing TSX.
- [ ] **A3** Surfaces use semantic tokens: `bg-background`, `bg-section`, `bg-card`, `bg-elevated`, `bg-inverse-surface`, etc.
- [ ] **A4** Text uses `text-foreground`, `text-muted-foreground`, `text-inverse-foreground` as appropriate to the band.
- [ ] **A5** Primary (`text-primary`, `bg-primary`) is reserved for actions, key links, and emphasis—not full-bleed backgrounds.
- [ ] **A6** Shadows: only `shadow-ambient` or none—no `shadow-md` / `shadow-lg` / arbitrary shadow utilities.
- [ ] **A7** No `class="dark"` on `<html>` for marketing pages; midnight is `Section variant="midnight"`.

---

## B. Primitive compliance

- [ ] **B1** Page-scale vertical bands use `Section` (not ad-hoc `div` with `py-24` unless documented exception).
- [ ] **B2** Horizontal constraint uses `Container` for primary content rail (`--container-max`).
- [ ] **B3** Hero / landmark headings use `Display` with appropriate `size` and `as` for heading order.
- [ ] **B4** Kickers use `Eyebrow` (possibly with pill classes)—not random `text-xs uppercase` without muted tone rules.
- [ ] **B5** Long body copy uses `Prose` (or article-specific wrapper still obeying muted body / primary link pattern).
- [ ] **B6** Editorial “continue” links use `ArrowLink` (or `Button link` variant)—not raw `Link` without `focus-visible` treatment.

---

## C. Component compliance

- [ ] **C1** Actions use `Button` from `@/components/ui/button`—not styled `<button>` duplicates.
- [ ] **C2** shadcn `Card` used only where ring/chrome matches intent (UI groupings)—not as a stand-in for marketing ghost cards unless intentional.
- [ ] **C3** Nav/footer not forked per page—chrome comes from layout.

---

## D. Spacing & rhythm

- [ ] **D1** Section vertical rhythm uses `Section` `spacing` prop (`sm`/`lg`) instead of one-off `py-20` / `py-28` unless hero exception.
- [ ] **D2** First section accounts for fixed nav (`pt-16` on `main` + optional `-mt-16` underlap)—no content hidden under `SiteNav`.
- [ ] **D3** Repeated gap scale: prefer `gap-8`–`gap-12` in grids, `gap-24` for major splits—avoid chaotic mixes without reason.

---

## E. Typography

- [ ] **E1** Heading order is semantic (`h1` once per page, then `h2`…)—`Display` `as` prop set correctly.
- [ ] **E2** No body text smaller than `text-sm` for core content (accessibility + editorial tone).
- [ ] **E3** Light weights on large display supporting copy are paired with sufficient line-height (`leading-relaxed` / `leading-snug` as appropriate).

---

## F. Surface rhythm & structure

- [ ] **F1** No decorative `border-t` / `border-b` / `divide-y` between major sections.
- [ ] **F2** Alternation of `Section` variants creates clear bands (not two adjacent identical variants unless intentional).
- [ ] **F3** Midnight bands use inverse text helpers (`text-inverse-foreground*`)—no low-contrast gray on `inverse-surface`.

---

## G. Hierarchy & CTA coherence

- [ ] **G1** Each major section has an obvious headline (or intentional absence for pure proof).
- [ ] **G2** At most **one** primary `Button` action per viewport “moment” (hero, closing band).
- [ ] **G3** Secondary paths are visually secondary (`outline`, `ArrowLink`, muted text).
- [ ] **G4** CTA labels are verb-led and match nav CTA intent where appropriate (“Start a Conversation”).

---

## H. Proof placement

- [ ] **H1** Claims that need credibility appear **before** aggressive asks (or closing band repeats proof line).
- [ ] **H2** Screenshots / logos have alt text and constrained aspect—no distorted `Image`.
- [ ] **H3** If using lists as proof, scannable structure (icons optional; don’t rely on icon-only meaning).

---

## I. Scroll fatigue & complexity

- [ ] **I1** Page does not repeat the same narrative job in multiple sections (merge duplicates).
- [ ] **I2** Icon+title grids are not the **only** pattern for 6+ sections in a row—break with tone or media.
- [ ] **I3** Sticky sidebars used only when opposite column is long enough to scroll.

---

## J. Responsiveness

- [ ] **J1** Mobile single-column layouts preserve readable measure (no full-bleed tiny type).
- [ ] **J2** Tap targets ≥ 44px where interactive (`min-h-11`, button heights, nav links).
- [ ] **J3** `Image` uses `sizes` for `fill` layouts.

---

## K. Motion & a11y

- [ ] **K1** Custom animations respect `prefers-reduced-motion` (globals.css handles broad collapse; custom JS must too).
- [ ] **K2** Focus visible on all interactive elements (keyboard tab through hero, nav, cards).
- [ ] **K3** `aria-hidden` on decorative icons and connectors.

---

## L. Visual drift & “should this be rebuilt?”

- [ ] **L1** If a section’s class string exceeds ~15 utilities **and** duplicates an existing homepage section’s job → **rebuild from approved section** or extract shared component.
- [ ] **L2** If colors differ subtly from token ramp (“almost #f8f8f8”) → remap to tokens.
- [ ] **L3** Stitch comment header present → verify screen ID still matches `docs/build/stitch-screens.md` when that doc is maintained.

---

## Audit output template

```text
Route: /path
Date:
Auditor:

Summary: X Pass, Y Fix, Z N/A

Fix list (ordered):
1. …
2. …
```

---

## Related docs

- [`tokens.md`](./tokens.md) — token meanings
- [`layouts.md`](./layouts.md) — composition arcs
- [`migration-notes.md`](./migration-notes.md) — known debt to ignore vs fix
