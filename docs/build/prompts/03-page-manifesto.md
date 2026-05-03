# Prompt 03 — Manifesto page (`/manifesto`)

## Priority

**P03 — Nav + canon tension.** `sitePrimaryNav` includes **Company → Manifesto** (`src/components/nav/nav-links.ts`), but there is **no** `src/app/(site)/manifesto/page.tsx` and **no** `docs/html/manifesto.html`. Founder notes flag current manifesto-adjacent org copy as **candidate for rewrite** (low-trust / unclear provenance). This prompt is for a **deliberate re-authoring**, not a migration.

## Deliverable

1. **Content strategy one-pager** (in chat or `docs/content/` if you extend scope) listing: thesis, non-goals, what was rejected from old drafts.
2. **Static HTML** `docs/html/manifesto.html` OR a **Markdown manuscript chunk** if the org prefers longform first — pick one primary artifact in the prompt response header.

## Design & voice constraints

- [`docs/book-development/manuscript-final/BOOK_META_OVERVIEW.md`](../../book-development/manuscript-final/BOOK_META_OVERVIEW.md) — book-level constraints: **not** a rally manifesto in the ideological sense; maintain tension vs. false certainty. Apply the same discipline to a **site** manifesto: posture, not sloganeering.
- [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md) — align with **AI maturity model**, **five modular sprints**, **100 movement leaders cap**, **audience parity**; remove **Notion + AI** as committed stack unless explicitly re-approved.
- [`docs/html/about.html`](../../html/about.html) — “Not a manifesto” section tone (`#posture-title` area): reuse **posture**, not duplicate long passages.

## Anti-goals (explicit)

- Not a **growth-hack** tract, not a **tool pitch**, not a **theological textbook** in one page.
- Not a list of features; link out to **Services**, **System**, **Methodology** instead.

## Source themes to interweave (book manuscript — paraphrase only)

Pull *themes* (not raw paste) from ordered manuscript chapters under [`docs/book-development/manuscript-ordered/`](../../book-development/manuscript-ordered/), especially:

- `01-the-credibility-crisis.md`, `05-ai-as-credibility-amplifier-not-faker.md`, `06-amplification-not-replacement.md`, `10-transparency-disclosure-and-trust.md`, `12-pace-and-discernment.md`, `13-what-to-refuse-and-what-were-free-to-do.md`

## Acceptance criteria

- [ ] Opening paragraph states **who Movemental is for** and **what promise is refused** (bounds).
- [ ] One short section on **AI** as adaptive challenge + human formation (ties to maturity model).
- [ ] Clear **CTA pair**: Conversation (`/contact`) + How it works (`/methodology` or `/system`).
- [ ] Footer/legal cross-links like other pages.
- [ ] Metadata stub: title/description suitable for Next `metadata` export later.
