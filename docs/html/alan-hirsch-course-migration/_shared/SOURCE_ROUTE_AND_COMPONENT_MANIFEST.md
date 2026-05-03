# Alan Hirsch → Movemental — Source Route and Component Manifest

**Scope.** This manifest is the complete inventory of user-facing routes, layouts, components, and states in the sibling repo `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch` that belong to **The Forgotten Ways** course and to **course-related** product surfaces (catalog, enrollment, checkout, learn experience, section renderers, progress, certificate, cohort, resources, journal, auxiliary account/dashboard chrome).

**Role.** It is the contract against which the static HTML migration under `docs/html/alan-hirsch-course-migration/` will be judged. If a row below has no mapped HTML file or documented exclusion, the migration is incomplete (Phase F, §F.1 of the migration prompt).

**Classifications.** `FW-CORE` = The Forgotten Ways course only. `COURSE-GLOBAL` = shared course shell used by FW and any future course. `COURSE-AUX` = account, billing, certificates reached via course flows. `MARKETING-OVERLAP` = external pages that embed course blocks (excluded unless listed explicitly).

**Last compiled:** 2026-04-19 (Claude Code, Opus 4.7 1M).

---

## 1. Repo facts

- **Framework.** Next.js 15.1.3, App Router.
- **Route groups.** `(public)` — user-facing; `(admin)` — content management (**out of scope** for this migration).
- **Auth pattern.** `useRequireAuth()` (Supabase SSR) on account-gated pages; soft enrollment check on `/courses/[slug]/learn`.
- **Styling.** Tailwind v4, `next-themes`, CSS custom-property tokens aligned to Movemental's semantic ramp. Fonts loaded in `layout.tsx`: Newsreader (heading, serif), Manrope (body), JetBrains Mono. *Static migration will substitute Inter (per `DESIGN.md` §5) since the Movemental side standardizes on Inter.*
- **State management.** TanStack Query for reads; form state via `react-hook-form` + zod; motion via `motion` library.
- **Static scope carrier.** `/courses/[slug]` where `slug=forgotten-ways` is the only FW surface — other course slugs share the same components.

---

## 2. Route manifest (complete)

Columns: `route_pattern | classification | auth | app_files | primary_components | states | output_html`.

| route_pattern | classification | auth | app_files | primary_components | states | output_html |
| --- | --- | --- | --- | --- | --- | --- |
| `/courses` | COURSE-GLOBAL | public | `src/app/(public)/courses/page.tsx`, `CoursesClient.tsx` | CoursesClient, CourseDarkCard, useCoursesList | default, loading, empty, error | `course-platform/catalog.html`, `…catalog--loading.html`, `…catalog--empty.html`, `…catalog--error.html` |
| `/courses/[slug]` | FW-CORE | public | `…/[slug]/page.tsx`, `…/[slug]/layout.tsx` | CourseHeroSection, CourseWeekArcSection, CourseWeeklyEngineSection, CourseQuoteSection, CourseImmersionSection, CoursePricingSection, IntakeContextBanner | default, loading, not-found | `forgotten-ways/index.html`, `forgotten-ways/index--loading.html`, `forgotten-ways/index--not-found.html` |
| `/courses/[slug]/overview` | COURSE-AUX | public | `…/overview/page.tsx` | CourseOverviewPageClient, CourseOverviewContent | default | `forgotten-ways/overview.html` |
| `/courses/[slug]/enroll` | COURSE-AUX | public | `…/enroll/page.tsx` | CourseEnrollForm, resolveStorageUrl | default, loading, not-found | `forgotten-ways/enroll.html`, `forgotten-ways/enroll--loading.html`, `forgotten-ways/enroll--not-found.html` |
| `/courses/[slug]/learn` | FW-CORE | soft (enrollment check) | `…/learn/page.tsx` | CourseLearnLayout, CourseLearnSidebar, CourseTopbar, LessonPanel, LessonContent, LessonTabs, LessonPanelFooter, CourseWeek8ClosingView, CaptureInsightModal, CourseCompleteModal, CourseAIDrawer, FloatingAiEntryFab | default, loading, error, empty, locked, week-closing, 404, mobile-drawer | `forgotten-ways/learn.html`, `…learn--loading.html`, `…learn--error.html`, `…learn--empty.html`, `…learn--locked.html`, `…learn-week8-closing.html`, `…learn-404.html` |
| `/courses/[slug]/cohort` | FW-CORE | soft | `…/cohort/page.tsx` | CourseCohortContent, FORGOTTEN_WAYS_COHORT | default, loading | `forgotten-ways/cohort.html`, `forgotten-ways/cohort--loading.html` |
| `/courses/[slug]/resources` | FW-CORE | public | `…/resources/page.tsx` | CourseResourcesContent, FORGOTTEN_WAYS_RESOURCES | default, loading | `forgotten-ways/resources.html`, `forgotten-ways/resources--loading.html` |
| `/courses/[slug]/journal` | FW-CORE | required | `…/journal/page.tsx` | `useReflectionJournalsList`, formatDate | default, loading, empty | `forgotten-ways/journal.html`, `forgotten-ways/journal--loading.html`, `forgotten-ways/journal--empty.html` |
| `/courses/[slug]/player` | COURSE-AUX | public | `…/player/page.tsx` | CoursePlayerLayout, ContentDetailPage, useCourseWeeksWithLessons | default, loading, not-found | `forgotten-ways/player.html`, `forgotten-ways/player--loading.html`, `forgotten-ways/player--not-found.html` |
| `/courses/[slug]/sales` | COURSE-AUX (legacy) | public | `…/sales/page.tsx` | CourseSalesLandingContent | default | `forgotten-ways/sales.html` |
| `/checkout` | COURSE-AUX | public (redirects on 401) | `src/app/(public)/checkout/page.tsx` | CheckoutContent, Suspense, motion | default, empty, error | `course-platform/checkout.html`, `…checkout--empty.html`, `…checkout--error.html` |
| `/checkout/success` | COURSE-AUX | public | `…/checkout/success/page.tsx` | CheckoutSuccess | default | `course-platform/checkout-success.html` |
| `/checkout/cancel` | COURSE-AUX | public | `…/checkout/cancel/page.tsx` | (minimal) | default | `course-platform/checkout-cancel.html` |
| `/account` | COURSE-AUX | required | `src/app/(public)/account/page.tsx` | UserDashboardSidebar, UserDashboardV2, useRequireAuth | default, loading | `account/dashboard.html`, `account/dashboard--loading.html` |
| `/account/learning` | COURSE-AUX | required | `…/account/learning/page.tsx` | CourseDashboardV2, CourseDashboardCourseCard, CourseDashboardDiscovery, CourseDashboardFeaturedCourse, CourseDashboardAILabCta | default, loading, empty | `account/learning.html`, `…learning--loading.html`, `…learning--empty.html` |
| `/account/profile` | COURSE-AUX | required | `…/account/profile/page.tsx` | ProfileSkeleton, ContextCard | default, loading, empty-context | `account/profile.html`, `…profile--loading.html`, `…profile--empty-context.html` |
| `/account/bookmarks` | COURSE-AUX | required | `…/account/bookmarks/page.tsx` | (stub) | default, empty | `account/bookmarks.html`, `account/bookmarks--empty.html` |
| `/account/library` | COURSE-AUX | required | `…/account/library/page.tsx` | (stub) | default, empty | `account/library.html`, `account/library--empty.html` |
| `/certificates/verify/[code]` | COURSE-AUX | public | `…/certificates/verify/[code]/page.tsx` | useCertificateVerify, Card, Badge | default, loading, not-found | `account/certificate-verify.html`, `…certificate-verify--loading.html`, `…certificate-verify--not-found.html` |

### 2.1 Lesson content primitives (sub-rows of `/courses/[slug]/learn`)

Every `SectionType` the section router (`src/components/courses/sections/SectionContent.tsx`) dispatches needs at least one fixture HTML. Fixtures live under `forgotten-ways/fixtures/`.

| section_type | component | fixture file |
| --- | --- | --- |
| `video`, `welcome` | `VideoSection` | `fixtures/section-video.html` |
| `scripture` | `AnchorScriptureSection` | `fixtures/section-scripture.html` |
| `reading`, `post_course` | `ReadingSection` | `fixtures/section-reading.html` |
| `reflection` | `ReflectionSection` | `fixtures/section-reflection.html` |
| `practical_exercise` | `PracticalExerciseSection` | `fixtures/section-practical-exercise.html` |
| `field_experiment` | `FieldExperimentSection` | `fixtures/section-field-experiment.html` |
| `discussion`, `cohort_session` | `DiscussionPromptsSection` | `fixtures/section-discussion.html` |
| `integration` | `IntegrationSection` | `fixtures/section-integration.html` |
| `lordship_opening`, `lordship_closing` | `DevotionalSection` | `fixtures/section-devotional.html` |
| `looking_ahead` | `LookingAheadSection` | `fixtures/section-looking-ahead.html` |
| `journey_continues`, `commissioning` | `JourneyContinuesSection` | `fixtures/section-journey-continues.html` |
| `resource_blurb` | `ResourceBlurbSection` | `fixtures/section-resource-blurb.html` |
| `action` | `ActionSection` | `fixtures/section-action.html` |
| `assessment` | `AssessmentSection` | `fixtures/section-assessment.html` |
| `case_study` | `CaseStudySection` | `fixtures/section-case-study.html` |
| `guided_practice` | `GuidedPracticeSection` | `fixtures/section-guided-practice.html` |
| `chat_dissonance`, `chat_action`, `chat_reflection` | `ChatCtaSection` | `fixtures/section-chat-cta.html` |
| `context_discovery` | `CourseContextIntroSection` | `fixtures/section-context-intro.html` |
| `covenant` | `CourseCovenantSection` | `fixtures/section-covenant.html` |
| `exit_ticket` | `ExitTicketSection` | `fixtures/section-exit-ticket.html` |
| `transition` | `CourseTransitionSection` | `fixtures/section-transition.html` |
| `week_closing` | `CourseWeek8ClosingView` | `forgotten-ways/learn-week8-closing.html` (not a fixture; whole-page view) |

---

## 3. Component inventory (user-visible strings are either inlined or referenced by file)

### 3.1 Course landing (src/components/course-landing/)

- **CourseHeroSection** — badge (from `portal_themes[0]`), `title`, `subtitle` (italic lede), meta strip (weeks / `Max {cohortSize} per facilitator` / `~{estimatedHours}h total`), primary CTA (default `Enroll in Cohort`), secondary CTA (default `View Syllabus`), optional tertiary (`Free Preview`). Cohort info card overlay: `Next Cohort` heading + `{nextCohortNote}`. Decorative `BookOpen` 400×400 at 5% opacity.
- **CourseWeekArcSection** — heading default `The 8-Week Arc`; subheading `The journey from domesticized faith to apostolic movement is not a lecture; it is a meticulously designed descent and re-emergence.`; accent cluster `{nn} Stages of Growth`; arc = first week + `Deep Work` (Transformation Loop) center + last week; week cards show `Week {nn}` eyebrow + title + description.
- **CourseWeeklyEngineSection** — heading `The Weekly Engine`; subheading quoted in `course-landing-marketing-defaults.ts`; 7 step labels with descriptions (Dissonance, Concept, Witness, Practice, Reflection, Cohort Learning, Integration).
- **CourseImmersionSection** — heading `Designed for Immersion, Not Observation.`; body paragraph per defaults; three features (Maximum Engagement, Local Application, Resource Library); `Facilitated Journey` + `Social Reinforcement` blocks.
- **CourseQuoteSection** — pull quote + cite (`Alan Hirsch`) + role (`Author of The Forgotten Ways`).
- **CoursePricingSection** — tier cards (Individual Access / Leader License), features list, `Recommended` badge, CTA copy `Enroll Individually` / `Get Group License`.
- **IntakeContextBanner** — interstitial banner for intake context; one-liner + dismiss.

### 3.2 Course learn (src/components/courses/learn/)

- **CourseLearnLayout** — responsive flex shell. Sidebar | content | AI drawer. Handles drawer open/close, focus trap, Escape key.
- **CourseLearnSidebar** — header block (`The Journey` label, course title), week navigator (← Week X of Y →), `Sections` label, section list with icon + label + progress pill, scroll-to-active, progress ring (`FormationRing`).
- **CourseTopbar** — sticky nav showing course title, active tab (Learn / Overview / Cohort / Resources / Journal), `☰ Contents` mobile button, AI companion toggle.
- **LessonPanel** — wraps dynamic section content; meta strip `Week {n} of {total}`, lesson title, description, section type pill (icon + label).
- **LessonContent** — dispatches to one of 29 section components (enum in `src/lib/schemas/course-learn.ts`).
- **LessonTabs** — conditional tabs based on child data: `Reflection Questions`, `Discussion Prompts`, `Exercises`. Accessible `role=tablist`.
- **LessonPanelFooter** — `← Previous`, `Next →`, `Mark Complete` toggle, `Capture Insight` button (opens modal).
- **FormationRing** — animated SVG progress ring; `role=progressbar`, `aria-valuenow`.
- **CaptureInsightModal** — title `Capture Insight`, prompt echo, textarea, `Save` button. Submits to `/api/simplified/reflection-journals`.
- **CourseCompleteModal** — celebratory copy, `Get Certificate` / `Next Steps` CTA.
- **CourseAIDrawer** — right-side slide-in drawer, context label, chat input/messages, close.
- **FloatingAiEntryFab** — floating circle button that opens `CourseAIDrawer`.
- **CourseWeek8ClosingView** — dedicated celebration view. Sub-components: Week8Hero, Week8SynthesisGrid, Week8FormationPlan, Week8CommissioningRite, Week8CertificatePreview, Week8NextPathways.

### 3.3 Section components (src/components/courses/sections/)

All 29 renderers listed in §2.1. Each takes a `{ section: LessonSection }` prop and renders against its own data shape. Standardized chrome: section header (eyebrow + title + description), action row, optional child items (questions, prompts, steps, deliverables).

### 3.4 Course auxiliary shells (src/components/courses/)

- **CourseHubNav** / **CourseHubShell** — tab chrome for course sub-routes (cohort, resources, journal, overview).
- **CourseSidebar** — shared sidebar rendering for cohort/resources/journal (non-learn routes).
- **CourseCohortContent** — meeting intro + Join live call button + schedule grid + discussion thread cards + facilitator card.
- **CourseResourcesContent** — intro paragraph + glossary grid + bibliography list + case studies + downloads.
- **CourseOverviewContent** / **CourseOverviewPageClient** — overview tab.
- **CourseSalesLandingContent** / **CourseSalesPageClient** — legacy sales page.
- **CoursePlayerLayout** — legacy video player two-column layout.
- **CourseEnrollForm** — form: name, email, cohort select, submit. Inline validation errors.

### 3.5 Course dashboards (src/components/course-dashboard/)

- **CourseDashboardV2** — `My Learning` heading, enrolled course cards, empty state, discovery row, AI Lab CTA.
- **CourseDashboardCourseCard** — thumbnail, title, progress ring, `Continue Learning` CTA.
- **CourseDashboardDiscovery** — `Continue Your Journey` heading, featured / unfeatured grid.
- **CourseDashboardFeaturedCourse** — large hero card with description + CTA.
- **CourseDashboardAILabCta** — promo panel → `/ai-lab`.

### 3.6 Account shell

- **UserDashboardSidebar** — profile mini, scholar tier, nav (`My Learning`, `Account`, `Profile`, `Bookmarks`, `Library`), sign-out.
- **UserDashboardV2** — main account dashboard body.
- **ProfileSkeleton** — skeleton used on profile loading.
- **ContextCard** — AI Lab personal context widget.

### 3.7 Certificate verification

- `useCertificateVerify(code)` hook — fetches from `/api/custom/certificates/verify/[code]`.
- Render: certificate detail card + `Verified` badge, recipient name, course title, issue date, verification URL.

### 3.8 Cross-cutting UI (src/components/ui/)

- `Button`, `Card`, `Badge`, `Skeleton`, `AlertCircle` icons via `lucide-react`. Migration HTML uses inline SVG + semantic classes from `site-theme.css` so `Button` → `<a class="btn btn-primary">`, `Card` → `.card`, etc.

---

## 4. Lesson section type catalog

Authoritative enum — `src/lib/schemas/course-learn.ts::SECTION_TYPES`. Label/icon map — `src/lib/config/lesson-types.ts`. Router — `src/components/courses/sections/SectionContent.tsx`.

| id | label | icon (lucide) | typical data | notes |
| --- | --- | --- | --- | --- |
| `video` | Video | Play | `{url, title, description, duration}` | HTML5 `<video>` or iframe |
| `welcome` | Welcome | Play | same as `video` | course intro |
| `scripture` | Scripture | BookOpen | `{text, reference, commentary}` | anchor scripture |
| `reading` | Reading | FileText | `{title, body}` | prose block |
| `post_course` | Post-Course | ArrowRight | `{body}` | wrap-up copy |
| `reflection` | Reflection | Brain | `{questions: [{id, question, guidance, question_type}]}` | saves to journal |
| `practical_exercise` | Exercise | Wrench | `{title, instructions, purpose, estimated_time_minutes, deliverables}` | field exercise |
| `field_experiment` | Field Experiment | FlaskConical | `{title, setup, expected_outcomes, instructions}` | real-world experiment |
| `discussion` | Discussion | MessageSquare | `{prompts: [{id, title, prompt, prompt_type}]}` | cohort prep |
| `cohort_session` | Cohort Session | MessageSquare | same as discussion | live meeting |
| `integration` | Integration | Layers | `{title, steps, ritual_copy}` | weekly anchor |
| `lordship_opening` | Opening | Flame | `{devotional_text, title}` | week start |
| `lordship_closing` | Closing | Flame | `{devotional_text, title}` | week end |
| `looking_ahead` | Looking Ahead | ArrowRight | `{title, copy}` | week preview |
| `journey_continues` | Journey Continues | Heart | `{title, body, next_steps}` | course closure |
| `commissioning` | Commissioning | Heart | `{title, commissioning_text, next_steps}` | week 8 rite |
| `resource_blurb` | Resource | BookMarked | `{title, blurb, resource_type, link, thumbnail}` | external link card |
| `action` | Action | Sparkles | `{title, action_prompt, guidance}` | commitment prompt |
| `assessment` | Assessment | ClipboardCheck | `{questions: [{type, prompt, options, answer}]}` | quiz / APEST |
| `case_study` | Case Study | BookOpenCheck | `{title, narrative, analysis_prompts}` | real-world case |
| `guided_practice` | Guided Practice | Compass | `{title, steps, checkpoints}` | step-by-step |
| `chat_dissonance` | Dissonance | Zap | `{prompt, dissonance_framing}` | opens AI drawer |
| `chat_action` | Action Step | Sparkles | `{prompt, context}` | opens AI drawer |
| `chat_reflection` | Reflection | MessageSquare | `{prompt, reflection_context}` | opens AI drawer |
| `context_discovery` | Context Discovery | UserCircle | `{week_theme, context_intro, framing}` | week intro |
| `covenant` | Covenant | Shield | `{covenant_text, signature_prompt, affirmation}` | community pledge |
| `exit_ticket` | Exit Ticket | ListChecks | `{prompt, prompt_type, guidance, options}` | end-of-section check |
| `transition` | Transition | ArrowRight | `{narrative, bridge_copy}` | between sections |
| `week_closing` | Week Closing | Heart | composite — see `CourseWeek8ClosingView` | whole-view layout |

---

## 5. Content & copy sources

| Source file | Purpose |
| --- | --- |
| `src/lib/content/courses/course-landing-marketing-defaults.ts` | Weekly Engine, Immersion, pricing tier defaults, quote attribution |
| `src/lib/content/courses/forgotten-ways-ui-static.ts` | FW cohort (meeting schedule, threads, facilitator) + resources (glossary, bibliography, case studies) |
| `src/lib/content/pathways/forgotten-ways.ts` | Pathway narrative — pillar copy on mDNA, six elements, case study (Celtic), Q&A, practice steps |
| `src/lib/config/lesson-types.ts` | Display labels + icons for all 29 section types |
| `src/lib/config/tenant.config.ts` | Tenant-configurable labels (`courseInfo.enrollNowLabel`, `sidebarTitle`, `formationCompanionLabel`, availableSlugs, feature flags) |
| `src/lib/schemas/course-learn.ts` | `SECTION_TYPES` enum |

Database-driven (not migrated as copy, but structure preserved): `/api/simplified/courses` (list), `/api/custom/courses/[slug]/info` (title, description, weeks, lessons), `/api/custom/courses/[slug]/learn` (full lesson tree), `/api/custom/courses/[slug]/enrollment`, `/api/simplified/reflection-journals`, `/api/custom/certificates/verify/[code]`.

---

## 6. Assets

### 6.1 Hero + cover imagery (public/images/art/courses/)

- `art-course-forgotten-ways.webp` — hero art
- `course-forgotten-ways-cover-{mobile,tablet,desktop,2x}.webp` — responsive cover
- `art-courses-hero-formation.webp`, `courses-hero-formation-{tablet,desktop,2x}.webp` — catalog hero
- `art-course-formation-journey-{warm,shaping}.webp` — misc section artwork
- `course-fallback-formation-{mobile,2x}.webp` — placeholder

### 6.2 Portal iconography (public/images/art/portals/)

- `portal-forgotten-ways-icon-2x.webp`, `art-portal-forgotten-ways.webp` — portal badge

### 6.3 Icons

Lucide React icons are inlined as SVG with `currentColor` in the static HTML. Migration keeps `aria-hidden="true"` on decorative icons and `role="img"` + `<title>` where the React source used labeled icons.

### 6.4 Font loading

Source repo loads Newsreader / Manrope via `next/font/google`. Static migration standardizes on **Inter** (Movemental charter, DESIGN.md §5) — body copy and display share Inter with `--tracking-display: -0.02em`. Instrument Serif is **not** used here (pathway pages in Movemental use it; course chrome does not).

---

## 7. Client-only behaviors to replicate in vanilla JS

1. Mobile sidebar drawer — toggle with `☰ Contents`, closes on Escape / backdrop, focus trap on open.
2. Week navigator — ← / → buttons in sidebar jump to first section of adjacent week; disabled at edges.
3. Sidebar scroll-to-active — smooth scroll (respects `prefers-reduced-motion`).
4. Lesson tabs — `role=tablist`/`role=tab`, keyboard navigation, scroll-to-top on tab change.
5. FormationRing — SVG stroke-dashoffset transition 700 ms ease-out; `role=progressbar`.
6. Capture Insight modal — focus trap, `Escape` close, `Save` submits (static: no-op with toast stub).
7. Course Complete modal — backdrop dismiss.
8. AI drawer — right-side slide-in; close button + Escape.
9. Mark-complete toggle — optimistic check + progress % bump.
10. Hash / query navigation between sections — `?week=&section=` URL params; sidebar reflects selection.
11. Quiz interactivity — static: radio buttons + submit → show static feedback block.
12. Chat CTA sections — button opens AI drawer with section-type context label.
13. Form validation — HTML5 required + inline error spans (React Hook Form in source; pattern preserved).

Animations that require the `motion` library are **not** ported; static fallbacks use CSS `opacity` / `transform` transitions gated by `prefers-reduced-motion`.

---

## 8. Required-state inventory

| Route | default | loading | error | empty | locked/paywall | 404 | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/courses` | ✓ | ✓ | ✓ | ✓ | n/a | n/a | catalog grid |
| `/courses/[slug]` | ✓ | ✓ | n/a | ✓ | n/a | ✓ | notFound when tenant.features.courses off |
| `/courses/[slug]/learn` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | enrollment soft gate |
| `/courses/[slug]/enroll` | ✓ | ✓ | n/a | ✓ | n/a | ✓ | — |
| `/courses/[slug]/cohort` | ✓ | ✓ | n/a | n/a | n/a | n/a | FW-only static data |
| `/courses/[slug]/resources` | ✓ | ✓ | n/a | n/a | n/a | n/a | FW-only static data |
| `/courses/[slug]/journal` | ✓ | ✓ | n/a | ✓ | required | n/a | auth-gated |
| `/courses/[slug]/player` | ✓ | ✓ | n/a | n/a | n/a | ✓ | legacy |
| `/courses/[slug]/sales` | ✓ | n/a | n/a | n/a | n/a | n/a | legacy |
| `/checkout` | ✓ | n/a | ✓ | ✓ | 401→signin | n/a | Suspense fallback only |
| `/checkout/success` | ✓ | n/a | n/a | n/a | n/a | n/a | — |
| `/checkout/cancel` | ✓ | n/a | n/a | n/a | n/a | n/a | — |
| `/account` | ✓ | ✓ | n/a | n/a | required | n/a | — |
| `/account/learning` | ✓ | ✓ | n/a | ✓ | required | n/a | — |
| `/account/profile` | ✓ | ✓ | n/a | ✓ (context) | required | n/a | — |
| `/account/bookmarks` | ✓ | n/a | n/a | ✓ | required | n/a | stub in source |
| `/account/library` | ✓ | n/a | n/a | ✓ | required | n/a | stub in source |
| `/certificates/verify/[code]` | ✓ | ✓ | n/a | n/a | n/a | ✓ | — |

Modal/drawer states (open / closed / submitting) are documented inline where each modal appears in the matched HTML file.

---

## 9. Risks & unknowns

1. **API completeness.** `/api/custom/courses/[slug]/learn` is expected to return the full section tree; if backends are sparse, lesson views will show empty renderers. Static HTML uses illustrative fixtures.
2. **FW cohort meeting link** is `undefined` in the source fixture — the static HTML renders the `Join live call` button as disabled with a note.
3. **Certificate issuance workflow** is not defined in the source — the verify page is fully static and the "issued by" text is placeholder.
4. **Discussion threads** are TSX literals in `FORGOTTEN_WAYS_COHORT`; no live posting is wired, so static HTML reproduces exactly the three hardcoded threads.
5. **Tenant feature flags** — some views check `tenant.features.courses` / `tenant.features.chat`. Static HTML assumes both are enabled (FW-CORE default).
6. **Bookmarks / library** account pages are stubs in source; static HTML renders empty-state placeholders with no invented content.
7. **Motion library** animations are not ported; visual fidelity is slightly reduced on enter/stagger, but layout, color, and copy are preserved exactly.
8. **Fonts** — source uses Newsreader (serif display) + Manrope; static uses Inter per Movemental charter. Headline sizing and tracking compensates.
9. **Admin surfaces** (`src/app/(admin)/**`) are intentionally excluded per §4 classification in the migration prompt.
10. **Marketing-overlap pages** (books hub, pathways index) are excluded — they embed course blocks only incidentally and are the responsibility of later prompts.

---

## 10. Phase F verification pointers

- `README.md` in `docs/html/alan-hirsch-course-migration/` maintains the authoritative route → file index.
- Any row above without a matched HTML file must carry an explicit exclusion note in the README.
- When the section type enum grows in the source repo, add a fixture row in §2.1 above **before** building the HTML, so the contract stays in sync.
