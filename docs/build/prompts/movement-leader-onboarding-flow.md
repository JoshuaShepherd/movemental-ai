# Agent prompt — ship the movement-leader onboarding flow (checklist edition)

> **Outcome.** Every leader who has paid Movemental — Alan Hirsch, Brad Brisco, Josh Shepherd, JR Woodward, Liz Rios, Rob Wegner, Rowland Smith, Lucas Pulley, Jamie Roach, and the leaders who follow them — signs into a real dashboard and sees a **persistent, substantive onboarding checklist**. The dashboard is not gated. The checklist is. They work through it at their pace, the system saves progress, and when the final task is confirmed the panel goes away. Movemental staff have a parallel admin view to unlock corpus / agent tasks once their prep is done. Restraint everywhere — no gamification, no drip campaigns, no celebratory copy. Quiet professional correspondence.
>
> Treat this document as the **complete instruction set** for the build. It walks the experience, the schema additions, the six-layer type chain, the task catalog, the React surfaces, the admin tools, the email triggers, the backfill for existing leader organizations, and the verification checklist — in order.

---

## 0. Read these files before you start

1. **Project rules** — [`CLAUDE.md`](../../../CLAUDE.md). Six-layer type chain, Tailwind v4 `@theme inline`, Inter font, `(site)` route group, `proxy.ts` middleware, **pnpm only**.
2. **Design constitution** — [`docs/design/DESIGN.md`](../../design/DESIGN.md). Semantic tokens only. No raw hex. Tonal stacking ("Ghost Lift") for surfaces. Light-default with optional global dark and Midnight regional bands.
3. **Movement-leader doctrine** — [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md). Movement leaders are an ecosystem layer, **not** a fourth audience funnel card. Onboarding copy should reflect this — frame it as a working partnership, not a customer-onboarding game.
4. **Drizzle schema** — [`src/lib/db/schema.ts`](../../../src/lib/db/schema.ts). Source of truth for the DB. Read the existing `organizations`, `userProfiles`, `organizationMemberships`, `cohorts`, `onboardingResponses`, `auditLogs`, `emailTemplates` tables — **do not** duplicate fields you find there.
5. **Existing onboarding-responses pipeline** — [`src/app/api/simplified/onboarding-responses/route.ts`](../../../src/app/api/simplified/onboarding-responses/route.ts), [`src/lib/services/simplified/onboarding-responses.service.ts`](../../../src/lib/services/simplified/onboarding-responses.service.ts), [`src/hooks/simplified/onboarding-responses.hooks.ts`](../../../src/hooks/simplified/onboarding-responses.hooks.ts). The deep-content questionnaire (brand colors, audience, three-year impact, etc.) already has a table, service, route, and hook — **wrap it as one task, do not rebuild it**.
6. **Supabase project** — Project ID **`vhaiiiykcukrlyvwlgip`** (`movemental`, region `us-west-2`). Use the Supabase MCP server `plugin-supabase-supabase` for schema introspection, `apply_migration`, and verification queries. Always pass `project_id: "vhaiiiykcukrlyvwlgip"`.

> If anything in this prompt disagrees with the live database, **the database wins** — open Supabase MCP, confirm, and update this doc in the same PR.

---

## 1. Definition of done

| Layer | Done means |
| --- | --- |
| **DB** | Migration `20260509_movement_leader_onboarding.sql` applied to project `vhaiiiykcukrlyvwlgip`. New tables `onboarding_tasks`, `signed_agreements`, `organization_assets`, `corpus_review_items`, `consent_records`, `staff_users`. New columns on `organizations`: `onboarding_started_at`, `onboarding_completed_at`, `onboarding_state`, `cohort_start_date`. RLS enabled on every new table. |
| **Type chain** | `pnpm generate:schemas && pnpm generate:services && pnpm generate:routes && pnpm generate:hooks` regenerated. `pnpm validate:all` green. |
| **Task catalog** | `src/lib/onboarding/tasks.ts` exports a typed array of 16 tasks across 4 phases (Commitment, Identity, Content, Activation), each with `dependsOn`, `requiresMovementalPrep`, `required`, `estimatedMinutes`, `route`. |
| **State engine** | `src/lib/onboarding/state.ts` exports `evaluateTaskStates(org, completedTasks)` that mutates `locked → available` based on the catalog. `completeTask(orgId, taskKey, userId, metadata)` updates the row and re-evaluates dependents in one transaction. |
| **API surface** | `GET /api/onboarding/state` returns the current org's tasks + phase summaries. `POST /api/onboarding/complete` marks a task complete. `POST /api/admin/onboarding/unlock` is staff-only and flips `movemental_unlocked`. |
| **Auth dashboard** | New route group `(dashboard)` with `layout.tsx` that requires Supabase auth and resolves the active organization for the signed-in user via `organizationMemberships`. |
| **Onboarding UI** | `/dashboard` renders the existing dashboard shell with a persistent **OnboardingPanel** at the top until `onboarding_completed_at IS NOT NULL`. `/welcome` renders the same checklist full-page. Each task has a focused sub-route (e.g. `/onboarding/agreement`). |
| **Admin UI** | `/admin/onboarding` lists every organization with their current phase, last activity, and per-task unlock buttons for the four prep-gated tasks. Staff-only via RLS. |
| **Emails** | Six restrained transactional emails wired through Resend (welcome, phase-1-complete, corpus-ready, agent-ready, pre-cohort, completed). One row per email in `email_templates`. |
| **Backfill** | All 11 existing organizations in the live DB (Alan Hirsch, Brad Brisco, Josh Shepherd, JR Woodward, Liz Rios, Rob Wegner, Rowland Smith, Lucas Pulley, Jamie Roach, Movemental, Movemental Admin) have a complete row set in `onboarding_tasks`. The two staff orgs (Movemental, Movemental Admin) are marked `onboarding_completed_at = now()` so they never see the panel. |
| **Verification** | `pnpm typecheck`, `pnpm lint`, `pnpm test:run`, `pnpm validate:all` all green. New unit tests cover dependency resolution, staff RLS, and Phase-1 completion flipping the panel state. |

Hard gate: **build for the next leader, not the abstract case.** First-pass merges only need to cover Phase 1 + the OnboardingPanel + the admin list view + welcome email. Phases 2–4 land in subsequent PRs.

---

## 2. The pattern — checklist-driven post-auth flow

Linear, Notion, Vercel, Stripe, and Supabase have converged on the same shape. Movemental adopts it verbatim:

1. **Sign-in does not gate the dashboard.** A leader who paid sees what they paid for immediately. Ownership precedes work.
2. **A persistent panel** lives at the top of the dashboard until the work is done. On `/dashboard` it's a top-of-page card; on mobile it's a collapsible card; from the panel they can jump to `/welcome` for a focused full-page version of the same checklist.
3. **Tasks are visible, discrete, and substantive.** Each task has one of five states — `locked`, `available`, `in_progress`, `completed`, `skipped` — and shows an estimated time, a single primary action, and a quiet checkmark on completion. **No progress bars, no badges, no confetti, no "60% done" framing.**
4. **Some tasks gate others.** The dependency graph is small and stable; encode it in the catalog, not in a fancy graph engine.
5. **Some tasks gate on Movemental.** Corpus review, affiliate review, theme review, and AI agent test cannot start until staff finishes prep on their end. Those tasks render as `We're preparing this for you — typically ready within 48 hours` until staff flips `movemental_unlocked = true`.
6. **The cohort start date is anchored throughout.** Always visible in the panel. The single most important thing the leader is oriented to.
7. **Abandonment is rescuable, not nagged.** Six emails maximum across the entire flow. The escalation path for stuck leaders is a personal email from Brad, Alan, or Josh — not another automation.
8. **Completion is intentional.** The final task is a literal "I confirm I'm ready" button that records the moment. After it fires, the panel collapses and disappears from the dashboard.

---

## 3. The flow — 16 tasks across 4 phases

Phase 1 is hard-gated. Phase 2 unlocks once Phase 1's gate task (`sign_agreement`) is complete; Phase 2 tasks can be done in any order. Phase 3 unlocks task-by-task as Movemental staff completes prep work. Phase 4 unlocks once Phase 3 is complete and the AI agent has been generated.

### Phase 1 — Commitment (must be done first)

| # | `task_key` | Title | Est. | Depends on | Required | Movemental prep? |
| - | --- | --- | --- | --- | --- | --- |
| 1 | `sign_agreement` | Sign your engagement agreement | 15m | — | yes | no |
| 2 | `confirm_payment` | Confirm your payment | 5m | `sign_agreement` | yes | no |
| 3 | `choose_cohort` | Choose your cohort start date | 5m | `sign_agreement` | yes | no |

The agreement is the combined Master Services Agreement + this engagement's Statement of Work — payment terms, scope, AI plus authorship commitments, IP and content rights (who owns the corpus, who owns the agent, what happens if the relationship ends), data processing and privacy disclosures (GDPR / CCPA where applicable), credibility and usage principles. The leader signs once using the in-dashboard electronic signing flow. Subsequent engagements get an SOW-only signing flow later — not in this build.

### Phase 2 — Identity (parallel; available after `sign_agreement`)

| # | `task_key` | Title | Est. | Depends on | Required | Movemental prep? |
| - | --- | --- | --- | --- | --- | --- |
| 4 | `organization_profile` | Tell us about your organization | 10m | `sign_agreement` | yes | no |
| 5 | `images_upload` | Upload images and headshots | 10m | `sign_agreement` | optional | no |
| 6 | `brand_guidelines` | Brand and voice preferences | 10m | `sign_agreement` | optional | no |
| 7 | `consent_block` | Confirm your preferences | 5m | `sign_agreement` | yes | no |
| 8 | `tax_form` | Tax documentation (W-9 / W-8BEN) | 5m | `sign_agreement` | conditional | no |
| 9 | `orientation` | Orientation: what Movemental is | 10m | `sign_agreement` | yes | no |

`organization_profile` collects: legal name, primary domain (used to provision their subdomain on the platform later), primary contact, **escalation contact** (chief of staff or partner if applicable), emergency contact email, time zone, country of incorporation. The form merges into `organizations.settings` and `organizations.subdomain` — **do not invent new tables**.

`consent_block` is a single page with four explicit opt-ins, all default-off:

- Photography and likeness rights for Movemental marketing
- Public quoting / case-study treatment
- Cohort-mate visibility (name + organization shared with cohort peers; default **on**, opt-out)
- Movemental general communications / newsletter

Each opt-in writes a row to `consent_records` with the consent version string. Versioning the consent text matters more than versioning the agreement.

`tax_form` only renders as Required if the org's engagement involves any payment from Movemental to the leader (revenue share, advisor agreements). For straight pay-Movemental engagements, the task auto-marks `skipped` on phase entry.

`orientation` is a 10-minute reading + one short embedded video covering: what Movemental is, what success looks like over the engagement, what Movemental does and doesn't do, what the leader's part is, the cohort start date, and what to expect in the first two weeks.

### Phase 3 — Content (Movemental-prep-gated)

| # | `task_key` | Title | Est. | Depends on | Required | Movemental prep? |
| - | --- | --- | --- | --- | --- | --- |
| 10 | `corpus_review` | Review your research corpus | 20m | `organization_profile` | yes | yes |
| 11 | `affiliates_review` | Confirm your affiliated organizations | 5m | `organization_profile` | yes | yes |
| 12 | `themes_review` | Review the themes we've identified | 10m | `corpus_review` | yes | yes |

These three are the heart of the engagement — the moment where Movemental staff hands the leader back their own voice in inspectable form.

`corpus_review` shows the books, articles, sermons, frameworks, and source material Movemental has compiled. The leader approves, flags missing material, flags items that shouldn't be there, and adds anything they want included. Each item ends in a `corpus_review_items` row tagged `approved` / `needs_revision`.

`affiliates_review` shows the networks, denominations, conferences, publishers, and endorsing organizations Movemental has compiled (typically via the `affiliation-scrape` skill output). Same approval pattern.

`themes_review` shows the editorial themes Movemental has identified across their corpus. The leader affirms, corrects, or expands. This is the task that drives downstream agent voice and content generation.

> The deep-content questionnaire that already exists as `onboarding_responses` (brand colors, target audience, three-year impact, etc.) is **part of `brand_guidelines`** in this catalog, not a separate task. Wrap the existing service / hook / route — do not rebuild that table.

### Phase 4 — Activation (final phase)

| # | `task_key` | Title | Est. | Depends on | Required | Movemental prep? |
| - | --- | --- | --- | --- | --- | --- |
| 13 | `agent_test` | Test your AI agent | 15m | `themes_review` | yes | yes |
| 14 | `platform_tour` | Platform tour | 10m | `agent_test` | yes | no |
| 15 | `cohort_prep` | Cohort prep work | 20m | `platform_tour` | yes | no |
| 16 | `final_confirmation` | Confirm you're ready | 5m | `cohort_prep` | yes | no |

`agent_test` is the moment the leader meets their personal AI agent for the first time. They run a few prompts, give feedback (a single 1–5 voice-fidelity score plus a free-text field), and approve. The score and feedback land in `agent_traces` / `voice_fidelity_feedback` — both already exist.

`platform_tour` is a digitally-mediated walkthrough — short embedded video plus three interactive "click here to see X" callouts on the dashboard. No live human required.

`cohort_prep` is one short reflection question, one intro video (≤ 60 seconds, recorded in-browser via the existing video recording infrastructure), and a confirmation that they've added the cohort sessions to their calendar.

`final_confirmation` is a single page summarizing every previous task with its completion timestamp and a literal `I confirm I'm ready` button. On click, this writes `organizations.onboarding_completed_at = now()`, fires the completion email, and the panel collapses.

Total leader time across all 16 tasks: **roughly 90–120 minutes**, distributed across whatever timeline they prefer between sign-up and cohort start.

---

## 4. Schema additions

### 4.1 What's already in the live DB

Confirmed via Supabase MCP introspection of project `vhaiiiykcukrlyvwlgip`. **Do not duplicate these.**

| Table | Relevant columns |
| --- | --- |
| `organizations` | `id`, `name`, `slug`, `subdomain`, `custom_domain`, `status` (`'trial' \| 'active' \| ...`), `account_owner_id`, `settings` (jsonb), `member_count`, `is_verified` |
| `user_profiles` | `id` (== `auth.users.id`), `email`, `role` (`'admin' \| 'author' \| 'user' \| ...`), plus per-user `onboarding_completed` boolean and `onboarding_step` integer (these are **legacy per-user flags** — leave them; we're adding **per-organization** tracking) |
| `organization_memberships` | `id`, `user_id`, `organization_id`, `role`, `status`, `joined_at` |
| `cohorts` | `id`, `course_id`, `name`, `start_date`, `end_date`, `facilitator_id`, `max_participants`, `status` |
| `onboarding_responses` | The deep-content questionnaire (40+ jsonb/text fields). Rich, already wired through `/api/simplified/onboarding-responses`. Keep using it for `brand_guidelines`. |
| `audit_logs`, `email_templates` | Already exist; reuse. |

### 4.2 Migration to apply

Apply via the Supabase MCP `apply_migration` tool against project `vhaiiiykcukrlyvwlgip` with the migration name `20260509_movement_leader_onboarding`.

```sql
-- 4.2.1 Add per-organization onboarding columns.
alter table public.organizations
  add column if not exists onboarding_started_at   timestamptz,
  add column if not exists onboarding_completed_at timestamptz,
  add column if not exists onboarding_state        jsonb not null default '{}'::jsonb,
  add column if not exists cohort_start_date       date;

-- 4.2.2 Per-organization task instances. Definition lives in code; status lives here.
create table if not exists public.onboarding_tasks (
  id                    uuid primary key default gen_random_uuid(),
  organization_id       uuid not null references public.organizations(id) on delete cascade,
  task_key              text not null,
  status                text not null default 'locked'
                          check (status in ('locked', 'available', 'in_progress', 'completed', 'skipped')),
  movemental_unlocked   boolean not null default true,  -- false on prep-gated tasks at insert time
  completed_at          timestamptz,
  completed_by_user_id  uuid references auth.users(id),
  metadata              jsonb not null default '{}'::jsonb,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (organization_id, task_key)
);

create index if not exists idx_onboarding_tasks_org    on public.onboarding_tasks(organization_id);
create index if not exists idx_onboarding_tasks_status on public.onboarding_tasks(organization_id, status);

-- 4.2.3 Signed legal artifacts (MSA, SOW, photography release, ...).
create table if not exists public.signed_agreements (
  id                  uuid primary key default gen_random_uuid(),
  organization_id     uuid not null references public.organizations(id) on delete cascade,
  agreement_type      text not null,    -- 'msa', 'sow', 'photo_release', 'ip_assignment', ...
  agreement_version   text not null,
  signed_at           timestamptz not null default now(),
  signed_by_user_id   uuid references auth.users(id),
  document_url        text,             -- Supabase Storage path or external e-sign URL
  metadata            jsonb not null default '{}'::jsonb
);

create index if not exists idx_signed_agreements_org on public.signed_agreements(organization_id);

-- 4.2.4 Uploaded assets (headshots, logos, brand kits).
create table if not exists public.organization_assets (
  id                   uuid primary key default gen_random_uuid(),
  organization_id      uuid not null references public.organizations(id) on delete cascade,
  asset_type           text not null,   -- 'headshot', 'logo', 'brand_pdf', 'voice_doc', ...
  storage_path         text not null,   -- bucket://path
  uploaded_at          timestamptz not null default now(),
  uploaded_by_user_id  uuid references auth.users(id),
  metadata             jsonb not null default '{}'::jsonb
);

create index if not exists idx_organization_assets_org on public.organization_assets(organization_id);

-- 4.2.5 Corpus / affiliate / theme review feedback.
create table if not exists public.corpus_review_items (
  id                       uuid primary key default gen_random_uuid(),
  organization_id          uuid not null references public.organizations(id) on delete cascade,
  item_type                text not null,    -- 'book', 'article', 'sermon', 'framework', 'affiliate', 'theme'
  movemental_compiled_data jsonb not null,
  leader_feedback          jsonb,
  status                   text not null default 'pending_review'
                            check (status in ('pending_review', 'approved', 'needs_revision', 'rejected')),
  reviewed_at              timestamptz,
  reviewed_by_user_id      uuid references auth.users(id)
);

create index if not exists idx_corpus_review_items_org on public.corpus_review_items(organization_id);

-- 4.2.6 Granular consent records.
create table if not exists public.consent_records (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id         uuid not null references auth.users(id),
  consent_type    text not null,   -- 'photo_release', 'public_quoting', 'cohort_visibility', 'newsletter'
  granted         boolean not null,
  granted_at      timestamptz not null default now(),
  consent_version text not null,
  metadata        jsonb not null default '{}'::jsonb
);

create index if not exists idx_consent_records_org on public.consent_records(organization_id);

-- 4.2.7 Staff allowlist for admin RLS.
-- (We deliberately do NOT key off user_profiles.role = 'admin' because that role is too broad —
--  some 'admin' users in the live DB are author-level admins on tenant orgs, not Movemental staff.)
create table if not exists public.staff_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id)
);

-- 4.2.8 RLS on every new table.
alter table public.onboarding_tasks      enable row level security;
alter table public.signed_agreements     enable row level security;
alter table public.organization_assets   enable row level security;
alter table public.corpus_review_items   enable row level security;
alter table public.consent_records       enable row level security;
alter table public.staff_users           enable row level security;

-- Helper predicate.
create or replace function public.is_movemental_staff(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.staff_users where user_id = uid);
$$;

-- Member-of-org predicate.
create or replace function public.is_member_of_org(uid uuid, org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_memberships
    where user_id = uid and organization_id = org and status in ('active', 'pending')
  );
$$;

-- onboarding_tasks policies.
create policy "members read their org's tasks"
  on public.onboarding_tasks for select
  using (public.is_member_of_org(auth.uid(), organization_id) or public.is_movemental_staff(auth.uid()));

create policy "members update their org's tasks"
  on public.onboarding_tasks for update
  using (public.is_member_of_org(auth.uid(), organization_id) or public.is_movemental_staff(auth.uid()));

create policy "staff insert tasks"
  on public.onboarding_tasks for insert
  with check (public.is_movemental_staff(auth.uid()));

-- Apply equivalent select/update/insert policies to the other four tables, keyed on organization_id.
-- staff_users: only staff can read or modify staff_users.
create policy "staff manage staff list"
  on public.staff_users for all
  using (public.is_movemental_staff(auth.uid()))
  with check (public.is_movemental_staff(auth.uid()));
```

### 4.3 Drizzle regeneration

After the migration applies cleanly:

```bash
pnpm drizzle:gen          # generates a Drizzle migration from the live DB diff (no-op if matched)
pnpm generate:schemas     # regenerates Zod schemas from src/lib/db/schema.ts
pnpm generate:services    # regenerates SimplifiedService classes
pnpm generate:routes      # regenerates /api/simplified/* CRUD endpoints
pnpm generate:hooks       # regenerates TanStack Query hooks
pnpm validate:all         # bottom-up validation (db → contracts → services → routes → hooks)
```

If `validate:all` fails, regenerate the **lowest** broken layer (in the order above) and re-validate. Never hand-patch upper layers to satisfy a lower-layer mismatch — that breaks the type chain.

---

## 5. The task catalog (single source of truth)

Create `src/lib/onboarding/tasks.ts`. Hardcoded; small; stable. Resist the urge to make this DB-driven.

```ts
export type OnboardingPhase = "commitment" | "identity" | "content" | "activation";

export type OnboardingTaskRequirement = "required" | "optional" | "conditional";

export interface OnboardingTaskDefinition {
  key: string;
  phase: OnboardingPhase;
  title: string;
  description: string;
  estimatedMinutes: number;
  dependsOn: string[];
  requiresMovementalPrep: boolean;
  requirement: OnboardingTaskRequirement;
  route: string;          // e.g. "/onboarding/agreement"
  iconKey?: string;       // resolved by the lucide-react Icon wrapper
}

export const ONBOARDING_TASKS: readonly OnboardingTaskDefinition[] = [
  // Phase 1 — Commitment
  { key: "sign_agreement",       phase: "commitment", title: "Sign your engagement agreement", description: "Review and sign the agreement covering scope, payment, AI authorship, and our usage principles.", estimatedMinutes: 15, dependsOn: [],                          requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/agreement" },
  { key: "confirm_payment",      phase: "commitment", title: "Confirm your payment",            description: "Confirm payment for your engagement.",                                                              estimatedMinutes:  5, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/payment" },
  { key: "choose_cohort",        phase: "commitment", title: "Choose your cohort start date",   description: "Select the cohort that fits your calendar.",                                                          estimatedMinutes:  5, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/cohort" },

  // Phase 2 — Identity
  { key: "organization_profile", phase: "identity",   title: "Tell us about your organization", description: "Organization name, domain, primary contact, escalation contact.",                                    estimatedMinutes: 10, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/organization" },
  { key: "images_upload",        phase: "identity",   title: "Upload images and headshots",     description: "Photos and logos we couldn't find or that need updating.",                                            estimatedMinutes: 10, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "optional",    route: "/onboarding/images" },
  { key: "brand_guidelines",     phase: "identity",   title: "Brand and voice preferences",     description: "Colors, fonts, voice notes, terminology preferences, audience details.",                              estimatedMinutes: 20, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "optional",    route: "/onboarding/brand" },
  { key: "consent_block",        phase: "identity",   title: "Confirm your preferences",        description: "Photography rights, public quoting, cohort visibility, communications.",                              estimatedMinutes:  5, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/consent" },
  { key: "tax_form",             phase: "identity",   title: "Tax documentation",               description: "W-9 or W-8BEN if your engagement involves payment from Movemental to you.",                            estimatedMinutes:  5, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "conditional", route: "/onboarding/tax" },
  { key: "orientation",          phase: "identity",   title: "Orientation: what Movemental is", description: "A short orientation covering what Movemental is, what success looks like, and what to expect.",      estimatedMinutes: 10, dependsOn: ["sign_agreement"],            requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/orientation" },

  // Phase 3 — Content (Movemental-prep-gated)
  { key: "corpus_review",        phase: "content",    title: "Review your research corpus",     description: "Books, articles, and source material we've compiled. Add what's missing, flag what shouldn't be there.", estimatedMinutes: 20, dependsOn: ["organization_profile"],     requiresMovementalPrep: true,  requirement: "required",    route: "/onboarding/corpus" },
  { key: "affiliates_review",    phase: "content",    title: "Confirm your affiliated organizations", description: "Networks, denominations, and organizations we should associate with your work.",               estimatedMinutes:  5, dependsOn: ["organization_profile"],     requiresMovementalPrep: true,  requirement: "required",    route: "/onboarding/affiliates" },
  { key: "themes_review",        phase: "content",    title: "Review the themes we've identified", description: "The editorial themes we see across your work. Affirm, correct, or expand.",                       estimatedMinutes: 10, dependsOn: ["corpus_review"],            requiresMovementalPrep: true,  requirement: "required",    route: "/onboarding/themes" },

  // Phase 4 — Activation
  { key: "agent_test",           phase: "activation", title: "Test your AI agent",              description: "Your personal AI agent is ready. Test it, give feedback, and approve.",                                estimatedMinutes: 15, dependsOn: ["themes_review"],            requiresMovementalPrep: true,  requirement: "required",    route: "/onboarding/agent" },
  { key: "platform_tour",        phase: "activation", title: "Platform tour",                   description: "A short walkthrough of your dashboard and capabilities.",                                              estimatedMinutes: 10, dependsOn: ["agent_test"],               requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/tour" },
  { key: "cohort_prep",          phase: "activation", title: "Cohort prep work",                description: "A short reflection and intro before your cohort starts.",                                              estimatedMinutes: 20, dependsOn: ["platform_tour"],            requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/cohort-prep" },
  { key: "final_confirmation",   phase: "activation", title: "Confirm you're ready",            description: "A final review and confirmation that you're fully onboarded.",                                         estimatedMinutes:  5, dependsOn: ["cohort_prep"],              requiresMovementalPrep: false, requirement: "required",    route: "/onboarding/confirm" },
] as const;

export const ONBOARDING_PHASES: readonly OnboardingPhase[] = ["commitment", "identity", "content", "activation"];
```

Add a unit test in `tests/lib/onboarding/tasks.test.ts` that asserts:

- Every `dependsOn` entry resolves to a real `key`.
- The dependency graph is acyclic.
- Every Phase-3 task has `requiresMovementalPrep: true`.
- Phase 4 transitively depends on Phase 3.

---

## 6. The state engine

Create `src/lib/onboarding/state.ts`. The dependency graph is small and stable — solve this in TypeScript, not in SQL.

Key responsibilities:

- **Initialization** — given a fresh organization, insert one row per task into `onboarding_tasks` with the right initial `status` and `movemental_unlocked`. Phase-1 tasks with no dependencies start `available`. Phase-3 tasks (`corpus_review`, `affiliates_review`, `themes_review`) and `agent_test` start with `movemental_unlocked = false`. All others start `locked`.
- **Re-evaluation** — given the current task rows for an org, determine which `locked` tasks should become `available`. A task is available iff: (a) every `dependsOn` task is `completed` or `skipped`, **and** (b) `movemental_unlocked` is true. The `tax_form` conditional rule runs here too: if the engagement does not include leader payments (a flag stored on `organizations.settings.leader_payments_enabled`), `tax_form` auto-`skipped` on phase-2 entry.
- **Completion** — `completeTask(orgId, taskKey, userId, metadata)` runs in a single Postgres transaction:
  1. Update the task row (`status = 'completed'`, `completed_at = now()`, `completed_by_user_id = userId`, `metadata = ...`).
  2. Re-evaluate all `locked` tasks for the org and promote eligible ones to `available`.
  3. If every `requirement: "required"` task is `completed` (and conditional tasks are either `completed` or `skipped`), set `organizations.onboarding_completed_at = now()`.
  4. Write an `audit_logs` row.
- **Admin unlock** — `adminUnlockTask(orgId, taskKey, staffUserId)` flips `movemental_unlocked = true` on a single task row, then re-evaluates. Throws if `staffUserId` is not in `staff_users`.

Wrap everything behind `Result<T>` per the project convention. **Never throw from services.**

---

## 7. API routes

Three new routes alongside the existing `simplified/` CRUD generators:

| Method + Path | Purpose | Auth |
| --- | --- | --- |
| `GET  /api/onboarding/state` | Returns the signed-in user's active organization, all 16 task rows with derived states, and a per-phase summary (`available`, `completed`, `total`). Drives the OnboardingPanel. | Member |
| `POST /api/onboarding/complete` | `{ taskKey, metadata? }` — calls `completeTask`, returns the new state. | Member |
| `POST /api/admin/onboarding/unlock` | `{ organizationId, taskKey }` — staff only; calls `adminUnlockTask`. | Staff (`is_movemental_staff`) |

The `simplified/` generators handle CRUD on `signed_agreements`, `organization_assets`, `corpus_review_items`, `consent_records`, `staff_users` automatically once the schema regenerates — leave those as the generated boilerplate, do not hand-edit.

Resolve the active organization from `auth.uid()` via the user's `organization_memberships` row. If a user is a member of multiple orgs, the API takes a `?org=<slug>` param and the dashboard layout exposes an org switcher; the panel state is per-organization, not per-user.

---

## 8. UI surfaces

### 8.1 Dashboard route group

Create `src/app/(dashboard)/layout.tsx`:

- Server component.
- Calls `createServerClient()`; if no session, `redirect("/login?next=/dashboard")`.
- Resolves the active organization from `organization_memberships`.
- Provides a `DashboardShell` (left nav, top bar with org switcher, profile menu) and renders `{children}` inside it.
- Reads `organizations.onboarding_completed_at`; if null, includes the persistent **`<OnboardingPanel />`** at the top.
- Passes the active org through React Query's `dehydrate` so child client components have it without an extra fetch.

The dashboard layout is **separate** from `(site)/layout.tsx` — public marketing pages keep their existing nav/footer; the dashboard gets its own chrome.

### 8.2 OnboardingPanel

`src/components/onboarding/onboarding-panel.tsx`. Client component. Subscribes to `useOnboardingState()` (TanStack Query hook around `/api/onboarding/state`).

Visual treatment:

- **Surface.** `bg-card` block sitting on a `bg-section` page background. No border. No drop shadow. Tonal stacking — Ghost Lift per `DESIGN.md`.
- **Header row.** Eyebrow `YOUR ONBOARDING`. H3 title `Welcome, {firstName}`. Right-aligned: `Your cohort starts: {cohort_start_date}` in `text-muted-foreground`. **Always visible.**
- **Phase sections.** Four collapsible phase blocks, vertical stack. Phase title + small `n / total complete` text. Each phase contains a list of its tasks.
- **Task row.** Quiet check icon (filled `text-primary` when complete, empty `text-muted-foreground` when not). Title (`text-foreground`, semibold when available, regular when locked). One-line description (`text-muted-foreground`). Right side: estimated minutes pill, primary action button (`Start` / `Continue` / `Review`) linked to the task's route. Locked tasks show no button. Movemental-gated tasks waiting for staff render a small grey pill `We're preparing this — typically ready within 48 hours`.
- **Footer.** Single small text link `Open full onboarding view →` linking to `/welcome`.
- **No progress bar. No percent complete. No badges. No celebration.** A quiet "X tasks remaining" line, optionally an `Estimated time remaining: ~Yh` line, both in `text-muted-foreground text-sm`.

When `onboarding_completed_at` flips non-null, the panel collapses into a one-line `You're fully onboarded — your dashboard is ready` with a `Dismiss` button. After dismissal it is gone for good.

### 8.3 `/welcome` (full-page checklist)

Renders the same checklist component at `max-w-prose` width, centered, with extra breathing room — substantive, not crowded. The route is reachable from the panel and via direct URL so leaders who want to focus on onboarding rather than the dashboard have a calm place to do it.

### 8.4 Per-task sub-routes

One route per task under `/onboarding/{slug}`. Each is a **focused single-purpose page**:

- Title, description, estimated time at the top.
- The task's actual UI (e-sign embed, Stripe checkout, file upload, form, video embed, etc.).
- A `Mark complete` action that calls `POST /api/onboarding/complete` with the right `taskKey` and any task-specific `metadata`.
- After completion: success state for ~2 seconds, then redirect to `/welcome` (or back to `/dashboard` if the user came from there).

Match the task list precisely. Do not add tasks that aren't in the catalog.

### 8.5 Admin view

`/admin/onboarding` — accessible only to users in `staff_users`. The dashboard layout reads `is_movemental_staff(auth.uid())` and renders an `Admin` link in the top bar when true.

The page shows a sortable table of every organization with:

| Org | Phase | Last activity | Cohort start | Stuck? | Actions |
| --- | --- | --- | --- | --- | --- |
| Alan Hirsch | content | 2d ago | 2026-06-01 | — | Mark `corpus_review` ready · `affiliates_review` ready · `themes_review` ready · `agent_test` ready |

`Stuck?` flags any org with `>= 5 days` since last `onboarding_tasks.updated_at` and a `required` task in `available`. The action buttons call `POST /api/admin/onboarding/unlock`. No bulk operations in the first version — one org at a time, deliberate.

---

## 9. Email triggers

Six emails total. **Restraint is the design.** Use Resend (the existing wired provider) and React Email templates per `.claude/skills/email-setup/SKILL.md`.

| Trigger | Subject | Sent when |
| --- | --- | --- |
| `onboarding.welcome` | Welcome to Movemental — let's get started | Org row first sees `onboarding_started_at = now()` (i.e., on first sign-in after invite) |
| `onboarding.phase1_complete` | Thanks — your engagement is confirmed | All three Phase-1 tasks complete |
| `onboarding.corpus_ready` | Your research corpus is ready for review | Staff flips `corpus_review.movemental_unlocked = true` |
| `onboarding.agent_ready` | Your AI agent is ready to test | Staff flips `agent_test.movemental_unlocked = true` |
| `onboarding.cohort_reminder` | Your cohort starts in 5 days | Cron, sent if `onboarding_completed_at IS NULL` and `cohort_start_date - now() = 5 days` |
| `onboarding.completed` | You're fully onboarded — see you {cohort_date} | `final_confirmation` task completed |

**Tone rule.** Each email is professional correspondence from Movemental, not marketing copy. No exclamation points (one acceptable in the welcome subject). No emoji. No "Hey there!" salutations. Sender name `Movemental` (not a person's name); reply-to `hello@movemental.com`. Three-paragraph maximum body. One primary link to the relevant page. One small footer with an unsubscribe link **only** for the cohort reminder — the other five are transactional and do not include unsubscribe.

Implement the cron via Vercel Cron in `vercel.ts`:

```ts
// vercel.ts (excerpt)
crons: [
  { path: "/api/cron/onboarding-cohort-reminders", schedule: "0 14 * * *" },  // daily at 14:00 UTC
],
```

The cron route enumerates orgs with `onboarding_completed_at IS NULL AND cohort_start_date IS NOT NULL` and fires the reminder when the date math matches. Idempotent — record sent emails in `audit_logs` to avoid duplicates.

---

## 10. Backfill for the 11 existing organizations

The live DB already has these 11 organizations (verified via Supabase MCP, ordered by `created_at DESC`):

| Slug | Name | Status | Treatment |
| --- | --- | --- | --- |
| `lucas-pulley` | Lucas Pulley | trial | Run full onboarding initialization |
| `movemental-admin` | Movemental Admin | trial | Mark `onboarding_completed_at = now()` (staff org) |
| `rob-wegner` | Rob Wegner | trial | Run full onboarding initialization |
| `jamie-roach` | Jamie Roach | trial | Run full onboarding initialization |
| `jr-woodward` | JR Woodward | trial | Run full onboarding initialization |
| `rowland-smith` | Rowland Smith | trial | Run full onboarding initialization |
| `liz-rios` | Liz Rios | trial | Run full onboarding initialization |
| `movemental` | Movemental | active | Mark complete (staff org) |
| `josh-shepherd` | Josh Shepherd | active | Mark complete (staff org — Josh is the builder) |
| `brad-brisco` | Brad Brisco | active | Mark complete (staff org) |
| `alan-hirsch` | Alan Hirsch | active | Run full onboarding initialization |

Backfill script at `scripts/backfill-onboarding-tasks.ts`. Idempotent. Steps:

1. Read every `organizations` row.
2. For each row with no existing `onboarding_tasks`, call the same initialization function the app uses for new orgs.
3. For staff orgs (`movemental`, `movemental-admin`, `josh-shepherd`, `brad-brisco`), additionally `update organizations set onboarding_completed_at = now() where id = ...`. Mark every task row `status = 'skipped'` so the panel hides and admin views stay clean.
4. For the four staff `account_owner_id`s, insert into `staff_users`.
5. For Alan, set `cohort_start_date` to the actual planned date if known; otherwise leave null and let staff set it via the admin view.

Run via:

```bash
pnpm tsx scripts/backfill-onboarding-tasks.ts
```

The script uses the service-role Supabase client (read from `SUPABASE_SERVICE_ROLE_KEY`) so it bypasses RLS. Print a summary table at the end showing which orgs were initialized, which were marked complete, and which were skipped (already had rows).

---

## 11. Build order — ship value, not infrastructure

The temptation is to build the full 16-task system in one go because the architecture is intellectually interesting. **Resist.** Ship Phase 1 first; let real leaders use it; learn what the real version should look like.

### Slice 1 — Foundation (1 day)

- Migration `20260509_movement_leader_onboarding`.
- Drizzle / Zod / service / route / hook regeneration.
- `src/lib/onboarding/tasks.ts` (full 16-task catalog).
- `src/lib/onboarding/state.ts` (initialization + evaluation + completion).
- Backfill script run against the live DB.
- Unit tests for the dependency graph and state engine.

### Slice 2 — Phase 1 + Panel (1 day)

- `(dashboard)` route group, layout, and minimal `DashboardShell`.
- `<OnboardingPanel />` rendering the four phases — Phases 2–4 show as `Coming soon` placeholders.
- Three Phase-1 task pages: `/onboarding/agreement` (native signing flow; agreement row in `signed_agreements` or successor table), `/onboarding/payment` (Stripe checkout — wire to existing infra if present, otherwise placeholder confirmation page), `/onboarding/cohort` (date picker writing `cohort_start_date`).
- `welcome` email wired through Resend.
- `phase1_complete` email wired.
- Smoke-test in dev with one of Alan's leaders (use the `lucas-pulley` slug to avoid touching real flows).

### Slice 3 — Admin view + Phase 2 (1–2 days)

- `/admin/onboarding` list + per-task unlock buttons.
- `staff_users` table populated; staff link in dashboard top bar.
- All six Phase-2 task pages built.
- Wrap `onboarding_responses` as the `brand_guidelines` task — reuse the existing form, do not rebuild it.
- `consent_records` writes from the `/onboarding/consent` page.

### Slice 4 — Phase 3 + Phase 4 (2–3 days)

- All Phase-3 task pages, each rendering the staff-prepped data and writing `corpus_review_items`.
- `corpus_ready` and `agent_ready` emails fired by the admin unlock action.
- `/onboarding/agent` rendering an embedded chat against the leader's agent (use the existing `agents` table).
- `/onboarding/tour` embed.
- `/onboarding/cohort-prep` reflection + intro video upload.
- `/onboarding/confirm` final confirmation flipping `onboarding_completed_at`.
- `cohort_reminder` cron + `completed` email.

### Slice 5 — Polish and verification

- `pnpm typecheck`, `pnpm lint`, `pnpm test:run`, `pnpm validate:all` all green.
- Run `webapp-testing` skill end-to-end with a fresh test org.
- Update the `audit-experience` and `auth-setup` skills if anything new is generally useful.
- Add a one-paragraph `What we shipped` to `_docs/_build/notes/onboarding-flow-v1.md`.

Each slice ships behind no flag because there is no public traffic on the dashboard yet. After Slice 2 you can invite Lucas Pulley or Jamie Roach as the first real test, watch them, and adjust before Slice 4.

---

## 12. What NOT to build in the first version

These are explicit anti-goals. They will all be tempting and they will all eat days you don't have.

- **A pluggable task-dependency engine.** The graph has 16 nodes, 13 edges, and never changes. Hardcode it.
- **A reusable "onboarding-as-a-service" framework.** This is Movemental's specific flow. Keep it specific.
- **Per-leader dynamic task lists.** Every leader gets the same 16 tasks until you have evidence they should not.
- **Fancy progress visualizations.** No progress bars. No percent complete. No celebratory animations.
- **A drip-marketing email sequence.** Six transactional emails, professional tone, full stop.
- **Slack / Discord notifications for staff.** The admin view + a daily digest email later is enough; do not build live notifications now.
- **An i18n layer for onboarding copy.** All current leaders read English; ship English-only and revisit when you have a non-English leader.
- **A consent-version migration tool.** When the consent text changes, the next leader signs the new version. Existing rows keep the old version string. Backfilling is unnecessary.
- **A cohort-mate visibility UI.** Collect the consent in Phase 2; render the visible-list view later when there's an actual cohort using the platform.
- **An analytics dashboard for onboarding funnel.** PostHog is already wired across the site; instrument completion events with `posthog.capture('onboarding_task_completed', { task_key, organization_id })` and use PostHog itself instead of building a custom dashboard.

---

## 13. Verification checklist

Before opening the PR for any slice, walk this list:

- [ ] `pnpm typecheck` and `pnpm lint` are clean.
- [ ] `pnpm validate:all` is green; if not, regenerate the lowest broken layer.
- [ ] `pnpm test:run` passes; new tests cover the dependency graph and state-engine transitions.
- [ ] Dependency-graph test asserts every `dependsOn` resolves and the graph is acyclic.
- [ ] RLS policies compile and a query as anon role returns 0 rows for `onboarding_tasks`.
- [ ] Backfill is idempotent — running it twice produces no diff and no errors.
- [ ] OnboardingPanel renders only when `onboarding_completed_at IS NULL`. Confirmed for both staff orgs (panel hidden) and a fresh trial org (panel visible).
- [ ] `/welcome` and `/dashboard` show the same checklist content (visual-regression spot check).
- [ ] All six emails render in React Email preview without warnings; no emojis; no marketing copy.
- [ ] No raw hex colors in any new component; semantic tokens only per `DESIGN.md`.
- [ ] No new 1px solid borders for sectioning; tonal stacking instead.
- [ ] Inter font everywhere; display headings have `letter-spacing: -0.02em`.
- [ ] Mobile breakpoint verified in dev (panel collapses; sub-routes are usable on a phone).
- [ ] Manually walked through Phase 1 as a fresh test user, end to end, and saw the panel state update correctly after each task completion.
- [ ] Manually unlocked a Phase-3 task as a staff user and confirmed the panel updates for the leader.
- [ ] PostHog events firing: `onboarding_task_completed`, `onboarding_phase_completed`, `onboarding_completed`.

---

## 14. After the first version ships

Do not build any of the following until you have watched at least 3 leaders complete Phases 1–4 end-to-end. The watching is the spec.

- Multi-engagement support (a leader signs an SOW for a second engagement without re-signing the MSA).
- Cohort-mate directory rendering.
- Per-leader dynamic task lists (e.g., a leader who already has a recent voice baseline skips `themes_review`).
- A "completion certificate" or signed-off summary PDF of what they completed.
- Re-onboarding flow when a leader's cohort role changes (alumni cohort, advisor cohort, etc.).

What you'll learn from those 3 leaders is worth more than any of the above will be when guessed.

---

**Ship the simplest version that works for one leader. Iterate from there.**
