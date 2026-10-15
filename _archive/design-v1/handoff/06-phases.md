# 6 · Phases

Ordered. Each phase has a gate you can **run**, not eyeball. Do not renumber
these — the state file references them by number.

Run gates with `pnpm`, per L-2.

## Phase 0 — Orientation

1. Read `AGENTS.md` and the relevant guide under `node_modules/next/dist/docs/`.
   This is Next 16.2.3; conventions differ from training data.
2. Read `src/app/globals.css` in full. It is the token source.
3. Read `docs/design/INK_BAND_DESIGN_CHAIN.md` — the design canon.
4. Create `MIGRATION-STATE.md` at the repo root from `templates/`.

**Gate:** `MIGRATION-STATE.md` exists and names the tree sha this handoff was
built against (`205198904fdf`). `pnpm install` completes with no lockfile
mutation — `git diff --exit-code pnpm-lock.yaml` passes.

## Phase 1 — New route: Safety stage

Build `src/app/agent/path/safety/page.tsx` from
`designs/Movemental Safety Stage.dc.html`. Content from the four existing data
files (L-1). No new data file.

**Gate:** `pnpm routes:check` passes · `pnpm link:check` passes (every existing
link to `/agent/path/safety` now resolves) · `grep -rE "#[0-9A-Fa-f]{6}" src/app/agent/path/`
returns nothing · `pnpm typecheck` passes.

## Phase 2 — Home v4

Rebuild the `/agent` home surface from `designs/Movemental Home v4.dc.html`.
The renovated hero: no full-viewport fold, no notebook rule, leaders as a
full-width band under the hero copy, names and headshots only (L-3).

**Gate:** `grep -rE "#[0-9A-Fa-f]{6}" src/components/agent-room/screen/stub/home-screen.tsx src/components/agent-room/screen/stub/leader-band.tsx`
returns nothing · `grep -ri "vouched" src/` returns nothing (the copy changed to
"Built with") · `pnpm typecheck` · `pnpm lint`.

## Phase 3 — Content surfaces

Research (`/research`, `/research/[slug]`, `/research/findings`,
`/research/sources`), articles (`/articles`, `/articles/[slug]`), footnotes,
voices, founders. All `import` mode — the data and most components exist.

**Gate:** `pnpm articles:check` · `pnpm research:tree-check` · `pnpm link:check` ·
`pnpm typecheck`.

## Phase 4 — Commercial surfaces

Program, enroll, field guide, audience editions, decks.

**Gate:** `pnpm typecheck` · `pnpm link:check` · enroll submit still resolves to
the existing `/api/agent-room/enroll` route (grep the form action) · no new
pricing literals: `git diff src/lib/agent-room/data/pricing.ts` is empty.

## Phase 5 — Assess and share

`/assess` reality map, `/share/ai-reality/[token]`.

**Gate:** `pnpm typecheck` · `pnpm test:run` · `pnpm redirects:check`.

## Phase 6 — Dashboard

`/dashboard`, `/dashboard/safety`, both onboarding holding pages. **Not**
`/dashboard/ai-reality` (S-1).

**Gate:** `pnpm typecheck` · `git diff --exit-code src/app/dashboard/ai-reality/`
passes (proving the uncovered screen was left alone) · `pnpm db:check` ·
`grep -r "safety_guidebook" src/app/dashboard/` returns nothing (proving the
unused tables were not wired — S-2).

## Phase 7 — Whole-repo verification

**Gate:** `pnpm validate:all` · `pnpm lint` · `pnpm typecheck` · `pnpm build`
completes with no duplicate-route warning in the output · `pnpm test:run` ·
`grep -rE "#[0-9A-Fa-f]{6}" src/components src/app --include=*.tsx` returns
nothing.

## Phase 8 — Receipt

Write the receipt (`07-return-channel.md`). Update `github.md` if the project
keeps one. Close out `MIGRATION-STATE.md` with every S-1/S-2/S-3 report and
every check-and-branch skip.

**Gate:** `MIGRATION-STATE.md` has a line for every phase 0–8 and every
recorded skip. No phase is marked done with an unrun gate.

## Deferral rule

If a phase cannot complete, write the reason to `MIGRATION-STATE.md`, leave a
`// TODO(migration-slice-N):` marker at the exact site, and continue to the next
phase. Do not block the sequence on one screen.
