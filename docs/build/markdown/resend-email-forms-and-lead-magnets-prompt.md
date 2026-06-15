# Agent prompt: Resend email, contact forms, notifications, and lead magnets (movemental)

Use this document as the **single execution brief** when wiring or extending email-driven flows on the **movemental** marketing site (`movemental` repo), in continuity with the **alan-hirsch** reference app and the **movemental-visual-editor** admin/dashboard backend.

---

## 1. Outcomes (definition of done)

1. **Resend** is the only transactional provider: API key stored as `RESEND_API_KEY`; sending domain verified; production `from` uses that domain (not `onboarding@resend.dev` except local smoke tests).
2. **movemental** can send: book welcome / export confirmations, contact-form submitter acknowledgments, and optional **internal** contact notifications when configured.
3. **Contact** (`POST /api/contact`): persists to Postgres, rate-limits by IP, and triggers email side-effects without failing the HTTP response if email is misconfigured (degraded mode: DB success, log email errors).
4. **Lead magnets** (newsletter, gated PDFs, sequences): documented path for double opt-in, confirm links, and idempotent sends—implemented either here or via shared API with visual-editor, but **one source of truth** for subscriber state (avoid duplicating subscription rows across Resend Audiences and Postgres without a sync plan).
5. **You** can reliably **talk to customers**: `replyTo` on internal notifications points at the submitter; public-facing `from` is a verified mailbox or branded sender; optional `RESEND_FROM_NAME` matches site brand.

---

## 2. Canonical references (read before coding)

| Area | Location |
|------|----------|
| **movemental** Resend client | `src/lib/email/resend.ts` — lazy `getResend()` (no key → `null`, no crash at import). |
| **movemental** From header | `src/lib/email/from.ts` — `resendFromHeader()` using `RESEND_FROM_EMAIL` + optional `RESEND_FROM_NAME`. |
| **movemental** Book transactional | `src/lib/book-email.ts` — welcome + export confirmation via SDK. |
| **movemental** Contact email | `src/lib/email/contact-notifications.ts` — team notify + submitter ack. |
| **movemental** Contact API | `src/app/api/contact/route.ts` — DB insert + `Promise.all` email hooks. |
| **movemental** Env schema | `src/lib/env.ts` — `RESEND_*`, `CONTACT_NOTIFY_EMAIL`. |
| **Alan Hirsch tenant app** (sibling) | `~/Desktop/dev/repos/movemental-sites/alan-hirsch/src/lib/email/resend.ts`, `send-confirmation.ts` — double opt-in HTML pattern, `RESEND_FROM_DOMAIN` naming (legacy; prefer `RESEND_FROM_EMAIL` on movemental). |
| **movemental-visual-editor** (backend) | `~/Desktop/dev/repos/movemental-visual-editor/src/lib/email/client.ts`, `send.ts`, `templates/*.tsx`, `src/app/api/email/preview/route.tsx` — React Email + `resend.emails.send({ react: ... })`, preview route **dev-only**. |
| **Parity / roadmap notes** | `docs/build/prompts/email-subscription-user-management-parity.md` — Stripe + newsletter parity checklist. |

---

## 3. Resend account and DNS (human + agent checklist)

Follow the official flow (do not invent DNS values—copy from the Resend dashboard for your domain):

1. **API key**: [API keys](https://resend.com/api-keys) → set `RESEND_API_KEY` in Vercel + `.env.local` (never commit secrets).
2. **Domain**: [Domains](https://resend.com/domains) → add domain → add required **SPF**, **DKIM**, and any **MX** records Resend shows → wait for “Verified”.
3. **From address**: Set `RESEND_FROM_EMAIL` to an address on the verified domain (e.g. `hello@movemental.ai` or `updates@movemental.ai`).
4. **Display name**: Set `RESEND_FROM_NAME` (e.g. `Movemental`) so inbox clients show a friendly sender.
5. **Testing**: Use Resend’s [test addresses](https://resend.com/docs/send-with-nextjs) (`delivered@resend.dev`, etc.) only in non-production; production must use real verified domains per Resend guardrails.
6. **Docs index**: [resend.com/docs/llms.txt](https://resend.com/docs/llms.txt) for discovering topics (webhooks, scheduling, audiences, inbound).

---

## 4. Environment variables (movemental)

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | For any send | Bearer token (`re_…`). |
| `RESEND_FROM_EMAIL` | Production sends | Verified sender email. |
| `RESEND_FROM_NAME` | Optional | `Name <email>` in From. |
| `CONTACT_NOTIFY_EMAIL` | Optional | Internal recipient for new contact rows; **Reply-To** = submitter. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Absolute links in emails (metadata + book URLs). |

Sync: `vercel env pull .env.local`, merge shared secrets with `pnpm env:local-from-shared`, validate with `pnpm check:env` (required keys only; optional keys documented in `scripts/check-env.ts`).

**movemental-visual-editor** uses the same provider with `RESEND_FROM_NAME` + `NEXT_PUBLIC_APP_URL` — align naming when copying patterns; do not assume env names are identical across repos.

---

## 5. Implementation phases (for the agent)

### Phase A — Baseline (likely already done in movemental)

- [x] `resend` package installed; `getResend()` used instead of raw `fetch` to the REST API.
- [x] Book routes: `src/app/api/book/subscribe/route.ts`, `src/app/api/book/export/route.ts` call `sendBookSubscriberWelcome` / `sendBookExportConfirmation` and handle `{ ok: false }` appropriately (log / surface to client if needed).

### Phase B — Contact form to “conversation ready”

- [ ] Confirm `CONTACT_NOTIFY_EMAIL` is set in production to the inbox you actually monitor (e.g. shared `hello@` or CRM inbox).
- [ ] Copy tone for submitter ack from `sendContactSubmitterAck` or adjust to match brand voice; keep **plain text + HTML** in sync.
- [ ] If replies should go to a human **different** from `CONTACT_NOTIFY_EMAIL`, add optional `CONTACT_REPLY_TO_EMAIL` (new env) and pass as `replyTo` on the **submitter ack** only—spec explicitly before implementing.

### Phase C — Lead magnets and list growth

1. **Storage**: **Postgres `newsletter_subscribers`** is authoritative for site newsletter consent (`organization_id` from `TENANT_ORG_ID`). See [contact-newsletter-operations-playbook.md](./contact-newsletter-operations-playbook.md).
2. **Double opt-in** (implemented): `POST /api/newsletter` → `pending` + `confirmation_token` → Resend → `GET /api/newsletter/confirm?token=…` → `confirmed`. Sender HTML in `src/lib/email/send-newsletter-confirmation.ts`.
3. **Attachments**: Book PDF / EPUB delivery via Resend `attachments` ([SDK reference](https://resend.com/docs/send-with-nextjs)) once files are generated server-side; keep under size limits.
4. **Sequences**: Either Vercel Cron + movemental API routes calling staged sends, or Resend-native features (scheduled sends, audiences)—document the choice in code comments so the next agent does not duplicate logic.

### Phase D — React Email (optional quality upgrade)

- [ ] Add `@react-email/components`, `@react-email/render`, dev `react-email` CLI per `.claude/skills/email-setup/SKILL.md`.
- [ ] Port or share templates with visual-editor under a **single design spec** (movemental editorial, not generic SaaS).
- [ ] Add a **dev-only** preview route (copy pattern from `movemental-visual-editor/src/app/api/email/preview/route.tsx`) — **never** expose in production.

### SDK note — idempotency keys

Resend’s API supports `idempotencyKey` for safe retries ([send-with-nextjs](https://resend.com/docs/send-with-nextjs)). The `resend` package’s TypeScript types may lag the API; confirm typings after `pnpm add resend@latest` before adding keys to `emails.send()`.

### Phase E — Observability and abuse

- [ ] Log Resend `{ data, error }` failures (already partially done); consider Sentry breadcrumbs on `/api/contact` and book routes.
- [ ] Rate limiting: contact route uses in-memory IP limit (resets on deploy). For production hardening, consider Upstash Redis or edge middleware counters (document in ADR or RUNBOOK).
- [ ] Webhooks: optional Resend webhook endpoint for bounces/complaints → mark subscribers suppressed in Postgres ([Inbound / event docs](https://resend.com/docs/llms.txt) — pick the right page from the index).

### Phase F — “Communicate with customers” operations

- [x] Playbook: [contact-newsletter-operations-playbook.md](./contact-newsletter-operations-playbook.md) (who reads `CONTACT_NOTIFY_EMAIL`, newsletter vs DB, weekly checks).
- [ ] Unsubscribe / preference center for any **non-transactional** marketing send (legal + deliverability); transactional receipts may omit unsubscribe but should still be clearly branded.

---

## 6. Verification script (local)

1. `pnpm check:env` — required vars present.
2. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, optional `RESEND_FROM_NAME`, `CONTACT_NOTIFY_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
3. Submit contact form against `pnpm dev` — expect 200, row in `contact_submissions`, two emails in Resend dashboard (if notify email set) or one (ack only).
4. Book subscribe smoke test — expect welcome email in Resend **Emails** tab.
5. `pnpm typecheck` && `pnpm lint`.

---

## 7. Explicit non-goals (unless product asks)

- Switching ESP (SendGrid, Postmark) without a migration plan.
- Storing full message bodies in Resend instead of Postgres for contact (DB remains source of record for movemental contact copy).
- Using `onboarding@resend.dev` in production `from`.

---

## 8. One-line agent instruction (paste at top of a task)

> Implement or extend Resend-powered transactional email on movemental using `getResend()`, `resendFromHeader()`, and existing `src/lib/email/*` + `src/lib/book-email.ts`; keep env vars in `src/lib/env.ts` and `.env.local.example` in sync; align advanced templates and preview routes with `movemental-visual-editor/src/lib/email/`; follow [Resend Next.js + SDK guardrails](https://resend.com/docs/send-with-nextjs); ensure contact and lead flows remain DB-authoritative with graceful degradation when `RESEND_API_KEY` is unset.
