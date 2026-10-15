# `-new` migration state

Governing prompt: [docs/build/prompts/canvas-to-react-new.md](docs/build/prompts/canvas-to-react-new.md). Design charter: [docs/design/MV_DESIGN_CHARTER.md](docs/design/MV_DESIGN_CHARTER.md).

## Pages

| Slice | Route | Board source | Status | Gates |
|---|---|---|---|---|
| S01 | `/home-page-new` | `docs/handoff/home-page-new/source/Home-v3.dc.html` | Done | typecheck, lint, link:check, no color literals, 200 at 1440 and 390 |
| S02 | `/resolve-new` | R3-Flow, R4-Result, R4-People | Not started | |
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
| `/resolve-new`, `/map-new` | No | `MV_ROUTES` points to on-page anchors; `TODO(S02)`, `TODO(S03)` |
| Leader profile route | No | `/voices`; `TODO(S05)` |
| Inquiry form | No | `/enroll`; `TODO(S06)` |
| Guidebook route | `/field-guide` | Linked; `TODO(S04)` |
| Assessment route | `/assess` | Linked |
| Proof screenshots | No | Labeled placeholders |

## Stop-and-report

None for S01.
