# Alan Hirsch Agent Evaluations (Evals)

**Purpose:** Comprehensive evaluation materials for assessing AI agents' ability to emulate Alan Hirsch's voice, style, and theological/missiological thought.

**Status:** Active Development  
**Last Updated:** 2025-01-05

---

## Overview

This directory contains comprehensive evaluation materials created following best practices for AI agent evaluation. The materials are designed to systematically assess agents across multiple dimensions: content accuracy, voice authenticity, completeness, depth, coherence, and source integration.

All materials employ Alan Hirsch's authentic voice and style, following the authoritative voice guidelines documented in `content-research/voice & style/ALAN_HIRSCH_TIMELINE.md` and `content-research/ALAN_HIRSCH_AGENT_PERSONA.md`.

---

## Directory Structure

```
evals/
├── qa-sets/
│   ├── foundational/          # Core concept evaluations
│   ├── frameworks/            # Framework application evaluations
│   ├── integration/           # Synthesis and integration evaluations
│   └── voice-style/           # Voice and style specific evaluations
├── rubrics/
│   └── eval-rubric-master.md  # Master evaluation rubric
└── README.md                  # This file
```

---

## Current Contents

### Q&A Sets

#### Foundational Q&A Sets

**✅ Created:**
- `qa-sets/foundational/apostolic-genius-eval-qa.md` - Comprehensive evaluation Q&A for Apostolic Genius (Level 1-5 questions)

**📋 To Create (Following Same Methodology):**
- `qa-sets/foundational/mdna-eval-qa.md` - Movement DNA evaluation Q&A
- `qa-sets/foundational/apest-5q-eval-qa.md` - APEST/5Q evaluation Q&A
- `qa-sets/foundational/metanoia-eval-qa.md` - Metanoia Journey evaluation Q&A
- `qa-sets/foundational/missional-church-eval-qa.md` - Missional church evaluation Q&A

### Rubrics

**✅ Created:**
- `rubrics/eval-rubric-master.md` - Master evaluation rubric with six dimensions and detailed scoring criteria

---

## Evaluation Framework

### Six Evaluation Dimensions

1. **Content Accuracy (30% weight)** - Theological and missiological correctness
2. **Voice Authenticity (25% weight)** - Match to Alan Hirsch's distinctive voice and style
3. **Completeness (15% weight)** - Comprehensive coverage of question
4. **Depth and Insight (15% weight)** - Quality of understanding and insights
5. **Coherence and Flow (10% weight)** - Logical organization and readability
6. **Source Integration (5% weight)** - Appropriate use of frameworks and concepts

### Scoring

- **Total Score:** Weighted average across all six dimensions (0-100 scale)
- **Grade Bands:** A (90-100), B (80-89), C (70-79), D (60-69), F (<60)
- **Passing Threshold:** 80/100 (B grade) for deployment readiness

### Critical Failure Condition

**Antithesis Prohibition:** Any response containing antithesis/contrast structures automatically fails, regardless of other scores. Alan Hirsch explicitly rejects antithetical phrasing ("not X, but Y") in favor of direct, affirmative language.

---

## Question Complexity Levels

Each Q&A set includes questions across five complexity levels:

1. **Level 1: Foundational Understanding** - Basic definitions, recognition (300-800 words)
2. **Level 2: Relationship Understanding** - Concept relationships, comparisons (500-1200 words)
3. **Level 3: Application** - Practical implementation, specific scenarios (800-1500 words)
4. **Level 4: Synthesis** - Integration of multiple frameworks (1000-2000 words)
5. **Level 5: Critical Analysis** - Nuanced evaluation, limitations, advanced reasoning (1200-2500 words)

---

## Voice and Style Requirements

All ideal answers in Q&A sets demonstrate Alan Hirsch's authentic voice:

### Required Voice Markers:
- ✅ First-person narrative integration ("If you've been...", "Let me...", "I've seen...")
- ✅ Rhetorical questions that engage the reader
- ✅ Extended metaphors and analogies woven throughout
- ✅ Direct address to reader ("you", "we")
- ✅ Conversational, engaging tone
- ✅ Narrative flow (ideas that "breathe" and develop)
- ✅ Paragraphs that build on each other (not bullet points)
- ✅ Interdisciplinary synthesis (theology + other disciplines)

### Critical Requirements:
- ❌ **NO antithesis/contrast structures** ("not X, but Y")
- ❌ **NO bullet points or lists** (narrative development only)
- ✅ Direct, affirmative, constructive language only

### Voice Sources:
- Primary: `content-research/voice & style/ALAN_HIRSCH_TIMELINE.md`
- Supporting: `content-research/ALAN_HIRSCH_AGENT_PERSONA.md`
- Reference: Existing Q&A sets in `content-research/core-content/comprehensive-qa/`

---

## Usage Instructions

### For Evaluators

1. **Select Appropriate Q&A Set:**
   - Choose Q&A set matching domain to evaluate
   - Select questions at appropriate complexity level
   - Review ideal answers for reference

2. **Evaluate Using Master Rubric:**
   - Read response completely
   - Evaluate each dimension independently
   - Check for antithesis patterns first (critical failure)
   - Assign scores (1-5) for each dimension
   - Calculate weighted total score

3. **Document Evaluation:**
   - Record dimension scores and rationale
   - Note specific strengths and weaknesses
   - Provide actionable feedback
   - Reference rubric criteria

### For Developers

1. **Review Q&A Sets:**
   - Study ideal answers for voice and style
   - Understand expected content depth
   - Note complexity level expectations

2. **Use Rubric for Self-Assessment:**
   - Evaluate your responses before submission
   - Check all six dimensions
   - Ensure no antithesis patterns
   - Verify voice markers present

3. **Iterate Based on Feedback:**
   - Address specific weaknesses identified
   - Refine voice authenticity
   - Improve content accuracy
   - Enhance completeness and depth

### For Training

1. **Use Q&A Sets for Practice:**
   - Work through questions at each complexity level
   - Compare responses to ideal answers
   - Identify areas for improvement

2. **Calibration Exercises:**
   - Multiple evaluators grade same responses
   - Compare scores and align criteria
   - Build example response library

3. **Track Performance:**
   - Monitor scores over time
   - Identify improvement trends
   - Adjust approach based on results

---

## Expansion Plan

### Next Steps

**Phase 1: Complete Foundational Q&A Sets**
1. Create mDNA evaluation Q&A set
2. Create APEST/5Q evaluation Q&A set
3. Create Metanoia evaluation Q&A set
4. Create Missional Church evaluation Q&A set

**Phase 2: Framework Q&A Sets**
1. Framework Implementation evaluation Q&A
2. Movement Dynamics evaluation Q&A
3. Organic Systems evaluation Q&A

**Phase 3: Integration Q&A Sets**
1. Integration evaluation Q&A
2. Theological Foundations evaluation Q&A
3. Advanced Concepts evaluation Q&A

**Phase 4: Voice and Style Q&A Sets**
1. Voice Authenticity evaluation Q&A
2. Style Consistency evaluation Q&A

### Methodology for Expansion

When creating new Q&A sets, follow this methodology:

1. **Review Source Materials:**
   - Existing comprehensive Q&A in `content-research/core-content/comprehensive-qa/`
   - MDX source files in `mdx/` directory
   - Framework explanations and concept definitions
   - Voice and style documentation

2. **Structure Q&A Set:**
   - Organize by complexity levels (1-5)
   - Include 15-25 questions per set
   - Ensure variety in question types
   - Progress from foundational to advanced

3. **Create Ideal Answers:**
   - Use Alan Hirsch's authentic voice throughout
   - Demonstrate mastery-level understanding
   - Include all required voice markers
   - Ensure no antithesis patterns
   - Provide source attribution

4. **Include Evaluation Instructions:**
   - Reference master rubric
   - Note key evaluation criteria for each question
   - Specify expected answer length and depth
   - Provide guidance for evaluators

---

## Quality Assurance

### Validation Checklist

Before finalizing any Q&A set:

- [ ] All questions have ideal answers
- [ ] Answers demonstrate mastery level for complexity
- [ ] Voice authenticity verified (all markers present, no antithesis)
- [ ] Source attributions accurate and complete
- [ ] Questions cover domain comprehensively
- [ ] Questions vary appropriately in complexity
- [ ] Questions are clear and unambiguous
- [ ] Evaluation instructions included

### Content Validation

- [ ] Cross-reference all answers with MDX source files
- [ ] Verify theological and missiological accuracy
- [ ] Confirm framework explanations correct
- [ ] Check concept relationships accurate
- [ ] Validate voice against authoritative docs

---

## Best Practices

### For Q&A Set Creation

1. **Start with Existing Comprehensive Q&A:**
   - Adapt questions from `content-research/core-content/comprehensive-qa/`
   - Enhance ideal answers for eval purposes
   - Add complexity levels and evaluation criteria

2. **Maintain Voice Consistency:**
   - Review voice documentation before writing
   - Use existing Q&A sets as voice examples
   - Check every answer for voice markers
   - Scan for antithesis patterns

3. **Ensure Comprehensive Coverage:**
   - Cover all aspects of the domain
   - Include questions at all complexity levels
   - Vary question types (definitional, analytical, application, synthesis, critical)
   - Address edge cases and nuances

### For Evaluation

1. **Use Rubric Consistently:**
   - Evaluate each dimension independently
   - Apply weights correctly
   - Document rationale for scores
   - Reference rubric criteria in feedback

2. **Check Critical Conditions First:**
   - Scan for antithesis patterns immediately
   - Verify theological accuracy baseline
   - Confirm voice markers present
   - Then proceed with detailed evaluation

3. **Provide Actionable Feedback:**
   - Identify specific strengths and weaknesses
   - Reference rubric criteria
   - Suggest concrete improvements
   - Point to examples in ideal answers

---

## Resources

### Source Materials

- **Published Works:** `mdx/` directory (13 books, 185+ MDX files)
- **Comprehensive Q&A:** `content-research/core-content/comprehensive-qa/` (13 files)
- **Concept Definitions:** `content-research/core-content/concept-definitions/` (16 files)
- **Framework Explanations:** `content-research/core-content/framework-explanations/` (13 files)
- **Voice Documentation:** `content-research/voice & style/ALAN_HIRSCH_TIMELINE.md`
- **Agent Persona:** `content-research/ALAN_HIRSCH_AGENT_PERSONA.md`
- **Core Themes:** `content-research/CORE_THEMES_INDEX.md`

### Guides and Documentation

- **Eval Guide:** `GUIDE_TO_WRITING_EVALS_FOR_ALAN_HIRSCH.md` (root directory)
- **Implementation Plan:** `PLAN_FOR_USING_ALAN_HIRSCH_CONTENT_FOR_EVALS.md` (root directory)
- **Master Rubric:** `evals/rubrics/eval-rubric-master.md`

---

## Contact and Support

For questions, issues, or contributions to the eval materials:

1. Review this README and master rubric
2. Consult the eval guide in root directory
3. Reference existing Q&A sets as examples
4. Follow the expansion methodology outlined above

---

## Version History

**Version 1.0 (2025-01-05):**
- Created directory structure
- Created master evaluation rubric
- Created foundational Apostolic Genius evaluation Q&A set (Level 1-5)
- Established methodology and best practices
- Documented voice and style requirements

---

*This evaluation system ensures comprehensive, objective assessment while maintaining the highest standards for Alan Hirsch agent performance.*
