# Type Safety Documentation — `movemental-ai`

> **Complete seven-tier type safety architecture for this platform.**
> Grounded in the live database via Supabase MCP, Drizzle ORM, Zod, Services, API Routes, TanStack Query Hooks, and React UI Components.
> Companion to operational reference: [`../architecture/TYPE_SAFETY_CHAIN.md`](../architecture/TYPE_SAFETY_CHAIN.md).

**Repo:** `movemental-ai`  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip` (Postgres 17, 471 public tables)  
**Supabase MCP:** Enabled via `.mcp.json` (`https://mcp.supabase.com/mcp?project_ref=vhaiiiykcukrlyvwlgip`)  
**Last verified:** 2026-10-15 — all layers **LOCKED/VALIDATED**, `pnpm db:check` LOCKED, `pnpm validate:all` green, `pnpm typecheck` clean (0 errors).

---

## Start here

| Doc | Purpose |
|-----|---------|
| [TYPE_SAFETY.md](./TYPE_SAFETY.md) | Quick status, entity counts, and command reference |
| [01_OVERVIEW.md](./01_OVERVIEW.md) | Chain principles, Supabase MCP role, golden rule, fix-bottom-up |
| [../architecture/TYPE_SAFETY_CHAIN.md](../architecture/TYPE_SAFETY_CHAIN.md) | Shared-DB topology, Supabase MCP integration, schema-change waterfall |

---

## Layer guides (read in order)

| Layer | Doc | Path | Validation |
|-------|-----|------|------------|
| Ground 0 — Supabase MCP & DB | [01_OVERVIEW.md](./01_OVERVIEW.md) | Live DB & `src/lib/supabase/database.types.ts` | Supabase MCP / CLI |
| 1 — Drizzle schema | [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) | `src/lib/db/schema.ts` | `pnpm db:check` |
| 2 — Zod schemas | [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) | `src/lib/schemas/index.ts` | `pnpm contracts:check` |
| 3 — Services | [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) | `src/lib/services/simplified/` | `pnpm services:check` |
| 4 — API routes | [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) | `src/app/api/simplified/` | `pnpm routes:check` |
| 5 — React hooks | [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) | `src/hooks/simplified/` | `pnpm hooks:check` |
| 6 — UI components | [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) | `src/components/` & `src/app/` | `pnpm typecheck` |

---

## Workflow & reference

| Doc | Purpose |
|-----|---------|
| [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) | Step-by-step add/change entity workflow |
| [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) | `TENANT_ORG_ID` and org scoping boundaries |
| [10_GLOSSARY.md](./10_GLOSSARY.md) | Core terms and concepts |
| [11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md](./11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md) | High-level platform architecture |
| [12_PUBLIC_SITEMAP_AND_FEATURES.md](./12_PUBLIC_SITEMAP_AND_FEATURES.md) | Public site structure and post-cutover routes |
| [validation/VALIDATION_STATUS.md](./validation/VALIDATION_STATUS.md) | Current lock status snapshot (228 entities) |

---

## Quick commands

```bash
# 1. Regenerate Supabase database types directly from live DB
export $(grep -v '^#' .env.local | grep DATABASE_URL | xargs) && \
  npx -y supabase gen types typescript --db-url "$DATABASE_URL" --schema public > src/lib/supabase/database.types.ts

# 2. Regenerate downstream layers from Drizzle schema
pnpm generate:schemas && pnpm contracts:check   # Layer 2 (Zod)
pnpm generate:services && pnpm services:check  # Layer 3 (Services)
pnpm generate:routes && pnpm routes:check      # Layer 4 (Routes)
pnpm generate:hooks && pnpm hooks:check        # Layer 5 (Hooks)

# 3. Complete validation suite
pnpm db:check                                  # Layer 1 DB alignment
pnpm validate:all                              # Layers 2-5 checks + content validations
pnpm typecheck                                 # Full tsc compilation proof (0 errors)
```

**Golden rule:** types flow **downstream only**. Fix errors **bottom-up** — never patch a higher layer to satisfy a lower-layer gap.
