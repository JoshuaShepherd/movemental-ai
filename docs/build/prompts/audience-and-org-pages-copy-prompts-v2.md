# Audience & org pages — corrected copy + build prompts (v2)

**Purpose:** Ship-ready **proposed copy** and **implementation prompts** for canonical marketing surfaces that currently read as **essay-length heroes** and **duplicated spine** (same paragraphs repeated across sections). This file aligns each page with:

- **`src/components/sections/home/home-concept-modern-page-content.tsx`** — universal spine: short hero, “two equal errors,” stakes, path (Safety → Sandbox → Skills → Solutions), tonal rhythm.
- **`src/app/(site)/fragmentation/page.tsx`** + **`FragmentationDeck`** — six-stage **public spine**; audience pages **link** here instead of re-teaching the whole arc.
- **`docs/build/prompts/audience-pages-canonical-merge-from-new-routes.md`** — one system, multiple applications; informational + relational intelligence visible on audience routes.
- **`docs/design/DESIGN.md`** — semantic tokens, Midnight bands, typography; no raw hex / no pasted shadows.

**How to use:** Paste the **per-page “Build prompt”** block into Cursor when editing that route’s content module. Paste **“Corrected copy”** into the TSX or a small `*.ts` copy map as the single source for that page’s strings.

---

## 0. Global rules (all pages in this bundle)

### 0.1 Hero budget (non-negotiable)

Match the **Concept Modern** home hero density:

| Slot | Target | Hard cap |
|------|--------|----------|
| **Eyebrow** (`ConceptLabel`) | 1 line, audience + domain | ~22 words |
| **Display / H1** | One memorable claim (serif emphasis optional on **one** phrase) | ≤14 words |
| **Dek** (lead paragraph) | **Two sentences** max | ~45 words total |
| **Aside / pull** (optional) | 2–3 short lines OR one quote + attribution | ≤50 words |

Anything longer belongs **below the fold** in labeled sections—not in the hero.

### 0.2 Narrative SSOT (avoid duplication)

- **Do not** paste the full “fragmentation is pastoral / two equal errors / Safety→Solutions” essay on every audience page.
- **Do** include: **one** audience-sharp diagnosis block, **one** “what Movemental installs” block, **one** CTA row linking **`/fragmentation`**, **`/how-it-works`** or **`/system-builds`**, **`/contact`** / **`/inquiry`** as appropriate.
- Reuse **exact** path step names when describing sequence: **Safety · Sandbox · Skills · Solutions** (same order as home).

### 0.3 Entities and punctuation in React

Use typographic characters or JSX escapes consistently with the home page (`Let&rsquo;s`, `&mdash;`, `&rsquo;`). Do not ship literal `&mdash;` in markdown destined for UI—**authors** should enter proper characters in TSX or use existing patterns in `home-concept-modern-page-content.tsx`.

### 0.4 Optional fifth page

This bundle covers **four** primary routes: **`/churches`**, **`/institutions`**, **`/about`**, **`/team`**. If a fifth surface is needed, apply the same hero budget and SSOT rules to **`/movement-leaders`** or the **`/who-its-for`** hub intro—do not add a fifth long-form hero there either.

---

## 1. `/churches` — Churches audience application

**Primary component (today):** `ChurchesPageContent` (or successor under `src/components/sections/`).

**SEO note:** Title/description should name **formation, care, continuity**, and **AI** without duplicating the home title verbatim.

### 1.1 Corrected copy

#### Hero

- **Eyebrow:** For churches integrating formation, care, and memory  
- **H1:** Formation was never meant to be accidental.  
- **Dek:** Between tool-chasing and heroic memory, there is a narrow way. Movemental helps churches build a **foundation** so pastoral work can compound—not collapse when one leader pauses.  
- **Aside (optional):** The work of the church is not broadcast. It is formation over time—through relationships, memory, and care.

#### Section: Two equal errors (short)

- **Label:** Orientation  
- **Headline:** Two equal errors—both pastoral.  
- **Line A:** Scaling ministry through tools **before** theological, ethical, and relational foundations are clear.  
- **Line B:** Relying on private memory and overloaded roles **after** the congregation has outgrown what one mind can hold.

#### Section: What’s at stake

- **Label:** What’s at stake  
- **H2:** Can formation outlast a single senior leader’s head?  
- **Bullets (tight):**  
  - Formation is not structurally carried.  
  - Pastoral knowledge is not preserved.  
  - Relationships do not compound.  
  - Memory is lost faster than it is built.  
- **Closing line:** The result is slow drift—not sudden collapse.

#### Section: Reframe (single punch, then link)

- **Label:** Reframe  
- **H2:** Fragmentation is not an efficiency problem.  
- **Body (2 sentences):** Better programming and stronger preaching help—but they do not fix a **structure** that scatters the intelligence already in the room. The question is whether anyone is holding: *Is this person being formed?*  
- **Pull quote (optional):** “Fragmentation is pastoral. It is the condition in which people are shaped accidentally—or not at all.” — link “From the playbook” to **`/book`** (field guide is the **genre label** for that book, not a separate route family; [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md)).

#### Section: Six failures (keep titles; shorten bodies to ≤2 lines each)

Use your existing card layout; each body **≤ 35 words**.

| # | Title | Body (proposed) |
|---|--------|-----------------|
| 01 | Formation gaps | The pathway exists in theory; in practice, formation follows availability and memory—not intention. |
| 02 | Pastoral burnout | One role holds too much relational memory. Rest helps individuals; it does not fix the structure. |
| 03 | Sunday-to-weekday fracture | Proclamation and practice are not bridged—so most people never build a shared rhythm of obedience. |
| 04 | Generational handoff failure | When carriers leave, formation leaves—because it lived in relationships, not in a shared layer. |
| 05 | Stewardship without pastoral intelligence | Money systems track transactions; pastoral systems track people—when they do not speak, stewardship feels cold. |
| 06 | Cultural-pressure incoherence | Different tables hold different assumptions until conflict makes the split visible. |

#### Section: Why a different approach

- **Label:** Why this cannot be “another tool”  
- **H2:** You do not need a better stack first. You need a **shared foundation.**  
- **Not solved by:** bullet list (database / comms tool / new initiative)—**three items max.**  
- **Solved by:** shared memory · structured formation · integrated pastoral systems—**one sentence each.**  
- **Closing:** We work at the intersection of theology, pastoral leadership, formation, and systems—to **sustain** pastoral work, not replace it.

#### Path + In practice + Starting point + Questions + Close

Keep your **01–04 sequence** labels identical to home (**Safety · Sandbox · Skills · Solutions**); shorten step descriptions to **one sentence** each in UI.

**In practice (four moves):** keep titles; cap each description at **40 words**.

**Starting point:** One paragraph: for many churches, start where loss hurts most—**pastoral memory**—then name **why** (succession, sabbatical, sickness).

**Diagnostic questions:** Keep Q1–Q3; answers as **prompt copy** under each question ≤ 45 words.

**Final CTA:** Begin navigating before the cost compounds—link **Start a conversation** to `/contact` or `/inquiry`.

### 1.2 Build prompt (paste for implementers)

Implement or refactor **`/churches`** so it reads as an **application of the same system** as home, not a second homepage.

1. **Read:** `home-concept-modern-page-content.tsx` (hero + path), `audience-pages-canonical-merge-from-new-routes.md` §2–4, `DESIGN.md` § on Midnight and section rhythm.  
2. **Hero:** Apply §0.1 budgets; move all essay paragraphs into titled sections.  
3. **Spine:** Link to **`/fragmentation`** for the full six-stage walk; do not exceed **120 words** of “theory of fragmentation” on this page.  
4. **Dual intelligence:** At least one block that names **informational** (pathways, curriculum artifacts) and **relational** (care threads, elder memory, handoffs) explicitly.  
5. **CTA row:** Match home patterns—primary to contact/inquiry, secondary to fragmentation or how-it-works.  
6. **Accessibility:** Section `aria-labelledby`; no heading skips; lists for the six failures.  
7. **Acceptance:** Lighthouse-minded length: hero **≤ ~90 words** total across eyebrow + H1 + dek + aside.

---

## 2. `/institutions` — Institutions audience application

**Primary component:** `InstitutionsPageContent` (or successor).

### 2.1 Corrected copy

#### Hero

- **Eyebrow:** For institutions integrating coherence, authority, and evidence  
- **H1:** Coherence can no longer be assumed.  
- **Dek:** Between institutional drift and premature AI adoption, there is a narrow way. Movemental helps you **gather** what you already are—into a foundation the public can trust.  
- **Aside (optional):** Authority now requires **evidence**, not only reputation.

#### Two equal errors

- **Headline:** Two equal errors—both structural.  
- **Line A:** Scaling authority with AI **before** canonical sources and boundaries are defined.  
- **Line B:** Trading on reputation **without** making the foundation legible inside or outside the house.

#### Stakes (one screen)

- **H2:** Can you still make credible claims about what you teach and what you award?  
- **Short list:** Content can be generated · authority can be simulated · coherence can be mimicked → **Institutions must prove what they once assumed.**  
- **Without a foundation:** credentials drift · disagreement compounds · credibility erodes—**slowly, then suddenly.**

#### Reframe

- **H2:** This is not a technical problem first.  
- **Body:** Better systems and reporting help—but fragmentation here is **political, theological, and historical** before it is technical. Legibility is the prerequisite for safe tooling.

#### Six failures (short bodies, same table pattern as churches)

| # | Title | Body |
|---|--------|------|
| 01 | Credentialing drift | The same credential means different things by year, campus, or cohort—with no single place that says what it means *now*. |
| 02 | Cross-entity incoherence | Regions and schools diverge quietly until conflict forces the gap visible. |
| 03 | Alumni invisibility | Alumni are influential and formative—and almost entirely unstructured in institutional memory. |
| 04 | Accreditation and regulatory risk | Evidence is assembled under pressure—exposing how little was continuously gathered. |
| 05 | Archival illegibility | The institution has a history it cannot query—so debates repeat without memory. |
| 06 | Public credibility fragility | Reputation no longer carries the full load; proof has to travel with the claim. |

#### Why Movemental / path / in practice

Mirror **churches** structure with institution-native nouns (schema, evidence layer, translation). Keep **Safety → Sandbox → Skills → Solutions** wording parallel to home.

**Starting point:** Default recommendation stays **accreditation / evidence layer**—one paragraph only; move the long “18 months” rationale to **accordion** or **footnote** if needed.

**Questions Q1–Q3:** keep; trim “answer prompts” under each to **two sentences max.**

**Close:** Invitation paragraph—**≤ 60 words**; single CTA.

### 2.2 Build prompt

Same as §1.2, substituting **institution** examples and ensuring **cross-entity** language appears in **both** informational (catalogs, syllabi, evidence) and relational (boards, partners, faculty) blocks. Link prominently to **`/fragmentation`** and **`/system-builds`** where taxonomy exists.

---

## 3. `/about` — About Movemental

**Primary component:** About page content module referenced from `src/app/(site)/about/page.tsx`.

### 3.1 Corrected copy

#### Hero

- **Eyebrow:** About Movemental  
- **H1:** Built for work that forms people—not just attracts attention.  
- **Dek:** Publishing is easy; credibility is hard. We build digital infrastructure for leaders and organizations whose work is **formative**—so it can endure, connect, and compound.

#### Why Movemental had to exist

- **H2:** The gap we keep seeing  
- **Body (2 short paragraphs):** Para 1: The deepest work still runs through fragmented tools, disconnected content, and rented platforms. Para 2: Movemental exists to **support embodied work** with infrastructure—without replacing it.

#### Methodological spine (one paragraph)

We keep returning to one public spine: **six stages from fragmentation to movement**, with **integration** as load-bearing work—the sequence we design against, not a slogan.

#### Editorial / posture

- **H2:** Posture, bounds, and non-goals  
- **Body:** One paragraph + **single** link line: “Start with the field guide for what we refuse, what we optimize for, and how we think about credibility with AI.”

#### Portrait band (captions only—no long bio in about)

- **Caption line:** Movement leadership shaped in real rooms and institutions—not imported from generic tech culture.

#### “Built from within…”

- **H2:** Built from within the movement world  
- **Body:** **≤ 75 words** on missional theology, formation, planting, responsible AI—product shaped by the problem as lived.

#### What holds Movemental together (four pillars)

Keep titles; each pillar **one sentence** (your existing four: formation over growth; humans over hacks; scenius over genius; technology serves mission).

#### What Movemental is — and is not

Three **Not** lines—each **one sentence**.

#### Who we serve

List the four audiences **without** repeating a paragraph per audience—**one clause each**: movement leaders; churches; nonprofits; networks and institutions.

#### Why trust it / Who is building this

- **Trust:** three bullets max (vision grounded in real work; explicit values → FAQ; inspectable architecture → fragmentation story + FAQ).  
- **Team:** **One sentence** pointing to **`/team`** for bios and portraits—do not duplicate full team copy on About.

### 3.2 Build prompt

Refactor **`/about`** to be the **credible overview**: short hero, no duplicate Team bios, no second essay on fragmentation. **Link outward** to `/team`, `/fragmentation`, field guide, FAQ. Ensure **metadata** title/description match the shorter hero. Use **Section** + **Container** rhythm from other `(site)` pages; token-only colors.

---

## 4. `/team` — Team

**Primary component:** Team page content module.

### 4.1 Corrected copy

#### Hero

- **Eyebrow:** Team  
- **H1:** Infrastructure stewarded by people who understand formation.  
- **Dek:** Movemental sits at the intersection of missional imagination, responsible technology, and credibility earned in **long-haul** community work.

#### Quote (single)

“Humans accountable for judgment. Systems that respect continuity. Design that treats credibility as cumulative—not performative.”

#### How we work (merge duplicates from draft)

- **Label:** How we work  
- **H2:** Leadership, strategy, and engineering as one thread  
- **Body:** **≤ 90 words:** The public story—fragmentation, integration, formation—is not a marketing overlay; it shapes product decisions. Three public roles carry one posture: strategist, movement theologian, platform architect.  
- **Links:** One line: fragmentation story · FAQ · field guide (no repeated “How we work” heading).

#### Who you’re working with

- **H2:** Three public faces, one posture  
- **Body:** **One sentence** naming Brad Brisco, Alan Hirsch, Joshua Shepherd and roles; defer long bios to cards below.

#### Bios (per person)

Keep **one** tight paragraph in the card (≈ **80–100 words**); move bibliography-style lists to **collapsible “Selected works”** or link out—do not stack three long bios in the hero fold.

**Role lines (canonical for site consistency):**

- **Brad Brisco** — CEO & Co-founder  
- **Alan Hirsch** — Chief Missiologist & Co-founder  
- **Joshua Shepherd** — CTO & Founder  

#### Our posture (01–03)

Keep three numbered commitments; each **≤ 55 words**.

#### Collaborate / footer CTA

- **H2:** Collaborate  
- **Body:** Start with context and constraints—**two sentences**.  
- **Secondary:** “Read the writing first”—link to articles / field guide as your IA dictates.

### 4.2 Build prompt

Refactor **`/team`** so **“How we work”** appears **once**. Apply hero budget §0.1. Ensure portraits use **consistent alt text** pattern. Align titles with **`/about`** if both pages list the same people. Reduce **bio** wall-of-text; preserve **voice** but improve **scannability** (subheads, short paragraphs). CTA to `/contact` or `/inquiry`.

---

## 5. Cross-page QA checklist (before merge)

- [ ] No hero block exceeds **§0.1** word budgets.  
- [ ] “Two equal errors” appears **at most once** per page; churches/institutions may use **variant** errors distinct from home’s AI framing **if** still true to audience—otherwise **link** to home for the generic AI pair.  
- [ ] `/fragmentation` linked from every audience page; no 300-word re-explanation of six stages on audience routes.  
- [ ] Informational **and** relational intelligence each named once minimum on `/churches` and `/institutions`.  
- [ ] No duplicated **full** bios between `/about` and `/team`.  
- [ ] Tokens only; Midnight used for **editorial weight** sections per DESIGN.md.  
- [ ] Metadata (title/description) updated to match tightened hero.

---

## 6. Optional: `/movement-leaders` stub prompt (fifth page)

If extending this bundle:

- **Hero:** Eyebrow “For movement leaders integrating corpus and network”; H1 ≤12 words (e.g. “Your life’s work should compound.”); dek = 2 sentences on scatter + AI context.  
- **Body:** Mirror nonprofits/churches **density**, not length—foreground **library / graph / relational memory** language from system builds.  
- **Links:** `/fragmentation`, `/book` if relevant, `/contact`.

---

*Document version:* v2 · *Aligned to:* Concept Modern home, fragmentation route, audience canonical merge prompt, DESIGN.md.
