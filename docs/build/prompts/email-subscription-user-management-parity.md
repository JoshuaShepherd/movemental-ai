# Prompt: Bring email, newsletter, and user/subscription management to sibling parity

Use this document as the **authoritative execution prompt** when an agent (or human) needs to align **movemental** with the proven patterns in the **alan-hirsch** sibling reference repo. It assumes you will **read and mirror behavior**, not copy tenant-specific content, marketing copy, or visual components.

## Reference locations

| Repo | Typical path on primary machine |
|------|----------------------------------|
| **movemental** (this repo) | `/Users/joshuashepherd/Desktop/movemental` |
| **Alan Hirsch tenant app** (read-only reference) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch` |

If paths differ on your machine, substitute the equivalent root for each repo.

## Constraints (do not violate)

1. **Schema is source of truth** — extend Drizzle schema only when a column or table is genuinely missing; then regenerate lower layers per `CLAUDE.md` (`pnpm generate:schemas|services|routes|hooks` and `pnpm validate:all`).
2. **Six-layer chain** — fix bottom-up; do not hand-patch generated Zod or hooks to paper over service gaps.
3. **movemental design** — public pages stay on Stitch/DESIGN tokens; transactional HTML email may use simple inline styles (as in alan-hirsch) until you intentionally add `@react-email` components aligned with brand.
4. **pnpm only** — add dependencies with `pnpm add resend stripe` (versions should match or exceed sibling as appropriate after compatibility check).

---

## 1. Current state — movemental

### 1.1 Email (Resend)

| Area | State |
|------|--------|
| **Env** | `src/lib/env.ts` defines optional `RESEND_API_KEY`, `RESEND_FROM_EMAIL`. |
| **SDK** | **No** `resend` npm package; `src/lib/book-email.ts` uses raw `fetch` to `https://api.resend.com/emails`. |
| **Transactional sends** | Book flows only: `sendBookSubscriberWelcome`, `sendBookExportConfirmation` in `book-email.ts`; `sendBookAuthorNoteStub` is empty (cron/automation not wired). |
| **Newsletter** | `src/app/api/newsletter/route.ts` inserts into `newsletter_subscribers` with `status: "pending"` but **does not** set `confirmation_token`, **does not** send email, **has no** confirm endpoint. Uses `TENANT_ORG_ID` or all-zero UUID fallback. |

### 1.2 Newsletter data model

- Table `newsletter_subscribers` exists in `src/lib/db/schema.ts` with `confirmation_token`, `confirmed_at`, `status`, etc. — **schema supports** double opt-in; **API does not**.

### 1.3 Book email capture

- `src/app/api/book/subscribe/route.ts` persists `book_email_subscribers` and sends immediate welcome mail (single opt-in from a compliance perspective unless you add confirmation).

### 1.4 Stripe / subscriptions

| Area | State |
|------|--------|
| **Dependencies** | **No** `stripe` package in `package.json` despite optional env keys. |
| **Webhook** | No `src/app/api/webhooks/stripe/route.ts` equivalent. |
| **Checkout** | No checkout session route; no server-side Stripe client module under `src/lib/stripe/`. |
| **DB** | `subscription_plans`, `user_subscriptions`, and related Stripe ID columns exist in `schema.ts`. |
| **Generated stack** | `src/lib/services/simplified/user-subscriptions.service.ts` (and hooks/routes) provide CRUD-style access — **no** lifecycle sync from Stripe events. |

### 1.5 Auth / user management (app surface)

| Area | State |
|------|--------|
| **Supabase** | `src/lib/supabase/{client,server,middleware}.ts` — SSR cookie pattern is present. |
| **proxy.ts** | Refreshes session on matched routes; **no** expanded route gates for `/account`, checkout, etc. |
| **Auth UI** | **No** `(site)` or `(public)` routes for `signin` / `signup` / `verify-email` under `src/app` (unlike sibling). |
| **Book margin notes** | `src/components/book/margin-note-submission.tsx` uses `signInWithOtp` for lightweight auth — narrow use case. |

---

## 2. Current state — alan-hirsch (target behaviors to port)

### 2.1 Email (Resend)

| File / area | Behavior to replicate |
|-------------|-------------------------|
| `src/lib/email/resend.ts` | Lazy `Resend` SDK singleton from `RESEND_API_KEY`. |
| `src/lib/email/send-confirmation.ts` | Double opt-in HTML email; uses `RESEND_FROM_DOMAIN` and `NEXT_PUBLIC_APP_URL` (sibling naming — movemental uses `NEXT_PUBLIC_SITE_URL`; **normalize on one canonical base URL** in movemental). |
| `src/lib/env.ts` | `RESEND_API_KEY`, `RESEND_FROM_DOMAIN` optional. |

### 2.2 Newsletter (double opt-in)

| File | Behavior |
|------|----------|
| `src/lib/services/custom/newsletter.service.ts` | `subscribe()` creates/updates pending row, issues `confirmation_token`, handles already-confirmed; `confirm()` validates token and sets `confirmed`. |
| `src/app/api/custom/newsletter/route.ts` | POST → service → `sendConfirmationEmail`. |
| `src/app/api/custom/newsletter/confirm/route.ts` | GET with `token` → `confirm()` → redirect with query flags. |

### 2.3 Stripe

| File | Behavior |
|------|----------|
| `src/lib/stripe/server.ts` | `getStripeServer()` returns `null` when unset (app still runs). |
| `src/lib/stripe/customer.ts` | `getOrCreateStripeCustomer(userId, email)` — find by email or create with `metadata.supabase_user_id`. |
| `src/lib/stripe/handlers.ts` | Idempotent-ish handlers for checkout completion (book, course, subscription, donation, event) plus `customer.subscription.updated` / `deleted`. |
| `src/app/api/webhooks/stripe/route.ts` | Verifies signature, dispatches by `event.type` and checkout `metadata.type`. |
| `src/app/api/custom/checkout/stripe/session/route.ts` | Authenticated user required; builds Checkout Session from type + DB rows; UTM metadata helpers. |

### 2.4 Auth UI

- `src/app/(public)/auth/signin/page.tsx`, `signup/page.tsx`, `verify-email/page.tsx`, shared `AuthCard.tsx`.
- Checkout route expects signed-in user (`getUser()` → 401 if missing).

---

## 3. Gap summary

| Capability | movemental | alan-hirsch |
|------------|-------------|-------------|
| Resend SDK | No | Yes |
| Newsletter double opt-in | No | Yes |
| Newsletter confirm route | No | Yes |
| Stripe SDK + server helper | No | Yes |
| Stripe webhook | No | Yes |
| Checkout session API | No | Yes |
| Subscription DB sync from Stripe | No | Yes |
| Public auth pages | No | Yes |
| Invite-gated signup (env) | Not in movemental `env.ts` | `SIGNUP_INVITE_CODE` optional in sibling |

---

## 4. Execution phases (step-by-step)

Complete phases **in order**. After each phase that touches generated layers, run `pnpm validate:all` and fix **from schema upward** if anything fails.

### Phase A — Inventory and decisions

1. Open sibling files listed in sections 2.1–2.4 and skim for **movemental-specific** differences (e.g. `NEXT_PUBLIC_SITE_URL` vs `NEXT_PUBLIC_APP_URL`, org scoping via `TENANT_ORG_ID`).
2. Decide product scope for **movemental v1**:
   - **Minimum:** newsletter double opt-in + Resend SDK + optional book-email refactor.
   - **Commerce:** add Stripe webhook + checkout for **only** the commerce types you will ship first (e.g. `subscription` + `donation` only, deferring book/course/event parity until those surfaces exist in movemental).
3. Record chosen scope in the PR description (no new markdown files unless the team asks).

### Phase B — Dependencies and environment

1. Run `pnpm add resend stripe` in movemental.
2. Align `src/lib/env.ts`:
   - Keep `RESEND_FROM_EMAIL` **or** adopt sibling’s `RESEND_FROM_DOMAIN` pattern; **do not** leave two conflicting “from” concepts without documentation in env comments.
   - Ensure `NEXT_PUBLIC_SITE_URL` is the single canonical origin for email links and redirects (update `send-confirmation` equivalents to use `env.NEXT_PUBLIC_SITE_URL`, not a second variable, unless you add `NEXT_PUBLIC_APP_URL` as an alias with one source of truth).
3. Update `scripts/check-env.ts` OPTIONAL list (and `.env.local.example` if present) for any new keys: `RESEND_FROM_DOMAIN` if used, confirm Stripe trio when commerce is enabled.
4. Run `pnpm check:env` locally after updating `.env.local`.

### Phase C — Resend module (movemental)

1. Add `src/lib/email/resend.ts` modeled on sibling: `getResend(): Resend | null`.
2. Migrate `src/lib/book-email.ts` from raw `fetch` to `resend.emails.send` for consistency, error typing, and attachment support later.
3. (Optional but recommended) Add `src/lib/email/send-newsletter-confirmation.ts` by adapting sibling `send-confirmation.ts` copy and URLs to movemental branding — keep HTML minimal or introduce `@react-email/components` in a follow-up.

### Phase D — Newsletter service and routes (double opt-in)

1. Add `src/lib/services/custom/newsletter.service.ts` (or under `src/lib/services/` per movemental conventions) porting logic from sibling:
   - Use **`TENANT_ORG_ID` required** for inserts (fail closed with clear API error), **remove** reliance on the all-zero UUID fallback for production paths — keep zero-UUID **only** behind `NODE_ENV === "development"` if you must preserve local DX.
   - Implement `subscribe`, `confirm`, token rotation for pending re-signups.
2. Replace the body of `src/app/api/newsletter/route.ts` to call the service and trigger confirmation email (mirror sibling JSON shape: `success`, `data.message`, error codes).
3. Add `src/app/api/newsletter/confirm/route.ts` (or `/api/custom/newsletter/confirm` if you prefer sibling path parity — **pick one URL** and update footer form success copy accordingly).
4. Update `src/components/forms/newsletter-form.tsx` to handle responses: “check your inbox”, already subscribed, validation errors.
5. **Database:** verify a **unique constraint** on `(email, organization_id)` for `newsletter_subscribers` exists in Supabase; if missing, add migration via Drizzle (`pnpm drizzle:gen`) — sibling relies on application-level checks; movemental currently uses `onConflictDoNothing()` without an explicit `.on()` target in code — **fix** to match actual DB constraints or add the constraint.

### Phase E — Stripe server primitives

1. Create `src/lib/stripe/server.ts` — copy pattern from sibling using movemental `env.STRIPE_SECRET_KEY`.
2. Create `src/lib/stripe/customer.ts` — `getOrCreateStripeCustomer` using Supabase `user.id` and `user.email`.
3. Create `src/lib/stripe/handlers.ts` — **port only handlers** for checkout types that exist in movemental’s schema and product surface. Start with:
   - `handleSubscriptionCheckout`
   - `handleSubscriptionUpdated`
   - `handleSubscriptionDeleted`
   - Add `donation` / `book` / `course` / `event` handlers **only** when corresponding tables and UX exist and metadata contracts are defined.
4. Ensure handler updates target `user_subscriptions` columns that match movemental’s Drizzle schema (compare `userSubscriptions` table in `schema.ts` to sibling field names).

### Phase F — Webhook route

1. Add `src/app/api/webhooks/stripe/route.ts` mirroring sibling:
   - Read raw body as text for signature verification.
   - Use `env.STRIPE_WEBHOOK_SECRET`.
   - Return `501` when Stripe not configured; `400` on bad signature.
2. Register the endpoint in the **Stripe Dashboard** (test + live) pointing to `https://<deployment>/api/webhooks/stripe`.
3. For local development, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and put the signing secret in `.env.local`.

### Phase G — Checkout session API (authenticated)

1. Add `src/app/api/checkout/stripe/session/route.ts` (or mirror sibling path `/api/custom/checkout/stripe/session` — choose one and document in `CLAUDE.md` or internal runbook).
2. Implement POST handler:
   - `getStripeServer()` null → 501.
   - `createClient()` from `@/lib/supabase/server` + `getUser()` → 401 if anonymous.
   - Resolve `subscriptionPlans` row by id; attach `stripe_price_id_monthly` / `stripe_price_id_annual` per billing cycle.
   - Set `metadata`: `userId`, `type: "subscription"`, `itemId` (plan id), `organizationId` (from `TENANT_ORG_ID` or org resolution strategy movemental uses elsewhere).
3. Optionally port `src/lib/utils/utm.ts` from sibling for attribution on success/cancel URLs.

### Phase H — Auth and account surfaces

1. Scaffold **minimal** auth pages under movemental’s route group conventions (e.g. `src/app/(site)/auth/signin/page.tsx` or a dedicated `(auth)` group):
   - Sign in (email + password and/or magic link — **match whatever Supabase project already enables**).
   - Sign up (+ optional invite code if you port `SIGNUP_INVITE_CODE` from sibling `env.ts`).
   - Verify email flow + `VerifyEmailForm` pattern from sibling.
2. Update `proxy.ts` matcher or gate logic:
   - Refresh session as today.
   - Redirect unauthenticated users away from `/account` and checkout-only APIs (define the path list explicitly).
3. Add a thin `/account` page (server component) that reads profile/subscription summary — even stubbed — so post-checkout redirects have a landing target consistent with sibling (`/account?payment=success`).

### Phase I — Wire user profile to auth identity

1. Confirm how `user_profiles.id` relates to Supabase `auth.users.id` in movemental (triggers, signup hooks, or manual inserts). Sibling checkout uses `user.id` from Supabase as `userId` metadata; movemental `user_subscriptions.user_id` references `user_profiles.id` — **align metadata and webhook handlers** so the ID written to `user_subscriptions` matches the FK (may require mapping `auth.users.id` → `user_profiles.id` in handlers if they differ).
2. If no trigger exists, add a documented path: database trigger on `auth.users` insert → `user_profiles` row, or handle in signup server action — **do not** leave checkout writing orphan FKs.

### Phase J — Book email / digest (optional extension)

1. Decide legally/compliance-wise if `book_email_subscribers` needs double opt-in; if yes, add token column + confirm route analogous to newsletter (schema change → regenerate layers).
2. Implement `/api/cron/book-digest` or Vercel Cron calling `sendBookAuthorNoteStub` successor — only after Resend + subscriber segmentation rules are defined.

### Phase K — Testing and verification

1. **Unit tests:** newsletter service (token issue, confirm, idempotent confirm) with Drizzle test DB or mocked `db`.
2. **Integration:** hit `/api/newsletter` POST → receive Resend test email → GET confirm link → row `status === "confirmed"`.
3. **Stripe CLI:** trigger `checkout.session.completed` with mock payload metadata matching production shape; assert `user_subscriptions` row.
4. **E2E (Playwright):** optional smoke: newsletter form + auth sign-in happy path.
5. Run `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm validate:all`.

### Phase L — Operations

1. Document Vercel env vars for production: Resend domain verification, Stripe webhook secrets, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` for client Checkout button when you add it.
2. If using Resend **audiences** or **broadcasts**, keep transactional double opt-in in-app; do not duplicate subscription state across tools without sync strategy.

---

## 5. Verification checklist (quick)

- [ ] `pnpm add resend stripe` reflected in `package.json`.
- [ ] `getResend()` used for all outbound transactional mail.
- [ ] Newsletter: pending row has `confirmation_token`; email link confirms; duplicate email paths tested.
- [ ] `TENANT_ORG_ID` enforced for newsletter in production config.
- [ ] Stripe webhook verifies signatures; subscription create/update/cancel reflected in `user_subscriptions`.
- [ ] Checkout session requires auth; metadata keys documented.
- [ ] `user_profiles` / `auth.users` ID alignment verified end-to-end.
- [ ] `proxy.ts` protects account (and other) routes as designed.
- [ ] `pnpm validate:all` passes after any schema regeneration.

---

## 6. Suggested agent prompt (paste below when delegating)

> You are working in the movemental repo. Read `docs/build/prompts/email-subscription-user-management-parity.md` and implement the phases agreed in Phase A scope, using `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch` only as a behavioral reference (copy server patterns, not content or Stitch visuals). Respect the six-layer schema-first workflow in `CLAUDE.md`. After code changes, run `pnpm typecheck`, `pnpm lint`, and `pnpm validate:all`. Do not call Stitch MCP unless the task explicitly requires new UI from the pinned Stitch project.

---

## 7. Related internal references

- `CLAUDE.md` — env vars, `proxy.ts`, six-layer chain, pnpm commands.
- `scripts/check-env.ts` — extend OPTIONAL keys when adding services.
- `.claude/skills/email-setup/SKILL.md` — Resend + React Email bootstrap patterns (optional enrichment).
- `.claude/skills/stripe-setup/SKILL.md` — Stripe + webhook + Supabase sync patterns (cross-check with sibling code as source of truth for *this* monolith schema).
