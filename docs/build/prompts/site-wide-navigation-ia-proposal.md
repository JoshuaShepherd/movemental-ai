# Site-wide navigation — IA proposal prompt (book · field guide · assessment · full route set)

**Created:** 2026-04-20  
**Purpose:** Give a designer or coding agent a **single markdown prompt** to propose **primary navigation, mobile IA, and footer structure** for Movemental’s marketing site, grounded in the **complete shipped route set** and in the **intentional split** between the **book** (`/book`), the **AI Stewardship Sequence field guide** (article URL, not the book), and the **assessment hub** (`/assess`).

**Ground truth (always reconcile to code, not only to docs):**

| Source | What it is |
|--------|------------|
| `src/app/(site)/**/page.tsx` | Every HTML marketing route (omit `(site)` from URLs). |
| `src/components/nav/nav-links.ts` | Today’s header row, footer columns, CTA links, `activeWhenPathMatches`. |
| `src/lib/canon-routes.ts` | `BOOK_HUB_PATH` (`/book`) vs `SSSS_FIELD_GUIDE_PATH` (the AI Stewardship Sequence field guide article slug — **must not** be conflated with `/book`). |
| `next.config.ts` → `redirects()` | Legacy URLs that **collapse** into canonical routes (bookmarks + SEO implications for labels and “where did X go?”). |
| `docs/build/audit/site-pages-inventory.md` | Narrative inventory of routes + book spine notes (may drift — **verify** against `page.tsx` + redirects). |
| `docs/build/notes/site-pages-architecture-and-navigation-map.md` | Architecture + nav map (verify redirect section against `next.config.ts` — some narrative bullets may lag code). |
| `docs/design/DESIGN.md` | Token-first chrome, Midnight bands, typography, motion, accessibility bar for any nav UI proposal. |

---

## 1 · Shipped static routes (`src/app/(site)/**/page.tsx`)

Use this table as the **baseline “all pages” checklist** when proposing navigation. Dynamic segments (`[slug]`) are listed in §2.

| Path | Role (short) |
|------|----------------|
| `/` | Home — editorial entry, proof, audience ramps. |
| `/fragmentation` | Canonical fragmentation / six-stage narrative. |
| `/platform` | Product / “living system” framing. |
| `/system` | Connected surfaces / layer story. |
| `/system/intel-artifacts` | QA / registry for intel figures (decide if it belongs in public IA). |
| `/organizations` | Audience hub. |
| `/who-is-a-movement-leader` | Definition + marks of movement leadership. |
| `/movement-leaders` | Movement leader segment landing. |
| `/churches` | Church segment landing. |
| `/nonprofits` | Nonprofit segment landing. |
| `/institutions` | Institution segment landing. |
| `/services` | Services / engagements hub. |
| `/services/sandbox-season` | Sandbox Season narrative. |
| `/services/sandbox-season/exemplar` | Exemplar composite story. |
| `/methodology` | Methodology map + links into canon. |
| `/methodology/eight-patterns` | Eight patterns catalog. |
| `/resources/templates` | Template pack landing. |
| `/pricing` | Economics + comparison framing. |
| `/articles` | Article library index. |
| `/articles/archive` | Archive browsing. |
| `/articles/canon` | Canon hub / index. |
| `/articles/guides` | Guides hub / index. |
| `/articles/playbooks` | Playbooks hub / index. |
| `/articles/methodology` | Articles-scoped methodology index. |
| `/articles/sandbox` | Sandbox canon hub. |
| `/articles/sandbox/[slug]` | Individual sandbox canon articles. |
| `/articles/[slug]` | Individual articles (includes field guide URL below). |
| `/articles/series/[slug]` | Series index pages. |
| `/articles/topic/[slug]` | Topic index pages. |
| `/book` | **Book** landing — *From Fragmentation to Movement* spine, lenses, read CTAs. |
| `/book/read/[slug]` | Chapter reader (one URL per `BOOK_SPINE` entry). |
| `/book/endorse` | Endorsement form. |
| `/book/contributors` | Margin contributors. |
| `/book/moderate` | Token-gated moderation — **not** for public nav. |
| `/assess` | **Assessments hub** — formation snapshot + system readiness diagnostic entry. |
| `/assess/formation` | Formation maturity snapshot flow. |
| `/about` | About Movemental. |
| `/team` | Team / credibility. |
| `/contact` | Primary conversion / conversation start. |
| `/faq` | Long FAQ + TOC. |
| `/privacy`, `/terms`, `/cookies` | Legal row (footer / secondary). |
| `/newsletter/confirmed`, `/newsletter/unsubscribed` | Transactional post-signup surfaces (usually not primary nav). |

**Canonical field guide URL (not `/book`):** use `SSSS_FIELD_GUIDE_PATH` from `src/lib/canon-routes.ts` (today: `/articles/ssss-field-guide-for-organizational-leaders`) — the AI Stewardship Sequence field guide. Any nav proposal must **name the book and the field guide as two different destinations** and explain when to send someone to each.

---

## 2 · Dynamic route patterns (counts change with content)

| Pattern | Driver |
|---------|--------|
| `/articles/[slug]` | Markdown files under `docs/articles/` per `src/lib/articles.ts` (exclusions apply). |
| `/articles/sandbox/[slug]` | Files under `docs/articles/sandbox/`. |
| `/book/read/[slug]` | `BOOK_SPINE` in `src/lib/book-types.ts` + manuscript files under `docs/book-development/fragmentation-manuscript-ordered/`. |
| `/articles/series/[slug]`, `/articles/topic/[slug]` | Content-driven indexes. |

---

## 3 · Redirects that constrain IA and copy (verify `next.config.ts`)

Examples that matter for navigation **labels** and **cross-links** (not exhaustive — read the file):

| Incoming (examples) | Outcome |
|---------------------|---------|
| `/blog` | → `/articles` |
| `/assessment-new` | → `/assess` |
| `/how-it-works`, `/how-it-works/:path*` | → `/fragmentation` |
| `/vision`, `/movemental-at-100`, `/knowledge-ecosystem` | → `/fragmentation` (or related consolidation — **verify**) |
| `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds` | → `/contact` |
| `/system-builds`, `/system-builds/:path*` | → `/contact` |
| `/evidence`, `/case-studies` | → `/faq` |
| `/manifesto`, `/apply`, `/inquiry` | → `/contact` |
| Legacy `/book/read/:slug` (list in `LEGACY_BOOK_READ_SLUGS`) | → `/book` |

**Implication:** Do not propose top-level items for URLs that **301 away** unless the proposal explicitly includes **restoring** those pages and removing redirects in the same initiative.

---

## 4 · Current header / footer snapshot (implementation)

Today’s chrome is driven by `nav-links.ts`:

- **Header flat row:** Story (`/fragmentation`), Platform, System, Book, Articles (broad active prefixes), Assessment, Services (broad active prefixes), Organizations (segment prefixes), About. CTAs: FAQ (secondary), Start a conversation → `/contact` (primary).
- **Footer / mobile “full site”:** Four columns — Story (long list including field guide, article hubs, archive, assessment), Organizations, Engagements, Trust & next step; legal row for privacy / terms / cookies.

Your proposal may **keep, simplify, or recluster** this — but you must account for **duplicate story risk** (fragmentation vs platform vs system vs book opener) and **article hub sprawl** (canon, guides, playbooks, methodology, sandbox).

---

## 5 · Copy-paste prompt — “Act as a UI / IA expert”

Paste everything inside the fence into a design or coding session. Replace `[CONTEXT]` if you need a constraint (e.g. “max 7 primary items”, “no mega-menu”, “Stitch-aligned only”).

```text
You are a senior product designer and information architect for Movemental’s public marketing site.

## Non-negotiables
1. Read docs/design/DESIGN.md — semantic tokens only for any UI you sketch (no raw hex). Inter only. Respect fixed nav + pt-16 layout assumptions in src/app/(site)/layout.tsx.
2. Ground your proposal in the shipped route inventory in docs/build/prompts/site-wide-navigation-ia-proposal.md §§1–3 and verify against src/app/(site)/**/page.tsx, src/components/nav/nav-links.ts, and next.config.ts redirects.
3. Treat these as **three distinct public artifacts** — never merge them in labeling:
   - **Book:** BOOK_HUB_PATH = /book — long-form manuscript, chapter reader at /book/read/[slug], endorse + contributors as secondary book family links.
   - **AI Stewardship Sequence field guide:** SSSS_FIELD_GUIDE_PATH from src/lib/canon-routes.ts (article URL under /articles/... — the operating view of Safety, Sandbox, Skills, Solutions, not the book spine).
   - **Assessment:** /assess hub + /assess/formation — diagnostics / integrity / formation snapshot; separate mental model from “reading the thesis” in the book or field guide.
4. Do not add nav targets for token-gated or transactional-only routes unless explicitly secondary (e.g. legal, newsletter ack).
5. Preserve accessibility: clear focus order, aria-labels for icon-only controls, no duplicate unlabeled “Home” links, mobile drawer must remain usable without endless scroll — propose grouping / accordions if needed.
6. [CONTEXT]

## What to deliver (structured)

### A · Primary navigation (desktop)
- List each **top-level label** + **destination href** (canonical path only).
- Cap: state whether you recommend **≤7** top-level items or justify more; if you use dropdowns/megamenus, specify **max depth** and **group titles**.
- For each item, give **one sentence “job to be done”** for the visitor.

### B · “Story stack” resolution
Fragmentation, Platform, System, Book, and Articles can all feel like “the explanation.” Propose **one primary ladder** (e.g. problem → integration story → proof → offer) and mark what becomes **secondary** (footer, in-page TOC, or merged labels). Explicitly say where **/assess** sits in that ladder (diagnostic trust vs conversion).

### C · Book vs field guide
- When should the main nav surface **only** the book?
- When should it surface **only** the field guide?
- When should both appear, and with what **distinct labels** (no near-duplicates)?

### D · Articles cluster
Today there are multiple hubs: /articles, /articles/canon, /articles/guides, /articles/playbooks, /articles/methodology, /articles/sandbox, /articles/archive, plus series/topic routes. Propose either:
- a **single “Library”** entry with a sensible mega-menu / grouped drawer, OR
- a **flattened** minimal header set with the rest footer-only,
and explain tradeoffs for **SEO**, **discoverability**, and **cognitive load**.

### E · Who it serves (organizations vs movement-leader layer)

**Canonical doctrine** (read before proposing): [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md).

- **Organizations** — `/organizations` hub + `/churches`, `/nonprofits`, `/institutions`. These are the **primary implementation audiences** and the correct inhabitants of an "audience" column.
- **Movement leaders** — `/who-is-a-movement-leader` (definition), `/movement-leaders` (practitioner fit), `/voices` (**trusted voices** — the ecosystem / credibility layer). These are **not** a fourth parallel audience segment; they are a distinct layer and should be visually separated in any menu proposal.
- **Label:** prefer a "Who it serves" or "Audiences" parent, but split the drop-down into two columns along the doctrine line above. Do **not** propose a flat segment list that mixes churches / nonprofits / institutions / movement leaders as four peers. Map active states for all six deep routes.

### F · Engagements / services
Map **/services**, **/services/sandbox-season**, **/pricing**, **/methodology**, **/methodology/eight-patterns**, **/resources/templates** into your proposal. Call out anything that should stay **footer-only** (e.g. exemplar page).

### G · Mobile navigation
Describe **drawer structure** (sections, order, max taps to common tasks: read book chapter, open field guide, start assessment, contact). Avoid duplicating the entire site in one flat list unless justified.

### H · Footer
Propose **column titles** and **which links move** from header to footer vs stay in both. Legal row stays minimal.

### I · CTAs
Recommend **primary** and **secondary** global CTAs (today: Start a conversation → /contact, FAQ). Say if you would add **Assess** or **Read the book** as a tertiary visible CTA for certain breakpoints only.

### J · Implementation handoff
List concrete files likely to change (e.g. src/components/nav/nav-links.ts, SiteNav*, SiteFooter*, canon-routes if new canonical slugs) and any **redirect or copy** updates needed sitewide if labels change meaning.

## Output format
Use markdown headings A–J above. Keep prose concise; use tables for link lists. End with **Open risks** (3–5 bullets): e.g. story duplication, assessment vs book confusion, sandbox vs methodology overlap.
```

---

## 6 · Maintenance

When routes or redirects change, update **in the same change**:

1. `src/components/nav/nav-links.ts` (and any nav UI consumers).  
2. `docs/build/notes/site-pages-architecture-and-navigation-map.md` (especially §3 redirects + §2 header table).  
3. `docs/build/audit/site-pages-inventory.md` if you use it as a narrative inventory.  
4. This file’s §1–3 if the **baseline route checklist** or redirect examples are affected.

---

## 7 · Related prompts

- [`00-site-content-architecture-nav-master-prompt.md`](./00-site-content-architecture-nav-master-prompt.md) — broader site content + IA prompts (cross-check for drift vs current code).  
- [`site-primary-topnav-header-integration.md`](./site-primary-topnav-header-integration.md) — header component integration notes.  
- [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) — if nav chrome is regenerated from Stitch.
