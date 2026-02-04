import { z } from 'zod'

// ============================================
// Recognition Gate Types and Schemas
// ============================================
// Replaces the former "Fit Check" qualification model with a recognition-based
// alignment gate: "Is Movemental Built for You?" — confirmation, not scoring.

/**
 * Single recognition statement (multi-select checklist item)
 */
export const RecognitionOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
})

export type RecognitionOption = z.infer<typeof RecognitionOptionSchema>

/**
 * Assessment state for the flow
 */
export const AssessmentStateSchema = z.enum([
  'landing',
  'in-progress',  // single recognition step
  'results',
  'name-step',   // post-gate: name + optional body of work (recognized only)
])

export type AssessmentState = z.infer<typeof AssessmentStateSchema>

/**
 * Result of the recognition gate (no score, no tiers)
 */
export const RecognitionResultSchema = z.object({
  recognized: z.boolean(),
  selectedIds: z.array(z.string()),
  completedAt: z.date(),
})

export type RecognitionResult = z.infer<typeof RecognitionResultSchema>

// ============================================
// Recognition Options (Copy SSOT)
// ============================================

export const RECOGNITION_OPTIONS: RecognitionOption[] = [
  { id: 'movement-leader', label: "I've helped lead or catalyze a movement, not just an organization" },
  { id: 'incarnational', label: 'My work is rooted in incarnational theology and lived practice' },
  { id: 'body-of-work', label: 'I already have a body of work (books, sermons, teaching, writing, courses, talks, PDFs, etc.)' },
  { id: 'depth-travel', label: "People often tell me my work has depth, but it doesn't travel easily" },
  { id: 'faithfulness', label: 'I care more about faithfulness and longevity than growth hacks or virality' },
]

// ============================================
// Copy for Results Screen (Config-Driven)
// ============================================

export interface RecognitionResultCopy {
  headline: string
  body: string
  primaryCta?: { label: string; action: 'share-name' }
  secondaryCta?: { label: string; href: string }
  links?: Array< { label: string; href: string } >
}

export function getRecognitionResultCopy(recognized: boolean): RecognitionResultCopy {
  if (recognized) {
    return {
      headline: 'Then we should probably talk.',
      body: "Movemental is intentionally built for a narrow group of leaders. If you recognized yourself above, the next step isn't onboarding — it's conversation.",
      primaryCta: { label: 'Share your name & body of work', action: 'share-name' },
      secondaryCta: { label: "I'm not sure — help me discern", href: '/why-movemental' },
    }
  }
  return {
    headline: "Movemental may not be for you — and that's okay.",
    body: "Movemental is intentionally narrow right now. If you're curious, you're welcome to explore — but we don't want to pretend this is for everyone.",
    links: [
      { label: 'Explore the Book', href: '/learn' },
      { label: 'Read Why Movemental', href: '/why-movemental' },
    ],
  }
}

// ============================================
// Threshold Logic (No Scoring)
// ============================================

export function isRecognized(selectedIds: string[]): boolean {
  return selectedIds.length >= 1
}

// ============================================
// Name Step (Post-Gate, Recognized Only)
// ============================================

export const RecognitionNameStepSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bodyOfWork: z.string().optional(),
})
export type RecognitionNameStep = z.infer<typeof RecognitionNameStepSchema>

export const RECOGNITION_PROMPT =
  'Movemental is built for leaders who recognize themselves in at least one of the following.'
export const RECOGNITION_MICROCOPY =
  "You don't need to select all of these. Recognition, not perfection."
export const NAME_STEP_TRANSPARENCY =
  'We do a bit of research before we talk so we can meet you well.'

// ============================================
// Legacy Exports (for minimal breaking change)
// ============================================
// FitCheckQuestion, AnswerOption, etc. are no longer used by the recognition flow.
// Kept for any external imports; can be removed once callers are updated.

export const QuestionTypeSchema = z.enum(['likert', 'numeric', 'single', 'visual'])
export type QuestionType = z.infer<typeof QuestionTypeSchema>

export const AnswerOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  shortcut: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
})
export type AnswerOption = z.infer<typeof AnswerOptionSchema>

export const FitCheckQuestionSchema = z.object({
  id: z.string(),
  type: QuestionTypeSchema,
  category: z.string(),
  question: z.string(),
  subtext: z.string().optional(),
  options: z.array(AnswerOptionSchema),
  required: z.boolean().default(true),
})
export type FitCheckQuestion = z.infer<typeof FitCheckQuestionSchema>

export const QuestionResponseSchema = z.object({
  questionId: z.string(),
  selectedOptionId: z.string(),
  value: z.number(),
  timestamp: z.date(),
})
export type QuestionResponse = z.infer<typeof QuestionResponseSchema>
