# Dave Ferguson Platform Mock-Up: Pages to Create

**Purpose:** This prompt walks through every page that needs to be created so this template can be **endorsed as a strong mock-up** — giving Dave Ferguson an actual visualization of how his Movemental-powered site might look. The model is the **Alan Hirsch flagship platform** (see `_docs/business-docs/02_product_platform/architecture/alan_hirsch_flagship_platform_spec.md` and `_docs/business-docs/08_integrated_design/alan-hirsch-platform-mvp-guide.md`), **adapted for Dave**: same structure and intent, content and voice drawn from `_docs/movement_leader_research/dave-ferguson/`.

**Current state:** This directory contains the **editorial-theme home page** only (`index.html` + `styles/dave-ferguson-editorial.css`). Nav and footer already link to the pages listed below; those targets do not exist yet. Creating them (as static HTML in this directory, reusing the same CSS and nav/footer pattern) will complete the mock-up.

---

## Reference: Alan Hirsch Model

The Alan Hirsch platform spec defines:

- **Public-facing:** Homepage, About, Speaking/Consulting, Contact, Legal, Ethics
- **Content:** Blog/Articles index + article pages, book integration, podcast, video, resource library
- **Monetization / membership / LMS:** Optional for mock-up; can be “Coming soon” or omitted

For **Dave’s mock-up**, we mirror the same **page set** with Dave-specific content and roles: Community Christian Church, NewThing Network, Exponential Conference, 9+ books (Hero Maker, Exponential, B.L.E.S.S., etc.), and multiplication/church-planting positioning.

---

## Pages to Create (in order)

Create each of the following in `html/dave-ferguson/`. Use the same layout and design system as `index.html` (same nav, footer, `e-theme`, `styles/dave-ferguson-editorial.css`). All copy should be traceable to `_docs/movement_leader_research/dave-ferguson/` (summary, movemental-analysis, content-analysis, content-marketing-playbook, identity-verification, gap-analysis, digital-presence-discovery).

---

### 1. **Home** — `index.html` ✅ *Done*

**Contains:**

- Hero: name, tagline (“Leadership multiplication & church planting”), subhead (Community Christian, NewThing, Exponential), primary CTA “Explore his work”
- Stats strip: 9+ books, Exponential (President/CEO), NewThing (visionary leader), Community Christian (co-founding pastor)
- Section 01 — Calling: leadership multiplication and church planting; systems that multiply; movement that outlasts you
- Section 02 — Audience: four personas (church multiplication leader, multi-site pastor, church planter, missional practitioner)
- Section 03 — Content/books: book chips (Hero Maker, Exponential, B.L.E.S.S., etc.) + platforms (daveferguson.org, CCC, NewThing, Exponential)
- Quote block: credibility in the room vs. online; “full picture isn’t assembled in one place that multiplies”
- Section 04 — Constraints: three value cards (Interconnection, Structure & repurpose, Ownership & discoverability)
- CTA: “Your content can multiply” + “Get in touch” → `contact.html`

**Status:** Implemented. Nav updated to same-dir links (Home, About, Books, Speaking, Get in touch); footer matches.

---

### 2. **About** — `about.html`

**Contains:**

- **Headline:** “About Dave” (or “About Dave Ferguson”)
- **Story / bio:** Co-founding pastor of Community Christian Church; visionary leader of NewThing Network; President/CEO of Exponential Conference. Brief narrative of multiplication focus: churches that multiply, leaders who multiply leaders. Optional: Lincoln Christian University (B.A.), Wheaton Graduate School (M.A.); family (Sue; Amy, Joshua, Caleb) if desired for tone.
- **Credibility markers:** Same stats as home (9+ books, Exponential, NewThing, Community Christian) in a compact block or list.
- **Photo:** Reuse `../../public/media-library/images/headshots/dave-ferguson.webp`.
- **Optional:** Short “Why a platform?” line tying to Movemental (one place that multiplies) with link to Contact or home CTA.

**Content source:** `identity-verification.md`, `summary.md`, `content-analysis.md` (voice/themes).

---

### 3. **Books** — `books.html`

**Contains:**

- **Headline:** “Books” or “Selected Works”
- **Lead paragraph:** One sentence on where his content lives (books, teaching, conferences) and that these are the published books — from summary/content-analysis.
- **Book list/grid:** All 9+ titles with short descriptor or co-author where relevant:
  - The Big Idea (2007)
  - Exponential: How You and Your Friends Can Start a Missional Church Movement (2010)
  - On The Verge (2011)
  - Discover Your Mission Now (2012)
  - Keeping Score (2013)
  - Finding Your Way Back to God (2015, co-authored with Jon Ferguson)
  - Starting Over
  - Hero Maker: Five Essential Practices for Leaders to Multiply Leaders
  - B.L.E.S.S.: 5 Everyday Ways to Love Your Neighbor and Change the World
- **Design:** Reuse `.e-book` chip style from home, or a simple card/list. Optional: “Available at Amazon, Christian book retailers, and publishers” or link placeholders.
- **CTA:** “Get in touch” or “Explore speaking” → `contact.html` or `speaking.html`.

**Content source:** `summary.md`, `identity-verification.md`, `digital-presence-discovery.md`.

---

### 4. **Speaking** — `speaking.html`

**Contains:**

- **Headline:** “Speaking & Events” or “Speaking”
- **Lead:** Dave speaks at Exponential (world’s largest church planting conference), NewThing Network events, Community Christian Church, and other conferences and churches. Invitation to inquire for events, keynotes, or workshops.
- **Topics (optional):** 3–5 themes drawn from content-analysis: Leadership multiplication, Church planting & multiplication, Missional living (B.L.E.S.S.), Spiritual journey / Finding Your Way Back to God, Church strategy and movement.
- **Format:** Simple list or cards. No need for a real booking widget in mock-up; a single CTA “Get in touch to inquire” → `contact.html` is enough.
- **Optional:** One testimonial or “Featured at” line (Exponential, NewThing, CCC).

**Content source:** `summary.md`, `content-analysis.md`, `identity-verification.md`, `gap-analysis.md` (teaching/speaking engagements).

---

### 5. **Contact** — `contact.html`

**Contains:**

- **Headline:** “Get in touch”
- **Short line:** For speaking inquiries, media, or general questions about Dave’s work — or about how Movemental could help his content multiply. (Tie to reflected-understanding / content-marketing-playbook.)
- **Form or placeholder:** Mock-up can use a simple form (Name, Email, Message) or a “Contact form coming soon” plus an email placeholder (e.g. via Movemental). No backend required for static mock-up.
- **Optional:** Links to daveferguson.org, Exponential, NewThing, Community Christian as “Elsewhere” so the mock-up feels like the hub.

**Content source:** `digital-presence-discovery.md`, `summary.md`; tone from playbook (multiplication, one place).

---

### 6. **Articles / Blog (optional for mock-up)** — `articles.html` or `blog.html`

**Contains:**

- **Headline:** “Articles” or “Blog”
- **Lead:** One sentence: content from Dave’s blog and repurposed talks/articles in one place (multiplication/discoverability message).
- **List:** 3–6 placeholder article cards (title + short excerpt + date). Copy can be generic (“Leadership multiplication in practice”, “B.L.E.S.S. in your neighborhood”, etc.) or pulled from content-analysis themes. Links can go to `#` or a single placeholder `article.html`.
- **Design:** Reuse section number + container + card styles; keep editorial look.

**Content source:** `summary.md`, `content-analysis.md` (content forms, themes). Omit if scope is “minimum viable mock-up”; include if the goal is to show a full content hub.

---

### 7. **Legal / Privacy (optional for mock-up)** — `privacy.html`

**Contains:**

- **Headline:** “Privacy Policy” (or “Privacy”)
- **Body:** Short placeholder: “This is a mock-up. A real Movemental-powered site would include the full privacy policy here.” Or one paragraph of generic privacy placeholder. No need for full legal text in a visualization mock-up.

**Purpose:** Footer already has a “Privacy” link; this page prevents a dead link and signals that the real site would have legal pages (as in the Alan Hirsch spec).

---

## Endorsement Checklist

Once the above pages exist, the mock-up can be **endorsed as a strong visualization** for Dave if:

- [ ] **Home** (`index.html`) is complete and matches the editorial design and Dave-specific content.
- [ ] **About** clearly presents Dave’s roles (CCC, NewThing, Exponential), credibility, and multiplication narrative.
- [ ] **Books** lists all 9+ titles with consistent styling and a path to “get in touch.”
- [ ] **Speaking** explains where and what he speaks on, with a clear CTA to contact.
- [ ] **Contact** offers a clear next step (form or placeholder) and optionally links to his existing platforms.
- [ ] **Nav and footer** are identical across all pages and point to the same set of pages (Home, About, Books, Speaking, Contact, Privacy if present).
- [ ] **Copy** is traceable to `_docs/movement_leader_research/dave-ferguson/`; no invented facts.
- [ ] **Assets:** Images use `../../public/media-library/images/headshots/dave-ferguson.webp` (or other approved assets under `public/`).

---

## Implementation Notes

- **Paths:** All asset paths from pages in `html/dave-ferguson/` use `../../public/` for project root (e.g. `../../public/media-library/...`). Styles use `styles/dave-ferguson-editorial.css`.
- **Nav active state:** Add `.active` to the current page’s nav link (e.g. `about.html` sets `class="active"` on the About link).
- **Logo link:** Nav logo can point to `index.html` (as in current `index.html`).
- **Reuse:** Same header, footer, and scroll/reveal script from `index.html` on every page; only `<main>` or equivalent content changes per page.

---

## Summary Table

| Page       | File          | Purpose |
|-----------|----------------|---------|
| Home      | `index.html`   | Full leader home: hero, stats, calling, audience, books, quote, value props, CTA. ✅ Done. |
| About     | `about.html`   | Bio, roles, credibility, photo; why one platform. |
| Books     | `books.html`   | All 9+ books; link to contact/speaking. |
| Speaking  | `speaking.html`| Topics, venues (Exponential, NewThing, CCC); CTA to contact. |
| Contact   | `contact.html` | Get in touch; form or placeholder; optional “elsewhere” links. |
| Articles  | `articles.html`| Optional; placeholder list of articles/themes. |
| Privacy   | `privacy.html` | Optional; placeholder for legal. |

Following this prompt and creating the listed pages (with content from the Dave Ferguson research) yields a **complete, endorsable mock-up** that gives Dave a real visualization of his site in the same model as Alan Hirsch, adapted for his roles, books, and multiplication message.
