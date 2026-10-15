# Type Safety Chain

**Version:** 3.1.0  
**Last Updated:** 2026-10-15  
**Status:** All layers **LOCKED/VALIDATED** — 228 entities end-to-end; `pnpm db:check` LOCKED; `pnpm validate:all` green; `pnpm typecheck` 0 errors (verified 2026-10-15).

**Operational reference:** [`../architecture/TYPE_SAFETY_CHAIN.md`](../architecture/TYPE_SAFETY_CHAIN.md)  
**Layer guides:** [`README.md`](./README.md)

---

## Overview

The seven-tier type safety architecture ensures complete type safety from the live Supabase Postgres database to the UI. Types flow **downstream only**; fix errors **bottom-up**.

```
Ground 0: Live Postgres (Supabase movemental: vhaiiiykcukrlyvwlgip)
          Introspected via Supabase MCP (.mcp.json)
          Types generated: src/lib/supabase/database.types.ts (21,492 lines)
   ▼
Layer 1:  Drizzle Schema       src/lib/db/schema.ts          228 pgTables (Structure SSOT)
   ▼  pnpm generate:schemas
Layer 2:  Zod Schemas          src/lib/schemas/index.ts      228 entities (Types SSOT via z.infer<>)
   ▼  pnpm generate:services
Layer 3:  Services             src/lib/services/simplified/  228 *.service.ts + base.service.ts
   ▼  pnpm generate:routes
Layer 4:  API Routes           src/app/api/simplified/       228 route.ts
   ▼  pnpm generate:hooks
Layer 5:  React Hooks          src/hooks/simplified/         228 *.hooks.ts (TanStack Query)
   ▼
Layer 6:  UI Components        src/components/ & src/app/    consumes hooks; verified by tsc
```

Hand-written product endpoints live outside the generated CRUD backbone: `src/app/api/{admin,agent-room,assess,book,contact,cron,internal,leader,newsletter,onboarding,program,toolkit-download,webhooks}/`.

---

## Current validation results (Verified October 15, 2026)

| Layer | Name | Path | Count | Status | Command |
|-------|------|------|-------|--------|---------|
| Ground 0 | Live DB | Supabase `vhaiiiykcukrlyvwlgip` | 471 tables | Source of truth | Supabase MCP |
| Ground Types | Supabase Types | `src/lib/supabase/database.types.ts` | 21,492 lines | **CURRENT** ✅ | `supabase gen types` |
| 1 | Drizzle Schema | `src/lib/db/schema.ts` | 228 (all in DB) | **LOCKED** ✅ | `pnpm db:check` |
| 2 | Zod Schemas | `src/lib/schemas/index.ts` | 228 | **LOCKED** ✅ | `pnpm contracts:check` |
| 3 | Services | `src/lib/services/simplified/` | 228 (+ base) | **LOCKED** ✅ | `pnpm services:check` |
| 4 | API Routes | `src/app/api/simplified/` | 228 | **VALIDATED** ✅ | `pnpm routes:check` |
| 5 | React Hooks | `src/hooks/simplified/` | 228 | **LOCKED** ✅ | `pnpm hooks:check` |
| 6 | UI Components | `src/components/` & `src/app/` | n/a | **0 TS errors** ✅ | `pnpm typecheck` |

**Full chain:** `pnpm validate:all` — all pass.  
**Proof:** `pnpm typecheck` (`tsc --noEmit`) — 0 errors.

> This repo tracks a **subset** of the shared `movemental` database (228 of 471 tables). Sibling repos `alan-hirsch` and `movemental-visual-editor-main` declare additional tables for LMS and Visual Studio workflows.

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

1. Inspect live database state via **Supabase MCP** (`vhaiiiykcukrlyvwlgip`).
2. Apply additive DDL to the live DB via tracked Supabase migration.
3. Refresh `database.types.ts` via `npx supabase gen types typescript --db-url ...`.
4. Add/update `pgTable` in `src/lib/db/schema.ts`. Verify with `pnpm db:check` → **LOCKED**.
5. `pnpm generate:schemas && pnpm contracts:check` (Layer 2).
6. `pnpm generate:services && pnpm services:check` (Layer 3).
7. `pnpm generate:routes && pnpm routes:check` (Layer 4).
8. `pnpm generate:hooks && pnpm hooks:check` (Layer 5).
9. `pnpm typecheck` — 0 errors before committing.
