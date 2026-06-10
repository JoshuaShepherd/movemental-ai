# Frontend teardown — agent-only retention plan

**Created:** 2026-06-05  
**Status:** Ready for execution (not started)  
**Intent:** Archive every marketing, dashboard, and product UI surface in this repo while **keeping all agentic work intact** and **not changing the six-layer architecture** (Drizzle → Zod → services → API routes → hooks → UI). Marketing pages and components will be replaced by a migration from a separate repo; this repo becomes the home for agent schema, agent admin, the public Agent Room, and the engine proxy — not the full product shell.

---

## 1 — What this plan is (and is not)

### In scope

- Move **pages** and **UI components** that are not agent-related into `_archive/` (or delete only when explicitly safe and superseded).
- Leave the repo in a state where **`pnpm typecheck`**, **`pnpm build`**, and **`pnpm validate:all`** still pass after each slice.
- Preserve a working **`/agent`** public surface and **`/agent-runtime`** staff admin.
- Document exactly what stays live vs archived so the incoming marketing migration does not fight ghost imports.

### Out of scope (explicit non-goals)

| Layer | Policy |
|-------|--------|
| **Layer 1 — Drizzle** (`src/lib/db/schema.ts`, migrations) | **Do not modify.** Agent tables and the rest of the platform schema stay as-is. |
| **Layer 2 — Zod** (`src/lib/schemas/`) | **Do not modify** except regenerating from schema if a future schema change happens elsewhere. |
| **Layer 3 — Services** (`src/lib/services/simplified/`) | **Do not delete or refactor.** Unused services are fine to leave dormant. |
| **Layer 4 — API routes** (`src/app/api/simplified/*`, contact/newsletter, etc.) | **Do not bulk-remove.** Routes remain the HTTP contract even when no page consumes them yet. |
| **Layer 5 — Hooks** (`src/hooks/simplified/`) | **Do not bulk-remove.** Same reasoning as routes. |
| **Engine** (`movemental-ai-agents` sibling repo) | **Untouched.** Inference, render tools, seed scripts, and `/api/agents/stream` live there. |
| **Docs, scripts, tests** | Not part of the UI teardown unless a test imports an archived page (fix or archive the test). |

This is a **UI/route-group cleanup**, not a platform rewrite.

---

## 2 — Multi-repo topology (context)

```
┌─────────────────────────────────────────────────────────────────┐
│  movemental-ai (this repo)                                      │
│  • Agent Room UI          → /agent                              │
│  • Agent Room proxy       → /api/agent-room/stream              │
│  • Agent runtime admin    → /agent-runtime (staff)              │
│  • Agent schema + CRUD    → Drizzle + /api/simplified/agent-*   │
│  • Marketing UI           → ARCHIVE NOW, REPLACE FROM OTHER REPO│
└───────────────────────────────┬─────────────────────────────────┘
                                │ POST /api/agents/stream (service bearer)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  movemental-ai-agents (sibling)                                 │
│  • StreamChunk protocol, ui_render gate, agent-runner             │
│  • seed:agent-room, room-host / room-diagnostician prompts        │
└─────────────────────────────────────────────────────────────────┘

        ┌───────────────────────────────────────┐
        │  Incoming marketing repo (TBD)       │
        │  • (site) pages, nav, sections, DESIGN│
        │  • Merged into movemental-ai later    │
        └───────────────────────────────────────┘
```

**Env wiring** (already documented): [`movemental-multi-repo-env-bootstrap.md`](movemental-multi-repo-env-bootstrap.md). Agent Room requires `AI_AGENTS_BASE_URL`, `AI_AGENTS_SERVICE_SECRET`, and `AI_AGENTS_TENANT_ORG_ID` in `src/lib/env.ts`.

**Agent prompt / seed reference:** [`docs/build/notes/agent-room-prompt-baseline.md`](../notes/agent-room-prompt-baseline.md), [`docs/build/notes/agent-room-phase1-status.md`](../notes/agent-room-phase1-status.md).

---

## 3 — Allowlist: what stays live in `src/`

Everything not listed here is a candidate for archive unless a dependency trace from the allowlist pulls it in (see §5).

### 3.1 Routes (App Router)

| Path | Role |
|------|------|
| `src/app/agent/page.tsx` | Public Agent Room entry |
| `src/app/(studio)/agent-runtime/page.tsx` | Staff corpus/prompt-pack assignment UI |
| `src/app/(studio)/layout.tsx` | Staff gate for agent-runtime |
| `src/app/api/agent-room/stream/route.ts` | SSE proxy to engine |
| `src/app/api/simplified/agent-*/route.ts` | Agent entity CRUD (10 routes) |
| `src/app/api/simplified/agents/route.ts` | Agent list/update |
| `src/app/api/simplified/corpus-bindings/route.ts` | Used by agent-runtime |
| `src/app/api/simplified/prompt-packs/route.ts` | Used by agent-runtime |
| `src/app/api/onboarding/agent-chat/route.ts` | Stub / future seam (keep unless explicitly retired) |

**Minimal auth for agent-runtime:** keep `src/app/(site)/login/page.tsx` (and Supabase callback routes under `src/app/auth/` if present) until the incoming repo supplies replacements. If login is archived before migration lands, staff cannot reach `/agent-runtime`.

### 3.2 Components

| Path | Role |
|------|------|
| `src/components/agent-room/**` | Full room shell, stream hook, screen renderers, CSS module |
| `src/components/ui/**` | shadcn primitives (used by agent-runtime; do not hand-edit) |

**Note:** Agent Room screen components (`show_pricing`, `show_founders`, etc.) are **agent-driven marketing UI inside the room**, not legacy site pages. They stay with `agent-room/`.

### 3.3 Lib / protocol

| Path | Role |
|------|------|
| `src/lib/agent-room/stream-chunk.ts` | Client SSE contract (mirrors engine) |
| `src/lib/agent-room/proxy-schema.ts` | Proxy request validation |
| `src/lib/agent-room/component-props.ts` | Typed props for screen components |
| `src/lib/env.ts` | Includes `AI_AGENTS_*` vars |
| `src/lib/supabase/**` | Auth/session (agent-runtime gate) |
| `src/lib/db/**` | Drizzle client + schema |
| `src/lib/schemas/**` | Zod layer |
| `src/lib/services/**` | All services (unchanged) |

### 3.4 Hooks (agent-related subset — keep entire generated index)

Keep all hooks under `src/hooks/simplified/` that correspond to live API routes. Minimum agent slice:

- `agents.hooks.ts`
- `agent-*.hooks.ts` (instances, tools, handoffs, traces, metrics, interactions, guardrails, assignments)
- `corpus-bindings.hooks.ts`
- `prompt-packs.hooks.ts`

Do **not** prune the hooks barrel manually; run `pnpm hooks:check` / `pnpm validate:all` after archive slices.

### 3.5 Root shell (trim, do not delete blindly)

| File | Policy |
|------|--------|
| `src/app/layout.tsx` | Keep. Preserves `x-movemental-shell` logic (`room` hides marketing chrome). Incoming marketing merge will likely replace header/footer imports — **do not remove shell header logic until merge PR**. |
| `src/app/providers.tsx` | Keep (React Query, theme). |
| `src/app/globals.css` | Keep for now. Contains **both** Concept Modern tokens and `.oat-surface` Agent Room tokens. Incoming DESIGN.md site may supersede portions — merge in a dedicated PR, not during archive. |
| `proxy.ts` | Keep. Must retain `/agent` → `x-movemental-shell: room` and `/agent-runtime` authenticated prefix. |

### 3.6 Sibling repo (never archive from here)

| Repo | Contents |
|------|----------|
| `movemental-ai-agents` | Engine, `seed-agent-room`, render tool definitions, model registry |

---

## 4 — Archive scope: what moves out of the live tree

Use destination: **`_archive/pre-marketing-migration-2026-06/`** (new dated bucket; distinct from existing `_archive/legacy-platform-app/`).

### 4.1 App routes — archive entire route groups

| Source | ~Count | Notes |
|--------|--------|-------|
| `src/app/(site)/**` | ~45 pages | All public marketing, legal, pathway, field guides, auth UI (except login if kept per §3.1) |
| `src/app/(dashboard)/**` | ~63 files | Sandboxlive, SafeStart, leader, program, admin (except if any agent-only page exists — none today) |
| `src/app/readiness-invite/**` | small | Staff readiness invite flow |
| Orphan `-old` routes | 3 | `home-old`, `safety-old`, etc. |

**Do not archive:** `src/app/agent/`, `src/app/(studio)/`, `src/app/api/`.

### 4.2 Components — archive by directory

Move wholesale (git mv, preserve structure):

| Directory | ~Files | Rationale |
|-----------|--------|-----------|
| `src/components/studio/` | large | Canonical wired marketing pages — replaced by incoming repo |
| `src/components/sections/` | large | Editorial sections for marketing |
| `src/components/sections-mock/` | large | HTML mock layer |
| `src/components/editorial-stitch/` | ~9 | Zero live consumers; incoming Stitch site may reintroduce |
| `src/components/safety/` | medium | SafeStart / pathway product UI |
| `src/components/sandboxlive/` | medium | Cohort dashboard UI |
| `src/components/onboarding/` | medium | Leader onboarding UI (not agent chat) |
| `src/components/program/` | small | Program templates |
| `src/components/assessment/` | medium | Public assessment UI |
| `src/components/book/` | small | Book reader UI |
| `src/components/case-study/` | small | Marketing case studies |
| `src/components/pathway/` | small | Pathway templates |
| `src/components/nav/` | small | SiteHeader/SiteFooter — **incoming repo brings replacements** |
| `src/components/primitives/` | medium | Marketing primitives — incoming repo likely has its own |
| `src/components/scheduling/` | small | Training schedule panels |
| `src/components/site-footnotes/` | small | Footnotes client |
| Other top-level marketing folders under `src/components/` not in allowlist | scan | Use dependency graph (§5) |

### 4.3 Lib / data only used by archived UI

Archive **only after** dependency scan confirms no agent allowlist import:

- `src/lib/authenticated/**` (dashboard nav, product context) — likely all archived UI consumers
- Marketing-specific content modules (`src/lib/committed-voices.ts`, pathway copy helpers, etc.) — archive, not delete, unless confirmed generated elsewhere

### 4.4 Tests

- Update or archive tests that import archived pages/components.
- Keep / add tests for `stream-chunk` parsing and proxy schema if missing.

---

## 5 — Pre-flight: dependency-safe archive method

Follow the pattern from [`unused-component-audit-2026-05-08.md`](unused-component-audit-2026-05-08.md):

1. **Generate an allowlist closure** — start from §3 paths; recursively collect every import reachable from:
   - `src/app/agent/**`
   - `src/app/(studio)/**`
   - `src/app/api/agent-room/**`
   - `src/app/api/simplified/agent-*`
   - `src/app/api/simplified/corpus-bindings/**`
   - `src/app/api/simplified/prompt-packs/**`
2. **Mark everything else under `src/app/` pages and `src/components/` as ARCHIVE_CANDIDATE.**
3. **Before each git mv batch**, run:
   ```bash
   pnpm typecheck
   pnpm validate:all   # if available
   pnpm build:check    # prebuild gate
   ```
4. **Never move `src/components/ui/`** — shadcn managed.
5. **Never move agent-room** — even if screen components duplicate marketing copy; they are render targets for engine tools.

Suggested inventory script (to author in `scripts/` when executing):

```bash
# Pseudocode — implement as scripts/inventory-agent-allowlist.ts
# Output: docs/build/plans/frontend-teardown-inventory.json
# { "keep": [...], "archive": [...], "investigate": [...] }
```

---

## 6 — Execution phases (ordered)

Each phase = one PR. Do not combine archive + incoming marketing merge in the same PR.

### Phase 0 — Baseline (no file moves)

- [x] Confirm Agent Room works: `pnpm dev` → `/agent` streams (engine env configured). *Partial — page renders with room shell; stream proxy needs engine up.*
- [ ] Confirm agent-runtime: staff login → `/agent-runtime` loads agents table.
- [x] Run `pnpm typecheck && pnpm validate:all && pnpm build`. *validate:all fails on research tree only (pre-existing).*
- [x] Snapshot route list: `find src/app -name page.tsx | sort > docs/build/plans/_snapshots/routes-pre-teardown.txt`
- [x] Snapshot component tree counts for before/after metrics.

### Phase 1 — Archive `(site)` marketing routes

- [x] Create `_archive/pre-marketing-migration-2026-06/app/(site)/`.
- [x] `git mv src/app/(site)/*` → archive mirror.
- [x] Add minimal **`src/app/page.tsx`** stub (or temporary redirect to `/agent`) so `/` does not 404 until incoming home lands:
- [x] Remove or stub `SiteHeader` / `SiteFooter` imports in root layout if they break (layout already hides chrome for `room` shell; stub may be empty main-only).
- [x] `pnpm typecheck && pnpm build`.

### Phase 2 — Archive `(dashboard)` product routes

- [x] Move entire `src/app/(dashboard)/**` to archive.
- [x] Move `src/app/readiness-invite/**` to archive.
- [ ] Trim `proxy.ts` `AUTHENTICATED_PATH_PREFIXES` **only if** no live routes remain under those prefixes — or leave prefixes dormant (harmless) until dashboard returns from other workstreams.
- [x] `pnpm typecheck && pnpm build`.

### Phase 3 — Archive marketing components (bulk)

- [x] Move directories listed in §4.2.
- [x] Fix any broken imports in remaining allowlist files (should be none if closure was correct).
- [x] `pnpm typecheck && pnpm build`.

### Phase 4 — Archive orphaned lib + tests

- [x] Move authenticated dashboard lib per §4.3.
- [x] Fix or archive broken tests.
- [x] `pnpm build`. *(test:run not re-run yet)*

### Phase 5 — Incoming marketing merge (separate initiative)

Not part of teardown; documented here for sequencing:

1. Import `(site)` route group, nav, sections, and DESIGN tokens from the **source marketing repo** (Stitch-migrated Concept Modern build per `docs/design/DESIGN.md`).
2. Reconcile `layout.tsx`, `globals.css`, and `proxy.ts` with incoming patterns.
3. Wire nav CTA → `/agent` if product decision holds.
4. Remove Phase 1 temporary `/` redirect stub.
5. Run design audit skills (`concept-modern-ui`, `tailwind-cleanup`) on merged tree only.

### Phase 6 — Post-merge cleanup (optional)

- [ ] Delete `_archive/pre-marketing-migration-2026-06/` only after **30+ days** and confirmed no revival needed (same policy as prior audits).
- [ ] Re-run [`unused-component-audit-2026-05-08.md`](unused-component-audit-2026-05-08.md) methodology on the new combined tree.

---

## 7 — Verification checklist (run after every phase)

### Agent surfaces

- [ ] **`GET /agent`** — renders `AgentRoomShell`, no marketing header/footer, `100dvh` layout.
- [ ] **`POST /api/agent-room/stream`** — returns SSE when engine env is set; 503 with clear JSON when not.
- [ ] **Stream hook** — `ui_render` chunks map to screen components (`reality_check_beat`, `readback`, `path`, `handoff_human`).
- [ ] **`GET /agent-runtime`** — staff-only; corpus binding + prompt pack saves persist.

### Architecture gates

- [ ] `pnpm db:check` → LOCKED (no schema edits in this effort)
- [ ] `pnpm contracts:check` → LOCKED
- [ ] `pnpm services:check` → passes
- [ ] `pnpm routes:check` → passes (all simplified routes remain)
- [ ] `pnpm hooks:check` → passes
- [ ] `pnpm typecheck` → 0 errors
- [ ] `pnpm build` → succeeds

### Engine (sibling repo)

- [ ] `movemental-ai-agents`: `pnpm typecheck && pnpm test:run`
- [ ] `TENANT_ORG_ID=<uuid> pnpm seed:agent-room` — idempotent after prompt edits

---

## 8 — Risks and gotchas

| Risk | Mitigation |
|------|------------|
| **Root layout imports archived nav** | Phase 1 must update `layout.tsx` to remove `SiteHeader`/`SiteFooter` or use no-op stubs until merge. |
| **`.oat-surface` tokens in globals.css** | Agent Room depends on Oatmeal/Paper scoped CSS. Incoming marketing CSS merge must not delete `.oat-surface` block without porting it. |
| **Login page archived too early** | Keep minimal auth routes until incoming repo includes auth or agent-runtime is deprecated. |
| **Breaking `pnpm build` via transitive imports** | Use allowlist closure (§5); never archive-by-directory without graph check. |
| **Simplified API routes appear "unused"** | Expected. Do not delete — tenant apps and future dashboards may consume them. |
| **Handoff host→diagnostician** | Engine-side open item per [`agent-room-phase1-status.md`](../notes/agent-room-phase1-status.md) §3 — unrelated to UI teardown but affects `/agent` E2E quality. |
| **Tests referencing dashboard nav** | e.g. `workspace-primary-nav.test.ts` — archive test or move with authenticated lib. |

---

## 9 — Open decisions (founder / lead dev)

1. **Temporary `/` behavior** — redirect to `/agent` vs static "coming soon" vs 404 until marketing merge?
2. **Keep `/login` in this repo** through teardown, or defer agent-runtime access until post-merge auth?
3. **Archive vs delete** for `-old` duplicate routes (`home-old`, `safety-old`) — recommend DELETE if already duplicated in archive bucket.
4. **Incoming source repo name and branch** — pin in this doc when chosen (e.g. fresh `movemental` org site clone).
5. **Dashboard product** — is any `(dashboard)` surface returning on a different timeline than marketing? If yes, flag subsets as **HOLD** instead of ARCHIVE.

---

## 10 — Related documents

| Doc | Use |
|-----|-----|
| [`agent-room-prompt-baseline.md`](../notes/agent-room-prompt-baseline.md) | What to edit for agent behavior vs React visuals |
| [`agent-room-phase1-status.md`](../notes/agent-room-phase1-status.md) | Engine/room build status, handoff gap |
| [`agent-room-wiring-status.md`](../../bill/notes/agent-room-wiring-status.md) | Cross-repo wiring handoff |
| [`movemental-multi-repo-env-bootstrap.md`](movemental-multi-repo-env-bootstrap.md) | Env vars across repos |
| [`unused-component-audit-2026-05-08.md`](unused-component-audit-2026-05-08.md) | Prior archive/PROMOTE/DELETE methodology |
| [`docs/design/DESIGN.md`](../../design/DESIGN.md) | Target design system for incoming marketing merge |

---

## 11 — Success criteria

When this plan is fully executed (Phases 0–4, before marketing merge):

- Live UI in `src/` is essentially **Agent Room + agent-runtime admin + minimal root shell/auth**.
- **No Drizzle, Zod, service, or simplified API deletions.**
- **`_archive/pre-marketing-migration-2026-06/`** holds the retired marketing and dashboard UI for reference.
- **`pnpm build` passes** and `/agent` remains demonstrable.
- Team can merge the external marketing repo without resolving hundreds of duplicate components in place.
