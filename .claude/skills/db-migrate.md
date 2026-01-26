---
description: Generate and apply Drizzle database migrations
---

# Database Migration Workflow

Generate and apply database migrations using Drizzle ORM.

## Steps

1. **Show current schema changes** (if any):
   ```bash
   npm run db:generate -- --dry-run 2>/dev/null || echo "Checking for pending changes..."
   ```

2. **Generate migration** from schema changes:
   ```bash
   npm run db:generate
   ```

3. **Review the generated migration** in `drizzle/` directory before applying.

4. **Apply migration** to database:
   ```bash
   npm run db:push
   ```

5. **Validate Layer 1** after migration:
   ```bash
   npx tsc --noEmit
   ```

6. If validation passes, confirm Layer 1 is LOCKED.

## Important Notes

- Always review generated SQL before pushing to production
- After schema changes, Zod schemas (Layer 2) will auto-update via `drizzle-zod`
- Run `/validate` after migration to ensure all layers still pass
- For tenant-scoped tables, ensure `organizationId` field is included
