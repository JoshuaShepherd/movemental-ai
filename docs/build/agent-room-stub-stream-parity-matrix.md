# Agent Room stub ↔ stream parity matrix

**Pack:** PAR-00  
**Last updated:** 2026-06-10  
**SSOT script:** [`docs/movemental-room-script.md`](../movemental-room-script.md)  
**Mode default:** `hybrid` (`src/lib/agent-room/mode.ts`). See also **Hybrid** column below.

---

## Summary

| Metric | Count |
| --- | --- |
| Scenes in `SCENES` | 18 |
| **LOCAL** moves | 3 (opening ink, beatIntro bridge, REPLAY reset) |
| **AGENT** moves | 14 scene families + beat/readback flow |
| **STUB-ONLY** moves | 2 (regex router, implicit discussOffer signals) |
| **GAP** rows (pre-PAR) | 6 |
| **GAP** rows (post-PAR-01/02) | 4 (beat micro-choreography, full readback live, engine gestures mid-beat, capture gates) |

### Top 5 risks

1. **Lead chip divergence** — stub runs `beatIntro` locally; stream used to send the label straight to the LLM. **PAR-02 fixes:** LOCAL `beatIntro` then AGENT on "Okay, map it".
2. **Beat per-answer ink** — stub circles the tapped option locally; stream depends on engine `gesture_at`. **PAR-03/04:** prompt + tool contract.
3. **Readback handoff** — stub is fully deterministic (`computeMapRead`); stream needs `request_diagnosis` → diagnostician. Live E2E not always green without engine.
4. **Docs lie about default mode** — `movemental-room-script.md` still says stub default. **PAR-05 fixes.**
5. **Capture gates** — stub `withUs`/`onOwn`/`beatScene` map capture differ from engine `show_capture` sequencing. Track as AGENT with fixture tests.

### Recommended PAR order

No reorder needed. PAR-01 → PAR-02 before PAR-03 beat contract.

---

## Scene inventory (`SCENES` keys)

| Scene | Acts | Screen(s) |
| --- | ---: | --- |
| `opening` | 6 | `home` |
| `beatIntro` | 5 | (voice only on `home`) |
| `toBeat` | 6 | `beat` qi=0 |
| `whatIs` | 5 | `about` |
| `cost` | 5 | `pricing` |
| `toFaq` | 5 | `faq` |
| `whoBehind` | 5 | `founders` |
| `talkToUs` | 5 | `contact` |
| `leaderConnect` | 4 | (voice) |
| `toPath` | 5 | `path` |
| `toSafety` | 5 | `safety` |
| `charter` | 4 | (voice) |
| `involved` | 4 | (voice) |
| `withUs` | 9 | `capture` → `confirm` |
| `onOwn` | 9 | `capture` → `confirm` |
| `toDiscuss` | 9 | `capture` → `confirm` |
| `discussOffer` | 4 | (voice) |

Leader-aware (not in `SCENES` static table): `leaderScene(i)`, `leaderWork`, `leaderConnect` via `leader-scenes.ts`.  
Beat flow: `beatScene(qi, oi, read)` in `beat-scenes.ts` (6 beats → readback → map capture).

---

## Per-scene / per-move matrix

### `opening` · home

| Move | Class | Stub | Stream | Hybrid |
| --- | --- | --- | --- | --- |
| `SHOW home` | LOCAL | `run("opening")` → `show("home")` | Static `HomeScreen` on load | `run("opening")` → `show("home")` |
| `WAIT 560` + `SAY` opening line | **LOCAL** | `SCENES.opening` via `playScene` | `OPENING_CHOREOGRAPHY` | `SCENES.opening` via `playScene` |
| `GESTURE underline → #phrase` | **LOCAL** | same scene | same local module | same scene |
| `SUGGEST` chips (6) | LOCAL | `suggest()` binds `to` scene | `DEFAULT_SUGGESTIONS` + PAR-02 | `suggest()` binds `to` scene |
| Lead chip "Get a clear next AI step" | **LOCAL** | `run("beatIntro")` | local beatIntro then AGENT on "Okay, map it" | `run("beatIntro")` |
| Leader portrait tap | **LOCAL** | `leaderScene(i)` + FLIP | `onSay("Tell me about …")` | `leaderScene(i)` + FLIP |
| Typed regex match | LOCAL | `run(routeInput)` | AGENT (intentional) | `run(routeInput)` |
| Typed no match | AGENT | `FALLBACK_SAY` (stub) | SSE | SSE (`move-classifier`) |
| REPLAY | **LOCAL** | `goHome()` → `run("opening")` | `playOpeningChoreography` | `goHome()` → `run("opening")` |

### `beatIntro` · bridge (home only)

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| `CLEAR` + 2× `SAY` + `SUGGEST "Okay, map it"` | **LOCAL** | `run("beatIntro")` from opening lead chip | **PAR-01/02:** `BEAT_INTRO_CHOREOGRAPHY` on lead chip tap |
| "Okay, map it" chip | AGENT | `to: "toBeat"` local scene | `sendMessage("Okay, map it")` → engine `render_beat` |

### `toBeat` + beats · reality check

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| Intro: `SHOW beat`, 2× `SAY`, `arrow → #opts` | AGENT | `run("toBeat")` local | Engine: `render_beat` + `gesture_at` (GAP if engine skips gesture) |
| Per-answer: circle, reply, advance | AGENT | `beatScene()` local | User tap → `onSay(opt)` → SSE; engine should emit `ink_gesture` + `text_delta` (**GAP** if missing) |
| After beat 6 → readback | AGENT | `beatScene` local `computeMapRead` | `request_diagnosis` → `agent_handoff` → diagnostician `show_readback` (**GAP** live E2E) |
| Map capture after readback | AGENT | local `capture` kind `map` | `show_capture { kind: "map" }` |

### `toSafety` / `charter` / `involved`

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| Full scenes | AGENT | `run(name)` | Engine `show_safety` + narration; sub-voice via agent turns |
| Capture `withUs` / `onOwn` | AGENT | local capture await | `show_capture { kind: paid/free }` |

### Info scenes (`whatIs`, `cost`, `toFaq`, `toPath`, `whoBehind`, `talkToUs`)

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| Show + say + suggest | AGENT | `run(name)` | Chip → `sendMessage(say)`; engine `show_*` tools |
| Lead chips → `toBeat` | AGENT | `run("toBeat")` local | `sendMessage("Map where we actually stand")` etc. |

### `leader` / `leaderWork` / `leaderConnect`

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| Profile scenes | AGENT | `leaderScene(i)` etc. | `sendMessage` about leader; engine `show_leader` |

### `toDiscuss` / `discussOffer`

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| Discuss capture gate | STUB-ONLY / AGENT | Local when `DISCUSS_ENABLED` | `suggest_chips` + `enter-discuss` sentinel; `show_capture { kind: discuss }` |
| Implicit discuss offer (3 free-text / meta) | **STUB-ONLY** | `discussOffer` scene | Engine `suggest_chips` (AGENT decision) |

### Global moves

| Move | Class | Stub | Stream |
| --- | --- | --- | --- |
| Logo / Home crumb → opening | LOCAL | `goHome()` | `reset()` |
| Typed free text | **STUB-ONLY** | `routeInput()` → `run(scene)` | **AGENT** — always `sendMessage(text)` |
| Fallback line | STUB-ONLY | `FALLBACK_SAY` local | Engine off-domain / author turn |

---

## Default composer chips (`DEFAULT_SUGGESTIONS`)

| Label | Class (stream) | Stub `to` |
| --- | --- | --- |
| Get a clear next AI step | **LOCAL** `beatIntro` | `beatIntro` |
| About Movemental | AGENT | `whatIs` |
| Who's behind this? | AGENT | `whoBehind` |
| What does it cost? | AGENT | `cost` |
| Read the FAQ | AGENT | `toFaq` |
| Get in touch | AGENT | `talkToUs` |

---

## GAP tracker (for PAR-07)

| ID | Row | Status | Owner prompt |
| --- | --- | --- | --- |
| G1 | Beat intro `arrow → #opts` via engine | Open | PAR-03/04 |
| G2 | Per-answer `circle → [data-oi]` live | Open | PAR-03/04 |
| G3 | Full beat→readback live E2E | Open (engine-gated) | PAR-03/06 |
| G4 | Capture gate parity (`withUs`/`onOwn`/`map`) | Open | PAR-03 |
| G5 | Docs stub-default lie | **Closed PAR-05** | — |
| G6 | Lead chip accidental divergence | **Closed PAR-02** | — |
