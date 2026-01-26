/**
 * Author Registry Module
 *
 * Single source of truth for author identity across the platform.
 * All author references should resolve through this module.
 */

export {
  // Types
  type AuthorSlug,
  type AuthorRecord,
  type AuthorReference,
  type AuthorBadgeType,
  type AuthorSocialLink,
  type AuthorBadge,

  // Core API
  getAuthor,
  getAuthorSync,
  listAuthors,
  listAuthorsSync,
  requireAuthor,
  resolveAuthors,
  resolveAuthorsSync,
  normalizeAuthorSlug,

  // Query helpers
  getAllAuthorSlugs,
  hasAuthor,
  getAuthorsByTag,
  getStewards,
  getTeamMembers,

  // Integrity checks
  checkRegistryIntegrity,
  logIntegrityIssues,

  // Cache management
  warmCache,
  clearCache,
} from './registry'
