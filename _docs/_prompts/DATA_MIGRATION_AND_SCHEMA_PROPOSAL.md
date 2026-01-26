# Comprehensive Data Migration & Schema Adjustment Proposal

> **Purpose**: Analyze the movemental.ai multi-tenant database against existing documentation and propose schema additions/migrations to support complete author data, content management, and movement leader research.

**Version**: 1.0.0  
**Created**: January 26, 2026  
**Status**: PROPOSAL - Awaiting Review

---

## Executive Summary

After analyzing the Supabase database (44 tables) and the comprehensive documentation in `_docs/`, this proposal identifies:

1. **Schema Gaps**: Tables/columns needed to store rich author profile data, movement leader research, and content strategy information
2. **Data Migration Paths**: How existing documentation should map to database tables
3. **Multi-Tenant Considerations**: Ensuring all new tables maintain tenant isolation via `organization_id`
4. **Prioritized Implementation**: Phased approach for schema updates and data seeding

### Key Findings

| Category | Current State | Gap Assessment | Priority |
|----------|--------------|----------------|----------|
| **Author Profiles** | Basic `user_profiles` table | Missing voice patterns, frameworks, calling data | HIGH |
| **Content Audits** | No dedicated storage | Need content inventory/gap tracking | MEDIUM |
| **Movement Leader Research** | No storage | 40+ leaders researched, needs structured storage | HIGH |
| **Book Metadata** | Comprehensive `books` table | Mostly sufficient, minor additions needed | LOW |
| **Audience Segments** | No dedicated storage | Need audience intelligence storage | MEDIUM |

---

## Part 1: Current Database Schema Analysis

### Existing Tables (44 Total)

Based on Supabase MCP query, the database contains these tables organized by domain:

#### User & Organization Domain
- `organizations` - Tenant root (28 columns)
- `organization_memberships` - User-org relationships
- `user_profiles` - User/Author profiles (39 columns)
- `user_context_profiles` - Context extensions
- `user_personality` - Personality data
- `user_memory` - User memory storage

#### Content Domain
- `content_items` - Articles, posts, testimonials (63 columns)
- `content_categories` - Category taxonomy
- `content_versions` - Version history

#### Books Domain
- `books` - Book catalog (73 columns - very comprehensive)
- `book_chapters` - Chapter content
- `book_series` - Series groupings
- `books_chapters` - Junction table
- `citations` - Citation tracking

#### Courses Domain
- `courses` - Course definitions (37 columns)
- `course_weeks` - Week structure
- `course_lessons` - Lesson content
- `formation_practice_assignments` - Practice tracking

#### Media Domain
- `videos` - Video content (38 columns)
- `video_series` - Video series
- `video_recordings` - Recording metadata
- `media_items` - General media (18 columns)

#### AI/Agents Domain
- `agents` - Agent definitions
- `agent_tools` - Tool configurations
- `agent_instances` - Active instances
- `agent_guardrails` - Safety guardrails
- `agent_traces` - Execution traces

#### Assessment Domain
- `assessments` - Assessment definitions (24 columns)
- `assessment_questions` - Question bank
- `assessment_responses` - Response storage
- `user_assessments` - User results

#### Analytics Domain
- `analytics_events` - Event tracking
- `page_views` - Page view tracking
- `performance_metrics` - Performance data
- `search_analytics` - Search tracking

#### Archive Domain
- `archive_collections` - Collection organization
- `archive_items` - Archive content
- `archive_topics` - Topic categorization

#### Other
- `communities` - Community features
- `subscription_plans` - Subscription tiers
- `ai_lab_conversations` - AI Lab sessions
- `ai_lab_lite_conversations` - Lite AI sessions

---

## Part 2: Documentation Content Inventory

### Movement Leader Research (`_docs/movement_leader_research/`)

**40+ Movement Leaders Researched**, each with:

| File Type | Description | Example |
|-----------|-------------|---------|
| `summary.md` | Executive summary of leader | Brad Brisco research summary |
| `content-analysis.md` | Content inventory analysis | Existing content formats |
| `digital-presence-discovery.md` | Platform/presence mapping | Website, social, podcast |
| `gap-analysis.md` | Content gaps identified | Missing video, courses |
| `movemental-analysis.md` | Movemental fit assessment | Platform alignment |
| `identity-verification.md` | Identity confirmation | Name, roles, affiliations |
| `sources.md` | Research sources | URLs, publications |

**Complete Leader List**:
- Alan Hirsch (flagship author)
- Alan McWilliam
- Andrew Jones
- Brad Brisco (detailed profiles)
- Bree Mills
- Brian Johnson
- Brian Swanson
- Cam Roxburgh
- Darryl Answer
- Dave Ferguson
- Deb Hirsch
- Ed Love
- Emma Cotterill
- Geoff Maddock
- Hugh Halter
- Jeff Vanderstelt
- JR Woodward
- Kurt Rietema
- Lucas Pulley
- Mandy Smith
- Mark Cotterill
- Mark Sayers
- Meghan Good
- Michael Frost
- Mike Jerell
- Mindy Caliguire
- Neil Mosely
- Peyton Jones
- Rich Robinson
- Rick Warren
- Rob Bell
- Rob Wegner
- Rowland Smith
- Scott Brennan
- Scott Shepherd
- Stacy Gaskins
- Steve Addison
- Steve Pike
- Tiffany Smith
- Tim Catchim
- Tim Keel
- Tomy Wilkerson

### Detailed Author Research (`_docs/movement_leader_research/author-research/`)

**Rich Author Profile Components**:

| Profile Type | Content | Database Need |
|--------------|---------|---------------|
| `AUTHOR_PROFILE.md` | Biography, roles, affiliations, digital presence | New `author_profiles` table |
| `AUDIENCE_PROFILE.md` | TAM analysis, segments, consumption patterns | New `audience_segments` table |
| `CALLING_PROFILE.md` | mDNA alignment, calling statement, movement leadership | JSONB field or new table |
| `CONTENT_AUDIT.md` | Content inventory, performance, gaps, repurposing | New `content_audits` table |
| `PROFILES_INDEX.md` | Profile navigation/index | View or computed field |
| `ORGS.md` | Organization affiliations | Relationship table |
| `TIMELINE.md` | Career/publication timeline | JSONB field |

**Example: Brad Brisco Complete Profile Data**

```
Author Profile:
├── Executive Summary
├── Biographical Profile
│   ├── Personal Background
│   ├── Professional Roles & Affiliations
│   └── Academic Positions
├── Core Frameworks & Concepts
│   ├── Missional Ecclesiology
│   ├── Covocational Church Planting
│   ├── Theology of Place
│   └── APEST Framework Alignment
├── Major Published Works (5+ books)
├── Voice Patterns & Linguistic Signatures
│   ├── Theological Terminology
│   ├── Tone Markers
│   └── Sentence Structure Patterns
├── Digital Presence Map
│   ├── Owned Properties
│   ├── Social Media
│   └── Third-Party Platforms
├── Expertise Matrix
├── Theological Positions
└── Content Strategy Implications
```

### Book Development (`_docs/book-development/`)

**Book Content** (27 chapters drafted):
- Chapter drafts ready for publishing
- Process documentation
- Author transcripts

**Metadata Needed**:
- Book development status
- Chapter completion tracking
- Author/co-author assignments
- Publication workflow state

### Business Documentation (`_docs/business-docs/`)

**Strategic Documentation**:
- Business strategy and model
- Product/platform overview
- Brand positioning
- AI content systems specifications
- Go-to-market strategy

**Content That Should Be Queryable**:
- Value propositions
- Feature specifications
- Pricing models
- AI agent configurations

---

## Part 3: Schema Gaps & Proposed Additions

### GAP 1: Author Profile Extensions (HIGH PRIORITY)

**Current State**: `user_profiles` has 39 columns including `unified_movemental_profile` (JSONB), but lacks:
- Voice patterns and linguistic signatures
- Core frameworks mastery
- Calling/mDNA alignment
- Digital presence mapping
- Content strategy data

**Proposed Solution**: New `author_profiles` table

```sql
CREATE TABLE author_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Executive Summary
  executive_summary TEXT,
  key_accomplishments JSONB, -- Array of accomplishments
  current_status TEXT,
  
  -- Core Frameworks
  core_frameworks JSONB, -- Array of {name, description, key_works, alignment_strength}
  theological_positions JSONB, -- Key theological commitments
  expertise_matrix JSONB, -- Competencies and unique insights
  
  -- Voice & Style
  voice_patterns JSONB, -- {terminology: [], tone_markers: [], sentence_patterns: []}
  linguistic_signatures JSONB,
  
  -- Digital Presence
  digital_presence JSONB, -- {owned_properties: [], social_media: [], third_party: []}
  content_channels JSONB, -- Current distribution channels
  
  -- Calling & mDNA
  calling_statement TEXT,
  mdna_alignment JSONB, -- {element: alignment_strength, evidence: []}
  movement_leadership_indicators JSONB,
  
  -- Content Strategy
  topics_to_own JSONB, -- Array of priority topics
  content_gaps JSONB, -- Identified gaps
  repurposing_opportunities JSONB,
  
  -- Metadata
  research_date TIMESTAMPTZ,
  confidence_level TEXT, -- high, medium, low
  status TEXT DEFAULT 'draft', -- draft, in_progress, complete
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_author_profiles_user ON author_profiles(user_id);
CREATE INDEX idx_author_profiles_org ON author_profiles(organization_id);
```

**Data Migration**: 40+ leader research files → `author_profiles` records

---

### GAP 2: Audience Intelligence (MEDIUM PRIORITY)

**Current State**: No storage for audience segment data

**Proposed Solution**: New `audience_profiles` table

```sql
CREATE TABLE audience_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_profile_id UUID REFERENCES author_profiles(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Market Analysis
  total_addressable_market JSONB, -- Market size estimates
  market_growth_trends JSONB,
  market_positioning TEXT,
  
  -- Segments (JSONB array)
  segments JSONB, -- [{name, percentage, demographics, psychographics, content_needs, how_served}]
  
  -- Content Consumption
  consumption_map JSONB, -- Preferred formats by segment
  channel_preferences JSONB, -- Preferred channels by segment
  engagement_timing JSONB, -- Best times, frequency
  
  -- Unmet Needs
  high_priority_gaps JSONB,
  medium_priority_gaps JSONB,
  
  -- Distribution Strategy
  primary_channels JSONB,
  secondary_channels JSONB,
  emerging_channels JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Data Migration**: `AUDIENCE_PROFILE.md` files → `audience_profiles` records

---

### GAP 3: Content Audits (MEDIUM PRIORITY)

**Current State**: No storage for content inventory and gap analysis

**Proposed Solution**: New `content_audits` table

```sql
CREATE TABLE content_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_profile_id UUID REFERENCES author_profiles(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Content Inventory
  books JSONB, -- [{title, year, publisher, status, performance, repurposing_opportunity}]
  articles JSONB, -- [{platform, frequency, topics, performance}]
  videos JSONB, -- Current video content assessment
  podcasts JSONB, -- Podcast presence assessment
  courses JSONB, -- Course/curriculum inventory
  training_programs JSONB, -- Training program inventory
  
  -- Performance Analysis
  high_performing_content JSONB,
  medium_performing_content JSONB,
  undocumented_content JSONB,
  
  -- Gap Analysis
  content_gaps JSONB, -- [{gap, impact, priority, opportunity}]
  
  -- Repurposing Roadmap
  repurposing_opportunities JSONB, -- [{source, target, format, priority, estimated_value}]
  
  -- Content Architecture
  topic_clusters JSONB, -- Pillar content strategy
  content_calendar_recommendations JSONB,
  
  -- Optimization Opportunities
  seo_opportunities JSONB,
  content_refresh_needed JSONB,
  distribution_expansion JSONB,
  
  -- Metadata
  audit_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Data Migration**: `CONTENT_AUDIT.md` files → `content_audits` records

---

### GAP 4: Movement Leader Research (HIGH PRIORITY)

**Current State**: No storage for pre-onboarding leader research

**Proposed Solution**: New `movement_leader_research` table

```sql
CREATE TABLE movement_leader_research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id), -- Null for platform-level research
  
  -- Identity
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  email TEXT,
  
  -- Research Status
  research_status TEXT DEFAULT 'discovered', -- discovered, researching, complete, onboarded
  research_date TIMESTAMPTZ,
  confidence_level TEXT, -- high, medium, low
  
  -- Summary
  executive_summary TEXT,
  key_findings JSONB,
  primary_opportunities JSONB,
  
  -- Digital Presence Discovery
  websites JSONB, -- [{url, type, description}]
  social_profiles JSONB, -- [{platform, url, followers}]
  published_works JSONB, -- [{title, type, year, publisher}]
  podcast_appearances JSONB,
  teaching_positions JSONB,
  professional_roles JSONB,
  
  -- Content Landscape
  content_forms JSONB, -- Types of content they produce
  content_themes JSONB, -- Key themes across content
  content_distribution JSONB, -- How content is distributed
  content_volume JSONB, -- Estimated content volume
  
  -- Discoverability Assessment
  current_discoverability TEXT,
  discoverability_gaps JSONB,
  discoverability_opportunities JSONB,
  
  -- Gap Analysis
  embodied_vs_digital_gaps JSONB,
  content_repurposing_opportunities JSONB,
  connection_ecosystem_gaps JSONB,
  
  -- Movemental Fit
  movemental_opportunities JSONB, -- What Movemental would change
  what_remains_same JSONB, -- What wouldn't change
  specific_opportunities JSONB, -- Priority opportunities
  network_effect_potential JSONB,
  
  -- Boundaries
  what_we_will_not_do JSONB, -- Explicit boundaries
  
  -- Sources
  sources JSONB, -- [{url, type, access_date}]
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for quick lookup
CREATE INDEX idx_mlr_slug ON movement_leader_research(slug);
CREATE INDEX idx_mlr_status ON movement_leader_research(research_status);
```

**Data Migration**: 40+ leader folders → `movement_leader_research` records

---

### GAP 5: Co-Author Relationships (LOW PRIORITY)

**Current State**: `books.co_authors` is JSONB, no structured relationships

**Proposed Solution**: New `book_authors` junction table

```sql
CREATE TABLE book_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES user_profiles(id),
  role TEXT DEFAULT 'co_author', -- primary_author, co_author, contributor, editor
  attribution_order INTEGER DEFAULT 1,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(book_id, author_id)
);
```

---

### GAP 6: AI Agent Voice Baselines (ENHANCEMENT)

**Current State**: `user_profiles` has basic data, agents table exists

**Proposed Enhancement**: Add to `author_profiles` or new `voice_baselines` table

```sql
CREATE TABLE voice_baselines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_profile_id UUID NOT NULL REFERENCES author_profiles(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Voice Fingerprint
  writing_samples JSONB, -- Array of analyzed samples
  vocabulary_preferences JSONB, -- Frequently used terms
  avoided_terms JSONB, -- Terms to avoid
  sentence_patterns JSONB, -- Typical sentence structures
  
  -- Tone Configuration
  tone_markers JSONB, -- {formality, warmth, authority, etc.}
  theological_terminology JSONB, -- Domain-specific terms
  
  -- AI Configuration
  system_prompt_base TEXT, -- Base prompt for voice emulation
  temperature_preference NUMERIC, -- Preferred AI temperature
  
  -- Validation
  last_validated_at TIMESTAMPTZ,
  validation_score NUMERIC,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## Part 4: Data Migration Plan

### Phase 1: Schema Updates (Week 1-2)

**Priority Order**:
1. `author_profiles` table (HIGH - foundation for other tables)
2. `movement_leader_research` table (HIGH - 40+ leaders to import)
3. `audience_profiles` table (MEDIUM)
4. `content_audits` table (MEDIUM)
5. `book_authors` junction (LOW)
6. `voice_baselines` table (ENHANCEMENT)

**Drizzle Migration Files**:
```
db/migrations/
├── 0001_add_author_profiles.sql
├── 0002_add_movement_leader_research.sql
├── 0003_add_audience_profiles.sql
├── 0004_add_content_audits.sql
├── 0005_add_book_authors.sql
└── 0006_add_voice_baselines.sql
```

### Phase 2: Data Seeding Scripts (Week 2-3)

**Seeding Priority**:

| Source | Target Table | Record Count | Script |
|--------|-------------|--------------|--------|
| `movement_leader_research/*/summary.md` | `movement_leader_research` | ~40 | `seed-leaders.ts` |
| `author-research/*_AUTHOR_PROFILE.md` | `author_profiles` | ~5 | `seed-author-profiles.ts` |
| `author-research/*_AUDIENCE_PROFILE.md` | `audience_profiles` | ~5 | `seed-audience-profiles.ts` |
| `author-research/*_CONTENT_AUDIT.md` | `content_audits` | ~5 | `seed-content-audits.ts` |

**Seed Script Structure**:
```typescript
// scripts/seed-leaders.ts
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import { db } from '../db';
import { movementLeaderResearch } from '../db/schema';
import { parseMarkdownToStructured } from '../lib/utils/markdown-parser';

async function seedMovementLeaders() {
  const leaderFolders = await glob('_docs/movement_leader_research/*/');
  
  for (const folder of leaderFolders) {
    const summary = await readFile(`${folder}/summary.md`, 'utf-8');
    const parsed = parseMarkdownToStructured(summary);
    
    await db.insert(movementLeaderResearch).values({
      name: parsed.name,
      slug: folder.split('/').slice(-1)[0],
      executiveSummary: parsed.executiveSummary,
      keyFindings: parsed.keyFindings,
      // ... map other fields
    });
  }
}
```

### Phase 3: Service Layer Updates (Week 3-4)

**New Services Needed**:
- `AuthorProfilesService` (Layer 3)
- `MovementLeaderResearchService` (Layer 3)
- `AudienceProfilesService` (Layer 3)
- `ContentAuditsService` (Layer 3)

**Zod Schemas Required** (Layer 2):
- `AuthorProfilesSelectSchema`, `AuthorProfilesInsertSchema`, `AuthorProfilesUpdateSchema`
- `MovementLeaderResearchSelectSchema`, `MovementLeaderResearchInsertSchema`
- `AudienceProfilesSelectSchema`, `AudienceProfilesInsertSchema`
- `ContentAuditsSelectSchema`, `ContentAuditsInsertSchema`

---

## Part 5: Multi-Tenant Considerations

### All New Tables Include `organization_id`

| Table | Tenant Scoping | Notes |
|-------|---------------|-------|
| `author_profiles` | Required | Scoped to tenant |
| `audience_profiles` | Required | Scoped to tenant |
| `content_audits` | Required | Scoped to tenant |
| `movement_leader_research` | Optional | Platform-level research may be `NULL` |
| `book_authors` | Required | Follows `books` tenant |
| `voice_baselines` | Required | Scoped to tenant |

### Platform-Level vs Tenant-Level Data

**Platform-Level** (no `organization_id` or nullable):
- Movement leader research (pre-onboarding, platform scouts)
- Shared framework definitions
- Platform templates

**Tenant-Level** (required `organization_id`):
- Author profiles for onboarded leaders
- Audience profiles specific to each platform
- Content audits for tenant content
- Voice baselines for AI personalization

---

## Part 6: Book Content from `_docs/book-development/`

### Current Book Table Analysis

The `books` table (73 columns) is comprehensive and includes:
- Basic metadata: title, slug, subtitle, description
- Publication: isbn, asin, publication_date, publisher
- Commerce: price_usd, stripe_product_id, access_type
- Content: chapters (JSONB), total_chapters, preview_chapters_count
- SEO: meta_title, meta_description, seo_keywords
- Organization: organization_id (multi-tenant)

### Book Development Content to Import

**27 Draft Chapters** in `book-development/book-draft/`:
1. `chapter-01-the-credibility-collapse.md`
2. `chapter-02-ai-as-both-problem-and-solution.md`
3. `chapter-03-why-movement-leaders-were-right-to-ignore-seo.md`
4. ... (27 total)

**Proposed Import Process**:
1. Create book record in `books` table
2. Create chapter records in `book_chapters` table
3. Link via `books_chapters` junction

### No Schema Changes Needed for Books

The existing `books` and `book_chapters` tables are sufficient. Data import only.

---

## Part 7: Implementation Checklist

### Database Layer (Layer 1)

- [ ] Create `author_profiles` table migration
- [ ] Create `movement_leader_research` table migration
- [ ] Create `audience_profiles` table migration
- [ ] Create `content_audits` table migration
- [ ] Create `book_authors` junction migration
- [ ] Create `voice_baselines` table migration
- [ ] Run migrations: `npm run db:generate && npm run db:push`
- [ ] Verify tables in Supabase

### Zod Schemas (Layer 2)

- [ ] Create `AuthorProfilesSelectSchema` with drizzle-zod
- [ ] Create `MovementLeaderResearchSelectSchema` with drizzle-zod
- [ ] Create `AudienceProfilesSelectSchema` with drizzle-zod
- [ ] Create `ContentAuditsSelectSchema` with drizzle-zod
- [ ] Export all types: `AuthorProfiles`, `MovementLeaderResearch`, etc.
- [ ] Verify TypeScript compilation

### Services (Layer 3)

- [ ] Create `AuthorProfilesService` with tenant scoping
- [ ] Create `MovementLeaderResearchService`
- [ ] Create `AudienceProfilesService` with tenant scoping
- [ ] Create `ContentAuditsService` with tenant scoping
- [ ] Verify all services filter by `organization_id`

### API Routes (Layer 4)

- [ ] Create `/api/simplified/author-profiles` routes
- [ ] Create `/api/simplified/movement-leader-research` routes
- [ ] Create `/api/simplified/audience-profiles` routes
- [ ] Create `/api/simplified/content-audits` routes

### Data Seeding

- [ ] Create `seed-leaders.ts` script
- [ ] Create `seed-author-profiles.ts` script
- [ ] Create `seed-audience-profiles.ts` script
- [ ] Create `seed-content-audits.ts` script
- [ ] Create `seed-book-chapters.ts` script
- [ ] Run seeding scripts
- [ ] Verify data in Supabase

### Validation

- [ ] Run TypeScript compilation
- [ ] Verify multi-tenant isolation
- [ ] Test API endpoints
- [ ] Verify data integrity

---

## Part 8: What Stays the Same

### Existing Schema Elements That Work

| Element | Assessment | Action |
|---------|------------|--------|
| `user_profiles` | Good foundation | Keep, extends via `author_profiles` |
| `organizations` | Solid multi-tenant | Keep as-is |
| `books` | Comprehensive | Keep as-is, import content |
| `book_chapters` | Sufficient | Keep as-is, import chapters |
| `content_items` | Flexible | Keep as-is |
| `courses` | Comprehensive | Keep as-is |
| `assessments` | Complete | Keep as-is |
| `agents` | Well-structured | Keep, extend with voice data |

### Documentation That Doesn't Need Database Storage

| Content | Reason | Action |
|---------|--------|--------|
| Business strategy docs | Internal reference | Keep in `_docs/` |
| Process documentation | Workflow guides | Keep in `_docs/` |
| Type safety docs | Developer reference | Keep in `_docs/` |
| UI documentation | Design reference | Keep in `_docs/` |

---

## Part 9: Summary & Recommendations

### Recommended New Tables (6)

1. **`author_profiles`** - Rich author intelligence storage
2. **`movement_leader_research`** - Pre-onboarding research database
3. **`audience_profiles`** - Audience segment intelligence
4. **`content_audits`** - Content inventory and gap analysis
5. **`book_authors`** - Structured co-author relationships
6. **`voice_baselines`** - AI voice configuration

### Data to Import (~45 records)

| Source | Records | Target |
|--------|---------|--------|
| Movement leader folders | ~40 | `movement_leader_research` |
| Detailed author profiles | ~5 | `author_profiles` |
| Audience profiles | ~5 | `audience_profiles` |
| Content audits | ~5 | `content_audits` |
| Book chapters | ~27 | `book_chapters` |

### Priority Recommendation

**Phase 1** (Immediate): 
- `author_profiles` and `movement_leader_research` tables
- Import Brad Brisco and Alan Hirsch complete profiles
- Import all 40+ movement leader research summaries

**Phase 2** (Next Sprint):
- `audience_profiles` and `content_audits` tables
- Import detailed audience and content audit data
- Create seeding scripts

**Phase 3** (Future):
- `book_authors` junction table
- `voice_baselines` table
- Book chapter content import

---

## Appendix A: Complete Schema SQL

See individual table definitions in Part 3. Full migration SQL available upon approval.

## Appendix B: Sample Seed Data

### Brad Brisco Author Profile (Sample)

```typescript
{
  userId: 'uuid-brad-brisco',
  organizationId: 'uuid-brad-brisco-org',
  executiveSummary: 'Brad Brisco is a missional church strategist...',
  keyAccomplishments: [
    'Director of Multiplication Strategies, Send Network',
    'Co-founder, Forge Kansas City',
    'Author of 5+ books on missional church'
  ],
  coreFrameworks: [
    {
      name: 'Missional Ecclesiology',
      description: 'Helping existing congregations transition...',
      keyWorks: ['The Missional Quest', 'ReThink'],
      alignmentStrength: 'high'
    },
    {
      name: 'Covocational Church Planting',
      description: 'Integration of marketplace vocation...',
      keyWorks: ['Covocational Church Planting'],
      alignmentStrength: 'high'
    }
  ],
  voicePatterns: {
    terminology: ['missional', 'covocational', 'multiplication', 'sent'],
    toneMarkers: ['practical accessibility', 'bridge builder', 'pragmatic theology'],
    sentencePatterns: ['Uses "not X but Y" structures']
  },
  digitalPresence: {
    ownedProperties: ['missionalchurchnetwork.com'],
    socialMedia: ['LinkedIn'],
    thirdParty: ['newchurches.com', 'ChurchLeaders.com', '5qcentral.com']
  },
  callingStatement: 'Called to bridge institutional church structures with grassroots...',
  mdnaAlignment: {
    'Jesus is Lord': { strength: 'high', evidence: ['Central to missional identity'] },
    'Disciple Making': { strength: 'high', evidence: ['Missional Essentials curriculum'] },
    'Missional-Incarnational Impulse': { strength: 'very high', evidence: ['Next Door As It Is In Heaven'] }
  },
  topicsToOwn: [
    'Missional church transition',
    'Covocational church planting',
    'Neighborhood mission',
    'Church multiplication strategies'
  ],
  researchDate: '2026-01-17',
  confidenceLevel: 'high',
  status: 'complete'
}
```

---

## Questions for Review

1. **Schema Naming**: Are the proposed table names consistent with existing conventions?
2. **JSONB vs Normalized**: Some fields use JSONB for flexibility. Should any be normalized into separate tables?
3. **Platform-Level Research**: Should `movement_leader_research` allow null `organization_id` for platform scouts?
4. **Voice Baselines**: Should this be a separate table or part of `author_profiles`?
5. **Migration Priority**: Does the proposed priority order align with business needs?

---

**Document Status**: PROPOSAL  
**Next Step**: Review and approval before implementation  
**Estimated Implementation**: 3-4 weeks (phased approach)
