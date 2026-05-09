# About Page — Movemental

Self-contained HTML/CSS/JS template of the rebuilt `/about` page. Built first
for visual review before migration into the Next.js app.

- File: [`code.html`](./code.html) — single self-contained document.
- Open in any browser. Fonts (**Instrument Serif**, **Inter**) load from
  Google Fonts and match the production `--font-serif` / `--font-sans` stack.
- Tailwind CDN is used for utility classes; bespoke editorial styles live in
  the `<style>` block at the top.

## Color & type tokens

The `<style>` block's `:root` mirrors the canonical light-theme tokens in
[`src/app/globals.css`](../../../../src/app/globals.css). Each declaration is
annotated with the Tailwind utility name it maps to, so the Next.js migration
is mechanical: `--background` → `bg-background`, `--inverse-surface` →
`bg-inverse-surface`, `--muted-foreground` → `text-muted-foreground`, and so
on. The amber accent uses `--color-status-caution` (`#a07a25`) — the only
amber in the general-UI palette; the citation amber palette is reserved
exclusively for inline citations and never reused.

## Section map

1. **Hero** (Section 1) — warm midnight `var(--inverse-surface)` (`#141110`).
   Single H1. No CTAs.
2. **The founders** (Section 2) — warm cream. Three founder cards with
   placeholder portraits (single italic display-serif letter). Each card
   carries name, role, location, bio, four credential bullets, and two
   arrow-suffixed text links.
3. **The story** (Section 3) — warm cream-deep with a hairline divider.
   Long-form essay in `prose-narrow` (max-width 680px). One italic pull-quote
   set off with a left rule.
4. **What movement leaders commit to** (Section 4) — warm midnight. Five
   commitments rendered as a vertical list (not a grid), each with an italic
   numeral, title, and substantive paragraph. Closes with a single italic
   amber line in `var(--status-caution)` (`#a07a25`) at 92% opacity.
5. **Beyond the founders** (Section 5) — warm cream. Movement Voices grid is
   rendered from a `COMMITTED_VOICES` array in `<script>` that mirrors
   `src/lib/committed-voices.ts`. Three voices today: Rev. Dr. Liz Rios,
   JR Woodward, L. Rowland Smith. Closes with a `→ See all Movement Voices`
   link to `/voices`.
6. **Closing** (Section 6) — warm midnight. Two CTAs (`/contact`,
   `/field-guide`) and a quiet toolkit line + arrow link.
7. **Footer** — placeholder; production will render the shared `<SiteFooter />`.

## Migration to Next.js

When this template is approved:

1. Render the same content using `Container`, `Reveal`, and existing primitive
   components in `src/components/primitives/`.
2. Replace the embedded `COMMITTED_VOICES` array in `<script>` with an import
   from `src/lib/committed-voices.ts`. The grid renders one card per voice
   using the existing pattern from `src/components/sections/voices/`.
3. Wire the closing **Download the toolkit →** link to the existing toolkit
   modal trigger used elsewhere on the site (e.g. the home `/` and `/system`
   pages — search the repo for the modal trigger component).
4. Add a 301 redirect `/team` → `/about` in the routing config (Next 16 uses
   `next.config.ts` `redirects()` or `proxy.ts`, depending on convention).
5. Search the repo for `href="/team"` and replace each instance with
   `href="/about"`. Update the footer link config and any nav configs that
   list `/team`.
6. Move the existing `/team` page component to
   `src/components/_archive/team-page-pre-merge-YYYY-MM-DD/` and the
   existing `/about` content to
   `src/components/_archive/about-page-pre-rewrite-YYYY-MM-DD/` for recovery.

## Flag for founder review before publishing

- **Founder credentials** — verify Brad's exact NAMB tenure phrasing, Alan's
  current affiliations, Josh's exact role descriptions, and the specific
  Hirsch books referenced in Alan's bio. Do not fabricate beyond what the
  founders confirm.
- **Founder external links** — replace placeholder `href="#"` on Brad's
  LinkedIn and Books links and on Josh's LinkedIn and GitHub links with the
  real URLs once provided.
- **Pull-quote sentence** in Section 3 — Josh may want to elevate a different
  sentence as the pull-quote.
- **Movement Voices roster** — confirm the three voices in
  `committed-voices.ts` are the current public roster. The template will
  pick up additions automatically once the array grows.

## Validation checklist (template only — see prompt for full list)

- [x] Single `<h1>` per page (in the hero).
- [x] Hero language does not duplicate the home-page hero.
- [x] Three founder cards: 3 columns ≥ md, 1 column on mobile.
- [x] Founder placeholder uses a single italic display-serif letter
      (B / A / J), not full initials.
- [x] Section 3 narrative is the new origin story, not the prior
      AI-generated late-2025 framing.
- [x] Five commitments rendered vertically with full elaboration each.
- [x] Movement Voices grid sources from the canonical voices array.
- [x] No banned vocabulary, no "Doctrine"/"Sequence" framing, no logos
      or testimonial blocks, no investor/advisor/press treatments.
- [ ] WCAG AA contrast — verified visually; please re-check after final
      tokens are imported into the Next.js app.
