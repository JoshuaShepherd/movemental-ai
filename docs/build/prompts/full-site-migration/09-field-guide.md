# FSM-09: Field Guide (`/field-guide`)

**ID:** FSM-09  
**Phase:** Tier 2 — Commercial & Decision Surfaces  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/field-guide/page.tsx`  
- Staging components: `src/v2/components/field-guide/field-guide-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Field Guide.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Field Guide is Movemental's practical reference handbook on AI governance and implementation. It details operational protocols, prompts, and policy frameworks for organizational leaders.

Build the candidate route in `src/app/(site-v2)/v2/field-guide/` matching `Movemental Field Guide.dc.html` 1-to-1 while importing the authored handbook structure from `src/components/field-guide/field-guide-page-content.tsx` and `src/lib/safety-field-guide.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Field Guide.dc.html` (authoritative layout and typography)
- `src/app/field-guide/page.tsx`
- `src/components/field-guide/field-guide-page-content.tsx`
- `src/components/field-guide/safety-handbook-cover.tsx`
- `src/lib/safety-field-guide.ts`
- `src/lib/field-guide-page.ts`

---

## 3. Anti-Invention & Design Constraints

- **Handbook Cover & Sections:** Preserve the physical book aesthetic (embossed title, author lines, book cover styling) with Ink Band tokens.
- **Reading Margins:** Enforce the 1.5px vertical notebook margin in `var(--color-ink-band-margin-red)` at 32% opacity.
- **L-4:** Zero hex in TSX files. Translate all colors:
  - Book cover ground: `var(--color-ink-band-paper)`
  - Embossed border: `var(--color-ink-band-border)`
  - Title ink: `var(--color-ink-band-ink)`
  - Margin note: `var(--color-ink-band-blue)` with Caveat cursive font.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Field Guide.dc.html`:
     - Header / Mast: Fixed `3.6rem` with crumb navigation
     - Cover Hero: Safety handbook cover visual, edition metadata, download PDF button
     - Table of Contents: Chapters and operational protocols
     - Sample Excerpts & Reading Sheets: Multi-column typography with notebook margin
     - Cohort / Sprint CTA: Link to `/enroll`
2. **Build Field Guide View Component:**
   - Author `src/v2/components/field-guide/field-guide-view.tsx` importing content from existing libraries.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/field-guide/page.tsx`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/field-guide/page.tsx` renders at `http://localhost:3000/v2/field-guide`.
- [ ] Visual parity matches `Movemental Field Guide.dc.html` 1-to-1.
- [ ] Book cover and chapter list render using Ink Band tokens.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/field-guide/ src/app/\(site-v2\)/v2/field-guide/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-09
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
