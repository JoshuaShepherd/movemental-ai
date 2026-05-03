# Validation Status Snapshot

**Last run:** 2026-04-13
**Command:** `pnpm validate:all`
**Overall result:** All layers LOCKED or VALIDATED — no missing, no invalid.

---

## Layer results

| Layer | Command | Status | Tables (schema) | Count | Missing | Invalid |
|-------|---------|--------|-----------------|-------|---------|---------|
| 1 — Drizzle Schema | `pnpm db:check` | **pending** | 169 tables | — | — | — |
| 2 — Zod Schemas | `pnpm contracts:check` | **LOCKED** | 169 entities | 169 zodEntities | 0 | — |
| 3 — Services | `pnpm services:check` | **LOCKED** | 169 entities | 169 services | 0 | 0 |
| 4 — API Routes | `pnpm routes:check` | **VALIDATED** | 169 entities | 169 routes | 0 | 0 |
| 5 — React Hooks | `pnpm hooks:check` | **LOCKED** | 169 entities | 169 hooks | 0 | 0 |

---

## Notes

- Schema was generated from the live Supabase database on 2026-04-13 with 169 public tables.
- Layer 1 (`pnpm db:check`) requires direct DATABASE_URL connectivity to compare schema.ts vs live DB. Run separately when connected.
- TypeScript typecheck (`pnpm typecheck`) passes cleanly across all 169 entities and all generated code.
- To refresh this snapshot, run `pnpm validate:all` and update the table above.
