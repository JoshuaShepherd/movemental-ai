# Agent prompt — site footnotes, EEAT registry, and citation tooltips

## Outcome

Movemental’s public claims carry **inline citation chips** (Ledger edition) whose **tooltips show only reader-facing note prose**—no confidence tags, sample-size pills, or corpus metadata. The **full claim + bibliography-style source + note** lives on a single in-app page: **`/footnotes`**. That page and its JSON data mirror the editorial contract in **`docs/html/site-claims-eeat-research-map.html`** (claims table + JSON blob).

Do **not** render a **References rail** (numbered list above the global footer). It breaks the site rhythm; deep linking replaces it.

---

## 0. Single sources of truth (read before editing)

| Asset | Role |
| --- | --- |
| **Claims, sources, and footnotes** (editorial master table — 35 rows) | Canonical copy for Claim, Source (reader-facing), and Footnote columns; describes how evidence is supposed to read on the live site. |
| `src/lib/citations/eeat-site-claims.json` | Machine SSOT: **verbatim** that table **plus** stable `id` slugs and `citationIds` linking inline `<Cite />` chips to rows. |
| `docs/html/site-claims-eeat-research-map.html` | Optional HTML mirror / stakeholder preview; if it drifts, **reconcile toward the JSON**, not the other way around. |
| `src/lib/citations/eeat-registry.ts` | Runtime registry (JSON rows + rare editorial supplements). Builds the citation-id → registry-id map. Throws on duplicate `citationIds`. |
| `src/lib/citations/claims.ts` | Inline chip catalog: statistical HTML still used for QA/tests; **tooltip copy comes from the EEAT footnote** matched via `citationIds`. |
| `src/lib/citations/sources.ts` | Canonical `https://` rows for the Ledger corpus (tests enforce URLs). |

---

## 1. Definition of done

| Layer | Done means |
| --- | --- |
| **Tooltip** | Only EEAT `footnote` prose + one link **“Full source and citation ↗”** → `/footnotes#ref-{registryRow.id}`. No tags, no meta row, no duplicated stats block inside the popover. |
| **Footnotes page** | `/footnotes` renders a searchable table (rank, page, type, claim, source block, note). Rows expose `id="ref-{id}"` for deep links. styling uses semantic tokens (`Section`, `Container`, `border-border`, `text-muted-foreground`, etc.). |
| **Chips** | `<Cite />` unchanged visually (amber Ledger chip); `aria-label` summarizes the note (trimmed) for screen readers. |
| **No rail** | Home, toolkit read, and other surfaces **do not** mount `<ReferencesRail />` above `SiteFooter`. |
| **Integrity** | Every `CitationId` in `claims.ts` appears exactly once across `citationIds` in `eeat-site-claims.json` + supplements (`pnpm test:run tests/unit/citations/catalog.test.ts`). |
| **Voice** | Footnotes read like **nonfiction chapter notes** for the public—scope, interpretation, caution—not editor instructions. |

---

## 2. Workflow: add or change a cited claim

1. **Update the HTML spec** (optional but preferred when doing a broad EEAT pass): edit `site-claims-eeat-research-map.html` so stakeholders can review prose without touching React.

2. **Sync JSON** — Add or edit the matching object in `eeat-site-claims.json`:
   - `id`: stable kebab slug (`home-ai-already-inside-org`).
   - `rank`, `page`, `claimType`, `claim`, `cite`, `footnote` aligned with the HTML row.
   - `citationIds`: include the `CitationId` from `claims.ts` **only if** this row backs an inline chip. Each id may appear **once** across the entire registry.

3. **Claims catalog** — Add or adjust `src/lib/citations/claims.ts` + `sources.ts` per the existing six-layer / corpus rules (stats still wrapped in `<strong>` for catalog QA).

4. **Page provider** — Append the id to the page’s `CitationsProvider` claims array in document order when introducing a new chip on that page.

5. **Verify** — `pnpm typecheck`, `pnpm lint`, `pnpm test:run tests/unit/citations/catalog.test.ts`.

---

## 3. Tooltip copy rules

- **Human prose only** in the popover: reuse the EEAT `footnote` string verbatim when possible.
- **No metadata**: omit VERIFIED / QUALIFIED pills, `n=`, dates, and methodology shorthand from the tooltip (those belong on `/footnotes` under Source).
- **Clear reference**: the chip link targets the exact registry row so readers see author, italic title, date, optional detail, and external URL.

---

## 4. Footnotes page UX notes

- Include a short legend explaining **Claim / Source / Note** columns (matches HTML header).
- Provide search/filter across all fields (parity with the HTML `<input type="search">`).
- External links: `rel="noopener noreferrer"`, `target="_blank"`, only when `url` starts with `https://`.

---

## 5. When the HTML map omits a chip

Rare chips (e.g. a Barna × Gloo statistic on toolkit read) may lack a row in the HTML export. Add a **supplement object** in `eeat-registry.ts` with the same schema, matching EEAT voice. Still register `citationIds` exactly once.

---

## 6. Deprecated pattern

- **`docs/build/prompts/inline-citation-system-with-references-rail.md`** describes the old bottom-of-page rail. Do **not** implement new rails; keep chip + `/footnotes` unless product explicitly revives print-style references.

---

## 7. Verification checklist

- [ ] New chip has `citationIds` on exactly one EEAT row.
- [ ] Tooltip shows footnote only + deep link.
- [ ] `/footnotes#ref-{id}` scrolls to the correct row (`scroll-margin-top` accounts for fixed nav).
- [ ] Footer includes discoverability link **Claims and sources** → `/footnotes`.
- [ ] No `<ReferencesRail />` mounted on shipping marketing routes above the global footer.
