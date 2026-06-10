# Pre-marketing migration archive — 2026-06

Retired marketing and product UI from `movemental-ai` during the **frontend teardown — agent-only retention** plan.

**Plan:** [`docs/build/plans/frontend-teardown-agent-only-plan-2026-06-05.md`](../../docs/build/plans/frontend-teardown-agent-only-plan-2026-06-05.md)

**Kept live (never archived here):**

- `/agent`, `/agent-runtime`, `src/components/agent-room/**`
- `/api/agent-room/stream`, `/api/simplified/agent-*`
- `src/app/login`, `src/app/forgot-password`, `src/app/auth/**`
- Drizzle → Zod → services → routes → hooks (full six-layer stack)

## Phase 1 — `(site)` marketing routes

**Moved:** `src/app/(site)/` → `app/(site)/` (this folder)

**Preserved outside archive:** `src/app/login/`, `src/app/forgot-password/` (staff auth for agent-runtime)

**Root stub:** `src/app/page.tsx` redirects `/` → `/agent` until incoming marketing merge.

## Phase 2 — `(dashboard)` product routes

**Moved:** `src/app/(dashboard)/` → `app/(dashboard)/`

**Moved:** `src/app/readiness-invite/` → `app/readiness-invite/`

## Phase 3 — marketing components

**Moved:** `src/components/{studio,sections,sections-mock,nav,safety,sandboxlive,onboarding,...}` → `components/` (see folder listing)

**Kept live:** `src/components/agent-room/`, `ui/`, `primitives/`, `providers/`

**Layout:** root `layout.tsx` no longer mounts SiteHeader/SiteFooter (agent-only shell).

## Phase 4 — orphaned lib, hooks, tests

**Moved:** `lib/authenticated/`, `lib/sandboxlive/`, `hooks/onboarding/`, selected tests and scripts.

## Revert

Each phase is a separate commit. `git revert <sha>` restores that phase's moves.
