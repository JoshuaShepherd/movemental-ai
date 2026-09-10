# FSM-06: Audience Decks (`/agent/{churches,nonprofits,institutions}/deck`)

**ID:** FSM-06  
**Phase:** Tier 2 — Commercial & Decision Surfaces  
**Target Route/Files:**  
- Staging routes:  
  - `src/app/(site-v2)/v2/agent/churches/deck/page.tsx`  
  - `src/app/(site-v2)/v2/agent/nonprofits/deck/page.tsx`  
  - `src/app/(site-v2)/v2/agent/institutions/deck/page.tsx`  
- Staging components: `src/v2/components/deck/deck-presentation-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Decks.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The standalone audience presentation decks serve board presentations, executive committees, and leadership teams evaluating Movemental. Each audience has an eleven-slide narrative authored in the repo (`church-deck.ts`, `nonprofit-deck.ts`, `institution-deck.ts`) covering why AI adoption requires a specialized governance platform rather than generic tools.

Build the slide viewer in `src/app/(site-v2)/v2/agent/[audience]/deck/` matching `Movemental Decks.dc.html` 1-to-1 while importing the authored slide data directly.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Decks.dc.html` (authoritative slide layout, controls, and presentation stage)
- `src/lib/agent-room/deck/church-deck.ts`
- `src/lib/agent-room/deck/nonprofit-deck.ts`
- `src/lib/agent-room/deck/institution-deck.ts`
- `src/lib/agent-room/deck/deck-types.ts`
- `src/components/agent-room/deck/standalone-deck.tsx`

---

## 3. Anti-Invention & Design Constraints

- **No invented slides:** Consume the real 11-slide deck data from `church-deck.ts`, etc. Do not invent synthetic statistics.
- **Controls & Keyboard Navigation:** Left/right arrow navigation, slide counter indicator (e.g. `04 / 11`), full-screen toggle.
- **L-4:** Zero hex in TSX files. Use Ink Band variables:
  - Slide canvas: `var(--color-ink-band-paper)`
  - Slide border: `var(--color-ink-band-border)`
  - Active indicator dot: `var(--color-ink-band-blue)`
  - Slide typography: Playfair Display for slide headlines, Inter for bullets, Caveat for hand-noted takeaways.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map controls and stage in `Movemental Decks.dc.html`:
     - Stage header: Audience badge, deck title, close/back link
     - Slide Stage: Centered presentation viewport with card aspect ratio
     - Footer controls: Prev/Next buttons, slide dots, keyboard shortcut hint
2. **Build Deck Presentation Component:**
   - Author `src/v2/components/deck/deck-presentation-view.tsx` supporting keyboard arrow navigation and responsive fluid sizing.
3. **Build Staging Routes:**
   - Author `src/app/(site-v2)/v2/agent/churches/deck/page.tsx`, `nonprofits/deck/page.tsx`, and `institutions/deck/page.tsx`.
4. **Verification:**
   - Test slide transitions, zero hex, and typecheck.

---

## 5. Definition of Done

- [ ] All three deck routes render at `/v2/agent/churches/deck`, `/v2/agent/nonprofits/deck`, and `/v2/agent/institutions/deck`.
- [ ] Visual appearance matches `Movemental Decks.dc.html` 1-to-1.
- [ ] Keyboard arrows (Left/Right) advance and reverse slides cleanly.
- [ ] Slide data pulls from `src/lib/agent-room/deck/*-deck.ts`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/deck/ src/app/\(site-v2\)/v2/agent/*/deck/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-06
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
