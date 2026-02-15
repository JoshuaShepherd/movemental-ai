# Auth and Route Access Design — Movemental.ai

> **Purpose:** Design and implement the public/private route split, auth-gating middleware, and database integration for Movemental. Use this document as a full implementation prompt.

**Version:** 1.0  
**Last Updated:** February 2025

---

## 1. Problem Statement

Today, the auth flow redirects users to `/tour` (which redirects to `/how-it-works`), but `/how-it-works` is public—there is no actual “behind the scenes” access. We need:

1. **A clear public vs. auth-only split** — Some routes are for anyone; others require a signed-in user.
2. **Auth-gating enforcement** — Unauthenticated users hitting protected routes should be redirected to sign-in with `next=<path>` so they return after auth.
3. **Route group structure** — Use Next.js best practices (route groups, layouts) to organize public vs. onboarding/app routes.
4. **Database integration** — Auth-only routes should have access to tenant context (`organizationId`), user identity, and Movemental database tables (organizations, onboardingResponses, write, write_content).

---

## 2. Canonical Route Lists

### 2.1 Public Routes (no auth required)

These routes are accessible to anonymous visitors. No session check. No redirect.

| Route | Purpose | Notes |
|-------|---------|-------|
| `/` | Homepage | DarkHeroSection, ProcessSteps, CTAs to fit-check |
| `/fit-check` | Self-Screen | Fit Check flow; Full Fit → Info step → sign-up |
| `/not-a-fit/affinity` | Not a fit (affinity) | Dedicated page for affinity pathway |
| `/not-a-fit/content` | Not a fit (content-no-movement) | Dedicated page for content-no-movement pathway |
| `/sign-in` | Sign in | Email/password, OAuth (Google, etc.) |
| `/sign-up` | Sign up | Create account; redirects to /confirm if email confirm required |
| `/forgot-password` | Password reset | Request reset email |
| `/confirm` | Check your inbox | Shown after sign-up when email confirmation required |
| `/check-inbox` | Alias for confirm | Redirects to /confirm |
| `/create-account` | Alias for sign-up | Redirects to /sign-up |
| `/architecture` | Architecture overview | Platform architecture, pricing, comparison |
| `/pricing` | Pricing | $1K build, 10% revenue share |
| `/faq` | FAQ | Accordion FAQ |
| `/contact` | Contact | Inquiry and support emails |
| `/why-movemental` | Why Movemental (older) | Long-form “why” page; linked from nav |
| `/why-movemental-final` | Why Movemental (canonical) | Scroll-driven, VoicesJoiningSection, etc. |
| `/why-movemental-new` | Alternate Why Movemental | Not in main nav |
| `/how-it-works` | How It Works | OnboardingPathContainer; four phases, pipeline |
| `/about` | About | Who we are, core values |
| `/what-is-movemental` | What Is Movemental | Separate page |
| `/team` | Team | Meet the team |
| `/ai-vision` | AI vision | AI posture and vision |
| `/network` | Network | Network discovery |
| `/learn` | Learn | Resources; “Explore the Book” from not-fit |
| `/book` | AI Book | Living artifact |
| `/books` | Books catalog | Books list |
| `/books/[slug]` | Book detail | Single book |
| `/books/[slug]/read` | Read book | Reading experience |
| `/book/[chapterId]` | Book chapter | Chapter view |
| `/book/read` | Book read | Reading mode |
| `/topics` | Topics | Topics browse |
| `/topics/[slug]` | Topic page | Single topic |
| `/authors` | Authors | Authors list |
| `/profile/[id]` | Author profile | Public profile (e.g. alan-hirsch) |
| `/search` | Search | Search |
| `/compare` | Compare options | Compare table |
| `/cost-constraints` | Cost constraints | Cost narrative |
| `/linking-visualizations` | Linking viz | Visualization |
| `/scenius-visualization` | Scenius viz | Scenius graph |
| `/onboarding-chart` | Onboarding chart | Diagram |
| `/valuation` | Valuation | Valuation narrative |
| `/profile-workspace` | Profile workspace | Draft workspace |
| `/tiptap-editor` | TipTap editor | Editor test |
| `/legal/terms` | Terms of Service | Legal |
| `/legal/privacy` | Privacy Policy | Legal |
| `/onboarding` | Onboarding alias | Redirects to /how-it-works (public) |
| `/templates/*` | Template showcase | Template pages; not primary flow |

**Auth pages that remain public:** `/sign-in`, `/sign-up`, `/forgot-password`, `/confirm`, `/check-inbox`, `/create-account` — these are entry points to auth, so they must be reachable without a session.

---

### 2.2 Auth-Required Routes (onboarding / behind-the-scenes)

These routes require an authenticated session. Unauthenticated access → redirect to `/sign-in?next=<path>`.

| Route | Purpose | Database / Tenant |
|-------|---------|-------------------|
| `/tour` | Post-auth tour landing | Redirects to /how-it-works today; can later show auth-specific tour |
| `/decide` | Help me decide | Discernment page; sticky bar CTA |
| `/decided` | I've decided | Structured offer; decision flow |
| `/checkout` | Checkout | Payment; after offer acceptance |
| `/welcome` | Welcome | Post-acceptance welcome; currently redirects to /sign-in — **needs real page** |
| `/dashboard` | Dashboard | Content management, projects |
| `/dashboard/settings` | Dashboard settings | Org/user settings |
| `/dashboard/analytics` | Analytics | Dashboard analytics |
| `/onboarding-form` or equivalent | Onboarding form | If separate from public how-it-works; uses `onboardingResponses`, `organizationId` |

**Decision-state rules (from ROUTING_AND_FLOW_LOGIC_V1):**
- `/decided` — If user already `accepted` → redirect to `/welcome`
- `/checkout` — If user has not viewed offer → redirect to `/decided`
- `/checkout` — If already accepted and payment done → redirect to `/welcome`

---

## 3. Next.js Route Structure (Best Practice)

### 3.1 Route Groups

Use Next.js route groups to separate public vs. auth-required routes. Route groups do **not** affect the URL path.

**Recommended structure:**

```
app/
├── (public)/           # Public routes — no auth required
│   ├── layout.tsx      # Public layout (nav, footer)
│   ├── page.tsx        # /
│   ├── fit-check/
│   ├── sign-in/
│   ├── sign-up/
│   ├── ...
│   └── how-it-works/
│
├── (app)/              # Auth-required routes — behind the scenes
│   ├── layout.tsx      # App layout (auth check, tenant context, app nav)
│   ├── tour/
│   ├── decide/
│   ├── decided/
│   ├── checkout/
│   ├── welcome/
│   └── dashboard/
│       ├── page.tsx
│       ├── settings/
│       └── analytics/
│
├── api/                # API routes (auth per-route)
├── auth/               # Auth callback, signout
└── layout.tsx          # Root layout
```

**Alternative:** Keep current `(public)` for public pages and use `(app)` for auth-required. Or use `(dashboard)` for dashboard-specific layout. The key: **auth-required routes live in a route group that shares a layout that enforces auth.**

### 3.2 Layout Behavior

- **`(public)/layout.tsx`** — Renders public nav, footer. No auth check. All children are public.
- **`(app)/layout.tsx`** — Runs auth check. If unauthenticated → `redirect('/sign-in?next=' + currentPath)`. If authenticated → render app nav and children. Optionally sets tenant context for downstream.

### 3.3 Middleware vs. Layout Check

**Option A: Middleware (recommended)**  
- Single `middleware.ts` at project root.
- Runs on every request before the page loads.
- Refreshes Supabase session (use `updateSession` from `lib/supabase/proxy.ts`).
- Checks path: if path matches auth-required list and no session → redirect to `/sign-in?next=<path>`.
- Pros: Centralized, runs early, no flash of protected content.

**Option B: Layout check**  
- `(app)/layout.tsx` is a server component that calls `createClient()` from `lib/supabase/server`, gets `getUser()`, and redirects if null.
- Pros: Simpler; no middleware. Cons: Slight delay, possible flash.

**Recommendation:** Use **middleware** for auth gating. It’s the standard pattern for Next.js + Supabase. See Section 4.

---

## 4. Middleware Implementation

### 4.1 Create `middleware.ts` at Project Root

See **Section 8** for the full Supabase middleware pattern. The implementation must:

1. **Create a Supabase server client** in middleware (with cookie get/set).
2. **Call `supabase.auth.getUser()`** to verify session.
3. **For auth-required paths**, if `!user` → redirect to `/sign-in?next=<pathname>`.
4. **Integrate session refresh** — either inline or by composing with `updateSession` from `lib/supabase/proxy.ts` (which refreshes tokens via `getClaims()`).

Auth-required paths: `/tour`, `/decide`, `/decided`, `/checkout`, `/welcome`, `/dashboard`, and `/dashboard/*`. Use a helper such as:

```ts
const AUTH_REQUIRED_PATHS = ['/tour', '/decide', '/decided', '/checkout', '/welcome', '/dashboard']
function isAuthRequired(pathname: string) {
  return AUTH_REQUIRED_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}
```

### 4.2 Paths to Protect

| Path | Auth required |
|------|---------------|
| `/tour` | Yes |
| `/decide` | Yes |
| `/decided` | Yes |
| `/checkout` | Yes |
| `/welcome` | Yes |
| `/dashboard` | Yes |
| `/dashboard/*` | Yes |

### 4.3 Paths to Never Protect

- `/sign-in`, `/sign-up`, `/forgot-password`, `/confirm`, `/check-inbox`, `/create-account`
- `/auth/callback` (OAuth/email confirm)
- `/api/*` (auth per-route in handlers)
- Static assets, `_next`, favicon, etc.

---

## 5. Route Groups and File Moves

### 5.1 Current State

- Most pages live under `app/(public)/`
- `app/dashboard/` is at root (not in a route group)
- `app/(no-nav)/` has `not-a-fit`, `templates-dashboard`

### 5.2 Target State

**Option A (minimal change):**  
- Keep `(public)` for public pages.
- Move `dashboard`, `tour`, `decide`, `decided`, `checkout`, `welcome` into `(app)` or keep `dashboard` at root but ensure middleware protects `/dashboard` and `/dashboard/*`.
- Add middleware; no need to move files if middleware handles all protection.

**Option B (clean split):**  
- `(public)` — all public pages.
- `(app)` — `tour`, `decide`, `decided`, `checkout`, `welcome`, `dashboard` (with sub-routes).
- Move files from `(public)` to `(app)` for: `tour`, `decide`, `decided`, `checkout`, `welcome`.
- Move `app/dashboard` into `app/(app)/dashboard`.

**Recommendation:** Start with **Option A** — add middleware only. No file moves. Middleware protects `/tour`, `/decide`, `/decided`, `/checkout`, `/welcome`, `/dashboard`, `/dashboard/*`. Later, refactor into `(app)` for clearer layout separation.

---

## 6. Database Integration

### 6.1 Movemental Database Tables

| Table | Purpose | Tenant-scoped? |
|-------|---------|----------------|
| `organizations` | Tenant root | N/A (root) |
| `onboardingResponses` | Onboarding form data | Yes (`organizationId`) |
| `write` | Prospective writers | No (platform-level) |
| `write_content` | Writer content | No (FK to write) |

### 6.2 Tenant Context

- **Source:** `getOrganizationId(request)` in `lib/middleware/tenant.ts`
- **Resolution order:** `x-organization-id` header → subdomain → (TODO) session/user’s primary org
- **Usage:** All tenant-scoped API routes and services must use `organizationId` from tenant context, never from client input.

### 6.3 Auth + Tenant Flow

1. User signs in → Supabase session with `user.id`
2. User visits `/dashboard` → middleware allows (session exists)
3. Dashboard or API needs `organizationId` → call `getOrganizationId(request)`
4. Today: subdomain or header. Future: resolve from `user.id` (user_profiles or org membership table).
5. Services (e.g. `onboardingResponsesService`) receive `organizationId` and filter all queries by it.

### 6.4 Linking User to Organization

Currently there is no `user_profiles` or `organization_members` table. For V1:

- **Option 1:** When a user signs up, create a row in `organizations` with `accountOwnerId = user.id`. Use that org as the tenant. `getOrganizationId` fallback: if no subdomain/header, query `organizations` where `accountOwnerId = user.id` and use that org.
- **Option 2:** Add `user_profiles` and `organization_members`; resolve org from session.
- **Option 3:** For now, tenant context is subdomain/header only. Dashboard and onboarding routes may show “no org” state until tenant resolution from session is implemented.

**Prompt requirement:** Document the chosen approach and implement `getOrganizationId` session fallback when ready.

---

## 7. Implementation Checklist

Use this checklist when implementing.

### 7.1 Middleware

- [ ] Create `middleware.ts` at project root
- [ ] Integrate `updateSession` from `lib/supabase/proxy.ts` for session refresh
- [ ] Add auth check for paths: `/tour`, `/decide`, `/decided`, `/checkout`, `/welcome`, `/dashboard`, `/dashboard/*`
- [ ] Redirect unauthenticated users to `/sign-in?next=<path>`
- [ ] Exclude `/sign-in`, `/sign-up`, `/forgot-password`, `/confirm`, `/check-inbox`, `/create-account`, `/auth/callback`, `/api/*`, static assets
- [ ] Test: visit `/tour` while signed out → redirect to `/sign-in?next=/tour`
- [ ] Test: sign in with `next=/tour` → land on `/tour` (or `/how-it-works` if tour redirects)

### 7.2 Route Structure (Optional Refactor)

- [ ] Decide: Option A (middleware only) vs Option B (move routes to `(app)`)
- [ ] If Option B: create `app/(app)/` and move `tour`, `decide`, `decided`, `checkout`, `welcome`, `dashboard`
- [ ] If Option B: create `(app)/layout.tsx` with app shell (optional; middleware already enforces auth)

### 7.3 Welcome Page

- [ ] Replace `/welcome` redirect-to-sign-in with a real welcome page for post-acceptance users
- [ ] Welcome page: auth-required, shows “Welcome to Movemental” and next steps (e.g. dashboard, onboarding)

### 7.4 Database Integration

- [ ] Ensure `getOrganizationId(request)` is called in all tenant-scoped API routes
- [ ] Implement session fallback for `getOrganizationId` when user is signed in (query org by `accountOwnerId` or org membership)
- [ ] Document tenant resolution order in `lib/middleware/tenant.ts`

### 7.5 Verification

- [ ] Anonymous: can access `/`, `/fit-check`, `/sign-in`, `/sign-up`, `/how-it-works`, etc.
- [ ] Anonymous: cannot access `/tour`, `/dashboard` — redirect to `/sign-in?next=...`
- [ ] Authenticated: can access `/tour`, `/dashboard`, `/decide`, `/decided`, `/welcome`, `/checkout`
- [ ] Auth callback: `next` param preserved; user lands on intended page after email confirm
- [ ] Typecheck and build pass

---

## 8. Reference: Supabase Middleware Pattern

Supabase’s recommended pattern for Next.js App Router (from their docs):

```ts
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Auth-required paths
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

Adapt this to use `updateSession` from `lib/supabase/proxy.ts` and the full list of auth-required paths from Section 4.2.

---

## 9. Summary

| Aspect | Design |
|--------|--------|
| **Public routes** | Section 2.1 — all listed routes; no auth check |
| **Auth-required routes** | Section 2.2 — tour, decide, decided, checkout, welcome, dashboard |
| **Enforcement** | Middleware at root; redirect to `/sign-in?next=<path>` |
| **Route groups** | `(public)` stays; optionally add `(app)` for auth routes |
| **Database** | Tenant via `getOrganizationId`; session fallback TODO |
| **Welcome page** | Replace redirect with real page |

Use this document as the implementation prompt. Execute Section 7 checklist in order.
