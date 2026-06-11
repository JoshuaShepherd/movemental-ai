-- AI Reality Assessment — team invites + dashboard share tokens.
-- Additive only. Mirrors the sandbox_staff_readiness_invites token scheme
-- (SHA-256 token_hash; raw token never stored). Apply BEFORE
-- 20260610_ai_reality_results.sql (results.invite_id references this table).

create table if not exists public.ai_reality_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  token_hash text not null unique,
  label text,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_by uuid references public.user_profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_reality_invites_org_idx
  on public.ai_reality_invites (organization_id);

create table if not exists public.ai_reality_share_tokens (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_by uuid references public.user_profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_reality_share_tokens_org_idx
  on public.ai_reality_share_tokens (organization_id);

-- Defense in depth: the app connects as table owner (DATABASE_URL) and bypasses
-- RLS; enabling it with no public policy locks out direct PostgREST/anon access.
alter table public.ai_reality_invites enable row level security;
alter table public.ai_reality_share_tokens enable row level security;
