# /assessment-new — handoff and receipt

Slice `S07-assessment-new`. Board: `source/Assessment.dc.html`, whose five states become routes.

| Board state | Route |
|---|---|
| Explainer and start | `/assessment-new` |
| Leader predicts, then Waiting for five | `/assessment-new/predict` (`?org=` carries the name typed at the start) |
| What your people see | `/assessment-new/answer` |
| The gap | `/assessment-new/results` (the board's sample, labeled) |

## What was built

- `src/components/mv/assessment/questions.ts` (generated from the board; the board's "Riverbend" in questions becomes the organization's name, or "your organization").
- `assessment-views.tsx` (start form and the question flow, client) and `assessment-static.tsx` (explainer and results).
- `MV_ROUTES.assessment` → `/assessment-new`, plus `assessmentPredict`, `assessmentAnswer`, `assessmentResults`.

## Stop-and-report, resolved

`next.config.ts` had legacy permanent redirects from an earlier set of `-new` pages: `/assessment-new` → `/assess`, `/nonprofits-new` → `/agent`, `/churches-new` → `/agent`, `/institutions-new` → `/agent`. They would have hidden this page and the S08 audience pages. Those four entries are removed. `/nonprofits-new/next`, `/movement-leaders-new` and `/nonprofits-system-example-new` are untouched. This is the one change outside `src/app/(new)/` and `src/components/mv/` in this slice.

## Fixture seam

| Surface | Real now | Stubbed | Arrives |
|---|---|---|---|
| Start form | Organization name carried into the questions | Email not stored; no sign-in link | Back-end merge |
| Predictions and answers | Selections in component state | Not stored, sealed or sent | Back-end merge |
| Waiting for five | Board copy, "3 of the 19", labeled "Sample data." | Real counts, the people link | Back-end merge |
| Results | Board sample (Riverbend), labeled sample | Real results | Back-end merge |

## Deviations

- Left out until there is a back end: "Invite more people by email", "Download the results", "Set a date to run it again", and the research consent "Choose" link.
- Added "See an example of the results" on the waiting screen and a closing "This is an example, with sample data." with "Start the Reality Assessment" on the results page.
- The existing `/assess` (the Integrity Diagnostic) and its API are a different assessment and are not wired here.

## Open decisions (from the flow document)

Whether leaders predict separately, and whether predictions are ever shown to staff (the board assumes separately, and never). The question set, building on the Youthfront assessment.

## Gates

typecheck, lint, link:check pass; no color literals; all four routes 200 with no horizontal scroll at 1,440px and 390px; walkthrough: start → eight predictions → sealed → waiting → staff questions, with the organization's name substituted, no page errors.
