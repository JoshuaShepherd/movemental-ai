# Agent Room — chip & door routing matrix

**Canonical location:** `docs/build/notes/agent-room-chip-routing-matrix.md`  
**Last updated:** 2026-06-18 (AU-07)  
**Code SSOT:** `src/lib/agent-room/composer-routing.ts`, `suggest-chip-targets.ts`, `document-page-shell.tsx`

## Product rule

| Context | Pill tap |
| --- | --- |
| Collapsed dock (any surface) | Screen / scene / navigate — **not** agent SSE |
| Expanded drawer | Agent utterance or local Discuss entry |
| Document page collapsed chips | Scene handoff (`sessionStorage`) or scroll — per chip config |
| `?ask=` deep link | Conversation (intentional) |

## Routing matrix

| Label / door | Surface | Expected route | Scene / Screen | Network |
| --- | --- | --- | --- | --- |
| Get a clear next AI step | collapsed home | local | `toSafetyFlow` → `safetyFlow` | none |
| About Movemental | collapsed home | local | `whatIs` → `about` | none |
| What does it cost? | collapsed home | local | `cost` → `pricing` | none |
| Get in touch | collapsed home | local | `talkToUs` → `contact` | none |
| About Movemental | expanded drawer | agent | utterance → SSE | `/turn` |
| What does it cost? | expanded drawer | agent | utterance → SSE | `/turn` |
| Get in touch | expanded drawer | agent | utterance → SSE | `/turn` |
| See the whole path | collapsed scene follow-up | local | `toPath` → `path` | none |
| Show me Safety | collapsed path follow-up | local | `toSafety` → `safety` | none |
| Show me Sandbox | collapsed path follow-up | local | `toSandbox` → `sandbox` | none |
| Map where we actually stand | collapsed scene follow-up | local | `toBeat` → `beat` | none |
| Start with Safety (free) | collapsed pricing follow-up | local | `toSafety` → `safety` | none |
| ↺ Start over | collapsed any screen | local | `opening` → `home` | none |
| Map where we stand | collapsed nonprofits doc | scene handoff | `toBeat` on `/agent` mount | none |
| What's the first step? | collapsed nonprofits doc | scene handoff | `toSafetyFlow` on `/agent` | none |
| Talk to us | collapsed nonprofits doc | scene handoff | `talkToUs` on `/agent` | none |
| Read the board letter | collapsed nonprofits doc | scroll | `#the-case` on page | none |
| Map where we stand | collapsed churches doc | scene handoff | `toBeat` on `/agent` | none |
| What's the first step? | collapsed churches doc | scene handoff | `toSafetyFlow` on `/agent` | none |
| Map where we stand | collapsed institutions doc | scene handoff | `toBeat` on `/agent` | none |
| Map where we actually stand | expanded ways-in lead door | local | `toBeat` → `safetyFlow` path | none |
| We're already using AI… (ways-in) | expanded ways-in door | agent | utterance → SSE | `/turn` |
| Typed unmatched question | collapsed home | agent | expand + SSE | `/turn` |
| Typed regex match (e.g. whole path) | collapsed home | local | matching scene | none |
| `?ask=` handoff from doc page | mount | agent | first turn after opening | `/turn` |

## Implementation notes

- **Opening chips:** `resolveChipRoute(..., surface)` in `composer-routing.ts`. Collapsed → `OPENING_CHIP_LOCAL_SCENES`; expanded → `STREAM_CHIP_ROUTES` agent utterances.
- **Scene follow-ups:** Not in `STREAM_CHIP_ROUTES`. Hybrid `suggest()` calls `handleSuggestChipTarget(c.to, …)` → `run(scene)`.
- **Document chips:** `document-page-shell.tsx` — `action: "scene"` uses `stashHandoffScene` + `router.push("/agent")`, not `?ask=`.
- **Ways-in doors:** Expanded panel only. Lead door text matches local regex; conversation doors go agent when expanded.

## Verification

```bash
pnpm test:run tests/unit/composer-routing.test.ts
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
pnpm test:e2e tests/e2e/agent-chip-routing.spec.ts
pnpm test:e2e tests/e2e/agent-ways-in-interaction.spec.ts
```
