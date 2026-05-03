---
title: Content — AI charter for the mature non-profit
status: v1 (2026-04-14)
owner: movemental
module: system-builds/content
seed_repo: /Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch
---

# Content

> The purpose of AI in non-profit content is **fidelity at scale** — keeping the organization's voice, theology, and evidence base intact while reaching more of the right people. It is not an SEO content factory.

---

## 1. Goal — the mature organization picture

A mature non-profit content operation, at AI maturity:

- Has a **single platform** where the organization, its leaders, its stakeholders, and its audiences meet — not a WordPress + newsletter + LMS + podcast host + social scheduler smeared across seven logins.
- Has a **corpus of trust**: the books, articles, talks, policy papers, and field stories the org actually stands behind, ingested, chunked, cited, and used as the **retrieval ground** for every AI-assisted output.
- Runs content creation with AI as a **drafting and research layer**, not as a publishing layer. The org publishes what a human author signed.
- Offers the **right thing to the right person at the right moment** — gated courses, open articles, pathway journeys, live events — without requiring the visitor to solve the org's internal taxonomy.
- Uses AI to **maintain** the archive (translations, redirects, paratext, republishing, book-to-article pipelines) rather than only to grow it.

The operational artifact is a **multi-tenant Next.js 16 + Supabase + Drizzle content platform**, built on the same spine already proven in the Alan Hirsch tenant app ([movemental-sites/alan-hirsch](file:///Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch)), extended to host multiple leaders / organizations cleanly. One codebase, many tenants, clean RLS, strong voice guards.

---

## 2. Where we already are

- The Alan Hirsch platform is the reference implementation for the content stack: Next.js App Router, Tailwind v4, Supabase auth + Postgres, Drizzle schema-as-source-of-truth, Zod, TanStack Query v5, six-layer type chain, and a growing corpus-ingestion + voice-guardrail discipline.
- This Movemental site itself uses the same stack and the same design system.
- The content strategy we implement for Alan Hirsch — pillars, SEO/GEO architecture, corpus references, Alan's five voice markers, paratext hygiene, image asset discipline — is already codified in [skills](../../../.claude/skills/) (e.g. `alan-voice`, `article-author`, `article-plan`, `article-audit`, `article-corpus`, `paratext-author`, `paratext-audit`, `corpus-ingestion`).
- The `system-builds/content` page exists — [`system-builds-content-page-content.tsx`](../../../src/components/sections/system-builds-content/system-builds-content-page-content.tsx) — and a course preview for content leadership lives under [docs/system-builds/ai-governance-ethics-course-preview/content-leadership-marketing-course-preview/](../ai-governance-ethics-course-preview/content-leadership-marketing-course-preview/).

**Implication for the charter:** we already know what the mature platform is. The shape is proven. The question is **multi-tenanting** it cleanly, preserving per-org voice integrity, and refusing to dilute the voice discipline as we scale.

The mature deliverable is a **multi-tenant content platform** with:

- Tenant-scoped corpus ingestion and retrieval (a leader's books do not leak across orgs).
- Per-tenant voice guard (each org or leader has their own voice markers, enforced by audit tooling).
- A publishing pipeline where every piece is drafted with AI, audited against voice + corpus, and signed by a human author.
- Public surfaces (articles, pathways, courses) and gated surfaces (member portals, cohorts, licensed curriculum).
- Analytics that measure **formation**, not just traffic (return visits, pathway completion, practice uptake) — via the existing GA4 + PostHog + Vercel + Supabase analytics stack.

---

## 3. Top 20 AI use cases in content

| # | Use case | Surface | Authority |
| --- | --- | --- | --- |
| 1 | Corpus ingestion pipeline (books, talks, essays → chunked, embedded, citable) | Internal app | Assist |
| 2 | Voice guard (per-author voice markers enforced by automated audit before publish) | Audit tool | Recommend |
| 3 | RAG-grounded article drafting (citations back to the org's own corpus, not the open web) | Editor | Recommend |
| 4 | Pillar + keyword strategy planner with SEO/GEO discipline | Internal app | Recommend |
| 5 | Paratext authoring (synopses, summaries, pull quotes, metadata) in the author's voice | Editor | Recommend |
| 6 | Translation pipeline with linguistic-audit pass per language | Editor + QA | Recommend |
| 7 | Article-to-social decomposition (threads, posts, shorts) preserving voice and citation | Publishing | Recommend |
| 8 | Book-to-article and talk-to-article pipelines (repurposing owned IP) | Editor | Recommend |
| 9 | Pathway design assistant (sequence existing articles into a journey for a specific audience) | Editor | Recommend |
| 10 | Course scaffolding tool (8-week transformational course skeleton from corpus) | Editor | Recommend |
| 11 | Content audit (voice, SEO, corpus citations, paratext hygiene) — pre-publish gate | Audit tool | Recommend |
| 12 | Image asset discipline (author style guide, NB2 prompts, brand check) — generate, audit, store | Asset pipeline | Recommend |
| 13 | Internal-link suggestion grounded in the actual site graph, not hallucinated URLs | Editor | Recommend |
| 14 | Formation-metric analytics (return visits, pathway completion, practice uptake) | Dashboard | Assist |
| 15 | Search layer: hybrid lexical + semantic over the corpus, with citation UI | Public site | Recommend |
| 16 | Reader-question ingestion (what people ask that the corpus doesn't yet answer) | Internal app | Assist |
| 17 | Redirect and canonical hygiene on content moves and reorganizations | Platform | Recommend |
| 18 | Republishing / evergreen-refresh scheduler (what to re-sharpen, with author sign-off) | Editor | Recommend |
| 19 | Comment / reply drafting on owned channels, gated by human send | Community | Assist |
| 20 | Cross-tenant pattern learning (what's working across orgs on the platform) — **aggregated**, anonymized, opt-in | Internal analytics | Assist |

**Authority note:** nothing is at Act authority on *publish*. The platform does not auto-publish to public surfaces. Human author sign-off is a first-class concept in the schema, not a nice-to-have.

---

## 4. Mature leadership guide

A content leader running this area well:

- **Owns the voice.** The leader can articulate, in writing, what makes their org (or author) sound like themselves. If they can't, no voice guard can rescue the output.
- **Treats the corpus as the ground.** The org knows what it has published, where it sits, and when it was last reviewed. Corpus ingestion is not a one-time migration; it is a standing discipline.
- **Refuses volume as a metric.** The question is not "how much did we publish?" but "what got signed and what formed readers?"
- **Publishes what a human signed.** Byline is a commitment, not a metadata field. If the author cannot defend the article on a podcast, they shouldn't have signed it.
- **Protects the archive.** Redirects, canonical tags, image hygiene, paratext completeness — these boring disciplines are what let scale compound instead of erode.
- **Measures formation, not reach.** Return visits, pathway completion, reader questions that reference prior articles — these are the maturity metrics. Raw traffic is a vanity floor.
- **Keeps the voice from flattening.** Leadership audits a sample of AI-drafted, author-signed content quarterly for voice drift. If everything sounds like everyone, the platform has won; the mission has lost.
- **Respects the reader.** Gated content is gated for pastoral reasons, not monetization alone. Free content is free without dark patterns.
- **Is disciplined about translations.** A bad translation is a worse representation of the voice than no translation. Translation passes include a linguistic audit and, for high-stakes work, a native speaker reviewer.
- **Doesn't cosplay a newsroom.** The non-profit is not a media company. The rhythm, tone, and evidence bar are different. Leaders who import newsroom habits uncritically will produce content that reads as brittle.

The clearest signal of maturity: **you can tell who the author is without looking at the byline.**

---

## 5. Roadmap to AI maturity

The **onbuilding** (content) block is **four weeks**, **cohort-style** for every leader/tenant: **one** public model, **not** 8- or 12-week variants. (Canonical definition: [docs/build/notes/onbuilding-4-week-course-SSOT.md](../../build/notes/onbuilding-4-week-course-SSOT.md).) **Pre-onboarding** delivers a **fully provisioned** (template) tenant **before** day 1 — not a blank slate. The build is **AI-driven, human-led**, **draft-heavy**, and **clarity-first**; it is **not** a pilot deck.

**Scope discipline:** the exit is “**enough** to **launch**” — *not* every future article, *not* a pathway for *every* theme, *not* a fully built catalog. Post-launch adoption milestones below still apply.

### The four-week onbuilding (content system) — aligned to SSOT

- **Week 1.** **Foundation:** Voice markers, corpus **inventory** (what exists, what’s in scope to ingest), governance registry entries for planned AI use, **one** **pathway** concept set (multiple candidates, **one** will become the primary for launch). Cohort/operator rhythm if multi-tenant: **one** **weekly** **group** touchpoint, **not** 1:1 as the spine. **Ingestion** of core corpus **begins**; chunk/embed pipeline live for trusted sources.
- **Week 2.** **Pillar + cluster in production** for the **highest** **priority** **theme** (at minimum) — **RAG-** and **human-**audited, **not** a stub. **Thematic** **map** “**sufficient** to navigate” the next 90 days — *not* exhaustive paratext for every page. RAG drafting + voice **guard** in audit mode on public-bound drafts. **Clarity** over “every theme **gets** a pillar *this* week.”
- **Week 3.** **Course:** at least one **8-week** **(learner)** **course** arc **defined**; **at least** **one** week **in** **usable** (ship-ready) form in the product; AI conversation hooks where the product uses them. No empty “we’ll do the course later” shell.
- **Week 4.** **At least one** **full** **pathway** (or approved equivalent) that **wires** articles + course. **Transformational** **course** **in** **play** for real users in **live** (or “soft”) **launch** conditions. **Launch** = **signed** + **routed** + **discoverable**; **not** *staging* as the **final** state of onbuilding. Remaining long-tail and extra themes are **post-onbuilding** work unless contracted otherwise.

- **Exit artifact (onbuilding, minimum):** live **tenant**; **voice** guide v1; **ingested** corpus for RAG; **at least** **one** **pillar** + **one** **cluster** in **production**; **at least** **one** **pathway** **and** **one** **course** in **usable** shape; **AI** use **governed**; **author/org** sign-off. **The platform is producing in public — not a staging-only artifact.**

Overlappable with the fundraising build; both usually run after governance.

### Adoption milestones after the build

- **Month 2–5.** Book-to-article and talk-to-article pipelines extending the corpus. Translation pipeline operational for first non-English language. Formation metrics dashboard in use by leadership.
- **Month 5–10.** Multi-tenant boundaries proven (second tenant onboarded without regression). First pathway visibly converting reader journeys end-to-end.
- **Month 10 onward.** Platform hosts 3+ tenants with clean RLS and independent voice guards. Cross-tenant pattern learning (aggregated, opt-in) informs editorial decisions without compromising any single tenant's voice. Annual content audit generates a public "what we stand behind" list. Republishing / evergreen-refresh is a scheduled discipline, not heroic.

An org that skips the four-week build (voice, corpus, governance, first content layer) and jumps straight to unbounded AI drafting will generate voice-drifting, citation-thin content at scale. The sequence inside the four weeks is the work.

---

## 6. Constraints and don'ts

- **No auto-publish to public surfaces.** Ever. Human author sign-off is enforced in the schema.
- **No open-web retrieval in drafting.** RAG is scoped to the org's own corpus plus explicitly licensed sources. The model's general knowledge is not treated as a citation.
- **No ghost bylines.** If AI drafted most of a piece, the author signs it as their own — because they revised it to be so, or they don't publish it. "AI-generated, attributed to X" is not a category this platform supports.
- **No cross-tenant data leakage.** Corpus isolation is enforced at the database and retrieval layer, not at the application layer alone.
- **No voice-flattening style transfer across tenants.** Each tenant's voice guard is theirs; we do not normalize voices toward a house style.
- **No SEO volume plays.** We do not publish to rank. Pillar + corpus + voice is the strategy; rank is an outcome.
- **No image assets without brand + style audit.** Generated images pass the author's style guide and brand check before use.
- **No translation without linguistic audit.** Machine translation in isolation is not a publishable artifact.
- **No paywalling the corpus the org's reputation rests on.** Foundational public writing stays public; gated content is *additional*, not extractive.
- **No "AI content disclaimer" as a substitute for editorial discipline.** The commitment is to voice and corpus fidelity. A disclaimer does not discharge that commitment.
- **No platform change that breaks corpus traceability.** Every published piece can be traced to the corpus chunks it cited, the prompts that drafted it, the voice audit it passed, and the human who signed it. Losing that chain is the single fastest way to lose the platform's reason for existing.
