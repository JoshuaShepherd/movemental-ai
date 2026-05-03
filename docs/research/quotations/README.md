# Movemental Quotations Library

A curated, verified collection of quotations for Movemental — designed for marketing pulls, hero rotators, section epigraphs, social assets, book paratext, and quote-of-the-day randomizers.

## Files

| File | Purpose |
|------|---------|
| [`quotations.md`](./quotations.md) | The **primary** thematic collection. 280+ quotes from 114 authors organized under 10 themes. Hirsch-primary, with external voices AND Hirsch-curated epigraphs merged into each section. |
| [`hirsch-curated-epigraphs.md`](./hirsch-curated-epigraphs.md) | The quotes Hirsch himself places above his chapter openers — Blake, Keynes, Machiavelli, Einstein, Lawrence, Taleb, Deming, Drucker, Houston, Churchill, Hoffer, Hauerwas, Bosch, etc. His "scenius." |
| [`external-voices-raw.md`](./external-voices-raw.md) | First external-voices harvest — ~70 verified non-Hirsch quotes with full verification URLs. Provenance file. |
| [`external-voices-smart-expansion.md`](./external-voices-smart-expansion.md) | Smart-as-hell expansion — ~100 verified quotes from 41 new authors (McLuhan deep cuts, Postman, Ellul, Taleb, Iain McGilchrist, Carse, Meadows, Weil, Arendt, Whitehead, Buber, Heschel, Le Guin, Brueggemann, etc.). Provenance file. |
| [`quotes.json`](./quotes.json) | Machine-readable index (280+ quotes) for hero rotators, random pulls, section epigraphs. Filter by `themes[]`, `length`, `surfaces[]`, or `hirsch_curated` (boolean). |
| [`README.md`](./README.md) | This file. |

## Philosophy behind the selection

Movemental's point of view — movement multiplication, incarnational presence, platform ownership vs "digital sharecropping," technology as servant of mission, the apostolic/pioneering edge — is held in Alan Hirsch's published corpus, supplemented by the intellectual company his work keeps: the missional theologians (Newbigin, Bosch, Bonhoeffer, Willard, Nouwen), the technology critics and craftspeople (McLuhan, Postman, Illich, Kelly, Berry, Newport), and the literary/wisdom voices (Lewis, Chesterton, Merton, Rilke, Eliot).

## The 10 themes

1. **Movement & Multiplication** — small beginnings, viral spread, exponential vs additive
2. **Incarnational / Local / Embodied** — presence over broadcast, place, neighborhood
3. **Platform, Ownership & Stewardship** — owning the means, rejecting sharecropping
4. **Technology as Servant of Mission** — tools that serve people; the medium shapes the message
5. **Risk, Adventure & Liminality** — courage, pilgrimage, thresholds
6. **Discipleship & Formation** — transformation, apprenticeship, practice over theory
7. **Network, Collaboration & Communitas** — comradeship, tribes, scenius
8. **Imagination, Story & Paradigm** — alternative stories, re-enchantment, paradigm shift
9. **Scale, Simplicity & Small** — small-is-beautiful, fewer-goods-more-goodness
10. **The Kingdom & The World** — Christ and culture, sent people, hope

## Verification standard

**No hallucinated quotes.**

- **Hirsch quotes** come from the extracted, hash-verified quote banks in the local Alan Hirsch corpus (`/Users/joshuashepherd/Desktop/dev/repos/alan-books/corpus/alan_hirsch/_quotes/`). Each quote bank frontmatter carries a `content_sha256` and was extracted verbatim from the chapter source files.
- **External quotes** were verified individually against authoritative sources (primary editions, publisher pages, archived scans, academic archives). Each has a URL in `external-voices-raw.md`.
- Where popular attribution differs from scholarly attribution, the correct attribution is used with a **note** explaining the confusion (e.g., "We shape our tools" is correctly Culkin, not McLuhan).
- Known-uncertain or popular-but-unverifiable quotes were **omitted**, not padded. See the exclusions list at the bottom of `external-voices-raw.md`.

## Using the library

### For a hero rotator

```js
import quotesData from '@/docs/research/quotations/quotes.json';

const heroQuotes = quotesData.quotes.filter(
  (q) => q.surfaces.includes('hero') && q.length === 'short'
);
```

### For a themed section (e.g. Platform pricing page)

```js
const platformQuotes = quotesData.quotes.filter(
  (q) => q.themes.includes('platform') || q.themes.includes('ownership')
);
```

### For a newsletter footer

```js
const newsletterQuotes = quotesData.quotes.filter(
  (q) => q.surfaces.includes('newsletter')
);
const daily = newsletterQuotes[new Date().getDate() % newsletterQuotes.length];
```

### Surfaces (recommended pairings)

- `hero` — ≤20 words, high-impact, brand-aligned
- `og` — works as an OG image overlay, short and punchy
- `pull` — 20–60 words, pull-quote inside an article or section
- `epigraph` — 60+ words, chapter openers, section introductions
- `newsletter` — fits in a footer line or daily email
- `footer` — generic site footer use

## Editorial rules

1. **Verbatim only.** Don't paraphrase and pass it off as a quote.
2. **Always cite.** Author, title, year where known. For blog/social copy a short citation is fine; for print copy use full edition.
3. **Don't stitch.** Never combine sentences from different passages into one "quote" — even by the same author.
4. **Pair with the design system.** Blockquote primitives, not body copy. See `docs/design/DESIGN.md` for typography rules.
5. **Respect the qualifier.** If a quote has a correction note (misattribution, disputed wording), honor it — don't strip it in production use.

## Maintenance

- **Adding a Hirsch quote:** Copy verbatim from one of the `_quotes/*.mdx` files in the Hirsch corpus. Add to the thematic section in `quotations.md`, then to `quotes.json`.
- **Adding an external quote:** Find an authoritative source (primary text, publisher page, academic scan), add it to `external-voices-raw.md` with the verification URL, then to the thematic section in `quotations.md`, then to `quotes.json`.
- **Removing a quote:** If you find an error or a quote is mis-sourced, fix it here and regenerate `quotes.json`. Do not propagate an error downstream.
- **Updating themes:** Keep `quotes.json`'s `themes_index` array in sync with the themes actually used in entries.

## Source hierarchy (for Hirsch specifically)

Hirsch's published books in this collection, with the number of quotes represented:

| Book | Primary pillar | Quotes used |
|------|----------------|-------------|
| The Forgotten Ways Handbook | Apostolic Genius / mDNA | ~14 |
| On the Verge | Movemental Thinking | ~15 |
| The Faith of Leap (w/ Frost) | Risk / Liminality | ~13 |
| 5Q | APEST / Fivefold | ~5 |
| Metanoia (w/ Kelly) | Transformation / Paradigm | ~7 |
| Reframation (w/ Nelson) | Christology / Imagination | ~8 |
| ReJesus (w/ Frost) | Christology / Lordship | ~3 |
| Right Here, Right Now (w/ Ford) | Missional Church | ~9 |
| Disciplism | Metanoia / Discipleship | ~2 |
| Fast Forward to Mission | Movemental Thinking | ~8 |

External voices span ~25 authors across missional theology, technology criticism, literature, and business/network thought.

---

*Curated for Movemental. If a quote here looks wrong or mis-sourced, fix it here first.*
