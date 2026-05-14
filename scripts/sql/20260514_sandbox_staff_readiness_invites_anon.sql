-- SandboxLive token-gated anonymous staff readiness intake.
-- Run after Drizzle schema is aligned, or apply standalone (IF NOT EXISTS).
-- Prefer: pnpm drizzle:push from repo root, then apply this file for RLS.

CREATE TABLE IF NOT EXISTS "sandbox_staff_readiness_invites" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
    "token_hash" text NOT NULL,
    "label" text,
    "expires_at" timestamp with time zone,
    "revoked_at" timestamp with time zone,
    "created_by" uuid REFERENCES "user_profiles"("id") ON DELETE SET NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "sandbox_staff_readiness_invites_token_hash_unique" UNIQUE ("token_hash")
);

CREATE INDEX IF NOT EXISTS "sandbox_staff_readiness_invites_org_idx"
    ON "sandbox_staff_readiness_invites" ("organization_id");

CREATE TABLE IF NOT EXISTS "sandbox_staff_readiness_anonymous_submissions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "invite_id" uuid NOT NULL REFERENCES "sandbox_staff_readiness_invites"("id") ON DELETE CASCADE,
    "organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE CASCADE,
    "display_name" text NOT NULL,
    "email" text,
    "role_or_team" text,
    "answers" jsonb NOT NULL DEFAULT '{}'::jsonb,
    "intake_version" text,
    "submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "sandbox_staff_readiness_anon_invite_idx"
    ON "sandbox_staff_readiness_anonymous_submissions" ("invite_id");

CREATE INDEX IF NOT EXISTS "sandbox_staff_readiness_anon_org_idx"
    ON "sandbox_staff_readiness_anonymous_submissions" ("organization_id");

ALTER TABLE "sandbox_staff_readiness_invites" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sandbox_staff_readiness_anonymous_submissions" ENABLE ROW LEVEL SECURITY;

-- Defense in depth: app writes via DATABASE_URL (typically bypasses RLS as table owner).
-- Direct Supabase client access without policies is denied for anon/authenticated.
