import { z } from 'zod'

// ============================================
// Onboarding Path Types and Schemas
// ============================================

/**
 * Phase status for returning users
 */
export const PhaseStatusSchema = z.enum([
  'upcoming',
  'current',
  'completed',
])

export type PhaseStatus = z.infer<typeof PhaseStatusSchema>

/**
 * Individual activity within a phase
 */
export const PhaseActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

export type PhaseActivity = z.infer<typeof PhaseActivitySchema>

/**
 * Onboarding phase definition
 */
export const OnboardingPhaseSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  timeEstimate: z.string(),
  weekRange: z.string(),
  icon: z.string(), // Lucide icon name
  activities: z.array(PhaseActivitySchema),
  status: PhaseStatusSchema.default('upcoming'),
})

export type OnboardingPhase = z.infer<typeof OnboardingPhaseSchema>

// ============================================
// Onboarding Path Data
// ============================================

export const ONBOARDING_PHASES: OnboardingPhase[] = [
  {
    id: 'discovery',
    number: 1,
    title: 'Discovery & Vision',
    subtitle: 'Establishing Your Foundation',
    description: 'We begin by understanding who you are, your movement context, and your vision for the platform. This phase aligns your identity with Movemental\'s capabilities.',
    timeEstimate: '2-3 sessions',
    weekRange: 'Week 1',
    icon: 'Compass',
    activities: [
      {
        id: 'd1',
        title: 'Core Identity Exploration',
        description: 'Deep dive into your movement theology, leadership style, and unique voice',
      },
      {
        id: 'd2',
        title: 'Movement Context Mapping',
        description: 'Understanding your network, audience, and influence landscape',
      },
      {
        id: 'd3',
        title: 'Business Model Alignment',
        description: 'Revenue streams, pricing strategy, and sustainability planning',
      },
      {
        id: 'd4',
        title: 'Vision Documentation',
        description: 'Capturing your goals, success metrics, and platform aspirations',
      },
    ],
    status: 'upcoming',
  },
  {
    id: 'research',
    number: 2,
    title: 'Content Research',
    subtitle: 'Understanding Your Body of Work',
    description: 'Our AI analyzes your existing content to understand your voice, themes, and audience. This evidence-based approach ensures your platform reflects your authentic work.',
    timeEstimate: '3-5 days',
    weekRange: 'Week 1-2',
    icon: 'Search',
    activities: [
      {
        id: 'r1',
        title: 'Automated Content Analysis',
        description: 'AI-powered review of your sermons, articles, talks, and social content',
      },
      {
        id: 'r2',
        title: 'Theme & Topic Extraction',
        description: 'Identifying your core themes, recurring topics, and unique perspectives',
      },
      {
        id: 'r3',
        title: 'Network Intelligence',
        description: 'Mapping connections to other movement leaders for cross-pollination',
      },
      {
        id: 'r4',
        title: 'Content Strategy Brief',
        description: 'Recommendations for content architecture and knowledge spine',
      },
    ],
    status: 'upcoming',
  },
  {
    id: 'architecture',
    number: 3,
    title: 'Platform Architecture',
    subtitle: 'Building Your Digital Home',
    description: 'We configure your platform with the features and integrations that match your needs. Every decision is driven by the insights from discovery and research.',
    timeEstimate: '1 week',
    weekRange: 'Week 2',
    icon: 'Layout',
    activities: [
      {
        id: 'a1',
        title: 'Platform Requirements',
        description: 'Defining features, integrations, and customizations needed',
      },
      {
        id: 'a2',
        title: 'AI Integration Setup',
        description: 'Configuring Movemental Intelligence for your specific context',
      },
      {
        id: 'a3',
        title: 'Content Migration',
        description: 'Moving your existing content into the new platform structure',
      },
      {
        id: 'a4',
        title: 'Feature Configuration',
        description: 'Setting up books, courses, subscriptions, and community features',
      },
    ],
    status: 'upcoming',
  },
  {
    id: 'launch',
    number: 4,
    title: 'Network & Launch',
    subtitle: 'Going Live Together',
    description: 'You join the Movemental network and launch your platform—not empty, but populated with content and connected to a community of movement leaders.',
    timeEstimate: '1-2 weeks',
    weekRange: 'Week 3-4',
    icon: 'Rocket',
    activities: [
      {
        id: 'l1',
        title: 'Network Onboarding',
        description: 'Introduction to the Movemental community and network features',
      },
      {
        id: 'l2',
        title: 'Cross-Promotion Strategy',
        description: 'Connecting your content with complementary movement leaders',
      },
      {
        id: 'l3',
        title: 'Launch Preparation',
        description: 'Final review, testing, and soft launch checklist',
      },
      {
        id: 'l4',
        title: 'Platform Launch',
        description: 'Go live with your fully configured, content-rich platform',
      },
    ],
    status: 'upcoming',
  },
]

// ============================================
// Utility Functions
// ============================================

export function getPhaseIcon(iconName: string) {
  // Returns the icon name for dynamic import in components
  return iconName
}

export function getTotalWeeks(): string {
  return '3-4 weeks'
}

export function getPhaseByStatus(phases: OnboardingPhase[], status: PhaseStatus): OnboardingPhase[] {
  return phases.filter(phase => phase.status === status)
}
