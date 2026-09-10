# D5. Onboarding — both routes are holding pages

**Status** Built — the `onboarding` and `onboarding-leader` screens of
`Movemental Dashboard.dc.html`

## What the routes actually are

This prompt assumed `onboarding_tasks` and `onboarding_responses` drove a
one-question-per-screen flow with `BeatDots` progress. They do not. Both routes
were read, and both are holding pages:

- `/dashboard/onboarding/[step]` — auth check, then "This step is coming soon",
  the step slug echoed back, and three links: welcome checklist, then either
  Safety enrollment (when the step is `payment` or `agreement`) or the dashboard,
  plus "Talk to Movemental". Its own comment: *"keeps email deep links alive
  until the full checklist ships from archive."*
- `/dashboard/onboarding/leader/[step]` — the same shape, two links, and the
  copy "Leader onboarding for {step} will return on a future release."

Neither reads any onboarding table. There is no step list to enumerate, no
progress to show, and no questions to ask.

## What was built

The holding pages, verbatim, in the brand's own typography — including the
conditional Safety-enrollment link on payment steps. That is the honest design
while the checklist is unshipped, and it matches how `/program` was handled in
the public set.

The prompt's own rule applied and held: *"Do not design from the route names."*
Had this been drawn from the name alone, it would have been an entire step flow
over a page that does not exist.

## To unblock a real flow

Someone needs to decide what onboarding asks and record it in
`onboarding_tasks`. Until then there is nothing to design. When it exists, the
pattern in this prompt still stands: one question per screen, `BeatDots` on the
real step count, `OptionButton` selection, a read-back at the end, and a resumed
state as well as a fresh one.
