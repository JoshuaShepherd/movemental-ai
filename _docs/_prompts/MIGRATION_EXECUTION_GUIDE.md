# Migration Execution Guide: Alan-Hirsch → Movemental

> **Generated**: January 26, 2026  
> **Migration File**: `alan-hirsch-to-movemental-migration.sql`  
> **Tables to Create**: 90  
> **Existing Tables**: 44 (will NOT be modified)

---

## Pre-Migration Checklist

- [ ] **Backup movemental database** (critical!)
- [ ] Verify you have admin access to Supabase movemental project
- [ ] Review the migration SQL file
- [ ] Confirm all 44 existing tables should remain unchanged

---

## Execution Options

### Option A: Supabase SQL Editor (Recommended)

1. **Open Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select the **movemental** project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Execute Migration**
   - Copy the entire contents of `alan-hirsch-to-movemental-migration.sql`
   - Paste into the SQL editor
   - Click "Run" (or Ctrl/Cmd + Enter)

4. **Monitor Execution**
   - Watch for any error messages
   - All statements use `IF NOT EXISTS` so re-running is safe

5. **Verify Results**
   ```sql
   -- Count total tables after migration
   SELECT COUNT(*) as table_count 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   -- Expected: 134 (44 existing + 90 new)
   ```

### Option B: Supabase MCP (When Authenticated)

Once the Supabase MCP is authenticated in Cursor:

1. Connect to the `movemental` project
2. Use `execute_sql` tool to run the migration
3. Execute in sections (Priority 1 through Priority 14) for better control

### Option C: psql Command Line

```bash
# Set connection string
export SUPABASE_DB_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Execute migration
psql $SUPABASE_DB_URL -f alan-hirsch-to-movemental-migration.sql
```

### Option D: Drizzle Migration (Code-First)

1. Add table definitions to `movemental/db/schema.ts`
2. Generate migration: `pnpm drizzle:gen`
3. Push to database: `pnpm drizzle:push`

---

## Execution Order (Built Into SQL File)

The migration file is organized by dependency order:

| Priority | Tables | Count | Description |
|----------|--------|-------|-------------|
| 1 | Core Infrastructure | 8 | Base tables with no dependencies |
| 2 | Content & Archive Extensions | 7 | Extends archive_items, content_items |
| 3 | Course System | 18 | Full LMS course tables |
| 4 | Assessment Extensions | 4 | Extends assessment tables |
| 5 | Learning Activities | 8 | Exercises, reflections, outcomes |
| 6 | Book Extensions | 4 | Purchases, reviews, progress |
| 7 | Video Extensions | 5 | Watch history, annotations |
| 8 | Commerce & Transactions | 7 | Payments, affiliates, donations |
| 9 | Credentials & Certificates | 3 | Certificates, badges, CE credits |
| 10 | Agent Extensions | 5 | Handoffs, metrics, interactions |
| 11 | User Profile Extensions | 14 | Rich user context data |
| 12 | Notifications & Social | 5 | Comments, bookmarks |
| 13 | Analytics Extensions | 2 | Search history, media tracking |
| 14 | Audience | 1 | Audience profiles |

---

## Post-Migration Verification

### 1. Count Tables
```sql
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public';
```
**Expected**: 134

### 2. Verify Specific New Tables
```sql
-- Check Priority 1 tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'voice_baselines',
  'user_subscriptions',
  'certificate_templates',
  'question_banks',
  'podcast_series',
  'cohorts',
  'email_templates',
  'audit_logs'
);
```

### 3. Verify Foreign Keys
```sql
-- Count foreign key constraints
SELECT COUNT(*) as fk_count
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY'
AND table_schema = 'public';
```

### 4. Check Existing Data Intact
```sql
-- Verify existing table data wasn't modified
SELECT COUNT(*) FROM user_profiles;
SELECT COUNT(*) FROM organizations;
SELECT COUNT(*) FROM content_items;
-- Compare with pre-migration counts
```

---

## Troubleshooting

### Error: "relation already exists"
- This shouldn't happen with `IF NOT EXISTS` but if it does:
- The table already exists, which is safe
- Continue with remaining statements

### Error: "relation does not exist" (for foreign key)
- A referenced table is missing
- Check if it's in the 44 existing tables
- May need to adjust migration order

### Error: "permission denied"
- Verify you have admin/postgres role access
- Check Supabase project permissions

### Timeout on Large Migration
- Execute in sections (Priority 1, then 2, etc.)
- Each priority group can be run separately

---

## Rollback (If Needed)

To remove newly created tables (CAUTION: destructive!):

```sql
-- Only run if migration needs to be undone!
-- This will DROP all 90 new tables

-- Generate DROP statements
SELECT 'DROP TABLE IF EXISTS ' || table_name || ' CASCADE;'
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN (
  'voice_baselines',
  'user_subscriptions',
  -- ... list all 90 tables
);
```

---

## Summary

| Metric | Value |
|--------|-------|
| Existing tables (preserved) | 44 |
| New tables to create | 90 |
| Total after migration | 134 |
| Safety: IF NOT EXISTS | ✅ |
| Indexes created | 25+ |
| Foreign keys | 100+ |

---

**Ready to execute!** Follow Option A (Supabase SQL Editor) for the safest approach.
