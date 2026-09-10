# FSM-12: Research Indexes (`/research/findings` & `/research/sources`)

**ID:** FSM-12  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging routes:  
  - `src/app/(site-v2)/v2/research/findings/page.tsx`  
  - `src/app/(site-v2)/v2/research/sources/page.tsx`  
- Staging components: `src/v2/components/research/research-findings-view.tsx`, `src/v2/components/research/research-sources-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Research Indexes.dc.html`  
**Dependencies:** FSM-00, FSM-10  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Research Indexes provide structured reference views into Movemental's body of work:
1. `/research/findings`: Core empirical takeaways, synthesized insights, and actionable conclusions from all research.
2. `/research/sources`: Comprehensive master directory of cited literature, interviews, books, and primary source documents.

Build the candidate routes in `src/app/(site-v2)/v2/research/findings/` and `src/app/(site-v2)/v2/research/sources/` matching `Movemental Research Indexes.dc.html` 1-to-1 while importing the authored datasets from `src/components/research/`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Research Indexes.dc.html` (authoritative layout, tabs, and filter indexes)
- `src/components/research/research-findings.tsx`
- `src/components/research/research-sources.tsx`
- `src/components/research/sources-list.tsx`
- `src/lib/research/data.ts`

---

## 3. Anti-Invention & Design Constraints

- **Structured Indexing:** Preserve alphabetical or categorized grouping of master sources.
- **Cross-Links:** Findings must link back to their parent research papers (`/research/[slug]`).
- **L-4:** Zero hex in TSX files:
  - Finding cards: `var(--color-ink-band-paper)`
  - Quote highlight: `var(--color-ink-band-highlight)`
  - Index links: `var(--color-ink-band-ink)` with `var(--color-ink-band-blue)` hover.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Research Indexes.dc.html`:
     - Header / Mast with Findings / Sources sub-nav switcher
     - Findings View: Metric badges, key finding statement, backing papers, quote card
     - Sources View: Alphabetical source directory, citation count, external links
2. **Build Findings and Sources Components:**
   - Author `src/v2/components/research/research-findings-view.tsx` and `research-sources-view.tsx`.
3. **Build Staging Routes:**
   - Author `src/app/(site-v2)/v2/research/findings/page.tsx` and `sources/page.tsx`.
4. **Verification:**
   - Verify zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] Both routes render at `/v2/research/findings` and `/v2/research/sources`.
- [ ] Visual parity matches `Movemental Research Indexes.dc.html` 1-to-1.
- [ ] Findings and Sources consume existing data modules without manual hardcoding.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/research/ src/app/\(site-v2\)/v2/research/findings/ src/app/\(site-v2\)/v2/research/sources/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-12
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
