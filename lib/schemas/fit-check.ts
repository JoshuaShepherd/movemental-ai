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
  { id: MOVEMENT_LEADER, label: 'I am a movement leader.' },
  {
    id: MDNA,
    label: "I'm aligned with mDNA—the six components of apostolic movement.",
    tooltip: 'mDNA: Jesus is Lord, disciple-making, missional-incarnational impulse, apostolic ministry, organic systems, communitas. Shorthand for movement-oriented, embodied practice.',
  },
  { id: CREATE_CONTENT, label: 'I create and publish content (teaching, writing, courses, talks).' },
  {
    id: CONTENT_NOT_MULTIPLYING,
    label: "My content isn't really online, or it's online in a way that doesn't multiply or move.",
    tooltip: "e.g. scattered across platforms, locked in PDFs or events only, or published in isolation so it doesn't compound or spread.",
  },
  {
    id: LOW_MONEY,
    label: "I don't have much income or budget from my content work.",
  },
  {
    id: TIME_STEWARDSHIP,
    label: "I'm short on time—busy with embodied ministry and presence, not just content.",
  },
]

// ============================================
// Recognition Options — Organization (same gist)
// ============================================

export const RECOGNITION_OPTIONS_ORGANIZATION: RecognitionOption[] = [
  { id: MOVEMENT_LEADER, label: 'We are a movement-oriented organization.' },
  {
    id: MDNA,
    label: "We're aligned with mDNA—the six components of apostolic movement.",
    tooltip: 'mDNA: Jesus is Lord, disciple-making, missional-incarnational impulse, apostolic ministry, organic systems, communitas.',
  },
  { id: CREATE_CONTENT, label: 'We create and publish content (resources, training, curricula).' },
  {
    id: CONTENT_NOT_MULTIPLYING,
    label: "Our content isn't really online, or it's online in a way that doesn't multiply or move.",
    tooltip: "e.g. scattered across platforms, locked in events or internal use, or published in isolation so it doesn't compound.",
  },
  {
    id: LOW_MONEY,
    label: "We don't have much budget for content and distribution.",
  },
  {
    id: TIME_STEWARDSHIP,
    label: "We're stretched—embodied presence and mission take priority over content and platform work.",
  },
]

/** Options for the current context (individual or organization). */
export function getRecognitionOptions(context: SelfScreenContext): RecognitionOption[] {
  return context === 'organization' ? RECOGNITION_OPTIONS_ORGANIZATION : RECOGNITION_OPTIONS_INDIVIDUAL
}

// ============================================
// Pathway Logic
// ============================================
// Full fit: any 2 of 3 core (movement leader, mDNA, create content). Rationale:
// - ML + mDNA only: right person; we help them start or grow content.
// - ML + content only: practice matches; mDNA may be language/articulation we help with.
// - mDNA + content only: same theology and content; "movement leader" may be identity they don't claim yet.
// We do not require content-not-multiplying or constraint (low money / time)—those describe how we serve them.
// Content no movement: exactly one core (e.g. content only). Affinity: no core options selected.

export function getPathway(selectedIds: string[]): Pathway {
  const set = new Set(selectedIds)
  const hasMovementLeader = set.has(MOVEMENT_LEADER)
  const hasMdna = set.has(MDNA)
  const hasCreateContent = set.has(CREATE_CONTENT)

  const coreCount = [hasMovementLeader, hasMdna, hasCreateContent].filter(Boolean).length
  const isFullFit = coreCount >= 2

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
      body: "We're built for movement leaders and mDNA-aligned creators—whether you're already publishing content or ready to get it moving. Next step: create an account so we can get you moving.",
      primaryCta: { label: 'Create an account', action: 'share-name' },
      secondaryCta: { label: 'Learn more first', href: '/why-movemental' },
    }
  }
  if (pathway === 'content-no-movement') {
    return {
      headline: "You create content—we're just not in the same niche yet.",
      body: "Right now we're focused on a specific slice: mDNA-aligned movement leaders whose content isn't multiplying and who have limited budget or time. We don't yet offer much for creators outside that slice, but we're glad you're here.",
      links: [
        { label: 'Explore the Book', href: '/learn' },
        { label: 'Read Why Movemental', href: '/why-movemental' },
        { label: 'Full message & next steps', href: '/not-a-fit/content' },
      ],
    }
  }
  // affinity
  return {
    headline: "You're in the right neighborhood.",
    body: "You may not create content or lead a movement the way we're built for—but we want to take care of you. Explore our writers and resources; we'll keep saying clearly who we're focused on.",
    links: [
      { label: 'Explore the Book', href: '/learn' },
      { label: 'Read Why Movemental', href: '/why-movemental' },
      { label: 'About Us', href: '/about' },
      { label: 'Full message & next steps', href: '/not-a-fit/affinity' },
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
  "We use your answers to route you: full fit, content creator outside our niche, or friend of the house."
export const NAME_STEP_TRANSPARENCY =
  'We do a bit of research before we talk so we can be useful.'
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
