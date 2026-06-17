# Dock pill routing — screen-first outside drawer, conversation inside

**Prompt ID:** dock-pill-screen-first  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-17

Paste the block below into a fresh agent turn. It is self-contained and repo-aware.

---

## Problem statement (why this prompt exists)

On `/agent` (the home surface), tapping float pills such as **About Movemental**, **What does it cost?**, or **Get in touch** currently **expands the conversation drawer and starts a live agent turn** instead of opening the structured screen the pill names (about, pricing, contact). Only the lead pill (**Get a clear next AI step**) correctly swaps the sheet to the safety-flow screen.

That behavior was introduced intentionally on 2026-06-15 to align hybrid mode with stream mode (`STREAM_CHIP_ROUTES` → `kind: "agent"`). Product intent has since reversed: **the sheet is the primary navigation surface; the drawer is for dialogue the visitor explicitly opens.**

---

## The prompt

> You are implementing **screen-first pill routing** across the agent room. The rule is simple and must hold everywhere without breaking existing local choreography, ways-in, or deep-link handoffs.
>
> ### Product rule (non-negotiable)
>
> | Context | Pill tap should… | Drawer should… |
> | --- | --- | --- |
> | **Collapsed dock** — float chips above the composer on any surface (home sheet, path, pricing, audience doc pages, …) | Navigate to the **screen, section, or route** the pill represents | Stay **collapsed** unless the pill is explicitly a “talk to the agent” affordance |
> | **Expanded drawer** — ways-in panel, composer inside the dialog, agent-returned suggest chips, retry chip | Start or continue a **conversation turn** (local Discuss entry or SSE agent) | Stay **expanded** |
> | **Visitor expands drawer themselves** (expand icon, handle, backdrop intent) | N/A — no pill | Show ways-in or empty thread; typed input follows hybrid classifier |
> | **Visitor types a free-form question** (composer submit) | N/A | Expand + route per `classifyTypedInput` (regex → local screen on first collapsed turn; unmatched → agent) |
> | **Document page `?ask=` handoff** (`/agent?ask=…&from=…`) | N/A | **Intentionally** opens conversation — reader chose “ask” on a doc surface |
>
> **Corollary:** A pill on the manuscript sheet is a **door into product UI**, not a chat utterance. Chat utterances live inside the drawer the visitor opened on purpose.
>
> ### 0. Orient first (read before editing)
>
> 1. SSOT docs (in order):
>    - `docs/build/notes/agent-room-chat-conversation-ui-ssot.md` — dock collapsed vs expanded, chip inventory §11
>    - `docs/build/notes/agent-home-dock-functionality-2026-06-15.md` — note §4 / §11 describe the **old** chip→agent parity you are reversing
>    - `docs/build/notes/agent-platform-complete-reference.md` — screen ids and scene names
>    - `src/lib/agent-room/data/scenes.ts` — stub scene targets for opening chips (`whatIs`, `cost`, `talkToUs`, `toSafetyFlow`)
> 2. Code map:
>
> | Concern | File |
> | --- | --- |
> | Default opening chip labels | `src/components/agent-room/composer.tsx` → `DEFAULT_SUGGESTIONS` |
> | Stream/hybrid chip route table (currently wrong for hybrid) | `src/lib/agent-room/composer-routing.ts` → `STREAM_CHIP_ROUTES` |
> | Hybrid chip binding | `src/components/agent-room/use-agent-room-hybrid.ts` → `suggest()` callback (~L183) |
> | Stream chip binding | `src/components/agent-room/use-agent-room-stream.ts` → `baseSuggestions` (~L467) |
> | Stub chip binding (correct reference) | `src/components/agent-room/use-agent-room-stub.ts` → `suggest()` → `handleSuggestChipTarget` + `run(scene)` |
> | Dock UI — float chips only when collapsed | `src/components/agent-room/shell/agent-dock.tsx` → `FloatChips` |
> | Expanded ways-in doors | `src/lib/agent-room/ways-in-doors.ts`, `shell/ways-in-panel.tsx` |
> | Document page chips | `src/components/agent-room/document/document-page-shell.tsx`, audience `*-config.ts` `dock.chips` |
> | Typed routing | `src/lib/agent-room/move-classifier.ts`, `route-input.ts` |
> | Expand event | `src/lib/agent-room/suggest-chip-targets.ts` → `requestExpandConversation` |
>
> 3. Baseline tests (must stay green except the tests you deliberately invert in §7):
>    ```bash
>    pnpm test:run tests/unit/composer-routing.test.ts
>    pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
>    pnpm test:e2e tests/e2e/agent-ways-in-interaction.spec.ts
>    pnpm typecheck
>    ```
>
> ---
>
> ### 1. Introduce dock-context routing (the core fix)
>
> **Do not** only flip `STREAM_CHIP_ROUTES` labels from `agent` → `local`. That table is shared with **stream mode** (legacy full-AI regression) and has no notion of collapsed vs expanded. Instead, add an explicit **dock context** to chip resolution.
>
> #### 1.1 Extend `composer-routing.ts`
>
> - Rename or supplement `StreamChipRoute` with a neutral `ChipRoute` type usable by hybrid + stream.
> - Keep `kind: "local" | "agent" | "navigate"` but add a **scene-first map** for default opening labels that mirrors `SCENES.opening` suggest targets:
>
>   | Label | Local scene (`run(name)`) | Screen shown |
>   | --- | --- | --- |
>   | Get a clear next AI step | `toSafetyFlow` | `safetyFlow` |
>   | About Movemental | `whatIs` | `about` |
>   | What does it cost? | `cost` | `pricing` |
>   | Get in touch | `talkToUs` | `contact` |
>
> - Export a resolver, e.g.:
>   ```ts
>   export type ChipSurface = "collapsed" | "expanded";
>   export function resolveChipRoute(
>     suggestion: StreamSuggestion,
>     surface: ChipSurface,
>   ): ChipRoute
>   ```
> - **Behavior:**
>   - `surface === "collapsed"` → always prefer **local scene** for known opening labels (table above). Unknown labels with `SuggestChip.to` in scene follow-ups → local via `classifyChipTap` / `run(to)` (unchanged).
>   - `surface === "expanded"` → known informational labels may still route **agent** (utterance = `suggestion.say`) so ways-in-adjacent chips inside the drawer stay conversational. Scene follow-ups from an active thread → agent or local per existing Discuss rules.
> - Keep `getKnownStreamChipRoute(label)` for backward compat but document it as **expanded-drawer / stream-mode** bias, or split into `getOpeningChipLocalScene(label)` + `getOpeningChipAgentUtterance(label)`.
>
> #### 1.2 Thread dock expanded state into chip `onSelect`
>
> `use-agent-room-hybrid.ts` already tracks `dockExpandedRef` via `onDockStateChange`. Use it in `suggest()`:
>
> ```ts
> onSelect: () => {
>   freeTextStreakRef.current = 0;
>   const surface = dockExpandedRef.current ? "expanded" : "collapsed";
>   const route = resolveChipRoute({ label: c.label, say: c.say, lead: c.lead }, surface);
>   if (route.kind === "local") {
>     runRef.current(route.scene);
>     return;
>   }
>   if (route.kind === "navigate") { /* href */ return; }
>   // agent
>   requestExpandConversation();
>   void sendMessageRef.current(route.utterance);
> }
> ```
>
> **Critical:** When `route.kind === "local"` and surface is collapsed, **do not** call `requestExpandConversation()`. The sheet swap + concierge `say` lines from `SCENES` are the feedback loop.
>
> #### 1.3 Align hybrid `sendMessage` explicit-chip branch
>
> `sendMessage` (~L439) calls `getKnownStreamChipRoute(text)` when the submitted text exactly matches a default label. Update this branch to respect dock context the same way — collapsed label match → local scene; expanded → agent turn.
>
> ---
>
> ### 2. Revert hybrid opening chips to stub parity (acceptance criteria for home)
>
> After §1, verify manually and in E2E:
>
> | Action (collapsed dock, home) | Expected | Must NOT |
> | --- | --- | --- |
> | Tap **Get a clear next AI step** | `safetyFlow` sheet, concierge voice, dock stays collapsed | Call `/api/agent-room/turn` |
> | Tap **About Movemental** | `about` sheet; hear “Here’s the short version…” | Expand dialog |
> | Tap **What does it cost?** | `pricing` sheet; heading “What this pricing refuses” visible | Expand dialog |
> | Tap **Get in touch** | `contact` sheet | Expand dialog |
> | Type unmatched question + send | Expand dialog + agent SSE | — |
> | Tap expand icon, then ways-in door | Expand + agent/local per ways-in rules | — |
>
> Scene follow-up chips (e.g. on path screen: **Show me Safety**) must **remain local** — they already use `SuggestChip.to` and bypass `STREAM_CHIP_ROUTES` when label is unknown to the table.
>
> ---
>
> ### 3. Stream mode (`NEXT_PUBLIC_AGENT_ROOM_MODE=stream`)
>
> Stream is legacy full-AI regression. **Do not** silently change stream behavior unless product confirms.
>
> - **Option A (recommended):** Stream keeps sending default chips to agent (current `resolveStreamChipRoute` unchanged); only hybrid uses `resolveChipRoute(..., surface)`.
> - **Option B:** Stream also gets screen-first collapsed routing — update `use-agent-room-stream.ts` `baseSuggestions` to pass `dockExpandedRef` the same way.
>
> Document which option you shipped in a one-line comment atop `composer-routing.ts`.
>
> ---
>
> ### 4. Document surfaces (`DocumentPageShell` + audience pages)
>
> Document pages render float chips via `DocumentPageShell` → `DocumentChip`:
>
> ```ts
> action: "scroll" | "agent"
> ```
>
> Audit **every** `dock.chips` entry in:
> - `src/components/agent-room/audience/nonprofits-config.ts`
> - `src/components/agent-room/audience/churches-config.ts`
> - `src/components/agent-room/audience/institutions-config.ts`
> - Any other `DocumentPageShell` consumer (`/agent/about`, `/agent/how-we-use-ai`, …)
>
> **Routing rules for document float chips:**
>
> | Intent | `action` | Implementation |
> | --- | --- | --- |
> | Jump to on-page section | `scroll` + `target: "<section-id>"` | Already correct |
> | Open in-room screen on `/agent` | `navigate` (add if missing) or `agent` with **local scene handoff** | Prefer `router.push('/agent')` + session flag that runs `whatIs` / `cost` / `toBeat` on mount — **not** `?ask=` |
> | Genuine “ask the concierge” | `agent` + `agentAsk` | `router.push('/agent?ask=…')` — expands conversation (§0 table) |
>
> Concrete audience fixes to evaluate (apply where copy matches intent):
>
> | Chip (typical) | Current | Recommended |
> | --- | --- | --- |
> | Read the board letter | `scroll` → `#the-case` | Keep |
> | Map where we stand | `agentAsk` → deep convo | `router.push('/agent')` + stash + run `toBeat` or `beatIntro` locally, **or** scroll to on-page diagnostic section if one exists |
> | What's the first step? | `agentAsk` | Hand off to `/agent` + local `toSafetyFlow` or scroll to `#the-path` / `#start` |
> | Talk to us | `agentAsk` | Hand off to `/agent` + local `talkToUs` (contact **screen**, not chat) |
>
> If you add a `DocumentChip.action: "scene"` with `scene: "talkToUs"`, implement a small sessionStorage handoff (mirror `stashHandoffAudience` in `ways-in-doors.ts`) consumed once on `/agent` mount — same pattern as `?ask=` but runs `run(scene)` instead of `sendMessage`.
>
> **Do not** break `?ask=` seeding for chips that truly mean “continue this question in chat.”
>
> ---
>
> ### 5. Expanded drawer-only affordances (leave working)
>
> Confirm these **still** expand and converse after your changes:
>
> - User taps **Expand chat** / drawer handle / backdrop expand
> - **Ways in** panel doors (`WAYS_IN_DOORS`, `handleDoorSelect` in `agent-dock.tsx`) — `source: "ways-in"` on `onSay`
> - Agent SSE `suggest` chips (`onSuggest` in hybrid controller) — always conversational
> - **Try again** retry chip when `errorRetryable`
> - `ENTER_DISCUSS_VALUE` / Discuss consent chips
> - `?ask=` deep link from document pages (hybrid seed effect ~L582)
>
> **Known gap (optional follow-up, not blocking):** Agent-returned suggest chips are bound to `suggestions` but `FloatChips` only renders when collapsed; expanded drawer does not show them. If you touch this, add a chip row inside `cardThread` when `expanded && agentChips.length` — out of scope unless trivial.
>
> ---
>
> ### 6. Typed input — preserve hybrid classifier
>
> Do **not** weaken `classifyTypedInput` / `route-input.ts`:
>
> - First collapsed message matching high-confidence regex → local screen (e.g. “show me the whole path” → `toPath`)
> - `chatActive` (expanded dock, prior agent turn, or engaged thread) → always agent
> - Unmatched free text → agent + expand
>
> **Gotcha to preserve:** regex `about` on first collapsed turn still matches `whatIs` locally — document in code comment; do not “fix” unless product asks.
>
> ---
>
> ### 7. Tests — invert the 2026-06-15 expectations
>
> Update `tests/e2e/agent-home-dock.spec.ts`:
>
> - Rename / rewrite **“cost chip chats instead of swapping…”** → assert **pricing sheet visible**, dialog **not** visible, **zero** `/turn` calls (mirror lead-chip test pattern).
> - Rename / rewrite **“about chip chats instead of swapping…”** → assert about copy (“Here’s the short version” or about screen marker), no dialog.
> - Add **“get in touch chip opens contact screen”** — contact form or concierge line visible, no `/turn`.
> - Keep: lead chip local safety, typed fallback expands dock, whole-path local, path → Show me Safety, expand drawer ways-in, mast home replay.
>
> Update `tests/unit/composer-routing.test.ts`:
> - Test `resolveChipRoute(..., "collapsed")` → local scenes for About / Cost / Contact.
> - Test `resolveChipRoute(..., "expanded")` → agent utterances (if Option A for stream/hybrid split).
>
> Run full e2e suite from §0 before finishing.
>
> ---
>
> ### 8. Documentation SSOT updates (same PR)
>
> Update these to match shipped behavior:
>
> | Doc | Section to fix |
> | --- | --- |
> | `docs/build/notes/agent-room-chat-conversation-ui-ssot.md` | §11 table — About/Cost/Contact → **local** when collapsed |
> | `docs/build/notes/agent-home-dock-functionality-2026-06-15.md` | §4 default float chips table + §11 fixes list — add **2026-06-17 screen-first reversal** note |
> | `docs/build/notes/agent-room-suggestion-pills-inventory-and-recommendations.md` | §3.1 home pills routing column if it still says agent |
> | `docs/build/prompts/agent-room-playwright-audit-remediation.md` | Audit summary line “hybrid chip → agent chat” — stale after this work |
>
> Add a changelog row to chat UI SSOT §19.
>
> ---
>
> ### 9. Verification checklist (report back)
>
> - [ ] Home collapsed: About / Cost / Contact / Lead pills → correct **screens**, dock collapsed, no SSE
> - [ ] Home: expand drawer → ways-in door → conversation
> - [ ] Home: unmatched typed send → expanded + SSE
> - [ ] Path screen follow-up chip → local scene (e.g. Safety)
> - [ ] Audience page: scroll chips still scroll; “Talk to us” opens contact **screen** not chat (if you changed handoff)
> - [ ] `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green
> - [ ] `pnpm test:run tests/unit/composer-routing.test.ts` green
> - [ ] `pnpm typecheck` green
> - [ ] SSOT docs updated
>
> ---
>
> ### 10. Constraints
>
> - **pnpm only**; no schema / six-layer chain changes.
> - **Do not** modify `src/components/ui/` (shadcn).
> - **Do not** restyle chips — routing-only change.
> - **Minimize diff** — prefer extending `composer-routing.ts` + hybrid `suggest()` over duplicating maps in three hooks.
> - **Explain trade-offs** in PR description: screen-first navigation vs 2026-06-15 stream parity.
>
> When done, summarize: files changed, stream mode option chosen, any document chips you reclassified, and test output.

---

## Related docs

- [agent-room-chat-conversation-ui-ssot.md](../notes/agent-room-chat-conversation-ui-ssot.md) — dock SSOT (update §11 after fix)
- [agent-home-dock-functionality-2026-06-15.md](../notes/agent-home-dock-functionality-2026-06-15.md) — prior chip parity (superseded for collapsed pills)
- [agent-room-suggestion-pills-inventory-and-recommendations.md](../notes/agent-room-suggestion-pills-inventory-and-recommendations.md) — full pill inventory
- `src/lib/agent-room/composer-routing.ts` — routing table to extend
- `tests/e2e/agent-home-dock.spec.ts` — tests to invert
