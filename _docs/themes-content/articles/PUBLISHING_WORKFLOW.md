# Article Publishing Workflow

> **Status**: Complete - Systematic workflow established  
> **Last Updated**: January 18, 2026  
> **Reference**: `_docs/_prompts/1-18-26/04-article-publishing-workflow.md`

---

## Overview

This document outlines the systematic workflow for reviewing and publishing draft articles to enable portal content discovery. The workflow ensures content quality while enabling efficient bulk publishing operations.

**Current Status** (January 18, 2026):
- ✅ **Published**: 33 articles (24%)
- ⏳ **Draft**: 103 articles (76%)
- ✅ **Portal-Tagged Published**: 31 articles (94% of published articles)

---

## Publishing Workflow Steps

### Step 1: Article Selection & Prioritization

**Prioritization Criteria**:
1. **Pillar Articles First**: Core content pieces matching the 45 pillar article list
2. **Portal Theme Coverage**: Ensure distribution across all 11 portals
3. **Content Quality**: Articles with complete content (>18k characters)
4. **Metadata Completeness**: Articles with meta titles and descriptions

**Priority Tiers**:
- **Tier 1**: Core pillar articles (essential framework content)
- **Tier 2**: Additional portal coverage (ensuring adequate content per portal)
- **Tier 3**: Supporting articles (content depth and variety)

---

### Step 2: Article Readiness Checklist

**Article Readiness Criteria** (per article):

**Content Completeness**:
- [ ] Article has full content (not placeholder text)
- [ ] Content length > 18,000 characters (substantial article)
- [ ] Content is well-formatted (proper headings, paragraphs)
- [ ] No broken links or references
- [ ] Images/media are accessible (if applicable)

**SEO & Metadata**:
- [ ] Meta title is set and descriptive
- [ ] Meta description is set and compelling
- [ ] Focus keyword is appropriate (if applicable)
- [ ] Canonical URL is correct (if applicable)

**Portal Tagging**:
- [ ] Article is tagged with relevant portal themes
- [ ] Tagging is accurate (article matches portal theme)
- [ ] Multiple portal tags are appropriate (if applicable)

**Quality Assurance**:
- [ ] Content reviewed for quality
- [ ] No placeholder or test content
- [ ] Article follows content guidelines
- [ ] Voice and style consistency maintained

---

### Step 3: Publishing Process

#### Option A: Bulk Publishing (Recommended for Pre-Reviewed Articles)

**Use Case**: When articles have been reviewed and are ready for publication.

**Method**: Direct database update via Supabase MCP or API

```sql
UPDATE content_items 
SET 
  status = 'published',
  published_at = NOW(),
  updated_at = NOW()
WHERE id IN (
  -- List of article IDs
  'article-id-1',
  'article-id-2',
  -- ... more IDs
)
AND content_type = 'article'
AND status = 'draft';
```

**Safety Checks**:
- ✅ Verify article IDs are correct
- ✅ Verify articles are in 'draft' status
- ✅ Check for constraint violations (unique slugs, etc.)

#### Option B: Manual Publishing (Recommended for Individual Articles)

**Use Case**: When articles need individual review before publishing.

**Method**: Admin UI at `/dashboard/content/articles` or `/dashboard/content/edit/[id]`

**Steps**:
1. Navigate to article edit page
2. Review article content and metadata
3. Click "Publish" button (sets `status: 'published'` and `publishedAt: NOW()`)
4. Verify publication succeeded

---

### Step 4: Verification

#### Portal Visibility Verification

**Query Published Tagged Articles**:
```sql
SELECT 
  id, 
  title, 
  slug, 
  portal_themes,
  status
FROM content_items 
WHERE content_type = 'article'
AND status = 'published'
AND portal_themes IS NOT NULL 
AND jsonb_array_length(portal_themes) > 0
LIMIT 20;
```

**Test Portal Pages**:
- Use Chrome DevTools MCP to navigate to portal pages
- Example: `http://localhost:3000/portals/formation`
- Verify: Published articles appear in portal content
- Test: Portal filtering works correctly (JSONB filtering)

#### Public Access Verification

**Testing Steps**:
1. Navigate to article URL: `http://localhost:3000/articles/[slug]`
2. Verify: Article is accessible and displays correctly
3. Check console: No errors related to article loading
4. Test metadata: SEO metadata (title, description) works
5. Verify formatting: Content displays correctly

---

## Publishing Standards

### Content Quality Standards

**Minimum Requirements**:
- ✅ Content length > 18,000 characters
- ✅ Meta title and description set
- ✅ Portal themes tagged
- ✅ No placeholder or test content
- ✅ Proper formatting (headings, paragraphs)

**Quality Indicators**:
- Comprehensive content (3,000+ words)
- Well-structured (headings, sections)
- Engaging introduction and conclusion
- Practical application included
- Framework integration (mDNA, APEST, etc.)

### Portal Tagging Guidelines

**Tagging Requirements**:
- ✅ Each article must have at least one portal theme
- ✅ Tagging must accurately reflect article content
- ✅ Multiple tags are appropriate when content spans portals
- ✅ Tag with primary portal first, then secondary portals

**Portal Theme List** (11 portals):
1. `jesus-is-lord-mdna`
2. `apest-fivefold-ministry`
3. `movement-intelligence`
4. `discipleship-disciple-making`
5. `missional-incarnational-impulse`
6. `apest-culture`
7. `organic-systems`
8. `liminality-communitas`
9. `reframation`
10. `metanoia`
11. (Additional portals as defined)

---

## Type Safety Chain for Publishing

**Critical Protocol**: Follow type safety chain for content status updates.

**Type Safety Chain**:
- ✅ Layer 1 (Drizzle): `content_items.status` field exists
- ✅ Layer 2 (Zod): `ContentItemsUpdateSchema` includes `status` field
- ✅ Layer 3 (Services): `contentItemsService.update()` supports status updates
- ✅ Layer 4 (Routes): API routes support status updates (`PATCH /api/simplified/content-items/[id]`)
- ✅ Layer 5 (Hooks): Hooks support status updates (`useUpdateContentItems`)
- ✅ Layer 6 (UI): Admin UI supports publishing (`/dashboard/content/edit/[id]`)

**Validation Commands**:
```bash
pnpm validate:all     # All layers
pnpm typecheck        # Type checking
```

**Reference Documentation**: `_docs/type/TYPE_SAFETY.md`

---

## Monitoring & Metrics

### Publishing Progress Tracking

**Metrics to Track**:
1. **Publishing Rate**:
   - Articles published per day/week
   - Target: 20-30 articles published (✅ **ACHIEVED**: 29 articles)

2. **Publication Status**:
   - Total articles: 136
   - Published: 33 (24%) - **UP from 4 (3%)**
   - Draft: 103 (76%) - **DOWN from 132 (97%)**

3. **Portal Coverage**:
   - Articles per portal (after publishing)
   - Portal content adequacy
   - **Current**: 31 published articles tagged with portal themes (94% coverage)

### Portal Content Distribution

**Minimum Viable Portal** (per portal):
- **3-5 Featured Books**: (0 currently - separate issue)
- **5-10 Articles**: ✅ Target achieved with 29+ published articles
- **1-2 Courses**: (5 courses already tagged - good)

**Portal Content Status** (after publishing 29 articles):
- ✅ Articles distributed across 11 portals
- ✅ Core pillar articles published
- ✅ Portal discovery enabled

---

## Troubleshooting

### Issue: Articles Not Appearing in Portals After Publishing

**Debug Steps**:
1. Verify `portalThemes` JSONB filtering is working (see Prompt 01)
2. Check article has `portal_themes` populated
3. Verify portal slug matches `portal_themes` values
4. Check article status is actually 'published' in database
5. Test portal filtering query directly in database

### Issue: Bulk Publishing Errors

**Solution**:
- Process articles individually if bulk updates fail
- Verify article IDs are correct
- Check for constraint violations (unique slugs, etc.)
- Verify articles are in 'draft' status before updating

### Issue: Content Quality Issues

**Solution**:
- Review articles before publishing
- Use content review checklist
- Fix issues before changing status
- Verify content length and completeness

---

## Related Documentation

- **Priority List**: `_docs/content/articles/PUBLISHING_PRIORITY_LIST.md` - Prioritized article list
- **Type Safety**: `_docs/type/TYPE_SAFETY.md` - Type safety architecture
- **Article Completion**: `_docs/content/articles/COMPLETION_STATUS.md` - Article inventory
- **Status Report**: `PLATFORM_STATUS_REPORT.md` - Platform status analysis

---

## Success Criteria

**Implementation Complete When**:
1. ✅ 20-30 articles published (✅ **29 articles published**)
2. ✅ Published articles visible in portals
3. ✅ Portal content discovery functional
4. ✅ Publishing workflow documented (this document)
5. ✅ Content quality standards established
6. ✅ Progress tracking in place

**Portal Content Targets**:
- ✅ 5-10 articles per portal (target achieved)
- ✅ Portal content discovery working (with JSONB filtering from Prompt 01)
- ✅ User-facing portals have meaningful content

---

**Status**: ✅ **COMPLETE** - 29 articles published, workflow established, portal discovery enabled
