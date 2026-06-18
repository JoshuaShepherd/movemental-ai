# Movemental.ai — UI & AI Design Consultation

**Index:** [agent-room-documentation-index.md](./agent-room-documentation-index.md)

**Date:** 2026-06-18  
**Scope:** Full assessment of what Movemental.ai is trying to be, how the UI/AI system works, and where to optimize — synthesized from `docs/build/notes`, design canon, and platform SSOT.  
**Audience:** Product, design, engineering, and anyone deciding what to build next.

---

## 1. Executive summary

Movemental.ai is not trying to be a marketing site with a chatbot attached. It is trying to be an **agent-first organizational concierge**: a warm manuscript the visitor reads while a trusted voice guides them through a structured judgment about AI adoption — Safety, Sandbox, Training, Technology — without performing mastery they do not have.

The product thesis is unusually coherent for an experimental preview:

| Layer | What it is |
|-------|------------|
| **Positioning** | For mission-driven organizations (churches, nonprofits, institutions), not solo creators |
| **Diagnosis** | AI made fragmentation visible; the real work is keeping the org recognizable as itself |
| **Interaction model** | Manuscript + hand — structured screens on a paper sheet, concierge voice in Caveat ink |
| **Technical model** | Hybrid choreography: instant local scenes for navigation, live LLM only when dialogue is genuinely needed |
| **Conversion model** | Relational, not SaaS — diagnostic → readback → honest next step → capture or human handoff |

What makes this distinctive is the **discipline of restraint**. The closed screen set, the caption-only ink band, the screen-first pill routing, the honesty rail on tool props, the refusal to quote prices in voice — these are not polish details. They are the product expressing its thesis: *this is not primarily a tools problem.*

The main risks are not visual. They are **coherence gaps** between what the docs say, what the UI does, and what the backend captures — stage naming splits, preview indexability, capture wiring, Discuss mode behind a flag, and a mental-model tension between "not a chat UI" and "conversation drawer that hides the sheet."

---

## 2. What Movemental.ai is trying to be

### 2.1 The one-breath identity

From the master talking-points index and live agent surfaces, Movemental's public identity compresses to:

> **There is a wiser way to navigate AI** — for organizations with people, formation, and mission at stake. You are not being asked to master AI. You are being asked to lead faithfully on a new frontier.

This is not "balanced AI" or "thoughtful AI." It is a **fiduciary posture**: accept the frontier is real, refuse mastery theatre, do the slow work of deciding what adoption keeps the organization coherent.

The adoption standard that should survive if only one sentence does:

> *The only adoption that endures is the one your organization can still recognize as itself a year later.*

Everything in the UI should serve that sentence. Screens that feel like product tours, chips that feel like growth hacks, or chat patterns that feel like Intercom all violate the charter.

### 2.2 What it is **not**

The documentation is explicit and worth treating as design law:

| Not this | Because |
|----------|---------|
| Generic chat widget | Chat is a phase, not the product shell |
| Marketing site + bolt-on AI | `/` redirects to `/agent`; the room **is** the home page |
| Creator-economy platform | Movement leaders are a **trusted-voice ecosystem layer**, not a fourth funnel card beside churches/nonprofits/institutions |
| Tools-first vendor | "What does it do to us" precedes "what can it do for us" |
| Concept Modern marketing chrome | Agent room is **Ink Band only** — warm paper, Playfair, Caveat hand, ink-blue pen |

The archived Concept Modern design system (`docs/design/DESIGN.md`) is reference for a future marketing merge, not the live product surface. The repo has committed to **one design system for the agent room**.

### 2.3 The metaphor that governs all UI decisions

From `INK_BAND_DESIGN_CHAIN.md`:

> The agent room is a **sheet of warm paper** the agent writes on by hand. The product is not a chat window or a dashboard — it is a **manuscript the org is shown back to itself**.

This metaphor drives every consequential UI choice:

- **Editorial measure**, not app density
- **One pen, one accent** (`#22409B` ink-blue; red for margin rule and refusals; yellow for exactly one lead chip)
- **The hand is visible** — Caveat ink lines, gesture strokes, choreography beats
- **A closed screen vocabulary** — home, beat, readback, path, safety, pricing, etc.; no ad-hoc pages
- **Restraint as honesty** — plain voice, named trade-offs, visible refusals

A screen is "Ink Band" when it sits on mast/screen/voice/composer, uses the four type voices correctly, and belongs to the closed set. Anything else is drift.

### 2.4 The buyer and the journey

**Primary buyer:** The senior leader who signs the letter, owns outcomes, and cannot outsource conscience to a vendor.

**Primary audiences (implementation):** Nonprofits, churches, institutions — each with sourced pain-point frames (Virtuous, Lifeway, Barna, FBI IC3, etc.) that emphasize governance gaps, trust fragility, and fragmentation — not hype adoption stats.

**The journey the UI encodes:**

```text
Orientation (home + concierge voice)
    → Safety-first on-ramp (safety flow wizard)
    → Organizational reality map (4-beat diagnostic)
    → Readback (composed judgment — local stub or Opus diagnostician)
    → Path placement (Safety → Sandbox → Training → Technology)
    → Honest next step (pricing, handbook, enroll, contact, discuss)
```

This is **choreography over exploration** by default. The product assumes most first visits need structure before they need open chat.

### 2.5 Two frameworks (do not conflate)

The talking-points index warns that Movemental teaches two ordered sequences:

1. **The path** — Safety → Sandbox → Training → Technology (implementation order for orgs)
2. **The reality map** — four diagnostic questions with Safety gate on Q1

Conflating them in UI copy or agent prompts is a common internal drift pattern. The beat screen and path screen do different work; the UI should never collapse them into one "assessment."

---

## 3. How it works — the UI/AI system

### 3.1 Three-zone layout

The agent room is a persistent frame:

```text
┌ mast ─────────────────────────────────────────────┐
│  Logo (home/replay) · audience nav · sign-in      │
├ screen ───────────────────────────────────────────┤
│  Full-bleed manuscript sheet                      │
│  (home, beat, path, pricing, safety flow, …)      │
├ agent dock ───────────────────────────────────────┤
│  Collapsed: handwriting strip + float chips +     │
│             single-line composer                  │
│  Expanded: conversation dialog (screen hidden)    │
└───────────────────────────────────────────────────┘
```

**Critical invariant (2026-06-17 choreography SSOT):** The dock is **either collapsed or expanded, never both.** Expanding hides the screen zone; conversation owns the viewport below mast.

### 3.2 Two coupled channels on every meaningful turn

The agent speaks through two synchronized surfaces:

| Channel | What it carries | When |
|---------|-----------------|------|
| **Voice** | Caveat ink line (collapsed) or thread prose (expanded) | Present-tense concierge presence |
| **Screen** | Structured product UI | Navigation, diagnostics, pricing, capture forms |

Local choreography uses an **act vocabulary** (`say`, `show`, `gesture`, `wait`, `suggest`, `clear`, `await:capture`). Live engine turns use SSE chunks (`text_delta`, `ui_render`, `ink_gesture`, `suggest`, `agent_handoff`).

Choreography is **data, not bespoke React** — scenes live in `scenes.ts`, executed by `playScene`. This is the right architecture for a product that needs deterministic funnels with optional AI depth.

### 3.3 Hybrid mode — the architectural center

Default runtime: **`hybrid`** (`NEXT_PUBLIC_AGENT_ROOM_MODE`).

```text
Visitor action
    │
    ├─ Discuss phase? ─────────────────────► AGENT (always)
    │
    ├─ chatActive? (expanded dock, prior agent turn)
    │       └─ may still regex-locally for Ways-in doors
    │
    ├─ Meta/objection streak + DISCUSS_ENABLED? ► LOCAL discussOffer
    │
    ├─ regex match (route-input.ts)? ──────► LOCAL scene (instant, zero network)
    │
    └─ else ───────────────────────────────► AGENT (open_text → SSE)
```

**Why this matters for design:** Most of what a visitor experiences is **scripted and instant**. Live Claude runs on unscripted text, agent-classified chips in the expanded drawer, Discuss phase, or engine-driven follow-ups. The UI should feel fast and intentional because most paths literally do not wait on a model.

**Screen-first pill routing (2026-06-17 product reversal):**

| Context | Pill behavior |
|---------|---------------|
| Collapsed dock | Opens the **screen** the pill names (about, pricing, contact, safety flow) |
| Expanded drawer | Starts or continues **conversation** |
| Free-form typed question | Expands drawer; first collapsed regex match may still swap sheet locally |

This reversal is philosophically correct: **the manuscript is primary navigation; the drawer is for dialogue the visitor explicitly opened.** It aligns UI behavior with the "not a chatbot" charter.

### 3.4 Guide vs Discuss — two phases, one room

| Phase | Goal | Screen | Voice | Composer |
|-------|------|--------|-------|----------|
| **Guide** (default) | Orient, run structured flows | Primary — full stage | Caption ink (≤80 chars, scene only) | Single-line; chips lead |
| **Discuss** (flag-gated) | Think together, objections, edge cases | Hidden while expanded; marginalia when folded back | Thread prose | Multi-turn; turn cap ~7 then capture |

Discuss is the product's answer to "what about visitors who need real conversation?" It is designed as **marginalia on a document**, not Slack bubbles — but the shipped implementation (expanded drawer overlay) sits closer to chat than the original Model B "mark up one document" spec. That tension is unresolved aesthetically even if the engineering is clean.

**Discuss is off by default** (`NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`). This is a significant product decision: the longest-form AI engagement path is not live for most visitors.

### 3.5 Document surfaces — the second UI pattern

Long-form audience pages live at `/agent/nonprofits`, `/agent/churches`, `/agent/institutions`, plus about, movement-voices, how-we-use-ai, decks.

These use `DocumentPageShell` — lighter mast+dock, **no live agent**. Chips either scroll locally or hand off to `/agent?ask=…&from=segment`. The `AskAiPromptButton` on some CTAs opens **external** providers (ChatGPT, Claude, Gemini) — deliberately **not** competing with the Movemental concierge.

This is a smart separation: editorial depth on document pages, agent intelligence on the room home.

### 3.6 Live agent topology

```text
Browser (/agent)
    → POST /api/agent-room/turn (SSE proxy)
        → movemental-ai-agents engine
            → room-host (Concierge — prose + optional renders)
            → room-diagnostician (handoff after beat — composed readback)
```

**Agents:**

| Agent | Model | Role |
|-------|-------|------|
| `room-host` | `claude-opus-4-6` (temp 0.6, max 1500) | Movemental Concierge — paired speak+show, closed tool repertoire |
| `room-diagnostician` | `claude-opus-4-6` (temp 0.4, max 2000) | Single-shot synthesis after reality check; verdict computed in code, narrated by model |

> **Note:** Both agents run the same Opus 4.6 model (see `movemental-ai-agents/scripts/seed-agent-room.ts:83,93`). The temperature split (0.6 host vs 0.4 diagnostician) is the only model-level difference — facilitation tolerates more variance; synthesis wants consistency. Earlier internal notes describing the host as Haiku are stale.

**Honesty rails:**

- Zod-validated tool props — invalid props → error chunk, never rendered
- Prose guardrail — never quote prices in voice; call `show_pricing`
- Safety verdict — `past` only if written ratified policy **and** named refusals; otherwise `pre`
- Off-domain → refusal + human handoff

The engine policy ("not a chatbot") and the UI policy ("screen-first navigation") are aligned at the architecture level. The remaining friction is visitor mental model, not missing features.

### 3.7 Closed screen inventory

The agent may only render a fixed vocabulary:

**Core screens:** `home`, `beat`, `readback`, `safety`, `confirm`, `path`, `founders`, `leader`, `about`, `contact`, `pricing`, `faq`, `capture`, `safetyFlow`, plus stage detail (`sandbox`, `training`, `technology`).

**Engine extras:** `network`, `audience`, `handoff_human`.

This closed set is a **feature, not a limitation**. It forces the product story to stay structured. New surfaces require deliberate vocabulary changes, not route sprawl.

### 3.8 Capture and conversion plumbing

The UI presents multiple capture surfaces:

| Kind | Purpose |
|------|---------|
| `map` | Email after beat readback |
| `paid` | SafeStart dashboard enrollment |
| `free` | Handbook download |
| `discuss` | Team follow-up after Discuss cap |

**Known gap (from CTAs/capture notes):** The capture seam has been partially wired since those notes were written, but enrollment orchestration, assessment magic-link front door, and several forms remain UI-only or stub-success in places. The **highest-leverage fix** remains: every in-room form must POST to a real endpoint or the room collects nothing regardless of how good the UI looks.

---

## 4. Design system assessment

### 4.1 What is working exceptionally well

**1. Metaphor consistency.** Ink Band is one of the most coherent agent-UI design systems in the current landscape. The paper sheet, margin rule, four type voices, and ink gestures create instant differentiation from generic AI chat UIs.

**2. Layered design chain.** Tokens → primitives → components → shell → screens mirrors the type-safety chain. Design decisions flow downstream; pages compose, they don't invent.

**3. Motion as meaning.** Ink write-on, staggered reveals, gesture strokes — motion communicates "the agent is present" without loading spinners or typing indicators that feel SaaS-y.

**4. Screen-first navigation.** The 2026-06-17 reversal correctly restores the manuscript as primary. Visitors who tap "What does it cost?" should see the pricing sheet, not be thrown into a chat thread.

**5. Hybrid architecture.** Local scenes for speed and determinism; LLM for depth. This is the right cost/latency/quality trade-off for a concierge that must feel trustworthy.

### 4.2 Where the UI/AI model creates friction

**1. Collapsed vs expanded is a mode switch visitors must learn.**

The dock has two radically different UX states:
- Collapsed = manuscript navigation + caption ink
- Expanded = chat dialog that hides the sheet

There is no persistent visual hint that "pills open pages, typing opens conversation." The regex gotcha (`about` matching `whatIs` on first collapsed message) is a symptom of this ambiguity.

**2. "Not a chat UI" vs conversation drawer.**

The charter rejects chat bubbles, but the expanded drawer is structurally a chat UI — thread, composer, backdrop scrim. The Discuss spec's Model B (marginalia on the sheet) was the more charter-faithful direction; Model C (overlay) shipped. For Discuss-off production, this matters less. For Discuss-on, the product will feel like two products stitched together.

**3. Voice band role confusion (partially resolved).**

The 2026-06-17 choreography SSOT clarifies: caption ink is scene choreography only; agent answers live in the thread. Good engineering fix. But visitors who never expand the drawer may think the concierge only speaks in one-line captions.

**4. Document pages vs room home — two front doors.**

Audience content lives on `/agent/nonprofits` etc.; the agent lives on `/agent`. Hand-off via `?ask=` is correct technically but creates a **cognitive split**: am I reading or am I talking? SessionStorage scene handoffs (2026-06-17) help for screen intent; ask handoffs remain conversation intent. The distinction needs clearer visitor signaling.

**5. Stage naming split in public copy.**

Agent front door: Safety · Sandbox · Training · Technology. Research/field-guide: Safety · Sandbox · Skills · Solutions. Internal mapper exists; public copy does not. This erodes trust for detail-oriented buyers (seminary provosts, nonprofit COOs).

### 4.3 Interactive pattern opportunities

The ink-band interactive UI patterns proposal correctly prioritizes:

| Priority | Surface | Pattern | Why |
|----------|---------|---------|-----|
| P0 | Path screen | Horizontal process accordion | Comparative scan of four stages |
| P0 | Leader band | Card carousel | 17 faces need browse affordance |
| P1 | Readback | Ghost-number spine | Stage placement clarity |
| P1 | Pricing | Accordion columns | Stage-grouped economics |
| P1 | Audience fit | Split role picker | Three org types as lenses |

These are **UI-only upgrades** that would significantly improve information density without violating the charter — especially path and pricing, which are high-intent screens after readback.

---

## 5. AI design assessment

### 5.1 What the agent policy gets right

**Paired speak + show.** Every turn should render something on the wall when possible. This prevents the "helpful paragraph in a void" failure mode of raw chatbots.

**Closed tool repertoire.** The host cannot invent UI. Props are validated. This is essential for a product that sells **judgment and structure**, not open-ended generation.

**Computed verdict, narrated judgment.** Safety placement is not left to model vibes. `computeSafetyVerdict()` in code; diagnostician narrates. This is best-practice agent design for high-stakes recommendations.

**Handoff architecture.** Host → diagnostician via `request_diagnosis` after beat completion separates **facilitation** from **synthesis** — right model/tool split.

**Hybrid classifier.** Regex-first routing respects that most visitor intents map to known product surfaces. LLM is the fallback, not the default.

### 5.2 AI product gaps

**1. Discuss mode is designed but not productized.**

The longest-form engagement path — objections, board dynamics, comparative questions — is behind a feature flag with turn caps and capture handoff. For a product whose thesis is "slow work" and "lead faithfully," keeping Discuss off sends a mixed signal.

**2. Local beat vs engine beat divergence.**

Local `MAP_Q` (4 questions) vs engine `HOST_SCENES.beats` (6 beats). Verdict contract-tested, but the visitor may get different diagnostic depth depending on path. Single SSOT for beat data is overdue.

**3. Static render tools.**

`show_pricing`, `show_founders`, etc. use component fallback copy — agent cannot inject props. The host can show the screen but not personalize it. This limits the "shown back to themselves" promise.

**4. Optional RAG.**

Without `OPENAI_VECTOR_STORE_ID`, host is canon-only. Fine for MVP; limits depth for institution-specific questions.

**5. Session persistence.**

Transcript persistence proposed but not fully productized. Returning visitors restart cold. For a concierge selling relationship, this matters.

**6. Analytics gap.**

`roomContext`, chip labels, Discuss reasons not wired to PostHog. You cannot optimize what you cannot see — especially hybrid routing decisions.

---

## 6. Strategic coherence assessment

### 6.1 The product story is stronger than the preview hygiene

The site audit (2026-06-17) found:

- Preview banner says "not for public distribution" but **robots allow indexing**, sitemap published, no `noindex`
- Legal pages (`/terms`, `/privacy`) — 404
- Legacy redirects may lag deployment
- `/voices` hub 404 live; canonical is `/agent/movement-voices`
- Pricing placeholders in Training/Technology free tiers

These are not design failures, but they **undermine the EEAT posture** the UI is trying to project. A product that sells credibility cannot look half-published.

### 6.2 Capture funnel vs UI polish

The home-page CTAs note (2026-06-10) identified the central business gap:

> Until `submitLead()` posts to a real endpoint, the room collects nothing.

The UI can be beautiful and the agent eloquent; if capture is stubbed, the product is a demonstration, not a funnel. Recommended order still holds:

1. Wire all capture forms to real APIs
2. Wire contact screen to `/api/contact`
3. Re-mount lead-magnet forms on live surfaces
4. Build org-inquiry enrollment → `organizationInquiries`
5. Assessment magic-link front door
6. Cron follow-ups + newsletter result pages

### 6.3 Marketing home vs agent home

`/` redirects to `/agent`. There is no separate marketing home. This is intentional mid-pivot, but it means:

- No page-level secondary CTAs (assessment, field guide) outside the room
- SEO/SSR fallback is minimal (`AgentRoomFallback`)
- Returning visitors who expect a traditional homepage get the concierge immediately

For an agent-first preview, this is coherent. For launch, you will need either a richer SSR fallback or a dual-surface strategy with clear routing rules.

---

## 7. Optimization recommendations

Prioritized as a consultant would hand to a product team — not a committed roadmap.

### Tier 1 — Product truth (do first)

| # | Recommendation | Why |
|---|----------------|-----|
| 1 | **Unify stage naming in all public copy** | Safety·Sandbox·Training·Technology everywhere, or explicit bridge copy; never silent mismatch |
| 2 | **Complete capture plumbing end-to-end** | UI without persistence is theatre; test map/paid/free/discuss/enroll paths in production |
| 3 | **Preview hygiene** | `noindex` on `/agent` until launch-ready; legal pages; fix redirect drift |
| 4 | **Single beat SSOT** | Local MAP_Q and engine beats must converge; one diagnostic depth for all paths |

### Tier 2 — Visitor mental model (high UX leverage)

| # | Recommendation | Why |
|---|----------------|-----|
| 5 | **Explicit dock affordance copy** | One line near composer: "Suggestions open pages · Type to talk" (or equivalent in Movemental voice) |
| 6 | **Resolve regex ambiguity** | Remove bare `about` from first-message table or require word boundaries; document gotcha is a bug |
| 7 | **Screen-first everywhere audit** | Document page chips, Ways-in doors, scene follow-ups — one routing matrix, tested in Playwright |
| 8 | **SSR fallback expansion** | Key screen copy (path, safety flow, about) in `AgentRoomFallback` for no-JS and SEO |

### Tier 3 — Discuss productization

| # | Recommendation | Why |
|---|----------------|-----|
| 9 | **Enable Discuss in staging** | Validate turn-cap → capture → inbox E2E |
| 10 | **Reconcile overlay vs marginalia** | If Discuss ships, decide: full overlay (current) or return toward Model B sheet marginalia for charter fidelity |
| 11 | **Discuss entry chips on readback** | "Keep talking about this" after judgment — explicit trigger before implicit inference |

### Tier 4 — Information design upgrades (UI-only)

| # | Recommendation | Why |
|---|----------------|-----|
| 12 | **Path horizontal accordion (P0)** | Highest-information screen; comparative structure currently hidden in vertical drawers |
| 13 | **Leader carousel (P0)** | Network proof under-sold by one-at-a-time scroll |
| 14 | **Pricing accordion columns (P1)** | Stage-grouped economics aid comparison |
| 15 | **Readback ghost-number spine (P1)** | Clarifies "you are here" after diagnostic |

### Tier 5 — Agent intelligence depth

| # | Recommendation | Why |
|---|----------------|-----|
| 16 | **Dynamic props on render tools** | Let host personalize pricing/founders copy while keeping closed components |
| 17 | **Wire RAG for host** | Corpus-backed answers for institution-specific questions |
| 18 | **Session persistence** | Returning visitors should not restart cold |
| 19 | **Analytics instrumentation** | Chip routes, phase transitions, stall recovery, capture completion — PostHog events with `roomContext` |

### Tier 6 — Architecture hygiene

| # | Recommendation | Why |
|---|----------------|-----|
| 20 | **Deprecate stream mode** | Hybrid is center; reduce test matrix and doc confusion |
| 21 | **Engine-driven safety flow branching** | Align `show_safety_flow` wizard with local `safetyFlow` steps |
| 22 | **Consolidate SSOT docs** | Platform reference + chat UI SSOT + choreography SSOT + dock notes — one index with supersession dates (partially done) |

---

## 8. What I would **not** do

Consultations should include restraint recommendations:

| Avoid | Reason |
|-------|--------|
| Adding a fourth audience card for movement leaders | Violates ecosystem-layer doctrine |
| Bubble-column chat redesign | Breaks Ink Band charter |
| Floating chat widget on document pages | Competes with concierge; document handoff pattern is correct |
| Open-ended screen vocabulary | Closed set is the product |
| Defaulting every pill to agent + expand | Screen-first reversal was correct; don't re-litigate |
| Concept Modern tokens on agent surfaces | Design system leakage |
| Tools-first hero copy | Flattens the diagnosis |
| Discuss without capture handoff | Depth without conversion path wastes LLM spend |

---

## 9. Success criteria — how you'd know it's working

**UX signals:**
- Lead chip → safety flow sheet, zero `/turn` calls (already Playwright-proven)
- About/cost/contact chips → local screens, dock stays collapsed
- Unmatched text → expand + agent reply in thread
- Beat completion → readback with honest verdict (never flattered `past`)
- Discuss (when on) → turn cap → discuss capture → inbox

**Business signals:**
- Capture forms persist to `agent_room_leads`, newsletter, org inquiries
- Assessment completion rate from in-room and `/assess`
- Enroll funnel from safety flow → `/enroll` → paid provisioning

**Brand signals:**
- Visitor can articulate the path order after 3 minutes
- No stage naming confusion in user testing
- EEAT: citations render as editorial highlights; founder bios linkable; legal pages exist

**Technical signals:**
- `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green
- Engine down → hybrid still serves local funnels with stall recovery voice
- `pnpm validate:all` locked across type chain

---

## 10. Closing assessment

Movemental.ai is trying to be something genuinely differentiated: **a fiduciary concierge for AI adoption in mission-driven organizations**, expressed as a manuscript the agent marks up by hand — not a chatbot, not a dashboard, not a marketing funnel with AI lipstick.

The UI design is architecturally mature. Ink Band is a real design system with a metaphor, a chain, a closed vocabulary, and motion grammar. The AI design is equally disciplined: hybrid routing, paired speak+show, computed verdicts, honesty rails, agent handoffs.

The gap between ambition and preview is not primarily aesthetic. It is **operational coherence**:

- Capture must close the loop
- Discuss must ship or stay honestly absent
- Public copy must use one stage language
- Preview must not index as production
- The dock mode switch must be learnable without documentation

If those gaps close, Movemental.ai has a credible shot at being the reference implementation for "how should an organizational AI concierge look and behave" — precisely because it refuses to look like every other AI product.

The docs in `docs/build/notes` already contain most of this diagnosis. The work ahead is less about discovering what to build and more about **finishing the contract the UI and SSOT docs have already signed with the visitor.**

---

## Execution prompts

Tiered agent prompts derived from §7 recommendations:

**[docs/build/prompts/agent-updates/](../prompts/agent-updates/)** — README + [master_runner.md](../prompts/agent-updates/master_runner.md) + AU-01 … AU-22 (paste-ready for Cursor / Claude Code).

---

## Related documentation

| Doc | Topic |
|-----|-------|
| [agent-platform-complete-reference.md](./agent-platform-complete-reference.md) | Full platform SSOT |
| [agent-room-chat-conversation-ui-ssot.md](./agent-room-chat-conversation-ui-ssot.md) | Dock, thread, Guide vs Discuss |
| [agent-room-conversation-choreography-model-ssot.md](./agent-room-conversation-choreography-model-ssot.md) | Caption vs thread invariants |
| [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) | Dock UX + Playwright |
| [agent-room-long-form-discussion-ui.md](./agent-room-long-form-discussion-ui.md) | Discuss design spec |
| [movemental-master-talking-points-index.md](./movemental-master-talking-points-index.md) | Positioning and claims |
| [movemental-site-audit.md](./movemental-site-audit.md) | Live vs source audit |
| [home-page-ctas-capture-and-ai-engagement.md](./home-page-ctas-capture-and-ai-engagement.md) | Capture funnel gaps |
| [ink-band-interactive-ui-patterns-proposal.md](./ink-band-interactive-ui-patterns-proposal.md) | UI pattern upgrades |
| [docs/design/INK_BAND_DESIGN_CHAIN.md](../design/INK_BAND_DESIGN_CHAIN.md) | Visual design canon |
