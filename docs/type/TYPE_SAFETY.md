# Type Safety Chain

**Version:** 3.0.0  
**Last Updated:** 2026-07-03  
**Status:** All layers **LOCKED/VALIDATED** — 215 entities end-to-end; `pnpm validate:all` green; `pnpm typecheck` 0 errors (verified 2026-06-13).

**Operational reference:** [`../architecture/TYPE_SAFETY_CHAIN.md`](../architecture/TYPE_SAFETY_CHAIN.md)  
**Layer guides:** [`README.md`](./README.md)

---

## Overview

The six-layer type safety architecture ensures complete type safety from the live Postgres database to the UI. Types flow **downstream only**; fix errors **bottom-up**.

```
Ground:  Live Postgres (Supabase movemental)     ← single source of truth
   ▼
Layer 1: Drizzle Schema     src/lib/db/schema.ts          215 pgTables (hand-maintained)
   ▼  pnpm generate:schemas
Layer 2: Zod Schemas        src/lib/schemas/index.ts      215 entities
   ▼  pnpm generate:services
Layer 3: Services           src/lib/services/simplified/  215 *.service.ts + base.service.ts
   ▼  pnpm generate:routes
Layer 4: API Routes         src/app/api/simplified/       215 route.ts
   ▼  pnpm generate:hooks
Layer 5: React Hooks        src/hooks/simplified/         215 *.hooks.ts
   ▼
Layer 6: UI Components      src/components/               consumes hooks; not generated
```

Hand-written product endpoints live outside the generated CRUD backbone: `src/app/api/{admin,agent-room,assess,book,contact,cron,internal,leader,newsletter,onboarding,program,toolkit-download,webhooks}/`.

---

## Current validation results

| Layer | Name | Path | Count | Status | Command |
|-------|------|------|-------|--------|---------|
| — | Live DB | Supabase `vhaiiiykcukrlyvwlgip` | 237 tables | source of truth | — |
| 1 | Drizzle Schema | `src/lib/db/schema.ts` | 215 (all in DB) | **LOCKED** ✅ | `pnpm db:check` |
| 2 | Zod Schemas | `src/lib/schemas/index.ts` | 215 | **LOCKED** ✅ | `pnpm contracts:check` |
| 3 | Services | `src/lib/services/simplified/` | 215 (+ base) | **LOCKED** ✅ | `pnpm services:check` |
| 4 | API Routes | `src/app/api/simplified/` | 215 | **VALIDATED** ✅ | `pnpm routes:check` |
| 5 | React Hooks | `src/hooks/simplified/` | 215 | **LOCKED** ✅ | `pnpm hooks:check` |
| 6 | UI Components | `src/components/` | n/a | not validated | `pnpm typecheck` |

**Full chain:** `pnpm validate:all` — all pass.  
**Proof:** `pnpm typecheck` (`tsc --noEmit`) — 0 errors.

> This repo tracks a **subset** of the shared `movemental` database (215 of 237 tables). Sibling repos `alan-hirsch` and `movemental-visual-editor-main` declare more tables; coordinate schema changes across repos when adding shared tables.

---

## Layer documentation

| Layer | Guide |
|-------|-------|
| Overview & principles | [01_OVERVIEW.md](./01_OVERVIEW.md) |
| Layer 1 — Database | [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) |
| Layer 2 — Zod | [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) |
| Layer 3 — Services | [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) |
| Layer 4 — Routes | [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) |
| Layer 5 — Hooks | [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) |
| Layer 6 — UI | [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) |
| Workflow checklist | [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) |
| Multi-tenant notes | [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) |
| Glossary | [10_GLOSSARY.md](./10_GLOSSARY.md) |
| Validation snapshot | [validation/VALIDATION_STATUS.md](./validation/VALIDATION_STATUS.md) |

---

## Schema change waterfall

1. Apply DDL to the live DB (Supabase migration) — shared production DB for three repos.
2. Add/update `pgTable` in `src/lib/db/schema.ts` (hand-maintained; no `generate-schema` script). `pnpm db:check` → **LOCKED**.
3. `pnpm generate:schemas && pnpm contracts:check`
4. `pnpm generate:services && pnpm services:check`
5. `pnpm generate:routes && pnpm routes:check`
6. `pnpm generate:hooks && pnpm hooks:check`
7. `pnpm typecheck` — must be clean before merge.
8. Repeat in sibling repos if the table is in their set.
