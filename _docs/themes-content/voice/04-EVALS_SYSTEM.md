# Voice & Style Evaluation System

**Purpose**: Comprehensive guide to evaluating voice alignment for AI agents and written content.

**Last Updated**: November 2025

---

## Overview

The evaluation system provides systematic processes for measuring whether AI-generated content (or any content) meets quality standards for Alan Hirsch's voice and style. Unlike traditional tests that check for bugs, evals assess both **correctness** and **quality**—including subjective elements like voice, tone, and alignment with canonical style.

---

## Table of Contents

1. [What Are Evals?](#what-are-evals)
2. [Why Evals Matter](#why-evals-matter)
3. [Current Implementation](#current-implementation)
4. [Evaluation Dimensions](#evaluation-dimensions)
5. [Graders & Scoring](#graders--scoring)
6. [Datasets](#datasets)
7. [Running Evals](#running-evals)
8. [CI/CD Integration](#cicd-integration)
9. [Future Enhancements](#future-enhancements)

---

## What Are Evals?

### Simple Definition

**Evaluations (evals)** are systematic processes for measuring whether content meets specific quality standards. They assess both objective correctness and subjective quality elements like voice, tone, and style alignment.

### Key Concepts

1. **Standards**: What constitutes "good" content
2. **Metrics**: Measurable dimensions (voice markers, tone scores, etc.)
3. **Rubrics**: Clear criteria for scoring each dimension
4. **Datasets**: Collections of examples to test against
5. **Graders**: Automated or human evaluators that apply rubrics
6. **Results**: Scores, feedback, and action recommendations

---

## Why Evals Matter

### Goals

1. **Preserve Alan Hirsch's Voice**: Ensure all AI-generated content maintains distinctive pastoral-prophetic tone
2. **Maintain Theological Accuracy**: Catch doctrinal drift or inaccuracies
3. **Ensure Consistency**: Keep content aligned across agents
4. **Detect Regressions**: Know when changes break existing functionality
5. **Improve Agents**: Use eval feedback to refine agent prompts

### The Problem Evals Solve

**Without evals**:
- ❌ Voice drift goes unnoticed until someone reads it
- ❌ Agent improvements can't be measured objectively
- ❌ Changes might break voice alignment silently
- ❌ No way to compare agent versions

**With evals**:
- ✅ Voice alignment is measured and tracked
- ✅ Agent improvements have quantifiable metrics
- ✅ Regressions are caught automatically
- ✅ Version comparisons show clear improvements

---

## Current Implementation

### Voice Coach Agent Eval System

**Location**: `evals/voice-coach/`

**Status**: ✅ Fully Implemented

#### Structure

1. **Types & Interfaces** (`evals/voice-coach/types.ts`)
   - `VoiceEvalRow` - Single evaluation test case
   - `VoiceEvalGraderResult` - Result from a single grader
   - `VoiceEvalSuiteResult` - Results from an entire suite
   - Categories: `canonical`, `transformation`, `failure`

2. **Graders** (`evals/voice-coach/graders/index.ts`)
   - Numeric graders (automated scoring)
   - Qualitative graders (human-annotated)
   - Workflow graders (tool sequence validation)

3. **Datasets** (`evals/voice-coach/datasets/`)
   - `canonical-baseline.json` - Positive examples
   - `transformation-suite.json` - SEO rewrites, translations
   - `failure-modes.json` - Negative examples (drift detection)

4. **Config** (`evals/voice-coach/baseline.config.ts`)
   - Three eval suites with thresholds
   - Voice Markers (threshold: 0.9)
   - Transformation Guardrails (threshold: 0.9)
   - Failure Detection (threshold: 0.0 - intentionally flags drift)

#### Current Status

- **Overall Pass Rate**: 70% (canonical + transformation at 100%, failure suite intentionally flags drift)
- **Implementation**: Complete and working
- **CI Integration**: ✅ Integrated into GitHub Actions

---

## Evaluation Dimensions

### Five Voice Markers (Quantitative)

1. **Prophetic Intensity** (Target: 0.5-0.8)
   - Apostolic urgency, transformational language
   - Algorithmic scoring based on keyword frequency

2. **Pastoral Warmth** (Target: ≥0.5)
   - Relational, communal language
   - Care-oriented vocabulary

3. **Christocentric Anchoring** (Target: ≥0.7)
   - Gospel-centeredness (MOST IMPORTANT)
   - Christ-focused language

4. **Narrative Imagery** (Target: ≥0.5)
   - Metaphors, stories, journey language
   - Concrete imagery

5. **Theological Depth** (Target: ≥0.4)
   - Biblical grounding, scholarly rigor
   - Theological terminology

### Coherence Score

Weighted average of all five markers:
- Christocentric anchoring: 30%
- Prophetic intensity: 25%
- Pastoral warmth: 20%
- Narrative imagery: 15%
- Theological depth: 10%

**Target**: ≥0.75 for high alignment

**Reference**: See [Metrics Reference](./02-METRICS_REFERENCE.md) for detailed scoring criteria.

---

## Graders & Scoring

### Numeric Graders (Automated)

Each grader returns `{ pass: boolean, score?: number, message?: string }`

**Voice Coach Graders**:
- `coherence_score` - Threshold: ≥0.75
- `canonical_alignment` - Must be 'high'
- `christocentric_anchoring` - Threshold: ≥0.7
- `prophetic_intensity` - Range: 0.5-0.8
- `pastoral_warmth` - Threshold: ≥0.5
- `narrative_imagery` - Threshold: ≥0.5
- `hallmark_similarity` - Threshold: ≥0.9
- `drift_indicators` - Must be empty

### Qualitative Graders (Human-Annotated)

- `warmth_vs_irony` - Warmth ≥4, irony ≤2 (1-5 scale)
- `persona_rubric` - Must contain coach/apostolic/communal/guide
- `contextualization_depth` - Range: 2-6 (1-10 scale)
- `values_presence` - Boolean

### Workflow Graders

- `tool_sequence` - Analysis before transformation
- `instruction_compliance` - Voice profile loaded
- `error_handling` - No unhandled errors

### Scoring Implementation

- **Pass/Fail**: Each grader returns pass/fail result
- **Suite Pass Rate**: Percentage of rows passing all graders in suite
- **Overall Pass Rate**: Weighted average across suites
- **Thresholds**: Each suite has a minimum pass rate threshold

---

## Datasets

### Voice Coach Datasets

**Location**: `evals/voice-coach/datasets/`

1. **canonical-baseline.json**
   - 3 positive examples with high voice alignment
   - Shows what "good" looks like
   - Used to validate voice marker scoring

2. **transformation-suite.json**
   - 4 examples testing:
     - SEO rewrites
     - Translations
     - Summaries
   - Ensures voice preservation during optimization

3. **failure-modes.json**
   - 3 negative examples:
     - Corporate tone
     - Academic drift
     - Generic devotional
   - Used for drift detection

### Dataset Structure

```json
{
  "id": "unique-id",
  "category": "canonical|transformation|failure",
  "input": {
    "task": "Description of task",
    "candidate": "Text to evaluate",
    "context": "Additional context"
  },
  "metrics": {
    "coherence_score": 0.85,
    "voice_markers": { ... }
  },
  "annotations": {
    "expected_register": "practitioner",
    "good_bad": "good"
  }
}
```

---

## Running Evals

### Command-Line

```bash
# Validate datasets
pnpm evals:voice:validate

# Run voice coach evals
pnpm evals:voice:run

# Run all evals
pnpm evals:all
```

### Programmatic Usage

```typescript
import { runVoiceEvalSuite } from '@/evals/voice-coach';

const results = await runVoiceEvalSuite('baseline');
console.log(`Pass rate: ${results.overallPassRate}%`);
```

### Eval Lifecycle

1. **Load Dataset**: Read test cases from JSON files
2. **Run Graders**: Apply each grader to each test case
3. **Calculate Scores**: Aggregate pass/fail results
4. **Generate Report**: Create summary with recommendations
5. **Store Results**: Save to database or file system

---

## CI/CD Integration

### GitHub Actions

**Workflow**: `.github/workflows/voice-evals.yml`

**Triggers**:
- Pull requests (when evals code changes)
- Daily schedule (7 AM UTC)

**Actions**:
1. Checkout code
2. Install dependencies
3. Run all eval suites
4. Upload results as artifacts
5. Fail build if thresholds not met

### Dashboard Integration

Eval results can be displayed in dashboard:
- Current pass rates
- Trend charts
- Dimension breakdowns
- Drift alerts

---

## Future Enhancements

### Identified Gaps

1. **No evals for other agents**:
   - Writing Coach
   - Vocational Coach
   - Sage (mDNA assessment)
   - SEO Expert
   - Related Content Agent

2. **No evals for written compositions**:
   - Essays, emails, reflections, sermons, articles
   - Standalone composition evaluation framework needed

3. **Limited linguistic dimensions**:
   - Missing: verbosity/density metrics
   - Missing: metaphor density (beyond narrative imagery)
   - Missing: rhetorical question frequency
   - Missing: indicative/imperative ratio
   - Missing: register formality gradient
   - Missing: theological accuracy validation

4. **No cross-agent consistency evals**:
   - No tests ensuring all agents maintain consistent voice
   - No tests for voice preservation across agent handoffs

5. **Limited genre-specific evals**:
   - No genre-specific rubrics (sermon vs. academic paper vs. email)
   - No audience-appropriate register checks

### Recommended Enhancements

**High Priority**:
1. Extend evals to Writing Coach agent
2. Add composition eval framework
3. Add new linguistic dimensions (formality, metaphor density)

**Medium Priority**:
4. Cross-agent consistency tests
5. Genre-specific rubrics
6. Async theological accuracy validation

**Low Priority**:
7. Automated drift detection alerts
8. Dashboard visualization improvements
9. Historical trend analysis

---

## Related Documentation

- **[Metrics Reference](./02-METRICS_REFERENCE.md)** - Detailed scoring criteria
- **[Agent Prompting](./03-AGENT_PROMPTING.md)** - How agents maintain voice
- **[Implementation Status](./05-IMPLEMENTATION_STATUS.md)** - Current system state
- **[OpenAI Evals Reference](../../agents/EVALS_COMPREHENSIVE.md)** - Technical reference

**Code References**:
- Eval implementation: `evals/voice-coach/`
- Analysis functions: `src/agents/voice-coach/analysis.ts`
- Graders: `evals/voice-coach/graders/index.ts`

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Status**: Active - Documents current eval implementation and future plans





