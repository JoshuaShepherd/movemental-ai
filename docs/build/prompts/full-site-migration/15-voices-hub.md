# FSM-15: Voices Hub (`/voices`)

**ID:** FSM-15  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/voices/page.tsx`  
- Staging components: `src/v2/components/voices/voices-hub-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Voices.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Per authoritative drift resolution (§00-index.md #3 & §05-fixture-seam.md), `/voices` is **not** the raw 25-leader table from Supabase. The published editorial profiles are the three rights-cleared leaders in `src/lib/committed-voices.ts`:
- Liz Rios
- JR Woodward
- Rowland Smith

The broader 25-leader scenius is displayed as a network roster underneath, clearly labelled as having unlinked/in-progress profiles until rights clear.

Build the candidate screen in `src/app/(site-v2)/v2/voices/` matching `Movemental Voices.dc.html` 1-to-1 while consuming `src/lib/committed-voices.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Voices.dc.html` (authoritative layout and framing)
- `src/lib/committed-voices.ts` (the 3 rights-cleared voices)
- `src/lib/agent-room/data/leaders.ts` (the 25 leaders in the wider scenius)
- `src/components/voices/voices-hub-page.tsx` (existing hub component)
- `src/app/voices/page.tsx`

---

## 3. Anti-Invention & Design Constraints

- **Three Published Voices:** Only Liz Rios, JR Woodward, and Rowland Smith have active profile links (`/voices/[slug]`).
- **The Wider Scenius Roster:** The remaining 22 movement leaders display names and headshots only (L-3) without role descriptions or broken links.
- **L-4:** Zero hex in TSX files:
  - Featured profile cards: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Tag / Domain pill: `var(--color-ink-band-surface)` with muted ink.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Voices.dc.html`:
     - Header / Mast: Fixed `3.6rem` with crumb navigation
     - Voices Hero: Eyebrow, Playfair headline, framing statement on vetted movement leadership
     - Featured Published Profiles: The 3 committed voices with large portrait, bio excerpt, core thesis, and link to `/voices/[slug]`
     - Wider Scenius Wall: The 25-leader roster, explicitly framed as participating network voices
2. **Build Voices Hub Component:**
   - Author `src/v2/components/voices/voices-hub-view.tsx` importing from `src/lib/committed-voices.ts` and `src/lib/agent-room/data/leaders.ts`.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/voices/page.tsx`.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/voices/page.tsx` renders at `http://localhost:3000/v2/voices`.
- [ ] Visual parity matches `Movemental Voices.dc.html` 1-to-1.
- [ ] Features the 3 committed voices with working profile links and the 25-leader scenius roster.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/voices/ src/app/\(site-v2\)/v2/voices/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-15
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
