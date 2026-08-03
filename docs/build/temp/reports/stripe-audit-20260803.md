## Stripe audit — movemental — 2026-08-03

**Tenant = movemental · Repo = JoshuaShepherd/movemental-ai · Stripe mode expected = live (MCP account) / unknown (local env unset)**

Package `name`: `movemental`. No `src/lib/config/tenant.config.ts` (org hub, not a leader tenant). Branch: `cursor/stripe-config-and-functionality-4276`.

### MCP
- Stripe: **ready** (account `acct_1TJrhFA5zZEgTNPG`, display name Movemental)
- Supabase: **unavailable** (no Supabase MCP server in this automation session; no `mcp_auth` tool exposed). Live DB SQL checks marked `[?] NEEDS MCP`.

Skills: `stripe-setup` / `stripe-integration` symlinks broken in this environment (targets outside the VM). Used Stripe plugin `stripe-best-practices` + code inventory instead.

---

### Config
- Env schema / example: **PASS with notes** — `src/lib/env.ts` documents optional `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `ONBOARDING_PAYMENT_AMOUNT_CENTS`. `.env.local.example` lists them with empty placeholders (no real secrets). `scripts/check-env.ts` treats Stripe keys as optional.
- Key mode consistency (test/live): **`[?] unknown locally`** — `.env.local` / process env Stripe keys are **missing** in this agent VM. Cannot verify `pk_*`/`sk_*` pairing here. MCP webhook sample is `livemode: true`.
- Fail-closed when unset: **PASS (503)** — checkout / PaymentIntent / webhook return `stripe_unconfigured` with HTTP **503** (not 501). Pattern is consistent; do not hard-require keys for a site that can run without payments.
- Publishable vs secret: **PASS** — only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is client-schema; secrets are server-only. No client import of `stripe` SDK / secret env observed. `@stripe/stripe-js` is **not** a dependency (relevant to onboarding PI gap below).

---

### Setup
- Checkout session route: **present** — `POST /api/safety/enrollment/checkout` → `createCheckoutSession` (server-only, `price_data` fixed at `$1,000` via `SAFETY_ENROLLMENT_AMOUNT_CENTS`, not client-supplied `priceId`). Success/cancel URLs use `NEXT_PUBLIC_SITE_URL` with localhost fallback.
- Webhook route + signature verify: **PASS in code** — `POST /api/webhooks/stripe` reads **raw body**, requires `stripe-signature`, `constructEvent` before business logic; missing/invalid signature → 400; unconfigured → 503.
- Handlers vs event types: **only** `checkout.session.completed` (SafeStart provision). Idempotent if enrollment already `provisioned`. Other event types acknowledged as `{ provisioned: false }`.
- Metadata: sessions now include stable `type: "safestart"` (+ `enrollment_id`, `safety_plan`) — applied this audit.
- Portal: **N/A** for SafeStart one-time Checkout; no Customer Portal route in this repo.
- Onboarding PaymentIntent: `POST /api/onboarding/payment-intent` (auth required) creates PI with `automatic_payment_methods` — **no** matching webhook handler and **no** Elements/`@stripe/stripe-js` consumer in `src/`.

---

### Live Stripe (MCP)
- Webhook endpoint URL match: **FAIL — CRITICAL**
  - Live endpoint: `https://dashboard.movemental.ai/api/stripe/webhooks` (`we_1TZJanA5zZEgTNPG2093TTyv`, status enabled, livemode)
  - This app’s handler: `https://<movemental.ai-host>/api/webhooks/stripe`
  - Path **and** host differ (`dashboard.movemental.ai` + `/api/stripe/webhooks` vs org site `/api/webhooks/stripe`).
- Events enabled vs handled: **FAIL — CRITICAL for SafeStart**
  - Enabled: `payment_intent.*` family + `customer.subscription.*` family
  - **Missing** `checkout.session.completed` (the only event this codebase processes)
  - Enabled subscription/PI events have **no** handlers in this repo (likely intended for another Movemental surface — dashboard/tenant — not wired here).
- Price ID integrity (sample):
  - Active product: `prod_UeI20GgfF5KG7w` “Movement Leader Platform”
  - Active price: `price_1TezSeA5zZEgTNPG1DGBOIpk` — one_time USD `100000` cents (**$1,000**) — amount aligns with SafeStart constant
  - SafeStart Checkout uses **inline `price_data`**, not this Price ID (by design; amount assert still server-side)
- Customers: existence confirmed (`has_more: true`); **no PII enumerated** in this report.

---

### Supabase
- Plans/subscriptions/purchases evidence: **`[?] NEEDS MCP`** — Supabase MCP unavailable; `DATABASE_URL` also unset in this VM (no ad-hoc SQL).
- Schema (Drizzle) shows shared-platform tables with Stripe columns: `subscription_plans`, `user_subscriptions`, `purchases`, `book_purchases`, `books`, `course_enrollments`, `donations`, `event_registrations`, `safety_enrollments`.
- This app’s Stripe write path (code): webhook → `safety_enrollments` (`status`, `paid_at`, `stripe_checkout_session_id`, `stripe_payment_intent_id`) then `provisionEngagement`.
- Tenant scoping notes: `safety_enrollments.organization_id` nullable; enrollment/checkout APIs are **unauthenticated** public funnel gated by UUID knowledge. Subscription/book purchase Stripe sync for leader tenants is **not implemented in this repo** (schema shared; handlers live elsewhere).

---

### Findings (CRITICAL → LOW)

1. **CRITICAL — Live webhook not pointed at this app’s SafeStart handler**  
   Dashboard endpoint targets `dashboard.movemental.ai/api/stripe/webhooks` without `checkout.session.completed`. Paid SafeStart Checkout Sessions will **not** provision via this route until a Dashboard endpoint is added/updated for `https://www.movemental.ai/api/webhooks/stripe` (or the production host) with that event. *(Dashboard change deferred — automation must not edit production webhooks.)*

2. **HIGH — Onboarding PaymentIntent loop incomplete on this app**  
   Server creates PIs and returns `clientSecret`, but there is no `@stripe/stripe-js` / Elements UI and no `payment_intent.succeeded` handler here. Live Stripe listens for PI events on the **dashboard** host, not this org site. Risk: orphaned PIs / unpaid “success” if any UI assumes client confirmation alone.

3. **HIGH — Public checkout by `enrollment_id` only**  
   `POST /api/safety/enrollment/checkout` has no auth. Mitigated by UUID entropy + server-fixed amount (no arbitrary `priceId`). Still allows anyone who learns an enrollment UUID to open a Checkout Session for that enrollment’s email. Acceptable for some funnels; tighten if enrollments become enumerable.

4. **MEDIUM — Fail-closed status is 503, skill text expects 501**  
   Behavior is consistent and fail-closed; left unchanged to avoid client breakage.

5. **MEDIUM — Concurrent webhook race**  
   Idempotency checks `status === "provisioned"` without a DB unique constraint / advisory lock on session id; rare double-provision possible under simultaneous redelivery.

6. **MEDIUM — Shared DB Stripe columns unused by this app’s handlers**  
   `subscription_plans.stripe_price_id_*`, book/course purchase fields, etc. are schema-ready but not synced here. Orphan risk is for tenant apps, not this org surface — still document ownership.

7. **LOW — Env example / check-env drift (fixed)**  
   Example mentioned only onboarding; `ONBOARDING_PAYMENT_AMOUNT_CENTS` (and `CRON_SECRET`) were untracked by `check-env`. Updated this audit.

8. **INFO — Prefer restricted keys (`rk_`)**  
   Recommend migrating server secret to a least-privilege RAK; do not rotate in this automation.

9. **INFO — Stripe Node SDK ^17.7.0**  
   Plugin best-practices lists newer SDK/API versions; upgrade is optional and out of scope for audit-only.

10. **INFO — No Customer Portal**  
    Appropriate for current one-time SafeStart surface.

---

### Fixes applied / deferred

**Applied (safe, in-repo):**
- Clarified Stripe section in `.env.local.example` (SafeStart + webhook path + key hygiene).
- Tracked `ONBOARDING_PAYMENT_AMOUNT_CENTS` and `CRON_SECRET` in `scripts/check-env.ts` optional list.
- Added Checkout `metadata.type = "safestart"` + Zod optional literal.
- Documented expected webhook path/events on `src/app/api/webhooks/stripe/route.ts`.

**Deferred (requires human / Dashboard / other repo):**
- Create or update Stripe webhook endpoint for this deployment URL + `checkout.session.completed`.
- Confirm whether `dashboard.movemental.ai` webhook is owned by another app and keep event sets separate.
- Wire or remove incomplete onboarding PaymentIntent surface; prefer Checkout Sessions if productizing.
- Supabase SQL integrity pass once Supabase MCP is authenticated.
- Optional: auth/rate-limit on enrollment checkout; webhook event idempotency table.

---

### Explicit non-actions
- No live charges, refunds, key rotation, or migrations
- No Stripe Dashboard webhook/product/price mutations
- No customer PII in this report
- No commits to `main`; no production deploys

---

### Audit checklist snapshot

| Area | Result |
|------|--------|
| A. Config & env | Mostly pass; local key mode unknown |
| B. Setup & architecture | SafeStart Checkout+webhook sound in code; onboarding PI incomplete; portal N/A |
| C. Live Stripe MCP | Webhook URL/events mismatch CRITICAL |
| D. Supabase MCP | Unavailable |
| E. Security & PCI | Signature + raw body OK; no PAN logging; amount server-fixed; checkout unauthenticated |
| F. Safe auto-fixes | Env/docs/metadata only |
