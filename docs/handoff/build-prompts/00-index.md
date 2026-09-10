# Movemental — build prompts

One prompt per page still to design. Each is self-contained: it names the repo
files to read first, the section structure, the design-system components to
compose, and what "done" means.

## Ground rules for every page

- **Build as a Design Component** (`Name.dc.html`). One file per page unless a
  page has variants that share a structure — then one file with a switcher, as
  `Movemental Audience Editions.dc.html` does for three audiences.
- **Load the design system bundle** in `<helmet>` and compose its components:
  `Eyebrow`, `SectionLabel`, `Crumb`, `Button`, `SuggestionChip`, `OptionButton`,
  `BeatDots`, `WayCard`, `FaqItem`, `PathLayer`, `LeaderFace`, `InkVoice`.
  Never hand-roll a look-alike.
- **Tokens only.** No hex literals. `var(--bg)`, `var(--surface-card)`,
  `var(--border)`, `var(--ink)`, `var(--ink-blue)`, `var(--margin-red)`,
  `var(--marker)`, `var(--font-display)`, `var(--display-question)`,
  `var(--tracking-display)`, and the rest of `tokens/`.
- **Copy comes from the repo, verbatim.** Read the config or data file and lift
  it. If copy for a section does not exist, say so on the page or leave the
  section out — do not write Movemental's voice on its behalf and do not invent
  statistics. Only measured claims carry a source.
- **The notebook margin** (1.5px `var(--margin-red)` at 32% opacity, content
  inset clear of it) on every reading sheet.
- **Header pattern**, matching the pages already built: sticky, fixed
  `height: 3.6rem`, wordmark left, `Crumb` right. Any second sticky bar pins to
  exactly `3.6rem` — never a guessed offset.
- **Fluid.** `max-width`, not fixed `width`. The preview pane can be under
  1000px. No `nowrap` on anything holding text; `InkVoice` needs
  `white-space: normal` passed through `dc-props` or long lines overflow.
- **Honesty is a design constraint.** No urgency, no scarcity, no fake
  testimonials, no invented metrics. Label stubs as stubs. Prices are flat and
  public. If a form has no backend, the prompt says so and the page must not
  imply a send that will not happen.
- **Every CTA resolves.** Point at a project file that exists or a real repo
  route. A `href="#"` on a primary action is a defect.

## Order

Build in this order — each closes a link the one before it opens.

| # | Page | Why here |
| --- | --- | --- |
| 01 | `/voices` hub | ✅ Built — `Movemental Voices.dc.html` |
| 02 | `/voices/[slug]` | ✅ Built — `Movemental Voice Profile.dc.html` |
| 03 | `/program` | ✅ Built — `Movemental Program.dc.html` |
| 04 | `/program/[category]/[templateId]` | ⤴ Re-scoped to 20 — the route is auth-gated and fetches no template data |
| 05 | `/enroll` | ✅ Built — `Movemental Enroll.dc.html` |
| 06 | `/how-we-use-ai` | ✅ Built — `Movemental How We Use AI.dc.html` |
| 07 | `/about` | ✅ Built — `Movemental About Founders.dc.html` |
| 08 | `/about/[slug]` | ✅ Built — `Movemental Founder Profile.dc.html` |
| 09 | `/footnotes` | ✅ Built — `Movemental Footnotes.dc.html` |
| 10 | `/research` | ✅ Built — `Movemental Research.dc.html` |
| 11 | `/research/[slug]` | ✅ Built — `Movemental Research Paper.dc.html` |
| 12 | `/research/findings` + `/research/sources` | ✅ Built — `Movemental Research Indexes.dc.html` |
| 13 | `/articles` | ✅ Built — `Movemental Articles.dc.html` |
| 14 | `/articles/[slug]` | ✅ Built — `Movemental Article.dc.html` |
| 15 | `/agent/{churches,nonprofits,institutions}/deck` | ✅ Built — `Movemental Decks.dc.html` |
| 16 | `/share/ai-reality/[token]` | ✅ Built — `Movemental Shared Reality.dc.html` |
| 17 | `/scenius` | ⤴ Resolved — a redirect alias for `/agent/movement-voices`; no page to design |
| 18 | `/style-finder` | ⏸ Resolved as the visual picker; blocked on real `template-previews` art |
| 19 | Utility shell | ✅ Built — `Movemental Utility Shell.dc.html` |
| 20 | Dashboard shell | ⤴ Re-scoped — its own prompt set at `docs/build-prompts/dashboard/` (D1–D5) |

The public marketing and diagnostic surface is complete. Every remaining item is
either resolved as needing no design (04, 17), blocked on material the repo does
not yet expose (18), or moved to its own project (20).

## Open product questions

Carry these into the relevant prompt rather than deciding them in design:

1. **The Dashboard door contradiction.** `safety-charter.ts` calls the Safety
   Dashboard "Free to start. No call, no checkout." `/enroll`, where
   `pricing.ts` sends it, is a $1,000 sprint with a Stripe section. One of the
   two is stale. Unresolved as of this writing.
2. **Four leaders have no bio** in `public.movement_leaders` (Bree Mills, Daniel
   Bravo, David Docusen, Jamie Roach) and **Jamie Roach has no headshot** in
   storage. Roles are empty for all but Brian Sanders.
3. **`/voices` is not the 25-leader wall.** The route reads
   `src/lib/committed-voices.ts` — three rights-cleared editorial profiles (Liz
   Rios, JR Woodward, Rowland Smith), not `public.movement_leaders`. Prompts 01
   and 02 assumed the Supabase table. Both pages now publish the committed three
   as the primary content and show the 25-name roster as the wider scenius,
   labelled as having no published profiles. Confirm that framing with product.
4. **Three prompts were written against stale assumptions.** Prompts 06, 08 and
   09 each told the designer to expect missing content and mark gaps. All three
   were wrong, and the real sources were found before building:
   - `/how-we-use-ai` redirects to `/agent/how-we-use-ai`, which is fully
     written (`how-we-use-ai-data.ts`). No invented policy was needed.
   - Josh Shepherd's bio is not null. `src/lib/founders/content.ts` is the
     founder SSOT and gives him the longest `fullBio` of the three.
   - The footnote source registry is `src/lib/citations/eeat-registry.ts`
     (`eeat-site-claims.json`, 38 rows + 2 inline supplements = 40).
   Re-verify a prompt's "missing data" claim against the repo before building to
   it; these prompts predate the content landing.
6. **Prompt 15's slide sequence was invented.** It specified evidence cards, the
   four stages, the Charter's five layers and the flat price. The three real
   decks (`church-deck.ts`, `nonprofit-deck.ts`, `institution-deck.ts`) are an
   eleven-slide "Why a platform, not a website builder?" category and price
   reframe with no statistics in them at all. The real decks were built, per the
   prompt's own "no invented slides" rule. If the stats deck is genuinely wanted,
   it needs to be authored as `DeckData` first.
7. **Articles are markdown on disk, not Supabase.** Prompt 13 pointed at a
   `content_items` table; `src/lib/articles.ts` is a filesystem loader over
   `docs/articles/*.md` with YAML frontmatter. ~70 root files publish; the
   `graded-high/` subtree is a scoring archive the loader never reads.
8. **`/share/ai-reality/[token]` is an org aggregate, not a personal read-back.**
   Prompt 16 assumed a forwarded individual result with the six answers and the
   Safety-gate prose. The route resolves a hashed token to an organization and
   renders `AiRealityOrgPayload` — team means, medians, spread, illusion flags,
   and a provisional single-leader state. The payload carries no sharer name and
   no share date, so the framing line names the organization only.
9. **Auth and terms copy is still unlifted.** The utility shell is built and
   every route renders through it, but `/login`, `/signup`, `/forgot-password`,
   `/auth/update-password`, `/welcome`, `/team-invite/[token]`, `/agent/invite`
   and `/terms` show a labelled gap instead of invented copy. Lifting those
   route files is a small, mechanical follow-up.
10. **The seminary letter** (`seminary-letter.md`) is the centrepiece of the
   institutions page and is not yet typeset anywhere.
