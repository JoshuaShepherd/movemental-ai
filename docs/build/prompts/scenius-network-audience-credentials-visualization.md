# Agent prompt — scenius network + audience credentials (Churches · Nonprofits · Institutions)

## Outcome

The **credibility graph** (Alan-centric scenius mesh + trusted voices) should stay visually coherent while **surfacing Movemental’s three public audience segments** as **first-class, inspectable credentials**—not as a fourth funnel card, but as **EEAT depth signals** buyers can filter and read.

**Preview today**: static HTML at `/docs/html/scenius-network-v3/` when served (e.g. `http://localhost:8080/docs/html/scenius-network-v3/`). **Production direction**: the same conceptual model powers **`movement-voices-network`** / home credibility band and any standalone network explorer.

**Canonical audience × voice reasoning** lives in:

- [`docs/movement_leader_research/site-voices-eeat-audience-credentials.md`](../../movement_leader_research/site-voices-eeat-audience-credentials.md)

Do **not** invent nonprofit/church/institution claims: every row must trace to **`site-voices-eeat-audience-credentials.md`** and its cited sources (research folders, `/about`, etc.).

---

## 0. Single sources of truth (read before modeling)

| Asset | Role |
| --- | --- |
| [`site-voices-eeat-audience-credentials.md`](../../movement_leader_research/site-voices-eeat-audience-credentials.md) | **Editorial SSOT** for how each **named site voice** maps to **Churches / Nonprofits / Institutions**: definitions of segments, per-person EEAT notes, cross-voice matrix (●●● / ●● / ●), strategic pairing guidance. |
| [`src/components/sections-mock/home/voices-graph-data.ts`](../../../src/components/sections-mock/home/voices-graph-data.ts) | **Topology SSOT** for the live React graph: stable **slugs**, display names, titles, headshots, `appearOrder`, center node id. |
| [`scripts/generate-scenius-network-v3-html.py`](../../../scripts/generate-scenius-network-v3-html.py) | Emits static v3 HTML; currently embeds a **simplified** `LEADERS` list with placeholder bios and a single `topics[]` tag per leader—**treat as a sketch**, not production copy. |
| [`docs/reference/scenius-network-visualization/README.md`](../../reference/scenius-network-visualization/README.md) | Intent: scenius as **credibility graph**, hub + tiers, scroll/story possibilities. |

**Invariant**: Slugs in graph data (`alan-hirsch`, `brad-brisco`, …) must **join** to credential rows by the same slug so React, static HTML, and docs never drift.

---

## 1. Conceptual model — two layers, one canvas

### Layer A — **Network topology** (relationship / scenius)

- **Nodes**: Movemental center + trusted voices (+ optional future org nodes—only if product asks for it; default is **people-first**).
- **Edges**: Credibility adjacency (who amplifies / co-authors / shares platforms with whom). Topology may remain a **mesh**, **sparse curated edges**, or **research-derived** weights later; the credentials work **does not require** changing edge logic on day one.
- **Job**: Answer “who are we surrounded by?” and “how dense is the field correction?”

### Layer B — **Audience credential overlay** (buyer relevance)

- **Dimensions**: Exactly three—**churches**, **nonprofits**, **institutions**—as defined in the EEAT doc’s column headers (executive pastors / elder teams; nonprofit EDs & boards; seminary / denominational / training-network infrastructure).
- **Strength**: Encode the cross-voice matrix semantics as an ordered enum, e.g. `none | light | moderate | strong` aligned to ● / ●● / ●●● (and **absent** where the doc says not to infer).
- **Job**: Answer “for *my* organization type, whose lived authority is strongest?” without collapsing voices into a competing audience funnel.

**Visualization rule**: Changing segment filter **highlights and sorts** credential signal; it **does not** hide the whole graph unless the UI explicitly enters a “filtered-only” mode (avoid implying non-selected segments are “out of network”).

---

## 2. Data shape (recommended)

Introduce a small typed blob (JSON or TS module) exportable to both React and the Python HTML generator:

```ts
/** Slug keys match VoiceGraphVoice.id / EEAT doc rows */
export type AudienceSegment = "churches" | "nonprofits" | "institutions";

export type AudienceCredentialStrength = "none" | "light" | "moderate" | "strong";

export interface VoiceAudienceCredentials {
  slug: string;
  /** Per segment — omit segment only if truly not applicable; use "none" when applicable but thin */
  segments: Partial<Record<AudienceSegment, AudienceCredentialStrength>>;
  /** Optional one-line public rationale per segment (tooltip / panel); must trace to EEAT doc bullets */
  summaryBySegment?: Partial<Record<AudienceSegment, string>>;
  /** Links into movement_leader_research for internal QA (not necessarily rendered publicly) */
  researchHints?: string[];
}
```

**Population workflow**:

1. **Authoritative pass**: For each voice in `MOVEMENT_VOICES`, copy **strength** from the cross-voice matrix + prose section headers in `site-voices-eeat-audience-credentials.md`.
2. **Summaries**: Distill **one sentence per segment** from the doc’s Experience / Expertise / Authoritativeness / Trust bullets—reader-facing, no internal methodology jargon.
3. **Gaps**: If a voice has **no** documented segment mapping, use `researchPending: true` and neutral UI until the EEAT doc is updated — never fabricate chair, board, or faculty claims.

**Regression guard** (optional but valuable): a Vitest test that every `MOVEMENT_VOICES` id has a credentials row **or** an explicit exception list reviewed in PR.

---

## 3. Interaction vision — pairing graph + credentials

### Global controls

- **Segment toggles** (multi-select): Churches, Nonprofits, Institutions—styled as **filters on credential depth**, not persona tabs.
- **“Clear filters”** restores neutral mesh emphasis.

### Per-node encoding (pick one primary + one secondary pattern)

1. **Glyph ring or corner ticks**: three ticks around an avatar (or a compact triangle badge) with opacity / fill mapped to `strong → light`; reduces clutter vs three full labels.
2. **Ambient halo**: subtle semantic token tint when a segment filter is active (still accessible: do not rely on color alone—pair with weight or pattern).
3. **Edge emphasis**: optional future—boost edge opacity among nodes that both score ≥ `moderate` on the active segment (advanced; ship after base panel works).

### Detail panel (required for comprehension)

On focus / click:

- **Identity**: name, public title (from `voices-graph-data`), headshot.
- **Audience credential strip**: three rows or chips with strength + **short EEAT-grounded copy** pulled from the structured blob (not lorem; not placeholder bios).
- **Strategic hint** (optional pull-quote): when the EEAT doc gives a pairing recommendation (“triple-layer voices”, “pair practitioner with institutions voice”), show **one** italic line **only** if it helps buyers—not generic marketing.

### Legend / onboarding

- One sentence: **These segments mirror how Movemental talks about buyers on the home audience fold; they describe credibility depth, not separate products.**

---

## 4. Static v3 HTML generator — adaptation checklist

[`scripts/generate-scenius-network-v3-html.py`](../../../scripts/generate-scenius-network-v3-html.py) should:

1. **Stop shipping placeholder bios**—either pull from the same credentials module as React or mark HTML as **explicitly demo** until synced.
2. Replace naive single `topics: ["church"]` with **three segment strengths** + optional summaries.
3. Regenerate topic counts in `TOPICS` from real data (leader counts per segment at ≥ `moderate`, etc.).
4. Document in script header: run order when credentials change (`pnpm docs:generate-scenius-network-v3` after TS/JSON update).

---

## 5. Copy and doctrine guardrails

- **Trusted voices** framing stays [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../../build/strategy/movement-leaders-as-ecosystem-layer.md)-aligned: this viz is **ecosystem proof + EEAT**, not roster recruitment.
- **Nonprofit** language follows the EEAT doc’s **public** definition (faith-based orgs, justice NGOs, governed networks, funders)—do not imply specific 501(c)(3) status unless sourced.
- **Institutions** means **field-shaping infrastructure** (seminary, denominational executive education, recurring national training), not “spoke once.”

---

## 6. Definition of done

| Layer | Done means |
| --- | --- |
| **Data** | One joinable credentials artifact keyed by voice slug; matrix strengths match `site-voices-eeat-audience-credentials.md`. |
| **React graph** | Filters + panel read credentials blob; motion/accessibility preserved (`prefers-reduced-motion`, focus order). |
| **Static v3** | Regenerated HTML demonstrates the same segment encoding + real summaries for stakeholder review on `:8080`. |
| **Docs** | When named voices change, EEAT doc + `voices-graph-data` + credentials blob updated together (per EEAT file footer). |

---

## 7. Suggested implementation order

1. Add **`voice-audience-credentials.ts`** (or JSON + TS re-export) populated from the EEAT markdown in one focused PR.
2. Wire **panel + legend** in the React network component; keep graph layout unchanged initially.
3. Add **segment filters** + visual encoding (glyph/ticks first—lowest risk).
4. Extend **Python generator** to consume exported JSON (or a small `pnpm` script that dumps JSON from TS for Python to read).
5. Optional: **edge-weight** experiments behind a feature flag or internal-only build.

---

## 8. Open questions (resolve with design/product before coding)

- Should **multi-segment strength** appear as **three independent strengths** or a **primary segment** + secondary (some voices are evenly balanced per EEAT doc)?
- Do we ever add **organization nodes** (NAMB, Fuller, Exponential) as first-class vertices, or keep org names **inside panel copy** only?
- Home page: **compact** encoding only vs link to **full explorer** route?

Document decisions at the top of the credentials module or in a short ADR when resolved.
