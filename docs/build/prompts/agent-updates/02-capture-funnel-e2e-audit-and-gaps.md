# AU-02 — Capture funnel E2E audit and gap closure

**Prompt ID:** au-02-capture-funnel-e2e  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 1 · [home-page-ctas-capture-and-ai-engagement.md](../../notes/home-page-ctas-capture-and-ai-engagement.md)

**Companion (full waterfall):** [wire-capture-and-enrollment-to-backend.md](../wire-capture-and-enrollment-to-backend.md)

Paste the block below into a fresh agent turn.

---

## Problem statement

The agent room presents capture surfaces (`map`, `paid`, `free`, `discuss`) but **business value requires durable rows + emails**. `submitLead()` in `src/lib/agent-room/capture.ts` POSTs to `/api/agent-room/capture` — verify what is wired vs still stub/mock, then close gaps without duplicating the full waterfall prompt if already done.

---

## The prompt

> You are auditing and completing the **agent-room capture funnel end-to-end**. UI without persistence is theatre. Your job is to prove every capture path writes to Postgres (tenant-scoped) and triggers the correct email/notify side effects — or document an honest blocker.
>
> ### 0. Orient first
>
> 1. Read [home-page-ctas-capture-and-ai-engagement.md](../../notes/home-page-ctas-capture-and-ai-engagement.md).
> 2. If [wire-capture-and-enrollment-to-backend.md](../wire-capture-and-enrollment-to-backend.md) phases are incomplete, **execute remaining phases there first**; this prompt is the **sign-off audit**.
> 3. Map the seam:
>
> | Surface | File | Expected API |
> | --- | --- | --- |
> | Capture forms | `capture-screen.tsx`, `readback-map-email.tsx`, `handbook-dock-email.tsx`, `safety-flow-diy.tsx` | `/api/agent-room/capture` via `submitLead` |
> | Contact screen | `contact-screen.tsx` | `/api/contact` |
> | Paid enroll | `safety-flow` signup, `/enroll` | `/api/agent-room/enroll` + Stripe |
> | Toolkit / field guide | archived forms | `/api/toolkit-download` |
>
> 4. Baseline: `pnpm validate:all && pnpm typecheck`
>
> ### 1. Audit matrix (fill in PR)
>
> For each capture kind, trace **UI submit → network → DB row → email**:
>
> | Kind | UI reachable from | POST endpoint | Table(s) | Email | Status |
> | --- | --- | --- | --- | --- | --- |
> | `map` | readback | | | | |
> | `paid` | capture / enroll | | | | |
> | `free` | handbook / DIY | | | | |
> | `discuss` | Discuss cap | | | | |
> | contact | contact screen | | | | |
>
> Use Supabase MCP or `pnpm db:studio` to confirm rows after manual test.
>
> ### 2. Fix gaps (minimal scope)
>
> **Contact screen:** If still client-only mock success, wire to existing `/api/contact` (schema already exists).
>
> **Capture screen paid:** Ensure `organizationInquiries` or enroll route receives org + contact fields.
>
> **Silent Resend failure:** When `RESEND_API_KEY` unset, log visibly in dev; consider admin notify fallback per CTAs note.
>
> **Newsletter result pages:** `/newsletter/confirmed`, `/newsletter/unsubscribed` — create if 404.
>
> Do **not** rebuild tables that already have full generated chains.
>
> ### 3. Automated tests
>
> Add or extend:
> - Unit test for `submitLead` body shape (mock `fetch`)
> - Route handler test for `/api/agent-room/capture` validation (Vitest)
> - Optional Playwright: submit map email on readback with mocked API → expect POST
>
> ### 4. Operator checklist (append to PR)
>
> ```markdown
> - [ ] map capture → agent_room_leads + newsletter
> - [ ] free handbook → PDF email (or honest skip if Resend unset)
> - [ ] paid → org inquiry or enroll
> - [ ] discuss → contact_submissions or discuss inbox
> - [ ] contact screen → contact_submissions
> ```
>
> ### 5. Update docs
>
> Revise [home-page-ctas-capture-and-ai-engagement.md](../../notes/home-page-ctas-capture-and-ai-engagement.md) §1–4 status lines to match reality.

---

## Definition of done

- [ ] Audit matrix complete with green rows or documented blockers
- [ ] Contact screen POSTs to real API (if it was stub)
- [ ] At least one automated test covers capture POST contract
- [ ] `pnpm typecheck` + `pnpm validate:all` green
- [ ] CTAs note updated

## Verification commands

```bash
pnpm validate:all
pnpm typecheck
pnpm test:run tests/unit/*capture* 2>/dev/null || pnpm test:run
# Manual: dev server + submit each form; query agent_room_leads
```

## Do not

- Drop or rename live DB columns
- Hand-edit generated simplified layer files — regenerate from schema
- Commit secrets or `.env.local`
