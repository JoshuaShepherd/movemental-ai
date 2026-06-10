# INT-09 — Discuss transition + capture seam (`kind:'discuss'`)

**Prompt ID:** INT-09
**Target agent:** Cursor / Claude Code
**Primary repo:** `movemental-ai`
**Blocks:** INT-08
**Status:** Done ✅ (stub capture gate + transitions; flag-gated; headless-verified)
**Last updated:** 2026-06-10

**Design authority:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) §5.4–5.5, §8.

---

## 1. Role and stance

Wire **Guide → Discuss** entry points and the **capture funnel** for Discuss — the highest-intent surface in the room. Reuse the on-brand **`capture`** form-cell (same component family as `map` / `paid` / `free` kinds). Submissions call **`submitLead(kind, payload)`** → in-memory **`LEADS`** stub today (no backend). Do not invent new endpoints.

Stub mode **must not dead-end** visitors who want depth: acknowledge honestly, render capture — do not pretend stub is live multi-turn LLM chat.

---

## 2. Capture component contract

Add or extend the agent-room capture form-cell:

```ts
type CaptureKind = "map" | "paid" | "free" | "discuss";

submitLead(kind: CaptureKind, payload: {
  email: string;
  org?: string;
  role?: string;
  sessionId?: string;
  transcriptSummary?: string; // optional excerpt for operator
}): void; // → LEADS in-memory stub
```

**`kind:'discuss'`** copy (tunable):

- Headline: *“Want me to have the team pick this up with you?”*
- Fields: email (required), org, role (optional).
- Renders **into the sheet** like any other screen figure; agent may gesture `#capture`.

If `capture` component does not exist yet, implement it here as an Ink Band sheet figure (mono labels, paper inputs, `.cf-submit` pattern per INK_BAND design chain) before wiring transitions.

---

## 3. Stub mode — capture gate (production path)

On **accepted** Discuss transition (explicit chip, consent after implicit offer, or post-readback “Keep talking”):

1. Agent speaks **one honest ink line** — e.g. *“That deserves a real conversation — leave your email and we’ll follow up.”*
2. **`SHOW` / append** `capture` (`kind:'discuss'`) on the sheet.
3. Submit → `submitLead('discuss', payload)` → `LEADS`.
4. Success state: same animated check / confirm pattern as other capture kinds.

**Do not** show “Open conversation needs the live agent” or infrastructure notices.

**Dev/Storybook only:** limited stub discuss (local transcript + `routeInput` on last message) — not product.

---

## 4. Stream mode — capture moments (UI ready; agent invokes in INT-05/INT-10)

| When | Behavior |
| --- | --- |
| Substantive Discuss exchange | Agent `ui_render`s `capture` (`kind:'discuss'`) when thread earned follow-up |
| Turn-cap (~**6–8 agent turns** in Discuss, tunable via env or constant) | Agent offers human continuation via same capture cell — **not** redirect to `/contact`, **not** hard wall |
| Stub Discuss transition | Immediate capture per §3 |

Increment `discussTurnCount` on each completed **assistant** turn while `phase === "discuss"`.

---

## 5. Entry points (wire in stub + stream)

| Scene / screen | Chip / trigger | Action |
| --- | --- | --- |
| `readback` | “Talk through what this means for us” | Offer Discuss → stub: capture gate; stream: `enterDiscuss` |
| `path` | “Our situation is more complicated than this” | Same |
| `safety` | “I have a specific policy question” | Same |
| `pricing` | “We can’t do either option yet — discuss?” | Same |
| Global fallback | “Switch to open conversation” | Stub → capture; stream → Discuss offer |
| Composer legend | “Switch to open conversation” / “Back to guided path” | Phase toggle |
| Implicit (§INT-08) | Consent chips after primary signals | `enterDiscuss` or stay Guide |

Wire stub chips in `scenes.ts` / `suggest` acts; stream chips via INT-05 `suggest` chunk.

---

## 6. sessionStorage (Discuss refresh survival)

Persist while `phase === "discuss"`:

- `movemental-room-discuss-phase`
- `movemental-room-discuss-transcript` (JSON)

Restore on mount; clear on replay confirm. **No Supabase** for anonymous transcript (endpoint readiness — design note §6.3). Captured leads use `submitLead` seam when backend wires.

---

## 7. Definition of Done

- [x] `capture` component supports `kind:'discuss'`; renders on sheet; submits via `submitLead`. *(headless: `#capture` discuss variant + `[lead] discuss {…}`)*
- [x] Stub Discuss path → honest ink line + capture — **no dead-end notice**. *(verified: no "needs the live agent"/infrastructure text)*
- [x] Explicit + post-readback entry chips wired (stub minimum). *(readback / path / safety / pricing / consent → `toDiscuss`)*
- [x] Implicit offer UI (consent chips) — no silent auto-transition. *(meta/objection → `discussOffer` chips, never auto-morph)*
- [x] Turn-cap constant/env documented (`DISCUSS_TURN_CAP`, env `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP`, default 7); counter (`discussTurnCount`) increments on assistant turns in Discuss.
- [x] sessionStorage restore for phase + transcript. *(headless: persist → reload restores Model B + marginalia → replay clears)*
- [x] Stub mode **zero network**; `LEADS.discuss` receives payloads in dev (`submitLead` console stub).
- [x] `pnpm typecheck` + lint green; §10 + master runner updated.

---

## 8. Verification

| Case | Expect |
| --- | --- |
| Stub: accept “Keep talking” after readback | capture cell on sheet; submit → `LEADS` |
| Stub: implicit offer → Yes | capture gate (not live LLM loop) |
| Replay in Discuss | confirm dialog; clears transcript storage |
| Refresh mid-Discuss | phase + transcript restore |
| Guide AF-12 | unchanged when Discuss not entered |

---

## §10 Attempt log

### 2026-06-10 — Claude Code (stub capture gate + transitions, UI-only)

**Outcome:** ✅ Done. The Discuss capture funnel + Guide→Discuss entry points are wired for the stub (the production path per design §5.4), flag-gated, and headless-verified. Stream-side live Discuss (agent-invoked capture at turn-cap, `enterDiscuss` on agent offer) is INT-10.

**Capture (`kind:'discuss'`).** Extended `lib/agent-room/capture.ts`: `CaptureKind += "discuss"`, a `CAPTURE_VARIANTS.discuss` ("Want me to have the team pick this up with you?" — email required, org/role optional), `LEADS.discuss`, `isCaptureKind`. No new endpoint — submits through the existing `submitLead(kind, payload)` console stub (`payload` already accepts `sessionId`/`transcriptSummary` via `LeadPayload`). `capture-screen.tsx` needed no logic change (it already dispatches on `isCaptureKind`); `confirm-screen.tsx` gained a `mode:"discuss"` branch (honest "the team will be in touch", no dead-end notice).

**Stub capture gate (scenes).** New `toDiscuss` scene (`data/scenes.ts`): honest ink line → `show capture {kind:'discuss'}` → `gesture circle #capSubmit` → `await capture` → `show confirm {mode:'discuss'}` → start-over chips. Same await/confirm pattern as `withUs`/`onOwn`. Stub never pretends to be a live LLM loop — depth routes to capture.

**Entry chips (explicit + post-readback).** `to:"toDiscuss"` added to: `beat-scenes.ts` post-readback fork ("Talk through what this means for us"), `toPath` ("Our situation is more complicated than this"), `toSafety` ("I have a specific policy question"), `cost`/pricing ("We can't do either option yet — discuss?"). Existing chips preserved (added, not replaced).

**Implicit offer (no silent transition).** `route-input.ts` gained `isMetaOrObjection()` (board/we-tried/what-if/objection patterns; length is NOT a trigger). `use-agent-room-stub.ts` `sendMessage` now tracks `freeTextStreakRef` + `fallbackStreakRef`; a primary signal (meta/objection, 3rd consecutive free-text, or ≥2 fallbacks) plays the `discussOffer` scene — consent chips **Yes, talk it through** / **Stay on the guided path** — it offers, never auto-morphs. A chip tap resets the free-text streak.

**Turn-cap.** `DISCUSS_TURN_CAP` in `discuss.ts` (env `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP`, default **7**, the "~6–8 agent turns" band). `discussTurnCount` increments on assistant transcript turns (INT-08 `appendTranscript`); the stream agent enforces the cap in INT-10.

**Flag gating.** All Discuss entry chips + the implicit offer are gated by `DISCUSS_ENABLED`: the stub `suggest` handler filters out `toDiscuss`/`discussOffer` chips when the flag is off, and `sendMessage`'s implicit branch is `DISCUSS_ENABLED &&`-gated. Flag off → Guide is exactly AF-12.

**sessionStorage (§6).** `use-discuss-phase.ts` keys `movemental-room-discuss-phase` / `movemental-room-discuss-transcript`. Restored via **lazy `useState` initializers** (not a restore effect — avoids `react-hooks/set-state-in-effect`; safe because `AgentRoomShell` only mounts the live room post-hydration). Persisted via an effect while a session exists; `resetDiscuss` (replay/home) clears. No Supabase for anonymous transcript (design §6.3); captured leads use `submitLead`.

**Verification.** UI `pnpm typecheck` ✅ · lint ✅ (only a pre-existing unused-eslint-disable warning in `capture-screen.tsx`, not from this prompt). Headless `@playwright/test` (cached chromium):

- **Flag on, stub (6/6):** meta/objection → consent chips (no auto-morph) · accept → `#capture` discuss cell on sheet (honest, no dead-end) · submit → `[lead] discuss {email:…}` logged · discuss confirm shown · **0** `/api/agent-room/stream` calls.
- **Flag off (5/5):** pricing scene has no discuss chip (original chips intact) · meta input offers no consent · no discuss markup · no `undefined` class leak.
- **sessionStorage (5/5):** enter+append → persisted phase+transcript · reload → Model B + marginalia restored · replay confirm → storage cleared.

**Deferred (noted):** the composer-legend "Switch to open conversation" toggle (entry-points table) is left for a later pass — the chip + implicit + post-readback paths cover the "explicit + post-readback (stub minimum)" DoD. Stream `enterDiscuss`-on-agent-offer + agent-invoked capture at turn-cap are INT-10.
