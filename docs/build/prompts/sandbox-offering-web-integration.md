# Sandbox + Engagement Content — Website Integration Prompt

> **Purpose:** Decide how the non-article artifacts generated in the sandbox-curriculum + Youthfront-proposal flow should live on the existing movemental.com React app. Names every artifact, declares what goes public, what stays private, what gets email-gated, and what new or extended pages are needed.
>
> **Status (2026-04-19):** Phases 1–3 largely shipped: methodology depth + `/methodology/eight-patterns`, `/articles/sandbox` canon hub, composite exemplar, `/resources/templates` request form (contact pipeline), sandbox article CTA strip, `/content/articles/sandbox` redirects. Remaining: PDF/zip assets + automated download email, full cross-link/SEO/analytics pass (Phase 4).
>
> **Scope exclusion:** The nine sandbox articles are *not* in scope for this prompt. They ship through the existing canon article pipeline (ingest → `/content/articles/sandbox/`). This prompt covers everything *else*.

---

## The strategy in one sentence

Make the Sandbox Season offering visible, navigable, and decidable on movemental.com — treating published-methodology as a competitive advantage — while keeping every client-specific artifact strictly out of the public surface.

## Why this choice and not a more guarded one

The instinct with a priced offering is to keep methodology behind a sales conversation. That instinct is wrong for this product. The Sandbox Season's value is the formation the facilitation produces, not the templates the facilitation uses. Publishing the templates costs nothing; hiding them makes the offering look like snake oil. The canon already teaches this — [*Discovery Engine, Not Generator*](/content/articles/discovery-engine-not-generator) argues explicitly against tool-as-magic. Public method. Private engagements. That is the shape.

---

## Inventory of non-article artifacts

Everything this flow produced outside the nine articles:

| ID | Artifact | Source file | Length |
|----|----------|-------------|--------|
| A3 | Sandbox Season Playbook (generic) | `docs/movemental-offering/03-sandbox-playbook.md` | ~2,800 words |
| A4 | Engagement Design (generic) | `docs/movemental-offering/04-engagement-design.md` | ~2,400 words |
| A5 | Youthfront Exemplar (client-specific) | `docs/engagements/youthfront/05-exemplar.md` | ~1,800 words |
| A6 | Youthfront Capability Brief (client-specific) | `docs/engagements/youthfront/06-capability-brief.md` | ~2,500 words |
| A7 | Youthfront Tailored Proposal (client-specific) | `docs/engagements/youthfront/07-tailored-proposal.md` | ~2,300 words |
| A8 | Youthfront One-Pager (client-specific) | `docs/engagements/youthfront/08-one-pager.md` | ~400 words |
| C1 | Eight-Pattern Catalog (extracted from article S4) | Derivable concept | Standalone |
| C2 | Three-Layer Model (extracted from article S1) | Derivable concept | Standalone |
| C3 | Four-Dimension Scoring Frame (extracted from S6) | Derivable concept | Standalone |
| C4 | Ethical & Relational Flag Frame (extracted from S7) | Derivable concept | Standalone |
| C5 | 12-Week Season Calendar (extracted from A3) | Derivable visual | Standalone |
| C6 | Pricing Structure (three zones, from A4) | Table | Standalone |

---

## Classification decisions

### Public — ships to movemental.com

- **A3 (Playbook)** — *compressed*. The overview, the 12-week calendar, and the template descriptions become a public methodology walkthrough. The actual filled-in template content becomes a downloadable pack (see email-gated below).
- **A4 (Engagement Design)** — *substantially public*. The engagement shape, roles, deliverables, pricing structure, criteria for declining, and follow-on products all publish. The internal "why this shape and not others" reasoning goes in a methodology long-form, not a service page.
- **C1 Eight-Pattern Catalog** — *featured public*. This is the single most portable concept from the sandbox canon. Gets its own page with an interactive or scroll-narrative treatment.
- **C2 Three-Layer Model** — *integrated*. Lives inside the methodology page, not a standalone destination.
- **C3 Four-Dimension Scoring Frame** — *integrated*. Inside the methodology page.
- **C4 Ethical & Relational Flag** — *integrated*. Inside the methodology page, with explicit cross-link to the article.
- **C5 12-Week Calendar** — *visual asset on the service page*. A timeline component.
- **C6 Pricing Structure** — *integrated into the existing `/pricing` page*, with a new Sandbox Season row and a link to the service detail page.

### Email-gated — available with an email opt-in

- **Template pack** extracted from A3: Season Charter, 8-Pattern Scan Worksheet, Experiment Brief, Scoring Sheet, Ethical & Relational Flag Paragraph, Portfolio Page Template. Six templates, one PDF, plus a markdown zip. Form captures email, org name, role.
- **8-Pattern One-Page Scan Worksheet** as a standalone smaller download, offered on the Eight Patterns page.

The email gate is not a paywall; it is a lead-qualifier. People who will never become clients get the templates anyway by signing up. People who *might* become clients self-identify. The exchange is honest: email for templates.

### Private — never ships to the web, stays in repo

- **A5 Youthfront Exemplar.** Client-confidential. Lives at `docs/engagements/youthfront/` only.
- **A6 Youthfront Capability Brief.** Client-confidential. Ditto.
- **A7 Youthfront Tailored Proposal.** Client-confidential. Ditto. (Contains pricing and contracting terms specific to Youthfront.)
- **A8 Youthfront One-Pager.** Client-confidential. Ditto.
- **Any future client artifacts of types A5–A8.** A new `docs/engagements/[client]/` directory per client, never web-deployed. This pattern is durable and should be followed for the next client too.

A **generic composite exemplar** (different from Youthfront's, using a fictional or aggregated organization) can and should ship publicly. That's a separate writing task, noted under page specs below.

---

## Page-by-page specification

All routes assume the existing `(site)` route group. Semantic tokens and shadcn primitives per [docs/design/DESIGN.md](../../design/DESIGN.md). No raw hex, no hardcoded colors, no stock imagery. Sections composed from existing `primitives/Section`, `Container`, `Display`, `Eyebrow`, `Prose`, `ArrowLink`.

### New page: `/services/sandbox-season`

The canonical service page. The one a prospective buyer is sent to.

**Purpose:** Present the Sandbox Season offering at decision density. A senior leader should be able to read it in six minutes and know whether to request a conversation.

**Structure:**

1. **Hero band.** Eyebrow: "AI Stewardship Sequence · Stage 2." Display headline. One-sentence shape. Primary CTA: *Request a conversation*. Secondary CTA: *Read the methodology*.
2. **What you'd walk away with.** The three deliverables (validated portfolio, governance one-pager, trained cohort) as three card blocks on `bg-section` surface.
3. **The 12-week calendar.** Visual timeline component. Week 1–12, phases marked, milestones called out (first scan, first scoring, first flag, portfolio handoff). Sourced from C5 / A3's table.
4. **The cohort shape.** Seven roles (Senior Sponsor, Portfolio Owner, Safety Owner, Experiment Operators ×3, Observer-Veto), with descriptions. No names (this is the generic page). Mirrors A4 Section 3.2 generic version.
5. **What's explicitly out of scope.** The published out-of-scope list from A4. This is a positioning move — declared scope discipline builds trust.
6. **Pricing.** The three zones (Small / Mid / Large), with fee ranges. Milestone-weighted payment structure shown. Link out to `/pricing` for full context and to `/services/sandbox-season/follow-on` for the four-stage arc.
7. **Methodology pointer.** One-sentence summary of the nine-article canon with a link to `/content/articles/sandbox`.
8. **Exemplar.** A link to the generic public exemplar (see below).
9. **Footer CTA band.** Two paths: *Book a 30-min intro call* (primary) and *Download the template pack* (email-gated).

**Word budget:** ~800–1,200 words across the page, not counting the timeline visual.

### New page: `/services/sandbox-season/exemplar`

**Purpose:** A publishable composite case showing what a season looks like for a plausible mid-sized organization. Parallels A5 in shape without citing any real client.

**Content:** Write a new composite from scratch. Do *not* lightly anonymize the Youthfront artifact; that risks recognizable specifics leaking. The composite should feel like a real organization with its own particulars — name it fictionally, give it a plausible mission-adjacent context, make up a board situation — and walk through Week 1, Week 6, Week 12.

**Length:** ~1,000 words.

**Status:** This is a new writing task, not a transformation of an existing artifact.

### Extended page: `/methodology`

Existing page. Extended, not replaced.

**What to add:**

1. **AI Stewardship Sequence overview section.** Introduce the AI Stewardship Sequence — Safety, Sandbox, Skills, Solutions — as four cards in order, with brief descriptions. Each card links to the relevant canon piece (#12, #15, #16, #17). The order is the framework.
2. **Sandbox deep-dive section.** The three-layer model (C2). The 8 patterns (C1) with a pointer to the dedicated `/methodology/eight-patterns` page. The 4-dimension scoring frame (C3). The ethical & relational flag (C4). Each item ~120 words, cross-linking to the article.
3. **The season rhythm.** Visual reference to the 12-week calendar, with text explaining why spaced practice and reflection-in-action are non-negotiable in the design.

**Do not** duplicate the articles' prose on this page. The methodology page is a *map*; the articles are the *territory*. Link, don't re-explain.

### New page: `/methodology/eight-patterns`

**Purpose:** Showcase the eight patterns as a standalone, memorable, shareable resource. This is the page most likely to get linked from external newsletters, LinkedIn posts, and conference talks.

**Treatment:** Scroll-narrative or horizontal-scroll component (the repo already has GSAP and horizontal patterns from fragmentation-stages work — consult those as prior art). Each pattern gets:

- Number and name
- Shape (one sentence)
- Three example domains (expandable)
- Typical value type (speed / scale / cognition / acceleration / quality / coherence / reasoning / relational-scaling)
- Typical trap (one paragraph)

Personalization (pattern 8) visually marked as flagged, consistent with its canon treatment.

**Footer CTA:** Download the one-page scan worksheet (email-gated) + link to full article at `/content/articles/sandbox/the-eight-patterns-where-value-hides`.

**Length:** Minimal prose, heavy visual composition. Perhaps ~800 words total.

### Extended page: `/pricing`

Existing. Add a Sandbox Season row with:
- Fixed-fee nature (not hourly, not retainer).
- Three zones with fee ranges.
- Milestone-weighted payment (10K / 11K / 11K for mid-zone as a shown example).
- Link out to `/services/sandbox-season` for full context.

Add a brief paragraph about why Movemental publishes pricing at all: transparency compresses the sales cycle, and scope discipline is the product.

### Extended page: `/services`

Existing. The Sandbox Season gets a top-placed card linking to `/services/sandbox-season`. Safety, Skills, and Solutions stages each get small placeholder cards saying "available following Sandbox" or similar — this makes the AI Stewardship Sequence visible from the services index.

### New route: `/resources/templates` *(email-gated)*

**Purpose:** Deliver the template pack behind an email capture.

**Implementation:** Simple form → Supabase row → triggered Resend email with download link. The templates themselves are hosted as static assets (PDF + markdown zip). No login required; the download link is time-limited or served via the email.

**Form fields:** Email (required), org name (required), role (required), how-you-found-us (optional). Respects existing `/api/newsletter` double-opt-in pattern from the contact playbook.

### No changes needed: `/content/articles/sandbox`

The nine articles already ingest and render via the existing canon pipeline. What may be worth adding is a dedicated **canon hub page** at `/content/articles/sandbox` that orders the nine by `sandbox_order` and groups them by `sandbox_layer`. This is the pattern already proposed in the parent canon prompts file for the full 23-piece canon.

---

## Cross-linking strategy

Every page in this subsystem links intentionally. The skeleton:

- `/services/sandbox-season` ↔ `/methodology` (deeper methodology) ↔ `/content/articles/sandbox` (full argument)
- `/services/sandbox-season` → `/pricing` (fees detail)
- `/services/sandbox-season` → `/services/sandbox-season/exemplar` (composite case) → back to service page
- `/methodology/eight-patterns` ↔ `/content/articles/sandbox/the-eight-patterns-where-value-hides`
- Every article in `/content/articles/sandbox/*` → `/services/sandbox-season` in the footer CTA (handled once in the article template, not per piece)
- Every article in `/content/articles/sandbox/*` → the next article via the existing `next_canon_piece` frontmatter

The cross-links are not promotional. They are orientation. A reader arriving on a single article should be able to find the service, the methodology, the exemplar, and the full canon without friction; a reader arriving on the service page should be able to go as deep into the argument as they want.

---

## What each artifact becomes (compression map)

| Source artifact | Web surface | Compression ratio |
|-----------------|-------------|-------------------|
| A3 Playbook (2,800 words) | Service page timeline + methodology section + template pack download | ~80% into service+methodology, full text in gated download |
| A4 Engagement Design (2,400 words) | Service page core + pricing page + "how we work" copy | ~70% public, 30% internal reasoning stays in repo |
| A5–A8 Youthfront artifacts | Nothing | 0% to web |
| C1 Eight Patterns | Dedicated page + methodology section + email-gated worksheet | Full content, reshaped for scroll/scan |
| C2 Three Layers | Methodology section only | Compressed to ~150 words |
| C3 Scoring Frame | Methodology section + service page treatment of "what we score" | Compressed to ~150 words + table |
| C4 Flag Frame | Methodology section + service page "how decisions get made" | Compressed to ~150 words |
| C5 12-Week Calendar | Service page visual timeline | Visual, minimal text |
| C6 Pricing | Pricing page row + service page section | Full table, both places |

---

## Implementation sequence

The smallest valuable implementation first; expand from there.

**Phase 1 — Minimum viable offering surface.** (One sprint.)
1. Create `/services/sandbox-season` page with hero, deliverables, cohort, out-of-scope, pricing summary, CTA band. No composite exemplar yet, no downloads.
2. Add Sandbox Season row to `/pricing`.
3. Add Sandbox Season card to `/services` index.
4. Deploy; test the CTA → contact form flow end-to-end.

**Phase 2 — Methodology depth.** (One sprint.)
5. Extend `/methodology` with the AI Stewardship Sequence section + Sandbox subsections.
6. Create `/methodology/eight-patterns` page with scroll or horizontal treatment.
7. Add canon hub at `/content/articles/sandbox` listing the nine pieces.

**Phase 3 — Lead generation.** (One sprint.)
8. Write the composite public exemplar; ship at `/services/sandbox-season/exemplar`.
9. Produce the six-template pack (PDF + markdown zip) from the A3 templates.
10. Build email-gated download at `/resources/templates`.
11. Add download CTA to service page, eight-patterns page, and relevant articles.

**Phase 4 — Polish.** (Half sprint.)
12. Cross-link audit across all pages and articles.
13. SEO pass (titles, descriptions, OG images, JSON-LD) per existing `seo-setup` skill.
14. Analytics events for CTA clicks, template downloads, exemplar reads, per existing analytics stack.

---

## Design-system commitments

Inherit entirely from [DESIGN.md](../../design/DESIGN.md) and [stitch-to-react-migration.md](./stitch-to-react-migration.md). No inventions. Specifically:

- Semantic tokens only (`bg-background`, `bg-section`, `bg-card`, `bg-elevated`, `bg-inverse-surface`, `text-foreground`, `text-muted-foreground`, `bg-primary`). No raw hex, no `bg-white/black/gray-500`, no `bg-blue-600`.
- No 1px solid borders for sectioning. Tonal stacking is the depth mechanism.
- No pasted drop shadows; `shadow-ambient` only if elevation is truly needed.
- Primary blue (`#0053db`) for CTAs and high-priority focus only. Subtle `primary → primary_dim` gradient allowed on CTAs.
- Inter only. Display headings `letter-spacing: -0.02em`. Labels uppercase with `letter-spacing: 0.05em`.
- Midnight hero bands use `variant="midnight"` on the `Section` primitive — particularly effective on the services hero and the methodology presentation of the AI Stewardship Sequence.
- No stock imagery. Visual composition carried by typography, layout, and tonal stacking. Patterns page may use GSAP motion per existing fragmentation-stages pattern, not stock photos.

## Writing voice commitments

Canon voice per [movemental-canon-article-prompts.md](./core-articles/movemental-canon-article-prompts.md) applies to every word of web copy in this subsystem. Specifically:

- Measured, senior, quietly confident. No breathless tech-enthusiast tone.
- Short sentences carry the hardest ideas.
- No consultant-speak (`unlock`, `game-changer`, `leverage synergies`).
- No AI slop tells (em-dashes-as-filler, `delve`, `moreover`, `it's not just X, it's Y`).
- Primary blue gets a light-switch role; the same is true of the exclamation point. It does not appear on this site.

## What this prompt deliberately does not include

- Component-level implementation details. That belongs to the PR that builds Phase 1.
- Copy drafts for the new pages. The existing artifacts and articles supply the raw material; the copy compression is a writing task adjacent to implementation, not a separate planning artifact.
- A separate client-portal design. The Youthfront artifacts live in-repo for now. When a second client engagement warrants a portal, that becomes a different planning prompt.
- Any decision about whether to run a newsletter, podcast, or course adjacent to this offering. Those are separate strategic decisions, not derived from the flow.

---

## The underlying wager

Publishing the methodology in this much detail is a wager. The wager is that prospective clients who read the full canon, the service page, and the composite exemplar will be *more* likely to engage, not less — because the depth signals seriousness, and seriousness is what this category of work requires. The alternative wager — hide the method, sell the consultation — is the wager every generic agency makes. Movemental wins by not making it.

The website is the shape of the wager.
