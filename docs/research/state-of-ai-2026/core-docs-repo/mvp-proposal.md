# Movemental.ai — Clean MVP Proposal

> **Date**: 2026-03-12
> **Status**: Proposal (for alignment)
> **Premise**: Define the smallest version of movemental.ai that delivers the full core value proposition — platform ownership, AI-powered publishing, and network amplification for movement leaders. Nothing is being deleted. This is a line in the sand for what "done" looks like before we start adding.

---

## The One-Sentence MVP

**A movement leader signs up, gets a fully owned publishing platform with AI writing assistance, and is immediately discoverable within a curated network of peer leaders — all for $1,000 and a 90/10 revenue split.**

---

## What We're Solving (The Three Crises That Matter for MVP)

1. **Credibility Crisis**: 40–60% of online content is AI-generated. Real expertise is indistinguishable from synthetic fluency. Leaders need verified, network-embedded platforms — not another blog.
2. **Ownership Crisis**: Traditional platforms extract 85–90% of creator revenue. Leaders build audiences they don't own on infrastructure they don't control.
3. **Isolation Crisis**: Individual leader sites get lost in noise. Network effects (28x–500x reach multiplication) are the only sustainable amplification strategy.

The MVP must address all three. A publishing tool alone doesn't cut it. A network without publishing doesn't cut it. AI without ownership doesn't cut it.

---

## MVP Scope: What's In

### 1. Public Marketing Site (movemental.ai)

The front door. Converts visitors into leaders who want a platform.

| Page | Purpose | Status |
|------|---------|--------|
| **Homepage** | Value prop, credibility narrative, CTA | Exists (needs polish) |
| **Why Movemental** | The credibility crisis + our answer | Exists (`/why-movemental-final`) |
| **How It Works** | 3-step process: Sign up → Build → Amplify | Exists |
| **Pricing** | $1,000 + 90/10 — transparent, simple | Exists |
| **About / Team** | Who we are, why we're credible | Exists |
| **Network / Voices** | Showcase of leaders already on the platform | Exists (`/authors`, `/network`) |
| **Contact** | Simple contact form | Exists |
| **Legal** (Privacy, Terms) | Compliance baseline | Exists |
| **Sign Up / Sign In** | Supabase Auth (email + OAuth) | Exists |

**Cut from MVP scope** (keep the pages, just don't prioritize):
- `/compare`, `/compare/substack*` — competitive comparison pages (nice-to-have, not launch-critical)
- `/ai-lab/about`, `/ai-vision` — AI marketing pages (premature until AI features are solid)
- `/scenius-visualization` — network visualization (impressive but not conversion-critical)
- `/fit-check`, `/decide`, `/decided` — qualification funnel (adds friction; revisit post-launch)
- `/templates-dashboard`, `/templates/*` — template showcase (internal tooling, not user-facing value)
- `/books/[slug]`, `/books/[slug]/read`, `/book/[chapterId]` — public book reading (Phase 2 feature)
- `/topics/[slug]` — topic hubs (Phase 2, after content volume exists)
- `/search` — public search (Phase 2, after content volume exists)
- `/faq` — can be folded into existing pages or handled by contact

**MVP landing flow**: Homepage → Why Movemental → Pricing → Sign Up → Onboarding → Dashboard.

---

### 2. Onboarding Flow

The bridge between "I want a platform" and "I have a platform." This is already well-built.

| Step | What It Captures | Status |
|------|-----------------|--------|
| Voice & Content Samples | Writing samples, best work | Schema + UI exist |
| Brand Assets | Colors, fonts, style preferences | Schema + UI exist |
| Vision & Calling | Story, audience, 3-year impact | Schema + UI exist |
| Audience Understanding | Who to reach, their questions | Schema + UI exist |
| Content Inventory | Existing content, blog URLs, sources | Schema + UI exist |
| Capacity & Timeline | Hours/week, cadence, expectations | Schema + UI exist |
| Goals & Concerns | Income goals, concerns, support needs | Schema + UI exist |
| Decisions & Approvals | Domain, email, payment, features | Schema + UI exist |
| Profile Information | Bio, photo, social links | Schema + UI exist |

**This is solid.** The 9-step onboarding with Zod validation, file upload to Supabase, and tenant-scoped storage is production-quality. Keep it.

---

### 3. Leader Dashboard

The daily workspace. Where leaders create, manage, and publish content.

| Feature | Description | Source |
|---------|-------------|--------|
| **Dashboard Home** | Greeting, quick-create buttons, content tabs | movemental-dashboard |
| **Content Editor** | TipTap rich text editor with auto-save | movemental-dashboard |
| **AI Writing Assistant** | Chat-with-document, refine/expand/condense | movemental-dashboard |
| **Articles** | Create, edit, publish articles | movemental-dashboard |
| **Books + Chapters** | Create books with chapter structure | movemental-dashboard |
| **Media Library** | Upload and manage images/files | movemental-dashboard |
| **Settings** | Profile, platform config | Stub exists |

**Cut from MVP** (exists in dashboard repo but defer):
- **Courses / LMS** — Full course builder with lessons, modules, progress tracking. Real value, but heavyweight. Phase 2.
- **Video Creator** — Browser recording, teleprompter, slides, TUS upload. Impressive but not core to publishing MVP.
- **Transcript Tool** — Audio transcription. Phase 2.
- **Translations** — Multi-language. Explicitly excluded in existing MVP definition.
- **Podcasts** — Audio hosting. Phase 2.
- **Assessments** (mDNA, APEST) — Tenant-specific (Alan Hirsch). Not platform MVP.
- **E-commerce / Bookstore** — Shopify/Stripe integration for selling. Phase 2 (need content first).
- **Advanced Analytics** — Scroll depth, watch analytics, CLV. Phase 2. Basic page views are enough for MVP.
- **Video Hosting & Streaming** — Custom player, series, watch analytics. Phase 2.

**MVP editorial workflow**: Draft → Preview → Publish. No review stage for MVP (single-author platforms don't need editorial review).

---

### 4. AI Agents (MVP Subset)

The existing vision describes 22 specialized agents. MVP needs exactly 3:

| Agent | What It Does | Why It's MVP |
|-------|-------------|--------------|
| **Writing Assistant** | Chat with your document. Refine, expand, condense, reframe. | Core differentiator. Already built in dashboard. |
| **SEO Agent** | Keyword suggestions, meta descriptions, title optimization | Leaders need discoverability from day one |
| **Voice Preservation** | Maintains the leader's authentic voice across AI-assisted content | Without this, we're just another AI writing tool |

**Cut from MVP**:
- Formation Companion, Related Content Finder, Network Intelligence, and 16 other agents. They're the vision, not the launch.

---

### 5. Network Layer (Minimum Viable Network)

This is what makes Movemental different from "yet another publishing platform." But for MVP, the network can be simple.

| Feature | Description | Status |
|---------|-------------|--------|
| **Leader Directory** | Browsable list of leaders on the platform with bios, tags, and links to their sites | Partially exists (`/authors`, `write` table) |
| **Cross-linking** | When Leader A references Leader B's work, both get a backlink | Needs implementation |
| **Network Profile** | Each leader has a profile page on movemental.ai showing their platform, content, and network connections | Partially exists (`/profile/[id]`) |

**Cut from MVP**:
- Network content feed, discovery algorithms, collaborative content projects, amplification scoring, network analytics. All Phase 2+.

**MVP network promise**: "You're not alone. Your platform is part of something bigger. Here are the other leaders." That's enough for launch.

---

### 6. Tenant Sites (Individual Leader Platforms)

Each leader gets their own site (subdomain or custom domain). For MVP:

| Feature | Description |
|---------|-------------|
| **Homepage** | Leader's brand, bio, featured content |
| **Articles** | Published articles with clean reading experience |
| **Books** | Book pages with chapter navigation |
| **About** | Leader bio, credentials, story |
| **Contact** | Simple contact form |
| **Responsive** | Mobile-first, WCAG 2.1 AA |

**Architecture**: The alan-hirsch repo demonstrates this pattern — a tenant site that reads from the movemental database, themed per organization config. This is the template for all leader sites.

**Cut from MVP**:
- E-commerce pages, course enrollment, video pages, assessment pages. Content-first, commerce-second.

---

## MVP Data Model

What actually needs to be in the database for MVP (beyond what exists):

### Already Built
- `organizations` — Multi-tenant root (exists)
- `onboarding_responses` — 9-step intake (exists)
- `write` / `write_content` — Prospective writers + content (exists)

### Needs to Exist for MVP
- `articles` — Published articles (title, body, slug, status, organizationId, authorId, publishedAt, seoMeta)
- `books` — Books (title, description, slug, coverImage, status, organizationId)
- `chapters` — Book chapters (bookId, title, body, order, status)
- `media` — Uploaded files (url, type, organizationId, metadata)
- `profiles` — Public leader profiles (organizationId, bio, avatar, socialLinks, tags)
- `network_links` — Cross-references between leaders (sourceOrgId, targetOrgId, context, contentId)

### Exists in Dashboard (Needs Migration)
The movemental-dashboard has ~140 tables. We don't migrate all of them. We migrate the schema for the entities listed above, validated against what the dashboard already has working.

---

## Technical MVP Checklist

### Infrastructure
- [x] Next.js 15 + React 19 + TypeScript
- [x] Supabase Auth (email + OAuth)
- [x] Drizzle ORM + PostgreSQL
- [x] Six-layer type safety chain
- [x] Multi-tenant middleware
- [x] Vercel deployment
- [ ] Custom domain support per tenant (subdomain routing or CNAME)
- [ ] Supabase Storage for media (partially exists for onboarding uploads)

### Content Pipeline (Full Six-Layer Implementation)
- [ ] Articles: Schema → Zod → Service → Route → Hook → UI
- [ ] Books + Chapters: Schema → Zod → Service → Route → Hook → UI
- [ ] Media Library: Schema → Zod → Service → Route → Hook → UI
- [ ] Profiles: Schema → Zod → Service → Route → Hook → UI

### AI
- [ ] Writing Assistant integrated into content editor
- [ ] SEO Agent integrated into publish flow
- [ ] Voice baseline capture during onboarding (use voice & content samples step)

### Network
- [ ] Leader directory page with search/filter
- [ ] Profile pages for each leader
- [ ] Cross-link tracking between leader content

### Revenue
- [ ] Stripe integration for $1,000 platform fee
- [ ] Revenue share tracking (can be manual/spreadsheet for MVP — don't over-engineer)

---

## What We're NOT Building for MVP

To be explicit about scope boundaries:

| Feature | Why Not Now |
|---------|------------|
| Templates system | Internal tooling. Leaders don't need to pick templates — we design their site during onboarding. |
| Course / LMS | Real value but heavyweight. Need content publishing working first. |
| Video creator / hosting | Browser recording + TUS + transcription is complex. Phase 2. |
| Podcasts | Audio hosting is a commodity. Point to existing podcast hosts for now. |
| E-commerce / bookstore | Need content before commerce. Stripe integration Phase 2. |
| Advanced AI agents (19 of 22) | 3 agents deliver 80% of the value. The other 19 are iteration. |
| Discovery algorithms | Manual curation beats cold-start algorithms. Phase 2 when we have data. |
| Multi-language / i18n | English-only for MVP. Explicitly excluded in existing MVP definition. |
| Advanced analytics | Basic page views only. Scroll depth, CLV, watch analytics are Phase 2. |
| Assessments (mDNA, APEST) | Tenant-specific feature (Alan Hirsch), not platform-wide MVP. |
| Collaborative content | Network co-authoring is vision, not launch. |
| White-label / enterprise | Explicitly excluded in existing MVP definition. |
| Public search | Need content volume first. |
| Comparison pages | Marketing optimization, not launch-critical. |
| Fit-check qualification funnel | Adds friction. Remove the gate — let people sign up. |

---

## MVP User Journey (End to End)

```
1. DISCOVER
   Leader finds movemental.ai (referral, search, network)
   → Reads Homepage → Why Movemental → Pricing

2. DECIDE
   Leader clicks "Get Your Platform"
   → Creates account (Supabase Auth)

3. ONBOARD
   Leader completes 9-step intake
   → Voice samples, brand preferences, vision, content inventory
   → Pays $1,000 (Stripe)

4. BUILD (Movemental Team + AI)
   Platform configured from onboarding responses
   → Custom domain pointed
   → Brand applied (colors, fonts, logo)
   → Voice baseline established from samples
   → 2–4 week setup period

5. CREATE
   Leader opens dashboard
   → Writes articles with AI writing assistant
   → Publishes to their site
   → AI suggests SEO optimizations
   → Content appears on their custom domain

6. AMPLIFY
   Leader appears in movemental.ai network directory
   → Cross-links form as leaders reference each other
   → Network profile shows their platform + connections
   → 90% of any revenue stays with the leader
```

---

## Success Criteria (Borrowed + Refined from Existing MVP Definition)

| Metric | Target |
|--------|--------|
| Platform uptime | 99%+ |
| Page load time | < 2 seconds |
| API response time | < 500ms |
| Onboarding completion rate | > 70% |
| First article published within 7 days of access | > 50% of leaders |
| Revenue share accuracy | 100% |
| Leader NPS | > 50 |
| Leaders on platform at MVP launch | 5–10 (quality over quantity) |

---

## Phase 2 Priorities (Post-MVP, In Order)

1. **E-commerce** — Stripe integration, book sales, course purchases (90/10 split)
2. **Courses / LMS** — Course builder, lessons, progress tracking, certificates
3. **Advanced AI agents** — Formation Companion, Related Content Finder, Network Intelligence
4. **Video** — Hosting, streaming, in-browser recording
5. **Network feed** — Aggregated content from across the network
6. **Discovery** — Algorithmic recommendations based on content + network graph
7. **Analytics** — Engagement depth, revenue analytics, network amplification scoring
8. **Podcasts** — Audio hosting and distribution
9. **Multi-language** — Spanish, Portuguese, Mandarin (per 10-year vision)
10. **Assessments** — mDNA, APEST as platform-wide features (not just Alan Hirsch)

---

## Relationship to Existing Repos

| Repo | Role in MVP |
|------|-------------|
| **movemental-ai** | Marketing site + onboarding + network directory + API layer |
| **movemental-dashboard** | Source of truth for dashboard UI + editor + AI agents. Migrate relevant features into movemental-ai or keep as separate deploy behind auth. |
| **alan-hirsch** | First tenant site. Proves the multi-tenant model works. Reference implementation for all future leader sites. |
| **alan-books** | Content corpus + vector store. Powers AI agents with real theological knowledge. Feeds alan-hirsch tenant. |
| **forgotten-ways-course** | Phase 2 reference for course implementation. |

**Key architectural decision**: Whether the dashboard lives inside movemental-ai (monorepo) or stays separate (movemental-dashboard deployed independently behind auth). Both work with the multi-tenant architecture. Recommend monorepo for MVP simplicity — one deploy, one codebase, one type safety chain.

---

## Summary

The MVP is a publishing platform with three differentiators:

1. **You own it** (90/10 revenue, custom domain, your brand)
2. **AI knows your voice** (writing assistant + SEO + voice preservation)
3. **You're not alone** (network directory, cross-linking, peer credibility)

Everything else is Phase 2. Ship this, get 5–10 leaders publishing, prove the network effects thesis, then iterate.
