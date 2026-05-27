import fs from 'fs'
import path from 'path'
import {
  parseMarkdown,
  markdownToHtml,
  extractSection,
  extractFirstParagraph,
  extractKeyValuePairs,
  extractBooks,
  slugify,
} from './markdown'
import type {
  AuthorProfile,
  AuthorListItem,
  AuthorBadge,
  AuthorBook,
  AuthorOrganization,
  AuthorSocialLink,
} from './types'

// Base path for author research content
const AUTHOR_RESEARCH_PATH = path.join(
  process.cwd(),
  '_docs',
  'movement_leader_research',
  'author-research'
)

// Base path for individual leader research folders
const LEADER_RESEARCH_PATH = path.join(
  process.cwd(),
  '_docs',
  'movement_leader_research'
)

/**
 * Author configuration - maps slug to file patterns and metadata
 */
interface AuthorConfig {
  slug: string
  displayName: string
  profileFile: string // e.g., "ALAN_HIRSCH_AUTHOR_PROFILE.md"
  summaryFolder?: string // e.g., "alan-hirsch" folder
  avatarUrl?: string
  role?: string
}

// Known authors with their file mappings
const AUTHOR_CONFIGS: AuthorConfig[] = [
  {
    slug: 'alan-hirsch',
    displayName: 'Alan Hirsch',
    profileFile: 'ALAN_HIRSCH_AUTHOR_PROFILE.md',
    summaryFolder: 'alan-hirsch',
    role: 'Missional Strategist & Movement Catalyst',
  },
  {
    slug: 'brad-brisco',
    displayName: 'Brad Brisco',
    profileFile: 'BRAD_BRISCO_AUTHOR_PROFILE.md',
    summaryFolder: 'brad-brisco',
    role: 'Director of Multiplication Strategies',
  },
]

/**
 * Get all available author slugs (for generateStaticParams)
 */
export function getAuthorSlugs(): string[] {
  return AUTHOR_CONFIGS.map((config) => config.slug)
}

/**
 * Get all authors for listing page
 */
export async function getAllAuthors(): Promise<AuthorListItem[]> {
  const authors: AuthorListItem[] = []

  for (const config of AUTHOR_CONFIGS) {
    try {
      const profile = await getAuthorBySlug(config.slug)
      if (profile) {
        authors.push({
          id: profile.id,
          slug: profile.slug,
          displayName: profile.displayName,
          avatarUrl: profile.avatarUrl,
          role: profile.role,
          bio: profile.bio?.substring(0, 200) + (profile.bio && profile.bio.length > 200 ? '...' : ''),
          badge: profile.badges?.[0],
        })
      }
    } catch (error) {
      console.error(`Error loading author ${config.slug}:`, error)
    }
  }

  return authors
}

/**
 * Get a single author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<AuthorProfile | null> {
  const config = AUTHOR_CONFIGS.find((c) => c.slug === slug)
  if (!config) {
    return null
  }

  try {
    // Try to read the author profile file
    const profilePath = path.join(AUTHOR_RESEARCH_PATH, config.profileFile)
    
    if (!fs.existsSync(profilePath)) {
      console.warn(`Profile file not found: ${profilePath}`)
      return createFallbackProfile(config)
    }

    const fileContent = fs.readFileSync(profilePath, 'utf-8')
    const { frontmatter, content } = parseMarkdown(fileContent)

    // Parse the profile content
    const profile = await parseAuthorProfile(config, frontmatter, content)

    // Try to enrich with summary data if available
    if (config.summaryFolder) {
      const summaryPath = path.join(LEADER_RESEARCH_PATH, config.summaryFolder, 'summary.md')
      if (fs.existsSync(summaryPath)) {
        const summaryContent = fs.readFileSync(summaryPath, 'utf-8')
        enrichProfileWithSummary(profile, summaryContent)
      }
    }

    return profile
  } catch (error) {
    console.error(`Error loading author ${slug}:`, error)
    return createFallbackProfile(config)
  }
}

/**
 * Parse author profile from markdown content
 */
async function parseAuthorProfile(
  config: AuthorConfig,
  frontmatter: Record<string, unknown>,
  content: string
): Promise<AuthorProfile> {
  // Extract executive summary
  const executiveSummary = extractSection(content, 'Executive Summary')
  const bio = executiveSummary 
    ? extractFirstParagraph(executiveSummary)
    : null

  // Extract biographical info
  const biographicalSection = extractSection(content, 'Biographical Profile')
  const bioKeyValues = biographicalSection 
    ? extractKeyValuePairs(biographicalSection) 
    : {}

  // Extract books from Major Published Works section
  const worksSection = extractSection(content, 'Major Published Works')
  const books = worksSection ? extractBooks(worksSection) : []

  // Extract organizations from Professional Roles section
  const organizations = parseOrganizations(content)

  // Extract core competencies
  const competencies = parseCompetencies(content)

  // Extract social links from Digital Presence section
  const socialLinks = parseSocialLinks(content)

  // Convert content to HTML for full display
  const contentHtml = await markdownToHtml(content)

  // Generate badges based on content
  const badges = generateBadges(config, books, organizations)

  // Generate stats from content
  const stats = generateStats(books, competencies)

  return {
    id: config.slug,
    slug: config.slug,
    displayName: config.displayName,
    realName: bioKeyValues['Name'] || config.displayName,
    avatarUrl: config.avatarUrl,
    bio: bio || `${config.displayName} is a thought leader in the missional movement.`,
    location: bioKeyValues['Current Location'] || bioKeyValues['Nationality'],
    role: config.role || bioKeyValues['Primary Role'],
    joinedAt: (frontmatter.lastUpdated as string) || 'January 2026',
    lastActive: 'Recently',
    followerCount: 0, // Would come from database in real app
    followingCount: 0,
    socialLinks,
    badges,
    stats,
    topContributions: {
      replies: [],
      topics: books.slice(0, 3).map((book, i) => ({
        id: `book-${i}`,
        title: book.title,
        url: '#',
        date: book.year || '',
      })),
      links: [],
    },
    recentActivity: [],
    following: [],
    books: books.map((b) => ({
      title: b.title,
      year: b.year,
      publisher: b.publisher,
    })),
    organizations,
    coreCompetencies: competencies,
    executiveSummary: executiveSummary || undefined,
    contentHtml,
  }
}

/**
 * Parse organizations from content
 */
function parseOrganizations(content: string): AuthorOrganization[] {
  const orgs: AuthorOrganization[] = []
  
  // Look for Primary Organizations section
  const rolesSection = extractSection(content, 'Professional Roles & Affiliations')
  if (!rolesSection) return orgs

  // Pattern for organization entries: **Org Name**: Description
  const orgPattern = /\*\*([^*]+)\*\*:\s*([^\n]+)/g
  let match

  while ((match = orgPattern.exec(rolesSection)) !== null) {
    const name = match[1].trim()
    const description = match[2].trim()
    
    // Skip if it looks like a role/position rather than an organization
    if (name.includes('Position') || name.includes('Role')) continue
    
    orgs.push({ name, description })
  }

  return orgs.slice(0, 5) // Limit to 5 organizations
}

/**
 * Parse core competencies
 */
function parseCompetencies(content: string): string[] {
  const competencies: string[] = []
  
  const expertiseSection = extractSection(content, 'Expertise Matrix') 
    || extractSection(content, 'Core Competencies')
  
  if (!expertiseSection) return competencies

  // Look for numbered items or bold headings
  const pattern = /\*\*\d+\.\s*([^*]+)\*\*/g
  let match

  while ((match = pattern.exec(expertiseSection)) !== null) {
    competencies.push(match[1].trim())
  }

  return competencies
}

/**
 * Parse social links from content
 */
function parseSocialLinks(content: string): AuthorSocialLink[] {
  const links: AuthorSocialLink[] = []
  
  const digitalSection = extractSection(content, 'Digital Presence Map')
  if (!digitalSection) return links

  // Look for website references
  const websiteMatch = digitalSection.match(/\*\*Primary Website\*\*:\s*([^\s\n]+)/i)
  if (websiteMatch) {
    const url = websiteMatch[1].trim()
    links.push({
      type: 'website',
      url: url.startsWith('http') ? url : `https://${url}`,
    })
  }

  return links
}

/**
 * Generate badges based on author content
 */
function generateBadges(
  config: AuthorConfig,
  books: Array<{ title: string }>,
  organizations: AuthorOrganization[]
): AuthorBadge[] {
  const badges: AuthorBadge[] = []

  // Author badge if they have books
  if (books.length > 0) {
    badges.push({
      id: 'author',
      name: 'Published Author',
      type: 'author',
      description: `Author of ${books.length}+ published works`,
    })
  }

  // Founder badge if they founded organizations
  const isFounder = organizations.some(
    (org) => org.description?.toLowerCase().includes('founder')
  )
  if (isFounder) {
    badges.push({
      id: 'founder',
      name: 'Founder',
      type: 'founder',
      description: 'Founded movement organizations',
    })
  }

  // Expert badge
  badges.push({
    id: 'expert',
    name: 'Movement Expert',
    type: 'expert',
    description: 'Recognized thought leader',
  })

  // Verified badge
  badges.push({
    id: 'verified',
    name: 'Verified',
    type: 'verified',
    description: 'Verified leader profile',
  })

  return badges
}

/**
 * Generate stats based on author content
 */
function generateStats(
  books: Array<{ title: string }>,
  competencies: string[]
): AuthorProfile['stats'] {
  return [
    { label: 'Books Published', value: books.length, icon: 'award' },
    { label: 'Core Competencies', value: competencies.length, icon: 'award' },
    { label: 'Years Active', value: '20+', icon: 'calendar' },
  ]
}

/**
 * Enrich profile with data from summary file
 */
function enrichProfileWithSummary(profile: AuthorProfile, summaryContent: string): void {
  const { content } = parseMarkdown(summaryContent)
  
  // Extract executive summary if not already present
  if (!profile.executiveSummary) {
    const summary = extractSection(content, 'Executive Summary')
    if (summary) {
      profile.executiveSummary = summary
      const bio = extractFirstParagraph(summary)
      if (bio) {
        profile.bio = bio
      }
    }
  }

  // Extract key findings as additional content
  const keyFindings = extractSection(content, 'Key Findings')
  if (keyFindings && !profile.coreCompetencies?.length) {
    const findings = keyFindings.split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.replace(/^-\s*/, '').trim())
    profile.coreCompetencies = findings
  }
}

/**
 * Create a fallback profile when files are missing
 */
function createFallbackProfile(config: AuthorConfig): AuthorProfile {
  return {
    id: config.slug,
    slug: config.slug,
    displayName: config.displayName,
    avatarUrl: config.avatarUrl,
    bio: `${config.displayName} is a thought leader in the missional movement.`,
    role: config.role,
    joinedAt: 'January 2026',
    lastActive: 'Recently',
    followerCount: 0,
    followingCount: 0,
    badges: [
      {
        id: 'verified',
        name: 'Verified',
        type: 'verified',
        description: 'Verified leader profile',
      },
    ],
    stats: [],
    topContributions: { replies: [], topics: [], links: [] },
    recentActivity: [],
    following: [],
  }
}

// Re-export types
export type { AuthorProfile, AuthorListItem }
