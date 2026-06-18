-- Applied migration: agent_room_transcripts
-- Tenant-scoped durable log of Agent Room concierge turns for audit, restore, and debugging.
-- Engine write path: movemental-ai-agents persistRoomTranscript (row per message).
-- Client read path: GET /api/agent-room/transcript?sessionId=

CREATE TABLE IF NOT EXISTS agent_room_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  organization_id uuid NOT NULL REFERENCES organizations(id),
  session_id text,
  anon_id text,
  agent_slug text NOT NULL,
  role text NOT NULL,
  message_text text NOT NULL,
  tool_calls jsonb,
  phase text,
  screen_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_room_transcripts_org_created_idx
  ON agent_room_transcripts (organization_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_room_transcripts_session_idx
  ON agent_room_transcripts (session_id);

CREATE INDEX IF NOT EXISTS agent_room_transcripts_anon_created_idx
  ON agent_room_transcripts (anon_id, created_at DESC);
