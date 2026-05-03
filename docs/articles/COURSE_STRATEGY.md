---
author: Josh Shepherd
---

# Course Strategy

**This document is the authoritative reference for course structure, module order, and content strategy. It supersedes any conflicting M.N.X descriptions in older playbook documents.**

---

## 1. Philosophy: Transformation Over Information

Courses are the **transformation layer** of the platform. Portals deliver information. Courses change people.

The distinction matters in every design decision:

- A portal is a deep dive into a framework (e.g. mDNA, Reframation). It gives you the map.
- A course walks you through a formation journey over 8 weeks. It changes how you see and act.

Formation happens through four necessities — all four must be present in every course:

1. **Dissonance** — Productive tension that disrupts assumptions and opens the learner to change. Every core week begins with it.
2. **Action** — A concrete, time-boxed step the learner takes in their actual life. Not theoretical. Doable in 7 days.
3. **Reflection** — Looking back at what happened when they acted. Journaling, guided prompts, AI conversation.
4. **Community** — The cohort. Shared risk, shared story, peer accountability.

The Christocentric spine runs through all of it. Every course is ultimately about following Jesus more faithfully and joining his mission more fully.

---

## 2. The 8-Week Structure

All courses are **exactly 8 weeks, numbered 1–8**. No Week 0. Week 1 is orientation. Week 8 is synthesis and sending.

| Week | Role | Description |
|------|------|-------------|
| **1** | Introduction & Orientation | Course promise, context discovery, cohort onboarding, first commitment |
| **2–7** | Core Transformation Modules | One mDNA element or framework dimension per week; full transformation loop each week |
| **8** | Synthesis & Sending | Ecosystem integration, 30/60/90 day plan, commissioning liturgy |

---

## 3. The Transformation Loop (Weeks 2–7)

This is the canonical section order for every core week. It is derived from the Forgotten Ways course — the reference implementation. **Do not deviate from this order.** The loop is described in the course itself as:

> *Dissonance → Concept → Witness → Practice → Reflection → Cohort → Integration*

### Section order per core week

| # | Section type (DB) | Source type (course.json) | Sidebar label | Required |
|---|-------------------|--------------------------|---------------|----------|
| 1 | `video` | `video` | "Opening video" | Yes |
| 2 | `chat_dissonance` | `chat-dissonance` | "Dissonance" | Yes |
| 3 | `reading` | `teaching` | *(none)* | Yes |
| 4 | `case_study` | `case-study` | *(none)* | Most weeks |
| 5 | `chat_action` | `chat-action` | "Action step" | Yes |
| 6 | `chat_reflection` | `chat-reflection` | "Reflection" | Yes |
| 7 | `discussion` | `cohort-meeting` | "Cohort meeting" | Yes |
| 8 | `reflection` | `exit-ticket` | "Exit ticket" | Yes |

**Notes on optional/variant elements:**
- Week 2 includes `reframe` and `evidence-bar` types (both ingest as `reading`) between the main teaching and the case study — they set up the imagination shift for the whole course.
- Week 3 includes a `scripture` element between the teaching and the case study, because that week is anchored in "Jesus Is Lord" and the scriptural weight of the Shema belongs in the learning sequence.
- Any week may include a `scripture` element where the week's content demands it — it is not a mandatory slot for every week.
- The case study is labeled "Witness" in the source content. It makes the concept concrete through story.

### What each element does

**Opening Video** (`video`)
- Alan delivers the week's core concept to camera — 5 min max.
- Conversational, direct, invitational. Not a lecture.
- Ends with a question or a statement that creates anticipation.

**Dissonance** (`chat_dissonance`)
- An AI companion conversation that surfaces a tension or assumption before the learner reads the concept.
- Not a quiz. Not a welcome message. A productive disruption.
- Should feel like a question Alan would ask across a table: "You say X — but what about Y?"
- 200–350 words of prompt content for the AI companion.

**Main Teaching / Concept** (`reading`, from `teaching`)
- The core teaching for the week. 2,000–3,500 words.
- Structure: opening hook → framework presentation → scriptural grounding → implications → application preview.
- 2–3 subheadings. 1–2 blockquotes from Alan's books or Scripture.
- Must advance the course's overarching narrative.
- Voice: Alan Hirsch. See the five voice markers below.

**Case Study / Witness** (`case_study`)
- A concrete story or historical example that makes the week's concept real.
- 300–600 words.
- Not a summary of the teaching — a specific narrative that *shows* the concept at work.
- Often drawn from the early church, the Chinese church, or Alan's own ministry story.

**Action Step** (`chat_action`)
- An AI companion conversation that helps the learner name one concrete, time-boxed step for the week.
- Not a to-do list. One step. Named to someone. With a time box.
- 150–250 words of prompt content.

**Reflection** (`chat_reflection`)
- An AI companion conversation *after* the learner has acted. They look back.
- What did they do? What got in the way? What do they want to carry forward?
- 150–250 words of prompt content.

**Cohort Meeting** (`discussion`, from `cohort-meeting`)
- A facilitated group discussion prompt — post + respond structure.
- Share prompt (2–4 sentences), response prompt, and facilitator notes.
- Total: 200–400 words.

**Exit Ticket** (`reflection`, from `exit-ticket`)
- 3 options: journal one sentence, name one commitment, review a key phrase.
- Brief preview of next week.
- 150–250 words.

---

## 4. Week 1 — Introduction & Orientation

Week 1 is not a transformation loop week. It orients the learner and establishes the cohort.

| # | Section type (DB) | Source type | Sidebar label | Role |
|---|-------------------|-------------|---------------|------|
| 1 | `video` | `video` | "Opening video" | Course promise, who this is for, what to expect |
| 2 | `reading` | `info` | *(none)* | Course overview: the 8-week structure, transformation loop, cohort norms |
| 3 | `chat_dissonance` | `chat-dissonance` | "Context discovery" | Baseline context: role, community, hopes — feeds AI personalisation |
| 4 | `looking_ahead` | `looking-ahead` | *(none)* | What happens next; Week 2 preview |

---

## 5. Week 8 — Synthesis & Sending

Week 8 is expanded. It runs the transformation loop, then extends into commissioning.

| # | Section type (DB) | Source type | Sidebar label | Role |
|---|-------------------|-------------|---------------|------|
| 1 | `chat_dissonance` | `chat-dissonance` | "Dissonance" | The tension between "learned it" and "living it" |
| 2 | `reading` | `teaching` | *(none)* | The ecosystem alive — six elements as one system |
| 3 | `case_study` | `case-study` | *(none)* | Witness: synthesis and sending |
| 4 | `chat_action` | `chat-action` | "Action step" | Name the 30/60/90 day plan |
| 5 | `chat_reflection` | `chat-reflection` | "Reflection" | What holds it together |
| 6 | `discussion` | `cohort-meeting` | "Cohort meeting" | Cohort reflection on the ecosystem |
| 7 | `integration` | `integration` | *(none)* | Week 8 commitment — 30/60/90 framework |
| 8 | `video` | `video` | "Sending video" | Alan sends the learner — a charge, not a graduation |
| 9 | `reading` | `teaching` | *(none)* | Synthesis and Sending — the final teaching |
| 10 | `chat_reflection` | `chat-reflection` | "Reflection" | Evidence of change |
| 11 | `field_experiment` | `field` | *(none)* | The 30/60/90 day plan (written deliverable) |
| 12 | `discussion` | `cohort-meeting` | "Commissioning" | Commissioning session |
| 13 | `integration` | `integration` | *(none)* | Final commitment |
| 14 | `lordship_opening` | `devotional` | *(none)* | Sending liturgy (7-movement ritual) |
| 15 | `reflection` | `exit-ticket` | "Exit ticket" | Course close |

---

## 6. The AI Layer (Three Chat Interactions Per Week)

The three chat-type sections are what distinguish this course format. They are not cosmetic. They drive the transformation.

| Role | Type | When | What it does |
|------|------|------|-------------|
| Dissonance | `chat_dissonance` | Before the reading | Surfaces tension. Opens the learner. |
| Action | `chat_action` | After the reading | Lands a concrete step. Personalises to context. |
| Reflection | `chat_reflection` | After action is taken | Integrates experience into insight. |

The AI companion has the week's theme and the learner's context (from Week 1 context discovery). The chat interactions are not FAQ sessions — they are formation conversations.

---

## 7. The Forgotten Ways Course — Weekly Themes

The Forgotten Ways is the **reference implementation** for this course format.

| Week | Theme | Core Concept |
|------|-------|-------------|
| 1 | Introduction & Orientation | Course promise, cohort, Apostolic Genius in one sentence |
| 2 | Apostolic Genius Is Already There | Latency; imagination shift from institution to movement |
| 3 | Jesus-Shaped Gospel | Jesus is Lord; Shema; gospel that is simple and reproducible |
| 4 | Missional-Incarnational Rhythms | Go out + go deep; the six P's; sent as the Father sent |
| 5 | Communitas | Liminality; bond forged in mission and risk; fishbowl vs ocean |
| 6 | APEST as the Equipping Ecology | Fivefold ministry; whole-body APEST; naming the five |
| 7 | Reproducibility and Sending | Code meant to multiply; designing for reproduction; passing it on |
| 8 | Synthesis & Sending | Ecosystem alive; 30/60/90 day plan; commissioning liturgy |

---

## 8. Alan Hirsch's Voice

Write all course content as Alan Hirsch. Five markers — all must be present:

1. **Christocentric anchoring** — Jesus is Lord. Every framework points back to Jesus. Allegiance, obedience, sentness.
2. **Pastoral warmth** — "We" language. Invitational, not prescriptive. "I wonder if..." not "You must..."
3. **Narrative imagery** — Organic metaphors: movement, journey, seeds, fire, rivers. Early church stories. Chinese underground church.
4. **Theological depth** — Grounded in Scripture and tradition. Engages with real theological concepts.
5. **Prophetic intensity** — Reframing questions. Productive dissonance. Calls to risk and obedience. "What if the church has been..."

**Anti-patterns — never use:**
- Corporate consultant tone ("leverage," "optimize," "best practices")
- Detached academic voice ("Research suggests...")
- Antithesis patterns ("Not X, but Y") — use additive, forward-building language
- Bullet-point lists as primary content — use prose with embedded structure
- Generic motivational language ("You've got this!")

---

## 9. Content Specifications

| Element | Word count | Notes |
|---------|-----------|-------|
| Opening video script | 600–900 words (~5 min) | Conversational; ends with question or anticipation |
| Dissonance prompt | 200–350 words | Two angles: the tension statement + the question |
| Main teaching | 2,000–3,500 words | 2–3 subheadings; 1–2 blockquotes |
| Case study | 300–600 words | One specific story; concrete detail |
| Action step prompt | 150–250 words | One step; one time box; one person to tell |
| Reflection prompt | 150–250 words | Look back; what changed; carry forward |
| Cohort meeting | 200–400 words | Share prompt + response prompt + facilitator notes |
| Exit ticket | 150–250 words | Three options; next week preview |

---

## 10. Course-to-Portal Relationship

| Course | Portal | Relationship |
|--------|--------|-------------|
| The Forgotten Ways | Forgotten Ways / mDNA | Course is the formation journey; portal is the reference library |
| mDNA Primer (future) | mDNA | Shorter primer format; same transformation loop |

Portals surface the framework. Courses walk people through change. A learner might read the portal first, then take the course — or take the course and return to the portal as a reference.

---

## 11. What to Ignore

The following appear in older documentation and **do not reflect the actual course format**:

- **M.N.X element naming** (M.N.1 through M.N.14) — this numbering scheme was a planning convention, never the actual structure.
- **Lordship Opening / Lordship Closing** as recurring weekly slots — these appear only in the Week 8 sending liturgy, as a `devotional` type, not as a weekly frame.
- **Anchor Scripture** as a mandatory weekly slot — scripture appears in Week 3 because the week's theme demands it, not as a fixed position in every week's loop.
- **Practical Exercise** / **Field Experiment** as regular core-week sections — practical action happens through the AI-powered `chat_action` and `field_experiment` (Week 8 only) sections.
- **Resource Blurb** as a regular slot — supplemental resources are embedded in the main teaching content, not a separate section.
- **14-section core week layout** from the old scaffold skill — the actual core week has 8 sections.

The source of truth for module order is the Forgotten Ways course.json at:
`/Users/joshuashepherd/Desktop/dev/repos/forgotten-ways-course/editor/data/course.json`
