# FSM-22: Dashboard Shell & Safety Governance (`/dashboard`, `/dashboard/safety`)

**ID:** FSM-22  
**Phase:** Tier 4 — Governance & Utility Surfaces  
**Target Route/Files:**  
- Staging routes:  
  - `src/app/(site-v2)/v2/dashboard/page.tsx`  
  - `src/app/(site-v2)/v2/dashboard/safety/page.tsx`  
  - `src/app/(site-v2)/v2/dashboard/onboarding/[step]/page.tsx`  
- Staging components: `src/v2/components/dashboard/dashboard-shell-view.tsx`, `charter-publication-flow.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Dashboard.dc.html` (D1–D5)  
**Dependencies:** FSM-00, FSM-01  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Dashboard is the private, authenticated workspace where organization leaders review their Safety Charter artifacts, draft policies, manage team members, and publish board-ratified documents.

Per authoritative drift (§02-drift.md & §03-decisions.md):
- **S-1:** `/dashboard/ai-reality` is live with substantive backend wiring and has **no design**. **Do NOT touch, restyle, or delete `/dashboard/ai-reality`**. Leave it untouched.
- **S-2:** Ground exclusively in `safety_artifacts`, `safety_artifact_versions`, and `safety_artifact_publications`. Do not wire `safety_guidebooks`, `ratifications`, or `signatures` (they are legacy/unused).
- **Holding Pages:** `/dashboard/onboarding/[step]` and `/dashboard/onboarding/leader/[step]` are holding pages; ship them verbatim.

Build the candidate routes under `src/app/(site-v2)/v2/dashboard/` matching `Movemental Dashboard.dc.html` 1-to-1 while honoring all drift constraints.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Dashboard.dc.html` (D1–D5 screens)
- `docs/handoff/02-drift.md` (§Dashboard & §Publishing rows)
- `docs/handoff/03-decisions.md` (§S-1, §S-2, §S-3, §C-3)
- `src/lib/services/safety/charter-dashboard.ts`
- `src/lib/services/safety/provision-safety-org.ts`
- `src/components/safety-dashboard/charter-dashboard-shell.tsx`
- `src/app/dashboard/safety/page.tsx`

---

## 3. Anti-Invention & Design Constraints

- **S-1 STOP AND REPORT:** `git diff --exit-code src/app/dashboard/ai-reality/` must pass cleanly. Zero changes to that route.
- **S-2 UNUSED TABLES:** Never reference `safety_guidebook_ratifications` or `safety_guidebook_signatures`.
- **C-3 Tenant Org ID:** Read `getTenantOrgId()` from `src/lib/tenant.ts`. If null, render the existing "Dashboard not configured" empty state.
- **L-4:** Zero hex in TSX files:
  - Sidebar / Shell: `var(--color-ink-band-paper)`
  - Active nav item: `var(--color-ink-band-blue)` with white text
  - Status badges: `var(--color-ink-band-surface)` with muted ink.

---

## 4. Implementation Steps

1. **Inspect Design HTML (D1–D5):**
   - D1: Shell & Overview (sidebar navigation, org metrics, progress bar)
   - D2: Safety Charter View (the five layers, status of each artifact)
   - D3: Document Viewer (in-line editor/viewer with version history)
   - D4: Artifact Publication Flow (generating public shareable link)
   - D5: Onboarding holding steps
2. **Build Dashboard View Components:**
   - Author `src/v2/components/dashboard/dashboard-shell-view.tsx` and `charter-publication-flow.tsx`.
3. **Build Staging Routes:**
   - Author `src/app/(site-v2)/v2/dashboard/page.tsx`, `safety/page.tsx`, and `onboarding/[step]/page.tsx`.
4. **Verification:**
   - Verify zero-hex, typecheck, that `src/app/dashboard/ai-reality` is untouched, and that no unused tables are referenced.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/dashboard/page.tsx` and `safety/page.tsx` render cleanly.
- [ ] Visual parity matches `Movemental Dashboard.dc.html` 1-to-1.
- [ ] `src/app/dashboard/ai-reality/` remains 100% untouched (`git diff` is empty).
- [ ] No references to `safety_guidebook_ratifications` or `signatures`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Verify /dashboard/ai-reality was untouched
git diff --exit-code src/app/dashboard/ai-reality/

# 2. Verify no unused table references
! grep -rn "safety_guidebook" src/v2/components/dashboard/ src/app/\(site-v2\)/v2/dashboard/

# 3. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/dashboard/ src/app/\(site-v2\)/v2/dashboard/

# 4. Typecheck
pnpm typecheck

# 5. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-22
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
