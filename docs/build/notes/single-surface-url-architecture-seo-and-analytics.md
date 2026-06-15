# Single-surface URLs — architecture, SEO, and analytics

**Path:** `docs/build/notes/single-surface-url-architecture-seo-and-analytics.md`  
**As of:** 2026-06-10  
**Trigger:** movemental.ai now presents, for most visitors, one primary public path — `/agent` — with `/` redirecting there. This note explains whether that is structurally required, and what it means for SEO, web practice, and measurement.

**Related (code):** `src/app/page.tsx`, `src/app/agent/page.tsx`, `src/app/sitemap.ts`, `proxy.ts`, `src/lib/tenant.ts`, `next.config.ts` redirects, `_archive/pre-marketing-migration-2026-06/`.

---

## 1. What “one slug” means here

Two different things get conflated. Both are true today, but only one is an architectural invariant.

| Sense | What it is | Required? |
|-------|------------|-----------|
| **Public URL surface** | Most traffic lands on `/agent`. Root `/` redirects. Document routes in `src/app/**/page.tsx` number ~16 (agent room, auth, assess, enroll, share tokens, newsletter, field-guide file vs redirect, staff runtime). The former `(site)` marketing tree (~46 routes in older inventories) is archived or gone. | **No** — interim product choice during the agent-first pivot. |
| **Tenant identity** | One Movemental organization per deployment via `TENANT_ORG_ID` (`src/lib/tenant.ts`). Services scope rows with `organization_id`; there is no `{orgSlug}.movemental.ai` routing on this app. | **Yes** for this deployment model — not the same as “one URL.” |

Inside the agent room, navigation is **in-app state** (scene runner, suggestion pills, capture sheets), not additional path segments. A visitor can traverse pricing → safety → contact without the address bar changing. That feels like “one slug” even when the product exposes many conceptual destinations.

---

## 2. Is a single public slug required by our architecture?

**Short answer: no for URLs; yes for tenant scoping at the data layer.**

### What the six-layer / multi-tenant stack actually requires

1. **Database:** Tenant-scoped tables carry `organization_id` (or equivalent FK). RLS and services enforce boundaries.
2. **Deployment:** This repo uses **single-org-per-deployment** — `getTenantOrgId()` reads `TENANT_ORG_ID` from env. That is an **operator configuration**, not a visitor-facing slug.
3. **Sibling pattern:** Alan Hirsch and other tenant apps are **separate deployments** (subdomain or custom domain). movemental.ai is the **organizational** surface, not a path-prefix multi-tenant router like `/orgs/:slug/dashboard`.

None of that mandates a single marketing URL. You could serve fifty indexable pages tomorrow; each would still write to the same org if `TENANT_ORG_ID` is set.

### What *does* push toward one surface today

| Driver | Detail |
|--------|--------|
| **Agent-first pivot** | `CLAUDE.md` / design canon: Ink Band agent room is the product shell; Concept Modern marketing is archived reference. |
| **Temporary home redirect** | `src/app/page.tsx` — `redirect("/agent")` with comment “remove when marketing repo merges.” |
| **Scene-runner UX** | Regex-routed scenes + optional Discuss mode (`src/lib/agent-room/`) optimize for one canvas, not a page-per-intent IA. |
| **Frontend teardown** | Marketing components live under `_archive/pre-marketing-migration-2026-06/`; capture forms and nav are not remounted on live routes. |

So the single slug is a **phase-1 shipping strategy**, not a type-chain or Supabase constraint. When marketing merges back (or routes are re-promoted from archive), URL diversity should return deliberately — not accidentally via stale redirects.

---

## 3. Current public route inventory (verified 2026-06-10)

**Live `page.tsx` routes:**

```
/                          → 307/308 redirect to /agent
/agent
/agent/invite
/agent/assessment
/assess
/enroll
/field-guide               → page exists, but next.config 301s /field-guide → /field-guides (no page)
/login, /forgot-password, /auth/update-password
/newsletter/confirmed, /newsletter/unsubscribed
/share/ai-reality/:token
/team-invite/:token
/dashboard/ai-reality
/agent-runtime             (staff)
```

**Sitemap (`src/app/sitemap.ts`):** only `/` and `/agent`, both priority 1.0.

**Robots:** allows `/`, disallows `/api/` — no disallow for authenticated paths.

**Legacy redirects (`next.config.ts`):** dozens of 301s from former marketing URLs (`/fragmentation`, `/organizations`, `/pathway/*`, `/about`-bound paths, etc.) to targets such as `/about`, `/pathway`, `/contact`, `/field-guides`, `/pricing`. Many of those targets **no longer have `page.tsx` files**. That is redirect debt, not intentional IA — crawlers and bookmarks may hit **404 chains**.

---

## 4. SEO — effects and trade-offs

### 4.1 What you gain

- **Clear product signal:** One primary URL aligns with “this is an agent-guided product,” not a content farm. Useful if organic strategy shifts from long-tail articles to branded category queries + direct/referral.
- **Consolidated ranking signals (in theory):** If `/` permanently redirected to `/agent` with a single canonical, link equity could concentrate on one URL. Today `/` uses a **non-permanent** App Router redirect — search engines may still treat `/` and `/agent` as distinct URLs unless canonical tags say otherwise.
- **Less duplicate/thin content risk:** Retired overlapping surfaces (`/path`, `/work-with-us`, `/field-guide` consolidation notes in `next.config.ts`) no longer compete in the index — because they are gone, not because they were merged cleanly.

### 4.2 What you lose

- **Long-tail entry points:** Former indexable corpus — `/articles/[slug]`, `/book/read/[slug]`, audience landings (`/churches`, `/nonprofits`, …), `/fragmentation`, `/platform` — is off the live tree or only reachable via redirects to missing pages. **Organic traffic that depended on those URLs will decay** unless content is republished under stable paths or redirects are repaired.
- **E-E-A-T surface area:** Google’s quality signals benefit from crawlable about/team/methodology/contact pages, author bios, and dated articles. An agent-only shell provides **one meta description** (`src/app/agent/page.tsx`) — strong copy, but thin **crawlable** proof compared to the prior site.
- **Shareability and snippet control:** In-room scenes do not produce unique Open Graph URLs. Sharing “the pricing answer” means sharing `/agent`, not `/pricing`. Social previews cannot target intent-specific titles without query params or dedicated routes.
- **Sitemap honesty:** Listing `/` when it redirects, and omitting `/assess`, `/enroll`, and token routes, understates the real surface and may confuse crawlers about what you consider canonical.
- **Redirect rot:** 301 → 404 is worse than no redirect. Audit required before treating redirects as “SEO handled.”

### 4.3 Recommended SEO posture for this phase

| Priority | Action |
|----------|--------|
| P0 | **Redirect audit:** Every `next.config.ts` destination must resolve to a live route or a chosen external home (e.g. future marketing repo). Remove or fix targets like `/about`, `/field-guides` until pages exist. |
| P0 | **Canonical policy:** Pick one home URL (`/agent` or `/`). Use `rel=canonical` on both; if `/` stays a redirect, prefer **308 permanent** when the pivot is declared final. |
| P1 | **Sitemap:** Include only canonical, 200-status URLs (`/agent`, `/assess`, `/enroll` if indexable). Drop `/` if it always redirects. |
| P1 | **Structured data:** Organization + WebSite JSON-LD on a stable route; FAQ/Article schema when content returns. |
| P2 | **Deep links:** Optional `/agent?scene=pricing` or `/agent/pricing` if you need shareable, measurable entry points without rebuilding full marketing. |

---

## 5. Other web best practices

### Accessibility and UX

- **Skip link + single `<main>`** in root layout is good (`src/app/layout.tsx`).
- **Browser history:** Scene changes without URL updates break **back-button expectations** and “open in new tab” for a specific step. Consider URL hash or search-param sync for major beats if users report confusion.
- **Progressive enhancement:** Hybrid/stub modes work offline; ensure critical CTAs (assess, enroll, contact) have **non-JS fallbacks** on dedicated routes where conversion matters.

### Performance

- One heavy client bundle on `/agent` is acceptable for a product shell; marketing pages would have been lighter per-route. Monitor LCP on first paint of Ink Band sheet.

### Security and privacy

- Token routes (`/share/ai-reality/:token`, `/team-invite/:token`) should stay **noindex** (meta robots or `X-Robots-Tag`) — not in sitemap.
- `/api/*` correctly disallowed in `robots.ts`; authenticated paths are not disallowed — fine if they gate on auth.

### Link rot and comms

- External links, PDFs, press, and old docs still cite `/fragmentation`, `/book`, `/organizations`. Until repaired, **brand trust** suffers even when SEO tools stay quiet.

---

## 6. Analytics — effects and what to do instead

### 6.1 What exists today

| Layer | Status |
|-------|--------|
| **PostHog / GA / Vercel Analytics** | Not wired in `src/` (no `$pageview`, no SDK init found). |
| **Sentry** | Error monitoring via `@sentry/nextjs` (`instrumentation.ts`). Not product analytics. |
| **First-party DB** | `analytics_events` (generic event_type/category/action); used e.g. by `POST /api/assess/ssss-integrity`. `agent_room_leads`, `contact_submissions`, `newsletter_subscribers`, `organization_inquiries` for funnel outcomes. |
| **Capture seam** | `submitLead()` historically stubbed — see `home-page-ctas-capture-and-ai-engagement.md`. Room instrumentation is incomplete until capture POSTs land. |

### 6.2 Why “one slug” breaks page-path analytics

Classic web analytics assumes:

```
pageview(/pricing) → pageview(/contact) → conversion
```

With one URL, **all sessions look like `/agent`**. Funnel steps (which pill, which scene, Discuss entry, capture sheet) are invisible to path-based tools unless you emit **custom events**.

The codebase already anticipates this in places — e.g. Discuss entry carries a `reason` for future analytics (`src/lib/agent-room/discuss.ts`). That pattern should become the default measurement model for the agent room.

### 6.3 Event model to adopt (first-party + optional PostHog later)

Instrument at the **scene / intent** layer, not the URL:

| Event | Properties (examples) |
|-------|------------------------|
| `agent_room.session_start` | `mode` (stub/hybrid/stream), `referrer`, UTM params |
| `agent_room.scene_enter` | `scene_id`, `trigger` (pill / regex / discuss) |
| `agent_room.suggest_click` | `suggestion_id`, `scene_id` |
| `agent_room.discuss_start` | `reason`, `prior_scene` |
| `agent_room.capture_show` | `capture_type` (lead, contact, enroll) |
| `agent_room.capture_submit` | `capture_type`, `success` |
| `agent_room.stream_turn` | `turn_index`, `engine_ok` |

Write high-value events to **`analytics_events`** (already in schema + API) and/or add PostHog when you want session replay and dashboards without building BI on Postgres.

**UTM discipline:** With one landing URL, campaign attribution depends entirely on query strings preserved on first load and copied into session storage — implement once in the agent shell.

**Tenant dimension:** Always attach `organization_id` from `TENANT_ORG_ID` on server-side inserts; do not rely on URL org slug (`?org=` is for dashboard shell in `proxy.ts`, not public agent room today).

### 6.4 Analytics anti-patterns in the current phase

- Treating Vercel “page views” as funnel steps — they will not differentiate pricing vs safety scenes.
- Expecting `/assess` completion rates in the same dashboard as agent-room pills without explicit cross-route identity (cookie / anonymous id).
- Indexing `/agent` traffic as “homepage” while product truth is split across `/`, `/agent`, and `/assess`.

---

## 7. Decision framework: when to add URLs again

Add dedicated routes when **any** of these become true:

1. **SEO:** You need indexable proof (articles, audience pages, methodology) on movemental.ai again.
2. **Measurement:** Stakeholders need path-based reports without custom event work.
3. **Sharing:** Sales or leaders need stable links (`/assess`, `/pathway/safety`, magic-link assessment) in email and slides.
4. **Conversion:** Lead magnets and contact must work without entering the full agent scene graph.
5. **Merge:** Marketing repo lands — remove the temporary `/` → `/agent` redirect and restore `(site)` or equivalent with Ink Band scoped to `/agent` only.

Keep **one primary agent canvas** even with many URLs: marketing pages should **link into** `/agent` (or `/agent?entry=…`), not duplicate the room.

---

## 8. Summary

| Question | Answer |
|----------|--------|
| Is one slug required by multi-tenant / type-chain architecture? | **No.** Tenant isolation is env + `organization_id`, not public path count. |
| Is one slug required by current product direction? | **Effectively yes for now** — agent-first pivot, archived marketing, scene-runner UX. |
| SEO impact? | **Concentrated but thin** — strong single-product signal; lost long-tail and E-E-A-T pages; redirect rot risk is the urgent issue. |
| Analytics impact? | **Page-path analytics are nearly useless** on `/agent`; invest in scene-level events and fix capture POSTs; consider PostHog when funnels matter. |
| Immediate ops? | Redirect audit, canonical/home redirect policy, sitemap cleanup, noindex on token routes, event instrumentation plan. |

This state is **appropriate for a controlled product beta** on one organizational deployment. It is **not** a long-term substitute for a crawlable marketing layer if organic discovery and proof remain business goals — plan the merge or route repromotion explicitly rather than letting stale redirects define IA.
