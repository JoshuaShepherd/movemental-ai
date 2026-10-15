# `-new` migration state

Governing prompt: [docs/build/prompts/canvas-to-react-new.md](docs/build/prompts/canvas-to-react-new.md). Design charter: [docs/design/MV_DESIGN_CHARTER.md](docs/design/MV_DESIGN_CHARTER.md).

## Pages

| Slice | Route | Board source | Status | Gates |
|---|---|---|---|---|
| S01 | `/home-page-new` | `docs/handoff/home-page-new/source/Home-v3.dc.html` | Done | typecheck, lint, link:check, no color literals, 200 at 1440 and 390 |
| S02 | `/resolve-new`, `/document`, `/people`, `/others`, `/r/[token]` | R3-Flow, R4-Result, R4-People, R3-Others, R3-Shared, R3-States | Done (front end only) | typecheck, lint, link:check, no color literals, walkthrough at 1440 and 390 with no horizontal scroll |
| S03 | `/map-new` | Respond, Respond-Step | Not started | |
| S04 | `/guidebook-new` | Guidebook | Not started | |
| S05 | `/leaders-new`, `/leaders-new/[slug]` | Leaders, Leader-Profile | Not started | |
| S06 | `/work-with-us-new` | Not yet designed | Not started | |
| S07 | `/assessment-new` | Assessment | Not started | |
| S08 | `/churches-new`, `/nonprofits-new`, `/institutions-new` | Audience | Not started | |
| S09 | `/about-new` | LongForm | Not started | |

## Check-and-branch outcomes (S01)

| Capability | Present? | Path taken |
|---|---|---|
| `/resolve-new` | Yes (S02) | `MV_ROUTES.resolve` repointed |
| `/map-new` | No | `MV_ROUTES.map` and `respondBegin` point to `/home-page-new#respond`; `TODO(S03)` |
| Leader profile route | No | `/voices`; `TODO(S05)` |
| Inquiry form | No | `/enroll`; `TODO(S06)` |
| Guidebook route | `/field-guide` | Linked; `TODO(S04)` |
| Assessment route | `/assess` | Linked |
| Proof screenshots | No | Labeled placeholders |

## Check-and-branch outcomes (S02)

| Capability | Present? | Path taken |
|---|---|---|
| Resolution storage or service | No (`src/lib/services`, `src/hooks` have none) | Device storage in `draft.ts`; tables requested in `docs/handoff/resolve-new/SCHEMA-REQUEST.md` |
| Email, sign-in link, invitations | No | Front-end states only; `TODO(back-end merge)` |
| Begin the response screen (R3-Respond) | No | Links go to `MV_ROUTES.respondBegin`; `TODO(S03)` |
| Movement-leader Resolutions | None published | Sections hidden (5.6) |

## Stop-and-report

None for S01.
