# Agent room — suggestion pills inventory and recommendations

**Created:** 2026-06-10  
**Purpose:** Document every visitor-facing screen in `/agent`, the tappable “pills” (suggested chat topics) available on each, and a recommended set aligned with Ink Band design constraints and the SSSS conversion flow.

**Sources of truth (code):**

- Composer chips (floor): `src/lib/agent-room/data/scenes.ts`, `leader-scenes.ts`, `beat-scenes.ts`
- Stream fallback chips: `src/components/agent-room/composer.tsx` → `DEFAULT_SUGGESTIONS`
- Beat answer options: `src/lib/agent-room/data/map-q.ts`
- In-screen chips (form / links): `contact-screen.tsx`, `safety-screen.tsx`, stream `readback.tsx` forks
- Design contract: `docs/design/INK_BAND_DESIGN_CHAIN.md` (`.chip`, `.chip.lead`, composer layout)
- Engine cap: `suggest_chips` tool, **max 4 chips per turn** (`movemental-ai-agents`, INT-05)

---

## 1. What counts as a “pill”

The room uses three related patterns. This doc covers all of them because visitors experience them as the same affordance — tap to continue.

| Pattern | CSS / location | Role |
|--------|----------------|------|
| **Composer suggestion chips** | `.composer .sugg .chip` | Things to *say* to the agent; one may be `.chip.lead` (highlighter). Hidden on `beat` screens. |
| **Beat answer options** | `.opts .opt` | Three answers per reality-check question; these *are* the interaction on `beat`. |
| **In-screen chips** | `.cchip`, `.chip` links, `.forkBtn` | Form topic pickers, static CTAs on a sheet, or stream readback forks — not in the composer row. |

**Discuss mode** (`NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`): composer chips disappear; a multi-line textarea replaces the single-line input. Consent and exit use dedicated copy, not pills.

---

## 2. Design and flow constraints

### 2.1 Hard limits

- **Max 4 composer chips per turn** in stream/hybrid AGENT turns (`suggest_chips` enforces this). Stub mode does not enforce the cap locally — several scenes currently offer **5–6 chips**, which is a stub/stream parity gap.
- **Exactly one `.chip.lead`** when possible — the highlighter draws the eye; multiple leads dilute it.
- **Beat screens hide composer chips** — only the three `.opt` buttons (+ optional typed answer) apply. Placeholder rotates to *“Tap an answer above, or type your own…”*.
- **Composer is a single horizontal wrap row** on a fixed floor — on narrow viewports, **more than four chips wrap to a second line** and compete with the input for vertical space.

### 2.2 Overarching story (what pills should optimize for)

Movemental’s room is not a generic chatbot menu. It is a **guided path**:

1. **Orient** — name trust + ordered path (home / about).
2. **Diagnose** — six-question reality check (`toBeat` → readback). This is the primary free conversion.
3. **Place** — readback names where they are; Safety is almost always step one.
4. **Commit** — free field guide, paid facilitation ($1,000), contact, or Discuss.

Pills should **pull toward diagnosis first**, then Safety, then human contact — not offer six equal exits on the opening screen. Informational chips (FAQ, founders, pricing) are **browse**, not co-equal with the lead.

### 2.3 Recommended chip budget by moment

| Moment | Target count | Lead should point to |
|--------|--------------|----------------------|
| Cold open (home) | **3–4** | Reality check (`beatIntro` → `toBeat`) |
| After informational screens | **3–4** | Same diagnostic lead |
| Mid-diagnostic (beat) | **3 opts only** | (no composer chips) |
| Post-readback | **3–4** | Safety or map capture follow-through |
| Safety / pricing decision | **3–4** | Paid or free Safety path |
| Contact / capture | **0–2** composer + in-form topics | Submit form, not more browsing |
| Discuss consent | **2** | Yes / Stay (fixed pair) |

---

## 3. Screen-by-screen inventory

For each view: **screen shown**, **composer pills (current)**, **in-screen pills (current)**, **recommendation**.

Legend: **→** = routes to scene or action. `(lead)` = `.chip.lead`.

---

### 3.1 Home — `opening` · screen: `home`

**What the visitor sees:** Eyebrow, trust headline, body copy, leader portrait band (17 faces — tap opens `leaderScene`, not a composer pill).

**Composer pills (current — 6):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Get a clear next AI step | `beatIntro` → `toBeat` |
| 2 | About Movemental | `whatIs` |
| 3 | Who’s behind this? | `whoBehind` |
| 4 | What does it cost? | `cost` |
| 5 | Read the FAQ | `toFaq` |
| 6 | Get in touch | `talkToUs` |

**In-screen pills:** None (leader band uses portrait taps).

**Recommendation — reduce to 4, reorder for funnel:**

| # | Label | Routes to | Rationale |
|---|--------|-----------|-----------|
| 1 (lead) | Get a clear next AI step | `beatIntro` | Unchanged — this *is* the product on-ramp. |
| 2 | About Movemental | `whatIs` | Low-friction orient; keeps “what is this?” off the lead. |
| 3 | What does it cost? | `cost` | High-intent browse; answers objection before they ask in free text. |
| 4 | Get in touch | `talkToUs` | Human exit for already-decided visitors. |

**Drop from opening:** “Who’s behind this?” and “Read the FAQ” — still reachable via regex routing (*who*, *faq*) and from downstream scenes. Opening at six chips feels like a **nav menu**, not a host offering the next move; it also **breaks the engine’s four-chip cap** in stream mode.

**Optional fourth browse chip** (if contact feels too salesy on cold open): swap slot 4 to **Read the FAQ** and drop **Get in touch** — but prefer contact over FAQ on home because FAQ is long-form reference, not a first-move.

---

### 3.2 Beat intro — `beatIntro` · no new screen

Transitional voice-only bridge before the diagnostic. Shown on the current sheet (often still `home` visually).

**Composer pills (current — 1):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Okay, map it | `toBeat` |

**Recommendation:** Keep as-is. One chip is correct — permission, then act.

---

### 3.3 Reality check — `toBeat` + `beatScene` · screen: `beat` (×6)

**Composer pills:** **Hidden** (beat placeholder only).

**In-screen options (current — 3 per question, 6 questions):**

| Q# | Question (summary) | Options |
|----|-------------------|---------|
| 1 | Tried AI on real work? | Yes with results · A little · Not really |
| 2 | Board written AI position? | Yes ratified · Talked · Nothing yet |
| 3 | Inventory of AI tools + data? | Yes inventory · Some · Honestly no |
| 4 | Staff readiness for AI? | Mostly confident · Real mix · Anxious/untrained |
| 5 | Norms if colleague used AI undeclared? | Have norms · Unspoken · Never discussed |
| 6 | Work systems ready for AI? | Unified · Scattered · Fragmented |

**Recommendation:** Options are fine — three is the design pattern (`.opt` stagger). Do **not** add composer chips mid-beat. If anything changes here, it is **question order or copy** in `map-q.ts`, not pill count.

---

### 3.4 Readback — `beatScene` (final) · screen: `readback`

After Q6, capture gate (`kind: map`) runs on-sheet before chips return.

**Composer pills (current — 4, post-capture):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Show me Safety | `toSafety` |
| 2 | What comes after Safety? | `toPath` |
| 3 | Talk through what this means for us | `toDiscuss` |
| 4 | ↺ Start over | `opening` |

**In-screen (stream mode only):** Diagnostician may render **fork buttons** (`.forkBtn`) with agent-composed labels — not stub-pinned.

**Recommendation — keep 4; tighten order and Discuss gating:**

| # | Label | Routes to | Rationale |
|---|--------|-----------|-----------|
| 1 (lead) | Show me Safety | `toSafety` | Verdict → first step on path; matches copy. |
| 2 | What comes after Safety? | `toPath` | Secondary educate for planners. |
| 3 | Get in touch | `talkToUs` | Human handoff at peak intent — **replace generic Discuss chip** unless `DISCUSS` flag is on. |
| 4 | ↺ Start over | `opening` | Escape hatch. |

Move **Talk through what this means for us** to Discuss consent flow only (or show when Discuss flag enabled). At readback, Discuss competes with Safety — the highest-value next step.

---

### 3.5 About — `whatIs` · screen: `about`

**Composer pills (current — 4):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Map where we actually stand | `toBeat` |
| 2 | See the whole path | `toPath` |
| 3 | Who’s behind this? | `whoBehind` |
| 4 | Get in touch | `talkToUs` |

**Recommendation:** Keep 4. Strong convergence on diagnostic lead. Consider swapping slot 3 to **What does it cost?** (pricing is a common follow-up after “what is this?”) and drop founders here — founders is reachable from home regex / a future about-body link.

---

### 3.6 Pricing — `cost` · screen: `pricing`

**Composer pills (current — 5):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Map where we actually stand | `toBeat` |
| 2 | See the whole path | `toPath` |
| 3 | Read the FAQ | `toFaq` |
| 4 | We can’t do either option yet — discuss? | `toDiscuss` |
| 5 | Get in touch | `talkToUs` |

**Recommendation — cut to 4:**

| # | Label | Notes |
|---|--------|-------|
| 1 (lead) | Map where we actually stand | Price objection → prove fit via diagnostic. |
| 2 | See the whole path | Context for what they’re buying into. |
| 3 | Get in touch | Direct human for budget holders. |
| 4 | Start with Safety (free) | **New copy** → `toSafety` instead of Discuss chip — ties price page to concrete first step. |

Drop FAQ (downstream) and Discuss-on-pricing (too early; use contact or Discuss offer after repeated free text).

---

### 3.7 FAQ — `toFaq` · screen: `faq`

**Composer pills (current — 4):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Map where we actually stand | `toBeat` |
| 2 | What does it cost? | `cost` |
| 3 | Get in touch | `talkToUs` |
| 4 | ↺ Start over | `opening` |

**Recommendation:** Keep — good post-reference convergence. FAQ jump links on-sheet are accordion, not pills.

---

### 3.8 Founders — `whoBehind` · screen: `founders`

**Composer pills (current — 3):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | I want simple next steps | `toBeat` |
| 2 | About Movemental | `whatIs` |
| 3 | Talk to us | `talkToUs` |

**Recommendation:** Keep 3. Optionally rename lead to **Map where we actually stand** for label consistency across scenes.

---

### 3.9 Contact — `talkToUs` · screen: `contact`

**Composer pills (current — 3):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Map where we actually stand | `toBeat` |
| 2 | About Movemental | `whatIs` |
| 3 | ↺ Start over | `opening` |

**In-screen topic pills (current — 4, form `.cchip`):**

| # | Topic |
|---|--------|
| 1 | Exploring whether this fits |
| 2 | Starting with Safety |
| 3 | Pricing or an engagement |
| 4 | Something else |

**Recommendation:**

- **Composer:** Reduce to **2** on contact — `(lead) Map where we actually stand` + `↺ Start over`. Visitor already chose contact; don’t offer three alternate tours.
- **Form topics:** Keep 4 — appropriate for CRM routing. Reorder to match funnel: **Starting with Safety** first default selection (index 0), then Exploring fit, Pricing, Something else.

---

### 3.10 Path — `toPath` · screen: `path`

**Composer pills (current — 3):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | I want simple next steps | `toBeat` |
| 2 | Our situation is more complicated than this | `toDiscuss` |
| 3 | What does it cost? | `cost` |

**Recommendation:** Keep 3. Rename lead to **Map where we actually stand**. Keep Discuss only if flag enabled; else swap slot 2 for **Show me Safety** (`toSafety`) — path viewers often want the first stage, not open chat.

---

### 3.11 Safety — `toSafety` · screen: `safety`

**Composer pills (current — 5):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Have us do it · $1,000 | `withUs` |
| 2 | Walk it free | `onOwn` |
| 3 | What’s an AI charter? | `charter` |
| 4 | What’s involved? | `involved` |
| 5 | I have a specific policy question | `toDiscuss` |

**In-screen link chips (current — 2):**

| Label | Target |
|--------|--------|
| Get the free field guide → | `/field-guide` |
| Set up my dashboard → | `/enroll` |

**Recommendation — composer cut to 4:**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Have us do it · $1,000 | `withUs` |
| 2 | Walk it free | `onOwn` |
| 3 | What’s involved? | `involved` |
| 4 | I have a policy question | `toDiscuss` or `talkToUs` |

Merge charter explain into **involved** voice scene or FAQ — charter + involved are redundant entry points. **In-screen links:** keep both; they are the honest “two ways in” the sheet describes.

**Sub-scenes `charter` / `involved` (voice-only, current — 2 chips each):**

- Both offer: `(lead) Have us do it · $1,000` · `Walk it free`  
- **Recommendation:** Keep 2 — correct decision fork after explainer.

---

### 3.12 Capture — `withUs` / `onOwn` / map / discuss · screen: `capture`

**Composer pills:** None while form is active (await gate).

**In-screen:** Email/org fields + submit; map variant has skip-to-Safety affordance.

**Recommendation:** No composer pills during capture. Post-submit chips live on confirm scenes below.

---

### 3.13 Confirm — `withUs` / `onOwn` / discuss · screen: `confirm`

**Composer pills after paid capture (`withUs`, current — 2):**

| Label | Routes to |
|--------|-----------|
| Talk to Josh | `talkToUs` |
| ↺ Start over | `opening` |

**Composer pills after free capture (`onOwn`, current — 2):**

| Label | Routes to |
|--------|-----------|
| Have us do it instead · $1,000 | `withUs` |
| ↺ Start over | `opening` |

**Recommendation:** Keep 2 each — appropriate upsell / human touch without clutter.

---

### 3.14 Leader profile — `leaderScene(i)` · screen: `leader`

**Composer pills (current — 4 with profile, 3 without):**

*With profile:*

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | I want simple next steps | `toBeat` |
| 2 | What does {first} work on? | `leaderWork` |
| 3 | How is {first} connected? | `leaderConnect` |
| 4 | Back to the leaders | `opening` |

**Recommendation:** Keep 4 — at cap, balanced (trust proof → diagnostic). Rename lead to **Map where we actually stand**.

**`leaderWork` / `leaderConnect` follow-ups:** 2–3 chips each, always including diagnostic lead + back — **no change needed**.

---

### 3.15 Discuss offer — `discussOffer` · no dedicated screen

**Composer pills (current — 2):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Yes, talk it through | `toDiscuss` |
| 2 | Stay on the guided path | `toBeat` |

**Recommendation:** Fixed pair — do not add chips.

---

### 3.16 Discuss capture — `toDiscuss` · screen: `capture` (kind: discuss)

**Composer pills after submit (current — 2):**

| # | Label | Routes to |
|---|--------|-----------|
| 1 (lead) | Map where we actually stand | `toBeat` |
| 2 | ↺ Start over | `opening` |

**Recommendation:** Keep 2.

---

### 3.17 Discuss mode · overlay composer

**Composer pills:** None — textarea + “back to the guided path” + replay.

**Recommendation:** Intentionally pill-free; open conversation is the mode.

---

### 3.18 Stream / hybrid fallback — before agent `suggest`

When the engine has not yet emitted chips, stream mode shows **`DEFAULT_SUGGESTIONS`** — same six labels as `opening` (`composer.tsx`). Hybrid LOCAL opening uses full stub `opening` scene (also six).

**Recommendation:** Collapse `DEFAULT_SUGGESTIONS` to match the **recommended home set (§3.1)** so stub, hybrid, and stream agree.

---

## 4. Cross-scene label consistency

Several scenes use different lead copy for the same destination (`toBeat`):

| Current variants | Recommended single label |
|------------------|-------------------------|
| Get a clear next AI step | **Keep on home only** (invitational) |
| Map where we actually stand | **Default lead elsewhere** |
| I want simple next steps | Retire — merge to “Map where we actually stand” |

One invitational phrase on cold open; one diagnostic phrase everywhere else — reduces cognitive load and makes regex + chip routing easier to maintain.

---

## 5. Priority implementation order

If changing pills in code:

1. **`opening` + `DEFAULT_SUGGESTIONS`** — biggest UX win (six → four on home).
2. **`cost` + `toSafety`** — trim fifth chips to satisfy engine cap and mobile layout.
3. **`talkToUs` composer** — two chips on contact.
4. **Readback post-capture** — Discuss chip conditional on feature flag; prefer contact or Safety.
5. **Label normalization** — `scenes.ts`, `leader-scenes.ts`, `beat-scenes.ts`, `composer-routing.ts` stream routes.

Files to edit: `src/lib/agent-room/data/scenes.ts`, `src/components/agent-room/composer.tsx` (`DEFAULT_SUGGESTIONS`), `src/lib/agent-room/composer-routing.ts`, `src/lib/agent-room/leader-scenes.ts`, `src/lib/agent-room/beat-scenes.ts`, and (for form default) `contact-screen.tsx`.

---

## 6. Summary table (current vs recommended counts)

| View / scene | Screen | Composer pills now | Composer rec. | In-screen pills |
|--------------|--------|-------------------|---------------|-----------------|
| Home | `home` | 6 | **4** | Leader taps |
| Beat intro | — | 1 | 1 | — |
| Beat ×6 | `beat` | 0 | 0 | 3 opts each |
| Readback | `readback` | 4 | 4 (swap Discuss) | Stream forks |
| About | `about` | 4 | 4 | — |
| Pricing | `pricing` | 5 | **4** | — |
| FAQ | `faq` | 4 | 4 | Accordion |
| Founders | `founders` | 3 | 3 | — |
| Contact | `contact` | 3 | **2** | 4 form topics |
| Path | `path` | 3 | 3 | Drawer UI |
| Safety | `safety` | 5 | **4** | 2 links |
| Charter / Involved | — | 2 each | 2 each | — |
| Leader | `leader` | 3–4 | 4 | — |
| Discuss offer | — | 2 | 2 | — |
| Discuss done | — | 2 | 2 | — |
| Confirm paid/free | `confirm` | 2 | 2 | — |

**Bottom line:** The home page feels “off” because it presents **six parallel exits** where the design system and engine assume **four max**, and because informational chips are weighted equally with the diagnostic lead. Tighten cold open to four, converge every informational screen back to **Map where we actually stand**, and reserve Discuss/contact for high-intent moments (readback, pricing objection, Safety policy questions) — not the first screen.
