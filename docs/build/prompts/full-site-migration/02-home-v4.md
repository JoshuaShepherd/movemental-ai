# FSM-02: Movemental Home v4 (`/` and `/agent`)

**ID:** FSM-02  
**Phase:** Tier 1 — Core Public Anchors  
**Target Route/Files:**  
- Staging routes: `src/app/(site-v2)/v2/page.tsx`, `src/app/(site-v2)/v2/agent/page.tsx`  
- Staging components: `src/v2/components/home/home-v4-content.tsx`, `src/v2/components/home/leader-band-v4.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Home v4.dc.html`  
**Dependencies:** FSM-00  
**Status:** Ready for execution  

---

## 1. Context & Objective

Per decision **L-5** (`docs/handoff/03-decisions.md`), the Home surface is built strictly from **`Movemental Home v4.dc.html`**. Earlier versions (Home v2, v3, and the original full-viewport single-screen layout) are archived history.

Home v4 introduces the renovated hero:
- No restrictive full-viewport 100dvh lock.
- No vertical notebook margin on the hero.
- A full-width recessed band (`--color-ink-band-surface`) displaying the 25 movement leaders.
- Strictly names and headshots only (L-3) for leaders; no unverified role or bio lines.
- Copy reads "Built with a network of trusted movement leaders" (not "vouched").

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Home v4.dc.html` (authoritative layout and copy)
- `docs/handoff/02-drift.md` (§Home v4 & §Leader roster)
- `docs/handoff/03-decisions.md` (§L-3, §L-5)
- `src/lib/agent-room/data/home-copy.ts` (home copy strings)
- `src/lib/agent-room/data/leaders.ts` (leader roster data: names and headshot asset paths)
- `src/components/brand/movemental-logo.tsx` (brand wordmark)

---

## 3. Anti-Invention & Design Constraints

- **L-3:** Names and headshots ONLY for the 25 movement leaders. `primary_role` is empty in the database for 24 of 25 leaders; do not pre-fill or invent roles or bios.
- **Copy:** "Built with" strip, never "vouched".
- **L-4:** Zero hex in TSX files. Translate all colors:
  - Band background: `var(--color-ink-band-surface)`
  - Card background: `var(--color-ink-band-paper)`
  - Hairlines: `var(--color-ink-band-border)`
  - Ink primary: `var(--color-ink-band-ink)`
  - Ink muted: `var(--color-ink-band-ink-muted)`
- **Fonts:** Display headline in Playfair Display (`font-serif`), body in Inter (`font-sans`), margin annotations in Caveat (`font-ink-hand`).

---

## 4. Implementation Steps

1. **Extract Markup from Home v4:**
   - Read `Movemental Home v4.dc.html` to map the exact sections:
     - Header / Mast: Brand logo with geometric wordmark, right-side nav / auth links
     - Renovated Hero: Eyebrow, Playfair headline, value proposition lede, primary CTA ("Start with your reality check" -> `/assess`), secondary CTA ("Explore the Safety Charter" -> `/agent/path/safety`)
     - Full-Width Leader Band: Recessed surface with the 25 leader headshot avatars and names
     - Diagnostic Value Pillars: Three structured cards illustrating the path (Assess, Govern, Mobilize)
     - Interactive Entry Seams: Suggestion chips ("What is our exposure?", "Show me pricing", etc.)
     - Footer: Site map, legal links, EEAT footnotes citation link
2. **Build Leader Band Component:**
   - Author `src/v2/components/home/leader-band-v4.tsx` rendering the 25 leader headshots and names using `src/lib/agent-room/data/leaders.ts`.
3. **Build Home Content Component:**
   - Author `src/v2/components/home/home-v4-content.tsx` assembling the full v4 page.
4. **Wire Staging Pages:**
   - Author `src/app/(site-v2)/v2/page.tsx` and `src/app/(site-v2)/v2/agent/page.tsx` rendering `<HomeV4Content />`.
5. **Verify No Hex & No "vouched" Copy:**
   - Grep for hex and "vouched" to confirm compliance.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/page.tsx` renders Home v4 at `http://localhost:3000/v2`.
- [ ] Visual appearance matches `Movemental Home v4.dc.html` 1-to-1.
- [ ] 25 movement leaders render with headshots and names only (zero unverified role text).
- [ ] Copy says "Built with" (zero occurrences of "vouched").
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Check for forbidden copy
! grep -ri "vouched" src/v2/components/home/

# 2. Check for hex literals
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/home/ src/app/\(site-v2\)/v2/page.tsx

# 3. Typecheck
pnpm typecheck

# 4. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-02
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
