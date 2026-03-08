---
description: Validate all six layers with TypeScript compiler
---

# Validate Type Safety Chain

Run the TypeScript compiler to validate all six layers of the type safety chain.

## Steps

1. Run the validation command:
   ```bash
   npx tsc --noEmit
   ```

2. If errors exist, report them organized by layer:
   - **Layer 1 (Database)**: Errors in `db/schema.ts`
   - **Layer 2 (Zod)**: Errors in `lib/schemas/`
   - **Layer 3 (Services)**: Errors in `lib/services/simplified/`
   - **Layer 4 (Routes)**: Errors in `app/api/simplified/`
   - **Layer 5 (Hooks)**: Errors in `hooks/simplified/`
   - **Layer 6 (UI)**: Errors in `components/`

3. If no errors, confirm all layers are LOCKED.

4. **Important**: If errors exist, remind the user that fixes must be applied bottom-up (Layer 1 first, then Layer 2, etc.). Never fix errors at a higher layer if the root cause is in a lower layer.
