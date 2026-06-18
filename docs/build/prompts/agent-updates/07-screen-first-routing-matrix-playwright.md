# AU-07 — Screen-first routing matrix + Playwright

**Prompt ID:** au-07-screen-first-matrix  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 2 · [dock-pill-screen-first-routing.md](../dock-pill-screen-first-routing.md)

**Prerequisite:** [dock-pill-screen-first-routing.md](../dock-pill-screen-first-routing.md) should be **Done** or verify collapsed opening chips already route locally.

Paste the block below into a fresh agent turn.

---

## Problem statement

Screen-first pill routing must hold **everywhere**: home opening chips, scene follow-ups, document page chips, Ways-in doors, and expanded-drawer agent chips. One routing matrix, Playwright-proven.

---

## The prompt

> You are producing the **authoritative screen-first routing matrix** and **Playwright coverage** for every chip/door entry point — extending the dock-pill prompt to document surfaces and scene follow-ups.
>
> ### Product rule
>
> | Context | Pill tap |
> | --- | --- |
> | Collapsed dock (any surface) | Screen / scene / navigate — **not** agent SSE |
> | Expanded drawer | Agent utterance or local Discuss entry |
> | Document page collapsed chips | Scene handoff or scroll — per chip config |
> | `?ask=` deep link | Conversation (intentional) |
>
> ### 0. Orient first
>
> 1. Read [dock-pill-screen-first-routing.md](../dock-pill-screen-first-routing.md) — implement if not merged.
> 2. Read `src/lib/agent-room/composer-routing.ts`, `resolveChipRoute`, `OPENING_CHIP_LOCAL_SCENES`.
> 3. Inventory chips:
>    - `composer.tsx` → `DEFAULT_SUGGESTIONS`
>    - `scenes.ts` → all `suggest` acts
>    - `ways-in-doors.ts`
>    - `src/components/agent-room/audience/*-config.ts` → `dock.chips`
>    - `document-page-shell.tsx`
> 4. Run existing e2e:
>    ```bash
>    pnpm test:e2e tests/e2e/agent-home-dock.spec.ts tests/e2e/agent-ways-in-interaction.spec.ts
>    ```
>
> ### 1. Author routing matrix doc
>
> Create `docs/build/notes/agent-room-chip-routing-matrix.md` (or extend platform reference §7) with table:
>
> | Label / door | Surface | Expected route | Scene/Screen | Network |
> | --- | --- | --- | --- | --- |
> | Get a clear next AI step | collapsed home | local | safetyFlow | none |
> | About Movemental | collapsed home | local | about | none |
> | … | | | | |
>
> Include document page chips for nonprofits/churches/institutions.
>
> ### 2. Fix violations
>
> For each row where implementation ≠ matrix:
> - Wire `resolveChipRoute(..., "collapsed")` for hybrid
> - Document page: prefer `sessionStorage` scene handoff over `?ask=` when intent is screen (per 2026-06-17 reversal)
>
> ### 3. Playwright expansion
>
> Add tests to `agent-home-dock.spec.ts` or new `agent-chip-routing.spec.ts`:
>
> - Document page chip → navigates to `/agent` with correct screen (mock or assert screen heading)
> - Path screen follow-up chip "Show me Safety" → local, zero `/turn`
> - Ways-in door from **collapsed** dock → local scene
> - Ways-in door from **expanded** drawer → agent allowed (mock SSE)
>
> Use `page.route('**/api/agent-room/turn**', ...)` to assert zero calls on local routes.
>
> ### 4. Unit tests
>
> Extend `composer-routing.test.ts` for every opening label × surface pair.
>
> ### 5. Update SSOT
>
> Link matrix from [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §7.2.

---

## Definition of done

- [ ] Routing matrix doc exists with ≥20 rows
- [ ] All collapsed home opening chips local (zero `/turn` in e2e)
- [ ] ≥1 document-page chip e2e
- [ ] `composer-routing.test.ts` extended
- [ ] `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green

## Verification commands

```bash
pnpm test:run tests/unit/composer-routing.test.ts
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
pnpm test:e2e tests/e2e/agent-ways-in-interaction.spec.ts
pnpm typecheck
```

## Do not

- Revert screen-first reversal (2026-06-17)
- Make document page chips call external LLM
- Add new ScreenId values
