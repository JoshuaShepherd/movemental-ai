# FSM-05: Audience Editions (`/agent/{churches,nonprofits,institutions}`)

**ID:** FSM-05  
**Phase:** Tier 2 — Commercial & Decision Surfaces  
**Target Route/Files:**  
- Staging routes:  
  - `src/app/(site-v2)/v2/agent/churches/page.tsx`  
  - `src/app/(site-v2)/v2/agent/nonprofits/page.tsx`  
  - `src/app/(site-v2)/v2/agent/institutions/page.tsx`  
- Staging components: `src/v2/components/audience/audience-edition-page.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Audience Editions.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Movemental tailors its diagnostic narrative to three primary institutional sectors: Churches, Nonprofits, and Higher-Ed / Denominational Institutions. In the design handoff, `Movemental Audience Editions.dc.html` provides a unified architecture with an interactive audience switcher and distinct sector-specific arguments, vocabulary, and proof points.

Build the candidate routes under `src/app/(site-v2)/v2/agent/[audience]/` matching the design layout while importing sector configurations from `src/components/audience/audience-edition/*-config.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Audience Editions.dc.html` (layout and responsive switcher)
- `src/components/audience/audience-edition/churches-edition-config.ts`
- `src/components/audience/audience-edition/nonprofits-edition-config.ts`
- `src/components/audience/institutions-config.ts`
- `src/components/audience/audience-edition/audience-edition-types.ts`
- `src/components/audience/audience-edition/audience-edition-experience.tsx`

---

## 3. Anti-Invention & Design Constraints

- **Import Existing Sector Configs:** Sector copy, headlines, and specific framing must come from the established edition config modules.
- **Audience Switcher:** Provide fluid, tab-style switching between Churches, Nonprofits, and Institutions.
- **L-4:** Zero hex in TSX files. Use Ink Band tokens:
  - Surface cards: `var(--color-ink-band-paper)`
  - Active pill: `var(--color-ink-band-blue)` with white ink
  - Inactive pill: `var(--color-ink-band-surface)` with muted ink

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Audience Editions.dc.html`:
     - Header / Mast with audience selector pill group
     - Hero: Sector-specific headline and subhead
     - "The Problem" section (sector friction points)
     - The Movemental Solution & Safety Framework
     - Sector Decks link (`/agent/[audience]/deck`)
     - CTA to Reality Check or Sprint Enrollment
2. **Build Audience Edition Component:**
   - Author `src/v2/components/audience/audience-edition-page.tsx` parameterizing by audience key (`churches` | `nonprofits` | `institutions`).
3. **Build Staging Routes:**
   - Author `src/app/(site-v2)/v2/agent/churches/page.tsx`, `nonprofits/page.tsx`, and `institutions/page.tsx`.
4. **Verification:**
   - Confirm all 3 pages render with correct content, zero hex, and clean typecheck.

---

## 5. Definition of Done

- [ ] All three routes render at `/v2/agent/churches`, `/v2/agent/nonprofits`, and `/v2/agent/institutions`.
- [ ] Visual parity matches `Movemental Audience Editions.dc.html` 1-to-1.
- [ ] Switching between audiences renders correct sector copy.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/audience/ src/app/\(site-v2\)/v2/agent/churches/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-05
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
