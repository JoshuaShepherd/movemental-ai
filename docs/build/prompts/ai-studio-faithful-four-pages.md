# Google AI Studio — Faithful build: full `(site)` route group (importance order)

Single prompt to recreate **every** production page under `src/app/(site)/`, ordered **roughly by funnel and IA importance**. Copy must match the cited source files **word-for-word** unless noted.

---

## 0. Global instructions

### 0.1 Fidelity

- **Semantic tokens only** — Concept Modern ramp (`globals.css` + `recipes.css`). No raw marketing grays/blues.
- **Fonts:** Inter + Instrument Serif (`next/font/google`), CSS variables `--font-sans`, `--font-serif-display`.
- **Motion:** No GSAP on these routes unless you explicitly diverge. Use CSS transitions, `IntersectionObserver`, native scroll, accordion UI.
- **Chrome:** Root layout skip link → `#main`, `SiteHeader`, `SiteFooter` (`nav-config.ts`, `site-footer.tsx`). Logo URLs live in `site-header.tsx`.

### 0.2 Attachments (paste verbatim)

1. `src/app/globals.css`
2. `src/app/recipes.css`
3. `tailwind.config.ts`

### 0.3 Canonical components

- Mock/recipe pages: `src/components/sections-mock/**`
- Primitives: `src/components/sections-mock/primitives.tsx` (`Band`, `SectionHead`, `BtnPill`)
- Path sticky / case studies: `src/components/path/**`
- Integrity diagnostic questions: `src/lib/integrity-diagnostic/questions.ts`
- Legal: `src/components/sections/legal-cookies/cookies-page-content.tsx`, `legal-privacy/privacy-page-content.tsx`, `legal-terms/terms-page-content.tsx`

---

## 1. `/` — Home

**Metadata:** `title` **A wiser way to navigate AI** · `description`  
`Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order.`

**Composition:** `HeroFold` → `AudienceFold` → `PathFold` → `ConsequenceFold` → `CredibilityFold` → `FinalCta` — `src/components/sections-mock/home/home-content.tsx`

### Hero (`band-midnight hero hero--fold hero--path`)

- Eyebrow: **For organizational leaders**
- H1: Line 1 **AI is already inside your organization.** Line 2 **The question is whether you're** then *leading it—or reacting to it.* (match apostrophe from source)
- Lede: **We give mission-driven organizations a clear path to adopt AI safely, build real capability, and lead their people through it—without losing what matters most.**
- CTAs: `/field-guide` **See the Path** · `/field-guide#stage-safety` **Start with Safety**

### Audience (`band-default audience-section`)

- Eyebrow **Who this is for** · H2 **For leaders responsible for people, mission, and outcomes.** · Intro paragraph (three sentences about leadership responsibility — verbatim from `audience-fold.tsx`).
- **Three linked cards** (order: nonprofits, churches, institutions) — titles, bodies, bullets, CTA labels, and inline SVGs exactly as `audience-fold.tsx`.

### Path (`band-section path-section`, `id="how"`)

- Eyebrow **The Movemental AI path** · H2 **A clear order for leading your organization through AI.** · Intro (two sentences + line break) from `path-fold.tsx`.
- **`InteractivePath`** — tablist + four stages; copy **every** string from `interactive-path.tsx` `STAGES` (`title`, `body`, `workProducts`, `definitionOfDone`, `ifSkipped`). Keyboard: arrows/home/end. Panel `animate-in fade-in duration-200`.
- CTAs: `/field-guide#stage-safety` **Start with Safety** · `/field-guide` **See the Full Path**

### Consequence (`band-default`, `id="consequence"`)

- SectionHead eyebrow **When the sequence is skipped** · display **What happens when organizations** *rush — or hesitate.* · lede **Most organizations are already using AI. The problem is not adoption — it is the lack of order.**
- Path one / Path two columns — bullet lists **TOO_FAST** / **TOO_SLOW** from `consequence-fold.tsx`.
- Closing serif: **Both paths create the same outcome: fragmentation, confusion, and loss of leadership clarity.**

### Credibility (`band-default`, `id="credibility"`)

- SectionHead **Credibility** · **Built with and shaped by** *movement leaders.* · lede + paragraph about relational credibility.
- Founders list + portraits (`/images/voices/*.webp`) — **FOUNDERS** array in `credibility-fold.tsx`.
- **VoiceCarousel** — **VOICES** array (seven people) + controls — `voices-carousel.tsx`.
- Link `/voices` **See all voices**

### Final CTA (`band-midnight final-cta`, `id="cta"`)

- H2 **You don't need to master AI.** / **You need a clear path for** *leading through it.*
- Lede **Start with safety. Build capability. Lead with clarity.**
- `/start-with-safety` **Start with Safety** · `/contact` **Start a Conversation**

---

## 2. `/path` — The Movemental AI Path (structured)

**Metadata:** `title` **The Movemental AI Path** · `description`  
`Safety, Sandbox, Skills, Solutions. Four stages, in order...` (full string from `path/page.tsx`)

**File:** `path-content.tsx` — sections in order:

1. **Hero** (`hero--path`): eyebrow **The Movemental AI Path** · H1 **A clear path for leading your organization** *through AI.* · lede (two sentences) · CTAs `/start-with-safety` **Start with Safety** · `#stage-safety` **See the First Step**

2. **Core tension** (`id="tension"`): **The problem** · **Most organizations fall into** *one of two traps.* · two **TENSION_COLUMNS** (Trap one Rush Ahead / Trap two Stand Still) + bullets · closing **Neither approach leads to responsible, sustainable adoption.**

3. **Overview** (`path-section`, `id="overview"`): **The model** · **There is a better sequence.** · intro · **OVERVIEW_STEPS** (Safety/Sandbox/Skills/Solutions one-line descriptions) · closing **Most organizations start at Solutions. Movemental starts at Safety.** · CTA **Start with Safety**

4. **Safety deep dive** (`id="stage-safety"`): Step 1 · title **Safety — establish the foundation first.** · body paragraph · **SAFETY_SUBSECTIONS** bullets · CTA `/start-with-safety` **Start with Safety**

5. **Sandbox** (`id="stage-sandbox"`): Step 2 · **Sandbox — explore without chaos.** · body · **SANDBOX_SUBSECTIONS**

6. **Skills** (`id="stage-skills"`): Step 3 · **Skills — build real capability.** · body · **SKILLS_SUBSECTIONS**

7. **Solutions** (`id="stage-solutions"`): Step 4 · **Solutions — build on a human foundation.** · body · **SOLUTIONS_SUBSECTIONS**

8. **Order matters** (`id="order"`): **Sequence matters** · **The order is** *not optional.* · lede · **ORDER_COLUMNS** Out of order / In order · closing on speed vs fragmentation

9. **Engagement** (`id="engagement"`): **How it works in practice** · **This path becomes real through** *guided implementation.* · lede · **ENGAGEMENT_BULLETS** list · `/contact` **Talk With Us**

10. **Final CTA:** **You do not need to master AI.** / **You need a clear path for** *leading through it.* · lede · `/start-with-safety` · `/contact` **Talk With Us**

---

## 3. `/start-with-safety`

**Metadata:** `title` **Start with Safety** · `description` (full from `start-with-safety/page.tsx`)

**File:** `start-with-safety-content.tsx`

1. **Hero:** eyebrow **Start with Safety** · H1 **Before your organization adopts more AI,** `<br />` ***establish the ground rules.*** · lede · `/contact` **Begin the Safety Step** · `#foundation` **See What Safety Includes**

2. **Reframe** (`id="reframe"`): **Safety is not stalling** · **Safety is what makes** *wise adoption possible.* · lede + prose paragraph · **COMPARISON_COLUMNS** Without Safety / With Safety + bullets

3. **Foundation** (`build-section`, `id="foundation"`): **The safety foundation** · **Five areas every organization should clarify first.** · intro · five **SAFETY_AREAS** (Acceptable Use, Data Boundaries, Human Oversight, Voice and Trust, Ethical and Theological Guardrails) with lucide icons `ShieldCheck`, `Lock`, `Eye`, `MessageSquare`, `Compass` strokeWidth 1.5

4. **Diagnostic** (`id="diagnostic"`): **Quick diagnostic** · **How safe is your** *current AI usage?* · lede · seven **DIAGNOSTIC_QUESTIONS** checklist rows (Check icon styling per source) · closing prose

5. **Outputs** (`matters-section`, `id="outputs"`): header trio · six **SAFETY_OUTPUTS** cards

6. **Mini path** (`path-section`, `id="path"`): **Safety first — but not the end** · **Safety is the foundation for everything that follows.** · intro paragraph · **PATH_STEPS** (Skills line: **Practical capability and judgment formation.**) · `/field-guide` **See the full path**

7. **Final CTA:** **Start with the step that** *makes every other step safer.* · lede · **Begin the Safety Step** + **Talk With Us** both `/contact`

---

## 4. `/field-guide` — AI Stewardship Sequence (long-form)

**Metadata:** `title` **The AI Stewardship Sequence** · `description` from `field-guide/page.tsx`

**File:** `field-guide-content.tsx` — **copy every paragraph, list item, aside, blockquote, and heading from this file verbatim.** Structure:

1. **Hero** (`hero--field-guide`): `fg-hero` grid · placeholder cover figure (`TODO` artwork) · eyebrow **A field guide for organizational leaders** · H1 **The** *AI Stewardship Sequence* `.` · lede · **fg-toc** anchors `#stage-safety` … `#order` · hero-proof **Reading time** / fifteen minutes copy

2. **Why this guide** (`split-row`): aside + H2 **A path through this moment that** *holds the mission together.* · two prose paragraphs (muted)

3. **Stage 01 Safety** (`id="stage-safety"`, `band-section`): aside Outputs/Length/Roles · full prose paragraphs + `<em>` questions + church/nonprofit/institution examples + `<ul>` rules + closing paragraph on skipping Safety

4. **Stage 02 Sandbox** (`id="stage-sandbox"`): aside · prose on pilot vs Sandbox · Sandbox Season · `<ul>`

5. **Stage 03 Skills** (`id="stage-skills"`): aside · formation vs training · judgments · organizational shapes · `<ul>`

6. **Stage 04 Solutions** (`id="stage-solutions"`): aside · why last · named refusals · `<ul>`

7. **Order** (`id="order"`): **A note on order** · H2 **Why the order is** *load-bearing.* · sub · aside **If you remember nothing else** · prose + **blockquote.pull-quote** with cite **Movemental, the field guide** · follow-on paragraphs

8. **Final CTA:** eyebrow **If this resonates** · H2 **We would like to** *walk this Sequence with you.* · lede · `/contact` **Start a conversation** · `/voices` **See trusted voices**

---

## 5. `/work-with-us`

**Metadata:** `title` **Work With Movemental** · `description` from `work-with-us/page.tsx`

**File:** `work-with-us-content.tsx`

1. **Hero:** **Work with Movemental** · H1 **A guided path for organizations ready to** *lead AI with clarity.* · lede · `/contact` **Talk With Us** · `/start-with-safety` **Start with Safety**

2. **Audience** (`id="fit"`): **Fit** · **This is for leaders carrying** *real responsibility.* · lede · three **AUDIENCES** cards (linked) — arrow text uses **Read the {first-word lower} path**

3. **Model** (`path-section`, `id="model"`): **How we work** · **We do not start with tools. We start with leadership clarity.** · intro · **ENGAGEMENT_STEPS** Listen / Clarify / Equip / Build · `/path` **See the full path**

4. **First step** (`id="first-step"`): **The first step** · **Most organizations begin with a** *Safety Session.* · lede · **FIRST_STEP_COLUMNS** What we look at / What you leave with · `/start-with-safety` **Begin with Safety**

5. **Options** (`id="options"`): **Ways to engage** · **Start where your organization** *actually is.* · lede · three **ENGAGEMENT_OPTIONS** linked cards (Safety Session / Guided Pathway / Solutions Partnership) — include **Best for**, **Includes** lists, CTAs

6. **Outcomes** (`matters-section`, `id="outcomes"`): **Outcomes** · **The goal is not AI activity. The goal is organizational clarity.** · intro · six **OUTCOMES** cards

7. **Boundaries** (`difference-section`, `id="boundaries"`): **Boundaries** · **Movemental is not here to make your organization chase AI.** · intro · four **BOUNDARIES** blocks

8. **Final CTA:** **Ready to take the** *first responsible step?* · lede · **Talk With Us** · **Start with Safety**

---

## 6. `/who-we-serve`

**Metadata:** `title` **Who we serve** · `description` from `who-we-serve/page.tsx`

**File:** `who-we-serve-content.tsx`

1. **Hero:** **Who we serve** · **Three organizations,** *one Sequence* `.` · lede · `/field-guide` **Read the field guide** · `/contact` **Start a conversation** · hero-proof **A note on language** + link `/movement-leaders` **the definition**

2. **Shared** (`id="shared"`): **The common shape** · **Different organizations, the** *same starting state* `.` · lede · four **SHARED** cards (labels Shared 01–04) — preserve straight quotes in Shared 03 body

3. **Differs** (`id="differs"`): **What the organization shapes** · **The Sequence holds. The work inside it is** *shaped by who you are* `.` · lede · **COMPARE_ROWS** table (role=`table`) Churches / Nonprofits / Institutions columns

4. **Three doors** (`id="audiences"`): **The three audience pages** · **Open the page that** *names you correctly.* · lede · **DOORS** three linked cards (nonprofits first in array)

5. **Movement leaders** (`id="movement-leaders"`): **Adjacent to this page, not on it** · **Movement leaders are** *not a fourth card* `.` · prose with entities · ghost buttons `/movement-leaders` **Read the definition** · `/voices` **See the trusted voices**

6. **Final CTA:** **When you have read the right page** · **The Sequence is the same.** *The work is yours.* · lede · `/contact` **Start a conversation** · `/assess` **Take the diagnostic**

---

## 7. `/churches` · `/nonprofits` · `/institutions`

**Metadata** — exact `title` + `description` from each `page.tsx`.

**Verbatim copy (above the case study):** [`audience-path-pages-verbatim-copy.md`](audience-path-pages-verbatim-copy.md) — every string through `PathClosingCta`, word-for-word from production. The AI Studio agent may redesign UI freely but **must** preserve all of that copy.

**Implementation:** `PathExperience` with `churchesAudience` | `nonprofitsAudience` | `institutionsAudience` (`src/components/path/data/audiences.ts`).

**Shared structure:**

- `PathIntro` — eyebrow **The Movemental AI Path** · H1 **One commitment** *per stage* **— before you move on.** · lede · `StageMap`
- `PathStickySection` — `id="path"` · rail + meter + **StepPanel** ×4 · stage bodies: `SafetyContent`, `SandboxContent`, `SkillsContent`, `SolutionsContent` + all data in `src/components/path/data/shared.ts`
- `PathClosingCta` — midnight band · mini-map · **The path is consistent. The work** *becomes specific* `.` · body · `/contact` **Start a Conversation** · `/path` **Explore the Full Path**
- `CaseStudy` — `id="case-study"` — payload from `case-study.churches.ts` | `case-study.nonprofits.ts` | `case-study.institutions.ts` (**entire narrative verbatim**)
- `PathFootnote` — audience label: **For church leaders.** | **For nonprofit leaders.** | **For institutional leaders.**

**Motion:** IntersectionObserver active panel; scroll progress meter; `scrollIntoView` on tick click; reduced-motion handling per `PathStickySection.tsx`.

---

## 8. `/evidence`

**Metadata:** `title` **Evidence** · `description`  
`Proof looks different in a new category. The reality of the moment, the coherence of the system, the work already happening, and the people behind it — without hype, without invented metrics.`

**File:** `evidence-content.tsx`

1. Hero: **Evidence** · **Proof looks different in a** *new category.* · lede · `/start-with-safety` · `/contact` **Talk With Us**

2. **Problem is real** (`id="reality"`): **The reality** · **This is** *not a hypothetical problem.* · lede · four **PROBLEM_BLOCKS** · closing paragraph

3. **System** (`id="system"`): **The framework** · **Clarity is evidence in a chaotic space.** · intro · **COMPACT_PATH** steps · closing · **ORDER_COLUMNS** · `/path` **See the full path**

4. **Practice** (`id="practice"`): **In practice** · **This is already being worked out in real organizations.** · intro · three **SNAPSHOTS**

5. **People** (`id="people"`): **Credibility** · **Built by movement leaders, not just technologists.** · intro · three **CREDIBILITY_PILLARS** · `/team` **Meet the team**

6. **Building in public** (`id="building-in-public"`): **Posture** · **We are not pretending** *this is solved.* · lede · prose · closing **Authority comes from sustained, honest engagement — not from appearing certain.**

7. **Final CTA:** **This is what** *responsible AI leadership* **looks like.** · lede · **Start with Safety** · **Talk With Us**

*(No testimonials section — intentional.)*

---

## 9. `/contact`

**Metadata:** `title` **Talk With Us** · `description`  
`Let's talk about where your organization actually is. You don't need to have a plan yet — just start the conversation.`  
(use apostrophe characters exactly as in `contact/page.tsx`)

**File:** `contact-content.tsx` + `contact-form.tsx`

1. Hero: **Start the conversation** · **Let's talk about where your organization** *actually is.* (entities per source) · lede · `#contact-method` **Send a note**

2. **Reassurance** (`id="reassurance"`): **Low pressure** · **This is** *not a sales call.* · lede · three **REASSURANCE_BULLETS**

3. **What happens next** (`path-section`, `id="what-happens-next"`): **What happens next** · **What happens when you reach out.** · intro · **NEXT_STEPS** (3)

4. **Who this is for** (`id="who-this-is-for"`): **Who this is for** · **This conversation is most helpful** *if you are:* · **FIT_BULLETS**

5. **Contact method** (`id="contact-method"`): **Send a note** · **Tell us what you are** *actually facing.* · lede · **ContactForm**

**Form:** fields **Your name**, **Email**, **Organization**, **Your role** (placeholder `Senior pastor, executive director, provost…`), **What kind of organization?** select: Choose one / Church / Nonprofit / Institution (seminary, school, other) / Movement leader / Other — **What is on your desk?** textarea placeholder + help text · submit **Send the note** · fineprint about privacy · `POST /api/contact` JSON: `name`, `email`, `organization?`, `audience_segment` mapped from org type, `message` (prefixed `[Role: …]` when role set) · success: **Thanks.** **We'll write back within two business days.**

---

## 10. `/assess` — Integrity Diagnostic

**Metadata + all marketing sections + FAQ + final CTA:** `assess-content.tsx` — **reproduce every string verbatim** (hero, DIMENSIONS cards, read-back list, editorial note, where this sits, ASSESS_FAQ six items, closing band).

**Form:** `integrity-diagnostic-form.tsx` + **`questions.ts`** for all 22 MC questions and options.

**API:** `POST /api/assess` — payload shape per form source.

---

## 11. `/faq`

**Metadata:** `title` **FAQ** · `description` from `faq/page.tsx`

**File:** `faq-content.tsx`

**Hero:** **FAQ** · **Honest answers to** *real questions.* · lede · `/contact` **Talk With Us** · `/path` **Read the Path**

**TOC section:** **In this FAQ** · **Ten short groups.** · lede · linked list to `#faq-{group.id}`

**Ten groups** (alternating `band-default` / `band-section` per `group.band`) — for each item use accordion; **`id` on item:** `faq-{group.id}--{slug}`

| # | `id` | Eyebrow | Display (plain text) | Lede |
|---|------|---------|----------------------|------|
| 01 | getting-started | Getting started | Getting started. | What to do before you book… |
| 02 | the-path | The Path | The four stages, in order. | Safety, Sandbox… |
| 03 | approach | Approach | Approach and philosophy. (with *philosophy* emphasis) | — |
| 04 | who-its-for | Who it's for | Who Movemental serves. | Three implementation audiences… |
| 05 | engagement | Engagement | Ways to engage. | One Sequence, three shapes… |
| 06 | cost-time | Cost & time | Cost, time, and the boring questions. | Direct answers… |
| 07 | tools-data-safety | Tools, data, safety | Tools, data, and the safety boundary. | Where the technology questions… |
| 08 | voices-evidence | Voices and evidence | Voices, evidence, and credibility. | How to read the proof… |
| 09 | boundaries | Boundaries | What we do *not* do. | The work has a shape… |
| 10 | after | After | What happens after the engagement. | How the work continues… |

**All question strings (52)** — copy answers from `faq-content.tsx` preserving internal links (`/start-with-safety`, `/path`, `/contact`, `/work-with-us`, `/churches`, `/nonprofits`, `/institutions`, `/voices`, `/evidence`, etc.) and `<em>` / `<strong>`:

**01 Getting started:** What should we do first? · Do we need technical expertise to begin? · Is this a tool, a course, or a consulting engagement? · What does the first call look like? · How do we know if we are ready? · Do we need to have an AI strategy already?

**02 The Path:** What is the Movemental AI Path? · Why this order? Why not all four in parallel? · Can we skip stages if we have already done some of this? · Do the stages overlap? · What does Safety actually cover? · What does Sandbox mean in practice? · What do Skills and Solutions include?

**03 Approach:** Is Movemental pro-AI or anti-AI? · Why not just start using tools? · Is this primarily a technology problem? · Is this theological? · Are you partisan — politically or ecclesially? · What happens when the technology changes?

**04 Who it's for:** Who is this actually for? · Is this only for Christian organizations? · Do you work with small organizations? · What about denominations and judicatories? · Is this for individual leaders or only organizations? · Where do movement leaders fit?

**05 Engagement:** What are the engagement options? · What is the engagement model? · Who needs to attend from our side? · Is this virtual or in-person? · How quickly can we start? · Can we pause or step out mid-engagement?

**06 Cost & time:** What does this cost? · Can you give a budget range? · Do you offer reduced rates for smaller organizations? · How long does an engagement take? · Will this slow our team down? · What time commitment do our leaders need? · Who pays for tools and vendors?

**07 Tools, data, safety:** Do you recommend specific tools? · Do you have a vendor relationship with ChatGPT, Claude, Copilot, or Gemini? · What data should never enter an AI tool? · What about the real harms — labor, environment, copyright, hallucination, bias? · Do you build custom assistants? · Who owns what we produce together? · What about data privacy and security?

**08 Voices & evidence:** What is the difference between Voices and Evidence? · Where are your case studies? · Why no logo wall? · Who counts as a "voice"? · Can we talk to a current partner?

**09 Boundaries:** Do you start with software? · Do you replace human judgment with AI? · Do you treat efficiency as the highest goal? · Do you take referral fees, sponsorships, or affiliate revenue from AI vendors? · Will you walk away from an engagement that is not a fit?

**10 After:** What do we walk away with? · What happens after Safety? · Do we have an ongoing relationship with Movemental after the engagement? · What if our team changes mid-engagement or after? · Where do we go if we still have questions?

**Final CTA:** **If your question is not on this page** · **Then it is exactly the** *call we want.* · lede · **Talk With Us** · **Start with Safety**

---

## 12. `/about`

**File:** `about-content.tsx` — full copy for Hero, Origin, Core belief (three bullets), Why we exist (two problem cards + third-way line), Leadership (four qualities), Posture, Final CTA (*start with the first step* / Safety / Talk With Us). Metadata from `about/page.tsx`.

---

## 13. `/team`

**File:** `team-content.tsx` — three founder profiles (bios, credentials, links with `#` hrefs in source), How we work split-row + four Sequence list items, Voices pointer, Final CTA. Metadata from `team/page.tsx`.

---

## 14. `/voices`

**File:** `voices-content.tsx` — hero, What voices means + three principles, eight voice cards (names, descriptors, notes, images), Why voices matter + three reasons, Conversation topics list + prose, Final CTA. Metadata from `voices/page.tsx`.

---

## 15. `/movement-leaders`

**File:** `movement-leaders-content.tsx` — hero + hero-proof, three FACETS cards, ecosystem fold + versus grid, practitioner-fit ordered list, pointer to voices, editorial note + links, Final CTA. Metadata from `movement-leaders/page.tsx`.

---

## 16. `/cookies`

**Metadata:** `title` **Cookie Policy** · `description` from `cookies/page.tsx`

**Content:** `CookiesPageContent` — Eyebrow **Legal** · title **Cookie Policy** · **Last updated: April 11, 2026** · prose sections: What are cookies / How we use cookies (bullets) / Categories table (Strictly necessary, Functional, Analytics) / Third-party / Your choices / Updates / Contact (links to `/contact`, `/privacy`)

---

## 17. `/privacy`

**Metadata:** `title` **Privacy Policy** · `description` from `privacy/page.tsx`

**Content:** `PrivacyPageContent` — **Last updated: April 11, 2026** · Summary list · intro paragraphs · Information we collect (you provide / automatic / cookies) · How we use · Legal bases · How we share · Retention · Security · Your choices · International · Children · Changes · Contact — **reproduce every sentence from the component.**

---

## 18. `/terms`

**Metadata:** `title` **Terms of Service** · `description` from `terms/page.tsx`

**Content:** `TermsPageContent` — **Last updated: April 11, 2026** · Use of the Service · Intellectual property · User content · Disclaimers · Limitation of liability · Separate agreements · Changes · Governing law · Contact — verbatim from file.

---

## 19. Acceptance checklist

- [ ] All 20 routes render with correct metadata.
- [ ] Home path tabs + carousel + audience icons match source.
- [ ] `/field-guide` long-form prose blockquote and stages complete.
- [ ] Audience path pages: sticky rail + full case study JSON rendered.
- [ ] Assess: 22 questions + steps + API.
- [ ] FAQ: 10 groups, 52 questions, linked anchors `faq-{group}--{slug}`.
- [ ] Contact form payload + success copy.
- [ ] Legal pages dated April 11, 2026.
- [ ] No GSAP unless explicitly out of scope.

---

## 20. Route → source file quick map

| Route | Primary content file |
|-------|----------------------|
| `/` | `sections-mock/home/*.tsx` |
| `/path` | `sections-mock/path/path-content.tsx` |
| `/start-with-safety` | `sections-mock/start-with-safety/start-with-safety-content.tsx` |
| `/field-guide` | `sections-mock/field-guide/field-guide-content.tsx` |
| `/work-with-us` | `sections-mock/work-with-us/work-with-us-content.tsx` |
| `/who-we-serve` | `sections-mock/who-we-serve/who-we-serve-content.tsx` |
| `/churches` etc. | `components/path/*` + case study data |
| `/evidence` | `sections-mock/evidence/evidence-content.tsx` |
| `/contact` | `sections-mock/contact/contact-content.tsx`, `contact-form.tsx` |
| `/assess` | `sections-mock/assess/*` + `lib/integrity-diagnostic/questions.ts` |
| `/faq` | `sections-mock/faq/faq-content.tsx` |
| `/about` | `sections-mock/about/about-content.tsx` |
| `/team` | `sections-mock/team/team-content.tsx` |
| `/voices` | `sections-mock/voices/voices-content.tsx` |
| `/movement-leaders` | `sections-mock/movement-leaders/movement-leaders-content.tsx` |
| `/cookies` | `sections/legal-cookies/cookies-page-content.tsx` |
| `/privacy` | `sections/legal-privacy/privacy-page-content.tsx` |
| `/terms` | `sections/legal-terms/terms-page-content.tsx` |

---

*Generated from the Movemental `movemental-ai` repo. When copy changes, update this prompt or treat the TSX sources as authoritative.*
