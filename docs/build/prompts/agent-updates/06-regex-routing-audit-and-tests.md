# AU-06 — Regex routing audit and tests

**Prompt ID:** au-06-regex-routing-audit  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 2 · [agent-home-dock-functionality-2026-06-15.md](../../notes/agent-home-dock-functionality-2026-06-15.md) §5

Paste the block below into a fresh agent turn.

---

## Problem statement

Hybrid mode routes first collapsed messages through `route-input.ts` + `isHighConfidenceLocalRoute`. Historical gotcha: bare `about` matching `whatIs` on phrases like "question about donors." Current code may have tightened patterns — **audit, test, and lock** behavior so false positives cannot regress.

---

## The prompt

> You are auditing and hardening **typed-input regex routing** for the agent room hybrid classifier. First match wins; false positives send visitors to wrong screens instead of conversation.
>
> ### 0. Orient first
>
> | File | Role |
> | --- | --- |
> | `src/lib/agent-room/route-input.ts` | Ordered regex table + `isHighConfidenceLocalRoute` |
> | `src/lib/agent-room/move-classifier.ts` | LOCAL vs AGENT decision |
> | `tests/unit/route-input.test.ts` | Existing tests |
> | `tests/unit/move-classifier.test.ts` | Classifier tests |
>
> Read [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §7.3.
>
> ### 1. Build false-positive / true-positive matrix
>
> Add cases to `route-input.test.ts`:
>
> **Must route LOCAL (high confidence):**
> - "what does it cost"
> - "tell me about movemental"
> - "whole path"
> - "get a clear next step"
>
> **Must NOT route local whatIs (fallback or agent):**
> - "question about donors"
> - "concern about our board"
> - "tell me about our sandbox pilot" (may hit sandbox — document intent)
>
> **Must route local toSafetyFlow:**
> - "where should we start"
> - "map where we stand"
>
> **Edge cases:**
> - Empty / whitespace → fallback
> - 500-char paste with no keyword → fallback (agent in hybrid when not high-confidence local)
>
> ### 2. Fix patterns if tests fail
>
> Rules:
> - Prefer `\babout movemental\b`, `\bwhat is movemental\b` over bare `\babout\b`
> - `isHighConfidenceLocalRoute` default branch: `!/\babout\b/.test(t)` already exists — ensure all broad ROUTES have matching high-confidence guards in classifier
> - **Do not** reorder ROUTES casually — document any order change with prototype parity note
>
> ### 3. Align classifier with route table
>
> In `move-classifier.ts`, verify first collapsed message path:
> - Calls `isHighConfidenceLocalRoute` before local scene
> - Unmatched → AGENT (not silent fallback to wrong scene)
>
> Add classifier tests mirroring route matrix.
>
> ### 4. Document gotchas
>
> Append to `route-input.ts` file header comment: examples of intentional non-matches.
>
> Update [agent-home-dock-functionality-2026-06-15.md](../../notes/agent-home-dock-functionality-2026-06-15.md) §5 if gotcha is fixed or reclassified.
>
> ### 5. Optional Playwright
>
> One e2e: type "question about donors" on collapsed dock → expands + mocks agent (no local about screen). Skip if flaky; unit coverage is mandatory.

---

## Definition of done

- [ ] ≥8 new unit cases covering false-positive phrases
- [ ] All `route-input` and `move-classifier` unit tests green
- [ ] No bare `about` local route without multi-word guard
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm test:run tests/unit/route-input.test.ts tests/unit/move-classifier.test.ts
pnpm typecheck
```

## Do not

- Remove `toSafetyFlow` broad catch-all without product approval
- Route Discuss-phase input locally
- Change stream/stub mode routing in this slice unless tests require it
