# FSM-18: Founder Profile Detail (`/about/[slug]`)

**ID:** FSM-18  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/about/[slug]/page.tsx`  
- Staging components: `src/v2/components/founders/founder-detail-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Founder Profile.dc.html`  
**Dependencies:** FSM-00, FSM-17  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Founder Profile page provides an in-depth biographical portrait, intellectual lineage, authored books/tools, and founding perspective for each of the three Movemental co-founders:
- `/about/alan-hirsch`
- `/about/dave-ferguson`
- `/about/josh-shepherd`

Build the candidate route in `src/app/(site-v2)/v2/about/[slug]/` matching `Movemental Founder Profile.dc.html` 1-to-1 while consuming the full biographical data from `src/lib/founders/content.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Founder Profile.dc.html` (authoritative layout, typography, and book shelf)
- `src/lib/founders/content.ts` (`FOUNDER_PROFILES`, `getFounderBySlug`)
- `src/components/founders/founder-profile-page.tsx`
- `src/components/founders/founder-profile.module.css`

---

## 3. Anti-Invention & Design Constraints

- **Exact Bios:** Do not truncate or alter the authored bios in `src/lib/founders/content.ts` (notably, Josh Shepherd's `fullBio` is fully authored and must not be marked null or empty).
- **Book / Project Cards:** Render published books (e.g. *The Forgotten Ways*, *Hero Maker*, etc.) with real covers and descriptions.
- **Reading Margins:** Notebook margin on the biography reading sheet.
- **L-4:** Zero hex in TSX files:
  - Profile surface: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Accent / Links: `var(--color-ink-band-blue)`.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Founder Profile.dc.html`:
     - Header / Mast with back-to-about breadcrumb
     - Founder Hero: Large portrait, full name in Playfair Display, role, organizational affiliation
     - In-Depth Narrative Bio: Multi-paragraph biography with notebook margin
     - Published Works / Body of Work: Grid of books and frameworks
     - Other Founders Switcher: Quick links to the other two founders
2. **Build Founder Detail View Component:**
   - Author `src/v2/components/founders/founder-detail-view.tsx`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/about/[slug]/page.tsx` with `generateStaticParams` for the three founders.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/about/[slug]/page.tsx` renders all 3 founder profiles cleanly.
- [ ] Visual parity matches `Movemental Founder Profile.dc.html` 1-to-1.
- [ ] Returns `notFound()` for invalid slugs.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/founders/ src/app/\(site-v2\)/v2/about/\[slug\]/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-18
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
