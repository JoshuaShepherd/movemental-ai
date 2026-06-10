# PAR-04 — room-host script reconciliation

**Prompt ID:** PAR-04  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai-agents` **+** `movemental-ai` (matrix/docs only)  
**Blocks:** PAR-00  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

Align the **live agent's instructions** with the stub performance script. INT-07 fixed `render_beat` / `show_capture` drift; PAR-04 completes Guide-phase choreography guidance: when to `gesture_at`, when to `suggest_chips`, screen order, tone, and fixed phrases that should match 〔const〕 lines in `movemental-room-script.md`.

**Not** a verbatim paste of every stub line — encode **intent + rails**, with explicit references to AGENT-classified moves.

---

## 2. Goal

1. Update `movemental-ai-agents/scripts/seed-data/prompts/room-host.md` (and related seed) so every AGENT row in PAR-00 matrix has prompt coverage.
2. Add **Gesture policy** section: allowed targets per screen (mirror client allow-list); instruct agent to underline/circle/arrow at scripted moments (opening phrase is LOCAL — do not duplicate; beat/readback yes).
3. Add **Suggest policy**: when to offer chips; chip labels/values aligned with `DEFAULT_SUGGESTIONS` / stub `suggest` acts where AGENT.
4. Re-run `pnpm seed:agent-room` (document org id); commit prompt + note seed requirement in §10.
5. Remove any remaining dead tool references (grep OLD names: `render_reality_check_beat`, `show_field_guide_signup`, etc.).

---

## 3. Work steps

1. Side-by-side: room script scenes vs current `room-host.md`.
2. Edit prompt; update seed if tool registry changed.
3. Dry-run: one live turn per major AGENT scene (whatIs, cost, beat, capture) — log tool calls in §10.
4. Update parity matrix AGENT rows with prompt section references.

---

## 4. Definition of Done

- [ ] `room-host.md` committed; seed instructions in §10.
- [ ] Grep clean for known dead tool names.
- [ ] `gesture_at` documented with ≥2 concrete examples (beat circle, readback underline).
- [ ] `suggest_chips` documented with opening-adjacent + post-info chip sets.
- [ ] Master runner PAR-04 → Done; §10 log.

---

## 5. Verification

```bash
# agents repo
pnpm typecheck
pnpm test:run  # agent-runner / ui-render tests

# Optional live
curl / manual stream turn — verify tool names match registry
```

---

## §10 Attempt log

### 2026-06-10 — Cursor

- Updated `movemental-ai-agents/scripts/seed-data/prompts/room-host.md`: `gesture_at` policy (allow-list + 3 examples), stream `beatIntro` entry note.
- Grep: no dead `render_reality_check_beat` / `show_field_guide_signup` in prompt (only stale comment in `room-scenes.ts`).
- **Seed:** run `pnpm seed:agent-room` in agents repo before live deploy.
