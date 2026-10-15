# Audience pages — handoff and receipt

Slice `S08-audience-new`. Boards (designed October 15, 2026 from the audience proposal, Institutions first): `source/Audience-Institutions.dc.html`, `Audience-Churches.dc.html`, `Audience-Nonprofits.dc.html`. They replace the archived `Audience.dc.html`, which still used the four steps.

## What was built

- `/institutions-new`, `/churches-new`, `/nonprofits-new`, one component: `src/components/mv/audience/audience-page.tsx`.
- `src/components/mv/audience/audiences.ts`, generated from the same source as the boards.
- `MV_ROUTES.churches`, `.nonprofits`, `.institutions`; the Map's "The same method, in your language" now links here.

## One section system, three voices

Hero · the situation already unfolding · the questions the page does not answer · two ways to begin (Resolution, Reality Assessment, and the note that a Resolution is not policy) · the five stages applied, with the five decisions and an example refusal in Build · possible applications (concepts) · leaders · the invitation. Institutions adds shared commitments beside local decisions and the network model; Nonprofits adds "Efficiency creates choices".

## Fixture seam

| Surface | State |
|---|---|
| Possible applications | Labeled placeholders and "Possible applications, shown as concepts" |
| Network diagram | Labeled "Concept"; "how the network offer is structured is still being decided" |
| Nonprofit before/after (six hours to two) | Labeled "Illustrative. We don't project savings or returns for any organization." |
| Leaders shown | Four per page, from the leader data |

## Removed from the board for the live page

The board's "[To confirm: which leaders appear on this page, and that each has agreed to.]" note. It stays an open question here.

## Open questions

1. Which leaders appear on each page, and their agreement to it.
2. Whether to keep the illustrative before/after figures.
3. Main navigation: the boards show "Work with us" in place of About; `MvHeader` still shows About.

## Gates

typecheck, lint, link:check pass; no color literals in `.tsx` (one found in S07's results page and fixed here); all three pages return 200 with no horizontal scroll at 1,440px and 390px. These routes were previously caught by legacy redirects, removed in S07.
