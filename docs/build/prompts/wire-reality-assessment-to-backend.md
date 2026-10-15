# Build Prompt — Wire the Reality Assessment to the Backend

**Goal.** Wire the newly migrated Reality Assessment surface (`/assessment`, `/assessment/predict`, `/assessment/answer`, `/assessment/results`) end-to-end to the backend through the seven-tier type safety chain. Replace client-only component state (`src/components/mv/assessment/assessment-views.tsx`) and hardcoded sample results with durable Supabase Postgres storage, leader prediction sealing, anonymous contributor answer collection, live response aggregation, and the unsealing of the reality gap at 5 or more contributors.

**Read first:**
- [docs/architecture/TYPE_SAFETY_CHAIN.md](../../architecture/TYPE_SAFETY_CHAIN.md) — The seven-tier chain, Supabase MCP integration, and schema-change waterfall.
- [docs/type/README.md](../../type/README.md) — Layer documentation and lock-before-proceed validation commands.
- [docs/handoff/assessment-new/README.md](../../handoff/assessment-new/README.md) — Front-end architecture, states, and fixture seams.
- [src/components/mv/assessment/questions.ts](../../../src/components/mv/assessment/questions.ts) — The 8-question Youthfront model definition.
- [src/components/mv/assessment/assessment-views.tsx](../../../src/components/mv/assessment/assessment-views.tsx) — Start form and interactive prediction/answer flows.
- [src/components/mv/assessment/assessment-static.tsx](../../../src/components/mv/assessment/assessment-static.tsx) — Explainer and results rendering.

---

## 1. Architectural Guardrails

- **Additive & Non-Destructive.** All database DDL must use `CREATE TABLE IF NOT EXISTS`, safe indexes, and non-destructive foreign keys. Never drop or rename existing tables or columns.
- **Shared Production Database.** Supabase project `vhaiiiykcukrlyvwlgip` is shared across three repositories. Always inspect with **Supabase MCP** (`.mcp.json`) before executing migrations.
- **Privacy & Sealing Rules:**
  - **Prediction Sealing:** Leader predictions are sealed at the moment of completion and stored securely; they are **never** returned to contributors on the `/assessment/answer` screen.
  - **The 5-Contributor Threshold:** Aggregate results and reality gap charts (`/assessment/results`) unlock **only** when at least 5 staff/contributors have submitted answers. Below 5, the waiting screen displays the live count (e.g. "3 of 5 needed to unlock results") with a sample data preview toggle.
  - **Contributor Anonymity:** Contributor answers are stored without requiring individual identities or emails, guaranteeing candid feedback.
  - **Organization Name Interpolation:** The typed organization name dynamically replaces template tokens ("your organization") in question prompts.

---

## 2. Phase 0 — Pre-flight Baseline

1. Confirm all repository gates are green:
   ```bash
   pnpm db:check
   pnpm validate:all
   pnpm typecheck
   ```
2. Verify Supabase MCP connection to project `vhaiiiykcukrlyvwlgip`.

---

## 3. Phase 1 — Ground 0: Supabase DDL Migration

Execute the following additive migration using Supabase MCP (or via tracked SQL file `scripts/sql/20261015_reality_assessment_schema.sql`):

```sql
-- 1. Assessment Sessions (one per organization assessment run)
CREATE TABLE IF NOT EXISTS "reality_assessment_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "organization_name" text NOT NULL,
  "organization_type" text NOT NULL DEFAULT 'Nonprofit',
  "organization_id" uuid REFERENCES "organizations"("id") ON DELETE SET NULL,
  "leader_email" text NOT NULL,
  "leader_token" text UNIQUE NOT NULL,
  "contributor_token" text UNIQUE NOT NULL,
  "status" text NOT NULL DEFAULT 'in_progress', -- 'in_progress' | 'sealed' | 'completed'
  "predictions_sealed_at" timestamp with time zone,
  "target_contributor_count" integer DEFAULT 10,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_reality_assessment_sessions_leader_token" 
  ON "reality_assessment_sessions"("leader_token");
CREATE INDEX IF NOT EXISTS "idx_reality_assessment_sessions_contributor_token" 
  ON "reality_assessment_sessions"("contributor_token");

-- 2. Leader Predictions (8 question Likert predictions)
CREATE TABLE IF NOT EXISTS "reality_assessment_predictions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "reality_assessment_sessions"("id") ON DELETE CASCADE,
  "predictions" jsonb NOT NULL, -- { [questionId: number]: number } (1-5 Likert scale)
  "sealed" boolean NOT NULL DEFAULT true,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_reality_assessment_predictions_session" 
  ON "reality_assessment_predictions"("session_id");

-- 3. Contributor Responses (anonymous answers to the 8 questions)
CREATE TABLE IF NOT EXISTS "reality_assessment_responses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "reality_assessment_sessions"("id") ON DELETE CASCADE,
  "answers" jsonb NOT NULL, -- { [questionId: number]: number } (1-5 Likert scale)
  "respondent_role" text, -- optional role context (e.g. 'staff', 'volunteer')
  "submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_reality_assessment_responses_session" 
  ON "reality_assessment_responses"("session_id");

-- 4. Assessment Invitations
CREATE TABLE IF NOT EXISTS "reality_assessment_invites" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "session_id" uuid NOT NULL REFERENCES "reality_assessment_sessions"("id") ON DELETE CASCADE,
  "email" text NOT NULL,
  "sent_at" timestamp with time zone DEFAULT now() NOT NULL,
  "completed_at" timestamp with time zone
);
```

---

## 4. Phase 2 — Layer 1: Drizzle Schema Integration

Add the table definitions to `src/lib/db/schema.ts`:
- Define `realityAssessmentSessions`, `realityAssessmentPredictions`, `realityAssessmentResponses`, and `realityAssessmentInvites`.
- Use `id()`, `createdAt()`, `updatedAt()` helpers.
- Run validation:
  ```bash
  pnpm db:check
  ```
  Must output `status: "LOCKED"`.

---

## 5. Phase 3 — Layer 2: Zod Schemas & Domain Types

1. Regenerate Zod schemas:
   ```bash
   pnpm generate:schemas && pnpm contracts:check
   ```
2. In `src/lib/schemas/assessment.ts` (or domain schema file), define and export:
   - `StartAssessmentSchema` (`{ organization_name, organization_type, email }`)
   - `SubmitPredictionsSchema` (`{ leader_token, predictions: Record<number, number> }`)
   - `SubmitAnswersSchema` (`{ contributor_token, answers: Record<number, number>, respondent_role? }`)
   - `AssessmentResultsResponseSchema` (`{ session, stats, gapData, isSample }`)

---

## 6. Phase 4 — Layer 3: Reality Assessment Service

Create `src/lib/services/assessment/reality-assessment.service.ts`:
- **`startAssessment(input: StartAssessmentInput): Promise<Result<AssessmentSessionTokens>>`**
  - Generates secure random UUIDs for `leader_token` and `contributor_token`.
  - Inserts session into `reality_assessment_sessions`.
  - Dispatches email to leader with their personal prediction link and team invite link.
- **`sealPredictions(leaderToken: string, predictions: Record<number, number>): Promise<Result<void>>`**
  - Verifies session exists and is unsealed.
  - Inserts into `reality_assessment_predictions`.
  - Updates session `status = 'sealed'` and `predictions_sealed_at = now()`.
- **`submitContributorAnswers(contributorToken: string, answers: Record<number, number>): Promise<Result<void>>`**
  - Verifies session exists.
  - Inserts into `reality_assessment_responses`.
- **`getAssessmentStatus(token: string): Promise<Result<AssessmentStatusPayload>>`**
  - Returns session organization name, status, and the current response count.
- **`getAssessmentResults(token: string): Promise<Result<AssessmentResultsPayload>>`**
  - Calculates average contributor score per question.
  - Checks if response count $< 5$:
    - If $< 5$, returns `{ unlocked: false, count, threshold: 5, sampleData: SAMPLE_RESULTS }`.
    - If $\ge 5$, computes gap score ($|\text{leader} - \text{contributor}|$ for each of the 8 questions) and returns unsealed reality metrics.

---

## 7. Phase 5 — Layer 4: API Endpoints

Create the API routes under `src/app/api/assessment/`:
1. `POST /api/assessment/start`
   - Validates organization name & email.
   - Creates session and returns `{ leaderToken, contributorToken }`.
2. `POST /api/assessment/predict`
   - Validates leader token & 8 predictions; seals predictions.
3. `POST /api/assessment/answer`
   - Validates contributor token & 8 answers; records response.
4. `GET /api/assessment/results?token=[token]`
   - Returns live results if $\ge 5$ responses, or locked status with sample preview if $< 5$.
5. `POST /api/assessment/invite`
   - Dispatches email invitations to staff with the contributor answer link.

---

## 8. Phase 6 — Layer 5: React Hooks

Create `src/hooks/assessment/use-reality-assessment.ts`:
- `useStartAssessment()` — Mutation hook for starting the assessment.
- `useSealPredictions()` — Mutation hook for submitting leader predictions.
- `useSubmitContributorAnswers()` — Mutation hook for contributor flow.
- `useAssessmentResults(token: string)` — Query hook with polling (`refetchInterval: 5000` while waiting for 5 contributors).

---

## 9. Phase 7 — Layer 6: UI Component Wiring

Update `src/components/mv/assessment/assessment-views.tsx` and `assessment-static.tsx`:
1. **Start Screen (`AssessmentStart`):**
   - Connect submit handler to `useStartAssessment`.
   - On success, redirect to `/assessment/predict?token={leaderToken}&org={encodedOrg}`.
2. **Prediction Flow (`AssessmentPredictFlow`):**
   - Save selections in local state as leader progresses through the 8 questions.
   - On final submit ("Seal your predictions"), call `useSealPredictions`.
   - On seal, transition into the "Waiting for five" screen.
3. **Waiting Screen:**
   - Display live count (`{responseCount} of 5 required to unseal`).
   - Copyable team invitation link (`/assessment/answer?token={contributorToken}`).
4. **Contributor Answer Screen (`AssessmentAnswerFlow`):**
   - Render the 8 questions populated with `{organizationName}`.
   - On completion, submit via `useSubmitContributorAnswers` and display completion confirmation.
5. **Results Screen (`AssessmentResults`):**
   - Render real comparison charts when unlocked; maintain sample indicator badge when previewing sample data.

---

## 10. Acceptance & Validation Gates

1. `pnpm db:check` → LOCKED
2. `pnpm validate:all` → All layers pass
3. `pnpm typecheck` → 0 errors
4. End-to-end flow test:
   - Start assessment with org name "Acme Outreach" & email.
   - Complete 8 leader predictions → sealed in Postgres.
   - Open contributor link in second browser tab → submit answer.
   - Observe live count increment from 0 → 1.
   - Submit 4 additional contributor answers → results automatically unseal.
