## Stripe audit — movemental — 2026-08-10

**Tenant = movemental · Repo = JoshuaShepherd/movemental-ai · Stripe mode expected = live (prior MCP) / unknown (local env unset)**

Package `name`: `movemental`. No `src/lib/config/tenant.config.ts` (org hub, not brad-brisco / alan-hirsch). Branch: `cursor/stripe-config-and-functionality-2183`.

### MCP
- Stripe: **needsAuth** — MCP server present but unauthenticated; interactive `mcp_auth` unavailable in cloud agents. Live Stripe checks below cite **2026-08-03** MCP evidence (account `acct_1TJrhFA5zZEgTNPG`) and are marked stale pending re-auth.
- Supabase: **unavailable** — no Supabase MCP server in this automation session. DB SQL checks marked `[?] NEEDS MCP`.

Skills: `stripe-setup` / `stripe-integration` symlinks broken (targets outside the VM). Used Stripe plugin `stripe-best-practices` + code inventory.

---

### Config
- Env schema / example: **PASS** — `src/lib/env.ts` optional `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `ONBOARDING_PAYMENT_AMOUNT_CENTS`. `.env.local.example` documents SafeStart checkout/webhook + onboarding PI with empty placeholders (no secrets). `scripts/check-env.ts` tracks Stripe + onboarding amount + `CRON_SECRET` as optional.
- Key mode consistency (test/live): **`[?] unknown locally`** — `.env.local` absent in this VM; cannot verify `pk_*`/`sk_*` pairing. Prior MCP sample was `livemode: true`.
- Fail-closed when unset: **PASS (501)** — checkout / PaymentIntent / webhook return `stripe_unconfigured` with HTTP **501** (aligned this audit; previously 503).
- Publishable vs secret: **PASS** — only publishable key is `NEXT_PUBLIC_*`; secrets server-only. No client import of Stripe secret SDK. `@stripe/stripe-js` is **not** a dependency.

---

### Setup
- Checkout session route: **present** — `POST /api/safety/enrollment/checkout` → `createCheckoutSession` (`server-only`, fixed `price_data` at `$1,000` via `SAFETY_ENROLLMENT_AMOUNT_CENTS`, not client `priceId`). Success/cancel URLs use `NEXT_PUBLIC_SITE_URL` with localhost fallback.
- Webhook route + signature verify: **PASS in code** — `POST /api/webhooks/stripe` uses **raw body**, requires `stripe-signature`, `constructEvent` before business logic; missing/invalid signature → 400; unconfigured → 501.
- Handlers vs event types: **only** `checkout.session.completed` (SafeStart provision). Idempotent if enrollment already `provisioned`. Other events → `{ provisioned: false }`.
- Metadata: `type: "safestart"` + `enrollment_id` + `safety_plan`.
- Portal: **N/A** for SafeStart one-time Checkout.
- Onboarding PaymentIntent: `POST /api/onboarding/payment-intent` (auth required) — **no** local PI webhook handler and **no** Elements client in `src/`.

---

### Live Stripe (MCP)
Stale evidence from 2026-08-03 (re-verify when Stripe MCP is authenticated):

- Webhook endpoint URL match: **FAIL — CRITICAL (stale)**
  - Live endpoint: `https://dashboard.movemental.ai/api/stripe/webhooks` (enabled, livemode)
  - This app’s handler: `https://<movemental.ai-host>/api/webhooks/stripe`
  - Host and path differ.
- Events enabled vs handled: **FAIL — CRITICAL for SafeStart (stale)**
  - Enabled: `payment_intent.*` + `customer.subscription.*`
  - **Missing** `checkout.session.completed` (sole event this codebase processes)
- Price ID integrity (sample, stale):
  - Product `prod_UeI20GgfF5KG7w` “Movement Leader Platform”
  - Price `price_1TezSeA5zZEgTNPG1DGBOIpk` — one_time USD `100000` ($1,000) aligns with SafeStart constant
  - SafeStart uses inline `price_data`, not that Price ID
- Customers: not re-queried this run (MCP unauthenticated); prior run confirmed existence without PII dump.

---

### Supabase
- Plans/subscriptions/purchases evidence: **`[?] NEEDS MCP`**
- Schema (Drizzle) Stripe-related tables: `subscription_plans`, `user_subscriptions`, `purchases`, `book_purchases`, `books`, `course_enrollments`, `donations`, `event_registrations`, `safety_enrollments`.
- This app’s Stripe write path: webhook → `safety_enrollments` then `provisionEngagement`.
- Tenant scoping: `safety_enrollments.organization_id` nullable until provision; enrollment/checkout APIs are unauthenticated public funnel gated by UUID. Leader-tenant subscription/book Stripe sync is **not** implemented in this repo.

---

### Findings (CRITICAL → LOW)

1. **CRITICAL — Live webhook not pointed at this app’s SafeStart handler** *(stale MCP; still open as of last successful read)*  
   Dashboard endpoint targets `dashboard.movemental.ai/api/stripe/webhooks` without `checkout.session.completed`. Paid SafeStart sessions will not provision via this route until a human adds/updates a Dashboard endpoint for this deployment + that event. *(No Dashboard writes from this automation.)*

2. **HIGH — Onboarding PaymentIntent loop incomplete**  
   Server creates PIs; no Elements UI and no `payment_intent.succeeded` handler here. Live PI events (last MCP) target the dashboard host.

3. **HIGH — Public checkout by `enrollment_id` only**  
   No auth on checkout creation. Mitigated by UUID entropy + server-fixed amount (no arbitrary `priceId`). Tighten if enrollments become enumerable.

4. **HIGH — `amount_total` null coalesced to expected price (fixed)**  
   Prior code used `session.amount_total ?? SAFETY_ENROLLMENT_AMOUNT_CENTS`, which fail-opened when Stripe omitted `amount_total`. Now requires an exact match; also rejects non-`paid` `payment_status` when present.

5. **MEDIUM — Concurrent webhook race**  
   Idempotency checks `status === "provisioned"` without unique constraint / event-id store; rare double-provision under simultaneous redelivery.

6. **MEDIUM — Shared DB Stripe columns unused by this app’s handlers**  
   Schema-ready for leader tenants; ownership lives in sibling apps.

7. **INFO — Prefer restricted keys (`rk_`)**  
   Recommend least-privilege RAK; do not rotate here.

8. **INFO — Stripe Node SDK / API version lag vs plugin latest**  
   Optional upgrade; out of scope for audit-only.

9. **INFO — No Customer Portal**  
   Appropriate for one-time SafeStart.

10. **INFO — Prior audit PR #1 still open**  
    Branch `cursor/stripe-config-and-functionality-4276` had overlapping env/metadata fixes not yet on `main`; re-applied + extended here.

---

### Fixes applied / deferred

**Applied (safe, in-repo):**
- Clarified Stripe section in `.env.local.example` (SafeStart + webhook path + key hygiene; fail-closed 501).
- Tracked `ONBOARDING_PAYMENT_AMOUNT_CENTS` and `CRON_SECRET` in `scripts/check-env.ts`.
- Added Checkout `metadata.type = "safestart"` + Zod optional literal.
- Documented expected webhook path/events on the route.
- Fail-closed HTTP status **501** when Stripe unset (checkout, PI, webhook).
- Fail-closed amount/`payment_status` checks in webhook handler.

**Deferred:**
- Authenticate Stripe + Supabase MCP for this automation; re-run live checks.
- Human Dashboard: webhook URL for this host + `checkout.session.completed`.
- Wire or remove incomplete onboarding PaymentIntent surface.
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
| A. Config & env | Pass; local key mode unknown |
| B. Setup & architecture | SafeStart Checkout+webhook sound in code; onboarding PI incomplete; portal N/A |
| C. Live Stripe MCP | needsAuth this run; CRITICAL mismatch from 2026-08-03 still assumed open |
| D. Supabase MCP | Unavailable |
| E. Security & PCI | Signature + raw body OK; amount fail-closed fixed; checkout unauthenticated |
| F. Safe auto-fixes | Env/docs/metadata + 501 + amount/payment_status harden |
