# Content-to-Portal Mapping

> **Mapping of existing content research files to portal directories**

**Created**: January 20, 2026  
**Status**: In Progress  
**Purpose**: Document mapping of content research files from topic-based to portal-based organization

---

## Mapping Strategy

Content research files from `_docs/content/content-research/core-content/` are mapped to portal directories based on:

1. **Portal Themes** - From `src/lib/config/portals.ts`
2. **Book-to-Portal Mapping** - From `BOOK_TO_PORTAL_MAPPING.md`
3. **Content Analysis** - Keywords, concepts, frameworks
4. **Article Directory Structure** - Portal slugs from `_docs/content/articles/`

---

## Portal Slugs

### Active Portals (5)
1. `mdna` - Missional DNA (mDNA)
2. `movement-intelligence` - Movement Intelligence (mQ)
3. `reframation` - Reframation
4. `forgotten-ways` - The Forgotten Ways
5. `metanoia` - Metanoia

### Legacy Portal Slugs (6)
6. `apest-fivefold-ministry` - APEST & Fivefold Ministry
7. `discipleship-disciple-making` - Discipleship & Disciple-Making
8. `missional-incarnational-impulse` - Missional-Incarnational Impulse
9. `apest-culture` - APEST Culture
10. `organic-systems` - Organic Systems
11. `liminality-communitas` - Liminality & Communitas

---

## Content Type Mapping

### Concept Definitions
**Source**: `core-content/concept-definitions/`

| File | Primary Portal(s) | Notes |
|------|------------------|-------|
| `concept-definition-apest-5q-overview.md` | `apest-fivefold-ministry`, `apest-culture` | APEST framework |
| `concept-definition-apostolic-genius.md` | `forgotten-ways`, `mdna` | Core mDNA concept |
| `concept-definition-movement-dna-mdna.md` | `mdna` | Primary mDNA concept |
| `concept-definition-metanoia.md` | `metanoia` | Metanoia concept |
| `concept-definition-discipline-making.md` | `discipleship-disciple-making` | Discipleship concept |
| `concept-definition-communitas.md` | `liminality-communitas` | Communitas concept |
| `concept-definition-liminality.md` | `liminality-communitas` | Liminality concept |
| `concept-definition-missional-incarnational-impulse.md` | `missional-incarnational-impulse` | Missional impulse |
| `concept-definition-organic-systems.md` | `organic-systems` | Organic systems |
| `concept-definition-apest-culture.md` | `apest-culture` | APEST culture |
| `concept-definition-jesus-is-lord-mdna.md` | `mdna` | mDNA Element 1 |

### Framework Explanations
**Source**: `core-content/framework-explanations/`

| File | Primary Portal(s) | Notes |
|------|------------------|-------|
| `framework-apest-5q.md` | `apest-fivefold-ministry` | APEST framework |
| `framework-mdna-system.md` | `mdna` | mDNA framework |
| `framework-metanoia-journey.md` | `metanoia` | Metanoia journey |
| `framework-missional-incarnational-impulse.md` | `missional-incarnational-impulse` | Missional impulse |
| `framework-organic-systems.md` | `organic-systems` | Organic systems |
| `framework-reframation-process.md` | `reframation` | Reframation process |
| `framework-movement-dynamics.md` | `movement-intelligence` | Movement dynamics |

### Comprehensive Q&A
**Source**: `core-content/comprehensive-qa/`

Files are mapped based on topic/keyword analysis. Each Q&A set typically maps to one primary portal.

### FAQ Answers
**Source**: `core-content/faq-answers/`

FAQ files are mapped based on question content and portal themes.

### Practical Guides
**Source**: `core-content/practical-guides/`

| File | Primary Portal(s) | Notes |
|------|------------------|-------|
| `how-to-activate-apest-5q-in-your-context.md` | `apest-fivefold-ministry`, `apest-culture` | APEST activation |
| `how-to-begin-the-metanoia-journey.md` | `metanoia` | Metanoia journey |
| `how-to-develop-missional-incarnational-practices.md` | `missional-incarnational-impulse` | Missional practices |
| `how-to-embed-mdna-in-your-church.md` | `mdna` | mDNA implementation |

### Case Studies
**Source**: `core-content/case-studies/`

Historical case studies may map to multiple portals, especially `forgotten-ways` and `movement-intelligence`.

### Connection Maps
**Source**: `core-content/connection-maps/`

Connection maps often cross multiple portals, especially for mDNA-related content.

### Contextual Background
**Source**: `core-content/contextual-background/`

Historical and theological context may map to multiple portals.

### Thematic Deep-Dives
**Source**: `core-content/thematic-deep-dives/`

| File | Primary Portal(s) | Notes |
|------|------------------|-------|
| `01-jesus-is-lord-christocentrism.md` | `mdna` | mDNA Element 1 |
| `02-discipleship-and-disciple-making.md` | `discipleship-disciple-making` | Discipleship theme |
| `03-movement-dynamics.md` | `movement-intelligence` | Movement dynamics |
| `04-transformation-and-change.md` | `metanoia` | Transformation theme |
| `05-community-and-communitas.md` | `liminality-communitas` | Communitas theme |
| `06-mission-and-incarnation.md` | `missional-incarnational-impulse` | Missional theme |
| `07-leadership-and-ministry.md` | `apest-fivefold-ministry`, `apest-culture` | Leadership theme |
| `08-organizational-health.md` | `apest-culture`, `organic-systems` | Organizational theme |
| `09-cultural-engagement.md` | `missional-incarnational-impulse` | Cultural engagement |
| `10-simplicity-and-essence.md` | `organic-systems` | Simplicity theme |
| `11-crisis-and-opportunity.md` | `liminality-communitas` | Crisis/liminality theme |
| `12-multiplication-and-reproduction.md` | `movement-intelligence`, `organic-systems` | Multiplication theme |

### Topic Clusters
**Source**: `core-content/topic-clusters/`

Topic clusters map to portals based on pillar pages.

### Story Index
**Source**: `core-content/story-index/`

Stories are mapped based on themes and keywords.

### Voice & Style Reference
**Source**: `core-content/voice-style-reference/`

Voice and style reference materials are shared across all portals.

---

## Cross-Portal Content

Some content appears in multiple portals:
- mDNA-related content may appear in `mdna` and specific element portals
- Movement-related content may appear in `movement-intelligence` and `forgotten-ways`
- APEST-related content may appear in `apest-fivefold-ministry` and `apest-culture`

**Strategy**: Tag content in database with multiple portal themes in `portalThemes` JSONB field.

---

## Next Steps

1. ✅ Create portal directory structure
2. ⏳ Map all content research files to portals
3. ⏳ Create symlinks or copies of files in portal directories
4. ⏳ Update database records with `portalThemes` field
5. ⏳ Verify content organization complete

---

## Related Documentation

- `BOOK_TO_PORTAL_MAPPING.md` - Book-to-portal mapping reference
- `PORTAL_THEME_MAPPING.md` - Portal theme definitions
- Portal configuration: `src/lib/config/portals.ts`
- Article directories: `_docs/content/articles/`
