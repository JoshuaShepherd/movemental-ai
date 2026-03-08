# Core Flow and Existing Content — Movemental.ai

**Purpose:** Single reference for the primary-audience flow (storyboard ↔ React pages) and the full reality of what exists today. Use this when making content or structure adjustments; retain the core design already begun.

**Flow (0–10):** Homepage → Fit → Not fit (graceful redirection) → Auth (sign up + sign in) → Tour → Decided (future) → How to decide (future) → How it works → Pricing → FAQ → Contact.

---

## 1. Flow step ↔ Route ↔ What exists

### 0 — Homepage

| Item | Reality |
|------|--------|
| **Route** | `/` |
| **Page** | `app/page.tsx` → `<HomepageContainer />` |
| **Component** | `components/homepage/HomepageContainer.tsx` |
| **Sections (in order)** | Navigation (fixed), DarkHeroSection, CredibilityChainSection (LogoBar), StatsSection, ProcessSteps, FeatureSection, CTASection, Footer |
| **Hero** | DarkHeroSection: “Your content is powerful. It just isn’t moving.” For movement leaders. CTAs: “Take the Self-Screen” → `/fit-check`, “Why Movemental” → `/why-movemental`. |
| **Process steps** | 1) Self-Screen (CTA `/fit-check`), 2) Map Your Content & Credibility (CTA `/why-movemental`), 3) Launch Into the Network (no CTA) |
| **Footer** | Platform: Self-Screen, Why Movemental, How It Works, Pricing. Explore: AI Book, Books, Topics, Learn, Search, Network. About: About, What Is Movemental, AI Vision, Team. Legal: Privacy, Terms. |
| **Nav** | Platform dropdown: How It Works, Self-Screen, Pricing. Learn: AI Book, Books, Topics, Resources. Company: Why Movemental, About, Team, Network. “Get Started” → `/fit-check`. |

---

### 1 — Fit

| Item | Reality |
|------|--------|
| **Route** | `/fit-check` |
| **Page** | `app/(public)/fit-check/page.tsx` → `<FitCheckContainer />` |
| **Component** | `components/fit-check/FitCheckContainer.tsx` |
| **Public name** | Self-Screen (metadata title: “Self-Screen \| Movemental”) |
| **Flow** | Landing (context: individual | organization) → single multi-select question (RecognitionGate) → Results (FitCheckResults) or, if full-fit, Name step (RecognitionNameStep) |
| **Pathways** | From `lib/schemas/fit-check.ts`: **full-fit** (any 2 of: movement leader, mDNA, create content), **content-no-movement** (exactly one core), **affinity** (no core). |
| **Full-fit after results** | “Create an account” → RecognitionNameStep (name + optional body of work). On submit: `window.location.href = '/why-movemental'` (TODO: submit to API). |
| **Docs** | `_docs/site-docs/02_fit_check.md` — purpose, outcomes, core fit rule, structural position. |

---

### 2 — Not fit (graceful redirection)

| Item | Reality |
|------|--------|
| **Route** | Same as fit: `/fit-check`. No dedicated `/not-fit` route. |
| **Behavior** | After completing the single question, non–full-fit users see FitCheckResults with pathway-specific copy and links. |
| **Content-no-movement** | Headline: “You create content—we’re just not in the same niche yet.” Body explains focus on mDNA-aligned movement leaders. Links: “Explore the Book” → `/learn`, “Read Why Movemental” → `/why-movemental`. |
| **Affinity** | Headline: “You’re in the right neighborhood.” Body: care for them, communicate focus. Links: “Explore the Book” → `/learn`, “Read Why Movemental” → `/why-movemental`, “About Us” → `/about`. |
| **Dedicated “not fit” page** | Does not exist. Redirection is in-place (results screen) with outgoing links. |

---

### 3 — Auth (sign up + sign in)

| Item | Reality |
|------|--------|
| **Flow today** | Full-fit → “Create an account” (RecognitionNameStep) → submit → redirect to `/why-movemental`. No backend submit yet (TODO in FitCheckContainer). |
| **Dedicated auth route** | None in the main public flow. `app/templates/auth/page.tsx` is a **template showcase** (AuthTemplateSwitcher + 8 variants: split-image, centered-card, dark-minimal, social-first, branded-hero, magic-link, tabbed-form, gradient-overlay). Not linked from homepage/nav as the flow auth. |
| **Sign-in / sign-up pages** | No dedicated sign-in or sign-up page in `app/(public)`. |
| **Docs** | `_docs/reference-archive/auth/reconciliation/SUMMARY.md` — template variant mapping only. |

---

### 4 — Tour

| Item | Reality |
|------|--------|
| **Route** | `/onboarding` exists but `permanentRedirect('/how-it-works')`. No dedicated “tour” URL. |
| **Post-auth tour** | Dashboard has a welcome tour (e.g. Joyride “Start Tour”) in `app/dashboard/page.tsx`; not part of the public flow. |
| **Public “tour” page** | Does not exist. Closest: How It Works. |

---

### 5 — Decided (future sticky option)

| Item | Reality |
|------|--------|
| **Route** | None. Marked as future in the flow. |

---

### 6 — How to decide (future agentic / discernment sticky)

| Item | Reality |
|------|--------|
| **Route** | None. Marked as future in the flow. |

---

### 7 — How it works

| Item | Reality |
|------|--------|
| **Route** | `/how-it-works` (canonical) |
| **Page** | `app/(public)/how-it-works/page.tsx` → `<OnboardingPathContainer />` |
| **Component** | `components/onboarding-path/OnboardingPathContainer.tsx` |
| **Section nav (IDs)** | work-here, phases, pipeline, ai-role, different, get, compare, pricing, supporting, summary, cta |
| **Content** | “Your work is here. It should also be here.” WorkHereVisionSection, four phases (from `lib/schemas/onboarding-path`), ContentPipelineDiagram, ContentPipelinePreviewAgent, CompareOptionsTable (COMPARE_OPTIONS_ROWS), “What makes us different,” “What you get,” AI vs human roles, pricing CTA, support, summary, next step (link to `/why-movemental`). |
| **Redirects** | `/onboarding` → `/how-it-works`. Doc references to how-it-works-new and how-it-works-final as redirects or merged into this page. |

---

### 8 — Pricing

| Item | Reality |
|------|--------|
| **Route** | `/pricing` |
| **Page** | `app/(public)/pricing/page.tsx` — full inline page (no separate container). |
| **Content** | Hero: $1,000 platform build + 10% revenue share, keep 90%. “The Math That Changes Everything” (90%, $1K, 100%). Comparison table: Traditional Publishers, Rental Platforms, Movemental (COMPARISON_DATA). “Everything You Need to Launch” (PLATFORM_FEATURES). “How Revenue Share Works,” inline FAQ (FAQ_ITEMS), final CTA “Is Movemental for you?” → `/fit-check`, “Learn Why This Works” → `/why-movemental`. |
| **Templates** | `app/templates/pricing/page.tsx` is a template showcase; not the live pricing page. |

---

### 9 — FAQ

| Item | Reality |
|------|--------|
| **Route** | `/faq` |
| **Page** | `app/(public)/faq/page.tsx` → `<FaqSection showHeader={false} title="FAQ" />` |
| **Component** | `components/faq/FaqSection.tsx` |
| **Data** | `content/faq.ts` — FAQ_ITEMS by category (Billing & plans, Who owns what, Partnership/payments/exits, Roles & team, Platform & content, Getting started, Support & legal), flattened to FAQ_ITEMS_FLAT. FaqSection uses accordion; optional link per item (e.g. “here” → `/team`, “Terms of Service” → `/legal/terms`). |
| **Templates** | `app/templates/faq/page.tsx` — template showcase; not the live FAQ. |

---

### 10 — Contact

| Item | Reality |
|------|--------|
| **Route** | `/contact` |
| **Page** | `app/(public)/contact/page.tsx` — server component. |
| **Content** | Hero (“Contact”), short intro. Two cards: General inquiries (hello@movemental.ai), Support (support@movemental.ai). CTA “Take the Self-Screen” → `/fit-check`. |
| **References** | Template/layout components (e.g. `orgs-contact-sales`, `faq-dark-hero`, `pricing-comparison-table`) use `href="/contact"` or “Contact Sales”. Legal: legal@movemental.ai, privacy@movemental.ai. |

---

## 2. Why Movemental — two versions

| Route | Component | In nav / links |
|-------|-----------|-----------------|
| `/why-movemental` | `WhyMovementalContainer` (`components/why-movemental`) — older structure: intro, what we mean by move, four reasons, who it’s for, solution, goal, tradeoff, crisis, playbook, transformation, proof, amplification, network, invitation. | Yes. Homepage, Navigation, Footer, FitCheckContainer (post-name-step redirect, secondary CTA), ProcessSteps, pricing, about, what-is-movemental, FaqSection header link. |
| `/why-movemental-final` | `WhyMovementalFinalContainer` — scroll-driven hero (GSAPHeroTextSection), SceniusVisualization, VoicesJoiningSection, SoundFamiliarSection, TrustCollapseMiddleSection, CredibilityCrisisSection, then shared sections (CredibilityCrisis, MovementalPlaybook, FragmentedToPlatform, AlanProof, CredibilityAmplified, NetworkEffect, Invitation). | Not in main nav. Linked from nowhere in homepage/nav; doc “why-movemental-and-how-it-works-full-copy” describes this as **live** and -final as the one with full copy. |

So: **all site links point to `/why-movemental`** (older container). **Documentation** treats `/why-movemental-final` as the live/canonical long-form version. Two separate pages exist; nav does not point to -final.

---

## 3. Adjacent content (existing, not framed as flow steps)

Pages that exist and are linked from the site but are not steps 0–10:

| Route | Purpose (what exists) |
|-------|------------------------|
| `/about` | About Movemental: what we do, who it’s for / not for, core values, links to Why Movemental, AI Vision, Team, How It Works. CTA Fit Check. |
| `/what-is-movemental` | Separate page; CTA to `/why-movemental`. |
| `/ai-vision` | AI posture / vision. |
| `/team` | Meet the team. |
| `/network` | Network discovery (authors/writers from registry). |
| `/learn` | Resources/learn (used as “Explore the Book” from not-fit results). |
| `/book` | AI Book (living artifact). |
| `/books`, `/books/[slug]`, `/books/[slug]/read` | Books catalog and read experience. |
| `/topics`, `/topics/[slug]` | Topics browse and topic pages. |
| `/search` | Search. |
| `/authors` | Authors list (content from `getAllAuthors`). |
| `/profile/[id]` | Author profile (from content / author registry). |
| `/why-movemental-new` | `WhyMovementalNewContainer` — alternate Why Movemental; not linked from main nav. |
| `/valuation` | Valuation narrative (OnboardingPath-style sections). |
| `/compare` | Compare options. |
| `/cost-constraints` | Cost constraints. |
| `/linking-visualizations` | Linking visualizations. |
| `/scenius-visualization` | Scenius visualization (standalone). |
| `/onboarding-chart` | Onboarding chart/diagram. |
| `/profile-workspace` | Profile workspace (draft). |
| `/tiptap-editor` | TipTap editor. |
| `/legal/terms`, `/legal/privacy` | Terms of Service, Privacy Policy. |
| `/dashboard`, `/dashboard/settings`, `/dashboard/analytics` | Dashboard (post-auth). |
| `app/templates/*` | Template showcase pages (auth, faq, pricing, misc, etc.) — not part of primary flow. |

---

## 4. Docs that describe this flow or site

| Doc | What it covers |
|-----|-----------------|
| `_docs/site-docs/02_fit_check.md` | Fit Check / Self-Screen: purpose, outcomes, core fit rule, structural position. |
| `_docs/site-docs/why-movemental-and-how-it-works-full-copy.md` | Full prose + annotations for Why Movemental (`/why-movemental-final`) and How It Works; routes and versions table. |
| `_docs/site-docs/THE_PROBLEM.md` | Problem framing (if present). |
| `_docs/site-docs/compare-options-sources.md` | Compare options sources. |
| `_docs/reference-archive/*/reconciliation/SUMMARY.md` | Template reconciliation (auth, faq, pricing, etc.) — variant matching, not flow. |
| `_docs/guides/prospective-writers-supabase-mcp-and-why-movemental.md` | Prospective writers, Supabase MCP, Why Movemental. |
| `CLAUDE.md` | Project overview, layers, commands, key files — not flow-specific. |

---

## 5. Summary: flow vs existence

| Step | Name | Route exists? | Page/behavior today |
|------|------|----------------|----------------------|
| 0 | Homepage | Yes | `/` — HomepageContainer. |
| 1 | Fit | Yes | `/fit-check` — Self-Screen, pathways, name step, redirect to /why-movemental. |
| 2 | Not fit | In-place | Same URL; results view + links (no `/not-fit`). |
| 3 | Auth | Partial | Name step only; no sign-in/sign-up page; templates at `/templates/auth`. |
| 4 | Tour | No | `/onboarding` → `/how-it-works`; no tour page. |
| 5 | Decided | No | Future. |
| 6 | How to decide | No | Future. |
| 7 | How it works | Yes | `/how-it-works` — OnboardingPathContainer. |
| 8 | Pricing | Yes | `/pricing` — full inline page. |
| 9 | FAQ | Yes | `/faq` — FaqSection + content/faq. |
| 10 | Contact | Yes | `/contact` — minimal page (inquiry + support emails, CTA to fit-check). |

---

**End of document.** Use this as the single source of truth for what exists when revising content or structure; keep the core design already in place.
