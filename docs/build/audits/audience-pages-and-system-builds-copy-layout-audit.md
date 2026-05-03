# Audit: audience pathways & system build pages (copy + layout)

**Scope:** `/movement-leaders`, `/churches`, `/nonprofits`, `/system-builds` hub, and the vertical build pages they point to (`/system-builds/discovery-lab`, `content`, `fundraising`, `governance-ethics`, `foundation`).

**Sources reviewed:** route `page.tsx` metadata, primary section components under `src/components/sections/movement-leaders/`, `churches/`, `nonprofits/`, `system-builds*/`, shared `src/components/system-builds/*`, and data files `churches-data.ts`, `nonprofits-data.ts`, `hub-cards.ts`.

**Design bar (implicit):** [docs/design/DESIGN.md](../../design/DESIGN.md) — clarity over cleverness, trust through inspectability, semantic tokens, editorial premium, formation-first voice where the org claims it.

**Status:** Final (reviewed against source 2026-04-14). All concrete code/UX claims verified against live files.

---

## Final call (post-review)

The audit is accurate. Every specific code claim was checked against source and holds: dead-end `SurfaceCard`s without `href` on churches assessment, unlinked `<div>` rows on Core System Builds, literal `💻` / `👥` in [churches-page-content.tsx:429,445](../../src/components/sections/churches/churches-page-content.tsx#L429), `alt="interlocking architectural structures"` on a sanctuary photo at [churches-page-content.tsx:129](../../src/components/sections/churches/churches-page-content.tsx#L129), nonprofit hero with zero CTAs, Discovery Lab three-button hero.

**Where I push harder than the draft:**

1. **Dead-end cards are the top priority, not #2.** The original order puts "unify narrative spine" first. That's editorial work across weeks; the assessment cards are a broken interaction users hit today. Ship the fix first, narrative second.
2. **Churches `systemBuilds` taxonomy is not just a naming drift — it's a product-map error.** "Formation System" and "Support & Stewardship System" are not lighter aliases for shipped SKUs; they describe *different conceptual frames*. Don't just rename — decide whether churches get a distinct product vocabulary (and justify it explicitly on the page) or align to [hub-cards.ts](../../src/lib/system-builds/hub-cards.ts). Half-measures will compound.
3. **Movement leaders hero is worse than "narrow."** "Someone searching for 'APEST framework' may not land on the author who coined it first" is grammatically awkward, reads as analytics anxiety, and presumes the visitor already knows the SEO frame. Rewrite from credibility/stewardship, not search funnels.
4. **The 28× / 500× block should be removed or moved below the manuscript reference — not just demoted.** Even with the "illustrative" disclaimer, two oversized tabular numerals above Ownership and Definition implies measured performance. The argument is stronger without them.

**Where I push back / soften:**

- **"Organizational engine" / "install structure"** (nonprofits) is fine in context — nonprofit executives read "engine" as operational seriousness, not SaaS. The real offender in that section is the card bullets (`Pipeline automation`, `Custom AI agents`, `Distribution engine` at [nonprofits-data.ts:17,25,38](../../src/components/sections/nonprofits/nonprofits-data.ts)), which make *specific capability promises* formation-first copy can't back. Fix the bullets; keep the metaphor.
- **Movement leaders "Everything in one home"** duplicating the old homepage is a voice-consistency nit, not a gap. Park it until the hero + economics reorder lands, then re-check.
- **Discovery Lab methodology button** — not a full "decision fatigue" failure; the hero has a clear primary. Demote methodology to a body link and keep the two remaining CTAs as primary/secondary rather than re-architecting the hero.

**Revised top priorities (order to ship):**

1. **Churches UX fixes:** link `startHereCards` to `/assess` (or contact), wire `systemBuilds` rows to real `/system-builds/*` routes **after** resolving the taxonomy decision, replace emoji with `lucide`, fix sanctuary alt text.
2. **Nonprofits hero CTA** + soften card bullets to operational outcomes that match the Outputs section.
3. **Movement leaders hero rewrite** (credibility/stewardship) and remove/move the 28× / 500× block.
4. **Churches taxonomy decision** (distinct product vocabulary vs align to hub-cards) — blocker for priority 1's linking step.
5. **Discovery Lab + hub:** demote methodology CTA; give the hub a one-line "who this is for" differentiator vs `/nonprofits`.
6. **Cross-cutting:** pathway-language → routes map in `docs/build/`.

---

## Executive summary

These pages carry **conversion-critical** journeys (who we serve → why system builds → which build → conversation). Today they **mix strong modular pieces** (Midnight heroes on builds, hub cards, pathway narratives) with **inconsistent voice**, **weak wayfinding** between “pathway story” and **named product routes**, and a few **UX dead ends**. The system build SKUs are the spine of revenue/sequencing; the audience pages should **sell the spine first**, then differentiate by audience—not the reverse.

**Top priorities (recommended order):**

1. **Unify narrative spine** across all four surfaces: same glossary (system build vs program vs consulting), same promise (artifacts + ownership + formation), same primary CTA hierarchy.
2. **Make every “Start here” / assessment card either link or lead to one obvious next step** (right now churches assessment cards read like buttons but go nowhere).
3. **Wire church “Core System Builds” list to real `/system-builds/*` pages** (or rename rows to match product names to avoid “Formation System” sounding like vapor).
4. **Tone-down or reframe “illustrative” reach multiples** on movement leaders until methodology is linked in-line; scanners treat numbers as claims.
5. **Reduce hero CTA sprawl** on build pages where three actions compete (e.g. Discovery Lab).

---

## `/movement-leaders` — [`movement-leaders-page-content.tsx`](../../src/components/sections/movement-leaders/movement-leaders-page-content.tsx)

### What works

- Clear **two-button hero** (conversation + how it works).
- Strong **ownership / operator** split (midnight “not the operator” band).
- **Definition** section (“Who counts as a movement leader?”) matches serious positioning.
- **BookReference** ties the page to inspectable depth.

### Copy gaps

- **Hero headline is extremely narrow** (“Someone searching for ‘APEST framework’…”). It signals SEO anxiety more than **formation or stewardship**; many movement leaders will not self-identify with that query. Consider leading with **credibility / corpus / stewardship** and moving APEST to a supporting example or body paragraph.
- **“90% revenue retention”** as the first major section headline jumps to **economics before pain or promise**; emotionally it reads like a deck slide, not editorial. Consider moving economics **after** consolidation + operator story, or softening the H2 to tie revenue to **sustainability of calling**.
- **“Everything in one home — consolidation…”** duplicates older homepage language; align with refreshed home hero (stewardship, embodied trust) for **one-house style**.
- **Network reach (28× / 500×):** disclaimers exist in body copy, but the **visual hierarchy** still reads like performance marketing. Either demote numbers, add a visible “model / not a promise” label adjacent to the stat, or move the entire block **below** methodology/evidence.

### Layout / UX

- Long **linear scroll** with many equally weighted `Display` blocks; few **in-page anchors** for returning visitors comparing economics vs network vs definition.
- **Strategic depth & evidence** section is dense; consider a **single “Evidence & methodology”** jump link from hero.

### Metadata ([`movement-leaders/page.tsx`](../../src/app/(site)/movement-leaders/page.tsx))

- Description emphasizes **search / consolidation / economics**; consider adding **formation + trust** language to match the rest of the site’s refreshed hero.

---

## `/churches` — [`churches-page-content.tsx`](../../src/components/sections/churches/churches-page-content.tsx) + [`churches-data.ts`](../../src/components/sections/churches/churches-data.ts)

### What works

- **Hero** is clear and human (“From activity to formation”).
- **Current reality → paradigm → assessment → builds → integration → paths** is a coherent **Stitch-era narrative arc**.
- **BookReference** and **midnight theological** band give depth and differentiation.
- **Final CTA** points to both conversation and system builds hub.

### Copy gaps

- **Eyebrow “The Movemental Pathway”** in hero vs **“For churches”** in the next section — pick **one primary audience label** above the fold (“For churches” + pathway subtitle, or pathway as H1 subline).
- **“Core System Builds”** list ([`systemBuilds`](../../src/components/sections/churches/churches-data.ts)) uses **names that do not match shipped product pages** (e.g. “Formation System”, “Support & Stewardship System”) while `/system-builds` sells **Content, Fundraising, Governance & Ethics, Discovery Lab, Foundation**. Pastors who click through will feel a **taxonomy mismatch**.
- **Adaptive / AI** content is lighter than movement-leaders/nonprofits; that may be fine, but **Discovery Lab** is buried as row 04 without a **link**.

### Layout / UX (high severity)

- **Assessment “Start Here” cards** render “Start Here →” but are **not links** (`SurfaceCard` with no `href`). This is a **dead-end pattern**: it looks clickable, does nothing. Either link each card to a build, `/assess`, `/contact`, or remove the arrow affordance.
- **Core System Builds** rows are **not linked** to `/system-builds/*`. The page tells a story but does not **hand off** to the SKU pages where decisions happen.
- **Concrete outputs** uses **emoji icons** (💻, 👥) in a codebase that elsewhere standardizes on **lucide** / primitives — breaks visual system and accessibility consistency.
- **Image alt text** on at least one block reads like **abstract art** (“interlocking structures…”) while the asset is a **sanctuary photo** — hurts trust/accessibility.

### Metadata

- Title/description are fine directionally; align **keywords** with actual build names if church page is an SEO entry point.

---

## `/nonprofits` — [`nonprofits-page-content.tsx`](../../src/components/sections/nonprofits/nonprofits-page-content.tsx) + [`nonprofits-data.ts`](../../src/components/sections/nonprofits/nonprofits-data.ts)

### What works

- **Four linked system-build cards** early — correct **SKU-forward** pattern for this audience.
- **Midnight “not services — system builds”** line is memorable.
- **Before/after** grid is scannable.
- **BookReference** + closing midnight CTA are strong.

### Copy gaps

- Hero: **“We don’t offer programs or consulting”** is clarifying but can sound **defensive** without the next line of warmth (“we build with you…”). Consider mirroring **home hero** cadence: steward what you have, then systems language.
- **Card bullets** ([`systemBuildCards`](../../src/components/sections/nonprofits/nonprofits-data.ts)) skew **SaaS / automation** (“Pipeline automation”, “Custom AI agents”, “Distribution engine”) — may **over-promise** relative to formation language elsewhere and trigger skepticism in mission-driven buyers. Reconcile with actual deliverables or soften to **operational outcomes** (documentation, owners, playbooks).
- **“Organizational engine”** / **“install structure”** metaphors are slightly **industrial** vs **embodied ministry** tone on churches/home.

### Layout / UX

- **Hero has no primary CTA** in the first band (unlike movement-leaders, churches, system hub). Nonprofit executives often need **one obvious next step** above the fold: conversation, `/system-builds`, or `/assess`.
- Strong card grid is good; consider a **short “Recommended sequence”** strip (even 3 links) mirroring the hub so nonprofits don’t treat the four cards as a **menu of equals**.

### Metadata

- Description says **“Institutional systems”** and “leave them in place” — good; add **trust / credibility** if aligned with global messaging.

---

## `/system-builds` hub — [`system-builds-page-content.tsx`](../../src/components/sections/system-builds/system-builds-page-content.tsx) + [`hub-cards.ts`](../../src/lib/system-builds/hub-cards.ts)

### What works

- **Hero** states installs + artifacts clearly.
- **“Invisible ceiling”** + `AdaptiveLeadershipThroughline` gives a shared diagnosis.
- **Recommended sequence** list is the right **editorial device**.
- **Build modules** grid reuses `systemBuildHubCards` — single source of truth.

### Copy / layout gaps

- **Hero duplicates nonprofit headline shape** (“From fragmented effort to integrated systems”) — fine for hub, but **differentiate** hub vs `/nonprofits` with **one line** on who this is for (orgs + churches + leaders) vs nonprofit-only.
- **CTA row** mixes conversation, nonprofit overview, inquiry — good for cross-linking; consider **primary + secondary** only on mobile (same pattern as home hero cleanup).
- **Spacing:** `Section variant="section"` after hero has no `spacing` prop while others do — minor **vertical rhythm** inconsistency.

---

## Vertical system build pages (sample patterns)

### Discovery Lab — [`discovery-lab-page-content.tsx`](../../src/components/sections/system-builds-discovery-lab/discovery-lab-page-content.tsx)

- **Hero CTA triad** (conversation / hub / methodology) repeats the **decision fatigue** pattern the home page corrected. Recommend **primary + one secondary**; tuck methodology in footer or body link.
- Copy is **capability-forward** (good for institutional buyers); tie **one explicit sentence** to **credibility / disclosure / formation** to match global narrative.

### Foundation — [`foundation-page-content.tsx`](../../src/components/sections/system-builds-foundation/foundation-page-content.tsx)

- **Clear hero + governance vs ethics** split — strong.
- Good use of **throughline + typical paths + build format**.

### Content / Fundraising / Governance pages (from spot-checks + shared libs)

- Shared components (`BuildFormatSection`, `SystemsIntegrationSection`, `OutputsSection`) are **strong**; risk is **homogeneous rhythm** across builds (every page feels like the same template). Consider **one audience-specific paragraph** per build (church vs nonprofit vs movement leader) or a **single “Who this build is for”** callout.

### [`hub-cards.ts`](../../src/lib/system-builds/hub-cards.ts)

- Descriptions are **tight and accurate** — use them as the **canonical blurbs** on audience pages to avoid drift (church list vs hub cards vs nonprofit cards).

---

## Cross-cutting recommendations

| Issue | Recommendation |
| ----- | ---------------- |
| **Taxonomy drift** | One table: *Church label* → *Public route* → *Hub card title*; refactor `churches-data.ts` `systemBuilds` to match or explicitly say “analogous to our Content System Build → link”. |
| **Dead-end UI** | Any row that looks like a CTA must **navigate** or be styled as static text. |
| **Voice** | Run a pass for **SaaS verbs** (“pipeline automation”, “distribution engine”) vs **movemental verbs** (stewardship, formation, witness, legibility). |
| **Evidence** | Where numbers appear, pair with **methodology link** or footnote in-view. |
| **Icons** | Replace emoji in churches outputs with **lucide** + semantic tokens. |
| **Alt text** | Match **actual image content** for trust (DESIGN inspectability). |
| **CTA discipline** | Primary = conversation OR assess (pick per page); secondary = `/system-builds` or specific build. |

---

## Suggested implementation order (engineering)

1. **Churches:** link assessment cards + system build rows; fix alt text; swap emoji icons.  
2. **Nonprofits:** hero CTA + bullet copy alignment with `hub-cards` / actual scope.  
3. **Movement leaders:** hero + economics/reach section reorder or reframe.  
4. **System hub + Discovery Lab:** CTA count and mobile hierarchy.  
5. **Global:** short doc in `docs/build/` mapping **pathway language → routes** for content authors.

---

## Part 2: rest of the public site (audit extension, 2026-04-14)

Scope added: system-build verticals beyond Discovery Lab (`/content`, `/fundraising`, `/governance-ethics`, `/foundation`); home and all core marketing surfaces (`/about`, `/methodology`, `/evidence`, `/pricing`, `/faq`, `/contact`, `/how-it-works`, `/manifesto`, `/vision`, `/walkthrough`, `/platform`, `/knowledge-ecosystem`, `/movemental-at-100`); audience and entry routes (`/who-its-for`, `/who-is-a-movement-leader`, `/case-studies`, `/apply`, `/inquiry`, `/assess`, `/assess/formation`); `/book*` surfaces (light touch); `/services*` (legacy). Skipped per scope: `_archived/*`, legal pages, `/blog`, `/system`, `/book/read/[slug]`.

## Additional high-severity items (front-loaded)

These surfaced in Part 2 and should slot into the implementation plan ahead of most editorial work — they are broken routing or broken user affordances, not voice nits.

1. **Home closing CTA: label/destination mismatch.** `<Link href="/movement-leaders">Apply to Join</Link>` at [home-closing-cta.tsx:23](../../src/components/sections/home/home-closing-cta.tsx#L23). Users expect a form; they get another marketing page. Change `href` to `/apply`, or relabel the button to "For movement leaders." Verified.
2. **`/services` has five dead internal links to archived routes** ([services-page-content.tsx:110,114,158,162,166](../../src/components/sections/services/services-page-content.tsx#L110)) — `/services/organizational-systems`, `/services/system-builds`, `/services/system-builds/content`, `/services/system-builds/fundraising`, `/services/system-builds/foundation`. All five targets null-render. Either rewrite links to canonical `/system-builds/*` routes, or archive `/services` and redirect to `/system-builds` (preferred — the page duplicates content that now lives there).
3. **`/how-it-works` links to archived `/walkthrough`** — `/walkthrough/page.tsx` returns `null` via `createArchivedRouteMetadata`. Replace the link with an in-page anchor to `#hiw-walkthrough` or remove.
4. **Identical H1 on two distinct build pages.** Both [foundation-page-content.tsx:32](../../src/components/sections/system-builds-foundation/foundation-page-content.tsx#L32) and [governance-ethics-page-content.tsx:114-116](../../src/components/sections/system-builds-governance-ethics/governance-ethics-page-content.tsx#L114) render "Clarity where it matters most" as the hero `Display`. Differentiate one or both.
5. **`/pricing` build-card grid has no links** ([pricing-page-content.tsx:190-202](../../src/components/sections/pricing/pricing-page-content.tsx#L190)). Four SKU cards (Discovery Lab, Governance & Ethics, Fundraising Systems, Content System Build) are `SurfaceCard` tiles with no `href` — same dead-end pattern we just fixed on `/churches`.
6. **`/system-builds/foundation` hero has zero CTAs.** Every other build hero has at least one primary action; this one closes the hero with prose and moves on.
7. **`/case-studies` uses `TestimonialSlide` for placeholder copy** ([case-studies-page-content.tsx:95-108](../../src/components/sections/case-studies/case-studies-page-content.tsx#L95)). Pull-quote formatting + speaker attribution implies real testimonial from a real person; `role = "Preview — case study forthcoming"` does not undo the trust signal. Replace with `SurfaceCard` + explicit "Illustrative preview" label, or remove.
8. **`/book/moderate` missing metadata** — no `robots: noindex` on an internal moderation route.

---

## System build verticals

### `/system-builds/content` — [`system-builds-content-page-content.tsx`](../../src/components/sections/system-builds-content/system-builds-content-page-content.tsx)

#### What works
- Clean two-button hero (conversation + hub). No decision-fatigue triad.
- Metadata description is accurate and actionable.
- Closing section names sequencing explicitly ("often the right first install when knowledge is the bottleneck").
- Shared `OutputsSection`, `BuildFormatSection`, `SystemsIntegrationSection` keep structure consistent.

#### Copy gaps
- **[high] Hero eyebrow + H1 duplicate**: eyebrow "Content system build" and `Display` H1 "Content System Build" on consecutive lines ([:35-36](../../src/components/sections/system-builds-content/system-builds-content-page-content.tsx#L35)). Use eyebrow for audience context ("For nonprofits and churches") and H1 for the value claim.
- **No explicit audience above the fold** — every vertical page should carry a one-line "Who this build is for" callout. The "Best fit for organizations that…" list is too far down to do that work.
- **Opener locks to nonprofits** ("Most nonprofits already have years of accumulated knowledge", :67) while the page is also addressed to churches and movement leaders.
- **Funnel-marketing register**: "organizational funnel," "downstream systems," "top of the organizational funnel" (:91). Formation-first equivalent: "the system your content needs to do its work."

#### Layout / UX
- "Why this matters" bullets (:98-103) are orphaned in a plain `<ul>` without SurfaceCard or separator — read like afterthought below Outputs.
- Closing CTAs (:164-169) render as `ArrowLink` while hero uses `Button`. Inconsistent visual weight for primary action.

### `/system-builds/fundraising` — [`fundraising-page-content.tsx`](../../src/components/sections/system-builds-fundraising/fundraising-page-content.tsx)

#### What works
- Strong before/after grid; lucide throughout; cross-links to real routes; shared `OutputsSection` + `AfterTheBuildSection` correctly used.
- "Messy data is expected" callout defuses a real objection in context.

#### Copy gaps
- **[high] Three CTAs in hero** (:133-149): conversation + Content System Build + hub. Same Discovery Lab pattern. Demote Content System Build to the body — it's already cross-linked in the integration section.
- **"4 weeks to operational infrastructure"** is stated twice as a flat promise (:in methodology heading and :447 closing CTA). Add "typical" or "conversational" qualifier — matches the sprint-range honesty on `/services` and `/pricing`.
- **"AI-Assisted Analysis"** (:58): "Identifying patterns in giving history and network influence that humans might overlook" is a capability promise. Tone down to operational outcome (what the system produces, not what AI detects).
- **"High-velocity revenue operations"** (:202) — SaaS register. Rewrite toward "giving infrastructure your team can actually run and defend."

#### Layout / UX
- Cards at :174-186 use bare `<div>` with card utility classes instead of `SurfaceCard` primitive.

### `/system-builds/governance-ethics` — [`governance-ethics-page-content.tsx`](../../src/components/sections/system-builds-governance-ethics/governance-ethics-page-content.tsx)

#### What works
- Single primary CTA in hero. Correct discipline.
- Strong before/after grid. Deliverables match metadata promises.
- Closing CTA names Discovery Lab and Foundation as next steps — good wayfinding.

#### Copy gaps
- **[high] H1 identical to `/system-builds/foundation`** ("Clarity where it matters most" at :115). Differentiate — proposed: "Your organization runs on decisions. Install the structure for making them."
- **"Process" steps are generic consulting vocabulary** (:80-100): Discovery / Architecture / Documentation / Implementation. None references formation, mission, or the ethical/theological dimension the build claims to carry. Add one Movemental-specific clause per step.
- **"Radical honesty" requirement** (:372) + "We don't build systems for organizations that aren't ready to actually use them" reads defensive. Mirror `/contact`'s posture: we respond with clarity "including when the honest answer is not a fit."

#### Layout / UX
- **Raw `bg-primary` class** on the Ethics framework card (:158-199) instead of semantic token — violates DESIGN.md token rule.
- Custom deliverables list (border-l rows) instead of shared `OutputsSection` adds to "every page is a slightly different template" risk flagged in the original audit.

### `/system-builds/foundation` — [`foundation-page-content.tsx`](../../src/components/sections/system-builds-foundation/foundation-page-content.tsx)

#### What works
- Honest "Governance vs ethics" distinction — prose-led, not a card grid.
- `TypicalPathsSection` is the right wayfinding device here.
- `AfterTheBuildSection` phases ("Ambiguity becomes named," "Artifacts teams can run") are formation-forward.

#### Copy gaps / UX
- **[high] H1 identical to governance-ethics** (:32) — see above.
- **[high] Hero has zero CTAs** (:27-39). Every other build hero has at least one. Add at minimum `<ArrowLink href="/contact">Scope a foundation sprint</ArrowLink>`.
- **Unicode arrow in link label** (:59): "Open the governance & ethics vertical page →" — replace with `ArrowLink` primitive.
- **Foundation artifact names drift from governance-ethics page artifacts**: foundation lists decision maps / documentation core / ethics framework; governance-ethics lists governance manual / ethics charter / authority matrix / compliance protocol. Same build, different vocabulary. Unify.
- **Page reads as a peer vertical but functions as a pointer** — eyebrow "Foundation system" gives no signal. Either bulk it up (Before/After, ReadinessSection) or clearly frame as a layer-overview hub that points at governance-ethics.

---

## Home — `src/components/sections/home/*`

### What works
- Hero language is tightly aligned with refreshed voice — "wise stewardship," "trust and credibility you have already built," "local, embodied relationship at the center."
- Two-button hero + tertiary `ArrowLink` — correct CTA discipline.
- **`HomeCredibilityCrisis` cites sources inline** (Pew n=5,023, Ahrefs April 2025, Cooke et al. *CACM* 2025). This is the evidence bar every other page should match.
- `HomeConvergence` uses lucide icons; `HomeSystemReadinessRail` links to real `/assess`.

### Copy gaps
- **[high] Closing CTA label/destination mismatch** ([home-closing-cta.tsx:23](../../src/components/sections/home/home-closing-cta.tsx#L23)) — flagged above.
- **`HomeAlanHirsch` never names Alan in prose** ([home-alan-hirsch.tsx:18](../../src/components/sections/home/home-alan-hirsch.tsx#L18)) — opens with "He is a movement scholar…" before the name appears. Portrait `alt="Alan Hirsch"` serves screen readers, but sighted readers get "He" without a referent. Add name in the first sentence.
- **`HomeLeaderProfiles` raw claim numbers** ([home-data.ts:4-18](../../src/components/sections/home/home-data.ts#L4)): "20 books, 27 organizational affiliations, 150,000 APEST assessments," "2,000+ sermons, 30 million Purpose Driven books." These are career stats for three named leaders, not platform performance claims — but rendered as `CardDescription` without framing, they function as implicit social proof. Add section subtitle: "Whose work Movemental is built to steward" (or similar).

---

## `/about` — [`about-page-content.tsx`](../../src/components/sections/about/about-page-content.tsx)

### What works
- "Built from within the movement world, not imported into it" accurately names origin.
- Four-value grid (Formation / Humans / Scenius / Technology-as-servant) is the clearest statement of values on the site.
- Honest two-person team section; link to `/manifesto` for non-goals.

### Copy gaps
- **`✓` Unicode check mark as list bullet** (8 occurrences, e.g., :96-98, :175-178). Replace with `<Check aria-hidden />` from lucide.
- **"Not a manifesto. Not a growth machine."** (:131) undercuts what's above it — reads as if someone accused Movemental of being a manifesto. Remove or fold into the actual manifesto page.
- **Self-referential quality claim** (:176): "The platform itself has unusual technical depth and coherence." Replace with a link to `/evidence` or `/how-it-works`.

### Layout / UX
- Long linear scroll (220+ lines) with no in-page TOC. `/how-it-works` and `/vision` use `InPageToc` — consider here too.

### Metadata
- Title "About" — bare. Add brand suffix ("About Movemental").

---

## `/pricing` — [`pricing-page-content.tsx`](../../src/components/sections/pricing/pricing-page-content.tsx)

### Copy gaps
- **[high] "Revolutionary" everywhere**: metadata description and H1 both lead with "Revolutionary pricing" / "Revolutionary economics" ([page.tsx:8](../../src/app/(site)/pricing/page.tsx#L8), [:34-36](../../src/components/sections/pricing/pricing-page-content.tsx#L34)). Home, manifesto, and about all avoid that register. The actual argument — aligned incentives, no scaling penalty, ownership-first — is stronger. Rewrite to "Aligned economics: $1,000 + 10%, no scaling penalty."
- **`$1,000` stated in hero but absent from body + FAQ section 06**: the hero claims $1,000 as the defining number; movement-leader body section (:110) describes only 90/10; FAQ 06 says "no monthly SaaS fees" with no reference to the $1,000. Align all three surfaces.
- **`$12,000 to $40,000` range without methodology link** (:189) — matches `/services` range, but neither surface says what scoping moves the number. Add: "Scope is conversational — the first call names what fits your stage."

### Layout / UX
- **[high] Build-card grid has no links** (:190-202) — dead-end pattern, same as we fixed on churches. Add `asChild Link` per card.
- **`✓` Unicode bullets** (5 occurrences). Same fix as about page.

---

## `/faq` — [`faq-page-content.tsx`](../../src/components/sections/faq/faq-page-content.tsx)

### What works
- `InPageToc` for long-scroll FAQ; straight-answer voice; single primary CTA at close.

### Copy gaps
- **Section 03 names "email tool" as a replaced system** ([faq-data.ts:37](../../src/components/sections/faq/faq-data.ts#L37)) — email infra isn't mentioned as replaced anywhere else on the site. Either add to `/how-it-works` or remove from FAQ.
- **Section 06 pricing** omits both the $1,000 upfront and any sprint range — prospective client gets less clarity from FAQ than from `/pricing`. Add at minimum a sprint-range reference.

---

## `/contact` — [`contact-page-content.tsx`](../../src/components/sections/contact/contact-page-content.tsx)

### What works
- "We read what you send. We may respond slowly when depth matters more than speed" — best expression of anti-funnel posture on the site.
- `/apply` and `/inquiry` differentiation handled correctly.

### Copy gaps
- **"Incomplete is fine; evasive is not helpful"** reads as mild rebuke to a nervous first-time applicant. Drop the "evasive" clause; "thoughtfully" carries the intent.
- **No above-the-fold CTA** — form is at section 6 of 7. Add an anchor-jump button ("Go to form ↓") in the hero for return visitors.

---

## `/how-it-works` — [`how-it-works-page-content.tsx`](../../src/components/sections/how-it-works/how-it-works-page-content.tsx)

### What works
- `InPageToc` for a long page; video shell honest ("Coming soon — we are recording this now. No autoplay; captions ship with the final cut.").
- Build cards use `SurfaceCard asChild` + Link — wired correctly, unlike `/pricing`.

### Copy gaps
- **[high] Dead link to `/walkthrough`** (:641) — flagged above.
- **"Sibling repositories and experiments may exist for capability reference…"** (:196) is internal-audience copy. Remove from public-facing content or rewrite as a plain-language "what is and isn't included" promise.

---

## `/manifesto` — [`manifesto-page-content.tsx`](../../src/components/sections/manifesto/manifesto-page-content.tsx)

### What works
- Short, disciplined. Correct shape for an internal compass document.

### Copy gaps
- **Eyebrow "Company"** — about uses "About Movemental," this uses "Company." Inconsistent label for the same organizational layer.
- **"Not a single-vendor 'stack' commitment in marketing copy unless explicitly approved"** reads as internal policy. Rephrase externally: "We don't promise capabilities that aren't confirmed and approved."

---

## `/vision` — [`vision-page-content.tsx`](../../src/components/sections/vision/vision-page-content.tsx)

### What works
- Hero explicitly labels content as "projected state (scenario), not a promise about live counts today" and diagrams as "narrative instruments, not deployment checklists." Correct evidence discipline.

### Copy gaps
- **"100 onboarded movement leaders"** and **"~200 books across English and five major languages"** (:93) — the disclaimer lives in a separate paragraph, not adjacent to the numbers. Inline the qualifier at first use of each figure ("a projected scenario, not a live count"). Add "(illustrative)" to "five major languages."

---

## `/evidence`

### Metadata
- **"How we argue for Movemental"** in description signals argument rather than evidence — could undercut trust. Rewrite: "How Movemental establishes credibility: product depth, AI grounding, formation architecture with explicit scope." Low severity.

---

## `/who-its-for` — [`who-its-for-page-content.tsx`](../../src/components/sections/who-its-for/who-its-for-page-content.tsx)

### What works
- Three tiles are `SurfaceCard asChild interactive` with correct hrefs to `/movement-leaders`, `/churches`, `/nonprofits`. No dead ends.
- "Not sure which fits?" closes with `/how-it-works`, `/contact`, `/inquiry` — correct routing.

### Copy gaps
- **"The same architecture shows up differently depending on stewardship"** — abstract. Try: "The same architecture serves different stewardship responsibilities — pick the path that names yours."
- No hero backdrop; audience pages it points to all have one. Visual mismatch.

---

## `/case-studies` — [`case-studies-page-content.tsx`](../../src/components/sections/case-studies/case-studies-page-content.tsx)

### Copy / UX gaps
- **[high] `TestimonialSlide` misused for placeholders** (:95-108) — flagged above.
- **`LogoStrip` lists audience labels as logo items** (:51): "Movement leaders," "Churches & ministries," "Nonprofits," "Networks" are audience categories, not org logos. `LogoStrip` carries a partner/client trust signal it can't deliver here. Replace with tag/eyebrow pattern or remove.
- **Rail content duplicates card grid content** — same three summaries, twice. Pick one surface.

---

## `/apply` — [`apply-page-content.tsx`](../../src/components/sections/apply/apply-page-content.tsx)

### What works
- "Not a sales form" framing and three-step process match `/contact` posture.

### Copy gaps
- **"Submit once, thoughtfully — Incomplete is fine; evasive is not helpful"** — same rebuke pattern as contact. Drop the "evasive" clause.

---

## `/assess` + `/assess/formation`

### What works
- `/assess` page correctly links to `/assess/formation` as the legacy option.
- Metadata for formation explicitly labels it "a shorter legacy questionnaire … preserved while the system readiness diagnostic is primary." Honest deprecation.

### Copy gaps
- **`/assess` hero is bare** — eyebrow + H1 + one prose sentence. For a conversion entry point (linked from home, Discovery Lab, churches startHereCards), add a reassurance line: "This takes about 10 minutes and produces a sequenced recommendation."

---

## `/book*` (light touch)

- **`/book/moderate` missing metadata** — add `{ robots: { index: false, follow: false } }` (high-severity SEO hygiene; internal moderation route should not be indexed).
- `/book`, `/book/contributors`, `/book/endorse` — no issues flagged at this level.

---

## Stale / duplicate surfaces

### `/services` — **archive-and-redirect candidate**

Live route, full content, but duplicates `/system-builds` and carries **five dead internal links** to archived routes (see high-severity item #2). Hero eyebrow says "Digital curator & strategy" — old product descriptor, absent from the refreshed voice elsewhere.

**Recommendation:** redirect `/services` → `/system-builds` (proxy.ts), then archive the page. The investment range + two-track model are covered by `/pricing` + `/who-its-for` + `/system-builds`.

### `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds`
Correctly null-rendered with `robots: noindex`. The only active dead-link generator is `/services` above — fix that and these become truly orphaned.

### `/platform`, `/knowledge-ecosystem`, `/walkthrough`, `/movemental-at-100`, `/who-is-a-movement-leader`
All correctly archived with `robots: noindex`. Only `/walkthrough` has a live inbound link (from `/how-it-works`, flagged above).

---

## Cross-cutting additions (patterns beyond the original table)

| Pattern | Where | Recommendation |
|---|---|---|
| Identical hero H1 across distinct pages | `/system-builds/governance-ethics` + `/system-builds/foundation` — both "Clarity where it matters most" | Differentiate each; base on metadata description |
| `✓` Unicode check mark as list bullet | `about` (8x), `pricing` (5x), `foundation` (3x) | Swap to `<Check aria-hidden />` or the `—` dash pattern used on build pages |
| Heroless page — zero CTAs above fold | `/system-builds/foundation`, `/contact` | Add at minimum one `ArrowLink` or anchor-jump |
| Live pages linking to archived routes | `/how-it-works` → `/walkthrough`; `/services` → 5 archived subroutes | Fix or suppress each |
| CTA label/destination mismatch | Home closing: "Apply to Join" → `/movement-leaders` | Change href to `/apply` or relabel |
| Pricing/SKU tiles not linked | `/pricing` org-build grid (4 cards) | Add `asChild Link` per card |
| Trust components used for placeholder copy | `/case-studies` — `TestimonialSlide` for "coming soon"; `LogoStrip` for audience labels | Replace with `SurfaceCard` + explicit "Illustrative preview" / tag pattern |
| Self-referential quality claims | `about:176` ("unusual technical depth and coherence") | Replace with link to `/evidence` / `/how-it-works` |
| `$1,000` inconsistently stated | pricing hero vs pricing body vs FAQ 06 | Align all three |
| Unnamed "He" in bio section | `home-alan-hirsch.tsx:18` | Name Alan in the first sentence |
| Internal-audience copy in public pages | `how-it-works:196` ("sibling repositories"); manifesto non-goal about marketing approval | Rewrite as external-facing promises |
| Identical boilerplate copy twice | `/case-studies` rail duplicates card grid; fundraising "4 weeks" claimed twice; `/system-builds` hero duplicates `/nonprofits` headline shape | Pick one surface per claim |
| Missing `noindex` on internal routes | `/book/moderate` | Add `{ robots: { index: false, follow: false } }` |

---

## Suggested implementation order (part 2)

Ahead of the original priorities when touching files:

1. **Dead links + CTA mismatches** (1 sitting): home "Apply to Join" href; `/how-it-works` → walkthrough; archive `/services` with redirect (kills 5 dead links).
2. **Dead-end cards on `/pricing`**: link the four build-cards to `/system-builds/*`.
3. **Differentiate duplicate H1s** on foundation + governance-ethics; add a hero CTA to foundation.
4. **Trust component misuse on `/case-studies`**: remove `TestimonialSlide` placeholder rail; replace `LogoStrip` with tag pattern.
5. **`/pricing` voice refresh**: strip "Revolutionary"; align $1,000 across hero/body/FAQ.
6. **`✓` bullet purge** across about, pricing, foundation.
7. **Vertical build page polish**: duplicate eyebrow/H1 on content, 3-CTA hero on fundraising, bg-primary token on governance-ethics, tie home `HomeLeaderProfiles` stats to framing subtitle.
8. **SEO hygiene**: `noindex` on `/book/moderate`.

---

## Out of scope (this audit)

- Stitch re-screens, new photography, pricing tables, `/inquiry` funnel, assess flow logic.
