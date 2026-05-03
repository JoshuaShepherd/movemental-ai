# Contact and newsletter operations (movemental)

Short playbook for **who reads what** and how email ties to the database.

## Go-live env (Vercel + local)

Set in **production** (and preview/staging as needed):

| Variable | Role |
|----------|------|
| `RESEND_API_KEY` | All transactional mail |
| `RESEND_FROM_EMAIL` | Verified domain sender |
| `RESEND_FROM_NAME` | Display name in From |
| `NEXT_PUBLIC_SITE_URL` | Canonical links in email and redirects |
| `TENANT_ORG_ID` | **Required** for `POST /api/newsletter` (503 without) |
| `CONTACT_NOTIFY_EMAIL` | Team copy for `POST /api/contact` |
| `NEWSLETTER_UNSUBSCRIBE_SECRET` | **Recommended** (≥16 chars): signs one-click unsubscribe URLs in the confirmation email |

Smoke checks: [comms-smoke-test.md](comms-smoke-test.md) and `pnpm smoke:comms`.

## Contact form (`POST /api/contact`)

- **Record of truth:** `contact_submissions` in Postgres.
- **Submitter:** receives an acknowledgment from Resend when `RESEND_API_KEY` is set (`sendContactSubmitterAck`).
- **Team:** when `CONTACT_NOTIFY_EMAIL` is set, that inbox receives a copy with **Reply-To** set to the submitter so you can reply directly.
- **If email fails:** the row is still saved; errors are logged. Check Resend dashboard and env (`RESEND_FROM_EMAIL` on a verified domain).

## Newsletter (footer and other `source` values)

- **Record of truth:** `newsletter_subscribers` with `status` `pending` → `confirmed` after double opt-in; `unsubscribed` after one-click unsubscribe.
- **Requires `TENANT_ORG_ID`:** signups return **503** without it so rows are not written to a null org.
- **Flow:** `POST /api/newsletter` stores `pending` + `confirmation_token`, sends confirm mail; user hits `GET /api/newsletter/confirm?token=…` and is redirected to `/newsletter/confirmed`.
- **Unsubscribe:** When `NEWSLETTER_UNSUBSCRIBE_SECRET` is set (≥16 characters), the confirmation email includes a link to `GET /api/newsletter/unsubscribe?token=…`, which sets `unsubscribed_at` and `status = unsubscribed`, then redirects to `/newsletter/unsubscribed`. Re-signup with the same email is allowed (row returns to `pending`).
- **Resend:** same `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `RESEND_FROM_NAME` as other transactional mail.

## Broadcast and list strategy (post-launch decision)

Pick **one** primary source of truth for “who may receive bulk mail”:

1. **Query Postgres** — export or cron job selecting `status = 'confirmed'` AND `unsubscribed_at IS NULL` (and optionally dedupe by `email`). Fits compliance; no extra vendor sync.
2. **Resend Audiences** — sync from confirmed rows only when you have a defined idempotent sync (webhook or nightly job). Avoid manual double-entry.
3. **Dedicated ESP (Kit, Beehiiv, etc.)** — subscribe confirmed users via API from a cron after opt-in; document the handoff so consent state stays in Postgres until mirrored.

Until a broadcast path exists, transactional mail is confirmation + contact + book only. See [comms-rate-limiting.md](comms-rate-limiting.md) before scaling traffic.

## Lead magnets and sequences

- Prefer **cron routes + this DB** for staged sends until you explicitly adopt Resend Audiences or another ESP; avoid two sources of truth for consent.

## Weekly ops

- Spot-check Resend **Emails** for bounces after broadcasts.
- Export or query `newsletter_subscribers` where `status = 'confirmed'` and `unsubscribed_at IS NULL` for campaign tooling when needed.
