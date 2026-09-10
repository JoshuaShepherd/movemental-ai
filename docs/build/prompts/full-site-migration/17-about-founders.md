# FSM-17: About & Founders Hub (`/about`)

**ID:** FSM-17  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/about/page.tsx`  
- Staging components: `src/v2/components/founders/about-page-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental About Founders.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

The `/about` page articulates Movemental's founding conviction, missional origin story, and introduces the three co-founders:
- Alan Hirsch (Founder / Missiologist)
- Dave Ferguson (Co-Founder / Movement Catalyst)
- Josh Shepherd (Founder / Technologist & Systems Architect)

Per authoritative drift (§00-index.md #4), `src/lib/founders/content.ts` is the single source of truth for all founder bios, roles, and credentials.

Build the candidate route in `src/app/(site-v2)/v2/about/` matching `Movemental About Founders.dc.html` 1-to-1 while importing the authored founder data.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental About Founders.dc.html` (authoritative layout, typography, and sections)
- `src/lib/founders/content.ts` (`FOUNDERS`, `FOUNDER_PROFILES`)
- `src/app/about/page.tsx` (existing server component)
- `docs/handoff/05-fixture-seam.md` (§Founders row)

---

## 3. Anti-Invention & Design Constraints

- **Founder Roles & Bios:** Unlike the 25 movement leaders, founders have rights-cleared, authored roles and bios in `src/lib/founders/content.ts`. Render these faithfully.
- **Narrative Section:** The Movemental Origin story ("Why Movemental exists") with notebook rule styling.
- **L-4:** Zero hex in TSX files:
  - Founder cards: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Eyebrow: `var(--color-ink-band-ink-muted)`
  - Link hover: `var(--color-ink-band-blue)`.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental About Founders.dc.html`:
     - Header / Mast: Fixed `3.6rem` with crumb navigation
     - Mission Hero: Eyebrow ("OUR CONVICTION"), Playfair headline, thesis lede
     - The Three Founders: Grid of 3 cards with portraits, full names, roles, bio excerpts, link to `/about/[slug]`
     - The Scenius Narrative: How Movemental collaborates with the broader leader network
     - Institutional Invitation CTA: Link to `/assess` and `/enroll`
2. **Build About Page View Component:**
   - Author `src/v2/components/founders/about-page-view.tsx` importing from `src/lib/founders/content.ts`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/about/page.tsx`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/about/page.tsx` renders at `http://localhost:3000/v2/about`.
- [ ] Visual parity matches `Movemental About Founders.dc.html` 1-to-1.
- [ ] The three founders render with real portraits, roles, and bios from `content.ts`.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/founders/ src/app/\(site-v2\)/v2/about/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-17
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
