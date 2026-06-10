# The Movemental Room: Performance Script

A working script for the agent room at `/agent`. It shows every move, in order, from the moment a visitor lands to the moment they take a next step. It marks which words are fixed (edit them here — they live in the code as data) and which behavior is computed at runtime (still deterministic in stub mode; no model).

The suggested copy under each line is what's **in the repo today**. Change any of it. That is the point of this document.

---

## Current runtime (read this first)

| Mode | Default? | What runs |
| --- | --- | --- |
| **`stream`** | **Yes** (since INT-07) | Live SSE agent via `/api/agent-room/stream` + **local choreography** on load (opening ink; lead chip → `beatIntro`). |
| **`stub`** | Opt-in (`NEXT_PUBLIC_AGENT_ROOM_MODE=stub`) | Full local scene runner over `SCENES` data. **No network.** No LLM. Permanent offline fallback. |

This script is the **stub performance SSOT** — every scene, line, and gesture the local runner plays. Stream mode runs the **LOCAL** subset client-side (see [`docs/build/agent-room-handoff.md`](build/agent-room-handoff.md) and the parity matrix) and delegates **AGENT**-classified moves to the live engine. Reconcile engine behavior separately via `movemental-ai-agents` `room-host.md`.

---

## Where to edit

| What you're changing | File |
| --- | --- |
| Scene choreography (say / show / gesture / wait / suggest order) | `src/lib/agent-room/data/scenes.ts` |
| Reality-check questions, per-answer replies, gap signals | `src/lib/agent-room/data/map-q.ts` |
| Beat → readback choreography (after each answer) | `src/lib/agent-room/beat-scenes.ts` |
| Typed-input regex router + fallback line | `src/lib/agent-room/route-input.ts` |
| Leader-aware scenes | `src/lib/agent-room/leader-scenes.ts` |
| Leader portraits (names, creds) | `src/lib/agent-room/data/leaders.ts` |
| Approved leader profile copy | `src/lib/agent-room/data/profiles.ts` |
| FAQ Q&A | `src/lib/agent-room/data/faq.ts` |
| Screen body copy (headlines, layers, forms) | `src/components/agent-room/screen/stub/*-screen.tsx` |
| Act vocabulary + closed screen set | `src/lib/agent-room/acts.ts` |

---

## How to read this

**Moves.** The room performs six kinds of move. In stub mode, none of them needs a model.

- `SHOW <screen>`: put a screen on the wall (clears the last one).
- `SAY "…"`: write one line in the voice channel.
- `GESTURE <underline | circle | arrow> → <target>`: draw ink on a part of the screen.
- `WAIT <ms>`: a beat of silence (milliseconds in code; ~0.5s ≈ 500ms).
- `SUGGEST […]`: offer tappable chips.
- `CLEAR`: wipe ink in place (housekeeping, not expressive).

**Closed screen set** (the agent may only `SHOW` these):

`home` · `beat` · `readback` · `safety` · `confirm` · `path` · `founders` · `leader` · `about` · `contact` · `pricing` · `faq`

**Where the words come from.** Every line carries one tag:

- 〔const〕: fixed words, known in advance. **Edit them in the files above.**
- 〔computed〕: derived at runtime from answers (`computeMapRead` in `map-q.ts`). Still data-driven, not model-written.
- 〔router〕: typed free text matched by regex (`route-input.ts`). Returns a scene name, not a sentence.

**Stub mode has no model seams.** There is no 〔model:decide〕 or 〔model:author〕 in the live stub. Typed input is regex-routed; the read-back is computed in code. When stream mode ships (AF-90), model seams may return — track that separately.

---

## Global moves (available on every screen)

These run no matter where the visitor is.

- **Logo** (`m·vemental`) tapped → `run("opening")` — restart at Scene `opening`.
- **`↑ Home` crumb** tapped (inner screens only) → same.
- **Visitor types free text** → 〔router〕 `routeInput(text)` — ordered regex table, first match wins:

  | Pattern (summary) | Routes to scene |
  | --- | --- |
  | after, sandbox, training, tech, whole path, how…work, the path | `toPath` |
  | safety, charter, guidebook, ratif | `toSafety` |
  | cost, price, much, free, pay, afford | `cost` |
  | faq, frequently asked, common question, questions we hear | `toFaq` |
  | talk to, contact, human, email, reach, speak | `talkToUs` |
  | who, behind, leader, team, trust, network | `whoBehind` |
  | what is, what do, movemental, about, do you do | `whatIs` |
  | stuck, next, simple, stand, start, begin, assess, where, find, safe, help | `toBeat` |

  - If nothing matches → 〔const〕 fallback (voice only, no screen change):
    SAY *"That's outside what I can help with."*

- **Leader portrait** tapped on `home` → `leaderScene(i)` (see Scene `leader`).

---

## SCENE `opening` · Opening      `screen: home`

*Purpose: name the real situation, offer the on-ramp, let them browse the leader band.*

**Screen body** 〔const〕 — `home-screen.tsx`:
- Eyebrow: "Non-profit · Church · Institution · Leader"
- Headline: "Navigate AI without eroding the trust you spent decades earning."
- Body with `#phrase` gesture target: "…without losing **the trust their work depends on**, by walking with them through one ordered path…"
- Leader portrait band (17 leaders from `leaders.ts`)

**Choreography** — `scenes.ts` → `opening`:

1. `SHOW home`
2. `WAIT 560ms`
3. `SAY` 〔const〕:
   > "Movemental meets leaders and organizations where they are. Let me show you how we can help."
4. `WAIT 150ms`
5. `GESTURE underline → #phrase`
6. `SUGGEST` 〔const〕 (first chip is lead):
   - "Get a clear next AI step" → **`toBeat`** *(lead)*
   - "About Movemental" → `whatIs`
   - "Who's behind this?" → `whoBehind`
   - "What does it cost?" → `cost`
   - "Read the FAQ" → `toFaq`
   - "Get in touch" → `talkToUs`

**Exits:** chip → its scene · free text → global router · leader tap → `leaderScene(i)`.

---

## SCENE `toBeat` + beats · Reality check (six questions)

The visitor drives by tapping options. Answers are recorded verbatim. After each tap, `beatScene(qi, oi, read)` runs: circle the choice → voice the per-answer line → advance or finish into readback.

**Intro choreography** — `scenes.ts` → `toBeat`:

1. `SHOW beat` (`qi: 0`)
2. `WAIT 460ms`
3. `SAY` 〔const〕:
   > "Let's map where your organization actually stands."
4. `WAIT 160ms`
5. `SAY` 〔const〕:
   > "Six honest questions. No wrong answers."
6. `WAIT 140ms`
7. `GESTURE arrow → #opts`

**Questions** — `map-q.ts` → `MAP_Q` (edit questions, option labels, per-answer `say` lines, and optional gap signals here):

### Beat 1 · `MAP_Q[0]`

- **Question** 〔const〕:
  > "Could your leadership name every AI tool your staff already use — and what data each touches?"
- **Options** 〔const〕:
  - "Yes — we keep an inventory" → SAY *"Rare. That's a real head start."*
  - "Some of it" → SAY *"So the picture is partial."* · gap: Safety (sev 1)
  - "Honestly, no" → SAY *"That's the honest answer most give."* · gap: Safety (sev 3)

### Beat 2 · `MAP_Q[1]`

- **Question** 〔const〕:
  > "Has your board or leadership put anything in writing — what you will, and won't, do with AI?"
- **Options** 〔const〕:
  - "Yes, ratified" → SAY *"Then you're ahead of almost everyone."*
  - "We've talked about it" → SAY *"Talk isn't a document you can stand on."* · gap: Safety (sev 2)
  - "Nothing yet" → SAY *"That's the gap Safety closes first."* · gap: Safety (sev 3)

### Beat 3 · `MAP_Q[2]`

- **Question** 〔const〕:
  > "Has your team tried AI against real work, in a way you could point to?"
- **Options** 〔const〕:
  - "Yes — with results we recorded" → SAY *"Then there's something to build on."*
  - "A little, here and there" → SAY *"Ad hoc rarely tells you what's worth keeping."* · gap: Sandbox (sev 2)
  - "Not really" → SAY *"So you can't yet sort what helps from what doesn't."* · gap: Sandbox (sev 2)

### Beat 4 · `MAP_Q[3]`

- **Question** 〔const〕:
  > "Picture your staff. How ready do they feel to use AI well?"
- **Options** 〔const〕:
  - "Mostly confident" → SAY *"Good — that's hard to build."*
  - "A real mix" → SAY *"A mix usually means the quiet ones are stuck."* · gap: Training (sev 1)
  - "Anxious or untrained" → SAY *"Then formation matters more than tools."* · gap: Training (sev 2)

### Beat 5 · `MAP_Q[4]`

- **Question** 〔const〕:
  > "Would it bother your team if a colleague used AI on shared work and didn't say so?"
- **Options** 〔const〕:
  - "We have norms for that" → SAY *"That means trust is already named."*
  - "It's unspoken" → SAY *"Unspoken norms break under pressure."* · gap: Safety (sev 1)
  - "We've never discussed it" → SAY *"That's where trust quietly erodes."* · gap: Safety (sev 2)

### Beat 6 · `MAP_Q[5]` (last beat)

- **Question** 〔const〕:
  > "Where does your team's work live — could AI actually plug into it?"
- **Options** 〔const〕:
  - "Unified systems, ready" → SAY *"Then the foundation for building is there."*
  - "Scattered but workable" → SAY *"Scattered work makes good tools hard to build."* · gap: Tech (sev 1)
  - "Fragmented — nothing connects" → SAY *"Fragmentation is the thing that produces slop."* · gap: Tech (sev 2)

**Per-beat choreography** — `beat-scenes.ts` → `beatScene` (same for beats 1–5):

1. `CLEAR`
2. `GESTURE circle → [data-oi="{oi}"]`
3. `WAIT 140ms`
4. `SAY` the chosen option's `say` line 〔const〕
5. `WAIT 240ms`
6. `SHOW beat` (`qi + 1`) · `WAIT 380ms` · `GESTURE arrow → #opts`

**After beat 6** — readback (no separate diagnostician; all deterministic):

1. `SAY` 〔const〕: *"That's your six. Let me show you back."*
2. `WAIT 220ms`
3. `SHOW readback`
4. `WAIT 540ms`
5. **If no gaps surfaced** 〔const〕:
   - *"You're in unusually good shape."*
   - *"The path still starts with Safety — it's what holds the rest."*
6. **If gaps surfaced** 〔const〕 + 〔computed〕:
   - *"Here's what your answers surface."*
   - First gap line (capitalized) from `computeMapRead`
   - Optional second gap: *"And {gap line}."*
   - *"The path is ordered. It starts with Safety."*
7. `GESTURE circle → #hereStage` · `GESTURE underline → #rbphrase`
8. `SUGGEST` 〔const〕:
   - "Show me Safety" → **`toSafety`** *(lead)*
   - "What comes after Safety?" → `toPath`
   - "↺ Start over" → `opening`

**Readback screen body** 〔const〕 — `readback-screen.tsx`:
- Eyebrow: "Your reality, mapped"
- Four stage rows: `01 Safety` (always "you are here") · `02 Sandbox` · `03 Training` · `04 Tech`
- Each row shows a gap line from 〔computed〕 `mapRead.stages` or the clear line from `STAGE_CLEAR`
- Closing: **"It starts with Safety — and so does almost everyone."** (`#rbphrase`)

---

## SCENE `toSafety` · Safety stage      `screen: safety`

*The first path stage — free guide vs paid facilitation.*

1. `SHOW safety`
2. `WAIT 520ms`
3. `SAY` 〔const〕:
   > "Safety is your step. Here's what it means."
4. `WAIT 240ms`
5. `SAY` 〔const〕:
   > "You can walk it on your own, free. Or we do it with you."
6. `SUGGEST` 〔const〕:
   - "Have us do it · $1,000" → **`withUs`** *(lead)*
   - "Walk it free" → `onOwn`
   - "What's an AI charter?" → `charter`
   - "What's involved?" → `involved`

**Screen body** 〔const〕 — `safety-screen.tsx`: Stage 01 · Safety headline, five Guidebook layers, two ways in (free field guide vs $1,000 / two weeks).

### Sub-scene `charter` (voice only)

1. `SAY` 〔const〕: *"A short, agreed document. What you will and won't do with AI."*
2. `WAIT 200ms`
3. `SAY` 〔const〕: *"Five plain parts your board can ratify."*
4. `SUGGEST`: "Have us do it · $1,000" → `withUs` · "Walk it free" → `onOwn`

### Sub-scene `involved` (voice only)

1. `SAY` 〔const〕: *"Two weeks. We start by reading your whole team."*
2. `WAIT 200ms`
3. `SAY` 〔const〕: *"Then we draft it with you. You ratify."*
4. `SUGGEST`: "Have us do it · $1,000" → `withUs` · "Walk it free" → `onOwn`

---

## SCENE `onOwn` · Conversion, free      `screen: confirm` (`mode: free`)

*The field guide path. No email capture in the voice channel — confirmation is on-screen only (stub: UI-only, no POST).*

1. `SHOW confirm` (`mode: "free"`)
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "The guide is on its way. Free."
4. `WAIT 200ms`
5. `SAY` 〔const〕:
   > "Your first move is your team's honest read."
6. `SUGGEST` 〔const〕:
   - "Have us do it instead · $1,000" → `withUs`
   - "↺ Start over" → `opening`

**Confirm screen (free)** 〔const〕 — `confirm-screen.tsx`: "Your field guide is on its way." + checklist for the five Guidebook layers.

---

## SCENE `withUs` · Conversion, paid      `screen: confirm` (`mode: paid`)

*Paid SafeStart. No payment form in stub — confirmation screen only.*

1. `SHOW confirm` (`mode: "paid"`)
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "You're in. Your dashboard is being set up."
4. `WAIT 200ms`
5. `SAY` 〔const〕:
   > "Your first move is your whole team's read."
6. `SUGGEST` 〔const〕: "↺ Start over" → `opening`

**Confirm screen (paid)** 〔const〕 — `confirm-screen.tsx`: two-week engagement shape, who to gather, org-wide read as first move.

---

## SCENE `whatIs` · About Movemental      `screen: about`

1. `SHOW about`
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "Here's the short version — the rest is on the page."
4. `WAIT 160ms`
5. `SAY` 〔const〕:
   > "We help you meet AI without losing trust."
6. `SUGGEST` 〔const〕:
   - "Map where we actually stand" → **`toBeat`** *(lead)*
   - "See the whole path" → `toPath`
   - "Who's behind this?" → `whoBehind`
   - "Get in touch" → `talkToUs`

**Screen body** 〔const〕 — `about-screen.tsx`.

---

## SCENE `cost` · Pricing      `screen: pricing`

1. `SHOW pricing`
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "Every price is on the page — and what we refuse to do."
4. `WAIT 160ms`
5. `SAY` 〔const〕:
   > "The guides are free. Facilitation is fixed-price."
6. `SUGGEST` 〔const〕:
   - "Map where we actually stand" → **`toBeat`** *(lead)*
   - "See the whole path" → `toPath`
   - "Read the FAQ" → `toFaq`
   - "Get in touch" → `talkToUs`

**Screen body** 〔const〕 — `pricing-screen.tsx`: all four stages × free/paid tiers + six pricing refusals.

---

## SCENE `toFaq` · FAQ      `screen: faq`

1. `SHOW faq`
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "Honest answers — including when we're not the right fit."
4. `WAIT 160ms`
5. `SAY` 〔const〕:
   > "Ten groups. Jump to what you need on the page."
6. `SUGGEST` 〔const〕:
   - "Map where we actually stand" → **`toBeat`** *(lead)*
   - "What does it cost?" → `cost`
   - "Get in touch" → `talkToUs`
   - "↺ Start over" → `opening`

**Screen body** 〔const〕 — `faq-screen.tsx` + `data/faq.ts` (10 sections).

---

## SCENE `toPath` · The Path      `screen: path`

1. `SHOW path`
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "It starts with Safety. The rest comes after."
4. `WAIT 200ms`
5. `SAY` 〔const〕:
   > "Almost everyone starts at the first step."
6. `SUGGEST` 〔const〕:
   - "I want simple next steps" → **`toBeat`** *(lead)*
   - "What does it cost?" → `cost`

**Screen body** 〔const〕 — `path-screen.tsx`: four ordered stages with expandable detail.

---

## SCENE `whoBehind` · Founders      `screen: founders`

1. `SHOW founders`
2. `WAIT 480ms`
3. `SAY` 〔const〕:
   > "A small team builds it: Alan, Brad, and Josh."
4. `WAIT 200ms`
5. `SAY` 〔const〕:
   > "Connected to the leaders on the home page."
6. `SUGGEST` 〔const〕:
   - "I want simple next steps" → **`toBeat`** *(lead)*
   - "About Movemental" → `whatIs`
   - "Talk to us" → `talkToUs`

**Screen body** 〔const〕 — `founders-screen.tsx`: Alan (0), Brad (1), Josh (8).

---

## SCENE `talkToUs` · Contact      `screen: contact`

1. `SHOW contact`
2. `WAIT 460ms`
3. `SAY` 〔const〕:
   > "Tell us a little about where you stand."
4. `WAIT 160ms`
5. `SAY` 〔const〕:
   > "We read every message — and reply personally."
6. `SUGGEST` 〔const〕:
   - "Map where we actually stand" → **`toBeat`** *(lead)*
   - "About Movemental" → `whatIs`
   - "↺ Start over" → `opening`

**Screen body** 〔const〕 — `contact-screen.tsx`: topic chips + name / org / email / message form. **Stub only:** submit is client-side mock (no POST to `/api/contact` yet). Success copy: *"Got it, {name}. We got your message…"*

*(Never SAY or echo form fields in the voice channel.)*

---

## SCENE `leader` · Leader profiles      `screen: leader`

Triggered from the home portrait band → `leaderScene(i)`.

**If an approved profile exists** (`profiles.ts`):

1. `SHOW leader` (`id: i`)
2. `WAIT 520ms`
3. `SAY` 〔const/template〕: *"This is {name}."*
4. `WAIT 180ms`
5. `SAY` 〔const〕: profile `lede`
6. `SUGGEST` 〔const/template〕:
   - "I want simple next steps" → **`toBeat`** *(lead)*
   - "What does {first} work on?" → `leaderWork`
   - "How is {first} connected?" → `leaderConnect`
   - "Back to the leaders" → `opening`

**If no approved profile:**

- Same opening, then SAY *"One of the leaders behind the path. A fuller profile is coming."*
- Suggest omits the "work on" chip.

### Sub-scene `leaderWork`

- Voices `profile.workSay` lines (or stub fallback).
- Suggest: "How is {first} connected?" · "I want simple next steps" · "Back to the leaders"

### Sub-scene `leaderConnect`

- Voices `profile.connectSay` lines (or default network lines).
- Suggest: "What does {first} work on?" · "I want simple next steps" · "Back to the leaders"

**Screen body** 〔const〕 — `leader-screen.tsx` + `profiles.ts`.

---

## What is *not* in stub mode today

These appear in older script drafts or stream-mode plans but **do not exist** in the current stub:

| Planned / old | Current stub behavior |
| --- | --- |
| Separate diagnostician agent (Scene 3–4 handoff) | Readback computed by `computeMapRead` + voiced in `beatScene` |
| `field_guide_signup` / `enrollment` screens | `safety` → `onOwn` / `withUs` → `confirm` |
| Model-routed typed input with clarify loop | Regex router + single fallback line |
| `handoff_human` screen for off-domain | Fallback SAY only |
| Email capture in voice for free guide | On-screen confirm only (no real send in stub) |
| Payment form in voice for paid tier | On-screen confirm only |

---

## Stream mode (live — INT-07 + PAR pack)

When `NEXT_PUBLIC_AGENT_ROOM_MODE=stream` (default), `/agent` uses `useAgentRoomStream` and the live engine in `movemental-ai-agents`. Local choreography (`src/lib/agent-room/local-choreography.ts`) plays opening ink and the `beatIntro` bridge without network. All other visitor moves are **AGENT**-driven unless classified **STUB-ONLY** in [`docs/build/agent-room-stub-stream-parity-matrix.md`](build/agent-room-stub-stream-parity-matrix.md). Engine-only screens: `network`, `audience`, `handoff_human`.

---

## Quick scene index

| Scene key | Screen | Lead chip target |
| --- | --- | --- |
| `opening` | home | `toBeat` |
| `toBeat` + beats | beat → readback | (readback → `toSafety`) |
| `toSafety` | safety | `withUs` |
| `onOwn` / `withUs` | confirm | — |
| `whatIs` | about | `toBeat` |
| `cost` | pricing | `toBeat` |
| `toFaq` | faq | `toBeat` |
| `toPath` | path | `toBeat` |
| `whoBehind` | founders | `toBeat` |
| `talkToUs` | contact | `toBeat` |
| `leader` / `leaderWork` / `leaderConnect` | leader | `toBeat` |
| `charter` / `involved` | (voice only) | `withUs` |
