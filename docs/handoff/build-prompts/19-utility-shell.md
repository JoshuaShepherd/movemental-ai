# 19. The utility shell — one template, twenty-plus routes

**Status** Not built · **Covers** auth, newsletter, legal, invites

## Purpose

Most of the remaining routes are not design problems individually — they are one
design problem applied twenty times. Build a single utility shell as one DC with
a screen switcher, and every one of these routes inherits it.

The repo already has this abstraction: `InkBandUtilityShell`,
`UtilityPageCrumb`, `UtilityPageFooter`, and `StepSpine`. **Recreate that shell,
do not invent a new one.**

## Read first

- `src/components/ink-band/utility-shell.tsx`
- `src/components/ink-band/utility-page-nav.tsx` — `UtilityPageCrumb` and
  `UtilityPageFooter`
- `src/components/ink-band/step-spine.tsx` — the mono step label plus Playfair
  title pattern used across every utility page
- `src/app/assess/page.tsx` — the cleanest existing example of the shell in use
- Then read each route below for its specific copy.

## Routes covered

**Auth** — `/login`, `/signup`, `/forgot-password`, `/auth/update-password`,
`/welcome`, `/team-invite/[token]`, `/agent/invite`
**Newsletter** — `/newsletter/confirmed`, `/newsletter/unsubscribed`
**Legal** — `/privacy`, `/terms`, `/cookies`
**Entry** — `/assess` (the magic-link front door; distinct from the Reality Map
already built, which is the assessment itself)

## The shell

1. **Header** — standard sticky, wordmark, `Crumb`.
2. **A single centred column**, `max-width: 36rem`, generous top padding.
3. **Step spine** — mono eyebrow (e.g. "Free · Map your AI reality", "Step 01 ·
   Safety · With us") above a Playfair title. This is the utility pages' one
   consistent identity element.
4. **The lede** in `var(--body-lg)`.
5. **The form or the body**, token-styled inputs, one `Button` primary.
6. **Fine print** in `var(--body-sm)`, `var(--text-body)` — and honest. The
   repo's own examples: "No password. The link signs you in and drops you
   straight into the room." / "One email with the Handbook. No drip campaign, no
   sales sequence."
7. **Utility footer** — back to the agent room · set up your dashboard ·
   questions? (mailto), mono, hairline rule above.

## Legal pages

`/privacy`, `/terms`, and `/cookies` have real content in the repo (1877–2992
bytes each). They are reading documents: same shell, wider measure (66ch),
Playfair section headings, Inter body, notebook margin. **Lift the legal text
verbatim — never paraphrase, summarize, or "clarify" it.** If it is long, add a
table of contents; do not cut it.

## Design system

`Crumb`, `Eyebrow`, `SectionLabel`, `Button`, `FaqItem` for legal sub-sections.
Inputs styled from tokens with `var(--ink)` borders and an `var(--focus-ring)`
outline on focus.

## Interactions

Real validation per form. **No backend exists in the prototype** — document that
in the file header and design the success state as a state, not a promise the
page cannot keep.

## Tweaks

`screen` (enum listing every route above) so one file previews all of them.

## Honesty constraints

- Do not invent legal language. Ever. Copy it or leave the section out.
- Auth error messages come from the repo where they exist.
- Success states must not claim an email was sent if nothing sends.

## Done when

- One file renders every route above through its switcher.
- Legal text is verbatim.
- Every form validates, and every success state is reachable for preview.
- The step spine and utility footer are identical across all screens.
