# Agent Room — Long-Form Discussion UI

**Date:** 2026-06-10 (revised 2026-06-10)  
**Scope:** `/agent` — how to support in-depth conversation without abandoning the Ink Band guided experience  
**Related:** [INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) · [movemental-room-script.md](../../movemental-room-script.md) · [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md) · [AF-90](../prompts/migration-agentic-front-end/90-deferred-agent-backend-integration.md) · [INT-05](../prompts/integration-agent-backend/05-scenes-to-agent-tool-surface.md)

---

## What changed in this revision

- **§5.1 — Model C overlay (2026-06-10):** Discuss phase now uses a near full-screen **DiscussOverlay** (conversation owns the viewport; X to close; transcript preserved in `DiscussFold`). Model B in-sheet marginalia during active Discuss is superseded; Model B remains documented as the prior layout.
- **§5.1 — Layout model committed:** Model B (“mark up one document”) replaces the shrink-the-screen draft as the recommendation; Model A is documented as the rejected alternative. §§5.3, 6.2, 12, and the proportion diagram now agree with Model B.
- **Discuss capture decided:** Reuses the existing on-brand `capture` form-cell (`kind:'discuss'`) + `submitLead(kind, payload)` stub; turn-cap (~6–8 agent turns) triggers capture, not a redirect to `/contact`. Wired into §5.4, §8, §10 (LF-03).
- **Stub gate → capture, not dead-end:** Stub does not pretend to be live LLM chat; it acknowledges depth and renders `capture` (`kind:'discuss'`) instead of an infrastructure notice.
- **Implicit triggers fixed:** Character length demoted to weak secondary; primary signals are meta/objection questions, third consecutive free-text turn, and repeated fallbacks.
- **Agent policy committed:** Option A (phase-aware prompt block on room-host) ships first; Option B (`room-discuss` handoff) documented as the later refactor. §7.3 marks which stream chunks Option A needs now vs later.
- **LF-02 gated:** Blocked on operator ratification of Model B before component work begins.
- **§11 trimmed:** Decided items removed; only mobile, accessibility, and corpus/RAG remain open.

---

## 1. The problem

The agent room today is optimized for **guided demonstration**: the agent leads, the wall shows a closed set of screens, the voice channel carries one present-tense line, and the composer nudges the visitor along with chips and regex-routed shortcuts.

That is the right default for a first visit. Movemental’s product story is structured (reality check → read-back → path placement → honest next steps). The stub runner and the room-host prompt both assume **choreography over open-ended chat**.

But a meaningful slice of visitors will not stop at choreography. They arrive with:

- a specific organizational situation that does not fit the six beat questions cleanly;
- follow-up objections after the read-back (“yes, but our board…”);
- comparative questions that deserve nuance, not a screen swap;
- appetite to **think out loud** before they are ready to tap a chip or take a path.

Those users need **chat proper** — multi-turn, context-bearing, digression-tolerant — while still feeling like they are in the Movemental room, not in a generic chat widget.

This note proposes **how to recognize that intent**, **when to transition**, and **how the UI should change** without violating Ink Band’s “manuscript, not chat app” charter.

---

## 2. Current state (what exists today)

### 2.1 Two runtimes, one shell

| Mode | Default | Conversation model | UI affordance for depth |
| --- | --- | --- | --- |
| **`stub`** | Yes | None — typed input hits `routeInput()` regex table; chips run local scenes | Composer looks like chat; behavior is routing |
| **`stream`** | Opt-in | `historyRef` accumulates `{ role, content }[]` per session; proxy forwards history to engine | Same shell; history is **invisible** in the UI |

Both modes share `AgentRoomView`: mast → screen → voice → composer. The shell is mode-agnostic by design (AF-01 ADR).

### 2.2 What the UI actually optimizes for

```text
┌ mast ─────────────────────────────────────────┐
├ screen (dominant) ── .sheet + ink gestures ───┤  ← structured content, scrolls on long screens
├ voice (fixed band, ~4.7rem min) ──────────────┤  ← at most 2 Caveat lines; older line fades
└ composer ── chips + single-line input ────────┘  ← suggestions = utterances, not CTAs
```

**Screen zone** carries the product vocabulary (home, beat, readback, path, …).  
**Voice zone** carries the *current* agent utterance — ink-written, ephemeral. `InkVoice` intentionally keeps ≤2 lines; the prior line goes `.old` at 34% opacity.  
**Composer** is a single-line field with rotation placeholders (`DEFAULT_PLACEHOLDER` / `BEAT_PLACEHOLDER`).

This layout says: *look at the page; listen to what I just said; say one thing back.*

That is correct for **orientation**. It is wrong for **discussion**, where the user needs to see what was already said, write paragraphs, and stay in flow without the wall changing every turn.

### 2.3 What the prompts say

The room-host system prompt (`room-host.md`) explicitly frames the host as **“not a chatbot”** and pairs every turn with a render tool from a closed repertoire. The diagnostician is a **single-shot** synthesis after the reality check.

So “long-form discussion” is not a missing CSS tweak — it is a **missing engagement phase** in both UX and agent policy. Stream mode can already carry history; nothing in the UI or prompt contract tells the room *when* to leave choreography and *how* to behave once it has.

### 2.4 Design charter tension (and how to resolve it)

[INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) §1 states the room is **not a chat UI**. That should hold:

- no bubble columns, no “assistant avatar + user avatar” Slack pattern;
- no full-height message list replacing the manuscript;
- no generic admin dashboard density.

It does **not** mean “no multi-turn conversation.” It means conversation should read like **marginalia on a document** — ink voice, paper surface, editorial measure — not like intercom.

---

## 3. Proposed model: two phases, one room

Treat the visit as two **phases** inside the same `/agent` route, not two separate products.

| Phase | Name | Goal | Screen | Voice | Composer |
| --- | --- | --- | --- | --- | --- |
| **A** | **Guide** (default) | Orient, run structured flows, render the closed screen set | Primary — full stage | Present tense — 1–2 ink lines | Chips lead; single-line input; regex/stub routing or agent-driven `suggest` |
| **B** | **Discuss** | Think together, follow threads, answer objections, explore edge cases | **Stays dominant** — same sheet, accumulates marginalia | **Retained and expandable** — 3–5 ink lines; tap-to-expand recent history | Multi-line input; fewer chips; optional “show me X on the wall” |

**Guide** is what ships today (stub scenes + stream host choreography).  
**Discuss** is what users enter when cursory guidance is insufficient.

The agent may still `SHOW` screens during Discuss — e.g. pull up `safety` while answering a charter question — but the **default experience** is co-editing one document: the screen stays the manuscript; the voice band stays the handwritten presence; longer exchange accumulates as **edits and margin notes on the sheet**, not as a shrinking pin plus chat log. *Changed from the first draft, which flipped layout weight toward a transcript — that converged on generic chat at peak engagement.*

---

## 4. When to transition Guide → Discuss

Use **explicit, implicit, and agent-offered** triggers. Prefer offering the transition over silently morphing the UI.

### 4.1 Explicit (user-initiated)

| Trigger | Example | UI response |
| --- | --- | --- |
| Dedicated chip / command | “Talk through my situation”, “I need to explain our context” | Enter Discuss; optional one-line ack in ink |
| Composer affordance | “Switch to open conversation” link in legend row (discuss-only inverse: “Back to the guided path”) | Toggle phase |
| Post-flow offer | After `readback` or `confirm`, chip: “Keep talking about this” | Enter Discuss; read-back remains on the sheet |

Explicit triggers are the clearest and easiest to test. Ship at least one before relying on inference.

### 4.2 Implicit (system-inferred — use carefully)

**Primary signals** (reliable):

| Signal | Rationale |
| --- | --- |
| User asks a meta / objection / hypothetical question | “What would you do if…”, “Our board is split on…”, “We tried that and it failed because…” — needs synthesis, not a screen swap |
| Third consecutive free-text turn without a chip tap | User is ignoring the on-ramp and narrating instead |
| Repeated fallback / off-router lines in stub; repeated “outside what I can help with” in stream | Regex/script cannot serve them |

**Secondary signal** (weak — do not trigger alone):

| Signal | Rationale |
| --- | --- |
| Typed message over ~120 characters | *May* indicate narration, but people paste — use only as corroboration with a primary signal above |

On implicit detection, **do not** jump straight to Discuss layout. Offer:

> *“This sounds specific enough to talk through properly. Want to switch to open conversation? The path we mapped stays on the page.”*

One chip: **Yes, talk it through** · one chip: **Stay on the guided path**

### 4.3 Agent-offered (stream mode)

Room-host (phase-aware; see §7) detects that the next helpful move is **not** a render tool from the repertoire — e.g. the user’s question requires synthesis across answers already given. Agent emits a **`suggest`** chip pair as in §4.2 (Option A ship path). A dedicated `phase_offer` chunk is **Option B / later** — see §7.3.

**Do not** let the model unilaterally collapse the screen stack without user consent early in the visit — it erodes the “manuscript” metaphor and feels like a mode error.

### 4.4 When *not* to transition

- Mid–reality-check beat (`beat` screen): finish or exit the beat first; the structured map is load-bearing.
- First turn on `home`: default to Guide unless a **primary** implicit signal fires (meta/objection question — not length alone).
- User tapped a navigation chip (“What does it cost?”): route to the screen, stay in Guide.

---

## 5. UI treatment in Discuss phase

> **Build gate:** LF-02 must not begin until the operator ratifies **Model B** below. LF-02 builds the sheet marginalia, voice-band expansion, and composer components that bake this layout in.

### 5.1 Layout model — Model A vs Model B

Keep the four-zone shell — changing the route or opening a modal chat breaks continuity. Two layout models were considered; **Model B is the recommendation**.

#### Model A — “Shrink the screen” (documented alternative, not recommended)

```text
Guide (today)                     Discuss (Model A — rejected)
─────────────────                 ─────────────────────────────
screen  ~70% flex                 screen  ~35% flex (pinned .sheet.compact)
voice   ~1 line band               (merged into sheet — voice band collapses)
composer chips + 1-line           composer multi-line + 0–2 contextual chips
```

The screen compacts to a pin; discourse owns the sheet body; the Caveat voice band collapses or disappears; agent turns live as settling transcript blocks on the paper.

**Cost:** converges on a generic message log with nicer fonts. Sacrifices the room’s single differentiator — handwritten ink over a paper sheet with gestures — at exactly the moment the visitor is most engaged. Weakens the manuscript metaphor under the scrutiny where it must hold hardest.

#### Model B — “Mark up one document” (**recommended**)

```text
Guide (today)                     Discuss (Model B — recommended)
─────────────────                 ─────────────────────────────────
screen  ~70% flex                 screen  ~70% flex (same dominance; .scroll on)
voice   ~1–2 lines, ~4.7rem min   voice  3–5 lines, grows to ~8–10rem; tap expands history
composer chips + 1-line           composer multi-line + 0–2 contextual chips
sheet   one screen composition    sheet  screen + marginalia blocks appended below fold
```

**Screen stays dominant.** The current `.sheet` composition (readback, path, safety, …) remains the visual anchor. New material **appends** to the same document — not a second column, not a compact pin fighting for space with a chat log.

**Voice band is retained and allowed to grow.** Discuss expands `InkVoice` from 2 → 3–5 visible lines (older lines `.old` as today). Tap the band to expand a **recent history drawer** (last ~3 agent utterances, still Caveat — not a full scrollback dump). Latest line keeps the write-on nib animation. The band is the *live* presence; the sheet holds the *record*.

**Sheet holds the longer written exchange as document edits / marginalia:**

- **Visitor turns:** Inter, indented block with a hairline left rule in `--margin-red` at low opacity — margin annotation against the manuscript, not right-aligned bubbles.
- **Agent turns (longer than voice band):** written passages on the paper below the active screen content — Playfair/Inter body as appropriate; **latest** long passage gets ink write-on; prior passages settle to muted ink or `--ink-muted`.
- **Capture cell:** when earned (§5.4, §8), the existing `capture` form-cell renders **into the sheet** like any other screen figure — agent presents and gestures to it; submission calls `submitLead('discuss', payload)` → in-memory `LEADS` stub today.
- **Timestamps / avatars:** omit. Optional mono labels only if accessibility testing requires them.

The `#screen` region scrolls as a whole (`.scroll` always on in Discuss). **Do not** collapse the voice zone to zero height.

*Changed from first draft §5.1, which recommended Model A’s pin-plus-transcript layout.*

### 5.2 Composer in Discuss

| Control | Guide | Discuss |
| --- | --- | --- |
| Input | `<input type="text">` | `<textarea>` auto-grow, 2–6 rows cap before internal scroll |
| Placeholder | “Type to the agent, or tap a suggestion…” | “Say as much as you need…” |
| Chips | 4–6 on-ramp suggestions | 0–2 contextual (`Show safety charter on the wall`, `Summarize where we landed`) |
| Send | → | → or ⌘/Ctrl+Enter; Shift+Enter newline |
| Replay | Resets to `opening` | Confirm dialog: “Start over? This clears the conversation.” |

### 5.3 Gestures and screens during Discuss

Ink gestures (`underline`, `circle`, `arrow`) target elements on the **dominant sheet** — the active screen content and appended marginalia — not a shrunken pin. Default gesture target is whatever the agent is discussing on the current sheet.

If the agent `SHOW`s a new screen during Discuss, it **replaces or extends** the sheet composition with a settle animation (same as Guide); marginalia already on the sheet **stays** below the new content unless the user resets. Gestures follow the new screen’s `#phrase` / `#opts` targets as today.

Optional crumb when deep in Discuss: `↑ Back to guided path` (exits Discuss phase, does not discard sheet history — folds marginalia per §6.2).

### 5.4 Stub mode behavior

Stub mode will never be true multi-turn LLM chat. Two options:

1. **Capture gate (production stub — recommended):** On explicit or accepted implicit Discuss transition, the agent **does not** pretend to run open conversation. It acknowledges the question deserves a real conversation, speaks one honest ink line, and renders the existing on-brand **`capture`** form-cell with `kind:'discuss'` — *“Want me to have the team pick this up with you?”* → email, optional org/role. Submission → `submitLead('discuss', payload)` → in-memory `LEADS` (same seam as `map` / `paid` / `free` kinds). No dead-end infrastructure notice; intent is captured, not leaked.
2. **Limited stub discuss (dev / Storybook only):** Append user/agent lines to a local transcript and route only the **last** message through `routeInput` for screen changes — useful for QA layout, not for product.

Stream mode runs real Discuss (LF-04+); stub routes depth into **capture**.

### 5.5 Discuss capture (committed)

Discuss is the **highest-intent surface** in the room — a visitor narrating a real organizational situation is more ready to convert than one tapping chips. Capture is not deferred.

| When | What |
| --- | --- |
| Substantive Discuss exchange (stream) | Agent invokes `capture` (`kind:'discuss'`) when the thread has earned follow-up — e.g. after a meaningful back-and-forth, or when approaching the turn-cap |
| Turn-cap reached (~**6–8 agent turns** in Discuss, tunable) | Agent offers to continue with a human via the same `capture` cell — **not** a hard wall, **not** a redirect to `/contact` |
| Stub Discuss transition | Immediate `capture` (`kind:'discuss'`) per §5.4 Option 1 |

Reuse the existing `capture` component and `submitLead(kind, payload)` stub. When the backend wires, Discuss leads flow through the same seam as every other kind.

---

## 6. Transition animation and state

### 6.1 Client state (suggested)

Extend room controller (both hooks) with:

```ts
type RoomPhase = "guide" | "discuss";

type TranscriptTurn = {
  role: "user" | "assistant";
  content: string;
  /** Sheet-appended block id; voice-band may hold a short excerpt only */
  surface?: "voice" | "margin" | "passage" | "capture";
};

type AgentRoomController = {
  // existing: screen, voice, suggestions, isStreaming, sendMessage, reset
  phase: RoomPhase;
  discussTurnCount: number; // agent turns in Discuss; drives turn-cap nudge
  enterDiscuss: (reason?: "user" | "agent" | "post-readback") => void;
  exitDiscuss: () => void; // returns to guide; sheet + marginalia preserved
  transcript: TranscriptTurn[];
};
```

`transcript` is the Discuss-phase SSOT for sheet marginalia and voice-band expand history. In Guide, continue using ephemeral `voiceLines` + ink queue; on `enterDiscuss`, seed transcript from recent voice history.

### 6.2 Motion (Model B)

- **Guide → Discuss:** voice band **height eases** open (200–280ms, house easing); composer **cross-fades** to textarea; sheet gains `.discuss` utility class; **no screen shrink**. First margin block **settle**-reveals if the entering turn appends content.
- **Discuss → Guide:** voice band **contracts** to 1–2 lines; composer returns to single-line; marginalia **folds** into a collapsible “What we discussed” section at the bottom of the sheet (or clears on explicit user choice via replay confirm).
- **Capture cell:** same `.settle` reveal as other sheet figures; agent may `GESTURE underline → #capture` on present.

Honor `prefers-reduced-motion`: skip height animation; swap layout instantly.

*Changed from first draft, which animated pin compact/expand (Model A).*

### 6.3 Persistence (committed for now)

Stream mode already has `sessionId` + `historyRef`. Discuss should:

- append each turn to history (already done for stream);
- persist transcript + phase to **`sessionStorage`** for refresh survival;
- **not** persist anonymous Discuss to Supabase yet — reason is **endpoint readiness**, not strategy. `submitLead` is the capture seam; when wired, `kind:'discuss'` payloads flow through it like `map` / `paid` / `free`. Transcript persistence to DB is a separate decision once privacy copy and retention policy exist.

---

## 7. Agent / backend implications

UI phase switching must be paired with prompt policy — otherwise Discuss is a textarea talking to a host trained to render `reality_check_beat` on every turn.

### 7.1 Option A — one agent, phase-aware prompt block (**ship first**)

Append a dynamic block when `phase === "discuss"` (client sends `phase` in POST body — LF-04):

- closed screens remain available but **optional**;
- prioritize substantive prose over tool calls;
- still forbid fabricated pricing/path facts (honesty rail);
- invoke `capture` (`kind:'discuss'`) when the thread has earned it or turn-cap approaches (~6–8 agent turns, tunable);
- `offer_human_handoff` remains for off-domain or escalated cases outside capture.

**Rationale (committed):** lowest operational cost at pre-scale; same seed path as today (`room-host.md` + `pnpm seed:agent-room`); no new handoff contract or second agent row to maintain while Discuss volume is unproven.

### 7.2 Option B — handoff to `room-discuss` agent (documented later path)

Mirror host → diagnostician pattern:

- trigger: user accepts Discuss transition or completion of read-back + “keep talking”;
- model: could stay Haiku for cost or use Sonnet for depth;
- tools: `show_*` subset + `capture` + `offer_human_handoff`; no `render_reality_check_beat`.

**Earn this refactor** once Discuss volume and conversation depth justify a separate seed row, handoff rule, and tool subset. Option A must not block the UI work (LF-01–03).

### 7.3 Stream contract additions

| Chunk | Purpose | Option A (now) | Option B / later |
| --- | --- | --- | --- |
| `phase` in POST body | Engine selects phase-aware prompt block | **Yes — LF-04** | Same |
| `suggest` (INT-05) | Contextual chips in either phase; Discuss transition offer | **Yes — LF-05** | Same |
| `text_delta` | Voice band + append long passages to sheet marginalia in Discuss | **Yes — LF-05** | Same |
| `ui_render` → `capture` | Render `capture` cell (`kind:'discuss'`) into sheet | **Yes — with INT-02** | Same |
| `phase_offer` | Dedicated agent→client “offer Discuss” chunk | No — use `suggest` chips | Optional polish |
| `phase_enter` | Agent commits Discuss after user yes | No — client `enterDiscuss()` on chip tap | Optional |
| `ink_gesture` | Gesture to marginalia / capture targets | **Yes — INT-04** | Same |

Proxy (`/api/agent-room/stream`) accepts `phase: "guide" | "discuss"` in the POST body (LF-04).

---

## 8. Entry points in the existing script

Places the choreography already **invites** depth — natural Discuss on-ramps:

| Scene / screen | After… | Suggested chip / action |
| --- | --- | --- |
| `readback` | Verdict delivered | “Talk through what this means for us” → Discuss |
| `path` | Stage drawers viewed | “Our situation is more complicated than this” → Discuss |
| `safety` | Charter read | “I have a specific policy question” → Discuss |
| `pricing` | Ways shown | “We can’t do either option yet — discuss?” → Discuss |
| `contact` | Form visible | Discuss is **not** a substitute for contact; keep form as primary CTA |
| Global fallback | “Outside what I can help with” | “Switch to open conversation” · stub → `capture` (`kind:'discuss'`) |
| **Discuss (stream)** | Substantive exchange or turn-cap (~6–8 agent turns) | Agent renders `capture` (`kind:'discuss'`) on sheet |
| **Discuss (stub)** | User accepts Discuss transition | Agent renders `capture` (`kind:'discuss'`) immediately (§5.4) |

Wire chips in `scenes.ts` (stub) and room-host `suggest` acts (stream) when INT-05 lands. Capture on-ramp ships in LF-03 (UI + stub seam).

---

## 9. What we should not do

1. **Replace the room with a chat page** — kills differentiation and contradicts Ink Band charter.
2. **Show full transcript in Guide phase** — clutters the demonstration; keep voice ephemeral there.
3. **Auto-transition without consent** — feels like a trap door; implicit signals offer, never morph silently.
4. **Drop the closed screen set in Discuss** — screens are evidence; marginalia interprets them.
5. **Merge stub regex router with stream history into one untyped code path** — AF-90/INT guardrails exist for a reason.
6. **Shrink the screen to make room for a chat log (Model A)** — sacrifices the handwritten band and converges on generic transcript UI.
7. **Dead-end stub visitors who want depth** — route into `capture` (`kind:'discuss'`), not an infrastructure notice.

---

## 10. Recommended implementation sequence

Maps to the INT prompt pack ([master_runner.md](../prompts/integration-agent-backend/master_runner.md)):

| Step | INT | Deliverable | Depends on |
| --- | --- | --- | --- |
| **LF-01** | **INT-08** | `RoomPhase` + `transcript` + `discussTurnCount`; Model B layout behind feature flag | AF-12 ✅ |
| **LF-02** | *(in INT-08)* | Model B components: marginalia, voice-band expansion, textarea composer | INT-08 |
| **LF-03** | **INT-09** | Transition UI + post-readback chips; stub **capture gate**; sessionStorage | INT-08 |
| **LF-04** | **INT-10** | Option A: `phase` in stream POST + phase-aware prompt block on room-host | INT-03, INT-05, INT-09 |
| **LF-05** | **INT-10** (+ INT-03, INT-05) | `text_delta` → voice + sheet passages; `suggest`; `ui_render` → `capture` | INT-10 |
| **LF-06** | *(in INT-09)* | sessionStorage transcript + phase restore | INT-09 |
| **LF-07** | **INT-07** | E2E: Guide → Discuss (Model B) → capture → fallback | INT-01…INT-10 |

INT-08/09 can ship UI-only (stub capture seam, zero backend) in parallel with INT-01…INT-05.

---

## 11. Open questions (still open)

1. **Mobile:** Model B keeps the screen dominant — on narrow viewports, does the voice-band expand drawer become a bottom sheet, or does tap-to-expand collapse marginalia behind a “Conversation so far” summary bar?
2. **Accessibility:** Discuss adds sheet marginalia and an expandable voice history — needs a named `aria-live` policy distinct from Guide’s single-line voice band (what announces: latest ink line vs newly appended margin block vs capture success).
3. **Corpus / RAG in Discuss?** INT-06 profiles leaders; org-specific Discuss may need tenant context not available on public `/agent`. Default remains host knowledge + honesty rail until tenant-scoped Discuss is scoped.

---

## 12. Summary

- **Guide** (today): screen-first, ephemeral ink voice, chips and choreography — correct for first contact and structured mapping.
- **Discuss** (Model B): **same dominant screen**; voice band grows (3–5 lines, tap-to-expand); longer exchange appends as **marginalia and written passages on one document**; multi-line composer; capture (`kind:'discuss'`) when the thread earns it or turn-cap (~6–8 agent turns) approaches.
- **Transition:** explicit user choice first; agent-offered via `suggest` second; implicit only with confirmation — primary signals are meta/objection questions, third free-text turn, repeated fallbacks (not paste length).
- **Ink Band compliance:** co-editing a manuscript, not a chat log; Caveat voice band preserved; no bubble UI.
- **Stub vs stream:** stub captures depth via `capture` (`kind:'discuss'`); stream runs real Discuss (LF-04+) with the same capture seam at conversion moments.
- **Agent policy:** Option A (phase-aware room-host) ships first; Option B when volume justifies it.
- **Build gate:** ratify Model B before LF-02.

The composer already says “Type to the agent” — the product should mean it when the user does, on the same sheet, in the same ink voice, with a path to human follow-up when the conversation outgrows the room.
