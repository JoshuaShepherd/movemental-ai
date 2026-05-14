-- SandboxLive staff AI readiness intake submissions.
-- One row per (organization, user). Latest submission wins via upsert.
-- Prefer `pnpm drizzle:push` to materialize the table from Drizzle schema,
-- then apply this file to add RLS. Or run this file standalone — `CREATE TABLE
-- IF NOT EXISTS` keeps it idempotent.

CREATE TABLE IF NOT EXISTS "sandbox_staff_readiness_submissions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
    "user_id" uuid NOT NULL REFERENCES "user_profiles"("id") ON DELETE CASCADE,
    "answers" jsonb NOT NULL DEFAULT '{}'::jsonb,
    "submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "sandbox_staff_readiness_submissions_org_user_key"
        UNIQUE ("organization_id", "user_id")
);

CREATE INDEX IF NOT EXISTS "sandbox_staff_readiness_submissions_org_idx"
    ON "sandbox_staff_readiness_submissions" ("organization_id");

CREATE INDEX IF NOT EXISTS "sandbox_staff_readiness_submissions_user_idx"
    ON "sandbox_staff_readiness_submissions" ("user_id");

-- RLS — defense in depth. Drizzle writes through DATABASE_URL bypass RLS;
-- the real auth gate is the server action's session + membership check.
-- These policies protect any future direct Supabase-client reads.
ALTER TABLE "sandbox_staff_readiness_submissions" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "readiness_select_own_in_org"
    ON "sandbox_staff_readiness_submissions";
CREATE POLICY "readiness_select_own_in_org"
    ON "sandbox_staff_readiness_submissions"
    FOR SELECT
    USING (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.organization_memberships m
            WHERE m.organization_id = sandbox_staff_readiness_submissions.organization_id
              AND m.user_id = auth.uid()
              AND m.status IN ('active', 'pending')
        )
    );

DROP POLICY IF EXISTS "readiness_insert_own_in_org"
    ON "sandbox_staff_readiness_submissions";
CREATE POLICY "readiness_insert_own_in_org"
    ON "sandbox_staff_readiness_submissions"
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.organization_memberships m
            WHERE m.organization_id = sandbox_staff_readiness_submissions.organization_id
              AND m.user_id = auth.uid()
              AND m.status IN ('active', 'pending')
        )
    );

DROP POLICY IF EXISTS "readiness_update_own_in_org"
    ON "sandbox_staff_readiness_submissions";
CREATE POLICY "readiness_update_own_in_org"
    ON "sandbox_staff_readiness_submissions"
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.organization_memberships m
            WHERE m.organization_id = sandbox_staff_readiness_submissions.organization_id
              AND m.user_id = auth.uid()
              AND m.status IN ('active', 'pending')
        )
    );
