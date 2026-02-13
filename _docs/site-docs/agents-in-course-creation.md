# Agents in Course Creation & Corresponding Front-End

> **How agents are designed to support course creation, where they plug into the UI, and how well this is implemented in the current codebase.**

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Scope**: This repo (`movemental-ai`); references to “implemented” agents come from business docs that may describe another codebase or branch.

---

## 1. Purpose of This Doc

- Explain **how** agents are intended to support course creation (architecture and flows).
- Describe the **front-end touchpoints** (course builder, Content Workbench, companion UIs).
- Clarify **how well** this is implemented by distinguishing documented design from what exists in this repository.

---

## 2. How Agents Are Designed to Support Course Creation

### 2.1 Documented Agent Architecture (from business docs)

The platform is described as having **22 specialized AI agents** and a shared architecture:

- **Framework**: OpenAI Agents SDK (`@openai/agents`) for structured implementations.
- **Per-agent**: Tools in `tools.ts`, instructions in `instructions.ts`.
- **Context**: Context assembly via a context engine (e.g. `packet-assembler.ts`), including user profile, assessment results, and course progress.
- **Memory**: Persistent conversation and instances (e.g. `agent_instances`, `ai_lab_conversations`).
- **API**: Agents exposed under `/api/agents/*`; front-end and other services call these routes.

So in design, agents are **tool-using, instruction-driven services** with shared context and memory, not one-off prompts.

### 2.2 Agents That Directly Relate to Course Creation

From `_docs/business-docs/core-docs/28-implementation-status.md` and `14-agentic-behavior-boundaries.md`:

| Agent | Role in course creation / content |
|-------|-----------------------------------|
| **Course Companion** | Context-aware assistance for learners (and implied support around course content). |
| **Content Structure** | Clear structure (e.g. outline, modules/lessons) and flow. |
| **Metadata Generator** | Metadata for courses, modules, lessons. |
| **Formation Companion** | Formation guidance; course progress awareness. |
| **Contextual Companion** | Unified companion for books, articles, **courses**, assessments. |
| **Voice & Vocation Coach** | Voice coherence and theology; relevant if course content is author-generated. |
| **Orchestrator** | Coordinates multiple agents for complex flows (could orchestrate course-creation steps). |

Course creation is therefore **not** a single “course creation agent”; it’s a set of agents that can be used **during** authoring (structure, metadata, voice) and **around** courses (companions, formation).

### 2.3 Intended Course-Creation Flow (Documented)

- **Course builder**: Author creates/edits courses at `/dashboard/courses/new` and `/dashboard/courses/[id]/edit` (LMS builder with modules, lessons, content types).
- **Content Workbench**: Unified authoring for “articles, tutorials, **courses**, and media” with:
  - **AI copilot side panel**: “Generate outline”, “Refine paragraph”, “Translate”, voice/theology checks.
  - Integration with “copilot service” (OpenAI/Anthropic).
- **Companions**: Course Companion and Contextual Companion provide context-aware help; Formation Companion uses course progress and assessment data.

So in design:

1. **Author side**: Course builder + Content Workbench use agents for structure, metadata, voice, and in-editor assistance.
2. **Learner side**: Course Companion (and related companions) use context (e.g. course progress, profile) to assist.

---

## 3. Corresponding Front-End (Designed vs Implemented in This Repo)

### 3.1 Course Builder & Dashboard (Documented vs Repo)

- **Documented**: Course creation at `/dashboard/courses/new`, edit at `/dashboard/courses/[id]/edit`; course structure in `courses`, `course_modules`, `course_lessons`.
- **In this repo**: There are **no** routes under `app/dashboard/courses/`. Dashboard has `layout`, main `page`, `analytics`, `settings` only. No course creation or edit UI here.

So the **course builder front-end is not present** in this repository.

### 3.2 Content Workbench (Documented vs Repo)

- **Documented** (e.g. `content-workbench.md`, Content Workbench design docs): Editor workspace with **AI copilot panel** (prompt, “Generate outline”, “Refine paragraph”, “Translate”), voice/theology checks, SEO checklist.
- **In this repo**: No Content Workbench route or component set. There is a TipTap editor under `app/(public)/tiptap-editor/` but no AI copilot or course-specific authoring flow.

So the **Content Workbench and its AI copilot are not implemented** in this repo.

### 3.3 Public Course & Learning UI (Documented vs Repo)

- **Documented** (e.g. `12_PUBLIC_SITEMAP_AND_FEATURES.md`): `/courses`, `/courses/[slug]`, `/courses/[slug]/learn`, modules, progress.
- **In this repo**: No `app/(public)/courses/` routes. `app/templates/courses/page.tsx` is a **template showroom** for course *layout* variants (e.g. video player, chapter builder), not course creation or the live learning experience.

So the **public course listing, detail, and learn UI are not implemented** here.

### 3.4 Agent API & Infrastructure (Documented vs Repo)

- **Documented**: Agents under `/api/agents/*`; context engine; `src/agents/` (e.g. voice-coach, sermon-shaper).
- **In this repo**: No `app/api/agents/` routes. No `src/agents/` directory. No `context-engine` or `packet-assembler` (or equivalent) in `lib/`. No references to `@openai/agents`, `agent_instances`, or `ai_lab_conversations` in code.

So **agent implementation and agent API are not present** in this repository.

### 3.5 Summary: What Exists in This Repo vs Docs

| Area | Documented | In this repo |
|------|------------|--------------|
| Agent backend (SDK, tools, instructions) | Yes (22 agents, architecture) | **No** |
| Agent API (`/api/agents/*`) | Yes | **No** |
| Context engine / packet assembler | Yes | **No** |
| Course builder UI (`/dashboard/courses/*`) | Yes | **No** |
| Content Workbench + AI copilot | Yes | **No** |
| Public course pages (`/courses/*`) | Yes | **No** |
| Course *templates* (showroom) | — | **Yes** (`app/templates/courses/`) |
| Dashboard (layout, home, analytics, settings) | — | **Yes** |
| References to “agents” in marketing/UI copy | — | **Yes** (e.g. “AI agents” in why-movemental, search-ai-assistant “New Agent”) |

---

## 4. How Well Are Agents Implemented for Course Creation?

### 4.1 On Paper (Documented Design)

- **Architecture**: Clear—tool-based agents, instructions, context, memory, API.
- **Course relevance**: Several agents (Course Companion, Content Structure, Metadata Generator, Formation/Contextual Companion, Voice Coach, Orchestrator) are specified for creation and delivery.
- **Front-end integration**: Course builder and Content Workbench are specified with explicit AI copilot and companion touchpoints.
- **Control**: 70/30 and human-in-the-loop are documented (e.g. `14-agentic-behavior-boundaries.md`).

So **by documentation**, the design is coherent and well-scoped for course creation and the corresponding front-end.

### 4.2 In This Repository

- **Agents**: None of the 22 agents or agent infrastructure exist in this codebase.
- **Course creation UI**: No course builder or Content Workbench; no routes or components that implement the described flows.
- **Course front-end**: No public course listing, detail, or learn pages; only template showroom and marketing/FAQ copy that mention “Course Creator” or “Create course”.

So **in this repo**, agents are **not** implemented for course creation, and the **corresponding front-end** (course builder, Content Workbench, AI copilot, public course/learn) is **not** implemented here either.

### 4.3 Possible Explanations

- The implementation status and agent docs may describe **another codebase** (e.g. separate backend or monorepo package).
- Agent and course-creation work may live on **another branch** not reflected in the current tree.
- The docs may be **target state / handoff specs** (e.g. for a future or external implementation).

Until agent code and course-creation UI appear in this repo (or are clearly pointed to in another repo), “how well” agents are implemented for course creation **here** is: **not implemented**.

---

## 5. Recommendations for Alignment

1. **Single source of truth**: Decide whether “implementation status” refers to this repo only, another repo, or a combined system. Update the doc (e.g. `28-implementation-status.md`) to say which codebase(s) it describes.
2. **Course creation in this repo**: To implement course creation and agents here, add:
   - Agent backend (or a thin client to an external agent API).
   - Routes under `app/api/agents/` (or equivalent) and, if needed, `app/dashboard/courses/` and Content Workbench with an AI copilot.
3. **Public course experience**: Add `app/(public)/courses/` (and sub-routes) per the sitemap if courses are to be consumed in this app.
4. **Docs**: Keep this file (`agents-in-course-creation.md`) updated as agent and course-creation implementation is added to this repo or linked from it.

---

## 6. References (in this repo)

- `_docs/business-docs/core-docs/28-implementation-status.md` — Agent inventory, architecture, LMS/course builder status.
- `_docs/business-docs/core-docs/14-agentic-behavior-boundaries.md` — What agents do, 22-agent list, boundaries.
- `_docs/business-docs/03_brand_positioning/website-vision/pages/content-workbench.md` — Content Workbench and AI copilot.
- `_docs/type/12_PUBLIC_SITEMAP_AND_FEATURES.md` — Course routes and features.
- `_docs/ui/content-workbench/DESIGN_DIRECTION.md` — Content Workbench design and patterns.
