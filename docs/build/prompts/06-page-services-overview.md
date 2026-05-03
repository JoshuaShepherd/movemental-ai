# Prompt 06 — Services overview (`/services`)

## Priority

**P06 — Services funnel root.** First item under **Services** nav group. React page is rich (`src/app/(site)/services/page.tsx`, Stitch `a15d4daf68be4b5890d11a10178d8083`). **Gap:** only `docs/html/site-templates/services.html` exists as a **template shell**; no **root-level** `docs/html/services.html` aligned with the current homepage narrative and modular sprint story.

## Deliverable

- `docs/html/services.html` at repo root of `docs/html/` (parallel to `pricing.html`, `about.html`) **or** explicitly replace/redirect from `site-templates/services.html` with a note in [`docs/html/README.md`](../../html/README.md) — choose one canonical file to avoid drift.

## Source documents

| Path | Use for |
| --- | --- |
| `src/app/(site)/services/page.tsx` | Section order, card titles, metadata description. |
| [`docs/html/index.html`](../../html/index.html) | Promise → problem → mechanism alignment; CTA pairing. |
| [`docs/html/how-it-works.html`](../../html/how-it-works.html) | Bridge language to methodology without duplicating whole page. |
| [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md) | **Five modular four-week sprints**; discovery lab; governance; fundraising; content — ensure Services overview **teases** modules and routes to **System builds** child pages. |
| [`docs/html/site-templates/services.html`](../../html/site-templates/services.html) | Existing chrome / nav; update copy blocks rather than inventing a third layout. |

## Child routes to surface (internal links)

- `/services/system-builds` — hub (Prompt 08)
- `/services/system-builds/foundation` — Prompt 09
- `/services/system-builds/content-fundraising` — **one** combined React route; pair static preview with **both** `content-system-build.html` and `fundraising-system-build.html` as deep-dive siblings (or plan a single merged static file later — if so, note deprecation of the two separate HTML drafts).
- `/services/organizational-systems` — Prompt 07

## Acceptance criteria

- [ ] Clear **two-track** story if React implies it: leader-shaped vs org-shaped systems (use founder note on audience parity; avoid picking a “primary” customer in headline).
- [ ] No **venture builder** phrase unless rewritten per April 2026 notes (check React pricing for same hygiene).
- [ ] Primary CTA: **Contact**; secondary: **Evidence** or **Methodology** (match home strategy).
