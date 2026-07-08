# Type Safety Validation Status

**Last Updated:** 2026-07-03 (snapshot; re-run commands to refresh)

**Authoritative ops doc:** [`../../architecture/TYPE_SAFETY_CHAIN.md`](../../architecture/TYPE_SAFETY_CHAIN.md)

---

## Layer validation results

| Layer | Command | Required status | Current status | Last verified |
|-------|---------|-----------------|----------------|---------------|
| 1 | `pnpm db:check` | LOCKED | **LOCKED** ✅ | 2026-06-13 |
| 2 | `pnpm contracts:check` | LOCKED | **LOCKED** ✅ | 2026-06-13 |
| 3 | `pnpm services:check` | LOCKED | **LOCKED** ✅ | 2026-06-13 |
| 4 | `pnpm routes:check` | VALIDATED | **VALIDATED** ✅ | 2026-06-13 |
| 5 | `pnpm hooks:check` | LOCKED | **LOCKED** ✅ | 2026-06-13 |
| 6 | — | — | not validated (no `ui:check`) | — |
| All | `pnpm validate:all` | All pass | **✅ All pass** | 2026-06-13 |
| Proof | `pnpm typecheck` | 0 errors | **✅ 0 errors** | 2026-06-13 |

**Counts:** 215 schema tables; 215 entities in Layers 2–5. Live DB has 237 `public` tables; this repo declares a 215-table subset.

---

## Validation commands

1. **Layer 1 — Drizzle schema:** `pnpm db:check` → `{"status":"LOCKED"}`
2. **Layer 2 — Zod schemas:** `pnpm contracts:check` → `{"status":"LOCKED"}`
3. **Layer 3 — Services:** `pnpm services:check` → `{"status":"LOCKED"}`
4. **Layer 4 — API routes:** `pnpm routes:check` → `{"status":"VALIDATED"}`
5. **Layer 5 — React hooks:** `pnpm hooks:check` → `{"status":"LOCKED"}`
6. **Layer 6 — UI:** `pnpm typecheck` (no `ui:check` script in this repo)
7. **Full chain:** `pnpm validate:all`

---

## Fallback validation

```bash
pnpm typecheck   # tsc --noEmit
```

Exit code 0 = chain compiles. Exit code 1 = fix errors bottom-up (lowest broken layer first).
