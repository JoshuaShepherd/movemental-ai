# Agent prompt — **movemental-dashboard** UI parity with Movemental onboarding (execute in dashboard repo)

> **Where to run this.** Clone or open the **`movemental-dashboard`** repository and treat this document as the **complete instruction set**. Do **not** assume the marketing site repo (`movemental-ai`) is your working tree — copy any contracts below into dashboard code or fetch shared packages if your monorepo provides them.
>
> **Why this exists.** The **organizational / API backend** for movement-leader onboarding (schema, RLS, task engine, REST handlers, emails) ships from **`movemental-ai`** (see [`movement-leader-onboarding-flow.md`](./movement-leader-onboarding-flow.md) and the implementation added there). The **`movemental-dashboard`** app should present the **authenticated dashboard shell**, **onboarding checklist UX**, **phase task pages**, and **staff admin** so leaders and Movemental staff get a cohesive product UI while calling the **same HTTP contracts**.

---

## 0. Preconditions

1. **Auth** — Dashboard users authenticate with **Supabase** (same project as production leader orgs: project ref aligned with Movemental). Session cookies or bearer strategy must allow **authenticated** calls to the onboarding API routes.
2. **API origin** — Decide explicitly:
   - **Same-origin:** Dashboard is deployed under the same apex as `movemental-ai` (e.g. app subdomain or path) → `fetch('/api/onboarding/...')` works as in the reference impl.
   - **Cross-origin:** Dashboard lives on a different host → set **`NEXT_PUBLIC_MOVEMENTAL_API_ORIGIN`** (or equivalent) and configure **CORS** + **credentials** on the API server so cookies or tokens work (prefer **HTTP-only cookie** SameSite policy documented with infra).
3. **Design SSOT** — Match Movemental product chrome to **`docs/design/DESIGN.md`** in **movemental-ai** (Concept Modern: semantic tokens, Inter + Instrument serif emphasis, tonal stacking, sparse `bg-primary`). If dashboard has its own `globals.css`, **reconcile token names** with the marketing app so both feel like one system.

---

## 1. Reference implementation map (movemental-ai)

Use these paths **only as read-only reference** when copying behavior (do not edit that repo from this task):

| Concern | Location |
| -------- | ---------- |
| Task catalog (16 tasks, phases, routes) | `src/lib/onboarding/tasks.ts` |
| Pure state helpers (deps, UI status, tax skip) | `src/lib/onboarding/state.ts` |
| Server service (init rows, complete, admin unlock, payloads) | `src/lib/services/onboarding/onboarding.service.ts` |
| Member APIs | `src/app/api/onboarding/state/route.ts`, `complete/route.ts`, `cohort/route.ts` |
| Staff API | `src/app/api/admin/onboarding/unlock/route.ts` |
| Client hooks (TanStack Query) | `src/hooks/onboarding/use-onboarding-state.ts` |
| Dashboard chrome | `src/components/dashboard/dashboard-shell.tsx`, `dashboard-org-context.tsx` |
| Onboarding UI | `src/components/onboarding/onboarding-panel.tsx`, `onboarding-checklist.tsx`, `onboarding-task-shell.tsx`, `phase1-task-pages.tsx` |
| Route group | `src/app/(dashboard)/layout.tsx`, `dashboard/page.tsx`, `welcome/page.tsx`, `onboarding/*/page.tsx`, `admin/onboarding/page.tsx` |
| Auth callback | `src/app/auth/callback/route.ts` |
| Login | `src/app/(site)/login/page.tsx` |
| Marketing chrome suppression | `proxy.ts` + `src/lib/supabase/middleware.ts` header `x-movemental-shell`, `src/app/layout.tsx` |

Your goal in **movemental-dashboard** is **equivalent UX and wire-up**, optionally **better** visual polish, never **different business rules** unless product explicitly changes them.

---

## 2. HTTP contracts (implement clients to match exactly)

Base URL = `${API_ORIGIN}` (empty string if same-origin).

### 2.1 `GET ${API_ORIGIN}/api/onboarding/state?org=<slug>`

- **Auth:** Session required; **401** `{ error: { code, message } }` if anonymous.
- **Query:** `org` optional; if omitted, server resolves first active/pending membership.
- **Success:** `{ success: true, data: OnboardingStateResponse }`

**`OnboardingStateResponse` shape:**

```ts
type OnboardingStateResponse = {
  userFirstName: string | null;
  organization: {
    id: string;
    name: string;
    slug: string;
    onboarding_completed_at: string | null;
    onboarding_started_at: string | null;
    cohort_start_date: string | null; // ISO date string or null
  };
  tasks: Array<{
    key: string;
    phase: "commitment" | "identity" | "content" | "activation";
    title: string;
    description: string;
    estimatedMinutes: number;
    route: string; // path on dashboard, e.g. "/onboarding/agreement"
    requirement: "required" | "optional" | "conditional";
    requiresMovementalPrep: boolean;
    dbStatus: string | null;
    uiStatus:
      | "locked"
      | "waiting_movemental"
      | "available"
      | "in_progress"
      | "completed"
      | "skipped";
    completedAt: string | null;
  }>;
  phaseSummaries: Array<{
    phase: string;
    completed: number;
    total: number;
    available: number;
  }>;
  remainingMinutes: number;
  commitmentRemainingMinutes: number;
  leaderPaymentsEnabled: boolean;
  memberships: Array<{ organizationId: string; name: string; slug: string }>;
  activeSlug: string;
};
```

**UI rules driven by payload:**

- **`waiting_movemental`** — Show quiet grey pill: “We are preparing this — typically ready within 48 hours.” No primary CTA.
- **`available` / `in_progress`** — Single primary action linking to `task.route` with **`?org=<activeSlug>`** preserved.
- **`completed` / `skipped`** — Checkmark; no CTA.
- **Cohort line** — Header always shows cohort date from `organization.cohort_start_date` (formatted) or “Not set yet”.
- **No gamification** — No progress bars, no percent complete, no celebration microcopy.

### 2.2 `POST ${API_ORIGIN}/api/onboarding/complete`

- **Body:** `{ taskKey: string; metadata?: Record<string, unknown>; organizationSlug?: string }`
- **Auth:** Member of org.
- **Errors:** **400** with `{ error: { code, message } }` (e.g. `cohort_required` when completing `choose_cohort` without `cohort_start_date`).
- **Success:** `{ success: true, data: { organizationId: string } }`
- After success, **invalidate** onboarding state query.

### 2.3 `POST ${API_ORIGIN}/api/onboarding/cohort`

- **Body:** `{ cohortStartDate: string; organizationSlug?: string }` — date **`YYYY-MM-DD`**.
- **Success:** `{ success: true }`

### 2.4 `POST ${API_ORIGIN}/api/admin/onboarding/unlock`

- **Body:** `{ organizationId: string; taskKey: string }`
- **Auth:** Staff only (**403** if not in `staff_users` server-side).
- **Success:** `{ success: true, data: { ok: true } }`

Staff unlock triggers transactional emails for **`corpus_review`** and **`agent_test`** on the server (Resend). Dashboard only needs to handle success/error UI.

---

## 3. Routing and IA (dashboard app)

Mirror this route tree under the authenticated shell:

| Path | Purpose |
| ----- | -------- |
| `/login` | Magic-link or password auth; `next` query preserved for return navigation |
| `/auth/callback` | OAuth/magic-link code exchange → redirect to `next` (default `/dashboard`) |
| `/dashboard` | Home / overview (placeholder content OK until product defines widgets) |
| `/welcome` | Full-page onboarding checklist (same data as panel, wider layout) |
| `/onboarding/agreement` | Phase 1 — agreement + mark complete |
| `/onboarding/payment` | Phase 1 — payment confirmation + mark complete |
| `/onboarding/cohort` | Phase 1 — date → `POST /api/onboarding/cohort` → complete `choose_cohort` |
| `/admin/onboarding` | Staff — org table + prep-task unlock buttons |

**Org switching:** Persist active org via **`?org=<slug>`** on dashboard URLs; default to first membership when absent. All onboarding `fetch` calls pass **consistent** `organizationSlug` / query param.

**Future task routes:** Catalog defines `/onboarding/organization`, `/onboarding/brand`, `/onboarding/consent`, etc. Stub with “Coming soon” pages until backend + movemental-ai pages exist — **do not invent task keys**.

---

## 4. Layout and components to build

### 4.1 Authenticated layout

- Server (or middleware) gate: no session → **`/login?next=<encoded path>`**.
- Resolve memberships server-side if useful for SSR hints; client **must** still hydrate from **`GET /api/onboarding/state`** for truth.
- Top chrome: product name, nav links (**Dashboard**, **Onboarding** / Welcome), **Admin** link only if staff (derive from lightweight **`GET`** that doesn’t leak data, or reuse state payload + separate **`GET /api/me`** if you add one — **do not** guess staff from `user_profiles.role` alone; server uses `staff_users` table).

### 4.2 `OnboardingPanel` (persistent)

- Renders **only while** `organization.onboarding_completed_at == null` (after completion, optional one-line dismiss + localStorage key `onboarding-dismissed-<orgId>` per reference behavior).
- Uses **`GET /api/onboarding/state`** with TanStack Query (`staleTime` ~60s acceptable).
- **Mobile:** collapsible header (“Show / Hide”); **desktop:** always expanded.
- Surface: **`bg-card`** on **`bg-section`** page background; **no** marketing site header/footer (dashboard is its own shell).

### 4.3 `OnboardingChecklist` (shared)

- **Phase sections:** Commitment shows **live tasks** from API. Other phases (**identity**, **content**, **activation**) show **honest placeholder** until Slice 3–4 ships in movemental-ai: short copy that additional steps unlock after commitment — **no fake completed counts** for future phases if API still reports zeros (optional: hide counts for non-commitment phases).
- Per-task row: title, description, minutes pill, status icon, CTA rules from §2.1.
- Footer on panel variant: link **“Open full onboarding view →”** → `/welcome?org=…`.

### 4.4 Phase 1 task pages

- **Agreement:** Native in-dashboard signing (review → consent → signature); **`POST /complete`** with `taskKey: "sign_agreement"` when the signing pipeline marks the task done.
- **Payment:** Copy + **`confirm_payment`** complete.
- **Cohort:** Native date input → **`POST /api/onboarding/cohort`** then **`choose_cohort`** complete (server validates date present).

### 4.5 Staff admin

- Table columns: **Organization**, **Phase label**, **Last activity**, **Cohort start**, **Stuck** (optional heuristic: reference movemental-ai `listAdminOnboardingSummaries`), **Prep unlocks**.
- One button per prep task: **`corpus_review`**, **`affiliates_review`**, **`themes_review`**, **`agent_test`** — disabled when already unlocked or row missing.
- On success, **refresh** list.

---

## 5. Design and accessibility requirements

- **Semantic tokens only** — `bg-background`, `bg-section`, `bg-card`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `ring-border`, etc. No raw hex in JSX.
- **No heavy section borders** — prefer tonal stacking (card on section). Form controls may use subtle **ring** for focus (accessibility).
- **Typography** — Inter for UI; display headings **`tracking-[-0.02em]`**; eyebrow pattern (uppercase, muted) for “YOUR ONBOARDING”.
- **Motion** — Prefer CSS transitions; respect **`prefers-reduced-motion`**.
- **a11y** — Accordion triggers keyboard-accessible; task rows expose completion state in text, not color alone.

---

## 6. Environment variables (dashboard repo)

Document in `.env.example`:

| Variable | Purpose |
| -------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser client |
| `NEXT_PUBLIC_MOVEMENTAL_API_ORIGIN` | **If** API is cross-origin (e.g. `https://movemental.com`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for links in emails is server-side; dashboard may use for absolute links |

---

## 7. Verification checklist (before merge)

- [ ] Login → callback → `/dashboard` works with session persisted.
- [ ] `GET /api/onboarding/state` returns data for a member user; panel renders Commitment tasks.
- [ ] Completing Phase 1 tasks in order updates UI without hard refresh (query invalidation).
- [ ] Cohort step refuses completion until date saved (server `cohort_required`).
- [ ] Staff user sees **Admin**; non-staff never sees unlock UI (server **403**).
- [ ] Unlock updates leader panel after refresh (leader refetches state).
- [ ] `pnpm typecheck` / `pnpm lint` / unit tests (if present) pass in **movemental-dashboard**.
- [ ] Visual review: tokens only, no marketing chrome leakage, mobile panel collapses.

---

## 8. Explicit non-goals (this pass)

- Reimplementing the **task dependency engine** or **Drizzle schema** in the dashboard repo.
- Building Phase 2–4 task **forms** until movemental-ai ships those routes and any extra APIs.
- PostHog funnels (optional later): reference parent prompt suggests `onboarding_task_completed` events — add only if dashboard already runs PostHog.

---

## 9. When movemental-ai changes

If API shapes or task routes change in **movemental-ai**, update **this document** in the marketing repo and bump a short **CHANGELOG** note in dashboard so agents stay aligned.

---

**Execute in order:** (1) env + API client, (2) auth + layout shell, (3) onboarding state hook, (4) panel + welcome checklist, (5) phase 1 pages, (6) admin table, (7) polish + verification.
