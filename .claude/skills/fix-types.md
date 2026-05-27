---
description: Fix type errors using bottom-up approach
---

# Fix Type Errors Bottom-Up

Guide for fixing type errors following the six-layer chain's bottom-up principle.

## Diagnosis

1. **Run validation**:
   ```bash
   npx tsc --noEmit
   ```

2. **Identify the layer** where each error appears:
   - `db/schema.ts` = Layer 1
   - `lib/schemas/` = Layer 2
   - `lib/services/simplified/` = Layer 3
   - `app/api/simplified/` = Layer 4
   - `hooks/simplified/` = Layer 5
   - `components/` = Layer 6

3. **Trace to root cause**: The error's appearance layer is often NOT the layer to fix. Trace the type back to its source.

## Bottom-Up Fix Process

### Step 1: Find the Lowest Affected Layer

If error appears in Layer 6 (UI), check:
- Does the type exist in Layer 5 (Hooks)?
- Does the type exist in Layer 4 (Routes)?
- Does the type exist in Layer 3 (Services)?
- Does the type exist in Layer 2 (Zod schemas)?
- Does the field exist in Layer 1 (Database)?

### Step 2: Fix at the Source

Fix the LOWEST layer where the issue originates:

**Layer 1 fix needed?**
```bash
# Edit db/schema.ts
# Then generate and apply migration
npm run db:generate
npm run db:push
npx tsc --noEmit  # Validate
```

**Layer 2 fix needed?**
```bash
# Edit lib/schemas/*.ts
# Zod schemas should auto-generate from drizzle-zod
npx tsc --noEmit  # Validate
```

### Step 3: Validate Each Layer

After fixing, validate from the fixed layer upward:
```bash
npx tsc --noEmit
```

### Step 4: Confirm Resolution

All errors should cascade-fix once the root is addressed.

## Common Patterns

| Error Pattern | Likely Root Cause |
|--------------|-------------------|
| "Property does not exist on type" | Field missing in database schema (Layer 1) |
| "Type is not assignable" | Type mismatch in Zod schema (Layer 2) |
| "Cannot find name" | Missing export in schemas (Layer 2) |
| "Argument of type X not assignable to Y" | Service return type mismatch (Layer 3) |

## Never Do This

- Add types directly to UI components that don't exist in schemas
- Use `any` or `as` to bypass type errors
- Skip layers or work around the chain
- Fix errors at a higher layer when root cause is lower
