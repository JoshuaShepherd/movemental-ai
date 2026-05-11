-- Incremental DDL for databases that predate these schema.ts tables.
-- Safe to re-run: uses IF NOT EXISTS for tables; FKs use duplicate-safe blocks.

CREATE TABLE IF NOT EXISTS "assessment_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"scores" jsonb NOT NULL,
	"total_score" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "book_email_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"lens" text DEFAULT 'movement-leaders' NOT NULL,
	"source" text NOT NULL,
	"chapter_slug" text,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "book_endorsements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quote" text NOT NULL,
	"context" text,
	"endorser_name" text NOT NULL,
	"endorser_title" text NOT NULL,
	"endorser_org" text,
	"endorser_avatar_url" text,
	"endorser_url" text,
	"audience_lens" text,
	"chapter_slug" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "book_margin_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chapter_slug" text NOT NULL,
	"anchor_paragraph_id" text NOT NULL,
	"type" text NOT NULL,
	"body" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"contributor_id" uuid,
	"contributor_display_name" text NOT NULL,
	"contributor_title" text,
	"contributor_url" text,
	"contact_email" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "book_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chapter_slug" text NOT NULL,
	"paragraph_id" text NOT NULL,
	"revision_summary" text NOT NULL,
	"before_text" text,
	"after_text" text,
	"credited_note_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"revised_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"organization" text,
	"audience_segment" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "dual_intelligence_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text,
	"situation_id" text NOT NULL,
	"audience_context" text NOT NULL,
	"likert_scores" jsonb NOT NULL,
	"succession_note" text,
	"result_payload" jsonb NOT NULL,
	"assessment_version" text DEFAULT 'di-v1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "leader_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"website_url" text NOT NULL,
	"content_type" text NOT NULL,
	"audience_size" text NOT NULL,
	"message" text NOT NULL,
	"referral_source" text,
	"referral_name" text,
	"status" text DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "organization_inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"org_name" text NOT NULL,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"org_type" text NOT NULL,
	"team_size" text NOT NULL,
	"current_tools" jsonb,
	"message" text NOT NULL,
	"timeline" text NOT NULL,
	"budget_range" text,
	"status" text DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "system_readiness_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text,
	"reality_situation" text NOT NULL,
	"audience_context" text NOT NULL,
	"likert_scores" jsonb NOT NULL,
	"bottleneck_note" text,
	"result_payload" jsonb NOT NULL,
	"assessment_version" text DEFAULT 'sr-v1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "dual_intelligence_assessments" ADD CONSTRAINT "dual_intel_assessments_org_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
 ALTER TABLE "system_readiness_assessments" ADD CONSTRAINT "system_readiness_assessments_org_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
