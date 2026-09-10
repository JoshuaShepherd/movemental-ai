# FSM-01: Safety Stage Route (`/agent/path/safety`)

**ID:** FSM-01  
**Phase:** Tier 1 — Core Public Anchors  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/agent/path/safety/page.tsx`  
- Staging components: `src/v2/components/safety/safety-stage-content.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Safety Stage.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Per decision **L-1** (`docs/handoff/03-decisions.md`), `/agent/path/safety` is the only genuinely new public route in this entire migration. Multiple existing screens and components in the repo link to `/agent/path/safety`.

Build this surface in high fidelity from `Movemental Safety Stage.dc.html`, composing layout, typography, and interactive disclosure states using Ink Band tokens. Ground the content in the repo's existing safety data files—do not invent a new data file.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Safety Stage.dc.html` (authoritative for markup, copy, and layout)
- `docs/handoff/03-decisions.md` (§L-1)
- `src/lib/agent-room/data/safety-charter.ts` (five charter layers: Principles, Boundaries, Protocol, Review, Escalation)
- `src/lib/agent-room/data/safety-flow.ts` (stage definitions and flow steps)
- `src/lib/agent-room/data/pricing.ts` (pricing references)
- `src/lib/agent-room/data/faq.ts` (safety FAQs)
- `src/lib/agent-room/naming.ts` (canonical stage names)

---

## 3. Anti-Invention & Design Constraints

- **L-1:** Content must be sourced from existing data modules (`safety-charter.ts`, `pricing.ts`, etc.). Do NOT invent copy or a separate data store.
- **L-4:** Zero hex literals in TSX files. Translate every color using `04-component-map.md`:
  - Background: `var(--color-ink-band-bg)` / `bg-background`
  - Cards/Paper: `var(--color-ink-band-paper)` / `bg-card`
  - Ink primary: `var(--color-ink-band-ink)` / `text-foreground`
  - Muted ink: `var(--color-ink-band-ink-muted)` / `text-muted-foreground`
  - Blue accent: `var(--color-ink-band-blue)`
  - Marker swipe: `var(--color-ink-band-highlight)`
- **Header & Mast:** Wordmark on the left, crumb navigation on the right (`height: 3.6rem`).
- **Notebook rule:** 1.5px vertical margin line in `var(--color-ink-band-margin-red)` at 32% opacity with content clear of it.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Read `docs/handoff/designs/Movemental Safety Stage.dc.html` to extract the full section hierarchy:
     - Header / Mast with back link and breadcrumbs
     - Hero section: Eyebrow ("STAGE 02 · GOVERNANCE"), Playfair display headline, lede paragraph, Caveat cursive margin note
     - The Five Charter Layers (layered cards with layer number, title, charter commitments)
     - Artifact Publication preview (how safety docs are published and shared)
     - Pricing / Sprint callout ($1,000 Safety sprint / Free start clarity)
     - Accordion FAQ section for safety questions
     - Footer / Navigation to next stage
2. **Build Staging Component:**
   - Author `src/v2/components/safety/safety-stage-content.tsx` importing data from `src/lib/agent-room/data/safety-charter.ts` and `src/lib/agent-room/data/faq.ts`.
   - Ensure all interactive items (e.g. FAQ disclosure) are accessible and functional.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/agent/path/safety/page.tsx` rendering `<SafetyStageContent />` with proper metadata (`title: "Safety Stage | Movemental"`, canonical tag).
4. **Zero-Hex & Type Validation:**
   - Run grep to ensure 0 hex values. Run `pnpm typecheck`.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/agent/path/safety/page.tsx` renders at `http://localhost:3000/v2/agent/path/safety`.
- [ ] Visual parity matches `Movemental Safety Stage.dc.html` 1-to-1.
- [ ] Content pulls from `src/lib/agent-room/data/safety-charter.ts` without inventing copy.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/safety/ src/app/\(site-v2\)/v2/agent/path/safety/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-01
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
