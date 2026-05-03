# FAQ page — comprehensive build prompt

**Created:** 2026-04-30
**Status:** Open. Replaces the in-place 4-section FAQ shipped earlier in [`src/components/sections-mock/faq/faq-content.tsx`](../../../src/components/sections-mock/faq/faq-content.tsx).
**Target route:** `/faq` — [`src/app/(site)/faq/page.tsx`](../../../src/app/(site)/faq/page.tsx) renders [`FaqContent`](../../../src/components/sections-mock/faq/faq-content.tsx).
**Owner of the design:** [`docs/design/DESIGN.md`](../../design/DESIGN.md) — "The Digital Curator."
**Owner of the framework:** [`/path`](../../../src/app/(site)/path/page.tsx) — *The Movemental AI Path: Safety → Sandbox → Skills → Solutions.*

---

## 0 · Read first (in order)

Do **not** invent claims. Every answer below must be derivable from one of:

1. [`CLAUDE.md`](../../../CLAUDE.md) — repo conventions, design rules, Stitch pin.
2. [`docs/design/DESIGN.md`](../../design/DESIGN.md) — semantic tokens, primitives, no decorative borders, Inter only, breathing layout, never pure black, midnight bands for regional dark, no pasted-on shadows.
3. **Page sources of truth** (each page is its own SSOT for what gets said publicly):
   - [`src/components/sections-mock/home/home-content.tsx`](../../../src/components/sections-mock/home/home-content.tsx) — "AI is already inside your organization. The question is whether you're leading it — or reacting to it."
   - [`src/components/sections-mock/path/path-content.tsx`](../../../src/components/sections-mock/path/path-content.tsx) — Safety / Sandbox / Skills / Solutions deep dives.
   - [`src/components/sections-mock/start-with-safety/start-with-safety-content.tsx`](../../../src/components/sections-mock/start-with-safety/start-with-safety-content.tsx) — five safety areas, diagnostic, six outputs.
   - [`src/components/sections-mock/work-with-us/work-with-us-content.tsx`](../../../src/components/sections-mock/work-with-us/work-with-us-content.tsx) — engagement model, Safety Session / Guided Pathway / Solutions Partnership, six outcomes, four boundaries.
   - [`src/components/sections-mock/evidence/evidence-content.tsx`](../../../src/components/sections-mock/evidence/evidence-content.tsx) — proof framing (problem real / system coherent / practice / people / building in public).
   - [`src/components/sections-mock/voices/voices-content.tsx`](../../../src/components/sections-mock/voices/voices-content.tsx) — leaders joining the conversation; not endorsements; not a logo wall.
   - [`src/components/sections-mock/about/about-content.tsx`](../../../src/components/sections-mock/about/about-content.tsx) — origin, core belief, why we exist, leadership qualities, posture.
   - [`src/components/sections-mock/team/team-content.tsx`](../../../src/components/sections-mock/team/team-content.tsx) — Brad Brisco (CEO & Co-founder), Alan Hirsch (Chief Missiologist & Co-founder), Joshua Shepherd (CTO & Founder).
   - [`src/components/sections-mock/churches/churches-content.tsx`](../../../src/components/sections-mock/churches/churches-content.tsx), [`nonprofits-content.tsx`](../../../src/components/sections-mock/nonprofits/nonprofits-content.tsx), [`institutions-content.tsx`](../../../src/components/sections-mock/institutions/institutions-content.tsx) — audience translations.
4. **Engagement design SSOT (internal — pricing, scope, decline criteria):** [`docs/movemental-offering/04-engagement-design.md`](../../movemental-offering/04-engagement-design.md) and [`03-sandbox-playbook.md`](../../movemental-offering/03-sandbox-playbook.md).
5. **Voices vs. Evidence — distinct surfaces:** Voices = credible leaders joining the conversation. Evidence = proof of the framework, problem, and practice. The FAQ must respect this distinction.
6. **Doctrine:** [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md) — movement leaders are an ecosystem layer, not a fourth audience peer.

If you cannot ground an answer in one of these, **leave the question out**. The FAQ does not invent positioning. It compresses what exists.

---

## 1 · Goal

Replace the current minimal FAQ (4 groups × 9 Q/A) with a thorough, comprehensive, editorially calm FAQ that:

- Answers the **real questions** a CEO / ED / senior pastor / dean would ask before booking a first call.
- Mirrors the canonical vocabulary already shipped on the site (Path, Sequence, Safety, Sandbox, Skills, Solutions, Voices, Evidence).
- Reduces friction without becoming a sales page.
- Is honest, direct, non-defensive — matches the editorial voice of `/about` and `/evidence`.
- Defers logistics that belong on other pages (full pricing tiers → only stated as ranges with a deferral; engagement detail → link to `/work-with-us`; the Path → link to `/path`).

The FAQ is a **trust surface**. Its job is to remove uncertainty without overpromising.

---

## 2 · Page architecture

### Files to edit

| Concern | File | Action |
|---|---|---|
| Route metadata | [`src/app/(site)/faq/page.tsx`](../../../src/app/(site)/faq/page.tsx) | Update `title` to `"FAQ"`, `description` to a one-line distillation of the page purpose. |
| Page composition | [`src/components/sections-mock/faq/faq-content.tsx`](../../../src/components/sections-mock/faq/faq-content.tsx) | Replace contents with the structure in §3–§6 below. |
| Nav active state | [`src/components/nav/nav-config.ts`](../../../src/components/nav/nav-config.ts) | No change needed — `/faq` is reachable via the footer; FAQ is intentionally **not** in the primary nav. |

### Section composition (top-to-bottom, fixed order)

1. **Hero** — `band-midnight hero hero--fold` — eyebrow, h1, lede, two CTAs.
2. **In-page TOC** — `band-default` — quick links to each FAQ group (anchor jumps).
3. **FAQ groups** — alternating `band-section` / `band-default` (start with `band-section` after the TOC). One `<section>` per group, each with `<SectionHead>` + a shadcn `Accordion` of Q/A items.
4. **Final CTA** — `band-midnight final-cta` — heading, lede, two CTAs (Talk With Us → `/contact`, Start with Safety → `/start-with-safety`).

The alternating-band rhythm is non-negotiable; it preserves the tonal-stacking rule from `DESIGN.md`. **Do not** introduce hairline borders between groups for separation — depth comes from band swap, not lines.

### Component primitives (use these — do not roll new versions)

- [`<Band>`](../../../src/components/sections-mock/primitives.tsx) — semantic wrapper for the recipe class (or use raw `<section className="band-…">` to match the rest of `sections-mock/`).
- [`<SectionHead>`](../../../src/components/sections-mock/primitives.tsx) — eyebrow + display heading + optional lede.
- [`<BtnPill>`](../../../src/components/sections-mock/primitives.tsx) — pill CTAs in hero and final CTA.
- [`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`](../../../src/components/ui/accordion.tsx) — shadcn / Radix; this is what the simplified FAQ already uses.
- Recipe classes: `band-midnight`, `band-default`, `band-section`, `hero hero--fold`, `final-cta`, `final-cta__inner`, `final-cta__actions`, `hero-actions`, `display`, `lede lede--regular`, `eyebrow`, `prose`, `container`. All defined in [`src/app/recipes.css`](../../../src/app/recipes.css). Use these — do not write new CSS.

### Per-group + per-item anchors

- Section element: `id="faq-<groupId>"` (e.g. `faq-getting-started`).
- AccordionItem: `value="<group-id>--<question-slug>"` and pass `id="faq-<group-id>--<question-slug>"` to the item.
- This lets us deep-link to a specific question (e.g. `/faq#faq-engagement--how-long`) and is critical for support links and GEO/LLM scraping.
- Use a small `slugify(label)` util or hand-write stable slugs into the typed data.

### Accessibility

- Single `<h1>` in the hero.
- `<h2>` for each group's `SectionHead.display` — wired via `aria-labelledby` on the `<section>`.
- Question label inside `AccordionTrigger` is the implicit heading; do not nest `<h3>` inside the trigger (the Radix primitive already wraps it in `<h3>` via `<NavigationMenuPrimitive.Header>` — verify in the rendered DOM and adjust if not). If needed, use `<h3>` for the question text inside `AccordionTrigger`.
- Every cross-link in an answer must be a real, working route in this repo. Use `next/link` `<Link>` for internal navigation.
- The Accordion is keyboard-accessible by default (Radix). Verify Tab → Space/Enter → Tab → Tab actually moves through items; the simplified FAQ shipped earlier already passes this.

### Typed data

Author one typed module per group (or a single `faq-data.ts`). Suggested shape:

```ts
type FaqAnswerNode = string | { kind: "link"; href: string; label: string; trailing?: string };

type FaqItem = {
  slug: string;          // stable, kebab-case, unique within the group
  q: string;             // the question
  a: ReactNode;          // ReactNode so we can embed <Link> + <em>
  related?: ReadonlyArray<{ href: string; label: string }>; // optional cross-links
};

type FaqGroup = {
  id: string;            // stable kebab-case id, used in the section id and anchors
  num: string;           // "01"–"10" for the band eyebrow
  band: "default" | "section";
  eyebrow: string;
  display: ReactNode;    // SectionHead display (allows <em>)
  lede?: string;
  items: ReadonlyArray<FaqItem>;
};
```

The page composes `FaqGroup[]` into the alternating-band layout. This mirrors the `MattersFold`/`OutcomesFold` data style elsewhere in `sections-mock/`.

---

## 3 · Canonical vocabulary (do not fork)

The FAQ must use these exact terms. They are already shipped on the site — using anything else creates a trust gap.

| Term | What it means | Where it lives |
|---|---|---|
| **The Movemental AI Path** | The four-stage system | `/path` |
| **Safety / Sandbox / Skills / Solutions** | The four stages, in order | `/path`, `/start-with-safety`, home |
| **The Sequence** | Synonym for the Path; used in editorial prose | `/path`, `/about` |
| **Safety Session** | The first-step engagement | `/work-with-us`, `/start-with-safety` |
| **Guided Pathway** | The mid-tier engagement (Safety + Sandbox + Skills) | `/work-with-us` |
| **Solutions Partnership** | The deeper, build-stage engagement | `/work-with-us` |
| **Sandbox Season** | The 12-week facilitated season — internal SSOT only; do not publish detailed internal terms on the FAQ unless they already appear on a public page | `docs/movemental-offering/03-sandbox-playbook.md` |
| **Voices** | Credible leaders joining the conversation | `/voices` |
| **Evidence** | Proof of the framework, problem, and practice | `/evidence` |
| **Talk With Us** | The contact CTA label used across the site | `/contact` |
| **Start with Safety** | The first-step CTA label | `/start-with-safety` |

Do **not** use: "Trusted voices," "logo wall," "case studies," "AI consultancy," "enterprise platform," "Sandbox Season" pricing tables (they belong on a future `/pricing` page if and when it ships — do not leak the internal $18K–$55K table into the FAQ verbatim; you may reference *ranges* per §6).

---

## 4 · The full FAQ — groups, questions, answers

The numbering, group labels, and question/answer copy below are the build target. Edit only for typos, formatting, and to fold in any minor updates the linked source files have absorbed since this prompt was written. Keep answers tight (1–4 sentences). Do not turn answers into mini-essays — the long-form lives on the linked pages.

### Group 01 — Getting Started

- **id:** `getting-started`
- **band:** `section`
- **eyebrow:** `Getting started`
- **display:** `Getting started.`
- **lede:** `What to do before you book a call — and what the first conversation actually looks like.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `what-should-we-do-first` | What should we do first? | Start with Safety. Most organizations need shared clarity — what AI is already in use, where the boundaries are, who is responsible — before any new tool, training, or system can hold. *Link: `/start-with-safety`.* |
| 2 | `do-we-need-technical-expertise` | Do we need technical expertise to begin? | No. Movemental is a leadership process first. Your senior team needs to be willing to be in the room while AI changes how the mission gets done. The technical work comes later, on a foundation we help you build. |
| 3 | `is-this-a-tool-or-a-process` | Is this a tool, a course, or a consulting engagement? | It is a guided pathway. Engagements include facilitated work, written artifacts, and — when appropriate — solutions built on a human foundation. It is not software you buy. *Link: `/work-with-us`.* |
| 4 | `what-does-the-first-call-look-like` | What does the first call look like? | A focused thirty-minute conversation with our team. We ask about your context, current AI usage, what is in motion, and what the senior team is prepared to commit. By the end of the call, we will tell you whether the timing is right and what the first move would be. *Link: `/contact`.* |
| 5 | `how-do-we-know-if-we-are-ready` | How do we know if we are ready? | If staff are already using AI without a written boundary, you are ready. If senior leaders cannot answer "what is allowed and what is off-limits," you are ready. The Safety Session exists for exactly this moment. |
| 6 | `do-we-need-to-have-an-ai-strategy-already` | Do we need to have an AI strategy already? | No. Most organizations we work with have *fragmentation*, not strategy — staff using tools privately, no shared standards, leadership reacting case by case. Naming that on the record is the first move of Safety, not a failure that needs hiding. |

### Group 02 — The Movemental AI Path

- **id:** `the-path`
- **band:** `default`
- **eyebrow:** `The Path`
- **display:** `The four stages, in order.`
- **lede:** `Safety, Sandbox, Skills, Solutions. Each stage builds on the one before it.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `what-is-the-path` | What is the Movemental AI Path? | A four-stage sequence for adopting AI without losing trust, formation, or mission: **Safety** (boundaries first), **Sandbox** (guided exploration next), **Skills** (capability before systems), **Solutions** (tools built on a human foundation). *Link: `/path`.* |
| 2 | `why-this-order` | Why this order? Why not all four in parallel? | The order is the work. Skipping Safety means deploying before you know what you are willing to defend. Skipping Sandbox means training judgment in production, on real people. Skipping Skills means importing someone else's. Solutions deployed without the prior three stages are technical answers to questions the organization has not yet asked itself. *Link: `/path#order`.* |
| 3 | `can-we-skip-stages` | Can we skip stages if we have already done some of this? | In practice, every engagement starts where you are. If a Solution has already been deployed, we walk Safety in writing, run the Sandbox the deployment skipped, and form the Skills the deployment assumed. The Solution stays. What changes is whether the organization can defend it. |
| 4 | `do-the-stages-overlap` | Do the stages overlap? | Yes — early Sandbox can run while Safety is still being ratified. But the order in which work is *finished* matters: nothing leaves the Sandbox into production before Safety is named, and no Solutions ship before Skills are formed. The order of completion is load-bearing. |
| 5 | `what-does-safety-actually-cover` | What does Safety actually cover? | Five areas: acceptable use, data boundaries, human oversight, voice and trust, and ethical/theological guardrails. The artifact is a written set of guidelines, a data-boundary map, and shared leadership alignment. *Link: `/start-with-safety#foundation`.* |
| 6 | `what-does-sandbox-mean-in-practice` | What does Sandbox mean in practice? | Guided experimentation inside trusted limits. Real use cases, controlled scope, leadership-guided. The point is to develop judgment in cases that resemble the organization's real work — without that work being put at risk. *Link: `/path#stage-sandbox`.* |
| 7 | `what-do-skills-and-solutions-include` | What do Skills and Solutions include? | **Skills**: shared language, role-specific training, judgment formation across the team. **Solutions**: workflow integration, custom assistants, organization-specific tools — built only after Safety, Sandbox, and Skills are in place. *Link: `/path`.* |

### Group 03 — Approach & Philosophy

- **id:** `approach`
- **band:** `section`
- **eyebrow:** `Approach`
- **display:** `Approach and <em>philosophy.</em>`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `is-movemental-pro-or-anti-ai` | Is Movemental pro-AI or anti-AI? | Neither, on purpose. We are pro **responsible adoption**. Organizations stuck on the for/against frame are usually stuck on Stage 1 — which is fine, that is where Safety lives — but the rest of the Sequence assumes you have already moved past the all-or-nothing posture. |
| 2 | `why-not-just-start-using-tools` | Why not just start using tools? | Because unstructured adoption creates risk and fragmentation. Tools spread before standards exist, staff form habits in private, and the senior team learns by surprise. Order is what protects mission. |
| 3 | `is-this-primarily-a-technology-problem` | Is this primarily a technology problem? | No. AI changes how people think, how work is done, and how trust is formed. That makes it a leadership and formation challenge first, and a technology challenge second. *Link: `/about#core-belief`.* |
| 4 | `is-this-theological` | Is this theological? | For churches, it includes theological reflection on formation, witness, and pastoral responsibility. For nonprofits and institutions, it is ethical and organizational — values, mission, governance, and care for the people the organization serves. *Link: `/churches`, `/nonprofits`, `/institutions`.* |
| 5 | `are-you-partisan` | Are you partisan — politically or ecclesially? | No. The Sequence holds across the sector. The Voices page is curated to span streams and traditions; if you read it and see only one tribe, that is a curatorial mistake we want to hear about. |
| 6 | `what-if-the-technology-changes` | What happens when the technology changes? | It will. The Sequence is designed to be more durable than any single model or vendor — the artifacts (a posture, written boundaries, a Sandbox process, a formation curriculum) survive model upgrades. When the technology shifts, you re-walk the relevant stages with the new facts. You do not start over. |

### Group 04 — Who Movemental Serves

- **id:** `who-its-for`
- **band:** `default`
- **eyebrow:** `Who it's for`
- **display:** `Who Movemental serves.`
- **lede:** `Three implementation audiences. One Sequence. Different translations.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `who-is-this-actually-for` | Who is this actually for? | Churches, nonprofits, and institutions — organizations where AI decisions affect people, culture, formation, mission, and trust. *Links: `/churches`, `/nonprofits`, `/institutions`.* |
| 2 | `is-this-only-for-christian-organizations` | Is this only for Christian organizations? | No. Of the three implementation audiences, only churches are Christian by default. The Sequence does not depend on a particular theology. It depends on having a mission worth protecting and a senior team willing to be in the room while AI changes how the mission gets done. |
| 3 | `do-you-work-with-small-organizations` | Do you work with small organizations? | Yes. Engagements scope to context. A small organization typically begins with a Safety Session and decides from there whether to continue. We will tell you in the first call if the work is too big for your current capacity — and recommend a smaller move if so. |
| 4 | `what-about-denominations-and-judicatories` | What about denominations and judicatories? | We have worked alongside leaders inside several streams; we do not represent any. If your denomination wants to translate the Sequence into its own polity, we are happy to be a resource and an editorial partner — not a vendor. |
| 5 | `is-this-for-individual-leaders` | Is this for individual leaders or only organizations? | Movemental is built for organizations. Individual leaders can read along — `/path`, `/start-with-safety`, and `/voices` are open — but engagements are built around senior teams that carry organizational responsibility. |
| 6 | `where-do-movement-leaders-fit` | Where do movement leaders fit? | Movement leaders are an ecosystem layer, not a fourth audience peer. They are the trusted-voice surface (`/voices`) — credible practitioners helping shape the conversation — not a parallel funnel. Organizations are the implementation audience; movement leaders are the people who sharpen the work in public. |

### Group 05 — Engagement Options

- **id:** `engagement`
- **band:** `section`
- **eyebrow:** `Engagement`
- **display:** `Ways to engage.`
- **lede:** `One Sequence, three shapes — sized to where your organization actually is.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `what-are-the-engagement-options` | What are the engagement options? | Three shapes: a **Safety Session** for leaders who need a clear first step; a **Guided Pathway** for organizations ready to move through Safety, Sandbox, and Skills; and a **Solutions Partnership** for organizations ready to build on a human foundation. *Link: `/work-with-us#options`.* |
| 2 | `what-is-the-engagement-model` | What is the engagement model? | Listen → Clarify → Equip → Build. We start by understanding context, risks, and current AI use. We establish shared language, safety boundaries, and leadership alignment. We train your people. We build tools — last, on a human foundation. *Link: `/work-with-us#model`.* |
| 3 | `who-attends-from-our-side` | Who needs to attend from our side? | At minimum a **Senior Sponsor** (CEO/ED), a **Portfolio Owner** (the leader who carries the work after handoff), and a **Safety Owner** (governance/ethics). For Sandbox and Skills work, add 3–4 staff from 2–3 departments. We will tell you in the first call if the roster you can field is enough for the engagement to hold. |
| 4 | `is-this-virtual-or-in-person` | Is this virtual or in-person? | Most facilitated work is virtual on a regular cadence, with selective on-site sessions when the organization's context calls for it. The artifacts and discipline are the same either way. |
| 5 | `how-quickly-can-we-start` | How quickly can we start? | A first conversation is usually within two weeks. A Safety Session can typically begin within four to six weeks of that call. Larger engagements take longer to scope and schedule, especially around board cycles. |
| 6 | `can-we-pause-or-step-out` | Can we pause or step out mid-engagement? | Yes. Engagements are scoped in stages, not a single contract. If a board change, leadership transition, or unexpected event makes it the right call to pause, we will say so before you do. |

### Group 06 — Cost, Time & Logistics

- **id:** `cost-time`
- **band:** `default`
- **eyebrow:** `Cost & time`
- **display:** `Cost, time, and the boring questions.`
- **lede:** `Direct answers. No public price list yet.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `what-does-this-cost` | What does this cost? | Engagements are scoped per organization. A Safety Session is the smallest entry point. A Guided Pathway is mid-tier. A Solutions Partnership runs higher. We do not publish a price list because the price tracks the scope, the team's hours, and the depth of the human work involved. |
| 2 | `can-you-give-a-budget-range` | Can you give a budget range? | In the first call, yes. We will give you a good-faith range you can take to your board — and we will tell you directly if your timing or budget is not yet right for the work. |
| 3 | `do-you-offer-reduced-rates` | Do you offer reduced rates for smaller organizations? | Sometimes, on a case-by-case basis, when the reduced rate is honest about the smaller scope. We do not run a tiered discount program. |
| 4 | `how-long-does-an-engagement-take` | How long does an engagement take? | A Safety Session is short and focused. A facilitated Sandbox stage typically runs eight to twelve weeks. A full Sequence engagement runs four to nine months depending on board cadence, staff size, and how much human work was already in motion before we arrived. We will tell you, before you commit, if the timeline is too short for the work to hold. |
| 5 | `will-this-slow-our-team-down` | Will this slow our team down? | No. It prevents rework and confusion. Organizations that begin with clarity move faster six months in than those that started with tools. Order is what unlocks capacity without losing trust. |
| 6 | `what-time-commitment-do-our-leaders-need` | What time commitment do our leaders need? | The **Senior Sponsor** attends the bookend sessions and a midpoint review — small but non-delegable. The **Portfolio Owner** and **Safety Owner** attend every session. The **Experiment Team** carries 2–4 hours of session time per week, plus the work itself. We protect the boundary so it does not bleed into other roles. |
| 7 | `who-pays-for-tools-and-vendors` | Who pays for tools and vendors? | You do, directly. Movemental does not resell, broker, or take referral fees from any AI vendor. If a Solution requires a specific tool, you procure it on your own terms. |

### Group 07 — Tools, Data & Safety

- **id:** `tools-data-safety`
- **band:** `section`
- **eyebrow:** `Tools, data, safety`
- **display:** `Tools, data, and the safety boundary.`
- **lede:** `Where the technology questions actually land.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `do-you-recommend-specific-tools` | Do you recommend specific tools? | Only after Safety and Skills are established. The Solutions stage may recommend specific tools — usually two or three options at the relevant tier — but only after the prior three stages have produced enough clarity that the recommendation can be defended in the room. |
| 2 | `do-you-have-a-vendor-relationship` | Do you have a vendor relationship with ChatGPT, Claude, Copilot, or Gemini? | No. We do not endorse, sell, resell, or take referral fees from any AI vendor. If a Solution needs a specific tool, we will name the tradeoffs honestly. |
| 3 | `what-data-should-never-enter-an-ai-tool` | What data should never enter an AI tool? | That is exactly what the Safety stage answers — concretely, in your context. Common defaults: confidential donor records, pastoral or counseling notes, student records, regulated financial workflows, anything covered by a confidentiality obligation. By the end of Safety, your organization has a written boundary the whole team can recognize. *Link: `/start-with-safety#foundation`.* |
| 4 | `what-about-the-real-harms` | What about the real harms — labor, environment, copyright, hallucination, bias? | Real, named, and load-bearing. The Safety stage turns these into specific organizational refusals — not abstract concerns. By the end of Safety, organizations typically have a written list of things they will not use AI for and a written list of things they will, with the harms they care about most named explicitly in both. |
| 5 | `do-you-build-custom-assistants` | Do you build custom assistants? | Yes — in the Solutions stage, on a human foundation. Custom assistants are scoped to your voice, constraints, and mission. We do not build them as a first move. *Link: `/path#stage-solutions`.* |
| 6 | `who-owns-what-we-produce-together` | Who owns what we produce together? | You do. The artifacts of an engagement — guidelines, governance documents, training materials, custom assistants — are owned by your organization. Movemental holds no equity in your IP. |
| 7 | `what-about-data-privacy-and-security` | What about data privacy and security? | We follow a principle of minimum necessary access and never paste your data into AI tools without an explicit Safety boundary covering it. NDAs and DPAs are routine. Specific compliance regimes (HIPAA, FERPA, etc.) are scoped on a per-engagement basis. |

### Group 08 — Voices, Evidence & Credibility

- **id:** `voices-evidence`
- **band:** `default`
- **eyebrow:** `Voices and evidence`
- **display:** `Voices, evidence, and credibility.`
- **lede:** `How to read the proof on this site — and what we will not put on it.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `what-is-the-difference-between-voices-and-evidence` | What is the difference between Voices and Evidence? | **Voices** is leaders joining the conversation — credible movement leaders, pastors, and practitioners helping shape the moment. **Evidence** is proof of the framework, the problem it answers, and the practice. Distinct surfaces, distinct jobs. *Links: `/voices`, `/evidence`.* |
| 2 | `where-are-your-case-studies` | Where are your case studies? | We do not currently publish named case studies. Most partners do not want their AI posture work narrated publicly while it is still in formation. We can share specific, anonymized stories on a call when the question is concrete. *Link: `/evidence#practice`.* |
| 3 | `why-no-logo-wall` | Why no logo wall? | Logos do nothing for the kind of trust this work depends on. The relevant question is not "who else uses this" but "do the people in your seat trust the people in our seat to read this honestly." That is answered by named voices and written work — not by a logo wall. |
| 4 | `who-are-the-voices` | Who counts as a "voice"? | Leaders helping shape the conversation — not customers, sponsors, or product endorsers. The current circle is small and growing, and the curation is editorial, not promotional. *Link: `/voices`.* |
| 5 | `can-we-talk-to-a-current-partner` | Can we talk to a current partner? | On request, in the second or third call, and only after we have read whether the question is concrete enough to be useful for them. We do not ask partners to take cold reference calls. |

### Group 09 — Boundaries — What We Don't Do

- **id:** `boundaries`
- **band:** `section`
- **eyebrow:** `Boundaries`
- **display:** `What we do <em>not</em> do.`
- **lede:** `The work has a shape. Saying so on the record protects both sides.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `do-you-start-with-software` | Do you start with software? | No. Tools come after Safety, Sandbox, and Skills. *Link: `/work-with-us#boundaries`.* |
| 2 | `do-you-replace-human-judgment` | Do you replace human judgment with AI? | No. AI can support leadership; it cannot carry responsibility. |
| 3 | `do-you-treat-efficiency-as-the-goal` | Do you treat efficiency as the highest goal? | No. Efficiency matters, but it must serve formation, trust, and mission. The goal of an engagement is organizational clarity, not AI activity. |
| 4 | `do-you-take-vendor-money` | Do you take referral fees, sponsorships, or affiliate revenue from AI vendors? | No. Engagements are paid by the organizations we serve. If we recommend a tool inside an engagement, we do not get paid for the recommendation. |
| 5 | `will-you-walk-away-from-an-engagement` | Will you walk away from an engagement that is not a fit? | Yes — and we will tell you why. If the timing, posture, or capacity is not right for the work to hold, we will recommend a smaller move, a different timing, or a different organization. We try to leave no one worse off than they came in. |

### Group 10 — After the Engagement

- **id:** `after`
- **band:** `default`
- **eyebrow:** `After`
- **display:** `What happens after the engagement.`
- **lede:** `How the work continues — and how it does not.`

| # | slug | Question | Answer |
|---|---|---|---|
| 1 | `what-do-we-walk-away-with` | What do we walk away with? | Practical artifacts: AI Use Guidelines, a Data Boundary Map, leadership alignment, a risk register, review standards, and a next-step roadmap. After larger engagements: a portfolio of validated use cases and a governance one-pager your board can read together. *Link: `/work-with-us#outcomes`.* |
| 2 | `what-happens-after-safety` | What happens after Safety? | We tell you whether your organization is ready for Sandbox, Skills, or further Safety work. Some organizations stop after Safety and run everything else internally. That is the design. |
| 3 | `do-we-have-an-ongoing-relationship` | Do we have an ongoing relationship with Movemental after the engagement? | Optionally. Quarterly portfolio refreshes are available for organizations that want a continuing cadence. We do not require ongoing retainers, and we do not extract recurring revenue from organizations that have done the work and are running it themselves. |
| 4 | `what-if-our-team-changes` | What if our team changes mid-engagement or after? | Leadership transitions are part of organizational life. The artifacts you produce are written so that a new leader can read them and pick up the work. If a transition happens during an engagement, we re-scope honestly with the new team. |
| 5 | `where-do-we-go-if-we-still-have-questions` | Where do we go if we still have questions? | Read the [Path](/path), the [Voices](/voices) page, and the [Evidence](/evidence) page — and then write us. Our most useful first calls start from a question we have not yet written down. *Link: `/contact`.* |

---

## 5 · Hero, TOC, and Final CTA copy

### Hero (top of page)

- **Section classes:** `band-midnight hero hero--fold`
- **aria-labelledby:** `faq-hero-h1`
- **eyebrow:** `FAQ`
- **h1:** `Honest answers to <em>real questions.</em>`
- **lede:** `The objections we hear most often, answered directly. If your question is not on this page, it is the call we want.`
- **CTAs:** `Talk With Us` → `/contact` (primary), `Read the Path` → `/path` (ghost)

### In-page TOC band (under hero)

- **Section classes:** `band-default`
- **aria-labelledby:** `faq-toc-h2`
- **SectionHead:**
  - **eyebrow:** `In this FAQ`
  - **display:** `Ten short groups.`
  - **lede:** `The groups are ordered roughly the way questions arrive in a first call. Skip to whichever group matches what you are about to ask.`
- **Body:** an `<ul>` with one `<li><a href="#faq-<id>">…</a></li>` per group, labels:
  - `01. Getting started`
  - `02. The Path`
  - `03. Approach`
  - `04. Who it's for`
  - `05. Engagement`
  - `06. Cost & time`
  - `07. Tools, data, safety`
  - `08. Voices and evidence`
  - `09. Boundaries`
  - `10. After`
- Reuse the `.fg-toc` recipe pattern that already exists in `recipes.css` (used by `/field-guide`); if it does not fit visually, render a plain unordered list using the `prose` recipe — no new CSS.

### Final CTA (bottom of page)

- **Section classes:** `band-midnight final-cta`
- **aria-labelledby:** `faq-final-cta-h2`
- **eyebrow:** `If your question is not on this page`
- **h2:** `Then it is exactly the <em>call we want.</em>`
- **lede:** `Our most useful first calls start from a question we have not yet written down. If you scrolled the whole page and did not find yours, that is a good sign — write us.`
- **CTAs:** `Talk With Us` → `/contact` (primary), `Start with Safety` → `/start-with-safety` (ghost)

---

## 6 · Pricing answers — guardrails

The current site has **no `/pricing` page**. The internal pricing SSOT (`docs/movemental-offering/04-engagement-design.md`) is for sales conversations, not the FAQ. Therefore:

- The FAQ may state that there is no public price list and that we provide a good-faith range in the first call. ✅
- The FAQ may say a Safety Session is the smallest entry, a Guided Pathway is mid-tier, a Solutions Partnership runs higher. ✅
- The FAQ **must not** publish the internal $18K / $32K / $55K Sandbox Season tiers verbatim. ❌
- The FAQ **must not** invent a different number than the internal SSOT. ❌
- If/when a `/pricing` page ships, replace the "we don't publish" answer with "see `/pricing`" and remove the deferral.

---

## 7 · Voice and tone

- Editorial, not promotional. Match the voice already on `/about` and `/evidence`.
- Direct, not defensive. Most answers should feel like a colleague writing a note, not a brand answering objections.
- Sentences are short. Two ideas per sentence is the cap. One is fine.
- Italicize only where the canonical pages already do — the bandwidth on emphasis is small.
- Never use marketing-stack words: *empower, leverage, unlock, transform, unleash, supercharge, journey, holistic, synergistic.* If the existing site does not use the word, the FAQ does not introduce it.
- Use sentence case for headings, eyebrows, and CTAs unless the on-site convention is uppercase tracking-eyebrow (it is — eyebrows render uppercase via the recipe; write them in normal case in the source).
- Italics via `<em>` belong to a single phrase per heading at most. Do not italicize whole sentences.

---

## 8 · Done-when checklist

A reviewer should be able to verify each of the following without ambiguity. Treat this list as the acceptance criteria.

### Content

- [ ] Ten groups in the order in §4.
- [ ] Every question and answer matches §4 (typos / spacing / minor phrasing aside — no semantic deviation).
- [ ] Every internal link in an answer resolves to a real route in [`src/app/(site)/`](../../../src/app/(site)/).
- [ ] No internal pricing tiers (the literal $18K / $32K / $55K tiers) appear in the public copy.
- [ ] No fabricated case studies, quotes, partner names, or affiliations.
- [ ] Voices and Evidence are preserved as distinct concepts; no answer collapses them.

### Visual / structural

- [ ] Hero uses `band-midnight hero hero--fold`, single `<h1>`, two CTAs.
- [ ] TOC band uses `band-default` and lists all ten groups with anchor links.
- [ ] Group sections alternate `band-section` / `band-default` starting with `band-section` after the TOC.
- [ ] Each group renders a `SectionHead` and a `shadcn` `Accordion` of `AccordionItem`s.
- [ ] Final CTA uses `band-midnight final-cta` with the copy from §5.
- [ ] No raw hex, no `bg-white`, no `bg-gray-*`, no `text-gray-*`, no `border-1` between sections.
- [ ] No inline styles for layout (a single `style={{ marginTop: ... }}` is acceptable to mirror existing pages, but do not add new inline color/typography overrides).

### Accessibility

- [ ] One `<h1>` total.
- [ ] Each section has `aria-labelledby` pointing at its `<h2>` id.
- [ ] Every accordion item has a stable `id` (e.g. `faq-getting-started--what-should-we-do-first`) and a matching `value`.
- [ ] Keyboard: Tab through the page, expand each accordion item with Space/Enter, collapse, continue tabbing.
- [ ] All cross-links are `next/link` `<Link>`s.
- [ ] Focus rings render on all interactive elements (covered by existing recipes; do not strip them).

### Routing / metadata

- [ ] `src/app/(site)/faq/page.tsx` `metadata.title === "FAQ"`.
- [ ] `metadata.description` is a single-sentence distillation: e.g. *"Direct answers to the questions leaders ask before booking a first call — about the Path, engagement, cost, time, tools, and what Movemental does and does not do."*
- [ ] Deep link works: visit `/faq#faq-engagement--how-long-does-an-engagement-take` and confirm the item is open or focused.
- [ ] Footer link to `/faq` (already wired) renders the new content.

### Build hygiene

- [ ] `pnpm typecheck` passes with `NODE_OPTIONS=--max-old-space-size=8192`.
- [ ] `pnpm lint` passes.
- [ ] `pnpm dev` renders the page without console errors or hydration warnings.
- [ ] No new dependencies added.

### Editorial sanity

- [ ] Read the page aloud. If a paragraph sounds like a SaaS landing page, rewrite it.
- [ ] Read the page in the dark mode toggle. Confirm contrast on `band-midnight` and `band-section`.
- [ ] Confirm the page does not contradict any of `/path`, `/start-with-safety`, `/work-with-us`, `/voices`, `/evidence`, `/about`. (When in doubt, the linked page wins; update the FAQ, not the linked page.)

---

## 9 · Anti-goals (do not do these)

- Do not migrate the long-form 7-section "hard questions" FAQ from any prior repo or template. The simplified four-group FAQ that is currently in place is the immediate predecessor; this prompt expands it cleanly. Do not copy phrasing from `docs/build/prompts/faq-page-audit-fixes.md` or any prior FAQ source — those are different products.
- Do not introduce a third nav surface for FAQ. It stays in the footer.
- Do not promise outcomes the linked pages do not promise. If `/work-with-us` does not promise it, the FAQ does not promise it.
- Do not invent partner organizations, dollar figures, partner counts, "trusted by N orgs" lines, or any social-proof stat that is not already on a shipped page.
- Do not name specific clients without their explicit permission and a corresponding mention on a shipped page.
- Do not introduce a contact form on the FAQ page. The CTA goes to `/contact`.
- Do not bury an answer to "what does this cost" four groups deep. Group 06 surfaces it directly.
- Do not write 200-word answers. Compression is the editorial discipline.

---

## 10 · After this ships

Once the FAQ is live, two follow-ons may be worth scheduling:

- A short pass to add per-question structured data (`FAQPage` JSON-LD) for GEO/LLM and search ingestion. Optional; do not block the build on it.
- A revisit when `/pricing` ships, to replace the "we don't publish" answer with a direct link.

End of prompt.
