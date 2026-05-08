# Clone workflow — provision agents for a new organization

Use this when onboarding a new movement-leader tenant that needs the same agent surface as Alan Hirsch (AI Lab, companions, tools) without editing TypeScript per author.

## Prerequisites

- Migration applied: `corpus_bindings`, `prompt_packs`, `prompt_pack_layers`, and `agents.corpus_binding_id` / `agents.prompt_pack_id` on the shared Movemental Supabase database.
- Template org UUID (e.g. Alan Hirsch tenant) with a working `agents` + `agent_tools` + `agent_tool_assignments` set.

## Steps

1. **Create the organization** row (studio or SQL) and note `organizations.id`.
2. **Clone corpus binding** (adjust slug if multiple corpora per tenant):

   ```sql
   INSERT INTO corpus_bindings (
     organization_id, slug, provider, provider_resource_id, filter_defaults, metadata, status
   )
   SELECT '<NEW_ORG_UUID>', slug || '-template', provider, provider_resource_id,
          filter_defaults, metadata, status
   FROM corpus_bindings
   WHERE organization_id = '<TEMPLATE_ORG_UUID>' AND slug = 'default-openai';
   ```

   Replace `provider_resource_id` with the new author’s vector store / RAG id when different.

3. **Clone prompt pack** (optional until you use layered prompts):

   ```sql
   INSERT INTO prompt_packs (organization_id, slug, version, label, status)
   SELECT '<NEW_ORG_UUID>', slug, version, label, status
   FROM prompt_packs
   WHERE organization_id = '<TEMPLATE_ORG_UUID>' AND slug = 'ai-lab-default' AND version = 1
   RETURNING id;
   ```

   Copy `prompt_pack_layers` rows from the template pack to the new `prompt_pack_id`.

4. **Clone agents** for the new org — copy `agents` rows from the template org (same slugs), then:

   - Set `organization_id` to `<NEW_ORG_UUID>`.
   - Point `corpus_binding_id` / `prompt_pack_id` at the new rows (or leave null to use legacy `system_prompt` only).
   - Replace `system_prompt` / voice copy per author (still data, not code).

5. **Clone tool definitions** (`agent_tools`) if the new org does not share template tool rows; otherwise reuse shared rows only when `organization_id` matches your tenancy rules.

6. **Clone `agent_tool_assignments`** linking each new `agents.id` to the correct `agent_tools.id`, including validated `config` JSON (`default_limit`, `default_book_filter`, etc.).

7. **Wire tenant env**: `TENANT_ORG_ID=<NEW_ORG_UUID>` in `movemental-ai-agents` / deployment; run **movemental-ai-agents** contract tests (`pnpm test:run`) with CI secrets so DB coverage stays green.

## APIs / studio

- **movemental-ai** exposes generated CRUD under `/api/simplified/corpus-bindings`, `/api/simplified/prompt-packs`, `/api/simplified/prompt-pack-layers` for dashboard/studio integration (auth as appropriate).
- Minimal UI: **`/agent-runtime`** — assign `corpus_binding_id` and `prompt_pack_id` per agent for the signed-in tenant.

## Binding vs retrieval

`corpus_bindings` rows store **configuration only**: `provider` (for example `openai_vector_store`) and `provider_resource_id` (for example a `vs_…` id). **Search still executes on the provider’s API** (OpenAI vector store search / file_search); Postgres does not replace the vector index. Supabase answers “which store for this org/agent?” at runtime; the runtime passes that id into the existing retrieval calls.

## CI

Contract tests in **movemental-ai-agents** (`pnpm test:run`, includes `tests/agent-registry.contract.test.ts`) expect a reachable Postgres **`DATABASE_URL`** with this migration applied so assigned tool names and required agent slugs can be verified against the live catalog.

## Alan tenant → env → DB

For the reference Alan tenant, run **`pnpm seed:corpus-binding`** in **movemental-ai-agents** (requires `OPENAI_VECTOR_STORE_ID` + `TENANT_ORG_ID`) to backfill `corpus_bindings`, then set `agents.corpus_binding_id` for agents that should trace retrieval binding in PostHog traces.
