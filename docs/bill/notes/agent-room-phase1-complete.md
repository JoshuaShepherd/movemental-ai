# Agent Room — Phase 1 complete (build + wiring)

**Date:** 2026-06-05
**Scope chosen:** *Full remaining Phase 1* across both repos · room styled **Field Edition (paper)**.
Supersedes `agent-room-wiring-status.md` and `agent-room-phase1-status.md` for current state.

## TL;DR

The Agent Room is built end-to-end. The engine handoff (host → diagnostician) is
**now wired and committed**; the `/agent` room UI is built in the **Field Edition
(paper)** house style on the existing `.oat-surface` tokens. Both repos typecheck;
engine tests are **147/147**; room lints clean. A live visual smoke was blocked by a
**pre-existing, site-wide dev breakage** (see §5) — not by this work; `/agent` SSR
returns **200 with the full crawlable fallback** once chrome is hidden.

## 1. Engine (`movemental-ai-agents`) — committed `893a90f`

The host → diagnostician handoff (DoD §9.5) was the one blocked item. Fixed by adding
the model-callable handoff primitive that the runtime already knew how to follow:

| File | What |
|------|------|
| `src/lib/ai/runtime/handoff-tool.ts` (new) | `defineHandoffTool` + `interpretHandoff`; envelope mirrors the `ui_render` gate. Invalid input → plain error, no handoff. |
| `src/lib/tools/handoff-tools.tool.ts` (new) | `request_diagnosis` — carries the verbatim reality-check answers; `reason: "compose read-back"` matches the seeded handoff trigger. |
| `src/lib/ai/runtime/agent-runner.ts` | After tool execution (all 3 provider branches), detect the handoff envelope → emit a typed `agent_handoff` → continue the run in the diagnostician with the answers as its user turn. |
| `register-builtins.ts` | imports the handoff tool |
| `scripts/seed-agent-room.ts` | `request_diagnosis` tool row + host assignment (order 7); header note updated |
| `scripts/seed-data/prompts/room-host.md` | host now calls `request_diagnosis` after the last beat |
| `handoff-tool.test.ts` (new) | 3 tests (valid→envelope, invalid→no-handoff, plain passthrough) |

- **Seeded** against org `6bc0fcf7-2e55-4914-b88d-c6eb49eb0d71` (`pnpm seed:agent-room`).
- **Models (registry-real, no placeholders):** host `claude-haiku-4-5-20251001`, diagnostician `claude-opus-4-6`. There is **no `claude-opus-4-8`** in `model-registry.ts`; the brief's preference can be honored later by adding that adapter id and changing the diagnostician's `model` in the seed — one line.
- Unrelated openai/context-injector WIP in the engine repo was **left untouched** (focused changeset only).

## 2. Room (`movemental-ai`) — built, NOT committed

Styled **Field Edition (paper)** per the chosen scope, consuming the already-scaffolded
`.oat-surface` tokens in `globals.css` + the `--font-oat-*` faces in `layout.tsx` (no
hardcoded hex; no new theme scope).

- **Protocol/contract:** `src/lib/agent-room/stream-chunk.ts` (pre-existing) + `component-props.ts` (new — client-side prop validation mirroring the engine schemas).
- **Proxy:** `src/app/api/agent-room/stream/route.ts` — **public** (no auth gate), injects the pinned tenant + service bearer, anon `userId`. Schema in `proxy-schema.ts`.
- **Env:** `AI_AGENTS_BASE_URL`, `AI_AGENTS_SERVICE_SECRET`, `AI_AGENTS_TENANT_ORG_ID` added to `src/lib/env.ts` (and to local `.env.local` → `http://localhost:3001` / engine secret / the seeded org).
- **Chrome:** `proxy.ts` injects `x-movemental-shell: room` for `/agent`; root `layout.tsx` hides marketing chrome for `room`.
- **Hook:** `use-agent-room-stream.ts` — the state machine: voice = calm pulse on `progress thinking` then streaming `text_delta`; screen replaced only on `ui_render` (validated client-side); `agent_handoff` → "composing"; anon session/anon-id persisted.
- **Components:** `src/components/agent-room/` — `agent-room.module.css` (paper styles ported from the prototype), `agent-room-shell` (SSR fallback → live room via `useSyncExternalStore`), `agent-room-fallback` (crawlable spine), `agent-room` (3-zone surface + corner menu + start-over), `composer`, and `screen/*` (opening-hero, reality-check-beat, readback, path, pricing, network constellation, audience, founders, handoff-human, emphasis).
- **Page:** `src/app/agent/page.tsx`.

### Decisions worth knowing
- **"Host speaks first" = the opening hero** (a built-in screen state, not a `ComponentId`), matching the prototype. The agent genuinely drives every *subsequent* turn (narrates each render). This avoids an API call on every page load; the opening is not an agent render because there is no `opening` component in the closed set. Clean seam if we later want a live first utterance.
- **Beat option chips live in the `reality_check_beat` component** (the brief attaches `options` to that component); the composer's suggested-utterance row steps aside during a beat. Read-back fork buttons route back through the agent as user turns.

## 3. DoD §9 scorecard

| Item | Status |
|------|--------|
| §9.1 `ui_render` variant + client mirror | ✅ |
| §9.2 Blocking prop guardrail | ✅ (engine, tested) |
| §9.3 Room: screen/voice/input, 100dvh, corner menu, paper, crawlable fallback | ✅ (SSR fallback verified 200) |
| §9.4 Host speaks first + narrates + routes intents | ✅ built (opening hero + host prompt/tools) — confirm by talking to it |
| §9.5 Reality check → handoff → Opus read-back (pre/past) | ✅ wired (verdict rule deterministic in the diagnostician prompt) — confirm by talking to it |
| §9.6 Honesty rail (off-domain → refuse + offer_human_handoff) | ✅ built — confirm by talking to it |
| §9.7 Four live render tools | ✅ |
| §9.8 Real usage, one path, real model ids, no swallowed guardrails | ✅ |

## 4. How to run the live room ("then we talk to it")

```bash
# terminal 1 — engine
cd ~/dev/01-Movemental-Core/movemental-ai-agents
PORT=3001 pnpm dev            # needs ANTHROPIC_API_KEY + DATABASE_URL + SERVICE_API_SECRET

# terminal 2 — room
cd ~/dev/01-Movemental-Core/movemental-ai
pnpm dev                      # :3000 → open /agent
```

`.env.local` is already wired (`AI_AGENTS_BASE_URL=http://localhost:3001`, the matching
`AI_AGENTS_SERVICE_SECRET`, and `AI_AGENTS_TENANT_ORG_ID` = the seeded org).

## 5. Pre-existing dev breakage (NOT from this work)

In the current working tree the dev server has two unrelated, site-wide problems:
1. **`proxy.ts` middleware does not execute** (verified: no injected request/response
   headers; `/` and `/agent` both 500). Without it, chrome-hiding and auth refresh don't
   run. `proxy.ts` itself has a separate uncommitted refactor in progress.
2. **`next/image` unconfigured host** — the SiteHeader logo (`…supabase.co/…/movemental-logo-transparent.png`) is not in `next.config` `images`, so any page that renders SiteHeader 500s (including the home page).

Together these mean `/agent` 500s locally **only because chrome isn't being hidden**, so it
falls through to the SiteHeader image. With chrome hidden, `/agent` returns **200** and renders
the full crawlable fallback. Both issues are environmental and out of Phase-1 scope; the room's
chrome-hiding uses the exact, proven `x-movemental-shell` pattern and will work wherever middleware
runs (production / a healthy dev tree).

## 6. Not committed / next

- **Room repo is uncommitted** (per CLAUDE.md "no direct commits to `main`" — branch as `slice/Sxx-agent-room` and commit when ready).
- Out of scope (left as clean seams): page-expert sub-agents, full 25-node constellation, Stripe/SafeStart checkout, org-wide multi-respondent assessment, live RAG, the networks-not-websites essay.
