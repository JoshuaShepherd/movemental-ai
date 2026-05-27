# Design Game Agent Handbook

This handbook equips every agent—design, engineering, research, and archive ops—to keep the Design Game moving with consistent quality. It consolidates the vision, personas, required expertise, and execution guardrails so that any agent can jump in, ship a distinctive Alan Hirsch design, and archive it without losing momentum.

---

## 1. North Star Summary

- **Mission**: Produce museum-quality, distinct Alan Hirsch hero experiences, then archive them as permanent references before inventing the next style.
- **Success Test**: Each iteration feels like a different product category (reader, LMS, calendar, knowledge hub, etc.) while honoring Movemental theology, storytelling, and accessibility.
- **Source of Truth**: The live component `app/components/AlanHirschHero.tsx` is always the current experiment. Archived designs live under `app/components/designs/archived/` with surfacing pages in `app/app/archive/[id]/`.

---

## 2. Canonical Personas & Use Cases

| Persona | Goals | Voice & Tone Needs | Experience Hooks |
| --- | --- | --- | --- |
| **Movement Strategist** (church planter, denominational leader) | Understand Hirsch frameworks, extract playbooks for teams | Scholar-practitioner tone, citations, frameworks | Timelines, LMS modules, assessment tools |
| **Creative Producer** (designer, media lead) | Translate Hirsch ideas into visual campaigns | Visual storytelling, typography focus | Galleries, motion cues, annotated assets |
| **Emerging Leader** (Gen-Z pastor, community organizer) | Quick hits, actionable steps, social-ready quotes | Conversational but rooted, mobile-first | Snackable cards, AI helper, progress trackers |
| **Research Partner** (academic, publisher) | Validate theological rigor, source referencing | Formal, cites works, archival navigation | Long-form reader, footnotes, search |
| **Movemental AI Agent** (internal automation) | Needs structured metadata + design rationale | Precise instructions, checklists | Callouts, JSON snippets, explicit naming conventions |

**Audience Switches**  
Every design should declare its primary persona in the PR/commit description and in the archive metadata. Persona choice drives typography, IA, and feature focus (e.g., Strategist = frameworks, Producer = galleries).

---

## 3. Design Philosophy Library

Use this matrix to ensure variety. When starting a new iteration, pick one primary philosophy and one supporting tactic.

| Philosophy | Description | Best Paired Features |
| --- | --- | --- |
| **Content-First Minimalism** | Wide gutters, giant margins, typographic drama | Reader controls, citation sidebars |
| **Bold Editorial** | Magazine spreads, serif/sans pairings, drop caps | Pull quotes, issue navigation |
| **Glassmorphic Premium** | Translucent panes, neon highlights, depth cues | Floating nav, AI assistant dock |
| **Dark High-Contrast** | True black, luminous gradients, glowing cards | Timeline tracks, audio players |
| **Organic Asymmetry** | Offset grids, blob backgrounds, overlapping cards | Movement map, mural/field notes |
| **Neumorphic Systems** | Soft tactile surfaces, micro shadows | Control centers, analytics panels |
| **Interactive Portfolio** | Card stacks, hover reveals, stat overlays | Movement cards, quick filters |
| **Narrative Storytelling** | Scene-by-scene scroll, Q&A, annotated photos | Timeline scrollytelling, story beats |
| **Knowledge Center** | Search hub, filters, AI query hints | Result list, tag cloud, featured briefs |
| **Custom LMS** | Modules, progress bars, lesson actions | Completion badges, assessment prompts |

**Rule**: Never repeat the same philosophy back-to-back. Document the chosen philosophy in the archive metadata block.

---

## 4. Non-Negotiable Visual Standards

### 4.1 Color & Contrast
- Headings: `text-gray-900 dark:text-gray-100`
- Body: `text-gray-700 dark:text-gray-300` minimum
- Never use `text-gray-400` or `text-gray-500` on dark backgrounds.
- Card backgrounds (dark mode): `bg-gray-800`; avoid `bg-gray-900` for cards.
- Selected state baseline: `border-blue-500 bg-blue-50 dark:bg-blue-950`.

### 4.2 Typography & Spacing
- Body size ≥ `text-sm` (14px). Descriptions 14-16px with 1.5-1.75 leading.
- Section headings need explicit classes and `mb-6`. Major sections `mb-12`.
- Cards: `p-4` minimum, `gap-4` between cards.
- Mix serif/sans only with clear hierarchy; never rely on default colors.

### 4.3 Interaction & Motion
- Every clickable element requires hover and focus states (color + motion or border).
- Cards: `transition`, `shadow`, and optional `scale-105` on hover (tailored per philosophy).
- Scroll-triggered animations use Framer Motion or GSAP with performance guardrails (lazy motion imports).
- Selected/active items need both background and border change.

### 4.4 ShadCN Overrides
- Components like `CardDescription` default to `text-muted-foreground`. Always override with `!text-gray-900 dark:!text-gray-100` (plus size overrides when needed).
- When mixing Tailwind and ShadCN, inspect DOM to ensure specificity wins.

---

## 5. Production Approach (Design Game Loop)

1. **Pre-Flight (1-2 hrs)**
   - Review last two archive entries in `app/app/archive/page.tsx`.
   - Choose new philosophy + persona + feature combo.
   - Outline IA in `/design-playground` or in notes.

2. **Exploration Sprint**
   - Gather 3-4 reference URLs (Awwwards, Land-book, Mobbin, etc.).
   - Map references to components (hero, cards, navigation). Save in PR description.

3. **Build & Narrate**
   - Work in `app/components/AlanHirschHero.tsx`.
   - Keep motion + layout modular (extract subcomponents if reused).
   - Comment major sections with `// Persona: Movement Strategist` style markers for future agents.

4. **Quality Gate**
   - Run accessibility check: manual contrast, tab order.
   - Verify dark mode by toggling `className="dark"` on `<html>` (Next.js preview or Storybook equivalent).
   - Confirm all text uses explicit color classes.
   - Ensure interactive states exist for buttons/cards/filters.

5. **Archive**
   - Duplicate component into `app/components/designs/archived/<slug>.tsx`.
   - Add archive route in `app/app/archive/[slug]/page.tsx` with metadata (title, score, persona, philosophy, date, notes).
   - Update grid in `app/app/archive/page.tsx` (card info, color tokens).
   - Document persona, philosophy, and key learnings in the archive description.

6. **Reset**
   - Confirm `AlanHirschHero.tsx` references only the new live design.
   - Open PR summary describing persona + philosophy + experiment focus.

---

## 6. Expertise & Role Matrix

| Role / Agent | Core Skills | Secondary Skills | Hand-Off Artifacts |
| --- | --- | --- | --- |
| **Design Director Agent** | Visual direction, typography systems, contrast QA | Figma/Webflow references, Framer Motion choreography | Persona + philosophy brief, reference links, motion storyboard |
| **Interaction Engineer Agent** | React/Next.js, Tailwind, ShadCN, GSAP/Framer Motion | Animations, accessibility, performance profiling | Component PRs, motion configs, accessibility notes |
| **Archivist Agent** | Content tagging, metadata, documentation | Screenshot capture, changelog writing | Archive page entry, README updates, design rationale |
| **Persona Strategist Agent** | Narrative design, audience research | Content architecture, copywriting | Persona synopsis, messaging pillars, CTA recommendations |
| **QA & Accessibility Agent** | WCAG checks, responsive QA | Automated testing (Playwright), Lighthouse | QA report, contrast validations, responsive screenshots |

**Minimum Coverage per Iteration**
- 1 design director (can be same as engineer if skilled).
- 1 interaction engineer.
- 1 archivist (can be shared role but must review final output).
- QA review may be lightweight but cannot be skipped.

---

## 7. Collaboration Protocols

- **Daily Artifact**: Post WIP screenshot (desktop + mobile) with persona tag in the working thread.
- **Decision Log**: Use commit messages like `feat(design-game): archive alan-hirsch-hero-10 (Knowledge Center, Strategist)`.
- **Knowledge Sharing**: When a new pattern emerges (e.g., AI assistant dock), document quickly in `/design/modern-web-design-guide.md` or this handbook for reuse.
- **Failure Handling**: If an iteration feels repetitive, halt before build, choose a new philosophy, and log the decision.

---

## 8. Checklist Before Marking Done

1. ✅ Persona declared in code comments + archive metadata  
2. ✅ Philosophy + reference sources documented  
3. ✅ Contrast + color audit passed (light + dark)  
4. ✅ Hover/focus states for every interactive element  
5. ✅ Archive page + main archive list updated  
6. ✅ Screenshots captured (desktop, tablet, mobile) for documentation  
7. ✅ Motion performance verified (no layout shift, no jank)  
8. ✅ PR/commit summary includes persona, philosophy, unique experiment

If any item fails, the Archivist Agent blocks the archive entry until resolved.

---

## 9. Tooling & Resources

- **Design Inspiration**: Awwwards, CSS Design Awards, SiteInspire, Mobbin, Webflow Showcase.
- **Component Libraries**: Tailwind UI, ShadCN, Radix, Headless UI.
- **Animation Stack**: Framer Motion (`framer-motion`), GSAP (`gsap` with ScrollTrigger).
- **Accessibility**: WebAIM Contrast Checker, Chrome DevTools Accessibility pane.
- **Internal Docs**:
  - `_docs/modern-web-design-guide.md`
  - `design/modern-web-design-guide.md`
  - `Design Rules and Violations Log` in repo root instructions (contrast + typography guardrails)
  - `07_ai_content_systems/agent_specifications/` for agent persona context.

---

## 10. Non-Game Batch Archive Runs

Not every archive addition comes from the “design game” hero loop. When we do Non-Game batches (like the multi-style article management systems with inline longform views), follow these rules:

- **Batch Scope**: Minimum of 3, ideally 5+ variations tackling the same feature set (search + filtering + full article view in the latest batch).
- **Component Pattern**: Place components in `app/components/designs/archived/` with descriptive names (`ArticleConstellationSystem`, `ArticleChronicleWorkspace`, etc.) and keep their UI self-contained.
- **Archive Integration**: Each batch entry must have a route (`app/app/archive/<slug>/page.tsx`) and metadata in `designData.ts` (type, movement, tags, score, order).
- **Documentation Note**: Log the batch intent + feature focus here in the handbook so future agents know why multiple entries share a product theme.
- **Testing Focus**: Validate that management controls (search, filters, cards) and the article typography (lists, block quotes, captions, figures) coexist on the same page.

Example (2025-11-21): Added five multi-style article platforms (`article-constellation-system`, `article-chronicle-workspace`, `article-prism-navigator`, `article-fieldnotes-atelier`, `article-ribbon-studio`) to demonstrate best-in-class layouts where the CMS layer and longform reader sit side-by-side.

---

## 11. Future Enhancements

- **Automated QA**: Add Playwright snapshots for hero + archive pages per iteration.
- **Design Tokens**: Codify color/spacing tokens in `app/lib/` for auto enforcement.
- **Persona Switcher**: Build a UI toggle on the live hero that demonstrates multiple persona views (optional stretch).

Use this handbook as the onboarding artifact: any new autonomous agent should read it first, declare the persona + philosophy they are pursuing, and then ship confidently. Keep it updated whenever the design language or process evolves.

