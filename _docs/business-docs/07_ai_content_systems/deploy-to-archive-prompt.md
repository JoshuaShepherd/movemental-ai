# Prompt: Deploy Directly to Archive With New Design Experiments

You are the Design Game operator responsible for shipping Alan Hirsch hero experiences into the organized archive in one focused push. Follow the brief exactly and deliver production-ready code plus archive entries for every experiment listed below. Always apply repository design rules (contrast, typography, spacing, interactivity, explicit color classes) and archive workflow conventions before marking done.

## Core Instructions

1. **Always archive after every successful build**: duplicate the live component to `app/components/designs/archived/<slug>.tsx`, add `app/app/archive/<slug>/page.tsx`, and update `app/app/archive/page.tsx`.
2. **Enforce contrast rules**: headings use `text-gray-900 dark:text-gray-100`, body text uses `text-gray-700 dark:text-gray-300`, never rely on inherited colors, and never use `text-gray-400` or `text-gray-500` on dark backgrounds.
3. **Declare persona + philosophy per attempt**: document both in code comments and archive metadata. Each attempt must feel like a unique product type.
4. **Provide hover/focus states and motion** for all interactive elements; confirm light/dark parity and responsive behavior at desktop/tablet/mobile breakpoints.
5. **Summarize references** used (Awwwards, Mobbin, etc.) in the archive description so future agents can trace inspiration.

## Phase Plan

Work in five explicit phases so progress remains reviewable. After each phase, run QA, capture screenshots, and log learnings before advancing.

- **Phase 1 – LMS Systems**: Ship the three LMS interpretations.
- **Phase 2 – Ecommerce Books**: Build the three commerce experiences.
- **Phase 3 – Long-Form Readers**: Deliver the three reader+hero treatments.
- **Phase 4 – Archive & Resource Centers**: Implement the three resource hubs.
- **Phase 5 – Agentic Interaction Frameworks**: Build the three agent-facing UIs.

## Deployment Queue

Produce the following sets sequentially, phase by phase. Each bullet represents a fully realized, archive-ready design attempt (hero + supporting sections, necessary interactions, motion, QA, documentation).

### Phase 1: LMS Structures (3 Attempts)
1. **Cohort-Based Curriculum Hub** – modules with prerequisites, progress tracker, cohort callouts, live session calendar.
2. **Micro-Lesson Pathways** – snackable lessons, AI tutor panel, adaptive recommendations, badge showcase.
3. **Practitioner Studio LMS** – workshop library, assignment uploads, peer feedback lanes, resource locker.

### Phase 2: Ecommerce Books Experiences (3 Attempts)
1. **Movemental Bookstore Grid** – curated collections, hover previews, bundle builder, cart drawer.
2. **Author Spotlight Storefront** – hero carousel, signed editions, event tickets, testimonials.
3. **Research Library Marketplace** – advanced filters (topic/year), citation exports, institutional licensing CTA.

### Phase 3: Long-Form Reader + Hero (3 Attempts)
1. **Scholarly Reader** – typographic hero, chapter TOC sidebar, footnote hover cards, reading progress bar.
2. **Immersive Story Scroll** – cinematic hero video, parallax chapters, embedded audio commentary.
3. **Accessible Reading Studio** – hero with typography controls, contrast toggles, AI insight dock, annotation timeline.

### Phase 4: Archive & Resources Center (3 Attempts)
1. **Knowledge Vault** – federated search, filters, pinned collections, save-for-later queue, rich previews.
2. **Movemental Resource Atlas** – map-based navigation, category chips, preview modals, download tracker.
3. **All-Access Control Room** – global search, tag matrix, recent updates feed, AI concierge suggestions.

### Phase 5: Agentic Interaction Framework (Front-End, 3 Attempts)
1. **Summon Panel** – docked panel listing specialized agents (Design, Research, Archivist, QA) with task-specific prompts.
2. **Contextual Agent Grid** – cards per agent persona showing capabilities, quick actions, usage metrics, escalation paths.
3. **Adaptive Workflow Builder** – drag-and-drop stages, assign agents per step, real-time status indicators, notification settings.

## Deliverable Checklist Per Attempt

- ✅ Live component refreshed with new experience
- ✅ Archive component + page + listing updates
- ✅ Persona, philosophy, references, and learnings documented
- ✅ Screenshots (desktop/tablet/mobile) stored or linked
- ✅ Contrast, interaction, and performance validated
- ✅ Commit message: `feat(archive): <slug> (<persona>, <philosophy>)`

Run through the list until all 15 experiments are archived. Do not stop until every attempt ships, passes QA, and is documented.

