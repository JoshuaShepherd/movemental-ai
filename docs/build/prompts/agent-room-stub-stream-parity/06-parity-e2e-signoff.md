# PAR-06 — Parity E2E and executor sign-off draft

**Prompt ID:** PAR-06  
**Target agent:** Cursor / Claude Code (**implementation runner**)  
**Primary repo:** `movemental-ai`  
**Blocks:** PAR-01 through PAR-05  
**Next:** [PAR-07](./07-reviewer-sign-off-audit.md) — independent Claude reviewer (final merge gate)  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

**Executor only.** Add tests and produce a **draft** sign-off artifact. Do **not** self-approve merge — [PAR-07](./07-reviewer-sign-off-audit.md) runs in a **fresh reviewer session** to verify, fix scoped bugs, or block with a punch-list.

---

## 2. Goal

1. Extend test coverage for parity guarantees.
2. Produce **`docs/build/agent-room-parity-signoff.md`** as a **draft** (reviewer section left for PAR-07).
3. Mark PAR-06 Done in master runner when executor DoD passes — **not** the whole pack (PAR-07 still required).

---

## 3. Work steps (executor)

### 3.1 Unit tests

- Opening choreography acts (say + gesture, no show/suggest).
- Stream contract unchanged (malformed chunks dropped).
- Composer routing (if PAR-02 added specs).

Fix vitest `@/` path if needed (`vitest.config.mts` alias) so unit tests run in CI.

### 3.2 E2E tests (`tests/e2e/agent-room.spec.ts`)

Add or extend:

| Test | Mode | Assert |
| --- | --- | --- |
| Opening voice on load | stream | After ~2.5s, voice zone contains opening line text; **0** stream requests before interaction |
| Opening gesture | stream | `#phrase` has ink SVG stroke OR gesture path in `#ink` overlay (snapshot or selector) |
| Stub offline | stub | Unchanged — 0 network |
| Live beat | stream + engine | Existing live test; ensure still green |

Gate with `RUN_AGENT_ROOM_E2E=1` like existing spec.

### 3.3 Sign-off doc

Template:

```markdown
## Parity sign-off YYYY-MM-DD (DRAFT — PAR-06 executor)
- Executor agent:
- Reviewer agent: _(PAR-07 fills in)_
- PAR-00 GAP rows remaining: N (list or 0)
- Opening local choreography: pass/fail
- Lead chip parity: pass/fail
- Beat→readback live: pass/fail/skipped (engine)
- Stub regression: pass/fail
- Docs aligned: pass/fail
- Test evidence: (paste command summaries)
- Reviewer approval: _(PAR-07 only — do not mark Approved here)_
```

---

## 4. Definition of Done

### Executor (PAR-06)

- [ ] Unit tests green (`pnpm test:run`).
- [ ] E2E stub + stream-fallback runnable; live gated.
- [ ] Draft sign-off doc committed with test evidence.
- [ ] Master runner PAR-06 → Done; hand off to PAR-07.

**Reviewer gate:** see [07-reviewer-sign-off-audit.md](./07-reviewer-sign-off-audit.md).

---

## 5. Verification

```bash
pnpm typecheck
pnpm lint
pnpm test:run
RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
# stream live block: engine must be up
```

---

## §10 Attempt log

### 2026-06-10 — Cursor

- E2E: added `stream local opening` block (voice on load, lead → beatIntro, 0 network).
- Draft sign-off: `docs/build/agent-room-parity-signoff.md`.
- `pnpm typecheck` + unit tests green; `pnpm lint` has pre-existing repo errors (not PAR-introduced).

<!-- Reviewer work belongs in PAR-07 §10, not here -->
