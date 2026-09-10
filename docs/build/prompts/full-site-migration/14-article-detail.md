# FSM-14: Article Detail (`/articles/[slug]`)

**ID:** FSM-14  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/articles/[slug]/page.tsx`  
- Staging components: `src/v2/components/articles/article-reader-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Article.dc.html`  
**Dependencies:** FSM-00, FSM-13  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Article Detail page is Movemental's long-form editorial reader. It renders markdown content with refined typography, author credentials, pull quotes, and footnote citations.

Build the candidate route in `src/app/(site-v2)/v2/articles/[slug]/` matching `Movemental Article.dc.html` 1-to-1 while rendering markdown through `src/lib/articles.ts` and `src/components/articles/article-detail.tsx`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Article.dc.html` (authoritative layout, typography, and author badge)
- `src/app/articles/[slug]/page.tsx`
- `src/components/articles/article-detail.tsx`
- `src/components/articles/article.module.css`
- `src/lib/articles.ts` (`getArticleBySlug`, markdown parsing)

---

## 3. Anti-Invention & Design Constraints

- **Typography & Margins:** Use the 1.5px vertical notebook margin in `var(--color-ink-band-margin-red)` at 32% opacity.
- **Author Attribution:** Display author name, headshot, and bio line from frontmatter.
- **L-4:** Zero hex in TSX files. Translate all colors:
  - Reading ground: `var(--color-ink-band-bg)`
  - Headings: `var(--color-ink-band-ink)`
  - Pull quotes: `var(--color-ink-band-paper)` background with `var(--color-ink-band-blue)` left border.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Article.dc.html`:
     - Header / Mast with back-to-articles breadcrumb
     - Article Header: Topic eyebrow, Playfair title, author card, reading time, publication date
     - Reading Sheet: Formatted markdown body (headings, paragraphs, blockquotes, lists, code snippets)
     - Author Bio Card: Expanded author portrait and credentials
     - Related Articles: Three recommended editorial cards
2. **Build Article Reader Component:**
   - Author `src/v2/components/articles/article-reader-view.tsx`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/articles/[slug]/page.tsx` using `generateStaticParams`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/articles/[slug]/page.tsx` renders articles cleanly.
- [ ] Visual parity matches `Movemental Article.dc.html` 1-to-1.
- [ ] Markdown renders properly with Ink Band typography tokens.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/articles/ src/app/\(site-v2\)/v2/articles/\[slug\]/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-14
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
