# Agent Room — construction decisions

Human decisions that shape agent behavior. Update this file when product intent changes; an applying agent should treat it as authoritative alongside the prompt files.

---

## Locked decisions (current)

### Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Two agents, not one | `room-host` + `room-diagnostician` | Host stays fast/cheap every turn; read-back gets Opus once |
| Chat provider | Anthropic Claude Opus 4.6 | Both agents — registered in engine `model-registry.ts` |
| Retrieval provider | OpenAI vector store (`file_search` tool) | Engine implements search via OpenAI Responses API; chat model can remain Claude |
| Public room | Anonymous, no auth | Proxy injects tenant + service secret; `userId` = `anon-<uuid>` |
| Data/agent split | Scripted copy in scene layer; model decides/routes/authors | Keeps prompts smaller; `[const]`/`[template]`/`[model:*]` tags in host prompt |

### Flow

| Decision | Choice |
|----------|--------|
| Default entry | Reality check beats (`render_beat`), not free chat |
| Handoff trigger | After final beat → `request_diagnosis` → diagnostician `show_readback` |
| Verdict rule | `past` only if `decision == "Yes — written and ratified"` **and** refusals = `"Names specific refusals"` |
| Discuss phase | Opt-in via chip `value: "enter-discuss"`; client sends `phase: "discuss"` |
| Hybrid mode (default) | Local `SCENES` runner for chips/beats; engine only on AGENT-classified turns |

### Conversion

| Decision | Choice |
|----------|--------|
| Identity capture | Form screens only (`show_capture`), never in voice |
| Free path | `show_capture({ kind: "free" })` → field guide |
| Paid path | `show_capture({ kind: "paid" })` → Safety (facilitated) enrollment |
| Human escalation | `offer_human_handoff` → `josh@movemental.ai` |

### Honesty rails

- No score, grade, or percentage in read-back
- No facts outside knowledge canon (prompt §5 / §6)
- Invalid tool props → engine drops render + may emit error chunk
- Off-domain → handoff, not guess

---

## Deferred / not wired (intentional)

| Item | Status | Notes |
|------|--------|-------|
| `show_network`, `show_audience`, `show_founders` | Seeded in DB, **deferred in prompt** | Host prompt §4: "Deferred, not wired in this version" |
| Guardrails (`agent_guardrails`) | Schema exists | Not enforced in engine run path yet |
| Prompt packs for room agents | Optional | Room uses flat `system_prompt` from seed; packs used elsewhere (Alan, writing assistant) |
| `file_search` on room-host | **Assigned (CON-06, 2026-06-11)** | Seeded + assigned in `seed-agent-room.ts` (order 11), gated on `OPENAI_VECTOR_STORE_ID`; prompt §3/§4 updated. Re-seed to activate. See [`corpus-and-rag.md`](./corpus-and-rag.md). |

---

## Open decisions (needs human input)

Record answers here when resolved.

| # | Question | Options | Decision |
|---|----------|---------|----------|
| 1 | **What corpus should `file_search` index for the public room?** | Movemental canon docs only / full `docs/` / field guides + pricing / custom subset | **Resolved:** `files/public/` KB 1–4 + The Talk + 3 PDFs (Safety/Sandbox Field Guides, Evergreen Engine) — [`files/MANIFEST.json`](./files/MANIFEST.json). _Runtime store = whatever `OPENAI_VECTOR_STORE_ID` (or the agent's `corpus_bindings` row) points to; ensure it indexes this set._ |
| 2 | **When should the host call `file_search`?** | Discuss phase only / any open question / never (canon-only) | **Resolved (CON-06):** any **in-domain** question whose depth exceeds core canon (fragmentation thesis, network model, how Movemental uses AI, sector nuance, AI-reality research). **Never** for volatile facts (price/stage/founder/contact → canon only) or off-domain. Both phases. |
| 3 | **Fallback if vector store empty?** | `search_corpus` (Postgres pgvector) / handoff / silent canon-only | **Resolved (CON-06):** empty/unavailable → answer from core canon; if canon doesn't hold it, say so plainly + `offer_human_handoff`. Never fabricate. (`search_corpus` Postgres remains available as a future secondary path; not assigned yet.) |
| 4 | ~~Switch host model for quality?~~ | — | **Resolved:** both agents use `claude-opus-4-6` (2026-06-10) |

---

## Change log

| Date | Author | Change |
|------|--------|--------|
| 2026-06-10 | docs pack | Initial SSOT directory created from live seed + prompts |
| 2026-06-10 | docs pack | Corpus files organized: public/internal split, MANIFEST.json, sync script |
| 2026-06-11 | docs pack | Added Field Guide + Evergreen Engine PDFs; removed root duplicates; 8-doc manifest |
