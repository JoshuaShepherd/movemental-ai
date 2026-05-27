# Supporting Article Generation Framework

> **Framework for generating 267 supporting articles (7 per primary keyword)**

**Created**: January 20, 2026  
**Status**: Framework Design  
**Purpose**: Systematic generation of supporting articles following HubSpot topic cluster methodology

---

## Overview

### Current Status
- ✅ **45/45 Pillar Articles**: Complete (100% of target)
- ⚠️ **24/291 Supporting Articles**: Complete (8%)
- ⚠️ **267 Supporting Articles**: Remaining

### Target Structure
- **Total Articles**: 336 (45 pillars + 291 supporting)
- **Supporting Articles per Keyword**: 7 articles
- **Primary Keywords**: ~42 keywords (291 ÷ 7 = 41.6)
- **Article Length**: 2,000-3,000 words (shorter than pillars)
- **Voice Fidelity**: Match Alan Hirsch voice standards

---

## HubSpot Topic Cluster Methodology

### Structure
```
Pillar Article (3,000+ words)
├── Supporting Article 1: Long-tail keyword variation
├── Supporting Article 2: "How-to" guide
├── Supporting Article 3: "What is" explanation
├── Supporting Article 4: "Why" analysis
├── Supporting Article 5: Case study / Story
├── Supporting Article 6: Practical implementation
└── Supporting Article 7: Comparison / Context
```

### SEO Strategy
- **Pillar Article**: Targets primary keyword (e.g., "APEST framework")
- **Supporting Articles**: Target long-tail keywords (e.g., "how to activate APEST in small church")
- **Internal Linking**: All supporting articles link to pillar, pillar links to all supporting
- **Cluster Authority**: Builds topical authority around primary keyword

---

## Supporting Article Types (7 per Keyword)

### 1. Long-Tail Keyword Variation
**Purpose**: Target specific search queries  
**Example**: "How to activate apostolic function in your church"  
**Structure**: Focused answer to specific question  
**Word Count**: 2,000-2,500 words

### 2. "How-To" Practical Guide
**Purpose**: Step-by-step implementation  
**Example**: "How to develop missional-incarnational practices in your context"  
**Structure**: Clear steps, actionable advice  
**Word Count**: 2,000-3,000 words

### 3. "What Is" Explanation
**Purpose**: Define and explain concept  
**Example**: "What is metanoia and how does it transform discipleship"  
**Structure**: Definition, explanation, examples  
**Word Count**: 2,000-2,500 words

### 4. "Why" Analysis
**Purpose**: Explain importance and reasoning  
**Example**: "Why apostolic environment matters for movement multiplication"  
**Structure**: Problem, importance, implications  
**Word Count**: 2,000-2,500 words

### 5. Case Study / Story
**Purpose**: Real-world examples  
**Example**: "How the Chinese underground church activated apostolic genius"  
**Structure**: Narrative, analysis, principles  
**Word Count**: 2,000-2,500 words

### 6. Practical Implementation
**Purpose**: Application in specific contexts  
**Example**: "Implementing organic systems in established churches"  
**Structure**: Context, challenges, solutions  
**Word Count**: 2,000-3,000 words

### 7. Comparison / Context
**Purpose**: Compare or provide context  
**Example**: "Missional vs. attractional: understanding the difference"  
**Structure**: Comparison, contrast, integration  
**Word Count**: 2,000-2,500 words

---

## Article Template Structure

### Supporting Article Template (7 sections)

1. **Opening Hook** (200-300 words)
   - Engaging introduction
   - Personal narrative or metaphor
   - Connection to pillar article

2. **Problem/Need** (300-400 words)
   - Why this matters
   - Common challenges
   - Stakes for reader

3. **Core Explanation** (500-700 words)
   - Main concept explanation
   - How it works
   - Key principles

4. **Practical Application** (400-500 words)
   - How to implement
   - Action steps
   - Practical examples

5. **Common Challenges** (300-400 words)
   - Obstacles to overcome
   - Mistakes to avoid
   - Resistance handling

6. **Integration** (300-400 words)
   - How this connects to larger framework
   - Relationship to other concepts
   - Context within portal themes

7. **Conclusion & Next Steps** (200-300 words)
   - Summary and encouragement
   - Link to pillar article
   - Call to action

**Total Word Count**: 2,200-3,000 words

---

## Voice Fidelity Requirements

### Must Maintain
- ✅ Alan Hirsch voice characteristics
- ✅ Personal narrative and metaphor
- ✅ Theological depth with practical accessibility
- ✅ Prophetic intensity with pastoral warmth
- ✅ Direct address ("you" and "we")
- ✅ Historical examples and movement stories
- ✅ Framework integration (mDNA, APEST, etc.)

### Voice Reference
- `_docs/content/voice/` - Complete voice documentation
- `_docs/content/content-research/core-content/voice-style-reference/` - Voice reference files

---

## Portal Theme Tagging

### Requirements
- Each supporting article must be tagged with `portalThemes` in database
- Tag with primary portal slug(s) from `src/lib/config/portals.ts`
- Cross-portal content tagged with multiple portals
- Tag with portal that pillar article belongs to

### Example
```json
{
  "portalThemes": ["apest-fivefold-ministry"],
  "tags": ["apest", "fivefold", "ministry", "supporting-article"],
  "contentType": "article",
  "status": "draft"
}
```

---

## Generation Process

### Step 1: Identify Pillar Article
- Select completed pillar article
- Extract primary keyword
- Identify portal theme

### Step 2: Generate 7 Supporting Article Outlines
- Create outline for each of 7 types
- Target long-tail keywords
- Plan internal linking strategy

### Step 3: Generate Articles
- Use content writing agent
- Follow article template
- Maintain voice fidelity
- Include portal theme references

### Step 4: Review & Publish
- Review for voice fidelity
- Verify SEO optimization
- Check portal theme tagging
- Publish following workflow

---

## Priority Generation Plan

### Phase 1: High-Priority Portals
1. **mdna** - Core framework (highest priority)
2. **apest-fivefold-ministry** - High search volume
3. **movement-intelligence** - Core concept

### Phase 2: Medium-Priority Portals
4. **reframation** - Formation focus
5. **forgotten-ways** - Historical foundation
6. **metanoia** - Transformation focus

### Phase 3: Supporting Portals
7. **discipleship-disciple-making**
8. **missional-incarnational-impulse**
9. **apest-culture**
10. **organic-systems**
11. **liminality-communitas**

---

## Integration with Content Writing Agent

### Prompt Structure
```
Generate a supporting article for [portal] following the HubSpot topic cluster methodology.

Pillar Article: [link/reference]
Primary Keyword: [keyword]
Article Type: [one of 7 types]
Target Long-Tail Keyword: [specific keyword]

Requirements:
- 2,000-3,000 words
- 7-section structure
- Alan Hirsch voice fidelity
- Portal theme: [portal-slug]
- Internal links to pillar article
```

### Context Materials
- Pillar article content
- Portal theme documentation
- Voice style reference
- Content research files from portal directory
- Related framework documentation

---

## Success Metrics

### Content Quality
- ✅ Voice fidelity maintained
- ✅ SEO optimization complete
- ✅ Portal theme tagging correct
- ✅ Internal linking strategy implemented

### Quantity Goals
- ✅ 267 supporting articles generated
- ✅ 7 articles per primary keyword
- ✅ All pillar articles have supporting cluster
- ✅ Portal coverage complete

### Search Performance
- ✅ Long-tail keyword targeting
- ✅ Topical authority built
- ✅ Internal linking strength
- ✅ Search visibility improved

---

## Related Documentation

- `PUBLISHING_STANDARDS.md` - Quality guidelines
- `PUBLISHING_WORKFLOW.md` - Publication process
- `COMPLETION_STATUS.md` - Article tracking
- `PUBLISHING_PRIORITY_LIST.md` - Prioritized list
- Portal configuration: `src/lib/config/portals.ts`
- Voice documentation: `_docs/content/voice/`

---

## Next Steps

1. ✅ Create framework documentation
2. ⏳ Integrate with content writing agent
3. ⏳ Generate test supporting article
4. ⏳ Validate voice fidelity
5. ⏳ Scale to all pillar articles

---

**Framework Status**: Design Complete - Ready for Implementation
