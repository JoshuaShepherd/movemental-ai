# Build Prompt — Wire the Resolution Surface to the Backend

**Goal.** Wire the Resolution surface (`/resolve`, `/resolve/document`, `/resolve/people`, `/resolve/others`, `/r/[token]`) end-to-end to the backend through the seven-tier type safety chain. Replace device-only `localStorage` storage (`src/components/mv/resolve/draft.ts`) with durable Supabase Postgres persistence, multi-tenant organization scoping, email-based magic-link saving, revocable share tokens, invitation distribution, and privacy-preserving 5-contributor aggregation rules.

**Read first:**
- [docs/architecture/TYPE_SAFETY_CHAIN.md](../../architecture/TYPE_SAFETY_CHAIN.md) — The seven-tier chain, Supabase MCP integration, and schema-change waterfall.
- [docs/type/README.md](../../type/README.md) — Layer documentation and lock-before-proceed commands.
- [docs/handoff/resolve-new/SCHEMA-REQUEST.md](../../handoff/resolve-new/SCHEMA-REQUEST.md) — The schema request and privacy rules from slice `S02-resolve-new`.
- [docs/handoff/resolve-new/README.md](../../handoff/resolve-new/README.md) — Front-end architecture, states, and fixture seams.
- [src/components/mv/resolve/draft.ts](../../../src/components/mv/resolve/draft.ts) — The client-side draft model and fixture seam to wire.

---

## 1. Architectural Guardrails

- **Additive & Non-Destructive.** All database DDL must use `CREATE TABLE IF NOT EXISTS`, safe indexes, and non-destructive foreign keys. Never drop or rename existing tables or columns.
- **Shared Production Database.** Supabase project `vhaiiiykcukrlyvwlgip` is shared across three repositories (`movemental-ai`, `alan-hirsch`, `movemental-visual-editor-main`). Always inspect with **Supabase MCP** (`.mcp.json`) before executing migrations.
- **Seven-Tier Type Safety Flow (Downstream Only):**
  1. Supabase Postgres 17 (Ground 0)
  2. Drizzle Schema in `src/lib/db/schema.ts` (Layer 1)
  3. Zod Schemas in `src/lib/schemas/` (Layer 2)
  4. Services with `Result<T>` error handling (Layer 3)
  5. API Routes in `src/app/api/` (Layer 4)
  6. TanStack React Query Hooks in `src/hooks/` (Layer 5)
  7. UI Components in `src/components/mv/resolve/` (Layer 6)
- **Privacy & Database Enforcement Rules (from `SCHEMA-REQUEST.md`):**
  - **The 5-Contributor Threshold:** Grouped views (`/resolve/people`, org rollups) return zero aggregate statistics if fewer than five contributors have completed a resolution for that organization.
  - **Typed Organization Name Isolation:** A typed organization name (`org_label`) is purely free text and never auto-joins or adds a resolution to an existing verified organization's counts without a claim/link.
  - **Selection Privacy:** Inviters can see status (`written`, `not yet`, `prefers not to say`), but NEVER the invitee's individual ticked selections.
  - **Revocable Tokens:** Share tokens (`/r/[token]`) and invitation tokens must be individually revocable.
  - **Passwordless:** Sign-in and save via emailed magic link; no passwords.

---

## 2. Phase 0 — Pre-flight Validation

1. Verify clean repository baseline:
   ```bash
   pnpm db:check
   pnpm validate:all
   pnpm typecheck
   ```
   All commands must exit code 0.
2. Confirm Supabase MCP connectivity via `.mcp.json` to project `vhaiiiykcukrlyvwlgip`.

---

## 3. Phase 1 — Ground 0: Supabase DDL Migration

Apply the following additive migration using Supabase MCP (or via a tracked SQL migration script `scripts/sql/20261015_resolutions_schema.sql`):

```sql
-- 1. Statements: canonical text reference for agreement counting
CREATE TABLE IF NOT EXISTS "resolution_statements" (
  "id" text PRIMARY KEY,
  "theme" text NOT NULL,
  "position" integer NOT NULL,
  "text" text NOT NULL,
  "edition_override" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- 2. Core Resolutions table (one per person per organization)
CREATE TABLE IF NOT EXISTS "resolutions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "person_id" uuid REFERENCES "user_profiles"("id") ON DELETE SET NULL,
  "email" text,
  "org_type" text NOT NULL DEFAULT 'Nonprofit',
  "org_label" text NOT NULL,
  "organization_id" uuid REFERENCES "organizations"("id") ON DELETE SET NULL,
  "visibility" text NOT NULL DEFAULT 'private', -- 'private' | 'link' | 'public'
  "share_token" text UNIQUE,
  "share_token_revoked" boolean NOT NULL DEFAULT false,
  "research_consent" boolean NOT NULL DEFAULT false,
  "count_in_org" boolean NOT NULL DEFAULT true,
  "display_name" text,
  "role_text" text,
  "org_role" text DEFAULT 'served', -- 'staff' | 'board' | 'volunteer' | 'member' | 'served'
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_resolutions_org_id" ON "resolutions"("organization_id");
CREATE INDEX IF NOT EXISTS "idx_resolutions_share_token" ON "resolutions"("share_token");
CREATE INDEX IF NOT EXISTS "idx_resolutions_email" ON "resolutions"("email");

-- 3. Resolution Versions: immutable history of every saved iteration
CREATE TABLE IF NOT EXISTS "resolution_versions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "resolution_id" uuid NOT NULL REFERENCES "resolutions"("id") ON DELETE CASCADE,
  "version" integer NOT NULL DEFAULT 1,
  "selections" jsonb NOT NULL DEFAULT '{}'::jsonb, -- ticks, stars, skipped
  "hardest_theme" integer,
  "acts" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "two_minutes" text,
  "lines" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_resolution_versions_resolution" ON "resolution_versions"("resolution_id", "version" DESC);

-- 4. Resolution Invitations
CREATE TABLE IF NOT EXISTS "resolution_invitations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "inviter_id" uuid REFERENCES "user_profiles"("id") ON DELETE SET NULL,
  "inviter_email" text NOT NULL,
  "invitee_email" text NOT NULL,
  "organization_label" text NOT NULL,
  "organization_id" uuid REFERENCES "organizations"("id") ON DELETE SET NULL,
  "note" text,
  "token" text UNIQUE NOT NULL,
  "status" text NOT NULL DEFAULT 'pending', -- 'pending' | 'written' | 'declined'
  "status_visible_to_inviter" boolean NOT NULL DEFAULT true,
  "sent_at" timestamp with time zone DEFAULT now() NOT NULL,
  "accepted_at" timestamp with time zone,
  "reminded_at" timestamp with time zone
);

CREATE INDEX IF NOT EXISTS "idx_resolution_invitations_token" ON "resolution_invitations"("token");
CREATE INDEX IF NOT EXISTS "idx_resolution_invitations_invitee" ON "resolution_invitations"("invitee_email");
```

---

## 4. Phase 2 — Layer 1: Drizzle Schema Definition

Add the table definitions to `src/lib/db/schema.ts` matching the DDL:
- Declare `resolutionStatements`, `resolutions`, `resolutionVersions`, `resolutionInvitations`.
- Use the standard column helpers: `id()`, `createdAt()`, `updatedAt()`.
- Validate Layer 1:
  ```bash
  pnpm db:check
  ```
  Must output `status: "LOCKED"`.

---

## 5. Phase 3 — Layer 2: Zod Schemas & Inferred Types

1. Regenerate Zod schemas:
   ```bash
   pnpm generate:schemas && pnpm contracts:check
   ```
2. In `src/lib/schemas/resolution.ts` (or domain schema module), export domain-specific input/output schemas:
   - `SaveResolutionInputSchema`
   - `ResolutionShareResponseSchema`
   - `ResolutionPeopleAggregateSchema`
   - `SendInvitationInputSchema`

---

## 6. Phase 4 — Layer 3: Resolution Business Logic Service

Create `src/lib/services/resolutions/resolution.service.ts`:
- **Methods:**
  - `saveResolution(input: SaveResolutionInput): Promise<Result<SavedResolutionResult>>`
    - Inserts or updates the `resolutions` row.
    - Appends a new `resolution_versions` record.
    - Generates a cryptographically secure `share_token` if visibility is `'link'` or `'public'`.
    - If email is provided, dispatches an authentication magic link via Resend.
  - `getByShareToken(token: string): Promise<Result<SharedResolutionView>>`
    - Checks `share_token_revoked == false`.
    - Returns latest version's lines, display name, and role text without leaking internal user IDs.
  - `getOrganizationPeopleSummary(orgId: string | null, orgLabel: string): Promise<Result<PeopleSummary>>`
    - Enforces the **5-Contributor Threshold**:
      ```typescript
      const contributorCount = await getContributorCount(orgId, orgLabel);
      if (contributorCount < 5) {
        return Ok({
          unlocked: false,
          contributorCount,
          threshold: 5,
          message: "Grouped views unlock when 5 or more people contribute.",
          themes: [],
          roles: []
        });
      }
      ```
  - `createInvitation(input: CreateInvitationInput): Promise<Result<InvitationResult>>`
    - Creates `resolution_invitations` record with random token.
    - Sends invitation email with link `/resolve?invite={token}`.

---

## 7. Phase 5 — Layer 4: API Endpoints

Implement the REST endpoints under `src/app/api/resolve/`:
1. `POST /api/resolve/save`
   - Validates input with Zod.
   - Saves resolution & version; sets session cookie or triggers email link.
2. `GET /api/r/[token]`
   - Public/unlisted endpoint returning sanitized shared resolution content.
3. `GET /api/resolve/people?org=[slug_or_label]`
   - Returns aggregated statistics if $\ge 5$ contributors, or count-only waiting payload if $< 5$.
4. `POST /api/resolve/invite`
   - Rate-limited endpoint to send resolution invites to colleagues.

---

## 8. Phase 6 — Layer 5: React Hooks

Create `src/hooks/resolutions/use-resolution.ts`:
- `useSaveResolution()` — TanStack mutation hook calling `/api/resolve/save`, invalidating local queries.
- `useSharedResolution(token: string)` — TanStack query hook for `/api/r/[token]`.
- `useResolutionPeople(org: string)` — TanStack query hook for aggregated people counts.
- `useSendResolutionInvite()` — Mutation hook for invitations.

---

## 9. Phase 7 — Layer 6: UI Component Wiring

Update `src/components/mv/resolve/draft.ts` and the view components:
1. **Hybrid Sync Strategy:**
   - Keep `useResolutionDraftStore` for instant local responsiveness and offline drafting.
   - On step changes and on `/resolve/review`, trigger `useSaveResolution()`.
   - When the user types their email on the save card, sync the full resolution to Postgres and update `saved: { email, at }`.
2. **Wire `/r/[token]`:**
   - Replace the mock view in `src/app/(new)/r/[token]/page.tsx` with live data fetched via `useSharedResolution`.
3. **Wire `/resolve/people`:**
   - Render the live contributor count.
   - If count $< 5$, display the "Waiting for five" privacy notice with sample preview toggle.
   - If count $\ge 5$, display real aggregated agreement percentages per theme.

---

## 10. Acceptance & Validation Gates

1. `pnpm db:check` → LOCKED
2. `pnpm validate:all` → All layers LOCKED/VALIDATED
3. `pnpm typecheck` → 0 errors
4. Playwright walkthrough:
   - Complete draft through all themes.
   - Save with email → record written to Postgres `resolutions` & `resolution_versions`.
   - Check `/r/[token]` in incognito window → renders live document.
   - Confirm 5-contributor threshold protects privacy on `/resolve/people`.
