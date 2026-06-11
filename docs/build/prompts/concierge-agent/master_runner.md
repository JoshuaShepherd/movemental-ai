# Concierge program (CON) — master runner

**Canonical location:** `movemental-ai/docs/build/prompts/concierge-agent/`
**Target agent:** Cursor / Claude Code executing one phase at a time
**Primary repos:** `movemental-ai` (room + site) **+** `movemental-ai-agents` (engine) — this pack is **cross-repo**
**Predecessors:** the [Ink Band migration pack](../migration-agentic-front-end/master_runner.md) (AF-00–AF-12, signed off 2026-06-10) and the [integration pack](../integration-agent-backend/master_runner.md) (INT-00–INT-10, default flipped to `stream` 2026-06-10)
**Design canon:** [INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) · **Doctrine:** [movement-leaders-as-ecosystem-layer.md](../../strategy/movement-leaders-as-ecosystem-layer.md)
**Last updated:** 2026-06-11

---

## Part I — The case: what this concierge is for

> Read this part before touching any phase. It is the *telos*. Every CON phase below is justified by it, and any work that contradicts it is wrong even if it ships.

### 1. The agent is the product, not a feature on the product

Movemental sells a thesis: **organizations can adopt AI in a way that builds trust instead of spending it** — a stewardship sequence (`01 Safety → 02 Sandbox → 03 Training → 04 Tech`, Safety deliverable = the *AI Handbook*) rather than a tool-rush. *(Nomenclature ratified by CON-00 D0.5 against the live v3.0 host prompt; earlier docs say "Skills → Solutions" — reconcile in CON-03.)* The hard part of selling that thesis is that it is a claim about *character* — pacing, honesty, refusal, restraint — and character cannot be put on a slide. It has to be *demonstrated*.

The agent room is where it is demonstrated. A visitor who arrives skeptical of AI meets an AI that is paced, names its own limits, refuses to answer off its domain, never reduces them to a score, and escorts them to a human when that is the honest move. **The medium is the argument.** The concierge is not a lead-capture widget bolted onto a marketing site; it is the single most important proof asset Movemental owns. If the concierge feels like a chatbot, the thesis is falsified on contact. If it feels like a trustworthy front-of-house, the thesis is proven before a word of copy is read.

This reframes the whole build. We are not "adding features to a chat UI." We are raising a one-shot diagnostic to a **standing, relational, honest front-of-house presence** that embodies the company's claim about how AI should behave.

### 2. Concierge ≠ chatbot ≠ diagnostic

Three things the concierge is deliberately *not*, and the one thing it is:

| Not this | Because |
| --- | --- |
| A **chatbot** | A chatbot answers anything, badly, with confident sprawl. The concierge has *one domain* and visible edges. Honesty about limits is the product. |
| A **one-shot diagnostic** | Today `/agent` runs a reality-check and reads it back, then ends. A concierge *stays*. It greets, remembers, escorts, follows up, and is summonable wherever the visitor is on the site. |
| A **navigation menu with a face** | The concierge does real work — diagnose, answer from the corpus, escort with context, schedule, hand off to a human — not just route clicks. |

What it **is**: a *front-of-house host for an AI-native company*. The job of a concierge in a great hotel — greet by name, read the situation, orient, walk you to the right place, remember you next time, know when to fetch a person — is exactly the job here. That metaphor is load-bearing; use it to adjudicate scope questions ("would a great concierge do this?").

### 3. It honors the dual-intelligence doctrine

Movemental runs on two intelligences: **organizations** (churches, nonprofits, institutions — the *implementation* audiences) and **movement leaders** (the trusted-voice ecosystem layer whose wisdom and credibility inform the platform). The canonical rule ([movement-leaders-as-ecosystem-layer.md](../../strategy/movement-leaders-as-ecosystem-layer.md)):

> "Movement leaders are not primarily a demand-generation segment for Movemental — they are a credibility-bearing, wisdom-bearing, ecosystem-shaping layer of the platform's public identity. Churches, nonprofits, and institutions are the primary implementation audiences."

The concierge speaks **to organizations**, **out of** the leaders' corpus. It is voice-aware (it can draw on the corpus, attributed and honestly), and it uses the public label **"trusted voices,"** never "ambassadors," "partners," or a roster. It must never turn a movement leader into a fourth audience card or a funnel segment. The corpus gives the concierge wisdom; it does not give it a recruiting pitch.

### 4. Honesty is the rail, not a feature

The concierge operates on a **closed capability set** and a **honesty rail**. It renders from a known repertoire (the Ink Band screen registry), refuses cleanly off-domain, never fabricates a placement or a number it cannot defend, and routes to `josh@movemental.ai` / scheduling when the honest answer is "a person should take this." This is not a limitation to apologize for — it is the demonstration. Build the rail as a first-class system (CON-03, CON-08), not as error handling.

### 5. The unique design is non-negotiable — the hand is the brand

The thing that makes this not-a-chatbot is visible in the first second: **the concierge has a literal hand.** Per the Ink Band charter ([§1](../../design/INK_BAND_DESIGN_CHAIN.md)):

> "The hand is visible. The agent has a literal hand: handwritten 'say' lines that draw on with a moving nib, and ink gestures that mark the page. Motion is choreography, not decoration."
>
> "One pen, one accent. A single ink-blue (`#22409B`) carries voice, links, active state, and ink strokes."

A visitor watches the concierge *write* — Caveat lines drawn on by a moving nib, ink gestures (underline, circle, arrow) marking the manuscript, the page reading like a thoughtful document rather than a form. **This is the concierge's signature and it is the design moat.** No phase may introduce a generic chat bubble, a stock avatar, a hardcoded hex, or app-like chrome. When something feels crowded, add space; never shrink the type (charter pillar 1). The persona work in CON-01 is where this signature becomes a *named identity*, not just an animation.

### 6. Its relationship to the rest of the page

Today the concierge lives only at `/agent`. A front-of-house presence cannot be locked in one room. The marketing surfaces (`/`, `/institutions`, `/churches`, `/nonprofits`, `/voices`, `/book`, the assessment) each make a *case*; the concierge is the **connective tissue** that turns a case into a next step. It should be summonable from those surfaces, arrive already knowing what page summoned it, escort the visitor to the right surface *with context preserved*, and deposit them into `/agent`'s reality-check or the dashboard without making them start over. The page makes the argument; the concierge walks the person through the building. CON-04 builds this relationship explicitly.

### 7. Definition of "fully a concierge" (the bar this pack clears)

The program is **done** when a visitor can:

1. Be **greeted** in a named, consistent persona with a visible hand, on `/agent` **and** summoned from any marketing surface (CON-01, CON-04).
2. Be **oriented** — the concierge classifies intent across the full capability map (orient / diagnose / corpus-answer / escort / capture / human-handoff / assessment), not just the reality-check (CON-03).
3. Be **diagnosed** honestly via the existing host→diagnostician reality-check, with the readback intact (already built; preserved through CON-03).
4. Be **answered from the corpus** in a trusted-voice, attributed, doctrine-safe way (CON-06).
5. Be **escorted** to the right site surface or into the dashboard with continuity (CON-04).
6. Be **remembered** on return — resume, "welcome back," authed org/leader recognition (CON-05).
7. Be **acted for** — capture, enroll, schedule, human handoff wired to real backends (CON-07).
8. Trust it, because it is **observable, refusal-tested, and voice-evaluated** (CON-08), and **visually flawless and accessible** across devices and reduced-motion (CON-09).

Anything short of all eight is "a good agent room," not "a concierge."

---

## Part II — Where we are (the starting line)

Established by the AF and INT packs; do **not** re-derive — verify against the repos and move.

**Engine (`movemental-ai-agents`):** two seeded room agents — `room-host` (drives the reality-check, renders the closed repertoire, owns gestures/suggest, hands off) and `room-diagnostician` (composes the one-shot readback). HTTP `POST /api/agents/stream` yields a typed SSE `StreamChunk` union (`progress · text_delta · tool_call · tool_result · agent_handoff · ui_render · ink_gesture · suggest · error`). Tools: the render set (`render_beat`, `show_readback`, `show_path`, `show_pricing`, `show_capture`, `offer_human_handoff`, `show_*` static screens), `gesture_at`, `suggest_chips`, `request_diagnosis` (handoff). Corpus RAG partially wired (INT-06: `getCorpusProfile` server action over `movement_leader_corpus_data`). Multi-tenant via `TENANT_ORG_ID`; traces to `agent_traces` / `agent_interactions`.

**Room (`movemental-ai`):** `/agent` runs a mode-dispatched view (`stub` / `hybrid` / `stream`, default now `stream`) over a shared presentational `AgentRoomView`. The Ink Band hand is live: `text_delta` → growing-tail Caveat `StreamVoiceLine` with a moving nib; `ink_gesture` → SVG strokes; `suggest` → tappable chips; thinking pulse + tool-activity narration. Closed screen registry (`screen-map.ts` SSOT) mirrors the engine `ComponentId` by contract. Discuss phase (Model B) built and flag-gated. Capture/enroll seams exist; mast resolves auth role (`signed-out / org / leader / assess`).

**Contract discipline (inherited, mandatory):** `stream-chunk.ts` / `component-props.ts` in the room mirror the engine's `src/lib/ai/types.ts` / render-tool schemas **by contract, no shared package**. Any change to one side lands on the other *in the same phase* or the phase is **Blocked**. Stub mode must keep working with **zero network** at every step.

**The gap to concierge** (what this pack closes; *updated by CON-00*): persona **exists in prose** (v3.0 "Movemental Concierge") but is **not consolidated** into a cached SSOT or given a visual identity; presence confined to `/agent`; intent router is reality-check-only; no memory/continuity; corpus answers are **prompted but unwired** (drift D-1: `search_knowledge` doesn't exist); action tools (schedule, human handoff, enroll) not fully wired; no eval/guardrail harness; no concierge-level QA pass. Full baseline + drift register: [concierge-charter.md](../../agents/agent-room/concierge-charter.md).

---

## Part III — Mandatory agent protocol (every session)

You are the **Concierge program runner**. Before ending any session:

1. **Read Part I first** in a new context window — the telos adjudicates every scope call.
2. Execute phases in **Recommended order** (Part V) unless the status table shows a dependency cleared.
3. After each phase, **update this file**: set **Status / Last touched / Branch / Blockers** in the master table, append a **Session changelog** row, and append to the phase's **§Attempt log**.
4. Run the phase **Verification** in **both repos** when the change is cross-repo.
5. **Keep the contract mirrors in sync** (the INT rule, unchanged). New chunk types, tool schemas, or component IDs land on both sides in the same phase.
6. **Do not regress stub mode** (`AGENT_ROOM_MODE=stub` → zero network) or the existing reality-check + readback flow. The concierge is an *expansion* of that flow, never a replacement.
7. **The hand stays visible.** No phase introduces a generic chat bubble, stock avatar, hardcoded hex/font, or app chrome. Compose Ink Band tokens/primitives; change a token, never a page-level hex.
8. **Honor the doctrine.** Organizations are the implementation audience; movement leaders are "trusted voices," never a funnel. Corpus answers are attributed and bounded.

**Never** mark a row **Done** without the phase's Definition of Done checked **and** green verification in both affected repos.

---

## Part IV — Master status table

| Order | ID | Phase | Repos | Status | Last touched | Branch | Blockers / notes |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 0 | CON-00 | Concierge charter + contract & capability baseline | both (read) | **Done** ✅ | 2026-06-11 | slice/S-agent-streaming-polish | [concierge-charter.md](../../agents/agent-room/concierge-charter.md) authored. Persona **authored** (v3.0 docs) but **live agent is v2.0 "Host"** (D-6) → CON-01 propagates. Contract in sync (10 chunks / 16 ids ✅). **D-1 hotfixed** (Retrieval Guard) — `search_knowledge` was latent (un-propagated draft), not live. Stage scheme ratified = Training/Tech. See §Attempt log. |
| 1 | CON-01 | Persona & identity system (the named hand) | both | **Done** ✅ | 2026-06-11 | slice/S-agent-streaming-polish | v3.0 Concierge prompt seeded; `concierge-persona` prompt_pack linked to host + diagnostician; room `CONCIERGE_VOICE` SSOT + mast wordmark + signature opening. **Operator: `pnpm seed:agent-room`** to activate pack + prompt. Resolves D-4/D-6. |
| 2 | CON-02 | Streaming & voice polish (first-token, recovery, a11y) | both | **In progress** 🟡 | 2026-06-11 | slice/S-agent-streaming-polish | In-persona stall/terminal recovery + retry chip (stream/hybrid) ✅. Remaining: engine `progress` front-load, tool-activity narration polish, reduced-motion audit, first-token metrics. |
| 3 | CON-03 | Intent router & capability map (honesty rail) | both | Not started | — | — | Needs CON-00. Cross-repo. Preserves reality-check. |
| 4 | CON-04 | Escort & page relationship (site-wide presence) | `movemental-ai` | Not started | — | — | Needs CON-03. Summon dock + escort tool. |
| 5 | CON-05 | Memory & continuity (resume, welcome-back, identity) | both | Not started | — | — | Needs CON-03. DB-touching. |
| 6 | CON-06 | Corpus voice-awareness (attributed RAG, doctrine-safe) | both | **In progress** 🟡 | 2026-06-11 | slice/S-agent-streaming-polish | `file_search` seeded + assigned; v3.0 host prompt now in engine seed (CON-01). **Awaiting operator `pnpm seed:agent-room`**. Remaining: attribution/voice-fidelity + doctrine guardrail probes. |
| 7 | CON-07 | Action tools (capture · enroll · schedule · human handoff) | both | Not started | — | — | Needs CON-03; folds in `wire-capture-and-enrollment-to-backend.md`. |
| 8 | CON-08 | Observability, evals & guardrails | both | Not started | — | — | Needs CON-03..07 surfaces to test. |
| 9 | CON-09 | Visual parity & concierge QA (a11y · mobile · perf) | both | Not started | — | — | Final gate. Needs all prior. |

**Status values:** `Not started` · `In progress` · `Blocked` · `PR open` · `Done` · `Deferred`

---

## Part V — Recommended execution order

```text
CON-00  Charter + baseline (read-only): ratify persona/scope; snapshot drift
  ↓
CON-01  Persona & identity (named hand, greeting/farewell, persona prompt block)
CON-02  Streaming & voice polish (first-token, recovery, reduced-motion, a11y)   ← parallel after CON-00
CON-03  Intent router & capability map (honesty rail; preserves reality-check)   ← cross-repo
  ↓
CON-04  Escort & page relationship (summon dock + escort tool + context carry)
CON-05  Memory & continuity (resume, welcome-back, org/leader recognition)        ← parallel after CON-03
CON-06  Corpus voice-awareness (attributed RAG, trusted-voices guardrail)         ← parallel after CON-03
  ↓
CON-07  Action tools (capture · enroll · schedule · human handoff to backends)
  ↓
CON-08  Observability, evals & guardrails (traces, refusal/voice golden sets)
  ↓
CON-09  Visual parity & concierge QA (a11y, mobile, perf, reduced-motion) — sign-off gate
```

**Parallel tracks:** CON-01/02/03 can start after CON-00 (CON-01 and CON-02 need no engine contract change; CON-03 is cross-repo). CON-04/05/06 need CON-03's router. CON-07 needs CON-03. CON-08 needs live surfaces from CON-03–07. CON-09 is the final gate. **One phase per PR** where possible; cross-repo phases ship as paired PRs.

---

## Part VI — The phases

Each phase below is a self-contained prompt: **Role & stance · Goal · Problem · Work · Decisions · Definition of Done · Verification · Attempt log.** A phase may be lifted verbatim into its own `NN-slug.md` file following the AF/INT convention; this master keeps them inline so the program reads as one argument.

---

### CON-00 — Concierge charter + contract & capability baseline

**Repos:** both (read-only) · **Blocks:** everything · **Status:** Not started

**1. Role & stance.** You are establishing the *baseline and the ratified decisions* before any concierge code is written — the CON analog of AF-00 / INT-00. Read Part I of this file, the [Ink Band design chain](../../design/INK_BAND_DESIGN_CHAIN.md), [movement-leaders-as-ecosystem-layer.md](../../strategy/movement-leaders-as-ecosystem-layer.md), `docs/build/agents/agent-room/` (construction-decisions, prompts, tools, handoffs), and the INT master runner. Write nothing into `src/` this phase.

**2. Goal.**
- Produce a **Concierge Charter** doc (`docs/build/agents/agent-room/concierge-charter.md`) that ratifies: the persona (name, gender/none, voice register, what it calls itself, what it never says), the closed **capability map** (the exact intent set the router will support), and the **honesty rail** (refusal categories + the human-handoff trigger).
- Snapshot the **current contract** (chunk union, `ComponentId` set, tool roster) and the **capability drift** (what the host prompt claims it can do vs. what tools actually exist) into the charter as a baseline table.
- Define **success metrics** for the program (e.g., off-domain refusal rate, escort completion, time-to-first-token, voice-fidelity score) so CON-08 has targets.

**3. Problem.** The room was built as a reality-check, not a concierge. Before broadening scope we must decide *who the concierge is* and *what it is allowed to do*, or CON-01/03 will invent persona and scope ad hoc and drift from doctrine. We also need a known-good contract snapshot so cross-repo phases can detect drift.

**4. Work.**
1. Read the canon (above). Extract the existing host persona/voice cues from `room-host.md` and record them.
2. Draft the **persona block** (recommendation, for ratification): a name, a one-paragraph character brief, a 6–8 line voice spec (cadence, what it says on greeting/uncertainty/refusal/farewell), and an explicit **never-list** (no emoji, no exclamatory hype, no "as an AI," no fabricated placement, no leader-as-funnel framing). *Recommend, don't unilaterally lock — see Decisions.*
3. Enumerate the **capability map** as a closed set with, for each: trigger description, the tool(s)/screens it uses, and the honest failure/refusal behavior. Proposed set: `orient`, `diagnose` (reality-check, existing), `answer_from_corpus`, `escort`, `capture`, `schedule`, `human_handoff`, `assessment_kickoff`, `meta/limits`.
4. Build the **baseline tables**: (a) chunk union + ComponentId set as they exist today in both repos; (b) host-prompt-claimed capabilities vs. seeded tools (the drift); (c) program success metrics with target values left as TODO for CON-08.
5. Record all open decisions in §Decisions with a recommendation each.

**5. Decisions (record with recommendation; operator ratifies).**

| # | Decision | Recommendation |
| --- | --- | --- |
| D0.1 | Concierge name & whether it self-names | A short, human, non-cute name that fits Ink Band's editorial register; self-names once on first greeting, then drops it. *Provisional working name to be ratified by operator — do not hardcode until ratified.* |
| D0.2 | Capability map scope for v1 | Ship `orient`, `diagnose`, `answer_from_corpus`, `escort`, `capture`, `human_handoff`. Defer `schedule` and `assessment_kickoff` to CON-07 if backends aren't ready. |
| D0.3 | One agent or keep host+diagnostician | Keep the two-agent split (host = breadth + routing on the faster model; diagnostician = the one-shot readback on the strong model). Add concierge breadth to the *host*, not a third agent, unless CON-03 proves a router agent is needed. |
| D0.4 | Persona on stub mode | Stub greeting/farewell must be persona-consistent and zero-network (the offline concierge is still the concierge). |

**6. Definition of Done.**
- [ ] `concierge-charter.md` exists with ratified-or-recommended persona block, closed capability map, honesty rail, and baseline + metrics tables.
- [ ] No `src/` changes; no contract changes.
- [ ] Decisions table populated; operator ratification captured in §Attempt log.

**7. Verification.** Charter reviewed against Part I and the doctrine doc; capability map has no item that lacks an honest failure path; baseline tables match the live repos (spot-check chunk union + ComponentId in both).

**§Attempt log.**

#### 2026-06-11 — Claude (Opus 4.8) — ✅

**Outcome.** Authored [concierge-charter.md](../../agents/agent-room/concierge-charter.md). Read design canon, doctrine, construction-decisions, room-host v3.0 / room-diagnostician prompts, tools.md, and verified the live wire contract in both repos. **Two material findings:** (1) the persona already exists and is live — host prompt is **v3.0, named "the Movemental Concierge"** — so the program *ratifies* it (CON-01 consolidates into a cached SSOT) rather than inventing; (2) **P0 drift D-1** — the v3.0 prompt instructs the model to retrieve via `search_knowledge`, but that tool is **registered/seeded nowhere** in the engine (grep: 0 hits). Also logged stage-name drift (prompt = Safety/Sandbox/**Training/Tech** + "AI Handbook"; other docs = Skills/Solutions), retired-tier-name leakage, stale seed description, and unresolved corpus decisions.

**Decisions taken.** D0.1 keep "Movemental Concierge" (exists); D0.2 v1 scope = orient/diagnose/answer_from_corpus/escort/capture/human_handoff/meta/remember, defer schedule; D0.3 keep two-agent split (both `claude-opus-4-6`); D0.4 stub persona-consistent; **D0.5 (new)** ratify Training/Tech / AI Handbook nomenclature.

**Files touched.** `docs/build/agents/agent-room/concierge-charter.md` (new). Master runner updated: CON-00 row → Done; Part I/II nomenclature + gap statement corrected to match findings. **No `src/` changes** (read-only phase honored).

**Verification.** Contract spot-check ✅ — engine `types.ts` 10 chunk types / 16 ComponentIds ↔ room `stream-chunk.ts` + `screen-map.ts` in sync. `search_knowledge` grep over `movemental-ai-agents/{src,scripts}` → 0 hits (confirms D-1). Models `claude-opus-4-6` ×2 confirmed in `seed-agent-room.ts`. Capability map: every row has an honest failure path.

**Known deltas / handoffs.** D-1 (P0) → CON-06 wires real retrieval; CON-03 interim must degrade an unknown-tool attempt honestly. D-2/D-3/D-4 → CON-03 re-seed. D-5 → CON-06.

**Branch.** slice/S-agent-streaming-polish (docs only; CON-01+ open dedicated slices).

---

### CON-01 — Persona & identity system (the named hand)

**Repos:** both · **Blocks:** none downstream-critical (CON-03 consumes the persona block) · **Status:** Not started

**1. Role & stance.** You are giving the concierge a *consistent identity* — the thing that makes the first second read "trustworthy host," not "chat widget." This is the unique-design core. Wear the Ink Band design hat; read [INK_BAND_DESIGN_CHAIN.md §1, §8](../../design/INK_BAND_DESIGN_CHAIN.md) and the CON-00 persona block.

**2. Goal.**
- Encode the ratified persona as a **reusable system prompt block** in the engine (a `prompt_pack` fragment or a `[const]`-tagged section of `room-host.md`), so persona is one SSOT, not scattered string literals.
- Build the **greeting/farewell/uncertainty/refusal line libraries** as Ink Band voice lines (Caveat, ink-blue, nib write-on), persona-consistent, available in **stub and stream** modes.
- Establish the **visual identity signature** of the concierge in the room: a small persona mark/wordmark in the mast (token-driven, no new hex), the signature opening gesture, and a consistent "the hand is writing" presence that differentiates from any generic assistant.

**3. Problem.** Right now the room "speaks" but has no *identity*. Greetings are scene strings; there's no named presence, no consistent register across guide/discuss/stub, and nothing that visually says "this is Movemental's concierge" beyond the page. A concierge without a consistent self is just a UI.

**4. Work.**
1. Engine: add the persona block as a cacheable system fragment (respect the prefix-cache discipline from INT — persona is *static*, so it belongs in the cached prefix, not the per-turn dynamic block). Wire it into `room-host` (and a trimmed echo into `room-diagnostician` so the readback voice matches).
2. Engine: extend the host prompt's authoring guidance with the **voice spec** (cadence, greeting/uncertainty/refusal/farewell patterns, the never-list). Keep `[const]` lines for the fixed greeting; `[model:author]` for adaptive lines.
3. Room: author the **stub** greeting/farewell/uncertainty/refusal lines (persona-consistent, zero-network) so offline mode is identity-consistent. Mirror the line set the engine emits.
4. Room: add the **mast persona mark** — a wordmark or small signature using `--font-mono`/`--font-hand` and `--ink`/`--ink-blue` tokens only. No avatar image, no stock face. The "face" of the concierge is the hand + the name.
5. Room: define the **signature opening** — the first ink line the concierge writes on entry, with the nib gesture, consistent every session (per charter pillar 2: "motion is choreography").
6. Reduced-motion: persona must survive `prefers-reduced-motion` (instant lines, no nib) and still read as the same character.

**5. Decisions.**

| # | Decision | Recommendation |
| --- | --- | --- |
| D1.1 | Persona prompt location | Cacheable `prompt_pack` fragment shared by host + diagnostician (one SSOT, cache-friendly). |
| D1.2 | Visual mark | Typographic wordmark in mast (tokens only). No avatar/illustration — the hand *is* the identity. |
| D1.3 | Does diagnostician share the persona? | Yes — trimmed. The readback must sound like the same host who greeted them. |

**6. Definition of Done.**
- [ ] Persona block is one SSOT, in the cached prefix, consumed by host (+ trimmed by diagnostician).
- [ ] Greeting/farewell/uncertainty/refusal line libraries exist and are persona-consistent in **stub and stream**.
- [ ] Mast persona mark renders from tokens only (no hex, no image); signature opening line writes on with the nib; reduced-motion path is identity-consistent.
- [ ] Stub mode zero-network preserved; reality-check/readback unaffected.

**7. Verification.** typecheck ✅ both repos; stub `/agent` greets in persona with zero network; stream `/agent` greets identically; reduced-motion shows instant persona lines; mast mark uses only Ink Band tokens (grep for hex in the new component → none).

**§Attempt log.**

#### 2026-06-11 — Auto — ✅

Persona pack + v3.0 prompt propagation + room visual identity (see Part VII changelog). Engine `build:check` ✅; room unit tests ✅. Pending operator `pnpm seed:agent-room`.

---

### CON-02 — Streaming & voice polish (first-token, recovery, a11y)

**Repos:** both · **Blocks:** none · **Status:** In progress

**1. Role & stance.** You are making the *moment-to-moment* feel of the concierge excellent — the difference between "an AI is typing" and "a host is writing to me." Read `agent-stream-turn.ts`, `ink-voice.tsx`, the engine `streamAgent` loop, and INT-03.

**2. Goal.**
- Tighten **time-to-first-token**: emit an early `progress` so the thinking pulse appears fast; ensure the persona's opening line is instant (stub) or near-instant (cached prefix) so the room never feels dead on entry.
- Harden **error recovery**: the existing watchdog (`CONNECT_TIMEOUT_MS`, `IDLE_TIMEOUT_MS`) should degrade *in persona* — a handwritten "let me try that again" line and a retry affordance, not a raw error toast. Retryable vs. terminal handled distinctly.
- Polish **tool-activity narration**: "consulting the field guide," "checking where this places you" — honest, persona-voiced status during tool calls, not spinner jargon.
- **Accessibility of the stream**: `aria-live` region mirrors committed voice text for screen readers; the nib animation is decorative (`aria-hidden`); reduced-motion fully respected end-to-end.

**3. Problem.** The streaming pipeline works but the *failure and latency edges* break character — a stall shows a generic error, cold starts can leave the room silent, and the live ink isn't announced to assistive tech. A concierge that glitches out of persona under load loses the trust it exists to build.

**4. Work.**
1. Engine: emit a `progress {phase:"initializing"}` chunk before model latency hits; confirm persona greeting sits in the cached prefix so first visible token is fast.
2. Room: route watchdog timeouts to an **in-persona recovery line** + retry chip (retryable) or human-handoff offer (terminal). No raw error string in the voice band.
3. Room: map `progress`/`tool_call` activity to a small **persona-voiced status** under the thinking pulse (extend `onToolActivity`); keep it honest and short.
4. Room: add an `aria-live="polite"` mirror of committed voice lines; mark nib/stroke SVG `aria-hidden`; verify reduced-motion disables clip-reveal and nib (per design chain §8) across guide + discuss + recovery.
5. Measure first-token and stall-recovery manually; record numbers for CON-08 targets.

**5. Decisions.** *(record any timeout/threshold changes; keep INT defaults unless measured otherwise.)*

**6. Definition of Done.**
- [ ] Room is never silent on entry (instant persona line stub; fast pulse + cached greeting stream).
- [ ] Stalls/terminal errors degrade in persona with correct retry vs. human-handoff affordance.
- [ ] Tool activity narrated in persona voice; honest and brief.
- [ ] `aria-live` mirror present; decorative motion `aria-hidden`; reduced-motion verified across all phases.

**7. Verification.** Forced stall (kill engine mid-turn) → persona recovery line + retry, no raw error; cold start → pulse within ~1s, greeting fast; screen-reader reads committed lines once (no double-announce from nib); reduced-motion: no clip reveal, no nib, lines instant. typecheck ✅ both.

**§Attempt log.**

#### 2026-06-11 — Auto — 🟡 (partial)

Stream + hybrid: retryable failures speak `CONCIERGE_VOICE.stallRecovery` / `terminalError` via ink (no raw error toast); "Try again" chip decoupled from `error` state. Remaining: engine progress front-load, a11y nib `aria-hidden` audit, first-token measurement.

---

### CON-03 — Intent router & capability map (the honesty rail)

**Repos:** both (cross-repo) · **Blocks:** CON-04/05/06/07 · **Status:** Not started

**1. Role & stance.** This is the **keystone phase**. You are widening the host from "drives the reality-check" to "front-of-house that routes across a closed capability set" — *without* losing the reality-check or breaching the honesty rail. Read the CON-00 charter capability map, `room-host.md`, the render/suggest/handoff tools, and the INT contract-mirror rule.

**2. Goal.**
- Implement the **intent router** in the host prompt: classify each visitor turn into one capability (`orient · diagnose · answer_from_corpus · escort · capture · human_handoff · meta/limits`) and route to the right tool/flow. Diagnosis (reality-check → diagnostician handoff) is preserved as one branch, not the whole tree.
- Build the **honesty rail** as a first-class behavior: a clean refusal pattern for off-domain turns (in persona, names the limit, offers the human), and a hard rule against fabricating a placement, number, or corpus claim it can't ground.
- Add any **new tools/chunks** the broadened map needs (e.g. an `escort` tool — see CON-04 — defined here as contract, consumed there), keeping engine schemas and room mirrors in lockstep.

**3. Problem.** The host today assumes every visitor is doing the reality-check. A real visitor arrives with "what is this?", "do you work with seminaries?", "can I talk to a person?", "what does Hirsch say about X?" — and the concierge must handle those as first-class paths, route them honestly, and *return* to diagnosis when appropriate. Without a router, broadening scope just makes the host sprawl (the chatbot failure mode the thesis forbids).

**4. Work.**
1. Engine: restructure `room-host.md` around the **capability map** — a routing preamble (`[model:decide]` returns a capability label), then per-capability authoring/tool guidance. Diagnosis branch unchanged (still calls `request_diagnosis` → diagnostician). Add the **refusal pattern** and the **never-fabricate** rule explicitly.
2. Engine: define new tool contracts the map requires that don't exist yet (notably `escort` for CON-04 and, if charter-approved, `answer_from_corpus` surfacing — see CON-06). Register schemas; **mirror them into the room's `stream-chunk.ts` / `component-props.ts` in this same phase** (contract rule).
3. Room: extend the turn dispatch to handle any new chunk/tool types (escort, corpus-answer surfacing) with safe no-ops until their consumer phase lands; ensure unknown-capability turns degrade to the refusal/human path, never a crash.
4. Stub: add stub equivalents for the new capabilities so offline mode can demonstrate orient/escort/refuse without network.
5. Re-seed the host agent; reconcile any old-vocab drift flagged in INT-05's §10.

**5. Decisions.**

| # | Decision | Recommendation |
| --- | --- | --- |
| D3.1 | Router in-prompt vs. a classifier agent | In-prompt `[model:decide]` on the host first (cheaper, one round-trip). Promote to a dedicated classifier agent only if eval (CON-08) shows misroutes. |
| D3.2 | Refusal copy ownership | `[const]` refusal skeleton (consistent) + `[model:author]` one adaptive sentence naming the specific off-domain ask. |
| D3.3 | When to hand to a human | On any out-of-domain ask the rail can't satisfy, or explicit request for a person → `human_handoff` (CON-07 wires the backend; here it renders the offer). |

**6. Definition of Done.**
- [ ] Host routes turns across the closed capability map; diagnosis branch (reality-check → readback) preserved byte-for-byte in behavior.
- [ ] Off-domain turns refuse in persona, name the limit, offer the human — verified for ≥5 off-domain probes.
- [ ] New tool/chunk contracts mirrored in both repos in this phase (no drift).
- [ ] Stub mode demonstrates orient/escort/refuse with zero network.
- [ ] Host re-seeded; INT-05 vocab drift reconciled.

**7. Verification.** Probe set (orient / corpus-ask / escort-ask / human-ask / off-domain / start-diagnosis) each routes correctly live; reality-check still produces a correct readback; refusals never fabricate; typecheck ✅ both; engine tool/chunk tests green; contract mirror grep clean.

**§Attempt log.**

---

### CON-04 — Escort & page relationship (site-wide presence)

**Repos:** `movemental-ai` (room + marketing surfaces) · **Blocks:** none · **Status:** Not started

**1. Role & stance.** You are giving the concierge a *body in the building* — presence on the marketing surfaces and the ability to escort with continuity. Read the proxy shell logic (`x-movemental-shell`), the marketing route groups (`(paper)`, `(studio)`), the institutions/churches/nonprofits/voices pages, and CON-03's `escort` contract.

**2. Goal.**
- A **summonable concierge dock** available on key marketing surfaces (not just `/agent`): a small Ink Band affordance that, on summon, opens a focused concierge strip *carrying the page context* (which surface, which audience) into the conversation.
- An **escort capability**: the concierge can move the visitor to the right surface (`/institutions`, `/churches`, `/nonprofits`, `/voices`, `/book`, `/assessment`, or into `/agent`'s reality-check / the dashboard) with **context preserved** — no "start over."
- **Continuity across the boundary**: a visitor who summons from `/institutions` and is escorted into `/agent` arrives with the host already knowing they came from institutions; a visitor mid-reality-check who is escorted to `/book` can return without losing place.

**3. Problem.** The concierge is sealed in `/agent`. The marketing pages make strong cases (the institutions page is a long-form manuscript "letter for your board") but dead-end at static CTAs. The connective tissue — the thing that turns "I read the case" into "walk me to the next step" — doesn't exist. A front-of-house host confined to one room is not front-of-house.

**4. Work.**
1. Room: build a **summon dock** primitive (Ink Band tokens; collapsed = a quiet hand/wordmark affordance, expanded = a focused concierge strip). Gate it to chosen surfaces via the shell header, not globally (don't put it on utility/auth pages).
2. Room: pass **page context** on summon (`roomContext` already carries `sitePageId`/`searchQuery`-style fields — extend with `originSurface`, `audience`). The host reads it (CON-03 orient branch) to greet contextually ("you're reading the institutions letter — want me to place your seminary on the path?").
3. Room: implement the **escort** consumer for CON-03's `escort` chunk/tool — a client navigation that deep-links to the target surface with a continuity token (session-scoped) so the destination knows the origin and intent.
4. Room: ensure escorting **into** `/agent` lands in the right entry (orient vs. reality-check) and escorting **out** preserves reality-check place (sessionStorage, as Discuss already does).
5. Reduced-motion + mobile: the dock must be unobtrusive, keyboard-accessible, and not trap focus.

**5. Decisions.**

| # | Decision | Recommendation |
| --- | --- | --- |
| D4.1 | Dock scope | Audience + key proof surfaces only (`/institutions`, `/churches`, `/nonprofits`, `/voices`, `/book`, `/`). Not on utility/auth. |
| D4.2 | Inline answers vs. escort-to-room | The dock answers *orient/limits* inline; anything needing diagnosis/corpus depth escorts into `/agent` to keep the full hand experience. |
| D4.3 | Continuity transport | Session-scoped token (sessionStorage + query param) — no new DB until CON-05. |

**6. Definition of Done.**
- [ ] Summon dock renders on chosen surfaces (tokens only), collapses/expands accessibly, absent on utility/auth.
- [ ] Summoning carries `originSurface`/`audience`; host greets contextually.
- [ ] `escort` navigates to the right surface with continuity; into-`/agent` and out-of-`/agent` both preserve place.
- [ ] Mobile + reduced-motion + keyboard verified; no focus trap.

**7. Verification.** Summon from `/institutions` → host names the institutions context; ask "show me the trusted voices" → escort to `/voices` with continuity; mid-reality-check escort to `/book` then return → place preserved; dock absent on `/login`; keyboard-only operable; typecheck ✅.

**§Attempt log.**

---

### CON-05 — Memory & continuity (resume, welcome-back, identity)

**Repos:** both · **Blocks:** none · **Status:** Not started

**1. Role & stance.** You are giving the concierge a *memory* — the thing a great concierge has that a kiosk doesn't. Read the anon/session ID handling, `mast-auth` role resolution, `agent_interactions` persistence, and the org/leader lookups.

**2. Goal.**
- **Returning-visitor recognition**: an anon who has been here before is greeted "welcome back," with an option to resume where they left off (reality-check place, last screen, Discuss transcript).
- **Authed continuity**: a signed-in org or movement leader is recognized by name/role and greeted appropriately (org → "your organization," leader → trusted-voice register), pulling the right context without re-asking.
- **Conversation persistence** that the resume reads from — durable across reload and (for authed users) across devices, scoped by tenant.

**3. Problem.** Every visit is amnesiac. Anon state is sessionStorage-thin; authed identity is resolved for the mast menu but not *used* by the host to personalize or resume. A concierge that forgets you between visits is not a concierge.

**4. Work.**
1. Room/engine: define a **resume envelope** — last position (screen/phase/reality-check answers), last seen timestamp, persona-appropriate "welcome back" copy. Persist anon resume in durable storage keyed by `anonId`; persist authed resume server-side keyed by user/org (extends `agent_interactions`).
2. Engine: host reads the resume envelope in its orient branch and offers resume vs. fresh start (a `suggest` fork), in persona. Never silently dump them back mid-flow — *offer*.
3. Room: authed greeting path — resolve org/leader via existing lookups, pass name/role into `roomContext`, host greets in the right register (doctrine: leader = trusted-voice, never funnel).
4. Privacy/honesty: be transparent that it remembers ("last time we mapped your church to Sandbox — pick up there?") and let them decline/clear. No creepy implicit profiling.
5. Tenant scoping: all persisted memory scoped by `TENANT_ORG_ID`; RLS-respecting (server-only writes, per the repo RLS convention).

**5. Decisions.**

| # | Decision | Recommendation |
| --- | --- | --- |
| D5.1 | Anon memory durability | localStorage resume envelope + server `agent_interactions` for authed; no cross-device for anon. |
| D5.2 | Resume = auto or offered | **Offered** always (a fork chip), never auto-resumed — honesty + control. |
| D5.3 | Leader recognition register | Trusted-voice register, name-aware, never "thanks for being an ambassador." |

**6. Definition of Done.**
- [ ] Returning anon gets a persona "welcome back" + resume-or-fresh fork; resume restores place.
- [ ] Authed org/leader recognized by name/role in correct register; no re-asking known context.
- [ ] Persistence durable, tenant-scoped, server-only writes (RLS-respecting); user can decline/clear.
- [ ] Stub mode degrades gracefully (local-only memory, no network).

**7. Verification.** Two visits as same anon → second greets "welcome back" + working resume; signed-in org → greeted by org register; signed-in leader → trusted-voice register; clear-memory works; RLS check (no anon write path to memory tables); typecheck ✅ both.

**§Attempt log.**

---

### CON-06 — Corpus voice-awareness (attributed RAG, doctrine-safe)

**Repos:** both · **Blocks:** none · **Status:** Not started

**1. Role & stance.** You are letting the concierge draw on the **movement-leader corpus** as a first-class answer capability — wisdom from the trusted voices, attributed and bounded. Read INT-06 (`getCorpusProfile`, `movement_leader_corpus_data`), the corpus-and-rag doc, and the doctrine doc. Extends, does not replace, INT-06.

**2. Goal.**
- Expose `answer_from_corpus` as a real capability (CON-03 router branch): retrieve relevant corpus chunks, author an answer **attributed** to the leader, in the concierge's own voice (not impersonating the leader unless explicitly framed).
- **Doctrine guardrails**: answers frame leaders as trusted voices/wisdom, never as a product funnel or a "leader you can hire." No fabricated quotes; if the corpus doesn't cover it, say so and offer the human.
- **Honest grounding**: every corpus claim traceable to a retrieved chunk; no confident answers beyond what was retrieved.

**3. Problem.** The corpus is wired for *leader profile screens* (INT-06) but not as a *conversational answer source*. Visitors asking "what does this tradition say about AI and discipleship?" get nothing, or worse, an ungrounded guess. The corpus is Movemental's wisdom moat; the concierge should be able to speak from it honestly.

**4. Work.**
1. Engine: add/extend a `search_corpus`-style tool for conversational retrieval over `movement_leader_corpus_data` (reuse INT-06's server-only DB access; respect tenant scoping). Return chunks with attribution metadata.
2. Engine: host `answer_from_corpus` branch authoring guidance — synthesize *attributed* answers ("Hirsch frames this as…"), with an explicit "the corpus doesn't address that — want me to connect you with a person?" fallback. Never fabricate quotes; mark direct quotes only when verbatim from a chunk.
3. Engine: doctrine guardrail in the prompt — trusted-voice framing, no recruiting/funnel language, no "hire this leader."
4. Room: render corpus answers in the existing ink voice; if a leader screen is relevant, optionally escort to the profile (CON-04). Attribution visible.
5. Stub: a small offline corpus-answer stub (from the curated local leader data) so offline mode can demonstrate the capability honestly.

**5. Decisions.**

| # | Decision | Recommendation |
| --- | --- | --- |
| D6.1 | Voice: speak-as-leader or speak-about | **Speak about / attribute** by default ("Hirsch's work suggests…"); only voice-as-leader when the visitor explicitly asks and it's framed as such. |
| D6.2 | Retrieval backend | Reuse INT-06's Postgres path; add OpenAI vector store only if recall is insufficient. |
| D6.3 | No-coverage behavior | Say so honestly + offer human/escort to `/voices`; never paper over a gap. |

**6. Definition of Done.**
- [ ] `answer_from_corpus` returns attributed, grounded answers; every claim traces to a retrieved chunk.
- [ ] Doctrine guardrail holds: trusted-voice framing, no funnel language, no fabricated quotes (verified on probes).
- [ ] No-coverage path is honest + offers human/escort.
- [ ] Tenant-scoped, server-only retrieval; stub demonstrates the capability offline.

**7. Verification.** Corpus probe (in-corpus topic) → attributed grounded answer; out-of-corpus probe → honest "not covered" + human/escort; doctrine probe ("can I hire Hirsch?") → trusted-voice reframe, no funnel; no fabricated quote on adversarial prompt; typecheck ✅ both.

**§Attempt log.**

---

### CON-07 — Action tools (capture · enroll · schedule · human handoff)

**Repos:** both · **Blocks:** none · **Status:** Not started

**1. Role & stance.** You are wiring the concierge's *hands* — the real actions that turn a conversation into a next step. Fold in and supersede [wire-capture-and-enrollment-to-backend.md](../wire-capture-and-enrollment-to-backend.md). Read the capture/enroll routes, `offer_human_handoff`, the Resend/contact-notification libs, and env (`RESEND_*`, `CONTACT_NOTIFY_EMAIL`).

**2. Goal.**
- **Capture & enroll** fully wired to backends (the existing 9-phase capture/enroll plan, executed and verified end-to-end): lead/contact/map/discuss capture persisted and notified; org enrollment writes correctly, tenant-scoped.
- **Human handoff** that actually reaches a person: `human_handoff` collects the honest minimum (who, what, how to reach them), routes to `josh@movemental.ai` (Resend) and/or a scheduling link, and confirms in persona.
- **Schedule** (if charter-approved, D0.2): offer a real booking path (link or calendar integration) for "talk to a person."

**3. Problem.** The concierge can *offer* actions but several don't fully land — capture/enroll seams exist but aren't proven end-to-end, and human handoff renders an email address rather than routing a real request. The honesty rail (CON-03) promises a human; this phase makes that promise real.

**4. Work.**
1. Execute the [capture/enrollment backend plan](../wire-capture-and-enrollment-to-backend.md) phase-by-phase; verify persistence + notification for each capture `kind` (`free`/`paid`/`map`/`discuss`) and org enroll. Tenant-scoped, server-only writes.
2. Engine/room: `human_handoff` collects minimal honest context, POSTs to a real handler that emails `CONTACT_NOTIFY_EMAIL`/`josh@movemental.ai` via Resend and confirms in persona ("I've passed this to a person — they'll reach you at…"). Fire-and-confirm, with a visible fallback if email fails.
3. Schedule (if approved): render a booking affordance (link first; calendar MCP/integration only if backend ready). Otherwise explicitly **defer** and record it.
4. All action tools obey the honesty rail: never claim an action succeeded that didn't (confirm only on real success; surface failures honestly).

**5. Decisions.**

| # | Decision | Recommendation |
| --- | --- | --- |
| D7.1 | Schedule in v1? | Ship link-based booking; defer calendar-integration unless backend is trivially ready. |
| D7.2 | Handoff transport | Resend email to `CONTACT_NOTIFY_EMAIL` + persona confirm; log to `agent_interactions`. |
| D7.3 | Confirmation honesty | Confirm only on real 2xx from the backend; on failure, persona "I couldn't reach them just now — here's the direct address." |

**6. Definition of Done.**
- [ ] Every capture `kind` + org enroll persists and notifies, end-to-end, tenant-scoped (capture/enroll plan signed off).
- [ ] `human_handoff` routes a real request (email) and confirms only on success; honest failure path.
- [ ] Schedule shipped (link) or explicitly deferred with rationale.
- [ ] No action claims success it didn't achieve.

**7. Verification.** Submit each capture kind → row + notification observed; enroll → org row; human handoff → email received at notify inbox + persona confirm; force email failure → honest fallback (not a false confirm); typecheck ✅ both; capture/enroll plan §10 logs updated.

**§Attempt log.**

---

### CON-08 — Observability, evals & guardrails

**Repos:** both · **Blocks:** CON-09 sign-off · **Status:** Not started

**1. Role & stance.** You are making the concierge *trustworthy by measurement* — proving the honesty rail holds and the voice stays true, with a regression harness so it stays that way. Read `agent_traces`/`agent_interactions`, the CON-00 success metrics, and any voice-fidelity tooling.

**2. Goal.**
- **Golden transcript / eval set**: a fixed set of probes (orient, diagnose, corpus, escort, refuse-off-domain, human-ask, adversarial-fabrication, doctrine-funnel-trap) with expected behaviors, runnable as a regression harness.
- **Guardrail tests**: refusal rate on off-domain, zero-fabrication on adversarial corpus prompts, doctrine compliance (no funnel/ambassador language), persona never breaks ("as an AI", emoji, hype).
- **Observability**: traces capture capability-routing decisions, refusals, handoffs, and corpus-grounding so misroutes are visible; CON-00 metrics get real numbers and pass/fail thresholds.

**3. Problem.** The concierge will be the company's most-scrutinized AI surface, and right now there's no harness proving it refuses correctly, doesn't fabricate, stays on doctrine, or holds persona under adversarial input. Trust claims need evidence.

**4. Work.**
1. Build the **probe set** as fixtures (cover every capability + every honesty-rail failure mode). Define expected behavior per probe.
2. Build a **harness** that runs probes against the live engine (or a recorded-replay) and scores: correct routing, refusal correctness, zero fabrication, doctrine compliance, persona integrity, voice fidelity.
3. Wire **trace fields** for capability-route, refusal, handoff, corpus-grounding; surface a minimal dashboard/query so misroutes are inspectable.
4. Fill CON-00's metric targets with measured baselines + thresholds; gate CON-09 sign-off on them.
5. Add the harness to CI (or a documented manual run) so regressions are caught.

**5. Decisions.** *(record: live-engine vs. replay evals; thresholds per metric.)*

**6. Definition of Done.**
- [ ] Probe set covers every capability + every honesty-rail failure mode.
- [ ] Harness scores routing/refusal/fabrication/doctrine/persona/voice with pass/fail thresholds.
- [ ] Traces expose routing/refusal/handoff/grounding; misroutes inspectable.
- [ ] CON-00 metrics have measured baselines + thresholds; documented run path.

**7. Verification.** Harness run green against thresholds; an intentionally-broken prompt change makes the relevant probe fail (harness has teeth); traces show capability-route for a sample of turns; typecheck ✅ both.

**§Attempt log.**

---

### CON-09 — Visual parity & concierge QA (a11y · mobile · perf) — sign-off gate

**Repos:** both · **Blocks:** none (final) · **Status:** Not started

**1. Role & stance.** You are the final gate — the CON analog of AF-12. Judge the whole concierge against the Ink Band design chain **and** the Part I telos. Read INK_BAND_DESIGN_CHAIN.md §8 (motion/reduced-motion), the concierge charter, and run the relevant audit skills (`design-audit`, `responsive-audit`, `typography-polish`, `icon-audit`, `tenant-check`).

**2. Goal.**
- **Visual parity**: the concierge across `/agent` and the summon dock matches the design chain — tokens only (no hex/font on pages), one pen (ink-blue), paper depth, the visible hand, editorial measure.
- **Accessibility**: keyboard-operable end-to-end, screen-reader announces voice once, focus management on dock/escort, reduced-motion fully honored, WCAG contrast.
- **Mobile + performance**: dock and room work on small screens (no overflow, touch targets); first-token and stream feel fast; no layout thrash.
- **Telos check**: walk the eight-point "fully a concierge" bar (Part I §7) and confirm each is met or explicitly deferred with a logged reason.

**3. Problem.** Breadth (CON-03–07) risks visual and accessibility drift — new surfaces, new states, new failure paths each a chance to break the hand, the tokens, or keyboard access. A concierge that is smart but looks like a chatbot, or excludes assistive-tech users, fails the thesis.

**4. Work.**
1. Run `design-audit` / `responsive-audit` / `typography-polish` / `icon-audit` / `tenant-check` across `/agent`, the dock, and escorted surfaces; fix findings (token violations, hardcoded hex, contrast, overflow, touch targets).
2. Full **keyboard + screen-reader** pass across every capability path, including refusal/recovery/escort/resume states; reduced-motion pass across all of it.
3. Mobile pass (dock + room + discuss + escort) and a perf check (first-token, stream smoothness, no jank); record numbers against CON-08 metrics.
4. Walk the **eight-point telos bar**; produce a sign-off table (met / deferred-with-reason).
5. Confirm stub zero-network and reality-check/readback still intact (no regression from the whole pack).

**5. Decisions.** *(record any deferrals with rationale.)*

**6. Definition of Done.**
- [ ] All audit skills green or findings fixed; tokens-only verified (grep: no page-level hex/font).
- [ ] Keyboard + screen-reader + reduced-motion pass across every capability and failure state.
- [ ] Mobile + perf acceptable against CON-08 metrics.
- [ ] Eight-point telos bar walked; sign-off table complete; stub + reality-check unregressed.

**7. Verification.** Audit skills run clean; manual a11y pass documented; mobile screenshots; perf numbers vs. thresholds; telos sign-off table in §Attempt log; typecheck ✅ both; program marked **Done** in Part IV only when this passes.

**§Attempt log.**

---

## Part VII — Session changelog

*(append-only; one row per work session)*

| Date | Phase | Agent | Verdict | Branch | One-line outcome |
| --- | --- | --- | --- | --- | --- |
| 2026-06-11 | — | Claude (Opus 4.8) | 📝 | — | Pack authored: telos case (Part I) + 10-phase CON program (CON-00…CON-09). |
| 2026-06-11 | CON-00 | Claude (Opus 4.8) | ✅ | slice/S-agent-streaming-polish | Charter authored. Found live agent = v2.0 "Host" (persona v3.0 authored but unseeded, D-6); contract in sync; stage scheme ratified Training/Tech. Read-only; no `src/` changes. |
| 2026-06-11 | CON-00 hotfix | Claude (Opus 4.8) | ✅ | slice/S-agent-streaming-polish | Defused D-1 (latent, not live): added Retrieval Guard banner + honest §4 contract to the v3.0 draft so it's safe to seed in CON-01. Docs-only; engine untouched. |
| 2026-06-11 | CON-06 (pulled fwd) | Claude (Opus 4.8) | 🟡 | slice/S-agent-streaming-polish | Wired `file_search` to live room-host (seed + v2.0 prompt, env-gated); engine typecheck ✅. Resolves D-1/D-5. Awaiting operator re-seed. Git check: room slice 4 ahead of main; engine on main w/ uncommitted v2.0 seed — gaps are propagation, not branch. |
| 2026-06-11 | CON-01 | Auto | ✅ | slice/S-agent-streaming-polish | Persona prompt_pack + v3.0 host prompt in engine seed; room CONCIERGE_VOICE SSOT, mast wordmark, signature opening. Awaiting `pnpm seed:agent-room`. |
| 2026-06-11 | CON-02 | Auto | 🟡 | slice/S-agent-streaming-polish | In-persona stall recovery + retry chip in stream/hybrid. Engine progress + full a11y pass remaining. |
