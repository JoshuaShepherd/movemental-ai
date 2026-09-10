# FSM-11: Research Paper Detail (`/research/[slug]`)

**ID:** FSM-11  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/research/[slug]/page.tsx`  
- Staging components: `src/v2/components/research/research-paper-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Research Paper.dc.html`  
**Dependencies:** FSM-00, FSM-10  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Research Paper Detail page displays individual academic and movement studies with an interactive Table of Contents, citation anchors, and full reading typography.

Build the candidate route in `src/app/(site-v2)/v2/research/[slug]/` matching `Movemental Research Paper.dc.html` 1-to-1 while importing the authored research articles from `src/components/research/article-bodies.tsx` and `article-toc.tsx`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Research Paper.dc.html` (authoritative layout, TOC, and reading sheet)
- `src/components/research/research-article.tsx`
- `src/components/research/article-bodies.tsx`
- `src/components/research/article-toc.tsx`
- `src/components/research/research.module.css`

---

## 3. Anti-Invention & Design Constraints

- **Reading Experience:** Notebook margin rule on the reading body, sticky sidebar Table of Contents with active heading tracking.
- **EEAT Citations:** Footnote reference chips linked to the citation registry.
- **L-4:** Zero hex in TSX files. Translate all colors:
  - Reading sheet: `var(--color-ink-band-bg)`
  - Active TOC item: `var(--color-ink-band-blue)`
  - Quotes / Callouts: `var(--color-ink-band-paper)` with `var(--color-ink-band-border)` border.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Research Paper.dc.html`:
     - Header / Mast: Fixed `3.6rem` with back-to-library breadcrumb
     - Article Header: Eyebrow (Topic), Playfair title, authors, publication date, abstract callout
     - Two-Column Reading Layout: Left sticky TOC, Right prose body
     - End Notes & References: Numbered footnotes with links
     - Bottom Nav: Next/Previous paper recommendations
2. **Build Paper View Component:**
   - Author `src/v2/components/research/research-paper-view.tsx` accepting `slug`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/research/[slug]/page.tsx` with dynamic params generation (`generateStaticParams`).
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/research/[slug]/page.tsx` renders research papers cleanly.
- [ ] Visual parity matches `Movemental Research Paper.dc.html` 1-to-1.
- [ ] Table of Contents and reading sheet use Ink Band tokens.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/research/ src/app/\(site-v2\)/v2/research/\[slug\]/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-11
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
