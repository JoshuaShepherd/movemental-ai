# Prompt 04 — Privacy policy (`/privacy`)

## Priority

**P04 — Legal / trust.** Footer legal strip requires Privacy. React implementation **already exists**: `src/app/(site)/privacy/page.tsx` (last updated date in file). **Gap:** no matching **`docs/html/privacy.html`** for static review, PDF export, or non-Next stakeholders.

## Deliverable

- `docs/html/privacy.html` that **mirrors the sections and ordering** of the React page **unless** legal review demands edits — then edit **React + HTML together** in the same task.
- If the HTML draft leads, port changes back to `privacy/page.tsx` and update **effective date** in both places.

## Source documents

| Path | Use for |
| --- | --- |
| `src/app/(site)/privacy/page.tsx` | Canonical section list for marketing site scope (visit + inquiry). |
| [`docs/html/site-templates/terms.html`](../../html/site-templates/terms.html) | Visual pattern for long legal prose: typography, nav shell, back links. |
| [`docs/business-docs/core-docs/21-ownership-partnership-faq.md`](../../business-docs/core-docs/21-ownership-partnership-faq.md) | “Data & Privacy Agreement” mentions — ensure no contradiction with marketing privacy page; if tension, flag for counsel. |
| [`docs/business-docs/core-docs/28-implementation-status.md`](../../business-docs/core-docs/28-implementation-status.md) | Technical posture (cookies, env vars) — **high-level only** on marketing page; no secret names or infra diagrams. |

## Design constraints

- Legal pages still use **Design.md** prose tokens (`Prose` equivalents in HTML: max measure, heading scale).
- Prefer **light bands**; use midnight sparingly for page intro only if needed.

## Acceptance criteria

- [ ] Section anchors (`id=`) for deep links (Contact, FAQ, footer).
- [ ] Plain-language summary **above** the fold (3–5 bullets) optional but recommended if counsel agrees.
- [ ] Link to **Cookie Policy** and **Contact**.
- [ ] No tracking scripts in static file beyond what `serve` implies; document “production uses …” in HTML comment if needed.
