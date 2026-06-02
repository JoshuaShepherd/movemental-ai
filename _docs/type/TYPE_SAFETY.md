# Type Safety Chain

> ⚠ **STALE (as of 2026-06-02).** The counts and "all pass" status below describe the original
> 4-table prototype. The current chain has **210 tables** under `src/` and Layer 1 is **UNLOCKED**
> (210 schema vs 223 live DB). See the authoritative doc:
> [`../../docs/architecture/TYPE_SAFETY_CHAIN.md`](../../docs/architecture/TYPE_SAFETY_CHAIN.md).

**Version**: 2.0.0  
**Last Updated**: 2026-02-15 (superseded — see banner)  
**Status**: Layer 1 UNLOCKED — 210 schema tables vs 223 live DB tables (drift)

---

## Overview

The six-layer type safety architecture ensures complete type safety from the database schema to the UI. Types flow **downstream only**; fix errors **bottom-up**.

```
Layer 1: DATABASE (Drizzle)  → src/lib/db/schema.ts
Layer 2: ZOD SCHEMAS         → src/lib/schemas/
Layer 3: SERVICES            → src/lib/services/simplified/
Layer 4: API ROUTES          → src/app/api/simplified/
Layer 5: HOOKS               → src/hooks/simplified/
Layer 6: UI                  → src/components/
```

---

## Current Validation Results

| Layer | Status     | Command           |
|-------|------------|-------------------|
| 1     | LOCKED     | `pnpm db:check`   |
| 2     | LOCKED     | `pnpm contracts:check` |
| 3     | LOCKED     | `pnpm services:check`  |
| 4     | VALIDATED  | `pnpm routes:check`    |
| 5     | LOCKED     | `pnpm hooks:check`     |
| 6     | VALIDATED  | `pnpm ui:check`        |

**Full chain**: `pnpm validate:all` — all pass.

---

## Table and Entity Counts

**Layer 1 (Database)**: 210 tables in `src/lib/db/schema.ts` (UNLOCKED — 7 phantom tables not in live DB, ~20 live tables not yet mirrored; see canonical doc §5)  
**Layer 2 (Zod)**: 210 entities with four-schema pattern (Select, Insert, Update, Filters)  
**Layer 3–5**: 210 each, aligned to Layer 1–2  
**Layer 6 (UI)**: hand-built from Stitch designs, consumes Layer 5 hooks directly

---

## Reference Docs

- [01_OVERVIEW.md](./01_OVERVIEW.md) — Chain overview and principles
- [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) — Drizzle schema
- [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) — Zod schemas
- [validation/VALIDATION_STATUS.md](./validation/VALIDATION_STATUS.md) — Current status and commands
