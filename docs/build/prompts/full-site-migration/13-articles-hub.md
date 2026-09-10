# FSM-13: Articles Hub (`/articles`)

**ID:** FSM-13  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/articles/page.tsx`  
- Staging components: `src/v2/components/articles/articles-hub-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Articles.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Articles Hub is Movemental's editorial publication surface. Per authoritative drift resolution (§02-drift.md / §03-decisions.md C-4), articles are read from markdown files in `docs/articles/*.md` via the filesystem loader `src/lib/articles.ts`—not from Supabase.

Build the candidate screen in `src/app/(site-v2)/v2/articles/` matching `Movemental Articles.dc.html` 1-to-1 while consuming article frontmatter exclusively through `src/lib/articles.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Articles.dc.html` (authoritative layout, topic filters, and grid)
- `src/lib/articles.ts` (the filesystem loader reading `docs/articles/*.md`)
- `docs/handoff/03-decisions.md` (§C-4)
- `src/app/articles/page.tsx` (existing server component)

---

## 3. Anti-Invention & Design Constraints

- **C-4 Loader Rule:** Read through `src/lib/articles.ts`. If a field the design shows is missing in the markdown frontmatter, omit that field; do NOT edit markdown frontmatter across the ~70 files.
- **Do not read `docs/articles/graded-high/`:** That is a scoring archive, not the published article set.
- **L-4:** Zero hex in TSX files:
  - Article cards: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Eyebrow / Category: `var(--color-ink-band-ink-muted)`
  - Title: `var(--color-ink-band-ink)`

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Articles.dc.html`:
     - Header / Mast with search/filter bar
     - Hero / Featured Article: Primary editorial feature with author avatar, reading time, summary
     - Topic Filter Pills: All, Strategy, Missiology, Ethics, Tooling
     - Article Cards Grid: Title, author, date, excerpt, tags
     - Pagination / Infinite Scroll or Load More affordance
2. **Build Articles Hub Component:**
   - Author `src/v2/components/articles/articles-hub-view.tsx` accepting the loaded articles list.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/articles/page.tsx` fetching articles via `getAllArticles()` from `src/lib/articles.ts`.
4. **Verification:**
   - Run `pnpm articles:check`, zero-hex check, and `pnpm typecheck`.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/articles/page.tsx` renders at `http://localhost:3000/v2/articles`.
- [ ] Visual parity matches `Movemental Articles.dc.html` 1-to-1.
- [ ] Articles load dynamically from `src/lib/articles.ts`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/articles/ src/app/\(site-v2\)/v2/articles/

# 2. Articles frontmatter check
pnpm articles:check:warn

# 3. Typecheck
pnpm typecheck

# 4. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-13
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
