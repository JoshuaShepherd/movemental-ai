# PAR-07 — Independent reviewer sign-off audit

**Prompt ID:** PAR-07  
**Target agent:** **Claude (reviewer role)** — fresh context window; do **not** assume prior implementation sessions were correct  
**Primary repos:** `movemental-ai` **+** `movemental-ai-agents` (if PAR-03/04 touched engine)  
**Blocks:** PAR-06 (executor must finish tests + draft sign-off doc first)  
**Status:** Not started  
**Last updated:** 2026-06-10

---

## 1. Role and stance

You are the **independent reviewer**, not the implementation runner.

Your job is to **verify, sign off, or improve** the PAR-00…PAR-06 work before merge. You are skeptical by default: the runner may have checked boxes without evidence, missed regressions, or introduced type/lint/test failures.

**You may:**

- Run read-only and verification commands (`typecheck`, `lint`, `test`, targeted greps, file reads).
- **Fix clear, scoped defects** you find (typos, broken tests, missing imports, doc lies, guardrail violations) — document every fix in §10 and in the sign-off doc.
- **Request changes** with a numbered punch-list when fixes are too large or ambiguous (do not half-implement).

**You must not:**

- Rewrite architecture (no merging stub/stream hooks, no removing dual-mode).
- Mark the pack Done if stub mode fetches on load or opening choreography requires network.
- Approve with unresolved **GAP** rows in the parity matrix unless operator explicitly waived in sign-off doc.

**Handoff:** PAR-06 executor produces a **draft** [`docs/build/agent-room-parity-signoff.md`](../../../docs/build/agent-room-parity-signoff.md). You finalize it.

---

## 2. Inputs (read in this order)

1. [`master_runner.md`](./master_runner.md) — §1 problem, §2 desired state, §3 definition of done.
2. [`docs/build/agent-room-stub-stream-parity-matrix.md`](../../../docs/build/agent-room-stub-stream-parity-matrix.md) — PAR-00 artifact (must exist).
3. [`docs/build/agent-room-parity-signoff.md`](../../../docs/build/agent-room-parity-signoff.md) — PAR-06 draft (must exist).
4. [`docs/build/agent-room-handoff.md`](../../../docs/build/agent-room-handoff.md) — PAR-05 (if present).
5. Each child prompt **§10 Attempt log** (PAR-00…PAR-06) — evidence the runner actually ran verification.
6. **Git diff** vs base branch (or `git diff main...HEAD` / uncommitted changes — state which in sign-off).

**Code hotspots (spot-check even if diff is small):**

| Area | Files |
| --- | --- |
| Local choreography | `src/lib/agent-room/opening-choreography.ts`, `local-choreography.ts` (if renamed) |
| Stream hook | `src/components/agent-room/use-agent-room-stream.ts` |
| Stub hook (regression) | `src/components/agent-room/use-agent-room-stub.ts` |
| Mode switch | `src/lib/agent-room/mode.ts` |
| Composer | `src/components/agent-room/composer.tsx` |
| Ink layer | `src/components/agent-room/ink/*`, `agent-room-context.tsx` |
| Tests | `tests/unit/*agent-room*`, `tests/e2e/agent-room.spec.ts` |
| Docs | `docs/movemental-room-script.md`, `src/components/agent-room/README.md` |
| Engine (if touched) | `movemental-ai-agents/scripts/seed-data/prompts/room-host.md` |

---

## 3. Review protocol (execute sequentially)

### Phase A — Artifact completeness

- [ ] Parity matrix exists and covers every key in `SCENES`.
- [ ] Every matrix row has classification LOCAL / AGENT / STUB-ONLY / GAP (no blank).
- [ ] GAP rows: either **closed in code** or **waived** with operator name + reason in sign-off.
- [ ] PAR-06 draft sign-off lists evidence (test command output or CI), not just “pass”.

### Phase B — Automated verification (run all; paste summaries in §10)

```bash
cd movemental-ai

pnpm typecheck
pnpm lint
pnpm test:run

# Agent-room targeted (adjust paths if new specs added)
pnpm test:run tests/unit/agent-room-stream-contract.test.ts
# Add any PAR-added unit specs

# E2E — stub path always; live block skips without engine
RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
```

If `movemental-ai-agents` changed in PAR-03/04:

```bash
cd ../movemental-ai-agents   # or sibling path per CLAUDE.md

pnpm typecheck
pnpm test:run
```

**Hard fail:** any type error, lint error in touched files, or failing test the executor claimed was green.

### Phase C — Guardrail audit (INT / PAR non-negotiables)

| # | Check | How |
| --- | --- | --- |
| G1 | Stub zero network on load | Grep `use-agent-room-stub` boot; manual or e2e: stub mode, 0 `/api/agent-room/stream` before interaction |
| G2 | Stream zero network on load (except none) | Opening choreography local only; e2e or network tab |
| G3 | No merged controller | `AgentRoom` still dispatches `StubRoom` \| `StreamRoom`; no single hook calling fetch + `playScene` for all turns |
| G4 | Generation cancel | User send during opening bumps gen / cancels local scene (`openingGenRef` or equivalent) |
| G5 | Contract mirror | If engine chunks changed, `stream-chunk.ts` ↔ `ai/types.ts` still aligned |
| G6 | ADR history | `README.md` retains AF-01 / INT-07 amendment text, not overwritten |

### Phase D — Behavioral spot-check (stream default)

Manually or via e2e evidence confirm:

1. **Load:** ~560ms+ later, Caveat voice line from opening script appears; underline on `#phrase` (SVG path in ink overlay).
2. **REPLAY:** Same sequence replays; voice cleared then re-written.
3. **First send:** Local choreography stops; SSE request fires (stream mode).
4. **Lead chip:** Behavior matches matrix classification (not accidental stub/stream fork).
5. **Stub mode** (`NEXT_PUBLIC_AGENT_ROOM_MODE=stub`): full opening scene still runs; chips run local scenes.

### Phase E — Documentation truth

- [ ] `movemental-room-script.md` states **stream default**, stub = offline fallback.
- [ ] No doc claims stub is default without “superseded” context.
- [ ] `agent-room-handoff.md` (or equivalent) describes local layer + SSE handoff + REPLAY.

Grep for stale claims:

```bash
rg "default.*stub|stub.*default|Opt-in.*stream" docs/ src/components/agent-room/ --glob "*.md"
```

---

## 4. Verdict options

Choose **exactly one** and record in the sign-off doc.

### 4.1 Approved

All Phase A–E checks pass (or waivers documented). Update sign-off:

```markdown
## Reviewer verdict: **Approved**
- Reviewer: Claude (PAR-07)
- Date: YYYY-MM-DD
- Branch / commit reviewed: …
- Fixes applied during review: none | list
- Waived items: none | list with operator
```

Then update [`master_runner.md`](./master_runner.md): all PAR rows **Done**, session changelog row for PAR-07.

### 4.2 Approved with reviewer fixes

Minor defects fixed during review (listed in §10). Re-run Phase B after fixes. Same sign-off block with **Fixes applied during review** populated.

### 4.3 Changes requested

Blocking issues remain. **Do not** mark master runner Done.

Produce **`docs/build/agent-room-parity-review.md`** (or append to sign-off doc):

```markdown
## Reviewer verdict: **Changes requested**

### Blockers (must fix before merge)
1. …

### Recommendations (non-blocking)
1. …

### Re-review trigger
Re-run PAR-07 after blockers addressed; executor must not self-approve.
```

Assign each blocker to PAR-00…PAR-06 prompt ID where possible.

---

## 5. Definition of Done (PAR-07)

- [ ] Phases A–E executed; command output summarized in §10.
- [ ] Final [`docs/build/agent-room-parity-signoff.md`](../../../docs/build/agent-room-parity-signoff.md) with reviewer verdict section.
- [ ] If **Approved** or **Approved with fixes**: master runner status table all **Done** + changelog updated.
- [ ] If **Changes requested**: `agent-room-parity-review.md` committed; master runner PAR-07 → **Blocked** with pointer to review doc.
- [ ] §10 Attempt log below appended.

---

## 6. Reviewer report template (paste into sign-off doc)

```markdown
---

## PAR-07 Independent review

| Phase | Result | Notes |
| --- | --- | --- |
| A Artifacts | pass / fail | |
| B Automated | pass / fail | typecheck · lint · unit · e2e |
| C Guardrails | pass / fail | G1–G6 |
| D Behavioral | pass / fail / partial | engine live skipped? |
| E Docs | pass / fail | |

### Matrix GAP status
- Open GAPs: 0 | N (list)
- Waived: …

### Issues found
| Severity | ID | Description | Resolution |
| --- | --- | --- | --- |
| blocker | … | … | fixed / deferred |

### Verdict
**Approved** | **Approved with reviewer fixes** | **Changes requested**

Reviewer agent: Claude (PAR-07)
Date:
Commit / diff reviewed:
```

---

## §10 Attempt log

<!-- Reviewer: one block per review session. Include command exit codes. -->

### Reviewer notes

<!-- Numbered findings; link to files/lines -->
