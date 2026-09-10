# FSM-20: Footnotes & EEAT Citation Registry (`/footnotes`)

**ID:** FSM-20  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/footnotes/page.tsx`  
- Staging components: `src/v2/components/footnotes/footnotes-registry-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Footnotes.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Movemental's public assertions, statistics, and citations are backed by an Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT) claim registry.

Per authoritative drift (§00-index.md #4 & §05-fixture-seam.md), the citation registry is `src/lib/citations/eeat-registry.ts` and `eeat-site-claims.json` (38 claim rows + inline supplements = 40 citations).

Build the candidate screen in `src/app/(site-v2)/v2/footnotes/` matching `Movemental Footnotes.dc.html` 1-to-1 while consuming the real citation registry.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Footnotes.dc.html` (authoritative layout and registry view)
- `src/lib/citations/eeat-registry.ts` (claim lookup, citation normalization)
- `src/lib/citations/eeat-site-claims.json` (master claims data)
- `src/components/site-footnotes/footnotes-page-client.tsx`
- `src/app/footnotes/page.tsx`

---

## 3. Anti-Invention & Design Constraints

- **Real Claims Only:** Render the 38+ claim rows from `eeat-site-claims.json`. Do not invent citations or claims.
- **Deep Anchors:** Ensure each citation carries a permalink anchor (e.g. `#claim-01`, `#fn-12`) so footnotes clicked from articles or home jump directly to the citation.
- **L-4:** Zero hex in TSX files:
  - Claim rows: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Citation index: `var(--color-ink-band-blue)` mono font (`font-mono`).

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Footnotes.dc.html`:
     - Header / Mast: Fixed `3.6rem` with crumb navigation
     - Registry Hero: Eyebrow ("E-E-A-T CITATION REGISTRY"), Playfair headline, auditability commitment
     - Search & Filter: Filter by page / route or search claim keyword
     - Master Citation List: Numbered citations showing Claim Text, Primary Source, Evidence Grade, Direct URL
     - Verification Seam: Note on empirical rigor
2. **Build Footnotes Registry Component:**
   - Author `src/v2/components/footnotes/footnotes-registry-view.tsx`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/footnotes/page.tsx`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/footnotes/page.tsx` renders at `http://localhost:3000/v2/footnotes`.
- [ ] Visual parity matches `Movemental Footnotes.dc.html` 1-to-1.
- [ ] Citations load from `eeat-site-claims.json`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/footnotes/ src/app/\(site-v2\)/v2/footnotes/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-20
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
