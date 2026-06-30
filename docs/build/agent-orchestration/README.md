# Agent orchestration — share pack

**Purpose:** One directory to attach when briefing Claude (or any external agent) on how the Movemental `/agent` room works — routing, prompts, say/show choreography, and redesign levers.

**Live product:** `https://movemental.ai/agent`  
**Code (UI):** `src/lib/agent-room/`, `src/components/agent-room/`  
**Code (engine):** sibling repo `movemental-ai-agents`

---

## How to share with Claude

### In Cursor / Claude Code (this repo)

Attach or `@`-mention this folder:

```text
docs/build/agent-orchestration/
```

**Minimum read set** (orchestration redesign):

1. [`overview.md`](./overview.md) — start here
2. [`ssot/agent-platform-complete-reference.md`](./ssot/agent-platform-complete-reference.md)
3. [`ssot/agent-room-conversation-choreography-model-ssot.md`](./ssot/agent-room-conversation-choreography-model-ssot.md)
4. [`engine/prompts/room-host.md`](./engine/prompts/room-host.md)

### In Claude.ai (project knowledge / zip upload)

Symlinks are not followed by all upload flows. Materialize a flat copy first:

```bash
pnpm agent-orchestration:bundle
# → writes docs/build/agent-orchestration-bundle/ (real files, no symlinks)
```

Upload **`docs/build/agent-orchestration-bundle/`** as project knowledge, or zip it:

```bash
cd docs/build && zip -r agent-orchestration-bundle.zip agent-orchestration-bundle/
```

---

## Directory layout

| Path | Contents |
| --- | --- |
| [`page-scripts/`](./page-scripts/) | **Plain-English walkthroughs** — one script per screen, step-by-step visitor experience |
| [`audits/`](./audits/) | **Live-site audits** — missing demo assets, Nano Banana prompts, QA notes |
| [`overview.md`](./overview.md) | **Start here** — synthesized orchestration map (say + show + prompts + redesign levers) |
| [`documentation-index.md`](./documentation-index.md) | SSOT registry, authority order, conflict resolutions, prompt registry |
| [`ssot/`](./ssot/) | Behavioral & product SSOTs (platform reference, choreography, chat UI, chip matrix, consultation, …) |
| [`engine/`](./engine/) | Human-editable engine docs: host/diagnostician prompts, tools, corpus, runtime assembly |
| [`prompts/`](./prompts/) | Implementation prompt packs (AU-01–22, stub/stream parity, integration, migration) |
| [`policy/`](./policy/) | Hybrid handoff ADR, stub/stream/hybrid parity matrix, sign-offs |
| [`design/`](./design/) | Ink Band visual charter |
| [`adr/`](./adr/) | Component-level ADR (`component-room-adr.md`) |
| [`movemental-room-script.md`](./movemental-room-script.md) | Stub visitor journey script |
| [`viewer/`](./viewer/) | **Local HTML reader** (gitignored) — `pnpm agent-orchestration:viewer` |

---

## Local HTML reader (human-friendly)

Built output is **gitignored** and **cursorignored** — for local reading and prompt planning only.

```bash
pnpm agent-orchestration:viewer
# → http://127.0.0.1:8791/viewer/
```

- Renders all pack markdown with editorial typography (not raw `.md`)
- Home page: structure, reading path, orchestration layers, **prompt lab** templates
- Sidebar search + deep links (`#doc=overview.md`)
- **Live screen copy:** `pnpm agent-orchestration:sync-screen-copy` pulls fixed copy from `src/lib/agent-room/data/*-copy.ts` into page scripts and host prompt (viewer build runs this automatically)
- Rebuild manifest after doc changes: `pnpm agent-orchestration:viewer:build`

Source templates (committed): `scripts/agent-orchestration-viewer/`

## Suggested reading order (external agent)

```text
1. page-scripts/README.md               — per-screen plain-English scripts (visitor experience)
2. overview.md                          — mental model + routing tree
3. ssot/agent-platform-complete-reference.md — topology + screen inventory
4. ssot/agent-room-conversation-choreography-model-ssot.md — I1–I6 invariants
5. policy/agent-room-handoff.md         — hybrid local vs SSE
6. engine/README.md                     — prompt edit → seed workflow
7. engine/prompts/room-host.md          — live host policy
8. ssot/movemental-ui-ai-design-consultation-2026-06-18.md — strategic tensions
9. documentation-index.md               — full registry when diving deeper
```

For **chat-first redesign**, read `overview.md` §9–10, then `ssot/agent-room-chip-routing-matrix.md` and `prompts/dock-pill-screen-first-routing.md`.

---

## Canonical locations (symlinks)

Files in this pack are **symlinks** to canonical paths elsewhere in the repo. Edit the **canonical** file, not a duplicate:

| Pack path | Canonical path |
| --- | --- |
| `ssot/*.md` | `docs/build/notes/*.md` |
| `engine/` | `docs/build/agents/agent-room/` |
| `prompts/agent-updates/` | `docs/build/prompts/agent-updates/` |
| `policy/*.md` | `docs/build/*.md` |
| `design/INK_BAND_DESIGN_CHAIN.md` | `docs/design/INK_BAND_DESIGN_CHAIN.md` |
| `overview.md` | **lives here** (moved from `docs/build/notes/`) |

---

## Authority order (when docs conflict)

1. Live code + tests  
2. `overview.md` (planning synthesis — defers to SSOTs for shipped behavior)  
3. `ssot/agent-room-conversation-choreography-model-ssot.md`  
4. `ssot/agent-room-chat-conversation-ui-ssot.md`  
5. `ssot/agent-platform-complete-reference.md`  
6. Historical / dated notes in `ssot/`

Full table: [`documentation-index.md`](./documentation-index.md).

---

*Pack created 2026-06-29. Register new orchestration SSOTs in `documentation-index.md` and add a symlink under `ssot/`.*
