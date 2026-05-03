# Content That Moves: Living Book Platform

A comprehensive design and strategy for turning the *Content That Moves* manuscript into a shareable, living, audience-aware lead magnet that earns trust rather than extracting it.

---

## 0. The Tension — and Why It's the Right One

The BOOK_META_OVERVIEW explicitly says the book is "not a lead magnet, but the knowledge spine." That instinct is right — and worth preserving. The proposal below doesn't contradict it. Instead it treats the book as a **gift economy asset**: freely available, beautifully presented, and so genuinely useful that capturing an email feels like a fair exchange for ongoing relationship — not a gate on the content itself. The content stays open. The relationship is the magnet.

---

## 1. Lead Magnet Strategy — Gift Economy, Not Gated Content

### 1.1 Philosophy

Most lead magnets extract: "give me your email before you see value." A formation-oriented book earns nothing by operating that way. Instead:

- **Full book is always free to read on-site.** No paywall, no "unlock chapter 4" gates.
- **The magnet is the enhanced relationship.** Email capture unlocks the *living* layer: author notes on revisions, community feedback digests, new footnoted credit additions, and invitations to early conversations.
- **Three conversion surfaces** — each tied to a natural moment of trust, not interruption.

### 1.2 Conversion Surfaces

| Surface | Trigger Moment | What the Reader Gets | UX Pattern |
|---------|---------------|----------------------|------------|
| **Edition Selector** | Reader chooses their audience lens (see Section 3) | "We'll remember your lens and notify you when your edition gets new material." Email capture is part of the personalization flow — it feels like a preference save, not a gate. | Inline radio group + email field below the hero. No modal. |
| **Margin Note Subscription** | Reader reaches the end of any chapter | "This chapter is still being refined. Get notified when it changes — and see who influenced the revision." Taps the living-document promise. | Subtle card at chapter end, below the final paragraph. Not sticky, not a popup. |
| **Full PDF / EPUB Export** | Reader wants the offline artifact | "Download the latest build of your edition as PDF or EPUB." Email required — this is the one gated surface, and the gate is reasonable because the export is a generated artifact. | Button in the site header reading toolbar + a persistent download icon in the chapter sidebar. |

### 1.3 Anti-Patterns to Avoid

- No exit-intent modals. Ever. A book about credibility cannot use manipulation patterns.
- No "you've read 3 chapters, sign up to continue." The content is open.
- No dark patterns on the email form (pre-checked newsletter boxes, hidden opt-ins).
- Email capture forms should be visually quiet — `bg-section` card with `text-muted-foreground` copy, not a screaming banner.

### 1.4 Email Sequence (Post-Capture)

1. **Immediate:** "Here's your edition" — link to their personalized reading URL + PDF if they chose export.
2. **Day 3:** Author's note — a short, honest paragraph about where the book is right now and what's changing. Not a pitch. Written in the prophetic/pastoral voice.
3. **Day 7:** "What one question did this raise?" — a reply-to email that feeds into the community feedback system (Section 5).
4. **Ongoing (monthly):** Living Book Digest — what changed, who contributed margin notes, which chapters were revised. Wikipedia-style changelog energy.

---

## 2. Endorsements — Earned Social Proof, Not Blurb Decoration

### 2.1 Design Concept: The Endorsement Wall

Endorsements for a book that's still being revised can't follow the standard "blurb on the back cover" pattern. Instead, design an **endorsement wall** — a dedicated section (and standalone page) that shows endorsements as living testimony.

### 2.2 Endorsement Anatomy

Each endorsement is a structured object, not a freeform quote:

```ts
type Endorsement = {
  id: string
  quote: string                        // The pull quote (1-3 sentences)
  context?: string                     // Optional longer reflection
  endorser: {
    name: string
    title: string
    organization?: string
    avatar?: string                    // Headshot URL
    url?: string                       // Their site or profile
  }
  audienceLens?: 'movement-leaders' | 'churches' | 'nonprofits'
                                       // Which edition this endorsement speaks to
  chapter?: number                     // If endorsing a specific chapter
  dateAdded: string                    // ISO date
  featured: boolean                    // Controls homepage vs. book page placement
}
```

### 2.3 Display Patterns

**Homepage Section (featured only):**
- Section variant: `elevated`
- Layout: 3-column grid on desktop, single column on mobile
- Each card: avatar (48px circle), name, title, pull quote. No borders — tonal stacking (`bg-card` on `bg-elevated`).
- Eyebrow: "What readers are saying" (not "Endorsements" — too formal for a living book)

**Book Landing Page — Full Wall:**
- Filterable by audience lens (tabs or segmented control)
- Chapter-specific endorsements appear inline in the reading experience (see Section 5)
- Sortable: featured first, then by date
- "Add your voice" CTA at the bottom — links to a simple structured form

**Inline (Reading Experience):**
- When an endorsement references a specific chapter, show it as a pull-aside in the margin (desktop) or as a collapsed card between paragraphs (mobile). Uses the `bg-section` tonal shift to differentiate from body text.

### 2.4 Endorsement Collection

A `/book/endorse` page with a simple form:

- Name, title, organization (required)
- Quote (required, max 500 chars)
- "Which audience are you?" (optional radio: movement leader / church leader / nonprofit leader / other)
- "Which chapter spoke to you most?" (optional select)
- Avatar upload (optional)
- Submission goes to a moderation queue (Supabase table, admin review before publish)

**UX:** The form should feel like a conversation, not a survey. Use the Prose primitive for the intro copy. Frame it: "If this book shaped how you think about AI and credibility, we'd welcome your words. They'll appear on the book page and may be included in future editions."

---

## 3. Three Audience Editions — One Book, Three Lenses

### 3.1 Strategy: Lens, Not Fork

The manuscript is one text. The three "editions" are **reading lenses** — curated entry points, highlighted passages, and supplementary sidebars that contextualize the same core argument for three audiences:

1. **Movement Leaders** — the primary audience. This is the default lens. No additional contextualization needed; the book was written for them.
2. **Church Leaders** — sidebar annotations that bridge movement vocabulary to congregational/institutional language. E.g., "scenius" gets a sidebar: "In your context, think of this as the network of trust your congregation already embodies..."
3. **Nonprofit Leaders** — sidebar annotations that bridge to organizational/programmatic language. E.g., Chapter 5's amplification framework gets a sidebar on donor communication and annual report credibility.

### 3.2 Implementation Architecture

**Content model:**

```ts
type LensAnnotation = {
  id: string
  lens: 'churches' | 'nonprofits'     // movement-leaders = no annotation needed
  chapterSlug: string
  anchorId: string                     // Which paragraph this annotation attaches to
  type: 'sidebar' | 'replacement-intro' | 'case-study'
  title?: string
  body: string                        // MDX content
  author?: string                     // Who wrote this annotation (for credit)
}
```

**Reading experience:**
- A **lens selector** appears in the book hero and persists in the reading toolbar (sticky header below SiteNav during reading).
- Default lens: Movement Leaders (no visual annotation layer).
- Selecting "Churches" or "Nonprofits" reveals sidebar annotations inline — styled as `bg-elevated` cards in the margin (desktop) or expandable accordions between paragraphs (mobile).
- The core text never changes. Annotations are additive.
- The lens choice is stored in a cookie (or localStorage) and remembered across sessions. If the reader gave their email (Section 1.2), the lens is stored server-side.

**URL structure:**
- `/book` — landing page (edition selector + hero + endorsements + TOC)
- `/book/read/[chapter-slug]` — chapter reader (lens applied via query param or cookie: `?lens=churches`)
- `/book/read/[chapter-slug]?lens=nonprofits`
- Shareable URLs always include the lens param so recipients see the right edition.

### 3.3 Visual Differentiation

The three lenses share the same design system. Differentiation is subtle and semantic:

| Element | Movement Leaders | Churches | Nonprofits |
|---------|-----------------|----------|------------|
| Lens badge (reading toolbar) | None (default) | Small pill: "Church Leader Edition" in `text-muted-foreground` | Small pill: "Nonprofit Edition" |
| Sidebar annotations | None | `bg-elevated` card with church icon | `bg-elevated` card with org icon |
| Chapter intro | Original text | Original + 1-paragraph bridge for church context | Original + 1-paragraph bridge for nonprofit context |
| PDF cover subtitle | *For Movement Leaders* | *Church Leader Edition* | *Nonprofit Leader Edition* |

---

## 4. Shareability — Designed for Organic Distribution

### 4.1 Share Unit: The Chapter, Not the Book

People share specific ideas, not entire books. The atomic share unit is the **chapter** (or even a highlighted passage). Design for that.

### 4.2 Share Mechanics

**Chapter-level sharing:**
- Each chapter page has a share toolbar (below the chapter title, above the body):
  - Copy link (with lens param baked in)
  - Share to X/Twitter (pre-filled: title + one-line hook + URL)
  - Share to LinkedIn (same)
  - Email this chapter (opens mailto with subject + URL)
  - Copy as quote (for the highlighted passage, if text is selected)
- The share URL is always the canonical chapter URL with lens: `/book/read/the-credibility-crisis?lens=churches`

**Highlight-to-share:**
- When a reader selects text in the chapter body, a small floating toolbar appears (above the selection, not blocking it):
  - "Share this passage" — generates a URL with a text fragment (`#:~:text=...`) and opens the share sheet
  - "Copy quote" — copies the selected text + chapter title + book title + URL to clipboard
- This is a client component (`"use client"`) that uses the Selection API. It should be delightful but not intrusive — appears after 300ms of stable selection, fades away if selection is cleared.

**Open Graph / Social Cards:**
- Each chapter generates its own OG image via `next/og` (or a static pre-built set):
  - Dark card (`bg-inverse-surface`) with chapter number, chapter title, book title, author name
  - Consistent typography (Inter, display tracking)
  - Lens-aware: if the URL includes `?lens=churches`, the OG image includes the edition badge
- Meta tags per chapter: title, description (first 160 chars of chapter), OG image, Twitter card

**Embeddable Excerpt Widget:**
- For partners, endorsers, or blogs that want to feature a passage: provide a lightweight embed snippet (iframe or web component) that renders a styled quote card with a "Read more" link back to the chapter.
- Not a priority for v1, but the data model should support it.

### 4.3 QR Code for Print/Events

If the book is ever referenced in a talk, workshop, or printed material:
- `/book/qr` generates a styled QR code (midnight background, primary accent) pointing to `/book?utm_source=print`
- The QR code is downloadable as PNG/SVG from an admin-only utility page

---

## 5. Living Document — The Community Layer

This is the most distinctive feature and the one most likely to differentiate "Content That Moves" from every other ebook in the space. The book is not finished. It says so. The community layer makes that openness structural, not just rhetorical.

### 5.1 Design Concept: The Margin

Inspired by medieval manuscript margins, Wikipedia talk pages, and academic peer review — but none of those literally. The Margin is a **parallel column** that lives alongside the reading text and contains:

- **Author Notes** — Joshua's own annotations on passages he's reconsidering, revising, or expanding. These are first-class content, not footnotes.
- **Community Notes** — Reader-submitted questions, feedback, or constructive criticism that has been reviewed and published.
- **Revision Marks** — When a passage changes based on community input, a small revision indicator appears (e.g., a subtle `*` superscript) linking to the contributor's note and their footnoted credit.

### 5.2 The Margin — Layout

**Desktop (>= 1024px):**
```
|  Nav margin  |  Chapter text (prose-max: 680px)  |  The Margin (280px)  |  Nav margin  |
```
- The Margin sits to the right of the prose column, vertically aligned with the paragraph it annotates.
- Notes are positioned using CSS `position: sticky` within their annotation anchor range, so they scroll naturally with the text.
- When no notes exist for a passage, The Margin is empty — clean negative space.

**Tablet (768px–1023px):**
- The Margin collapses into inline expandable cards between paragraphs (accordion pattern).
- A small indicator icon (subtle, `text-muted-foreground`) appears in the left margin of annotated paragraphs. Tapping expands the note inline.

**Mobile (< 768px):**
- Same as tablet: inline expandable cards.
- The indicator is a small superscript number (like a footnote) that scrolls the reader to the expanded note.

### 5.3 Note Types and Visual Treatment

| Type | Icon | Background | Who Can Create |
|------|------|------------|----------------|
| **Author Note** | Pen icon (Lucide `pen-line`) | `bg-section` | Joshua only (via CMS or markdown frontmatter) |
| **Community Question** | Question mark (Lucide `message-circle-question`) | `bg-card` with left border `border-l-2 border-primary/20` | Any authenticated reader (moderated) |
| **Community Feedback** | Lightbulb (Lucide `lightbulb`) | `bg-card` with left border `border-l-2 border-primary/20` | Any authenticated reader (moderated) |
| **Revision Credit** | History icon (Lucide `history`) | `bg-elevated` | System-generated when a revision cites community input |

### 5.4 Submission Flow

**"Ask a question" or "Offer feedback":**

1. Reader clicks a small `+` button that appears on hover/focus in The Margin zone (desktop) or via a floating action button anchored to the bottom-right of the reading viewport (mobile).
2. A sheet (not modal — the text stays visible) slides in from the right:
   - "What kind of note?" — Question / Feedback / Criticism (constructive)
   - "Which passage?" — Pre-filled with the paragraph nearest to where they clicked. Reader can adjust.
   - Text field (max 1000 chars). Placeholder: "What's on your mind? Be specific — the more grounded your note, the more useful it is."
   - "How should we credit you?" — Name (required), title/org (optional), URL (optional). Defaults to their profile if authenticated.
   - Checkbox: "I understand this will be reviewed before publishing and may be cited in future revisions."
   - Submit.
3. Submission goes to a moderation queue (Supabase table: `book_margin_notes`).
4. After review and approval, the note appears in The Margin with the contributor's name and date.

**Authentication:** Light-touch. Email-based magic link (Supabase Auth). No password. Reader authenticates once to submit notes; reading never requires auth. The email from the lead magnet capture (Section 1) doubles as their auth identity — zero friction if they already gave their email.

### 5.5 Revision Credit System

When Joshua revises a passage and the revision was influenced by community input:

1. The revised passage gets a superscript revision mark (e.g., `*` or a small icon).
2. Clicking the mark opens a Revision Credit card in The Margin:
   - "This passage was revised on [date] in response to feedback from [Name]."
   - Link to the original community note.
   - Link to the diff (optional — shows the before/after of the passage).
3. The contributor's name is added to a **Contributors** page (`/book/contributors`) — a running list of everyone who influenced the text, with links to the notes they submitted.

**This is the Wikipedia energy.** Not dominant, not performative, but structurally present: the book visibly improves because of its readers, and those readers are credited by name.

### 5.6 Data Model

```ts
// Supabase tables

// book_margin_notes
type MarginNote = {
  id: string                            // UUID
  chapter_slug: string
  anchor_paragraph_id: string           // The paragraph this note attaches to
  type: 'author_note' | 'question' | 'feedback' | 'criticism'
  body: string
  status: 'pending' | 'approved' | 'rejected' | 'archived'
  contributor_id: string                // FK to auth.users
  contributor_display_name: string
  contributor_title?: string
  contributor_url?: string
  created_at: string
  approved_at?: string
  featured: boolean                     // Highlighted in The Margin
}

// book_revisions
type BookRevision = {
  id: string
  chapter_slug: string
  paragraph_id: string
  revision_summary: string              // What changed and why
  before_text?: string                  // Optional diff anchor
  after_text?: string
  credited_note_ids: string[]           // FK to book_margin_notes
  revised_at: string
}

// book_endorsements
type BookEndorsement = {
  id: string
  quote: string
  context?: string
  endorser_name: string
  endorser_title: string
  endorser_org?: string
  endorser_avatar_url?: string
  endorser_url?: string
  audience_lens?: 'movement-leaders' | 'churches' | 'nonprofits'
  chapter_slug?: string
  status: 'pending' | 'approved'
  featured: boolean
  created_at: string
}

// book_email_subscribers
type BookSubscriber = {
  id: string
  email: string
  lens: 'movement-leaders' | 'churches' | 'nonprofits'
  source: 'lens_selector' | 'chapter_end' | 'pdf_export'
  subscribed_at: string
  user_id?: string                      // FK to auth.users if authenticated
}
```

---

## 6. Information Architecture — Routes and Pages

```
/(site)/book/
  ├── page.tsx                          # Landing page: hero, edition selector, endorsements, TOC, CTA
  ├── read/
  │   └── [chapter-slug]/
  │       └── page.tsx                  # Chapter reader with Margin, share tools, lens annotations
  ├── contributors/
  │   └── page.tsx                      # Living contributor credits page
  ├── endorse/
  │   └── page.tsx                      # Endorsement submission form
  └── export/
      └── route.ts                      # API route: generates PDF/EPUB per lens (email-gated)
```

**Navigation integration:**
- Add "Book" to SiteNav (primary nav, not buried in a dropdown)
- The book reading experience uses a **reading toolbar** that replaces the standard SiteNav content area:
  - Left: back arrow + "Content That Moves" wordmark link (returns to `/book`)
  - Center: chapter title + progress indicator (e.g., "Chapter 3 of 21")
  - Right: lens badge (if non-default) + share button + download button
  - This toolbar appears when scrolling down (past the chapter hero) and uses the same glass treatment as SiteNav (`bg-card/80 backdrop-blur-xl`)

---

## 7. Component Architecture

### 7.1 New Primitives

| Component | Layer | Purpose |
|-----------|-------|---------|
| `ReadingToolbar` | L4 | Sticky header during chapter reading — replaces SiteNav content |
| `MarginNote` | L2 | Single note card (author/community/revision) |
| `MarginColumn` | L4 | Right column container that positions notes alongside text |
| `LensAnnotation` | L2 | Sidebar card for audience-specific annotations |
| `ShareToolbar` | L4 | Chapter-level share actions |
| `HighlightShare` | L4 (client) | Floating toolbar on text selection |
| `EndorsementCard` | L2 | Single endorsement display |
| `EndorsementWall` | L4 | Filterable grid of endorsement cards |
| `LensSelector` | L4 (client) | Radio group for choosing edition + optional email capture |
| `ChapterNav` | L4 | Sidebar TOC for chapter navigation (previous/next + full outline) |
| `RevisionMark` | L2 | Inline superscript that links to revision credit |
| `ContributorList` | L4 | Running list of credited contributors |
| `BookHero` | L4 | Book landing page hero with cover mockup + edition selector |

### 7.2 Design Token Extensions

No new tokens needed. Everything maps to existing surfaces:

- Margin background: `bg-background` (same as page)
- Community note card: `bg-card` with `border-l-2 border-primary/20`
- Author note card: `bg-section`
- Revision credit card: `bg-elevated`
- Reading toolbar: Same glass treatment as SiteNav
- Lens badge pill: `bg-section text-muted-foreground text-xs`

---

## 8. Technical Implementation Plan

### Phase 1: Foundation (Book Landing + Reading Experience)

**Goal:** Ship the book as a beautiful, shareable reading experience.

- [ ] Create `/book` landing page with BookHero (cover mockup, edition selector, TOC, featured endorsements)
- [ ] Build chapter reader (`/book/read/[chapter-slug]`) with Prose primitive, reading toolbar, and chapter navigation
- [ ] Implement lens system (cookie/query param, LensAnnotation rendering)
- [ ] Write lens annotations for 3-5 key chapters (churches + nonprofits)
- [ ] Build ShareToolbar and HighlightShare components
- [ ] Generate OG images per chapter (static or `next/og`)
- [ ] Content pipeline: markdown chapters → MDX → rendered pages (build-time via `generateStaticParams`)

### Phase 2: Lead Magnet Layer

**Goal:** Introduce the three conversion surfaces.

- [ ] LensSelector with email capture
- [ ] Chapter-end subscription card
- [ ] PDF/EPUB export route (email-gated)
- [ ] Supabase: `book_email_subscribers` table + RLS
- [ ] Email sequence (Resend integration: welcome, author's note, question prompt, monthly digest)

### Phase 3: Community Layer (The Margin)

**Goal:** Ship the living-document features.

- [ ] Supabase: `book_margin_notes` + `book_revisions` tables + RLS
- [ ] Magic link auth flow (light-touch, email-based)
- [ ] MarginColumn layout (desktop) + inline accordion (mobile)
- [ ] Note submission sheet
- [ ] Moderation admin view (simple table, approve/reject)
- [ ] RevisionMark + revision credit rendering
- [ ] Contributors page

### Phase 4: Endorsements

**Goal:** Social proof, collected and displayed.

- [ ] Supabase: `book_endorsements` table + RLS
- [ ] EndorsementCard + EndorsementWall components
- [ ] `/book/endorse` submission form
- [ ] Endorsement moderation admin
- [ ] Homepage featured endorsements section
- [ ] Inline chapter endorsements (margin placement)

---

## 9. Content Pipeline — Markdown to Living Pages

The manuscript lives in `docs/book-development/manuscript-ordered/` as markdown files (`00-preface-the-story.md` through `21-where-i-am-now.md`). The pipeline:

1. **Build-time ingestion:** A script (or `contentlayer`-style loader) reads the markdown files, parses frontmatter (chapter number, title, slug, part grouping), and generates static pages via `generateStaticParams`.
2. **Paragraph IDs:** Each paragraph gets a stable ID (hash of its position + first N words) so margin notes and lens annotations can anchor to specific text. IDs are generated at build time and stored in a manifest.
3. **Lens annotations** are stored as separate MDX files in a `docs/book-development/lens-annotations/` directory, keyed by chapter slug and anchor ID.
4. **Author notes** are stored as frontmatter arrays in the chapter markdown files (or as a separate annotations file per chapter).

This keeps the manuscript as the source of truth while layering the living features on top.

---

## 10. Design Philosophy — Why This Works for *This* Book

A book about credibility and trust cannot use dark patterns. A book that says "I'm still learning" cannot present itself as finished. A book that advocates for scenius — collaborative, network-embedded trust — cannot be a solo broadcast.

Every feature in this proposal follows from the book's own argument:

| Book Principle | Feature |
|---------------|---------|
| "Amplification, not replacement" | The community layer amplifies the author's voice with reader insight — it doesn't replace his argument |
| "Scenius as the credibility solution" | The endorsement wall and contributor credits make the book's network of trust visible |
| "Transparency and disclosure" | Revision marks and before/after diffs show how the book changes and why |
| "Pace and discernment" | No urgency tactics, no countdown timers, no scarcity. The book is free and patient |
| "Formation, not extraction" | Email capture is tied to relationship (ongoing updates, invitations to contribute) — not to a drip campaign selling a product |
| "The reader as responsible agent" | The lens system trusts readers to choose their own entry point. The margin trusts them to contribute meaningfully |

The result is a lead magnet that doesn't feel like one — because it isn't one in the extractive sense. It's an invitation into an ongoing conversation, with the book as the shared text.

---

## 11. Success Metrics

Following the book's own success criteria (from BOOK_META_OVERVIEW):

| Metric | What It Measures | Tool |
|--------|-----------------|------|
| Unique readers per chapter | Reach and reading depth | PostHog / Vercel Analytics |
| Lens distribution | Which audiences are engaging | PostHog (custom event on lens selection) |
| Margin note submissions | Community engagement quality | Supabase query |
| Revision credits issued | Living-document promise being kept | Supabase query |
| Email capture rate (by surface) | Which conversion surface works | PostHog funnel |
| Share events (by channel) | Organic distribution | PostHog (custom event) |
| Endorsement submissions | Social proof momentum | Supabase query |
| PDF/EPUB downloads (by lens) | Offline artifact demand | Vercel Analytics + Supabase |
| Return visits to `/book` | Ongoing relationship (not one-and-done) | PostHog cohort |

**What we do NOT track:** time-on-page as a vanity metric, scroll depth as a manipulation signal, or A/B tests on email capture copy. The book's posture is patient and respectful; the analytics should match.
