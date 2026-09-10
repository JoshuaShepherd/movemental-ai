# FSM-08: Sprint Enrollment Flow (`/enroll`)

**ID:** FSM-08  
**Phase:** Tier 2 — Commercial & Decision Surfaces  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/enroll/page.tsx`  
- Staging components: `src/v2/components/enroll/enroll-form.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Enroll.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The `/enroll` surface is the intake application for organizations embarking on a Movemental Safety Sprint. It collects key organization details, selected cohort/timing, primary stakeholder contacts, and confirms terms.

Build the candidate screen in `src/app/(site-v2)/v2/enroll/` matching `Movemental Enroll.dc.html` 1-to-1 while wiring form submission to the existing backend endpoint `/api/agent-room/enroll`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Enroll.dc.html` (authoritative form layout and fields)
- `src/app/enroll/page.tsx` (existing form schema, fields, validation, and success feedback)
- `src/lib/agent-room/data/pricing.ts` (sprint price details)
- `docs/handoff/05-fixture-seam.md` (§Enroll submit row)

---

## 3. Anti-Invention & Design Constraints

- **Field Schema:** Organization name, sector (church/nonprofit/institution), estimated team size, primary lead name, lead email, target start date, and brief notes. Do not invent unneeded form fields.
- **Form Seam:** The form action posts to `/api/agent-room/enroll`. On success, display the verified success receipt state from the design.
- **L-4:** Zero hex in TSX files:
  - Form card: `var(--color-ink-band-paper)`
  - Inputs: `var(--color-ink-band-bg)` background, `var(--color-ink-band-border)` border
  - Focus state: `var(--color-ink-band-blue)` outline
  - Error messages: `var(--color-ink-band-margin-red-ink)`
- **No `shadcn add`:** Style form fields natively with Ink Band tokens.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Enroll.dc.html`:
     - Header / Mast: Fixed `3.6rem` with back link
     - Intake Form Card: Structured fieldset with eyebrows, labels, required indicators
     - Sprint Summary Sidebar: Deliverables recap, flat $1,000 sprint confirmation
     - Inline Validation & Submit CTA: Primary action button with loading state
     - Post-submission Success State: Confirmation message and onboarding instructions
2. **Build Form Component:**
   - Author `src/v2/components/enroll/enroll-form.tsx` using React client state and native validation.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/enroll/page.tsx`.
4. **Verification:**
   - Test client validation, ensure submit action targets `/api/agent-room/enroll`, check zero hex, and typecheck.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/enroll/page.tsx` renders at `http://localhost:3000/v2/enroll`.
- [ ] Visual parity matches `Movemental Enroll.dc.html` 1-to-1.
- [ ] Form submit resolves to `/api/agent-room/enroll` (or displays design success state in preview).
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/enroll/ src/app/\(site-v2\)/v2/enroll/

# 2. Check form submission route reference
grep -rn "/api/agent-room/enroll" src/v2/components/enroll/

# 3. Typecheck
pnpm typecheck

# 4. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-08
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
