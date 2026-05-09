# Movemental Supabase audit — 2026-05-09 (Phase 1)

**Project ref:** `vhaiiiykcukrlyvwlgip` (name: `movemental`, region: `us-west-2`)  
**Audit scope:** Phase 1 read-only snapshot + repository review. **Phase 3 fixes require your explicit confirmation.**  
**Phase 4–5:** Not run (blocked on Phase 3 confirmation, MCP limits, and operational test prerequisites).

---

## Executive summary (Phase 2)

| Metric | Count / note |
|--------|----------------|
| Total checklist areas audited | **12** sections (per brief §1.1–1.12) |
| Areas fully verified via MCP + repo | Database catalog, RLS snapshot, triggers, auth logs (24h), repo auth wiring, env schema, TS types presence |
| Areas **not** observable via Supabase MCP | **Auth URL, redirect allowlist, providers, SMTP, email templates, MFA JWT tunables, rate limits** (see § Tool prerequisites) |
| Items **OK** | SSR cookie clients (`@supabase/ssr`), middleware session refresh via `proxy.ts`, `handle_new_user` trigger provisioning profile + org + membership |
| **Critical** gaps | Organizations row readable by **anon + authenticated** with `using (true)`; many tenant-scoped content tables use **`qual = true`** SELECT (cross-tenant reads); **`corpus_bindings`**, **`prompt_packs`**, **`integrity_diagnostic_submissions`** missing RLS; proposed onboarding tables **absent** |
| **High** gaps | No `onAuthStateChange` listener; **`staff_users` table absent** (blocks staff-bypass pattern as specified); no **`organizations` AFTER INSERT** onboarding initializer; auth Dashboard settings unverified |
| **Medium / low** | Large set of RLS-enabled tables with **zero policies** (locked via API); `pnpm exec tsc --noEmit` **OOM** in this environment; repo has **no** `supabase/migrations/*.sql` mirror (migrations tracked only on hosted project) |

### Human actions required (cannot complete via current MCP)

1. **Supabase Dashboard → Authentication:** confirm Site URL, redirect URLs, signed-up email confirmation, providers (email OTP + password + optional Google), JWT / refresh / MFA / rate limits.
2. **Supabase Dashboard → Project Settings → Auth → SMTP:** configure custom SMTP (e.g. Resend) and verified sender on **movemental.ai**; confirm delivery.
3. **Supabase Dashboard → Authentication → Email templates:** retrieve/substitute copy (templates not exposed in MCP).
4. **Confirm production canonical URLs** for Site URL + redirects (`movemental.com` vs `movemental.ai`, marketing vs app subdomain, Vercel preview wildcards).
5. **Phase 5 operational test:** supply a real inbox for invite + magic-link testing; approve destructive cleanup steps.

### Confirmation gate — Phase 3

Do **not** apply database or Dashboard changes until you reply with explicit approval for Phase 3, including:

- Acceptance of RLS policy direction (replacing `public_read` / `true` predicates where inappropriate).
- Whether **`staff_users`** (or equivalent) should be introduced vs reuse existing Movemental-admin mechanism from migrations such as `restrict_admin_to_movemental`.
- Alignment of **`organization_memberships.user_id`** with `auth.uid()` (currently matches after sync migrations).

---

## Tool prerequisites (verified)

### 1. Supabase MCP

**Available tools inspected:** `list_projects`, `get_project`, `execute_sql`, `apply_migration`, `list_migrations`, `get_logs`, `generate_typescript_types`, `list_tables`, `get_advisors`, edge-function helpers, etc.

**Verification:**

| Capability | Status |
|------------|--------|
| Run SQL (`execute_sql`) | Yes |
| Read project metadata (`get_project`) | Yes — returns **id, region, DB host/version, status only** |
| Auth settings (Site URL, redirects, providers, JWT, MFA, rate limits) | **Not exposed** |
| SMTP / from-address | **Not exposed** |
| Email template bodies | **Not exposed** |
| Auth logs (`get_logs` service `auth`) | Yes — **last ~24 hours** only |

**Conclusion:** Per your instructions, **management API coverage for auth/SMTP/templates is incomplete**. This audit **does not** claim those items are OK or gap-free; Dashboard verification is mandatory. Proceeding here documents **unknown** state for §1.1–1.3 and marks them **human-required**.

### 2. Repository access

Read/write to Movemental repo confirmed.

### 3. `pnpm` / TypeScript

- `pnpm exec tsc --noEmit` was attempted; Node **heap OOM** aborted the run in this environment (large project). Use CI or `NODE_OPTIONS=--max-old-space-size=8192` locally for a definitive check.

---

## Source-of-truth files (read)

| Path | Notes |
|------|--------|
| `src/lib/db/schema.ts` | Layer-1 Drizzle schema; includes `organizations`, `organization_memberships`, `user_profiles`, `onboarding_responses`; **no** `onboarding_tasks`, `signed_agreements`, `organization_assets`, `corpus_review_items`, `consent_records`, `toolkit_downloads` |
| `src/lib/supabase/server.ts` | `createServerClient` + cookie `getAll`/`setAll` |
| `src/lib/supabase/client.ts` | `createBrowserClient` |
| `src/lib/supabase/middleware.ts` | `updateSession` + `getUser()` |
| `proxy.ts` | Invokes `updateSession` on matched routes |
| `docs/design/DESIGN.md` | Editorial / Concept Modern voice for product UI; email copy should stay calm, no hype (align with Phase 3 brief) |
| `docs/architecture/README.md`, `TYPE_SAFETY.md`, `layers/*` | Six-layer chain; multi-tenancy described via org-scoped data + validation scripts — **not** a substitute for DB RLS review |
| `supabase/migrations/*` | **Not present in repo**; hosted migrations listed via MCP `list_migrations` (see §1.4) |
| `src/lib/env.ts` | Documents `NEXT_PUBLIC_SUPABASE_*`, optional `SUPABASE_SERVICE_ROLE_KEY`, Resend vars; **no** `SUPABASE_JWT_SECRET` |
| `.env.local.example` | Lists required/optional keys |

---

## 1.1 — Auth configuration (Dashboard)

| Item | Current state | Expected (Movemental) | Gap |
|------|----------------|------------------------|-----|
| Site URL | **Unknown** (not in MCP) | Production app URL | Dashboard |
| Redirect allowlist | **Unknown** | Prod `/**`, marketing `/**`, `localhost` (+ previews) | Dashboard |
| Enabled providers | **Unknown** | Email OTP + password (confirm preference); optional Google | Dashboard |
| Email confirmation on sign-up | **Unknown** | Enabled | Dashboard |
| Magic link / OTP expiry | **Unknown** | ~1 h typical | Dashboard |
| JWT expiry | **Unknown** | ~1 h typical | Dashboard |
| Refresh token rotation | **Unknown** | Enabled | Dashboard |
| MFA TOTP | **Unknown** | Available, optional | Dashboard |
| Password rules | **Unknown** | If password auth on | Dashboard |
| Rate limits | **Unknown** | Adequate for invite launch | Dashboard |

**Log signal:** Recent auth logs show healthy `/user` **200** responses from referer `https://core-dashboard-umber.vercel.app/` and token refresh/revocation activity — **no obvious failure spike** in the sampled window.

---

## 1.2 — SMTP configuration

| Item | Current state | Expected | Gap |
|------|----------------|----------|-----|
| Custom SMTP | **Unknown** | Required before leader invites | Dashboard + provider setup |
| From-address / name | **Unknown** | movemental.ai domain; name “Movemental” | Dashboard |

**Repo note:** Application email (contact, etc.) can use Resend via `RESEND_*` env vars (`src/lib/env.ts`); **Supabase Auth mail** is separate and must be configured in **Supabase**.

---

## 1.3 — Email templates

| Template | Current state | Expected | Gap |
|----------|----------------|----------|-----|
| Magic link / OTP | **Unknown** | Custom subject/body, restrained voice | Dashboard |
| Sign-up confirmation | **Unknown** | Custom | Dashboard |
| Password reset | **Unknown** | Custom | Dashboard |
| Email change | **Unknown** | Custom | Dashboard |
| Reauthentication | **Unknown** | If used | Dashboard |
| Invite | **Unknown** | Custom (invite flow) | Dashboard |

**Suggested copy direction (for Phase 3; not applied):** Plain, no exclamation points, no emoji, signer “Movemental”; use the exact subjects/bodies from your Phase 3 brief after approval.

---

## 1.4 — Database schema / RLS

**Schemas in use (tables):** `auth`, `public`, `realtime`, `storage`, `supabase_migrations`, `vault`.

**Hosted migration history:** Present from `20260121050932_initial_schema` through `20260508131506_agent_modularity_corpus_prompt_packs` (see MCP `list_migrations`).

### RLS inventory — `public` schema

**Method:** SQL over `pg_class.relrowsecurity`, `pg_policies`, `information_schema.columns` (`organization_id`). Status labels are automated heuristics; **manual product judgment** applies to intentional “public catalog” tables.

**Legend:** Tenant-scoped column = `organization_id` present **or** table is `organizations` (org root).

| Table | RLS enabled | Policy count | Tenant-scoped? | Status |
|-------|-------------|-------------|----------------|--------|
| access_expirations | yes | 0 | no | MISSING_POLICIES |
| affiliate_referrals | yes | 0 | no | MISSING_POLICIES |
| affiliates | yes | 4 | no | OK |
| agent_guardrail_assignments | yes | 2 | yes | OK |
| agent_guardrails | yes | 2 | yes | OK |
| agent_handoffs | yes | 0 | no | MISSING_POLICIES |
| agent_instances | yes | 4 | yes | OK |
| agent_interactions | yes | 0 | no | MISSING_POLICIES |
| agent_metrics | yes | 0 | no | MISSING_POLICIES |
| agent_tool_assignments | yes | 2 | yes | OK |
| agent_tools | yes | 2 | yes | OK |
| agent_traces | yes | 2 | yes | OK |
| agents | yes | 2 | yes | OK |
| ai_insights | yes | 4 | no | OK |
| ai_lab_conversations | yes | 4 | yes | OK |
| ai_lab_lite_conversations | yes | 4 | yes | OK |
| ai_lab_test_feedback | yes | 2 | yes | OK |
| ai_lab_test_flags | yes | 2 | yes | OK |
| ai_lab_test_runs | yes | 2 | yes | OK |
| ai_lab_test_tickets | yes | 2 | yes | OK |
| analytics_events | yes | 4 | no | OK |
| archive_collections | yes | 1 | yes | WEAK_POLICIES |
| archive_item_revisions | yes | 1 | no | OK |
| archive_items | yes | 1 | yes | WEAK_POLICIES |
| archive_media | yes | 1 | no | OK |
| archive_quotes | yes | 1 | no | OK |
| archive_topics | yes | 1 | yes | WEAK_POLICIES |
| assessment_checkpoints | yes | 1 | no | OK |
| assessment_questions | yes | 1 | yes | WEAK_POLICIES |
| assessment_responses | yes | 2 | yes | OK |
| assessment_share_tokens | yes | 0 | no | MISSING_POLICIES |
| assessments | yes | 1 | yes | WEAK_POLICIES |
| assignment_grades | yes | 0 | no | MISSING_POLICIES |
| assignment_submissions | yes | 4 | no | OK |
| audience_profiles | yes | 4 | no | OK |
| audit_logs | yes | 4 | no | OK |
| book_chapters | yes | 1 | yes | WEAK_POLICIES |
| book_highlights | yes | 4 | no | OK |
| book_pdf_editions | yes | 1 | yes | WEAK_POLICIES |
| book_purchases | yes | 4 | no | OK |
| book_reading_progress | yes | 4 | no | OK |
| book_reviews | yes | 4 | no | OK |
| book_series | yes | 1 | yes | WEAK_POLICIES |
| bookmarks | yes | 4 | no | OK |
| books | yes | 1 | yes | WEAK_POLICIES |
| books_chapters | yes | 1 | yes | WEAK_POLICIES |
| ce_credits | yes | 4 | no | OK |
| certificate_templates | yes | 1 | no | OK |
| certificates | yes | 4 | no | OK |
| checkpoint_questions | yes | 1 | no | OK |
| checkpoint_responses | yes | 0 | no | MISSING_POLICIES |
| citations | yes | 1 | yes | WEAK_POLICIES |
| coaching_huddles | yes | 0 | no | MISSING_POLICIES |
| cohort_discussion_messages | yes | 4 | no | OK |
| cohort_sessions | yes | 1 | no | OK |
| cohorts | yes | 1 | no | OK |
| comments | yes | 4 | no | OK |
| communities | yes | 1 | yes | WEAK_POLICIES |
| content_analytics | yes | 4 | no | OK |
| content_categories | yes | 1 | yes | WEAK_POLICIES |
| content_form_templates | yes | 2 | yes | OK |
| content_items | yes | 1 | yes | WEAK_POLICIES |
| content_template_placement | yes | 0 | no | MISSING_POLICIES |
| content_templates | yes | 2 | yes | OK |
| content_versions | yes | 2 | yes | OK |
| content_workflows | yes | 0 | no | MISSING_POLICIES |
| context_snapshots | yes | 4 | no | OK |
| corpus_bindings | no | 0 | yes | MISSING_RLS |
| coupons | yes | 0 | no | MISSING_POLICIES |
| course_announcements | yes | 1 | no | OK |
| course_assignments | yes | 1 | no | OK |
| course_bundles | yes | 1 | no | OK |
| course_drip_schedules | yes | 1 | no | OK |
| course_enrollments | yes | 4 | no | OK |
| course_lessons | yes | 1 | yes | WEAK_POLICIES |
| course_modules | yes | 1 | no | OK |
| course_outcomes | yes | 4 | no | OK |
| course_personalization | yes | 0 | no | MISSING_POLICIES |
| course_prerequisites | yes | 1 | no | OK |
| course_progression_rules | yes | 1 | no | OK |
| course_sales_pages | yes | 1 | no | OK |
| course_weeks | yes | 1 | yes | WEAK_POLICIES |
| courses | yes | 1 | yes | WEAK_POLICIES |
| credibility_rubrics | yes | 2 | yes | OK |
| digital_badges | yes | 4 | no | OK |
| discernment_processes | yes | 4 | no | OK |
| discussion_prompts | yes | 1 | no | OK |
| donations | yes | 0 | no | MISSING_POLICIES |
| email_templates | yes | 0 | no | MISSING_POLICIES |
| event_registrations | yes | 4 | no | OK |
| exercise_completions | yes | 0 | no | MISSING_POLICIES |
| exercises | yes | 1 | no | OK |
| field_experiments | yes | 1 | no | OK |
| formation_checkins | yes | 4 | no | OK |
| formation_experiments | yes | 4 | no | OK |
| formation_goals | yes | 4 | no | OK |
| formation_practice_assignments | yes | 4 | yes | OK |
| formation_practice_completions | yes | 0 | no | MISSING_POLICIES |
| handoff_events | yes | 0 | no | MISSING_POLICIES |
| integrity_diagnostic_submissions | no | 0 | yes | MISSING_RLS |
| kairos_moments | yes | 4 | no | OK |
| lesson_progress | yes | 0 | no | MISSING_POLICIES |
| media_items | yes | 1 | yes | WEAK_POLICIES |
| media_usage_tracking | yes | 0 | no | MISSING_POLICIES |
| neighborhood_exegesis_entries | yes | 4 | no | OK |
| newsletter_subscribers | yes | 5 | yes | OK |
| notebook_artifacts | yes | 2 | yes | OK |
| notebook_conversations | yes | 2 | yes | OK |
| notebook_source_chunks | yes | 2 | yes | OK |
| notebook_sources | yes | 2 | yes | OK |
| notebooks | yes | 2 | yes | OK |
| notification_deliveries | yes | 4 | no | OK |
| onboarding_responses | yes | 2 | yes | OK |
| organization_memberships | yes | 4 | yes | OK |
| organizations | yes | 1 | yes | WEAK_POLICIES |
| page_views | yes | 4 | no | OK |
| pathway_sections | yes | 1 | yes | INCOMPLETE_POLICIES |
| pathways | yes | 1 | yes | WEAK_POLICIES |
| performance_metrics | yes | 4 | no | OK |
| podcast_episodes | yes | 1 | yes | WEAK_POLICIES |
| podcast_series | yes | 1 | no | OK |
| prompt_pack_layers | no | 0 | no | NOT_TENANT_SCOPED |
| prompt_packs | no | 0 | yes | MISSING_RLS |
| prospects | yes | 1 | no | OK |
| purchases | yes | 4 | no | OK |
| question_banks | yes | 1 | no | OK |
| reflection_journals | yes | 0 | no | MISSING_POLICIES |
| reflection_questions | yes | 1 | no | OK |
| reflection_responses | yes | 0 | no | MISSING_POLICIES |
| remotion_drafts | yes | 4 | yes | OK |
| residency_projects | yes | 0 | no | MISSING_POLICIES |
| saved_archive_views | yes | 4 | no | OK |
| search_analytics | yes | 4 | no | OK |
| search_history | yes | 4 | no | OK |
| sermon_preparations | yes | 4 | no | OK |
| site_pages | yes | 5 | yes | OK |
| subscription_plans | yes | 1 | no | OK |
| translation_jobs | yes | 4 | yes | OK |
| user_assessments | yes | 4 | yes | OK |
| user_calling_profiles | yes | 4 | no | OK |
| user_context_profiles | yes | 4 | no | OK |
| user_identity_profiles | yes | 4 | no | OK |
| user_interests | yes | 4 | no | OK |
| user_memory | yes | 4 | no | OK |
| user_neighborhood_context | yes | 4 | no | OK |
| user_notifications | yes | 4 | no | OK |
| user_personality | yes | 4 | no | OK |
| user_profiles | yes | 4 | no | OK |
| user_strengths | yes | 4 | no | OK |
| user_struggles_challenges | yes | 4 | no | OK |
| user_subscriptions | yes | 4 | yes | OK |
| user_vocation | yes | 4 | no | OK |
| video_annotations | yes | 0 | no | MISSING_POLICIES |
| video_recording_segments | yes | 0 | no | MISSING_POLICIES |
| video_recording_slides | yes | 0 | no | MISSING_POLICIES |
| video_recording_whiteboard | yes | 0 | no | MISSING_POLICIES |
| video_recordings | yes | 4 | yes | OK |
| video_series | yes | 1 | yes | WEAK_POLICIES |
| video_watch_history | yes | 4 | no | OK |
| videos | yes | 1 | yes | WEAK_POLICIES |
| voice_baselines | yes | 4 | no | OK |
| voice_fidelity_eval_samples | yes | 2 | yes | OK |
| voice_fidelity_feedback | yes | 4 | yes | OK |
| voice_identities | yes | 2 | yes | OK |
| workflows | yes | 0 | no | MISSING_POLICIES |
| workspace_documents | yes | 2 | yes | OK |
| workspace_liveblocks_snapshots | yes | 2 | yes | OK |
| write | yes | 0 | no | MISSING_POLICIES |
| write_content | yes | 0 | no | MISSING_POLICIES |
| writing_examples | yes | 2 | yes | OK |
| writing_interactions | yes | 0 | no | MISSING_POLICIES |
| writing_session_feedback | yes | 4 | no | OK |
| writing_sessions | yes | 4 | no | OK |
| writing_style_preferences | yes | 4 | no | OK |

**Interpretation notes:**

- **WEAK_POLICIES (tenant column + `qual = true`):** Any client using the anon key can read **all rows** in those tables. Acceptable only if every row is intentionally public catalog data **for all tenants**. If any row is tenant-private, this is a **critical** confidentiality issue.
- **`organizations` policy (verbatim):**

```sql
-- Policy: public_read ON organizations FOR SELECT TO anon, authenticated
-- USING (true)
```

- **`prompt_pack_layers`:** No `organization_id` column; RLS **off**. If layers inherit sensitive pack content, treat as **HIGH** (enable RLS + join predicate to `prompt_packs` org) after review.

### Policy excerpts — core identity / membership

- **`user_profiles`:** `using (id = auth.uid())` for SELECT/UPDATE/DELETE; insert `with check (id = auth.uid())`.
- **`organization_memberships`:** `using / with check (user_id = auth.uid())` for CRUD.

**Multi-tenant pattern note:** Your Phase 3 brief assumes `organization_members` + `auth.uid()`. This database uses **`organization_memberships`** with **`user_id` aligned to `auth.users.id`** (see `sync_auth_uids_to_user_profiles_and_fk_tables_v2` in migration history). Policies must keep using this join.

---

## 1.5 — Specific table audits

| Table | Exists | Schema / notes | Match to onboarding brief |
|-------|--------|----------------|-----------------------------|
| `auth.users` | Yes | Supabase-managed | N/A |
| `organizations` | Yes | Core org fields; **no** `onboarding_started_at`, `onboarding_completed_at`, `onboarding_state`, `cohort_start_date`, `primary_domain` | **Gap** vs proposed Phase 3 DDL |
| `organization_memberships` | Yes | `user_id`, `organization_id`, `role`, `status`, invites | Equivalent to “org members” |
| `user_profiles` | Yes | Rich profile + `onboarding_completed`, `onboarding_step` | Partial overlap; different model than task-based onboarding |
| `onboarding_tasks` | **No** | — | **Missing** |
| `signed_agreements` | **No** | — | **Missing** |
| `organization_assets` | **No** | — | **Missing** |
| `corpus_review_items` | **No** | — | **Missing** |
| `consent_records` | **No** | — | **Missing** |
| `toolkit_downloads` | **No** (no DB table; UI exists) | Toolkit modal in `src/app/providers.tsx` | Verify if persistence needed |
| `onboarding_responses` | Yes | Large questionnaire JSON-shaped onboarding **responses** per org | Related but **not** task-queue model |

---

## 1.6 — Webhooks / triggers

| Question | Finding |
|----------|---------|
| **`auth.users` INSERT → profile/org** | **Yes.** Trigger `on_auth_user_created` → `handle_new_user()` creates `user_profiles`, default `organizations`, and `organization_memberships` (security definer). |
| **`organizations` INSERT → onboarding tasks** | **No trigger found** on `public.organizations`. |
| Database webhooks (HTTP) | **Not visible** via SQL (`net` / `supabase_functions` schemas not exposed). Check **Dashboard → Database → Webhooks**. |
| Orphan hooks | **Unknown** |

---

## 1.7 — Server-side auth integration

| Check | Finding |
|-------|---------|
| `@supabase/ssr` | **Yes** — `server.ts`, `client.ts`, `middleware.ts` |
| Server Components read session | **Supported** via cookie client (`createClient` in `server.ts`) |
| Middleware refresh | **Yes** — `proxy.ts` calls `updateSession` (`src/lib/supabase/middleware.ts` lines 8–41; `proxy.ts` lines 14–17) |
| Unsafe server usage | Primary API usage found: `src/app/api/book/margin-notes/route.ts` uses **server** client. Client component `margin-note-submission.tsx` uses browser client — appropriate. Script `scripts/upload-voices-to-supabase-storage.ts` uses `@supabase/supabase-js` for tooling — acceptable for CLI. |

---

## 1.8 — Auth state listeners

**Finding:** **No** `onAuthStateChange` usage in `src/` (grep).

**Gap:** Client navigation may not refresh server-rendered state after sign-in/out without full navigation unless layouts refetch. **High** priority: add listener pattern from your Phase 3 snippet (e.g. wrap in `Providers`).

---

## 1.9 — Session storage

**Finding:** **Cookies via `@supabase/ssr`** — appropriate for Next.js SSR. **No** evidence of forcing localStorage for app auth.

---

## 1.10 — TypeScript types

**File:** `src/lib/supabase/database.types.ts` (large generated `Database` type, PostgrestVersion `14.1`).

**Freshness:** Not cryptographically tied to this audit run; recommend regenerating via `generate_typescript_types` MCP or Supabase CLI after schema changes.

---

## 1.11 — Environment variables (names only)

| Variable | In `.env.local.example` / `env.ts` | Code expectation |
|----------|-------------------------------------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Documented | Required for clients |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Documented | Required for clients |
| `SUPABASE_SERVICE_ROLE_KEY` | Documented optional | Server admin paths |
| `SUPABASE_JWT_SECRET` | **Not referenced** | Only if custom JWT verification outside Supabase helpers |
| Resend / SMTP-related app vars | `RESEND_*` | App email; **not** Supabase Auth SMTP |

**Runtime:** Do **not** commit `.env.local`; verify presence with `pnpm check:env` where applicable.

---

## 1.12 — Logs review (auth, ~24 h)

**Observation:** Predominantly **info**-level `/user` **200** and `/token` refresh/revoke events; referer cluster around **core-dashboard** Vercel deployment.

**No sustained error pattern** detected in the supplied sample. Auth logs are **short retention**; historical 48h analysis may need Dashboard export.

---

## Prioritized backlog (for Phase 3 — pending approval)

### Critical

1. Replace **`organizations` `public_read` true** with membership-scoped SELECT (+ intentional public fields if any).
2. Decide catalog strategy for **`WEAK_POLICIES`** tenant tables (split public vs org-private rows, views, or stricter predicates).
3. Enable RLS on **`corpus_bindings`**, **`prompt_packs`**, **`integrity_diagnostic_submissions`** (and likely **`prompt_pack_layers`**).
4. Add **onboarding task schema** + **org initialization** (trigger or trusted RPC) **after** resolving tenancy pattern vs existing `onboarding_responses`.

### High

5. Dashboard: **SMTP**, **templates**, **redirects**, **MFA availability**.
6. Add **`onAuthStateChange` + `router.refresh()`** listener.
7. Introduce or substitute **`staff_users`** (or document existing Movemental staff bypass from migrations).

### Medium

8. Address **`MISSING_POLICIES`** tables if PostgREST should expose them to clients.
9. Regenerate **`database.types.ts`** after DDL changes.
10. Mirror migrations into repo (`supabase/migrations`) if team policy requires Git review.

### Low

11. Fix local **`tsc` OOM** via CI or Node heap flags.

---

## Phase 4–5 status

| Phase | Status |
|-------|--------|
| Phase 4 post-audit | **Not run** — awaits Phase 3 |
| Phase 5 operational test | **Not run** — needs Dashboard SMTP/templates, test inbox, and explicit approval for invite/user cleanup |

---

*End of Phase 1–2 documentation.*
