/**
 * Author Registry - Canonical single source of truth for author identity
 *
 * This module provides a unified API for author resolution across the platform.
 * All public-facing author references should resolve via `authorSlug` through this registry.
 *
 * Current implementation: File-based (markdown + in-code records)
 * TODO: Migrate to database-backed storage in future iteration
 */

import { getAllAuthors, getAuthorBySlug } from '@/lib/content/authors'
import type { AuthorProfile, AuthorListItem, AuthorSocialLink, AuthorBadge } from '@/lib/content/types'

// =============================================================================
// Types
// =============================================================================

/**
 * Canonical author identifier (slug format)
 */
export type AuthorSlug = string

/**
 * Slug-only reference for content associations
 */
export interface AuthorReference {
  authorSlug: AuthorSlug
}

/**
 * Badge type for author records
 */
export type AuthorBadgeType = 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'

/**
 * Canonical author record - minimal normalized schema
 */
export interface AuthorRecord {
  // Required identity
  slug: AuthorSlug
  displayName: string

  // Optional but preferred
  avatarUrl?: string
  role?: string
  bio?: string
  organization?: string
  socialLinks?: AuthorSocialLink[]
  website?: string

  // Aliases for slug resolution (e.g., "brad-briscoe" → "brad-brisco")
  aliases?: string[]

  // Tags/domains for categorization
  tags?: string[]
  domains?: string[]

  // Badge for display
  badge?: {
    id: string
    name: string
    type: AuthorBadgeType
  }

  // Metadata
  source: 'markdown' | 'manual' | 'placeholder'
  profileUrl?: string
}

// =============================================================================
// Alias Map - Maps variations to canonical slugs
// =============================================================================

const ALIAS_MAP: Record<string, AuthorSlug> = {
  // Brad variations
  'brad-briscoe': 'brad-brisco',
  'bradbrisco': 'brad-brisco',
  'bradbriscoe': 'brad-brisco',

  // Alan variations
  'alanhirsch': 'alan-hirsch',

  // Josh variations
  'joshshepherd': 'josh-shepherd',

  // Common name-based lookups (lowercase, no spaces)
  'alan hirsch': 'alan-hirsch',
  'brad brisco': 'brad-brisco',
  'brad briscoe': 'brad-brisco',
  'josh shepherd': 'josh-shepherd',
  'michael frost': 'michael-frost',
  'deb hirsch': 'deb-hirsch',
  'mindy caliguire': 'mindy-caliguire',
  'tim keel': 'tim-keel',
  'mandy smith': 'mandy-smith',
  'hugh halter': 'hugh-halter',
  'matt smay': 'matt-smay',
  'lance ford': 'lance-ford',
  'ori brafman': 'ori-brafman',
  'eddie gibbs': 'eddie-gibbs',
  'jeff vanderstelt': 'jeff-vanderstelt',
  'dave ferguson': 'dave-ferguson',
  'steve addison': 'steve-addison',
}

// =============================================================================
// Manual Records - Authors not in markdown system
// =============================================================================

const MANUAL_RECORDS: AuthorRecord[] = [
  // Platform team
  {
    slug: 'josh-shepherd',
    displayName: 'Josh Shepherd',
    role: 'Platform Lead',
    bio: 'Builder and technologist working at the intersection of AI, publishing, and movement leadership. Responsible for platform architecture and the technical vision behind Movemental.',
    website: 'https://joshshepherd.com',
    socialLinks: [
      { type: 'website', url: 'https://joshshepherd.com' },
      { type: 'linkedin', url: 'https://linkedin.com/in/joshshepherd' },
    ],
    tags: ['platform', 'steward', 'technology'],
    badge: { id: 'founder', name: 'Founder', type: 'founder' },
    source: 'manual',
    profileUrl: '/profile/josh-shepherd',
  },

  // Network authors (from existing hardcoded data, now canonical)
  {
    slug: 'michael-frost',
    displayName: 'Michael Frost',
    role: 'Theologian',
    organization: 'Morling College',
    bio: 'Missiologist and author exploring incarnational mission and the future of the church.',
    tags: ['theology', 'mission', 'author'],
    badge: { id: 'verified', name: 'Verified', type: 'verified' },
    source: 'manual',
    profileUrl: '/profile/michael-frost',
  },
  {
    slug: 'deb-hirsch',
    displayName: 'Deb Hirsch',
    role: 'Author',
    organization: 'Forge International',
    bio: 'Speaker and writer on spiritual formation and community practices.',
    tags: ['formation', 'author', 'speaker'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/deb-hirsch',
  },
  {
    slug: 'mindy-caliguire',
    displayName: 'Mindy Caliguire',
    role: 'Soul Care Expert',
    bio: 'Author and speaker on spiritual formation and soul care practices.',
    tags: ['soul-care', 'formation', 'author'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/mindy-caliguire',
  },
  {
    slug: 'tim-keel',
    displayName: 'Tim Keel',
    role: 'Pastor & Author',
    bio: 'Pastor and thought leader on faith, culture, and spiritual formation.',
    tags: ['pastoral', 'formation', 'author'],
    badge: { id: 'contributor', name: 'Contributor', type: 'contributor' },
    source: 'manual',
    profileUrl: '/profile/tim-keel',
  },
  {
    slug: 'mandy-smith',
    displayName: 'Mandy Smith',
    role: 'Pastor & Author',
    bio: 'Pastor and author exploring the intersection of faith and everyday life.',
    tags: ['pastoral', 'author'],
    badge: { id: 'contributor', name: 'Contributor', type: 'contributor' },
    source: 'manual',
    profileUrl: '/profile/mandy-smith',
  },
  {
    slug: 'hugh-halter',
    displayName: 'Hugh Halter',
    role: 'Trainer & Author',
    bio: 'Church planter, author, and trainer focused on incarnational community.',
    tags: ['training', 'church-planting', 'author'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/hugh-halter',
  },
  {
    slug: 'matt-smay',
    displayName: 'Matt Smay',
    role: 'Church Planter',
    bio: 'Church planter and co-author focused on missional community.',
    tags: ['church-planting', 'author'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/matt-smay',
  },
  {
    slug: 'lance-ford',
    displayName: 'Lance Ford',
    role: 'Author & Consultant',
    bio: 'Author and consultant on missional leadership and church transformation.',
    tags: ['leadership', 'author', 'consulting'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/lance-ford',
  },
  {
    slug: 'ori-brafman',
    displayName: 'Ori Brafman',
    role: 'Author',
    bio: 'Bestselling author on organizational dynamics and decentralized systems.',
    tags: ['leadership', 'author', 'organizations'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/ori-brafman',
  },
  {
    slug: 'eddie-gibbs',
    displayName: 'Eddie Gibbs',
    role: 'Professor & Author',
    bio: 'Professor emeritus and author on church leadership and emerging churches.',
    tags: ['academic', 'leadership', 'author'],
    badge: { id: 'author', name: 'Book Author', type: 'author' },
    source: 'manual',
    profileUrl: '/profile/eddie-gibbs',
  },
  {
    slug: 'jeff-vanderstelt',
    displayName: 'Jeff Vanderstelt',
    role: 'Pastor & Author',
    bio: 'Pastor and author focused on gospel-centered community and mission.',
    tags: ['pastoral', 'mission', 'author'],
    badge: { id: 'contributor', name: 'Contributor', type: 'contributor' },
    source: 'manual',
    profileUrl: '/profile/jeff-vanderstelt',
  },
  {
    slug: 'dave-ferguson',
    displayName: 'Dave Ferguson',
    role: 'Speaker & Author',
    bio: 'Leadership coach and author on multiplication movements.',
    tags: ['leadership', 'multiplication', 'author'],
    badge: { id: 'contributor', name: 'Contributor', type: 'contributor' },
    source: 'manual',
    profileUrl: '/profile/dave-ferguson',
  },
  {
    slug: 'steve-addison',
    displayName: 'Steve Addison',
    role: 'Researcher & Author',
    bio: 'Researcher and author on movements and church multiplication.',
    tags: ['research', 'movements', 'author'],
    badge: { id: 'contributor', name: 'Contributor', type: 'contributor' },
    source: 'manual',
    profileUrl: '/profile/steve-addison',
  },
  {
    slug: 'scott-shepherd',
    displayName: 'Scott Shepherd',
    role: 'Author',
    bio: 'Author and practitioner in the missional movement space.',
    tags: ['author', 'mission'],
    badge: { id: 'contributor', name: 'Contributor', type: 'contributor' },
    source: 'manual',
    profileUrl: '/profile/scott-shepherd',
  },

  // Collective/Platform author
  {
    slug: 'movemental',
    displayName: 'Movemental',
    role: 'Platform Collective',
    bio: 'Collaborative content from the Movemental platform and community.',
    tags: ['platform', 'collective'],
    badge: { id: 'verified', name: 'Platform', type: 'verified' },
    source: 'manual',
    profileUrl: '/about',
  },
]

// =============================================================================
// Internal Cache
// =============================================================================

let cachedRecords: AuthorRecord[] | null = null

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Convert markdown AuthorListItem to AuthorRecord
 */
function markdownToRecord(item: AuthorListItem, profile?: AuthorProfile | null): AuthorRecord {
  return {
    slug: item.slug,
    displayName: item.displayName,
    avatarUrl: item.avatarUrl,
    role: item.role,
    bio: item.bio,
    socialLinks: profile?.socialLinks,
    website: profile?.socialLinks?.find((l) => l.type === 'website')?.url,
    tags: profile?.coreCompetencies?.slice(0, 3),
    badge: item.badge
      ? {
          id: item.badge.id,
          name: item.badge.name,
          type: item.badge.type,
        }
      : undefined,
    source: 'markdown',
    profileUrl: `/profile/${item.slug}`,
  }
}

/**
 * Build the complete author registry by composing markdown and manual records
 */
async function buildRegistry(): Promise<AuthorRecord[]> {
  if (cachedRecords) {
    return cachedRecords
  }

  const records: AuthorRecord[] = []
  const seenSlugs = new Set<string>()

  // 1. Load markdown-based authors (highest priority)
  try {
    const markdownAuthors = await getAllAuthors()
    for (const item of markdownAuthors) {
      if (!seenSlugs.has(item.slug)) {
        const profile = await getAuthorBySlug(item.slug)
        records.push(markdownToRecord(item, profile))
        seenSlugs.add(item.slug)
      }
    }
  } catch (error) {
    console.warn('[AuthorRegistry] Error loading markdown authors:', error)
  }

  // 2. Add manual records (fill gaps)
  for (const manual of MANUAL_RECORDS) {
    if (!seenSlugs.has(manual.slug)) {
      records.push(manual)
      seenSlugs.add(manual.slug)
    }
  }

  cachedRecords = records
  return records
}

/**
 * Synchronous version using cached data (for use after initial load)
 */
function getRegistrySync(): AuthorRecord[] {
  return cachedRecords || MANUAL_RECORDS
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Normalize an input string to canonical author slug
 * Handles aliases, case variations, and common formats
 */
export function normalizeAuthorSlug(input: string): AuthorSlug {
  if (!input) return input

  // Normalize: lowercase, trim
  const normalized = input.toLowerCase().trim()

  // Check alias map first
  if (ALIAS_MAP[normalized]) {
    return ALIAS_MAP[normalized]
  }

  // Try slugified version
  const slugified = normalized.replace(/\s+/g, '-')
  if (ALIAS_MAP[slugified]) {
    return ALIAS_MAP[slugified]
  }

  // Return as-is (already a slug or unknown)
  return slugified
}

/**
 * Get a single author by slug
 * Returns null if not found
 */
export async function getAuthor(slug: AuthorSlug): Promise<AuthorRecord | null> {
  const normalizedSlug = normalizeAuthorSlug(slug)
  const records = await buildRegistry()
  return records.find((r) => r.slug === normalizedSlug) || null
}

/**
 * Get a single author by slug (synchronous, uses cache)
 * Returns null if not found
 */
export function getAuthorSync(slug: AuthorSlug): AuthorRecord | null {
  const normalizedSlug = normalizeAuthorSlug(slug)
  const records = getRegistrySync()
  return records.find((r) => r.slug === normalizedSlug) || null
}

/**
 * List all authors in the registry
 */
export async function listAuthors(): Promise<AuthorRecord[]> {
  return buildRegistry()
}

/**
 * List all authors (synchronous, uses cache)
 */
export function listAuthorsSync(): AuthorRecord[] {
  return getRegistrySync()
}

/**
 * Get author by slug, throw if not found
 * Use when author MUST exist (e.g., known content references)
 */
export async function requireAuthor(slug: AuthorSlug): Promise<AuthorRecord> {
  const author = await getAuthor(slug)
  if (!author) {
    throw new Error(
      `[AuthorRegistry] Author not found: "${slug}". ` +
        `Did you mean one of: ${(await listAuthors()).map((a) => a.slug).join(', ')}?`
    )
  }
  return author
}

/**
 * Resolve multiple author slugs to records
 * Preserves input order, deduplicates, skips unknown slugs
 */
export async function resolveAuthors(slugs: AuthorSlug[]): Promise<AuthorRecord[]> {
  const records = await buildRegistry()
  const seen = new Set<string>()
  const result: AuthorRecord[] = []

  for (const slug of slugs) {
    const normalizedSlug = normalizeAuthorSlug(slug)
    if (seen.has(normalizedSlug)) continue

    const author = records.find((r) => r.slug === normalizedSlug)
    if (author) {
      result.push(author)
      seen.add(normalizedSlug)
    }
  }

  return result
}

/**
 * Resolve multiple author slugs (synchronous)
 */
export function resolveAuthorsSync(slugs: AuthorSlug[]): AuthorRecord[] {
  const records = getRegistrySync()
  const seen = new Set<string>()
  const result: AuthorRecord[] = []

  for (const slug of slugs) {
    const normalizedSlug = normalizeAuthorSlug(slug)
    if (seen.has(normalizedSlug)) continue

    const author = records.find((r) => r.slug === normalizedSlug)
    if (author) {
      result.push(author)
      seen.add(normalizedSlug)
    }
  }

  return result
}

/**
 * Get all author slugs (useful for static generation)
 */
export async function getAllAuthorSlugs(): Promise<AuthorSlug[]> {
  const records = await buildRegistry()
  return records.map((r) => r.slug)
}

/**
 * Check if a slug exists in the registry
 */
export async function hasAuthor(slug: AuthorSlug): Promise<boolean> {
  const author = await getAuthor(slug)
  return author !== null
}

/**
 * Filter authors by tag
 */
export async function getAuthorsByTag(tag: string): Promise<AuthorRecord[]> {
  const records = await buildRegistry()
  return records.filter((r) => r.tags?.includes(tag))
}

/**
 * Get steward authors (platform leadership)
 */
export async function getStewards(): Promise<AuthorRecord[]> {
  return getAuthorsByTag('steward')
}

/**
 * Get team members for display (Josh, Alan, Brad)
 */
export async function getTeamMembers(): Promise<AuthorRecord[]> {
  const teamSlugs: AuthorSlug[] = ['josh-shepherd', 'alan-hirsch', 'brad-brisco']
  return resolveAuthors(teamSlugs)
}

// =============================================================================
// Integrity Checks (Development Only)
// =============================================================================

interface IntegrityIssue {
  type: 'duplicate_slug' | 'alias_collision' | 'missing_author' | 'orphan_alias'
  message: string
  slug?: string
  details?: string
}

/**
 * Run integrity checks on the registry
 * Call during development/build to catch issues early
 */
export async function checkRegistryIntegrity(): Promise<IntegrityIssue[]> {
  const issues: IntegrityIssue[] = []
  const records = await buildRegistry()

  // Check for duplicate slugs
  const slugCounts = new Map<string, number>()
  for (const record of records) {
    slugCounts.set(record.slug, (slugCounts.get(record.slug) || 0) + 1)
  }
  for (const [slug, count] of slugCounts) {
    if (count > 1) {
      issues.push({
        type: 'duplicate_slug',
        message: `Duplicate slug found: "${slug}" appears ${count} times`,
        slug,
      })
    }
  }

  // Check for alias collisions (alias pointing to non-existent slug)
  const allSlugs = new Set(records.map((r) => r.slug))
  for (const [alias, canonical] of Object.entries(ALIAS_MAP)) {
    if (!allSlugs.has(canonical)) {
      issues.push({
        type: 'orphan_alias',
        message: `Alias "${alias}" points to non-existent slug "${canonical}"`,
        slug: canonical,
        details: alias,
      })
    }
  }

  // Check for aliases that collide with existing slugs
  for (const alias of Object.keys(ALIAS_MAP)) {
    if (allSlugs.has(alias)) {
      issues.push({
        type: 'alias_collision',
        message: `Alias "${alias}" collides with existing author slug`,
        slug: alias,
      })
    }
  }

  return issues
}

/**
 * Log integrity issues to console (development helper)
 */
export async function logIntegrityIssues(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const issues = await checkRegistryIntegrity()
  if (issues.length === 0) {
    console.log('[AuthorRegistry] Integrity check passed ✓')
    return
  }

  console.warn(`[AuthorRegistry] Found ${issues.length} integrity issue(s):`)
  for (const issue of issues) {
    console.warn(`  - [${issue.type}] ${issue.message}`)
  }
}

// =============================================================================
// Pre-warm Cache (Optional)
// =============================================================================

/**
 * Pre-warm the registry cache
 * Call during app initialization for better performance
 */
export async function warmCache(): Promise<void> {
  await buildRegistry()
}

/**
 * Clear the registry cache (useful for testing)
 */
export function clearCache(): void {
  cachedRecords = null
}

// =============================================================================
// Re-exports for convenience
// =============================================================================

export type { AuthorSocialLink, AuthorBadge }
