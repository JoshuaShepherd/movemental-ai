# Voice Fidelity Rubric Development Plan
## Comprehensive Plan for AI-Agent Voice Fidelity Evaluation Tool

**Purpose:** This document provides a comprehensive plan for creating a rubric that enables an AI agent to evaluate the voice fidelity of new articles against Alan Hirsch's established voice and style as documented in `voice-style/`. The rubric will return a simple score on a scale of 0-100, measuring alignment between new content and the writer's pre-existing voice and style.

**Version:** 1.0  
**Last Updated:** 2025-01-31  
**Status:** Development Plan

---

## Executive Summary

This plan outlines the development of a voice fidelity rubric that leverages the comprehensive voice and style documentation in `voice-style/`, the extracted voice chapters in `extracted-books-voice-chapters/`, and the content research in `content-research/`. The rubric will enable AI agents to systematically evaluate new articles and provide objective, quantifiable voice fidelity scores on a 0-100 scale.

**Key Objectives:**
- Create a multi-dimensional evaluation framework based on documented voice characteristics
- Develop a weighted scoring system that accurately reflects voice fidelity
- Design the rubric for use as an AI agent tool with clear, measurable criteria
- Ensure consistency and objectivity in voice evaluation
- Provide actionable feedback for voice improvement

---

## 1. Foundation: Source Documentation

### 1.1 Primary Sources

The rubric will be built upon the following comprehensive documentation:

**Voice & Style Documentation (`voice-style/`):**
- `00-EXECUTIVE-SUMMARY.md` - Overview and key findings
- `01-20-PARAMETER-ANALYSIS.md` - Quantified voice metrics (20 parameters)
- `05-VOICE-SIGNATURE.md` - Definitive voice profile
- `06-STYLE-GUIDE.md` - Practical guidelines for voice replication
- `07-TEXTUAL-PATTERNS.md` - Sentence structure and paragraph patterns
- `09-ANTITHESIS-PROHIBITION.md` - Critical constraints

**Extracted Voice Chapters (`extracted-books-voice-chapters/`):**
- 88 chapters across 9 books representing authentic voice
- Real examples for comparison and validation
- Cross-book consistency patterns

**Content Research (`content-research/`):**
- Thematic analysis and framework documentation
- Content patterns and terminology usage
- Cross-reference validation

### 1.2 Key Voice Characteristics (From Documentation)

**Signature Characteristics (Very High):**
1. **Epigraph Usage**: 2-4 quotes per chapter opening
2. **Historical Example Integration**: 4.8 per 1000 words
3. **Metaphorical Density**: 8.5 per 1000 words (movement/DNA system)
4. **Direct Address**: 18.7 per 1000 words (inclusive "we"/"you")
5. **Framework Development**: 1.2 frameworks per chapter average
6. **Citation Density**: 15.4 per 1000 words

**High Characteristics:**
- Rhetorical Devices: 12.3 per 1000 words
- Question Usage: 3.2 per 1000 words
- Practical Application: 40% of content
- Theological Depth: 78/100
- Emotional Resonance: 72/100

**Balanced Characteristics:**
- Sentence Complexity: 65/100 (moderate)
- Vocabulary Sophistication: 58/100 (moderate-high)
- Tone Formality: 42/100 (accessible academic)

**Critical Constraint:**
- **Antithesis Prohibition**: No use of antithesis (not X but Y, either/or)
- **Required**: Positive framing, additive language (both/and), inclusive formulations

---

## 2. Rubric Architecture

### 2.1 Evaluation Dimensions

The rubric will evaluate articles across **eight primary dimensions**, each weighted according to importance for voice fidelity:

1. **Signature Elements** (25% weight)
2. **Tone & Register** (20% weight)
3. **Structural Patterns** (15% weight)
4. **Language Patterns** (15% weight)
5. **Rhetorical Devices** (10% weight)
6. **Thematic Alignment** (8% weight)
7. **Textual Patterns** (5% weight)
8. **Critical Constraints** (2% weight - penalty-based)

### 2.2 Scoring System

**Overall Score Calculation:**
```
Total Score = (Signature Elements × 0.25) + (Tone & Register × 0.20) +
              (Structural Patterns × 0.15) + (Language Patterns × 0.15) +
              (Rhetorical Devices × 0.10) + (Thematic Alignment × 0.08) +
              (Textual Patterns × 0.05) - (Critical Violations × Penalty)
```

Each dimension is scored on a 0-100 scale, then weighted and combined. Critical violations (antithesis usage) result in point deductions.

**Score Interpretation:**
- **90-100**: Excellent voice fidelity - authentically matches established voice
- **80-89**: Good voice fidelity - minor deviations from established voice
- **70-79**: Adequate voice fidelity - noticeable deviations but generally aligned
- **60-69**: Poor voice fidelity - significant deviations from established voice
- **0-59**: Unacceptable voice fidelity - fails to capture established voice

---

## 3. Dimension 1: Signature Elements (25% weight)

### 3.1 Evaluation Criteria

This dimension evaluates the presence and quality of the six signature characteristics:

**1. Epigraph Usage (15 points)**
- **Score 15**: 2-4 epigraphs at article opening, diverse sources (biblical, historical, contemporary), thematic connection
- **Score 12**: 2-4 epigraphs present, good source diversity, clear thematic connection
- **Score 9**: 1-2 epigraphs present, limited source diversity, some thematic connection
- **Score 6**: 1 epigraph present, minimal source diversity, weak thematic connection
- **Score 3**: Epigraphs present but poorly integrated or missing
- **Score 0**: No epigraphs

**2. Historical Example Integration (20 points)**
- Target: 4.8 per 1000 words
- **Score 20**: 4.5-5.2 per 1000 words, well-developed examples, clear principles extracted, contemporary application
- **Score 16**: 4.0-5.5 per 1000 words, good examples, principles extracted, application present
- **Score 12**: 3.0-6.0 per 1000 words, examples present but less developed, basic application
- **Score 8**: 2.0-7.0 per 1000 words, minimal examples, weak application
- **Score 4**: 1.0-8.0 per 1000 words, examples poorly integrated
- **Score 0**: No historical examples

**3. Metaphorical Density (20 points)**
- Target: 8.5 per 1000 words (especially movement/DNA metaphors)
- **Score 20**: 8.0-9.0 per 1000 words, movement/DNA metaphors prominent, extended metaphors, coherent systems
- **Score 16**: 7.0-10.0 per 1000 words, good metaphor usage, some movement/DNA metaphors, coherent
- **Score 12**: 6.0-11.0 per 1000 words, moderate metaphor usage, limited movement/DNA metaphors
- **Score 8**: 4.0-12.0 per 1000 words, minimal metaphors, weak coherence
- **Score 4**: 2.0-14.0 per 1000 words, sparse metaphors, no clear system
- **Score 0**: Few or no metaphors

**4. Direct Address Frequency (15 points)**
- Target: 18.7 per 1000 words (inclusive "we"/"you")
- **Score 15**: 17-20 per 1000 words, balanced "we"/"you"/"I" usage (45%/35%/20%), inclusive tone
- **Score 12**: 15-22 per 1000 words, good direct address, mostly inclusive
- **Score 9**: 12-25 per 1000 words, moderate direct address, some inclusivity
- **Score 6**: 8-28 per 1000 words, minimal direct address, formal tone
- **Score 3**: 4-30 per 1000 words, very limited direct address
- **Score 0**: No direct address, third-person only

**5. Framework Development (15 points)**
- Target: 1.2 frameworks per article (average)
- **Score 15**: Clear framework/model developed, biblical foundation, practical application, visual structure
- **Score 12**: Framework present, good structure, some application
- **Score 9**: Basic framework, limited structure, minimal application
- **Score 6**: Implied framework but not clearly developed
- **Score 3**: Conceptual framework mentioned but not developed
- **Score 0**: No framework development

**6. Citation/Reference Density (15 points)**
- Target: 15.4 per 1000 words (biblical, historical, scholarly)
- **Score 15**: 14-17 per 1000 words, natural integration, diverse sources, clear attribution
- **Score 12**: 12-18 per 1000 words, good integration, multiple sources
- **Score 9**: 10-20 per 1000 words, moderate citations, basic integration
- **Score 6**: 7-22 per 1000 words, minimal citations, weak integration
- **Score 3**: 4-25 per 1000 words, very sparse citations
- **Score 0**: Few or no citations

**Subtotal Calculation:**
```
Signature Elements Score = (Epigraph + Historical + Metaphor + Direct Address + Framework + Citation) / 6
```

---

## 4. Dimension 2: Tone & Register (20% weight)

### 4.1 Evaluation Criteria

**Overall Tone Profile (100 points)**
- Target: Accessible Academic (42/100 on formality scale)

**Tone Characteristics:**
1. **Formality Level (30 points)**
   - **Score 30**: 38-46/100 - Perfect accessible academic balance
   - **Score 24**: 32-52/100 - Good balance, slightly more/less formal
   - **Score 18**: 25-59/100 - Adequate balance, noticeable shift
   - **Score 12**: 18-66/100 - Poor balance, too formal or informal
   - **Score 6**: 10-74/100 - Significant deviation
   - **Score 0**: <10 or >74 - Unacceptable deviation

2. **Passionate & Convicted (20 points)**
   - Strong conviction and urgency present
   - Prophetic calls for transformation
   - Hopeful vision communicated
   - Engaging and compelling

3. **Inclusive & Engaging (25 points)**
   - Frequent use of "we," "us," "you"
   - Creates community and shared mission
   - Direct engagement with readers
   - Invites participation

4. **Balanced Authority (15 points)**
   - Personal authority without arrogance
   - Conviction without dogmatism
   - Confidence with humility
   - Leadership voice present

5. **Accessibility (10 points)**
   - Technical terms explained
   - Complex concepts made accessible
   - Maintains scholarly credibility
   - Appropriate for educated lay readers

---

## 5. Dimension 3: Structural Patterns (15% weight)

### 5.1 Evaluation Criteria

**1. Article Opening Structure (30 points)**
- **Score 30**: 2-4 epigraphs → engaging introduction → provocative question/challenge
- **Score 24**: Good opening structure with most elements
- **Score 18**: Basic opening, missing some elements
- **Score 12**: Weak opening, missing key elements
- **Score 6**: Poor opening structure
- **Score 0**: No clear opening structure

**2. Paragraph Structure (25 points)**
- **Average Length**: 4-6 sentences (80-120 words)
- **Topic Sentence Placement**: Usually first or second sentence (85%)
- **Development Patterns**: Definition→Example→Application, Principle→Illustration→Implication
- **Score based on**: Length distribution, topic sentence placement, development patterns

**3. Sentence Structure (25 points)**
- **Average Length**: 22-28 words
- **Distribution**: Simple 35%, Compound 25%, Complex 30%, Compound-Complex 10%
- **Patterns**: Balanced loose/periodic sentences, appropriate variety
- **Score based on**: Length distribution, sentence type variety, structural balance

**4. Overall Organization (20 points)**
- Clear logical flow
- Appropriate transitions
- Coherent development
- Effective conclusion

---

## 6. Dimension 4: Language Patterns (15% weight)

### 6.1 Evaluation Criteria

**1. Vocabulary Sophistication (30 points)**
- **Target**: 58/100 (Moderate-High)
- Accessible theological vocabulary
- Technical terms with explanation
- Neologisms when appropriate (mDNA, APEST)
- Balance of academic and conversational

**2. Key Terminology Usage (25 points)**
- Appropriate use of signature terms: Apostolic Genius, mDNA, missional, incarnational, APEST, metanoia, liminality, communitas
- Consistent terminology usage
- Proper context for technical terms

**3. Sentence Complexity (25 points)**
- **Target**: 65/100 (Moderate)
- Balanced simple and complex sentences
- Appropriate subordination
- Maintains clarity and readability

**4. Natural Language Flow (20 points)**
- Conversational rhythm
- Natural phrasing
- Appropriate transitions
- Readable and engaging

---

## 7. Dimension 5: Rhetorical Devices (10% weight)

### 7.1 Evaluation Criteria

**Target Frequency**: 12.3 per 1000 words

**Device Categories:**
1. **Metaphors & Analogies** (30 points)
   - Extended metaphors
   - Movement/DNA metaphors
   - Organic/biological metaphors
   - Journey/travel metaphors

2. **Parallelism & Repetition** (25 points)
   - Parallel structures
   - Anaphora (repetition of phrases)
   - Strategic repetition for emphasis

3. **Questions** (25 points)
   - **Target**: 3.2 per 1000 words
   - Rhetorical questions
   - Engagement questions
   - Provocative questions
   - Reflective questions

4. **Other Devices** (20 points)
   - Alliteration (occasional)
   - Personification (moderate)
   - Simile (moderate)
   - Appropriate variety

**Scoring:**
- **90-100**: Frequency 11-13 per 1000 words, excellent device usage, appropriate variety
- **80-89**: Frequency 9-15 per 1000 words, good device usage
- **70-79**: Frequency 7-17 per 1000 words, adequate device usage
- **60-69**: Frequency 5-19 per 1000 words, minimal device usage
- **0-59**: Frequency <5 or >19 per 1000 words, poor device usage

---

## 8. Dimension 6: Thematic Alignment (8% weight)

### 8.1 Evaluation Criteria

**Core Themes Alignment:**
1. **Movement vs. Institution** (20 points)
2. **Discipleship as Core** (20 points)
3. **Missional Engagement** (20 points)
4. **Jesus-Centered** (20 points)
5. **Historical Consciousness** (10 points)
6. **Framework Development** (10 points)

**Scoring:**
- **90-100**: Strong thematic alignment, clear connection to core themes
- **80-89**: Good thematic alignment, most themes present
- **70-79**: Adequate thematic alignment, some themes present
- **60-69**: Weak thematic alignment, limited theme connection
- **0-59**: Poor thematic alignment, themes absent or contradictory

**Framework Integration:**
- Appropriate use of mDNA, APEST/5Q, Metanoia Journey, Four Movements, etc.
- Correct framework relationships
- Proper framework application

---

## 9. Dimension 7: Textual Patterns (5% weight)

### 9.1 Evaluation Criteria

**1. Sentence Length Distribution (40 points)**
- **Target**: Short 25%, Medium 45%, Long 25%, Very Long 5%
- Score based on distribution match to target

**2. Paragraph Length Distribution (30 points)**
- **Target**: Short 20%, Medium 60%, Long 18%, Very Long 2%
- Score based on distribution match to target

**3. Sentence Pattern Variety (30 points)**
- Balanced loose and periodic sentences
- Appropriate use of balanced sentences
- Good structural variety

---

## 10. Dimension 8: Critical Constraints (2% weight - Penalty System)

### 10.1 Antithesis Prohibition

**CRITICAL VIOLATION**: Use of antithesis patterns results in point deduction.

**Violation Patterns:**
- "Not X but Y"
- "X rather than Y"
- "Either X or Y"
- "Neither X nor Y"
- Contrastive statements with "but," "instead," "rather"
- Binary oppositions

**Penalty System:**
- **1-2 instances**: -5 points (warning)
- **3-5 instances**: -15 points (significant violation)
- **6+ instances**: -30 points (critical violation)

**Required Alternatives:**
- Positive framing
- Additive language ("both/and")
- Inclusive formulations
- Expansive vision

**Note**: This dimension uses a penalty system rather than positive scoring. Articles with antithesis usage will have points deducted from their total score.

---

## 11. Implementation: AI Agent Tool Design

### 11.1 Tool Specification

**Tool Name**: `evaluate_voice_fidelity`

**Input Parameters:**
- `article_text` (string, required): The text of the article to evaluate
- `word_count` (integer, optional): Word count (if not provided, calculated)
- `article_title` (string, optional): Title of article for context

**Output Format:**
```json
{
  "overall_score": 85,
  "grade": "B",
  "dimension_scores": {
    "signature_elements": 82,
    "tone_register": 88,
    "structural_patterns": 85,
    "language_patterns": 80,
    "rhetorical_devices": 87,
    "thematic_alignment": 90,
    "textual_patterns": 83,
    "critical_violations": -5
  },
  "weighted_contribution": {
    "signature_elements": 20.5,
    "tone_register": 17.6,
    "structural_patterns": 12.75,
    "language_patterns": 12.0,
    "rhetorical_devices": 8.7,
    "thematic_alignment": 7.2,
    "textual_patterns": 4.15,
    "critical_violations": -5
  },
  "feedback": {
    "strengths": ["Excellent epigraph usage", "Strong historical examples"],
    "improvements": ["Increase direct address frequency", "Add more metaphors"],
    "critical_issues": ["Found 2 instances of antithesis patterns"]
  },
  "detailed_analysis": {
    "epigraphs": {"count": 3, "score": 15, "notes": "Good source diversity"},
    "historical_examples": {"count": 4.6, "score": 18, "notes": "Well-developed examples"},
    ...
  }
}
```

### 11.2 Evaluation Process

**Step 1: Text Analysis**
1. Parse article text
2. Calculate word count
3. Identify structural elements (epigraphs, sections, paragraphs, sentences)
4. Extract linguistic features

**Step 2: Dimension Evaluation**
1. Evaluate each dimension independently
2. Calculate sub-scores for each criterion
3. Aggregate to dimension scores
4. Apply dimension weights

**Step 3: Critical Constraint Check**
1. Scan for antithesis patterns
2. Count violations
3. Calculate penalty

**Step 4: Score Calculation**
1. Apply weights to dimension scores
2. Subtract penalties
3. Calculate final score (0-100)
4. Assign grade

**Step 5: Feedback Generation**
1. Identify strengths
2. Identify areas for improvement
3. Generate specific, actionable feedback
4. Provide detailed analysis for each dimension

### 11.3 Reference Data Integration

The tool will reference:
- **Baseline Metrics**: From `voice-style/01-20-PARAMETER-ANALYSIS.md`
- **Voice Profile**: From `voice-style/05-VOICE-SIGNATURE.md`
- **Style Guidelines**: From `voice-style/06-STYLE-GUIDE.md`
- **Textual Patterns**: From `voice-style/07-TEXTUAL-PATTERNS.md`
- **Critical Constraints**: From `voice-style/09-ANTITHESIS-PROHIBITION.md`

---

## 12. Best Practices (Based on OpenAI Guidelines)

### 12.1 Clear Criteria

- **Specific Metrics**: All dimensions use measurable criteria (word counts, frequencies, ratios)
- **Objective Standards**: Scoring based on quantifiable features, not subjective judgments
- **Documented Baselines**: All targets derived from documented analysis
- **Transparent Weighting**: Clear rationale for dimension weights

### 12.2 Consistency

- **Standardized Process**: Same evaluation process for all articles
- **Reproducible Results**: Same article should produce same score
- **Inter-evaluator Agreement**: Multiple evaluators should produce similar scores
- **Version Control**: Rubric versioning for tracking changes

### 12.3 Measurability

- **Quantifiable Features**: Word counts, frequencies, ratios, distributions
- **Comparable Metrics**: All metrics compared to documented baselines
- **Statistical Validity**: Metrics based on corpus analysis (88 chapters, 9 books)
- **Precision**: Specific score ranges for each criterion

### 12.4 Actionability

- **Detailed Feedback**: Specific feedback for each dimension
- **Actionable Recommendations**: Clear guidance for improvement
- **Priority Identification**: Highlight critical issues vs. minor improvements
- **Examples**: Provide examples of high-scoring features

### 12.5 Validation

- **Baseline Validation**: Test rubric against known authentic examples from `extracted-books-voice-chapters/`
- **Calibration**: Adjust weights/scores based on validation results
- **Edge Case Handling**: Define handling for edge cases (very short articles, etc.)
- **Continuous Improvement**: Regular review and refinement

---

## 13. Development Roadmap

### Phase 1: Rubric Specification (Week 1)
- [ ] Finalize dimension definitions and weights
- [ ] Create detailed scoring criteria for each dimension
- [ ] Document baseline metrics and targets
- [ ] Define tool interface and output format

### Phase 2: Validation Dataset Creation (Week 2)
- [ ] Select representative samples from `extracted-books-voice-chapters/`
- [ ] Create ground truth scores (manual evaluation)
- [ ] Identify edge cases and special scenarios
- [ ] Document validation methodology

### Phase 3: Initial Implementation (Week 3-4)
- [ ] Develop text analysis components
- [ ] Implement dimension evaluation logic
- [ ] Create scoring calculation system
- [ ] Build feedback generation system

### Phase 4: Testing & Calibration (Week 5-6)
- [ ] Test against validation dataset
- [ ] Compare scores to ground truth
- [ ] Calibrate weights and thresholds
- [ ] Refine scoring criteria based on results

### Phase 5: Integration & Documentation (Week 7)
- [ ] Integrate as AI agent tool
- [ ] Create user documentation
- [ ] Develop examples and tutorials
- [ ] Document limitations and edge cases

### Phase 6: Deployment & Monitoring (Week 8+)
- [ ] Deploy tool for production use
- [ ] Monitor performance and accuracy
- [ ] Collect feedback from users
- [ ] Plan iterative improvements

---

## 14. Success Metrics

### 14.1 Accuracy Metrics

- **Correlation with Human Evaluation**: >0.85 correlation with expert human evaluators
- **Inter-tool Consistency**: <5 point variance for same article evaluated multiple times
- **Baseline Alignment**: High-scoring authentic articles score >85, low-fidelity articles score <70

### 14.2 Usability Metrics

- **Feedback Quality**: Users find feedback actionable and helpful
- **Score Interpretation**: Scores align with user expectations
- **Tool Reliability**: Consistent performance across diverse articles

### 14.3 Impact Metrics

- **Voice Improvement**: Articles improve in voice fidelity after using feedback
- **Time Savings**: Faster evaluation than manual review
- **Adoption Rate**: High usage by content creators

---

## 15. Limitations & Considerations

### 15.1 Known Limitations

1. **Article Length**: Very short articles (<500 words) may not have enough data for reliable evaluation
2. **Context Dependency**: Some elements (thematic alignment) require context about article purpose
3. **Quantitative Bias**: Heavier weight on measurable features vs. qualitative aspects
4. **Baseline Dependency**: Accuracy depends on quality of baseline documentation

### 15.2 Edge Cases

- **Very Short Articles**: Minimum thresholds for evaluation
- **Non-Standard Formats**: Articles without traditional structure
- **Mixed Content**: Articles with significant quotes/excerpts
- **Evolution Over Time**: Handling voice evolution (if applicable)

### 15.3 Future Enhancements

- **Machine Learning Integration**: Train ML models on authentic examples
- **Contextual Adaptation**: Adjust weights based on article type/purpose
- **Comparative Analysis**: Compare articles to specific books/chapters
- **Detailed Reporting**: More granular feedback and suggestions

---

## 16. References

### 16.1 Source Documentation

- `voice-style/00-EXECUTIVE-SUMMARY.md`
- `voice-style/01-20-PARAMETER-ANALYSIS.md`
- `voice-style/05-VOICE-SIGNATURE.md`
- `voice-style/06-STYLE-GUIDE.md`
- `voice-style/07-TEXTUAL-PATTERNS.md`
- `voice-style/09-ANTITHESIS-PROHIBITION.md`

### 16.2 Supporting Materials

- `extracted-books-voice-chapters/` - Authentic voice examples
- `content-research/` - Thematic and content analysis
- `content-research/evals/rubrics/eval-rubric-master.md` - Existing evaluation rubric (for reference)

### 16.3 Best Practices Sources

- OpenAI Evaluation Best Practices
- Academic rubric design principles
- Natural language processing evaluation methods
- Stylometric analysis techniques

---

## 17. Conclusion

This comprehensive plan provides the foundation for developing a robust, objective voice fidelity rubric that enables AI agents to evaluate new articles against Alan Hirsch's established voice and style. The rubric leverages extensive documentation, uses measurable criteria, and follows best practices for evaluation tool design.

**Next Steps:**
1. Review and refine this plan based on stakeholder feedback
2. Begin Phase 1: Rubric Specification
3. Create validation dataset from authentic examples
4. Develop and test initial implementation
5. Iterate based on testing results

---

*This plan represents a comprehensive approach to voice fidelity evaluation, balancing quantitative precision with qualitative assessment to provide actionable feedback for maintaining authentic voice in new content.*
