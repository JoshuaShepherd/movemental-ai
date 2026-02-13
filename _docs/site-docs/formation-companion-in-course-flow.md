# Formation Companion in Course Flow — Implementation Prompt

> **Purpose**: Walk through what needs to be done so the Formation Companion (later with modified prompting) can be **insertable anywhere in the course flow** and the **agentic conversation appears as a chat window inside the course unit**.

**Audience**: Developers and product implementing or refining the course editor and in-unit agent experience.

**Status**: Implemented (UI + stub API); backend agent and persistence to be wired when available.

---

## 1. Goal

- **Author/instructor**: In the course editor, add an “agent” (Formation Companion) to the **week flow** alongside lessons. The flow is a sequence of items per week: lessons and/or agent blocks.
- **Learner**: When they reach an agent block in the course, the **unit content is a chat window** — the Formation Companion conversation lives **inside** that course unit (like a chat-in-unit), not in a separate page or floating widget.

---

## 2. What Was Implemented (This Repo)

### 2.1 Data model: course flow items

- **Course flow** = list of **weeks** (chapters); each week has **items**.
- Each item is either:
  - **Lesson**: `{ type: "lesson", id, title, date, status }`
  - **Agent block**: `{ type: "agent", id, agentKind: "formation-companion", title }`
- Types: `CourseFlowItem`, `CourseWeek` in `components/layouts/movement-leader/courses-chapter-builder.tsx`.

### 2.2 Course editor (week flow)

- **CoursesChapterBuilder**:
  - Left panel: list of weeks; expand a week to see its **items** (lessons and agent blocks).
  - **“+ Add Lesson”** and **“+ Add agent”** per week — so Formation Companion is **insertable anywhere** in the week flow.
  - Selecting an item shows the right panel:
    - If **lesson** → lesson preview (placeholder) and “Complete & Continue”.
    - If **agent** → **Formation Companion chat** in the unit (header + message list + input).

### 2.3 In-unit chat

- **FormationCompanionChat** (`formation-companion-chat.tsx`):
  - Renders as a **chat window** inside the course unit: header (“Formation Companion”), scrollable message list (agent/user bubbles), fixed input + send.
  - Calls `POST /api/agents/formation-companion/chat` with `{ messages, courseContext }`.
  - Optional `courseContext`: `{ courseId, moduleId, lessonIndex }` for future agent context.
  - Borrows styling from `ChatSupportMinimal` / `ChatWidgetPopup` (bubbles, header, input).

### 2.4 Stub API

- **`/api/agents/formation-companion/chat`** (POST):
  - Accepts `messages` (array of `{ role, content }`) and optional `courseContext`.
  - Returns `{ success: true, data: { message } }` with a **stub reply** (reflection prompt keyed off last user message).
  - **Replace** this with the real Formation Companion agent when the backend exists (same request/response shape can be kept).

---

## 3. What Still Needs to Be Done (Checklist)

Use this as a prompt or checklist when finishing the feature.

### 3.1 Persistence and schema

- [ ] **Store flow in DB**: Persist `CourseWeek[]` (or equivalent) so that “Add Lesson” / “Add agent” and order are saved. Likely: `courses` → `course_modules` (weeks) → `course_module_items` with `item_type` (`lesson` | `agent`) and `agent_kind` (e.g. `formation-companion`).
- [ ] **Course editor loads/saves**: Course builder reads from and writes to the above schema so author changes are persisted.

### 3.2 Learner experience

- [ ] **Course player / learn view**: Public (or authenticated) **course learning** route (e.g. `/courses/[slug]/learn` or per-module) that:
  - Renders the **same flow** (weeks + items).
  - For a **lesson** item: show lesson content (video, text, etc.).
  - For an **agent** item: render **FormationCompanionChat** in the unit (same component), with `courseContext` set from current course, module, and position.
- [ ] **Progress**: Mark agent unit “complete” when the learner has sent at least one message (or use existing completion rules). Persist completion in `lesson_progress` or equivalent (e.g. by `module_item_id`).

### 3.3 Formation Companion backend (when available)

- [ ] **Replace stub API**: Point `FormationCompanionChat` at the real Formation Companion agent (e.g. same route, or a different URL that returns `{ data: { message } }`). Keep `messages` and `courseContext` in the request so the agent can use conversation history and course position.
- [ ] **Modified prompting**: Pass `courseContext` (and optionally current lesson title/summary) into the agent so replies are **contextual to the unit** (e.g. “reflect on this section”, “connect to the multiplication mindset”). Prompting changes happen in the agent service, not in this front-end.
- [ ] **Conversation persistence** (optional but recommended): If the agent backend supports it, pass a `conversationId` or `threadId` so the in-unit chat resumes the same thread on refresh or return to the unit.

### 3.4 Author experience (optional polish)

- [ ] **Reorder items**: Drag-and-drop or up/down to reorder lessons and agent blocks within a week.
- [ ] **Edit agent block**: Optional title or short “prompt hint” for the Formation Companion for this unit (e.g. “Focus on sending posture”).
- [ ] **Remove item**: Delete lesson or agent block from the flow.

---

## 4. Code References (This Repo)

| What | Where |
|------|--------|
| Flow types, “Add Lesson” / “Add agent”, render lesson vs chat | `components/layouts/movement-leader/courses-chapter-builder.tsx` |
| In-unit Formation Companion chat UI + API call | `components/layouts/movement-leader/formation-companion-chat.tsx` |
| Stub Formation Companion chat API | `app/api/agents/formation-companion/chat/route.ts` |
| Exports | `components/layouts/movement-leader/index.ts` (CoursesChapterBuilder, FormationCompanionChat, CourseFlowItem, CourseWeek, ChatMessage) |

---

## 5. Summary

- **Formation Companion is insertable** in the course flow via “Add agent” in the chapter builder; each week’s flow can mix lessons and agent blocks in any order.
- **The agentic conversation is in the course unit** via `FormationCompanionChat`: when the learner selects an agent block, the main content is the chat window (same component in editor preview and in the future learn view).
- **Next steps**: Persist flow to DB, add the learner course/learn route that renders the same flow and chat, then replace the stub API with the real Formation Companion and (optionally) add conversation persistence and author-side polish.
