# MVMTL cross-repo documentation index

Generated **2026-04-11** per `docs/build/prompts/mvmtl-cross-repo-documentation-index.md`. **Founder anchor read:** `docs/notes/mvmtl-running-notes-founder-input-2026-04.md` (used for classification only; not treated as publishable canon). Sibling repos were **read-only** (no edits).

---

## A. Executive index table

Path values are **repo-relative** from each repository root unless noted.

| Path | Title / topic | Type | Primary audience | Last-updated signal | Status | One sentence |
| --- | --- | --- | --- | --- | --- | --- |
| **Repo: `movemental` (organizational site)** |
| `CLAUDE.md` | Movemental org site — agent & stack guidance | Code-adjacent spec / internal | internal | 2026-03-24 (git) | supporting | Describes this repo as the marketing site, Stitch pin, sibling read-only rules, and commands — not public positioning copy. |
| `AGENTS.md` | Next.js version guardrail | Internal | internal | unknown | supporting | Short reminder to read framework docs; no product narrative. |
| `docs/README.md` | Docs folder index | Internal index | internal | 2026-04-11 | supporting | Points to canonical articles, personas, founder notes, and cross-repo index prompt. |
| `docs/design/DESIGN.md` | The Digital Curator — design spec | Canonical design spec | internal + implementers | 2026-04-11 | candidate-canonical | Defines tokens, typography, Stitch remaps, and UI rules for the org site build. |
| `docs/build/stitch-project.md` | Stitch project pin | Build guardrail | internal | 2026-04-11 | candidate-canonical | Pins Stitch project `2208910962065880866` and MCP access patterns. |
| `docs/build/stitch-screens.md` | Stitch screen inventory | Build reference | internal | unknown | supporting | Screen list / mapping for migration (verify in git if needed). |
| `docs/build/prompts/stitch-to-react-migration.md` | Authoritative Stitch → React prompt | Code-adjacent spec | internal | unknown (empty git log) | candidate-canonical | Single authorized workflow to populate `src/app/` from Stitch; supersedes ad-hoc UI. |
| `docs/build/prompts/mvmtl-cross-repo-documentation-index.md` | Inventory prompt (this run’s spec) | Meta / process | internal | 2026-04-11 | supporting | Defines how to index MVMTL docs across three repos without synthesis into marketing copy. |
| `docs/notes/mvmtl-running-notes-founder-input-2026-04.md` | Founder running notes April 2026 | Draft ground truth | internal | 2026-04-11 | candidate-canonical | Captures product truth, five-stage AI maturity, modular sprints, audience parity, manifesto/pricing flags — **not** public until reviewed. |
| `docs/notes/mvmtl-cross-repo-documentation-index-2026-04-11.md` | This index file | Inventory output | internal | 2026-04-11 | supporting | Cross-repo inventory + contradiction/gap registers from scheduled prompt run. |
| `docs/projects/alan-hirsch/README.md` | Alan Hirsch repo pointer | Internal reference | internal | 2026-04-11 | supporting | Links sibling architecture for implementers; not end-user copy. |
| `docs/build/personas/README.md` | Persona pack intro | Persona | internal | 2026-04-11 | supporting | Frames collaborator personas for build/messaging work. |
| `docs/build/personas/movement-leader-collaborator.md` | Movement leader persona | Persona | movement leader | 2026-04-11 | supporting | Defines collaborator archetype for product/site workstreams. |
| `docs/build/personas/youthfront-executive-collaborator.md` | Youthfront executive persona | Persona | nonprofit | 2026-04-11 | supporting | Org-side collaborator persona; check alignment with “parity of served groups” before external use. |
| `docs/content/README.md` | Content folder README | Internal index | internal | 2026-04-11 | supporting | Explains Trello-origin markdown and canonical article paths. |
| `docs/content/articles/why-movemental-exists.md` | Why Movemental Exists | Canonical essay (frontmatter: source canonical) | mixed | 2026-04-11 | candidate-canonical | Long-form positioning: fragmentation vs integrated systems, formation, economics, AI grounded in voice — no explicit “100 leaders” cap in sampled opening. |
| `docs/content/articles/ai-discovery-lab.md` | AI Discovery Lab | Course / offer description | nonprofit | 2026-04-11 | candidate-canonical | Describes structured experimentation and **AI maturity** via practice; not the founder’s numbered five-stage model verbatim. |
| `docs/content/articles/content-marketing-course.md` | Content track | Offer copy | nonprofit | 2026-04-11 | supporting | Modular org offering narrative (align with founder’s “content” sprint). |
| `docs/content/articles/fundraising-course.md` | Fundraising track | Offer copy | nonprofit | 2026-04-11 | supporting | Modular org offering narrative (CRM / donation engine outcomes per founder notes). |
| `docs/content/articles/how-it-works-process.md` | How it works | Process copy | mixed | 2026-04-11 | supporting | Explains engagement/process for site. |
| `docs/content/trello-cards/*.md` | Trello-derived page stubs | Draft / export | mixed | 2026-04-11 (batch) | likely-stale | Per-folder README: originated from board; compare to `docs/content/articles/` for newer canonical prose — **de-dup** before import. |
| `docs/research/authoritative-sources-ai-nonprofits-faith-formation.md` | External sources bibliography | Research | internal + strategy | 2026-04-11 | supporting | Curates third-party frameworks; includes **§8 AI maturity models** — external context, not Movemental-owned stage definitions. |
| `docs/articles/Thought Leader Platform Research Report.md` | Thought leader platform research | Research report | internal | unknown | supporting | Markdown sibling to PDF; competitor/feature landscape for positioning research. |
| `src/app/(site)/about/page.tsx` | About / origin | Live Stitch-derived copy | mixed | 2026-04-11 | supporting | “Why Movemental exists” narrative in UI; verify against `docs/content/articles/why-movemental-exists.md` for drift. |
| `src/app/(site)/pricing/page.tsx` | Pricing & investment | Live Stitch-derived copy | mixed | 2026-04-11 | contradicts-other-docs | Includes **“venture builders”** and **four-week builds**; founder notes flag “venture builder” for replacement — **human must choose** wording vs `movemental-ai` business docs. |
| `src/app/(site)/manifesto/page.tsx` | Systems philosophy manifesto | Live Stitch-derived copy | mixed | 2026-04-11 | template-slop-risk | Contains **“Infrastructure: Notion + AI”**; founder anchor treats Notion+AI as **placeholder** — treat as rewrite/demotion candidate until reconciled. |
| `src/app/(site)/services/system-builds/page.tsx` | System builds | Live Stitch-derived copy | nonprofit | 2026-04-11 | candidate-canonical | Lists Discovery Lab, Governance & Ethics, etc.; closest on-site mirror of modular sprint framing. |
| `src/app/(site)/services/organizational-systems/page.tsx` | Organizational systems | Live Stitch-derived copy | nonprofit | 2026-04-11 | supporting | Extends services narrative with governance/discovery language — reconcile sprint length/cohort pricing vs sibling docs. |
| `src/app/(site)/services/page.tsx` | Services hub | Live Stitch-derived copy | mixed | 2026-04-11 | supporting | Editorial infrastructure positioning; check against audience-parity preference in founder notes. |
| `src/app/(site)/contact/page.tsx` | Contact | Live Stitch-derived copy | movement leader | 2026-04-11 | supporting | Qualification labels for movement leaders; includes “not something you sign up for” style guardrails. |
| **Repo: `movemental-ai`** |
| `CLAUDE.md` | movemental-ai project overview | Code-adjacent spec | internal | unknown | supporting | Multi-tenant platform for movement leaders; stack and layer chain — product positioning minimal. |
| `_docs/site-docs/why-movemental-page/README.md` | Why Movemental page pack | Spec index | internal + writers | unknown (untracked or pre-git) | candidate-canonical | Indexes AI brief + copy deck + longform; defines section map for public “why.” |
| `_docs/site-docs/why-movemental-page/00_ai-brief-why-movemental.md` | AI brief: Why Movemental | AI / editorial brief | internal | unknown | candidate-canonical | Voice guardrails, theological posture, question coverage for the Why page. |
| `_docs/site-docs/why-movemental-page/01_copy-deck-why-movemental.md` | Copy deck: Why Movemental | Copy deck | mixed | unknown | candidate-canonical | Section alternatives; closing copy includes **“one hundred movement leaders”** and network “scenius” language. |
| `_docs/site-docs/03_why_movemental_longform.md` | Why Movemental longform | Canonical longform (per file) | mixed | 2026-03-08 | candidate-canonical | Declares itself canonical long-form Why; problem framing for trust/credibility — compare to `docs/content/articles/why-movemental-exists.md`. |
| `_docs/business-docs/01_business_strategy/business_model/movemental_business_model.md` | Business model | Strategy | internal | 2026-03-08 | contradicts-other-docs | **Dual path:** leaders primary; **org dashboards / cohorts labeled “Future Development”** — conflicts with founder April 2026 **active** five modular org sprints narrative. |
| `_docs/business-docs/01_business_strategy/go_to_market/movemental_pricing_strategy.md` | Pricing strategy | Strategy | internal | 2026-03-08 | contradicts-other-docs | Org cohorts **3–6 weeks**, consulting hourly bands; leader **$1k + 10%** — compare sprint **four-week** rule and nonprofit module list in founder notes. |
| `_docs/movement_leader_research/alan-hirsch/**` | Alan Hirsch research dashboard | Research corpus | internal | 2026-03-18 (e.g. README, movemental-fit) | supporting | Exemplar fit analysis, voice, content catalog — informs “movement leader” definition and pipeline; **not** org-site copy. |
| `_docs/movement_leader_research/brad-brisco/**` | Brad Brisco research | Research corpus | internal | 2026-03-18 (inference: parallel structure to Alan) | supporting | Second exemplar leader research track per founder notes. |
| `_docs/type/02_LAYER_1_DATABASE.md` (and `01`, `03`–`11`) | Six-layer type docs | Technical architecture | internal | 2026-03-08 (batch) | supporting | Database/services/UI layers; incidental mentions of onboarding — not marketing. |
| `_docs/studio-prompts/**` (e.g. `why-movemental/PROMPT.md`) | Studio prompts by page | Prompt library | internal | 2026-03-18 (sample) | supporting | Page-level build prompts for sibling product surfaces. |
| `_docs/DESIGN_BUILDER_PAGES_TO_INTEGRATE_FROM_MOVEMENTAL.md` | Design integration checklist | Engineering note | internal | unknown | supporting | Cross-repo UI integration notes. |
| `_docs/APP_ROUTER_PAGES_AND_COMPONENTS.md` | App router inventory | Engineering note | internal | unknown | supporting | Route/component inventory for dashboard/site. |
| `_docs/pre-launch-polish-report.md` | Pre-launch polish | QA / product note | internal | unknown | supporting | Launch readiness findings — operational, not canon. |
| **Repo: `alan-hirsch` (exemplar leader platform)** |
| `CLAUDE.md` | alan-hirsch agent guidance | Code-adjacent spec | internal | 2026-04-08 | supporting | Commands, six-layer validation, ingestion — minimal Movemental **business** narrative. |
| `_docs/_public/insights/business/MOVEMENTAL_ADJACENT_AUDIENCES_AND_PRICING_REPORT.md` | Adjacent audiences & pricing | Business report | internal | 2026-03-24 | likely-stale | Dated **March 2025**; header still says consultation for “Movemental (Memento)”; deep adjacent-market pricing — **reconcile naming and numbers** before reuse. |
| `_docs/_public/proposals/vision/PRICING_STRATEGY.md` | Movemental pricing strategy (vision) | Vision / strategy | internal | 2026-03-24 | candidate-canonical | Full pricing philosophy, $1k + 10% leader model, **100 leaders** scenario math, compares to publishers/SaaS — overlaps `movemental-ai` pricing doc. |
| `_docs/_public/proposals/vision/PATHWAY_STRATEGY.md` | Pathway strategy | Vision / product | internal | 2026-03-24 | supporting | Formation journeys vs categories; glossary routes — product architecture for exemplar tenant. |
| `_docs/_public/proposals/vision/DASHBOARD_UI_VISION.md` | Dashboard UI vision | Vision | internal | unknown | supporting | Control-plane vision referencing dashboard/studio repos. |
| `_docs/_public/proposals/vision/*` (other vision files) | AI Lab, course, content strategies | Vision corpus | internal | 2026-03-24 (batch sample) | supporting | Strategy set for exemplar platform capabilities; align offers to org-site modular sprint language intentionally. |
| `_docs/_build/THOUGHT_LEADER_PLATFORM_RESEARCH.md` | Top 25 creator platform audit | Research | internal | 2026-04-09 | supporting | Positions Alan Hirsch build vs peers; capability marketing evidence, not nonprofit sprint canon. |
| `_docs/_build/migration/MIGRATION_CHECKLIST.md` | Tenant migration checklist | Engineering checklist | internal | 2026-04-08 | supporting | “Movement leader platform” bootstrap steps; operational. |
| `_docs/_temp/**` | Scratch AI Lab / migration notes | Temp / drafts | internal | various | do-not-import (aggregate) | **Inference:** working notes and duplicates — unsafe as canon per prompt spirit (use `_public` / `vision` instead). |
| `content-library/articles/*.md` | Alan Hirsch article library | Author corpus | movement leader + church | various | supporting | Theological / movement content for **Alan** tenant — not Movemental corporate positioning. |

---

## B. Contradiction register

- **Org vs “future” nonprofit product:** `movemental-ai/_docs/business-docs/.../movemental_business_model.md` frames **operational dashboards / org cohorts** as **“Future Development”** and “Future Vision,” while founder April 2026 notes describe **five active modular system builds** (four-week sprints) for nonprofits/churches today. **Human must choose** which timeline is public truth.

- **Sprint / cohort duration:** Founder notes: **four-week** sprints per module. `movemental_business_model.md`: **3-week** AI workshops example. `movemental_pricing_strategy.md`: org programs **3–6 weeks**. **Human must choose** standard duration language.

- **“Venture builders” vs consulting / studio models:** `src/app/(site)/pricing/page.tsx` uses **venture builders** alongside modular builds; founder notes say the phrase may imply equity-style studio semantics Movemental may not intend. **Human must choose** replacement or precise definition.

- **“Notion + AI” as stack:** `src/app/(site)/manifesto/page.tsx` lists **Notion + AI** as infrastructure; founder anchor: **Stitch/placeholder example**, not committed marketing stack. **Human must choose** whether to delete, reframe, or replace with owned architecture language.

- **100 movement leaders cap:** `movemental-ai/_docs/site-docs/why-movemental-page/01_copy-deck-why-movemental.md` closing explicitly commits to **one hundred movement leaders** networked; founder notes say language is **not yet** on movemental.org and needs adding; sampled `docs/content/articles/why-movemental-exists.md` opening did not surface the cap. **Human must choose** single canonical placement (site vs decks vs both).

- **Business report naming / freshness:** `_docs/_public/insights/business/MOVEMENTAL_ADJACENT_AUDIENCES_AND_PRICING_REPORT.md` is dated **March 2025** and references **“Memento”** in the purpose line while newer docs say Movemental. **Human must choose** whether to retire, revise, or archive.

- **Primary audience emphasis:** Founder notes: primary **customer today** is movement leaders but **site** should show **parity** across nonprofits/churches without declaring a single 12-month primary in copy. Some decks (`01_copy-deck-why-movemental.md`) are **movement-leader-centric** by design. **Human must choose** balance for org-site IA and hero copy.

---

## C. Gaps register

Items the founder anchor treats as **true** or **desired** but **not** fully supported as a single public, Movemental-authored artifact (or only partially):

- **Five-stage AI maturity model** (with stage names, transitions, and **moratoriums** on publishing AI-affected content and sharing private data during experimentation): present in **`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`**; not surfaced as a complete owned essay on `movemental.org` or in `docs/content/articles/` as of this scan (external maturity discussion exists in **`docs/research/authoritative-sources-ai-nonprofits-faith-formation.md` §8**, which is **citation**, not Movemental canon).

- **Explicit “100 movement leaders” cap** on the **organizational site** copy: founder says still needed; live `docs/content/articles/why-movemental-exists.md` sample did not show it (deck in `movemental-ai` does).

- **Church-specific formation delivery model** beyond high-level “formation-shaped” direction: founder notes say **not fully articulated** — expected gap; no contradiction resolution required yet.

- **Seminary / denomination** specifics: founder OK to omit for now — **intentional gap**.

- **Leader-owned approval workflow** for AI-affected public voice (operational detail): noted as **TBD** in founder notes; not merged with a governance doc in this index’s sampled paths.

- **Network / SEO “linked voices” narrative** for orgs: founder points to need for site copy; partial overlap in `01_copy-deck-why-movemental.md` network sections — may still need a **short org-facing** artifact distinct from leader deck.

---

## D. “Do not import” list

| Pointer | Reason (≤5 words) |
| --- | --- |
| `src/app/(site)/manifesto/page.tsx` (until rewritten) | Notion stack placeholder conflict |
| `alan-hirsch/_docs/_temp/**` | Scratch drafts, unvetted |
| `docs/content/trello-cards/*.md` (blind import) | Superseded by articles likely |
| `MOVEMENTAL_ADJACENT...REPORT.md` (blind import) | Dated; “Memento” naming drift |
| `movemental-ai/.claude/skills/**` (generic skills) | Postgres tips, not MVMTL |

---

## E. Recommended next file (optional)

**Suggested single merge target (not created here):** `docs/content/strategy/MVMTL-CANON.md` — one Movemental-owned document that reconciles **audience parity**, **five modular four-week sprints**, **five-stage AI maturity + moratoriums**, **100-leader cap**, and **displaces** conflicting phrases (“venture builder,” Notion+AI) with founder-approved language, with explicit “supersedes” pointers to `movemental-ai` decks and `alan-hirsch` vision docs.

---

### Method notes (transparency)

- **Globs + ripgrep** across `docs/`, `_docs/`, and targeted `src/app/(site)/` in `movemental`; `_docs/` + `CLAUDE.md` in `movemental-ai`; `_docs/`, `CLAUDE.md`, and high-hit Movemental strings in `alan-hirsch`. **Not** every `alan-hirsch` `content-library` file is row-listed.
- **Git dates:** `git log -1 --format=%cs -- <path>` per repo where shown; empty results recorded as **unknown** for some `movemental-ai` why-movemental paths (may be untracked or renamed in history).
- **Skills:** only summarized generic `.claude/skills` in “do not import”; **no** skill bodies audited line-by-line.
