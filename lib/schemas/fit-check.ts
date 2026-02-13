import { z } from 'zod'

// ============================================
// Self-Screen (Movement Leader Fit) Types and Schemas
// ============================================
// Single-question multi-select: "Is Movemental built for you?" with three pathways:
// Full Fit → create account; Content No Movement → publish content but not our niche; Affinity → care for them, communicate focus.

export const SelfScreenContextSchema = z.enum(['individual', 'organization'])
export type SelfScreenContext = z.infer<typeof SelfScreenContextSchema>

/**
 * Single recognition statement (multi-select checklist item). Optional tooltip for mDNA, content-not-multiplying, etc.
 */
export const RecognitionOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  tooltip: z.string().optional(),
})

export type RecognitionOption = z.infer<typeof RecognitionOptionSchema>

/**
 * Assessment state for the flow
 */
export const AssessmentStateSchema = z.enum([
  'landing',
  'in-progress',
  'results',
  'name-step', // full-fit only: create account / share name
])

export type AssessmentState = z.infer<typeof AssessmentStateSchema>

/**
 * Pathway result: full-fit (create account), content-no-movement, or affinity
 */
export const PathwaySchema = z.enum(['full-fit', 'content-no-movement', 'affinity'])
export type Pathway = z.infer<typeof PathwaySchema>

/**
 * Result of the self-screen
 */
export const RecognitionResultSchema = z.object({
  pathway: PathwaySchema,
  selectedIds: z.array(z.string()),
  completedAt: z.date(),
})

export type RecognitionResult = z.infer<typeof RecognitionResultSchema>

// ============================================
// Recognition Options (Copy SSOT) — Individual
// ============================================

const MOVEMENT_LEADER = 'movement-leader'
const MDNA = 'mdna'
const CREATE_CONTENT = 'create-content'
const CONTENT_NOT_MULTIPLYING = 'content-not-multiplying'
const LOW_MONEY = 'low-money'
const TIME_STEWARDSHIP = 'time-stewardship'

export const RECOGNITION_OPTIONS_INDIVIDUAL: RecognitionOption[] = [
  { id: MOVEMENT_LEADER, label: 'I am considered a movement leader.' },
  {
    id: MDNA,
    label: "I'm aligned with mDNA (movement DNA)—the six components of apostolic movement.",
    tooltip: 'mDNA: Jesus is Lord, disciple-making, missional-incarnational impulse, apostolic ministry, organic systems, communitas. We use this as a shorthand for movement-oriented, embodied practice.',
  },
  { id: CREATE_CONTENT, label: 'I create and publish content (teaching, writing, courses, talks, etc.).' },
  {
    id: CONTENT_NOT_MULTIPLYING,
    label: "My content isn't really online, or it's online in a way that doesn't lead to multiplication and movement.",
    tooltip: "e.g. scattered across platforms, locked in PDFs or live events only, or published in isolation so it doesn't compound or spread.",
  },
  {
    id: LOW_MONEY,
    label: "There isn't much income or budget from my content work.",
  },
  {
    id: TIME_STEWARDSHIP,
    label: "I feel time constraints—both because I'm busy and because of stewardship (embodied ministry and presence vs. content creation).",
  },
]

// ============================================
// Recognition Options — Organization (same gist)
// ============================================

export const RECOGNITION_OPTIONS_ORGANIZATION: RecognitionOption[] = [
  { id: MOVEMENT_LEADER, label: 'We are considered a movement-oriented organization.' },
  {
    id: MDNA,
    label: "We're aligned with mDNA—the six components of apostolic movement.",
    tooltip: 'mDNA: Jesus is Lord, disciple-making, missional-incarnational impulse, apostolic ministry, organic systems, communitas.',
  },
  { id: CREATE_CONTENT, label: 'We create and publish content (resources, training, curricula, etc.).' },
  {
    id: CONTENT_NOT_MULTIPLYING,
    label: "Our content isn't really online, or it's online in a way that doesn't lead to multiplication and movement.",
    tooltip: "e.g. scattered across platforms, locked in events or internal use, or published in isolation so it doesn't compound.",
  },
  {
    id: LOW_MONEY,
    label: "We don't have much income or budget dedicated to content and distribution.",
  },
  {
    id: TIME_STEWARDSHIP,
    label: "We feel time and stewardship constraints—embodied presence and mission vs. content and platform work.",
  },
]

/** Options for the current context (individual or organization). */
export function getRecognitionOptions(context: SelfScreenContext): RecognitionOption[] {
  return context === 'organization' ? RECOGNITION_OPTIONS_ORGANIZATION : RECOGNITION_OPTIONS_INDIVIDUAL
}

// ============================================
// Pathway Logic
// ============================================
// Full fit: movement leader + mDNA + create content + (content not multiplying) + (low money or time/stewardship).
// Content no movement: create content but not full fit (e.g. not our niche).
// Affinity: don't create content or don't have movement—we still want to care for them.

export function getPathway(selectedIds: string[]): Pathway {
  const set = new Set(selectedIds)
  const hasMovementLeader = set.has(MOVEMENT_LEADER)
  const hasMdna = set.has(MDNA)
  const hasCreateContent = set.has(CREATE_CONTENT)
  const hasContentNotMultiplying = set.has(CONTENT_NOT_MULTIPLYING)
  const hasLowMoney = set.has(LOW_MONEY)
  const hasTimeStewardship = set.has(TIME_STEWARDSHIP)

  const isFullFit =
    hasMovementLeader &&
    hasMdna &&
    hasCreateContent &&
    hasContentNotMultiplying &&
    (hasLowMoney || hasTimeStewardship)

  if (isFullFit) return 'full-fit'
  if (hasCreateContent) return 'content-no-movement'
  return 'affinity'
}

// ============================================
// Copy for Results Screen (Config-Driven)
// ============================================

export interface RecognitionResultCopy {
  headline: string
  body: string
  primaryCta?: { label: string; action: 'share-name' }
  secondaryCta?: { label: string; href: string }
  links?: Array<{ label: string; href: string }>
}

export function getRecognitionResultCopy(pathway: Pathway): RecognitionResultCopy {
  if (pathway === 'full-fit') {
    return {
      headline: "You're a full fit.",
      body: "We're focused on movement leaders like you—embodied practice, content that could multiply, and real constraints on time and budget. The next step is to create an account so we can get you moving.",
      primaryCta: { label: 'Create an account', action: 'share-name' },
      secondaryCta: { label: 'Learn more first', href: '/why-movemental' },
    }
  }
  if (pathway === 'content-no-movement') {
    return {
      headline: "You create content—we're just not in the same niche yet.",
      body: "Right now we're focused on a specific slice of movement leaders (mDNA-aligned, content that isn't multiplying, limited budget/time). We're not sure yet what we'll offer for creators outside that focus, but we're glad you're here.",
      links: [
        { label: 'Explore the Book', href: '/learn' },
        { label: 'Read Why Movemental', href: '/why-movemental' },
      ],
    }
  }
  // affinity
  return {
    headline: "You're in the right neighborhood.",
    body: "You might not create content or lead a movement in the way we're built for—but we want to take care of you. Explore our writers and resources; we'll keep communicating who we're focused on so you're never in the dark.",
    links: [
      { label: 'Explore the Book', href: '/learn' },
      { label: 'Read Why Movemental', href: '/why-movemental' },
      { label: 'About Us', href: '/about' },
    ],
  }
}

// Legacy: recognized = full-fit only (for any code that still checks boolean)
export function isRecognized(selectedIds: string[]): boolean {
  return getPathway(selectedIds) === 'full-fit'
}

// ============================================
// Name Step (Post-Gate, Recognized Only)
// ============================================

export const RecognitionNameStepSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bodyOfWork: z.string().optional(),
})
export type RecognitionNameStep = z.infer<typeof RecognitionNameStepSchema>

export const RECOGNITION_PROMPT_INDIVIDUAL =
  'Which of these describe you? Select all that apply.'
export const RECOGNITION_PROMPT_ORGANIZATION =
  'Which of these describe your organization? Select all that apply.'
export function getRecognitionPrompt(context: SelfScreenContext): string {
  return context === 'organization' ? RECOGNITION_PROMPT_ORGANIZATION : RECOGNITION_PROMPT_INDIVIDUAL
}
export const RECOGNITION_MICROCOPY =
  "We use your answers to point you to the right next step—full fit, content creator outside our niche, or friend of the house."
export const NAME_STEP_TRANSPARENCY =
  'We do a bit of research before we talk so we can meet you well.'
// Legacy alias
export const RECOGNITION_PROMPT = RECOGNITION_PROMPT_INDIVIDUAL

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
