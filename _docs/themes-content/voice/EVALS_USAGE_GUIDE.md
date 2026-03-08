# Voice Evaluation Q&A Usage Guide

> **Complete guide** for using the Voice Evaluation Q&A Set with AI-Lab and Voice Fidelity Agent

**Version**: 1.0.0  
**Last Updated**: January 19, 2026  
**Status**: Active  
**Purpose**: Step-by-step guide for implementing evaluations using the authoritative Q&A set

---

## Table of Contents

1. [Overview](#overview)
2. [Understanding the Evaluation Q&A Set](#understanding-the-evaluation-qa-set)
3. [Using Evals with AI-Lab](#using-evals-with-ai-lab)
4. [Using Evals with Voice Fidelity Agent](#using-evals-with-voice-fidelity-agent)
5. [Evaluation Workflow](#evaluation-workflow)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Reference](#reference)

---

## Overview

### What Is This Guide?

This guide walks you through using the **Voice Evaluation Q&A Set** (`eval-answers.md`) to systematically evaluate and improve AI agents that emulate Alan Hirsch's voice, style, and theological framework.

### Why Use These Evals?

The Q&A set serves as the **authoritative single source of truth** for:
- **Voice verification**: Ensuring agents maintain authentic Alan Hirsch voice
- **Content accuracy**: Verifying theological and missiological correctness
- **Style consistency**: Maintaining voice markers across all responses
- **Quality assurance**: Detecting regressions when agents change
- **Continuous improvement**: Systematic refinement of agent performance

### Key Benefits

- **Objective measurement**: Quantifiable scores (0-100) across six dimensions
- **Comprehensive coverage**: Questions span all complexity levels (1-5)
- **Ideal answers**: Authoritative reference points for comparison
- **Automated evaluation**: Can be integrated into CI/CD pipelines
- **Regression detection**: Catch quality degradation early

---

## Understanding the Evaluation Q&A Set

### Structure

The Q&A set (`_docs/content/voice/eval-answers.md`) contains:

1. **Q&A Sets by Topic**:
   - Apostolic Genius
   - Movement DNA (mDNA)
   - APEST / 5Q
   - Metanoia
   - Missional Church
   - Movement Dynamics
   - Organic Systems
   - Framework Integration

2. **Complexity Levels** (1-5):
   - **Level 1**: Foundational understanding (300-800 words)
   - **Level 2**: Relationship understanding (500-1200 words)
   - **Level 3**: Application (800-1500 words)
   - **Level 4**: Synthesis (1000-2000 words)
   - **Level 5**: Critical analysis (1200-2500 words)

3. **Each Question Includes**:
   - Question text
   - Complexity level
   - Expected answer length
   - Key evaluation criteria
   - **Ideal answer** (authoritative reference)
   - Source attribution

4. **Master Evaluation Rubric**:
   - Six weighted dimensions
   - Scoring scales (1-5 per dimension)
   - Automatic failure conditions
   - Grade bands (A-F)

### Critical Rules

**Automatic Failure Conditions**:
- ❌ Any response containing antithesis/contrast structures ("not X, but Y")
- ❌ Content Accuracy score of 1 (theologically incorrect)
- ❌ Voice Authenticity score of 1 (completely inauthentic)
- ❌ Total score below 60

**Passing Threshold**: 80/100 (B grade) for deployment readiness

---

## Using Evals with AI-Lab

### Overview

AI-Lab is a dynamic agent that adapts to different themes, modes, and styles. Using evals ensures it maintains voice authenticity and content accuracy across all configurations.

### Step 1: Create Evaluation Dataset

Convert the Q&A set into an OpenAI dataset:

```typescript
import OpenAI from 'openai';
import { readFile } from 'fs/promises';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Parse Q&A set from eval-answers.md
async function createEvalDataset() {
  const evalContent = await readFile(
    '_docs/content/voice/eval-answers.md',
    'utf-8'
  );
  
  // Extract Q&A pairs (simplified - you'd use proper parsing)
  const qaPairs = extractQAPairs(evalContent);
  
  // Convert to dataset rows
  const datasetRows = qaPairs.map((qa) => ({
    input: {
      question: qa.question,
      complexity_level: qa.complexity,
      expected_length: qa.expectedAnswerLength,
      key_criteria: qa.keyEvaluationCriteria,
      theme: 'auto-detect', // AI-Lab will adapt
    },
    expected_output: {
      ideal_answer: qa.idealAnswer,
      source_attribution: qa.sourceAttribution,
    },
  }));
  
  // Create dataset
  const dataset = await openai.datasets.create({
    name: 'alan-hirsch-voice-evals-ai-lab',
    rows: datasetRows,
  });
  
  console.log(`Created dataset: ${dataset.id}`);
  return dataset;
}
```

### Step 2: Build Graders for AI-Lab

Create graders based on the Master Rubric:

```typescript
// Content Accuracy Grader (30% weight)
const contentAccuracyGrader = {
  name: 'content_accuracy_ai_lab',
  criteria: {
    theological_correctness: 'Response demonstrates complete theological accuracy',
    framework_alignment: 'Perfectly aligns with Alan Hirsch\'s teachings',
    concept_understanding: 'Shows deep understanding of concepts',
    terminology_accuracy: 'Accurate use of terminology',
  },
  evaluate: async (output: string, expected: any) => {
    // Use GPT-4 to compare against ideal answer
    const evaluation = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are evaluating an AI-Lab agent response against Alan Hirsch's ideal answer.
          Score 1-5 based on theological accuracy and framework alignment.`,
        },
        {
          role: 'user',
          content: `Ideal Answer:\n${expected.ideal_answer}\n\nAI-Lab Response:\n${output}\n\nScore 1-5:`,
        },
      ],
    });
    return parseFloat(evaluation.choices[0].message.content);
  },
};

// Voice Authenticity Grader (25% weight) - CRITICAL
const voiceAuthenticityGrader = {
  name: 'voice_authenticity_ai_lab',
  criteria: {
    first_person_narrative: 'First-person narrative integration',
    rhetorical_questions: 'Rhetorical questions present',
    extended_metaphors: 'Extended metaphors and analogies',
    direct_address: 'Direct address to reader',
    conversational_tone: 'Conversational, engaging tone',
    narrative_flow: 'Narrative flow, not bullet points',
    no_antithesis: 'CRITICAL: No antithesis/contrast structures',
  },
  evaluate: async (output: string) => {
    // Check for automatic failure condition first
    const antithesisPatterns = [
      /not\s+\w+,\s+but\s+\w+/i,
      /not\s+about\s+.*\s+but\s+about/i,
      /shouldn't\s+focus\s+on\s+.*\s+but\s+on/i,
    ];
    
    const hasAntithesis = antithesisPatterns.some(pattern => 
      pattern.test(output)
    );
    if (hasAntithesis) {
      return { 
        score: 0, 
        reason: 'Contains antithesis/contrast structures - automatic failure' 
      };
    }
    
    // Evaluate voice markers
    const voiceMarkers = {
      firstPerson: /(If you've been|Let me|I've seen)/i.test(output),
      rhetoricalQuestions: /\?/.test(output) && output.split('?').length > 2,
      metaphors: /(like|as|think of|imagine|metaphor)/i.test(output),
      directAddress: /(you|we|your|our)/i.test(output),
      narrativeFlow: output.split('\n\n').length > 3 && !/^\d+\./.test(output),
    };
    
    const score = Object.values(voiceMarkers).filter(Boolean).length;
    return { 
      score: Math.max(1, Math.min(5, score)), 
      markers: voiceMarkers 
    };
  },
};

// Additional graders: Completeness, Depth, Coherence, Source Integration
// (See eval-answers.md for full implementations)
```

### Step 3: Run Evaluations Against AI-Lab

```typescript
import { run } from '@openai/agents';
import { aiLabAgent } from '@/src/agents/ai-lab';

async function evaluateAILab() {
  const dataset = await getEvalDataset();
  const results = [];
  
  // Run each question through AI-Lab
  for (const row of dataset.rows) {
    const question = row.input.question;
    
    // Run AI-Lab agent
    const result = await run(aiLabAgent, question, {
      context: {
        theme: 'auto-detect', // AI-Lab will detect theme from question
        mode: 'teacher', // Default mode
        style: 'conversation',
      },
    });
    
    const agentResponse = extractResponse(result);
    
    // Evaluate with all graders
    const scores = {
      content_accuracy: await contentAccuracyGrader.evaluate(
        agentResponse,
        row.expected_output
      ),
      voice_authenticity: await voiceAuthenticityGrader.evaluate(agentResponse),
      // ... other graders
    };
    
    // Calculate weighted score
    const totalScore = calculateWeightedScore(scores);
    
    results.push({
      question: question,
      score: totalScore,
      grade: getGrade(totalScore),
      passed: totalScore >= 80,
      scores: scores,
    });
  }
  
  // Generate report
  const passRate = (results.filter(r => r.passed).length / results.length) * 100;
  console.log(`AI-Lab Pass Rate: ${passRate.toFixed(1)}%`);
  
  return results;
}
```

### Step 4: Integrate into CI/CD

```typescript
// In your CI/CD pipeline
async function runAILabEvals() {
  console.log('Running AI-Lab evaluations...');
  
  const results = await evaluateAILab();
  const passRate = calculatePassRate(results);
  
  if (passRate < 80) {
    console.error(`❌ AI-Lab eval pass rate ${passRate}% is below threshold of 80%`);
    console.error('Failing questions:');
    results
      .filter(r => !r.passed)
      .forEach(r => {
        console.error(`  - ${r.question.substring(0, 50)}... (Score: ${r.score})`);
      });
    process.exit(1); // Fail CI/CD
  }
  
  console.log(`✅ AI-Lab eval pass rate: ${passRate.toFixed(1)}%`);
}
```

### Step 5: Monitor and Iterate

```typescript
// Track evaluation results over time
async function trackAILabPerformance() {
  const results = await evaluateAILab();
  
  // Store results for trend analysis
  await storeEvalResults({
    agent: 'ai-lab',
    timestamp: new Date(),
    passRate: calculatePassRate(results),
    scores: results.map(r => ({
      question: r.question,
      score: r.score,
      dimensionScores: r.scores,
    })),
  });
  
  // Compare against baseline
  const baseline = await getBaselineResults('ai-lab');
  const regression = detectRegression(results, baseline);
  
  if (regression.detected) {
    console.warn(`⚠️ Regression detected: ${regression.description}`);
    // Alert team, rollback, or investigate
  }
}
```

---

## Using Evals with Voice Fidelity Agent

### Overview

The Voice Fidelity Agent evaluates article content against Alan Hirsch's voice fidelity rubric. The Q&A set can be used to:
1. **Calibrate the agent**: Ensure it evaluates correctly
2. **Test the agent**: Verify it identifies voice issues accurately
3. **Improve feedback**: Use ideal answers to generate better feedback

### Step 1: Test Voice Fidelity Agent with Q&A Set

Use the ideal answers as "gold standard" articles to test the agent:

```typescript
import { voiceFidelityService } from '@/src/lib/services/simplified/voice-fidelity.service';

async function testVoiceFidelityAgent() {
  const evalContent = await readFile(
    '_docs/content/voice/eval-answers.md',
    'utf-8'
  );
  
  const qaPairs = extractQAPairs(evalContent);
  
  // Test agent with ideal answers
  for (const qa of qaPairs) {
    const idealAnswer = qa.idealAnswer;
    
    // Evaluate ideal answer (should score high)
    const evaluation = await voiceFidelityService.evaluate({
      articleText: idealAnswer,
      articleTitle: `Ideal Answer: ${qa.question.substring(0, 50)}...`,
      wordCount: idealAnswer.split(/\s+/).length,
    });
    
    if (evaluation.ok) {
      const result = evaluation.data;
      
      console.log(`Question: ${qa.question.substring(0, 50)}...`);
      console.log(`  Score: ${result.overallScore}/100`);
      console.log(`  Grade: ${result.grade}`);
      
      // Ideal answers should score 90+ (A grade)
      if (result.overallScore < 90) {
        console.warn(`  ⚠️ Lower than expected score for ideal answer`);
        console.warn(`  Feedback: ${result.feedback}`);
      }
    }
  }
}
```

### Step 2: Use Q&A Set to Calibrate Voice Fidelity Agent

The ideal answers demonstrate perfect voice fidelity. Use them to calibrate the agent:

```typescript
async function calibrateVoiceFidelityAgent() {
  const idealAnswers = await extractIdealAnswers();
  
  // Analyze voice characteristics in ideal answers
  const voiceCharacteristics = {
    avgEpigraphs: 0,
    avgHistoricalExamples: 0,
    avgMetaphors: 0,
    avgDirectAddress: 0,
    avgQuestions: 0,
    // ... other metrics
  };
  
  for (const answer of idealAnswers) {
    const metrics = analyzeVoiceMetrics(answer);
    // Aggregate metrics
  }
  
  // Use these as calibration targets
  console.log('Voice Fidelity Calibration Targets:');
  console.log(`  Epigraphs: ${voiceCharacteristics.avgEpigraphs} per article`);
  console.log(`  Historical Examples: ${voiceCharacteristics.avgHistoricalExamples} per 1000 words`);
  console.log(`  Metaphors: ${voiceCharacteristics.avgMetaphors} per 1000 words`);
  // ... etc
  
  // Update agent instructions with these targets
  await updateVoiceFidelityAgentCalibration(voiceCharacteristics);
}
```

### Step 3: Generate Feedback Using Ideal Answers

Use ideal answers as reference points when generating feedback:

```typescript
async function generateFeedbackWithReference(
  articleText: string,
  question: string
) {
  // Find relevant ideal answer
  const relevantQA = await findRelevantQA(question);
  const idealAnswer = relevantQA.idealAnswer;
  
  // Evaluate article
  const evaluation = await voiceFidelityService.evaluate({
    articleText: articleText,
    articleTitle: question,
    wordCount: articleText.split(/\s+/).length,
  });
  
  if (evaluation.ok) {
    const result = evaluation.data;
    
    // Generate enhanced feedback comparing to ideal answer
    const enhancedFeedback = await generateComparativeFeedback({
      articleText: articleText,
      idealAnswer: idealAnswer,
      evaluation: result,
      keyCriteria: relevantQA.keyEvaluationCriteria,
    });
    
    return {
      ...result,
      feedback: enhancedFeedback,
      idealAnswerReference: idealAnswer,
    };
  }
  
  return evaluation;
}

async function generateComparativeFeedback(params: {
  articleText: string;
  idealAnswer: string;
  evaluation: any;
  keyCriteria: string[];
}) {
  // Use GPT-4 to compare article against ideal answer
  const feedback = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are helping improve an article to match Alan Hirsch's voice.
        Compare the article against the ideal answer and provide specific, actionable feedback.`,
      },
      {
        role: 'user',
        content: `Ideal Answer (reference):
${params.idealAnswer}

Article to Improve:
${params.articleText}

Current Evaluation:
${JSON.stringify(params.evaluation, null, 2)}

Key Criteria:
${params.keyCriteria.join('\n')}

Provide specific feedback on:
1. Voice markers missing or weak
2. Content gaps compared to ideal answer
3. Specific improvements needed
4. Examples from ideal answer to emulate`,
      },
    ],
  });
  
  return feedback.choices[0].message.content;
}
```

### Step 4: Continuous Evaluation of Voice Fidelity Agent

Monitor the agent's evaluation accuracy over time:

```typescript
async function monitorVoiceFidelityAgent() {
  // Test with known good/bad examples
  const testCases = [
    {
      text: idealAnswer, // Should score 90+
      expectedScore: 90,
      label: 'ideal',
    },
    {
      text: poorAnswer, // Should score < 60
      expectedScore: 50,
      label: 'poor',
    },
    // ... more test cases
  ];
  
  const results = [];
  
  for (const testCase of testCases) {
    const evaluation = await voiceFidelityService.evaluate({
      articleText: testCase.text,
      articleTitle: `Test: ${testCase.label}`,
      wordCount: testCase.text.split(/\s+/).length,
    });
    
    if (evaluation.ok) {
      const score = evaluation.data.overallScore;
      const accuracy = Math.abs(score - testCase.expectedScore);
      
      results.push({
        label: testCase.label,
        expected: testCase.expectedScore,
        actual: score,
        accuracy: accuracy,
        passed: accuracy < 10, // Within 10 points
      });
    }
  }
  
  // Report on agent accuracy
  const avgAccuracy = results.reduce((sum, r) => sum + r.accuracy, 0) / results.length;
  console.log(`Voice Fidelity Agent Average Accuracy: ${avgAccuracy.toFixed(1)} points`);
  
  if (avgAccuracy > 15) {
    console.warn('⚠️ Voice Fidelity Agent may need recalibration');
  }
}
```

---

## Evaluation Workflow

### Complete Workflow

```
1. Prepare Evaluation Dataset
   ↓
2. Build Graders (6 dimensions)
   ↓
3. Run Agent on Questions
   ↓
4. Evaluate Responses
   ↓
5. Calculate Weighted Scores
   ↓
6. Check Against Threshold (80/100)
   ↓
7. Generate Report
   ↓
8. Identify Failures
   ↓
9. Refine Agent (prompts, tools, instructions)
   ↓
10. Re-run Evaluations
   ↓
11. Track Performance Over Time
```

### Weekly Evaluation Schedule

**Monday**: Run full evaluation suite
- All Q&A sets
- All complexity levels
- Generate comprehensive report

**Wednesday**: Run regression check
- Compare against last week's baseline
- Identify any score decreases
- Investigate failures

**Friday**: Run targeted evaluation
- Focus on recent agent changes
- Test specific themes/modes
- Quick validation

### Evaluation Priorities

1. **Voice Authenticity** (25% weight) - Most critical
   - Check for antithesis structures (automatic failure)
   - Verify voice markers present
   - Ensure narrative flow

2. **Content Accuracy** (30% weight) - Foundation
   - Verify theological correctness
   - Check framework alignment
   - Validate terminology

3. **Completeness** (15% weight) - Coverage
   - Ensure all aspects addressed
   - Check appropriate depth for complexity level

---

## Best Practices

### 1. Start with Level 1-2 Questions

Build confidence with foundational questions before moving to complex synthesis:
- Easier to identify issues
- Faster iteration cycles
- Clearer success criteria

### 2. Monitor Voice Authenticity Closely

This is the most distinctive dimension:
- Use automated checks for antithesis structures
- Verify voice markers in every response
- Compare against ideal answers regularly

### 3. Compare Against Ideal Answers

Always compare agent responses against ideal answers, not just rubric criteria:
- Ideal answers show what "perfect" looks like
- Reveal gaps in agent understanding
- Guide prompt refinement

### 4. Track Regressions

Monitor pass rates over time:
- Store results in database
- Compare against baseline
- Alert on significant drops

### 5. Iterative Refinement

Use evaluation results to improve agents:
- Identify common failure patterns
- Refine prompts based on feedback
- Update instructions with learnings
- Re-run evals after each change

### 6. Human Review for Edge Cases

For scores near thresholds (75-85):
- Conduct human review
- Verify automated scoring accuracy
- Identify nuanced issues

### 7. Use Both Agents Together

AI-Lab and Voice Fidelity Agent complement each other:
- AI-Lab generates content
- Voice Fidelity Agent evaluates it
- Use evals to improve both

---

## Troubleshooting

### Common Issues

#### Issue: Low Pass Rates (< 80%)

**Symptoms**: Many questions failing evaluation

**Solutions**:
1. Check for systematic issues (antithesis structures, voice markers missing)
2. Review agent instructions - may need voice signature integration
3. Compare failing responses against ideal answers
4. Identify patterns in failures (specific topics, complexity levels)
5. Refine prompts based on failure analysis

#### Issue: Voice Authenticity Failures

**Symptoms**: Responses missing voice markers or containing antithesis

**Solutions**:
1. Add explicit voice signature to agent instructions
2. Include voice markers checklist in prompts
3. Add antithesis detection as pre-processing step
4. Use ideal answers as examples in few-shot prompts

#### Issue: Content Accuracy Issues

**Symptoms**: Theologically incorrect or framework misalignment

**Solutions**:
1. Verify agent has access to authoritative sources
2. Check tool usage - may need to call knowledge retrieval
3. Review framework definitions in agent instructions
4. Add validation checks for key concepts

#### Issue: Inconsistent Scores

**Symptoms**: Same question getting different scores on re-runs

**Solutions**:
1. Ensure graders are deterministic
2. Use consistent model settings (temperature, etc.)
3. Verify ideal answer comparison is stable
4. Check for randomness in agent responses

### Debugging Workflow

```typescript
async function debugEvaluation(questionId: string) {
  // 1. Get question and ideal answer
  const qa = await getQA(questionId);
  
  // 2. Run agent multiple times
  const responses = [];
  for (let i = 0; i < 3; i++) {
    const result = await run(aiLabAgent, qa.question);
    responses.push(extractResponse(result));
  }
  
  // 3. Evaluate each response
  const evaluations = responses.map(r => evaluateResponse(r, qa));
  
  // 4. Compare against ideal answer
  const comparisons = responses.map(r => 
    compareToIdeal(r, qa.idealAnswer)
  );
  
  // 5. Generate debug report
  console.log('Debug Report:');
  console.log(`Question: ${qa.question}`);
  console.log(`Ideal Answer Length: ${qa.idealAnswer.length} chars`);
  console.log(`Responses: ${responses.length}`);
  responses.forEach((r, i) => {
    console.log(`  Response ${i + 1}:`);
    console.log(`    Length: ${r.length} chars`);
    console.log(`    Score: ${evaluations[i].totalScore}`);
    console.log(`    Voice Markers: ${evaluations[i].voiceMarkers}`);
    console.log(`    Similarity to Ideal: ${comparisons[i].similarity}%`);
  });
}
```

---

## Reference

### Key Files

- **Q&A Set**: `_docs/content/voice/eval-answers.md`
- **Master Rubric**: Included in `eval-answers.md`
- **AI-Lab Agent**: `src/agents/ai-lab/index.ts`
- **Voice Fidelity Service**: `src/lib/services/simplified/voice-fidelity.service.ts`

### Evaluation Dimensions

1. **Content Accuracy** (30% weight)
2. **Voice Authenticity** (25% weight) - CRITICAL
3. **Completeness** (15% weight)
4. **Depth and Insight** (15% weight)
5. **Coherence and Flow** (10% weight)
6. **Source Integration** (5% weight)

### Grade Bands

- **A** (90-100): Excellent, ready for deployment
- **B** (80-89): Good, minor improvements needed
- **C** (70-79): Adequate, significant improvements needed
- **D** (60-69): Poor, major revisions required
- **F** (<60): Unacceptable, not ready

### Automatic Failure Conditions

- Contains antithesis/contrast structures
- Content Accuracy score of 1
- Voice Authenticity score of 1
- Total score below 60

### Passing Threshold

**80/100 (B grade)** for deployment readiness

---

## Next Steps

1. **Create your first dataset**: Convert Q&A set to OpenAI dataset
2. **Build initial graders**: Implement all six dimension graders
3. **Run baseline evaluation**: Establish current performance
4. **Set up monitoring**: Track performance over time
5. **Iterate and improve**: Refine agents based on results

For detailed implementation examples, see the code samples in `eval-answers.md` under "Using This Document in AI-Lab Evals".

---

**Remember**: These evals are the authoritative source of truth. Alan's edits to ideal answers directly shape agent performance. Use them wisely, iterate continuously, and maintain the highest standards for voice authenticity and content accuracy.
