# Movemental — live site & narrative SSOT (Custom GPT companion)

**Purpose:** Hand-maintained **priority** context for the Custom GPT. Use this file when answers require **current** public URLs, **canonical product narrative** (fragmentation arc, book, home), or **publishable article** slugs. The numbered `messaging-01` … `messaging-08` bundles are a **historical YAML/HTML claim library**; they can disagree on page names or emphasis—**defer here first**, then to `docs/arguments/SITE-SSOT.md`, then to the claim cards.

**Repo pointers (machine-checkable):** `src/components/nav/nav-links.ts` (nav), `docs/arguments/SITE-SSOT.md` (routes + legacy crosswalk §8), `src/lib/book-meta.ts` + `src/lib/book-types.ts` (book), `src/lib/articles.ts` (article inclusion rules), `src/components/sections/home/home-data.ts` + `home-page-content.tsx` (home copy spine).

---

## 1. Precedence (conflict resolution)

1. **This file** — live narrative, stage names/order, home thesis strings, book titles, `/articles` slug list, fragmentation URL params, primary CTAs.  
2. **`docs/arguments/SITE-SSOT.md`** — full route table, component inventory, stack, legacy → live path crosswalk.  
3. **`messaging-01` … `messaging-08`** — argument depth, gut-check questions, alternate phrasings; **YAML “Page routing” and `messaging-08` section titles may name retired pages** (Methodology, Who we serve, combined churches/nonprofits, etc.). Map those mentally using SITE-SSOT §8.

---

## 2. Canonical book (*fragmentation* manuscript)

| Field | Value |
| ----- | ----- |
| **Public title** | From Fragmentation to Movement |
| **Short UI name** | Fragmentation to Movement |
| **Subtitle** | A structural path from scatter field to field — for movement leaders, nonprofits, churches, and institutions. |
| **Landing** | `/book` |
| **Reader** | `/book/read/[slug]` — slugs defined in `BOOK_SPINE` in `src/lib/book-types.ts` (preface `preface-the-scatter-field`, chapters `the-invisible-tax` … `starting-where-you-are`, coda `coda-the-movement-you-join-when-you-stop-fragmenting`). |
| **Manuscript on disk** | `docs/book-development/fragmentation-manuscript-ordered/*.md` (wired at build/RSC time; not DB-backed). |
| **Prior working title** | “Content That Moves” is **archived** — use only for internal history, not public voice. |

**Part titles (reader TOC grouping):** (1) The tax you are already paying · (2) The map · (3) Integration (the load-bearing stage) · (4) Activation and formation (the payback) · (5) Multiplication and movement (the compounding) · (6) Playbooks · (7) The moral frame and the beginning.

**Editorial cross-links surfaced on `/fragmentation`:** preface (`/book/read/preface-the-scatter-field`), articles *Fragmentation inventory* (`/articles/fragmentation-inventory`) and *Two intelligences* (`/articles/two-intelligences-integration`).

---

## 3. Fragmentation story page (`/fragmentation`)

- **Role:** Canonical **public walkthrough** of the **six-stage model** (interactive shell, stage anchors, optional query tuning). The home page **compresses** this arc and **points** here for depth (`docs/build/prompts/home-page-narrative-credibility-ia-plan.md` §0–2).  
- **Metadata thesis:** Informational and relational intelligence is fragmented; six stages **re-compose the same intelligence**: Fragmentation → Integration → Activation → Formation → Multiplication → Movement.  
- **Jump anchors (use in links):** `#stage-fragmentation`, `#stage-integration`, `#stage-activation`, `#stage-formation`, `#stage-multiplication`, `#stage-movement`.  
- **Sharable query params:** `?audience=` (`leader` | `nonprofit` | `church` | `institution`), `?field=`, `?nodes=` (field density).  
- **Legacy redirects:** `/fragmentation-old`, `/fragmentation-intel` → **301** `/fragmentation`.

---

## 4. Home page (`/`)

**Metadata (SEO):** Title: *Movemental — Digital infrastructure for formation in the age of AI.* Description: *For movement leaders, churches, nonprofits, and institutions: coherent, discoverable, formational systems from what you have already built—embodied relationship and transformation at the center. Free Field Guide.*

**Section order (`HomePageContent`):** Hero → Problem → Consequence → Turn → System (six-stage index) → Integration → Activation → Formation → Multiplication → Movement → Proof → Entry points → CTA.

**Locked hero display (`HomeHero`):** *Your intelligence is fragmented. That's why it doesn't compound, form people, or scale.*

**Hero supporting paragraph (`homeHeroSupportingParagraph`):** Movemental helps movement leaders, nonprofits, churches, and institutions compose scattered **corpus** and **relationships** into one navigable system—so the same intelligence can compound in public, in rooms, and in the tools people already use. What follows compresses the argument; the canonical walkthrough is one click away.

**Problem band:** Eyebrow *The root issue.* Display: *The problem isn't content, tools, or AI. It's fragmentation.* **Two-intelligences intro:** *Two intelligences carry your work: what you know (corpus) and who you know (relationships). When both live in disconnected tools and channels, diagnosis is slow—and every surface inherits the scatter.*

| Column | Label | Bullets (summary) |
| ------ | ----- | ------------------- |
| A | Informational fragmentation | Books/essays/courses/decks in different homes; no single trusted corpus surface; new channels duplicate fragments. |
| B | Relational fragmentation | Partners scattered across apps; no durable map of who knows whom; institutional memory walks out with turnover. |

**When intelligence is fragmented (home list):** nothing compounds · formation breaks down · credibility weakens · AI becomes shallow.

**Stage one-liners (home index — align with `/fragmentation`):** Fragmentation: scattered artifacts, disconnected relationships, nothing compounding. Integration: one public home for everything you know and everyone you serve. Activation: searchable, grounded, actionable. Formation: information informs; relationships form; together they transform. Multiplication: infrastructure carries the work—not more content. Movement: platforms connect; leaders amplify each other; networks carry trust.

**Primary CTAs (header chrome):** *Start a conversation* → `/contact`; *Discovery Lab* → `/system-builds/discovery-lab`.

---

## 5. Information architecture (high level)

**Nav is driven by `siteNavSections` in `nav-links.ts` (four header groups):** **Story** (fragmentation, book, articles, vision ecosystem anchor) · **Who it’s for** (overview, movement leaders, churches, nonprofits, institutions → inquiry) · **System & builds** (how it works, platform + system layers, system builds + sprint links) · **Trust & next step** (evidence, case studies, pricing, FAQ, walkthrough, assessments, about, manifesto, vision, movemental at 100 → vision anchor, apply, inquiry, contact).

**Hubs worth memorizing:** `/how-it-works` (process), `/system-builds` (primary builds hub; legacy `/services*` → 301 here), `/who-its-for` (audience hub), `/articles` (library; `/blog` → 301 `/articles`), `/book` (fragmentation book), `/fragmentation` (six-stage story), `/vision` (includes `#vision-ecosystem`; legacy `/knowledge-ecosystem` → 301).

**Removed as standalone marketing URL:** `/methodology` — methodology lives in How it works, Evidence, FAQ, and related copy.

---

## 6. Article library (`/articles`)

Publishable slugs (filesystem in `docs/articles/`, **not** in `EXCLUDED_SLUGS` in `src/lib/articles.ts`). Routes are static: `/articles/[slug]`.

```
01-content-strategy-for-movement-leaders
02-the-evergreen-article-architecture
03-transformation-over-information
04-the-eight-week-formation-scaffold
05-formation-journeys-the-pathway-architecture
06-the-christocentric-spine
ai-collapses-the-cost-of-integration
ai-means-organizations-have-to-rebuild
case-study-youthfront
context-changes-everything
fragmentation-inventory
fragmentation-to-multiplication
guide-ai-credibility-2026
intelligence-fragmentation
movemental-stack-nonprofit-use-cases
nonprofits-pii-private-agentic-rag
playbook-church
playbook-institution
playbook-movement-leader
playbook-nonprofit
relational-intelligence
substack-and-movemental-system
the-cost-of-fragmentation
the-one-constraint-behind-every-ai-conversation
the-story-of-movemental
two-intelligences-integration
why-your-content-isnt-compounding
```

**Editorial categories** (eyebrow overrides in code): Essays, AI, Strategy, Guides, Case study, Methodology — see `EYEBROW_OVERRIDES` in `articles.ts` for slug-specific labels.

---

## 7. Core vocabulary for the assistant

- **Dual intelligences:** informational (corpus) + relational (trust, partnerships, cohorts). Fragmentation hits both.  
- **Six stages:** single ordered model company-wide; **Integration** is the **load-bearing** stage in the book’s frame.  
- **Scenius / credibility:** network-verified credibility vs hollow AI-era signals (detailed claims live in `messaging-01` / proof cards—ground numbers in cited sources when available).  
- **Movemental as infrastructure:** composition of existing work into navigable, formational systems—not a generic “more content” play.  
- **Voice:** missional, incarnational, leader-respecting; not “churchy” tech hype.

---

## 8. Engineering / proof claims (discipline)

When the claim library cites **table counts**, **latency %**, or other **quantified platform stats**, treat them as **historical marketing assertions** unless you can verify them against the current repo or shipped evidence pages. Prefer **qualitative** architecture language or point readers to `/evidence` and inspectable book chapters (e.g. Ch 1 `the-invisible-tax`) for **grounded** narrative.

---

## 9. Optional leader dossiers (not Movemental corporate voice)

- `jr-woodward-knowledge-base.md` — regenerate via `node scripts/regenerate-jr-woodward-knowledge-base.mjs`.  
- `rowland-smith-knowledge-base.md` — regenerate via `node scripts/regenerate-rowland-smith-knowledge-base.mjs`.

Use for **person-specific** context only; do not override Movemental positioning or live IA.
