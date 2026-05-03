# Movemental Strategic Funnel Fixes — Implementation Prompt

**Source:** [docs/build/audit/strategic-funnel-audit.md](../audit/strategic-funnel-audit.md)
**Priority:** P0 fixes first, then P1, then P2

---

## Overview

This prompt defines the implementation work needed to close the conversion gaps identified in the strategic funnel audit. Work is organized into three sprints by priority. Each item includes the specific deliverable, placement, and acceptance criteria.

---

## Sprint 1: Fix the Broken Floor (P0)

These are blocking issues — the funnel literally cannot convert without them.

### 1.1 Build the Contact Form

**What:** A functional contact form on `/contact` that captures leads and stores them.

**Requirements:**
- Fields: Name (required), Email (required), Organization (optional), Audience segment (required — radio: "Movement leader," "Church or ministry," "Nonprofit or organization," "Media or research," "Other"), Message (required, textarea)
- On submit: store in Supabase `contact_submissions` table + send notification email to team
- Success state: "Thank you. We'll be in touch." — no redirect, inline confirmation
- Error state: Inline field validation + generic submission error
- No CAPTCHA initially — add if spam becomes an issue

**Placement:** Replace the "Contact form coming soon" placeholder on `/contact`

**Database:**
```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  audience_segment text not null,
  message text not null,
  created_at timestamptz default now(),
  status text default 'new' -- new, read, responded, archived
);
```

**API route:** `POST /api/contact` — Zod-validated, rate-limited (5 per IP per hour)

**Design rules:**
- Form lives in a `bg-card` container on `bg-section` background (tonal stacking, no borders)
- Submit button uses primary gradient (same as "Start a conversation" CTA)
- Radio buttons use shadcn RadioGroup
- All fields use `border-border` for accessibility
- Success state uses a subtle green check, not a redirect

### 1.2 Add Email Address to Contact Page (Immediate)

**What:** Add a visible email address to the contact page as a fallback until the form is live.

**Placement:** Below the "Contact form coming soon" text, or in the "How to start" section.

**Copy:** "Reach us directly at hello@movemental.com" (or whatever the actual contact email is)

**Design:** Use `text-primary` for the email link. Understated, not a banner.

### 1.3 Footer Email Capture (Monthly Formation Letter)

**What:** A simple email signup in the site footer for the "Monthly Formation Letter."

**Requirements:**
- Single email field + submit button
- Copy: "The Monthly Formation Letter — one substantive dispatch on what we're seeing in formation work."
- Store in Supabase `newsletter_subscribers` table
- Success state: "You're in. First letter arrives next month."
- No double opt-in initially (add when scale justifies it)

**Placement:** In the footer, below the brand column or as a new row above the legal strip.

**Database:**
```sql
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'footer', -- footer, assessment, page
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);
```

**Design rules:**
- Footer section uses `bg-inverse-surface` with `text-inverse-foreground`
- Input field: minimal, single-line, `bg-elevated` or transparent with bottom border
- Button: small primary button or arrow icon button
- No heavy marketing energy — this is an invitation, not a plea

---

## Sprint 2: Differentiated Conversion Paths (P1)

These unlock the two-track model (leaders apply, organizations inquire) and add the highest-value lead magnet.

### 2.1 Leader Application Form

**What:** A structured application form for movement leaders, distinct from general contact.

**Route:** `/apply` (new page)

**Fields:**
- Full name (required)
- Email (required)
- Website or existing platform URL (required)
- Primary content type — radio: "Books/writing," "Courses/teaching," "Sermons/preaching," "Podcasts/media," "Mixed" (required)
- Current audience size — radio: "Building (< 1,000)," "Growing (1,000-10,000)," "Established (10,000-100,000)," "Large (100,000+)" (required)
- What are you looking for? (textarea, required)
- How did you hear about Movemental? (optional, text)
- Referral name (optional — "If someone pointed you here, who?")

**Copy framing:** "This isn't a sales form. It's how we understand whether working together makes sense — for both of us."

**Placement:**
- Primary destination for "Apply to join" CTAs on `/movement-leaders` and home page
- Linked from nav header as secondary CTA when on `/movement-leaders` page

**Database:**
```sql
create table leader_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  website_url text not null,
  content_type text not null,
  audience_size text not null,
  message text not null,
  referral_source text,
  referral_name text,
  created_at timestamptz default now(),
  status text default 'new' -- new, reviewing, qualified, declined, active
);
```

### 2.2 Organization Inquiry Form

**What:** A structured intake form for churches, nonprofits, and institutions.

**Route:** `/inquiry` (new page) — or integrate as a tab/section on `/contact`

**Fields:**
- Organization name (required)
- Contact name (required)
- Email (required)
- Organization type — radio: "Church," "Nonprofit," "Denomination/network," "Educational institution," "Other" (required)
- Team size — radio: "1-5," "6-20," "21-50," "50+" (required)
- Current tools — checkboxes: "Website/CMS," "LMS/course platform," "Community platform," "Email marketing," "Giving/donations," "None of these" (multiple select)
- What are you trying to solve? (textarea, required)
- Timeline — radio: "Exploring," "Within 3 months," "Within 6 months," "Urgent" (required)
- Budget range — radio: "Not sure," "Under $15k," "$15k-$30k," "$30k-$50k," "$50k+" (optional)

**Copy framing:** "Tell us what you're working with. We'll tell you what we'd recommend — even if it's not us."

**Database:**
```sql
create table organization_inquiries (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  contact_name text not null,
  email text not null,
  org_type text not null,
  team_size text not null,
  current_tools text[], -- array of selected tools
  message text not null,
  timeline text not null,
  budget_range text,
  created_at timestamptz default now(),
  status text default 'new'
);
```

### 2.3 Formation Assessment (Lead Magnet)

**What:** A self-serve diagnostic tool that helps leaders and organizations evaluate their current formation system maturity.

**Route:** `/assess` (new page)

**Structure:** Multi-step form (not a single long page). 5 dimensions, 3 questions each = 15 questions total.

**Dimensions:**
1. **Content Infrastructure** — Do you have organized, accessible teaching content?
2. **Pathway Design** — Are people guided through a formation journey, or just consuming randomly?
3. **Community Integration** — Does learning happen in relationship, or in isolation?
4. **Sustainability** — Does your digital work generate revenue or depend on grants/donations?
5. **System Coherence** — Do your tools work together, or are they disconnected?

**Each question:** Likert scale (1-5) with descriptive anchors, not just numbers.

**Output:**
- Overall score (out of 75)
- Dimension breakdown with visual bars
- 2-3 sentence interpretation per dimension
- Recommendation: "Your biggest opportunity is in [lowest dimension]"
- CTA: "Want to talk about this? Start a conversation" → `/contact`

**Email capture:** Required to receive results. "Enter your email to see your full results."

**Design:**
- Clean, one-question-per-view on mobile
- Progress indicator (step 1 of 15, or by dimension)
- Results page uses `bg-card` cards for each dimension
- Score uses primary color for the filled portion of progress bars
- Share-friendly results URL (optional, stretch goal)

**Database:**
```sql
create table assessment_results (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  scores jsonb not null, -- { content: 12, pathways: 8, community: 15, ... }
  total_score integer not null,
  created_at timestamptz default now()
);
```

### 2.4 Case Studies Page

**What:** A case studies landing page + 2-3 individual case study pages.

**Route:** `/case-studies` (landing) + `/case-studies/[slug]` (individual)

**Landing page structure:**
- Hero: "Real work. Real formation. Real outcomes."
- Grid of case study cards (image, org name, one-line summary, segment tag)
- Filter by segment (leaders, churches, nonprofits) — client-side filter, not routes

**Individual case study structure:**
- Segment tag + org name
- The challenge (2-3 paragraphs)
- The approach (what Movemental built, which sprints)
- The outcome (measurable where possible, qualitative where not)
- Quote from the leader/org
- CTA: "Start a conversation"

**Navigation:** Add to "Proof" group (or renamed "Evaluate" group)

**Content:** Work with existing or pilot partners to write even brief stories. Placeholder structure is fine initially.

---

## Sprint 3: Growth Infrastructure (P2)

These create organic traffic paths and strengthen the mid-funnel.

### 3.1 Blog / Resources Section

**What:** A blog at `/blog` for thought leadership, SEO content, and top-of-funnel traffic.

**Route:** `/blog` (index) + `/blog/[slug]` (individual posts)

**Initial content plan (5 articles):**

1. **"What Is a Formation System?"** — Category-defining pillar. Targets: "formation system," "digital discipleship platform," "church technology stack." 2,000-3,000 words.

2. **"Formation vs. Growth: Why the Difference Matters"** — Philosophy piece. Targets: "church growth vs discipleship," "nonprofit impact measurement." 1,500-2,000 words.

3. **"The Movement Leader's Guide to Platform Economics"** — Practical guide. Targets: "online course platform pricing," "creator platform revenue share." 2,000 words.

4. **"Why Your Nonprofit's Digital Stack Is Holding You Back"** — Pain-point article. Targets: "nonprofit technology problems," "nonprofit tool consolidation." 1,500 words.

5. **"What to Expect from a Discovery Lab"** — Process transparency. Targets: "digital strategy discovery process." 1,000 words.

**Blog index structure:**
- Grid of article cards (title, excerpt, date, category tag)
- Category filter (Formation, Economics, Process, Technology)
- Featured article at top

**Individual post structure:**
- Use the Prose primitive for body content
- Author byline (once team section exists)
- Related articles at bottom
- Newsletter signup CTA at end of every post
- "Start a conversation" CTA at end of every post

**Navigation:** Add "Resources" or "Learn" group to nav. Initially just Blog.

### 3.2 Platform Walkthrough Page

**What:** A recorded video walkthrough of a real Movemental platform.

**Route:** `/walkthrough`

**Structure:**
- Hero: "See what a Movemental platform looks like"
- Embedded video (10-15 min, hosted on a privacy-respecting player — not YouTube)
- Below video: key timestamps with descriptions (click to jump)
- Below timestamps: "Ready to talk?" CTA
- Below CTA: 3 feature highlight cards linking to `/how-it-works`, `/system`, `/platform`

**Navigation:** Add to "How it works" group or as a standalone item.

### 3.3 Founder / Team Section on About Page

**What:** Add a team section to `/about` with founder and key team bios.

**Structure:**
- Section heading: "Who's building this"
- Grid of team cards (photo, name, role, 2-sentence bio)
- Photos: professional but not corporate. Match the editorial tone.
- Keep it small — 2-5 people. Quality over quantity.

**Design:**
- Cards use `bg-card` on `bg-section`
- Photos: rounded, not circular (editorial, not SaaS)
- Names in Display weight, roles in `text-muted-foreground`

### 3.4 Navigation Refinements

**Changes:**
1. Rename "Proof" → "Evaluate" in desktop and mobile nav
2. Add "Case Studies" to the Evaluate group (once built)
3. Elevate "Discovery Lab" — add it as a standalone text link next to the "Start a conversation" CTA button in the header, styled as a secondary action: "Explore the Discovery Lab"
4. Add "Contact" to the Company footer column
5. Link `/movemental-at-100` under Company in footer (label: "Movemental at 100")
6. Fix FAQ secondary CTA: change "Back to home" to "See pricing" → `/pricing`
7. Add "Who is a movement leader?" page CTA: "If this describes you, apply →" → `/apply`

### 3.5 Segment-Specific CTAs

**Update these pages to use differentiated conversion paths:**

| Page | Current CTA | New CTA | Destination |
|------|------------|---------|-------------|
| `/movement-leaders` | "Apply to join" → `/contact` | "Apply to join" → `/apply` | Leader application |
| `/churches` | "Talk with Movemental" → `/contact` | "Tell us about your church" → `/inquiry` | Org inquiry |
| `/nonprofits` | "Talk with Movemental" → `/contact` | "Tell us about your organization" → `/inquiry` | Org inquiry |
| Home audiences "Apply" card | → `/movement-leaders` | Keep as-is (routes to info page, which then routes to `/apply`) | No change |
| Home hero | "Start a conversation" → `/contact` | Keep as-is (general catch-all) | No change |

### 3.6 Organization Pricing Transparency

**What:** Add ballpark pricing ranges to the services pages.

**Where:** `/services`, `/services/system-builds`, `/pricing`

**Copy guidance:**
- Don't publish exact prices (they're scoped per conversation)
- Do publish ranges: "Discovery Labs typically range from $X-$Y. System builds from $A-$B."
- Frame as "investment" not "cost"
- Add ROI context where possible: "Organizations typically recoup their Discovery Lab investment within [timeframe] through [mechanism]."

---

## Implementation Sequence

```
Week 1: Sprint 1 (P0)
  ├── 1.1 Contact form (backend + frontend)
  ├── 1.2 Email address on contact page (immediate, 10 min)
  └── 1.3 Footer email capture

Week 2-3: Sprint 2 (P1)
  ├── 2.1 Leader application form + /apply page
  ├── 2.2 Organization inquiry form + /inquiry page
  ├── 2.3 Formation Assessment (multi-step form + results)
  └── 2.4 Case studies page structure (content can follow)

Week 4+: Sprint 3 (P2)
  ├── 3.1 Blog infrastructure + first 2 articles
  ├── 3.2 Platform walkthrough page (requires video production)
  ├── 3.3 Team section on about page
  ├── 3.4 Navigation refinements
  ├── 3.5 Segment-specific CTA updates
  └── 3.6 Pricing transparency updates
```

---

## Design Constraints (From DESIGN.md)

All new components must follow the Digital Curator design spec:

- **Tonal stacking, not borders.** Cards on sections, elevated on cards. No `border` for structure.
- **Semantic tokens only.** `bg-card`, `bg-section`, `bg-elevated`, `text-foreground`, `text-muted-foreground`. Never raw hex.
- **Primary is for actions.** Form submit buttons get the primary gradient. Labels and decorative elements do not.
- **Inter only.** Display headings: `-0.02em` tracking. Labels: uppercase + `0.05em` tracking.
- **Breathing layout.** If a form feels crowded, increase padding. Never shrink type.
- **`shadow-ambient` only if needed.** Prefer Ghost Lift (tonal stacking) over box shadows.

---

## Database Migration Checklist

All new tables in one migration:

1. `contact_submissions` — general contact form
2. `newsletter_subscribers` — footer email capture
3. `leader_applications` — movement leader applications
4. `organization_inquiries` — org intake form
5. `assessment_results` — formation assessment scores

Add RLS policies:
- All tables: no public read access
- Insert: allow anonymous inserts (public-facing forms)
- Read/update: service role only (admin dashboard, future)

---

## Success Criteria

| Metric | Baseline (Now) | Sprint 1 Target | Sprint 2 Target |
|--------|----------------|-----------------|-----------------|
| Contact form submissions | 0 (broken) | >0 per week | N/A |
| Newsletter signups | 0 (doesn't exist) | >0 per week | >10 per week |
| Leader applications | 0 (doesn't exist) | N/A | >0 per week |
| Assessment completions | 0 (doesn't exist) | N/A | >5 per week |
| Pages per session | Unknown | Baseline established | >3 avg |
