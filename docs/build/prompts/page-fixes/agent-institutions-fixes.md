# Fix: Institutions (`/agent/institutions`)

## Context

You are working in the `movemental` repo — Next.js 16 + React 19 + Tailwind v4 + shadcn/ui.

- **pnpm only.**
- This page is on the **Ink Band** design system (`docs/design/INK_BAND_DESIGN_CHAIN.md`), NOT Concept Modern. The `/agent` route group is wrapped in `.ink-band-surface` by `src/app/agent/layout.tsx`.
- **Token rule:** no raw hex, no hardcoded fonts. Everything resolves to `var(--color-ink-band-*)` and `var(--font-ink-*)`. The page already honors this — keep it that way.
- Ink Band type voices: **Playfair** (`--font-ink-display`) for headlines + card titles, **Inter** (`--font-ink-body`) for body, **IBM Plex Mono** (`--font-ink-mono`) for eyebrows/labels, **Caveat** (`--font-ink-hand`) for the **agent voice only**.
- Ink Band card radii are **12–16px**; pills are `999px`; borders are hairline `1px`.
- Files in play:
  - `src/components/agent-room/institutions/institutions-experience.tsx`
  - `src/components/agent-room/institutions/institutions-data.ts`
  - `src/components/agent-room/institutions/institutions.module.css`
  - `src/components/agent-room/institutions/foundation-diagram.tsx`
  - `src/components/agent-room/use-agent-room-hybrid.ts`

Full rationale: `reports/page-audits/agent-institutions-audit.md`.

---

## Change 1: Snap card radii onto the Ink Band card idiom (or document the variant)

**Why:** Cards/panels use `border-radius: 2px`; the Ink Band charter's card vocabulary is 12–16px. Either conform, or record `2px` as a deliberate variant in the design chain. (Default: conform.)
**File:** `src/components/agent-room/institutions/institutions.module.css`
**Current:** `border-radius: 2px;` on `.card`, `.letterPanel`, `.foundationVis`, `.stage`
**Replace with:** `border-radius: 12px;` on each (leave `999px` pills and `2px` only if you choose the documented-variant path).

## Change 2: Pain-card titles in Playfair

**Why:** Ink Band card titles are display type; `.cardTitle` is currently Inter.
**File:** `institutions.module.css` (`.cardTitle`, ~line 259)
**Current:**
```css
.cardTitle {
  font-family: var(--font-ink-body);
  font-size: 0.95rem;
  font-weight: 600;
```
**Replace with:**
```css
.cardTitle {
  font-family: var(--font-ink-display);
  font-size: 1.05rem;
  font-weight: 500;
```

## Change 3: Close the dead end + revive the orphaned seam

**Why:** The page never links into the live guide; meanwhile the `movemental:agent-seed` consumer in the hybrid room is dead code. Add a guide link in **Start** that seeds the room — this fixes both at once.
**File:** `institutions-experience.tsx` (Start section, ~line 315) and `institutions.module.css`
**Add** to the `.startCtas` block a primary link that stores a seed then routes:
```tsx
<button
  type="button"
  className={styles.btnPrimary}
  onClick={() => {
    try { window.sessionStorage.setItem("movemental:agent-seed", "We're a seminary. Where do we start with Safety?"); } catch {}
    window.location.href = "/agent";
  }}
>
  Talk it through with the guide →
</button>
```
**Alternative (if you don't want the guide link):** delete the `movemental:agent-seed` consumer block in `use-agent-room-hybrid.ts` (~lines 550–568) so no dead code remains.

## Change 4: Resolve the Caveat pull-quote

**Why:** Caveat is reserved for the agent voice. The Formation pull-quote borrows it as decoration.
**File:** `institutions-experience.tsx:276`
**Option A (keep the hand, make it an agent aside):** prefix it so it reads as the guide speaking.
**Option B (stay strict):** change `.hand` here to a Playfair-italic `.q`-style line instead of Caveat.

## Change 5: Add `hero` to the scroll-spy map

**Why:** The sidebar highlights "Where you stand" while the reader is still on the hero.
**File:** `institutions-data.ts:12`
**Current:** `INSTITUTIONS_SPY_SECTIONS` starts at `where-you-stand`.
**Replace with:** prepend `{ id: "hero", navIndex: 0 },` (and give `id="hero"` to the hero `<section>` — it already has it).

## Change 6: Fix the FoundationDiagram a11y conflict

**Why:** An `aria-label`'d SVG inside `div[aria-hidden="true"]` is unreadable by AT.
**File:** `foundation-diagram.tsx:6`
**Current:** `<div className={styles.foundationVis} aria-hidden="true">`
**Replace with:** `<div className={styles.foundationVis}>` (keep the inner `<svg role="img" aria-label=…>`).

## Change 7: Add one trust signal near the close

**Why:** The letter makes first-person credibility claims with no face behind them.
**File:** `institutions-experience.tsx` (Start or the-case section)
**Add:** a restrained mono line (e.g. "Built with a network of trusted movement leaders.") or a single trusted-voices strip consistent with the Ink Band home proof band. No new tokens.

---

## Validation

1. `pnpm typecheck` — zero errors.
2. `pnpm lint src/components/agent-room/institutions` — clean.
3. `pnpm build` — completes clean (the page reads the letter from disk at build/request time).
4. Visual verify at `localhost:3001/agent/institutions`:
   - Sidebar highlights the section you're actually reading (incl. hero).
   - Cards read as warm-paper Ink Band cards (12px), titles in Playfair.
   - "Talk it through with the guide →" routes to `/agent` and the guide opens on the seeded question.
   - No raw hex introduced (`grep -nE "#[0-9a-fA-F]{3,6}" institutions.module.css` returns nothing).
