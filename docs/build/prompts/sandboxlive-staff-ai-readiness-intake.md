# Prompt: Ship Staff AI Readiness Intake inside SandboxLive (production Next.js)

**Target agent:** Cursor / Claude Code / any capable coding agent with repo write access  
**Audience for review:** Engineering + facilitation (whoever owns Sandbox cohort prep)  
**Repo / surface:** `movemental-ai` — authenticated **SandboxLive** (`/sandboxlive`), same entitlement guard as existing SandboxLive routes  
**Last updated:** 2026-05-14

---

## 1. Role and stance

You are a **senior full-stack engineer** on this **Next.js 16 (App Router) + Supabase + Drizzle** codebase. You ship a **multi-section staff questionnaire** (“AI Readiness Check-In”) that was previously authored as a **Claude Artifact** using `window.storage` (not portable). Your job is to **re-implement it as first-class product code**: typed, persisted, org-scoped, accessible, and visually aligned with **Movemental’s authenticated editorial register** — not a pasted marketing page and not a duplicate of public `(site)` marketing.

**Stance:** Prefer **one clear route** and **minimal new surface area**. Do not invent a parallel “training app.” Wire into **SandboxLive**, because that is where Sandbox engagement already lives (`src/app/(dashboard)/sandboxlive/**`).

---

## 2. Context (read before typing)

### 2.1 Origin artifact (non-goals)

The source UX is a single React file that:

- Hardcodes a **`SECTIONS`** questionnaire (About you → Goals).
- Uses **`window.storage.get|set|list|delete`** for drafts and submissions (Artifact host API — **unavailable in Next.js**).
- Exposes **`ADMIN_PASSCODE`** in client code ( **unacceptable** in production).

**None of that may ship as-is.** Treat the questionnaire *content and control types* as the spec; treat storage and admin as *replace*.

### 2.2 Where this belongs in the product

| Area | Role |
|------|------|
| **`(dashboard)/sandboxlive`** | Canonical Sandbox engagement shell; already gated by sandbox course entitlement (`src/app/(dashboard)/sandboxlive/layout.tsx`). |
| **Phase 02 — Assessment** | Narrative home for “where is the cohort” (`src/lib/sandboxlive/phase-manifest.ts`, slug `02-assessment`). Today it may load a **Stitch-backed** workspace. The intake is **per-user, structured data** — complementary, not a replacement for the Stitch doc unless product explicitly asks later. |
| **Public `(site)`** | **Do not** put authenticated staff PII on public routes. |

**Placement decision (execute exactly):**

1. Add a **dedicated authenticated route** under SandboxLive, e.g. **`/sandboxlive/readiness`** (kebab, readable in comms).  
2. Surface it from **SandboxLive home** (`src/components/sandboxlive/active-engagement-home.tsx`) as a **secondary editorial link** in an appropriate band (new short section or existing “What your cohort is building toward” area): copy should say this is **individual pre-session intake**, not the phase workspace doc.  
3. Optionally add a **tertiary text link** from **`/sandboxlive/phase/02-assessment`** (in `src/app/(dashboard)/sandboxlive/phase/[slug]/page.tsx` or a tiny server component wrapper) pointing to `/sandboxlive/readiness` so facilitators can find it during Assessment — **without** breaking the existing Stitch fixture path.

### 2.3 Design and tokens

- Canonical spec: **`docs/design/DESIGN.md`**.  
- Authenticated SandboxLive register: **`docs/design/AUTHENTICATED_HOME_REGISTER.md`** and existing SandboxLive pages (e.g. `active-engagement-home.tsx`, phase pages) — **match that tone and Tailwind patterns**.  
- **No raw hex palette objects** in components for structure (the artifact’s `C = { paper: '#faf6ee', ... }` pattern is a **don’t**). Use **semantic tokens** (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-card`, `bg-primary`, etc.) and existing primitives where possible (`src/components/primitives/**`, `src/components/ui/**`).  
- **`<em>` for Instrument Serif** emphasis is acceptable where the root layout already loads display serif for emphasis; follow existing global `globals.css` rules — do not add a second competing type stack.

### 2.4 Data ownership and privacy

- Submissions contain **PII** (name, email, role). They must be **scoped to `organization_id`** and **owned by the authenticated `user_id`**.  
- **Draft autosave** may use **localStorage** keyed by org + user + survey version, *or* a nullable `draft_json` column — pick one; document in code comment. Prefer **server draft** only if you already have a pattern; otherwise **localStorage + submit to server** is acceptable to ship faster **provided** drafts are not considered durable records.  
- **Admin aggregation** must **not** be a client passcode. Options (pick **one**, simplest that matches repo patterns):  
  - **A (preferred if time):** reuse existing **staff / admin** route patterns and membership checks (search `src/app/(dashboard)/admin` and related auth).  
  - **B:** export via **server-only** API restricted to org **owners** or a named permission flag if one exists.  
  If no clear admin pattern exists, ship **per-user “view my submission”** + **CSV export self-serve for org admins** behind the same gate you introduce — **do not** ship pass-in-URL secrets.

### 2.5 Six-layer chain (CLAUDE.md)

Types flow **downstream**. If you add persisted data:

1. **`src/lib/db/schema.ts`** — source of truth table(s).  
2. Run **`pnpm drizzle:gen`** (or project’s documented migration flow).  
3. Regenerate affected layers per **`pnpm generate:schemas|services|routes|hooks`** only if this repo’s pipeline expects it for new tables; otherwise implement a **thin service** returning `Result<T>` and a **Route Handler** or **Server Action** — but **do not** hand-patch generated files if the repo standard is regenerate.

If you only use **Server Actions + Drizzle** without new generated hooks, that is acceptable **only** if you document why and keep validation in **Zod** next to the action.

---

## 3. Definition of Done (observable)

The feature is **done** when all of the following are true:

1. **`GET /sandboxlive/readiness`** (with `?org=` when active org is switched) renders the **full multi-step flow** with the **same section coverage** as the artifact: About you, Work week, Tech stack, AI experience, Sentiment, Ministry & ethics, How you learn, Goals & wishes — **same question ids** where possible for downstream CSV compatibility.  
2. **Required-field validation** matches intent: required questions from the artifact stay required; optional stay optional. **Sliders** behave sensibly (defaults, suffixes, left/right labels). **Likert** is 1–5. **Multi** toggles work.  
3. **Submit** persists a **durable row** (not `window.storage`) with **organization_id**, **user_id**, **submitted_at**, and **answers JSON** (or normalized columns if you justify it — JSON is fine v1).  
4. **One submission per user per org** is enforced **or** explicitly versioned — pick one behavior and implement consistently (document in PR-style note at bottom of your work). Default recommendation: **upsert**: latest submission wins, with `updated_at`.  
5. **SandboxLive home** links to the intake in plain language (“Staff readiness check-in” or similar).  
6. **No secrets in client bundles** — search the built output mentally: no passcodes, no service keys.  
7. **Accessibility:** keyboardable controls, visible focus, `label`/`htmlFor` on inputs, error text associated with fields.  
8. **`pnpm typecheck`** and **`pnpm lint`** pass. Add **`pnpm test:run`** coverage for **pure helpers** (e.g. CSV builder, validation reducer) if you extract them.  
9. **Copy** is **org-agnostic** by default (say “your organization” / “your cohort”). Optional: if `organizations.slug === 'youthfront'` (see `YOUTHFRONT_ORG_SLUG` in `src/lib/legal/agreement-catalog.ts`), you may swap **display name** only — **no** Youthfront-only routes.

---

## 4. Execution plan (step-by-step — follow in order)

### Step 0 — Recon (read-only, ≤15 minutes)

1. Read **`src/app/(dashboard)/sandboxlive/layout.tsx`** — understand entitlement guard.  
2. Read **`src/lib/sandboxlive/phase-manifest.ts`** — confirm Phase 02 naming.  
3. Skim **`docs/design/AUTHENTICATED_HOME_REGISTER.md`** and one phase page **`src/app/(dashboard)/sandboxlive/phase/[slug]/page.tsx`**.  
4. Find how other features resolve **`organizationId`** from session + `?org=` (pattern in SandboxLive pages). **Reuse** that helper/service — no new ad-hoc parsing.

### Step 1 — Data model

1. Add a table, e.g. `sandbox_staff_readiness_submissions` (name may vary but must be descriptive):  
   - `id` (uuid, pk)  
   - `organization_id` (fk → organizations, indexed)  
   - `user_id` (fk → user_profiles or canonical user table used elsewhere, indexed)  
   - `answers` (jsonb) — validated on write with Zod  
   - `created_at`, `updated_at`  
   - Unique constraint **`(organization_id, user_id)`** if “latest wins” — or omit if you version.  
2. **RLS**: enable RLS; policies must allow **select/insert/update** only for rows where **`auth.uid()` maps to that user** and the user is a **member of that org** — mirror patterns from similar tables (search schema for `policy` examples). If RLS is too large for the slice, **stop** and use the repo’s documented security approach — **never** leave wide-open client writes.  
3. Generate migration via **`pnpm drizzle:gen`** (or project-standard script).

### Step 2 — Types and validation

1. Extract **`SECTIONS`** into a **data module** under e.g. `src/lib/sandboxlive/readiness-intake-sections.ts` exporting typed `SECTIONS` + a `Question` discriminated union (`type: 'text' | 'textarea' | ...'`).  
2. Build **`ReadinessAnswersSchema`** (Zod) that validates **answers object** keyed by question id — **strip unknown keys** or **passthrough** consistently.  
3. Ensure slider defaults match the artifact’s UX expectations.

### Step 3 — Server write path

1. Implement **`submitReadinessIntake`** (name flexible) as a **Server Action** *or* **`POST /api/...`** Route Handler — whichever matches nearby SandboxLive features.  
2. Validate session, resolve **org id**, validate body with Zod, write with Drizzle inside **`try/catch`**; return structured errors for the UI.  
3. **Do not** log full answers to console in production code.

### Step 4 — UI composition

1. Create **`src/app/(dashboard)/sandboxlive/readiness/page.tsx`** as a **Server Component** shell that passes `organizationId`, `orgSlug`, `orgQuery`, and “existing submission if any” into a **client** wizard component.  
2. Client component lives e.g. **`src/components/sandboxlive/readiness-intake-wizard.tsx`** with `"use client"`.  
3. Rebuild UI states: `welcome | section | submitting | done` — drop **`admin`** from v1 **unless** Step 0 found a clear admin framework you can reuse in the same PR without passcodes.  
4. Replace artifact **`PillButton`** styling with **`Button`** from `src/components/ui/button.tsx` or primitives — match SandboxLive, not neon custom CSS.  
5. **Progress bar** and **section headers** should reuse editorial typography classes from SandboxLive (`editorialHome` or phase header patterns).

### Step 5 — Navigation wiring

1. **`ActiveEngagementHome`**: add link to `/sandboxlive/readiness${orgQuery}` with one sentence of context.  
2. **Phase 02 page**: optional `Link` under the hero when `slug === '02-assessment'` — copy: e.g. “Individual readiness check-in (10–12 minutes)”.

### Step 6 — Post-submit UX

1. Thank-you state references training design use — **no** promise of specific dates unless sourced from DB (don’t invent).  
2. If submission exists on load, show **“You already submitted — view / update”** per the upsert decision.

### Step 7 — Verification (run and fix)

```bash
pnpm typecheck
pnpm lint
pnpm test:run   # if you added tests
```

Manual smoke:

1. Log in as a user with Sandbox entitlement.  
2. Open `/sandboxlive/readiness?org=<slug>`.  
3. Complete flow; confirm row in DB (Drizzle Studio / SQL).  
4. Confirm non-member cannot read others’ rows (RLS).

---

## 5. Guardrails (explicit don’ts)

- **Do not** port `window.storage` or reference it.  
- **Do not** ship `ADMIN_PASSCODE` or any **client-side** admin gate.  
- **Do not** add this to public `(site)` routes.  
- **Do not** use raw **`bg-white` / `text-gray-500` / arbitrary hex`** for layout semantics — use **tokens** (`DESIGN.md`).  
- **Do not** widen scope to “build a whole LMS”; this prompt is **only** the intake + persistence + SandboxLive entry points.  
- **Do not** modify Drizzle schema for unrelated tables “while you’re here.”

---

## 6. Iteration and tradeoffs

| If blocked by… | Then… |
|----------------|--------|
| RLS complexity | Pair with existing org-membership helper; copy policy shape from nearest similar table. |
| No admin story | Ship **self + export** only; document follow-up for org-wide analytics. |
| Stitch Phase 02 conflict | Keep Stitch; readiness is a **sidebar** link, not a replacement fixture. |

**When to ask the human:** only if **RLS or org resolution** has no exemplar in schema after search — then ask **one** pointed question with file candidates.

---

## 7. Acceptance checklist (executor self-signoff)

- [ ] Route lives at **`/sandboxlive/readiness`** under dashboard layout.  
- [ ] Questionnaire parity with artifact **sections and ids**.  
- [ ] Persisted submission **scoped by org + user**.  
- [ ] Home + (optional) Phase 02 links.  
- [ ] **typecheck** + **lint** clean.  
- [ ] **No client secrets**; **no `window.storage`**.  
- [ ] **Token-first** styling per `DESIGN.md` / authenticated register.

---

## 8. Source index (internal)

| Topic | Location |
|-------|-----------|
| SandboxLive layout / guard | `src/app/(dashboard)/sandboxlive/layout.tsx` |
| Phase list + Assessment slug | `src/lib/sandboxlive/phase-manifest.ts` |
| SandboxLive home UI | `src/components/sandboxlive/active-engagement-home.tsx` |
| Phase page router | `src/app/(dashboard)/sandboxlive/phase/[slug]/page.tsx` |
| Youthfront org slug constant | `src/lib/legal/agreement-catalog.ts` (`YOUTHFRONT_ORG_SLUG`) |
| Design canon | `docs/design/DESIGN.md` |
| Authenticated register | `docs/design/AUTHENTICATED_HOME_REGISTER.md` |
| Repo commands | `CLAUDE.md` (root) |

---

## 9. Changelog

| Date | Change |
|------|--------|
| 2026-05-14 | Initial prompt — ports Artifact spec into SandboxLive with production persistence and security bar. |
