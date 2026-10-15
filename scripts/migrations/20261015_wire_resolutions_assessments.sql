-- Migration: 20261015_wire_resolutions_assessments.sql
-- Additive, safe DDL for Resolution and Reality Assessment surfaces.

CREATE TABLE IF NOT EXISTS "resolution_statements" (
  "id" text PRIMARY KEY,
  "theme" text NOT NULL,
  "position" integer NOT NULL,
  "text" text NOT NULL,
  "edition_override" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "resolutions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "person_id" uuid REFERENCES "user_profiles"("id") ON DELETE SET NULL,
  "email" text,
  "org_type" text NOT NULL DEFAULT 'Nonprofit',
  "org_label" text NOT NULL,
  "organization_id" uuid REFERENCES "organizations"("id") ON DELETE SET NULL,
  "visibility" text NOT NULL DEFAULT 'private',
  "share_token" text UNIQUE,
  "share_token_revoked" boolean NOT NULL DEFAULT false,
  "research_consent" boolean NOT NULL DEFAULT false,
  "count_in_org" boolean NOT NULL DEFAULT true,
  "display_name" text,
  "role_text" text,
  "org_role" text DEFAULT 'served',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_resolutions_org_id" ON "resolutions"("organization_id");
CREATE INDEX IF NOT EXISTS "idx_resolutions_share_token" ON "resolutions"("share_token");
CREATE INDEX IF NOT EXISTS "idx_resolutions_email" ON "resolutions"("email");

CREATE TABLE IF NOT EXISTS "resolution_versions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "resolution_id" uuid NOT NULL REFERENCES "resolutions"("id") ON DELETE CASCADE,
  "version" integer NOT NULL DEFAULT 1,
  "selections" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "hardest_theme" integer,
  "acts" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "two_minutes" text,
  "lines" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_resolution_versions_resolution" ON "resolution_versions"("resolution_id", "version" DESC);

CREATE TABLE IF NOT EXISTS "resolution_invitations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "inviter_id" uuid REFERENCES "user_profiles"("id") ON DELETE SET NULL,
  "inviter_email" text NOT NULL,
  "invitee_email" text NOT NULL,
  "organization_label" text NOT NULL,
  "organization_id" uuid REFERENCES "organizations"("id") ON DELETE SET NULL,
  "note" text,
  "token" text UNIQUE NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "status_visible_to_inviter" boolean NOT NULL DEFAULT true,
  "sent_at" timestamp with time zone DEFAULT now() NOT NULL,
  "accepted_at" timestamp with time zone,
  "reminded_at" timestamp with time zone
);

CREATE INDEX IF NOT EXISTS "idx_resolution_invitations_token" ON "resolution_invitations"("token");
CREATE INDEX IF NOT EXISTS "idx_resolution_invitations_invitee" ON "resolution_invitations"("invitee_email");

-- Reality Assessment tables
CREATE TABLE IF NOT EXISTS "reality_assessment_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "organization_name" text NOT NULL,
  "organization_type" text NOT NULL DEFAULT 'Nonprofit',
  "organization_id" uuid REFERENCES "organizations"("id") ON DELETE SET NULL,
  "leader_email" text NOT NULL,
  "leader_token" text UNIQUE NOT NULL,
  "contributor_token" text UNIQUE NOT NULL,
  "status" text NOT NULL DEFAULT 'in_progress',
  "predictions_sealed_at" timestamp with time zone,
  "target_contributor_count" integer DEFAULT 10,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_reality_assessment_sessions_leader_token" 
  ON "reality_assessment_sessions"("leader_token");
CREATE INDEX IF NOT EXISTS "idx_reality_assessment_sessions_contributor_token" 
  ON "reality_assessment_sessions"("contributor_token");

CREATE TABLE IF NOT EXISTS "reality_assessment_predictions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "reality_assessment_sessions"("id") ON DELETE CASCADE,
  "predictions" jsonb NOT NULL,
  "sealed" boolean NOT NULL DEFAULT true,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_reality_assessment_predictions_session" 
  ON "reality_assessment_predictions"("session_id");

CREATE TABLE IF NOT EXISTS "reality_assessment_responses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "reality_assessment_sessions"("id") ON DELETE CASCADE,
  "answers" jsonb NOT NULL,
  "respondent_role" text,
  "submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_reality_assessment_responses_session" 
  ON "reality_assessment_responses"("session_id");

CREATE TABLE IF NOT EXISTS "reality_assessment_invites" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "reality_assessment_sessions"("id") ON DELETE CASCADE,
  "email" text NOT NULL,
  "sent_at" timestamp with time zone DEFAULT now() NOT NULL,
  "completed_at" timestamp with time zone
);
