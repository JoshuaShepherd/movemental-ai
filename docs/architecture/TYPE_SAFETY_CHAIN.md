# Type Safety Chain — Movemental AI (Marketing + AI Content)

> **The six-layer chain: how types flow from the live Postgres database to the UI.**
> This is the current, authoritative status doc. The older per-layer set under
> [`_docs/type/`](../../_docs/type/) describes an early 2-table prototype and is **partly stale** —
> trust the numbers here.

**Repo:** `movemental-ai`
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip` (region `us-west-2`, Postgres 17)
**Last verified:** 2026-06-02 — L1 **UNLOCKED** (schema drift vs live DB); L2–L5 internally consistent at 210

---

## 1. Shared-database topology (read this first)

Three repositories point at the **same** Supabase project (`vhaiiiykcukrlyvwlgip`, "movemental"). The live database is the single source of truth for **all three**; each keeps its own Drizzle mirror and generated chain.

| Repo | Role | Chain root | DB-aligned tables |
|------|------|-----------|-------------------|
| **movemental-ai** (this repo) | Marketing / AI content + research surfaces | `src/` | **210 / 223** ⚠ drift |
| **movemental-visual-editor-main** | Studio / authoring + LMS editor | `src/` | 223 / 223 ✅ |
| **alan-hirsch** | Public LMS + author site (canonical chain reference) | `src/` | 223 / 223 ✅ |

**Implications**
- This repo deliberately tracks a **subset** of the platform and has drifted from the live DB (see §5). That is acceptable for its scope, but `pnpm db:check` reports **UNLOCKED** by design and `validate:all` here intentionally **omits** `db:check`.
- The standalone `alan-hirsch` Supabase project (`nepvfebkqvuqbxthttao`) is **legacy** — none of these repos connect to it.

---

## 2. Canonical layout — `src/`, not the repo root

> ⚠ **Important:** this repo contains **two** copies of the early chain dirs. The canonical, active chain lives under **`src/`**. The root-level `db/`, `lib/`, `app/`, `hooks/` directories are **legacy 2-table stubs** (`db/schema.ts` = 4 tables: organizations, onboarding_responses, write, write_content) left from the original prototype. The validators and the running app use the `src/` tree.

```
Ground:  Live Postgres (Supabase movemental)   ← single source of truth
   │  scripts/generate-schema.ts  (introspect live DB)
   ▼
Layer 1: Drizzle Schema     src/lib/db/schema.ts            210 pgTables   ← validators read THIS path
   │  drizzle-zod
   ▼
Layer 2: Zod Schemas        src/lib/schemas/index.ts        Select/Insert/Update/Filters + z.infer types
   │  z.infer<>
   ▼
Layer 3: Services           src/lib/services/simplified/    210 *.service.ts (+ base.service.ts)
   │
   ▼
Layer 4: API Routes         src/app/api/simplified/<kebab>/ 210 route.ts (GET/POST/PATCH/DELETE)
   │
   ▼
Layer 5: React Hooks        src/hooks/simplified/           210 *.hooks.ts (React Query)
   │
   ▼
Layer 6: UI Components      src/components/                 consumed directly via Layer 5 hooks
```

### The golden rule

**Types flow downstream, never upstream.** Add a field to the database first, re-pull Layer 1, and let it cascade. Never hand-author a type in a higher layer.

---

## 3. Layer-by-layer reference

| Layer | Path (canonical) | Generator | Notes |
|-------|------------------|-----------|-------|
| 1 Drizzle schema | `src/lib/db/schema.ts` | `scripts/generate-schema.ts` | Structure SSOT; 210 `pgTable` exports |
| 2 Zod schemas | `src/lib/schemas/index.ts` | `scripts/generate-zod-schemas.ts` | Types SSOT (`z.infer<>`) |
| 3 Services | `src/lib/services/simplified/` | `scripts/generate-services.ts` | `EntityService extends SimplifiedService`; `base.service.ts` hand-written |
| 4 Routes | `src/app/api/simplified/` | `scripts/generate-routes.ts` | GET/POST/PATCH/DELETE per entity |
| 5 Hooks | `src/hooks/simplified/` | `scripts/generate-hooks.ts` | React Query; needs `QueryClientProvider` (`src/app/providers.tsx`) |
| 6 UI | `src/components/` | — | Consumes Layer 5 hooks directly (no generated `simplified/` UI) |

Tenant scoping (`organization_id` filtered by `TENANT_ORG_ID`) lives in `base.service.ts`, same as the other repos. This repo currently has **no** `custom/` service, hook, or API directories — all data access goes through the generated simplified chain.

---

## 4. Commands

```bash
# Regenerate
npx tsx scripts/generate-schema.ts   # Layer 1 — re-pull from live DB (needs DATABASE_URL in .env.local)
pnpm generate:schemas                # Layer 2
pnpm generate:services               # Layer 3
pnpm generate:routes                 # Layer 4
pnpm generate:hooks                  # Layer 5

# Validate
pnpm db:check          # Layer 1 → currently UNLOCKED (see §5)
pnpm contracts:check   # Layer 2
pnpm services:check    # Layer 3
pnpm routes:check      # Layer 4
pnpm hooks:check       # Layer 5
pnpm validate:all      # contracts + services + routes + hooks + article-frontmatter (NB: does NOT run db:check)
```

---

## 5. Current status (verified 2026-06-02)

| Layer | Name | Path | Count | Status |
|-------|------|------|-------|--------|
| — | Live DB | Supabase `vhaiiiykcukrlyvwlgip` | 223 tables | source of truth |
| 1 | Drizzle Schema | `src/lib/db/schema.ts` | 210 | **UNLOCKED** ⚠ |
| 2 | Zod Schemas | `src/lib/schemas/index.ts` | 210 | aligned to schema |
| 3 | Services | `src/lib/services/simplified/` | 210 (+ base) | aligned to schema |
| 4 | API Routes | `src/app/api/simplified/` | 210 | aligned to schema |
| 5 | React Hooks | `src/hooks/simplified/` | 210 | aligned to schema |

**Layer 1 drift (`pnpm db:check` → UNLOCKED):**
- **7 phantom tables** — present in `src/lib/db/schema.ts` but **not** in the live DB:
  `cohort_members`, `future_plans`, `future_plan_versions`, `future_plan_ratifications`,
  `leader_revision_requests`, `movement_leader_generated`, `recipes`.
  → Either apply the matching migration to the live DB, or drop these from the schema and regenerate.
- **~20 live tables not yet mirrored** here, including the scripture set (`scripture_books`,
  `scripture_chapters`, `scripture_verses`), `movement_leader_corpus_data`, the `reference_*`
  tables, `onboarding_cohorts`/`onboarding_global_content`, `guided_*`, etc.
  → Run `npx tsx scripts/generate-schema.ts` to re-pull if this repo needs them.

Layers 2–5 are internally consistent with the 210-table schema (the L2–L5 validators pass against `schema.ts`). The drift is purely between Layer 1 and the **live DB**.

---

## 6. Making a schema change (the waterfall)

1. Apply the DDL to the live DB.
2. `npx tsx scripts/generate-schema.ts` → `pnpm db:check` (target: LOCKED once drift is resolved).
3. `pnpm generate:schemas && pnpm contracts:check`.
4. `pnpm generate:services && pnpm services:check`.
5. `pnpm generate:routes && pnpm routes:check`.
6. `pnpm generate:hooks && pnpm hooks:check`.
7. Repeat in `movemental-visual-editor-main` and `alan-hirsch` if the table is shared.

**Fix bottom-up.** A type error upstream means a missing field at the source — fix Layer 1 and cascade.

---

## 7. Related skills & docs

- `type-safety-chain` skill — bootstrap/verify/repair the chain.
- `migrations-workflow` skill — Drizzle migration lifecycle (use to close the §5 drift).
- Older per-layer reference set: [`_docs/type/`](../../_docs/type/) (conceptually useful; numbers predate the 210-table chain).
- Cross-repo: `movemental-visual-editor-main/docs/architecture/TYPE_SAFETY_CHAIN.md`, `alan-hirsch/docs/architecture/TYPE_SAFETY_CHAIN.md`.
