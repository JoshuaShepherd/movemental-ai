# FSM-21: Utility Shell & Newsletter (`/newsletter/*`)

**ID:** FSM-21  
**Phase:** Tier 4 — Governance & Utility Surfaces  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/newsletter/confirm/page.tsx`, `unsubscribe/page.tsx`  
- Staging components: `src/v2/components/utility/utility-shell-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Utility Shell.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Per authoritative drift (§02-drift.md & §03-decisions.md L-6), **auth pages (`/login`, `/signup`, `/forgot-password`) and legal pages (`/terms`, `/privacy`, `/cookies`) are already authored in the repo and must NOT be rebuilt or overwritten**. The design's "Utility Shell" screen showed placeholder gaps for those routes because the original designer assumed they were missing.

The Utility Shell design serves as the canonical Ink Band wrapper for administrative, confirmation, and subscription workflows: specifically the `/newsletter/*` confirmation flows, newsletter unsubscribe, and transactional holding states.

Build the candidate wrapper in `src/v2/components/utility/` and wire `/v2/newsletter/*` matching `Movemental Utility Shell.dc.html` 1-to-1.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Utility Shell.dc.html` (authoritative layout and framing)
- `docs/handoff/02-drift.md` (§Terms & Auth rows)
- `docs/handoff/03-decisions.md` (§L-6, §C-1)
- `src/components/ink-band/utility-shell.tsx` (existing shell primitive)
- `src/components/ink-band/legal-page-content.tsx`
- `src/app/newsletter/` (existing newsletter routes)

---

## 3. Anti-Invention & Design Constraints

- **L-6 Non-negotiable:** Do NOT rebuild auth (`/login`, `/signup`, etc.) or `/terms`. Delete the placeholder gap panel from the Utility Shell scope.
- **Transactional State:** Support Clean confirmation state, error state, and pending confirmation.
- **L-4:** Zero hex in TSX files. Translate all colors:
  - Utility box card: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Icon/Accent: `var(--color-ink-band-blue)`
  - Error: `var(--color-ink-band-margin-red-ink)`.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Utility Shell.dc.html`:
     - Centered Shell Card: Minimal header with brand mark, back action
     - Message Box: Headline, status icon, informative body text
     - Action CTAs: "Return to Home", "Explore Research"
2. **Build Utility Shell Component:**
   - Author `src/v2/components/utility/utility-shell-view.tsx`.
3. **Build Staging Routes:**
   - Author `src/app/(site-v2)/v2/newsletter/confirm/page.tsx` and `src/app/(site-v2)/v2/newsletter/unsubscribe/page.tsx`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/newsletter/confirm/page.tsx` renders cleanly.
- [ ] Visual appearance matches `Movemental Utility Shell.dc.html` 1-to-1.
- [ ] Existing `/login`, `/signup`, and `/terms` are untouched.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/utility/ src/app/\(site-v2\)/v2/newsletter/

# 2. Confirm auth and terms were NOT altered
git diff --exit-code src/app/login/ src/app/terms/ src/app/signup/

# 3. Typecheck
pnpm typecheck

# 4. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-21
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
