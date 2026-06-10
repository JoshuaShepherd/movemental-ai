# AF-10 — Screens: leader profiles

**Prompt ID:** AF-10  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-07, AF-06  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port the **leader profile** screen and portrait band integration. This is the highest-content surface — 17 leader indices (0–16) with approved vs stub records.

References:

- `pages/leader/0.html` … `pages/leader/16.html`
- `js/data/profiles.js` — `getProfile()`, `leaderHTML()`, scene lines
- `js/data/scenes.js` — `leaderScene(i)` choreography

---

## 2. Goal

1. `LeaderScreen` component accepting `leaderIndex: number`.
2. Render approved profiles with full bio/work/connection blocks.
3. Render stub profiles with honest placeholder copy (from prototype).
4. Portrait band on home (`LeaderBand`) shares data with `LEADERS`.

---

## 3. Data seam — preserve `getProfile()`

```ts
// profiles.ts — DO NOT bypass
export function getProfile(index: number): LeaderProfile { ... }
```

React component calls `getProfile(opts.leader ?? 0)` when show act includes leader index.

Future AF-90 may swap implementation for RAG — **UI unchanged**.

---

## 4. Leader screen layout

From CSS + HTML:

- `.lead-head` — hero circle photo + meta
- `.lead-role` — mono uppercase
- `.lead-bio` — muted prose
- Work layers / connection copy / optional links
- Flip animation when entering from band (use `pendingFlip` rect if implemented)

Port grayscale→color hover on images:

```css
filter: grayscale(1) sepia(.32) brightness(1.03) contrast(1.04);
```

Use `next/image` with local or remote src matching prototype URLs.

---

## 5. Scene integration

`leaderScene(i)` in scenes.js — sequence of say/show/gesture acts. Ensure:

- `show: 'leader'` passes leader index in act object
- Voice lines use `workSay` / `connectSay` arrays from profile when approved

---

## 6. Founders overlap

`founders` screen (AF-09) shares team markup with founders subset — extract shared `TeamMember` subcomponent if duplication appears.

---

## 7. HTML → React tips

| Prototype | React |
| --- | --- |
| `leaderHTML(i)` string | `<LeaderProfile profile={getProfile(i)} />` |
| Index-based img paths | Import or public folder `/agent/leaders/` |
| Conditional approved blocks | `{profile.approved ? … : …}` |

Generate static pages list:

```bash
ls movemental-agentic-front-end/pages/leader/
```

Each file is a QA reference for its index.

---

## 8. Definition of Done

- [ ] All 17 leader indices render without runtime errors.
- [ ] Approved leaders (0–4+ per source) show full content from `profiles.ts`.
- [ ] Stub leaders show honest stub state (no fabricated claims).
- [ ] Band on home matches leader indices and click → leader scene.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 9. Verification

| Test | Action |
| --- | --- |
| Alan Hirsch | Open leader 0 — compare to `pages/leader/0.html` |
| Stub leader | Open highest index stub — compare placeholder |
| Scene | Run `whoBehind` or tap band face — voice lines match scene |

---

## §10 Attempt log

<!-- Image asset strategy, approved index list, stub copy verification. -->

### 2026-06-10 — AF-10 leader profiles (Claude Code)

**Branch:** `slice/S02-leader-corpus-onboarding` (uncommitted). **typecheck:** ✅ green. **lint:** no new issues in touched files (the repo's 112 pre-existing problems are all in unrelated service files; 0 mention `agent-room`).

**What shipped**

- **`src/components/agent-room/screen/stub/leader-screen.tsx`** — the real `LeaderScreen` (port of `leaderHTML(i)`), replacing the last placeholder. Reads the leader index off `opts.id`; `getProfile(i)` is the single content seam. Approved record → `.lead-bio` + "Their work" `LayerRow`s (`n="—"`) + "How they connect"; un-approved → honest stub copy (kept for graceful degradation, though all 17 are approved). Crumb (→ `onHome`) and `LayerRow` reused from AF-09 `chrome.tsx`.
- **`leader-flip.ts`** — module-scoped one-shot rect (prototype `pendingFlip`). The band click captures the tapped `#ph-N` portrait's `getBoundingClientRect()`; `LeaderScreen` consumes it once in a `useLayoutEffect` (keyed on leader index; the screen node remounts on every `show` via the view's `screenKey`, so it fires fresh each open) and morphs `#leaderHero` from band → final position. **Reduced-motion skips the FLIP** via `matchMedia`.
- **`leader-scenes.ts`** — `leaderScene(i)` / `leaderWorkScene(i)` / `leaderConnectScene(i)` as pure factories (mirrors AF-08's `beat-scenes.ts`). Byte-identical voice lines; `sayScene` reused from `profiles.ts`.
- **`use-agent-room-stub.ts`** — `currentLeaderRef`; `onLeaderSelect(i)` sets it + `play(leaderScene(i))`; `run()` intercepts the `leaderWork` / `leaderConnect` chip targets (the prototype overrode `SCENES.*` with `currentLeader`-closing fns) before the static SCENES lookup.
- **`leader-band.tsx`** — `selectLeader()` captures the `#ph-N` rect then calls `onSelect`.
- **CSS** — `.leadHead/.leadHero(+img)/.leadMeta h1/.leadRole/.leadBio/.fade` ported into `ink-band.module.css` (oat→ink tokens). Grayscale→color filter matches the band.
- **Deleted** `placeholders.tsx` (it held only `LeaderScreen`); registry now 12/12 real.

**Image strategy:** portraits already externalized to `public/agent-room/leaders/{0..16}.jpg` (AF-06); the hero reuses the same `<img>` + filter as the band (eslint `no-img-element` disabled with a rationale, as in `leader-band.tsx`) so the FLIP transform is unencumbered by `next/image`.

**Approved index list:** all 17 (0–16) ship `approved: true` in `profiles.ts` — no stub leaders remain in data, but the stub render/scene branches are retained.

**Verification (Playwright, headless chromium-1223, `/agent` stub mode):**

- 17/17 indices render with `#leaderHero img`, a name `<h1>`, and both "Their work" + "How they connect" sections — 0 runtime errors.
- Leader 0 (Alan Hirsch): chips `What does Alan work on?` / `How is Alan connected?` / `Back to the leaders` / simple-next-steps all present; tapping work → `leaderWork` voice with **no screen swap** (stays on leader); connect → `leaderConnect`, also no swap; `Back to the leaders` → home with 17 faces.
- Band → leader → crumb round-trips to home cleanly.
- Reduced-motion context: leader hero still renders, FLIP skipped, 0 pageerrors.
- **0** `/api/agent-room/stream` calls across the whole flow; **0** console errors.

**Deferred:** the leader screen still gets the container's uniform `settle` wrapper (AF-07 decision) in addition to FLIP + per-element `.fade`; the prototype dropped `settle` on `leader` specifically. Visually fine (both short, same start) — left consistent with AF-08/09 rather than special-casing the container. Revisit in AF-12 if it reads as double-motion.
