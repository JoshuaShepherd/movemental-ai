-- Optional: apply to Supabase (public) when program templates need persisted
-- milestones / summary text per organization + template_slug.
-- After applying, regenerate Drizzle from live DB per docs/architecture/layers/01-drizzle-schema.md
-- and remove the `as any` escape hatch in src/lib/program/load-program-template-data.server.ts.

create table if not exists public.program_engagements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  template_slug text not null,
  summary_markdown text,
  milestones jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, template_slug)
);

alter table public.program_engagements enable row level security;

-- Example policy: members of the organization can read/write (tighten per product/security review).
create policy "program_engagements_select_member"
  on public.program_engagements
  for select
  using (
    exists (
      select 1
      from public.organization_memberships m
      where m.organization_id = program_engagements.organization_id
        and m.user_id = auth.uid()
    )
  );

create policy "program_engagements_write_member"
  on public.program_engagements
  for all
  using (
    exists (
      select 1
      from public.organization_memberships m
      where m.organization_id = program_engagements.organization_id
        and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.organization_memberships m
      where m.organization_id = program_engagements.organization_id
        and m.user_id = auth.uid()
    )
  );
