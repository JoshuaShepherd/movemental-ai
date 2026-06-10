# AF-01 — Scope and architecture decisions

**Prompt ID:** AF-01  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-00  
**Last updated:** 2026-06-09

---

## 1. Role and stance

You are the **migration architect**. Lock decisions that every later prompt follows. Write a short **Architecture Decision Record (ADR)** in code comments + update this file's §10.

**In scope:** HTML/CSS/JS → React 19 / Next.js 16 / Tailwind v4 (scoped CSS module allowed).  
**Out of scope:** SSE, `movemental-ai-agents`, database, auth, tenant context.

---

## 2. Goal

Document and implement the **folder contract** and **runtime mode switch**:

- **Stub mode (this pack):** local `play()` runner + ported `SCENES` — no network.
- **Stream mode (AF-90):** `useAgentRoomStream` + `/api/agent-room/stream` — disabled until integration phase.

Deliverables:

1. ADR comment block in `src/lib/agent-room/README.md` (create if missing) or `src/components/agent-room/README.md`.
2. `AGENT_ROOM_MODE` constant or feature flag: `"stub" | "stream"` defaulting to **`"stub"`**.
3. Shell component chooses hook based on mode without deleting stream code.

---

## 3. Architecture decisions (defaults — confirm or adjust in §10)

### 3.1 Scoped design surface

The Ink Band uses **its own token ramp** (Playfair Display, Caveat hand, IBM Plex Mono, ink-blue `#22409B`). It is **not** Concept Modern marketing tokens.

- Wrap the room in a scoped class: `.ink-band-surface` (or retain `.oat-surface` only if tokens are renamed to match ink-band — prefer explicit naming).
- Marketing nav/footer **must not** appear on `/agent` (already handled via `proxy.ts` / `x-movemental-shell: room` — verify).

### 3.2 Component boundaries

```text
AgentRoomShell (client, hydration guard)
  └─ AgentRoom (client)
       ├─ Mast
       ├─ ScreenZone (scroll container + ink SVG overlay)
       │    └─ ActiveScreen (switch on screen id)
       ├─ VoiceZone
       └─ Composer
```

- **Server Components:** none inside the live room (full client island).
- **Data:** plain TS modules under `src/lib/agent-room/data/` — no fetch.

### 3.3 Preserve prototype contracts

From `js/app.js` header comment — copy verbatim into `src/lib/agent-room/acts.ts`:

- Closed screen set
- Act vocabulary
- One runner (`play`) performs any scene

### 3.4 HTML → React mapping rules

| Prototype pattern | React target |
| --- | --- |
| `innerHTML` string builders in `profiles.js` | JSX components + typed props |
| Global DOM refs (`sheet`, `voice`, `ink`) | `useRef` + React context (`AgentRoomContext`) |
| `renderScreen(id, opts)` switch | `<ScreenRouter screen={id} opts={opts} />` |
| Script load order | ES module imports |
| CSS class strings | CSS module classes or `@apply` in module |
| Event listeners on dynamic HTML | React event props on components |

### 3.5 What to do with existing `agent-room` code

| Asset | Action |
| --- | --- |
| `stream-chunk.ts`, `component-props.ts` | **Keep** — unused in stub mode |
| `use-agent-room-stream.ts` | **Keep** — wire in AF-90 only |
| `agent-room.module.css` | **Replace or rename** to match `ink-band.css` (AF-02) |
| Screen TSX files | **Rewrite** against prototype HTML, not oat copy |

---

## 4. Definition of Done

- [ ] ADR/README documents stub vs stream modes.
- [ ] `AGENT_ROOM_MODE = "stub"` enforced; `/agent` does not fetch stream on load.
- [ ] Folder scaffold created (`data/`, `acts.ts`, placeholder `scene-runner.ts`).
- [ ] `pnpm typecheck` passes.
- [ ] §10 + `master_runner.md` updated.

---

## 5. Implementation steps

1. Read AF-00 gap report in §10 of `00-preflight-audit-and-baseline.md`.
2. Create `src/lib/agent-room/mode.ts`:

```ts
export type AgentRoomMode = "stub" | "stream";
export const AGENT_ROOM_MODE: AgentRoomMode =
  (process.env.NEXT_PUBLIC_AGENT_ROOM_MODE as AgentRoomMode | undefined) ?? "stub";
```

3. Refactor `AgentRoom` to branch:

```tsx
// Pseudocode — implement cleanly
const room = AGENT_ROOM_MODE === "stub" ? useAgentRoomStub() : useAgentRoomStream();
```

4. Add stub hook placeholder (`use-agent-room-stub.ts`) returning minimal state until AF-05.
5. Document in README under `src/components/agent-room/`.

---

## 6. Skills

- Vercel `react-best-practices` — client boundary depth
- `concept-modern-ui` — read **scope warning** only

---

## §10 Attempt log

<!-- Append ADR summary and file list. -->

### 2026-06-09 — AF-01 architecture locked + scaffolded

**ADR:** `src/components/agent-room/README.md` (Accepted 2026-06-09). Decisions
match §3 defaults; one clarification recorded below.

**Files created**

| Path | Role |
| --- | --- |
| `src/lib/agent-room/mode.ts` | `AGENT_ROOM_MODE: "stub" \| "stream"`, default **`"stub"`** (`NEXT_PUBLIC_AGENT_ROOM_MODE` overrides) |
| `src/lib/agent-room/acts.ts` | Locked contract ported verbatim: `SCREEN_IDS` (12), `ACT_KINDS` (6), `Act`/`Scene` types, `SuggestChip` |
| `src/lib/agent-room/scene-runner.ts` | `SceneRunner` interface placeholder (`play`/`run`/`goHome`) — impl in AF-05 |
| `src/lib/agent-room/data/index.ts` | Data-modules barrel placeholder — populated AF-06 |
| `src/components/agent-room/use-agent-room-stub.ts` | Placeholder stub hook + shared `AgentRoomController` type; idle `opening` state, no-op `sendMessage`, **no fetch** |
| `src/components/agent-room/README.md` | The ADR |

**Files changed**

| Path | Change |
| --- | --- |
| `src/components/agent-room/agent-room.tsx` | Extracted `AgentRoomView` (mode-agnostic, takes `AgentRoomController`); added `StubRoom`/`StreamRoom` containers; `AgentRoom` now dispatches on `AGENT_ROOM_MODE`. **No stream code deleted.** |

**Decision detail / deviations**

- **Mode dispatch by component, not by conditional hook.** §5 step 3's pseudocode
  (`AGENT_ROOM_MODE === "stub" ? useAgentRoomStub() : useAgentRoomStream()`) would
  violate the rules of hooks. Implemented instead as two thin containers
  (`StubRoom` / `StreamRoom`), each calling one hook unconditionally. Net effect
  is identical and **guarantees stub mode never mounts the stream hook** — `/agent`
  cannot fetch on load by construction (the stub hook has no fetch; the stream
  hook isn't instantiated). This satisfies DoD "does not fetch stream on load".
- **Scoped class `.ink-band-surface`** chosen over keeping `.oat-surface`
  (explicit naming, per §3.1 preference). The wrapper is still `.oat-surface` in
  `agent-room.tsx` until **AF-02** swaps the token module — flagged there.
- **`ScreenState`/`VoiceState` shared from the stream hook** for now; the Ink Band
  screen IDs are wider than the engine `ComponentId` enum, so these reconcile at
  **AF-07**. Recorded in ADR §Consequences.
- **`ComponentId` ↔ Ink Band screen-set harmonization is NOT done here** — it's
  AF-90 / INT-01 per the deferred pack. `acts.ts` carries the 12-screen Ink Band
  set as the source of truth; the engine enum in `stream-chunk.ts` is untouched.
- **Intentional regression noted:** default `/agent` now renders the stub
  placeholder (opening hero + no-op composer) until AF-05 ports the runner. Live
  agent remains reachable via `NEXT_PUBLIC_AGENT_ROOM_MODE=stream`.

**Verification**

- `pnpm typecheck` → **green (exit 0)**.
- `eslint` on the 6 touched code files → **0 errors, 0 warnings**.
- "No stream fetch on load" → verified **by construction** (stream hook not mounted
  in stub mode). Runtime dev-server/network-tab check is meaningful once AF-03/04
  land the real shell; deferred to then.
- AF-90 guardrails honored: `use-agent-room-stream.ts`, `stream-chunk.ts`,
  `component-props.ts`, `proxy-schema.ts`, `/api/agent-room/stream` all untouched.
