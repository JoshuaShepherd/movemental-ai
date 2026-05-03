# Perfect seminary / institution platform (Movemental applied) — template prompts

Two copy-paste prompts for the same conceptual system: **static HTML first** (fast iteration in-repo), **Stitch second** (design-system screens in the pinned Stitch project).

These are **third-party template examples** — use a fresh creative design per pack (don't link the shared `site-theme.css`; mirror tokens inline). The goal is that each pack reads as its own editorial exemplar while communicating the same eight-layer system model.

---

## Source concept (read this first)

### Core reframe

A seminary is **not**:

- a course provider
- or a degree machine

A seminary **is**:

> A **formation + knowledge + accreditation** system for leaders.

So the platform is not organized around a course catalog bolted to a degree pipeline. It is organized around a **living knowledge graph**, a **relational graph**, and **coherent program pathways** — with bounded AI assistance embedded throughout.

### Old paradigm vs Movemental paradigm

| ❌ Old paradigm             | ✅ Movemental paradigm                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| Fragmented LMS              | Integrated **learning system** woven into pathways and graphs                            |
| Siloed content archive      | **Knowledge graph** — lectures, papers, frameworks, citations, positions, queryable      |
| Faculty as course owners    | Faculty as **thinkers** within a living intellectual network                             |
| Degree-factory metrics      | **Institutional intelligence** about formation depth                                     |
| Enrollment-only touchpoints | **Relational graph** across students, faculty, alumni, mentors                           |
| Generic AI bolted on top    | AI grounded in the institution's corpus, with citations and bounded grading assistance   |
| Single-campus view          | **Network / movement layer** — alumni networks, church partnerships, global cohorts      |

### One-line difference

> From **delivering education** → to **forming leaders within a living knowledge system.**

### The eight system layers

Each layer should appear on both outputs with: a short headline, 2–4 sentences of placeholder body, an includes/components list where useful, and a **"what's different"** callout (pull quote / inset aside).

1. **Institutional home — theological identity, programs as journeys, faculty as thinkers.**
   *What's different:* not a catalog landing page — a clear intellectual and formational identity up front.

2. **Program pathways — degrees as structured formation journeys.**
   *Includes:* courses, cohorts, practicums, mentorship, field work.
   *What's different:* coherent progression instead of fragmented-semester clutter.

3. **Knowledge graph — the institution's living theological knowledge system.**
   *Includes:* lectures, papers, frameworks, theological positions, citations, debates.
   *What's different:* everything is **interconnected, queryable, and AI-usable** — not a shallow archive.

4. **Relational graph — intellectual *and* relational development over time.**
   *Includes:* students, faculty, alumni, mentors, networks.
   *What's different:* enables **lifelong formation**, not just enrollment.

5. **Learning system (LMS transformed) — integrated with knowledge and relational graphs.**
   *Includes:* courses, assignments, discussions, assessments — explicitly wired into pathways and graphs.
   *What's different:* learning is a node in the intellectual network, not a siloed LMS silo.

6. **AI layer — institution-critical but ethically bounded.**
   - **A · Research assistant** — grounded in the seminary corpus with citations (not hallucinations).
   - **B · Writing assistant** — helps students think, not shortcut.
   - **C · Faculty support** — course design and carefully bounded grading assistance.
   - **D · Knowledge navigation** — explore theology across authors and traditions.
   *What's different:* AI is **accountable to the corpus**; it doesn't invent citations, and it doesn't automate away the human work of formation.

7. **Institutional intelligence — formation depth, not only graduation rates.**
   *Includes:* student formation signals, retention, theological development patterns, alumni engagement.
   *What's different:* leaders see **what is actually forming**, not only what's graduating.

8. **Network / movement layer — the seminary as a hub in a larger ecosystem.**
   *Includes:* alumni networks, church partnerships, global cohorts, distributed programs.
   *What's different:* the institution **connects out** into the movement — it is not an island campus.

---

## Prompt A — Static HTML/CSS template pack (copy this block first)

### Role

You are building a **standalone static HTML/CSS exemplar** that explains and visualizes Movemental's "perfect seminary / institution platform" model (see the Source concept above): a formation + knowledge + accreditation system for leaders — not a course catalog bolted to a degree machine.

### Output location (mandatory)

Create a **dedicated directory** (do not reuse the church pack folder or other template folders):

`docs/html/perfect-seminary-platform-movemental/`

### Files to produce (minimum)

| File | Purpose |
|------|---------|
| `index.html` | Primary artifact: long-form editorial page with nav, hero, reframe, paradigm contrast, eight-layer system map, and closing summary |
| `seminary-platform.css` | **Dedicated stylesheet for this pack only.** Scope every rule under `.psp` (on `<body>`) to prevent collisions. **Mirror design tokens inline** in `:root`; do NOT link `docs/html/site-templates/site-theme.css` (the shared file is on an older Digital Curator blue-primary ramp that would pull this exemplar off its fresh creative aesthetic). Document the approach in an HTML comment in `<head>`. |

Optional:

- Inline or external **SVG** for a simple "knowledge graph + relational graph + pathways" schematic
- `README.md` in the same folder (how to open locally, what the pack demonstrates)

### Mandatory reading before layout

1. `docs/design/DESIGN.md` — charter (§3 color & surface model, §17 Concept Modern editorial rhythm)
2. `docs/design/STATIC_HTML_AND_TEMPLATES.md` — `<head>` order, static shell rules, forbidden patterns, validation checklist

### Fresh creative design — this is a third-party template example

This pack sits alongside the church sibling pack. **Each pack should have its own distinct visual atmosphere** while communicating the same structural spine (core reframe, paradigm shift, layered system map, closing one-liner). Both should feel like polished editorial exemplars, not clones of the Movemental marketing site.

- **Do not link** `site-theme.css`. Mirror your own `:root` tokens inside `seminary-platform.css`.
- Pick a palette with an **institutional-editorial** register — e.g., warm cream + deep ink + subtle Midnight band, or limestone + charcoal with a restrained accent. Avoid generic SaaS blue.
- Typography: Inter sans as the primary face; **Instrument Serif** italics for editorial emphasis and citation-like micro-patterns.
- **Institutional cadence:** stronger emphasis on long-form reading bands, citation-like micro-patterns, program pathway **timelines**. Structural hairlines between ledger rows and inset asides are welcome — this is the editorial register, not ghost-lift marketing.
- **Tonal bands**, not fence-like 1px borders between sections. Hairlines are fine inside dense editorial blocks.
- **Motion:** `prefers-reduced-motion: reduce` safe.
- **JS:** minimal. No frameworks. No build step.
- **Content:** placeholders only; no real student or faculty PII.

### Differentiation from the church pack (mandatory)

The seminary page must **not** read as a reskinned duplicate of the church template. Achieve differentiation through:

- **IA emphasis:** programs as formation journeys, accreditation and assessment as bounded institutional responsibilities, faculty as thinkers, alumni and networks as first-class.
- **Layout rhythm:** institutional-editorial — program pathway timelines, citation-like micro-patterns, ledger rows — still Digital Curator's formative cousin, not a generic edu-template.
- **CSS namespace:** use `.psp` (or equivalent) distinct from the church pack's `.pcp` prefix.
- **Color/type palette:** clearly distinct from the church pack's aesthetic — the two should read as siblings, not twins.

### Information architecture (must appear on `index.html`)

Structure the narrative around **formation + knowledge + accreditation for leaders**. The page should flow:

1. **Hero** — one-line claim + the core reframe ("A seminary is not … A seminary is …").
2. **Reframe section** — "is not / is" cards; optional "knowledge graph + relational graph + pathways" schematic.
3. **Paradigm shift** (midnight band or tonal shift) — "Old paradigm ❌" vs "Movemental paradigm ✅".
4. **System map index** — a jump-list of the eight layers with labels and one-line hints (ledger rows).
5. **Eight layer sections** — one per layer, alternating tonal bands, each with: eyebrow number, headline, lede, includes/components list (or sub-function cards for the AI layer), and a "what's different" inset aside.
6. **Program pathway timeline** — a dedicated editorial section showing what a structured formation journey looks like across years/terms (differentiator vs the church pack).
7. **Summary** — one-line difference callout: *"From delivering education → to forming leaders within a living knowledge system."*

### Acceptance criteria

- [ ] New files exist only under `docs/html/perfect-seminary-platform-movemental/`
- [ ] Dedicated `seminary-platform.css` ships with the pack, with inline `:root` tokens and `.psp`-scoped selectors
- [ ] Page is obviously **seminary/institution** in emphasis — not a clone of the church pack (distinct palette, typography register, and institutional cadence)
- [ ] All eight layers are clearly labeled and visually scannable
- [ ] Old paradigm vs Movemental paradigm contrast is present
- [ ] Closing one-liner is present: *"From delivering education → to forming leaders within a living knowledge system."*
- [ ] Nav includes a link back to `docs/html/site-templates/index.html` and to the church sibling pack

---

## Prompt B — Stitch screens (copy this block second)

### Role

You are authoring **new Stitch screens** for the "perfect seminary / institution platform" model, suitable for stakeholder review and later Stitch-to-React migration. Visual language should feel like a distinctive editorial exemplar in its own right.

### Stitch project (mandatory)

**Only** project ID `2208910962065880866`. Use `list_screens` scoped to this project; do not browse unrelated Stitch projects.

### Outputs

Create screens with unambiguous names, for example:

- `Platform — Perfect Seminary — System Map`
- `Platform — Perfect Seminary — Paradigm Shift`
- Optional: `Platform — Perfect Seminary — Program Pathway Timeline`

### Content parity with the HTML prompt

Screens must express:

- Core reframe ("A seminary is not … A seminary is …")
- Old paradigm ❌ vs Movemental paradigm ✅ contrast
- Eight layers: institutional home · program pathways · knowledge graph · relational graph · learning system · AI layer (A/B/C/D sub-functions) · institutional intelligence · network / movement
- Emphasis on **living knowledge graph** and **relational graph** as differentiators
- AI as institution-critical but ethically bounded (citations, bounded grading assistance)
- Closing one-liner: *"From delivering education → to forming leaders within a living knowledge system."*

### Stitch-specific constraints

- Prefer **editorial clarity** and **schematic layouts** over fake product data grids.
- Use an institutional-editorial register distinct from the church Stitch screens — timelines, ledger rows, citation micro-patterns. Midnight bands optional for contrast moments.
- No real student/faculty data in placeholder copy.
- Downstream migration must be able to use `get_screen` + `docs/build/prompts/stitch-to-react-migration.md`.

### Acceptance criteria

- [ ] Screens exist only in project `2208910962065880866`
- [ ] At least one screen gives a **single-glance** view of the eight-layer model
- [ ] Visual and naming distinction from any "perfect church platform" Stitch screens is obvious (institution-specific labels and examples)
- [ ] One screen includes a **program pathway timeline** — a differentiator vs the church pack

---

## Canonical Stitch prompt payload (paste into `generate_screen_from_text`)

**Project:** `2208910962065880866` · **Device:** `DESKTOP` · **Suggested title:** `Platform — Perfect Seminary — System Map`

````text
Create a long-scroll desktop screen titled "Platform — Perfect Seminary — System Map". Institutional-editorial concept pack (not marketing dashboard). Visual: warm cream paper #faf6ee with near-black ink #19150f. Instrument Serif italics for emphasis. Inter sans for body. Midnight band #141110 with cream #f4efe5 text for the paradigm shift and closing summary only. Tonal bands (paper → alt #f2ece0 → deep #efe7d6) for section rhythm. Institutional rhythm: structural hairlines between ledger rows, citation-like micro-patterns, program pathway TIMELINE. Must be visibly DIFFERENT from any "Perfect Church" Stitch screen — institutional emphasis (faculty as thinkers, alumni, citations), not congregational.

TOP TO BOTTOM:

1. Sticky nav: brand "Movemental · Seminary platform · exemplar" (left), links Reframe · Paradigms · System · Pathway · Summary (center), ink pill CTA "Return to site templates →" (right).

2. HERO (paper). Left 7/12: pill eyebrow "Concept pack · Movemental applied". Display headline: "Not a course catalog bolted to a degree machine. A [formation + knowledge + accreditation system in serif italics] for leaders." Two ledes: "A seminary is not a course provider or a degree machine. It is a living knowledge system held together by a corpus, relationships, and formation." / "So the platform is not organized around course listings. It is organized around Program pathways, a Knowledge graph, and a Relational graph." Right 5/12: inset "About this pack" sidebar with ink hairline.

3. CORE REFRAME (paper). Eyebrow "The core reframe". Display: "A seminary is not a catalog of courses to enroll in. It is a [people being formed as leaders in serif italics]." Two-column is/is-not cards. Below: a schematic SVG showing three labeled nodes (KNOWLEDGE GRAPH · RELATIONAL GRAPH · PROGRAM PATHWAYS) connected by thin lines with small dot nodes for citation connections, serif italic caption underneath: "Three graphs, one formation."

4. PARADIGM SHIFT (MIDNIGHT band). Eyebrow "Paradigm shift". Display: "From fragmented semesters to [coherent formation in serif italics]." Two-column compare:
LEFT "Old paradigm": Fragmented LMS · Siloed content archive · Faculty as course owners · Degree-factory metrics · Enrollment-only touchpoints · Generic AI bolted on top · Single-campus view.
RIGHT "Movemental paradigm" (brighter): Integrated learning system · Knowledge graph (queryable corpus) · Faculty as thinkers · Institutional intelligence about formation depth · Relational graph across students, faculty, alumni, mentors · AI grounded in the corpus with citations and bounded grading · Network / movement layer across partnerships.

5. SYSTEM MAP INDEX (paper, narrow column). Eyebrow "The eight system layers". Display: "Every layer exists for formation, knowledge, and accreditation — not for its own sake." Ledger-style 8-row index with hairline dividers. Each row: serif italic number · layer name · muted one-line hint.
01 · Institutional home — Identity, programs as journeys
02 · Program pathways — Degrees as formation journeys
03 · Knowledge graph — Living theological knowledge system
04 · Relational graph — Lifelong formation, not enrollment
05 · Learning system — LMS woven into graphs
06 · AI layer — Grounded, bounded, citation-first
07 · Institutional intelligence — Formation depth, not grad rates
08 · Network / movement — Seminary as movement hub

6. EIGHT LAYER SECTIONS (alternating paper and alt paper). Each section: left 7/12 copy column with eyebrow number + headline (sans + serif italic emphasis) + lede + ledger-style includes list with hairline between items. Right 5/12: inset "What's different" aside with ink top rule, small caps "WHAT'S DIFFERENT" label, and body with serif italic accent.

01 INSTITUTIONAL HOME — "Theological identity, programs as journeys, faculty as thinkers." Lede: clear identity, not catalog landing. Includes: Theological identity stated clearly · Programs framed as journeys · Faculty as thinkers, not profile cards · Entry points for prospective + current students. Different: "Not a catalog landing — a clear intellectual and formational identity up front."

02 PROGRAM PATHWAYS — "Degrees as structured formation journeys." Lede: degrees as coherent arcs, not semester clutter. INCLUDE A TIMELINE VISUAL BELOW THE LEDE: a horizontal timeline with 5 nodes showing the arc of an MDiv-shaped journey — Year 0: Foundation cohort · Year 1: Biblical + theological grounding · Year 2: Historical + pastoral arts · Year 3: Practicum + integration · Year 4: Capstone + commissioning. Each node has a small serif italic marker and a one-line description. Then includes: Courses · Cohorts · Practicums · Mentorship · Field work. Different: "Coherent progression instead of fragmented-semester clutter."

03 KNOWLEDGE GRAPH — "The institution's living theological knowledge system." Lede: lectures, papers, frameworks, positions, citations, debates — all interconnected, queryable, AI-usable. Include a small citation-style block with serif italic: "'Moltmann, J. (1967). Theology of Hope.' — cited 23 times across 4 program pathways and 2 faculty articles." Includes: Lectures · Papers & articles · Frameworks & theological positions · Citations & debates · Deeply tagged topics. Different: "Everything is interconnected, queryable, and AI-usable — not a shallow archive."

04 RELATIONAL GRAPH — "Intellectual and relational development over time." Lede: students, faculty, alumni, mentors, networks; lifelong formation signals. Includes: Student profiles with intellectual + relational trajectory · Faculty-student mentoring arcs · Alumni networks as first-class · Cohort and discussion connections. Different: "Enables lifelong formation — not just enrollment."

05 LEARNING SYSTEM — "LMS transformed — integrated with knowledge and relational graphs." Includes: Courses · Assignments · Discussions · Assessments — all wired into the graphs. Different: "Learning is a node in the intellectual network, not a siloed LMS silo."

06 AI LAYER — "Institution-critical but ethically bounded." Show 2x2 sub-function grid after lede, each card with serif italic A/B/C/D letter:
A — Research assistant — Grounded in the seminary corpus with citations (not hallucinations).
B — Writing assistant — Helps students think, not shortcut.
C — Faculty support — Course design and carefully bounded grading assistance.
D — Knowledge navigation — Explore theology across authors and traditions.
Different: "AI is accountable to the corpus. It doesn't invent citations, and it doesn't automate away the human work of formation."

07 INSTITUTIONAL INTELLIGENCE — "Formation depth, not only graduation rates." Includes: Student formation signals over time · Retention with pastoral context · Theological development patterns · Alumni engagement. Different: "Leaders see what is actually forming, not only what's graduating."

08 NETWORK / MOVEMENT — "The seminary as a hub in a larger ecosystem." Includes: Alumni networks · Church partnerships · Global cohorts · Distributed programs. Different: "The institution connects out into the movement — it is not an island campus."

7. SUMMARY (MIDNIGHT band, narrow centered). Eyebrow "Summary". Display: "A formation + knowledge + accreditation system — where courses, corpus, and community are no longer separate." Below cream hairline rule: one-line summary large sans: "From [delivering education in serif italics] → to [forming leaders within a living knowledge system in serif italics]."

8. Footer (deep paper): pipe-separated small muted links "Movemental home | Site templates | Church pack →", right-aligned small caps: "Concept pack · placeholder copy · docs/html".

No real student/faculty PII. Placeholder copy. Editorial institutional register — NOT marketing, NOT dashboards. Third-party template example.
````
