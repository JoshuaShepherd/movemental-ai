# Agent prompt — ship the inline citation system (Ledger edition) across the platform

> **Outcome.** Every empirical claim on `movemental.com` sits next to its source. The visual treatment is the **Ledger edition** mockup (`docs/html/home-citations-ledger.html`): a small **amber-highlighted numbered chip** inline with the prose, a popover that names the source / claim / sample, and a numbered **References rail** at the bottom of the page that closes like a research brief. The data behind every chip is the **Movemental Research Corpus v1.0** (`docs/research/state-of-ai-2026/movemental-research-corpus-v1.md`).
>
> Treat this document as the **complete instruction set** for the implementation pass. It walks the design, the data layer, the React primitives, the editorial rules, the platform-wide audit, and the verification checklist — in order.

---

## 0. Read these files before you start

1. **Design source of truth** — [`docs/html/home-citations-ledger.html`](../../html/home-citations-ledger.html).
   The amber `--hl` palette, the chip+popover pattern, and the numbered references list are all defined there. The other two siblings (`home-citations-margin.html`, `home-citations-live.html`) are **not** the chosen design — ignore them for visuals, but read them only to understand what was rejected.
2. **Citation corpus** — [`docs/research/state-of-ai-2026/movemental-research-corpus-v1.md`](../../research/state-of-ai-2026/movemental-research-corpus-v1.md).
   This is the canon. Section 10 ("Claims to drop or revise") is **load-bearing**: the corrections there must be honored. If a stat is in Section 10's DROP list, it does not get a chip — it gets removed from the page entirely.
3. **Sourcing router** — [`docs/research/authoritative-sources-ai-nonprofits-faith-formation.md`](../../research/authoritative-sources-ai-nonprofits-faith-formation.md).
   Used when the corpus does not cover a topic and you need to pick the **best-class** authority (Pew, NIST, OECD, Stanford AI Index, etc.) for an external claim.
4. **Design constitution** — [`docs/design/DESIGN.md`](../../design/DESIGN.md). Especially the **semantic tokens only** rule. The Ledger amber needs a **named, semantic token family** — not raw hex inside components.
5. **Project rules** — [`CLAUDE.md`](../../../CLAUDE.md). Six-layer type chain, Tailwind v4 `@theme inline`, Inter font, Section primitives.

---

## 1. Definition of done

| Layer | Done means |
| --- | --- |
| **Tokens** | `--cite-hl`, `--cite-hl-strong`, `--cite-hl-ink`, `--cite-hl-soft` declared in `:root` and `html.dark` in `src/app/globals.css`, mapped through `@theme inline`. No raw amber hex in components. |
| **Data** | A typed source catalog at `src/lib/citations/sources.ts` and a typed claim catalog at `src/lib/citations/claims.ts` derived from corpus v1. Every entry has `tag` ∈ `VERIFIED \| QUALIFIED \| NEW \| DROP` mirroring the corpus. |
| **Primitives** | `<Cite />`, `<CitedNumber />`, `<CitationsProvider />`, and `<ReferencesRail />` shipped in `src/components/citations/`. |
| **Home page** | `src/app/(site)/page.tsx` (or its sections in `src/components/sections/`) renders the **exact** content of `docs/html/home-citations-ledger.html` translated into the existing primitives, with all 10 chips and the references rail wired to the catalog. |
| **Other surfaces** | Every page that asserts a number, percentage, dollar amount, sample size, or named research source has its claims **either** cited (chip + entry) **or** removed if it appears in corpus Section 10 DROP. |
| **Editorial rule** | **No more than 3 chips on a single line of prose.** Where four or more candidate sources exist for one claim, the writer/agent picks the **best one** using the rubric in §7.4. |
| **A11y** | Chips are real `<button>`s with `aria-expanded`, `aria-controls`, `aria-label="Source N"`. Popovers are `role="dialog"`. Esc closes. Tab cycles. `prefers-reduced-motion` disables the popover transition. |
| **Verification** | `pnpm typecheck`, `pnpm lint`, `pnpm test:run` green. New unit tests cover catalog integrity (no orphan refs; every claim points to a real source; no DROP-tagged sources are referenced from a live page). |

---

## 2. The design (Ledger edition) — what the system looks like

Pulled directly from `docs/html/home-citations-ledger.html`. Re-translate, do not paraphrase.

### 2.1 Color and shape

```text
--hl        : #fde68a   (amber 200 — the chip fill / page highlighter)
--hl-strong : #f59e0b   (amber 500 — focus / hover, list bullets)
--hl-ink    : #78350f   (amber 900 — chip number, source eyebrow)
--hl-soft   : #fef3c7   (amber 50  — subtle fills if needed)
```

These are **only** used by the citation system and the Ledger banner / hero italic-em treatment on the home hero. They sit outside the rest of the duotone palette deliberately, so a chip reads as an editorial annotation rather than a button.

### 2.2 Inline chip (`<Cite />`)

- Rendered **inline as superscript-ish** (`translate: 0 -0.35em`).
- Rounded pill, `min-width: 1.5em`, `height: 1.5em`, padding `0 .35em`.
- Font: Inter 700, 0.65em of the surrounding text.
- Border: `1px solid color-mix(in srgb, var(--cite-hl-strong) 30%, transparent)`.
- Hover/focus: fill goes amber-strong, text goes white. `box-shadow: 0 1px 0 ...`.
- Active (`aria-expanded="true"`): fill goes ink, text goes amber.
- Has a soft `::before` blur halo (`filter: blur(6px)`) that fades in on hover/active.

### 2.3 Popover

- Anchored absolutely below the trigger; `top: calc(100% + 0.65rem)`, `left: 50%`, `translateX(-50%)`.
- `width: min(360px, 86vw)`, `padding: 1rem 1.1rem 0.95rem`.
- `background: var(--card)`, `border-radius: 12px`, `border: 1px solid var(--border)`.
- Custom shadow stack:
  ```css
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--cite-hl-strong) 30%, transparent),
    0 18px 40px rgba(25, 21, 15, 0.12),
    0 4px 12px rgba(25, 21, 15, 0.06);
  ```
- Triangle pointer above the popover via `::before` clip-path (color: `var(--cite-hl)`).
- Header line: small uppercase eyebrow with a tag pill (e.g. `VERIFIED`, `NEW`).
- Body: claim sentence (with `<strong>` for the actual numbers).
- Meta row: pill-separated facts (year, sample size, methodology shorthand).
- Footer: a "See source ↗" link that anchors to the page's `<ReferencesRail />` entry.

### 2.4 References rail

- Section background `var(--section)`, top hairline border.
- `<h2>` "References" + meta line ("All claims on this page are tied back to primary sources. Confidence tags follow the Movemental research corpus.").
- `<ol>` with CSS `counter-reset: ref` and `::before` rendering an amber pill of the number.
- Each `<li>` shows: bold author/org, italicized title, date, then a meta-row of `n=`, the confidence tag, and the URL.

### 2.5 Body marker

- Class `.marker` paints a 38%-tall amber underline behind important phrases (`linear-gradient(180deg, transparent 62%, var(--cite-hl) 62%)`).
- Use sparingly — never on more than one phrase per paragraph. It is a spotlight, not a background.

### 2.6 What the design does **not** do

- It does not render footnotes as raw superscript numbers. Always the chip.
- It does not chain three chips into a single sentence-final blob. Chips sit **next to the specific clause** they cite.
- It does not place the chip inside a heading. Headings stay clean. If a heading needs grounding, the supporting line below it carries the chip.

---

## 3. Token additions (Tailwind v4)

Edit `src/app/globals.css`. Add, **inside** the existing `:root` block:

```css
/* citation system — Ledger highlighter */
--cite-hl: #fde68a;
--cite-hl-strong: #f59e0b;
--cite-hl-ink: #78350f;
--cite-hl-soft: #fef3c7;
```

And inside `html.dark`:

```css
/* citation system — keep amber identity but soften for dark */
--cite-hl: #f5c450;
--cite-hl-strong: #f59e0b;
--cite-hl-ink: #fde68a;
--cite-hl-soft: #3a2407;
```

Then expose them through `@theme inline`:

```css
@theme inline {
  --color-cite-hl: var(--cite-hl);
  --color-cite-hl-strong: var(--cite-hl-strong);
  --color-cite-hl-ink: var(--cite-hl-ink);
  --color-cite-hl-soft: var(--cite-hl-soft);
}
```

This makes `bg-cite-hl`, `text-cite-hl-ink`, etc. available as utilities. Do **not** import the raw hexes anywhere else.

---

## 4. The data layer

### 4.1 Sources catalog — `src/lib/citations/sources.ts`

Every source from corpus Section 12 (the appendix index) becomes one entry. Use stable kebab-case ids. Confidence tag mirrors the corpus exactly.

```ts
export type ConfidenceTag = "VERIFIED" | "QUALIFIED" | "NEW";

export type CitationSource = {
  id: string;
  /** Author / organization line as rendered in the references rail */
  author: string;
  /** Italicized title */
  title: string;
  /** Publication date as a short human string ("February 16, 2026") */
  date: string;
  /** Sample frame summary, e.g. "n = 1,003 Protestant senior pastors · phone · ±3.3%" */
  sample?: string;
  tag: ConfidenceTag;
  url: string;
  /** Corpus section reference (Section X.Y), used for traceability */
  corpusSection: string;
};

export const sources = {
  "virtuous-2026": {
    id: "virtuous-2026",
    author: "Virtuous & Fundraising.AI",
    title: "The 2026 Nonprofit AI Adoption Report",
    date: "February 16, 2026",
    sample: "n = 346",
    tag: "VERIFIED",
    url: "https://virtuous.org/resource/the-2026-nonprofit-ai-adoption-report-download/",
    corpusSection: "2.1.1",
  },
  "techsoup-2025": {
    id: "techsoup-2025",
    author: "TechSoup & Tapp Network",
    title: "State of AI in Nonprofits 2025",
    date: "January 24, 2025",
    sample: "n = 1,321",
    tag: "VERIFIED",
    url: "https://page.techsoup.org/ai-benchmark-report-2025",
    corpusSection: "2.1.2",
  },
  "lifeway-pastors-2026": {
    id: "lifeway-pastors-2026",
    author: "Lifeway Research",
    title: "Pastors' Views on Artificial Intelligence",
    date: "Conducted Sept 2025 · released April 21, 2026",
    sample: "n = 1,003 Protestant senior pastors · phone · ±3.3%",
    tag: "VERIFIED",
    url: "https://research.lifeway.com/2026/04/21/pastors-churchgoers-see-ai-as-concerning-and-confusing/",
    corpusSection: "2.2.1",
  },
  "barna-pushpay-2026": {
    id: "barna-pushpay-2026",
    author: "Barna Group & Pushpay",
    title: "Technology for Missional Impact: State of Church Tech 2026",
    date: "Released March 9, 2026",
    sample: "n = 1,306 U.S. church leaders",
    tag: "NEW",
    url: "https://www.barna.com/research/church-leaders-ai-usage-concerns/",
    corpusSection: "2.2.2",
  },
  "barna-gloo-sotc-2026": {
    id: "barna-gloo-sotc-2026",
    author: "Barna Group & Gloo",
    title: "State of the Church 2026 — AI Series",
    date: "November 2025 onward",
    sample: "n = 1,514 U.S. adults · online",
    tag: "NEW",
    url: "https://www.barna.com/research/state-of-the-church-2026-trends/",
    corpusSection: "2.2.3",
  },
  "lifeway-churchgoers-2026": {
    id: "lifeway-churchgoers-2026",
    author: "Lifeway Research",
    title: "Protestant Churchgoer Views on Artificial Intelligence",
    date: "Conducted Sept 2025 · released April 21, 2026",
    sample: "n = 1,200 monthly-attending Protestant churchgoers · ±3.2%",
    tag: "NEW",
    url: "https://research.lifeway.com/wp-content/uploads/2026/04/American-Churchgoers-Sept-2025-AI-Report.pdf",
    corpusSection: "2.2.4",
  },
  "mckinsey-soa-2025": {
    id: "mckinsey-soa-2025",
    author: "McKinsey & Company",
    title: "The State of AI in 2025: Agents, Innovation, and Transformation",
    date: "November 2025",
    sample: "n = 1,993 across 105 nations",
    tag: "NEW",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    corpusSection: "2.3.1",
  },
  "bcg-value-gap-2025": {
    id: "bcg-value-gap-2025",
    author: "Boston Consulting Group",
    title: "The Widening AI Value Gap — Build for the Future 2025",
    date: "September 2025",
    sample: "n = 1,250 firms",
    tag: "NEW",
    url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-October-2025.pdf",
    corpusSection: "2.3.2",
  },
  "mit-nanda-2025": {
    id: "mit-nanda-2025",
    author: "MIT NANDA Initiative",
    title: "The GenAI Divide: State of AI in Business 2025",
    date: "July 2025",
    sample: "150 interviews · 350 surveys · 300 deployments",
    tag: "NEW",
    url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/",
    corpusSection: "2.3.3",
  },
  "stanford-hai-2026": {
    id: "stanford-hai-2026",
    author: "Stanford HAI",
    title: "AI Index Report 2026",
    date: "April–May 2026",
    tag: "NEW",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    corpusSection: "2.4.2",
  },
  "fbi-ic3-2025": {
    id: "fbi-ic3-2025",
    author: "FBI Internet Crime Complaint Center",
    title: "2025 IC3 Annual Report",
    date: "Published 2026",
    tag: "VERIFIED",
    url: "https://www.ic3.gov/",
    corpusSection: "4.1.1",
  },
  "forvis-mazars-2026": {
    id: "forvis-mazars-2026",
    author: "Forvis Mazars",
    title: "AI Governance for Nonprofit Boards",
    date: "February 13, 2026",
    tag: "VERIFIED",
    url: "https://www.forvismazars.us/forsights/2026/02/ai-governance-for-nonprofit-boards",
    corpusSection: "3.1",
  },
  "vatican-antiqua-et-nova-2025": {
    id: "vatican-antiqua-et-nova-2025",
    author: "Vatican (Dicastery for the Doctrine of the Faith and Dicastery for Culture and Education)",
    title: "Antiqua et Nova: Note on the Relationship Between AI and Human Intelligence",
    date: "January 28, 2025",
    tag: "NEW",
    url: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_ddf_doc_20250128_antiqua-et-nova_en.html",
    corpusSection: "6.3.2",
  },
  "kolb-1984": {
    id: "kolb-1984",
    author: "David A. Kolb",
    title: "Experiential Learning: Experience as the Source of Learning and Development",
    date: "1984; 2nd ed. 2014",
    tag: "VERIFIED",
    url: "https://www.pearson.com/en-us/subject-catalog/p/experiential-learning-experience-as-the-source-of-learning-and-development/P200000005942",
    corpusSection: "6.1.1",
  },
  "pink-drive-2009": {
    id: "pink-drive-2009",
    author: "Daniel H. Pink",
    title: "Drive: The Surprising Truth About What Motivates Us",
    date: "Riverhead Books, 2009",
    tag: "VERIFIED",
    url: "https://www.danpink.com/books/drive/",
    corpusSection: "6.2.1",
  },
  "smith-yawl-2016": {
    id: "smith-yawl-2016",
    author: "James K. A. Smith",
    title: "You Are What You Love",
    date: "Brazos Press, 2016",
    tag: "NEW",
    url: "https://bakerpublishinggroup.com/books/you-are-what-you-love/385920",
    corpusSection: "6.3.1",
  },
  "gloo-faic-2025": {
    id: "gloo-faic-2025",
    author: "Gloo",
    title: "Flourishing AI Christian (FAI-C) Benchmark",
    date: "December 15, 2025",
    sample: "807 curated questions · 7 dimensions",
    tag: "VERIFIED",
    url: "https://gloo.com/press/releases/gloo-unveils-the-first-benchmark-exposing-how-ai-misses-christian-worldview-and-values",
    corpusSection: "8.3.1",
  },
} as const;

export type SourceId = keyof typeof sources;
```

> **Note.** This list is the **starter set** drawn from corpus v1's appendix. Add additional rows for any other corpus sources you cite (Bergsteiner et al., Morris 2019, Notre Dame DELTA, etc.) **only when** a page actually invokes them. Do not pre-populate orphans.

### 4.2 Claim catalog — `src/lib/citations/claims.ts`

A claim is the **page-facing** atom: "92% nonprofits use AI." Each claim has its own id, points to one canonical source, and carries the popover copy. Claims are reusable across pages.

```ts
import { sources, type SourceId } from "./sources";

export type Citation = {
  id: string;
  /** Pointer to the row in `sources.ts` */
  source: SourceId;
  /** What the popover says — one or two sentences max. Numbers in <strong>. */
  claim: string;
  /** Short meta facts shown as pill-separated dots in the popover */
  meta?: string[];
  /** Confidence override (defaults to source.tag) */
  tag?: "VERIFIED" | "QUALIFIED" | "NEW";
};

export const citations = {
  "nonprofit-92-adoption": {
    id: "nonprofit-92-adoption",
    source: "virtuous-2026",
    claim:
      "<strong>92%</strong> of nonprofits report using AI in some capacity. Only <strong>7%</strong> report major capability improvement.",
    meta: ["2026 Nonprofit AI Adoption Report", "n = 346", "Feb 16, 2026"],
  },
  "nonprofit-81-adhoc": {
    id: "nonprofit-81-adhoc",
    source: "virtuous-2026",
    claim:
      "<strong>81%</strong> of organizations report using AI individually and on an ad hoc basis. <strong>4%</strong> have documented, repeatable AI workflows.",
    meta: ["2026 Nonprofit AI Adoption Report", "n = 346"],
  },
  "high-performer-cohort-5-7": {
    id: "high-performer-cohort-5-7",
    source: "mckinsey-soa-2025",
    claim:
      "Across nonprofit, enterprise, and faith-sector studies the high-performer cohort lands at <strong>5–7%</strong>. McKinsey: <strong>6%</strong> AI high performers (n = 1,993). BCG: <strong>5%</strong> &ldquo;future-built&rdquo; (n = 1,250). MIT NANDA: <strong>95%</strong> of GenAI pilots fail.",
    meta: ["Converged finding · 2025", "4 independent studies"],
  },
  "nonprofit-47-no-policy": {
    id: "nonprofit-47-no-policy",
    source: "virtuous-2026",
    claim:
      "<strong>47%</strong> of nonprofits have <strong>no</strong> AI governance policy. TechSoup's adjacent measure: <strong>76%</strong> have no formal AI strategy (n = 1,321).",
    meta: ["Reports cited side-by-side as a range"],
  },
  "fbi-ic3-893m": {
    id: "fbi-ic3-893m",
    source: "fbi-ic3-2025",
    claim:
      "<strong>$893M</strong> in adjusted losses tied to AI-related scams in 2025. <strong>22,364</strong> AI-flagged complaints. <strong>$352M</strong> of those losses sustained by Americans 60+. Voice cloning fraud rose <strong>400%+</strong> year-over-year.",
    meta: ["FBI Internet Crime Complaint Center", "Published 2026"],
  },
  "barna-gloo-spiritual-trust-1-in-3": {
    id: "barna-gloo-spiritual-trust-1-in-3",
    source: "barna-gloo-sotc-2026",
    claim:
      "Nearly <strong>1 in 3</strong> U.S. adults agree spiritual advice from AI is as trustworthy as advice from a pastor. <strong>2 in 5</strong> among Gen Z and Millennials. Yet only <strong>12%</strong> of pastors say they feel comfortable teaching about AI.",
    meta: ["n = 1,514", "Nov 2025"],
  },
  "barna-pushpay-church-tech-2026": {
    id: "barna-pushpay-church-tech-2026",
    source: "barna-pushpay-2026",
    claim:
      "<strong>60%</strong> of church leaders use AI monthly · <strong>33%</strong> church-wide use · <strong>5%</strong> with formal policy · <strong>64%</strong> believe a policy is important.",
    meta: ["n = 1,306", "Released March 9, 2026"],
  },
  "lifeway-pastor-42-use": {
    id: "lifeway-pastor-42-use",
    source: "lifeway-pastors-2026",
    claim:
      "<strong>10%</strong> regular AI users · <strong>32%</strong> experimenting · <strong>56%</strong> non-users. <strong>84%</strong> worry about reliability of generated content. <strong>55%</strong> say &ldquo;AI isn't a person.&rdquo;",
    meta: ["n = 1,003 Protestant senior pastors", "Phone · ±3.3%", "Sept 2025 · released April 21, 2026"],
  },
  "mckinsey-workflow-redesign": {
    id: "mckinsey-workflow-redesign",
    source: "mckinsey-soa-2025",
    claim:
      "<strong>55%</strong> of high-performers have fundamentally redesigned at least some workflows; the rest of the field sits near <strong>20%</strong>. Workflow redesign is McKinsey's strongest correlate of AI EBIT impact (<strong>3.6&times;</strong> for transformative-change pursuers).",
    meta: ["n = 1,993 across 105 nations", "Nov 2025"],
  },
  // …add new claims here as pages invoke them
} as const satisfies Record<string, Citation>;

export type CitationId = keyof typeof citations;
```

### 4.3 Catalog tests — `tests/citations/catalog.test.ts`

Author one Vitest spec that asserts:

1. Every `citations[id].source` exists in `sources`.
2. No `citations[id]` carries the literal text of any DROPPED claim from corpus Section 10. Hard-code the DROP list inline (the `91%` of church leaders use AI, the `9%` formal AI policy, the `25% of churches encountered AI scams`).
3. Every `sources[id].url` is a non-empty string starting with `https://`.

This catches corpus drift — if a teammate copies an old stat back in, CI fails.

---

## 5. The React primitives

All four files live in `src/components/citations/`.

### 5.1 `CitationsProvider`

The provider tracks which `claimId`s appear on the current page **in document order** so each chip gets a stable sequential number and the references rail can render the matching list.

Behavior:

- The author **declares** the page's citations in an array (so SSR can render numbers without a client roundtrip):
  ```tsx
  const PAGE = ["nonprofit-92-adoption", "nonprofit-81-adhoc", "high-performer-cohort-5-7", ...] as const;

  <CitationsProvider claims={PAGE}>...</CitationsProvider>
  ```
- Inside, `<Cite claimId="nonprofit-92-adoption" />` looks up its **index + 1** from the provider; that's the chip number.
- A `<ReferencesRail />` rendered inside the same provider iterates the same list and emits the `<ol>`.

Implementation: a tiny React context exposing `{ claims: readonly CitationId[]; numberFor(id): number }`. No state, no effects, no client-only requirements — pure prop-derived. Mark the file with `"use client"` only if needed by the popover (see §5.2 — yes, it is).

### 5.2 `<Cite />`

Use **Radix Popover** (already a transitive dep via shadcn) instead of hand-rolling click handlers. It gets us focus management, Esc-to-close, scroll-aware placement, and SSR-safe portals for free.

- Trigger: `<button>` with `data-cite-chip`, classes for the amber pill, `aria-label="Source N"`.
- Content: `<Popover.Content side="bottom" align="center" sideOffset={10}>` styled to match §2.3.
- Inside the content: an `<header>` with the source-tag eyebrow, a `<p>` for the claim (use `dangerouslySetInnerHTML` for the `<strong>` markup pre-baked in the catalog — this is sanitized authored content, not user input), a meta row, a "See source ↗" link to `#ref-{id}`.

Public API:

```tsx
<Cite claimId="nonprofit-92-adoption" />
// renders the chip with the auto-assigned page number
```

### 5.3 `<CitedNumber />`

A convenience wrapper for stat-strip cells, where the chip needs to be wedged tight against a hero-sized number without breaking baseline. Renders the value plus an inline `<Cite />`:

```tsx
<CitedNumber value="92%" claimId="nonprofit-92-adoption" />
```

### 5.4 `<ReferencesRail />`

- Renders a `<Section variant="section">` with a top border.
- `<h2>` and meta line.
- `<ol id="references">` with each `<li id={`ref-${citationId}`}>` pulling source metadata. The number is the same number the chip showed.
- Each `<li>` follows the structure in §2.4.

### 5.5 `<Marker />`

A tiny span helper that paints the `linear-gradient` underline. Used inside body prose around the **single most important phrase** in a paragraph.

```tsx
<Marker>major capability gain</Marker>
```

### 5.6 Style sheet

Author `src/components/citations/citations.css` with the chip, popover, marker, and references-rail rules transcribed from the mockup, swapping every raw hex for a token utility (`var(--cite-hl)` etc.). Import once from `globals.css`:

```css
@import "../components/citations/citations.css";
```

(Or import inside the layout if global CSS imports are not allowed at the component level — verify the project's existing convention before deciding.)

### 5.7 Reduced-motion and dark-mode behavior

- Wrap the popover open/close transition in `@media (prefers-reduced-motion: no-preference)` so users with reduced motion get instant open/close.
- Verify chip visibility against both `var(--background)` (light) and `var(--inverse-surface)` (midnight bands). If contrast is too low on midnight, **swap** the chip palette inside `.bg-inverse-surface` ancestor:
  ```css
  .bg-inverse-surface .cite__btn { background: var(--cite-hl); color: var(--cite-hl-ink); }
  ```
  Test live, do not assume.

---

## 6. Translate the home page

Mockup target: `docs/html/home-citations-ledger.html`.

Live target: home is currently composed in `src/app/(site)/page.tsx` (Server Component) plus section files in `src/components/sections/`.

Walk it section-by-section:

### 6.1 Hero — `HeroLedger`

Build (or update) `src/components/sections/hero-ledger.tsx` so the lede line reads exactly as in the mockup:

```
92% of nonprofits already use AI [1]. Most use is reactive, individual, and ad-hoc [2] —
and the gap between adoption and actual capability is now the single most documented
finding in the field.
```

with chips wired to `nonprofit-92-adoption` and `nonprofit-81-adhoc`. Use the **Instrument Serif italic em** treatment for the word "inside" in the H1, painting it with the amber underline (`<Marker as="em">inside</Marker>`).

### 6.2 Stat strip — `StatStripLedger`

Use the existing `<StatStrip />` primitive shape but allow each cell to take a `claimId`. The four cells:

| Value | claimId | Label phrase to wrap in `<Marker>` |
| --- | --- | --- |
| `7%` | `high-performer-cohort-5-7` | major capability gain |
| `47%` | `nonprofit-47-no-policy` | no AI governance policy |
| `$893M` | `fbi-ic3-893m` | AI-fraud losses |
| `1 in 3` | `barna-gloo-spiritual-trust-1-in-3` | spiritual guidance |

### 6.3 Gap argument — `GapArgumentLedger`

Two-column grid (eyebrow + heading on the left; long-form prose on the right). Three paragraphs from the mockup. Chip placements (3 chips total — at the rule-of-three limit):

1. **Para 1**: `high-performer-cohort-5-7` (one chip — McKinsey is the **best** anchor; do not also chip BCG/MIT here).
2. **Para 2**: `barna-pushpay-church-tech-2026` and `lifeway-pastor-42-use` (two chips — they cite different studies for genuinely different claims).

> **Editorial rule check.** No paragraph hits 4 chips. The "60% leaders / 33% church / 5% policy / 64% want policy" cluster is one Barna/Pushpay claim → one chip, even though it carries four numbers.

### 6.4 The Path — `PathLedger`

Single chip on the lede (`mckinsey-workflow-redesign`), then the four-stage hairline grid. **No chips on the stage cards** — they are framework copy, not empirical claims.

### 6.5 Closing CTA — `ClosingCtaLedger`

No chips. Pure conversion band. Keep the `Marker` on "walked" in the heading.

### 6.6 References rail

```tsx
const HOME_CLAIMS = [
  "nonprofit-92-adoption",
  "nonprofit-81-adhoc",
  "high-performer-cohort-5-7",
  "nonprofit-47-no-policy",
  "fbi-ic3-893m",
  "barna-gloo-spiritual-trust-1-in-3",
  "barna-pushpay-church-tech-2026",
  "lifeway-pastor-42-use",
  "mckinsey-workflow-redesign",
] as const;

<CitationsProvider claims={HOME_CLAIMS}>
  <HeroLedger />
  <StatStripLedger />
  <GapArgumentLedger />
  <PathLedger />
  <ClosingCtaLedger />
  <ReferencesRail />
</CitationsProvider>
```

### 6.7 Visual parity check

Open both files side-by-side in two tabs:

- Mockup: `docs/html/home-citations-ledger.html` (open via `pnpm reader:serve` or directly).
- Live: `pnpm dev` → `http://localhost:3000/`.

Diff visually for: chip baseline, popover triangle alignment, marker underline thickness, references rail counter pill size, hero italic-em underline. Adjust `translate`, `font-size`, and `padding` until they match within ~2px.

---

## 7. Cross-platform audit and rollout

The home page is the model. Do not re-invent the system on other pages — **port the same primitives** and add only those claims to the catalog as needed.

### 7.1 Audit — every page in `src/app/(site)/`

For each route, read the rendered output and produce a **claim ledger** for that page. A claim is any sentence that contains:

- A **percentage** (`%`)
- A **dollar amount** (`$`)
- A **count** (`1 in 3`, `over 22,000`, `~150 firms`)
- A **named research source** (Barna, Lifeway, McKinsey, Pew, Stanford HAI, FBI, ECFA, Vatican, Notre Dame, Pushpay, Subsplash)
- A **time-bound assertion** with empirical content ("rose 400% year-over-year")

Produce, per page, a markdown checklist like:

```md
### /nonprofits — claim ledger

- [ ] "Most nonprofits use AI but only 7% report capability gain."
      → cite: nonprofit-92-adoption, high-performer-cohort-5-7 (2 chips, OK)
- [ ] "Nonprofits experienced a 50% increase in cyberattacks since 2020."
      → cite: NEW source needed — corpus 4.3.1 → add `itrc-nonprofit-cyber` to sources.ts
- [ ] "47–76% of nonprofits have no governance framework."
      → DROP-revise per corpus 10.4 — replace with the side-by-side phrasing and chip nonprofit-47-no-policy.
- [ ] "9% of churches have a formal AI policy."
      → DROP per corpus 10.2 → replace number with 5%, switch chip to barna-pushpay-church-tech-2026.
- [ ] "91% of church leaders use AI."
      → DROP per corpus 10.1. Remove. Replace with the 60%/33% / 42% framing and the two chips above.
- [ ] "25% of churches have encountered AI-generated scams."
      → DROP per corpus 10.3. Remove sentence entirely; substitute the FBI IC3 framing if rhetorically needed.
```

Save the per-page ledgers to `docs/build/citation-ledgers/<route>.md` so a reviewer can cross-check edits. Once a ledger row is wired into the page, mark it `[x]`.

### 7.2 Pages to walk in this exact order

1. **Home** (`/`) — already done in §6.
2. **`/who-we-serve`** (audience hub) — heavy on adoption stats.
3. **`/methodology`** (the four-stage path explainer) — frame the McKinsey workflow-redesign correlate as a chip in the Skills/Solutions justification.
4. **`/evidence`** — this page is a natural home for a **page-level expanded references rail** (essentially a public version of the corpus Section 10 corrections). It can show every catalogued source even if the page itself does not invoke each as a chip; the rail just becomes the page content.
5. **`/case-studies`** — apply chips only to comparator stats, not to client-named outcomes (those have their own attribution treatment).
6. **`/services`** and **`/pricing`** — usually no chips. If the value-prop copy quotes a stat, cite it.
7. **`/about`**, **`/faq`**, **`/walkthrough`** — same rule: chip every empirical claim, drop anything in corpus Section 10's DROP list.
8. **Audience pages (`/churches`, `/nonprofits`, `/institutions`)** — most likely to carry old, uncited stats. Do these last and slowly.
9. **Legal pages (`/privacy`, `/terms`, `/cookies`)** — no chips. Skip.
10. **System / design preview (`/system`)** — add a live demo of the citation primitives so designers can see the components without the prose around them.

### 7.3 Per-claim agent loop

For every flagged claim:

1. Locate the **best** corpus source for it (§7.4).
2. If the claim is in corpus Section 10 DROP, **delete the sentence** or rewrite it to the corpus's replacement phrasing. Do not chip a DROPPED claim.
3. If the source is not yet in `sources.ts`, add it with `corpusSection` set.
4. If the claim is not yet in `claims.ts`, add it.
5. Wrap the in-prose number with `<Cite claimId="…" />` immediately after the relevant clause (not at the end of the sentence — next to the actual number).
6. Append the new claim id to the page's `claims` array, in the order it appears in the document.
7. Verify the references rail picks it up.

### 7.4 "Pick the best citation" rubric

When more than one source could anchor a claim, choose in this order:

1. **Verified primary source over secondary synthesis.** A government / NIST / FBI / Pew / Stanford HAI primary report beats a vendor whitepaper that quotes them.
2. **Sector match.** A nonprofit-sector source (Virtuous, TechSoup) for nonprofit claims; a church-sector source (Barna/Pushpay, Lifeway) for church claims. Do not cite McKinsey for a nonprofit-specific claim if Virtuous covers it.
3. **Sample quality.** Larger and methodologically cleaner samples win. Lifeway's stratified random phone survey (n=1,003, ±3.3%) outranks a self-selected web panel of similar size.
4. **Recency.** Within the last 18 months unless the claim is intentionally historical.
5. **Single-anchor preference.** If two roughly equivalent sources back the same claim, pick the **one** that supports the strongest part of the sentence and drop the second. Two chips on the same clause read as hedging.
6. **Convergent finding shorthand.** When the claim is genuinely a cross-study pattern (the **5–7%** high-performer cohort), use the **`high-performer-cohort-5-7`** claim — it lists the studies inside the popover. Do not chain three separate chips for McKinsey, BCG, and MIT NANDA.

### 7.5 The 3-chip ceiling — enforcement

A hard rule: **no line of prose carries more than 3 chips.**

If a sentence wants four:

1. Try to **collapse two** into a single convergent-finding claim (§7.4 rule 6).
2. Otherwise **split the sentence**. Two clean sentences with two chips each beat one ugly sentence with four.
3. Only if neither is possible — and that should be rare — drop the **weakest** chip per §7.4.

Add an automated lint: a small Vitest source-code scan that walks `.tsx` files under `src/app/(site)/` and `src/components/sections/`, counts `<Cite ` per JSX expression block, and fails if any single returned JSX node has more than 3 `<Cite />` children siblings without an interleaving block element. Keep the heuristic loose; it is a safety net, not a parser.

---

## 8. Accessibility and UX details

- **Keyboard.** Tab focuses each chip. Enter / Space opens the popover. Esc closes. Tab inside the popover cycles between the source link and (if any) the close affordance, then returns to the chip.
- **Screen readers.** The `aria-label` on the chip should be `Source ${n}: ${sources[claim.source].author}` so a blind reader hears "Source 1: Virtuous and Fundraising A I, button" rather than just "1".
- **Click outside** closes the popover. Radix Popover handles this for free.
- **Print stylesheet.** When the page is printed, render the popover content **inline as a footnote** beneath the paragraph. Add `@media print { .cite__pop { position: static; opacity: 1; pointer-events: auto; } }` plus a counter-based numeric prefix.
- **Anchor links.** Every chip's "See source ↗" link should `scroll-margin-top: 6rem` so the references rail entry doesn't get hidden under the fixed nav.
- **No DROP citations in prod.** The catalog test in §4.3 is the gate, but also add a runtime `console.warn` in `<Cite />` (development only) if a `claimId` resolves to a DROPPED source — belt and braces.

---

## 9. Verification checklist

Run, in order:

```bash
pnpm typecheck
pnpm lint
pnpm test:run
pnpm dev   # walk the home page; click every chip; tab through; print preview
```

Then page-by-page:

| Check | Pass condition |
| --- | --- |
| Visual parity with `home-citations-ledger.html` | Side-by-side, chips and rail look identical to the mockup at 1280px |
| Every chip popover has a source pill, claim sentence, meta row, and "See source" link | Yes for all 9+ home chips |
| References rail order matches chip order on the page | Numbers `1…N` count up as you scroll |
| No more than 3 chips on any single line | True on every page in `(site)/` |
| No corpus Section 10 DROP claim renders to the DOM | Grep results empty for `91%`, `25% of churches`, the literal phrases |
| Dark mode (toggle via nav sun/moon) leaves chips readable | True; if not, see §5.7 |
| Reduced-motion users see chips without the open/close fade | Test by setting OS-level `prefers-reduced-motion: reduce` |
| Print preview renders popover content inline as a footnote | True |
| `pnpm test:run` includes the catalog integrity tests and they pass | True |

---

## 10. Output expectations for the agent doing this work

When you finish, leave the repository with:

1. The token additions in `globals.css`.
2. `src/lib/citations/sources.ts`, `src/lib/citations/claims.ts`, and the catalog spec.
3. `src/components/citations/{citations-provider,cite,cited-number,references-rail,marker}.tsx` and the supporting `.css`.
4. Updated home page sections wired through the provider.
5. `docs/build/citation-ledgers/<route>.md` for every audited route.
6. A short `docs/build/citation-ledgers/_summary.md` listing pages updated, claims added, claims dropped, and any new sources added to the catalog.
7. A green typecheck, lint, and test run.

Do **not**:

- Re-style the rest of the site to match amber. The amber is **citation-only**.
- Add chips to client testimonials, framework descriptions, or aspirational copy.
- Edit the corpus markdown to fit a page. The corpus is upstream; pages adapt.
- Skip reading corpus Section 10 before chipping a number. Most subtle bugs are there.

---

## 11. Why this prompt works (read once, then proceed)

This is not a "decorate the home page with footnotes" task. It is the **trust scaffold** for everything Movemental will publish. Three reasons it has to land cleanly:

1. **The thesis is "formation precedes deployment."** A site that asserts that thesis without showing its empirical work undercuts itself. Every chip is a small act of intellectual honesty, and the rail at the bottom is a research brief signature.
2. **The corpus is corrected.** Earlier drafts of Movemental copy carried specific numbers (the **91%**, the **9%**, the **25% scams**) that turned out to be wrong. Section 10 of `movemental-research-corpus-v1.md` exists because we found that out. Wiring chips through the catalog is how we make those corrections **structural** instead of editorial.
3. **One chip = one claim.** Strict 3-chip ceiling, best-of rule, single anchor preference. The discipline is the design.

Build it once. Apply it everywhere.
