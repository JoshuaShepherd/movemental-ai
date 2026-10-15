# /resolve-new — handoff and receipt

Slice `S02-resolve-new`. Front end only, by decision (October 15, 2026): the screens migrate now; storage, email and counts arrive with the back-end merge. Governing prompt: [`canvas-to-react-new.md`](../../build/prompts/canvas-to-react-new.md). Flow: section 5 of `movemental-site-and-flow.md` (v3), 5.1 to 5.6 ratified.

## Sources (committed under `source/`)

| Board | Route | Notes |
|---|---|---|
| `R3-Flow.dc.html`, `R3-Flow-Phone.dc.html` | `/resolve-new` | Arrive, nine themes, review, leadership turn. Its screen 5 ("My Resolution") is superseded by R4-Result. |
| `R4-Result.dc.html` | `/resolve-new/document` | My Resolution (5.2) |
| `R4-People.dc.html` | `/resolve-new/people` | Your people (5.4), below-five state |
| `R3-Others.dc.html` | `/resolve-new/others` | How others resolved (5.6) |
| `R3-Shared.dc.html` | `/resolve-new/r/[token]` | A shared Resolution; only the sample token `k7p2qx` resolves |
| `R3-States.dc.html` | in the flow, document and `error.tsx` | Welcome back, no lines chosen, didn't load, loading |

Not in this slice: R3-Team (an organization's agreement view) and R3-Respond (begin the response). They belong to the Map and the organization workspace, after the back end. "Begin … response" links go to `MV_ROUTES.respondBegin` (`TODO(S03-map-new)`).

## What was built

- `src/app/(new)/resolve-new/` — `page.tsx`, `document/`, `people/`, `others/`, `r/[token]/`, `error.tsx`.
- `src/components/mv/resolve/` — `themes.ts` (generated from the board, verbatim), `draft.ts` (the Resolution and its device storage), `fixtures.ts`, `resolve-flow.tsx`, `resolution-document.tsx`, `your-people.tsx`, `others.tsx`, `shared-resolution.tsx`, `dialog.tsx`.
- `src/components/mv/mv-task-header.tsx` — logo plus one or two quiet links; no site nav during the task.
- `src/app/(new)/mv.css` — a Resolve section, plus tokens `--mv-control`, `--mv-control-soft`, `--mv-scrim` taken from the board's literals.
- `MV_ROUTES.resolve` now points to `/resolve-new`, so the home page's Resolve links land here.

## Fixture seam

| Surface | Real now | Stubbed | Arrives |
|---|---|---|---|
| The exercise | All of it; progress kept on this device (localStorage, try/catch) | — | — |
| Save my Resolution | Marks it saved on this device | No email, no sign-in link, nothing on a server | Back-end merge (`SCHEMA-REQUEST.md`) |
| Versions | Kept on this device each time the lines change | Earlier versions aren't openable | Back-end merge |
| Who can see it / research consent / count in the organization's view | Choices stored on this device | No effect anywhere else | Back-end merge |
| Share link | Shows the board's sample link, which opens the sample shared Resolution | No per-Resolution tokens | Back-end merge |
| Bring this to someone who decides, invitations, reminders, connection requests | Dialogs and states | Nothing is sent | Back-end merge |
| Invited state | `?invited=sample` shows the board's invitation from Priya for Riverbend | Real invitations | Back-end merge |
| Your people, How others resolved, the shared Resolution | Board sample data, labeled "Sample data." | All of it | Back-end merge |
| Print, Download as PDF | Both open the browser's print dialog (save as PDF there) | A generated PDF | Later, if wanted |

## Locked decisions applied here

1. **Five, not three.** R3-States says "Results appear when a third person resolves." The ratified threshold is five (5.4, 5.5). That state isn't used in this slice; when the organization view lands it must say five.
2. **No leader placeholders.** R3-Others and R4-People show bracketed "[Movement leader]" rows. 5.6 says hidden until leaders publish, with no placeholders, so both sections are omitted.
3. **How others resolved only after finishing.** The page sends anyone without a finished Resolution back to the exercise.
4. **Sample data is labeled.** Boards R4-People and R3-Shared show fictional people without a label; this build adds "Sample data." (the label R3-Others and R3-Team already use).

## Deviations from the boards

- **An unnamed organization reads "our organization."** The board falls back to a fictional name (Riverbend) when the name field is empty. That would put a fictional name on a real person's Resolution. Where the board says "Riverbend's view", "Your role at Riverbend" or "Begin Riverbend's response", those appear only when an organization is named; otherwise "Begin your organization's response".
- **Bring this to someone who decides** opens with an empty "Send to" field and a note without "James, " at the front, and says "What they will see … their link" instead of "What James will see … his link". The board's version was addressed to its sample person.
- **Email placeholder** reads `you@yourorganization.org` instead of `you@riverbendyf.org`.
- **"If I had two minutes"** appears on the document when the person wrote something. R3-Flow showed it; R4-Result's sample had none.
- **Not built:** Sign out (no accounts yet), the "findable space / ask to join" state, the agreement view at five or more, the theme chips on How others resolved (only Time has sample data).
- **Headers:** `<main>` is already provided by the root layout, so these screens use `div`s inside it.

## Gates

- `pnpm typecheck`: pass.
- ESLint on `src/components/mv/**` and `src/app/(new)/**`: clean.
- `pnpm link:check`: all 37 internal hrefs resolve.
- No color literals in `.tsx`.
- Browser walkthrough at 1,440px and 390px: arrive (invited), nine themes with one skipped, reload mid-way shows "Welcome back", review, leadership, document unsaved and saved, send dialog, How others resolved, Your people, shared Resolution; no horizontal scroll on any screen; no console errors. "Edit my Resolution" reopens on the review screen.
- Known: in `next dev` a bad share token renders the 404 page with status 200 (streaming); check status in a production build.

## Open questions

1. Should an invitation pre-fill the organization's name (this build does, with `?invited=sample`)?
2. Board R3-Flow's leadership turn and 5.2 differ slightly: 5.2 lists "begin the organization's response" as an action; the board's fourth action is "I have authority to begin this conversation for our organization." Board copy is used.
3. Is "Save and leave" right when progress is already kept on the device? It currently returns home.
