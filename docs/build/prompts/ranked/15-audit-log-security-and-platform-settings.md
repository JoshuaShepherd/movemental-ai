# 15 — Audit log, security & platform settings

**Priority:** 15 (compliance & platform governance — after core ops ship)  
**Prompt ID:** ranked-15-audit-log-security-and-platform-settings  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** All prior prompts (instrument mutations)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Implement the **Security & audit** section of admin nav — structured audit log for ops actions, security overview, and platform settings for founders — enabling the currently `comingSoon` items in `admin-nav.ts`.
>
> ### 0. Read first
>
> 1. Sibling: `src/lib/navigation/admin-nav.ts` — Audit log, Security entries
> 2. Schema: `audit_logs` in Drizzle (both repos)
> 3. Sibling: `src/lib/services/admin/onboarding-content-audit.ts` — event pattern reference
> 4. Sibling: `/admin/tenants` platform settings (merge into this or `/admin/settings`)
>
> ### 1. Product model
>
> | Route | Capability | Purpose |
> | --- | --- | --- |
> | `/admin/audit` | `ops.audit.read` | Searchable audit trail |
> | `/admin/security` | `ops.security.audit` | Session overview, RLS advisors summary, failed auth counts |
> | `/admin/settings` | `ops.settings.platform` | Feature flags, maintenance mode, env read-only display |
>
> ### 2. Audit event schema (standardize)
>
> Every admin mutation from prompts 02–14 should emit:
>
> ```typescript
> {
>   event_type: string;        // e.g. "enrollment.provisioned"
>   actor_user_id: uuid;
>   organization_id?: uuid;
>   target_type?: string;
>   target_id?: string;
>   payload: jsonb;            // non-sensitive structured diff
>   created_at: timestamptz;
> }
> ```
>
> Backfill not required — start emitting on ship.
>
> ### 3. Live database truth (Supabase MCP)
>
> ```sql
> select count(*) from audit_logs;
> select column_name, data_type from information_schema.columns
> where table_name = 'audit_logs' order by ordinal_position;
> ```
>
> Align Drizzle if drift; additive columns only.
>
> ### 4. UI — `/admin/audit`
>
> - Filters: event type, actor, org, date range
> - Table: timestamp, actor email, event, org, summary
> - Detail: pretty-printed payload JSON
> - Export CSV (founder only)
> - Pagination required
>
> ### 5. UI — `/admin/security`
>
> - Card: active staff count, last staff login (if trackable)
> - Card: Supabase advisor summary link (manual MCP run documented)
> - Card: RLS policy spot-check checklist (docs link)
> - **No** secret display — env keys shown as “set / not set” only
>
> ### 6. UI — `/admin/settings`
>
> - Read-only platform config snapshot
> - Editable: `organizations.settings` defaults template (defer heavy UI)
> - Link to design tokens QA if restored (`/admin/design-tokens` from movemental-ai archive)
>
> ### 7. Instrumentation task (cross-cutting)
>
> Add audit helper `recordAdminAuditEvent()` in shared service; call from:
>
> - Provision enrollment (03)
> - Onboarding unlock (04)
> - Org lifecycle actions (05)
> - Staff role changes (06)
> - Application approve (07)
> - Content saves (09)
>
> ### 8. Guardrails
>
> - **Never** store magic links, passwords, or service keys in audit payload
> - Audit log is append-only from app layer
> - Security page is read-only v1 — no RLS editing from UI
>
> ### 9. Sign-off checklist
>
> - [ ] Nav items enabled (remove `comingSoon`)
> - [ ] Provision + unlock emit audit rows verifiable in MCP
> - [ ] Josh (founder) can search audit by org
> - [ ] Facilitator with `ops.audit.read` can view but not export
> - [ ] `pnpm validate:all` green
