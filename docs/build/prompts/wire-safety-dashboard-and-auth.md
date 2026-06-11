# Build prompt — wire the Safety Charter dashboard and Supabase auth (enroll → sign up → auth-only workspace)

**Goal.** Ship the end-to-end Safety dashboard product: a visitor converts in the agent room, enrolls on `/enroll`, gets provisioned by the team, **signs up on a front-end auth surface**, and lands in a **private, auth-only charter dashboard** scoped to their organization. Wire Supabase auth according to `@supabase/ssr` best practice and this repo's six-layer type chain — without breaking the existing staff login, assess magic-link, or public agent-room surfaces.

**Read first:**

- [docs/architecture/TYPE_SAFETY_CHAIN.md](../../architecture/TYPE_SAFETY_CHAIN.md) — waterfall, generate/validate commands, golden rule (types flow downstream only).
- [docs/build/supabase-password-auth-setup.md](../supabase-password-auth-setup.md) — password auth operator checklist, provisioning model, QA matrix.
- [docs/design/INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) — dashboard chrome lives on Ink Band utility surfaces (`.ink-band-surface`), not Concept Modern.
- [public/html-template/dashboard/README.md](../../../public/html-template/dashboard/README.md) — charter dashboard HTML mock (visual target).
- [wire-capture-and-enrollment-to-backend.md](./wire-capture-and-enrollment-to-backend.md) — enrollment funnel context (`organization_inquiries`, `/api/agent-room/enroll`).

---

## Product model (lock this before coding)

The Safety dashboard is **not** the marketing tenant. Do not scope dashboard reads/writes through `TENANT_ORG_ID` alone.

| Surface | Auth | Org scope | Purpose |
|--------|------|-----------|---------|
| `/agent`, `/field-guide`, `/enroll` | Public | Public captures stamp `TENANT_ORG_ID` where required | Conversion + lead capture |
| `/assess` | Magic-link signup (`signInWithOtp`, `shouldCreateUser: true`) | `TENANT_ORG_ID` for AI Reality map | Free diagnostic front door |
| `/login`, `/forgot-password` | Password sign-in | Staff / provisioned users | Workspace tools |
| **`/signup` (new)** | Gated signup for enrolled customers | Same email as `organization_inquiries` | Account creation after enrollment |
| **`/dashboard/safety`** (new) | **Auth required** | **`organization_memberships` + `workspaceCourses.safety`** | Private charter workspace |

**Funnel states:**

```
Agent room (safetyDashboard screen)
  → /enroll (organization_inquiries row, team notified)
  → [ops] provision org + membership + safety artifacts + workspaceCourses
  → transactional email with /signup link
  → Supabase auth session established
  → /dashboard/safety (charter dashboard — auth only)
```

The HTML mock at `/html-template/dashboard/charter-dashboard.html` is the visual target. It is mock-only today (no auth, no API). The React port must consume real `safety_artifacts*` rows through the type chain.

---

## Guardrails (apply to every phase)

- **Non-destructive.** Additive migrations only on the shared DB (`vhaiiiykcukrlyvwlgip`). Confirm with the team before DDL. Use **Supabase MCP** (`list_tables`, `apply_migration`) — never ad-hoc SQL in production.
- **pnpm only.** Never `npm`/`yarn`.
- **Fix bottom-up.** Type errors trace to the lowest broken layer. Never hand-author upper-layer types to paper over a missing column.
- **Don't hand-edit generated files.** Layers 2–5 under `src/lib/schemas/`, `src/lib/services/simplified/`, `src/app/api/simplified/`, `src/hooks/simplified/` are regenerated. Domain logic goes in sibling folders (`src/lib/services/safety/`, `src/app/api/safety/`, etc.).
- **Validate after every layer touch.** `pnpm db:check → contracts:check → services:check → routes:check → hooks:check`, then `pnpm typecheck`. Green before proceeding.
- **Supabase SSR canon.** `@supabase/ssr` with **`getAll` / `setAll` only** (never `get`/`set`/`remove`). Session refresh in `proxy.ts` via `updateSession`. Browser client in `@/lib/supabase/client`; server in `@/lib/supabase/server`.
- **Auth redirect safety.** All post-auth `next` params go through `sanitizeAuthRedirectNext` ([safe-redirect.ts](../../../src/lib/auth/safe-redirect.ts)).
- **No open public registration.** Signup is **gated** — only emails tied to a provisioned enrollment (`organization_inquiries` with `status: "provisioned"` or an active `organization_memberships` invite). Staff provisioning stays aligned with [supabase-password-auth-setup.md](../supabase-password-auth-setup.md).
- **Ink Band only** on dashboard surfaces. Scope with `.ink-band-surface` / `InkBandUtilityShell` ([dashboard/layout.tsx](../../../src/app/dashboard/layout.tsx)).

---

## What already exists (REUSE — do not recreate)

### Conversion + enrollment (public, no auth)

| Asset | Status |
|-------|--------|
| Agent room sell screen | [safety-dashboard-screen.tsx](../../../src/components/agent-room/screen/stub/safety-dashboard-screen.tsx) + [safety-dashboard.ts](../../../src/lib/agent-room/data/safety-dashboard.ts) — CTA → `/enroll` |
| Enrollment form | [enroll/page.tsx](../../../src/app/enroll/page.tsx) — posts to `/api/agent-room/enroll` |
| Enrollment API | [api/agent-room/enroll/route.ts](../../../src/app/api/agent-room/enroll/route.ts) → `organizationInquiriesService` + team notify |
| E2E | [forms-and-auth.spec.ts](../../../tests/e2e/forms-and-auth.spec.ts) — enroll submit |

### Auth infrastructure

| Asset | Role |
|-------|------|
| [proxy.ts](../../../proxy.ts) | Session cookie refresh on every request; shell headers |
| [lib/supabase/middleware.ts](../../../src/lib/supabase/middleware.ts) | `createServerClient` + stale refresh handling |
| [lib/supabase/server.ts](../../../src/lib/supabase/server.ts) | `createClient`, `getOptionalAuthUser` |
| [auth/callback/route.ts](../../../src/app/auth/callback/route.ts) | PKCE code exchange; optional AI Reality identity backfill |
| [login/page.tsx](../../../src/app/login/page.tsx) | Password sign-in; `?next=` + `?reason=no_org` |
| [assess/page.tsx](../../../src/app/assess/page.tsx) | Magic-link pattern (`signInWithOtp`, `shouldCreateUser: true`) — **reference for signup UX, not the Safety signup destination** |
| [forgot-password](../../../src/app/forgot-password/) + [auth/update-password](../../../src/app/auth/update-password/) | Recovery flow |

### Org + dashboard context (membership-scoped — use for Safety dashboard)

| Asset | Role |
|-------|------|
| [onboarding.service.ts](../../../src/lib/services/onboarding/onboarding.service.ts) | `listMembershipOrganizations`, `resolveActiveOrganizationId`, `resolveDashboardContextForSessionUser` |
| [api/program/active-org/route.ts](../../../src/app/api/program/active-org/route.ts) | Authenticated org resolution (`?org=` slug); **pattern for client org scope** |
| [workspace-course-entitlements.ts](../../../src/lib/dashboard/workspace-course-entitlements.ts) | `organizations.settings.workspaceCourses` — **`safety` gates the charter dashboard** |
| [program/page.tsx](../../../src/app/program/page.tsx) | Auth guard stub (`redirect /login?next=/program`) — extend, don't duplicate guard logic |

### Safety dashboard data layer (full chain — consume, do not regenerate unless schema changes)

| Table | Chain |
|-------|-------|
| `safety_artifacts` | Drizzle → Zod → service → `/api/simplified/safety-artifacts` → hooks |
| `safety_artifact_versions` | Same |
| `safety_artifact_publications` | Same |

Schema: [schema.ts:3520–3574](../../../src/lib/db/schema.ts#L3520). All rows carry `organization_id` (tenant-scoped via service layer when `TENANT_ORG_ID` is set — **dashboard domain routes must pass explicit org from membership, not marketing tenant**).

### Visual target (mock only)

- [charter-dashboard.html](../../../public/html-template/dashboard/charter-dashboard.html) + [OPEN-DECISIONS.md](../../../public/html-template/dashboard/OPEN-DECISIONS.md)

---

## Phase 0 — Pre-flight (no code yet)

1. Branch: `slice/Sxx-safety-dashboard-auth` (never commit to `main`).
2. Baseline: `pnpm validate:all` and `pnpm typecheck` — both green before changes.
3. Supabase MCP: `list_tables` — confirm `safety_artifacts`, `safety_artifact_versions`, `safety_artifact_publications`, `organization_inquiries`, `organization_memberships`, `user_profiles` exist and match Drizzle.
4. Supabase Dashboard (operator): read [supabase-password-auth-setup.md](../supabase-password-auth-setup.md). Decide signup mode for Safety customers:
   - **Recommended:** magic link at `/signup` (low friction, mirrors `/assess` pattern) **gated by inquiry/membership**, **or**
   - Password invite via admin `inviteUserByEmail` + `/login` (heavier, already documented for staff).
5. Document the choice in a short ADR comment at the top of the new signup route.

**Stop and ask** if baseline validation is red or the team has not approved any new DDL on the shared DB.

---

## Phase 1 — Provisioning seam (inquiry → org + membership + entitlements)

Enrollment today stops at `organization_inquiries`. The dashboard cannot open until ops (or automation) links a real org.

Build a **trusted domain service** (not generated CRUD UI): `src/lib/services/safety/provision-enrollment.ts`

**Input:** `inquiryId` (uuid) or validated admin payload.

**Steps (single transaction where possible):**

1. Load `organization_inquiries` row; reject unless `status === "new"` (or idempotent if already `"provisioned"`).
2. Create `organizations` row (or match existing by slug/email — document dedupe rule):
   - `name` ← `org_name`, `organization_type` ← `org_type`, `contact_email` ← `email`, `size_category` ← `team_size`
   - `settings.workspaceCourses: ["safety"]` (explicit allowlist per [workspace-course-entitlements.ts](../../../src/lib/dashboard/workspace-course-entitlements.ts))
   - `onboarding_state` ← minimal jsonb marker, e.g. `{ "safety_dashboard": { "provisioned_at": "<iso>", "inquiry_id": "<uuid>" } }`
3. Seed **five** `safety_artifacts` rows (kinds/slugs from [safety-charter.ts](../../../src/lib/agent-room/data/safety-charter.ts) / mock) + initial `safety_artifact_versions` (draft body from [safety-charter-drafts.ts](../../../src/lib/agent-room/data/safety-charter-drafts.ts) or empty `body_md`).
4. Update inquiry `status → "provisioned"`; store `organization_id` if you add an additive nullable column **or** log in `onboarding_state` (prefer additive column only after team approval).
5. Send transactional email: "Your dashboard is ready" with link  
   `{ORIGIN}/signup?email={encodeURIComponent(email)}&inquiry={inquiryId}`  
   (use Resend; match [send-safety-toolkit-email.ts](../../../src/lib/email/send-safety-toolkit-email.ts) patterns).

**Expose:**

- Admin-only route: `POST /api/admin/safety/provision-enrollment` (service role or staff gate via `isUserStaff` in onboarding service).
- Do **not** expose provisioning to anonymous clients.

**Layer touch:** if you add columns to `organization_inquiries`, follow Layer 1 → `pnpm generate:schemas` → … → validate. If no schema change, domain service only.

---

## Phase 2 — Identity bridge (Supabase auth user ↔ `user_profiles` ↔ `organization_memberships`)

Magic-link and password auth create rows in `auth.users`. Dashboard authorization requires **`user_profiles.id`** aligned with **`organization_memberships`**.

Build `src/lib/services/safety/link-enrolled-user.ts`:

1. **Resolve profile:** given auth user email, call existing `resolveProfileIdByEmail` ([persist.ts](../../../src/lib/ai-reality/persist.ts)). If null, **create** `user_profiles` row (server-side, service role or trusted route):
   - `id` = Supabase `user.id` when IDs are synced (verify live DB convention via Supabase MCP — many Movemental tables use profile PK = auth UUID)
   - `email`, `first_name`/`display_name` from inquiry `contact_name`
2. **Create membership:** insert `organization_memberships` with `role: "owner"` (or `"admin"`), `status: "active"`, `organization_id` from provisioned org, `joined_at` now.
3. **Idempotent:** safe to call twice for the same email + org.

**Hook point:** extend [auth/callback/route.ts](../../../src/app/auth/callback/route.ts) **or** a dedicated `POST /api/safety/complete-signup` called once after first successful signup:

- Read `inquiry` query param or lookup provisioned inquiry by email.
- Call `linkEnrolledUser`.
- Redirect to `/dashboard/safety` (via `sanitizeAuthRedirectNext`).

**Failure modes:**

- Auth user exists but no membership → redirect `/login?reason=no_org` (already handled in login copy).
- Email mismatch (signup with different email than enrollment) → block with clear error; do not create membership.

---

## Phase 3 — Front-end signup surface (`/signup`)

Create Ink Band utility pages mirroring [assess/page.tsx](../../../src/app/assess/page.tsx) and [login/page.tsx](../../../src/app/login/page.tsx):

**Route:** `src/app/signup/page.tsx` + `layout.tsx` (reuse `InkBandUtilityShell`).

**Behavior:**

1. Accept `?email=` (prefill, read-only if present) and optional `?inquiry=` token.
2. **Gate before sending OTP / showing password fields:**
   - Server check: email has provisioned inquiry or pending membership invite.
   - Return generic "Check your enrollment email" for unknown emails (no enumeration).
3. **Signup method** (pick one in Phase 0 ADR):
   - **Magic link (recommended):** `signInWithOtp({ email, options: { emailRedirectTo: \`${origin}/auth/callback?next=/dashboard/safety\`, shouldCreateUser: true } })`
   - **Password:** `signUp` + email confirmation if enabled — only if product explicitly wants passwords for Safety customers.
4. Success copy: "Check your inbox — tap the link to open your Safety dashboard."
5. Link to `/login` for returning users.

**Supabase Dashboard:**

- Add `/signup` redirect targets to allowlisted URLs.
- If using magic link for customers while staff use password: keep **Allow new users to sign up** enabled **but gate in app code** (Supabase alone cannot express inquiry-gating).

**Do not** reuse `/assess` for Safety signup — different `next` destination and different gate rules.

`pnpm typecheck` green. Add e2e: provisioned test email → signup form → sent state (mirrors assess spec).

---

## Phase 4 — Auth guards (fail closed)

Centralize dashboard auth in a **server helper** `src/lib/dashboard/require-dashboard-session.ts`:

```ts
// Pseudocode — implement with real types
export async function requireSafetyDashboardSession(orgSlug?: string | null) {
  const { user } = await getOptionalAuthUser();
  if (!user) redirect("/signup?next=/dashboard/safety"); // or /login — pick one canonical path
  const ctx = await resolveDashboardContextForSessionUser(user.id, orgSlug);
  if (!ctx) redirect("/login?reason=no_org");
  if (!ctx.workspaceCourses.safety) redirect("/welcome"); // or honest "not provisioned" page
  return { user, ...ctx };
}
```

**Apply:**

1. New layout or page wrapper for `/dashboard/safety/**` calling the helper.
2. Optionally extend [dashboard/layout.tsx](../../../src/app/dashboard/layout.tsx) to auth-guard all `/dashboard/*` except documented public exceptions (today `/dashboard/page.tsx` only redirects — keep behavior consistent).
3. **Optional hard gate in [proxy.ts](../../../proxy.ts):** for `/dashboard/safety` prefix, redirect unauthenticated requests to `/signup` — only if page-level guards are insufficient; prefer RSC guards first (easier to test).

**API routes** serving charter data:

- Hand-written domain routes under `src/app/api/safety/` must call the same membership + entitlement checks.
- Generated `/api/simplified/safety-artifacts` is **not** sufficient alone (no auth in generator) — either wrap with middleware, add server-only domain routes, or enforce RLS in Supabase (Phase 7).

Match QA matrix in [supabase-password-auth-setup.md](../supabase-password-auth-setup.md) and extend:

| Step | Expected |
|------|----------|
| Unauthenticated `/dashboard/safety` | Redirect to signup/login |
| Authenticated, no membership | `/login?reason=no_org` |
| Authenticated, membership, no `workspaceCourses.safety` | Honest blocked page |
| Authenticated + safety entitlement | 200, dashboard renders |

---

## Phase 5 — Port charter dashboard mock → React (`/dashboard/safety`)

**Target route:** `src/app/dashboard/safety/page.tsx` (and nested routes if the mock's hash router becomes real segments — prefer App Router paths over hash SPA).

**Source:** [charter-dashboard.html](../../../public/html-template/dashboard/charter-dashboard.html), [dashboard.css](../../../public/html-template/dashboard/css/dashboard.css), [charter-dashboard.js](../../../public/html-template/dashboard/js/charter-dashboard.js).

**Rules:**

1. Ink Band tokens only — map mock CSS to Tailwind v4 semantic tokens + scoped module ([INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md)).
2. Replace mock data ([charter-dashboard-mock.js](../../../public/html-template/dashboard/js/charter-dashboard-mock.js)) with server-fetched payload:
   - Organization name/slug from `resolveDashboardContextForSessionUser`
   - Artifacts list from `safetyArtifactsService.findMany({ organizationId })` in a **server component loader** or domain API + hooks on client islands only where interactivity requires it.
3. Keep **Layer 6 → hooks** — client components use `useSafetyArtifactsList` with filters `{ organizationId }` passed from server context; **never raw `fetch` to simplified routes from random components**.
4. Version bodies: load latest `safety_artifact_versions` per artifact (domain helper in `src/lib/services/safety/charter-dashboard.ts`).
5. Preserve mock vocabulary decisions from [OPEN-DECISIONS.md](../../../public/html-template/dashboard/OPEN-DECISIONS.md) until product overrides.

**Leave the HTML mock in place** — non-destructive; link from dev docs only.

`pnpm typecheck` green after UI work (Layer 6 is not validated by `validate:all`, but TS must pass).

---

## Phase 6 — Domain API for charter editing (hand-written Layer 4)

Generated CRUD is the backbone; the dashboard needs **opinionated endpoints**:

| Route | Purpose |
|-------|---------|
| `GET /api/safety/charter-dashboard` | Aggregated payload: org + artifacts + latest version bodies + completion stats |
| `PATCH /api/safety/artifacts/[id]/draft` | Save new version row (immutable versions — insert into `safety_artifact_versions`, bump `version_number`) |
| `POST /api/safety/artifacts/[id]/publish` | Create `safety_artifact_publications` row; set artifact `status` |

**Each handler:**

1. Authenticate via `getOptionalAuthUser`.
2. Resolve org via `resolveActiveOrganizationId(user.id, orgSlug)`.
3. Assert `workspaceCourses.safety`.
4. Validate body with Zod schemas **imported from Layer 2** (`SafetyArtifactVersionsInsertSchema`, etc.) — never duplicate shapes.
5. Call services; return `{ success: true, data } | { error: { code, message } }`.

Add Vitest coverage for entitlement denial (401/403 paths).

---

## Phase 7 — RLS and tenant isolation (Supabase MCP)

Dashboard data is multi-tenant per **organization membership**, not anonymous marketing tenant.

1. Supabase MCP / Dashboard: audit existing RLS on `safety_artifacts*`.
2. Policies should allow SELECT/INSERT/UPDATE only when `organization_id` matches an org the JWT user belongs to (via `organization_memberships` join or custom claim — follow patterns from sibling repo `alan-hirsch` if present).
3. **Service role** stays server-only for provisioning (`SUPABASE_SERVICE_ROLE_KEY` never client-side).
4. Re-verify with MCP `execute_sql` as a test user after policies ship.

If RLS is not ready, domain routes **must** enforce membership server-side (already required in Phase 6) — treat RLS as defense in depth, not optional forever.

---

## Phase 8 — Wire enrollment success → signup CTA

Update [enroll/page.tsx](../../../src/app/enroll/page.tsx) success state:

- Copy: provisioning happens within 24h; when the email arrives, use the link to **create your account**.
- Do **not** promise immediate dashboard access on submit (no auth yet).
- Optional: if ops enables instant provision in dev, link to `/signup?email=…` on success for local testing only (feature flag).

Agent room: confirm [safety-dashboard.ts](../../../src/lib/agent-room/data/safety-dashboard.ts) `ctaHref: "/enroll"` remains correct; chip `toEnroll` scene already routes there.

---

## Phase 9 — Enroll page + dashboard cross-links

| From | To |
|------|-----|
| `/welcome` | `/dashboard/safety` when entitlement present |
| `/dashboard/safety` nav | Sign out → `/login`; help email |
| `/login` | Add subtle "First time? Check your enrollment email" → `/signup` |
| Transactional provision email | `/signup?email=…&inquiry=…` |

Use `sanitizeAuthRedirectNext` for all `next` params (`/dashboard/safety` as default post-signup).

---

## Phase 10 — Final verification

1. `pnpm validate:all` — all layers green.
2. `pnpm typecheck` — 0 errors.
3. `pnpm lint`.
4. `pnpm test:run` — unit tests for provisioning + link-enrolled-user + entitlement guard.
5. **Behavioral matrix** (manual or Playwright):

| Step | Expected |
|------|----------|
| Agent room → Get started → `/enroll` | Inquiry row created |
| Admin provision enrollment | Org + artifacts + membership pending + email sent |
| `/signup` with provisioned email | Magic link sent |
| Auth callback | Session + membership linked |
| `/dashboard/safety` | Charter UI with org's artifacts |
| `/dashboard/safety` logged out | Redirect signup/login |
| Wrong email on signup | Generic message, no membership |

6. Supabase MCP: read-only `SELECT` on latest inquiry, org, artifacts, membership for a test enrollment.

**Deliverable report:** table of funnel step → route → service → table → auth requirement, with WORKING/PARTIAL verdict.

---

## Sequencing and dependencies

```
Phase 0 (baseline)
  → Phase 1 (provision) — blocks real dashboard data
  → Phase 2 (identity bridge) — blocks auth-only access
  → Phase 3 (signup UI) — can parallel with Phase 4 guards once gate API exists
  → Phase 4 (guards) — before shipping any dashboard URL
  → Phase 5 (React dashboard) — needs Phases 1–4
  → Phase 6 (domain API) — alongside Phase 5 for interactivity
  → Phase 7 (RLS) — before production promotion
  → Phases 8–9 (copy/links) — anytime after Phase 3
  → Phase 10 (verification)
```

**Parallel-safe:** Phase 5 static read-only shell can start against seeded dev org before edit APIs (Phase 6) land.

**Stop and ask if:**

- Team has not approved provisioning automation touching `organizations` on shared DB.
- Auth UUID ↔ `user_profiles.id` convention differs from assumption — verify in Supabase MCP before Phase 2.
- Product wants Stripe checkout **before** signup (today enroll collects details first; payment link is manual per enroll copy).

---

## Type architecture cheat sheet

| Need | Layer | Action |
|------|-------|--------|
| New column on `organization_inquiries` | 1 | Drizzle + MCP migration → regenerate 2–5 |
| Aggregated dashboard DTO | 3 | Hand service `src/lib/services/safety/charter-dashboard.ts` — compose existing services |
| Save draft / publish | 4 | Hand routes `src/app/api/safety/*` — Zod from Layer 2 |
| Client data | 5 | Existing `useSafetyArtifacts*` hooks with org filter |
| UI | 6 | Server Components for shell; client islands for editor |

**Never:** add UI-only types for artifacts; import `SafetyArtifacts`, `SafetyArtifactVersions` from `@/lib/schemas`.

---

## Related prompts (do not duplicate)

- [wire-capture-and-enrollment-to-backend.md](./wire-capture-and-enrollment-to-backend.md) — Phase 6 enrollment (mostly done); this prompt picks up **after** the inquiry exists.
- Future: Stripe checkout automation, board ratification workflow, public charter publish pages — out of scope unless explicitly requested.

---

## Session checklist (for the executing agent)

- [ ] Phase 0 baseline green; ADR for signup method written
- [ ] Provisioning service + admin route; inquiry → org + artifacts + `workspaceCourses.safety`
- [ ] Identity bridge on auth callback; membership idempotent
- [ ] `/signup` gated; magic link or password per ADR
- [ ] `requireSafetyDashboardSession` guards dashboard routes
- [ ] `/dashboard/safety` React port reads real artifact data
- [ ] Domain API for load/save/publish with entitlement checks
- [ ] RLS verified or documented as follow-up with server enforcement
- [ ] Enroll success + emails link to signup
- [ ] `validate:all`, `typecheck`, e2e/manual matrix documented
