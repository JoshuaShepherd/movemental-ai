# Author Information Audit

> **Generated**: January 26, 2026  
> **Purpose**: Inventory of author-related data, presentation, and implementation across the Movemental platform  
> **Scope**: All writers, authors, leaders—not just Alan Hirsch

---

## 1. Author Data Models

### 1.1 File-Based Author System (Primary Implementation)

The platform uses a **markdown file-based author system** rather than database tables for public author profiles.

#### Author Configuration

**File**: `lib/content/authors.ts`

```typescript
const AUTHOR_CONFIGS: AuthorConfig[] = [
  {
    slug: 'alan-hirsch',
    displayName: 'Alan Hirsch',
    profileFile: 'ALAN_HIRSCH_AUTHOR_PROFILE.md',
    summaryFolder: 'alan-hirsch',
    role: 'Missional Strategist & Movement Catalyst',
  },
  {
    slug: 'brad-brisco',
    displayName: 'Brad Brisco',
    profileFile: 'BRAD_BRISCO_AUTHOR_PROFILE.md',
    summaryFolder: 'brad-brisco',
    role: 'Director of Multiplication Strategies',
  },
]
```

- **Type**: Static (parsed from markdown files at runtime)
- **Multi-tenancy**: No (public author profiles)
- **Currently Configured**: 2 authors (Alan Hirsch, Brad Brisco)

#### Author Type Definitions

**File**: `lib/content/types.ts`

| Interface | Fields | Purpose |
|-----------|--------|---------|
| `AuthorProfile` | `id`, `slug`, `displayName`, `realName`, `avatarUrl`, `bio`, `location`, `role`, `joinedAt`, `lastActive`, `followerCount`, `followingCount`, `socialLinks`, `badges`, `stats`, `topContributions`, `recentActivity`, `following`, `books`, `organizations`, `frameworks`, `coreCompetencies`, `executiveSummary`, `contentHtml` | Full author profile |
| `AuthorListItem` | `id`, `slug`, `displayName`, `avatarUrl`, `role`, `bio`, `badge` | Listing/card display |
| `AuthorSocialLink` | `type`, `url` | Social media links |
| `AuthorBadge` | `id`, `name`, `description`, `type`, `level` | Badge system |
| `AuthorStat` | `label`, `value`, `icon`, `accent` | Profile statistics |
| `AuthorContribution` | `id`, `title`, `url`, `date`, `likes` | Content contributions |
| `AuthorActivity` | `id`, `type`, `title`, `description`, `url`, `timestamp`, `relativeTime` | Activity feed |
| `AuthorBook` | `title`, `year`, `publisher`, `coAuthors`, `description` | Published works |
| `AuthorOrganization` | `name`, `role`, `description`, `url` | Org affiliations |
| `AuthorFramework` | `name`, `description`, `elements` | Thought frameworks |

---

### 1.2 Database Schema (Partial Implementation)

#### Implemented: Onboarding Responses

**File**: `db/schema.ts`

The `onboardingResponses` table contains profile-like fields:

| Field | Type | Notes |
|-------|------|-------|
| `bio` | text | User biography |
| `photoUrl` | text | Profile photo |
| `socialMediaLinks` | jsonb | Social links object |
| `email` | text | Contact email |
| `contactInformation` | jsonb | Additional contact |
| `organizationId` | uuid | **Multi-tenant field** |

- **Type**: Dynamic (database-stored)
- **Multi-tenancy**: Yes (`organizationId`)
- **Status**: Implemented

#### Documented But NOT Implemented

**File**: `_docs/business-docs/02_product_platform/database/supabase_schema.sql`

| Table | Purpose | Status |
|-------|---------|--------|
| `user_profiles` | Full user/author profiles | **NOT in Drizzle schema** |
| `books` | Book catalog | **NOT implemented** |
| `content_items` | Content with `author_id` | **NOT implemented** |
| `voice_baselines` | Author voice fingerprints | **NOT implemented** |

---

### 1.3 Author Profile Zod Schemas

**File**: `lib/schemas/index.ts`

```typescript
ProfileInformationSchema = z.object({
  bio: z.string().min(100).max(2000),
  photo: z.instanceof(File).optional(),
  socialMediaLinks: z.object({
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
  email: z.string().email(),
  contactInformation: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
})
```

- **Purpose**: Form validation for onboarding
- **Multi-tenancy**: N/A (form-level)

---

### 1.4 Static Author Data (Markdown Files)

**Location**: `_docs/movement_leader_research/author-research/`

| Author | Files |
|--------|-------|
| Alan Hirsch | `ALAN_HIRSCH_AUTHOR_PROFILE.md`, `ALAN_HIRSCH_COMPLETE_PROFILE.md`, `ALAN_HIRSCH_AUDIENCE_PROFILE.md`, `ALAN_HIRSCH_CALLING_PROFILE.md`, `ALAN_HIRSCH_CONTENT_AUDIT.md`, `ALAN_HIRSCH_ORGS.md`, `ALAN_HIRSCH_PROFILES_INDEX.md`, `ALAN_HIRSCH_TIMELINE.md` |
| Brad Brisco | `BRAD_BRISCO_AUTHOR_PROFILE.md`, `BRAD_BRISCO_AUDIENCE_PROFILE.md`, `BRAD_BRISCO_CALLING_PROFILE.md`, `BRAD_BRISCO_CONTENT_AUDIT.md`, `BRAD_BRISCO_PROFILES_INDEX.md`, `BRAD_BRISCO_RESEARCH_SUMMARY.md` |

**Additional Research**: `_docs/movement_leader_research/` contains 50+ movement leader folders with research summaries.

---

## 2. Author Pages & Routes

### 2.1 Public Pages

| URL | File Path | Purpose | Status | Data Source |
|-----|-----------|---------|--------|-------------|
| `/authors` | `app/(public)/authors/page.tsx` | Authors listing | Live | `getAllAuthors()` from markdown |
| `/profile/[id]` | `app/(public)/profile/[id]/page.tsx` | Individual profile | Live | `getAuthorBySlug()` from markdown |
| `/profile/me` | (same as above) | Current user profile | Placeholder | Requires auth (not implemented) |
| `/network` | `app/(public)/network/page.tsx` | Network discovery | Live | Hardcoded `PROFILES` array |
| `/team` | `app/(public)/team/page.tsx` | Team credibility | Live | Hardcoded team data |
| `/books` | `app/(public)/books/page.tsx` | Book catalog | Live | Hardcoded book data |
| `/books/[slug]` | `app/(public)/books/[slug]/page.tsx` | Book detail | Live | Hardcoded, links to author profiles |
| `/topics/[slug]` | `app/(public)/topics/[slug]/page.tsx` | Topic hub | Live | Hardcoded contributors |

### 2.2 API Routes

| Status | Notes |
|--------|-------|
| **None exist** | No API routes for author data |

Author data is loaded server-side from markdown files. No REST API endpoints for client-side author fetching.

### 2.3 Static Generation

- `/profile/[id]` uses `generateStaticParams()` for known author slugs
- Builds static pages for: `alan-hirsch`, `brad-brisco`

---

## 3. UI Components Rendering Authors

### 3.1 Profile & Leader Components

| Component | File Path | Author Fields Rendered |
|-----------|-----------|------------------------|
| `LeaderProfileHeader` | `components/leader-profile/LeaderProfileHeader.tsx` | `displayName`, `realName`, `avatarUrl`, `bio`, `location`, `role`, `socialLinks`, `joinedAt`, `lastActive`, `badges`, `stats`, `followerCount`, `followingCount` |
| `LeaderProfileContainer` | `components/leader-profile/LeaderProfileContainer.tsx` | Container orchestrating all profile components |
| `AuthorCard` | `components/leader-profile/AuthorCard.tsx` | `name`, `avatarUrl`, `bio`, `followerCount`, `badge`, `externalLinks`, `isFollowing` |

### 3.2 Card & Grid Components

| Component | File Path | Author Fields Rendered |
|-----------|-----------|------------------------|
| `ProfileCard` | `components/network-discovery/ProfileCard.tsx` | `name`, `role`, `organization`, `bio`, `avatarUrl`, `profileUrl`, `followerCount`, `badge` |
| `ProfileGrid` | `components/network-discovery/ProfileGrid.tsx` | Grid of `ProfileCard` components |
| `MemberCard` | `components/network-discovery/MemberCard.tsx` | `name`, `role`, `organization`, `bio`, `avatarUrl`, `profileUrl` |
| `TeamMemberCard` | `components/team-credibility/TeamMemberCard.tsx` | `name`, `role`, `bio`, `avatarUrl`, `socialLinks` |
| `TeamGrid` | `components/team-credibility/TeamGrid.tsx` | Grid of `TeamMemberCard` components |

### 3.3 Contributor Components

| Component | File Path | Author Fields Rendered |
|-----------|-----------|------------------------|
| `ContributorCard` | `components/topic-hub/ContributorCard.tsx` | `name`, `slug`, `avatar`, `pieceCount` |
| `LeaderContributors` | `components/topic-hub/LeaderContributors.tsx` | List of `ContributorCard` components |

### 3.4 Content Attribution Components

| Component | File Path | Author Fields Rendered |
|-----------|-----------|------------------------|
| `ContentCard` | `components/topic-hub/ContentCard.tsx` | `author.name`, `author.avatar` |
| `SearchResultCard` | `components/search/SearchResultCard.tsx` | `author.name`, `author.avatar` |
| `GalleryGrid` | `components/content-workbench/GalleryGrid.tsx` | `author.name`, `author.avatarUrl` |
| `ContentCardGrid` | `components/dashboard/ContentCardGrid.tsx` | `author.name`, `author.avatarUrl` |

### 3.5 Book Components

| Component | File Path | Author Fields Rendered |
|-----------|-----------|------------------------|
| `BookMeta` | `components/book-purchase/BookMeta.tsx` | `author.name`, `author.slug`, `author.avatar` (links to profile) |
| `BookCatalogCard` | `components/book-purchase/BookCatalogCard.tsx` | `author` (as string) |
| `BookDetailClient` | `components/book-purchase/BookDetailClient.tsx` | Uses `BookMeta` for author display |

### 3.6 Testimonial Components

| Component | File Path | Author Fields Rendered |
|-----------|-----------|------------------------|
| `TestimonialQuote` | `components/team-credibility/TestimonialQuote.tsx` | `author.name`, `author.title`, `author.company`, `author.avatarUrl`, `author.socialHandle`, `author.socialUrl` |
| `PullQuote` | `components/why-movemental/PullQuote.tsx` | `attribution`, `role` |

### 3.7 Summary Statistics

| Metric | Count |
|--------|-------|
| Total author-rendering components | 20 |
| Components with avatar support | 15 |
| Components with bio/description | 8 |
| Components with social links | 3 |
| Components with badge support | 3 |
| Components with follow functionality | 4 |

---

## 4. Author Contexts & Usage

### 4.1 Books

**How authors are associated**:
- Books page: `author` as string (e.g., "Alan Hirsch", "Alan Hirsch & Lance Ford")
- Book detail: `author` object with `name`, `slug`, `avatar`
- Links to `/profile/{slug}` for navigation

**Authors referenced in books**:
- Alan Hirsch
- Alan Hirsch & Lance Ford
- Mindy Caliguire
- Movemental (collective)
- Michael Frost
- Hugh Halter & Matt Smay
- Ori Brafman
- Eddie Gibbs

### 4.2 Topics / Contributors

**How contributors are displayed**:
- Contributors listed per topic with `pieceCount`
- Sample contributors are hardcoded in topic pages

**Contributors referenced**:
- Alan Hirsch (23 pieces)
- Mindy Caliguire (15 pieces)
- Tim Keel (12 pieces)
- Mandy Smith (8 pieces)
- Michael Frost (19 pieces)
- Hugh Halter (11 pieces)

### 4.3 Network Visualizations

**Where network members appear**:
- `/network` page with 9 hardcoded profiles
- Team credibility page with network visualization
- Analytics dashboard with author overlap metrics

**Network members referenced**:

| Name | Role | Organization |
|------|------|--------------|
| Alan Hirsch | Movement Catalyst | Forge International |
| Michael Frost | Theologian | Morling College |
| Deb Hirsch | Author | Forge International |
| Brad B. | Church Planter | — |
| Dave F. | Speaker | — |
| Jeff V. | Pastor | — |
| Hugh H. | Trainer | — |
| Steve A. | Researcher | — |

### 4.4 Team Page

**Team members displayed**:

| Name | Role |
|------|------|
| Josh Shepherd | Platform Lead |
| Alan Hirsch | Movement Catalyst |
| Brad Briscoe | Church Planting Strategist |

### 4.5 AI Agents / Voice Association

**Voice preservation system** (documented, not fully implemented):
- `voice_baselines` table stores author voice fingerprints
- AI Lab Agent has "Access to Alan Hirsch corpus via vector store"
- Voice & Vocation Coach analyzes voice against 5 markers:
  1. Prophetic intensity
  2. Pastoral warmth
  3. Scholarly depth
  4. Visionary scope
  5. Apostolic authority

**Author context in AI workflows**:
- Context markers: `[AGENT NOTE – ALAN HIRSCH CONTEXT: ...]`
- Multi-project context support

### 4.6 Search Results

**Author attribution in search**:
- Search results include `author.name` and `author.avatar`
- Sample results reference: Mindy Caliguire, Alan Hirsch, Scott Shepherd

### 4.7 Analytics

**Author overlaps in analytics**:
- Dashboard shows author overlap percentages
- Sample overlaps: Alan Hirsch (28%), Tim Keel (22%), Mindy Caliguire (18%)

---

## 5. Gaps, Fragmentation, or Open Questions

### 5.1 Data Model Gaps

| Gap | Description | Impact |
|-----|-------------|--------|
| **No `authors` table** | Authors stored in markdown, not database | Cannot dynamically manage authors; no CRUD operations |
| **No `user_profiles` table** | Documented in SQL but not in Drizzle schema | Cannot link users to author identities |
| **No `content_items` table** | Content-author relationships not implemented | Cannot query content by author |
| **No API routes** | Author data only available server-side | Cannot fetch authors client-side |

### 5.2 Naming Inconsistencies

| Issue | Examples | Files Affected |
|-------|----------|----------------|
| **Brad Brisco vs Brad Briscoe** | `brad-brisco` (slug) vs `Brad Briscoe` (display) | `lib/content/authors.ts`, `components/team-credibility/TeamCredibilityContainer.tsx` |
| **Inconsistent author reference methods** | By ID, by slug, by name string | Throughout codebase |

### 5.3 Hardcoded vs Dynamic Data

| Context | Data Source | Issue |
|---------|-------------|-------|
| Authors listing | Markdown files | Works, but limited to pre-configured authors |
| Network page | Hardcoded `PROFILES` array | Not connected to author content system |
| Topic contributors | Hardcoded `SAMPLE_CONTRIBUTORS` | Not connected to author content system |
| Books | Hardcoded book data | Author as string, not linked to profiles |
| Team page | Hardcoded `TEAM_MEMBERS` | Duplicates author data |

### 5.4 Author Relationship Limitations

| Limitation | Description |
|------------|-------------|
| **Single author per content** | Database schema shows `author_id` (singular), but books display co-authors |
| **No co-author modeling** | Co-authors stored as strings ("Alan Hirsch & Lance Ford") |
| **No network relationships** | No database model for author-to-author connections |
| **No contributor tracking** | No link between authors and their topic contributions |

### 5.5 Implicit / Partially Implemented Concepts

| Concept | Status | Notes |
|---------|--------|-------|
| **Author credibility scoring** | Implicit | Badge system exists, but no credibility metrics |
| **Network authority signals** | Implicit | Follower counts displayed but not persisted |
| **Author hierarchy (peer/steward/founder)** | Implicit | Roles exist but no formal hierarchy model |
| **Author voice metadata** | Documented | `voice_baselines` table documented but not implemented |
| **Author lifecycle** | Not implemented | No onboarding → active → legacy flow |
| **Multi-tenant author profiles** | Partial | `onboardingResponses` has `organizationId`, but author profiles don't |

### 5.6 Badge System

**Implemented badge types**:
- `author` — Book Author
- `verified` — Verified
- `contributor` — Contributor
- `expert` — Expert
- `moderator` — Moderator
- `founder` — Founder
- `early-adopter` — Early Adopter
- `active` — Active

**Not implemented**:
- Badge assignment logic
- Badge earning criteria
- Badge display rules per context

### 5.7 Open Questions

1. **Should authors be tenant-scoped?** Current author profiles are public, not tied to `organizationId`.

2. **How should co-authors be modeled?** Many-to-many relationship needed for books and content.

3. **How do network authors relate to platform authors?** Network members appear hardcoded separately from author profiles.

4. **What's the relationship between `user_profiles` and author profiles?** Should platform users become authors? Or are they separate?

5. **How should author voice preservation integrate with profiles?** Voice baselines documented but not linked to author management.

6. **Should contributor counts be tracked in real-time?** Currently hardcoded per topic.

---

## Summary Table

| Category | Count | Status |
|----------|-------|--------|
| Database tables for authors | 0 | Not implemented |
| Markdown author profiles | 2 | Alan Hirsch, Brad Brisco |
| Author-related routes | 8 | All live |
| Author API endpoints | 0 | Not implemented |
| UI components rendering authors | 20 | Implemented |
| Hardcoded author references | 50+ | Scattered throughout |
| Movement leaders researched | 50+ | In `_docs/movement_leader_research/` |

---

**Document Status**: Complete  
**Next Steps**: Use this audit to inform strategic decisions about author identity, credibility signaling, and network representation.
