import { z } from 'zod'

// ============================================
// Fit Check Types and Schemas
// ============================================

/**
 * Question types supported in the Fit Check assessment
 */
export const QuestionTypeSchema = z.enum([
  'likert',      // 5-point scale (Definitely → Definitely Not)
  'numeric',     // 0-10 NPS-style scale
  'single',      // Single select card options
  'visual',      // Image + label card selection
])

export type QuestionType = z.infer<typeof QuestionTypeSchema>

/**
 * Individual answer option
 */
export const AnswerOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  shortcut: z.string().optional(), // Keyboard shortcut (A, B, C, etc.)
  description: z.string().optional(),
  imageUrl: z.string().optional(), // For visual question types
})

export type AnswerOption = z.infer<typeof AnswerOptionSchema>

/**
 * Question definition
 */
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

/**
 * User response to a question
 */
export const QuestionResponseSchema = z.object({
  questionId: z.string(),
  selectedOptionId: z.string(),
  value: z.number(),
  timestamp: z.date(),
})

export type QuestionResponse = z.infer<typeof QuestionResponseSchema>

/**
 * Fit Check result tiers
 */
export const FitResultTierSchema = z.enum([
  'tier1',    // 85-100 points: Ideal fit
  'tier2',    // 70-84 points: Good fit
  'tier3',    // 55-69 points: Potential fit with development
  'non-fit',  // Below 55: Not a fit
])

export type FitResultTier = z.infer<typeof FitResultTierSchema>

/**
 * Complete Fit Check assessment result
 */
export const FitCheckResultSchema = z.object({
  totalScore: z.number(),
  maxPossibleScore: z.number(),
  percentageScore: z.number(),
  tier: FitResultTierSchema,
  responses: z.array(QuestionResponseSchema),
  completedAt: z.date(),
  timeToComplete: z.number(), // in seconds
})

export type FitCheckResult = z.infer<typeof FitCheckResultSchema>

/**
 * Assessment state for managing the flow
 */
export const AssessmentStateSchema = z.enum([
  'landing',
  'in-progress',
  'results',
])

export type AssessmentState = z.infer<typeof AssessmentStateSchema>

// ============================================
// Fit Check Questions Data
// ============================================

export const FIT_CHECK_QUESTIONS: FitCheckQuestion[] = [
  {
    id: 'movement-alignment',
    type: 'likert',
    category: 'Movement Alignment',
    question: 'Does your work focus on catalyzing lasting change through incarnational theology and movement practice?',
    subtext: 'This includes missional living, church planting, discipleship movements, and embodied faith practices.',
    options: [
      { id: 'ma-5', label: 'Definitely', value: 20, shortcut: 'A' },
      { id: 'ma-4', label: 'Mostly', value: 16, shortcut: 'B' },
      { id: 'ma-3', label: 'Somewhat', value: 10, shortcut: 'C' },
      { id: 'ma-2', label: 'Not really', value: 5, shortcut: 'D' },
      { id: 'ma-1', label: 'Not at all', value: 0, shortcut: 'E' },
    ],
    required: true,
  },
  {
    id: 'audience-size',
    type: 'single',
    category: 'Audience Size',
    question: 'What is your current combined audience size across all platforms?',
    subtext: 'Include email list, social media followers, podcast listeners, etc.',
    options: [
      { id: 'as-5', label: '25,000+', value: 20, shortcut: 'A', description: 'Large established audience' },
      { id: 'as-4', label: '10,000 - 25,000', value: 18, shortcut: 'B', description: 'Growing significant reach' },
      { id: 'as-3', label: '3,000 - 10,000', value: 15, shortcut: 'C', description: 'Solid foundation' },
      { id: 'as-2', label: '1,000 - 3,000', value: 8, shortcut: 'D', description: 'Building momentum' },
      { id: 'as-1', label: 'Under 1,000', value: 3, shortcut: 'E', description: 'Just starting out' },
    ],
    required: true,
  },
  {
    id: 'content-quality',
    type: 'likert',
    category: 'Content Quality',
    question: 'How consistently do you create valuable content for your audience?',
    subtext: 'Consider articles, podcasts, videos, books, courses, or speaking engagements.',
    options: [
      { id: 'cq-5', label: 'Very consistently', value: 15, shortcut: 'A', description: 'Multiple pieces per week' },
      { id: 'cq-4', label: 'Regularly', value: 12, shortcut: 'B', description: 'Weekly content' },
      { id: 'cq-3', label: 'Sometimes', value: 8, shortcut: 'C', description: 'Monthly content' },
      { id: 'cq-2', label: 'Occasionally', value: 4, shortcut: 'D', description: 'A few times per year' },
      { id: 'cq-1', label: 'Rarely', value: 0, shortcut: 'E', description: 'Sporadic or none' },
    ],
    required: true,
  },
  {
    id: 'revenue-potential',
    type: 'single',
    category: 'Revenue Potential',
    question: 'How do you currently generate revenue from your thought leadership?',
    subtext: 'Select the option that best describes your primary revenue source.',
    options: [
      { id: 'rp-5', label: 'Multiple streams', value: 20, shortcut: 'A', description: 'Books, courses, consulting, speaking' },
      { id: 'rp-4', label: 'One established stream', value: 15, shortcut: 'B', description: 'Primary revenue source working' },
      { id: 'rp-3', label: 'Starting to monetize', value: 10, shortcut: 'C', description: 'Early revenue experiments' },
      { id: 'rp-2', label: 'Planning to monetize', value: 5, shortcut: 'D', description: 'Have a plan, not yet executed' },
      { id: 'rp-1', label: 'Not a priority', value: 0, shortcut: 'E', description: 'Content is ministry/service only' },
    ],
    required: true,
  },
  {
    id: 'platform-ownership',
    type: 'numeric',
    category: 'Platform Ownership',
    question: 'How important is owning your digital platform versus relying on third-party platforms?',
    subtext: '0 = Not important (happy with social media only) → 10 = Critical (want full ownership)',
    options: Array.from({ length: 11 }, (_, i) => ({
      id: `po-${i}`,
      label: `${i}`,
      value: Math.round((i / 10) * 15), // Scale 0-15 points
      shortcut: i.toString(),
    })),
    required: true,
  },
  {
    id: 'network-value',
    type: 'likert',
    category: 'Network Value',
    question: 'How valuable would connecting and collaborating with other movement leaders be for your work?',
    subtext: 'Consider cross-promotion, co-creation, and network effects.',
    options: [
      { id: 'nv-5', label: 'Extremely valuable', value: 10, shortcut: 'A' },
      { id: 'nv-4', label: 'Very valuable', value: 8, shortcut: 'B' },
      { id: 'nv-3', label: 'Somewhat valuable', value: 5, shortcut: 'C' },
      { id: 'nv-2', label: 'Slightly valuable', value: 2, shortcut: 'D' },
      { id: 'nv-1', label: 'Not valuable', value: 0, shortcut: 'E' },
    ],
    required: true,
  },
]

// ============================================
// Scoring Utilities
// ============================================

export const MAX_POSSIBLE_SCORE = 100 // Sum of max values for all questions

export function calculateFitResult(responses: QuestionResponse[]): FitCheckResult {
  const totalScore = responses.reduce((sum, r) => sum + r.value, 0)
  const percentageScore = Math.round((totalScore / MAX_POSSIBLE_SCORE) * 100)
  
  let tier: FitResultTier
  if (percentageScore >= 85) {
    tier = 'tier1'
  } else if (percentageScore >= 70) {
    tier = 'tier2'
  } else if (percentageScore >= 55) {
    tier = 'tier3'
  } else {
    tier = 'non-fit'
  }

  const startTime = responses[0]?.timestamp
  const endTime = responses[responses.length - 1]?.timestamp
  const timeToComplete = startTime && endTime 
    ? Math.round((endTime.getTime() - startTime.getTime()) / 1000)
    : 0

  return {
    totalScore,
    maxPossibleScore: MAX_POSSIBLE_SCORE,
    percentageScore,
    tier,
    responses,
    completedAt: new Date(),
    timeToComplete,
  }
}

export function getTierInfo(tier: FitResultTier) {
  switch (tier) {
    case 'tier1':
      return {
        title: 'Ideal Fit',
        subtitle: 'You\'re exactly who Movemental is built for',
        description: 'Your alignment with movement leadership, audience reach, and platform ownership mindset make you an ideal candidate for Movemental.',
        isFit: true,
        ctaText: 'Continue to Why Movemental',
        ctaHref: '/why-movemental',
      }
    case 'tier2':
      return {
        title: 'Strong Fit',
        subtitle: 'Movemental could accelerate your mission',
        description: 'You have strong foundations in place. Movemental\'s platform and network effects could significantly amplify your impact.',
        isFit: true,
        ctaText: 'Continue to Why Movemental',
        ctaHref: '/why-movemental',
      }
    case 'tier3':
      return {
        title: 'Potential Fit',
        subtitle: 'Some alignment, with room to grow',
        description: 'You show potential alignment with Movemental\'s vision. We\'d recommend learning more about our approach before committing.',
        isFit: true,
        ctaText: 'Learn More About Movemental',
        ctaHref: '/why-movemental',
      }
    case 'non-fit':
      return {
        title: 'Not the Right Fit',
        subtitle: 'Movemental may not be what you need right now',
        description: 'Based on your responses, Movemental might not be the best fit for your current situation. That\'s okay—we want to serve the right people well, not everyone poorly.',
        isFit: false,
        ctaText: 'Explore Alternative Resources',
        ctaHref: '/resources',
      }
  }
}
