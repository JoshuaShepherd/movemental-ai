# AU-16 — Render tools dynamic props

**Prompt ID:** au-16-render-tools-dynamic-props  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai-agents` (primary) + `movemental-ai` (client validation)  
**Last updated:** 2026-06-18  
**Source:** [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §9.2 · consultation §7 Tier 5

Paste the block below into a fresh agent turn.

---

## Problem statement

Engine render tools like `show_pricing`, `show_founders`, `show_about` use **static component fallback copy** — the host cannot personalize props. Dynamic validated props would let the concierge tailor prose while keeping the closed component repertoire.

---

## The prompt

> You are extending **render tool schemas** so `room-host` can pass optional content props to selected Ink Band screens — with Zod honesty rail on engine and client re-validation.
>
> ### 0. Orient first
>
> **movemental-ai-agents:**
> - `src/lib/tools/render-tools.tool.ts` — `defineRenderTool`, Zod schemas
> - Seed prompts: `room-host.md` — paired speak+show policy
>
> **movemental-ai:**
> - `src/lib/agent-room/screen-map.ts`
> - `validateComponentProps` (grep)
> - Screen components: `pricing-screen.tsx`, `founders-screen.tsx`, `about-screen.tsx`
>
> ### 1. Phase 1 tool scope (this PR)
>
> Extend props for:
> | Tool | New optional props |
> | --- | --- |
> | `show_pricing` | `highlightStage?: 1\|2\|3\|4`, `eyebrow?: string` (max 80 chars) |
> | `show_founders` | `introLine?: string` (max 200 chars) |
> | `show_about` | `lede?: string` (max 300 chars) |
>
> **Still forbidden:** arbitrary HTML, prices in props (pricing amounts stay component SSOT from `pricing.ts`), new component IDs.
>
> ### 2. Engine changes
>
> - Extend Zod schemas; invalid props → `error` chunk (existing pattern)
> - Update `room-host.md`: when personalizing, call tool with props; never quote dollar amounts in `text_delta`
> - `pnpm seed:agent-room` after prompt change
>
> ### 3. Client changes
>
> - Extend `validateComponentProps` for new fields
> - Screens: when prop present, render above static fallback; when absent, current static copy
> - Type exports flow from schema — no manual duplicate types
>
> ### 4. Tests
>
> - agents: tool registry test — valid/invalid props
> - movemental-ai: unit test for validateComponentProps rejection of oversized strings
> - Optional e2e mock `ui_render` with `highlightStage: 2`
>
> ### 5. Docs
>
> Update platform reference §9.2 table — mark tools as dynamic props where done.

---

## Definition of done

- [ ] Three tools accept optional props with Zod max lengths
- [ ] Client renders props when valid; fallback when absent
- [ ] Host prompt updated + seeded
- [ ] Price numbers still only from `pricing.ts` component
- [ ] Tests green both repos

## Verification commands

```bash
# movemental-ai-agents
pnpm test:room-host  # or equivalent
pnpm seed:agent-room  # if prompt changed — document, don't run without keys in CI

# movemental-ai
pnpm typecheck
pnpm test:run tests/unit/*component* tests/unit/*screen-map* 2>/dev/null || true
```

## Do not

- Allow host to pass raw price strings
- Add unbounded string props
- Skip client-side re-validation
