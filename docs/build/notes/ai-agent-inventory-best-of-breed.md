# AI Agent Inventory — Best-of-Breed Chatbot Designs Across All Repos

**Status:** Working note (engineering assessment)
**Created:** 2026-06-05
**Scope:** Every git repo under `~/dev` (Ubuntu/WSL). Conversational **chatbots / agent runtimes** only — SEO agents, one-off AI scripts, and utility automations are explicitly out of scope.
**Question answered:** *Which of our agents is the best-designed starting point to clone?*

---

## 0. TL;DR — what to dupe

**If you clone exactly one repo as your engine: [`movemental-ai-agents`](../../../movemental-ai-agents).** It is the cleanest, most modular, most provider-agnostic agent runtime we own (design score **8.5/10**). It is purpose-built to be *the* shared agent service — DI everywhere, swappable LLM providers, DB-driven composable prompt packs with Anthropic prompt-caching baked into the block order, a single well-tested tool loop, and per-turn trace persistence.

**But the actual "best chatbot" is a synthesis** — these repos are not separate cars; they are the **front half, back half, and brain of one distributed system** that has been copied across tenant apps (nearly every `src/agents/shared/*` file literally carries the header `Mirrors alan-hirsch architecture`). The highest-leverage clone is:

> **`movemental-ai-agents` (engine)** + **`movemental-visual-editor-main` (client/streaming/UI)** + **`ai-lab-agent` / `alan-hirsch` (persona & voice-fidelity brain)** + **`movemental-dashboard` (prompt-pack model)**.

Each contributes a genuinely best-in-class part, and each carries the *same* fixable flaws (see §6).

---

## 1. The garage (inventory at a glance)

13 repos under `~/dev/01-Movemental-Core`. Eight tripped the AI signal; after kicking the tires, **five are real conversational agents**, one is a false positive, and the rest are utilities/content.

| Repo | What the agent *is* | Design score | Role in the system |
|------|---------------------|:---:|--------------------|
| [`movemental-ai-agents`](../../../movemental-ai-agents) | Headless multi-tenant **agent runtime/engine** (Anthropic + OpenAI + Google) | **8.5** | 🏆 Best **engine** — the brain box |
| [`movemental-visual-editor-main`](../../../movemental-visual-editor-main) | Chat **client + thin proxy** + course-editor assistant | **8.5** (front-end) | 🏆 Best **client/streaming/UI** |
| [`alan-hirsch`](../../../alan-hirsch) | Richest **chat UI** + NotebookLM-style grounded chat + ChatKit bridge | **7.5** | Best **persona artifact** + UX |
| [`movemental-dashboard`](../../../movemental-dashboard) | **Writing Assistant** chatbot + prompt-pack runtime | **7.5** | Best **prompt-pack model** |
| [`ai-lab-agent`](../../../ai-lab-agent) | Standalone **agent backend** (OpenAI Agents SDK + Drizzle) | **6.5** | Canonical **persona/instruction brain** (carries debt) |
| `alan-books` | — | n/a | **False positive** — AI signal is a vendored `openai` lib inside `.venv-markitdown/`; no chatbot |
| `movemental-ai`, `yf-np-dashboard`, `movemental-internal`, `movemental-html-template`, `alan-hirsch-final-archive`, `docs`, `my-skills` | — | n/a | No conversational agent (content, marketing site, skills, or archive) |

**Scoring rubric** (1–5 per dimension, normalized to /10): architecture & separation · prompt/persona design · provider abstraction & streaming · tool orchestration · conversation memory/persistence · guardrails/safety · observability · streaming UX & client integration · code quality & extensibility.

---

## 2. The single most important finding

**This is one chatbot wearing five repos.** The pieces were built once and mirrored outward:

- `ai-lab-agent` is the **canonical brain** — the persona/instruction system the others re-derive. `alan-hirsch`'s persona file even says its voice rules are *"distilled from the standalone AI Lab agent repo (`ai-lab-agent`: `src/agents/ai-lab/instructions/core.ts`) … do not import that repo at runtime."*
- `movemental-ai-agents` is the **re-architected engine** — the same ideas (prompt packs, corpus binding, tool loop) rebuilt cleanly as a reusable, DI-driven package (`@movemental/agent-runtime`).
- `alan-hirsch`, `movemental-dashboard`, `movemental-visual-editor-main` are **consumer/UI halves** — they own the chat experience and proxy/stream to an upstream agent service.

Consequence for you: **don't pick one car — harvest the best-engineered module from each.** The clone blueprint in §5 does exactly that.

---

## 3. Teardown — the cars worth driving

### 🏆 `movemental-ai-agents` — the engine (8.5/10)

The best-architected agent code we own, and the only one built from the start to be reused.

**What's excellent**
- **Architecture (5/5):** four clean rings — a *pure, DB-free* core package (`packages/agent-runtime/src/resolve-core.ts`, only depends on `zod`) → a DI-driven runtime (`src/lib/ai/runtime/agent-runner.ts`) → generated tenant-filtered services → thin API routes (`src/app/api/agents/{chat,stream}/route.ts`). Every dependency is injected (`AgentRunnerDeps`), so the whole thing is unit-testable.
- **Prompt design (5/5):** personas are **DB-driven composable "prompt packs"** (ordered layers joined with `---`), and the resolved runtime exposes `systemBlocks` as **cacheable static blocks** with `cache_control: ephemeral`, with per-turn dynamic context appended *last* (uncached) so Anthropic prefix-cache keeps hitting. Cache ordering is preserved across providers on purpose, with a dev-mode cache-miss warning.
- **Provider abstraction (5/5):** a `ModelAdapter` interface with `complete()` + `stream()`, four real adapters (Anthropic/OpenAI/Google-with-grounding/Grok), registered **only if the API key exists** (clients return `null` instead of throwing at import). Swap providers by changing one DB string.
- **Tool loop (5/5):** one loop reused for stream + non-stream + handoff; tools registered into a `Map`, executed in **parallel** with `Promise.allSettled`, 30s per-tool timeout, errors converted to payloads instead of crashing the loop, `MAX_TOOL_ITERATIONS = 16`.
- **Observability (4/5):** every turn persists `agent_traces` + `agent_interactions` rows with token/cache-hit logging; handoffs spawn `agent_instances`.

**Crown jewels:** `packages/agent-runtime/src/resolve-core.ts` · `src/lib/ai/runtime/agent-runner.ts` · `src/lib/ai/types.ts` (the `ModelAdapter`/`StreamChunk` contracts) · `src/lib/ai/adapters/anthropic.ts` + `model-registry.ts` · `src/lib/ai/runtime/context-injector.ts` · `src/lib/ai/runtime/tool-executor.ts` · `src/lib/services/custom/agent-session.service.ts` (session persistence + `summarizeIfLong` compression).

**Weaknesses:** guardrail tables/services/seeds exist but **nothing in the run path enforces them**; **no client/UI layer at all** (headless by design); the runner *reads* history but doesn't persist the new turn; hardcoded `"gpt-5.4"` default-model string; trace id returned to client isn't the persisted one.

**Dupe-ability:** Very high *as an engine*. Lift `src/lib/ai/` + the `agent-runtime` package + the two routes; replace injected services with your persistence; swap the corpus/tool set; **add a guardrail step**; build a client. The DI seams make every swap surgical.

---

### 🏆 `movemental-visual-editor-main` — the client/streaming/UI (8.5/10 front-end)

If `movemental-ai-agents` is the engine, this is the best **dashboard and drivetrain**. It's a thin proxy + the most production-clean chat front-end we have.

**What's excellent**
- **Streaming UX (5/5):** a robust incremental **SSE parser** that handles partial buffers and multi-line `data:` events and returns the unparsed tail (`src/lib/ai/agent-sse-parse.ts`), per-chunk Zod validation that silently drops malformed chunks (`agent-stream-chunk.ts`), trailing-buffer flush, `AbortController` cancellation, sticky-to-bottom scroll that yields to manual scroll, live per-tool elapsed-time chips, markdown, editor insert/replace actions (`src/components/ai-suite/AgentChatPanel.tsx`, `src/hooks/custom/use-agent-chat-stream.ts`).
- **The `uiContext` patch-merge (novel):** route-derived base context shallow-merged with **per-turn patches** (`src/lib/ai/merge-agent-ui-context.ts`), so a quick-action chip can inject `interactionMode`/`contentForm` for *one message only*. Genuinely clever and reusable.
- **Architecture & code quality (5/5 each):** strict TS, discriminated unions, small modules, schemas documented as "keep in sync with ai-agents" (an explicit contract boundary).

**Crown jewels:** `src/lib/ai/agent-sse-parse.ts` · `agent-stream-chunk.ts` · `agent-proxy-schema.ts` · `merge-agent-ui-context.ts` · `src/hooks/custom/use-agent-chat-stream.ts` · `src/components/ai-suite/AgentChatPanel.tsx` · `src/app/api/ai/agents/stream/route.ts`.

**Weaknesses:** it's only half a chatbot — no agent, no prompts, no durable memory (client `sessionStorage` only), no tracing on the chat path. By design it delegates to an upstream service.

**Dupe-ability:** Extremely high. The five streaming/UI files transplant into almost any project nearly unedited.

---

### `alan-hirsch` — best persona artifact + richest UX (7.5/10)

Two chat systems coexist: an OpenAI-Agents ChatKit bridge (mostly delegating to a remote service) and a **NotebookLM-style grounded chat on Vercel AI SDK v6** (`streamText` + `stopWhen` + file search + post-stream persistence via `after()`). The notebook subsystem + the floating-chat client are the clone-worthy parts.

**The standout (5/5 persona):** `src/lib/ai-lab-notebook/notebook-chat-persona.ts` is the single best voice-fidelity artifact in the org — dual personas (neutral "archive" vs embodied first-person "AI Alan") sharing grounding rules, with a **transparency boundary** ("built from Alan's published works, not the biological Alan"), a **material boundary** (no fabricated memories), five named voice markers, an **antithesis ban** ("never 'not X but Y'"), and an anti-slop filter — and it's Zod-validated and unit-tested.

**Other strengths:** clean Gemini↔Anthropic provider resolver returning a discriminated union (`notebook-llm.ts`); an accessible, full-featured `FloatingChatPanel.tsx` (aria-live log, stop button, sources panel, suggestion chips, 90s timeout fallback, anon support); a full nine-table agent-admin observability schema (traces/metrics/handoffs/interactions hooks).

**Crown jewels:** `src/lib/ai-lab-notebook/notebook-chat-persona.ts` · `notebook-llm.ts` · `src/app/api/ai-lab-notebook/chat/route.ts` (exemplary AI-SDK v6 route) · `src/hooks/custom/use-standalone-chat.ts` + `use-floating-chat.ts` · `src/components/chat/FloatingChatPanel.tsx` · `src/lib/ai/agents-sse-to-chatkit.ts`.

**Weaknesses:** bifurcated (two chat systems, three message-normalizers); guardrails are shallow regex and **output guardrails are swallowed** (non-blocking); observability metrics are **estimated/fake** (`estimatedTokens = responseTime/10`); placeholder `gpt-5.4`; brittle in-band stream sentinels (`__AILAB_SESSION_ID__`, `---TOOL_EVENTS_START---`); the real agent brain is off-repo.

---

### `movemental-dashboard` — best prompt-pack model (7.5/10)

Also two stacks: the **Writing Assistant** (Vercel AI SDK `streamText`, the production chatbot) and the **Enhanced Agent Bridge** (OpenAI Agents SDK, where guardrails/tracing live). The governance is in the stack the flagship chatbot doesn't use.

**The standout (4.5/5 prompt packs):** versioned, ordered, tenant-scoped, **DB-backed prompt packs** (`prompt_packs` + `prompt_pack_layers`) with a real **legacy→packs migration** that materializes five named layers (`voice_header`, `voice_core`, `platform`, `content_forms`, `examples`) — `scripts/migrate-legacy-agent-prompts-to-packs.ts`. Plus a ~15-section programmatic prompt composer (`src/agents/writing-assistant/instructions.ts`) that the pack overlays cleanly.

**Other strengths:** excellent streaming UX — `useAgentStream` (buffered SSE parser + cancellation) and `useWritingAssistant` (optimistic messages, **direct-insert marker protocol** `---CONTENT_START---`, Accept/Reject with word-count deltas); clean vector-store precedence (corpus_bindings → modular runtime → legacy org settings).

**Crown jewels:** `src/agents/writing-assistant/instructions.ts` · `packages/agent-runtime/src/resolve-core.ts` · `scripts/migrate-legacy-agent-prompts-to-packs.ts` · `src/hooks/useAgentStream.ts` · `src/hooks/writing-assistant/useWritingAssistant.ts` · `src/contexts/WritingAssistantContext.tsx` · `src/app/api/writing-assistant/chat/route.ts`.

**Weaknesses:** governance in the wrong stack (Writing Assistant has **no guardrails, no tracing, no conversation persistence** — 6-turn client memory only); **Gemini half-wired** (advertised + typed, not implemented in the route); fake metrics; two competing instruction systems.

---

### `ai-lab-agent` — the canonical brain, carrying debt (6.5/10)

The standalone OpenAI-Agents-SDK backend that the others mirror. Highest-value *ideas*, roughest *execution*.

**The standout (5/5 persona/instructions):** a single adaptive agent modulated over **three independent dimensions (theme × mode × style)** from modular sections (`src/agents/ai-lab/instructions/index.ts`), with a rubric-driven persona — five weighted voice markers with thresholds, failure modes, signature-element densities (`instructions/core.ts`). JSON overrides + DB-assembled system-prompt prefixing.

**Other strengths worth stealing:** proper SDK `Session` backed by Postgres JSONB with a `NoOpSession` fallback and strict per-user resume ownership (`src/lib/sessions/ai-lab-session.ts`); **pre-retrieval RAG** that runs *before* the model so citations are guaranteed even if the model skips the tool, with deterministic Sources-block appending; real **multi-tenant leak hardening** (user-scoped cache keys + a PII tripwire that throws if user text reaches the static instruction cache).

**Crown jewels:** `src/agents/ai-lab/instructions/{index,core}.ts` · `src/lib/agent-runtime-resolve.ts` · `src/lib/sessions/ai-lab-session.ts` · `src/agents/ai-lab/tools/base.ts` (Zod params + `strict:true` + per-tool cache/timeout) · `src/agents/shared/chatkit-bridge.ts`.

**Weaknesses (remediation debt):** the chat route is a **~600-line god-function**; committed **debug telemetry** firing `fetch()` at `127.0.0.1:7242` on every run; `getAllTools` monkey-patched onto the SDK; `as any` at the SDK boundary with stringly-typed event sniffing; `agentTracesService.storeTrace` is a **no-op stub**; broken `gpt-5.4` model fallback; both `package-lock.json` and `pnpm-lock.yaml` present. Reads like a file mid-stabilization.

---

## 4. Module medal table (who does each thing best)

| Capability | Winner | File to study |
|------------|--------|---------------|
| Overall engine architecture | `movemental-ai-agents` | `packages/agent-runtime/src/resolve-core.ts`, `src/lib/ai/runtime/agent-runner.ts` |
| Provider abstraction (swappable LLMs) | `movemental-ai-agents` | `src/lib/ai/types.ts`, `adapters/*`, `model-registry.ts` |
| Prompt-cache-aware system blocks | `movemental-ai-agents` | `src/lib/ai/runtime/context-injector.ts` |
| Prompt-pack data model (versioned/layered) | `movemental-dashboard` | `scripts/migrate-legacy-agent-prompts-to-packs.ts` |
| Persona / voice-fidelity authoring | `alan-hirsch` (artifact) · `ai-lab-agent` (system) | `notebook-chat-persona.ts` · `instructions/core.ts` |
| Tool loop (parallel, timeout, error-isolated) | `movemental-ai-agents` | `src/lib/ai/runtime/tool-executor.ts` |
| RAG with guaranteed citations | `ai-lab-agent` | `src/app/api/ai-lab/chat/route.ts` (pre-retrieval) |
| Conversation persistence / sessions | `ai-lab-agent` | `src/lib/sessions/ai-lab-session.ts` |
| Session summarization/compaction | `movemental-ai-agents` | `agent-session.service.ts` (`summarizeIfLong`) |
| SSE stream parsing (client) | `movemental-visual-editor-main` | `src/lib/ai/agent-sse-parse.ts` |
| Per-turn UI-context patch-merge | `movemental-visual-editor-main` | `src/lib/ai/merge-agent-ui-context.ts` |
| Streaming chat UI (accessible) | `alan-hirsch` | `src/components/chat/FloatingChatPanel.tsx` |
| Direct-insert / editor-mutation streaming | `movemental-dashboard` | `useWritingAssistant.ts` |
| Multi-tenant leak hardening | `ai-lab-agent` | `instructions/index.ts` (PII tripwire), cache keys |
| Agent-admin observability schema | `alan-hirsch` | `src/hooks/simplified/agent-*.hooks.ts` (9 sets) |

---

## 5. Recommended clone blueprint ("the build")

If the goal is to stand up a new, well-designed chatbot fast, assemble from the medal table rather than forking one repo:

1. **Spine — clone `movemental-ai-agents`.** Take `src/lib/ai/` (types, adapters, registry, runtime, context-injector, tool-executor) + the `@movemental/agent-runtime` package + the `/api/agents/{chat,stream}` routes. This gives you provider-agnostic streaming, the tool loop, prompt-cache-aware blocks, and tracing for free.
2. **Prompts — graft `movemental-dashboard`'s prompt-pack model.** Adopt `prompt_packs` + `prompt_pack_layers` (versioned, ordered, tenant-scoped) and the migration script as your prompt data model.
3. **Voice — port `alan-hirsch`'s `notebook-chat-persona.ts`** (pure functions + Zod, zero infra deps — lift verbatim, swap the subject) and/or `ai-lab-agent`'s three-dimensional `instructions/` system if you need theme×mode×style modulation.
4. **Memory — port `ai-lab-agent`'s `DatabaseSession`** (Postgres JSONB sessions, NoOp fallback, per-user resume ownership) and wire `movemental-ai-agents`' `summarizeIfLong` for long-thread compaction.
5. **Client — clone `movemental-visual-editor-main`'s streaming/UI layer** (`agent-sse-parse` + `agent-stream-chunk` + `use-agent-chat-stream` + `AgentChatPanel` + the `uiContext` merge), or `alan-hirsch`'s `FloatingChatPanel` if you want the more polished floating UX.
6. **Fix the shared flaws as you go** (see §6) — especially actually *enforcing* guardrails and replacing fake metrics.

**Simplest single-repo answer:** clone **`movemental-ai-agents`** and build a client against its SSE contract. It's the only piece designed for extraction, and it's the highest-quality code. **Do not** start from `ai-lab-agent` despite its great ideas — its execution debt (god-route, debug telemetry, monkey-patching) makes it a worse *starting* point even though it's worth raiding for patterns.

---

## 6. Shared flaws to fix in whatever you dupe

These recur across the lineage — inherit the patterns, not the bugs:

1. **Guardrails defined but not enforced.** Every repo has guardrail tables/validators; almost none apply them in the run path, and where they do (`alan-hirsch`, `movemental-dashboard` bridge) **output-guardrail failures are swallowed in a `catch {}`**. Add a real, blocking enforcement step.
2. **Fake/estimated telemetry.** Token/cost metrics derived from wall-clock time (`estimatedTokens = responseTime/10`). Use real usage from the provider response (`movemental-ai-agents` already logs true usage — copy that).
3. **Placeholder model id `gpt-5.4`** appears as a default/fallback in `ai-lab-agent`, `alan-hirsch`, and `movemental-ai-agents`. It is not a real model — pin a real default.
4. **Split-brain governance.** Chat path and governance/observability path are often *different stacks* (`movemental-dashboard`, `alan-hirsch`). Unify them so the production chatbot is the instrumented one.
5. **Brittle in-band stream protocols** (`__AILAB_SESSION_ID__`, `---TOOL_EVENTS_START---`, `---CONTENT_START---`). Prefer structured SSE event types (as `movemental-visual-editor-main`'s discriminated `StreamChunk` union does).
6. **Non-constant-time API-key compares** (`ai-lab-agent` `auth/api-key.ts`). Use `crypto.timingSafeEqual`.
7. **Strip committed debug telemetry** (`ai-lab-agent`'s `127.0.0.1:7242` fetches) before reuse.

---

## 7. What was excluded and why

- **SEO agents** (`movemental-dashboard` / `movemental-visual-editor-main` `seo-agent.ts`, `/api/agents/seo-*`) — out of scope per request; not conversational chatbots.
- **`alan-books`** — the only AI signal is a vendored `openai` library inside `.venv-markitdown/site-packages/`; it's a book-processing repo, not an agent.
- **`movemental-ai`, `yf-np-dashboard`, `movemental-internal`, `movemental-html-template`, `alan-hirsch-final-archive`, `docs`, `my-skills`** — no conversational agent (marketing site, content, skills, or archive).
- **Claude Code skills/subagents** under `.claude/skills` — these are *authoring* skills, not deployed chatbots.

---

## 8. Method note

Inventory built by: enumerating all `.git` repos under `~/dev`; signal-scanning each for LLM-SDK imports, chat loops, streaming, and agent frameworks (excluding `node_modules`/build dirs); then dispatching one deep-read per top candidate to assess nine design dimensions with file-level evidence. Scores are design-quality judgments for *clone-ability as a chatbot*, not feature completeness. Re-run when repos are added or the lineage is consolidated.

*Crown-jewel paths in this note are relative to each repo's root. Repos live as siblings under `~/dev/01-Movemental-Core/`.*
