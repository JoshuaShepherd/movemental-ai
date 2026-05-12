-- Movement leader public page ratification (Postgres).
-- Prefer `pnpm drizzle:push` from Drizzle schema when your environment is wired.

CREATE TABLE IF NOT EXISTS "movement_leader_public_pages" (
	"leader_id" uuid PRIMARY KEY NOT NULL REFERENCES "movement_leaders"("id") ON DELETE CASCADE,
	"approved_at" timestamp with time zone,
	"published_at" timestamp with time zone,
	"unpublished_at" timestamp with time zone,
	"approved_by_movement_leader_email" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "movement_leader_public_page_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"leader_id" uuid NOT NULL REFERENCES "movement_leaders"("id") ON DELETE CASCADE,
	"version_number" integer NOT NULL,
	"status" text NOT NULL,
	"snapshot" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "movement_leader_public_page_versions_leader_version_unique" UNIQUE("leader_id","version_number")
);
