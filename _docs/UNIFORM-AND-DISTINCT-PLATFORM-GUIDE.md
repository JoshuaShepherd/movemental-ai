# Uniform vs. Distinct: Platform Guide for Movement Leaders

**Purpose**: Single reference for what is **uniform** (same for all movement leaders on the platform) and what is **distinct** (per-leader). Use for product decisions, design system scope, onboarding new leaders, and avoiding the "everyone looks the same" trap while keeping one codebase and one playbook.

**Last updated**: February 2026  
**Status**: Canonical. Aligns with 8-week playbook, pricing guide, design chain, and Movemental business model.

---

## 1. The Principle

- **Uniform** = the **chassis**: product structure, UX patterns, design system, access logic, pricing *model*, and platform plumbing. One build, one codebase, shared quality and fixes.
- **Distinct** = the **expression**: content, voice, branding, theme, portals, hero, AI persona, imagery, and configuration. Each leader's site feels like *theirs* without a custom product build.

**Risk to avoid**: Treating "uniform" as "one template, no levers" → generic, Facebook-like.  
**Intent**: Uniform = same engine. Distinct = different car: theme, content, voice, and identity levers give strong individuality within one platform.

---

## 2. What Is Uniform (Same for All Leaders)

The following are **the same** across every movement leader's site. No per-leader variants in structure or behavior.

### 2.1 Course experience

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Course player / learn page** | Layout: sidebar (weeks, sections, progress), main content area, section types in fixed order (Video → Scripture → Reading → Action → Reflection → Looking Ahead / Journey Continues). Prev/next nav, URL structure. |
| **Course progress** | How progress is tracked (per week, per section), progress bar, completion state. |
| **Course profile / completion** | Completion modal or state, certificate layout and structure (if offered). "What's next" pattern. |
| **Course landing** | Page structure: hero (badge, title, subtitle, format bar, cover), tabs (Overview, Curriculum), Overview sections (What You'll Learn, About, How It Works), Curriculum (expandable weeks/sections). |
| **8-week playbook** | Week roles (intro, core 1–6, integration 7, closing 8), section types, word-budget guidelines, formation arc (dissonance, reflection, action, integration/commissioning). |
| **Format bar pattern** | How format is displayed (e.g. "8 weeks · ~2–3 h/week · …"). One convention site-wide. |

**Distinct (see §3)**: Course *content* (video, reading, reflection prompts, outcomes), portal badge *label*, course titles, theme/visual treatment.

---

### 2.2 Book reader

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Reader layout** | TOC, chapter navigation, reading width, typography system, progress. |
| **Language toggle** | Behavior: one purchase = all languages; toggle in reader when owned. |
| **Purchase/preview logic** | Preview (e.g. first chapter) vs full access; same rules everywhere. |

**Distinct**: Book *content*, author, cover, which languages are available.

---

### 2.3 Articles

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Article template** | Reading layout, max-width, typography, byline position, related/CTA pattern. |
| **Discovery** | How articles appear in library (card, meta, link). |

**Distinct**: Article *content*, author/byline, imagery, tone.

---

### 2.4 AI Lab / chatbot

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Chat environment** | Message list, input, send, topic/approach selector (if any), layout and behavior. |
| **Capabilities** | Ask question, get answer, optional context onboarding flow (same *flow* structure). |

**Distinct**: Agent *name*, avatar, default greeting, system prompt, tone, and underlying *corpus* (so the bot feels like that leader).

---

### 2.5 Library / discovery

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Library structure** | Tabs (All, Books, Courses, Articles, etc.), card layout, search, filters. |
| **Card format** | Media area, badge, meta line, title, description, CTA pattern. |

**Distinct**: Which items appear, counts, content, imagery; not the layout of the library.

---

### 2.6 Navigation and information architecture

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Top-level nav** | Same slots (e.g. Themes/Portals, Library, Pricing, AI Lab) and order. Same wayfinding. |
| **Footer** | Same pattern (links, copyright, tagline). |
| **URL patterns** | e.g. `/library`, `/pricing`, `/courses/[slug]`, `/books/[slug]`, `/courses/[slug]/learn`. |

**Distinct**: Link labels can be tuned per leader if needed (e.g. "Portals" vs "Themes"); primary nav *structure* stays the same.

---

### 2.7 Pricing model and page structure

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Pricing model** | Free tier (preview + articles), Member tier (subscription), one-time options (book, course, bundles). Revenue share logic (e.g. 90/10). |
| **Pricing page structure** | Hero/headline, Free tier block, Member tier block, one-time options block, revenue line. Order and layout. |
| **Checkout flow** | Initiate → payment provider → success/cancel. Receipt and confirmation pattern. |

**Distinct**: Actual *prices*, which products exist (how many courses, books, bundles), and optional copy.

---

### 2.8 Auth, account, and subscription

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Auth** | Sign-in/sign-up flow, session, password reset. |
| **Account / dashboard** | "My courses," "My books," subscription status, cancel/update payment. One account model. |
| **Access rules** | Logic for "has access" (preview vs full, purchase vs subscription, Member = all courses + all books). |

**Distinct**: Which content appears in *my* list (per user and per leader); not the account UX.

---

### 2.9 Design system (the system itself)

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Design chain** | Tokens, typography scale, spacing, components (buttons, cards, CTAs, inputs), section patterns. One design system. |
| **Baseline** | Accessibility (contrast, focus, touch targets), responsive breakpoints, semantics. |
| **Component set** | Same primitives and components available to every site. |

**Distinct**: *Theme* (palette, accent, optional font choice), logo, favicon, and any theme-specific overrides (see §3).

---

### 2.10 Portals/themes (as a concept)

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Concept** | Content is organized by "portals" or "themes" (e.g. frameworks, topics). Same *idea* and UX for "browse by portal." |

**Distinct**: Portal *names*, *count*, and *content* (e.g. one leader has mDNA, APEST, Forgotten Ways; another has a different set).

---

### 2.11 Platform-level and quality

| Element | Uniform (same for everyone) |
|--------|-----------------------------|
| **Legal** | Terms of use, privacy policy, accessibility statement (one place to update; leader name where needed). |
| **SEO/metadata pattern** | Title pattern (e.g. "{Page} — {Leader name}"), meta description shape, OG. |
| **Quality baseline** | WCAG expectations, performance, one codebase to fix and improve. |

**Distinct**: Actual meta *copy* and leader name in titles.

---

## 3. What Is Distinct (Per Leader)

The following **vary by leader** and are the main levers for individuality.

### 3.1 Content

| Element | Distinct (per leader) |
|--------|------------------------|
| **Courses** | Titles, outcomes, weekly content (video, scripture, reading, action, reflection), portal assignment. |
| **Books** | Titles, chapters, translations, cover, synopsis. |
| **Articles** | Full text, byline, imagery, topics. |
| **Reflection prompts, exercises** | All in-course and in-article prompts and actions. |

---

### 3.2 Voice and copy

| Element | Distinct (per leader) |
|--------|------------------------|
| **Voice** | Tone (prophetic, pastoral, academic, etc.), vocabulary, theological posture. |
| **Microcopy** | Buttons, empty states, CTAs, error messages (within the same *slots*). |
| **Hero and positioning** | Headline, subhead, lead, primary CTA text. |
| **About / story** | Bio, "why I do this," org affiliations. |

---

### 3.3 Branding and theme

| Element | Distinct (per leader) |
|--------|------------------------|
| **Theme** | Palette (e.g. Royal Warmth vs Scout Horizon), accent color, optional typeface within the system. |
| **Logo and mark** | Leader's logo, favicon. |
| **Imagery** | Hero image, course covers, book covers, article images. |

---

### 3.4 Portals/themes (the set)

| Element | Distinct (per leader) |
|--------|------------------------|
| **Portal names** | e.g. mDNA, APEST, Forgotten Ways vs another leader's framework names. |
| **Portal count and order** | How many portals, how they're ordered and emphasized. |
| **Portal content** | What lives under each portal (courses, articles, etc.). |

---

### 3.5 AI Lab persona

| Element | Distinct (per leader) |
|--------|------------------------|
| **Agent name** | e.g. "AL" for Alan. |
| **Avatar** | Image or icon for the agent. |
| **Default greeting / prompt** | First message or suggested questions. |
| **Corpus and training** | Underlying content (books, articles, courses) and voice so answers feel like that leader. |

---

### 3.6 Product mix and pricing (values)

| Element | Distinct (per leader) |
|--------|------------------------|
| **Prices** | Actual dollar amounts for Member, single course, single book, bundles (within the same *model*). |
| **Product set** | How many courses, how many books, whether they offer bundles. |
| **Optional copy** | Pricing page taglines or notes per leader. |

---

### 3.7 Organizations and links

| Element | Distinct (per leader) |
|--------|------------------------|
| **Orgs** | Which organizations they highlight (founded, partner, etc.). |
| **External links** | Speaking, contact, social, donations—where they point. |

---

## 4. Summary Tables

### Quick reference: uniform vs distinct by area

| Area | Uniform | Distinct |
|------|---------|----------|
| **Course player / learn** | Layout, section order, progress, completion | Course content, portal badge, outcomes, copy |
| **Book reader** | Layout, TOC, language toggle, access rules | Book content, author, cover, languages |
| **Articles** | Template, reading layout, discovery | Content, byline, imagery |
| **AI Lab** | Chat UI, input, capabilities | Agent name, avatar, prompt, corpus, tone |
| **Library** | Tabs, card layout, search | Items, counts, content, imagery |
| **Nav / IA** | Slots, order, URL patterns | Optional label tweaks |
| **Pricing** | Model, page structure, checkout flow | Prices, product set, copy |
| **Auth / account** | Sign-in, dashboard, access rules | Content in "my" lists |
| **Design system** | Tokens, components, baseline | Theme, logo, imagery |
| **Portals** | Concept (organize by portal) | Names, count, order, content |
| **Legal / SEO** | Structure, pattern | Copy, leader name |

### What makes a site feel like "theirs"

- **Theme** (colors, logo)  
- **Content** (courses, books, articles)  
- **Voice** (copy, microcopy, hero)  
- **Portals** (their frameworks, their names)  
- **AI persona** (name, avatar, answers)  
- **Imagery** (hero, covers, photos)  
- **About and orgs**  
- **Pricing mix** (what they offer, at what price)

---

## 5. Why This Split

- **Scale**: One codebase per surface; fix and improve once for all leaders.  
- **Quality**: One playbook (e.g. 8-week formation) so every leader gets the same high bar.  
- **Identity**: Differentiation by content and expression, not by rebuilding the product.  
- **Cost**: No per-leader custom builds for player, reader, or chat.  
- **Scenius**: Shared platform and credibility network; distinct voices and content.  

---

## 6. How to Use This Guide

- **Product**: When adding a feature, decide if it's part of the chassis (uniform) or a leader lever (distinct).  
- **Design**: Design system = uniform; themes and content = distinct. Don't add one-off layouts per leader.  
- **Onboarding**: New leaders get the same product; they supply content, theme, voice, and AI corpus.  
- **Avoid**: Treating "uniform" as "one template, no levers." Use §3 to ensure enough distinct levers for individuality.

---

## 7. Related Documentation

| Doc | Path | Contents |
|-----|------|----------|
| 8-Week Course Playbook | alan-hirsch-html `_docs/08-WEEK-COURSE-PLAYBOOK.md` | Uniform course structure, section types, Alan instantiation |
| Getting Courses Right | alan-hirsch-html `_docs/GETTING-COURSES-RIGHT-FORMATIONAL-GUIDE.md` | Formational arc, checklist, movement leader process |
| Pricing Guide | alan-hirsch-html `_docs/ALAN-HIRSCH-PRICING-GUIDE-AND-STRATEGY.md` | Pricing model, tiers, uniform structure vs distinct prices |
| Design Chain SSOT | alan-hirsch-html `_docs/design-chain/DESIGN_CHAIN_SSOT.md` | One design system, tokens → components → pages |
| AI individual site | `_docs/ai-vision/02_individual-site-presentation.md` | Leader-focused AI messaging, voice preservation |
