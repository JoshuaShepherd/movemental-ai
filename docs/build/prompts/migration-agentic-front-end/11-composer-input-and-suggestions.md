# AF-11 — Composer, input routing, and suggestions

**Prompt ID:** AF-11  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-05, AF-07  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port `js/app.js` input wiring and composer UI from `ink-band.css` (`.composer`, `.sugg`, `.chip`, `.line`, `.send`, `.replay`).

Skills: **`responsive-audit`**, **`typography-polish`**.

---

## 2. Goal

1. Composer with suggestion chips, text input, send button, replay control.
2. Full `handleInput()` regex routing table from prototype.
3. `setSuggest()` integration from runner `suggest` acts.
4. Disable input while `busy`.

---

## 3. UI components

```text
components/agent-room/composer.tsx        # exists — rewrite to ink-band
components/agent-room/suggestion-chips.tsx
components/agent-room/composer-input.tsx
```

### 3.1 Suggestion chips

From CSS:

- Default `.chip` — pill border
- `.chip.lead` — yellow marker highlight via `#marker` filter pseudo

Chip click → `run(suggestion.to)` (not free-text send).

### 3.2 Input line

- Placeholder rotates per screen (beat vs default) — port from `screens.js`
- Enter key submits
- Send button `→` with aria-label

### 3.3 Replay

`#replay` → `run('opening')` when not busy.

---

## 4. Regex routing (`handleInput`)

Port exact patterns from `js/app.js`:

| Pattern | Scene |
| --- | --- |
| `after\|sandbox\|training\|tech\|whole path\|…` | `toPath` |
| `safety\|charter\|guidebook\|ratif` | `toSafety` |
| `cost\|price\|much\|free\|pay\|afford` | `cost` |
| `faq\|frequently asked\|…` | `toFaq` |
| `talk to\|contact\|human\|email\|…` | `talkToUs` |
| `who\|behind\|leader\|team\|trust\|network` | `whoBehind` |
| `what is\|what do\|movemental\|about\|…` | `whatIs` |
| `stuck\|next\|simple\|stand\|start\|…` | `toBeat` |
| else | `play([{ say: "That's outside what I can help with." }])` |

Keep as pure function `routeInput(text: string): SceneName | 'fallback'`.

---

## 5. Beat mode UX

When screen is `beat`:

- Hide default composer suggestions (chips in beat component)
- Route typed text to `answerMap` custom answer handler if prototype supports it

---

## 6. Accessibility

- Send button `aria-label="Send message"`
- Chips are `<button type="button">`
- Focus ring on input (border tokens)
- Disabled state when `busy`

---

## 7. Definition of Done

- [ ] Chips render from runner `suggest` acts with lead styling.
- [ ] All regex routes fire correct scenes (manual test matrix).
- [ ] Fallback say line plays for unknown input.
- [ ] Replay resets to opening.
- [ ] Input disabled during `play()`.
- [ ] No `/api/agent-room/stream` calls.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 8. Verification matrix

| Input | Expected scene |
| --- | --- |
| "what does it cost" | pricing |
| "who is behind this" | founders |
| "help me get started" | beat flow |
| "quantum physics" | fallback say |

---

## §10 Attempt log

<!-- Route test results, composer CSS port notes. -->

### 2026-06-10 — AF-11 composer input + routing (Claude Code)

**Branch:** `slice/S02-leader-corpus-onboarding` (uncommitted). **typecheck:** ✅ green. **lint:** 0 issues in touched files.

**Scope note:** the composer **UI/CSS was already ported** in AF-03/AF-05 (`composer.tsx` with `.composer/.sugg/.chip/.chip.lead/.line/.field/.send/.legend/.replay`, chips pre-bound to `run(to)` via `ComposerChip.onSelect`, Enter-submit, replay→`reset`/`goHome`). AF-11 was therefore the **input-routing brain**, not a rewrite — no `suggestion-chips.tsx`/`composer-input.tsx` split was needed (the single `Composer` already separates chips, input, and replay cleanly).

**What shipped**

- **`src/lib/agent-room/route-input.ts`** — pure `routeInput(text): RouteTarget | "fallback"`, an exact port of `handleInput`'s ordered regex table (8 rules, first-match-wins, the deliberately broad `stuck|next|simple|stand|start|begin|assess|where|find|safe|help` → `toBeat` catch-all last). `FALLBACK_SAY = "That’s outside what I can help with."`. `RouteTarget` is typed as the `Extract<SceneName, …>` subset so a renamed scene breaks the router at compile time.
- **`use-agent-room-stub.ts`** — `sendMessage(raw)` (was a no-op stub) now calls `routeInput`; a match runs the scene, `"fallback"` plays `[{ say: FALLBACK_SAY }]`. Still zero network. Empty/busy is guarded by the composer before `onSay` fires, matching the prototype's `if(!v||busy)return`.
- **Composer placeholder rotation** — `DEFAULT_PLACEHOLDER` / `BEAT_PLACEHOLDER` exported; `Composer` takes an optional `placeholder` prop (defaults to the default copy); `AgentRoomView` threads it; `StubRoom` passes `BEAT_PLACEHOLDER` when `screen.id === "beat"`. (Prototype only ever *set* the beat placeholder and never restored it — this rotates correctly both ways. Noted as an intentional improvement, not a divergence in copy.)

**Beat-mode typed text (§5):** the prototype does **not** map typed text to a custom `answerMap` answer — `handleInput` runs the same regex router regardless of screen (e.g. typing "where" in beat → `toBeat`). Kept uniform; only the placeholder changes in beat. No custom-answer handler added.

**Busy/disabled (§6):** prototype-faithful — the **input element stays enabled/focusable**; the **send button** is `disabled` while busy and submits are guarded (`if (!v || disabled) return`). Verified send disables mid-scene and a submit-while-busy is ignored.

**Verification (Playwright, headless chromium-1223, `/agent` stub mode):**

| Typed input | Result |
| --- | --- |
| "what does it cost" | → `cost` → **pricing** screen ✓ |
| "who is behind this" | → `whoBehind` → **founders** screen ✓ |
| "help me get started" | → `toBeat` → **beat** screen ✓ |
| "quantum physics" | no screen swap; **fallback line spoken** ✓ |

Plus: home placeholder = default; **beat placeholder rotates** to "Tap an answer above, or type your own…" and **restores** off-beat; **replay → opening** (home, 17 faces); **send disabled mid-play** + **submit-while-busy ignored**, re-enables when the scene ends (same input then routes); ≥1 **lead chip** in opening. **0** `/api/agent-room/stream` calls; **0** console errors.
