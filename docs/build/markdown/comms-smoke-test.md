# Communication surfaces smoke test

Use after `pnpm drizzle:push` (or equivalent) on the target database and with `.env.local` / Vercel env filled for [contact-newsletter-operations-playbook.md](contact-newsletter-operations-playbook.md).

## 1. Automated env check

```bash
pnpm check:env
pnpm smoke:comms
```

## 2. Contact (`POST /api/contact`)

Replace host and JSON as needed:

```bash
curl -sS -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Test","email":"you@example.com","audience_segment":"Other","message":"At least ten chars for validation."}'
```

Expect `{ "success": true }`. Verify `contact_submissions` row and (if `RESEND_API_KEY` set) Resend inbox / ack.

## 3. Newsletter (`POST /api/newsletter`)

Requires `TENANT_ORG_ID`.

```bash
curl -sS -X POST "http://localhost:3000/api/newsletter" \
  -H "Content-Type: application/json" \
  -d '{"email":"you+newsletter@example.com","source":"smoke"}'
```

Expect `pending_confirmation` and `emailSent: true` when Resend is configured. Click confirm in email; row should become `confirmed`. If `NEWSLETTER_UNSUBSCRIBE_SECRET` is set, use the unsubscribe link in the email and confirm `status = unsubscribed` and `unsubscribed_at` set.

## 4. Book subscribe (`POST /api/book/subscribe`)

```bash
curl -sS -X POST "http://localhost:3000/api/book/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email":"you+book@example.com","lens":"movement-leaders","source":"lens_selector"}'
```

Expect `{ "success": true, "emailSent": true }` only when Resend is configured; otherwise `emailSent: false` with `resend_not_configured`.

## 5. Vitest (token helper)

```bash
pnpm test:run tests/unit/newsletter-unsubscribe-token.test.ts
```
