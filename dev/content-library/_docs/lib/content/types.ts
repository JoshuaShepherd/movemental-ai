/**
 * Types for author content parsed from markdown files
 */

export interface AuthorSocialLink {
  type: 'twitter' | 'github' | 'linkedin' | 'website'
  url: string
}

export interface AuthorBadge {
  id: string
  name: string
  description?: string
  type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  level?: number
}

export interface AuthorStat {
  label: string
  value: string | number
  icon?: 'heart' | 'eye' | 'message' | 'clock' | 'calendar' | 'award'
  accent?: boolean
}

export interface AuthorContribution {
  id: string
  title: string
  url: string
  date: string
  likes?: number
}

export interface AuthorActivity {
  id: string
  type: 'like' | 'comment' | 'share' | 'publish' | 'badge' | 'follow' | 'post'
  title: string
  description?: string
  url?: string
  timestamp: string
  relativeTime: string
}

export interface AuthorFollowing {
  id: string
  name: string
  avatarUrl?: string
  profileUrl: string
}

export interface AuthorBook {
  title: string
  year?: string
  publisher?: string
  coAuthors?: string[]
  description?: string
}

export interface AuthorOrganization {
  name: string
  role?: string
  description?: string
  url?: string
}

export interface AuthorFramework {
  name: string
  description?: string
  elements?: string[]
}

/**
 * Raw metadata extracted from markdown frontmatter
 */
export interface AuthorFrontmatter {
  name?: string
  slug?: string
  avatarUrl?: string
  location?: string
  role?: string
  researchDate?: string
  confidenceLevel?: string
  version?: string
  lastUpdated?: string
}

/**
 * Parsed author profile data ready for UI consumption
 */
export interface AuthorProfile {
  // Identity
  id: string
  slug: string
  displayName: string
  realName?: string
  avatarUrl?: string
  
  // Basic info
  bio?: string
  location?: string
  role?: string
  joinedAt?: string
  lastActive?: string
  
  // Social
  followerCount: number
  followingCount: number
  socialLinks?: AuthorSocialLink[]
  
  // Badges and stats
  badges?: AuthorBadge[]
  stats?: AuthorStat[]
  
  // Contributions
  topContributions?: {
    replies: AuthorContribution[]
    topics: AuthorContribution[]
    links: AuthorContribution[]
  }
  
  // Activity
  recentActivity?: AuthorActivity[]
  
  // Following
  following?: AuthorFollowing[]
  
  // Extended profile data (from parsed markdown)
  books?: AuthorBook[]
  organizations?: AuthorOrganization[]
  frameworks?: AuthorFramework[]
  coreCompetencies?: string[]
  
  // Raw content sections
  executiveSummary?: string
  contentHtml?: string
}

/**
 * Minimal author info for listing pages
 */
export interface AuthorListItem {
  id: string
  slug: string
  displayName: string
  avatarUrl?: string
  role?: string
  bio?: string
  badge?: AuthorBadge
}
