-- Align Postgres with Drizzle `organizations.cohort_id` (SandboxLive cohort grouping).
-- Nullable uuid; no FK yet — see `src/lib/db/schema.ts` on `organizations`.
--
-- Apply against the same database as `DATABASE_URL` (e.g. Supabase SQL editor or:
--   psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/sql/20260512_organizations_cohort_id.sql
-- )

BEGIN;

ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS cohort_id uuid;

COMMIT;
