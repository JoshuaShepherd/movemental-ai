# Compare Page: Substack as Column, Modal/Article, or Both?

> **Purpose:** Design decision for how Substack should appear in the /compare experience—as another column, as its own deep-dive modal/article, or both. This document researches Movemental docs, the current compare structure, and Substack's model, then recommends an approach.

**Version:** 1.0  
**Last Updated:** February 2025

---

## 1. Current State

### 1.1 The Compare Page Today

| Aspect | Reality |
|--------|---------|
| **Route** | `/compare` |
| **Structure** | Three-column table: **Movemental** | **Agency** | **SaaS** |
| **SaaS definition** | Course platforms: Thinkific, Teachable, Kajabi |
| **Categories** | Cost & pricing, Digital playbook, Platform, Network & scenius, Launch & support |
| **Key message** | “Movemental, agency, or SaaS—what you get, what you pay, and what only one gives you: the scenius.” |

The table emphasizes Movemental vs. two alternatives: custom agency builds and course-focused SaaS. The scenius is the main differentiator.

### 1.2 Where Substack Already Appears

- **`/what-is-movemental`** — “vs. Substack/Medium: Full platform ownership, not rented space on someone else's domain.”
- **Why Movemental (longform)** — “Digital Platforms (Substack, Patreon, Teachable) → Own the audience, capture 70–90% of revenue through fees…”
- **`WhyMovementalContainer`** — Same framing: Substack grouped with Patreon, Teachable as platforms that “own the audience” and push algorithm optimization.

Substack is already a named comparison point for writers/newsletter creators.

---

## 2. Substack vs. Current “SaaS” Column

### 2.1 Substack’s Model (2024–2025)

| Dimension | Substack |
|-----------|----------|
| **Upfront cost** | $0 |
| **Ongoing** | 10% of paid subscription revenue + Stripe (2.9% + $0.30) |
| **Revenue you keep** | ~85–87% after fees |
| **Primary use** | Newsletter/articles |
| **Time to launch** | Minutes |
| **Ownership** | You can export email list; you publish on Substack’s platform |
| **Discovery** | Recommendations, discovery tab, algorithm-driven |

### 2.2 How Substack Differs From Course SaaS

| | Course SaaS (Thinkific, Teachable, Kajabi) | Substack |
|--|--------------------------------------------|----------|
| **Primary content** | Courses, membership | Newsletter, articles |
| **Audience** | Learners, students | Readers, subscribers |
| **Revenue model** | Monthly SaaS + transaction fees | 10% of subscription revenue |
| **Platform focus** | Course delivery, funnels | Writing, email |

Substack and course SaaS serve different jobs. Lumping Substack into the “SaaS” column would mix newsletters with courses and muddy the comparison.

### 2.3 Movemental’s Target and Substack

Movement leaders ( pastors, authors, trainers) often:

- Write newsletters
- Publish articles
- Teach courses
- Have books and talks

Substack is a real alternative for the *writer* side of this. Many leaders considering Movemental will also consider Substack. The comparison is useful.

---

## 3. Options

### Option A: Substack as Another Column

**Implementation:** Add a 4th column: Movemental | Agency | Course SaaS | Substack (or “Writer platforms”).

**Pros**

- Direct, scannable comparison in one view
- Acknowledges Substack as a real option
- Highlights differences (e.g., one home vs. newsletter silo, scenius vs. none)

**Cons**

- Table widens; risk of feeling busy on mobile
- “SaaS” becomes “Course SaaS,” so either rename or add a second SaaS-style column
- Less room for nuance (e.g., Substack’s 10% vs Movemental’s 10%, exportable emails, etc.)

**Recommendation:** Viable if we keep categories tight and treat “Writer platforms (Substack)” as a distinct column. Requires renaming or clarifying the current “SaaS” column (e.g., “Course platforms”) and updating `CompareOptionsTable` for four columns.

---

### Option B: Substack as Its Own Modal/Article

**Implementation:** A dedicated piece, e.g. “Substack vs. Movemental: An Honest Guide,” either as:

- A modal/drawer opened from the compare page
- A standalone page (e.g. `/compare/substack` or `/compare/substack-vs-movemental`)

**Content focus:** For people seriously weighing Substack vs Movemental:

- Same 10% revenue share — where the real differences lie
- Newsletter-only vs. books + articles + courses in one place
- Rented platform vs. owned platform
- No scenius vs. credibility graph and network
- Algorithm-driven discovery vs. relational discovery
- When Substack fits, when Movemental fits

**Pros**

- Space for nuance and honesty
- Helps a specific segment (newsletter-first writers)
- Avoids cluttering the main table

**Cons**

- Not visible at a glance on /compare
- Requires a clear entry point from the compare page

**Recommendation:** This should exist. Many movement leaders actively consider Substack; an honest guide serves them well.

---

### Option C: Both

**Implementation:**

1. **Column:** Add Substack (or “Writer platforms”) as a 4th column.
2. **Article/modal:** “Substack vs. Movemental” deep dive, linked from the compare page (e.g. “Considering Substack? Read our honest comparison”).

**Pros**

- At-a-glance comparison for everyone
- Deeper help for people who want it
- Reinforces trust (“we’re not hiding the Substack option”)

**Cons**

- More to build and maintain
- Must keep column and article aligned

---

## 4. Recommendation

**Use both (Option C).**

### 4.1 Rationale

1. **Substack is a real alternative** — It’s already cited in What Is Movemental and Why Movemental. Writers/newsletter creators will compare the two.
2. **Different model from course SaaS** — Substack deserves its own column rather than being folded into “SaaS,” which today means course platforms.
3. **10% revenue share** — Same as Movemental, so the narrative isn’t “we’re cheaper” but “here’s what you get for that 10%” (scenius, one home, books + courses, etc.).
4. **Column + article serve different needs** — Column: quick scan. Article: serious decision-making.

### 4.2 Column Design

- **Columns:** Movemental | Agency | Course platforms | Writer platforms (Substack)
- Rename current “SaaS” to “Course platforms” and add “Writer platforms (Substack)” as 4th.
- Rows stay the same; add Substack-specific values where needed. Example: “Books, articles, courses in one place” → Movemental: ✓, Agency: if scoped, Course platforms: courses + maybe blog, **Writer platforms: newsletter/articles only**.

### 4.3 Article/Modal Design

- **Location:** Either `/compare/substack` (page) or a modal/drawer from /compare.
- **Tone:** Honest, helpful, not salesy. “If you’re deciding between Substack and Movemental, here’s how we’d frame it.”
- **Structure (draft):**
  1. When Substack makes sense
  2. When Movemental makes sense
  3. Side-by-side on: platform ownership, content types, revenue model, scenius, discovery
  4. Link back to fit-check

### 4.4 Entry Point on /compare

- Near the table: “Considering Substack? [Read our honest comparison →]”
- Or a small “Substack” chip/button that opens the modal or links to the article

---

## 5. Sources Used

| Source | Use |
|--------|-----|
| `lib/compare-options-data.ts` | Current table structure and rows |
| `_docs/site-docs/compare-options-sources.md` | Compare page sources and intent |
| `app/(public)/what-is-movemental/page.tsx` | Existing Substack vs Movemental framing |
| `_docs/site-docs/03_why_movemental_longform.md` | Problem framing, digital platforms |
| `components/why-movemental/WhyMovementalContainer.tsx` | Substack in narrative |
| Substack pricing/support pages (2024–2025) | Fee structure, audience export |
| `CORE_FLOW_AND_EXISTING_CONTENT.md` | Flow and compare page role |

---

## 6. Implementation Checklist (When Building)

### Column

- [ ] Update `CompareRow` type for optional 4th column (e.g. `substack` or `writerPlatforms`)
- [ ] Add Substack values for all categories in `lib/compare-options-data.ts`
- [ ] Rename “SaaS” to “Course platforms” in UI and data
- [ ] Update `CompareOptionsTable` for 4 columns and responsive behavior
- [ ] Update `_docs/site-docs/compare-options-sources.md` with Substack sources

### Article/Modal

- [ ] Create `/compare/substack` page or modal content
- [ ] Add entry point on /compare (link or button)
- [ ] Ensure tone is honest and helpful
- [ ] Include link to fit-check

---

*End of document. Use this to decide and implement the Substack treatment on the compare page.*
