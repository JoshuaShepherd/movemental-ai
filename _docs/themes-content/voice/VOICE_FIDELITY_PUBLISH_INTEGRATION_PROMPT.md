# Voice Fidelity Scorecard Integration Prompt

**Purpose**: Integrate voice fidelity scoring agent into article editor publish flow  
**Architecture**: Six-Layer Type Safety Chain (Drizzle → Zod → Services → Routes → Hooks → UI)  
**Status**: Implementation Guide  
**Date**: January 2025

---

## Executive Summary

This prompt provides step-by-step instructions for integrating a voice fidelity scoring agent that evaluates article content when the publish button is clicked. The agent will analyze the TipTap editor content using the comprehensive voice fidelity rubric (`VOICE_FIDELITY_RUBRIC_PLAN.md`) and display a color-coded score/grade in a drawer that appears after publish is clicked.

**Key Requirements:**
- ✅ Non-breaking integration with existing publish flow
- ✅ Six-layer architecture compliance
- ✅ Color-coded score display (0-100 scale with grade)
- ✅ Drawer UI component that appears after publish click
- ✅ Only analyzes TipTap editor content at publish time
- ✅ Based on voice-style documentation and rubric

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    INTEGRATION FLOW                         │
└─────────────────────────────────────────────────────────────┘

User clicks "Publish" 
  ↓
ArticleEditorLayout.handlePublish() 
  ↓
[EXISTING FLOW CONTINUES]
  ↓
[NEW] Call Voice Fidelity Agent (as tool)
  ↓
[NEW] Open VoiceFidelityScorecardDrawer with score
  ↓
User sees color-coded score/grade
  ↓
Publish continues (non-blocking)
```

**Critical Constraint**: The voice fidelity evaluation must NOT block the publish flow. It runs in parallel and displays results in a drawer.

---

## Layer-by-Layer Implementation

### Layer 1: Database Schema (Drizzle)

**Location**: `src/lib/database/schema.ts`

**Action Required**: Add table to store voice fidelity evaluation results (optional - for historical tracking)

```typescript
// Add to schema.ts (if historical tracking desired)
export const voiceFidelityEvaluations = pgTable('voice_fidelity_evaluations', {
  id: id(),
  contentItemId: text('content_item_id').notNull().references(() => contentItems.id, { onDelete: 'cascade' }),
  overallScore: integer('overall_score').notNull(), // 0-100
  grade: text('grade').notNull(), // A, B, C, D, F
  dimensionScores: jsonb('dimension_scores').notNull(), // JSON object with all dimension scores
  weightedContribution: jsonb('weighted_contribution').notNull(), // JSON object with weighted contributions
  feedback: jsonb('feedback').notNull(), // JSON object with strengths, improvements, critical issues
  detailedAnalysis: jsonb('detailed_analysis').notNull(), // JSON object with detailed breakdown
  articleText: text('article_text').notNull(), // Snapshot of text evaluated
  wordCount: integer('word_count').notNull(),
  evaluatedAt: timestamp('evaluated_at').notNull().defaultNow(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

// Generate migration
// pnpm drizzle:gen
// pnpm drizzle:push
// pnpm db:check (must return "status": "LOCKED")
```

**Note**: This table is optional. If you don't need historical tracking, skip this layer and proceed to Layer 2.

**Validation**: 
```bash
pnpm db:check
# Must return: { "status": "LOCKED" }
```

**Reference**: `_docs/type/drizzle-schema.md` - Use helper functions: `id()`, `createdAt()`, `updatedAt()`

---

### Layer 2: Zod Schemas

**Location**: `src/lib/schemas/index.ts`

**Action Required**: Add Zod schemas for voice fidelity evaluation request and response

```typescript
// Add to src/lib/schemas/index.ts

import { z } from 'zod';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { voiceFidelityEvaluations } from '@/lib/database/schema';

// Voice Fidelity Evaluation Request Schema
export const VoiceFidelityEvaluationRequestSchema = z.object({
  articleText: z.string().min(100, 'Article must be at least 100 characters'),
  articleTitle: z.string().optional(),
  wordCount: z.number().int().positive().optional(), // Auto-calculated if not provided
});

// Voice Fidelity Dimension Scores Schema
export const VoiceFidelityDimensionScoresSchema = z.object({
  signatureElements: z.number().min(0).max(100),
  toneRegister: z.number().min(0).max(100),
  structuralPatterns: z.number().min(0).max(100),
  languagePatterns: z.number().min(0).max(100),
  rhetoricalDevices: z.number().min(0).max(100),
  thematicAlignment: z.number().min(0).max(100),
  textualPatterns: z.number().min(0).max(100),
  criticalViolations: z.number().max(0), // Negative or zero (penalty)
});

// Voice Fidelity Weighted Contribution Schema
export const VoiceFidelityWeightedContributionSchema = z.object({
  signatureElements: z.number(),
  toneRegister: z.number(),
  structuralPatterns: z.number(),
  languagePatterns: z.number(),
  rhetoricalDevices: z.number(),
  thematicAlignment: z.number(),
  textualPatterns: z.number(),
  criticalViolations: z.number(),
});

// Voice Fidelity Feedback Schema
export const VoiceFidelityFeedbackSchema = z.object({
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  criticalIssues: z.array(z.string()),
});

// Voice Fidelity Detailed Analysis Schema (simplified - adjust based on rubric needs)
export const VoiceFidelityDetailedAnalysisSchema = z.object({
  epigraphs: z.object({
    count: z.number(),
    score: z.number(),
    notes: z.string(),
  }).optional(),
  historicalExamples: z.object({
    count: z.number(),
    score: z.number(),
    notes: z.string(),
  }).optional(),
  metaphors: z.object({
    count: z.number(),
    score: z.number(),
    notes: z.string(),
  }).optional(),
  // Add other detailed analysis fields as needed
}).passthrough(); // Allow additional fields

// Voice Fidelity Evaluation Response Schema
export const VoiceFidelityEvaluationResponseSchema = z.object({
  overallScore: z.number().min(0).max(100),
  grade: z.enum(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F']),
  dimensionScores: VoiceFidelityDimensionScoresSchema,
  weightedContribution: VoiceFidelityWeightedContributionSchema,
  feedback: VoiceFidelityFeedbackSchema,
  detailedAnalysis: VoiceFidelityDetailedAnalysisSchema,
  wordCount: z.number().int().positive(),
  evaluatedAt: z.string().datetime(),
});

// Database schemas (if Layer 1 table was added)
export const VoiceFidelityEvaluationSelectSchema = createSelectSchema(voiceFidelityEvaluations);
export const VoiceFidelityEvaluationInsertSchema = createInsertSchema(voiceFidelityEvaluations);
export const VoiceFidelityEvaluationUpdateSchema = createUpdateSchema(voiceFidelityEvaluations);

// Type exports (MANDATORY)
export type VoiceFidelityEvaluationRequest = z.infer<typeof VoiceFidelityEvaluationRequestSchema>;
export type VoiceFidelityEvaluationResponse = z.infer<typeof VoiceFidelityEvaluationResponseSchema>;
export type VoiceFidelityDimensionScores = z.infer<typeof VoiceFidelityDimensionScoresSchema>;
export type VoiceFidelityWeightedContribution = z.infer<typeof VoiceFidelityWeightedContributionSchema>;
export type VoiceFidelityFeedback = z.infer<typeof VoiceFidelityFeedbackSchema>;
export type VoiceFidelityDetailedAnalysis = z.infer<typeof VoiceFidelityDetailedAnalysisSchema>;

// Database types (if Layer 1 table was added)
export type VoiceFidelityEvaluation = z.infer<typeof VoiceFidelityEvaluationSelectSchema>;
export type VoiceFidelityEvaluationCreate = z.infer<typeof VoiceFidelityEvaluationInsertSchema>;
export type VoiceFidelityEvaluationUpdate = z.infer<typeof VoiceFidelityEvaluationUpdateSchema>;
```

**Grade Calculation Helper**:
```typescript
// Add helper function to calculate grade from score
export function calculateGrade(score: number): 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F' {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 67) return 'D+';
  if (score >= 63) return 'D';
  if (score >= 60) return 'D-';
  return 'F';
}
```

**Validation**:
```bash
pnpm contracts:check
# Must return: { "status": "LOCKED" }
```

**Reference**: `_docs/type/zod-schemas.md` - Use `createSelectSchema`, `createInsertSchema`, `createUpdateSchema` from `drizzle-zod`, export types with `z.infer`

---

### Layer 3: Services

**Location**: `src/lib/services/simplified/voice-fidelity.service.ts` (NEW FILE)

**Action Required**: Create service for voice fidelity evaluation

```typescript
// src/lib/services/simplified/voice-fidelity.service.ts

import { SimplifiedService } from './simplified-base.service';
import { 
  VoiceFidelityEvaluationRequestSchema,
  VoiceFidelityEvaluationResponseSchema,
  type VoiceFidelityEvaluationRequest,
  type VoiceFidelityEvaluationResponse,
  calculateGrade,
} from '@/lib/schemas';
import { env } from '@/lib/env';
import { Agent, tool } from '@openai/agents';
import { z } from 'zod';

/**
 * Voice Fidelity Service
 * 
 * Evaluates article content against Alan Hirsch's voice fidelity rubric.
 * Uses OpenAI Agents SDK to call voice fidelity evaluation agent as a tool.
 */
class VoiceFidelityService extends SimplifiedService {
  private agent: Agent;

  constructor() {
    super();
    
    // Initialize agent with voice fidelity evaluation tool
    this.agent = new Agent({
      name: 'Voice Fidelity Evaluator',
      instructions: `You are Alan Hirsch's Voice Fidelity Evaluation Agent. You evaluate article content against a comprehensive 75-point scoring system based on documented voice characteristics.

## Your Role

Evaluate articles for voice faithfulness using the rubric defined in:
- \`_docs/voice-style/VOICE_FIDELITY_RUBRIC_PLAN.md\`
- \`_docs/voice-style/00-EXECUTIVE-SUMMARY.md\`
- \`_docs/voice-style/01-20-PARAMETER-ANALYSIS.md\`
- \`_docs/voice-style/05-VOICE-SIGNATURE.md\`
- \`_docs/voice-style/06-STYLE-GUIDE.md\`
- \`_docs/voice-style/07-TEXTUAL-PATTERNS.md\`
- \`_docs/voice-style/09-ANTITHESIS-PROHIBITION.md\`

## Evaluation Dimensions (Weighted)

1. **Signature Elements** (25% weight)
   - Epigraph usage (2-4 per article)
   - Historical example integration (4.8 per 1000 words)
   - Metaphorical density (8.5 per 1000 words, especially movement/DNA)
   - Direct address frequency (18.7 per 1000 words)
   - Framework development (1.2 per article average)
   - Citation density (15.4 per 1000 words)

2. **Tone & Register** (20% weight)
   - Formality level (42/100 - accessible academic)
   - Passionate & convicted
   - Inclusive & engaging
   - Balanced authority
   - Accessibility

3. **Structural Patterns** (15% weight)
   - Article opening structure
   - Paragraph structure
   - Sentence structure
   - Overall organization

4. **Language Patterns** (15% weight)
   - Vocabulary sophistication (58/100)
   - Key terminology usage
   - Sentence complexity (65/100)
   - Natural language flow

5. **Rhetorical Devices** (10% weight)
   - Target: 12.3 per 1000 words
   - Metaphors & analogies
   - Parallelism & repetition
   - Questions (3.2 per 1000 words)
   - Other devices

6. **Thematic Alignment** (8% weight)
   - Movement vs. Institution
   - Discipleship as Core
   - Missional Engagement
   - Jesus-Centered
   - Historical Consciousness
   - Framework Development

7. **Textual Patterns** (5% weight)
   - Sentence length distribution
   - Paragraph length distribution
   - Sentence pattern variety

8. **Critical Constraints** (2% weight - penalty)
   - **ANTITHESIS PROHIBITION**: No "not X but Y", "either/or", binary oppositions
   - Penalty: -5 points (1-2 instances), -15 points (3-5), -30 points (6+)

## Scoring Process

1. Analyze article text for each dimension
2. Calculate dimension scores (0-100 each)
3. Apply weights to get weighted contributions
4. Sum weighted contributions
5. Subtract critical violation penalties
6. Calculate final score (0-100)
7. Assign grade (A+ to F)

## Output Format

Return a complete evaluation with:
- Overall score (0-100)
- Grade (A+ to F)
- Dimension scores (all 8 dimensions)
- Weighted contributions
- Feedback (strengths, improvements, critical issues)
- Detailed analysis for key elements

## Critical Rules

- **NEVER use antithesis** - Always use positive framing, additive language ("both/and")
- **Maintain objectivity** - Base scores on measurable criteria
- **Provide actionable feedback** - Specific, concrete suggestions
- **Reference rubric** - All scores must align with documented criteria`,
      model: env.OPENAI_MODEL || 'gpt-4o',
      tools: [
        tool({
          name: 'evaluate_voice_fidelity',
          description: 'Evaluate article content against Alan Hirsch\'s voice fidelity rubric. Returns comprehensive scoring across 8 dimensions with weighted contributions, feedback, and detailed analysis.',
          parameters: z.object({
            articleText: z.string().describe('The full text of the article to evaluate'),
            articleTitle: z.string().optional().describe('Title of the article for context'),
            wordCount: z.number().int().positive().optional().describe('Word count (auto-calculated if not provided)'),
          }),
          execute: async (params) => {
            // This will be called by the agent
            // The actual evaluation logic will be in the tool execution
            return await this.executeEvaluation(params);
          },
          strict: true,
        }),
      ],
      modelSettings: {
        temperature: 0.3, // Lower temperature for more consistent scoring
        topP: 0.9,
      },
    });
  }

  /**
   * Execute voice fidelity evaluation
   */
  async evaluate(
    request: VoiceFidelityEvaluationRequest
  ): Promise<Result<VoiceFidelityEvaluationResponse>> {
    // Validate input
    const validation = VoiceFidelityEvaluationRequestSchema.safeParse(request);
    if (!validation.success) {
      return this.fail('VALIDATION_ERROR', 'Invalid evaluation request', validation.error);
    }

    try {
      // Calculate word count if not provided
      const wordCount = request.wordCount || this.calculateWordCount(request.articleText);
      
      // Run agent evaluation
      const result = await this.agent.run({
        messages: [
          {
            role: 'user',
            content: `Evaluate this article for voice fidelity:

Title: ${request.articleTitle || 'Untitled'}
Word Count: ${wordCount}
Text: ${request.articleText}

Use the evaluate_voice_fidelity tool to perform the evaluation.`,
          },
        ],
      });

      // Extract evaluation from agent response
      // The agent should call the tool and return structured data
      // Parse the tool call result
      const toolCall = result.messages.find(
        (msg: any) => msg.role === 'assistant' && msg.tool_calls?.length > 0
      )?.tool_calls?.[0];

      if (!toolCall || toolCall.name !== 'evaluate_voice_fidelity') {
        return this.fail('AGENT_ERROR', 'Agent did not call evaluation tool');
      }

      // Parse tool result
      const evaluationResult = toolCall.result;
      
      // Validate response
      const responseValidation = VoiceFidelityEvaluationResponseSchema.safeParse({
        ...evaluationResult,
        wordCount,
        evaluatedAt: new Date().toISOString(),
        grade: calculateGrade(evaluationResult.overallScore),
      });

      if (!responseValidation.success) {
        return this.fail('VALIDATION_ERROR', 'Invalid evaluation response', responseValidation.error);
      }

      return this.ok(responseValidation.data);
    } catch (error) {
      return this.fail('EVALUATION_ERROR', 'Failed to evaluate voice fidelity', error);
    }
  }

  /**
   * Calculate word count from text
   */
  private calculateWordCount(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Execute evaluation (called by agent tool)
   */
  private async executeEvaluation(params: {
    articleText: string;
    articleTitle?: string;
    wordCount?: number;
  }): Promise<VoiceFidelityEvaluationResponse> {
    // This is where the actual evaluation logic would go
    // For now, this is a placeholder - the agent will perform the evaluation
    // using the rubric and return structured results
    
    // TODO: Implement actual evaluation logic based on rubric
    // This should:
    // 1. Parse article text
    // 2. Calculate metrics for each dimension
    // 3. Score each dimension (0-100)
    // 4. Apply weights
    // 5. Calculate penalties
    // 6. Generate feedback
    
    // For MVP, the agent will use its instructions to perform the evaluation
    // and return structured JSON that matches VoiceFidelityEvaluationResponseSchema
    
    throw new Error('Evaluation logic to be implemented - agent will perform evaluation');
  }
}

// Export singleton instance
export const voiceFidelityService = new VoiceFidelityService();
```

**Note**: The actual evaluation logic can be implemented in the agent's tool execution, or you can create a separate evaluation engine. For MVP, the agent can perform the evaluation using its instructions and return structured results.

**Validation**:
```bash
pnpm services:check
# Must return: { "status": "LOCKED" }
```

**Reference**: `_docs/type/services.md` - Extend `SimplifiedService`, return `Result<T>`, validate with Zod schemas

---

### Layer 4: API Routes

**Location**: `src/app/api/voice-fidelity/evaluate/route.ts` (NEW FILE)

**Action Required**: Create API route for voice fidelity evaluation

```typescript
// src/app/api/voice-fidelity/evaluate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { voiceFidelityService } from '@/lib/services/simplified/voice-fidelity.service';
import { VoiceFidelityEvaluationRequestSchema } from '@/lib/schemas';
import { z } from 'zod';

/**
 * POST /api/voice-fidelity/evaluate
 * 
 * Evaluates article content for voice fidelity.
 * 
 * Request Body:
 * {
 *   articleText: string (required, min 100 chars)
 *   articleTitle?: string (optional)
 *   wordCount?: number (optional, auto-calculated)
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: VoiceFidelityEvaluationResponse
 * }
 * OR
 * {
 *   error: {
 *     code: string,
 *     message: string
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = VoiceFidelityEvaluationRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request body',
            details: validation.error.errors,
          },
        },
        { status: 400 }
      );
    }

    // Call service
    const result = await voiceFidelityService.evaluate(validation.data);

    // Handle service result
    if (!result.ok) {
      return NextResponse.json(
        {
          error: {
            code: result.error.code || 'EVALUATION_ERROR',
            message: result.error.message || 'Failed to evaluate voice fidelity',
          },
        },
        { status: result.error.code === 'VALIDATION_ERROR' ? 400 : 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Voice fidelity evaluation error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Internal server error',
        },
      },
      { status: 500 }
    );
  }
}
```

**Validation**:
```bash
pnpm routes:check
# Must return: { "status": "VALIDATED" }
```

**Reference**: `_docs/type/routes.md` - Validate inputs with Zod, call services, handle `Result<T>`, return consistent format

---

### Layer 5: React Hooks

**Location**: `src/hooks/voice-fidelity/useVoiceFidelityEvaluation.ts` (NEW FILE)

**Action Required**: Create React hook for voice fidelity evaluation

```typescript
// src/hooks/voice-fidelity/useVoiceFidelityEvaluation.ts

import { useMutation } from '@tanstack/react-query';
import { VoiceFidelityEvaluationRequest, VoiceFidelityEvaluationResponse } from '@/lib/schemas';

/**
 * Query keys for voice fidelity evaluations
 */
export const voiceFidelityKeys = {
  all: ['voice-fidelity'] as const,
  evaluations: () => [...voiceFidelityKeys.all, 'evaluation'] as const,
  evaluation: (request: VoiceFidelityEvaluationRequest) => 
    [...voiceFidelityKeys.evaluations(), request] as const,
};

/**
 * Hook for evaluating voice fidelity
 * 
 * @example
 * const evaluateMutation = useVoiceFidelityEvaluation();
 * 
 * const handleEvaluate = async () => {
 *   const result = await evaluateMutation.mutateAsync({
 *     articleText: content,
 *     articleTitle: title,
 *   });
 *   // result.data contains VoiceFidelityEvaluationResponse
 * };
 */
export function useVoiceFidelityEvaluation() {
  return useMutation({
    mutationFn: async (request: VoiceFidelityEvaluationRequest): Promise<VoiceFidelityEvaluationResponse> => {
      const response = await fetch('/api/voice-fidelity/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to evaluate voice fidelity');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error?.message || 'Evaluation failed');
      }

      return data.data;
    },
    // No cache invalidation needed - evaluations are one-time operations
  });
}
```

**Validation**:
```bash
pnpm hooks:check
# Must return: { "status": "LOCKED" }
```

**Reference**: `_docs/type/hooks.md` - Use React Query, structured query keys, handle errors, convert to thrown errors

---

### Layer 6: UI Components

**Location**: `src/components/voice-fidelity/VoiceFidelityScorecardDrawer.tsx` (NEW FILE)

**Action Required**: Create drawer component to display voice fidelity scorecard

```typescript
// src/components/voice-fidelity/VoiceFidelityScorecardDrawer.tsx

"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { VoiceFidelityEvaluationResponse } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface VoiceFidelityScorecardDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluation: VoiceFidelityEvaluationResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Get color for score
 */
function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Get background color for score badge
 */
function getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" {
  if (score >= 90) return 'default';
  if (score >= 70) return 'secondary';
  return 'destructive';
}

/**
 * Get grade color
 */
function getGradeColor(grade: string): string {
  if (grade.startsWith('A')) return 'text-green-600';
  if (grade.startsWith('B')) return 'text-blue-600';
  if (grade.startsWith('C')) return 'text-yellow-600';
  if (grade.startsWith('D')) return 'text-orange-600';
  return 'text-red-600';
}

export function VoiceFidelityScorecardDrawer({
  open,
  onOpenChange,
  evaluation,
  isLoading = false,
  error = null,
}: VoiceFidelityScorecardDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>Voice Fidelity Scorecard</DrawerTitle>
          <DrawerDescription>
            Evaluation of your article against Alan Hirsch's voice and style
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-3 text-muted-foreground">Evaluating voice fidelity...</span>
            </div>
          )}

          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && evaluation && (
            <div className="space-y-6">
              {/* Overall Score Card */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Overall Voice Fidelity Score</CardTitle>
                    <Badge
                      variant={getScoreBadgeVariant(evaluation.overallScore)}
                      className="text-lg px-4 py-1"
                    >
                      {evaluation.overallScore}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Grade</span>
                      <span className={cn("text-2xl font-bold", getGradeColor(evaluation.grade))}>
                        {evaluation.grade}
                      </span>
                    </div>
                    <Progress value={evaluation.overallScore} className="h-3" />
                  </div>

                  {/* Score Interpretation */}
                  <div className="text-sm text-muted-foreground">
                    {evaluation.overallScore >= 90 && (
                      <p className="text-green-600">Excellent voice fidelity - authentically matches established voice</p>
                    )}
                    {evaluation.overallScore >= 80 && evaluation.overallScore < 90 && (
                      <p className="text-blue-600">Good voice fidelity - minor deviations from established voice</p>
                    )}
                    {evaluation.overallScore >= 70 && evaluation.overallScore < 80 && (
                      <p className="text-yellow-600">Adequate voice fidelity - noticeable deviations but generally aligned</p>
                    )}
                    {evaluation.overallScore >= 60 && evaluation.overallScore < 70 && (
                      <p className="text-orange-600">Poor voice fidelity - significant deviations from established voice</p>
                    )}
                    {evaluation.overallScore < 60 && (
                      <p className="text-red-600">Unacceptable voice fidelity - fails to capture established voice</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Dimension Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Dimension Scores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(evaluation.dimensionScores).map(([dimension, score]) => {
                    const weight = {
                      signatureElements: 25,
                      toneRegister: 20,
                      structuralPatterns: 15,
                      languagePatterns: 15,
                      rhetoricalDevices: 10,
                      thematicAlignment: 8,
                      textualPatterns: 5,
                      criticalViolations: 0, // Penalty, not weighted
                    }[dimension] || 0;

                    const contribution = evaluation.weightedContribution[dimension as keyof typeof evaluation.weightedContribution];

                    return (
                      <div key={dimension} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium capitalize">
                              {dimension.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {weight}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn("text-sm font-bold", getScoreColor(score))}>
                              {score}/100
                            </span>
                            {contribution !== undefined && (
                              <span className="text-xs text-muted-foreground">
                                ({contribution > 0 ? '+' : ''}{contribution.toFixed(1)} pts)
                              </span>
                            )}
                          </div>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Strengths */}
                  {evaluation.feedback.strengths.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Strengths</span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                        {evaluation.feedback.strengths.map((strength, idx) => (
                          <li key={idx} className="list-disc">{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {evaluation.feedback.improvements.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Areas for Improvement</span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                        {evaluation.feedback.improvements.map((improvement, idx) => (
                          <li key={idx} className="list-disc">{improvement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Critical Issues */}
                  {evaluation.feedback.criticalIssues.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Critical Issues</span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                        {evaluation.feedback.criticalIssues.map((issue, idx) => (
                          <li key={idx} className="list-disc">{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

**Integration in ArticleEditorLayout**:

**Location**: `src/components/editor/ArticleEditorLayout.tsx` (MODIFY)

**Action Required**: Integrate voice fidelity evaluation into publish flow

```typescript
// Add to imports
import { useVoiceFidelityEvaluation } from '@/hooks/voice-fidelity/useVoiceFidelityEvaluation';
import { VoiceFidelityScorecardDrawer } from '@/components/voice-fidelity/VoiceFidelityScorecardDrawer';

// Add state for voice fidelity drawer
const [voiceFidelityDrawerOpen, setVoiceFidelityDrawerOpen] = useState(false);
const [voiceFidelityEvaluation, setVoiceFidelityEvaluation] = useState<VoiceFidelityEvaluationResponse | null>(null);

// Add mutation hook
const evaluateVoiceFidelity = useVoiceFidelityEvaluation();

// Modify handlePublish function (add voice fidelity evaluation)
const handlePublish = useCallback(async () => {
  if (!onPublish) return;

  setIsPublishing(true);

  try {
    // [EXISTING SEO EXECUTION CODE - KEEP AS IS]
    // ... existing SEO code ...

    // [NEW] Evaluate voice fidelity (non-blocking, runs in parallel)
    // Extract plain text from TipTap content
    const plainText = extractPlainTextFromTipTap(content);
    
    if (plainText.length >= 100) {
      // Trigger evaluation (don't await - non-blocking)
      evaluateVoiceFidelity.mutate(
        {
          articleText: plainText,
          articleTitle: title.trim(),
        },
        {
          onSuccess: (data) => {
            // Store evaluation result
            setVoiceFidelityEvaluation(data);
            // Open drawer to show scorecard
            setVoiceFidelityDrawerOpen(true);
          },
          onError: (error) => {
            // Log error but don't block publish
            console.error('Voice fidelity evaluation failed:', error);
            // Optionally show toast notification
            toast.error('Voice fidelity evaluation failed, but article will be published');
          },
        }
      );
    }

    // [EXISTING PUBLISH CODE - KEEP AS IS]
    // Step 2: Normalize content and prepare publish data
    const normalizedContent = normalizeHtml(content);
    const finalSlug = slug || generateSlug(title);
    // ... rest of existing publish code ...
    
    await onPublish({
      // ... existing publish payload ...
    });
  } catch (error) {
    console.error("Publish failed:", error);
    toast.error(error instanceof Error ? error.message : "Failed to publish");
    throw error;
  } finally {
    setIsPublishing(false);
  }
}, [
  // ... existing dependencies ...
  evaluateVoiceFidelity,
]);

// Helper function to extract plain text from TipTap HTML
function extractPlainTextFromTipTap(html: string): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ');
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // Clean up whitespace
  return decoded.replace(/\s+/g, ' ').trim();
}

// Add drawer component to JSX (after PublishSheet)
return (
  <div>
    {/* ... existing JSX ... */}
    
    {/* Voice Fidelity Scorecard Drawer */}
    <VoiceFidelityScorecardDrawer
      open={voiceFidelityDrawerOpen}
      onOpenChange={setVoiceFidelityDrawerOpen}
      evaluation={voiceFidelityEvaluation}
      isLoading={evaluateVoiceFidelity.isPending}
      error={evaluateVoiceFidelity.error?.message || null}
    />
  </div>
);
```

**Validation**:
```bash
pnpm ui:check
# Must return: { "status": "VALIDATED" }
```

**Reference**: `_docs/type/ui.md` - Use hooks for data fetching, handle loading/error states, derive types from schemas

---

## Integration Checklist

### Pre-Implementation
- [ ] Review `_docs/voice-style/VOICE_FIDELITY_RUBRIC_PLAN.md` for complete rubric specification
- [ ] Review `_docs/voice-style/README.md` for voice characteristics
- [ ] Review existing publish flow in `ArticleEditorLayout.tsx`
- [ ] Review OpenAI Agents SDK documentation (`_docs/agents/MASTER_AGENTS_SDK_DOC.md`)

### Layer 1: Database (Optional)
- [ ] Add `voiceFidelityEvaluations` table to schema (if historical tracking needed)
- [ ] Generate migration: `pnpm drizzle:gen`
- [ ] Apply migration: `pnpm drizzle:push`
- [ ] Validate: `pnpm db:check` → `"status": "LOCKED"`

### Layer 2: Zod Schemas
- [ ] Add request/response schemas to `src/lib/schemas/index.ts`
- [ ] Add `calculateGrade` helper function
- [ ] Export all required types
- [ ] Validate: `pnpm contracts:check` → `"status": "LOCKED"`

### Layer 3: Services
- [ ] Create `src/lib/services/simplified/voice-fidelity.service.ts`
- [ ] Implement `VoiceFidelityService` class extending `SimplifiedService`
- [ ] Configure OpenAI Agent with evaluation tool
- [ ] Implement evaluation logic (or delegate to agent)
- [ ] Validate: `pnpm services:check` → `"status": "LOCKED"`

### Layer 4: API Routes
- [ ] Create `src/app/api/voice-fidelity/evaluate/route.ts`
- [ ] Implement POST handler with validation
- [ ] Call service and handle `Result<T>`
- [ ] Return consistent response format
- [ ] Validate: `pnpm routes:check` → `"status": "VALIDATED"`

### Layer 5: React Hooks
- [ ] Create `src/hooks/voice-fidelity/useVoiceFidelityEvaluation.ts`
- [ ] Implement mutation hook with React Query
- [ ] Define structured query keys
- [ ] Handle errors properly
- [ ] Validate: `pnpm hooks:check` → `"status": "LOCKED"`

### Layer 6: UI Components
- [ ] Create `src/components/voice-fidelity/VoiceFidelityScorecardDrawer.tsx`
- [ ] Implement drawer with color-coded score display
- [ ] Show grade, dimension scores, feedback
- [ ] Add loading and error states
- [ ] Integrate into `ArticleEditorLayout.tsx`
- [ ] Add `extractPlainTextFromTipTap` helper
- [ ] Modify `handlePublish` to trigger evaluation (non-blocking)
- [ ] Validate: `pnpm ui:check` → `"status": "VALIDATED"`

### Testing
- [ ] Test publish flow with voice fidelity evaluation
- [ ] Verify drawer opens after publish click
- [ ] Verify score displays correctly
- [ ] Verify color coding works (green/blue/yellow/orange/red)
- [ ] Verify non-blocking behavior (publish continues even if evaluation fails)
- [ ] Test with articles of different lengths
- [ ] Test error handling

### Final Validation
- [ ] Run `pnpm validate:all` - all layers must pass
- [ ] Verify no breaking changes to existing publish flow
- [ ] Test in browser with Chrome DevTools MCP
- [ ] Verify agent evaluation accuracy against rubric

---

## Critical Implementation Notes

### 1. Non-Blocking Evaluation
The voice fidelity evaluation must NOT block the publish flow. Use `mutate` (not `mutateAsync`) and handle success/error in callbacks. The publish operation should continue regardless of evaluation status.

### 2. Plain Text Extraction
The evaluation only analyzes the written text. Extract plain text from TipTap HTML content, removing all formatting, HTML tags, and preserving only the actual text content.

### 3. Agent Tool Implementation
The agent's `evaluate_voice_fidelity` tool should perform the actual evaluation using the rubric. The tool can:
- Parse the article text
- Calculate metrics for each dimension
- Score each dimension (0-100)
- Apply weights
- Calculate penalties
- Generate feedback

Alternatively, you can implement the evaluation logic in the service and have the agent format the results.

### 4. Color Coding
- **90-100 (A range)**: Green - Excellent voice fidelity
- **80-89 (B range)**: Blue - Good voice fidelity
- **70-79 (C range)**: Yellow - Adequate voice fidelity
- **60-69 (D range)**: Orange - Poor voice fidelity
- **0-59 (F)**: Red - Unacceptable voice fidelity

### 5. Grade Calculation
Use the `calculateGrade` helper function to convert scores (0-100) to letter grades (A+ to F).

### 6. Error Handling
- If evaluation fails, log error but don't block publish
- Show error in drawer if evaluation fails
- Optionally show toast notification for errors

### 7. Performance
- Evaluation runs asynchronously (non-blocking)
- Consider caching evaluation results if same content is evaluated multiple times
- Evaluation may take 10-30 seconds depending on article length

---

## Reference Documentation

### Voice Fidelity Rubric
- `_docs/voice-style/VOICE_FIDELITY_RUBRIC_PLAN.md` - Complete rubric specification
- `_docs/voice-style/00-EXECUTIVE-SUMMARY.md` - Overview and key findings
- `_docs/voice-style/01-20-PARAMETER-ANALYSIS.md` - Quantified voice metrics
- `_docs/voice-style/05-VOICE-SIGNATURE.md` - Definitive voice profile
- `_docs/voice-style/06-STYLE-GUIDE.md` - Practical guidelines
- `_docs/voice-style/07-TEXTUAL-PATTERNS.md` - Sentence structure patterns
- `_docs/voice-style/09-ANTITHESIS-PROHIBITION.md` - Critical constraints

### Type Safety Architecture
- `_docs/type/TYPE_SAFETY.md` - Master guide (Single Source of Truth)
- `_docs/type/drizzle-schema.md` - Layer 1 requirements
- `_docs/type/zod-schemas.md` - Layer 2 requirements
- `_docs/type/services.md` - Layer 3 requirements
- `_docs/type/routes.md` - Layer 4 requirements
- `_docs/type/hooks.md` - Layer 5 requirements
- `_docs/type/ui.md` - Layer 6 requirements

### Agent Architecture
- `_docs/agents/MASTER_AGENTS_SDK_DOC.md` - OpenAI Agents SDK guide
- `_docs/site-agents/README.md` - Agent system overview
- `_docs/site-agents/MAIN_PROJECT_AGENT_INVENTORY.md` - Existing agents

### Existing Components
- `src/components/editor/ArticleEditorLayout.tsx` - Article editor layout
- `src/components/editor/PublishSheet.tsx` - Publish sheet component
- `src/components/voice/VoiceAnalysisPanel.tsx` - Existing voice analysis (reference)

---

## Success Criteria

✅ **Functional Requirements**
- Voice fidelity evaluation triggers when publish button is clicked
- Evaluation analyzes TipTap editor content (plain text)
- Scorecard drawer opens after publish click
- Color-coded score/grade displays correctly
- Publish flow continues normally (non-blocking)

✅ **Technical Requirements**
- All six layers implemented and validated
- No breaking changes to existing functionality
- Type safety maintained throughout
- Error handling implemented
- Performance acceptable (non-blocking)

✅ **User Experience**
- Clear visual feedback (color-coded score)
- Intuitive drawer interface
- Helpful feedback (strengths, improvements, critical issues)
- Non-intrusive (doesn't block publish)

---

**Last Updated**: January 2025  
**Status**: Ready for Implementation  
**Next Steps**: Follow layer-by-layer implementation guide above
