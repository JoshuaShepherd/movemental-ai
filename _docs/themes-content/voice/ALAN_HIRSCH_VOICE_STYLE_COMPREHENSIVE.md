# Alan Hirsch Voice & Style: Comprehensive Documentation

**Purpose**: This document comprehensively presents all factors, code, prompts, documentation, and systems that currently comprise the way Alan Hirsch's "voice" and style are represented and emulated by agents and content systems.

**Last Updated**: December 2025  
**Status**: Active documentation of implemented and documented systems

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Currently Implemented Agents](#currently-implemented-agents)
3. [Voice & Style Framework](#voice--style-framework)
4. [Documentation (Not Yet Implemented)](#documentation-not-yet-implemented)
5. [Evaluation Systems](#evaluation-systems)
6. [Code Implementation Details](#code-implementation-details)
7. [Content Approach Considerations](#content-approach-considerations)
8. [Source Material & Corpus](#source-material--corpus)
9. [Implementation Status Summary](#implementation-status-summary)

---

## Executive Summary

The Alan Hirsch voice and style system consists of:

### ✅ **Currently Implemented**
- **Formation Companion Agent**: Fully integrated with comprehensive voice emulation
- **Voice Coach Agent**: Complete voice analysis and coaching system
- **Voice Authenticity Agent**: 75-point scoring system for voice faithfulness
- **Writing Coach Agent**: Basic voice-aware writing guidance
- **Vocational Coach Agent**: Voice-aware career guidance
- **Voice Coach (API Route)**: Simple voice coaching via API
- **Evaluation System**: Comprehensive voice/style evaluation framework
- **Analysis Functions**: TypeScript functions for calculating voice metrics

### 📚 **Documented (Not Yet Fully Implemented)**
- **Vector Store Integration**: Configured but placeholder/mocked
- **Comprehensive Style Guide**: Analysis of 124 MDX files from 14 books
- **Voice Metrics Translation Guide**: Practical examples of achieving target scores
- **OpenAI Agent System Prompt**: Complete prompt for external AI agents
- **Additional Agent Implementations**: Several agents documented but not yet built

### 📊 **Evaluation & Measurement**
- **Five Voice Markers**: Quantitative scoring system (0.0-1.0)
- **Hallmark Lexicon**: 13 canonical terms identifying authentic voice
- **Coherence Score**: Weighted composite of all markers
- **Evaluation Datasets**: Canonical examples, transformations, failure modes
- **Graders**: Automated and qualitative evaluation functions

---

## Currently Implemented Agents

### 1. Formation Companion Agent ✅ **FULLY IMPLEMENTED**

**Location**: `src/agents/formation-companion/`

**Status**: ✅ Complete - All voice elements integrated (Version 2.0.0, January 2025)

**Voice Integration**:
- **Token Function**: `alanHirschVoice()` in `src/agents/formation-companion/tokens.ts`
- **Integration**: Fully integrated into agent instructions via `src/agents/formation-companion/index.ts`
- **Charter Update**: Voice specification in `src/agents/formation-companion/charter.ts`

**What It Includes**:
- All five voice markers with target ranges and implementation guidance
- Hallmark lexicon (13 canonical terms, 9+ per response target)
- Voice patterns (metaphor density, indicative/imperative ratio, formality, warmth/irony)
- Communication style guidelines
- Coherence score target (≥0.75)
- Failure modes to avoid

**Key Files**:
- `src/agents/formation-companion/tokens.ts` (lines 98-323): Complete `alanHirschVoice()` function
- `src/agents/formation-companion/index.ts` (lines 45-66): Voice token integrated into instructions
- `src/agents/formation-companion/charter.ts`: Updated personality object with voice specification

**Documentation**:
- `_docs/agents/FORMATION_COMPANION_VOICE_INTEGRATION.md`: Complete integration documentation

---

### 2. Voice Coach Agent ✅ **FULLY IMPLEMENTED**

**Location**: `src/agents/voice-coach/`

**Status**: ✅ Complete - Voice analysis and coaching system

**Capabilities**:
- Analyzes content for voice coherence
- Provides voice-preserving rewrite suggestions
- Tracks five voice markers
- Uses hallmark lexicon for evaluation
- Provides coaching feedback

**Key Files**:
- `src/agents/voice-coach/index.ts`: Agent definition with voice marker tracking
- `src/agents/voice-coach/analysis.ts`: Analysis functions for calculating voice metrics

**Voice Elements**:
- Five voice markers with target ranges
- Hallmark lexicon evaluation
- Coherence score calculation
- Voice pattern analysis (metaphor density, indicative/imperative ratio, formality)

**Documentation**:
- `_docs/site-agents/src/agents/voice-coach/VOICE_COACH_AGENT.md`: Agent documentation

---

### 3. Voice Authenticity Agent ✅ **FULLY IMPLEMENTED**

**Location**: `src/agents/voice-authenticity/`

**Status**: ✅ Complete - 75-point scoring system

**Scoring System** (75 points total):
- **Theological Consistency** (30 points):
  - Alignment with Positions (10 points)
  - Consistency with Teachings (10 points)
  - Biblical Accuracy (10 points)
- **Voice Authenticity** (28 points):
  - Writing Style Consistency (10 points)
  - Personal Anecdotes (8 points)
  - Unique Perspective (10 points)
- **Content Originality** (17 points):
  - Original Insights (10 points)
  - Personal Experience (7 points)

**Key Files**:
- `src/agents/voice-authenticity/index.ts`: Agent definition
- `src/agents/voice-authenticity/scoring.ts`: Comprehensive scoring engine

**Tools**:
- `establish_voice_baseline`: Create voice fingerprint from existing content
- `analyze_voice_faithfulness`: Analyze content against baseline
- `compare_voice_consistency`: Compare multiple pieces for consistency
- `suggest_voice_improvements`: Provide improvement recommendations

---

### 4. Writing Coach Agent ✅ **PARTIALLY IMPLEMENTED**

**Location**: `src/app/api/agents/chat/route.ts` (lines 8-35)

**Status**: ✅ Basic implementation - Voice-aware but not comprehensive

**Current Implementation**:
- Basic instructions referencing Alan Hirsch's voice
- MCP integration for accessing Alan's database
- Maintains "scholarly yet accessible" voice
- References specific works when appropriate

**Limitations**:
- Does not include comprehensive five voice markers
- Does not include hallmark lexicon requirements
- Does not include detailed voice pattern guidance
- Basic voice awareness, not full emulation

**Note**: This is a simpler API-based agent, not the full Voice Coach agent system.

---

### 5. Vocational Coach Agent ✅ **PARTIALLY IMPLEMENTED**

**Location**: `src/app/api/agents/chat/route.ts` (lines 36-63)

**Status**: ✅ Basic implementation - Voice-aware but not comprehensive

**Current Implementation**:
- Basic instructions for vocational guidance
- MCP integration for accessing Alan's teachings
- Missional-focused career guidance
- References Alan's specific teachings

**Limitations**:
- Does not include comprehensive five voice markers
- Does not include hallmark lexicon requirements
- Basic voice awareness, not full emulation

---

### 6. Voice Coach (API Route) ✅ **PARTIALLY IMPLEMENTED**

**Location**: `src/app/api/agents/chat/route.ts` (lines 64-92)

**Status**: ✅ Basic implementation - Voice coaching via API

**Current Implementation**:
- Voice and communication coaching
- MCP integration for accessing Alan's teachings on communication
- Practical, missional-focused communication guidance
- Maintains "scholarly yet accessible" voice

**Limitations**:
- Does not include comprehensive five voice markers
- Does not include hallmark lexicon requirements
- Basic voice awareness, not full emulation

---

### 7. SEO Expert Agent ✅ **VOICE-AWARE**

**Location**: `src/agents/seo-expert/`

**Status**: ✅ Voice-aware - Validates voice markers during SEO optimization

**Voice Integration**:
- Ensures SEO changes don't reduce voice markers
- Validates that optimizations preserve voice markers
- References voice marker requirements in instructions

**Key Files**:
- `src/agents/seo-expert/index.ts` (lines 199-205): Voice marker validation

---

### 8. Related Content Agent ✅ **VOICE-AWARE**

**Location**: `src/agents/related-content/`

**Status**: ✅ Voice-aware - Prioritizes content with strong voice markers

**Voice Integration**:
- Prioritizes content demonstrating strong voice markers
- Considers prophetic intensity, pastoral warmth, christocentric anchoring, narrative imagery, and theological depth

**Key Files**:
- `src/agents/related-content/index.ts` (line 202): Voice marker prioritization

---

### 9. Sermon Shaper Agents ✅ **VOICE-AWARE**

**Location**: `src/agents/sermon-shaper/`

**Status**: ✅ Voice-aware - Multiple agents with voice integration

**Agents**:
- **Voice Coach** (`src/agents/sermon-shaper/voice-coach/index.ts`): Tracks voice markers, references translation guide
- **SEO Expert** (`src/agents/sermon-shaper/seo-expert/index.ts`): Validates voice markers during SEO optimization

---

## Voice & Style Framework

### The Five Voice Markers

**Status**: ✅ Fully implemented in Formation Companion, Voice Coach, and evaluation systems

**Location**: 
- Implementation: `src/agents/formation-companion/tokens.ts` (lines 107-176)
- Analysis: `src/agents/voice-coach/analysis.ts`
- Documentation: `_docs/voice/README.md` (SSOT - consolidated December 2025, see `_docs/archive/voice-style/` for historical reference)

**The Five Markers** (each scored 0.0-1.0):

#### 1. Prophetic Intensity (Target: 0.5-0.8)
**What It Means**: Apostolic urgency, transformational language, movement-oriented thinking.

**Keywords Tracked**:
```typescript
['apostolic', 'missional', 'movement', 'multiply', 'decentralize',
 'transform', 'radical', 'prophetic', 'calling', 'sent', 'commission',
 'mandate', 'urgency', 'breakthrough', 'catalyst']
```

**Calculation**: `(matches / (wordCount / 100)) * 1.5` (capped at 1.0)

**Implementation**: `src/agents/voice-coach/analysis.ts` (lines 12-27)

**Example Pattern**: "When we receive the apostolic calling, we are sent to multiply disciples and catalyze movements that transform neighborhoods."

---

#### 2. Pastoral Warmth (Target: ≥ 0.5)
**What It Means**: Relational, communal language that invites rather than commands.

**Keywords Tracked**:
```typescript
['together', 'community', 'formation', 'journey', 'shepherd',
 'care', 'belonging', 'family', 'brothers', 'sisters', 'fellowship',
 'nurture', 'encouragement', 'support', 'compassion']
```

**Calculation**: `(matches / (wordCount / 100)) * 1.5` (capped at 1.0)

**Implementation**: `src/agents/voice-coach/analysis.ts` (lines 33-47)

**Example Pattern**: "Together, we journey toward deeper formation, nurturing one another as we discover what it means to be sent as a community."

---

#### 3. Christocentric Anchoring (Target: ≥ 0.7) — MOST IMPORTANT
**What It Means**: Everything is rooted in Jesus, the gospel, and Scripture. This is the gravitational center.

**Keywords Tracked**:
```typescript
['jesus', 'christ', 'gospel', 'kingdom', 'biblical',
 'scripture', 'god', 'lord', 'savior', 'redeemer', 'cross',
 'resurrection', 'incarnation', 'redemption']
```

**Calculation**: `(matches / (wordCount / 80)) * 1.2` (capped at 1.0)  
**Note**: Higher weight (80 vs 100) means Christocentric terms are more important

**Implementation**: `src/agents/voice-coach/analysis.ts` (lines 53-68)

**Example Pattern**: "Jesus is Lord is not a slogan for the margins; it is the gravitational center that reshapes our people into a movement. When we receive that indicative, we are compelled toward a communal imperative."

---

#### 4. Narrative Imagery (Target: ≥ 0.5)
**What It Means**: Use metaphors, stories, and journey language to make abstract concepts concrete.

**Patterns Tracked**:
```typescript
/imagine|picture|story|narrative|tale/gi
/journey|path|way|road|walk/gi
/like|as if|metaphor|symbol/gi
```

**Calculation**: `(matches / (wordCount / 100)) * 1.3` (capped at 1.0)

**Implementation**: `src/agents/voice-coach/analysis.ts` (lines 74-91)

**Target**: 2-5 metaphors per 100 words

**Example Pattern**: "The missional DNA we steward is fractal: each element repeats at every scale so the whole movement stays alive, like a seed that contains the pattern of the full tree."

---

#### 5. Theological Depth (Target: ≥ 0.4)
**What It Means**: Biblical grounding and scholarly rigor, but accessible to practitioners.

**Keywords Tracked**:
```typescript
['theology', 'doctrine', 'ecclesiology', 'missiology', 'christology',
 'pneumatology', 'soteriology', 'eschatology', 'hermeneutics',
 'exegesis', 'orthodoxy', 'orthopraxy']
```

**Plus**: Biblical reference pattern matching (e.g., "John 3:16", "Matthew 28")

**Calculation**: `((termMatches + biblicalRefCount * 2) / (wordCount / 100)) * 1.2` (capped at 1.0)

**Implementation**: `src/agents/voice-coach/analysis.ts` (lines 97-120)

**Example Pattern**: "The missional-incarnational impulse finds its theological foundation in the incarnation itself—God entering our world, our culture, our neighborhood."

---

### Coherence Score

**Status**: ✅ Fully implemented

**Target**: ≥ 0.75

**Calculation**: Weighted average of all five markers:
```typescript
{
  prophetic_intensity: 0.25,
  pastoral_warmth: 0.2,
  christocentric_anchoring: 0.3,  // Most important
  narrative_imagery: 0.15,
  theological_depth: 0.1,
}
```

**Implementation**: `src/agents/voice-coach/analysis.ts` (lines 256-272)

**Canonical Alignment**:
- **High**: ≥ 0.75 (strive for this)
- **Medium**: 0.5 - 0.74 (acceptable but improve)
- **Low**: < 0.5 (unacceptable—revise)

---

### Hallmark Lexicon

**Status**: ✅ Fully implemented

**Target**: ≥ 90% similarity (9+ terms from lexicon)

**13 Canonical Terms**:
```typescript
['mdna', 'apast', 'apest', 'communion', 'communitas',
 'liminality', 'missional', 'apostolic', 'movement',
 'organic', 'starfish', 'fractal', 'jesus is lord']
```

**Implementation**: 
- Agent instructions: `src/agents/formation-companion/tokens.ts` (lines 191-208)
- Evaluation: `evals/voice-coach/graders/index.ts` (lines 25-39)

**Usage**: Don't force these terms, but they should appear naturally when discussing missional theology, movement dynamics, and apostolic frameworks.

---

### Additional Voice Patterns

**Status**: ✅ Documented and partially implemented

#### Metaphor Density
- **Target**: 2-5 metaphors per 100 words
- **Implementation**: `src/agents/voice-coach/analysis.ts` (lines 327-347)

#### Indicative/Imperative Ratio
- **Target**: 0.6-0.8 (more indicative than imperative)
- **Pattern**: Identity (indicative) → Practice (imperative)
- **Implementation**: `src/agents/voice-coach/analysis.ts` (lines 354-383)

#### Formality Score
- **Target**: 0.4-0.7 (practitioner register)
- **Implementation**: `src/agents/voice-coach/analysis.ts` (lines 290-321)

#### Warmth vs. Irony
- **Target**: Warmth ≥ 4.0, Irony ≤ 2.0 (on 1-5 scale)
- **Note**: This is qualitative, not algorithmic - requires human annotation

---

## Documentation (Not Yet Implemented)

### 1. Vector Store Integration ⚠️ **PLACEHOLDER/MOCKED**

**Location**: `src/agents/shared/tools.ts` (lines 124-172)

**Status**: ⚠️ Configured but not implemented - Returns empty results

**Vector Store ID**: `vs_68f76854627c81919181e3ebd114023` (from environment or hardcoded)

**Current Implementation**:
```typescript
// Note: This is a placeholder for the actual OpenAI Vector Store API
// The actual implementation will depend on OpenAI's API when available
// For now, we'll return a mock structure

// Mock implementation for now
const results: any = {
  data: [],
};
```

**What Should Happen**:
1. Query OpenAI Vector Store with semantic search
2. Return excerpts with source information
3. Provide relevance scores

**What Actually Happens**:
- Returns empty results array
- No actual corpus search occurs

**Documentation**: `_docs/voice/README.md (SSOT - see _docs/archive/voice-style/VOICE_STYLE_SYSTEM_GUIDE.md for historical reference)` (lines 407-486)

---

### 2. Comprehensive Style Guide 📚 **DOCUMENTED**

**Location**: `_docs/voice/01-STYLE_GUIDE.md (SSOT - consolidated December 2025)`

**Status**: 📚 Complete documentation - Analysis of 124 MDX files from 14 books

**Source**: Analysis of 124 MDX files across 14 books

**Contents**:
- Sentence Structure Patterns (Indicative-Imperative Arc, Three-Part Enumeration, Question-Answer Pattern, Metaphorical Definition)
- Paragraph Organization (Opening Hook Pattern, Narrative-Concept Pattern, Framework-Application Pattern)
- Argument Flow (Problem-Solution Pattern, Historical-Contemporary Pattern, Theological-Practical Pattern)
- Transition Techniques ("So" Transitions, "This" Reference Transitions, Question Transitions, Enumeration Transitions)
- Opening Patterns (Quote Opening, Personal Story Opening, Question Opening)
- Closing Patterns (Call to Action Closing, Vision Closing, Recapitulation Closing, Question Closing)
- Rhetorical Devices (Anaphora, Parallel Structure, Alliteration, Metaphor Chains)
- Common Phrases and Patterns
- Style Guardrails (Prohibited Patterns: Antithesis and Contrast Structures)

**Note**: This is comprehensive documentation but not directly integrated into agent prompts (though patterns are referenced).

---

### 3. Voice Metrics Translation Guide 📚 **DOCUMENTED**

**Location**: `_docs/voice/02-METRICS_REFERENCE.md (SSOT - consolidated December 2025)`

**Status**: 📚 Complete documentation - Practical examples of achieving target scores

**Contents**:
- Score ranges for each voice marker (0.0-0.3, 0.4-0.6, 0.7-0.9, 0.9-1.0)
- Example passages for each score range
- Language patterns that increase/decrease scores
- How to adjust writing to achieve targets
- Common patterns ("Perfect Passage", "Academic Drift", "Corporate Drift")

**Note**: This is documentation for understanding metrics, not directly integrated into agent prompts (though referenced in Voice Coach agent).

---

### 4. OpenAI AI Agent System Prompt 📚 **DOCUMENTED**

**Location**: `_docs/voice/README.md (SSOT - see _docs/archive/voice-style/VOICE_STYLE_SYSTEM_GUIDE.md for historical reference)` (lines 787-1096)

**Status**: 📚 Complete system prompt for external AI agents

**Purpose**: Complete system prompt designed for use in the OpenAI Dashboard with an AI Agent that has access to Alan Hirsch's entire corpus in a vector store.

**Contents**:
- Core Identity
- The Five Voice Markers (detailed guidance)
- Coherence Score
- The Hallmark Lexicon
- Additional Voice Patterns
- Using the Vector Store
- Communication Style Guidelines
- What to Avoid (Failure Modes)
- Workflow for Writing
- Example: Canonical Voice Pattern
- Final Reminders

**Note**: This is a complete prompt but not currently used in any implemented agent (it's for external use).

---

### 5. Alan Hirsch Voice & Style Guide 📚 **DOCUMENTED**

**Location**: `_docs/site-agents/design-prompts/voice-and-style/ALAN_HIRSCH_VOICE_AND_STYLE_GUIDE.md`

**Status**: 📚 Complete style guide for AI content generation and human writers

**Contents**:
- Core Voice Characteristics (Revolutionary Prophet, Theological Scholar with Street Cred, Movement Catalyst)
- Structural Patterns (Opening Hooks, Article Architecture, Section Transitions)
- Linguistic Patterns (Vocabulary Preferences, Sentence Structure, Metaphor and Imagery)
- Tone and Emotional Range (Prophetic Urgency 40%, Pastoral Wisdom 30%, Scholarly Authority 20%, Visionary Inspiration 10%)
- Content Themes and Focal Points
- Rhetorical Devices and Techniques
- Citation and Source Integration
- Audience Engagement Strategies
- Technical Writing Elements
- Voice Consistency Guidelines
- Adaptation Guidelines for Different Contexts
- Quality Assurance Checklist

**Note**: This is comprehensive documentation but not directly integrated into agent prompts (though elements are referenced).

---

## Evaluation Systems

### Voice Coach Agent Eval System ✅ **FULLY IMPLEMENTED**

**Location**: `evals/voice-coach/`

**Status**: ✅ Complete - Comprehensive evaluation framework

**Structure**:

#### 1. Types & Interfaces (`evals/voice-coach/types.ts`)
- Defines `VoiceEvalRow`, `VoiceEvalGraderResult`, `VoiceEvalSuiteResult`
- Categories: `canonical`, `transformation`, `failure`
- Supports metrics, annotations, and trace data

#### 2. Graders (`evals/voice-coach/graders/index.ts`)

**Numeric Graders**:
- `coherence_score` (threshold: ≥0.75)
- `canonical_alignment` (must be 'high')
- `christocentric_anchoring` (threshold: ≥0.7)
- `prophetic_intensity` (range: 0.5-0.8)
- `pastoral_warmth` (threshold: ≥0.5)
- `narrative_imagery` (threshold: ≥0.5)
- `hallmark_similarity` (threshold: ≥0.9)
- `drift_indicators` (must be empty)

**Qualitative Graders**:
- `warmth_vs_irony` (warmth ≥4, irony ≤2)
- `persona_rubric` (must contain coach/apostolic/communal/guide)
- `contextualization_depth` (range: 2-6)
- `values_presence` (boolean)

**Workflow Graders**:
- `tool_sequence` (analysis before transformation)
- `instruction_compliance` (voice profile loaded)
- `error_handling` (no unhandled errors)

#### 3. Datasets (`evals/voice-coach/datasets/`)
- **canonical-baseline.json**: 3 positive examples with high voice alignment
- **transformation-suite.json**: 4 examples testing SEO rewrites, translations, summaries
- **failure-modes.json**: 3 negative examples (corporate tone, academic drift, generic devotional)

#### 4. Config (`evals/voice-coach/baseline.config.ts`)
- Three suites:
  - Voice Markers (threshold: 0.9)
  - Transformation Guardrails (threshold: 0.9)
  - Failure Detection (threshold: 0.0 - intentionally fails on drift)

**Current Status**: 70% overall (canonical + transformation at 100%, failure suite intentionally flags drift)

**Documentation**: `_docs/evals/VOICE_STYLE_EVALS_REPORT.md`

---

### Voice Authenticity Scoring System ✅ **FULLY IMPLEMENTED**

**Location**: `src/agents/voice-authenticity/scoring.ts`

**Status**: ✅ Complete - 75-point scoring system

**Scoring Breakdown**:
- **Theological Consistency** (30 points)
- **Voice Authenticity** (28 points)
- **Content Originality** (17 points)

**Implementation**: `src/agents/voice-authenticity/scoring.ts` (lines 8-574)

---

## Code Implementation Details

### Analysis Functions ✅ **FULLY IMPLEMENTED**

**Location**: `src/agents/voice-coach/analysis.ts`

**Functions**:
- `calculatePropheticIntensity()` (lines 12-27)
- `calculatePastoralWarmth()` (lines 33-47)
- `calculateChristocentricAnchoring()` (lines 53-68)
- `calculateNarrativeImagery()` (lines 74-91)
- `calculateTheologicalDepth()` (lines 97-120)
- `calculateCoherenceScore()` (lines 256-272)
- `calculateCanonicalAlignment()` (lines 277-283)
- `calculateFormalityScore()` (lines 290-321)
- `calculateMetaphorDensity()` (lines 327-347)
- `calculateIndicativeImperativeRatio()` (lines 354-383)

**Status**: ✅ All functions implemented and functional

---

### Schema Definitions ✅ **FULLY IMPLEMENTED**

**Location**: `src/lib/schemas/agents/voice-coach.ts`

**Schemas**:
- `VoiceMarkersSchema`: Individual voice marker scores
- `VoiceAnalysisOutputSchema`: Complete analysis output with coherence score

**Status**: ✅ Type-safe schemas for voice analysis

---

## Content Approach Considerations

### 1. Indicative-Imperative Arc

**Status**: ✅ Documented and referenced in agent instructions

**Pattern**: Statement of truth (indicative) → Call to action (imperative)

**Example**:
> "Jesus is Lord is not a slogan for the margins; it is the gravitational center that reshapes our people into a movement. When we receive that indicative, we are compelled toward a communal imperative—practice the way of the Kingdom in every neighborhood."

**Documentation**: 
- `_docs/voice/01-STYLE_GUIDE.md (SSOT - consolidated December 2025)` (lines 25-37)
- `src/agents/formation-companion/tokens.ts` (lines 241-245)

---

### 2. Style Guardrails

**Status**: ✅ Documented - Prohibited Patterns

**Critical Rule**: Write without antithesis or contrast structures. Avoid "not...but..." and similar patterns.

**Prohibited Patterns**:
- ❌ "X is not Y, but Z"
- ❌ "Not A, but B"
- ❌ "This is not about X, but about Y"

**Required Approach**:
- ✅ Use direct, affirmative statements
- ✅ Present ideas constructively and integratively
- ✅ Build forward-moving arguments

**Documentation**: `_docs/voice/01-STYLE_GUIDE.md (SSOT - consolidated December 2025)` (lines 378-406)

**Note**: This guardrail is documented but not automatically enforced in agents (requires manual checking).

---

### 3. Tone Distribution

**Status**: ✅ Documented and partially implemented

**Target Distribution**:
- Prophetic Urgency: 40%
- Pastoral Wisdom: 30%
- Scholarly Authority: 20%
- Visionary Inspiration: 10%

**Documentation**: 
- `_docs/site-agents/design-prompts/voice-and-style/ALAN_HIRSCH_VOICE_AND_STYLE_GUIDE.md` (lines 110-135)
- `_docs/agents/FORMATION_COMPANION_VOICE_INTEGRATION.md` (line 56)

**Implementation**: Referenced in Book Reading Agent and Formation Companion charter

---

### 4. Content Themes

**Status**: ✅ Documented

**Core Theological Themes**:
1. Christocentric Everything: Jesus as the center of all theology, mission, and life
2. Incarnational Mission: God's pattern of entering the world as our model
3. APEST Framework: The fivefold ministry as God's design for church health
4. Kingdom Consciousness: Living from the reality of God's reign
5. Authentic Discipleship: Following Jesus as total life transformation
6. Post-Christendom Reality: Navigating Christianity in secular culture

**Documentation**: `_docs/site-agents/design-prompts/voice-and-style/ALAN_HIRSCH_VOICE_AND_STYLE_GUIDE.md` (lines 145-171)

---

## Source Material & Corpus

### 1. MDX Book Library ✅ **AVAILABLE**

**Location**: `_docs/books/`

**Status**: ✅ 124 MDX files from 14 complete books

**Books**:
- The Forgotten Ways (17 chapters)
- The Forgotten Ways Handbook (6 chapters)
- The Permanent Revolution (14 chapters)
- On the Verge (12 chapters)
- 5Q (9 chapters)
- Metanoia (9 chapters)
- Reframation (9 chapters)
- ReJesus (7 chapters)
- The Faith of Leap (9 chapters)
- The Shaping of Things to Come (12 chapters)
- The Starfish and the Spider (8 chapters)
- Untamed (11 chapters)
- Disciplism (1 chapter)
- 5Q Spanish (9 chapters)

**Content**: Each MDX file contains complete chapter text with frontmatter metadata, full chapter content, structured markdown, reading time, and word count information.

**Usage**: Available via codebase search, but not systematically indexed for semantic search (vector store is placeholder).

---

### 2. Evaluation Datasets ✅ **AVAILABLE**

**Location**: `evals/voice-coach/datasets/`

**Status**: ✅ Three datasets with canonical examples

**Datasets**:
- **canonical-baseline.json**: 3 canonical examples with high voice alignment
- **transformation-suite.json**: 4 examples of successful voice-preserving transformations
- **failure-modes.json**: 3 negative examples showing what NOT to do

**Usage**: Used in evaluation system and as reference examples for voice emulation.

---

### 3. Vector Store ⚠️ **PLACEHOLDER**

**Location**: `src/agents/shared/tools.ts`

**Status**: ⚠️ Configured but not implemented - Returns empty results

**Vector Store ID**: `vs_68f76854627c81919181e3ebd114023`

**Current State**: Mock implementation returns empty results array

**Documentation**: `_docs/voice/README.md (SSOT - see _docs/archive/voice-style/VOICE_STYLE_SYSTEM_GUIDE.md for historical reference)` (lines 407-486)

---

## Implementation Status Summary

### ✅ Fully Implemented

1. **Formation Companion Agent**: Complete voice integration with all five markers, hallmark lexicon, and patterns
2. **Voice Coach Agent**: Complete voice analysis and coaching system
3. **Voice Authenticity Agent**: 75-point scoring system
4. **Analysis Functions**: All TypeScript functions for calculating voice metrics
5. **Evaluation System**: Comprehensive evaluation framework with graders and datasets
6. **Schema Definitions**: Type-safe schemas for voice analysis

### ⚠️ Partially Implemented

1. **Writing Coach Agent**: Basic voice awareness, not comprehensive
2. **Vocational Coach Agent**: Basic voice awareness, not comprehensive
3. **Voice Coach (API Route)**: Basic voice coaching, not comprehensive
4. **Vector Store**: Configured but placeholder/mocked
5. **SEO Expert Agent**: Voice-aware but not comprehensive
6. **Related Content Agent**: Voice-aware but not comprehensive
7. **Sermon Shaper Agents**: Voice-aware but not comprehensive

### 📚 Documented (Not Yet Implemented)

1. **Comprehensive Style Guide**: Complete analysis of 124 MDX files
2. **Voice Metrics Translation Guide**: Practical examples of achieving targets
3. **OpenAI Agent System Prompt**: Complete prompt for external agents
4. **Alan Hirsch Voice & Style Guide**: Comprehensive style guide for content generation
5. **Vector Store Integration**: Documented but not working
6. **Style Guardrails**: Documented but not automatically enforced

---

## Key Files Reference

### Agent Implementations
- `src/agents/formation-companion/tokens.ts` - Complete `alanHirschVoice()` function
- `src/agents/formation-companion/index.ts` - Formation Companion agent with voice integration
- `src/agents/voice-coach/index.ts` - Voice Coach agent
- `src/agents/voice-coach/analysis.ts` - Voice analysis functions
- `src/agents/voice-authenticity/index.ts` - Voice Authenticity agent
- `src/agents/voice-authenticity/scoring.ts` - 75-point scoring system
- `src/app/api/agents/chat/route.ts` - API-based agents (Writing, Vocational, Voice)

### Documentation
- `_docs/voice/README.md (SSOT - see _docs/archive/voice-style/VOICE_STYLE_SYSTEM_GUIDE.md for historical reference)` - Complete voice system guide
- `_docs/voice/01-STYLE_GUIDE.md (SSOT - consolidated December 2025)` - Style patterns from 124 MDX files
- `_docs/voice/02-METRICS_REFERENCE.md (SSOT - consolidated December 2025)` - Practical examples
- `_docs/site-agents/design-prompts/voice-and-style/ALAN_HIRSCH_VOICE_AND_STYLE_GUIDE.md` - Style guide
- `_docs/agents/FORMATION_COMPANION_VOICE_INTEGRATION.md` - Integration documentation

### Evaluation
- `evals/voice-coach/types.ts` - Evaluation types
- `evals/voice-coach/graders/index.ts` - Graders
- `evals/voice-coach/datasets/` - Evaluation datasets
- `evals/voice-coach/baseline.config.ts` - Evaluation configuration
- `_docs/evals/VOICE_STYLE_EVALS_REPORT.md` - Evaluation report

### Schemas
- `src/lib/schemas/agents/voice-coach.ts` - Voice analysis schemas

---

## Notes on Implementation vs. Documentation

### What's Actually Running in Agents

**Formation Companion Agent** uses:
- ✅ All five voice markers with target ranges
- ✅ Hallmark lexicon (13 terms, 9+ per response)
- ✅ Voice patterns (metaphor density, indicative/imperative ratio, formality, warmth/irony)
- ✅ Coherence score target (≥0.75)
- ✅ Communication style guidelines
- ✅ Failure modes to avoid

**Voice Coach Agent** uses:
- ✅ Five voice markers for analysis
- ✅ Hallmark lexicon for evaluation
- ✅ Coherence score calculation
- ✅ Voice pattern analysis

**Other Agents** use:
- ⚠️ Basic voice awareness (references to Alan's voice)
- ⚠️ Not comprehensive voice emulation

### What's Documented But Not Integrated

- 📚 Comprehensive style patterns from 124 MDX files (referenced but not directly in prompts)
- 📚 Voice metrics translation guide (documentation for understanding, not in prompts)
- 📚 Complete OpenAI agent system prompt (for external use, not current agents)
- 📚 Style guardrails (documented but not automatically enforced)
- 📚 Vector store integration (documented but not working)

---

**Document Version**: 1.0  
**Last Updated**: December 2025  
**Maintained By**: AI Assistant (based on comprehensive codebase analysis)

