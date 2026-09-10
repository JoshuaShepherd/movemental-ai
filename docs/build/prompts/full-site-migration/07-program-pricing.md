# FSM-07: Program & Pricing (`/program`)

**ID:** FSM-07  
**Phase:** Tier 2 — Commercial & Decision Surfaces  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/program/page.tsx`  
- Staging components: `src/v2/components/program/program-page-content.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Program.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Program & Pricing surface clearly lays out the Movemental engagement tiers (Assessment, Safety Sprint, Institutional Deployment), pricing structures, and answers key administrative/commercial questions.

Build the candidate screen in `src/app/(site-v2)/v2/program/` matching `Movemental Program.dc.html` 1-to-1 while importing the exact pricing and FAQ data from `src/lib/agent-room/data/pricing.ts` and `faq.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Program.dc.html` (authoritative layout, comparison table, and copy)
- `src/lib/agent-room/data/pricing.ts` (pricing tiers, sprint costs, deliverables)
- `src/lib/agent-room/data/faq.ts` (commercial FAQ items)
- `src/lib/agent-room/data/safety-flow.ts` (stage definitions)
- `src/app/program/page.tsx` (existing route implementation)

---

## 3. Anti-Invention & Design Constraints

- **No new pricing numbers:** Pricing copy and numbers must be character-for-character identical to `pricing.ts`. Never hardcode new prices or modify `pricing.ts`.
- **Honesty constraint:** Transparent, flat pricing with no artificial scarcity countdowns or urgency banners.
- **L-4:** Zero hex in TSX files:
  - Tier cards: `var(--color-ink-band-paper)`
  - Recommended tier highlight: `var(--color-ink-band-blue)` outline with `var(--color-ink-band-highlight)` marker swipe
  - Border: `var(--color-ink-band-border)`
- **Native Accordion:** Use clean semantic accordion tags (`<details>/<summary>` or Radix Accordion) for the FAQ section.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Program.dc.html`:
     - Header / Mast: Fixed `3.6rem` with crumb navigation
     - Program Overview: Eyebrow, Playfair headline, value proposition
     - Pricing Tiers Grid: Three structured cards (Reality Check, Safety Sprint, Scenius Cohort)
     - Deliverables Comparison Table: Feature matrix across tiers
     - FAQ Accordion: Pre-populated questions from `faq.ts`
     - Bottom CTA: Link to `/enroll`
2. **Build Program Content Component:**
   - Author `src/v2/components/program/program-page-content.tsx` importing from `pricing.ts` and `faq.ts`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/program/page.tsx`.
4. **Verification:**
   - Ensure `git diff src/lib/agent-room/data/pricing.ts` is empty. Run typecheck and zero-hex scan.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/program/page.tsx` renders at `http://localhost:3000/v2/program`.
- [ ] Visual parity matches `Movemental Program.dc.html` 1-to-1.
- [ ] Pricing matches `pricing.ts` without mutation.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Ensure pricing data was not touched
git diff --exit-code src/lib/agent-room/data/pricing.ts

# 2. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/program/ src/app/\(site-v2\)/v2/program/

# 3. Typecheck
pnpm typecheck

# 4. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-07
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
