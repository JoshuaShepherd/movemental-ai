# Perfect Church Platform (Movemental applied) — template prompts

Two copy-paste prompts for the same conceptual system: **static HTML first** (fast iteration in-repo), **Stitch second** (design-system screens in the pinned Stitch project).

These are **third-party template examples** — use a fresh creative design per pack (don't link the shared `site-theme.css`; mirror tokens inline). The goal is that each pack reads as its own editorial exemplar while communicating the same nine-layer system model.

---

## Source concept (read this first)

### Core reframe

A church is **not**:

- a content publisher
- or a membership database

A church **is**:

> A living formation system held together by **teaching, relationships, and mission.**

So the platform is not organized around pages and tools. It is organized around **Formation + Relationships + Movement** — with **Pathways** at the center, where those three integrate rather than get bolted back together.

### Old paradigm vs Movemental paradigm

| ❌ Old paradigm                     | ✅ Movemental paradigm                              |
| ----------------------------------- | --------------------------------------------------- |
| CMS for publishing                  | **Knowledge** as a living corpus                    |
| CRM for contacts                    | **Relationships** as context, not logs              |
| LMS for courses                     | **Formation** orchestrated, not cataloged           |
| Community app bolted on             | **Action** integrated with teaching and care        |
| Scattered tools, inconsistent data  | Pathways collapse LMS + CRM + CMS at the center     |

### One-line difference

> From **managing a congregation** → to **forming a people.**

### The nine system layers

Each layer should appear on both outputs with: a short headline, 2–4 sentences of placeholder body, an includes/components list where useful, and a **"what's different"** callout (pull quote / inset aside).

1. **Home — an entry into a system, not a website.**
   *Components:* current teaching or moment, clear next step, pathways preview, relational entry points (groups, people, gatherings).
   *What's different:* **pathway-first** (not content-first, not announcements-first).

2. **Pathways — guided formation journeys (core of everything).**
   *Examples:* Explore Christianity · Join the Church · Spiritual Formation · Leadership Development · Missional Living.
   *Each pathway bundles:* teaching, relationships, practices, milestones, context-aware progression.
   *What's different:* this is where **LMS + CRM + CMS collapse** into one thing — pathways are the anchor.

3. **Knowledge system (CMS evolved) — structured theological intelligence.**
   *Includes:* sermons indexed/chunked, articles, frameworks, courses, scripture connections, deeply-tagged topics.
   *What's different:* everything is linked, contextualized, queryable — **the church's living theological corpus**, not a blog archive.

4. **Relational intelligence (CRM evolved) — a living map of people and context.**
   *Includes:* profiles with real context, group participation, conversations, care history, leadership relationships, donor/support patterns framed ethically.
   *What's different:* pastoral care becomes **intelligent, not reactive.**

5. **Groups & community — embedded in pathways.**
   *Example:* "Join this formation pathway" → automatically places into the right group context.
   *What's different:* groups are the **relational shape** of the pathway, not a parallel database.

6. **Formation engine (LMS transformed) — formation orchestration.**
   *Includes:* sequences, practices, reflection prompts, group discussions, qualitative progress signals.
   *What's different:* tracks understanding, participation, engagement, **transformation signals** — not only percent complete.

7. **AI / agent layer — embedded intelligence.**
   - **A · Retrieval & grounded answers** — drawn from sermons, teaching, pathways, and (with permission) relational context.
   - **B · Pastoral assistants** — draft/suggest, bounded; surface context leaders might miss; never replace human care.
   - **C · Formation assistants** — help individuals move through pathways: reflection prompts, next steps, re-engagement.
   - **D · Staff intelligence** — "Who is disengaging?" · "Where are people getting stuck?" · "What is forming?"
   *What's different:* AI is not a chatbot billboard; it is **embedded intelligence** grounded in this church's actual teaching and context.

8. **Leadership & insight — clarity about formation and health, not vanity metrics.**
   *Includes:* pathway completion patterns, group engagement, care gaps, giving patterns (framed with pastoral care), teaching effectiveness as signal (not vanity likes).
   *What's different:* leaders see **"Is our church actually forming people?"** — instead of charts about clicks.

9. **Multiplication — movement infrastructure.**
   *Includes:* church planting kits, leader pipelines, distributed communities, content/pathway replication, network-level connections.
   *What's different:* infrastructure built for the **movement stage**, not a single congregation stage.

---

## Prompt A — Static HTML/CSS template pack (copy this block first)

### Role

You are building a **standalone static HTML/CSS exemplar** that explains and visualizes Movemental's "perfect church platform" model (see the Source concept above): a unified intelligence system for formation, care, and mission — not a website + LMS + CRM bolt-on.

### Output location (mandatory)

Create a **dedicated directory** (do not reuse other template folders):

`docs/html/perfect-church-platform-movemental/`

### Files to produce (minimum)

| File | Purpose |
|------|---------|
| `index.html` | Primary artifact: long-form editorial page with nav, hero, reframe, paradigm contrast, nine-layer system map, and closing summary |
| `church-platform.css` | **Dedicated stylesheet for this pack only.** Scope every rule under `.pcp` (on `<body>`) to prevent collisions. **Mirror design tokens inline** in `:root`; do NOT link `docs/html/site-templates/site-theme.css` (the shared file is on an older Digital Curator blue-primary ramp that would pull this exemplar off its fresh creative aesthetic). Document the approach in an HTML comment in `<head>`. |

Optional:

- Inline SVG for a simple **Formation + Relationships + Movement** trinity schematic (three circles with "Pathways at the center")
- `README.md` in the same folder (one paragraph: how to open locally, what the pack demonstrates)

### Mandatory reading before layout

1. `docs/design/DESIGN.md` — charter (§3 color & surface model, §17 Concept Modern editorial rhythm)
2. `docs/design/STATIC_HTML_AND_TEMPLATES.md` — `<head>` order, static shell rules, forbidden patterns, validation checklist

### Fresh creative design — this is a third-party template example

This pack sits alongside the seminary sibling pack. **Each pack should have its own distinct visual atmosphere** while communicating the same nine-layer structure. Both should feel like polished editorial exemplars, not clones of the Movemental marketing site.

- **Do not link** `site-theme.css`. Mirror your own `:root` tokens inside `church-platform.css`.
- Pick a palette that fits a church/formation subject (examples: limestone + sacred vermillion; cool stone + muted copper; warm charcoal + ivory). Avoid generic SaaS blue.
- Typography: Inter sans as the primary face; **Instrument Serif** italics for editorial emphasis (matches the pack's "liturgical editorial" register).
- **Tonal bands**, not fence-like 1px borders between sections. Hairline dividers are OK inside ledger-style lists and inset asides.
- **Motion:** `prefers-reduced-motion: reduce` safe. No scroll-linked trickery required.
- **JS:** minimal or none. No build step.
- **Content:** placeholder copy only. No real church member data or PII.

### Information architecture (must appear on `index.html`)

Structure the narrative around **Formation + Relationships + Movement** (not "pages + tools"). The page should flow:

1. **Hero** — one-line claim + the core reframe ("A church is not … A church is …").
2. **Reframe section** — "is not / is" cards, followed by the trinity schematic (Formation + Relationships + Movement, with "Pathways at the center").
3. **Paradigm shift** (midnight band) — side-by-side "Old paradigm ❌" vs "Movemental paradigm ✅".
4. **System map index** — a jump-list of the nine layers with labels and one-line hints (editorial ledger rows).
5. **Nine layer sections** — one per layer, alternating tonal bands, each with: eyebrow number, headline, lede, includes/components list (or sub-function cards for the AI layer), and a "what's different" inset aside.
6. **Summary** (midnight band) — one-line difference callout: *"From managing a congregation → to forming a people."*

### Acceptance criteria

- [ ] New files exist only under `docs/html/perfect-church-platform-movemental/`
- [ ] Dedicated `church-platform.css` ships with the pack, with inline `:root` tokens and `.pcp`-scoped selectors
- [ ] Page reads as an editorial **system map**, not a product dashboard
- [ ] All nine layers are visually distinct yet harmonized — tonal rhythm, not rainbow sections
- [ ] Old paradigm vs Movemental paradigm contrast is on the page, clearly
- [ ] Closing one-liner is present: *"From managing a congregation → to forming a people."*
- [ ] `index.html` links back to `docs/html/site-templates/index.html` and to the seminary sibling pack using correct relative paths

---

## Prompt B — Stitch screens (copy this block second)

### Role

You are authoring **new Stitch screens** that communicate the same "perfect church platform" system model for stakeholder review and eventual Stitch-to-React migration. Visual language should feel like a distinctive editorial exemplar — not a clone of existing Movemental marketing screens.

### Stitch project (mandatory)

Use **only** project ID `2208910962065880866`. Do **not** call broad project listing APIs. Start from `list_screens` for this project ID, then create or edit screens in-place.

### Outputs

Create **one new screen group** (one or more screens) whose names make intent obvious, for example:

- `Platform — Perfect Church — System Map`
- `Platform — Perfect Church — Paradigm Shift`
- Optional: `Platform — Perfect Church — Pathways Detail`

Each screen should be **presentation-ready**: real typography hierarchy, token-like color roles (light paper default + midnight regional band), and **no** generic SaaS dashboard chrome unless it serves the narrative.

### Content parity with the HTML prompt

The Stitch screens must reflect the **same nine layers** and the same **Formation + Relationships + Movement** spine, including:

- Core reframe ("A church is not … A church is …")
- Old paradigm ❌ vs Movemental paradigm ✅ contrast
- Pathway-first home vs content-first
- Pathways as the collapse of LMS + CRM + CMS
- Knowledge as linked corpus · relational intelligence as context-rich map · groups embedded in pathways · formation engine with qualitative signals · AI as embedded intelligence (A/B/C/D sub-functions) · leadership insight focused on formation health · multiplication as movement infrastructure
- Closing one-liner: *"From managing a congregation → to forming a people."*

### Stitch-specific constraints

- Prefer **editorial sections and schematics** over dense product data tables.
- Avoid emoji in final UI text (prefer labels and icons consistent with existing Stitch screens in `2208910962065880866`).
- When finished, ensure screens are **named, grouped, and described** clearly enough that a downstream agent can run `get_screen` and migrate to React per `docs/build/prompts/stitch-to-react-migration.md`.

### Acceptance criteria

- [ ] All new/edited screens live in project `2208910962065880866` only
- [ ] At least one screen presents the **full nine-layer** model in a single glance-friendly layout
- [ ] Copy is placeholder-safe (no real church member data)
- [ ] Visual system is distinctive and editorial; midnight bands used for paradigm shift and closing summary

---

## Canonical Stitch prompt payload (paste into `generate_screen_from_text`)

**Project:** `2208910962065880866` · **Device:** `DESKTOP` · **Suggested title:** `Platform — Perfect Church — System Map`

````text
Create a long-scroll desktop screen titled "Platform — Perfect Church — System Map". Concept pack (not marketing); editorial, not dashboard. Visual language: warm cream paper background (#faf6ee) with near-black ink (#19150f), Instrument Serif italics for emphasis, Inter sans for body, Midnight bands (#141110 with cream #f4efe5 text) for the paradigm shift and closing summary. No 1px fence borders between major sections — use tonal alternation between paper (#faf6ee), alt band (#f2ece0), and cards (#ffffff). Hairlines allowed inside ledger rows and inset asides only. No saturated SaaS blue anywhere.

STRUCTURE TOP TO BOTTOM:

1. Sticky nav: brand "Movemental · Perfect church platform · exemplar" (left), on-page nav links Reframe · Paradigm · System map · Pathways · Summary (center), ink-filled pill CTA "Return to site templates →" (right). Glass blur over paper.

2. HERO (paper band): left column 7/12 — small pill eyebrow "Concept pack · Movemental applied"; then a large display headline reading "Not a website + LMS + CRM bolted together. A [unified intelligence system in serif italics] for formation, care, and mission."; two lede paragraphs below: "A church is not a content publisher or a membership database. It is a living formation system held together by teaching, relationships, and mission." and "So the platform is not organized around pages and tools. It is organized around Formation + Relationships + Movement." Right column 5/12: inset aside card with ink hairline and ink top rule, titled "About this pack" containing: "A standalone editorial map of Movemental's 'perfect church platform' concept — nine system layers, one paradigm shift, placeholder copy throughout."

3. CORE REFRAME (paper band): eyebrow "The core reframe"; display headline "A church is not a catalog of tools to configure. It is a [people being formed in serif italics]." Then a 2-column "is not / is" block: left card (alt band) titled "A church is NOT" with body "A content publisher. Or a membership database."; right card (white) titled "A church IS" with body "A living formation system held together by teaching, relationships, and mission." Below: a large trinity schematic SVG — three overlapping circles labeled FORMATION, RELATIONSHIPS, MOVEMENT, with the center circle filled darker to suggest overlap, and a serif italic caption underneath reading "Pathways sit at the center." Caption text: "Pathways are where formation, relationships, and movement integrate — not where they're bolted back together."

4. PARADIGM SHIFT (MIDNIGHT band): eyebrow "Paradigm shift"; display headline on dark "From parallel tools to [one integrated system in serif italics]." Then a 2-column compare block with an ornamental serif-italic arrow between them:
LEFT column (subtle dark inset): header "Old paradigm" and bullet list — CMS for publishing · CRM for contacts · LMS for courses · Community app bolted on · Scattered tools, inconsistent data.
RIGHT column (filled with dim cream, brighter than left): header "Movemental paradigm" and bullet list — Knowledge as a living corpus · Relationships as context, not logs · Formation orchestrated, not cataloged · Action integrated with teaching and care · Pathways collapse LMS + CRM + CMS at the center.

5. SYSTEM MAP INDEX (paper band, centered narrow column): eyebrow "The nine system layers"; headline "Every layer exists for formation, relationships, and movement — not for its own sake." Below it a ledger-style index: 9 rows, each row formatted as a thin hairline divider with 3 columns — left: serif italic number (01 through 09), middle: layer name, right (muted, smaller, right-aligned): one-line hint. Rows:
01 · Home — A system entry, not a website
02 · Pathways · core — Guided formation journeys
03 · Knowledge system — Living theological corpus
04 · Relational intelligence — Map of people and context
05 · Groups & community — Embedded in pathways
06 · Formation engine — Formation orchestration
07 · AI / agent layer — Embedded intelligence
08 · Leadership & insight — Formation & health clarity
09 · Multiplication — Movement infrastructure

6. NINE LAYER SECTIONS (alternating between paper and alt-band paper). Each section uses the same grid: 7/12 left column with eyebrow number + headline (sans with serif italic emphasis), lede paragraph, and an editorial ledger-style "includes" list with thin dividers between items and a small ink dash prefix. The right 5/12 column holds an inset "What's different" aside card (white, ink hairline, ink top rule 3px) with an all-caps label "WHAT'S DIFFERENT" and a body copy with serif italic emphasis.

01 · HOME — "An entry into a system, not a website." Lede: "Home orients a visitor immediately: what this church believes, what it invites people into, and how to take a clear next step. It isn't a content feed or an announcement wall." Includes: Current teaching or moment · Clear next step (join, explore, attend, learn) · Pathways preview · Relational entry points (groups, people, gatherings). What's different: "Not content-first. Not announcements-first. Pathway-first. The home page shows where this community is going — and hands the visitor a next step."

02 · PATHWAYS — CORE — "Guided formation journeys, not a course catalog." Lede: "Pathways are the center of the platform. Each one bundles teaching, relationships, practices, milestones, and context-aware progression into a coherent journey — not a shelf of random modules." Below lede, show a row of 5 rounded pill chips: Explore Christianity · Join the Church · Spiritual Formation · Leadership Development · Missional Living. Then a cream-inset callout box with label "Each pathway bundles:" and content "teaching (content) · relationships (context) · practices (rhythm) · milestones (signals) · progression that adapts to who is on the journey." What's different: "This is where LMS + CRM + CMS collapse into one thing. Pathways are the anchor — every other layer exists to serve them."

03 · KNOWLEDGE SYSTEM — CMS EVOLVED — "Structured theological intelligence — not a blog archive." Lede covers sermons indexed/chunked, articles, frameworks, courses, scripture connections, deep topic tagging. Includes: Sermons indexed and chunked, with references · Articles and long-form teaching · Frameworks, courses, scripture connections · Topics tagged for depth, not clicks. What's different: "Everything is linked, contextualized, and queryable. The church's living theological corpus — not another pile of posts."

04 · RELATIONAL INTELLIGENCE — CRM EVOLVED — "A living map of people, relationships, and context." Lede covers context-rich profiles, ethical framing. Includes: People profiles with real context · Group participation and care history · Leadership and mentoring relationships · Donor and support patterns, framed pastorally. What's different: "Pastoral care becomes intelligent, not reactive. Leaders see context, not just check-ins."

05 · GROUPS & COMMUNITY — "Embedded in pathways, not bolted on." Lede covers small groups, cohorts, classes, teams as expressions of pathways. Inset example callout: "Example: joining the Spiritual Formation pathway automatically places a person into the right cohort rhythm, with the right teaching already queued up." What's different: "Groups aren't a parallel database. They are the relational shape of the pathway."

06 · FORMATION ENGINE — LMS TRANSFORMED — "Formation orchestration — not a course player." Includes: Learning sequences and practices · Reflection prompts and group discussions · Qualitative signals: understanding, participation, engagement · Transformation signals over time. What's different: "Tracks transformation signals, not only percent complete. The question is what is forming — not what got clicked."

07 · AI / AGENT LAYER — "Embedded intelligence, not a chatbot billboard." After lede, show a 2x2 grid of small sub-function cards (paper background, thin hairline, serif italic letter A/B/C/D in an accent color):
A — Retrieval & grounded answers — Answers drawn from sermons, teaching, pathways, and — with permission — relational context.
B — Pastoral assistants — Draft and suggest — bounded. Surface context leaders might miss. Never replace human care.
C — Formation assistants — Help individuals move through pathways: reflection prompts, next steps, re-engagement.
D — Staff intelligence — "Who is disengaging?" "Where are people getting stuck?" "What is forming?"
What's different: "AI isn't front-and-center. It is embedded intelligence — grounded in this church's actual teaching and context."

08 · LEADERSHIP & INSIGHT — "Clarity about formation and health — not vanity dashboards." Includes: Pathway completion patterns · Group engagement and care gaps · Giving patterns framed with pastoral care · Teaching effectiveness as signal, not vanity likes. What's different: 'Leaders see: "Is our church actually forming people?" — instead of charts about clicks.'

09 · MULTIPLICATION — "Where the platform becomes movement infrastructure." Includes: Church planting kits · Leader pipelines · Distributed communities · Content and pathway replication · Network-level connections. What's different: "Infrastructure built for the movement stage — not a single congregation stage."

7. SUMMARY (MIDNIGHT band, centered, narrow column): eyebrow "Summary"; display headline "A unified system where teaching, relationships, and formation are no longer separate." Below a cream hairline top rule: one-line summary in large sans "From [managing a congregation in serif italics] → to [forming a people in serif italics]."

8. Footer (deeper paper band): pipe-separated small muted links "Movemental home | Site templates | Seminary pack →", small caps label on right: "Concept pack · placeholder copy · docs/html".

No real PII. Placeholder copy only. Editorial-first. Avoid rainbow sections — tonal alternation only. This is a third-party template example, not Movemental's live marketing site.
````
