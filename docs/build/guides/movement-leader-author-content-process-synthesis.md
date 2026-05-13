# Movement leader author content: process synthesis (Alan Hirsch–style tenants)

**Audience:** Operators, facilitators, and authors building a **single-leader** platform (corpus-grounded voice, formation-first IA) — not Movemental-the-company marketing.  
**Repos surveyed:** Primarily [`movemental-ai`](../../../) under `01-Movemental-Core`; cross-repo glob also surfaced `movemental-dashboard` (movement-leader prompts) and other org-specific dashboards (e.g. Youthfront EEAT guides — **out of scope** for this synthesis unless you explicitly want nonprofit-generic EEAT).  
**Date:** 2026-05-12  

---

## Executive summary: are there “conclusive” answers?

| Question | Conclusive in-repo? | Strongest canonical sources |
|----------|----------------------|-----------------------------|
| **1. Evergreen articles** (movement leaders like Alan Hirsch) | **Yes** — architecture, tiers, voice, SEO/GEO, citations, and cohort timing are spelled out in multiple aligned docs. Operational “exact steps” for *every* draft are **skill + playbook shaped** (Claude skills + methodology articles), not a single numbered SOP outside onbuilding. | `docs/articles/01-content-strategy-for-movement-leaders.md`, `docs/articles/02-the-evergreen-article-architecture.md`, `docs/build/notes/onbuilding-4-week-course-SSOT.md`, `docs/articles/07-author-onboarding-course-outline.md`, `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md`, `.claude/skills/article-plan`, `.claude/skills/article-author`, `.claude/skills/article-audit`, `.claude/skills/alan-voice` |
| **2. Courses** | **Yes** for **pedagogy + weekly section types + launch bar**; **implementation** paths reference sibling repos / `_docs` files that may live outside this clone. | `docs/articles/03-transformation-over-information.md`, `docs/articles/04-the-eight-week-formation-scaffold.md`, `07-author-onboarding-course-outline.md`, onbuilding SSOT §Week 3, `.claude/skills/course-author`, `.claude/skills/course-ingest`, `_docs/COURSE_STRATEGY.md` + `_docs/TRANSFORMATIONAL_COURSE_CHARTER.md` (paths referenced by skills) |
| **3. Pathways** | **Yes** for **formation intent + 12-section narrative architecture** in methodology; **tenant implementation** uses a parallel 12-block model in TypeScript (`pathway-author` skill) — treat the methodology doc as the *why* and the skill as the *where to edit*. | `docs/articles/05-formation-journeys-the-pathway-architecture.md`, `07-author-onboarding-course-outline.md`, onbuilding SSOT §Week 4, `.claude/skills/pathway-author`, `.claude/skills/pathway-audit` |

**Caveat:** Several skills still point at **machine-specific absolute paths** (e.g. macOS Desktop paths for Alan’s book corpus or `forgotten-ways-course`). The *process* is authoritative; paths must be remapped per developer machine or replaced with repo-relative conventions.

---

## Part A — Evergreen articles (movement leader / Alan-shaped)

### A.1 What the canon says an evergreen article *is*

From the evergreen architecture article:

- Standalone long-form, **one pillar**, assigned **tier** (pillar / cluster / long-tail) with word-count bands.
- **Not** a short blog post; **not** sequential course content — it is the **reference / informational layer** above books and talks, tuned for **humans + search + generative citation** (`docs/articles/02-the-evergreen-article-architecture.md`).

### A.2 Exact structure (nine sections, fixed order)

Mandatory sections and order are specified in `02-the-evergreen-article-architecture.md` and mirrored step-for-step in `article-author` / `article-plan` skills:

1. Opening hook (no heading; primary keyword in first ~100 words)  
2. Definition anchor (“GEO anchor” — quotable, self-contained)  
3. Why this matters / problem (diagnostic vocabulary + **specific** historical parallel)  
4. Core teaching (search-shaped H2/H3s; corpus quotes)  
5. Common misunderstandings (expansion, not cheap antithesis)  
6. Biblical foundation (argument, not stacked proof-texts; Tier 3 may merge into teaching)  
7. Practice (earned only after the above)  
8. How this connects (internal links; required Tier 1)  
9. Formation invitation (single CTA — pathway or course)  
Optional: FAQ block for extractability.

**Non-negotiable pedagogy:** “Application is earned, never front-loaded” — same order-of-ideas block appears in both the article doc and skills.

### A.3 Voice + quality bar (Alan-specific)

Five weighted **voice markers** (Christocentric, Prophetic, Pastoral, Imagery, Theological depth) are defined in `02-the-evergreen-article-architecture.md` and scored in `.claude/skills/article-audit/SKILL.md`. For drafting in Alan’s register, `.claude/skills/alan-voice/SKILL.md` is the voice constitution; `article-author` embeds the same marker table and rhetorical rules (e.g. antithesis prohibition as primary move).

### A.4 Strategy layer (pillars, clusters, EEAT, GEO)

`01-content-strategy-for-movement-leaders.md` gives:

- Legitimacy and rules for **corpus-derived** web articles (no paste-up chapters; unique intent per URL; credit sources).
- **Pillar–cluster** hub model and example **six-pillar** map tuned to Alan’s body of work (table of pillars → primary books).
- **GEO** tactics and relationship to SEO + E-E-A-T.

`docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` is the **canonical** playbook for how **linking** makes EEAT legible (internal topology, outbound quality, network / scenius inlinks).

### A.5 Operational “process” (when work actually happens)

Two layers stack:

1. **Onbuilding (4-week cohort)** — single SSOT: `docs/build/notes/onbuilding-4-week-course-SSOT.md`  
   - **Week 2** is the article week: minimum **one Tier-1 pillar + one Tier-2 cluster in production**, plus a **strategic map sufficient to launch** (not the entire long-tail library).  
   - End-to-end pipeline sentence in SSOT §4:  
     `corpus → ingest → theme extraction → structural map (pillars, pathway, course arc) → AI-assisted drafts → human edit & sign → publish & wire pathway`

2. **Day-by-day playbook** — `docs/articles/07-author-onboarding-course-outline.md` Week 2 (Days 6–11): inventory → architecture study → execution slice → draft pillar → edit → draft cluster → cohort peer review with **nine-section + five-marker** rubric.

### A.6 Best “prompts” / directives for article creation (repo-native)

Use these as **primary authoring prompts** (in order of leverage):

| Artifact | Role |
|----------|------|
| `article-plan` skill | Produces a **brief** (pillar, tier, keywords, H2/H3 outline, corpus targets, internal links, CTA, meta, slug) — feed to `article-author`. |
| `article-author` skill | Full pipeline: plan (if no brief) → **corpus research** (local markdown + optional Supabase `book_chapters`) → draft in **nine-section** architecture with citations. |
| `article-audit` skill | Pre-publish QA: six dimensions (voice, architecture, SEO, GEO, citations, funnel). |
| `docs/articles/02-the-evergreen-article-architecture.md` | Human-readable spec; cite in PRDs and facilitator decks. |
| `docs/articles/07-author-onboarding-course-outline.md` Week 2 | Cohort exercises that **force** inventory + first pillar + first cluster + peer review. |

**Remediation / line-edit loop:** `article-audit` → targeted rewrites; for cadence / “AI polish” patterns on **Movemental** editorial (non-Alan) prose, `movemental-prose` applies — the skill itself says to prefer **`alan-voice` / `article-audit`** when the piece is corpus-heavy Alan voice (`movemental-prose` SKILL frontmatter).

---

## Part B — Courses (8-week formation products)

### B.1 Pedagogical canon

- **Transformation over information:** Four Necessities — **Dissonance, Action, Reflection, Community** — every week (`docs/articles/03-transformation-over-information.md`).  
- **Eight-week scaffold:** Week 1 orientation; Weeks 2–7 one framework dimension each with full loop; Week 8 synthesis / commissioning (`docs/articles/04-the-eight-week-formation-scaffold.md`).  
- **Onbuilding bar:** 8-week arc **specified**, **at least one core week** in **publishable** shape (teaching + case + AI prompts as applicable); assessment optional concept only — SSOT Week 3 table.

### B.2 Section-level “exact process” for a single week

`.claude/skills/course-author/SKILL.md` is the most **granular** prompt spec:

| Section | Intent |
|---------|--------|
| Opening video script | ~5 min spoken arc; frames week; does not repeat reading |
| Dissonance (`chat_dissonance`) | AI companion prompt: tension + question; **no premature resolution** |
| Main teaching (`reading`) | 2k–3.5k words; hook → framework → scripture → implications; blockquotes + **Sources:** line |
| Case study | Concrete narrative witness |
| Action / Reflection prompts | Time-boxed, social accountability cues |
| Cohort / exit | Discussion + reflection closure |

**Authoritative file pointers inside the skill:** `_docs/COURSE_STRATEGY.md`, `_docs/TRANSFORMATIONAL_COURSE_CHARTER.md` (repo root `_docs`), plus optional external `forgotten-ways-course` JSON — **verify these paths exist** in your checkout; the skill encodes *intent* even when paths drift.

### B.3 Publishing / DB pipeline

`.claude/skills/course-ingest/SKILL.md` documents **manifest + module markdown → database** upserts (`course-manifest.json`, week files, schema in `src/lib/database/schema.ts`). That is the **technical** completion step after author sign-off.

### B.4 Cohort sequencing for courses

`07-author-onboarding-course-outline.md` **Week 3** walks thesis → scaffold → outline read-through → **one deep week drafted** → AI dissonance/action prompts → optional assessment framing — aligned to SSOT Week 3 outcomes.

---

## Part C — Pathways (formation journeys / navigation layer)

### C.1 Conceptual canon (product + theology)

`docs/articles/05-formation-journeys-the-pathway-architecture.md` defines:

- Pathways as **thematic doorways** (not tags), connecting **information → transformation → AI conversation**.  
- Five canonical portals and **reframing questions** (Alan reference implementation).  
- **Twelve-section** page anatomy from **Hero** through **Invitation** (provocation, overview, model, scripture thread, cases, practices, curated resources, AI Lab, FAQs, distortion warnings, etc.).

### C.2 Onbuilding + cohort expectations

- SSOT: **≥1** primary pathway meeting **12-section** (or product-approved equivalent) standard, wiring pillar/cluster/course (`onbuilding-4-week-course-SSOT.md` §Week 4 + §3 table).  
- `07-author-onboarding-course-outline.md` Week 4: draft/approve sections, ecosystem map, launch checklist, commissioning.

### C.3 Implementation-facing pathway authoring

`.claude/skills/pathway-author/SKILL.md` maps the same “full pathway” idea onto **tenant TypeScript** files (`src/lib/content/pathways/[slug].ts`) with **twelve content sections in four groups** (Understand → Examine → Apply → Go deeper). **Names differ slightly** from the marketing-methodology section titles in doc `05` — treat **doc 05** as the **narrative / pedagogical** spec and **pathway-author** as the **code + nav TOC** contract when editing Alan tenant content.

**QA:** `.claude/skills/pathway-audit/SKILL.md` audits against the **12-section architecture** (SEO/GEO/voice).

---

## Part D — EEAT + remediation (author-scoped)

| Need | Tooling in this repo |
|------|---------------------|
| EEAT + linking strategy | `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` |
| Corpus credibility + “no invented quotes” | `02` citation rules; `article-author` research steps; `article-audit` corpus dimension |
| Voice fidelity | `article-audit`; `alan-voice`; five markers in `02` |
| Line-level “AI slop” / Movemental editorial polish | `movemental-prose` (explicitly **not** a substitute for Alan voice skills on corpus pieces) |
| Narrative / platform argument alignment | `movemental-narrative-audit` (skill) — platform story, not micro voice |

---

## Part E — Related material outside the “exact process” question

- **Ingestion reality:** `docs/articles/HOW_MOVEMENTAL_USES_AI.md` describes how books → MDX → DB, articles via markdown ingest, video → transcript pipelines — useful for **where corpus comes from**, not substitute for nine-section authoring rules.  
- **Business-layer workflows:** `docs/business-docs/07_ai_content_systems/workflows/content_creation_workflows_and_management.md` contains generic **stage/time** article production — useful for **ops budgeting**; the **author-specific** truth is tighter in `01`/`02`/`07`/SSOT.  
- **Other repos:** `movemental-dashboard/docs/build/prompts/movement-leader-phases-03-10.md` may complement **phase** language; it was not fully merged into this document — pull it in if you standardize cross-repo prompt packs.

---

## Part F — Quick “which doc do I open?”

| I need to… | Open first |
|------------|------------|
| Set expectations for a 4-week author cohort | `docs/build/notes/onbuilding-4-week-course-SSOT.md` |
| Run weekly homework | `docs/articles/07-author-onboarding-course-outline.md` |
| Write / teach evergreen article rules | `docs/articles/02-the-evergreen-article-architecture.md` |
| Explain why articles exist (strategy + EEAT) | `docs/articles/01-content-strategy-for-movement-leaders.md` + `LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` |
| Prompt an agent to draft Alan article | `.claude/skills/article-plan` → `.claude/skills/article-author` |
| QA before publish | `.claude/skills/article-audit` |
| Draft / audit pathway | `.claude/skills/pathway-author` / `pathway-audit` + `docs/articles/05-…` |
| Draft / ingest course week | `.claude/skills/course-author` / `course-ingest` + `docs/articles/03` & `04` |

---

*This file does not replace the cited canon; it routes readers to it and names where skills extend or duplicate documentation. If the SSOT and another file disagree, `docs/build/notes/onbuilding-4-week-course-SSOT.md` explicitly claims precedence for onbuilding definitions.*
