# Home page CTAs, capture wiring, and how AI is actually triggered

_Notes for product decisions, 2026-06-10. Findings are from the current `main` tree._

---

## 1. Should the organizational assessment be a secondary CTA / link on the home page?

**Yes — it's the strongest free, data-rich offer we have, and it's mostly built but not surfaced.** The data layer exists (`assessments`, `userAssessments`, `assessmentResponses`, `systemReadinessAssessments`, `dualIntelligenceAssessments` tables + full CRUD APIs + hooks), and the in-room "beat" UI already renders questions and captures answers. What's missing is the magic-link front door and the persistence seam: `submitLead()` in [capture.ts](../../../src/lib/agent-room/capture.ts) is still `console.log` + `// TODO: POST`. Recommend: ship it as a standalone magic-link mini-app, then add a secondary home CTA. Real, low-friction lead data — worth doing.

## 2. Is the lead magnet set up and working?

**Mostly yes.** Email capture + day-0 download both work: [api/toolkit-download/route.ts](../../../src/app/api/toolkit-download/route.ts) validates, rate-limits, writes to `newsletter_subscribers`, and emails the PDF via Resend (Safety + Sandbox guides exist in `public/downloads/`). **Gaps:** (a) the **frontend forms are archived** under `_archive/pre-marketing-migration-2026-06/` — not on the live site; (b) day-3/day-7 follow-ups are stubbed (`// TODO: Vercel Cron`); (c) the sandbox "review" path records a lead but sends nothing and notifies no one. Verdict: backend WORKING, frontend needs re-wiring.

## 3. Is the safety dashboard set up for full enrollment?

**No — it's a mockup.** [safety-screen.tsx](../../../src/components/agent-room/screen/stub/safety-screen.tsx) shows the free-vs-$1,000 pricing copy but captures nothing. The right table exists — `organizationInquiries` (org_name, contact_name, email, org_type, team_size, current_tools, timeline, budget_range) with a working CRUD API — but **no form is wired to it**. Enrollment data (org info + contact person) is not collected or stored anywhere today. This is the biggest gap of the four.

## 4. Is the contact form wired up?

**API yes, frontend no.** [api/contact/route.ts](../../../src/app/api/contact/route.ts) fully works: validates, writes to `contact_submissions`, notifies `CONTACT_NOTIFY_EMAIL`, and sends the submitter an ack (Resend). But [contact-screen.tsx](../../../src/components/agent-room/screen/stub/contact-screen.tsx) is **UI-only by design** (per AF-90) — it mock-succeeds client-side and never POSTs. So no real contact submissions reach the API. One small change (wire the form to the endpoint) closes this.

---

## 5. Other improvements needed (not capped at 100 words)

- **The single highest-leverage fix:** wire `submitLead()` ([capture.ts:105](../../../src/lib/agent-room/capture.ts)) to a real capture endpoint. It's the one seam that connects every in-room form (assessment readback, lead magnet, paid-dashboard enrollment) to the backend. Until it's done, the room collects nothing.
- **`/` is a redirect to `/agent`** ([page.tsx](../../../src/app/page.tsx)) — "temporary, remove when marketing repo merges." There is no real marketing home page yet; all CTAs are implicit agent-room navigation, not page-level links. A juicy "assessment" secondary CTA has nowhere to live until a home page exists.
- **Newsletter result pages missing:** `/newsletter/confirmed` and `/newsletter/unsubscribed` don't exist; redirects land on bare paths. Cheap to add, looks broken without them.
- **Resend graceful-degradation is silent:** when `RESEND_API_KEY` is unset, emails are skipped with only a `console.warn` — no admin fallback. A failed lead-magnet send looks identical to success to the user.
- **Lead-magnet forms are archived**, not deleted — re-mount `ToolkitDownloadForm` / `SandboxFieldGuideGate` on a live surface rather than rebuilding.
- **Assessment is shareable on paper only:** `assessmentShareTokens` table exists but no UI generates or consumes share links — so results can't be emailed or shared yet (kills viral/data-collection upside).
- **Magic-link auth doesn't exist** — only Supabase password auth. The "free assessment with magic link" idea needs an OTP/magic-link flow built; it is not a config toggle.
- **No enrollment orchestration / state machine** — `organizations.onboarding_state` exists as a jsonb field but nothing drives it. Paid dashboard signup has no provisioning path behind the pricing copy.

**Suggested order:** (1) wire `submitLead`; (2) wire contact form to its API; (3) re-mount lead-magnet forms on a live surface; (4) build the org-inquiry enrollment form → `organizationInquiries`; (5) stand up a real home page with the assessment as a secondary CTA + magic-link app; (6) cron for day-3/7 follow-ups + newsletter result pages.

---

## 6. How is actual AI engagement triggered? Is there a longer-form chat window?

**Short answer:** the room is a **hybrid** — most of what a visitor sees is a scripted scene runner with **zero LLM calls**; live AI fires only on specific, narrow triggers. There is a longer-form chat, but it is gated behind a "Discuss" mode that is **off by default**.

**The three modes** (`NEXT_PUBLIC_AGENT_ROOM_MODE`, [mode.ts](../../../src/lib/agent-room/mode.ts)):
- `stub` — fully offline, no network, canned scenes only.
- `hybrid` — **the default.** Local scripted scenes + selective live LLM.
- `stream` — legacy "every turn hits the LLM" path.

**What the user types into** is a single-line composer ([composer.tsx](../../../src/components/agent-room/composer.tsx)) — "Type here, or tap a suggestion…". There is **no visible chat log / message history UI** in normal use.

**How a typed message is routed** ([move-classifier.ts](../../../src/lib/agent-room/move-classifier.ts) → [route-input.ts](../../../src/lib/agent-room/route-input.ts)):
1. The text is matched against a **regex table** ("cost|price" → pricing scene, "safety|charter" → safety scene, etc.). A match runs a **pre-written local scene — no LLM, no network.**
2. Only free-text that matches **nothing**, OR any input while in **Discuss** mode, OR an agent-offered suggestion chip, routes to the model.

**When it does hit the model**, it goes: composer → `runAgentStreamTurn` ([agent-stream-turn.ts](../../../src/lib/agent-room/agent-stream-turn.ts)) → **`POST /api/agent-room/stream`** ([route.ts](../../../src/app/api/agent-room/stream/route.ts)) → which proxies to the **`movemental-ai-agents` engine** (`AI_AGENTS_BASE_URL` + service secret) as an SSE stream. If those env vars aren't set, the route returns **503 "engine not configured."** The stream sends back `text_delta`, `ui_render`, `suggest`, and `ink_gesture` chunks.

**The longer-form chat** is "Discuss" mode ([discuss.ts](../../../src/lib/agent-room/discuss.ts), flag `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`, **default off**). When the user accepts a "Yes, talk it through" chip, the room stops regex-routing and **sends every typed turn to the LLM**, accumulating turns as marginalia beside the sheet, capped at ~7 assistant turns before it offers a human handoff. That is the closest thing to an open chat window — and today it's behind a feature flag.

**Not AI:** `(studio)/agent-runtime` ([page.tsx](../../../src/app/(studio)/agent-runtime/page.tsx)) is an admin DB panel for assigning corpus bindings / prompt packs — no user-facing model calls at all. Don't confuse it with the live `/agent` room.

**Bottom line for a stakeholder:** out of the box, a visitor mostly drives a scripted experience; real Claude calls happen only on unscripted free-text or in the (currently disabled) Discuss chat, and only if the `movemental-ai-agents` engine env is configured. The engine is reportedly Haiku-host / Opus-diagnostician, but that lives in the sibling repo.
