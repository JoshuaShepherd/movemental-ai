# Site pages — architecture, navigation, and flow map

**Purpose:** Single working map of every **public marketing HTML route** in this repo, how it appears in navigation, and how redirects shape legacy URLs. Use it when redesigning information architecture, primary nav, footer, or cross-page story flow.

**Sources of truth (code):**

- Routes: `src/app/(site)/**/page.tsx` (App Router; the `(site)` segment does not appear in URLs).
- Header + footer IA: `src/components/nav/nav-links.ts` (`siteNavSections`, `siteHeaderFlatNavLinks`, `footerLegalLinks`).
- Legacy and consolidation redirects: `next.config.ts` → `redirects()`.
- Long-form articles: markdown in `docs/articles/` (root files → `/articles/[slug]`, `docs/articles/sandbox/` → `/articles/sandbox/[slug]`) via `src/lib/articles.ts`.
- Book reader slugs: `BOOK_SPINE` / `src/lib/book-types.ts` + manuscript files under `docs/book-development/fragmentation-manuscript-ordered/`.

**Last verified:** Production `next build` route table (Next 16.2); counts below match that build output.

---

## 1. Executive snapshot

| Layer | What lives there |
|--------|-------------------|
| **Primary story** | Home (`/`), fragmentation narrative (`/fragmentation`), platform (`/platform`), system map (`/system`), book hub (`/book`), articles library (`/articles`), AI Stewardship Sequence assessment hub (`/assess`). |
| **Organizations (primary implementation audiences)** | Hub (`/organizations`) + churches, nonprofits, institutions. See canonical doctrine: [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md). |
| **Movement-leader surfaces (trusted-voice / ecosystem layer)** | `/who-is-a-movement-leader` (definition), `/movement-leaders` (practitioner fit + five failures / five moves), `/voices` + `/voices/[slug]` (trusted voices shaping the work). **Not** a fourth peer segment beside the three organization types — it is a distinct layer. |
| **Engagements** | Services overview, Sandbox Season (+ exemplar), methodology (+ eight patterns), template pack, pricing. |
| **Trust & conversion** | FAQ, about, team, contact; legal: privacy, terms, cookies. |
| **Content systems** | Article detail and sandbox canon; book read, endorse, contributors; internal book moderation. |
| **Transactional** | Newsletter confirm / unsubscribed (query-driven). |

**Removed in this cleanup (no longer ship as React pages):** `_archived/**` (reference-only tree, not URL segments), null stub shells for legacy service URLs and “Movemental at 100” / knowledge ecosystem, thin `/blog` landing (replaced by redirect), and `/assessment-new` page file (redirect only in config). See git history on this file’s commit if you need the old paths.

---

## 2. Primary header (flat row)

Defined in `siteHeaderFlatNavLinks` — labels and hrefs:

| Label | Path | Active also when path starts with… |
|--------|------|--------------------------------------|
| Story | `/fragmentation` | — |
| Platform | `/platform` | — |
| System | `/system` | — |
| Book | `/book` | — |
| Articles | `/articles` | — |
| Assessment | `/assess` | `/assess`, `/assess/formation` |
| Services | `/services` | `/services`, `/pricing`, `/methodology`, `/resources/templates`, `/articles/sandbox` |
| Who it serves | `/organizations` | `/churches`, `/nonprofits`, `/institutions`, `/movement-leaders`, `/who-is-a-movement-leader` |
| About | `/about` | — |

**"Who it serves" menu structure** (see `nav-links.ts`): two columns, intentionally separating implementation audiences from the movement-leader layer per [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md).

- **Organizations** — Overview (`/organizations`), Churches, Nonprofits, Institutions.
- **Movement leaders** — Who is a movement leader? (definition), For movement leaders (practitioner fit), Trusted voices (`/voices`).

**Header CTAs:** secondary “FAQ” → `/faq`; primary “Start a conversation” → `/contact`.

---

## 3. Footer and “full site” accordion

`siteNavSections` (same columns as footer) group links:

1. **Story** — fragmentation, platform, system, book, AI Stewardship Sequence field guide (canonical path from `src/lib/canon-routes.ts`: `/articles/ssss-field-guide-for-organizational-leaders`), articles, archive, assessment.
2. **Who it serves** — Organizations overview, churches, nonprofits, institutions; then movement-leader surfaces: who is a movement leader, for movement leaders, trusted voices (`/voices`). Movement-leader links are listed inside the same footer column for findability but remain conceptually a distinct layer per the doctrine doc.
3. **Engagements** — services, sandbox season, sandbox canon hub, eight patterns, template pack, pricing, methodology.
4. **Trust & next step** — FAQ, about, team, **Trusted voices** (`/voices`), contact.

**Legal row:** privacy, terms, cookies.

---

## 4. Static marketing pages (one file → one URL)

| Path | Role in the story |
|------|-------------------|
| `/` | Home — editorial hero, proof, concept sections, CTAs (`home-concept-modern-page-content` and related sections). |
| `/about` | Team story, beliefs, why Movemental exists. |
| `/team` | People + credibility strip + CTAs. |
| `/contact` | Primary conversion; form + reassurance links. |
| `/faq` | Long FAQ; TOC sections; inline links updated to live routes (platform, services, sandbox season). |
| `/fragmentation` | flagship narrative + interactive story shell; permalinks use query params on `/fragmentation`. |
| `/platform` | Product / infrastructure framing (library, graph, pathways, AI posture). |
| `/system` | How public surfaces connect (six-stage arc, book, articles, engagements). |
| `/system/intel-artifacts` | QA / registry of React “intel” figures used on fragmentation surfaces. |
| `/organizations` | Audience hub — routes to segment landings. |
| `/who-is-a-movement-leader` | Definition + marks of movement leadership (+ logo strip). |
| `/movement-leaders` | Movement leader audience landing. |
| `/churches` | Church audience landing. |
| `/nonprofits` | Nonprofit journey (diagnostics, systems, CTAs). |
| `/institutions` | Institutions audience landing. |
| `/services` | Services hub — engagements, links to sandbox season, pricing, contact. |
| `/services/sandbox-season` | Twelve-week engagement narrative + pricing cross-links. |
| `/services/sandbox-season/exemplar` | Composite exemplar narrative. |
| `/methodology` | Methodology map + extended sections linking into sandbox canon. |
| `/methodology/eight-patterns` | Visual / editorial catalog of eight patterns. |
| `/resources/templates` | Template pack landing. |
| `/pricing` | Economics and comparison columns. |
| `/articles` | Article library index (featured + lists). |
| `/articles/archive` | Archive browsing. |
| `/articles/sandbox` | Sandbox canon hub (links into `/articles/sandbox/[slug]`). |
| `/assess` | AI Stewardship Sequence integrity assessment hub — entry to formation + system tools. |
| `/assess/formation` | Formation-oriented assessment entry. |
| `/privacy`, `/terms`, `/cookies` | Legal. |
| `/book` | Book landing — TOC, stats, lens switching. |
| `/book/contributors` | Margin contributors. |
| `/book/endorse` | Endorsement form. |

---

## 5. Dynamic and gated HTML routes

### 5.1 Articles (`generateStaticParams`)

- **`/articles/[slug]`** — One pre-rendered page per publishable markdown file in `docs/articles/` (excluding internal filenames listed in `EXCLUDED_SLUGS` in `articles.ts`). Recent build: **on the order of ~56** static paths plus OG image route.
- **`/articles/sandbox/[slug]`** — Sandbox canon articles under `docs/articles/sandbox/`. Recent build: **9** static paths (hub at `/articles/sandbox`).

### 5.2 Book reader

- **`/book/read/[slug]`** — One URL per spine entry (preface, chapters, coda); live vs coming soon depends on manuscript files and spine metadata. Toolbar, lens, share; OG per chapter where generated.

### 5.3 Book moderation (gated)

- **`/book/moderate`** — Internal moderation UI; **not** in nav. Requires valid `?token=` matching env; otherwise 404.

### 5.4 Newsletter

- **`/newsletter/confirmed`** — Post-signup confirmation messaging (typically query params).
- **`/newsletter/unsubscribed`** — Unsubscribe acknowledgment.

---

## 6. Redirect-only URLs (no dedicated `page.tsx`)

Configured in `next.config.ts`. These matter for bookmarks, external links, and SEO.

| Source (examples) | Destination |
|-------------------|-------------|
| `/blog` | `/articles` |
| `/assessment-new` | `/assess` |
| `/fragmentation-old`, `/fragmentation-intel` | `/fragmentation` |
| `/vision` | `/fragmentation` |
| `/movemental-at-100`, `/knowledge-ecosystem` | `/fragmentation` |
| `/how-it-works` (+ `/:path*`) | `/fragmentation` |
| `/nonprofits-new`, `/churches-new`, `/movement-leaders-new`, `/institutions-new`, `/nonprofits-system-example-new`, `/nonprofits-new/next` | Audience or nonprofit canonical paths |
| `/who-its-for` | `/organizations` |
| `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds` | `/contact` |
| `/system-builds` (+ `/:path*`) | `/contact` |
| `/evidence`, `/case-studies` | `/faq` |
| `/manifesto`, `/apply`, `/inquiry` | `/contact` |
| `/content/articles/sandbox`, `/content/articles/sandbox/:path*` | `/articles/sandbox` … |
| Legacy `/book/read/:slug` (list in `LEGACY_BOOK_READ_SLUGS`) | `/book` |

**Implication for IA work:** several strategy-era paths (`/evidence`, `/how-it-works`, `/vision`) now **collapse to** fragmentation, FAQ, or contact. If you reintroduce dedicated pages, add `page.tsx` **and** adjust redirects deliberately.

---

## 7. API routes (not pages, but part of “flow”)

Under `src/app/api/` — assess endpoints, contact, newsletter, book margin/export/subscribe, and a large `api/simplified/*` surface (tenant/platform data). Assessments started from `/assess` post to these handlers. They do not use the `(site)` chrome.

---

## 8. Suggested mental model for navigation redesign

1. **Entry ramps:** Home and `/fragmentation` compete as “start the argument”; `/organizations` and `/services` are practical ramps; `/assess` is diagnostic trust.
2. **Duplication risk:** Platform + System + Fragmentation all explain “what it is” — decide one **primary** ladder (e.g. fragmentation → platform → services) and demote others to secondary links or merged sections.
3. **Redirects as debt:** `/how-it-works` → `/fragmentation` means “process story” and “six-stage story” are conflated in routing; FAQ copy now points `/services` and `/platform` where appropriate.
4. **Organizations cluster:** Seven URLs (hub + five segments + definition); header uses single “Organizations” with deep active states — good pattern to preserve or simplify.
5. **Articles vs sandbox:** Two trees (`/articles/[slug]` vs `/articles/sandbox/[slug]`) — nav sends methodology readers to sandbox hub; keep cross-linking rules explicit in one doc when you change IA.
6. **Book + field guide:** `BOOK_HUB_PATH` and `SSSS_FIELD_GUIDE_PATH` (the AI Stewardship Sequence field guide path constant) in `canon-routes.ts` — any nav change should update those constants, not scattered strings.

---

## 9. File index (quick lookup)

| Path | `page.tsx` location |
|------|---------------------|
| `/` | `(site)/page.tsx` |
| `/about` | `(site)/about/page.tsx` |
| `/articles` | `(site)/articles/page.tsx` |
| `/articles/archive` | `(site)/articles/archive/page.tsx` |
| `/articles/[slug]` | `(site)/articles/[slug]/page.tsx` |
| `/articles/sandbox` | `(site)/articles/sandbox/page.tsx` |
| `/articles/sandbox/[slug]` | `(site)/articles/sandbox/[slug]/page.tsx` |
| `/assess` | `(site)/assess/page.tsx` |
| `/assess/formation` | `(site)/assess/formation/page.tsx` |
| `/book` | `(site)/book/page.tsx` |
| `/book/read/[slug]` | `(site)/book/read/[slug]/page.tsx` |
| `/book/contributors` | `(site)/book/contributors/page.tsx` |
| `/book/endorse` | `(site)/book/endorse/page.tsx` |
| `/book/moderate` | `(site)/book/moderate/page.tsx` |
| `/churches` | `(site)/churches/page.tsx` |
| `/contact` | `(site)/contact/page.tsx` |
| `/cookies` | `(site)/cookies/page.tsx` |
| `/faq` | `(site)/faq/page.tsx` |
| `/fragmentation` | `(site)/fragmentation/page.tsx` |
| `/institutions` | `(site)/institutions/page.tsx` |
| `/methodology` | `(site)/methodology/page.tsx` |
| `/methodology/eight-patterns` | `(site)/methodology/eight-patterns/page.tsx` |
| `/movement-leaders` | `(site)/movement-leaders/page.tsx` |
| `/newsletter/confirmed` | `(site)/newsletter/confirmed/page.tsx` |
| `/newsletter/unsubscribed` | `(site)/newsletter/unsubscribed/page.tsx` |
| `/nonprofits` | `(site)/nonprofits/page.tsx` |
| `/organizations` | `(site)/organizations/page.tsx` |
| `/platform` | `(site)/platform/page.tsx` |
| `/pricing` | `(site)/pricing/page.tsx` |
| `/privacy` | `(site)/privacy/page.tsx` |
| `/resources/templates` | `(site)/resources/templates/page.tsx` |
| `/services` | `(site)/services/page.tsx` |
| `/services/sandbox-season` | `(site)/services/sandbox-season/page.tsx` |
| `/services/sandbox-season/exemplar` | `(site)/services/sandbox-season/exemplar/page.tsx` |
| `/system` | `(site)/system/page.tsx` |
| `/system/intel-artifacts` | `(site)/system/intel-artifacts/page.tsx` |
| `/team` | `(site)/team/page.tsx` |
| `/terms` | `(site)/terms/page.tsx` |
| `/who-is-a-movement-leader` | `(site)/who-is-a-movement-leader/page.tsx` |

---

## 10. Related internal docs

- Older inventory (partially stale vs redirects): `docs/build/audit/site-pages-inventory.md` — cross-check before relying on it.
- Design spec: `docs/design/DESIGN.md`.
- Stitch migration guardrails: `docs/build/prompts/stitch-to-react-migration.md`.

When you change routes or redirects, update **this file**, **`nav-links.ts`**, and **`next.config.ts`** together so strategy, UX, and SEO stay aligned.
