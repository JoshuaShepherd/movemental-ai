# AF-12 — Visual parity and QA pass

**Prompt ID:** AF-12  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-08, AF-09, AF-10, AF-11  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Final **quality gate** before declaring the HTML→React migration complete (stub mode). Compare every screen and critical scenes against the source prototype.

Invoke skills as fixes are needed:

- **`page-audit`** / **`visual-storytelling-audit`** — narrative + visual rhythm
- **`responsive-audit`** — breakpoints
- **`tailwind-cleanup`** — token violations
- **`typography-polish`** — hierarchy
- **`color-audit`** — contrast on ink-band tokens

---

## 2. Goal

1. Side-by-side parity checklist — all screens 🟢.
2. Scene choreography spot-check — opening, toBeat, cost, whoBehind, leaderScene.
3. Fix list emptied or explicitly deferred with reason in §10.
4. Migration sign-off in `master_runner.md`.

---

## 3. QA setup

### 3.1 Dual serve

Terminal A — prototype:

```bash
cd movemental-agentic-front-end && npx serve . -p 5000
```

Terminal B — Next.js:

```bash
cd movemental-ai && pnpm dev
# http://localhost:3000/agent
```

### 3.2 Viewports

Test at: 390×844 (mobile), 768×1024 (tablet), 1440×900 (desktop).

### 3.3 Reduced motion

Enable `prefers-reduced-motion: reduce` — verify ink/gestures instant-complete.

---

## 4. Screen parity matrix

For each row, open static HTML and React stub scene; mark 🟢/🟡/🔴.

| Screen | Static path | Scene trigger | Status |
| --- | --- | --- | --- |
| home | `pages/home.html` | auto opening | |
| beat 0–5 | `pages/beat/N.html` | `toBeat` | |
| readback | `pages/readback.html` | complete beat | |
| path | `pages/path.html` | `toPath` | |
| about | `pages/about.html` | `whatIs` | |
| contact | `pages/contact.html` | `talkToUs` | |
| pricing | `pages/pricing.html` | `cost` | |
| faq | `pages/faq.html` | `toFaq` | |
| safety | `pages/safety.html` | `toSafety` | |
| founders | `pages/founders.html` | `whoBehind` | |
| confirm free | `pages/confirm-free.html` | confirm scene | |
| confirm paid | `pages/confirm-paid.html` | confirm scene | |
| leader 0–16 | `pages/leader/N.html` | band click / scene | |

Capture screenshots for any 🟡/🔴 item.

---

## 5. Interaction QA

| Flow | Steps | Pass? |
| --- | --- | --- |
| Opening choreography | load → say → underline → chips | |
| Suggestion navigation | each chip → correct screen | |
| Regex input | AF-11 matrix | |
| Beat complete | select opts → readback | |
| Path drawers | expand each stage | |
| goHome | logo during scene | |
| Replay | composer replay | |
| Resize | ink overlay tracks | |
| busy lock | no double submit | |

---

## 6. Technical QA

```bash
pnpm typecheck
pnpm lint
```

- [ ] No requests to `/api/agent-room/stream` in stub mode
- [ ] No console errors on `/agent` during flows
- [ ] `AGENT_ROOM_MODE` defaults to `"stub"`
- [ ] Marketing routes unaffected (spot check `/`)

Chrome DevTools MCP (if available):

1. Navigate `/agent`
2. `list_console_messages` — clean
3. `list_network_requests` — no stream API
4. Snapshot after opening scene

---

## 7. Fix protocol

For each defect:

1. Identify lowest layer (token → shell → screen → runner)
2. Fix bottom-up
3. Re-run affected parity row
4. Log in §10

**Do not** fix by connecting live agent — defer to AF-90.

---

## 8. Definition of Done

- [ ] All screens 🟢 or 🟡 with documented acceptable delta in §10.
- [ ] Interaction table passes.
- [ ] Technical QA passes.
- [ ] `master_runner.md` rows AF-00–AF-12 marked **Done** (or Blocked with reason).
- [ ] §10 contains sign-off summary + screenshot links/paths.

---

## 9. Deliverable: migration sign-off note

Append to §10:

```markdown
## Sign-off YYYY-MM-DD

- Stub migration complete: yes/no
- Known deltas: …
- Ready for AF-90 agent integration: yes/no
- Operator: …
```

---

## §10 Attempt log

<!-- Parity matrix results, fixes applied, sign-off. -->

### 2026-06-10 — AF-12 visual parity + QA pass (Claude Code)

**Branch:** `slice/S02-leader-corpus-onboarding` (uncommitted). **typecheck:** ✅ green. **lint:** 0 issues in touched files. **Method:** headless Playwright (chromium-1223) driving the live `/agent` stub at 1440×900 (desktop), plus 768×1024 and 390×844 passes; a separate `reducedMotion: "reduce"` context; network + console listeners throughout. Screenshots in [`qa-screenshots/`](./qa-screenshots/) (15 PNGs, ~1.6 MB).

#### Screen parity matrix — 13/13 🟢

| Screen | Trigger | Status | Shot |
| --- | --- | :---: | --- |
| home | auto opening | 🟢 | `01-home.png` |
| pricing | type "what does it cost" → `cost` | 🟢 | `02-pricing.png` |
| about | type "what is movemental" → `whatIs` | 🟢 | `03-about.png` |
| contact | type "contact a human" → `talkToUs` | 🟢 | `04-contact.png` |
| faq | type "faq" → `toFaq` | 🟢 | `05-faq.png` |
| founders | type "who is behind this" → `whoBehind` | 🟢 | `06-founders.png` |
| path | type "show me the whole path" → `toPath` | 🟢 | `07-path.png` |
| safety | type "safety guidebook" → `toSafety` | 🟢 | `08-safety.png` |
| confirm free | safety → "Walk it free" → `onOwn` | 🟢 | `09-confirm-free.png` |
| confirm paid | safety → "Have us do it" → `withUs` | 🟢 | `10-confirm-paid.png` |
| beat 0–5 | type "help me get started" → `toBeat` (6 questions cycled) | 🟢 | `11-beat-0.png` |
| readback | complete all 6 beats | 🟢 | `12-readback.png` |
| leader 0–16 | band face click → `leaderScene` (17/17 verified in AF-10; leader 0 re-shot here) | 🟢 | `13-leader-0.png` |

Responsive: `14-home-tablet.png` (768), `15-home-mobile.png` (390) — band still 17 faces, no overflow break, ink overlay re-sizes on resize.

#### Interaction QA — all pass

| Flow | Result |
| --- | --- |
| Opening choreography | 🟢 say → underline gesture (3 ink `<path>`s) → 6 chips incl. 1 lead |
| Suggestion navigation | 🟢 About / Pricing / Founders chips → correct screens |
| Regex input | 🟢 AF-11 matrix (cost→pricing, who→founders, help→beat, "quantum physics"→fallback line) |
| Beat complete → readback | 🟢 6 answers → readback ("It starts with Safety") |
| Path drawers | 🟢 Safety starts open; opening Sandbox closes the others (accordion `aria-expanded` toggles) |
| goHome (logo mid-scene) | 🟢 logo during a scene → opening/home |
| Replay | 🟢 composer replay → opening |
| Resize | 🟢 overlay tracks at 768 + 390; no console error |
| Busy lock | 🟢 send disabled mid-play; a second Enter during a scene is ignored (stayed on pricing, no stack) |

#### Reduced motion

🟢 sleeps collapse to 0 — opening chips appear in **21 ms**; 6 beat answers + readback in **611 ms**; no errors; no `/stream`. Matches the prototype's instant-complete behaviour.

#### Technical QA

- 🟢 **No `/api/agent-room/stream`** requests in any stub flow (network listener: 0 across the full sweep + reduced-motion run).
- 🟢 **No console / page errors** on `/agent` during all flows.
- 🟢 **`AGENT_ROOM_MODE` defaults to `"stub"`** (`src/lib/agent-room/mode.ts` — `?? "stub"`).
- `pnpm typecheck` green; `pnpm lint` clean for all touched files (repo's pre-existing 112 problems are in unrelated service files).

#### Fixes applied

**None required** — every screen and interaction matched on first pass. Four initial red rows in the first sweep were **test-harness timing/logic artifacts**, re-probed green with correct waits/logic (not code changes): (a) opening choreography checked before the long opening voice line finished; (b) the drawer loop clicked Safety, which *starts open*, so the assert-opens check inverted; (c/d) the confirm chips were clicked before the `toSafety` scene had rendered them.

#### Known delta (documented, not a defect)

- **Marketing `/` 307-redirects to `/agent`.** Cause: this branch's **separate, in-progress marketing-site migration** — `src/app/(site)/page.tsx` and the dashboard tree are deleted / archived to `_archive/pre-marketing-migration-2026-06/` (present in the session-start working tree, *before* any AF work). The agent-room migration is cleanly scoped to `src/{components,lib}/agent-room/` and touched no `(site)` route or `proxy.ts`. The `.ink-band-surface` scope is correct — it appears **only** under `/agent` (0 occurrences in `/`'s server HTML). Not a regression from AF-08–AF-12; flagged here only because §6's "spot check `/`" surfaced it.
- **Container `settle` on the `leader` screen** (carried from AF-10): the leader screen gets the view's uniform `settle` wrapper *and* the band→hero FLIP + per-element `.fade`; the prototype dropped `settle` on `leader` specifically. Visually fine (both short, same start). Acceptable delta — revisit only if it reads as double-motion.

## Sign-off 2026-06-10

- **Stub migration complete:** yes — all 12 Ink Band screens + the engine (ink voice, SVG gestures, single `playScene` runner, `SCENES` data, leader FLIP, regex input router) ported to React; registry 12/12 real; AF-00–AF-12 all **Done**.
- **Known deltas:** (1) marketing `/` redirects to `/agent` due to the unrelated in-progress marketing-site migration on this branch — not caused by AF work; (2) `leader` screen carries the container `settle` in addition to its FLIP — cosmetic, acceptable.
- **Ready for AF-90 agent integration:** yes — the stream path (`use-agent-room-stream.ts`, `stream-chunk.ts`, `/api/agent-room/stream`, agent-tool screens) was left untouched behind the `AGENT_ROOM_MODE` flag; flip the default to `"stream"` and reconcile the `ScreenId` ↔ `ComponentId` id spaces (INT-01) when AF-90 begins.
- **Operator:** Joshua Shepherd (via Claude Code, Ink Band migration runner).
