# AU-08 — Agent room SSR fallback expansion

**Prompt ID:** au-08-ssr-fallback  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 2 · [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §18.4

Paste the block below into a fresh agent turn.

---

## Problem statement

`/agent` hydrates from `AgentRoomFallback` until JS runs. Current fallback is minimal — bad for **SEO**, **no-JS**, and **preview credibility**. Key screen copy (path, safety flow, about) should exist in SSR HTML.

---

## The prompt

> You are expanding **`AgentRoomFallback`** so server-rendered HTML carries meaningful Movemental copy for the agent home and critical screens — without duplicating the entire interactive room or violating Ink Band typography tokens.
>
> ### 0. Orient first
>
> - `src/components/agent-room/agent-room-fallback.tsx`
> - `src/components/agent-room/agent-room-shell.tsx` (hydration guard)
> - `src/app/agent/page.tsx`
> - Live home copy: `src/lib/agent-room/data/scenes.ts` (`opening`), `HomeScreen`, `CONCIERGE_VOICE`
> - Design: [INK_BAND_DESIGN_CHAIN.md](../../../design/INK_BAND_DESIGN_CHAIN.md)
>
> ### 1. Scope SSR content (priority)
>
> **Must include in fallback (static HTML):**
> 1. Home headline + subcopy (from opening scene / home screen SSOT)
> 2. Path stage names in order: Safety · Sandbox · Training · Technology (one paragraph)
> 3. Primary CTA text equivalents: "Get a clear next AI step" as plain link to `#safety-flow` or `/agent` with note that interaction requires JS
> 4. Concierge opening greeting (plain text, not Caveat animation)
> 5. `<noscript>` block explaining JS is required for full experience
>
> **Optional sections (if time):**
> - About Movemental lede (3 sentences from about screen)
> - Pricing summary pointer ("See pricing in room" — no stale dollar amounts unless from `data/pricing.ts` SSOT)
>
> ### 2. Implementation rules
>
> - Fallback renders **inside** `.ink-band-surface` / agent layout — reuse existing shell classes from `ink-band.module.css` where possible
> - Use semantic HTML: `main`, `h1`, `p`, `nav` for audience links
> - **Single source:** import copy constants from shared modules (`concierge-voice-lines.ts`, `pricing.ts`) — do not fork strings
> - Add `metadata` in `agent/page.tsx` or layout: title, description aligned with home headline
>
> ### 3. SEO
>
> - Ensure one `h1` per page in fallback
> - Structured data optional: `Organization` JSON-LD — only if already used elsewhere; don't invent new schema without review
>
> ### 4. Tests
>
> - Vitest or Playwright: fetch `/agent` HTML (no JS) contains home headline string
> - `pnpm build` succeeds
>
> ### 5. Docs
>
> Note in [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §18.4 — mark SEO/no-JS item progress.

---

## Definition of done

- [ ] View-source on `/agent` shows home headline + path order without hydration
- [ ] `<noscript>` present with honest message
- [ ] Copy imported from SSOT modules, not duplicated literals
- [ ] `pnpm build && pnpm typecheck` green

## Verification commands

```bash
pnpm build
curl -s http://localhost:3000/agent | rg -i 'movemental|Safety|Sandbox'
pnpm typecheck
```

## Do not

- SSR the full interactive beat wizard (hydration mismatch risk)
- Put stale pricing numbers not in `data/pricing.ts`
- Add Concept Modern styles to fallback
