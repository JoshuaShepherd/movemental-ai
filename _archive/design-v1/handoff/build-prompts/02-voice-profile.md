# 02. `/voices/[slug]` — a leader profile

**Status** Not built · **Depends on** 01 (the hub links here)

## Purpose

One movement leader, at depth: who they are, what they have written, why their
endorsement means something. The repo already labels incomplete profiles
honestly — "A fuller profile is coming" — and that pattern must survive.

## Read first

- `src/app/voices/[slug]/page.tsx` — the real route and its params
- `src/lib/agent-room/data/profiles.ts` — **the authority.** Verified per-leader
  content, and the reason not to generate biography. Read a long entry (Rob
  Wegner) and a stub to see both states.
- `src/components/agent-room/screen/stub/leader-*.tsx`

## Data

`public.movement_leaders` carries `full_name`, `primary_role`,
`primary_organization`, `bio_short`, `bio_long`, `personal_piece`,
`research_corpus_slug`, `reflected_understanding_endorsed_at`.

Related tables worth checking before designing the lower half of the page:
`movement_leader_public_pages`, `movement_leader_welcome_letters`, `books`,
`book_endorsements`. Query them; do not assume they are populated.

**`personal_piece` is the most valuable field on the page** — it is the leader in
their own voice. Give it the most typographic weight after the name.

## Structure

1. **Header** with `Crumb` "↑ All voices".
2. **Identity block** — `LeaderFace` at large size, `full_name` in Playfair
   display-lg, role and organization in mono. If `primary_role` is null, show
   nothing there; do not fill the gap.
3. **`bio_short`** as the lede in `var(--body-lg)`.
4. **`personal_piece`** in a bordered sheet with the notebook margin — set it
   apart as a first-person voice, not another paragraph of bio.
5. **`bio_long`** as the reading body, measure capped at 66ch.
6. **Books / endorsements** — only if the tables return rows for this leader.
7. **The stub state** — when `bio_short` and `bio_long` are both null (Bree
   Mills, Daniel Bravo, David Docusen, Jamie Roach): show the identity block and
   a labelled note in the repo's own voice — "A fuller profile is coming." This
   state must be designed, not an accident.
8. **Cross-links** — previous / next leader alphabetically, and back to the hub.

## Design system

`LeaderFace`, `Eyebrow`, `SectionLabel`, `Crumb`, `InkVoice`. Long-form body is
plain Inter at `var(--leading-relaxed)` — do not decorate reading text.

## Interactions

Profile switcher so one file serves all 25 (the same pattern as the audience
editions): a leader picker in the mast, or accept a `slug` prop. **One file, not
25.**

## Tweaks

`slug` (enum or text — which leader is shown), `showStubState` (boolean, to
preview the incomplete case).

## Honesty constraints

- Never generate biography, credentials, book titles, or endorsements. Every
  sentence on this page comes from the database or is omitted.
- `reflected_understanding_endorsed_at` means the leader has endorsed how they
  are described. If it is null, do not present the profile as endorsed.

## Done when

- All 25 leaders render without a broken image or an empty heading.
- The four bio-less leaders show the designed stub state, labelled.
- No text on the page originates from the model.
