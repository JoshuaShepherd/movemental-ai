# Prompt 10 — “What is Movemental?” / platform narrative (`/platform`)

## Priority

**P10 — Legacy IA carryover.** `movemental-ai-site` tenant mega-nav still treats `/platform` as “What is Movemental?” The **new org site** may **remap** this into `/system` + `/services` + `/about`, but if you keep a standalone **platform** URL (or need a static explainer for investors / partners), it needs a **fresh** `docs/html` draft — **none exists today.**

## Deliverable

- `docs/html/platform.html` — long-form explainer: **living digital system**, layers, what Movemental builds vs what clients own, honest boundaries vs SaaS “platform.”
- If product decision **drops** `/platform` from org IA, repurpose this file as **`docs/html/platform-explainer.html`** (internal) or archive — note decision in [`00-org-site-page-prompts-index.md`](./00-org-site-page-prompts-index.md).

## Source documents (this repo first)

| Path | Use for |
| --- | --- |
| [`docs/html/system.html`](../../html/system.html) | Canonical “Movemental system” language — **avoid contradiction**; platform page should **compose**, not compete. |
| [`docs/html/about.html`](../../html/about.html) | Posture, “not a manifesto,” credibility framing. |
| [`docs/html/how-it-works.html`](../../html/how-it-works.html) | Operational bridge. |
| [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md) | Custom software truth, sibling repos as **capability references** (do not oversell as shipped Movemental.org features). |

## Sibling repo (read-only — paths from tenant + `_docs`)

- `movemental-ai-site` — `src/app/(public)/platform/page.tsx` (live structure reference only; **re-voice** for org site tokens).
- `movemental-ai` — `_docs/site-docs/why-movemental-page/` (`README.md`, copy decks) per founder notes index table — **classify** each paragraph: keep / rewrite / discard.

## Anti-patterns

- No **stack-washing** (Notion + AI) without explicit approval.
- No **100-leaders** claim unless aligned with legal/comms decision for this surface.

## Acceptance criteria

- [ ] One **diagram or layered list** (information architecture) with plain labels.
- [ ] “**Built together**” vs “**delivered turnkey**” clarity.
- [ ] CTA trio: **Contact**, **Evidence**, **System** (adjust if IA remaps).
