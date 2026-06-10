# Build prompt — wire the agent-room capture, enrollment, contact, lead-magnet, and assessment surfaces to the backend

**Goal.** Take every lead/capture/enrollment surface that is currently a UI-only stub or an orphaned API and wire it end-to-end through the six-layer type-safety chain, **non-destructively** (additive only — no deletes, no schema removals, no overwriting working code). When you finish, a visitor who submits any form in the agent room, the contact screen, the lead-magnet gate, the safety-dashboard enrollment, or the assessment readback produces a durable, tenant-scoped row in Postgres and the right transactional email.

**Read first:**
- [docs/architecture/TYPE_SAFETY_CHAIN.md](../../architecture/TYPE_SAFETY_CHAIN.md) — the waterfall, the generate/validate commands, the golden rule (types flow downstream only; fix the lowest broken layer).
- [docs/build/notes/home-page-ctas-capture-and-ai-engagement.md](../notes/home-page-ctas-capture-and-ai-engagement.md) — the current-state audit these tasks close out.

---

## Guardrails (apply to every phase)

- **Non-destructive.** Additive migrations only. Do not drop or rename live-DB columns/tables. Do not delete the existing mock/stub UI — wire it or add a real submit beside it. Re-mount archived forms by importing/copying, never by deleting the archive.
- **pnpm only.** Never `npm`/`yarn`.
- **Shared production DB.** `vhaiiiykcukrlyvwlgip` is shared by three repos. Before any DDL, confirm with the team and use the **Supabase MCP** (`mcp__claude_ai_Supabase__apply_migration`) as a tracked migration, not ad-hoc SQL. Run `list_tables` first to confirm current structure.
- **Fix bottom-up.** A type error in the UI traces to the lowest broken layer — fix it there, then let it cascade. Never hand-author a type in an upper layer to paper over a missing column.
- **Don't hand-edit generated files.** `src/lib/schemas/index.ts`, `src/lib/services/simplified/*`, `src/app/api/simplified/*`, `src/hooks/simplified/*` are regenerated. Domain logic goes in sibling folders / hand-written route folders.
- **Validate after every layer.** `pnpm db:check → contracts:check → services:check → routes:check → hooks:check`, then `pnpm typecheck`. Green before proceeding.
- **Tenant scoping.** Any table with `organization_id` is auto-scoped by `TENANT_ORG_ID` in `base.service.ts` and **fails closed** if that env is unset. Public capture rows must carry the seeded `TENANT_ORG_ID` (the agent room's pinned org).

---

## What already exists (REUSE — do not recreate)

These tables already have a **complete chain** (Drizzle → Zod → service → route → hook). Do not regenerate them; consume their hooks/services:

| Table | Key columns | Generated chain |
|-------|-------------|-----------------|
| `contactSubmissions` ([schema.ts:3102](../../../src/lib/db/schema.ts#L3102)) | name, email, organization, audience_segment, message, status | ✅ full |
| `organizationInquiries` ([schema.ts:3127](../../../src/lib/db/schema.ts#L3127)) | org_name, contact_name, email, org_type, team_size, current_tools, message, timeline, budget_range, status | ✅ full |
| `newsletterSubscribers` ([schema.ts:2163](../../../src/lib/db/schema.ts#L2163)) | email, name, source, status, confirmation_token, confirmed_at, unsubscribed_at, organization_id | ✅ full |
| `assessments`, `userAssessments`, `assessmentQuestions`, `assessmentResponses`, `assessmentShareTokens`, `systemReadinessAssessments`, `dualIntelligenceAssessments`, `assessmentResults` | (see schema) | ✅ full |

Hand-written domain routes that already work (REUSE):
- [api/contact/route.ts](../../../src/app/api/contact/route.ts) — validates `{name,email,organization?,audience_segment,message}`, inserts `contact_submissions`, emails inbox + ack.
- [api/toolkit-download/route.ts](../../../src/app/api/toolkit-download/route.ts) — validates `{email,organization?,source?,fieldGuide,gatePath,metadata?}`, inserts `newsletter_subscribers`, sends the day-0 PDF email.
- [api/newsletter/*](../../../src/app/api/newsletter/) — double opt-in, confirm, unsubscribe.

What is **MISSING** and must be built: a unified capture table + endpoint for the agent room, the wiring of `submitLead`, the contact-screen → API connection, a live-surface mount of the lead-magnet forms, a safety-enrollment domain route + form, assessment persistence + magic-link, the day-3/7 cron, and the newsletter result pages.

---

## Phase 0 — Pre-flight (no code yet)

1. Create a branch: `slice/S03-capture-backend-wiring` (never commit to `main`).
2. Establish a clean baseline: `pnpm validate:all` and `pnpm typecheck` — both must be green **before** you change anything. If not, stop and report; you are not starting from a known-good state.
3. Via Supabase MCP: `mcp__claude_ai_Supabase__list_tables` to confirm the live schema, and confirm `TENANT_ORG_ID` (the seeded agent-room org) is the value you will stamp on public captures.

---

## Phase 1 — New unified capture table `agent_room_leads` (full waterfall)

This is the durable log of **every** agent-room capture (`map` / `paid` / `free` / `discuss`), the spine the `submitLead` seam writes to. It exercises the entire chain top-to-bottom.

**Layer 0 → 1 (DB + Drizzle), in this order:**

1. **Apply the migration via Supabase MCP** (`apply_migration`, name `add_agent_room_leads`). Additive `CREATE TABLE`:
   - `id` (uuid pk, default gen), `organization_id` (uuid, FK → `organizations.id`, **not null** so it tenant-scopes), `kind` (text — `map|paid|free|discuss`), `email` (text not null), `first_name` (text), `name` (text), `organization` (text), `role` (text), `source` (text), `session_id` (text), `anon_id` (text), `map_answers` (jsonb), `metadata` (jsonb), `status` (text default `'new'`), `created_at` (timestamptz default now()).
   - Index on `(organization_id, created_at)` and on `email`.
2. **Add the matching `pgTable("agent_room_leads", …)`** to [src/lib/db/schema.ts](../../../src/lib/db/schema.ts) by hand (this repo has no generate-schema script), using the `id()`, `createdAt()` helpers and `.references(() => organizations.id, { onDelete: "set null" })`. Place it near the other capture tables (~line 3140).
3. `pnpm db:check` → must report **LOCKED** (schema table set ⊆ live DB).

**Layers 2 → 5 (generate + validate gate after each):**

```bash
pnpm generate:schemas && pnpm contracts:check   # Layer 2 — AgentRoomLeads{Select,Insert,Update,Filters}Schema + types
pnpm generate:services && pnpm services:check    # Layer 3 — agentRoomLeadsService (tenant-scoped via organization_id)
pnpm generate:routes   && pnpm routes:check      # Layer 4 — /api/simplified/agent-room-leads CRUD backbone
pnpm generate:hooks    && pnpm hooks:check       # Layer 5 — useAgentRoomLeads* hooks
pnpm typecheck                                   # 0 errors
```

Do **not** hand-edit any generated output. If a validator fails, fix Layer 1 (the source), don't patch upward.

---

## Phase 2 — Hand-written domain endpoint `/api/agent-room/capture`

The generated `simplified/agent-room-leads` route is bare CRUD; the room needs one domain endpoint that validates, stamps the tenant, logs the lead, and fans out to the right specialized table + email. Create [src/app/api/agent-room/capture/route.ts](../../../src/app/api/agent-room/capture/) (sits beside the existing `stream/` route):

- **Input (Zod):** `{ kind: "map"|"paid"|"free"|"discuss", email, first?, name?, org?, role?, source?, sessionId?, anonId?, mapAnswers?, metadata? }` — mirror the field keys already defined in [capture.ts CAPTURE_VARIANTS](../../../src/lib/agent-room/capture.ts).
- **Always:** insert one `agent_room_leads` row (via the Layer-3 `agentRoomLeadsService`, stamping `organization_id = TENANT_ORG_ID`). Rate-limit per IP (reuse the pattern in `api/contact`/`api/toolkit-download`).
- **Then fan out by `kind`** (reuse existing services/routes — do not duplicate their logic):
  - `free` → call the existing toolkit flow (insert `newsletter_subscribers` + send the day-0 field-guide email). Prefer extracting the toolkit route's core into a shared `src/lib/email/`/service helper and calling it from both, so behavior stays single-sourced.
  - `map` → upsert `newsletter_subscribers` (source `assessment-map`) and email the assessment "map" + the one next step (see Phase 7).
  - `paid` → insert `organizationInquiries` (map `name→contact_name`, `org→org_name`, `role`→`current_tools`/`message` as appropriate) so it lands in the enrollment queue, and notify the internal inbox.
  - `discuss` → insert `contact_submissions` (audience_segment `Organization / institution`, message = the discuss context) and send the inbox + submitter-ack emails, reusing `contact-notifications.ts`.
- **Resilience:** the lead-log insert is the source of truth; email/fan-out failures must be caught and logged, never lose the row (match the `api/contact` pattern). Return a typed JSON result the client can branch on.

`pnpm typecheck` green.

---

## Phase 3 — Wire the `submitLead` seam (Layer 6)

[src/lib/agent-room/capture.ts:105](../../../src/lib/agent-room/capture.ts#L105) is the single network boundary, currently `console.log` + `// TODO`. Replace the body **only** (keep the signature, the in-memory `LEADS`, and all variant data intact):

- `POST` the payload to `/api/agent-room/capture` with `{ kind, ...payload, sessionId, anonId }`, pulling `sessionId`/`anonId` from the room state the way [agent-stream-turn.ts](../../../src/lib/agent-room/agent-stream-turn.ts) already does.
- Keep it a thin fetch (no TanStack hook needed here — this is a fire-and-confirm action inside the scene runner, not a query). Preserve graceful failure: surface an error state to the capture screen, do not throw past the runner.
- Verify all four capture screens (`map`/`paid`/`free`/`discuss`) now persist. The free path must not double-send if it also routes through the toolkit flow — dedupe on email+source.

---

## Phase 4 — Connect the contact screen to its API

[src/components/agent-room/screen/stub/contact-screen.tsx](../../../src/components/agent-room/screen/stub/contact-screen.tsx) is UI-only by design (AF-90). **Confirm with the user that AF-90 is reversed before wiring** — if it's still deferred, skip this phase and note it.

When cleared: replace the mock success with a real `POST /api/contact` (the route already exists and works). Map the screen's topic/message fields to the route's `{name,email,organization?,audience_segment,message}` shape. Keep the existing client-side validation and success/error UX; only add the network call. Do not delete the mock path — gate it behind the real call's failure as a fallback.

---

## Phase 5 — Re-mount the lead-magnet forms on a live surface

The working forms are archived at `_archive/pre-marketing-migration-2026-06/components/toolkit/ToolkitDownloadForm.tsx` and `…/pathway/sandbox-field-guide-gate.tsx`. The API ([api/toolkit-download](../../../src/app/api/toolkit-download/route.ts)) already works.

- **Copy** (don't move) the form components into a live path under `src/components/` (e.g. `src/components/toolkit/`), updating imports to current token/primitive locations. Leave the archive untouched.
- Mount them where a visitor can reach them — the agent-room `free` capture screen already covers the in-room path; additionally expose a standalone route/section if the home surface exists (see Phase 8 dependency note).
- Confirm email capture + day-0 PDF download both fire against the live route. Note in your report that **day-3/day-7 follow-ups remain stubbed** until Phase 8.

---

## Phase 6 — Safety-dashboard full enrollment → `organizationInquiries`

[safety-screen.tsx](../../../src/components/agent-room/screen/stub/safety-screen.tsx) shows the free-vs-$1,000 copy but captures nothing. The `organizationInquiries` table + chain already exist; build the missing form + domain route.

1. **Domain route** `src/app/api/agent-room/enroll/route.ts` (or extend Phase 2's `kind:"paid"` branch — prefer reusing it). Validate the full enrollment shape against the existing columns: `org_name, contact_name, email, org_type, team_size, current_tools, message, timeline, budget_range`. Insert via `organizationInquiriesService`; notify the internal inbox; set `status:"new"`.
2. **Enrollment form (Layer 6)** on the paid path: collect org info **and** the contact person (the table already has both — `org_name` + `contact_name`). Use the `paid` `CAPTURE_VARIANT` as the entry point and expand it to the full field set, or hand off to a dedicated enrollment screen. Consume the generated `useOrganizationInquiriesCreate` hook (or post to the domain route) — never raw `fetch` in the component.
3. Optionally seed `organizations.onboarding_state` for the provisioning workflow (additive jsonb write), but do not build a state machine unless asked.

`pnpm typecheck` green.

---

## Phase 7 — Assessment persistence, magic-link, and shareable map

The assessment data layer is fully generated (`assessments`, `userAssessments`, `assessmentResponses`, `systemReadinessAssessments`, `dualIntelligenceAssessments`, `assessmentResults`, `assessmentShareTokens`) and the in-room "beat" UI captures answers. What's missing is persistence and the front door.

1. **Persist responses.** When the beat/readback completes, write the answers through the existing services. For the AI-readiness diagnostic use `systemReadinessAssessments` / `dualIntelligenceAssessments` (they already carry `email`, `likert_scores`, `result_payload`); for the full APEST-style flow use `userAssessments` + `assessmentResponses`. Route the in-room submit through the `map` branch of `/api/agent-room/capture`, which also logs the lead and emails the map.
2. **Magic-link front door (new).** There is **no** OTP/magic-link flow today — only Supabase password auth. Build it with Supabase `signInWithOtp` (email magic link), `@supabase/ssr` `getAll`/`setAll` cookies only, callback at `src/app/auth/callback`. This lets a visitor start the free assessment with just an email — the "juicy free data" front door. Keep it a thin, standalone mini-app surface; do not entangle it with the password login.
3. **Shareable result.** `assessmentShareTokens` exists but has no UI. Add a "share / email me my map" affordance that mints a token via the generated service and renders a read-only result page at `/assessment/share/[token]`. Respect `expires_at` and `include_personal_info`.

Run the full validate + typecheck after each layer touched.

---

## Phase 8 — Follow-up cron + newsletter result pages (close the gaps)

1. **Day-3 / day-7 lead-magnet sequence.** Stubbed at [toolkit-download/route.ts:40](../../../src/app/api/toolkit-download/route.ts#L40) and [send-safety-toolkit-email.ts:40](../../../src/lib/email/send-safety-toolkit-email.ts#L40). Add a Vercel Cron route under `src/app/api/cron/` that queries `newsletter_subscribers` where `source` starts with `safety-toolkit:` / `sandbox-toolkit:`, computes day-3/day-7 windows off `created_at`, and sends the sequence via Resend. Add the schedule to `vercel.json`. Gate with a cron secret.
2. **Newsletter result pages.** `/api/newsletter/confirm` and `/unsubscribe` redirect to `/newsletter/confirmed` and `/newsletter/unsubscribed`, which **don't exist**. Add both pages (read the `?state=` query param, render confirmation/error). Cheap, removes a broken-looking landing.
3. **Resend degradation visibility.** Today a missing `RESEND_API_KEY` only `console.warn`s. Add a minimal admin-visible signal (log to a table or Sentry breadcrumb) so a silently-skipped send isn't mistaken for success. Additive only.

---

## Phase 9 — Final verification

1. `pnpm validate:all` (all six layers) — green.
2. `pnpm typecheck` — 0 errors.
3. `pnpm lint`.
4. **Behavioral check** (use the `verify`/`run` skill): start the app, submit each surface, confirm a real row lands in each table via Supabase MCP `execute_sql` (read-only `SELECT … ORDER BY created_at DESC LIMIT 1`), and confirm the expected email fires (or is correctly skipped when `RESEND_API_KEY` is unset).
5. Report a table of every surface → endpoint → table → email, with a WORKING/PARTIAL verdict, plus anything still stubbed.

---

## Sequencing & dependencies

- Phases **1 → 2 → 3** are the critical spine — do them first; they unblock every in-room capture.
- Phase **4** depends on the AF-90 product decision (ask before building).
- Phase **5** and a standalone assessment surface (**7.2**) want a real home/marketing surface to live on; `/` currently just redirects to `/agent`. If no home page exists yet, mount on the agent-room surfaces and flag the home-page dependency rather than improvising a marketing page (per CLAUDE.md: no improvised layouts).
- Phases **6, 7, 8** are independent and can follow in any order.
- After each phase touching Layers 1–5, the **validate + typecheck gate is mandatory** before moving on.

**Stop and ask** if: the team hasn't cleared the `agent_room_leads` migration on the shared DB; AF-90 is still deferred; or any baseline validation was already red in Phase 0.
