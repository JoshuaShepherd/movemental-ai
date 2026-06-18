# Agent room — documentation index

**Created:** 2026-06-18 (AU-22)  
**Purpose:** Single entry point for agent-room SSOTs, supersession chains, prompt packs, and known doc/code drift.  
**Audience:** Engineers, product, and external agents before editing dock, voice, thread, Discuss, or engine wiring.

---

## Authority order (when docs conflict)

1. **Live code + tests** — `src/lib/agent-room/`, `src/components/agent-room/`, `tests/e2e/agent-*.spec.ts`, engine seed in `movemental-ai-agents`
2. **[Choreography SSOT](./agent-room-conversation-choreography-model-ssot.md)** — caption vs thread invariants (I1–I6), `dockState` as sole surface switch
3. **[Chat UI SSOT](./agent-room-chat-conversation-ui-ssot.md)** — collapsed vs expanded dock, Guide vs Discuss wiring, typography, duplicate guards (except where choreography supersedes §6 / surface matrix)
4. **[Platform complete reference](./agent-platform-complete-reference.md)** — topology, screen inventory, classifier, engine tools, capture APIs, gap list
5. **Historical notes (dated)** — dock note, long-form Discuss spec, phase-1 status, migration ADRs — read for intent and history, not shipped behavior

**Design canon (visual, not behavioral):** [INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) governs typography, tokens, and “manuscript not chat app” charter. It does not override choreography invariants when they conflict with layout sketches in older specs.

---

## Known conflict resolutions (documented, not rewritten here)

| Topic | Winning SSOT | Notes |
| --- | --- | --- |
| **Caption vs thread** | [Choreography SSOT](./agent-room-conversation-choreography-model-ssot.md) | Collapsed = one short caption line only (scene choreography); all AGENT turns → expanded thread. [Chat UI SSOT §6](./agent-room-chat-conversation-ui-ssot.md) **partially demoted** — DiscussVoice / stream-in-band behavior in §6.3 contradicts I1; trust choreography + code. |
| **Default chip routing** | `src/lib/agent-room/composer-routing.ts` + [dock note §4](./agent-home-dock-functionality-2026-06-15.md) | **2026-06-17 screen-first:** collapsed opening pills → local scenes; expanded drawer → agent SSE. Matrix: [chip-routing-matrix](./agent-room-chip-routing-matrix.md) (AU-07). |
| **Discuss layout** | **Unresolved — AU-10 open** | [Long-form §5.1](./agent-room-long-form-discussion-ui.md) committed Model B (sheet marginalia). Shipped wiring = expanded dock overlay (Model C). [AU-10](../prompts/agent-updates/10-discuss-overlay-vs-marginalia.md) requires operator decision before large UI refactor. `agent-room-discuss-layout-decision.md` **does not exist yet**. |
| **Default runtime mode** | Code: `hybrid` (`mode.ts`) | [Component ADR](../../src/components/agent-room/README.md) still records INT-07 `stream` default — **stale**; hybrid is center per consultation + AU prompts. |
| **Host model id** | Engine seed (`AGENT_SEEDS`) | [Platform reference §15](./agent-platform-complete-reference.md) + [WAF note](./agent-room-waf-and-model-hygiene.md) pin `claude-opus-4-6`. [Prompt baseline](./agent-room-prompt-baseline.md) still lists Haiku for host — **stale**. |

### Supersession chain: chat UI ↔ choreography

```text
2026-06-17  agent-room-chat-conversation-ui-ssot.md
            └─ supersedes dock note + platform §4.3 for shipped dock wiring

2026-06-17  agent-room-conversation-choreography-model-ssot.md
            └─ supersedes chat UI SSOT: surface matrix, length routing, duplicate guards
            └─ chat UI SSOT remains authoritative for: expand/collapse UX, Guide/Discuss
               phase wiring, component tree, modification recipes (§16)
```

---

## SSOT registry

| Doc | Scope | Status | Supersedes / superseded by | Last verified |
| --- | --- | --- | --- | --- |
| [agent-room-conversation-choreography-model-ssot.md](./agent-room-conversation-choreography-model-ssot.md) | Caption vs thread; `dockState`; I1–I6 invariants | **Active SSOT** | Supersedes chat UI surface matrix + length routing | 2026-06-17 |
| [agent-room-chat-conversation-ui-ssot.md](./agent-room-chat-conversation-ui-ssot.md) | Dock collapsed/expanded, component tree, Guide/Discuss, typography, orphans | **Active SSOT** (partial) | Supersedes dock note + platform §4.3; **partially superseded by** choreography SSOT | 2026-06-17 |
| [agent-platform-complete-reference.md](./agent-platform-complete-reference.md) | End-to-end topology, screens, routing, engine, capture, gaps | **Working SSOT** | Supersedes scattered phase-1 notes in part | 2026-06-17 |
| [INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) | Visual charter, tokens, typography, closed screen vocabulary | **Design canon** | — (behavioral SSOTs take precedence on wiring) | 2026-06-18 |
| [agent-room-chip-routing-matrix.md](./agent-room-chip-routing-matrix.md) | Screen-first pill/door routing matrix (AU-07) | **Active reference** | Code: `composer-routing.ts` | 2026-06-18 |
| [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) | Dock UX, opening choreography, Playwright anchors | **Historical** (Playwright still valid) | Superseded for chat UI by chat UI SSOT | 2026-06-15 |
| [agent-room-long-form-discussion-ui.md](./agent-room-long-form-discussion-ui.md) | Discuss phase product intent, triggers, Model A/B/C | **Product spec** (partial stale) | Wiring: chat UI SSOT; layout: **AU-10 pending** | 2026-06-10 |
| [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md) | Prompt edit → seed → run workflow | **Active reference** | § handoff OPEN decision superseded by platform reference | 2026-06-05 |
| [docs/build/agents/agent-room/README.md](../agents/agent-room/README.md) | Engine prompt/tool construction SSOT (human-editable) | **Active SSOT** (engine docs) | DB after `pnpm seed:agent-room` | 2026-06-18 |
| [agent-room-waf-and-model-hygiene.md](./agent-room-waf-and-model-hygiene.md) | `/turn` WAF workaround, model change procedure | **Proposed / operator** | — | 2026-06-17 |
| [agent-room-discuss-staging-env.md](./agent-room-discuss-staging-env.md) | Discuss flag env checklist (staging only) | **Operational** | AU-09 | 2026-06-18 |
| [movemental-ui-ai-design-consultation-2026-06-18.md](./movemental-ui-ai-design-consultation-2026-06-18.md) | Full product/UI/AI assessment + tiered recommendations | **Strategic reference** | Source for AU-01–AU-22 prompt pack | 2026-06-18 |
| [agent-room-suggestion-pills-inventory-and-recommendations.md](./agent-room-suggestion-pills-inventory-and-recommendations.md) | Per-screen pill inventory and recommendations | **Reference** | Code: `scenes.ts`, `composer-routing.ts` | 2026-06-10 |
| [movemental-room-script.md](../../movemental-room-script.md) | Stub choreography script (visitor journey) | **Reference** (mode defaults updated in PAR-05) | Local scenes in `scenes.ts` | 2026-06-10 |
| [src/components/agent-room/README.md](../../../src/components/agent-room/README.md) | Component ADR (AF-01, INT-07, PAR-01 amendments) | **ADR** (partial stale on default mode) | — | 2026-06-10 |
| [agent-room-phase1-status.md](./agent-room-phase1-status.md) | Phase 1 build status snapshot | **Historical** | Superseded by platform reference + prompt baseline | 2026-06-05 |
| [docs/build/agent-room-handoff.md](../agent-room-handoff.md) | Hybrid handoff policy (local → LLM) | **ADR / policy** | PAR-01 | 2026-06-10 |
| [docs/build/agent-room-stub-stream-parity-matrix.md](../agent-room-stub-stream-parity-matrix.md) | Stub vs stream vs hybrid parity matrix | **Reference** | PAR-00 | 2026-06-10 |

---

## Prompt registry

### Agent updates (consultation execution)

Source: [movemental-ui-ai-design-consultation-2026-06-18.md](./movemental-ui-ai-design-consultation-2026-06-18.md) · Runner: [agent-updates/master_runner.md](../prompts/agent-updates/master_runner.md)

| Prompt | Implements |
| --- | --- |
| [AU-01](../prompts/agent-updates/01-unify-stage-naming-public-copy.md) | Public stage naming SSOT (`naming.ts`) |
| [AU-02](../prompts/agent-updates/02-capture-funnel-e2e-audit-and-gaps.md) | Capture funnel audit + E2E gaps |
| [AU-03](../prompts/agent-updates/03-preview-hygiene-noindex-legal-redirects.md) | Preview SEO / legal / redirects |
| [AU-04](../prompts/agent-updates/04-single-beat-ssot-local-engine.md) | `beat-catalog.ts` SSOT (cross-repo) |
| [AU-05](../prompts/agent-updates/05-dock-affordance-copy-mental-model.md) | Dock legend copy + a11y |
| [AU-06](../prompts/agent-updates/06-regex-routing-audit-and-tests.md) | Regex routing false-positive tests |
| [AU-07](../prompts/agent-updates/07-screen-first-routing-matrix-playwright.md) | Chip routing matrix + Playwright |
| [AU-08](../prompts/agent-updates/08-agent-room-ssr-fallback-expansion.md) | SSR fallback + `home-copy.ts` |
| [AU-09](../prompts/agent-updates/09-discuss-mode-staging-e2e.md) | Discuss staging E2E + turn-cap capture |
| [AU-10](../prompts/agent-updates/10-discuss-overlay-vs-marginalia.md) | **Discuss layout decision** (operator gate) |
| [AU-11](../prompts/agent-updates/11-discuss-entry-chips-readback.md) | Discuss entry chips on readback |
| [AU-12–15](../prompts/agent-updates/README.md) | Path accordion, leader carousel, pricing accordion, readback spine |
| [AU-16–18](../prompts/agent-updates/README.md) | Render props, RAG, session persistence |
| [AU-19–21](../prompts/agent-updates/README.md) | PostHog, deprecate stream, engine safety-flow parity |
| [AU-22](../prompts/agent-updates/22-ssot-docs-consolidation-index.md) | **This index** |

### Related prompt packs (overlap)

| Prompt / pack | Implements |
| --- | --- |
| [dock-pill-screen-first-routing.md](../prompts/dock-pill-screen-first-routing.md) | Screen-first collapsed pills (precursor to AU-07) |
| [agent-room-stub-stream-parity/](../prompts/agent-room-stub-stream-parity/README.md) | Stub ↔ stream ↔ hybrid parity reconciliation (PAR-00–07) |
| [integration-agent-backend/](../prompts/integration-agent-backend/master_runner.md) | Engine integration (INT-00–10); Discuss Model B foundation (INT-08) |
| [migration-agentic-front-end/](../prompts/migration-agentic-front-end/README.md) | Ink Band prototype → React migration (AF-00–12) |
| [agent-room-playwright-audit-remediation.md](../prompts/agent-room-playwright-audit-remediation.md) | Playwright coverage gaps |
| [safety-flow-migration-audit.md](../prompts/safety-flow-migration-audit.md) | Safety flow local vs engine parity QA |

---

## Deprecated / historical

| Doc | Superseded by | Notes |
| --- | --- | --- |
| [agent-room-phase1-status.md](./agent-room-phase1-status.md) §3 handoff OPEN | [agent-platform-complete-reference.md](./agent-platform-complete-reference.md), [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md) | Handoff resolved 2026-06; do not treat §3 as blocking |
| [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) §3–§6 (chat UI) | [agent-room-chat-conversation-ui-ssot.md](./agent-room-chat-conversation-ui-ssot.md) | §4 chip table still useful for 2026-06-15→17 reversal narrative |
| Long-form Discuss **Model C overlay** narrative | Shipped: expanded `AgentDock`; future: AU-10 decision | `DiscussOverlay` unwired per chat UI SSOT §15 |
| Long-form Discuss **Model B marginalia** (ratified in spec) | **Not shipped** — AU-10 | INT-08 marked Done for foundation; overlay vs sheet tension remains |
| [src/components/agent-room/README.md](../../../src/components/agent-room/README.md) INT-07 default `stream` | Code default `hybrid` + AU-20 plan | ADR history retained; do not set env from ADR alone |

---

## Drift backlog (doc ↔ code — fix in future PRs)

| Item | Doc says | Code / other SSOT says | Suggested fix |
| --- | --- | --- | --- |
| Host model | [prompt-baseline](./agent-room-prompt-baseline.md): Haiku | [platform reference](./agent-platform-complete-reference.md), [WAF note](./agent-room-waf-and-model-hygiene.md): Opus 4-6 | Update prompt-baseline model table |
| Default mode | [component ADR](../../../src/components/agent-room/README.md): stream | `mode.ts` default `hybrid` | Amend ADR or add “superseded by hybrid” banner |
| Discuss layout | Long-form §5.1 Model B; INT-08 Done | Expanded dock hides screen (Model C) | Complete AU-10; create `agent-room-discuss-layout-decision.md` |
| Caption in Discuss collapsed | Chat UI §6.3 DiscussVoice | Choreography I1 caption-only | Mark §6.3 deprecated in chat UI SSOT header |
| Phase-1 handoff | [phase1-status](./agent-room-phase1-status.md) §3 OPEN | Handoff live | Add deprecation banner to phase1 doc |
| Unwired components | Listed in chat UI §15 | Still in tree | Either wire (AU-10) or move to `_archive` in a UI PR |

---

## Quick navigation by task

| I need to… | Start here |
| --- | --- |
| Change where agent text renders | [Choreography SSOT](./agent-room-conversation-choreography-model-ssot.md) → `agent-dock.tsx`, `caption-validator.ts` |
| Change expand/collapse or thread UI | [Chat UI SSOT](./agent-room-chat-conversation-ui-ssot.md) → `agent-dock.tsx`, `discuss-thread.tsx` |
| Change pill routing | [Chip matrix](./agent-room-chip-routing-matrix.md) → `composer-routing.ts` |
| Add a screen or tool | [Platform reference](./agent-platform-complete-reference.md) → `screen-map.ts`, engine seed |
| Edit agent prompts | [agents/agent-room/README.md](../agents/agent-room/README.md) → seed in `movemental-ai-agents` |
| Understand Ink Band visuals | [INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) |
| Run consultation work | [agent-updates/master_runner.md](../prompts/agent-updates/master_runner.md) |

---

*Maintained by AU-22. When adding a new agent-room SSOT, register it in the tables above and link back to this index from the doc header.*
