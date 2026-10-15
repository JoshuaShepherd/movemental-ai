# /leaders-new — handoff and receipt

Slice `S05-leaders-new`. Boards: `source/Leaders.dc.html`, `source/Leader-Profile.dc.html`.

## What was built

- `src/app/(new)/leaders-new/page.tsx` and `[slug]/page.tsx` (26 statically generated profiles; unknown slugs 404).
- `src/components/mv/leaders/leaders.ts` (data) and `leaders-views.tsx`.
- `MV_ROUTES.leaders` → `/leaders-new`; `leaderHref(slug)` → `/leaders-new/[slug]`. The home page network's "View profile →" now opens the leader shown.

## Data

From `movement_leaders` and `v_tenant_hosts` (Supabase `vhaiiiykcukrlyvwlgip`), October 15, 2026. 26 leaders; Jamie Roach and Natasha Nikkel excluded for now. Ordered by family name, as on the board. Each profile links to the leader's custom domain where one exists (alanhirsch.com, bradbrisco.org, drmichaelcooper.com), otherwise their `*.movemental.ai` host. Snapshot in code; `TODO(back-end merge)` to read it live.

## What a profile shows, and why

The table's `bio_short` and `bio_long` are research notes for most leaders (markdown, inferred birth years, "by his own telling"), and none are endorsed (`reflected_understanding_endorsed_at` is empty for everyone). So:

- **Every profile:** headshot, the canvas-approved credential (none where the board had "[Credential]": Daniel Bravo, David Docusen, Debra Hirsch, Bree Mills), name, the link to their site, and "hasn't published a Resolution yet".
- **Brian Sanders only** (the one curated profile, with `personal_piece`): his bio, his quote and his work, verbatim from the database and the board.

Left out until there is real content: "Why he's in the network" and "Invited by" (board placeholders), "What he's practicing" (placeholder), and "Who he works alongside" (the flow document allows only verified relationships, and none are recorded).

## Deviations

- Section headings use "Their" ("Their Resolution", "Their work") instead of "His", so one template serves everyone. Brian's quote keeps "Brian, in his own words".
- The no-Resolution line reads "[Name] hasn't published a Resolution yet. When one is published, it will appear here."
- "How Movemental began with these leaders' work" goes to the home page's About section until `/story` exists (`TODO(S09-about-new)`).

## Open questions

1. Approved short bios for the other 25 leaders, and who approves them.
2. Credentials for Daniel Bravo, David Docusen, Debra Hirsch and Bree Mills.
3. Whether every `*.movemental.ai` host is live enough to link from the public site.

## Gates

typecheck, lint, link:check pass; no color literals; `/leaders-new` and three profiles (one curated, one pair, one with no credential) return 200 with no horizontal scroll at 1,440px and 390px. Every network leader's slug has a profile. Headshots could not load in the build sandbox (no route to Supabase storage); paths match `photo_storage_path`.
