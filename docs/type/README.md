# Type Safety Documentation — `movemental-ai`

> **Complete six-layer type safety architecture for this repo.**
> Companion to the operational reference: [`../architecture/TYPE_SAFETY_CHAIN.md`](../architecture/TYPE_SAFETY_CHAIN.md).

**Repo:** `movemental-ai`  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip` (Postgres 17)  
**Last verified:** 2026-06-13 — all layers **LOCKED/VALIDATED**, `pnpm validate:all` green, `pnpm typecheck` clean.

---

## Start here

| Doc | Purpose |
|-----|---------|
| [TYPE_SAFETY.md](./TYPE_SAFETY.md) | Quick status, counts, and command reference |
| [01_OVERVIEW.md](./01_OVERVIEW.md) | Chain principles, golden rule, fix-bottom-up |
| [../architecture/TYPE_SAFETY_CHAIN.md](../architecture/TYPE_SAFETY_CHAIN.md) | Shared-DB topology, per-layer ops detail, schema-change waterfall |

---

## Layer guides (read in order)

| Layer | Doc | Path | Validation |
|-------|-----|------|------------|
| 1 — Drizzle schema | [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) | `src/lib/db/schema.ts` | `pnpm db:check` |
| 2 — Zod schemas | [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) | `src/lib/schemas/index.ts` | `pnpm contracts:check` |
| 3 — Services | [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) | `src/lib/services/simplified/` | `pnpm services:check` |
| 4 — API routes | [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) | `src/app/api/simplified/` | `pnpm routes:check` |
| 5 — React hooks | [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) | `src/hooks/simplified/` | `pnpm hooks:check` |
| 6 — UI components | [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) | `src/components/` | `pnpm typecheck` (no `ui:check` in this repo) |

---

## Workflow & reference

| Doc | Purpose |
|-----|---------|
| [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) | Step-by-step add/change entity workflow |
| [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) | `TENANT_ORG_ID` and org scoping |
| [10_GLOSSARY.md](./10_GLOSSARY.md) | Term definitions |
| [11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md](./11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md) | Platform overview |
| [12_PUBLIC_SITEMAP_AND_FEATURES.md](./12_PUBLIC_SITEMAP_AND_FEATURES.md) | Public site structure |
| [validation/VALIDATION_STATUS.md](./validation/VALIDATION_STATUS.md) | Latest lock status snapshot |

---

## Quick commands

```bash
pnpm generate:schemas && pnpm contracts:check   # Layer 2
pnpm generate:services && pnpm services:check  # Layer 3
pnpm generate:routes && pnpm routes:check      # Layer 4
pnpm generate:hooks && pnpm hooks:check        # Layer 5
pnpm validate:all                              # All layer checks
pnpm typecheck                                 # Full tsc — the real proof
```

**Golden rule:** types flow **downstream only**. Fix errors **bottom-up** — never patch a higher layer to satisfy a lower-layer gap.
