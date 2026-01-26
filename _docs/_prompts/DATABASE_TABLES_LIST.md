# Movemental Database Tables

> **Generated**: January 26, 2026  
> **Source**: Supabase PostgreSQL (public schema) + Drizzle Schema  
> **Current Tables**: 44 (in Supabase)  
> **Drizzle Schema Tables**: 2  
> **Proposed New Tables**: 90 (from migration)  
> **Total After Migration**: 134

---

## Schema Source of Truth

### Drizzle Schema (`db/schema.ts`) - Layer 1

The Drizzle schema currently defines only **2 tables**:

| # | Table Name | Columns | Domain | Multi-Tenant |
|---|------------|---------|--------|--------------|
| 1 | `organizations` | 7 | Organizations | N/A (tenant root) |
| 2 | `onboarding_responses` | 39 | Onboarding | ✅ `organization_id` |

**Note**: Most existing tables were created directly in Supabase, not through Drizzle migrations. For the type safety chain to work properly, all tables should eventually be defined in Drizzle.

---

## Current Database Tables (44 in Supabase)

### Complete Table List

| # | Table Name | Columns | Domain | Multi-Tenant |
|---|------------|---------|--------|--------------|
| 1 | `agent_guardrail_assignments` | 5 | AI/Agents | ❓ Needs audit |
| 2 | `agent_guardrails` | 14 | AI/Agents | ❓ Needs audit |
| 3 | `agent_instances` | 9 | AI/Agents | ❓ Needs audit |
| 4 | `agent_tool_assignments` | 9 | AI/Agents | ❓ Needs audit |
| 5 | `agent_tools` | 13 | AI/Agents | ❓ Needs audit |
| 6 | `agent_traces` | 18 | AI/Agents | ❓ Needs audit |
| 7 | `agents` | 21 | AI/Agents | ✅ `organization_id` |
| 8 | `ai_lab_conversations` | 14 | AI/Agents | ❓ Needs audit |
| 9 | `ai_lab_lite_conversations` | 11 | AI/Agents | ❓ Needs audit |
| 10 | `analytics_events` | 10 | Analytics | ❓ Needs audit |
| 11 | `archive_collections` | 11 | Archive | ❓ Needs audit |
| 12 | `archive_items` | 10 | Archive | ❓ Needs audit |
| 13 | `archive_topics` | 13 | Archive | ❓ Needs audit |
| 14 | `assessment_questions` | 16 | Assessments | ❓ Needs audit |
| 15 | `assessment_responses` | 11 | Assessments | ❓ Needs audit |
| 16 | `assessments` | 24 | Assessments | ✅ `organization_id` |
| 17 | `book_chapters` | 25 | Books | ❓ Needs audit |
| 18 | `book_series` | 12 | Books | ❓ Needs audit |
| 19 | `books` | 73 | Books | ✅ `organization_id` |
| 20 | `books_chapters` | 27 | Books | ❓ Needs audit |
| 21 | `citations` | 20 | Books | ❓ Needs audit |
| 22 | `communities` | 24 | Community | ✅ `organization_id` |
| 23 | `content_categories` | 15 | Content | ❓ Needs audit |
| 24 | `content_items` | 63 | Content | ✅ `organization_id` |
| 25 | `content_versions` | 13 | Content | ❓ Needs audit |
| 26 | `course_lessons` | 18 | Courses | ❓ Needs audit |
| 27 | `course_weeks` | 13 | Courses | ❓ Needs audit |
| 28 | `courses` | 37 | Courses | ✅ `organization_id` |
| 29 | `formation_practice_assignments` | 7 | Courses | ❓ Needs audit |
| 30 | `media_items` | 18 | Media | ✅ `organization_id` |
| 31 | `organization_memberships` | 11 | Organizations | ✅ (via `organization_id`) |
| 32 | `organizations` | 28 | Organizations | N/A (tenant root) |
| 33 | `page_views` | 16 | Analytics | ❓ Needs audit |
| 34 | `performance_metrics` | 11 | Analytics | ❓ Needs audit |
| 35 | `search_analytics` | 9 | Analytics | ❓ Needs audit |
| 36 | `subscription_plans` | 22 | Commerce | ❓ Platform-level |
| 37 | `user_assessments` | 51 | Assessments | ❓ Needs audit |
| 38 | `user_context_profiles` | 5 | Users | ❓ Needs audit |
| 39 | `user_memory` | 7 | Users | ❓ Needs audit |
| 40 | `user_personality` | 6 | Users | ❓ Needs audit |
| 41 | `user_profiles` | 39 | Users | ❓ Needs audit |
| 42 | `video_recordings` | 12 | Media | ❓ Needs audit |
| 43 | `video_series` | 12 | Media | ❓ Needs audit |
| 44 | `videos` | 38 | Media | ✅ `organization_id` |

---

## Tables by Domain

### AI/Agents (9 tables, 114 columns)
- `agents` (21 columns) - ✅ Multi-tenant
- `agent_tools` (13 columns)
- `agent_instances` (9 columns)
- `agent_guardrails` (14 columns)
- `agent_guardrail_assignments` (5 columns)
- `agent_tool_assignments` (9 columns)
- `agent_traces` (18 columns)
- `ai_lab_conversations` (14 columns)
- `ai_lab_lite_conversations` (11 columns)

### Analytics (4 tables, 46 columns)
- `analytics_events` (10 columns)
- `page_views` (16 columns)
- `performance_metrics` (11 columns)
- `search_analytics` (9 columns)

### Archive (3 tables, 34 columns)
- `archive_collections` (11 columns)
- `archive_items` (10 columns)
- `archive_topics` (13 columns)

### Assessments (4 tables, 102 columns)
- `assessments` (24 columns) - ✅ Multi-tenant
- `assessment_questions` (16 columns)
- `assessment_responses` (11 columns)
- `user_assessments` (51 columns)

### Books (5 tables, 157 columns)
- `books` (73 columns) - ✅ Multi-tenant
- `book_chapters` (25 columns)
- `books_chapters` (27 columns)
- `book_series` (12 columns)
- `citations` (20 columns)

### Commerce (1 table, 22 columns)
- `subscription_plans` (22 columns) - Platform-level (no tenant scoping)

### Community (1 table, 24 columns)
- `communities` (24 columns) - ✅ Multi-tenant

### Content (3 tables, 91 columns)
- `content_items` (63 columns) - ✅ Multi-tenant
- `content_categories` (15 columns)
- `content_versions` (13 columns)

### Courses (4 tables, 75 columns)
- `courses` (37 columns) - ✅ Multi-tenant
- `course_lessons` (18 columns)
- `course_weeks` (13 columns)
- `formation_practice_assignments` (7 columns)

### Media (4 tables, 80 columns)
- `videos` (38 columns) - ✅ Multi-tenant
- `video_series` (12 columns)
- `video_recordings` (12 columns)
- `media_items` (18 columns) - ✅ Multi-tenant

### Organizations (2 tables, 39 columns)
- `organizations` (28 columns) - Tenant root
- `organization_memberships` (11 columns)

### Users (5 tables, 108 columns)
- `user_profiles` (39 columns)
- `user_assessments` (51 columns) *also in Assessments*
- `user_context_profiles` (5 columns)
- `user_memory` (7 columns)
- `user_personality` (6 columns)

---

## Proposed New Tables (90 from Migration)

See `MIGRATION_EXECUTION_GUIDE.md` for full details. Summary by priority:

| Priority | Category | Table Count | Key Tables |
|----------|----------|-------------|------------|
| 1 | Core Infrastructure | 8 | `voice_baselines`, `user_subscriptions`, `certificate_templates`, `cohorts` |
| 2 | Content & Archive Extensions | 7 | Archive extensions, content extensions |
| 3 | Course System | 18 | Full LMS course tables |
| 4 | Assessment Extensions | 4 | Question banks, assessment analytics |
| 5 | Learning Activities | 8 | Exercises, reflections, outcomes |
| 6 | Book Extensions | 4 | Purchases, reviews, progress |
| 7 | Video Extensions | 5 | Watch history, annotations |
| 8 | Commerce & Transactions | 7 | Payments, affiliates, donations |
| 9 | Credentials & Certificates | 3 | Certificates, badges, CE credits |
| 10 | Agent Extensions | 5 | Handoffs, metrics, interactions |
| 11 | User Profile Extensions | 14 | Rich user context data |
| 12 | Notifications & Social | 5 | Comments, bookmarks |
| 13 | Analytics Extensions | 2 | Search history, media tracking |
| 14 | Audience | 1 | `audience_profiles` |

---

## High Priority Schema Additions (from DATA_MIGRATION_AND_SCHEMA_PROPOSAL.md)

These 6 tables are recommended for immediate implementation:

| # | Table | Purpose | Multi-Tenant | Priority |
|---|-------|---------|--------------|----------|
| 1 | `author_profiles` | Rich author intelligence storage | ✅ Required | HIGH |
| 2 | `movement_leader_research` | Pre-onboarding research database | Optional (nullable) | HIGH |
| 3 | `audience_profiles` | Audience segment intelligence | ✅ Required | MEDIUM |
| 4 | `content_audits` | Content inventory and gap analysis | ✅ Required | MEDIUM |
| 5 | `book_authors` | Structured co-author relationships | ✅ Required | LOW |
| 6 | `voice_baselines` | AI voice configuration | ✅ Required | ENHANCEMENT |

---

## Multi-Tenant Status Summary

### Confirmed Multi-Tenant (✅)
Tables with verified `organization_id` column:
- `organizations` (tenant root)
- `organization_memberships`
- `onboarding_responses` (Drizzle)
- `books`
- `content_items`
- `courses`
- `videos`
- `assessments`
- `media_items`
- `communities`
- `agents`

### Needs Multi-Tenant Audit (❓)
Tables requiring verification/update for `organization_id`:
- All child/junction tables (book_chapters, course_lessons, etc.)
- User extension tables (user_context_profiles, user_memory, etc.)
- Analytics tables
- Archive tables
- AI/Agent sub-tables

### Platform-Level (No Tenant)
Tables that should NOT have tenant scoping:
- `subscription_plans` (shared across all tenants)
- `movement_leader_research` (platform-wide research, optional org_id)

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| **Current Tables (Supabase)** | 44 |
| **Drizzle Schema Tables** | 2 |
| **Proposed New Tables** | 90 |
| **Total After Migration** | 134 |
| **Total Columns (current)** | ~829 |
| **Largest Table** | `books` (73 columns) |
| **Second Largest** | `content_items` (63 columns) |
| **Third Largest** | `user_assessments` (51 columns) |
| **Confirmed Multi-Tenant** | 11 tables |
| **Needs Audit** | 33 tables |

---

## Action Items

### Immediate
1. **Audit existing tables** for `organization_id` column presence
2. **Add missing `organization_id`** to tenant-scoped tables
3. **Update Drizzle schema** to include all tables (currently only 2)
4. **Run migration** for 90 new tables (see `MIGRATION_EXECUTION_GUIDE.md`)

### Before Migration
1. Backup database
2. Verify multi-tenant requirements for all 90 new tables
3. Update RLS policies for new tables

---

## Related Documentation

- `DATA_MIGRATION_AND_SCHEMA_PROPOSAL.md` - Schema gaps and proposed additions
- `MIGRATION_EXECUTION_GUIDE.md` - Migration execution instructions
- `alan-hirsch-to-movemental-migration.sql` - Full SQL migration file
- `_docs/type/09_MULTI_TENANT_NOTES.md` - Multi-tenant architecture guide
- `_docs/business-docs/02_product_platform/database/supabase_schema.sql` - Full schema reference

---

*Last updated: January 26, 2026*  
*Note: Supabase MCP authentication required for live database queries*
