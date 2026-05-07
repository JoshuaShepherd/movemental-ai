# AI Studio — Full Site MVP (Phased Execution)

This document breaks the **Full Site MVP** implementation brief into ordered phases for AI Studio (or any agent run). Execute phases **sequentially**. After each phase marked **Gate**, run `pnpm validate:all` and confirm `pnpm build` succeeds before continuing unless the phase explicitly says otherwise.

**Repo mapping (this codebase):** Route files live under `src/app/(site)/`. Page compositions typically live under `src/components/studio/pages/` (not `src/pages/`). Redirects may live in `next.config` or routing config — discover the project pattern before editing.

**Authoritative substance:** Locked nomenclature, pricing tables, configuration definitions, and voice rules from the original brief are canonical. Where the live site disagrees with this document, **this document wins**. Where this document is ambiguous, **ask** before guessing.

---

## How to use this file

1. Read **Phase 0** once; apply its rules on every subsequent edit.
2. Complete phases in order; do not skip gates.
3. Keep a short changelog of redirects added, files deleted, and new routes.
4. Defer optional work (Voice Intake page) until demo assets exist.

---

## Phase 0 — Site-wide rules (apply everywhere)

**Goal:** Establish non-negotiables before touching page copy or structure.

### P0.1 Locked nomenclature (Stage 01–04)

- **Stage 01: Safety** (full: "Safety Documentation" when context needs it)
- **Stage 02: Sandbox** (full: "Sandbox Discovery")
- **Stage 03: Skills** (full: "Skills Development")
- **Stage 04: Solutions** (full: "Solutions Deployment")

**Legacy term sweep (display copy and titles only; legacy URL slugs may remain):**

| Replace | With |
|--------|------|
| Foundations (as stage name) | Safety |
| Lab (as stage name) | Sandbox |
| Fluency (as stage name) | Skills |
| Build / Technology (as **stage** name, not arbitrary page titles) | Solutions |

**Routes:** Keep backward-compatible slugs (e.g. `/pathway/foundations`) if required. **Display** must use locked names. Add **canonical** redirects from new slugs (`/path/safety`, `/path/sandbox`, `/path/skills`, `/path/solutions`) to existing canonical routes if not already present.

### P0.2 Voice and tone

- No exclamation points on the marketing site.
- No emoji.
- Ban list: leverage, synergy, transform, innovative, cutting-edge, world-class, best-in-class, revolutionary, game-changing, unleash, unlock, supercharge, next-generation, state-of-the-art, paradigm-shifting, disrupt, disruption, disruptor.
- "Discern" and forms: natural, not forced.
- Emphasis: italic serif for "for whom" lines and key strategic statements where the design system supports it.
- Numbers: words for one–nine; digits from ten up, except prices ($ + digits), percentages (digits), stage numbers (01–04), module numbers (01–08), technical specs.
- Audience: senior peers (pastors, EDs, denominational leaders, seminary deans). No lecturing.
- Rhythm: **reality → work → outcomes → fit → next** (not classic SaaS problem → solution → benefits → CTA).

### P0.3 Pricing consistency

Any page that mentions price must match **canonical pricing** (see **Phase 4 / Pricing** / Section D.4 tables in the appendix). If a number appears elsewhere, align it.

### P0.4 Component and design discipline

- Reuse `src/components/studio/*` and `src/components/site/*`.
- Prefer **modify in place** over parallel components when close.
- No new design tokens, typography systems, or palettes — follow `docs/design/DESIGN.md`.

### P0.5 Cross-linking discipline (verify in Phase 8)

Dense internal linking is intentional. Before MVP sign-off, confirm:

- Every stage page → prior/next stage via `PathContinuityFooter`.
- Every audience page (church, nonprofit, institution) → four stage pages + Pathway Overview.
- Every page mentioning pricing → Pricing page.
- Every page mentioning Field Guide → Field Guide page.
- About → Team + Movement Leaders.
- Team → About + Voices.
- Voices → Movement Leaders (definition).

### P0.6 Target global nav and footer (implement in Phase 8)

**Nav:**

- **The Path** → Pathway Overview + four stage pages
- **Who We Serve** → overview + three audience pages
- **Pricing**
- **About** → About, Team, Voices, Movement Leaders
- **Resources** → Field Guide, Library, FAQ
- **Contact**

**Footer:** All stage pages, audience pages, About, Team, Pricing, Field Guide, Library, FAQ, Contact, Privacy, Terms, Cookies; one-line company blurb (e.g. "Movemental helps churches, nonprofits, and institutions build the foundation, discernment, and capacity to lead AI work with wisdom."); copyright.

**Gate (Phase 0):** Do not build yet if P0 rules are unclear; resolve ambiguities with the requester.

---

## Phase 1 — Path spine and canonical descriptions

**Goal:** Lock the narrative spine so all other pages pull from one source of truth.

| Step | Work |
|------|------|
| 1.1 | **Pathway Overview (`/pathway`)** — Hero, pathway container (01–04 with duration, one-line description, headline price range, links), deliverables section, rationale ("why order matters"), new **"The path in pricing"** (bundle $58,500 vs $65,000 + 10% engagement-efficiency framing; link Pricing). Add "Listen, Clarify, Equip, Build" from retired Work With Us **only** if it adds non-duplicate value. Closing CTA: Field Guide / Contact. |
| 1.2 | **Field Guide (`/field-guide`)** — Hero/subhead; **"How to use this guide"** at top; per-stage sections (definition, artifacts, why it matters, cost link, deep page link). Align copy with source-of-truth. **PDF:** generate to `public/downloads/movemental-field-guide.pdf`, email-gated via newsletter pattern; refresh PDF when content changes. Closing CTA per brief. |
| 1.3 | **Four stage pages** — Already rewritten; **verify** nomenclature, pricing mentions, links, and voice still match Pathway Overview + Field Guide. |

**Gate:** `pnpm validate:all` + `pnpm build`.

---

## Phase 2 — Audience surface and data layer

**Goal:** Segment pages and shared data reflect the field-paper reality framing.

| Step | Work |
|------|------|
| 2.1 | Update `src/data/audience-data.ts` (or equivalent) for **churches, nonprofits, institutions**: hero stats/reality (per brief), entry cards mapped to four stages, segment pathway copy, "If skipped" framing, 3–5 segment-only FAQs, closing CTAs (Begin Safety / Contact / Field Guide). |
| 2.2 | **Audience pages** (`/for-churches`, `/for-nonprofits`, `/for-institutions`) — Keep composition; refresh from data. |
| 2.3 | **Who We Serve (`/who-we-serve`)** — Hero "Three organizations. *One Sequence.*", shared state, four-stage comparison table, audience nav cards. |

**Gate:** `pnpm validate:all` + `pnpm build`.

---

## Phase 3 — Company, trust, and conversion pages

**Goal:** About/team/voices/movement leaders + FAQ + contact + library + diagnostic framing.

| Step | Work |
|------|------|
| 3.1 | **About (`/about`)** — Hero, expanded Story, Beliefs (keep three + add **Discernment over efficiency**), Platform (honest tech + link to **Technology Foundation** route from Phase 4), new **How we work** (boundaries from Work With Us: no software sales, no speed push, honest scoping, building in public). Final CTA. |
| 3.2 | **Team (`/team`)** — Hero, refreshed long profiles (Brad, Alan, Joshua per brief), closing CTAs (Voices / Contact). |
| 3.3 | **Voices (`/voices`)** — Hero, grid copy, closing (Movement Leaders / Contact). |
| 3.4 | **Movement Leaders (`/movement-leaders`)** — Hero, refreshed definitions, new section "How movement leaders relate to Movemental", closing CTAs. |
| 3.5 | **FAQ (`/faq`)** — Replace/extend questions per brief (Getting Started, The Path, Approach, Stewardship, AI Technology). Short answers; link out for depth. |
| 3.6 | **Contact (`/contact`)** — Hero, reassurance, three-step "what happens next", placeholder update, **"Who this is for / not for"** section. |
| 3.7 | **Library (`/library`)** — Hero refresh; categories Theology / Policy / Practice / Formation aligned to stages where helpful; featured block → Field Guide; newsletter = same Resend pattern as other forms. |
| 3.8 | **Integrity Diagnostic (`/assess`)** — Reframe as pre-Sandbox tool; new headline *"Where is your organization* actually *starting?"*; Path references; **"What this diagnostic is and is not"**; keep 22 questions, form, read-back. |

**Gate:** `pnpm validate:all` + `pnpm build`.

---

## Phase 4 — New pages (Pricing, Technology Foundation, Networks)

**Goal:** Add routes that reduce friction for buyers and complete the IA.

| Step | Work |
|------|------|
| 4.1 | **Pricing (`/pricing`)** — Hero, `PricingPosture`, per-stage tables, bundle table, annual licensing rows, segment notes, pricing FAQ, closing CTA. Use **exact** offerings and prices from appendix **D.4**. |
| 4.2 | **Technology Foundation** — Recommended route: **`/foundation`** (avoid collision with Stage 04 `/technology`). Sections: What Was Built, Five Pillars, Honest Accounting, Why This Matters, Closing CTA. Content per original D.2. |
| 4.3 | **Network Engagements (`/networks`)** — Hero through closing per original D.3; pricing table summary + link to Pricing. |

**Gate:** `pnpm validate:all` + `pnpm build`. Ensure every page that mentioned scattered pricing can now link to `/pricing`.

---

## Phase 5 — Homepage (summary of the system)

**Goal:** Home reflects the finalized path, audience, and CTAs.

| Step | Work |
|------|------|
| 5.1 | **Homepage (`/`)** — Keep section order: Hero, WhyThisOrder, Pathway, WhereYouStart, BuiltWithLeaders, PathIsBeingWalked, Closing. Apply copy spec from original **C.1** (hero, why order, pathway cards from Pathway Overview, audience cards, built-with-leaders → Voices, social proof teaser, closing three CTAs). |

**Gate:** `pnpm validate:all` + `pnpm build`.

---

## Phase 6 — Retirements and redirects (after new pages exist)

**Goal:** Remove duplicate IA; preserve harvested content; never leave dead links.

| Step | Work |
|------|------|
| 6.1 | **Start with Safety** — Harvest unique content (five pillars, four diagnostic questions) into Stage 01 or Diagnostic. **301** `/start-with-safety` → canonical Safety route. Remove `StartWithSafetyPage` (or equivalent) and imports. |
| 6.2 | **Work With Us** — Harvest Listen/Clarify/Equip/Build, Boundaries, Outcomes (already used in Phases 1 & 3). **301** `/work-with-us` → `/pathway`. Remove `WorkWithUsPage` and imports. |
| 6.3 | **Evidence** — Move data to Field Guide / stages; people/credibility to About/Team; "building in public" to About. **301** `/evidence` → `/about`. Remove `EvidencePage` and imports. |

**Gate:** `pnpm validate:all` + `pnpm build`. Manually hit old URLs and confirm redirects.

---

## Phase 7 — Optional: Voice Intake page

**Only if** demo assets (video, screenshots, sample output) exist.

- Route e.g. `/voice-intake`. Composition: Hero, Problem, How it works, Where it fits, Demo, CTA.
- If no demo assets, **defer**; keep coverage on Technology Foundation and Solutions stage page.

---

## Phase 8 — Site-wide cleanup and MVP sign-off

**Goal:** Production-quality IA, SEO, a11y, and forms.

| Step | Work |
|------|------|
| 8.1 | **Navigation & footer** — Implement **P0.6**. |
| 8.2 | **Sitemap & robots** — Include live routes; exclude retired paths; redirects remain for retired URLs. |
| 8.3 | **Cross-linking pass** — **P0.5** checklist; stage footers; price → Pricing; Field Guide links. |
| 8.4 | **Metadata** — Unique title `[Page Name] — Movemental`, unique description, OG image (default unless custom warranted), canonical URL. |
| 8.5 | **Performance & a11y** — Lighthouse on key URLs (home, four stages, audiences, About, Pricing); Axe; fix regressions. |
| 8.6 | **Forms** — Contact, newsletter, Field Guide gate, Integrity Diagnostic → end-to-end with Resend on staging. |
| 8.7 | **Voice lint** — No banned words, no `!`, no emoji across marketing surfaces. |

**Final gate:** Complete checklist **Phase 9**.

---

## Phase 9 — MVP completion checklist

- [ ] `pnpm validate:all` passes  
- [ ] Stage pages show **Stage 01–04** / Safety, Sandbox, Skills, Solutions  
- [ ] Retired routes **301** to targets  
- [ ] New pages linked from nav and/or footer  
- [ ] Any price mention links to **Pricing**  
- [ ] Field Guide renders + **PDF download** works (gated)  
- [ ] Integrity Diagnostic E2E with new framing  
- [ ] Voice/tone lint clean  
- [ ] Unique meta title + description per page  
- [ ] Homepage Lighthouse 90+ (performance, accessibility, best practices, SEO) — tune as feasible  
- [ ] Forms verified on staging  
- [ ] No rushed guesses on ambiguous brief points  

---

## Appendix A — Canonical pricing (authoritative tables)

Paste or merge from the original brief **Section D.4** in full when executing Phase 4. Summary for quick reference:

**Stage 01 — Safety Documentation**

| Offering | Price | Segments |
|----------|-------|----------|
| Field Guide (Free Toolkit) | Free | All |
| AI-Assisted Safety Product | $1,997 | All |
| Facilitated MVP Engagement | $5,000 | All |
| Care Boundaries facilitator add-on | $300 | All |

**Stage 02 — Sandbox Discovery**

| Offering | Price | Segments |
|----------|-------|----------|
| Self-Service Sandbox Toolkit | $497 | All |
| AI-Assisted Sandbox | $3,997 | All |
| Facilitated Sandbox Discovery | $15,000 | All |
| Network Sandbox | From $60,000 | Institutions only |

**Stage 03 — Skills Development**

| Offering | Price | Segments |
|----------|-------|----------|
| Self-Paced License | $4,800/year per org | All |
| Cohort Facilitation | $15,000 | All |
| Network Skills | From $60,000 | Institutions only |
| Train-the-Facilitator Certification | $25,000 | Institutions and large orgs |

**Stage 04 — Solutions Deployment**

| Offering | Price | Segments |
|----------|-------|----------|
| Scoping Consultation | $5,000 | All |
| Configuration A: Tool Optimization | $30,000–$50,000 | All |
| Configuration B: Composed Application | $80,000–$150,000 | All |
| Configuration C: Content & Intelligence Platform | $80,000–$150,000 | Content-heavy |
| Configuration D: Movemental Platform Tenant | $180,000–$320,000 | All |
| Configuration E: Network Platform | $350,000–$650,000+ | Institutions and networks |
| Configuration F: Hybrid/Bespoke | Scoped per conversation | All |

**Annual platform licensing (post-deployment)**

- Configuration C — $15,000–$30,000/year  
- Configuration D — $24,000–$48,000/year  
- Configuration E (institutional) — $36,000–$72,000/year  
- Configuration E (per node) — $6,000–$12,000/year per node  

**Bundles**

- Safety + Sandbox — $18,000 (10% off)  
- Sandbox + Skills — $27,000 (10% off)  
- Skills + Solutions A — From $40,000 (10% off, varies)  
- Full Path (Configuration A) — $58,500 (10% off $65,000 separately)  
- Full Path (Configuration B/C) — From $108,000 (10% off, varies)  
- Full Path (Configuration D) — From $200,000 (10% off, varies)  
- Network Path (Configuration E) — From $440,000 (10% off institutional, varies)  

Bundle rationale copy: engagement efficiency / continuity; not margin sacrifice; stage-by-stage not penalized — use verbatim from original brief under bundles section.

---

## Appendix B — Original section mapping

| Original section | Phase |
|------------------|-------|
| A Site-wide rules | Phase 0 |
| C Pathway, Field Guide, stages verify | Phase 1 |
| C Audiences, Who We Serve | Phase 2 |
| C About → Library, Assess | Phase 3 |
| D New pages | Phase 4 |
| C Homepage | Phase 5 |
| B Retirements | Phase 6 |
| D.4 Voice Intake optional | Phase 7 |
| E Cleanup | Phase 8 |
| G Validation | Phase 9 |

---

## Appendix C — Execution notes for AI Studio

- **Do not** retire routes until replacements and redirects are ready (Phase order enforces this).  
- **Homepage last** (Phase 5) so it summarizes finalized copy and pricing.  
- **Ask** rather than invent when the source-of-truth document or this file leaves a gap.  
- When the MVP is done, the site should read as **one coherent argument**: senior peer voice, honest pricing, sequenced path, no SaaS-default rhythm.
