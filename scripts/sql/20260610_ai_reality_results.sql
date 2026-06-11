-- AI Reality Assessment — unified per-submission results + org synthesis.
-- Additive only. Holds BOTH the 6-question map result and the 18-item SSSS
-- result under one org-/identity-keyed record. Apply AFTER
-- 20260610_ai_reality_invites.sql (invite_id FK).

create table if not exists public.ai_reality_results (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid references public.user_profiles (id) on delete set null,
  invite_id uuid references public.ai_reality_invites (id) on delete set null,
  instrument text not null,                       -- 'map' | 'ssss'
  email text,
  display_name text,
  anon_submission boolean not null default false,
  session_id text,
  anon_id text,
  audience text,
  -- Typed dashboard filter/sort columns (SSSS; null for map rows)
  overall_percent integer,
  stage_safety integer,
  stage_sandbox integer,
  stage_skills integer,
  stage_solutions integer,
  dominant_gap text,
  illusion_flags jsonb not null default '[]'::jsonb,
  result_payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_reality_results_org_instrument_idx
  on public.ai_reality_results (organization_id, instrument);
create index if not exists ai_reality_results_invite_idx
  on public.ai_reality_results (invite_id);
create index if not exists ai_reality_results_user_idx
  on public.ai_reality_results (user_id);
-- Backfill identity onto a pre-auth map row by email.
create index if not exists ai_reality_results_org_email_idx
  on public.ai_reality_results (organization_id, email);

create table if not exists public.ai_reality_org_results (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations (id) on delete cascade,
  result_payload jsonb not null,
  invited_count integer not null default 0,
  responded_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_reality_results enable row level security;
alter table public.ai_reality_org_results enable row level security;
