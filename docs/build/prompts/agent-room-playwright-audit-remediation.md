# Agent room Playwright audit — fix prompt

**Prompt ID:** agent-room-playwright-audit  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Audit run:** 2026-06-17 (Playwright `pnpm test:e2e`, no Playwright MCP in this environment)  
**Last updated:** 2026-06-17

Paste the block below into a fresh agent turn. It is self-contained and repo-aware.

---

## Audit summary

Playwright was run against the live dev server (`http://localhost:3000`) across:

| Suite | Result |
| --- | --- |
| `tests/e2e/agent-home-dock.spec.ts` | **10/10 passed** |
| `tests/e2e/agent-home-freeze.spec.ts` | **6/6 passed** |
| `tests/e2e/agent-ways-in-interaction.spec.ts` | **2/2 passed** |
| `tests/e2e/agent-room.spec.ts` (hybrid blocks) | **2 failed**, 4 passed, rest skipped (mode/engine gated) |

Additional one-off route/scene audits were run in-process (not committed). Chrome DevTools MCP was unavailable (no Chrome binary on host).

**Shipped behavior that is green:** home opening choreography, composer enablement, lead chip → local safety flow, hybrid collapsed chips → local screens (About/Cost/Contact), whole-path local screen, ways-in drawer + segment doors, mast audience nav, audience page section anchors, mobile overflow on audience pages, `?ask=` deep-link seeding (code review; add E2E).

---

## The prompt

> You are fixing every issue found in the **2026-06-17 agent room Playwright audit** across `/agent` and all `/agent/*` surfaces. Work in priority order. Do not restyle for taste — hold to Ink Band canon and existing hybrid routing SSOT.
>
> ### 0. Orient first
>
> 1. Read these SSOT docs (in order):
>    - `docs/build/notes/agent-room-chat-conversation-ui-ssot.md`
>    - `docs/build/notes/agent-home-dock-functionality-2026-06-15.md`
>    - `docs/build/notes/agent-platform-complete-reference.md`
>    - `CLAUDE.md` + `docs/design/INK_BAND_DESIGN_CHAIN.md`
> 2. Re-run the audit baseline:
>    ```bash
>    pnpm test:e2e tests/e2e/agent-home-dock.spec.ts tests/e2e/agent-home-freeze.spec.ts tests/e2e/agent-ways-in-interaction.spec.ts
>    RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
>    pnpm typecheck
>    ```
> 3. Map surfaces before editing:
>
> | Surface | Routes | Shell |
> | --- | --- | --- |
> | Agent room home | `/agent` | `AgentRoom` + dock |
> | In-room screens | (choreography) | `SCENES` in `src/lib/agent-room/data/scenes.ts` |
> | Audience docs | `/agent/{nonprofits,churches,institutions}` | `DocumentPageShell` + `AudiencePageExperience` |
> | Deck (embedded + standalone) | `#why-a-platform`, `/agent/*/deck` | `DeckSection` / `StandaloneDeck` |
> | Utility | `/agent/about`, `/agent/how-we-use-ai`, `/agent/movement-voices` | Document chrome |
> | Auth-gated | `/agent/assessment`, `/agent/invite` | Generic `<main>` (misaligned) |
>
> ---
>
> ### 1. CRITICAL — Accessibility: ambiguous **Send** button (home)
>
> **Finding:** `getByRole('button', { name: 'Send' })` resolves to **two** elements on `/agent`:
> - Composer submit (`aria-label="Send"`)
> - Leader carousel item for **Brad Brisco** — accessible name includes **"Send Network"** from `cred`, so Playwright reports `Brad Brisco Brad Brisco Send`.
>
> **Failures:** `tests/e2e/agent-room.spec.ts` hybrid tests using shared `send()` helper (strict mode violation).
>
> **Fix (product, not just tests):**
> - In `src/components/agent-room/screen/stub/leader-band.tsx`, give each carousel `button` an explicit `aria-label` such as `View ${leader.name}` (or `Open ${leader.name}'s profile`).
> - Mark decorative credential copy with `aria-hidden="true"` on `.faceCred` (and optionally `.faceName` if the label is sufficient).
> - Verify with: `getByRole('button', { name: 'Send' })` → exactly **one** match after opening choreography.
>
> **Test hygiene:** Update `send()` in `tests/e2e/agent-room.spec.ts` to use `#composer-form` + `{ name: 'Send', exact: true }` (already done in `agent-home-dock.spec.ts`) so regressions are caught even if a future leader cred regresses.
>
> ---
>
> ### 2. HIGH — Typed routing: **"pricing"** does not open local cost screen
>
> **Finding:** `show me pricing` stays on home, expands the conversation dock, and **POSTs** `/api/agent-room/turn` (live agent). Debug confirmed `posted: true`.
>
> **Root cause:** `src/lib/agent-room/route-input.ts` — `ROUTES` cost regex is `/cost|price|much|free|pay|afford/` (no **`pricing`**). `routeInput()` returns `"fallback"` before `isHighConfidenceLocalRoute()` can apply (which *does* include `pricing`).
>
> **Fix:**
> - Add `\bpricing\b` to the cost `ROUTES` regex (keep order stable).
> - Add a unit test or Playwright case: typed `show me pricing` → pricing screen visible (`What this pricing refuses` or pricing eyebrow) with **zero** stream calls in hybrid.
> - Audit other high-confidence-only words for the same drift (grep `isHighConfidenceLocalRoute` vs `ROUTES`).
>
> ---
>
> ### 3. HIGH — Standalone deck routes: layout surface collapses
>
> **Finding:** `/agent/{nonprofits,churches,institutions}/deck` render content (H1 visible, `DeckStage` `position: fixed`, ~720px tall) but **`.ink-band-surface` from `src/app/agent/layout.tsx` has `height: 0`**. Playwright `toBeVisible()` on `.ink-band-surface` fails even though the deck is usable.
>
> **Risk:** Background token ramp not painted behind fixed deck; SEO/a11y tree oddities; false-negative E2E selectors.
>
> **Fix (pick one, document choice):**
> - **A (preferred):** For standalone deck pages only, ensure the scoped surface fills the viewport — e.g. `min-height: 100dvh` on `.ink-band-surface` when it contains `.standalone`, or a thin `deck-layout.tsx` wrapper.
> - **B:** E2E should assert on deck stage (`h1`, deck controls) not `.ink-band-surface` for `/deck` routes.
>
> Also fix **duplicate title**: `Why a platform… | Movemental | Movemental` — check `metadata.title` + root layout title template in `src/app/agent/*/deck/page.tsx`.
>
> ---
>
> ### 4. MEDIUM — Chip vs typed parity (hybrid UX)
>
> **Finding (intentional but confusing):**
> - **Chips** "About Movemental" / "What does it cost?" → **agent chat** (expand dock, SSE) per `composer-routing.ts` / hybrid classifier.
> - **Typed** `tell me about movemental` → **local** `whatIs` scene → full **about screen** on the sheet (no dock expansion).
>
> **Action:** Product decision required — either:
> - **Align typed to chips** (route high-confidence about/cost/contact to agent utterance, not full screen), **or**
> - **Align chips to typed** (restore local `whatIs` / `cost` scenes for chips in hybrid), **or**
> - **Keep split** but add concierge voice line when typed opens a screen: *"Here's the page — the short version while you read."* (already partially in `SCENES.whatIs`).
>
> Document the chosen rule in `agent-home-dock-functionality` and `move-classifier.ts` header comment. Add one Playwright test per chosen behavior.
>
> ---
>
> ### 5. MEDIUM — Auth utility pages outside Ink Band chrome
>
> **Finding:** `/agent/assessment` and `/agent/invite` render generic `<main>` (assessment redirects to `/assess` when logged out — OK). They inherit `.ink-band-surface` from layout but **do not** use `utility-shell.tsx` / document chrome pattern used on `/agent/about`.
>
> **Fix:** Wrap with `InkBandUtilityShell` (or existing utility pattern from `src/components/ink-band/utility-shell.tsx`) so typography, spacing, and back-nav match other `/agent/*` utility pages. Preserve auth redirects.
>
> ---
>
> ### 6. MEDIUM — Build explorer tab panels (audience pages)
>
> **Finding:** `#the-build` / `TheBuildExplorer` mounts on all three audience pages. Tab switching works, but **inactive** `role="tabpanel"` nodes use `aria-hidden={!isActive}` — correct pattern, but verify:
> - Active panel content is visible and keyboard-reachable.
> - `aria-controls` / `id` pairs are unique per capability.
> - "Explore it live →" links resolve (not `#` / 404).
>
> Run `movemental-ink` + `responsive-audit` skills on `the-build-explorer.tsx` after any changes.
>
> ---
>
> ### 7. MEDIUM — Leader carousel interaction & portraits
>
> **Finding:** Carousel buttons use CSS-module class `carItem` (hashed) — E2E must use `button[data-i]` or `aria-label` from fix §1. Leader click → profile scene should be covered by a stable selector.
>
> **Portraits:** `public/agent-room/leaders/{0..16}.jpg` exist. Intermittent "broken image" flags in audit were **off-screen / not-yet-loaded** carousel images — prefer `loading="eager"` for first viewport portraits or `decoding="async"` + wait in tests. Do not treat as missing assets unless 404 in network tab.
>
> ---
>
> ### 8. MEDIUM — Document → room handoff (`?ask=` / `?from=`)
>
> **Code path:** `readAgentDeepLink()` → hybrid seed effect in `use-agent-room-hybrid.ts` (sends first turn after opening settles).
>
> **Add E2E:**
> 1. Visit `/agent/nonprofits`, click a document dock chip that sets `agentAsk` (see `DocumentPageShell`).
> 2. Assert URL `/agent` (params stripped), opening completes, seeded question appears in thread or triggers expected route.
>
> ---
>
> ### 9. LOW — Test suite gaps & gates
>
> | Gap | Action |
> | --- | --- |
> | `RUN_AGENT_ROOM_E2E=1` required for `agent-room.spec.ts` | Document in `tests/e2e/README` or `CLAUDE.md` |
> | Stream/stub/live blocks skipped in default hybrid dev | CI matrix: hybrid + stream fallback at minimum |
> | `agent-room-discuss.spec.ts` needs `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` | Add to CI when Discuss ships |
> | `send()` strict violation | Fixed by §1 + test helper update |
>
> ---
>
> ### 10. Choreography & dock behavior (verify, fix only if broken)
>
> These **passed** audit — re-verify after your changes:
>
> - Opening scene: zero stream calls in hybrid; chips enable within 20s mobile/desktop.
> - Lead chip → `toSafetyFlow` local (no SSE).
> - `show me the whole path` → path screen; scene chip `Show me Safety` → safety screen.
> - Expand drawer → ways-in tabs (Non-profits / Churches / Institutions) + doors.
> - Agent reply in expanded mode: text in **thread**, not collapsed handwriting strip (`agent-home-dock` test).
> - Mast replay / home control does not leave chips disabled (`agent-home-freeze`).
> - Carousel prev/next stress: main thread recovers (double-rAF &lt; 500ms).
>
> **Do not** expand the dock on local-only `run(scene)` turns unless the user explicitly engaged chat — if you see sheet hidden while voice plays locally, check `dockExpanded` + `ScreenZone` unmount in `agent-room.tsx`.
>
> ---
>
> ### 11. Design canon checks (run skills after functional fixes)
>
> ```bash
> # After code changes
> pnpm typecheck
> pnpm test:e2e tests/e2e/agent-home-dock.spec.ts tests/e2e/agent-home-freeze.spec.ts
> RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
> ```
>
> Invoke skills on touched UI:
> - `movemental-ink` — Ink Band fidelity
> - `color-audit` — token contrast on deck + audience pages
> - `responsive-audit` — 390px / 1280px on `/agent` + one audience page + one deck route
> - `typography-polish` — document pages + in-room screens
>
> ---
>
> ### 12. Files likely to change (start here)
>
> | Issue | Files |
> | --- | --- |
> | Send a11y | `src/components/agent-room/screen/stub/leader-band.tsx` |
> | Pricing route | `src/lib/agent-room/route-input.ts`, tests |
> | Deck layout | `src/app/agent/layout.tsx` or `src/components/agent-room/deck/deck.module.css`, `src/app/agent/*/deck/page.tsx` (title) |
> | Chip/typed parity | `src/lib/agent-room/move-classifier.ts`, `src/lib/agent-room/composer-routing.ts`, `src/lib/agent-room/data/scenes.ts` |
> | Utility shell | `src/app/agent/assessment/page.tsx`, `src/app/agent/invite/page.tsx` |
> | E2E | `tests/e2e/agent-room.spec.ts`, new `tests/e2e/agent-audience-handoff.spec.ts` |
>
> ---
>
> ### 13. Definition of done
>
> - [ ] `getByRole('button', { name: 'Send' })` is unique on `/agent` after opening.
> - [ ] `show me pricing` opens local pricing screen with **no** `/api/agent-room/turn` in hybrid.
> - [ ] Standalone deck routes: visible ink-band background **or** documented E2E exception; title has no duplicate `Movemental`.
> - [ ] Chip vs typed routing documented + one test encodes the decision.
> - [ ] Assessment + invite use Ink Band utility chrome.
> - [ ] `RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts` — hybrid block green.
> - [ ] `pnpm typecheck` clean.
> - [ ] No Concept Modern / `oat-*` token leakage on touched surfaces.

---

## Reference: in-room screen inventory (choreography targets)

Local `SCENES` screens to spot-check manually or extend E2E coverage:

`home`, `about`, `pricing`, `faq`, `founders`, `contact`, `path`, `sandbox`, `training`, `technology`, `safety`, `safetyFlow`, `beat`, `readback`, `leader`, `capture`, `confirm`, `stream` (engine).

Typed regex router: `src/lib/agent-room/route-input.ts`.  
Hybrid classifier: `src/lib/agent-room/move-classifier.ts`.

---

## Reference: Playwright commands

```bash
# Core regression (always run)
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts tests/e2e/agent-home-freeze.spec.ts tests/e2e/agent-ways-in-interaction.spec.ts

# Full agent room suite (hybrid default dev server)
RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts

# Discuss phase (flagged)
RUN_AGENT_ROOM_E2E=1 NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts

# Single-file with UI
pnpm test:e2e:ui tests/e2e/agent-home-dock.spec.ts
```
