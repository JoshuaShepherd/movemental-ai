# Document pages and handoffs

**Routes:** `/agent/nonprofits`, `/agent/churches`, `/agent/institutions`, `/agent/about`, `/agent/how-we-use-ai`, `/agent/movement-voices`, `/agent/invite`, `/agent/assessment`, deck routes, etc.

**Role:** Long-form Ink Band documents **outside** the stub screen registry — same mast and agent dock, lighter shell, local scroll. Composer can hand off into the main room with a live first turn.

These are **pages** in the site sense, not `ScreenId` swaps on the home room sheet.

---

## 1. How document pages differ from stub screens

| | Stub screen (e.g. `about`) | Document page (e.g. `/agent/about`) |
| --- | --- | --- |
| Layout | Single sheet in screen zone | Full document scroll |
| Content depth | Summary + link out | Full essay / sections |
| LLM on load | No | No — static until visitor acts |
| Chips | Float chips from scenes | Scroll anchors or handoff to room |

Shell: `DocumentPageShell` — shared ink provider, document mast, dock at bottom.

---

## 2. Visitor arrival on a document page

1. SSR renders document content (markdown or composed sections).
2. Mast shows audience nav and sign-in.
3. Dock collapsed with composer — **no opening choreography** on these routes unless visitor navigates to `/agent`.
4. Chips on the page may **scroll** to a section or **push** to the concierge room.

**No live model** runs simply because the page loaded.

---

## 3. Handoff to main room (`/agent?ask=…`)

When visitor taps a chip or sends composer text configured for handoff:

1. Router navigates to `/agent?ask={encoded question}&from={segment}`.
2. Hybrid controller reads deep link (`deep-link.ts`).
3. Opening choreography runs on home (or current boot sequence).
4. After opening settles, stashed question sends as **first AGENT turn** (or classified move).
5. URL params cleared from address bar.

**Effect:** Visitor reads a long document, asks a question, lands in the room with the agent already working on their context. Audience segment from `from=` may seed Ways-in doors.

---

## 4. Document inventory (primary)

| Route | Purpose |
| --- | --- |
| `/agent/nonprofits` | Non-profit audience document |
| `/agent/churches` | Church audience document |
| `/agent/institutions` | Institution / seminary document |
| `/agent/about` | Full About Movemental story |
| `/agent/how-we-use-ai` | AI transparency / stance |
| `/agent/movement-voices` | Trusted voices ecosystem |
| `/agent/invite` | Invite flow |
| `/agent/assessment` | Org assessment entry |
| `/agent/*/deck` | Slide decks per audience |
| `/agent/churches-old` | **Archived** church audience document (pre–audience-edition migration) |
| `/agent/nonprofits-old` | **Archived** nonprofit audience document (pre–audience-edition migration) |

Archive routes remain reachable for redirects and QA; they are **not** in mast nav. Live audience documents are `/agent/churches`, `/agent/nonprofits`, `/agent/institutions`.

---

## 5. Related funnels (leave the room UI)

| Route | Relationship |
| --- | --- |
| `/enroll` | Stripe Safety dashboard enrollment — chip targets from readback, pricing |
| `/assess` | Deep org AI reality assessment |
| `/api/agent-room/capture` | Lead persistence from capture forms |

---

## 6. Ask your AI button

Some documents and stub screens expose **Ask your AI** — copies a prompt to external providers. Not Movemental concierge; does not call `/api/agent-room/turn`.

---

## 7. Composer & drawer — visitor expectations

**Global rules on stub screens:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

Document pages use a **different contract** — no hybrid classifier on the document surface itself.

### On the document page (before handoff)

| Action | Result |
| --- | --- |
| **Float chip** — `scroll` | Scroll to section — **no navigation** |
| **Float chip** — `agent` / `agentAsk` | Navigate to `/agent?ask=…&from=<segment>` |
| **Float chip** — `scene` | Stash scene + audience → navigate to `/agent` → LOCAL scene after opening |
| **Type + Send** (collapsed or expanded) | **Always** `router.push('/agent?ask=…')` — **no in-page thread** |

Expanding the drawer on a document page shows **Ways in** if implemented, but **Send still navigates away** to the main room — there is no SSE turn on the document route.

### After handoff on `/agent`

1. Opening choreography runs (home + greeting + chips).
2. Stashed `ask` text delivers as **first AGENT turn** after opening settles on home — **always** POST `/api/agent-room/turn`, bypassing regex and opening-chip routing.
3. `from=` audience seeds Ways-in segment in session storage.

| Handoff question example | First-turn behavior |
| --- | --- |
| *"What does it cost?"* | **AGENT** — reply in thread; host should call `show_pricing` for figures |
| *"Our board is nervous about AI"* | **AGENT** — conversational reply in thread |
| Long unmatched question | **AGENT** |

**Ways in after handoff:** Lead door *Map where we actually stand* → LOCAL **beat** screen. Other Ways-in doors → **AGENT** (expanded conversation context).

### Sheet vs drawer on document pages

Document scroll content stays visible while dock is collapsed. Send navigates to `/agent` — document is left behind. On the room, standard scrim rules apply.

**Ask your AI** button: external export only — not composer.

---

## 8. What the agent does on handoff (summary)

First turn after deep link is **always AGENT** for stashed `ask` text. Expanded Ways-in on the room follows stub rules (lead door → beat; other doors → AGENT).

---

## 9. Related pages

- [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) — deep link behavior
- [10-about.md](./10-about.md) — in-room about stub vs full document
- [01-home.md](./01-home.md) — handoff destination
