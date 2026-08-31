## Stripe audit — movemental (org hub) — 2026-08-31

**Tenant = Movemental org site · Repo = JoshuaShepherd/movemental-ai · Package = `movemental` · Stripe mode expected = unknown (keys unset in this cloud env)**

> Note: Automation prompt targets leader tenants (`brad-brisco` / `alan-hirsch`). This run is wired to **movemental-ai** (organizational hub). There is no `src/lib/config/tenant.config.ts`. Payment surface here is **SafeStart Checkout** + optional **leader onboarding PaymentIntent**, not subscription plan catalogs.

### MCP
- Stripe: **needsAuth** (interactive OAuth unavailable in cloud agent; auth action requested for desktop)
- Supabase: **unavailable** (not present in this automation MCP catalog) — live SQL marked `[?] NEEDS MCP`
- Skills: `.claude/skills/stripe-setup` / `stripe-integration` are broken symlinks here; used plugin `stripe-best-practices` + prior live snapshot from automation memory (2026-08-03)

### Config
- Env schema / example: Zod optional `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `ONBOARDING_PAYMENT_AMOUNT_CENTS`. `.env.local.example` updated with SafeStart webhook path docs + fail-closed note.
- Key mode consistency (test/live): **unknown** — Stripe keys **UNSET** in this agent environment (no `.env.local` Stripe values). Cannot verify `pk_*`/`sk_*` pairing locally.
- Fail-closed when unset: **yes (re-applied)** — checkout, webhook, and onboarding PI routes return **501** when Stripe unset (was still **503** on `main`).

### Setup
- Checkout session route: `POST /api/safety/enrollment/checkout` → `createCheckoutSession` (server-only, `price_data` fixed amount, no client `priceId`). Uses `NEXT_PUBLIC_SITE_URL` for success/cancel (localhost fallback).
- Webhook route + signature verify: `POST /api/webhooks/stripe` — raw body + `constructEvent` before business logic; missing/invalid signature → 400; unset config → 501.
- Handlers vs event types: **only** `checkout.session.completed` (other events ack with `{ provisioned: false }`).
- Portal: **N/A** (one-time SafeStart payment; no Customer Portal route).
- Metadata: now includes stable `type: "safestart"` + `enrollment_id` + `safety_plan`.
- Idempotency: re-delivery of completed sessions short-circuits when enrollment already `provisioned`.

### Live Stripe (MCP)
- Webhook endpoint URL match: **[?] NEEDS MCP** — last authenticated snapshot (2026-08-03, acct `…TNPG`): one live endpoint → `https://dashboard.movemental.ai/api/stripe/webhooks` (**not** this app’s `/api/webhooks/stripe`).
- Events enabled vs handled: **[?] NEEDS MCP** — prior snapshot enabled `payment_intent.*` + `customer.subscription.*`; **no** `checkout.session.completed` for this repo’s handler.
- Price ID integrity (sample): **N/A for SafeStart** (uses Checkout `price_data`, not Catalog Price IDs). Shared DB may still hold `subscription_plans.stripe_price_id_*` used by sibling apps — not validated this run.

### Supabase
- Plans/subscriptions/purchases evidence: **[?] NEEDS MCP** — `DATABASE_URL` unset in cloud env; no Supabase MCP.
- Schema (code): `safety_enrollments` holds `stripe_checkout_session_id` / `stripe_payment_intent_id`; shared tables `subscription_plans`, `user_subscriptions`, `purchases`, `book_purchases` have stripe columns but are not written by this app’s webhook.
- Tenant scoping notes: SafeStart enrollment can set `organization_id` nullable; webhook looks up by `enrollment_id` from verified session metadata (not client-supplied amount).

### Findings (CRITICAL → LOW)

| Sev | Finding | Evidence |
|-----|---------|----------|
| **CRITICAL** | Live Stripe webhook URL (last known) targets **dashboard.movemental.ai** `/api/stripe/webhooks`, not **movemental-ai** `/api/webhooks/stripe`. SafeStart provisioning on this app will not receive events until a Dashboard endpoint is added/updated for this host with `checkout.session.completed`. | Memory / 2026-08-03 MCP; reconfirm when Stripe MCP auth available |
| **HIGH** | Onboarding uses **PaymentIntents** (`createOnboardingPaymentIntent`) with **no** local `payment_intent.*` webhook handler — payment confirmation path incomplete for this surface. Prefer Checkout Sessions for one-time charges per Stripe best practices. | `onboarding-http.service.ts`, webhook switch |
| **HIGH** | SafeStart checkout accepts `enrollment_id` without auth — UUID knowledge could create sessions for another enrollment (amount still server-fixed). Consider binding to session/email or signed enrollment token. | `checkout/route.ts` |
| **MEDIUM** | Prior hardenings (501 fail-closed, amount null-coalesce removal, `payment_status` check, metadata `type`) repeatedly land on weekly PRs but remain **unmerged** on `main` (open #1, #4, #5, #8). | `gh pr list` |
| **MEDIUM** | Webhook does not persist Stripe event IDs (no `stripe_webhook_events` table usage) — relies on enrollment status for idempotency only. | code |
| **LOW** | Cloud agent has no Stripe keys / `.env.local` — cannot check test vs live key consistency in CI/automation VM. | env summarize |
| **INFO** | Customer Portal N/A; no card PAN logging observed; secrets never imported into client components (`server-only` on stripe helper). Publishable key is optional and unused in current SafeStart Checkout redirect flow. | code |
| **INFO** | Recommend restricted keys (`rk_`) over long-lived `sk_` (do not rotate from automation). Pin latest Stripe API / SDK when next touching payments. | stripe-best-practices |

### Fixes applied / deferred

**Applied on `cursor/stripe-config-and-functionality-e210` (re-apply of unmerged hardenings):**
1. Fail-closed HTTP **501** when Stripe unset (checkout, webhook, onboarding PI).
2. Reject missing `amount_total` (no coalesce to expected price).
3. Reject non-`paid` `payment_status` when present.
4. Checkout metadata `type: "safestart"`.
5. Zod schema accepts optional `payment_status` + `metadata.type`.
6. `.env.local.example` documents SafeStart webhook path + key mode guidance.
7. `scripts/check-env.ts` tracks `ONBOARDING_PAYMENT_AMOUNT_CENTS` + `CRON_SECRET`.

**Deferred (human / Dashboard / MCP):**
- Authenticate Stripe MCP; re-verify live webhook URL + events.
- Add or update Stripe Dashboard webhook for this deployment’s `/api/webhooks/stripe` with `checkout.session.completed` (do **not** disable the dashboard app’s endpoint without coordinating).
- Merge one of the open stripe-audit PRs so hardenings stick on `main`.
- Auth-gate or token-bind SafeStart checkout.
- Complete onboarding payment confirmation (Checkout Session or PI webhooks).
- Supabase read checks for `safety_enrollments` / plan price IDs once MCP or `DATABASE_URL` available.

### Explicit non-actions
- No live charges, refunds, key rotation, Dashboard mutations, or migrations
- No force-push, no merge, no `vercel --prod`
- No full API keys printed
