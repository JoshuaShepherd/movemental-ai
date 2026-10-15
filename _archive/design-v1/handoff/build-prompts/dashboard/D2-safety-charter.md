# D2. `/dashboard/safety` — the charter

**Status** Built — the `charter` screen of `Movemental Dashboard.dc.html` · **The centre of the product**

## Purpose

One job: **get five documents from drafted to ratified.** Everything else on this
screen is secondary to that, and anything that does not serve it should be cut.

## Read first

- `src/lib/services/safety/charter-dashboard.ts` — `CharterDashboardPayload`,
  `CharterLayerPayload`, and the derivation of `layersComplete` /
  `overallStatus`
- `src/lib/services/safety/provision-safety-org.ts` — what exists on first login
- `src/lib/agent-room/data/safety-charter.ts` — the five layers as the public
  pages state them, with their threat lines and affirmations
- `Movemental Safety Stage.dc.html` — the public five-layer treatment to match

## The state model, exactly

Two artifact states: `draft` and `published`. Nothing else. A layer is
"complete" when its latest version has a non-empty `body_md` — which means
**written, not approved**. Those are different things and the design must not
blur them:

- **Written** — there is text. True on day one for all five, because
  provisioning inserts version 1.
- **Published** — a ratification row exists for a specific version.

So the honest progress reading is two numbers, not one bar: how many layers have
been *revised by you*, and how many have been *ratified*. A single "3 of 5"
conflates them and overstates progress on day one, when five of five are already
"complete" and none has been read by a human.

## Structure

1. **The five layers as the path.** `PathLayer` rows, 01–05, in the fixed order:
   Statement · Policy · Context · Rules · Response Plans. Each shows its formal
   document name (AI Use Statement, Acceptable Use Policy, Organizational
   Context, Operating Rules, Incident Response) and its state.
2. **State as border, not badge.** The design system's own rule: emphasis is a
   `var(--ink)` border, not a coloured fill. Published layers take the ink
   border. Draft layers keep the hairline. No status pills.
3. **The overall line** — `"Draft, {n} of {m} layers complete"` verbatim, plus
   the ratified count as a separate, quieter figure.
4. **What happens next** — one sentence naming the actual next action, derived
   from state: read the drafts, revise a layer, or ratify. Not a checklist of
   generic tips.
5. **The promise, restated once** — from `safety-dashboard.ts`, verbatim:
   "In two weeks: a complete, board-ready Safety charter. Five documents, drafted
   in your organization's own context, ready to ratify." This is the contract the
   screen is keeping; state it once, near the top, and never again.
6. **Board readiness** — when all five are published, the charter becomes a thing
   to export, share and publish. Design that as an outcome, not a confetti moment.

## Design system

`PathLayer`, `SectionLabel`, `Eyebrow`, `WayCard` only if a genuine fork
appears, `InkVoice` at most once. Reuse the marker sticky-note treatment from the
public Safety page for "what's missing" on an unrevised layer.

## Tweaks

`progressState` (enum: fresh / partway / all-ratified), `showChecklist`
(boolean, and only if question 2 in the index resolves in its favour).

## Honesty constraints

- Do not invent an "in review" state. It is not in the schema.
- Do not show five-of-five complete on day one as though it were achievement.
  It is the starting position, and saying so is the honest design.
- No streaks, no percentages that imply precision the data lacks.

## Done when

- Written and ratified are visibly different things.
- The day-one state reads as "here is your draft" and not "you are done".
- The five layers match the public page's vocabulary exactly.
