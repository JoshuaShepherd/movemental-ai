# Resend audit — Movemental (movemental-ai) — 2026-08-31

**Tenant = Movemental · Repo = JoshuaShepherd/movemental-ai · From domain expected = `movemental.ai` (via `RESEND_FROM_EMAIL`, e.g. `updates@movemental.ai`)**  
Branch: `cursor/resend-email-audit-a848`  
Prior unmerged audits: draft PRs #2 / #3 / #6 / #7 (safe hardening re-applied here).

## MCP

| Integration | Status |
|-------------|--------|
| Resend | **needsAuth** — namespace `ready`, but `list-domains` / `list-api-keys` / `list-webhooks` / `list-emails` / `list-logs` all return `API key is invalid`. No `mcp_auth` tool in catalog; re-auth in Automations MCP settings. |
| Supabase | **unavailable** — not present in this automation’s MCP catalog. Attach `movemental` / `vhaiiiykcukrlyvwlgip` for live subscriber evidence. |

Local cloud VM also had no `.env.local` / `DATABASE_URL`, so no read-only SQL fallback.

## Config

| Check | Result |
|-------|--------|
| Env keys / example / schema | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` optional in `src/lib/env.ts` (fail-soft intentional). Example + check/smoke/sync scripts aligned this run. Stack uses **FROM_EMAIL + FROM_NAME**, not alan-hirsch `RESEND_FROM_DOMAIN`. |
| From address & domain | Shared `resendFromHeader()` → `Name <email>`; default name **Movemental**; default email `onboarding@resend.dev` with **production warn** when still on `@resend.dev`. |
| APP_URL for confirm links | `NEXT_PUBLIC_SITE_URL` with fallback `https://movemental.ai` in newsletter confirm / unsub / email helpers. |
| Client key exposure | No `NEXT_PUBLIC_*` Resend secrets; no Client Component imports of `resend` / `@/lib/email/*`. |
| Package | `resend` ^6.12.0; no `@react-email/*` (inline HTML templates accepted). |

## Setup

| Check | Result |
|-------|--------|
| `getResend` lazy + fail-soft | Yes — null when unset; Sentry warning once; now `import "server-only"`. |
| Server-only send paths | All send helpers under `src/lib/email/**` + `book-email.ts` use `server-only` and are called from API routes / services only. |
| Double opt-in newsletter | Yes — POST `/api/newsletter` inserts/updates `pending` + `confirmation_token`; GET `/api/newsletter/confirm` sets `confirmed` and clears token. Same table. Rate-limited; scoped by `TENANT_ORG_ID` / `organization_id`. |
| Unsubscribe | Signed one-click via `NEWSLETTER_UNSUBSCRIBE_SECRET` (≥16 chars). |
| Supabase Auth email vs Resend | **Distinct** — OTP / password reset use Supabase Auth mailer (`signInWithOtp`, `resetPasswordForEmail`). Resend covers transactional/marketing product mail (newsletter confirm, contact notify, onboarding, book, toolkit, agent-room leads). |
| Webhooks in code | No `/api/webhooks/resend`; `RESEND_WEBHOOK_SECRET` documented as future-only in `.env.local.example`. |
| Templates | Inline HTML (no React Email preview route) — LOW if skill recommends preview. |

## Live Resend (MCP)

| Check | Result |
|-------|--------|
| Domain verified | **[?] NEEDS MCP** — cannot list domains until API key is valid. |
| API keys metadata | **[?] NEEDS MCP** |
| Webhooks | **[?] NEEDS MCP**; repo has no receiver → Dashboard webhooks would be INFO/unused even if present. |
| Recent delivery health | **[?] NEEDS MCP** — no aggregate bounce/complaint view. |
| Templates drift | N/A / INFO — in-repo inline HTML; dashboard templates not compared. |

## Supabase

| Check | Result |
|-------|--------|
| Subscriber/confirm evidence | **Code/schema only** — `newsletter_subscribers` has `status`, `confirmation_token`, `confirmed_at`, `unsubscribed_at`, `organization_id` (required). Confirm API updates the same table subscribe inserts. |
| Tenant scoping | Subscribe path requires `getTenantOrgId()`; rows keyed by email + `organization_id`. |
| Stuck pending / token TTL | **MEDIUM (deferred)** — no confirmation token expiry in schema or confirm route; pending tokens remain valid indefinitely. |
| Live counts | Not available (no Supabase MCP / no `DATABASE_URL` in this run). |

## Compliance & deliverability

| Check | Result |
|-------|--------|
| Consent / double opt-in | Newsletter list: yes. Toolkit / agent-room lead magnets: intentional immediate confirm (transactional delivery exception) — documented in prior audits. |
| Unsubscribe for ongoing marketing | Present for newsletter confirmation + toolkit follow-ups when secret set. |
| Transactional vs marketing | Separated by flow/tags; auth reset not mixed into Resend promo. |
| Bounce/complaint suppression | **MEDIUM for launch marketing** — no Resend webhook receiver; relies on Resend account auto-suppression only. |
| From domain ↔ public site | Intent: `*@movemental.ai` ↔ `https://movemental.ai`; live verification blocked. |

## Findings (CRITICAL → LOW)

1. **HIGH (ops)** — Resend MCP API key invalid for fifth consecutive weekly run (2026-08-03 → 08-31). Live domain / deliverability audit blocked. Re-auth Automations → Resend MCP.
2. **HIGH (ops)** — Supabase MCP still not attached to this automation; cannot verify subscriber hygiene or stuck-pending rates.
3. **MEDIUM** — No confirmation-token TTL on `newsletter_subscribers` / confirm route.
4. **MEDIUM** — No in-app bounce/complaint webhook → limited list hygiene beyond Resend’s automatic suppressions.
5. **MEDIUM / launch** — Production still able to fall back to `onboarding@resend.dev` if `RESEND_FROM_EMAIL` unset (mitigated this run by default From name + prod console warn + `check-env` gap).
6. **LOW** — No `idempotencyKey` on Resend sends (retry duplicates possible).
7. **LOW** — No React Email preview route; inline HTML only.
8. **LOW** — `.claude/skills/email-setup` symlink target missing in this workspace (`my-skills/email-setup`).
9. **INFO** — Draft audit PRs #2 / #3 / #6 / #7 still open; close superseded drafts when a hardening PR merges.
10. **INFO** — No `tenant.config.ts` in this org-site repo; brand strings use `Movemental` / env — appropriate for movemental-ai (not a leader tenant).

## Fixes applied / deferred

### Applied (this PR)

- `src/lib/email/resend.ts` — `import "server-only"`.
- `src/lib/email/from.ts` — default From name `Movemental`; prod warn on `@resend.dev`.
- `src/lib/email/onboarding-emails.ts` — shared `resendFromHeader()` (drops duplicate `movementalFrom`).
- `src/lib/email/send-public-page-ratified.ts` — `server-only`, skip warn, typo fix in sign-off.
- `.env.local.example` — document FROM_EMAIL/FROM_NAME (not FROM_DOMAIN), example verified sender, future `RESEND_WEBHOOK_SECRET`.
- `scripts/check-env.ts` — warn when production From still on `resend.dev`; require `RESEND_FROM_EMAIL` in prod comms gap list.
- `scripts/smoke-comms-env.ts` — include `RESEND_FROM_NAME` + clearer notes.
- `scripts/merge-env-local-from-shared.mjs` / `sync-vercel-env-from-shared.mjs` — sync `RESEND_FROM_NAME`, `CONTACT_NOTIFY_EMAIL`, `NEWSLETTER_UNSUBSCRIBE_SECRET`.

### Deferred (product / ops)

- Re-auth Resend MCP; verify `movemental.ai` SPF/DKIM/DMARC.
- Attach Supabase MCP; query status counts / orphan pending tokens.
- Confirmation token TTL + bounce/complaint webhook route + send idempotency keys.
- Merge or close stack of superseding draft audit PRs.

## Explicit non-actions

- No production sends, broadcasts, or batch mail to `newsletter_subscribers`
- No DNS changes, domain deletes, or API key rotation
- No DB migrations / DDL
- No merge to `main`
