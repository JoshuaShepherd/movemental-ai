# FSM-04: Shared Reality Readback (`/share/ai-reality/[token]`)

**ID:** FSM-04  
**Phase:** Tier 1 — Core Public Anchors  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/share/ai-reality/[token]/page.tsx`  
- Staging components: `src/v2/components/ai-reality/shared-reality-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Shared Reality.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Shared Reality surface allows an organization's leadership team to view aggregated results from their collective assessment. Unlike a single visitor's read-back, this route resolves a secure token to an organization and renders the `AiRealityOrgPayload` (team means, spread, alignment illusion flags, and provisional status).

Build the candidate screen in `src/app/(site-v2)/v2/share/ai-reality/[token]/` matching `Movemental Shared Reality.dc.html` 1-to-1 while importing the repo's existing payload typing and aggregate metric calculation.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Shared Reality.dc.html` (layout and visual design)
- `src/lib/ai-reality/types.ts` (`AiRealityOrgPayload`, score distributions)
- `src/components/ai-reality/dashboard.tsx` (existing visualization component)
- `src/app/share/ai-reality/[token]/page.tsx` (existing server route logic)
- `docs/handoff/05-fixture-seam.md` (§Shared read-back row)

---

## 3. Anti-Invention & Design Constraints

- **No invented sharer names:** The payload carries no individual sharer name or date. The framing line names the organization only.
- **Import Data Contracts:** Consume `AiRealityOrgPayload` directly.
- **L-4:** Zero hex in TSX files. Translate all colors:
  - Metric bars / chart indicators: `var(--color-ink-band-blue)`
  - Alert / Illusion warning cards: `var(--color-ink-band-margin-red-ink)`
  - Paper ground: `var(--color-ink-band-paper)`
- **Sticky header:** Fixed `3.6rem` with wordmark and org name.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Shared Reality.dc.html`:
     - Org Banner: Organization title, cohort size, status badge ("PROVISIONAL" / "RATIFIED")
     - Executive Summary: Score distribution across the 6 dimensions
     - Alignment Illusion Matrix: Highlights where leadership self-perception diverges from reality
     - Recommended Next Stage: Callout to Safety Stage or Board Ratification
2. **Build Shared Reality Component:**
   - Author `src/v2/components/ai-reality/shared-reality-view.tsx` accepting `AiRealityOrgPayload`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/share/ai-reality/[token]/page.tsx`. Include token fallback fixture if token is not found in local development.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/share/ai-reality/[token]/page.tsx` renders properly.
- [ ] Visual parity matches `Movemental Shared Reality.dc.html` 1-to-1.
- [ ] Aggregates (means, spread, illusion flags) render with Ink Band tokens.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/ai-reality/ src/app/\(site-v2\)/v2/share/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-04
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
