# Movemental Transformative Course Strategy — Comprehensive Overview

**Status:** Canonical synthesis (June 2026)  
**Audience:** Product, engineering, content authors, movement leaders, and facilitators  
**Purpose:** Single reference for how Movemental approaches courses — pedagogy, architecture, content types, migration, implementation, and operational workflow.

This document consolidates strategy from the **alan-hirsch** reference tenant (implementation + engineering SSoT), **movemental-ai** (platform narrative, author residency, benchmarks), and **movement-leader-websites** (shared schema propagated to all leader tenants).

---

## Executive summary

Movemental courses are **formation products**, not information products. The thesis is explicit:

> Most online courses transfer information. Movemental courses form people.

That distinction is load-bearing. Formation changes who we are (heart, mind, practice). Information changes what we know. Movemental encodes formation into **software structure** so the platform cannot easily revert to lecture-and-quiz mode.

Every course follows a **fixed 8-week scaffold** (implemented as **9 data slots: Week 0 through Week 8**). Each core week runs the **Four Necessities** — Dissonance, Action, Reflection, Community — in a canonical sequence. Content is authored in **29+ section types** (M.N.X file layout), ingested into a shared database, and rendered by a dedicated learn experience with **in-lesson AI formation conversations**.

**Portals** (Reframation, Metanoia, mDNA, Movement Intelligence, The Forgotten Ways) are the **information layer**. **Courses** are the **transformation layer**. One course maps to each portal theme; the recommended journey is Reframation → Metanoia → mDNA → mX → The Forgotten Ways.

---

## 1. The thesis and strategic bet

### 1.1 Formation over information

| Layer | Product | Purpose |
|-------|---------|---------|
| **Information** | Portals | Discover, browse, orient — articles, books, videos, fit-checks |
| **Transformation** | Courses | Change who people are through structured cohort formation |

Portals help someone find what to read. Courses change who they become.

### 1.2 The question Movemental is answering

**Can you make formation scalable without making it shallow?**

The answer is conditional: yes — but only if the right conditions are built into structure itself, and the platform refuses to compromise them for convenience, speed, or scale.

### 1.3 What Movemental explicitly rejects

| Rejected model | Why |
|----------------|-----|
| MOOC (watch video, take quiz) | Tests retention, not formation |
| Gamification (badges, streaks, leaderboards) | Extrinsic motivation undermines becoming |
| Self-paced isolation | Community is non-negotiable |
| Progress-bar consumption | Completing a section ≠ being formed by it |
| Classroom-only design | Field experiments in real contexts are required |
| Personalization to "limiting factors" | Dissonance is intentional; comfort adaptation undermines liminality |
| Variable structure | Uniform 8-week scaffold is a feature, not a constraint |

### 1.4 Course watermark

Used throughout all course content:

> "We learn this to follow Jesus more deeply and join his mission more faithfully."

---

## 2. The Four Necessities (charter)

Every Movemental course must support **all four**. If any one is missing, the course reverts to information transfer.

### 2.1 Dissonance

Productive discomfort that disrupts assumptions. Every session opens here — not hostility, but invitation into **liminality**: "What if the way you were taught to see this is incomplete?"

**Non-negotiable:** At least one reframing question or tension per session.

**Implementation:** `lordship_opening`, `chat_dissonance`, `scripture`, reframing in main reading.

### 2.2 Action

Real-world field experiments in the learner's actual context — not hypotheticals about someone else.

**Non-negotiable:** 1–2 field experiments in the majority of modules; practical exercises alongside; observable evidence of engagement.

**Implementation:** `field_experiment`, `practical_exercise`, `chat_action`.

### 2.3 Reflection

Processing, integration, journaling, post-action synthesis. Questions are **synthesis**, not comprehension checks ("What did Alan say?" → "How does this challenge what you assumed about leadership?").

**Non-negotiable:** **6–8 reflection questions per core module.** No exceptions in charter docs.

**Implementation:** `reflection` (with normalized `reflection_questions`), `chat_reflection`, `exit_ticket`.

### 2.4 Community

Cohort-based learning with structured discussion rhythm. Not optional.

**Non-negotiable:** Community onboarding in Week 0; cohort discussion every week; **E/E/E/J rhythm** (Explore → Evaluate → Employ → Journal).

**Implementation:** `discussion`, `cohort_session`, cohort pages, live sessions.

### 2.5 The transformation scaffold

Every session moves through:

```
Dissonance → Action → Reflection → Community
```

This is the structural spine — not a suggestion. The scaffold ensures formation conditions are present every week.

### 2.6 The Weekly Engine (marketing layer)

On course landing pages, Movemental describes a **7-step pedagogical loop** that maps to the Four Necessities for public communication:

| Step | Role |
|------|------|
| Dissonance | Jarring encounter with missional reality |
| Concept | Theology addressing the disruption |
| Witness | Observing the concept lived out |
| Practice | Direct action in the learner's context |
| Reflection | Theological processing of experience |
| Cohort Learning | Shared insights and mutual accountability |
| Integration | Anchoring the new rhythm into daily life |

Source: `alan-hirsch/src/lib/content/courses/course-landing-marketing-defaults.ts`

---

## 3. Pedagogical foundation

### 3.1 Liminality

The in-between state when old frameworks no longer hold and new ones have not solidified. Formation happens here — not in comfort or mastery. Courses intentionally create liminal conditions through dissonance, field experiments, and reflection that resists easy answers.

### 3.2 Communitas

Deep bond forged through shared liminal experience — threshold, risk, shared mission. Not comfort-first community or small talk. Movemental courses aim to produce a band of disciples on mission together.

### 3.3 Christocentric spine

Theological load-bearing wall running through every portal and course:

- **Core confession:** Jesus is Lord; Kingdom is the horizon
- **Allegiance:** Lived loyalty to King Jesus, not beliefs alone
- **Gospel fullness:** Cross + resurrection + Kingdom + Spirit held together
- **Obedience:** Practices where learners actually do what Jesus says
- **Communal formation:** Body learns together; APEST activated in community
- **Sentness:** Formed for mission — courses end with **commissioning**, not just completion

### 3.4 Voice (Alan Hirsch reference implementation)

Course content for the flagship tenant is written as Alan Hirsch with five voice markers:

| Marker | Character |
|--------|-----------|
| Christocentric anchoring | Jesus as foundation, not afterthought |
| Pastoral warmth | "We" language; invitational |
| Narrative imagery | Organic metaphors — movement, seeds, fire, DNA |
| Theological depth | Scripture and tradition, not pop theology |
| Prophetic intensity | Reframing questions; calls to risk and obedience |

**Anti-patterns:** Corporate consultant, detached academic, antithesis-as-primary-move, generic motivational.

For other movement leaders, the same structural playbook applies; voice markers are tenant-specific.

---

## 4. The 8-week course architecture

### 4.1 Week numbering: marketing vs. data model

| Convention | Meaning |
|------------|---------|
| **"8 weeks"** (marketing) | Core formation journey learners expect (~2–3 hours/week) |
| **Week 0–8** (database) | 9 slots: intro + 6 core + integration + closing |
| **"9 weeks with Week 0"** | Precise internal description |

### 4.2 Week roles

| Index | Label | Role | Key elements |
|-------|-------|------|--------------|
| **0** | Introduction & Assessment | Orient, onboard cohort | Welcome video (5–10 min); course philosophy (1,000–1,500 words); baseline assessment; getting-started exercises; 3–5 reflection questions; community onboarding ("Introduce yourself") |
| **1–6** | Core modules | Full transformation scaffold each week | See §4.3 |
| **4** | Core + mid-course | Standard module **plus** mid-course assessment | Formation progress diagnostic |
| **7** | Integration & Synthesis | Connect the arc | Integration video (10–15 min); synthesis reading (3,000–4,000 words); 8–10 reflection questions; application planning |
| **8** | Closing & Commissioning | Send, don't just complete | Closing video; journey reflection (2,000–3,000 words); final assessment; commissioning ceremony; multiplication mindset |

### 4.3 Core week sequence (Weeks 1–6)

Canonical order from strategy docs and ingestion scripts:

| Order | Component | `section_type` | Parameters |
|-------|-----------|----------------|------------|
| 1 | Lordship Opening | `lordship_opening` | 150–250 words; teaching + questions + prayer |
| 2 | Main teaching | `video` + `reading` | Video 5–10 min; reading 2,500–3,500 words |
| 3 | Anchor Scripture | `scripture` | Passage + 150–250 words teaching |
| 4 | Reflection | `reflection` | **6–8 questions** (non-negotiable) |
| 5 | Practical exercises | `practical_exercise` | 2–3 exercises |
| 6 | Field experiments | `field_experiment` | 1–2 with objective, steps, evidence, post-action reflection |
| 7 | Cohort discussion | `discussion` / `cohort_session` | 2–3 prompts; E/E/E/J for cohort sessions |
| 8 | Integration | `integration` | Cross-element connection (50–100 words per link) |
| 9 | Lordship Closing | `lordship_closing` | Recap + commitment + blessing + prayer |
| 10 | Looking Ahead | `looking_ahead` | Preview next week (100–200 words) |
| 11 | Resources | `resource_blurb` | Recommended reading |
| 12 | Formation Companion context | `action` | M.N.15 — theme summary + starter questions for AI |

### 4.4 Main reading structure (2,500–3,500 words)

| Section | Words | Purpose |
|---------|-------|---------|
| Introduction | 200–300 | Overview; link to previous week |
| Framework foundation | 600–800 | Core concepts; theological grounding |
| Practical application | 600–800 | Implementation; tools |
| Case studies | 400–600 | Real-world examples |
| Integration | 400–600 | Connection to other frameworks |
| Conclusion | 200–300 | Takeaways; bridge to next week |

### 4.5 Forgotten Ways — reference implementation weekly themes

The Forgotten Ways is the **capstone course** and reference implementation (`slug: forgotten-ways`):

| Week | Theme |
|------|-------|
| 0 | Introduction — apostolic genius as latent potential; community onboarding |
| 1 | Apostolic Genius Is Already There |
| 2 | Jesus-Shaped Gospel |
| 3 | Missional-Incarnational Rhythms |
| 4 | Communitas (+ mid-course assessment) |
| 5 | APEST as the Equipping Ecology |
| 6 | Reproducibility and Sending |
| 7 | Integration & Synthesis |
| 8 | Closing & Commissioning |

**Forgotten Ways AI extension (Weeks 2–7):** Three chat sections per week in addition to M.N.15:

1. `chat_dissonance` — before teaching  
2. `chat_action` — after teaching  
3. `chat_reflection` — after field practice  

Week 1 adds `context_discovery` (profile form) before agent conversations. Week 8 adds extended reflection and 30/60/90-day action horizons.

---

## 5. Section types and content architecture

### 5.1 Canonical `section_type` enum

Defined in `src/lib/schemas/course-learn.ts` (shared across alan-hirsch and movement-leader-websites tenants):

| `section_type` | UI role | React component |
|----------------|---------|-----------------|
| `lordship_opening` | Opening devotional | `DevotionalSection` |
| `lordship_closing` | Closing devotional | `DevotionalSection` |
| `reading` | Main teaching | `ReadingSection` |
| `video` | Module / welcome video | `VideoSection` |
| `welcome` | Week 0 welcome | `VideoSection` |
| `scripture` | Anchor passage | `AnchorScriptureSection` |
| `reflection` | Reflection questions | `ReflectionSection` |
| `practical_exercise` | Exercises | `PracticalExerciseSection` |
| `field_experiment` | Real-world experiments | `FieldExperimentSection` |
| `discussion` | Discussion prompts | `DiscussionPromptsSection` |
| `cohort_session` | Cohort E/E/E/J session | `DiscussionPromptsSection` |
| `integration` | Cross-element synthesis | `IntegrationSection` |
| `looking_ahead` | Next-week preview | `LookingAheadSection` |
| `journey_continues` | Closing transition | `JourneyContinuesSection` |
| `resource_blurb` | Recommended reading | `ResourceBlurbSection` |
| `action` | Formation Companion agent context (M.N.15) | `ActionSection` |
| `assessment` | Baseline / mid / final | `AssessmentSection` |
| `commissioning` | Sending ceremony | `JourneyContinuesSection` |
| `post_course` | Post-course guide | `ReadingSection` |
| `case_study` | Narrative case study | `CaseStudySection` |
| `guided_practice` | Examen, Lectio Divina, etc. | `GuidedPracticeSection` |
| `chat_dissonance` | AI dissonance conversation CTA | `ChatCtaSection` |
| `chat_action` | AI action conversation CTA | `ChatCtaSection` |
| `chat_reflection` | AI reflection conversation CTA | `ChatCtaSection` |
| `context_discovery` | Week 1 profile / context form | `CourseContextIntroSection` |
| `exit_ticket` | Week exit synthesis | `ExitTicketSection` |
| `covenant` | Cohort covenant | `CourseCovenantSection` |
| `transition` | Week transition copy | `CourseTransitionSection` |
| `week_closing` | Week 8 special full-page close | `CourseWeek8ClosingView` |

**Terminology note:** In the database, `course_lessons` rows are **sections** (not traditional "lessons"). Navigation uses `?week=N&section={slug}`.

### 5.2 M.N.X authoring file layout

Source content lives in `content-library/courses/[course-slug]/` with predictable filenames:

| Code | Element | `section_type` | Example filename |
|------|---------|----------------|------------------|
| M.N.1 | Lordship Opening | `lordship_opening` | `M1.1-lordship-opening.md` |
| M.N.2 | Main Reading | `reading` | `M1.2-main-reading.md` |
| M.N.3 | Video Script | `video` | `M1.3-video-script.md` |
| M.N.4 | Anchor Scripture | `scripture` | `M1.4-anchor-scripture.md` |
| M.N.5 | Reflection Questions | `reflection` | `M1.5-reflection-questions.md` |
| M.N.6 | Practical Exercises | `practical_exercise` | `M1.6-practical-exercises.md` |
| M.N.7 | Field Experiments | `field_experiment` | `M1.7-field-experiments.md` |
| M.N.8 | Discussion Prompts | `discussion` | `M1.8-discussion-prompts.md` |
| M.N.9 | Cohort Session Prompts | `cohort_session` | `M1.9-cohort-session-prompts.md` |
| M.N.10 | Integration Copy | `integration` | `M1.10-integration-copy.md` |
| M.N.11 | Lordship Closing | `lordship_closing` | `M1.11-lordship-closing.md` |
| M.N.12 | Looking Ahead | `looking_ahead` | `M1.12-looking-ahead.md` |
| M.N.14 | Resource Blurb | `resource_blurb` | `M1.14-resource-blurb.md` |
| M.N.15 | Formation Companion Context | `action` | `M1.15-agent-context.md` |

Week 0, 7, and 8 have dedicated W0/W7/W8 element prompts in the playbook.

### 5.3 Child data (normalized tables)

Structured blocks attach to sections via foreign keys:

- `reflection_questions` — question, type, guidance, block_order
- `discussion_prompts` — title, prompt, prompt_type
- `exercises` — instructions, purpose, estimated_time, deliverables
- `field_experiments` — objectives, steps, evidence, reflection (also section-level)
- `assessment_checkpoints` + `checkpoint_questions` — graded quizzes (LMS-03; scoring partially wired)

The data model **enforces** formation elements as first-class entities, not optional text fields.

---

## 6. Formation Companion (AI in the course flow)

### 6.1 Purpose

Three AI-powered chat interactions per week distinguish Movemental from neutral LMS platforms. These are **formation conversations**, not FAQ or content summaries.

| Touchpoint | When | Purpose |
|-----------|------|---------|
| **Dissonance** | Before reading | Surface tension; create liminal conditions |
| **Action** | After reading | Land a concrete step personalized to context |
| **Reflection** | After action | Integrate field experience into insight |

### 6.2 Design principles

- **Chat-in-unit:** Conversation lives inside the course section flow, not a separate page
- **Week-specific context:** M.N.15 agent context + week theme passed to the model
- **Learner context (Week 1+):** `context_discovery` captures role, city, ministry setting, gifting — personalizes later conversations
- **Voice fidelity:** Speaks in the movement leader's voice (Christocentric, pastoral, prophetic)
- **Not a tutor:** Does not quiz or summarize; asks reframing questions, pushes toward practice

### 6.3 CourseContext shape (API)

```typescript
interface CourseContext {
  conversationType: "chat-dissonance" | "chat-action" | "chat-reflection" | "chat-introduction";
  courseSlug: string;
  weekNumber: number;
  weekTitle: string;
  lessonTitle: string;
  mDnaElement: string | null;
  sectionContent: string | null;
  priorActionCommitment: string | null;
}
```

Built by `alan-hirsch/src/lib/ai-lab/build-course-context.ts` and injected into the AI Lab chat route when embedded course chat is active.

---

## 7. Five portals and course catalog

### 7.1 Portal map (information layer)

| Portal | Opens |
|--------|-------|
| **Reframation** | Capacity to see God, world, and Church truthfully again |
| **Metanoia** | Deep repentance and heart renovation |
| **mDNA** | Genetics of Jesus-shaped ecclesia |
| **Movement Intelligence (mX)** | Thinking and acting like a movement in cultural weather |
| **The Forgotten Ways** | Apostolic genius as integrated ecosystem (capstone) |

**Recommended sequence:** Reframation → Metanoia → mDNA → mX → The Forgotten Ways

One **transformation course** exists per portal theme. Portal Cards are 1–2 page doorway pages (fit-check, first-step practice) — not enrollable journeys.

### 7.2 Course catalog status (alan-hirsch migration)

| Course slug | Status | Content source |
|-------------|--------|----------------|
| `forgotten-ways` | Reference / live | `forgotten-ways-course/editor/data/course.json` |
| `mdna` (primer) | Ingestion-ready | `content-library/courses/mdna/` |
| `metanoia`, `reframation`, `movement-intelligence` | Partial week content | `alan-hirsch-html/_docs/reaped/courses/` |
| `apest-fivefold-ministry`, `jesus-is-lord-mdna`, `discipleship-disciple-making`, `missional-incarnational-impulse`, `apest-culture`, `organic-systems`, `liminality-communitas` | Draft stubs | Reaped condensed docs + generic week scaffolding |

---

## 8. Content migration and ingestion pipelines

Movemental migrated legacy and authored content through **three ingestion pipelines** in alan-hirsch. All normalize to the same Week 0–8 + `section_type` model.

### 8.1 Pipeline A — Forgotten Ways (reference)

- **Script:** `alan-hirsch/scripts/ingest-forgotten-ways-course.ts`
- **Source:** `../forgotten-ways-course/editor/data/course.json`
- **Shape:** `{ courseTitle, weeks: [{ id, title, lessons: [{ id, title, type, body }] }] }`
- **Behavior:** Deletes existing weeks/lessons for slug `forgotten-ways`, re-inserts, sets `duration_weeks = 8`

### 8.2 Pipeline B — mDNA Primer (M.N.X markdown)

- **Script:** `alan-hirsch/scripts/ingest-mdna-course.ts`
- **Source:** `content-library/courses/mdna/week-N-*/`
- **Behavior:** Maps 14 standard files per core week via `STANDARD_M_FILES`; markdown → HTML via `marked`

### 8.3 Pipeline C — Reaped content (bulk migration)

- **Script:** `alan-hirsch/scripts/ingest-reaped-content.ts`
- **Source:** `alan-hirsch-html/_docs/reaped/courses/` + `articles/`

**Phases:**

1. Create 7 draft course rows from condensed `.md` course docs  
2. Create 8 `course_weeks` per course from generic week titles  
3. Ingest per-week `.md` files for metanoia, movement-intelligence, reframation (`inferSectionType()` from filename)  
4. Condensed course docs → 8 week stub lessons + documentation lesson  
5. ~70 pillar articles → `content_items`  

**Filename inference examples:** `module-introduction`, `teaching`, `reflection-questions`, `field-experiments`, `discussion-prompts`, `case-study`, `assessment`

### 8.4 Editor type → database type mapping (Forgotten Ways JSON)

Migration maps hyphenated editor types to canonical `section_type`:

| Editor / legacy type | Normalized `section_type` |
|---------------------|---------------------------|
| `chat-dissonance` | `chat_dissonance` |
| `chat-action` | `chat_action` |
| `chat-reflection` | `chat_reflection` |
| `teaching`, `info`, `reframe`, `evidence-bar` | `reading` |
| `devotional` | `lordship_opening` |
| `field`, `field-experiment` | `field_experiment` |
| `exit-ticket` | `reflection` |
| `cohort-meeting`, `cohort-session` | `cohort_session` |
| `context-discovery` | `context_discovery` |
| `case-study` | `case_study` |
| `guided-practice` | `guided_practice` |
| `post-course` | `post_course` |

### 8.5 Cleanup

`delete-all-courses.ts` wipes course data before re-ingestion to the opinionated 8-week structure.

### 8.6 HTML sanitization package

`alan-hirsch/packages/course-content` provides shared utilities (`sanitizeCourseLessonHtml`, preview tokens, CSS class `movemental-course-lesson-html`) — **not** the content store itself.

---

## 9. Data model and platform implementation

### 9.1 Hierarchy

```
courses
└── course_weeks (week_number, order_index, title, theme, objectives, slug)
    └── course_lessons (= sections: section_type, section_order, content, video_url)
        ├── reflection_questions
        ├── discussion_prompts
        └── exercises

field_experiments
cohorts → cohort_sessions → cohort_discussion_messages
course_enrollments → lesson_progress
course_drip_schedules, course_progression_rules, course_prerequisites (schema-ready)
```

Shared schema is propagated to all **movement-leader-websites** tenants via `src/lib/database/schema.ts`.

### 9.2 Learn experience routes

| Route | Purpose |
|-------|---------|
| `/courses` | Course library |
| `/courses/[slug]` | Landing / detail |
| `/courses/[slug]/learn?week=N&section=slug` | Formation journey (sidebar + section dispatcher) |
| `/courses/[slug]/enroll` | Enrollment + Stripe checkout |
| `/courses/[slug]/cohort` | Schedule, discussion, facilitator |
| `/courses/[slug]/resources` | Glossary, bibliography, downloads |
| `/courses/[slug]/overview` | Hub tabs (Overview, Learn, Cohort, Resources) |
| `/account/learning?course={slug}` | Learner progress |

**Note:** Engineering docs sometimes reference `/content/courses/*`; live alan-hirsch routes use `/courses/*`.

### 9.3 Multi-repo platform architecture

| Piece | Repo | Role |
|-------|------|------|
| **Delivery app** | `alan-hirsch`, `movement-leader-websites/*` | Learner-facing course player, AI chat, checkout |
| **Authoring dashboard** | `movemental-visual-editor` | Tiptap editor, media library, course/week/section CRUD, AI sidebar |
| **Platform / ops** | `movemental-ai` | Marketing, author residency docs, simplified course API hooks, benchmarks |
| **Content repos** | `content-library`, `forgotten-ways-course`, `alan-hirsch-html` | Source markdown/JSON (external to tenant apps) |

Courses are **included** in the Movemental platform build ($1,000 + 10% revenue share model); migration from Thinkific or other LMS is **optional** (see `movemental-ai/docs/build/strategy/movemental-vs-thinkific-course-platform-benchmark.md`).

### 9.4 Implementation status (honest, June 2026)

| Capability | Status |
|------------|--------|
| Learn loop + section components (29 types) | **Built and working** |
| Formation Companion AI (dissonance/action/reflection) | **Built and working** |
| Stripe enrollment / access gating | **Working** |
| Learner progress tracking | **Working** |
| Live cohort discussion board | Schema exists; UI partially placeholder |
| Certificate auto-issuance | Schema-ready; not fully wired |
| Graded assessments / gating-on-score | Partial (LMS-03 schema; UI incomplete) |
| Drip schedules & prerequisites | Schema-ready; rules not enforced |
| Instructor/cohort analytics | Stubbed |
| Native video hosting | BYO URL (YouTube/Vimeo); no CDN |
| Drag-and-drop week/lesson reorder | Not built |

---

## 10. How Movemental builds courses (author workflow)

Courses are not only consumed — they are **authored during the four-week author residency** (also called "onbuilding" or "integration build" in ops docs).

### 10.1 Author residency Week 3 deliverables

From `docs/articles/07-author-onboarding-course-outline.md` (published on movemental.ai) and `docs/build/notes/onbuilding-4-week-course-SSOT.md`:

- 8-week course **outline** aligned to this scaffold  
- **One full core week** drafted (typically Week 2 module)  
- AI **dissonance prompts** for weeks 2–4  
- Optional assessment concept  
- Course thesis statement  

### 10.2 Content system build charter (org/tenant)

Week 3–4 of the content system build expects:

- Week 3: 8-week course **scaffolded**; first article wave  
- Week 4: At least one transformational course **live**; pathways per theme  

### 10.3 Authoring skills and validation

| Skill / tool | Role |
|--------------|------|
| `/course-scaffold` | Create Week 0–8 structure |
| `/course-author` | Draft M.N.X elements in leader voice |
| `/course-ingest` | Run ingestion scripts |
| `/course-validate` | Charter compliance check (Four Necessities, section completeness, word counts) |
| `/course-audit` | Learn UX / code quality |
| `/course-ux` | Pedagogical rhythm audit |

The `course-validate` skill checks structure, Four Necessities per week, M.N.X completeness, content quality bands, and exclusions (no mDNA assessment in flow, no "adapted to your level" copy).

**Known validation tension:** The validate skill text says "no Week 0" in one check while the playbook and data model use Week 0 as Introduction. Treat **Week 0 as canonical** per engineering SSoT; validation skill may need alignment.

### 10.4 Generation workflow

1. Load course-specific prompt from content-library (`OPINIONATED_COURSE_CONTENT_GENERATION_MASTER_PROMPT.md`)  
2. Apply voice + corpus context (Part I–II)  
3. Generate each M.N.1–M.N.15 element (Part III)  
4. Human edit and sign-off (no auto-publish per content charter)  
5. Ingest → validate → publish  

---

## 11. User journey (learner)

```
Browse (/courses)
  → Evaluate (/courses/[slug] — curriculum, pedagogy, pricing)
  → Enroll (/courses/[slug]/enroll — sign-in, Stripe if paid)
  → Learn (/courses/[slug]/learn — sidebar, sections, AI chat, progress)
  → Cohort (/courses/[slug]/cohort — live sessions, E/E/E/J discussion)
  → Resources (/courses/[slug]/resources — glossary, bibliography)
  → Commissioning (Week 8 — sending, not just certificate)
```

**Cohort cadence:** Weekly 90-minute live sessions with facilitator; maximum engagement through breakout groups and local field application.

**Pricing example (Forgotten Ways landing):** Individual ~$495 (8-week facilitated transformation); Leader License ~$1,850/yr (5 concurrent leaders + facilitator training).

---

## 12. Charter compliance checklist

Before shipping or approving any course:

- [ ] All four necessities present in every core module  
- [ ] 6–8 reflection questions per core module  
- [ ] 1–2 field experiments in majority of modules  
- [ ] Week 0 community onboarding  
- [ ] Cohort discussion with E/E/E/J every week  
- [ ] Week 0 (intro), Week 7 (integration), Week 8 (closing + commissioning)  
- [ ] Section types match canonical list  
- [ ] Christocentric spine throughout  
- [ ] Formation Companion touchpoints (dissonance, action, reflection)  
- [ ] Voice markers present (tenant-specific)  
- [ ] No anti-patterns (gamification, MOOC-only, self-paced isolation, classroom-only)  
- [ ] Watermark used throughout  
- [ ] Course ends with commissioning and sending  

Run `/course-validate [slug]` against live DB or source markdown before publish.

---

## 13. Relationship to pathways and articles

Movemental's **three-layer formation stack** for movement leaders:

| Layer | Product | Architecture |
|-------|---------|--------------|
| **Articles** | Information / discovery | Nine-section evergreen pillar–cluster (Tier 1–3) |
| **Pathways** | Integration hub | 12-section primary pathway connecting themes |
| **Courses** | Transformation | 8-week scaffold (this document) |

The author residency produces all three in four weeks: full article map (Week 2), course scaffold + one full week (Week 3), 12-section pathway (Week 4).

Articles **orient**. Pathways **integrate**. Courses **form**.

---

## 14. Epistemic note: formation claims vs. evidence

Movemental's formation-vs-information distinction is **conceptually sound** and aligned with transformative learning theory and theological formation traditions (`docs/articles/graded-high/80-84/06-formation-vs-information.md`).

What peer-reviewed literature does **not** provide is proof that "8 weeks + Four Necessities + this exact section list = optimal transformation." The honest position is **aspirational realism**: the scaffold is coherent, differentiated from library-style faith-tech, and **testable**. Outcome instrumentation (practice transfer, not just completion) is the work ahead.

---

## 15. Source document index

### Engineering SSoT (alan-hirsch)

| Document | Path |
|----------|------|
| Course Strategy (vision) | `alan-hirsch/_docs/_public/proposals/vision/COURSE_STRATEGY.md` |
| Courses SSoT | `alan-hirsch/_docs/_build/engineering/COURSES_SOURCE_OF_TRUTH.md` |
| Transformational Course Charter | `alan-hirsch/_docs/_build/engineering/TRANSFORMATIONAL_COURSE_CHARTER.md` |
| Transformational Course Playbook | `alan-hirsch/_docs/_build/engineering/TRANSFORMATIONAL_COURSE_PLAYBOOK.md` |
| Section types spec | `alan-hirsch/_docs/_build/agents/writing_assistant/vector_store/02-COURSE_STRUCTURE_AND_SECTION_TYPES.md` |
| Section types (code) | `alan-hirsch/src/lib/schemas/course-learn.ts` |
| Section dispatcher | `alan-hirsch/src/components/courses/sections/SectionContent.tsx` |

### Platform narrative (movemental-ai)

| Document | Path |
|----------|------|
| Thinkific benchmark | `movemental-ai/docs/build/strategy/movemental-vs-thinkific-course-platform-benchmark.md` |
| Author residency / onbuilding | `movemental-ai/docs/build/notes/onbuilding-4-week-course-SSOT.md` |
| Author onboarding course | `movemental-ai/docs/articles/07-author-onboarding-course-outline.md` (published slug) |
| Author content process synthesis | `movemental-ai/docs/build/guides/movement-leader-author-content-process-synthesis.md` |
| Formation vs information (research) | `movemental-ai/docs/articles/graded-high/80-84/06-formation-vs-information.md` |

### Ingestion scripts (alan-hirsch)

| Script | Path |
|--------|------|
| Forgotten Ways | `alan-hirsch/scripts/ingest-forgotten-ways-course.ts` |
| mDNA primer | `alan-hirsch/scripts/ingest-mdna-course.ts` |
| Reaped bulk migration | `alan-hirsch/scripts/ingest-reaped-content.ts` |

### Skills (alan-hirsch)

| Skill | Path |
|-------|------|
| course-validate | `alan-hirsch/.claude/skills/course-validate/SKILL.md` |
| course-ingest | `alan-hirsch/.claude/skills/course-ingest/SKILL.md` |
| course-ux | `alan-hirsch/.claude/skills/course-ux/SKILL.md` |

---

## 16. Known documentation drift (resolve in PRs)

| Topic | Drift |
|-------|-------|
| Routes | Docs: `/content/courses/*` vs app: `/courses/*` |
| Course slug | Some prompts: `the-forgotten-ways` vs tenant: `forgotten-ways` |
| Week count | Marketing "8 weeks" vs DB Week 0–8 vs validate skill "no Week 0" |
| Playbook duration | Playbook mentions "6-week (recommended) or 8-week" in one table; charter standard is **8-week** |
| Charter paths | Strategy doc references `_docs/TRANSFORMATIONAL_COURSE_CHARTER.md` at repo root; actual path is `_docs/_build/engineering/` |

When in conflict, prefer **`COURSES_SOURCE_OF_TRUTH.md`** and **`COURSE_STRATEGY.md`** for product/design, and **`course-learn.ts` + ingestion scripts** for implementation truth.

---

*Last synthesized: June 30, 2026. Update this file when charter, section types, or ingestion pipelines change.*
