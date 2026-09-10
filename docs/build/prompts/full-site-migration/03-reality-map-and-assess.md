# FSM-03: Reality Map & Assessment (`/assess`)

**ID:** FSM-03  
**Phase:** Tier 1 — Core Public Anchors  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/assess/page.tsx`  
- Staging components: `src/v2/components/assess/reality-map-flow.tsx`, `src/v2/components/assess/beat-card.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Reality Map.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Reality Map at `/assess` is Movemental's flagship diagnostic instrument. Visitors step through key organizational beats (leadership alignment, shadow AI usage, data exposure, safety policy, tooling readiness), receive an instant read-back, and view their path placement.

Build the candidate surface in `src/app/(site-v2)/v2/assess/` matching `Movemental Reality Map.dc.html` 1-to-1. Ground the questions, options, and readback logic in `src/lib/agent-room/data/beat-catalog.ts` and `map-q.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Reality Map.dc.html` (authoritative layout and beats)
- `src/lib/agent-room/data/beat-catalog.ts` (the 6 diagnostic beats and option sets)
- `src/lib/agent-room/data/map-q.ts` (scoring and readback calculations)
- `src/components/agent-room/screen/reality-check-beat.tsx` (existing beat card model)
- `src/components/agent-room/screen/readback.tsx` (existing readback visualization)
- `docs/handoff/05-fixture-seam.md` (§Reality map row)

---

## 3. Anti-Invention & Design Constraints

- **Beats & Options:** Use the exact text and options from `beat-catalog.ts`. Do not invent new questions.
- **Seam:** In the interactive client flow, store selected answers in client state (`useState`). Submission action points to `/api/ai-reality/submit`.
- **L-4:** Zero hex in TSX files:
  - Dot progress / Beat indicators: `var(--color-ink-band-blue)`
  - Selected card: `var(--color-ink-band-paper)` with `var(--color-ink-band-blue)` hairline border
  - Readback spine: `var(--color-ink-band-border)`
- **Notebook margin:** Present on the diagnostic questionnaire sheet.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map states in `Movemental Reality Map.dc.html`:
     - Stage 1: Active Beat Question (eyebrow, title, 3–4 selectable option cards, "Why this matters" expandable note)
     - Stage 2: In-flight progress spine (showing completed beats vs remaining)
     - Stage 3: Instant Read-Back summary (scoring, organization classification, next step placement)
2. **Build Interactive Diagnostic Flow:**
   - Author `src/v2/components/assess/reality-map-flow.tsx` managing active beat index, selected answers, and transition to read-back.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/assess/page.tsx` rendering `<RealityMapFlow />`.
4. **Verification:**
   - Verify step-through behavior, zero hex, and TypeScript typing.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/assess/page.tsx` renders at `http://localhost:3000/v2/assess`.
- [ ] Visual parity matches `Movemental Reality Map.dc.html` 1-to-1.
- [ ] Stepping through all beats computes the readback faithfully.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/assess/ src/app/\(site-v2\)/v2/assess/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-03
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
