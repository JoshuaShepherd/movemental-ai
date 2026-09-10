# FSM-19: How We Use AI (`/agent/how-we-use-ai`)

**ID:** FSM-19  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/agent/how-we-use-ai/page.tsx`  
- Staging components: `src/v2/components/how-we-use-ai/how-we-use-ai-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental How We Use AI.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Per authoritative drift resolution (§02-drift.md & §04-component-map.md), the AI disclosure experience is already fully authored in the repo at `src/components/how-we-use-ai/`. The top-level `/how-we-use-ai` route redirects to `/agent/how-we-use-ai`.

Build the candidate route in `src/app/(site-v2)/v2/agent/how-we-use-ai/` matching `Movemental How We Use AI.dc.html` 1-to-1 by importing and composing the existing disclosure experience.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental How We Use AI.dc.html` (authoritative layout and disclosure copy)
- `src/components/how-we-use-ai/how-we-use-ai-data.ts` (disclosure commitments, data boundaries)
- `src/components/how-we-use-ai/how-we-use-ai-experience.tsx` (existing interactive experience)
- `src/app/agent/how-we-use-ai/page.tsx`

---

## 3. Anti-Invention & Design Constraints

- **No invented AI policies:** Use the exact disclosure commitments in `how-we-use-ai-data.ts` (what models are used, privacy guarantees, data retention boundaries, human-in-the-loop oversight).
- **L-4:** Zero hex in TSX files:
  - Policy cards: `var(--color-ink-band-paper)`
  - Boundary alert callouts: `var(--color-ink-band-surface)` with `var(--color-ink-band-border)` border
  - Ink: `var(--color-ink-band-ink)`.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental How We Use AI.dc.html`:
     - Header / Mast with back breadcrumb
     - Disclosure Hero: Eyebrow ("OUR INTEGRITY COMMITMENT"), Playfair headline, statement of posture
     - The Five Principles of AI Deployment: Cards detailing model usage, boundary conditions, privacy
     - Technical Architecture Diagram: Visual explanation of data flow and tenant separation
     - Verification & Audit Note: Explanation of human verification
2. **Build How We Use AI Component:**
   - Author `src/v2/components/how-we-use-ai/how-we-use-ai-view.tsx` importing from existing data.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/agent/how-we-use-ai/page.tsx`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/agent/how-we-use-ai/page.tsx` renders at `http://localhost:3000/v2/agent/how-we-use-ai`.
- [ ] Visual parity matches `Movemental How We Use AI.dc.html` 1-to-1.
- [ ] Disclosure data matches `how-we-use-ai-data.ts`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/how-we-use-ai/ src/app/\(site-v2\)/v2/agent/how-we-use-ai/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-19
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
