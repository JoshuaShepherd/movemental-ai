# Type Safety Chain — Documentation Index

This folder documents the **six-layer type safety architecture**: types flow from the database schema (Layer 1) down to the UI (Layer 6). Use it to understand the chain, run validation, and fix errors.

## Entry points

| Document | Purpose |
|----------|---------|
| [TYPE_SAFETY.md](TYPE_SAFETY.md) | **Start here.** Full chain overview, naming rules, validation commands, lock-before-proceed, and how to fix errors by layer. |
| [validation/VALIDATION_STATUS.md](validation/VALIDATION_STATUS.md) | Snapshot of validation status; run `pnpm validate:all` to refresh. |

## Layer-by-layer reference

| Layer | Doc | Command | Required status |
|-------|-----|---------|------------------|
| 1 | [layers/01-drizzle-schema.md](layers/01-drizzle-schema.md) | `pnpm db:check` | LOCKED |
| 2 | [layers/02-zod-schemas.md](layers/02-zod-schemas.md) | `pnpm contracts:check` | LOCKED |
| 3 | [layers/03-services.md](layers/03-services.md) | `pnpm services:check` | LOCKED |
| 4 | [layers/04-api-routes.md](layers/04-api-routes.md) | `pnpm routes:check` | VALIDATED |
| 5 | [layers/05-react-hooks.md](layers/05-react-hooks.md) | `pnpm hooks:check` | LOCKED |

Each layer doc describes: purpose, file locations, **exact validation rules** (what the script checks), regeneration command, and rules to follow.

Layer 6 (UI Components) is not yet part of the generated chain for this repo — UI is hand-built from Stitch designs via the migration prompt.

## Error check and fix (quick reference)

1. **Run:** `pnpm validate:all` (stops at first failing layer).
2. **Interpret:** Scripts print JSON; exit 0 = success (LOCKED/VALIDATED), exit 1 = UNLOCKED — use `message`, `missing`, `invalid`.
3. **Fix:** Fix only at the failing layer (see [TYPE_SAFETY.md — Error Fixing Protocol](TYPE_SAFETY.md#error-fixing-protocol)).
4. **Re-validate:** Run that layer's command, then higher layers (or `pnpm validate:all` again). Repeat until all pass.
5. **Snapshot:** Update [validation/VALIDATION_STATUS.md](validation/VALIDATION_STATUS.md) with current status after fixes.

## Quick commands

```bash
pnpm validate:all          # Check layers 2–5 (stops at first failure)
pnpm db:check              # Layer 1 (requires DATABASE_URL)
pnpm contracts:check       # Layer 2
pnpm services:check        # Layer 3
pnpm routes:check          # Layer 4
pnpm hooks:check           # Layer 5
pnpm typecheck             # TypeScript (tsc --noEmit)
```

Generate/regenerate layers (after changing Layer 1). **All generators overwrite existing files:**

```bash
pnpm generate:schemas      # Layer 2 — overwrites src/lib/schemas/index.ts
pnpm generate:services     # Layer 3 — overwrites all entity service files + index.ts
pnpm generate:routes       # Layer 4 — overwrites all entity route files
pnpm generate:hooks        # Layer 5 — overwrites all entity hook files + index.ts
```
