// ---------------------------------------------------------------------------
// Linking Visualizations — Shared Types
// ---------------------------------------------------------------------------

export interface Leader {
  id: string
  name: string
  role: string
  org: string
  initials: string
  color: string // CSS color value
}

export interface Article {
  id: string
  title: string
  leaderId: string
  theme: string
  excerpt: string
  date: string // ISO date string
}

export interface LinkSuggestion {
  id: string
  articleId: string
  leaderId: string
  relevance: number // 0–100
  reason: string
  type: 'auto-applied' | 'suggested'
}

export interface CalendarEvent {
  id: string
  title: string
  leaderId: string
  date: string // ISO date (YYYY-MM-DD)
  type: 'workshop' | 'webinar' | 'conference' | 'joint'
  jointLeaderId?: string // for joint events
}

export interface LinkingAction {
  id: string
  label: string
  score: number // 0–100
  rank: number
  category: string
}

export interface Nudge {
  id: string
  icon: string // Lucide icon name
  message: string
  action: string
}

export interface DigestItem {
  id: string
  section: 'linked-by' | 'new-in-themes' | 'suggested-collabs'
  title: string
  leaderId: string
  description: string
}

export interface TopicContent {
  id: string
  title: string
  leaderId: string
  theme: string
  type: 'article' | 'video' | 'podcast' | 'course'
  excerpt: string
}
