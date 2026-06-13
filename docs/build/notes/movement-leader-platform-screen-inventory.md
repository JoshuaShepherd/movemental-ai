# Movement leader platform — total front-end screen inventory

**Date:** 2026-06-13  
**Scope:** Every **public learner-facing screen** that a movement leader tenant platform shares with every other movement leader on Movemental infrastructure — not Alan Hirsch specifically, not the Movemental organizational site (`movemental.ai`), and not staff-only operator surfaces.

**Reference implementation:** `alan-hirsch` tenant app (`/home/josh/dev/01-Movemental-Core/alan-hirsch`). Canonical product map: `_docs/_build/design/stitch-docs/06-PLATFORM-PAGES.md`. Engineering boundary: `_docs/_build/engineering/PLATFORM_GUIDE.md`.

**Related notes in this repo:**

- [author-profile-content-architecture-proposal.md](./author-profile-content-architecture-proposal.md) — dossier/onboarding content model (mostly dashboard-side)
- [movement-leader-information-kinds-inventory.md](./movement-leader-information-kinds-inventory.md) — research corpus kinds (upstream of published screens)
- [onbuilding-4-week-course-SSOT.md](./onbuilding-4-week-course-SSOT.md) — course structure conventions
- [site-pages-architecture-and-navigation-map.md](./site-pages-architecture-and-navigation-map.md) — **Movemental org site** IA (different product)

---

## 1. What this inventory is for

Movement leader platforms are **one deployment per trusted voice**, forked from a shared codebase and wired to the shared Movemental database via `TENANT_ORG_ID`. The **route shells, navigation architecture, course hub, library taxonomy, and pathway/scrollytelling pattern are identical** across tenants. What differs per leader lives in `tenant.config.ts` (copy, themes/pathways, feature flags, available slugs) and in published content rows — never in bespoke page routes.

This document answers: **“What screens must exist (or be planned) on every movement leader’s public site?”**

### Three product layers (shared architecture)

Every tenant implements the same three layers described in the platform design canon:

| Layer | Surfaces | Purpose |
|-------|----------|---------|
| **Information** | Pathways, content library (articles, books, podcasts, videos), frameworks | Browse, discover, go deep by theme |
| **Transformation** | Courses (8-week formation arc), assessments, formation practices | Structured change — dissonance, action, reflection, community |
| **Conversation** | AI Lab, floating chat, course-embedded formation companion | Personalized, interactive exploration |

### What is *not* in this inventory

| Surface | Where it lives | Why excluded |
|---------|----------------|--------------|
| Movemental marketing site (`/`, `/fragmentation`, `/organizations`, …) | `movemental-ai` `(site)` / `(paper)` routes | Organizational product, not tenant platform |
| Author onboarding dossier (`/profile`, `/welcome`, corpus review) | `movemental-visual-editor-main` + dashboard rewrites | Authenticated leader workspace, not public learner site |
| Staff admin (onboarding table, design tokens, content repurposing) | Dashboard / visual editor | Operator tooling |
| Dev-only pages (`/hero-showcase`, `/sentry-example-page`, course template showcase) | Tenant repo, non-production | Not part of shipped tenant product |

---

## 2. Canonical navigation (identical across tenants)

Primary chrome is **`SiteBar`** + **`PublicFooter`** inside `(public)/PublicLayoutClient`. Labels are tenant-configurable; **href structure is fixed**.

### Primary header (desktop center + mobile hamburger)

| Nav label (template) | Route | Notes |
|----------------------|-------|-------|
| Library | `/content` | Tabbed hub for all content types |
| Pathways | `/pathways` | Thematic portals / scrollytelling entry |
| Courses | `/courses` | Catalog + per-course hub (not under `/content`) |
| AI Lab | `/ai-lab` | Immersive mode hides center nav on AI Lab + course learn surfaces |
| About `{Leader}` | `/about` | Hamburger-only on reference tenant; footer on all |
| Search | `/search` | Header icon when `features.search` enabled |
| Sign In | `/auth/signin` | Header CTA when `features.auth` enabled |

**Immersive mode** (center nav hidden): `/ai-lab/*`, `/courses/[slug]/(overview|learn|journal|cohort|resources)`.

### Footer explore columns (template)

- **Explore:** Pathways, Content Library, Books, Courses, AI Lab  
- **Resources:** About, Pricing, Newsletter anchor, Contact  
- **Organizations:** External links from `tenant.config` org grid  
- **Legal:** Privacy, Terms, Accessibility  

### Authenticated learner sidebar (`UserDashboardSidebar`)

| Label | Route | Status |
|-------|-------|--------|
| Dashboard | `/account` | Live |
| My Pathways | `/account/pathways` | **Nav link exists; page not yet implemented** |
| My Learning | `/account/learning` | Live |
| Library | `/account/library` | Live |
| AI Lab | `/ai-lab` | Public route |

### Course hub tabs (`CourseHubShell`)

Fixed tab order for every course slug:

`/courses/[slug]/overview` · `/learn` · `/journal` · `/cohort` · `/resources`

Plus cross-links to `/account/learning?course=…` and AI Lab.

---

## 3. Feature flags and content-type toggles

Route **shells** ship for all tenants. **Nav visibility and empty states** respect `tenant.config.ts` → `features`:

| Flag | Affects |
|------|---------|
| `articles` | `/content/articles/*` |
| `books` | `/content/books/*` |
| `courses` | `/courses/*` |
| `podcasts` | `/content/podcasts/*` |
| `videos` | `/content/videos/*`, `/content/video-series/*` |
| `videoSeries` | Series index/detail under content |
| `themes` / pathways | `/pathways/*` |
| `assessments` | `/assessments/*` |
| `formation` | `/formation/*` |
| `chat` | Floating chat + `/chat` |
| `search` | `/search` |
| `auth` | Auth + account surfaces |
| `certificates` | Certificate + verify routes |
| `aiLabNotebookVariant` | Notebook-style AI Lab vs archive fallback |

Pathway **themes** (the five portals + map) are config-driven via `tenantConfig.themes[]` — same page template, different slugs and copy per leader.

---

## 4. Total screen inventory

**Convention:** `[slug]` = tenant-published content slug. **Auth** = middleware or in-page gate on reference implementation.

**Screen count:** ~70 production learner-facing routes (excluding dev, redirects-only, and sibling-dashboard surfaces).

---

### 4.1 Home and front door

| Route | Screen | Layer | Auth | Nav / entry |
|-------|--------|-------|------|-------------|
| `/` | **Home** — hero (leader portrait + conviction), social proof org strip, pathway card grid, AI Lab teaser, content sampler, course spotlight, assessment CTA, about band, newsletter signup, interest router | All three | Public | Logo; campaign links |
| `/search` | Platform-wide content search | Information | Public | Header icon |
| `/lp/[slug]` | Campaign landing → redirect with UTM merge to pathway, course, assessment, or AI Lab | Conversion | Public | Ads/email only |

**Home sections (shared template, tenant copy):**

1. Hero — two CTAs: “Find your pathway” / “Enter the AI Lab”  
2. Affiliated organizations strip  
3. Core conviction quote  
4. Pathway portal cards (from `themes[]`)  
5. AI Lab invitation band  
6. Recent/featured content sampler (cross-type)  
7. Course spotlight  
8. Assessment invitation  
9. Brief editorial about band → `/about`  
10. Newsletter capture  
11. Navigation router (quick links by interest)

---

### 4.2 Pathways — thematic portals and scrollytelling pillars

Long-form, scroll-driven **pillar pages** are a first-class commitment: each pathway is a formation journey, not a blog category.

| Route | Screen | Auth | Nav |
|-------|--------|------|-----|
| `/pathways` | **Pathways hub** — hero, bento grid of portals, interconnection map, archive/teaser | Public | Primary |
| `/pathways/map` | **Five-portals orientation map** (standalone) | Public | From hub |
| `/pathways/[slug]` | **Pathway pillar page** — scrollytelling sequence | Public | Primary + home cards |

**Standard pillar page sections** (same component system for every `[slug]`):

| Section | Purpose |
|---------|---------|
| Hero | Portal name, hand-line emphasis, entry CTA |
| Theological / conceptual reframe | “What changes if you see it this way?” |
| Framework explanation | Leader’s named model for this theme |
| Practices | Actionable exercises |
| Case study or story | Grounded example |
| Scripture / source anchor | Where applicable to leader tradition |
| FAQ | Objections and clarifications |
| Impact / outcomes | What shifts for the practitioner |
| AI Lab invitation | Contextual chat entry |
| Related courses & content CTAs | Cross-link to `/courses` and `/content` |

**Typical pathway slugs** (count and names vary per tenant config; Alan reference uses five + map):

- Theme 1 — e.g. movement DNA / “forgotten ways”  
- Theme 2 — e.g. metanoia / paradigm shift  
- Theme 3 — e.g. reframation / worldview recovery  
- Theme 4 — e.g. discipleship / missional practice  
- Theme 5 — e.g. movement intelligence  
- Optional: `glossary-*`, `five-portal-pathway-map`, GSAP demo variant for scroll choreography QA  

---

### 4.3 Content library — shared taxonomy

The library uses **one hub** plus **parallel type indexes**. Courses catalog lives at `/courses` (not `/content/courses`).

#### Hub

| Route | Screen | Auth | Nav |
|-------|--------|------|-----|
| `/content` | **Library hub** — tabs: All, Articles, Books, Courses (link-out), Podcasts, Videos; search/filter | Public | Primary “Library” |

#### Articles

| Route | Screen | Auth |
|-------|--------|------|
| `/content/articles` | Article index — grid/list, theme filters | Public |
| `/content/articles/[slug]` | **Article reader** — TOC, key takeaways, author bio, related articles | Public |

#### Books

| Route | Screen | Auth |
|-------|--------|------|
| `/content/books` | Book catalog — covers, browse | Public |
| `/content/books/[slug]` | **Book detail** — synopsis, key ideas, TOC, purchase/access tiers, related content | Public |
| `/content/books/[slug]/read` | **Book reader** — chapter nav, progress, annotations; “world-quieting” reading chrome | Public* |

\*Access may gate at API by purchase/subscription tier.

#### Podcasts

| Route | Screen | Auth |
|-------|--------|------|
| `/content/podcasts` | Podcast series index | Public |
| `/content/podcasts/browse` | Rich library landing — featured, grid, bento | Public |
| `/content/podcasts/[slug]` | Series detail + episode list | Public |
| `/content/podcasts/episodes/[slug]` | **Episode player** — show notes, subscribe links | Public |

#### Videos

| Route | Screen | Auth |
|-------|--------|------|
| `/content/videos` | Video index | Public |
| `/content/videos/[slug]` | **Video detail / player** | Public |
| `/content/video-series` | Video series index | Public |
| `/content/video-series/[slug]` | Series detail + episode navigation | Public |

**Shared content piece types** every leader platform is built to publish:

- Long-form article  
- Book (detail + in-platform reader)  
- Podcast series + episodes  
- Standalone video + serialized video series  
- (Courses — separate route tree, §4.4)  

---

### 4.4 Courses — identical LMS architecture

Every leader gets the same **course hub shell** and **8-week formation arc** convention (see [onbuilding-4-week-course-SSOT.md](./onbuilding-4-week-course-SSOT.md) for structural SSOT; production uses expanded hub tabs).

| Route | Screen | Auth | Hub tab |
|-------|--------|------|---------|
| `/courses` | **Courses catalog** | Public | Primary nav |
| `/courses/[slug]` | **Course marketing landing** — hero, curriculum arc, pricing, enroll CTA, instructor bio | Public | — |
| `/courses/[slug]/sales` | Alternate sales landing variant | Public | — |
| `/courses/[slug]/enroll` | **Enrollment flow** | Public | From landing |
| `/courses/[slug]/overview` | **Learner overview** — curriculum tree, progress summary | Public | Overview |
| `/courses/[slug]/learn` | **Main LMS** — week/section sidebar, lesson body, progress, formation chat embed | **Auth**† | Learn |
| `/courses/[slug]/journal` | **Formation journal** | Public | Journal |
| `/courses/[slug]/cohort` | **Cohort** — schedule, discussions, facilitator | Public | Cohort |
| `/courses/[slug]/resources` | **Resources** — glossary, bibliography, downloads | Public | Resources |
| `/courses/[slug]/player` | Legacy/alternate video lesson layout | Public | — |
| `/courses/[slug]/certificate` | **Completion certificate** (print/PDF) | Auth + enrollment | Post-completion |

†Reference tenant: middleware auth on `/learn`; optional **public preview** for designated slugs via signed `course_preview` token.

**Course learn UX (shared):**

- Sidebar: weeks → sections → lessons  
- Deep links: `?week=N&section=slug`  
- Mark complete / progress persistence  
- Embedded AI formation companion (context = course + lesson)  
- No gamification badges or streak notifications (platform canon)

---

### 4.5 Assessments

| Route | Screen | Auth |
|-------|--------|------|
| `/assessments` | **Assessment hub** — published instruments as cards | Public |
| `/assessments/[slug]` | **Assessment landing** — what it measures, duration, CTA | Public |
| `/assessments/[slug]/take` | **Question flow** — paced; space for reflection | **Auth** |
| `/assessments/[slug]/results` | **Scored profile** — recommendations, pathway/course links | **Auth** |
| `/assessments/share/[token]` | **Shareable results** (read-only) | Public |

Assessments are **templatized**: one generic taker/results UI per tenant; scoring display varies by instrument config, not by bespoke routes.

---

### 4.6 AI Lab and chat

| Route | Screen | Auth | Notes |
|-------|--------|------|-------|
| `/ai-lab` | **AI Lab home** — Sources \| Chat \| Studio (notebook variant) | Public | Primary nav |
| `/ai-lab/chat` | Full-page chat | Public | |
| `/ai-lab/notebook` | Notebook sub-surface | Public | Variant-gated |
| `/ai-lab/context` | User context profile (onboarding steps) | Public | |
| `/ai-lab/about` | AI authorship guide — commitments, writing spectrum, limits | Public | Linked from chat disclaimer |
| `/chat` | Full-page floating chat shell | Public | `/lp/ai-lab` may redirect here |
| `/ai-lab-archive` | Legacy chat bench | Public | Fallback when notebook variant off |

**Global chrome:** `FloatingChatButton` on most public pages when `features.chat` enabled; passes page context (content type, slug, title) to `/api/ai/chat`.

**Legacy redirects (keep for bookmarks):** `/ai-lab-new` → `/ai-lab`; `/ai-commitments`, `/ai-writing-spectrum` → `/ai-lab/about`.

---

### 4.7 Frameworks and formation

| Route | Screen | Auth | Nav |
|-------|--------|------|-----|
| `/frameworks` | **Frameworks hub** — leader’s named models (mDNA, APEST, etc.) | Public | Linked from pathways/content |
| `/frameworks/[slug]` | **Framework detail** | Public | — |
| `/formation` | **Formation hub** — practices entry | Public | — |
| `/formation/practices` | **Formation practice tracker** | **Auth** (client gate) | — |

---

### 4.8 About and core informational pages

| Route | Screen | Auth | Nav |
|-------|--------|------|-----|
| `/about` | **Leader about** — hero, stats, credentials, career arc, org grid | Public | Hamburger + footer |
| `/contact` | Contact form — speaking, partnerships, general | Public | Footer |
| `/pricing` | Subscription tiers (Free / Reader / Leader) + FAQ | Public | Footer |
| `/organizations` | Partner / affiliate org grid | Public | Footer + home strip |
| `/facilitators` | Cohort facilitator philosophy | Public | Optional |
| `/donate` | Donation | Public | Optional |
| `/privacy` | Privacy policy | Public | Footer legal |
| `/terms` | Terms of service | Public | Footer legal |
| `/accessibility` | Accessibility statement | Public | Footer legal |
| `/newsletter/unsubscribed` | Post-unsubscribe confirmation | Public | Email flow only |

**About page blocks (shared template):**

- Portrait hero + vocation line  
- Credibility stats (books, countries, years, orgs)  
- Biography prose (from tenant config + CMS)  
- Key frameworks callout  
- Organizations / network grid with external links  
- CTA to pathways, library, or AI Lab  

---

### 4.9 Authentication and learner account

#### Auth

| Route | Screen | Auth |
|-------|--------|------|
| `/auth/signin` | Sign in (+ `?redirect=` return path) | Public |
| `/auth/signup` | Sign up (+ plan query param) | Public |
| `/auth/verify-email` | Email verification | Public |

#### Account (learner dashboard on public site)

| Route | Screen | Auth |
|-------|--------|------|
| `/account` | **Account home** — overview, shortcuts | **Auth** |
| `/account/profile` | Profile settings | **Auth** |
| `/account/learning` | **My learning** — enrollments, progress, next lesson | **Auth** |
| `/account/library` | **My library** — purchased books, saved content | **Auth** |
| `/account/bookmarks` | Saved bookmarks across types | **Auth** |
| `/account/pathways` | **My pathways** — saved portal progress | **Auth** — **planned; nav stub only** |

---

### 4.10 Commerce and certificates

| Route | Screen | Auth |
|-------|--------|------|
| `/checkout` | Stripe checkout session | Public* |
| `/checkout/success` | Purchase confirmation | Public |
| `/checkout/cancel` | Cancelled checkout | Public |
| `/certificates/verify/[code]` | Public certificate verification | Public |

\*Checkout may require auth at API depending on product.

---

### 4.11 Multi-org publication surface (network pattern)

Substack-style publication routes for organizations in the Movemental network — **shared route shell**, not every leader enables:

| Route | Screen | Auth |
|-------|--------|------|
| `/[orgSlug]` | Publication home — post list, subscribe | Public |
| `/[orgSlug]/about` | Publication about | Public |
| `/[orgSlug]/p/[slug]` | Post detail — paywall, comments, access levels | Public |

---

## 5. Auth gate summary

| Gate | Routes |
|------|--------|
| **Middleware → sign-in** | `/account`, `/account/*`, `/dashboard`, `/dashboard/*`, `/assessments/[slug]/take`, `/assessments/[slug]/results`, `/courses/[slug]/learn` |
| **In-page server auth** | `/courses/[slug]/certificate` |
| **Client `useRequireAuth`** | `/formation/practices`, account pages (defense in depth) |
| **Public** | All other routes in §4 |

---

## 6. Screens outside the public tenant repo

These are part of the **movement leader product** but live in **`movemental-visual-editor-main`** / **`movemental-ai` `(dashboard)`**, not in the Alan-style public `(public)` route group:

| Surface | Typical routes | Audience |
|---------|----------------|----------|
| Onboarding checklist | `/welcome`, `/onboarding/*` | Newly provisioned leader |
| Author dossier | `/profile` (6-part, 22-section) | Leader + staff |
| Corpus review | `/onboarding/corpus` | Leader |
| Content authoring / CMS | Visual editor app | Leader + editors |
| Workspace dashboard | `/dashboard`, Program, Leader workspace | Authenticated org members |

Public learners **never** see dossier or onboarding; they see §4.

---

## 7. Known gaps and doc drift (as of reference audit)

| Item | Status |
|------|--------|
| `/account/pathways` | Linked in account nav; **no page** |
| `/courses` under `/content/courses` | **Docs outdated**; production uses `/courses` |
| `(app)/dashboard/*` in tenant repo | Minimal (AI Lab print only); real CMS is visual editor |
| `/profile` in legacy `PublicHeader` | Should be `/account/profile` |
| Assessment nav in primary header | In design docs; **not** in live `SiteBar` (hub reachable from home) |
| Dev pages | `/hero-showcase`, `/courses/template-showcase/learn`, `/ai-lab/test/*` — exclude from tenant product checklist |

---

## 8. Per-tenant customization checklist

When standing up a new movement leader, **no new routes** are required. Customize:

1. **`tenant.config.ts`** — name, tagline, hero, themes/pathways array, feature flags, org links, chat strings  
2. **`globals.css`** — brand CSS variables  
3. **Published content rows** — slugs populate `[slug]` segments  
4. **Pathway count** — typically 3–5 portals + map; each uses the same pillar template  
5. **Subscription tiers** — pricing page copy; Stripe products  
6. **Optional disables** — e.g. `features.podcasts: false` removes nav tabs and empty indexes  

---

## 9. Quick route index (alphabetical)

```
/                                    Home
/about                               Leader about
/accessibility                       Accessibility
/account                             Account home
/account/bookmarks                   Bookmarks
/account/learning                    My learning
/account/library                     My library
/account/pathways                    My pathways (planned)
/account/profile                     Profile settings
/ai-lab                              AI Lab home
/ai-lab/about                        AI authorship guide
/ai-lab/chat                         AI Lab chat
/ai-lab/context                      User context profile
/ai-lab/notebook                     Notebook surface
/ai-lab-archive                      Legacy chat bench
/assessments                         Assessment hub
/assessments/[slug]                  Assessment landing
/assessments/[slug]/results          Results (auth)
/assessments/[slug]/take             Take flow (auth)
/assessments/share/[token]           Shared results
/auth/signin                         Sign in
/auth/signup                         Sign up
/auth/verify-email                   Verify email
/certificates/verify/[code]          Certificate verify
/chat                                Full-page chat
/checkout                            Checkout
/checkout/cancel                     Checkout cancelled
/checkout/success                    Checkout success
/contact                             Contact
/content                             Library hub
/content/articles                    Articles index
/content/articles/[slug]             Article reader
/content/books                       Books index
/content/books/[slug]                Book detail
/content/books/[slug]/read           Book reader
/content/podcasts                    Podcasts index
/content/podcasts/browse             Podcasts browse
/content/podcasts/[slug]             Series detail
/content/podcasts/episodes/[slug]    Episode player
/content/video-series                Video series index
/content/video-series/[slug]         Series detail
/content/videos                      Videos index
/content/videos/[slug]               Video detail
/courses                             Courses catalog
/courses/[slug]                      Course landing
/courses/[slug]/certificate          Certificate (auth)
/courses/[slug]/cohort               Cohort tab
/courses/[slug]/enroll               Enroll
/courses/[slug]/journal              Journal tab
/courses/[slug]/learn                Learn (auth)
/courses/[slug]/overview             Overview tab
/courses/[slug]/player               Lesson player alt
/courses/[slug]/resources            Resources tab
/courses/[slug]/sales                Sales variant
/donate                              Donate
/facilitators                        Facilitators
/formation                           Formation hub
/formation/practices                 Practices (auth)
/frameworks                          Frameworks hub
/frameworks/[slug]                   Framework detail
/lp/[slug]                           Campaign redirect
/newsletter/unsubscribed             Unsubscribed confirm
/organizations                       Organizations grid
/pathways                            Pathways hub
/pathways/map                        Pathway map
/pathways/[slug]                     Pathway pillar (scrollytelling)
/pricing                             Pricing
/privacy                             Privacy
/search                              Search
/terms                               Terms
/[orgSlug]                           Publication home
/[orgSlug]/about                     Publication about
/[orgSlug]/p/[slug]                  Publication post
```

---

## 10. Source references

| Document | Location |
|----------|----------|
| Platform pages map | `alan-hirsch/_docs/_build/design/stitch-docs/06-PLATFORM-PAGES.md` |
| Platform & audience (three layers) | `alan-hirsch/_docs/_build/design/stitch-docs/01-PLATFORM-AND-AUDIENCE.md` |
| Platform engineering guide | `alan-hirsch/_docs/_build/engineering/PLATFORM_GUIDE.md` |
| Multi-tenant scoping | `alan-hirsch/_docs/_build/engineering/MULTI_TENANT_SCOPING.md` |
| Templatized features baseline | `alan-hirsch/_docs/_build/_prompts/supporting/templatized-platform-features-build-prompt.md` |
| Live nav | `alan-hirsch/src/components/navigation/SiteBar.tsx` |
| Type safety chain | `movemental-ai/docs/architecture/TYPE_SAFETY_CHAIN.md` |

---

*This inventory describes shared tenant **front-end** screens. Dashboard, dossier, and Movemental org marketing IA are documented separately.*
