# Movemental AI — Pages Inventory for Templating

**Purpose:** Inventory of existing routes/pages in the Movemental AI site so they can be duplicated or templated in the templates repo (`c:\dev\#source\templates`). Each entry includes route, purpose, and main components/layout where useful.

**Source:** `c:\dev\movemental-sites\movemental-ai\app`  
**Layout:** Public pages use `app/(public)/layout.tsx` (PublicNavigation + main + PublicFooter) unless noted.

---

## 1. Root and auth

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Root; redirects or landing |
| `/welcome` | `app/(public)/welcome/page.tsx` | Redirects to `/sign-in` |
| `/sign-in` | `app/(public)/sign-in/page.tsx` | Sign in (SignInForm) |
| `/sign-up` | `app/(public)/sign-up/page.tsx` | Sign up (SignUpForm) |
| `/create-account` | `app/(public)/create-account/page.tsx` | Create account |
| `/check-inbox` | `app/(public)/check-inbox/page.tsx` | Email verification / check inbox |
| `/confirm` | `app/(public)/confirm/page.tsx` | Confirmation step |
| `/forgot-password` | `app/(public)/forgot-password/page.tsx` | Forgot password (ForgotPasswordForm) |
| Auth callback | `app/auth/callback/route.ts` | OAuth callback |
| Auth signout | `app/auth/signout/route.ts` | Sign out |

---

## 2. Public — platform and product

| Route | File | Purpose |
|-------|------|---------|
| `/how-it-works` | `app/(public)/how-it-works/page.tsx` | How it works (OnboardingPathContainer) |
| `/fit-check` | `app/(public)/fit-check/page.tsx` | Self-screen / fit check |
| `/compare` | `app/(public)/compare/page.tsx` | Compare options |
| `/compare/substack` | `app/(public)/compare/substack/page.tsx` | Compare: Substack |
| `/compare/substack-integration` | `app/(public)/compare/substack-integration/page.tsx` | Substack integration |
| `/pricing` | `app/(public)/pricing/page.tsx` | Pricing / plans |
| `/faq` | `app/(public)/faq/page.tsx` | FAQ |
| `/decide` | `app/(public)/decide/page.tsx` | Decide flow (DecideChatSection) |
| `/decided` | `app/(public)/decided/page.tsx` | Post-decide state |
| `/onboarding` | `app/(public)/onboarding/page.tsx` | Onboarding |
| `/onboarding-chart` | `app/(public)/onboarding-chart/page.tsx` | Onboarding chart |
| `/cost-constraints` | `app/(public)/cost-constraints/page.tsx` | Cost constraints |
| `/main` | `app/(public)/main/page.tsx` | Main entry |

---

## 3. Public — content and learning

| Route | File | Purpose |
|-------|------|---------|
| `/book` | `app/(public)/book/page.tsx` | AI Book (living artifact) |
| `/book/read` | `app/(public)/book/read/page.tsx` | Book reader (AIBookReader) |
| `/book/[chapterId]` | `app/(public)/book/[chapterId]/page.tsx` | Book chapter |
| `/books` | `app/(public)/books/page.tsx` | Books list |
| `/books/[slug]` | `app/(public)/books/[slug]/page.tsx` | Book detail |
| `/books/[slug]/read` | `app/(public)/books/[slug]/read/page.tsx` | Book read |
| `/topics` | `app/(public)/topics/page.tsx` | Topics index |
| `/topics/[slug]` | `app/(public)/topics/[slug]/page.tsx` | Topic detail |
| `/learn` | `app/(public)/learn/page.tsx` | Learn / resources |
| `/search` | `app/(public)/search/page.tsx` | Search |
| `/profile-workspace` | `app/(public)/profile-workspace/page.tsx` | Profile workspace |
| `/profile/[id]` | `app/(public)/profile/[id]/page.tsx` | Public profile |

---

## 4. Public — company and info

| Route | File | Purpose |
|-------|------|---------|
| `/about` | `app/(public)/about/page.tsx` | About |
| `/contact` | `app/(public)/contact/page.tsx` | Contact (ContactForm) |
| `/team` | `app/(public)/team/page.tsx` | Team |
| `/network` | `app/(public)/network/page.tsx` | Network |
| `/why-movemental` | `app/(public)/why-movemental/page.tsx` | Why Movemental |
| `/why-movemental-new` | `app/(public)/why-movemental-new/page.tsx` | Why Movemental (variant) |
| `/why-movemental-final` | `app/(public)/why-movemental-final/page.tsx` | Why Movemental (final) |
| `/what-is-movemental` | `app/(public)/what-is-movemental/page.tsx` | What is Movemental |
| `/ai-vision` | `app/(public)/ai-vision/page.tsx` | AI vision |
| `/architecture` | `app/(public)/architecture/page.tsx` | Architecture |
| `/tour` | `app/(public)/tour/page.tsx` | Tour |
| `/valuation` | `app/(public)/valuation/page.tsx` | Valuation |

---

## 5. Public — visualizations and special

| Route | File | Purpose |
|-------|------|---------|
| `/linking-visualizations` | `app/(public)/linking-visualizations/page.tsx` | Linking visualizations |
| `/scenius-visualization` | `app/(public)/scenius-visualization/page.tsx` | Scenius visualization |

---

## 6. Legal

| Route | File | Purpose |
|-------|------|---------|
| `/legal/privacy` | `app/(public)/legal/privacy/page.tsx` | Privacy (under legal layout) |
| `/legal/terms` | `app/(public)/legal/terms/page.tsx` | Terms (under legal layout) |

Layout: `app/(public)/legal/layout.tsx`.

---

## 7. No-nav (minimal layout)

| Route | File | Purpose |
|-------|------|---------|
| `/not-a-fit/affinity` | `app/(no-nav)/not-a-fit/affinity/page.tsx` | Not a fit — affinity |
| `/not-a-fit/content` | `app/(no-nav)/not-a-fit/content/page.tsx` | Not a fit — content |
| `/templates-dashboard` | `app/(no-nav)/templates-dashboard/page.tsx` | Templates dashboard (TemplatesDashboardClient) |

Layout: `app/(no-nav)/layout.tsx` (no PublicNavigation/PublicFooter).

---

## 8. Dashboard (authenticated)

| Route | File | Purpose |
|-------|------|---------|
| `/dashboard` | `app/dashboard/page.tsx` | Dashboard home |
| `/dashboard/analytics` | `app/dashboard/analytics/page.tsx` | Analytics |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Settings |

Layout: `app/dashboard/layout.tsx`.

---

## 9. Templates (design-mode preview)

These live under `app/templates/` and are used to preview template variants (e.g. for movement leader sites). Layout: `app/templates/layout.tsx` (template-variant-context).

| Route | File | Purpose |
|-------|------|---------|
| `/templates` | `app/templates/page.tsx` | Templates index |
| `/templates/about` | `app/templates/about/page.tsx` | About template |
| `/templates/articles` | `app/templates/articles/page.tsx` | Articles template |
| `/templates/assessments` | `app/templates/assessments/page.tsx` | Assessments template |
| `/templates/auth` | `app/templates/auth/page.tsx` | Auth template |
| `/templates/books` | `app/templates/books/page.tsx` | Books template |
| `/templates/chat` | `app/templates/chat/page.tsx` | Chat template |
| `/templates/content` | `app/templates/content/page.tsx` | Content hub template |
| `/templates/courses` | `app/templates/courses/page.tsx` | Courses template |
| `/templates/faq` | `app/templates/faq/page.tsx` | FAQ template |
| `/templates/lead-magnet` | `app/templates/lead-magnet/page.tsx` | Lead magnet template |
| `/templates/misc` | `app/templates/misc/page.tsx` | Misc template |
| `/templates/pricing` | `app/templates/pricing/page.tsx` | Pricing template |
| `/templates/reader` | `app/templates/reader/page.tsx` | Reader template |
| `/templates/search` | `app/templates/search/page.tsx` | Search template |
| `/templates/special` | `app/templates/special/page.tsx` | Special template |
| `/templates/testimonials` | `app/templates/testimonials/page.tsx` | Testimonials template |

---

## 10. API routes (reference only)

| Path | Purpose |
|------|---------|
| `api/agents/formation-companion/chat` | Formation companion chat |
| `api/contact` | Contact form |
| `api/content-pipeline-preview` | Content pipeline preview |
| `api/onboarding/upload` | Onboarding upload |
| `api/simplified/linked-writers` | Linked writers |
| `api/simplified/onboarding-responses` | Onboarding responses |
| `api/simplified/onboarding-responses/complete` | Onboarding complete |

---

## 11. Tiptap editor (internal)

| Route | File | Purpose |
|-------|------|---------|
| `/tiptap-editor` | `app/(public)/tiptap-editor/page.tsx` | Tiptap editor (layout: tiptap-editor/layout.tsx) |

---

## 12. Duplication checklist for templating

When duplicating a page into the templates repo (e.g. as static HTML in `movemental-ai-template/` or into `directories/<mode>/`):

1. **Route → file name:** Map route to a single HTML file (e.g. `/how-it-works` → `how-it-works.html`, `/compare/substack` → `compare-substack.html`).
2. **Layout:** Use shared header/footer structure per SHARED_LAYOUT (or product nav if documenting Movemental AI product).
3. **Content slots:** Replace dynamic content with placeholder or JSON-driven content per BUILD_HTML_DESIGN_PROTOTYPE and 05-placeholder-and-default-content.
4. **Images:** Use path conventions (`../images/hero/`, `../images/books/`, etc.).
5. **Design tokens:** Apply tokens from SITE_STYLE_AND_IMPROVEMENTS.md (or extracted token set) so the template matches the documented style.

---

## 13. Page count summary

| Group | Count |
|-------|--------|
| Root + auth | 10 |
| Public — platform/product | 13 |
| Public — content/learning | 12 |
| Public — company/info | 12 |
| Public — visualizations | 2 |
| Legal | 2 |
| No-nav | 3 |
| Dashboard | 3 |
| Templates | 17 |
| Tiptap | 1 |
| **Total (pages)** | **~75** (excluding API routes) |

For **templating movement-leader sites**, the most relevant subset is the **templates** group plus shared layout; for **duplicating the Movemental AI product site**, the **public** and **no-nav** groups plus auth and legal are the primary set.
