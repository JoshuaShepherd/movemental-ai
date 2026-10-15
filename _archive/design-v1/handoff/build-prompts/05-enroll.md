# 05. `/enroll` — the managed Safety sprint signup

**Status** Not built · **Inbound links** the Safety page's Dashboard door, the field guide footer

## Purpose

The one page on the site that takes money. $1,000, two weeks, a managed Safety
sprint ending in a board-ready charter. It must feel like the least pressured
checkout the visitor has ever seen — that is the brand position, not a
flourish.

## Read first

- **`src/app/enroll/page.tsx`** — the existing form, field for field. It is
  already written and already in the right voice; recreate its behaviour, do not
  redesign its logic.
- `src/lib/agent-room/data/pricing.ts` — `PRICING_SAFETY_PAID`
- `src/lib/agent-room/data/safety-flow.ts` — `SAFETY_FLOW_SIGNUP_COPY`, which
  carries the no-urgency line worth featuring
- `src/lib/agent-room/data/safety-dashboard.ts` — what the two weeks actually
  contain

## The form, as the repo defines it

Four sections, in this order:

1. **Name** — full name
2. **Individual information** — email, "When do you want to start?"
   (Now / This quarter / This year / Just exploring)
3. **Organizational information** — organization, type (Church / Nonprofit /
   Institution / Network or denomination / Other), team size (1–5 / 6–20 /
   21–50 / 51–200 / 200+), budget range *(optional)*, and "Where your
   organization stands with AI" as a textarea with the placeholder "A sentence
   or two is plenty."
4. **Stripe payment** — a bordered panel stating **$1,000 · two weeks, start to
   finish · managed Safety sprint**, and that a team member confirms enrollment
   and sends a Stripe link. Payment is **not** collected on this page.

Submit: "Get started with the dashboard · $1,000". Fine print: "No autoresponder
runaround, a person on our team picks this up."

Validation, verbatim in behaviour: name, email, organization, and the context
sentence are required; the error is "Fill in your name, email, organization, and
a sentence of context."

Success state: `StepSpine` shows "Got it, <first name>." then the provisioning
copy — 24 hours, a magic link, and the honest caveat that dashboard access is
not immediate on submit.

## Structure

1. **Header** with `Crumb` "↑ Safety".
2. **Step spine** — mono "Step 01 · Safety · With us" and the Playfair title.
3. **What the two weeks contain** — four `PathLayer` or numbered rows from
   `safety-dashboard.ts`: we research your organization; we draft all five
   documents in your context; you review and adjust; you end with a ratified
   charter your board can sign.
4. **The form**, as above, sections separated by mono `SectionLabel` headings.
5. **The no-urgency block** — feature this line from `SAFETY_FLOW_SIGNUP_COPY`:
   "No urgency. No scarcity. No spots filling fast. If any of that ever shows up
   in how we treat you, you should trust us less."
6. **Prefer to talk first?** — mailto escape hatch, given equal visual weight to
   the submit. Someone not ready should not feel funnelled.

## Design system

`Button` (primary) for submit, `SectionLabel` for section headings, `Eyebrow`,
`Crumb`, `PathLayer`, `InkVoice` for one line. Inputs are token-styled directly
— the system has no input primitive; use `var(--surface-card)`,
`var(--border-hairline)`, `var(--radius-md)`, and `var(--ink)` on focus with an
`var(--focus-ring)` outline.

## Interactions

Real validation and a real success state. **There is no backend in the
prototype** — say so in the file header comment, and do not add copy claiming an
email was sent beyond the repo's own success text.

## Tweaks

`showSuccessState` (boolean, to preview the confirmation), `stripeCopyVisible`
(boolean).

## Honesty constraints

- No countdown, no "3 spots left", no scarcity of any kind. The page's own copy
  forbids it.
- Do not add social proof, logos, or testimonials that do not exist.
- Budget range stays optional and unpressured.

## Done when

- Every field, option list, and validation message matches the repo.
- The success state is reachable and shows the 24-hour provisioning caveat.
- "Prefer to talk first?" is as easy to find as the submit button.
- The no-backend limitation is documented in the file.
