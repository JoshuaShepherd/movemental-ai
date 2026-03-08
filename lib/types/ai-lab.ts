/**
 * AI Lab configuration types.
 * Used by the config dropdowns (Theme, Mode, Style) and any future AI Lab UI.
 */

export type Theme = 'metanoia' | 'movemental' | 'mdna'
export type Mode = 'teacher' | 'coach' | 'reflection' | 'mentor' | 'companion'
export type Style = 'conversation' | 'challenge' | 'socratic' | 'evaluative' | 'explainer'

export interface ThemeOption {
  value: Theme
  label: string
  description: string
}

export interface ModeOption {
  value: Mode
  label: string
  description: string
}

export interface StyleOption {
  value: Style
  label: string
  description: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'metanoia',
    label: 'Metanoia',
    description:
      'Focus on transformation, repentance, and formation. Deep, heart-level change that reorients life around Jesus. Emphasizes the relationship between repentance and transformation, and how transformation leads to missional engagement.',
  },
  {
    value: 'movemental',
    label: 'Movemental',
    description:
      'Explore missional thinking and movement quality. Covers APEST framework, multiplication, decentralization, and the characteristics of movements vs. institutions. Emphasizes movement-oriented thinking and apostolic leadership.',
  },
  {
    value: 'mdna',
    label: 'mDNA',
    description:
      'Learn about the six core elements of missional DNA: Jesus is Lord, Disciple Making, Missional-Incarnational, Apostolic Environment, Organic Systems, and Liminality-Communitas. Includes maturity assessment and formation pathways.',
  },
]

export const MODE_OPTIONS: ModeOption[] = [
  {
    value: 'teacher',
    label: 'Teacher',
    description:
      'Structured instruction with clear, organized explanations. Breaks down complex ideas into understandable parts, builds understanding step by step, and provides summaries and key takeaways. Best for learning foundational concepts.',
  },
  {
    value: 'coach',
    label: 'Coach',
    description:
      'Guided discovery through probing questions. Helps you identify your own answers, provides frameworks for self-assessment, and offers practical steps and action plans. Best for applying concepts and developing skills.',
  },
  {
    value: 'reflection',
    label: 'Reflection',
    description:
      'Contemplative exploration with thoughtful, open-ended questions. Creates space for deep thinking and personal discovery. Avoids rushing to answers and helps integrate insights with life experience. Best for processing and reflection.',
  },
  {
    value: 'mentor',
    label: 'Mentor',
    description:
      'Personal guidance with wisdom and perspective. Provides insights from experience, helps you see the bigger picture, and offers encouragement and support. Considers your broader journey and development. Best for advice and guidance.',
  },
  {
    value: 'companion',
    label: 'Companion',
    description:
      'Collaborative journey where we learn together. Uses "we" language, shares curiosity and wonder, explores questions together, and celebrates discoveries together. Best for experimental and playful exploration.',
  },
]

export const STYLE_OPTIONS: StyleOption[] = [
  {
    value: 'conversation',
    label: 'Conversation',
    description:
      'Natural dialogue that flows like a conversation. Adapts to your direction and interests, mixes questions and statements naturally, and keeps the conversation dynamic. Best for general exploration and building rapport.',
  },
  {
    value: 'challenge',
    label: 'Challenge',
    description:
      'Provocative questions that challenge assumptions and push boundaries. Encourages thinking beyond comfort zones, challenges complacency, and calls for transformation. Best when you need to be pushed or challenged.',
  },
  {
    value: 'socratic',
    label: 'Socratic',
    description:
      'Systematic questioning that guides discovery through structured questions. Questions build on each other logically to help you discover answers yourself. Best for developing critical thinking and working through understanding.',
  },
  {
    value: 'evaluative',
    label: 'Evaluative',
    description:
      'Assessment and feedback using frameworks and scales. Provides specific, actionable feedback, celebrates progress, and identifies areas for development. Best for understanding your current maturity level and growth areas.',
  },
  {
    value: 'explainer',
    label: 'Explainer',
    description:
      'Detailed explanations with thorough, comprehensive coverage. Organizes information clearly, uses examples extensively, and breaks down complex concepts into parts. Best for learning "what is" and "how does it work".',
  },
]
