# 14 — Captures inbox & comms triage

**Priority:** 14 (operational triage — contact, newsletter, agent leads)  
**Prompt ID:** ranked-14-captures-inbox-and-comms-triage  
**Primary repo:** `movemental-visual-editor-main` (UI) — tables shared  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Build **`/admin/captures`** — unified staff inbox for inbound non-enrollment captures: contact form submissions, newsletter signups, agent-room leads — with status triage, assignee, and link to org/user when matchable.
>
> ### 0. Read first
>
> 1. Schema: `contact_submissions`, `newsletter_subscribers`, `agent_room_leads`, `organization_inquiries` (enrollment has prompt 03)
> 2. `movemental-ai`: `/api/contact`, `/api/newsletter` route handlers
> 3. `movemental-ai`: `docs/build/markdown/contact-newsletter-operations-playbook.md`
>
> ### 1. Product model
>
> | Source | Table | Triage states (v1) |
> | --- | --- | --- |
> | Contact form | `contact_submissions` | new → reviewed → archived |
> | Newsletter | `newsletter_subscribers` | pending confirm → active → unsubscribed |
> | Agent room | `agent_room_leads` | new → contacted → converted |
>
> **Unified inbox** shows mixed feed with source badge; tabs filter by source.
>
> ### 2. Live database truth (Supabase MCP)
>
> ```sql
> select count(*) from contact_submissions;
> select status, count(*) from newsletter_subscribers group by status;
> select count(*) from agent_room_leads;
> ```
>
> ### 3. Data layer
>
> - If tables lack `status` / `reviewed_at` columns, add **additive migration** via Drizzle + Supabase MCP `apply_migration`
> - Domain service: `admin-captures.service.ts` — list, update status, add internal note (jsonb `staff_notes` on row or separate table)
> - **Do not** expose `/api/simplified/contact-submissions` publicly without staff gate
>
> ### 4. UI — `/admin/captures`
>
> - Feed/table: source, name, email, message preview, created, status
> - Detail panel: full payload, copy email, mark reviewed, link to create inquiry (prompt 03)
> - Newsletter tab: double opt-in state, resend confirm (if API exists)
> - Agent leads: link to agent transcript if `agent_room_transcripts` join exists
>
> Nav: Operations → Captures (capability `ops.onboarding.console` or `ops.roster.read`)
>
> ### 5. Guardrails
>
> - PII visible staff-only; no public API listing
> - GDPR: archive not delete by default
> - Email resend actions rate-limited
>
> ### 6. Sign-off checklist
>
> - [ ] Contact submissions visible from live DB
> - [ ] Status update persists in MCP
> - [ ] Newsletter subscribers show confirm state
> - [ ] No unauthenticated list endpoints
> - [ ] `pnpm validate:all` green
