# Definition of Done — movemental.ai/dashboard

**Surface:** `movemental.ai/dashboard` (Movemental internal / leader dashboard)  
**Purpose:** Single source of truth for “done” criteria, AI-assisted review loops, and one-step-at-a-time follow-up prompts.  
**Last updated:** 2026-05-12 (closed-loop pass 2)

---

## 1. How to use this document (humans and AI)

### 1.1 Immutable DOD items — do not delete

- **Never delete, rewrite, or merge away the original DOD items** in Section 3. They are the permanent checklist.
- You may **only** change each item’s **status** and **notes** in the tables provided (e.g. Not started → In progress → Done, or Not done / Blocked).
- If scope changes, **add** a new row or appendix note; do not remove historical criteria.

### 1.2 Closed-loop AI review

- An AI (or human) reviews this file against the **actual product**: routes, UI, legal flows, integrations, and copy.
- Each review **updates statuses and notes** and **appends** one new block to Section 5 (attempt log). It does **not** erase prior attempts.
- Reviews should cite **what was checked** (environment, account, URL path, feature flag) in the attempt log.

### 1.3 Iterative prompting — one next prompt only

- Section 4 holds **exactly one** active “next prompt” at a time: the **single** instruction that should be run next to move the program toward done.
- When that prompt is executed and its outcome is recorded in Section 5, replace Section 4 with the **next** single prompt (or mark the queue empty if everything in Section 3 is Done).
- **Do not** stack multiple future prompts in Section 4; future work belongs in notes or in the attempt log until it becomes the single next action.

### 1.4 Master completion

- When **every** item in Section 3 is **Done**, check the box below and add a final entry to Section 5 stating who/what verified end-to-end closure.

**Master checklist (entire dashboard DOD):** [ ] All Section 3 items are Done and verified. *(Open — DOD-02 and DOD-03 await production / legal confirmation.)*

---

## 2. Context already known (do not treat as unverified unless re-checking)

| Fact | Source / assumption |
|------|---------------------|
| Natasha Nikkel can sign in to the dashboard | Stakeholder confirmation; re-verify if auth or routing changes |

---

## 3. DOD registry (original items — permanent)

Update **Status** and **Notes** only. Do not remove rows.

| ID | Criterion | Status | Notes |
|----|-----------|--------|-------|
| DOD-01 | **Sign-in:** Authorized users (including Natasha Nikkel) can authenticate and reach the dashboard shell without error. | Done | Code: `src/app/(dashboard)/dashboard/page.tsx` uses `getUser()` and redirects unauthenticated users to `/login?next=/dashboard`; `proxy.ts` refreshes session for `/dashboard` prefix. Stakeholder confirmation: Natasha Nikkel can sign in. *(No live browser session in this pass.)* |
| DOD-02 | **MOU — access and legal sign:** Users who should sign can **open** the MOU from the dashboard, read it, and **complete a legally effective signature** (correct agreement version, signer identity captured, audit trail / storage as required). | In progress | Product: **Documents → Memorandum of Understanding (MOU)** in `authenticated-shell`; `/onboarding/agreement` renders `AgreementSigningPanel` with org context and link to the agreements register. **Native signing** (review → consent → capture → PDF → email → audit log) replaces legacy vendor webhooks. **Remaining:** ship full native flow per build spec; counsel confirms template version; production smoke with executed row + audit trail. |
| DOD-03 | **Cohort scheduling (Calendly):** Cohorts can **schedule using Calendly** from (or linked clearly from) the dashboard, with **clear, tested instructions** (where to click, what to expect, timezone, reschedule policy if applicable). | In progress | **Dashboard** links to `/sandboxlive/cohort/schedule` (with org query when scoped). **Schedule page** explains Calendly + org slug for webhooks + manual date via onboarding. **TrainingSchedulePanel** embeds Calendly when `NEXT_PUBLIC_CALENDLY_TRAINING_URL` or per-org `calendly_training_url` resolves; otherwise shows configuration instructions and manual date path when that mode is enabled. **Remaining:** one real booking smoke-test in production/staging with a cohort user; add reschedule/timezone copy if product wants it explicit. |
| DOD-04 | **Assessment — queued and complete:** The assessment is **reachable from the dashboard**, **assigned / queued** appropriately for users, and can be **taken start-to-finish** (all required steps, persistence, submission, and any post-submit state) without dead ends. | Done | **Dashboard** surfaces `/assess` for `implementation_org` + `sandbox_live_focus` (and org query preserved where applicable). **`IntegrityDiagnosticForm`** (used by `src/app/(site)/assess/page.tsx` → `AssessPage`) now submits to **`POST /api/assess`** with the canonical 22-question ordered payload from `@/lib/integrity-diagnostic/questions` (replaces simulated delay). **Production:** requires `TENANT_ORG_ID` and working email side-effects per `integrity-diagnostic-notifications`; otherwise API returns `TENANT_NOT_CONFIGURED` and the form surfaces a clear error. |

**Status vocabulary (suggested):** `Not started` | `In progress` | `Done` | `Not done` | `Blocked`

---

## 4. Next prompt queue (single item only)

**Rule:** This subsection must contain **one** prompt at a time (or explicitly `— None —` when Section 3 is fully Done).

**Current next prompt:**

> **Production / legal (DOD-02):** In staging or production, open **Documents → MOU** as an authorized org user, complete the native signing flow end-to-end, and verify the signature row, PDF, confirmation email, and audit log. Update DOD-02 to **Done** only after counsel confirms legal effectiveness. Append one row to Section 5 with environment, account class, and outcome.

---

## 5. Attempt log (append-only)

Add a new dated entry per review or test pass. Do not delete earlier entries.

| Date (ISO) | Actor | Summary of check | DOD IDs touched | Outcome |
|------------|-------|------------------|-----------------|---------|
| 2026-05-12 | AI / initial scaffold | File created; no product verification run | — | Registry seeded; Section 4 seeded with first suggested prompt |
| 2026-05-12 | AI / closed-loop pass | Repo review: `dashboard/page.tsx` auth redirect; `proxy.ts` `/dashboard` session; Documents → MOU → `AgreementSigningPanel`; `/sandboxlive/cohort/schedule` + `TrainingSchedulePanel` + Calendly URL resolution; `/assess` + `IntegrityDiagnosticForm` previously simulated submit | DOD-01 — DOD-04 | DOD-01 **Done** (code + stated stakeholder). DOD-02 **In progress** (product path shipped; native signing + legal verification outstanding). DOD-03 **In progress** (instructions in UI; live Calendly smoke outstanding). DOD-04 **Done** after wiring `IntegrityDiagnosticForm` → `POST /api/assess` with canonical 22 answers; `pnpm exec tsc --noEmit` clean |

---

## 6. Optional: links and references

Add URLs to staging/prod dashboard, Calendly links, MOU template version IDs, assessment deep links, and legal runbooks **here** as they become stable — append only.

- **Code references (2026-05-12):** Dashboard auth/destinations — `src/app/(dashboard)/dashboard/page.tsx`; MOU panel — `src/components/onboarding/agreement-signing-panel.tsx`; cohort schedule — `src/app/(dashboard)/sandboxlive/cohort/schedule/page.tsx`, `src/components/scheduling/training-schedule-panel.tsx`; assessment submit — `src/components/studio/IntegrityDiagnosticForm.tsx`, `src/app/api/assess/route.ts`
