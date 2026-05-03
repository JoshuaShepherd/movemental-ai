# Prompt 01 — Contact page (`/contact`)

## Priority

**P01 — Conversion path.** Primary nav CTA (“Start a Conversation”) and footer both route here. There is **no** `docs/html/contact.html`; relationship-first expectations are only partially specified in business docs.

## Deliverable

1. **Static editorial HTML** at `docs/html/contact.html` (or `docs/html/site-templates/contact.html` if you want it only as a template sibling). Must use shared nav/footer pattern like other `site-templates` pages.
2. Optional: diff notes against the eventual Stitch/React implementation so `src/app/(site)/contact/page.tsx` stays aligned.

## Design & build constraints

- [`docs/design/DESIGN.md`](../../design/DESIGN.md) — The Digital Curator; semantic tokens; midnight bands only via `inverse-surface` pattern.
- Link [`docs/html/site-templates/site-theme.css`](../../html/site-templates/site-theme.css).
- Do **not** embed live forms that post PII into static preview; use realistic **placeholder** field labels and `mailto:` or `#` CTAs unless product provides final endpoints.

## Source documents (read and adapt; resolve conflicts explicitly)

| Path | Use for |
| --- | --- |
| [`docs/business-docs/03_brand_positioning/website-vision/pages/invitation.md`](../../business-docs/03_brand_positioning/website-vision/pages/invitation.md) | IA: referral-first narrative, contact cards by audience, process timeline, expectation setting, FAQ seeds. **Note:** doc title says `/invitation`; **canonical route today** is `/contact` per `src/components/nav/nav-links.ts` — align naming in copy (“Invitation” can be eyebrow, not URL). |
| [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md) | Acquisition truth (relationship / word-of-mouth), 100 movement leaders cap (surface if approved), audience parity (leaders, nonprofits, churches). |
| [`docs/html/site-templates/proof-about.html`](../../html/site-templates/proof-about.html) | Tone: inspectability, relationship row, evidence-note patterns for “why we answer slowly / carefully.” |
| [`docs/html/faq.html`](../../html/faq.html) | Cross-link to FAQ for logistics; avoid duplicating entire FAQ on contact. |
| [`docs/html/pricing.html`](../../html/pricing.html) | Consistent language with pricing covenant; do not invent new economics. |

## Content must-haves

- Clear **who this is for** (movement leader, org/denomination, media/research) without declaring a single “primary audience for 12 months” (per April 2026 notes).
- **Expectations**: response posture, referral-first or “how to start,” no fake instant scheduling unless product confirms.
- **Trust**: link to Evidence, Methodology, Privacy as appropriate.

## Anti-patterns (from founder notes)

- Do not hard-commit **Notion + AI** as the org stack unless explicitly approved.
- Avoid generic SaaS “book a demo” hype; keep editorial, warm, bounded.

## Acceptance criteria

- [ ] One primary CTA + secondary paths (FAQ, pricing) without competing noise.
- [ ] Mobile nav-friendly structure; no required JS beyond drawer toggle.
- [ ] All outbound claims traceable to a listed source doc or marked **new draft — needs legal/founder review**.
