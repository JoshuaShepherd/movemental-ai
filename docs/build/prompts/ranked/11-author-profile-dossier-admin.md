# 11 — Author profile dossier admin

**Priority:** 11 (parity editing — what leaders see on `/profile`)  
**Prompt ID:** ranked-11-author-profile-dossier-admin  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [02](./02-organizations-tenant-directory.md), [05](./05-organization-detail-lifecycle-actions.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Replace legacy **`/admin/authors`** with a **Profile editor** tab on organization detail (movement leaders only) that reads and writes through the **same mappers** as customer `/profile` — split-pane editor + live preview.
>
> ### 0. Read first
>
> 1. Sibling: `docs/build/prompts/admin-unified-tenant-account-ops-prompt.md` §1.3 parity rule
> 2. Sibling: `docs/build/prompts/author-profile-at-a-glance-complete-build-prompt.md`
> 3. Sibling: `src/lib/services/custom/admin-authors.service.ts`
> 4. Sibling: `src/app/(dashboard)/profile/` — customer read path
> 5. Redirect: `/admin/authors` → `/admin/organizations?kind=movement_leader`
>
> ### 1. Product model
>
> > If the leader sees it on `/profile`, the operator edits that same rendered output.
>
> | UI zone | Read | Write |
> | --- | --- | --- |
> | Preview pane | `buildHomeData()` + section loaders | — |
> | Editor pane | Section picker | PATCH same JSONB keys in `movement_leader_corpus_data` |
> | Section list | 6 parts / 22 sections IA | Reorder only if product allows |
>
> **Implementation orgs:** hide entire Profile tab (no dossier).
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select ml.slug, ml.full_name, ml.status
> from movement_leaders ml
> order by ml.full_name
> limit 15;
> -- 24 leaders total
> ```
>
> ### 3. Routes & API
>
> | Method | Route | Purpose |
> | --- | --- | --- |
> | GET | `/api/admin/authors/[slug]` | Admin DTO + preview payload |
> | PATCH | `/api/admin/authors/[slug]/sections/[section]` | Section save |
> | POST | `/api/admin/movement-leader-corpus-sync` | Trigger corpus sync (existing) |
>
> Capability: `ops.authors.profile.edit` (read), `ops.authors.corpus.publish` (publish/sync)
>
> ### 4. UI — org detail “Profile” tab
>
> - Split layout: editor left, preview right (iframe or server component refresh)
> - Section accordion matching dossier IA
> - Markdown fields use shared `OnboardingMarkdownEditor`
> - Save → optimistic toast → preview refresh from same mappers
> - “Open leader `/profile`” link in new tab (tenant context switched)
> - Remove ad-hoc Voice/Frameworks tabs that duplicate mappers incorrectly
>
> ### 5. Guardrails
>
> - **Never** introduce admin-only JSONB keys not consumed by `/profile`
> - Ops session + active org cookie must scope preview correctly
> - Publish actions audited (prompt 15)
>
> ### 6. Sign-off checklist
>
> - [ ] Edit Alan Hirsch section → visible on `/profile` after save
> - [ ] Preview matches leader view (pixel/content parity spot check)
> - [ ] `/admin/authors` redirects to organizations
> - [ ] Implementation org has no Profile tab
> - [ ] `pnpm validate:all` green
