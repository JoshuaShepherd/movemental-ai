# Agent Room prompts — sync contract

These files are **copies of the live seed prompts** as of the pack creation date. They are the editable SSOT for human review.

## Canonical runtime path

```
docs/build/agents/agent-room/prompts/*.md   ← you edit here
        ↓ (sync)
movemental-ai-agents/scripts/seed-data/prompts/*.md
        ↓ pnpm seed:agent-room
agents.system_prompt (Postgres)
        ↓
/api/agents/stream → Claude
```

## Files

| File | Agent slug | Approx. size |
|------|------------|--------------|
| `room-host.md` | `room-host` | ~340 lines — reality check, tools, canon, hybrid policy |
| `room-diagnostician.md` | `room-diagnostician` | ~230 lines — read-back only |

## Tag legend (both prompts)

| Tag | Meaning |
|-----|---------|
| `[const]` | Runtime emits fixed copy from scene layer — model never generates |
| `[template]` | Fixed structure with slots — runtime fills |
| `[model:decide]` | Model returns a route/label/tool choice |
| `[model:author]` | Model writes bounded prose (Discuss, off-script Q&A, read-back `prose`) |

## When editing

- **Canon facts** (pricing, path, founders): edit §5/§6 in host/diagnostician; keep in sync with [`../corpus-and-rag.md`](../corpus-and-rag.md) if those facts also live in vector store
- **New tool**: update prompt §4 **and** [`../tools.md`](../tools.md) **and** seed assignments
- **Beat wording**: may require `HOST_SCENES` in `movemental-ai` if copy is `[const]` from client scenes

## Hand back to an agent

Provide this folder path and say which sections changed. Expected apply steps:

1. Diff prompts against `movemental-ai-agents/scripts/seed-data/prompts/`
2. Update seed if tools/models changed
3. Run `pnpm seed:agent-room`
4. Smoke-test `/agent` stream + handoff + Discuss entry
