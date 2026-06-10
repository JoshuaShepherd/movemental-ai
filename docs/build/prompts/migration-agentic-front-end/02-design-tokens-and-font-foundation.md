# AF-02 — Design tokens and font foundation

**Prompt ID:** AF-02  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-01  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port **`css/ink-band.css` `:root` tokens and `@font-face` equivalents** into the Next.js app as a **scoped surface** that does not pollute marketing pages.

Invoke skills: **`tailwind-cleanup`**, **`typography-polish`**, **`concept-modern-ui`** (for token discipline only).

---

## 2. Goal

1. Load Ink Band fonts via `next/font` or `next/font/google`.
2. Define CSS custom properties under `.ink-band-surface` (or update `@theme` with `--color-ink-band-*` prefix).
3. Port base resets from `ink-band.css` lines 1–12 and typography rules without breaking global `globals.css`.

---

## 3. Source token map

From `movemental-agentic-front-end/css/ink-band.css`:

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#FBFAF6` | Page background |
| `--surface` | `#F6F3EC` | Voice/composer band |
| `--paper` | `#FFFDF7` | Cards/options |
| `--ink` | `#1A1A1A` | Primary text |
| `--ink-muted` | `#5C5651` | Body secondary |
| `--border` | `#E5DFD2` | Hairlines |
| `--hero-dark` | `#0A0E1A` | Rare dark accents |
| `--margin-red` | `#C08A7E` | Sheet margin rule |
| `--ink-blue` | `#22409B` | Voice + gestures + links |
| `--hl-yellow` | `#EAFF3A` | Lead chip highlight |
| `--font-display` | Playfair Display | Headlines |
| `--font-body` | Inter | UI/body |
| `--font-hand` | Caveat | Ink voice |
| `--font-mono` | IBM Plex Mono | Eyebrows/labels |

---

## 4. Implementation guide

### 4.1 Fonts (`src/app/layout.tsx` or agent layout)

Load:

- **Playfair Display** — weights 400, 500, 600 + italics
- **Inter** — 400, 500, 600
- **Caveat** — 500, 600
- **IBM Plex Mono** — 400, 500

Expose as CSS variables on `.ink-band-surface`:

```css
--font-ink-display: var(--font-playfair), Georgia, serif;
--font-ink-body: var(--font-inter), system-ui, sans-serif;
--font-ink-hand: var(--font-caveat), cursive;
--font-ink-mono: var(--font-ibm-plex-mono), monospace;
```

Prefer a dedicated `src/app/agent/layout.tsx` that applies font variables only to the agent route subtree.

### 4.2 Theme tokens

**Option A (recommended):** `@theme inline` entries prefixed `--color-ink-band-*` in `globals.css`, consumed only inside `agent-room.module.css`.

**Option B:** All tokens live in the CSS module `:global(.ink-band-surface) { ... }` block.

Do **not** remap Ink Band blues to marketing `bg-primary` (ink pill).

### 4.3 Base layout rules

Port from prototype:

- `html, body { height: 100% }` → agent layout wrapper only
- `body { overflow: hidden; display: flex; flex-direction: column; height: 100dvh }` → `.room` class
- `-webkit-font-smoothing: antialiased`

### 4.4 SVG filter defs

The ink overlay requires `#rough` and `#marker` filters (see `index.html` lines 17–24). Plan a React component `<InkFilters />` inside the SVG — implement in AF-04.

---

## 5. Definition of Done

- [ ] Fonts load on `/agent` without affecting `(site)` routes.
- [ ] Token table above available as CSS variables inside ink-band surface.
- [ ] No raw hex in TSX (CSS module / theme only).
- [ ] Side-by-side: mast logo + sheet margin rule match prototype screenshot.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 6. Verification

1. Open `http://localhost:3000/agent` — inspect computed `--ink-blue`, `--font-hand`.
2. Open `/` marketing home — confirm Playfair/Caveat **not** leaked into body unless intended.
3. Run `tailwind-cleanup` mental checklist: no `bg-white`, `text-gray-*` in new files.

---

## §10 Attempt log

<!-- Token map confirmation, font loading approach, screenshots notes. -->

### 2026-06-09 — AF-02 tokens + fonts (scoped ink-band surface)

**Approach:** Option-B-style scoped surface. The full Ink Band token map lives on
`.ink-band-surface` (canonical `--color-ink-band-*` / `--font-ink-*`), not in
marketing `@theme`. Verified live on `http://localhost:3002/agent` (3000 was busy).

**Files**

| Path | Change |
| --- | --- |
| `src/app/agent/layout.tsx` | **New.** Loads **Caveat** via `next/font/google` → `--font-ink-hand-face`; wraps the `/agent` subtree in `.ink-band-surface`. Scopes the hand font so `(site)` never fetches it. |
| `src/app/globals.css` | **New scoped block** after the oat tokens: `.ink-band-surface` defines the 10 colors + `margin-red` + 4 `--font-ink-*` families + base (paper bg / ink / Inter / antialiasing) + `:is(h1…h6)` → Playfair. |
| `src/components/agent-room/agent-room.tsx` | Room wrapper class `oat-surface` → `ink-band-surface`. |

**Font loading.** Only **Caveat** is loaded here — the other three Ink Band faces
(Playfair `--font-oat-display-face`, Inter `--font-sans`, IBM Plex Mono
`--font-oat-mono-face`) are already loaded on `<html>` by the root layout and
cascade into `/agent`. `--font-ink-*` chain to those existing faces; no redundant
re-loads. (The root layout's hand face is Homemade Apple, which is **not** Ink
Band — Caveat replaces it inside the room.)

**Token reconciliation vs the existing oat ramp.** AF-00 found oat ≈70% aligned.
Divergences corrected inside `.ink-band-surface`: blue `#1b4b9b → #22409b`,
highlight `#ffeb3b → #eaff3a`, surface `#f8f6f1 → #f6f3ec`, paper `#ffffff →
#fffdf7`, hand `Homemade Apple → Caveat`; `margin-red #c08a7e` added (oat lacked
it). bg / ink / ink-muted / border / hero-dark already matched.

**Compatibility bridge (temporary).** The current `agent-room.module.css` still
reads `--color-oat-*` / `--font-oat-*`. Rather than rewrite that 759-line module
now, `.ink-band-surface` re-points the **diverging** oat names to the ink-band
values *within scope* (`--color-oat-surface/-elevated/-blue/-blue-deep/-highlight`,
`--font-oat-hand`). So `/agent` paints the prototype palette immediately. The
bridge is deleted when screens are rewritten to consume `--color-ink-band-*`
directly (AF-08–AF-10). Documented in the globals.css block header + ADR.

**Deviation from §4.2 Option A.** Used a scoped `.ink-band-surface` rule block
(Option B), **not** `@theme inline --color-ink-band-*`. Reason: `@theme` tokens
land on `:root` globally and generate utilities app-wide; the room needs the ramp
*scoped* and to also host the temporary oat→ink bridge, which `@theme` can't
express. Marketing isolation is stronger this way.

**SVG `#rough` / `#marker` filters (§4.4):** not added — deferred to AF-04
(`<InkFilters />`) as instructed.

**Verification (DoD)**

- [x] Fonts load on `/agent` (200; Caveat `@font-face` in a `/agent`-only chunk,
  7 refs in HTML) **without** affecting other routes (Caveat = 0 / ink-band-surface
  = 0 on `/` and the 404 pages). NOTE: the `(site)` pages are currently archived in
  the working tree (pre-marketing-migration move), so `/` 307-redirects to `/agent`
  and `/about` etc. 404 — scoping still proven by zero Caveat outside `/agent`.
- [x] Token table available as CSS vars inside the surface — compiled CSS carries
  `.ink-band-surface` rule, `--color-ink-band-blue`, `#22409b`, `#eaff3a`, and all
  five bridge overrides (`oat-* : var(--color-ink-band-*)`).
- [x] No raw hex in TSX — colors live in globals.css only; `layout.tsx` has none.
- [x] `pnpm typecheck` green (after `next typegen` regenerated the stale
  `.next/dev/types` validator that flags any newly-added route layout).
- [~] Side-by-side mast logo + sheet margin rule — the **margin rule** (`.sheet::before`)
  isn't in the current module; it lands with the notebook framing in AF-03/AF-08.
  `--color-ink-band-margin-red` is defined and ready. Pixel screenshot compare → AF-12.
- AF-90 guardrails intact: no stream/agents/db/auth touched.
