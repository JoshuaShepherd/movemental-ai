# /work-with-us-new — handoff and receipt

Slice `S06-work-with-us-new`. Boards designed October 15, 2026 and committed under `source/`: `Work.dc.html` and `Work-Inquire.dc.html` (Form and Sent states).

## What was built

- `src/app/(new)/work-with-us-new/page.tsx` and `.../inquire/page.tsx`.
- `src/components/mv/work/work-page.tsx` (server) and `inquiry-form.tsx` (client).
- `src/app/(new)/mv.css` — a Work section (five steps, capability rows, FAQ, ink band, form chips).
- `MV_ROUTES.work` → `/work-with-us-new`; `MV_ROUTES.discuss` → `/work-with-us-new/inquire`. Every "Discuss your organization's response" on the home page, the Map and this page now lands on the form.

## Check, then branch

| Capability | Present? | Path taken |
|---|---|---|
| An inquiry endpoint | Yes: `src/app/api/contact/route.ts` (stores in `contact_submissions`, notifies the team inbox, sends one acknowledgement email) | The form posts there with `audience_segment: "Organization / institution"`; type, role, website, areas and next step are folded into `message`. `TODO(back-end merge)`: a dedicated inquiry record with these as columns. |
| A scheduling calendar | No | None shown, as the flow document requires |

**This form is live.** Submitting it from any environment with the database and Resend configured creates a real submission and sends a real acknowledgement. The browser test mocked `/api/contact`, so nothing was sent.

## Fixture seam

| Surface | Real now | Stubbed | Arrives |
|---|---|---|---|
| Inquiry | Yes, via `/api/contact` | Structured fields as columns | Back-end merge |
| Proof screenshots | Links to the three live sites | Labeled placeholders | Approved screenshots |
| Youthfront row | "In development" | — | Josh to confirm it can be shown |

## Deviations from the boards

- The reply-time promise ("[within one business day, to confirm]") is left out of the live copy until confirmed.
- The "Who will we work with?" question is omitted until its answer is confirmed (`TODO` in `work-page.tsx`).
- The form shows "This didn't send. Try again in a moment." (or the endpoint's validation message) if sending fails. The board had no error state.

## Open questions

1. Reply time to promise, if any.
2. Who leads first conversations.
3. Youthfront's status line.
4. Copy commitments: "No automated sequence" (the existing endpoint does send one acknowledgement email), "no newsletter, and it isn't shared with anyone", "You can export what is yours".

## Noticed, not changed

`src/app/api/simplified/organization-inquiries/route.ts` answers `GET` with every organization inquiry and has no authentication check in the route itself. Worth confirming it is protected elsewhere (middleware) or closing it.

## Gates

- `pnpm typecheck`, ESLint on `src/components/mv/**` and `src/app/(new)/**`, `pnpm link:check`: pass. No color literals in `.tsx`.
- Both routes return 200 with no horizontal scroll at 1,440px and 390px.
- Form test (endpoint mocked): the consent prompt appears without consent; with consent the payload is correct and the Sent state shows "You asked for something to read first."
