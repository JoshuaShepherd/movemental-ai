# 01. `/voices` — the movement leader hub

**Status** Not built · **Depends on** Supabase, already wired
**Inbound links** the home page strip ("See who they are"), the editions' credibility line

## Purpose

Pay off the credibility claim the home page makes. A wall of real people the
field already trusts, which resolves into individual profiles. The design-system
guide describes the intent exactly: "a wall of leaders that feels like an archive
that comes alive under attention."

## Read first

- `src/app/voices/page.tsx` and `src/app/voices/opengraph-image.tsx`
- `src/app/agent/movement-voices/page.tsx` — the in-room variant
- `src/lib/agent-room/data/profiles.ts` — verified leader content, and the model
  for what a complete profile contains
- `src/components/agent-room/screen/stub/leader-band.tsx` and
  `leader-carousel.tsx` — how leaders are presented in the room today

## Data — use Supabase, not local copies

Project `vhaiiiykcukrlyvwlgip`, table `public.movement_leaders`:

    select slug, full_name, primary_role, primary_organization,
           bio_short, photo_storage_path, status
    from public.movement_leaders where status = 'active' order by full_name;

Headshots are in the **public** `media-library` bucket. Canonical URL:

    https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/<path>

Prefer `<slug>/headshots/<slug>.webp`. Three exceptions: Liz Rios is
`movemental/voices/liz-rios.webp`, David Docusen is
`david-docusen/david-docusen-portrait.webp`, Michael Cooper and Roy Moran are
`.jpg`. **Jamie Roach has no headshot** — omit him or ship a named placeholder,
never a fake face. 25 leaders have images. Josh Shepherd is a founder, not a
movement leader — he belongs on `/about`, not here.

## Structure

1. **Header** — standard sticky, `Crumb` back to home.
2. **Hero** — `Eyebrow` "Movement voices", a Playfair claim, one paragraph on
   what vouching means here. Keep it short; the faces are the argument.
3. **The wall** — every leader as a `LeaderFace`: square, circle-cropped, sepia
   duotone at rest (`var(--photo-filter)`), full colour on hover, 2px lift with
   the warm shadow. Name in Inter semibold beneath, role in mono beneath that.
   Grid of `minmax(7.5rem, 1fr)`. Alphabetical by `full_name` — archive order,
   not a ranking.
4. **Filter** *(optional, only if it earns itself)* — the roster is 25; a filter
   may be unnecessary. Do not add one for decoration.
5. **The honest note** — four leaders have no bio and roles are empty for all
   but Brian Sanders. Either show name-only cards for those, or omit the role
   line entirely and keep the wall uniform. State the choice in the file header
   comment. Do not write roles on their behalf.
6. **Founders footer link** — "The three behind Movemental" → `/about`.

## Design system

`LeaderFace` for every portrait — do not restyle an `<img>`. `Eyebrow`,
`SectionLabel`, `Crumb`, `InkVoice` for one line of agent voice.

## Interactions

- Portrait hover: sepia resolves to colour over `var(--dur-mid)`, 2px lift.
- Click a face → the profile page (prompt 02). Until 02 exists, link to the
  profile route and note the dependency; do not use `href="#"`.

## Tweaks

`showRoles` (boolean), `sortOrder` (enum: alphabetical / by organization).

## Done when

- Every image loads from the Supabase bucket; zero broken images.
- Portrait treatment matches the guide's duotone-to-colour behaviour.
- No leader is shown with an invented role or a placeholder that reads as real.
- The grid reflows to one column under 480px without clipping names.
