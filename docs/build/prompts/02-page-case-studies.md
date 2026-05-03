# Prompt 02 — Case studies page (`/case-studies`)

## Priority

**P02 — Proof band.** Listed under **Proof** in primary nav (`nav-links.ts`). React page exists with Stitch provenance; **no** dedicated `docs/html/case-studies.html` for static review, stakeholder markup, or copy iteration outside the app.

## Deliverable

- Static HTML: `docs/html/case-studies.html` using `site-theme.css`, matching section rhythm of [`docs/html/evidence.html`](../../html/evidence.html) / [`site-templates/evidence.html`](../../html/site-templates/evidence.html) where proof is shown, but focused on **narrative before/after** and **named engagements** (or anonymized where required).

## React / Stitch reference (parity anchor)

- `src/app/(site)/case-studies/page.tsx` — Stitch screen `ec543b7c8ec7499c9a0a050b43849c7b` (comment in file). Static draft should not drift far from this structure without an explicit decision.

## Source documents (adapt; flag gaps)

| Path | Use for |
| --- | --- |
| [`docs/html/evidence.html`](../../html/evidence.html) & [`site-templates/evidence.html`](../../html/site-templates/evidence.html) | Citation tone, `.evidence-note`, `.relationship-row`, references list patterns. |
| [`docs/html/site-templates/proof-about.html`](../../html/site-templates/proof-about.html) | E-E-A-T style proof, pull-quote discipline. |
| [`docs/build/research/articles/07-bounded-networks.md`](../research/articles/07-bounded-networks.md) | Case-study *thinking* (bounded supply / demand); adapt ideas, do not paste as client claims. |
| [`docs/business-docs/documentation-index/02-credibility-thesis.md`](../../business-docs/documentation-index/02-credibility-thesis.md) | Philosophical frame for “proof” if you need connective tissue. |
| [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md) | Honesty bar: org is **early**; avoid inflated metrics. Align with metadata description already in React: “still early… results are visible.” |

## Sibling repo (optional, read-only)

- `movemental-ai` / `_docs/` — only pull **factual** engagement notes that are approved for public use; otherwise use anonymized composites.

## Content must-haves

- **Honest stage setting** (early, selective, relationship-led).
- 2–4 case cards: **problem → intervention → outcome → caveat** (outcome modesty where data thin).
- Clear CTA to **Contact** and link to **Evidence** for research-forward visitors.

## Acceptance criteria

- [ ] Every metric or outcome has a **source, range, or “illustrative”** label.
- [ ] No fabricated client logos; placeholders if assets not cleared.
- [ ] Inverse band used at most once for emphasis (per DESIGN rhythm), not stacked midnight-on-midnight.
