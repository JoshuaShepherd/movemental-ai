-- Lossless substrate storage for the movement-leader corpus.
-- Additive, idempotent. New columns inherit the table's existing RLS
-- (staff-only INSERT/UPDATE/DELETE; owner+staff+published-page SELECT).
-- Apply via Supabase MCP `apply_migration` or psql; the upload script also runs
-- this idempotently on each run (unless --no-ensure-schema).

alter table public.movement_leader_corpus_data
  add column if not exists substrate_md       text,
  add column if not exists substrate_sections jsonb not null default '{}'::jsonb,
  add column if not exists manifest           jsonb;

comment on column public.movement_leader_corpus_data.substrate_md is
  'Full COLLATED substrate markdown ({SLUG}_RESEARCH_COLLATED.md), verbatim, never truncated. Lossless source of truth.';
comment on column public.movement_leader_corpus_data.substrate_sections is
  'All canonical substrate sections keyed by ## heading name (Identity, Frameworks, Voice fingerprint, ...). Lossless.';
comment on column public.movement_leader_corpus_data.manifest is
  'COLLATION_MANIFEST.json (slug, version, mode, sha256/wordCount/sectionsUsed per source). Provenance.';
