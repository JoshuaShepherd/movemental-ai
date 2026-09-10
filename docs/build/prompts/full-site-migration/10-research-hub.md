# FSM-10: Research Hub (`/research`)

**ID:** FSM-10  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/research/page.tsx`  
- Staging components: `src/v2/components/research/research-hub-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Research.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Research Hub houses Movemental's primary empirical and missiological research papers, qualitative studies, and movement analyses.

Build the candidate route in `src/app/(site-v2)/v2/research/` matching `Movemental Research.dc.html` 1-to-1 while importing the authored datasets `RESEARCH_ITEMS` and `RESEARCH_ARCHIVE` from `src/lib/research/data.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Research.dc.html` (authoritative library layout)
- `src/lib/research/data.ts` (`RESEARCH_ITEMS`, `RESEARCH_ARCHIVE`)
- `src/components/research/research-library.tsx` (existing library UI component)
- `docs/handoff/05-fixture-seam.md` (§Research row)

---

## 3. Anti-Invention & Design Constraints

- **Real Data Import:** Consume `RESEARCH_ITEMS` and `RESEARCH_ARCHIVE` directly. Do not invent synthetic research titles or authors.
- **Sub-navigation links:** Provide clear tab links to `/research` (Papers), `/research/findings` (Key Findings), and `/research/sources` (Master Sources).
- **L-4:** Zero hex in TSX files:
  - Library item cards: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Category / Topic pills: `var(--color-ink-band-surface)` with muted ink

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Research.dc.html`:
     - Header / Mast: Fixed `3.6rem` with sub-navigation
     - Research Library Hero: Eyebrow, Playfair headline, methodology lede
     - Featured Paper Banner: Highlighted primary research publication
     - Research Papers Grid: Cards showing paper title, authors, abstract, reading time, link to `/research/[slug]`
     - Archive Section: Expandable or grouped secondary papers
2. **Build Research Hub Component:**
   - Author `src/v2/components/research/research-hub-view.tsx` rendering items from `src/lib/research/data.ts`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/research/page.tsx`.
4. **Verification:**
   - Verify zero-hex, typecheck, and `pnpm research:tree-check`.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/research/page.tsx` renders at `http://localhost:3000/v2/research`.
- [ ] Visual parity matches `Movemental Research.dc.html` 1-to-1.
- [ ] Research papers pull from `src/lib/research/data.ts`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/research/ src/app/\(site-v2\)/v2/research/

# 2. Typecheck
pnpm typecheck

# 3. Research tree check
pnpm research:tree-check

# 4. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-10
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
