# Step 3 — Capability mapping template

Map **audience needs** to **platform capabilities** with explicit posture: reuse / extend / net-new.

Stack defaults (edit if different):

- Next.js App Router *or* Vite + Tailwind
- Supabase (Postgres + RLS + Storage)
- Vercel
- Stripe + Shopify (define boundary)
- Resend
- Agents: OpenAI / Anthropic / Gemini + RAG + tenant scope

---

## Commerce boundary (decide once)

| Topic | Owner | Notes |
|-------|-------|-------|
| Merchant of record | Stripe / Shopify / hybrid | |
| Subscriptions / seats | | |
| Catalog / SKUs / fulfillment | | |
| Tax / invoices | | |

---

## Capability table

| # | Audience need (from Step 1) | Capability | Posture (reuse / extend / net-new) | Surface (marketing / app / admin / agent) | Data entities | RLS notes | Integrations | Proof for demo |
|---|------------------------------|------------|--------------------------------------|---------------------------------------------|---------------|-----------|----------------|------------------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |

---

## PII / retention / audit

| Data class | Stored where | Who can read | Retention | Export / delete |
|------------|--------------|--------------|-----------|-----------------|
| | | | | |

---

## Resend email map

| Trigger | Template | Recipient | Idempotency key idea |
|---------|----------|-----------|----------------------|
| | | | |

---

## Cut lines (if schedule slips)

**Must ship for demo credibility:**


**Can defer post-demo:**

