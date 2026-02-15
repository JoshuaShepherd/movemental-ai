# Alan Hirsch vs Multi-Tenant (movemental) Schema Drift

**Purpose**: Track schema differences between the alan-hirsch (source of truth) platform and the movemental multi-tenant database. Used for schema sync—**no data migration**.

**Last Updated**: 2026-02-15

---

## 1. Drift and Resolution Steps

### 1.1 Add Missing Table
- **cohort_discussion_messages**: Created on movemental via migration `add_cohort_discussion_messages` (2026-02-15). Structure matches alan-hirsch: id, cohort_id, session_id, user_id, parent_id, title, content, created_at, updated_at. RLS enabled with authenticated-user policies.

### 1.2 book_chapters vs books_chapters
- **Resolution**: Movemental has **both** tables.
- **book_chapters**: 23 columns including organization_id; sort_order.
- **books_chapters**: 26 columns including organization_id; order_index, is_active (alan-hirsch canonical).
- **Decision**: Leave both. `books_chapters` is the alan-hirsch canonical table. `book_chapters` retained for legacy/compatibility. No data migration.

### 1.3 Missing Columns (Applied)
Migrations applied to movemental:
- **agent_guardrail_assignments**: Added order, config, enabled, updated_at
- **agent_guardrails**: Aligned execution_phase default 'both', execution_mode default 'blocking'
- **agent_instances**: Added context, started_at, completed_at, error_message, session_id, thread_id, assistant_id
- **ai_lab_lite_conversations**: Added theme
- **agents**: Model default set to 'gpt-4o'
- **course_lessons**: Added week_number, module_type, field_experiment_id, journal_prompt_id, content_item_id, video_id, media_id, content_source, module_id, week_id, section_type, section_order, audio_id, audio_url, embed_code

### 1.4 Types and Defaults
- Aligned per §1.3 where specified.
- organization_id kept on all tenant-scoped tables for RLS.

### 1.5 Data Migration
- **None performed.** Per instructions, no backfills.

### 1.6 Legacy Columns
- Deferred. Prefer renaming to `_deprecated` after type safety chain is stable.

### 1.7 RLS and organization_id
- organization_id retained on tenant tables. RLS policies enabled on cohort_discussion_messages.

---

## 2. Execution Log

| Date       | Action                                                                 |
|------------|------------------------------------------------------------------------|
| 2026-02-15 | Schema sync (no data migration) completed via Supabase MCP             |
| 2026-02-15 | Created cohort_discussion_messages                                     |
| 2026-02-15 | Documented book_chapters vs books_chapters (both retained)             |
| 2026-02-15 | Applied add_alan_hirsch_columns_batch1, align_agent_guardrails_defaults |
| 2026-02-15 | Type safety chain validation (see _docs/type/validation/)              |

**Intentional differences left on movemental**:
- organization_id on tenant tables (required for RLS / multi-tenant isolation)
- Both book_chapters and books_chapters (no drop; no data migration)
