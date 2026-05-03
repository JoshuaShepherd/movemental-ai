# Alan Hirsch platform (Movemental MVP reference)

This document describes the **Alan Hirsch** implementation of the Movemental stack: a **public thought-leader site** plus a **studio / visual editor** that together form the closest **MVP** to date for “movement leader” platforms. The same underlying patterns—multi-tenant data, courses, content, assessments, formation, and AI grounded in corpus—are what Movemental extends toward **nonprofits**, **churches**, and **seminaries**, with vertical-specific features and copy.

**Typical local paths** (adjust to your machine):

| Repository | Role |
|------------|------|
| `~/Desktop/dev/repos/movemental-sites/alan-hirsch` | Public **learner-facing** Next.js app (Alan Hirsch tenant) |
| `~/Desktop/dev/repos/movemental-visual-editor` | **Authoring / operations** dashboard (content, courses, video, assessments, AI tooling) |

Authoritative engineering narratives, design chain, and prompts also live **inside** those repos (especially `movemental-sites/alan-hirsch/_docs/`). This file is the **Movemental docs** summary so the marketing and product docs in this folder stay connected to what is actually built.

---

## 1. What this is (one paragraph)

**Alan Hirsch’s platform** is a tenant on the shared **Movemental** infrastructure: one codebase and database model, with **tenant-specific** branding, copy, and feature flags driven by config (e.g. `tenant.config.ts`). It delivers a **formation-oriented** experience—articles, books, courses, podcasts, videos, **pathways**, **frameworks**, **assessments** (e.g. mDNA / APEST), and an **AI Lab**—so audiences don’t only consume content but move through structured learning and conversation grounded in the author’s published work.

---

## 2. Two applications, one product story

### Tenant app (`movemental-sites/alan-hirsch`) — public site (learner / buyer)

- **Stack:** Next.js **15**, React **19**, Tailwind, Drizzle ORM, Supabase, Stripe, Sentry, AI SDK (OpenAI / Anthropic / Google), etc. (`package.json` in repo; note the npm `name` field may still show a legacy template name such as `brad-brisco`—the app is configured for **Alan Hirsch** via tenant config.)
- **Route groups:** `src/app/(public)/` holds the marketing and learning surface: home, pricing, about, content hubs (`/content/articles`, `/content/books`, `/content/podcasts`, `/content/videos`, …), **courses** (`/courses/[slug]` with learn, enroll, sales, cohort, journal, player, etc.), **pathways**, **frameworks**, **formation**, **assessments**, **checkout**, **account**, **AI Lab** (`/ai-lab`, notebook, chat, about), landing pages (`/lp/[slug]`), search, donate, certificates, and more.
- **Tenant boundary:** `src/lib/config/tenant.config.ts` is documented in-repo as the **only** place for tenant-specific strings; `TenantProvider` + `useTenant()` supply copy and feature toggles to UI.
- **Floating chat:** Public layout wires **context-aware** chat so the model knows what content the user is viewing (see platform guide in repo).
- **Monorepo:** `pnpm-workspace.yaml` includes `packages/course-content` (`@movemental/course-content`) and `remotion` for video work.

### `movemental-visual-editor` — studio (authors / staff)

- **Stack:** Next.js **16**, React **19**, Tailwind **4**, Drizzle, Supabase, TipTap editor, Remotion-related tooling, Stripe, AI agents, etc.
- **Route groups:** `src/app/(dashboard)/` is the **back office**: content authoring (`/content/.../write`), **course** building (lessons, playbook, preview, archive), **cohorts**, **enrollments**, **video** pipeline (recorder, teleprompter, review, Remotion, distribution), **assessments**, **books**, **reader** (corpus / scripture), **calendar**, **sessions**, **AI** (audiobook, curator, agents, voice), **admin/tenants**, and more.
- **Parity with the public site:** Course **preview** section components explicitly **mirror** the learner `SectionContent` / lesson UI in the tenant app (see comments in `movemental-visual-editor` `src/components/course-editor/preview-sections/`). The studio is where structure is authored; **movemental-sites/alan-hirsch** is where learners consume it.
- **Site builder:** The catch-all `/site/[[...slug]]` area is currently a **retired** placeholder (“Site builder retired”) directing users to Content and Courses—historical drag-and-drop page building was removed in favor of structured content and courses.

Together, these repos demonstrate the **split** Movemental uses elsewhere: a **polished public tenant experience** and a **capable internal studio** that feeds the same data model and shared packages.

---

## 3. Relationship to Movemental (nonprofits, churches, seminaries)

From the in-repo **Platform Guide** and **Charter** (`movemental-sites/alan-hirsch/_docs/_build/engineering/`):

- **Alan Hirsch** is one **tenant** on the **movemental network**—same engine (courses, books, articles, podcasts, videos, AI Lab, themes/pathways, assessments), different branding and content.
- **Nonprofits, churches, and seminaries** are expected to use the **same class of system** with **distinct** emphases: e.g. fundraising and donor intelligence vs. sermon and formation pathways vs. accreditation and curriculum—implemented through tenant config, feature flags, and product modules rather than one-off forks.

This Alan Hirsch MVP is the **living worked example** of that thesis for the **movement leader** vertical.

---

## 4. Architecture themes (shared technical story)

### Six-layer type safety chain

Described in `movemental-sites/alan-hirsch/_docs/_build/engineering/PLATFORM_GUIDE.md`: **Drizzle schema → Zod → services → API routes → React Query hooks → UI**, with `pnpm validate:all` (and per-layer checks) to keep generated code aligned. The visual editor repo exposes the same **generation / validation** scripts (`generate:schemas`, `contracts:check`, `services:check`, etc.) for the same database semantics.

### Shared course package

Both apps depend on **`@movemental/course-content`** (workspace package in `movemental-sites/alan-hirsch/packages/course-content`). That keeps **course rendering and editor previews** aligned across consumer and studio.

### AI Lab and corpus (Alan Hirsch–specific depth)

The public app includes an **AI Lab** with chat and a **NotebookLM-style** experience. In-repo code (`src/lib/ai-lab-notebook/corpus.ts`) documents a **large corpus** (on the order of **~1M words** across **14 books** plus topic guides) as the knowledge base, with **Gemini** integration options (context caching, File API, Vertex RAG). Build pipeline can run `scripts/gemini-corpus-upload.ts` when credentials are set (`pnpm build` chains this in the tenant app repo).

Other tenants may use smaller or different corpora; the **pattern**—grounded retrieval + voice-preserving prompts—is the reusable part.

### Commerce and auth

Stripe, checkout flows, Supabase auth, and email (e.g. Resend) appear in the dependency set; tenant docs in `movemental-sites/alan-hirsch/_docs` cover Shopify/Stripe/auth integration patterns where applicable.

---

## 5. Feature map (public site, high level)

The following are **representative** public capabilities evidenced by `src/app/(public)/` routing in **movemental-sites/alan-hirsch** (not an exhaustive product spec):

| Area | Examples |
|------|------------|
| Content | Articles, books (incl. reader), podcasts, videos, video series |
| Learning | Courses (multi-subpage learning experience), certificates, facilitators |
| Formation / discovery | Pathways (incl. map and themed flows), frameworks, formation practices |
| Assessment | Assessments with take/results/share flows |
| AI | AI Lab (chat, notebook, about), optional notebook variant banner |
| Marketing | Landing pages, pricing, hero showcase, organizations, donate |
| Account | Profile, library, bookmarks, learning dashboard |

For **page-by-page** build status and prompts, the **tenant app repo** `_docs` (e.g. prompts and status) remains the operational source of truth.

---

## 6. Where to read more

| Location | Contents |
|----------|----------|
| `movemental-sites/alan-hirsch/_docs/_build/engineering/PLATFORM_GUIDE.md` | Architecture, tenant config, codegen, chat, commands |
| `movemental-sites/alan-hirsch/_docs/_build/engineering/CHARTER.md` | Charter, relationship to Movemental parent, goals |
| `movemental-sites/alan-hirsch/_docs/README.md` | Index to design chain, type safety, database, assets, prompts |
| `movemental-visual-editor/_docs/` | Agents, AI intelligence notes, setup, archived visual-editor plans |

---

## 7. Links from this docs folder

- **Movemental positioning and copy:** [content/README.md](../../content/README.md), [why Movemental exists](../../content/articles/why-movemental-exists.md).
- **Product design notes (this workspace):** [design/DESIGN.md](../../design/DESIGN.md).

---

*Last updated from repository inspection: May 2026. Repository paths and features drift over time—prefer the linked `_docs` inside `movemental-sites/alan-hirsch` and `movemental-visual-editor` for implementation detail.*
