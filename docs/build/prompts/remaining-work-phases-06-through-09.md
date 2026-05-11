# Movemental — remaining authenticated work (Phases 06–09 + deferred lifts)

**Status:** Phases 01–05 shipped. This document is the canonical prompt for everything that still needs to happen on the authenticated experience, factoring in the Stitch migration that landed mid-flight. Treat each section below as a self-contained PR prompt: a single Claude session can pick up any section and finish it, then the next session takes the next.

**Last verified facts** (recheck before charging into any phase — these decay):

- 45 Stitch templates exist as static HTML at `public/templates/<category>/<id>/index.html` with matching `screen.png` thumbnails, and validated by `tests/unit/program-fixtures-sync.test.ts`.
- One template lifted to React so far: `sandboxlive_dashboard_active_engagement_state` → [src/components/sandboxlive/active-engagement-home.tsx](../../../src/components/sandboxlive/active-engagement-home.tsx). 44 templates remain unlifted; most still render through `StitchDocumentView` (JSON-fixture view), which is visually sparse compared to the authored HTML.
- AuthenticatedShell is the single chrome ([src/components/authenticated/authenticated-shell.tsx](../../../src/components/authenticated/authenticated-shell.tsx)). It already strips itself on print (`print:hidden` on header + sidebar).
- Drizzle schema for `recipes`, `cohort_members`, `organizations.cohort_id`, `future_plans`, `future_plan_versions`, `future_plan_ratifications` is present but **no migrations have been applied**. The relevant pages all degrade gracefully when tables are missing.

---

## Global conventions — read before any phase

### Approach (locked in)

1. **Lift authored HTML into React** as the canonical migration path. The Stitch HTML at `public/templates/<id>/index.html` is the visual target; lift the `<main>` subtree, strip nav/sidebar/footer (the AuthenticatedShell provides them), translate MD3 tokens to canonical tokens, wire data from real services. See the token translation table below.
2. **Keep `safestart-*` tokens.** They are the canonical Stitch-surface token namespace. Do not retire them. Phase 08 documents the namespace; it does not remove tokens.
3. **Stitch designs are the source of truth for visual structure**, including where they diverge from the original pre-migration spec (e.g., Future Plan: 6 sections per Stitch design, not the 3-Lights model in the original spec). When in doubt, the authored design wins.
4. **No new product-shell chrome.** Every authenticated route renders inside AuthenticatedShell. If a surface needs a sidebar, add it to `src/lib/authenticated/product-context.ts`. Do not create per-segment `layout.tsx` files that introduce competing chrome.

### Token translation table (MD3 → canonical)

When lifting Stitch HTML, replace classes mechanically:

| Stitch (MD3) | Use |
|---|---|
| `bg-surface`, `bg-background`, `bg-[#FAF8F4]` | `bg-background` (warm cream paper) or `bg-card` (elevated) |
| `bg-surface-container`, `bg-surface-container-low` | `bg-section` |
| `bg-surface-container-high`, `bg-surface-container-highest` | `bg-elevated` or `bg-section` |
| `bg-inverse-surface` | `bg-movemental-midnight` (already in @theme) |
| `bg-primary text-on-primary` | `bg-foreground text-background` (ink-filled CTA) |
| `bg-primary-container` | `bg-section` |
| `text-primary`, `text-on-surface` | `text-foreground` |
| `text-on-surface-variant`, `text-on-primary` | `text-muted-foreground` (on light) / `text-white` (on midnight) |
| `text-outline-variant` | `text-muted-foreground` |
| `border-outline-variant`, `border-outline-variant/20` | `border-border-soft` |
| `border-outline` | `border-border` |
| `text-sandbox-amber`, `bg-sandbox-amber` | `text-pathway-accent`, `bg-pathway-accent` |
| `text-error`, `bg-error` | `text-[color:var(--destructive)]`, `bg-[color:var(--destructive)]` |
| `font-display`, `font-headline` | `font-serif` (resolves to Newsreader) |
| `font-body`, `font-label` | `font-sans` (resolves to Inter) — use `uppercase tracking-[0.1em]` for label spelling |
| `rounded-none` everywhere | drop the class (default radius is small; the design system already favors hairlines over rounding for these surfaces) |
| `material-symbols-outlined` icons | swap to `lucide-react` icons (consistent set, no CDN cost) |

### Don't destroy

Several routes exist that are *not* in scope for these phases. Do not delete or rename without explicit instruction:

- `/program`, `/program/safety/[templateId]`, `/program/sandbox/[templateId]` — still functional, used by staff for fixture browsing. The product shells (`/sandboxlive`, `/safestart`) are the customer surfaces; `/program` is the legacy index.
- `/agent-runtime` (staff studio) — gated, in active use.
- `/admin/onboarding` — staff onboarding console.
- `(site)/movement-leaders`, `(site)/voices` — public stub pages that delegate to Studio components. Phase 06's public surface plans land *alongside* these, not in place of them, until the user explicitly asks for replacement.
- The 11 onboarding placeholders — replace them in Phase 07 with real task UIs, but keep the segment keys (`organization_profile`, `images_upload`, etc.) intact so existing onboarding rows continue to resolve.

### Always do

- `pnpm typecheck` and `pnpm lint` after every phase. Zero errors. Existing 63 pre-existing warnings are fine.
- Use existing helpers: `createClient` from [src/lib/supabase/server.ts](../../../src/lib/supabase/server.ts), `resolveActiveOrganizationId` from [src/lib/services/onboarding/onboarding.service.ts](../../../src/lib/services/onboarding/onboarding.service.ts).
- Schema additions go in [src/lib/db/schema.ts](../../../src/lib/db/schema.ts) following the existing patterns (`id()`, `createdAt()`, `updatedAt()` helpers). Do **not** generate or push migrations — the user will run `pnpm drizzle:gen && pnpm drizzle:push` when ready. Pages must degrade gracefully when tables don't exist (try/catch in server helpers; pattern is in [src/lib/sandboxlive/engagement.server.ts](../../../src/lib/sandboxlive/engagement.server.ts)).
- Mark each phase as a separate PR. Commit and report at the end of each one before starting the next.

---

## Phase 06 — Movement Leader shell

**STATUS: BLOCKED on Stitch designs.** Do not begin lifting until Movement-Leader designs land in the Stitch repo and sync to `public/templates/`. There are currently **zero** Stitch templates for any Movement Leader / author / leader / reflected-understanding / voice / public-leader-page surface (verified post-migration). The repo has substantial research material at `docs/movement_leader_research/` but no authored UI.

### What "Stitch designs land" means for Phase 06

Watch for new manifest entries with these (or similar) IDs:

- `movement_leader_author_reflection_*` (the seven-section reflected understanding)
- `movement_leader_public_page_*` (the public `/movement-leaders/<slug>` layout)
- `movement_leader_application_*` (the public application form)
- `movement_voice_commitments_signing_*` (the signing flow)
- `admin_movement_leaders_*` (the staff admin surface)

When two or more of these arrive, this phase becomes unblocked. The build can start incrementally; each lifted surface becomes a PR.

### What to build when unblocked

The original spec lays out seven sections, multiple public surfaces, an application flow, and a substantial data model. The summary below replaces the spec only where the Stitch migration changes things; otherwise the original spec (in the build prompt that led to Phases 01–05) is the canonical source.

#### Routes

| Route | Segment | Notes |
|---|---|---|
| `/leader` | `(dashboard)/leader/page.tsx` | Author Reflection home — the seven-section view |
| `/leader/calling`, `/leader/work`, `/leader/voice`, `/leader/where-it-lives`, `/leader/network`, `/leader/gaps` | static sub-segments | Section deep-dives |
| `/leader/public-page` | static sub-segment | Preview + approval surface |
| `/leader/sign-commitments` | static sub-segment | Movemental Voice Commitments signing |
| `/leader/apply` | **`(site)/leader/apply/page.tsx`** | **Public route**. Add an exception in `proxy.ts` — see "proxy carve-out" below. |
| `/movement-leaders/[slug]` | `(site)/movement-leaders/[slug]/page.tsx` | Public leader page, rendered only when `public_page_published_at` is set |
| `/movement-voice-commitments` | `(site)/movement-voice-commitments/page.tsx` | Public commitments doc with appended signed-leader list |
| `/admin/leaders` | `(dashboard)/admin/leaders/page.tsx` | Staff admin |
| `/onboarding/leader/[step]` | new onboarding sub-flow | Leader-specific onboarding (see Phase 07 too) |

#### Proxy carve-out for `/leader/apply`

[proxy.ts](../../../proxy.ts) currently treats every path under `/leader` as authenticated chrome. Phase 06 needs `/leader/apply` to render with the public marketing chrome. Add an explicit exception:

```ts
const PUBLIC_LEADER_PATHS = new Set(["/leader/apply"]);

// inside proxy():
const isAuthenticatedLeaderPath =
  pathname.startsWith("/leader") && !PUBLIC_LEADER_PATHS.has(pathname);
```

Then update `AUTHENTICATED_PATH_PREFIXES` matching logic to honor the carve-out. The same pattern will be needed for any other `/<product>/apply`-style public sub-route in future phases.

#### Product context resolver

Add `/leader` to [src/lib/authenticated/product-context.ts](../../../src/lib/authenticated/product-context.ts):

```ts
if (pathname === "/leader" || pathname.startsWith("/leader/")) {
  return {
    productContext: "leader",
    sidebar: LEADER_SIDEBAR,
  };
}
```

Sidebar should mirror the seven sections + Public page + Sign commitments. AuthenticatedShell already supports `productContext: "leader"`.

#### Schema additions

Add to [src/lib/db/schema.ts](../../../src/lib/db/schema.ts):

```ts
export const movementLeaders = pgTable("movement_leaders", {
  id: id("id"),
  slug: text("slug").notNull().unique(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  photo_url: text("photo_url"),
  primary_role: text("primary_role"),
  primary_organization: text("primary_organization"),
  bio_short: text("bio_short"),
  bio_long: text("bio_long"),
  personal_piece: text("personal_piece"),
  // JSONB shape: identity, biography, theology, voice_analysis, calling_profile,
  // books, articles, audio, videos, frameworks, organizations, endorsements,
  // gap_analysis, reflected_understanding (markdown body).
  movement_leader_data: jsonb("movement_leader_data").notNull().default({}),
  reflected_understanding_endorsed_at: timestamp("reflected_understanding_endorsed_at", { withTimezone: true, mode: "string" }),
  public_page_approved_at: timestamp("public_page_approved_at", { withTimezone: true, mode: "string" }),
  public_page_published_at: timestamp("public_page_published_at", { withTimezone: true, mode: "string" }),
  status: text("status").notNull().default("pending"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const movementLeaderGenerated = pgTable("movement_leader_generated", {
  id: id("id"),
  leader_id: uuid("leader_id").notNull().references(() => movementLeaders.id, { onDelete: "cascade" }),
  section: text("section").notNull(),
  content: text("content").notNull(),
  generated_at: createdAt("generated_at"),
  model_version: text("model_version").notNull(),
});

export const leaderRevisionRequests = pgTable("leader_revision_requests", {
  id: id("id"),
  leader_id: uuid("leader_id").notNull().references(() => movementLeaders.id, { onDelete: "cascade" }),
  section: text("section").notNull(),
  requester_email: text("requester_email").notNull(),
  request_text: text("request_text").notNull(),
  status: text("status").notNull().default("open"),
  created_at: createdAt("created_at"),
  addressed_at: timestamp("addressed_at", { withTimezone: true, mode: "string" }),
});

export const movementLeaderSignings = pgTable("movement_leader_signings", {
  id: id("id"),
  leader_id: uuid("leader_id").notNull().references(() => movementLeaders.id, { onDelete: "cascade" }),
  document_slug: text("document_slug").notNull(), // e.g. "movement-voice-commitments"
  signed_at: createdAt("signed_at"),
  version_signed: text("version_signed").notNull(),
});

export const movementLeaderApplications = pgTable("movement_leader_applications", {
  id: id("id"),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  role: text("role"),
  why_leader: text("why_leader").notNull(),
  bio: text("bio").notNull(),
  photo_url: text("photo_url"),
  references: jsonb("references").notNull().default([]), // [{ name, email, relationship }, ...]
  status: text("status").notNull().default("pending"),
  reviewed_by_user_id: uuid("reviewed_by_user_id").references(() => userProfiles.id, { onDelete: "set null" }),
  reviewed_at: timestamp("reviewed_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
});
```

#### Corpus build script

Add `scripts/sync-leader-corpus.ts` that walks `docs/movement_leader_research/<slug>/` and writes a structured JSONB blob to `movement_leaders.movement_leader_data`. Run on demand (manual) and in CI on the leader-research branch. Existing research material is already at `docs/movement_leader_research/`; the script processes it but does not author it.

#### Authentication

Leader sign-in uses the same Supabase Auth flow. A row in `movement_leaders` matched on email gives that user "movement leader" context. **Don't** add a new auth provider. **Don't** put leader-status in the membership `role` field — leaders aren't org members. Match on `movement_leaders.email = user.email` in a server helper.

A user could be both a customer and a movement leader. AuthenticatedShell needs a "switch context" affordance in the top-right (next to org switcher). Treat that as a Phase 06 sub-task, gated on having both contexts.

#### What to lift vs invent

When Stitch designs land, lift them. Do not freehand visuals — wait for the authored layouts. The seven-section reflected-understanding view in particular has a specific editorial register that should match the rest of the platform; the existing teaching guide at `/dashboard/teaching/claude-skills` is a useful reference.

### Phase 06 deliverable checklist (when unblocked)

- [ ] Schema additions + degrade-gracefully server helper
- [ ] Proxy carve-out for `/leader/apply`
- [ ] Product context resolver entry for `/leader`
- [ ] Sidebar definition
- [ ] Author Reflection home `/leader` (lifted from Stitch)
- [ ] Section sub-routes (lifted)
- [ ] Public page preview at `/leader/public-page` (lifted)
- [ ] Public `/movement-leaders/[slug]` route (gated on `public_page_published_at`)
- [ ] Public `/movement-voice-commitments` doc with signed names
- [ ] `/leader/sign-commitments` flow (writes to `movement_leader_signings`)
- [ ] Public `/leader/apply` form (writes to `movement_leader_applications`)
- [ ] `/admin/leaders` staff console
- [ ] `scripts/sync-leader-corpus.ts`
- [ ] `/onboarding/leader/[step]` flow — see Phase 07
- [ ] Context switcher in AuthenticatedShell top-right (if user is both customer + leader)

---

## Phase 07 — Onboarding tail

**STATUS: READY.** This phase doesn't depend on Stitch templates (onboarding has no Stitch surfaces). It depends on existing UI patterns from the already-real onboarding steps.

### Current state (audited)

The onboarding task registry is at [src/lib/onboarding/state.ts](../../../src/lib/onboarding/state.ts). Routes flow through [src/app/(dashboard)/dashboard/onboarding/[step]/page.tsx](../../../src/app/(dashboard)/dashboard/onboarding/[step]/page.tsx) (a dispatch switch). The pattern is:

- Real steps render a dedicated task component
- Placeholder steps fall through to [`PlaceholderOnboardingStep`](../../../src/components/onboarding/placeholder-onboarding-step.tsx)

**Real today (5):** `sign_agreement`, `confirm_payment`, `choose_cohort` ([phase1-task-pages.tsx](../../../src/components/onboarding/phase1-task-pages.tsx)), `corpus_review` ([corpus-review-task-page.tsx](../../../src/components/onboarding/corpus-review-task-page.tsx)), `agent_test` ([agent-onboarding-task-page.tsx](../../../src/components/onboarding/agent-onboarding-task-page.tsx)).

**Placeholders to build (11):**

| Key | Phase | What it produces |
|---|---|---|
| `organization_profile` | identity | The org's profile row: legal name, mission, location, primary contact, AI-readiness self-rating |
| `images_upload` | identity | Logo + leader headshot uploaded to Supabase Storage; URLs persisted on the org row |
| `brand_guidelines` | identity | Optional brand voice notes saved as markdown on `organizations.settings.brand_guidelines` |
| `consent_block` | identity | Signed acknowledgment that AI work falls under the org's existing data policies — writes a `consent_records` row (table already exists) |
| `tax_form` | identity | W-9 / equivalent upload — Supabase Storage URL stored on the org. **Conditionally shown** when `organizations.settings.leader_payments_enabled` is true |
| `orientation` | identity | A short video/reading completion marker — toggle a boolean on completion |
| `affiliates_review` | content | Approve / decline the affiliates pre-list ingested via the corpus review pipeline |
| `themes_review` | content | Approve / decline content themes the AI has detected in the corpus |
| `platform_tour` | activation | An interactive tour stub — for now, a checklist of 5 areas the user has visited (Sandbox, Recipe Library, Cohort, Future Plan, Guidebook), auto-checked when they visit each |
| `cohort_prep` | activation | Pre-engagement reading: the Sandbox Field Guide download + a "I've read it" toggle |
| `final_confirmation` | activation | A reflective hand-off: "your cohort kickoff is on X. Here's where to go on day one." Writes the completion timestamp on the org's onboarding_state |

### Implementation pattern

Each task page should follow the structure of [corpus-review-task-page.tsx](../../../src/components/onboarding/corpus-review-task-page.tsx):

1. Wrap in `<OnboardingTaskShell>` ([src/components/onboarding/onboarding-task-shell.tsx](../../../src/components/onboarding/onboarding-task-shell.tsx)) — provides the editorial framing and "Mark complete" button
2. Substantive UI in the middle
3. Server action that:
   - Persists the substantive data (org settings, storage upload URL, consent row, etc.)
   - Calls `completeOnboardingTask({ taskKey, organizationId })` from [onboarding.service.ts](../../../src/lib/services/onboarding/onboarding.service.ts)
   - `revalidatePath("/welcome")` and `revalidatePath("/dashboard")` so the checklist updates

### Wire-up

For each step, replace the `PlaceholderOnboardingStep` dispatch in [src/app/(dashboard)/dashboard/onboarding/[step]/page.tsx](../../../src/app/(dashboard)/dashboard/onboarding/[step]/page.tsx) with a real component case. Components live in `src/components/onboarding/<task-key>-task-page.tsx`.

### Onboarding panel + checklist

[`OnboardingPanel`](../../../src/components/onboarding/onboarding-panel.tsx) and [`OnboardingChecklist`](../../../src/components/onboarding/onboarding-checklist.tsx) already render the multi-phase view; the "Coming soon" markers should fall away naturally once each step is real. Audit both files after the last step to remove any hard-coded "Coming soon" copy that doesn't read from the task state.

### Final hand-off

When `final_confirmation` completes, redirect customers to `/sandboxlive` (or `/safestart` depending on engagement type — read `organizations.settings.engagement_type`). The editorial framing: "Onboarding is done. The cohort work begins here." Movement leaders go to `/leader` after their separate flow (below).

### Leader onboarding flow (`/onboarding/leader/<step>`)

Separate from customer onboarding. Steps:

1. `confirm-bio` — review and edit `movement_leaders.bio_short` / `bio_long`
2. `upload-headshot` — Supabase Storage upload → `photo_url`
3. `personal-piece` — the leader's voice intro (~300 words), stored on `movement_leaders.personal_piece`
4. `review-reflected-understanding` — read the generated essay; flip `reflected_understanding_endorsed_at` on accept
5. `sign-commitments` — agree to and sign the Movemental Voice Commitments → row in `movement_leader_signings`
6. `review-public-page` — preview the public page; flip `public_page_approved_at`
7. `publish` — flip `public_page_published_at` and route to `/leader`

Each step uses the same `OnboardingTaskShell` pattern. The flow is **only** reachable for users whose email matches a `movement_leaders` row. Build behind a guard that redirects non-leaders to `/dashboard`.

This sub-section blocks on the same Stitch dependency as Phase 06. Customer onboarding (the 11 steps above) does **not** block — it ships on its own and is the higher-priority piece of Phase 07.

### Phase 07 deliverable checklist

- [ ] 11 real task UIs replace placeholders
- [ ] OnboardingChecklist + OnboardingPanel audited; no "Coming soon" left
- [ ] `final_confirmation` redirects appropriately
- [ ] Leader onboarding flow (gated on Phase 06 unblock)
- [ ] `pnpm typecheck` and `pnpm lint` clean

---

## Phase 08 — `safestart-*` namespace documentation (revised — keep, don't retire)

**STATUS: READY.** Tiny phase. The original Phase 08 plan was "retire safestart-* tokens." That decision was reversed during the post-migration review — the tokens are load-bearing for every Stitch-derived surface and for the static HTML in `public/templates/`. They stay. Phase 08 just documents the namespace clearly so future contributors don't try to retire them.

### What to do

1. Add a section to [docs/design/DESIGN.md](../../../docs/design/DESIGN.md) titled "Stitch-surface token namespace (`safestart-*`)" explaining:
   - These tokens (`safestart-bg`, `safestart-ink`, `safestart-hairline`, `safestart-muted`, `safestart-completed`, `safestart-surface-container`, plus `movemental-midnight`, `sandbox-sidebar*`, `pathway-accent`) are the **canonical** token namespace for Stitch-derived surfaces — every workspace at `/sandboxlive/*` and `/safestart/*` uses them
   - Why they exist as a parallel namespace to the Concept Modern tokens (warm cream + ink): they map directly to the MD3 tokens in the Stitch HTML, which is the visual source of truth for those surfaces
   - When to use them: any component lifted from a Stitch template, or any new authenticated-product surface that should match the Stitch register
   - When **not** to use them: marketing site, public pages, primitives, anything outside `/sandboxlive` and `/safestart`
   - Where they are defined: [src/app/globals.css](../../../src/app/globals.css), within the `@theme inline` block
2. Add a `/admin/design-tokens` staff-only reference page that renders every Stitch-surface token as a small swatch card (label + hex + class name). Renders inside AuthenticatedShell (general workspace). Useful when lifting templates — a contributor can verify their translation is using real tokens.
3. **Do not delete** any `safestart-*` definitions from `globals.css` or `tailwind.config.ts`.

### Phase 08 deliverable checklist

- [ ] DESIGN.md namespace section added
- [ ] `/admin/design-tokens` swatch page (staff-only via `isUserStaff` gate)

---

## Phase 09 — Duplicates + session-aware public chrome

**STATUS: READY.** Cleanup phase. Small surface area but several distinct fixes.

### A. Delete the `/dashboard/welcome` duplicate

[src/app/(dashboard)/dashboard/welcome/page.tsx](../../../src/app/(dashboard)/dashboard/welcome/page.tsx) re-exports `/welcome`. Delete the file. Grep for any internal links pointing to `/dashboard/welcome` and rewrite to `/welcome`.

### B. Remove `ShellTopLinks` from StitchDocumentView

In [src/components/stitch/stitch-document-view.tsx](../../../src/components/stitch/stitch-document-view.tsx), the `ShellTopLinks` component renders raw `<a href>` links from fixture data. These links point at Stitch-era paths that don't necessarily map to Next routes. With AuthenticatedShell providing consistent navigation, these are redundant and sometimes broken. Delete the component and its call site.

### C. Session-aware public navigation

Public marketing nav ([src/components/nav/site-header.tsx](../../../src/components/nav/site-header.tsx)) currently shows a "Start a Conversation" CTA for everyone. When the visitor is authenticated, swap it to a context-appropriate "Go to your dashboard →" affordance.

Implementation:

1. Make `SiteHeader` async (or wrap the CTA section in an async server component) — read the Supabase session on the server.
2. If `user` exists, check the user's contexts:
   - Has org memberships → "Go to your dashboard →" linking to `/dashboard`
   - Has a `movement_leaders` row matched on email → "Go to your Leader workspace →" linking to `/leader`
   - Has both → show both in a dropdown OR the most recently active one (read from a future `last_active_context` field on the user profile, or pick `/dashboard` as the default)
3. Unauthenticated visitors → unchanged behavior

### D. Audit and remove "Coming soon" lingerers

After Phase 07, sweep the codebase for any `"Coming soon"` literal strings that survive. Replace with real surfaces or remove the message entirely.

### Phase 09 deliverable checklist

- [ ] `/dashboard/welcome` deleted; internal links updated
- [ ] `ShellTopLinks` removed
- [ ] `SiteHeader` shows session-aware affordance
- [ ] No `"Coming soon"` literals remain
- [ ] `pnpm typecheck` and `pnpm lint` clean

---

## Deferred lifts (priority order)

These were flagged during Phases 02–05 as out of scope for the immediate revisit but worth doing before the platform feels "shipped." Each is roughly bounded; pick them up between phases or as standalone PRs.

### A. SandboxLive home state variants (the other 4)

Phase 02 revisit lifted `sandboxlive_dashboard_active_engagement_state` only. The remaining four authored home variants are:

- `sandboxlive_dashboard_pre_kickoff_state` — used when no phases have started
- `sandboxlive_dashboard_discernment_phase` — used when Phase 07 (Discerning) is in progress
- `sandboxlive_dashboard_post_engagement_reference_state` — used after all phases complete
- `sandboxlive_dashboard_recording_recipe_value` — a specific mode rather than a state; not used on the home directly, but could power a "record a value" flow

Build a small resolver in [src/lib/sandboxlive/engagement.server.ts](../../../src/lib/sandboxlive/engagement.server.ts) that returns which home variant to render based on `state.currentPhaseSlug` and completion counts. Lift each variant into a separate component in `src/components/sandboxlive/home-variants/`. The page at [src/app/(dashboard)/sandboxlive/page.tsx](../../../src/app/(dashboard)/sandboxlive/page.tsx) dispatches.

### B. Strategic-memo recipe detail lift (3 templates → recipe drawer)

The recipe drawer in [src/components/sandboxlive/recipe-library.tsx](../../../src/components/sandboxlive/recipe-library.tsx) renders a generic detail view. The three strategic-memo templates are the authored detail surfaces:

- `recipe_detail_strategic_memo_drafting` — full recipe doc layout (use for `function: "writing"` recipes)
- `trial_setup_strategic_memo_drafting` — trial-setup layout (for the "before you try this" framing)
- `value_record_strategic_memo_drafting` — value-record layout (for the "what we learned" framing)

Lift each into a component. The drawer dispatches based on a new `detailLayout` field on `SandboxLiveRecipe` (or fall back to the generic view).

### C. Ethics review 3-template sub-flow

Phase 06 of SandboxLive (`/sandboxlive/phase/06-ethics`) currently maps to one template. The `ethics-review` subgroup has three:

- `ethics_review_preparation_view` — prep checklist before review opens
- `ethics_review_external_reviewer_interface` — submission UI for outside reviewers
- `ethics_review_aggregated_feedback_view` — aggregated feedback dashboard

Convert `/sandboxlive/phase/06-ethics` to a sub-flow (mirror the Phase 03 ratification pattern): an overview page that links into a `[stage]` dynamic route. Update the SandboxLive phase manifest to know about the sub-stages.

### D. Governance tools in `/safestart/steady-state`

Four templates from the `governance-tools` subgroup belong in steady-state operations:

- `ai_organizational_policy_detailed_view` — the operational policy reference
- `ask_the_guidebook_editorial_restyle` — a Q&A surface against the Guidebook
- `incident_response_runbook_movemental_editorial` — incident response procedures
- `vendor_tool_inventory_editorial_review` — the periodic vendor inventory

Lift each. Surface them from the SafeStart steady-state workspace as link cards (or, ideally, as their own routes under `/safestart/steady-state/<tool>`). Update the SafeStart sidebar to include a "Ongoing operations" group with these entries.

### E. `module_02_how_to_talk_to_it` learning module surface

A standalone learning module with no current home. Two reasonable placements:

1. Under the Teaching Library at `/dashboard/teaching/modules/02-how-to-talk-to-it`, alongside the Claude Skills guide
2. Under SandboxLive at `/sandboxlive/modules/02-how-to-talk-to-it`, with a new "Modules" group in the sidebar

Pick option 2 — modules belong to the SandboxLive engagement. Lift the template. If future modules land (`module_01`, `module_03`, etc.), make `/sandboxlive/modules/[slug]` a dynamic route from the start.

### F. Two-pane `/sandboxlive/recipes` lift

[Currently](../../../src/app/(dashboard)/sandboxlive/recipes/page.tsx) uses the simple grid+drawer component shared with the public `/recipes` page. The Stitch design `recipe_library_movemental_sandbox_dashboard` is a richer two-pane layout (40% category-grouped list with trial counts | 60% persistent detail pane). Lift it.

Add a second component `RecipeLibraryTwoPane` in `src/components/sandboxlive/`. Keep the existing grid component for the public `/recipes` page. The authenticated route dispatches.

### G. AuthenticatedShell sidebar inline status indicators

The Stitch sidebars show inline phase status ("5 OF 7", "12 TRIALS"). Our sidebar is static. To add live status:

1. Extend [src/components/authenticated/authenticated-shell.tsx](../../../src/components/authenticated/authenticated-shell.tsx)'s `AuthenticatedSidebarItem` to accept an optional `statusBadge?: string` or `statusBadge?: { label: string; tone: "amber" | "muted" }`
2. Pass status data from the (dashboard) layout. The layout currently resolves sidebar via [src/lib/authenticated/product-context.ts](../../../src/lib/authenticated/product-context.ts), which is purely path-based. Refactor the resolver to optionally accept org-scoped data and return a *dynamic* sidebar:

```ts
export async function resolveAuthenticatedShellContext(
  pathname: string,
  organizationId: string | null,
): Promise<AuthenticatedShellContext> { ... }
```

3. For `/sandboxlive`, the resolver calls `loadSandboxLiveEngagementState(organizationId)` and decorates each phase sidebar item with status. For `/safestart`, similar with `loadSafeStartEngagementState`.

This adds a server-side query to every authenticated render. Cheap enough; both queries already exist and are fast.

### H. Future Plan synthesis assistant (agent wiring)

The right pane in the Future Plan editor is a placeholder. Wire it to the agent runtime:

1. Build a server helper that aggregates evidence for a given section slug — Current Reality Maps from cohort orgs, Ethics Review verdicts on related use cases, Discerning verdicts on related use cases
2. Pass the aggregated evidence as context to the agent runtime
3. Render the chat in the right pane; "Insert into editor" button copies the assistant's draft text into the active section textarea

This depends on cohort-wide data being available (which depends on `organizations.cohort_id` being populated and the corresponding cohort-aware queries being built). Realistically a follow-up after cohort grouping lands.

### I. Ratification confirmation step UI

The Phase 03 ratification multi-step flow's `confirmation` step currently renders the Stitch fixture via StitchDocumentView. It should be an actual form that writes a `future_plan_ratifications` row (table exists from Phase 05) when the board ratifies the Guidebook. The form fields: motion text, vote tally, signatures captured. The row pins the ratified version.

### J. Apply DB migrations

Run, in order:

```bash
pnpm drizzle:gen
pnpm drizzle:push
```

The drift between Drizzle schema and live DB at the time of writing:

- `organizations.cohort_id` (nullable uuid)
- `recipes` (full table)
- `cohort_members` (full table)
- `future_plans`, `future_plan_versions`, `future_plan_ratifications` (full tables)
- Phase 06 will add 5 more tables when unblocked

Until these are applied, the relevant pages render with degraded states (empty cohort view, save-fails-with-message in Future Plan editor, etc.). Apply when ready; nothing breaks if you wait.

---

## Operational notes

### Order of execution (recommended)

1. **Phase 08** (5 minutes) — tiny doc + swatch page. Get it out of the way.
2. **Phase 09 (A, B)** (under an hour) — delete the welcome duplicate, remove ShellTopLinks. Pure cleanup.
3. **Phase 07 customer side** (medium-large) — the 11 onboarding placeholders. This is the highest UX-leverage remaining work.
4. **Deferred lifts B, D, F** in some order — Recipe detail lift, governance tools in steady-state, two-pane recipes. All bounded, all visually substantial.
5. **Apply DB migrations** (Deferred J). After this, real save flows light up; cohort + sponsor views become live.
6. **Deferred A, C, E** — SandboxLive home variants, ethics review sub-flow, module 02. Lower urgency.
7. **Phase 09 (C, D)** — session-aware public chrome + "Coming soon" sweep. Best done after Phase 07 to maximize what gets cleaned up.
8. **Deferred G** — sidebar status indicators. Requires the resolver refactor; worth doing once but no rush.
9. **Phase 06** — Movement Leader shell. Unblocks when Stitch designs land. Substantial when it starts.
10. **Phase 07 leader side + Deferred H, I** — Leader onboarding, synthesis assistant, ratification confirmation. Each builds on prior infrastructure.

### Verification per PR

Every phase ends with:

```bash
pnpm typecheck   # zero errors
pnpm lint        # zero errors (63 pre-existing warnings are fine)
```

Manual visual verification of any lifted templates: open the route, compare to `public/templates/<id>/index.html` in another tab, confirm the structure reads correctly.

### Don't skip the audit

Before each phase, re-verify the "Last verified facts" at the top of this document. The Stitch repo may sync new templates; the schema may have migrations applied; an onboarding step may have shipped between when this prompt was written and when you act on it. Trust the code, not this doc.

---

## Reference index

- Audit: [docs/build/notes/authenticated-dashboard-surface-audit.md](../notes/authenticated-dashboard-surface-audit.md)
- Stitch manifest: [src/lib/program/data/stitch-templates.json](../../../src/lib/program/data/stitch-templates.json)
- Stitch HTML: `public/templates/<category>/<id>/index.html`
- AuthenticatedShell: [src/components/authenticated/authenticated-shell.tsx](../../../src/components/authenticated/authenticated-shell.tsx)
- Product context resolver: [src/lib/authenticated/product-context.ts](../../../src/lib/authenticated/product-context.ts)
- SandboxLive engagement helper: [src/lib/sandboxlive/engagement.server.ts](../../../src/lib/sandboxlive/engagement.server.ts)
- SafeStart engagement helper: [src/lib/safestart/engagement.server.ts](../../../src/lib/safestart/engagement.server.ts)
- Future Plan helper: [src/lib/sandboxlive/future-plan.server.ts](../../../src/lib/sandboxlive/future-plan.server.ts)
- Onboarding state: [src/lib/onboarding/state.ts](../../../src/lib/onboarding/state.ts)
- Onboarding service: [src/lib/services/onboarding/onboarding.service.ts](../../../src/lib/services/onboarding/onboarding.service.ts)
- Existing onboarding task examples: [src/components/onboarding/phase1-task-pages.tsx](../../../src/components/onboarding/phase1-task-pages.tsx), [src/components/onboarding/corpus-review-task-page.tsx](../../../src/components/onboarding/corpus-review-task-page.tsx)
- Drizzle schema: [src/lib/db/schema.ts](../../../src/lib/db/schema.ts)
- Design system: [docs/design/DESIGN.md](../../../docs/design/DESIGN.md)
- Field guide print conventions: [src/app/globals.css](../../../src/app/globals.css) (`.field-guide-prose`, `.field-guide-cover`)
