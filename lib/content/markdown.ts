import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

/**
 * Parse markdown content with frontmatter
 */
export function parseMarkdown(content: string) {
  const { data, content: markdownContent } = matter(content)
  return { frontmatter: data, content: markdownContent }
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

/**
 * Extract a specific section from markdown content
 * @param content - Full markdown content
 * @param sectionTitle - The heading to look for (e.g., "Executive Summary")
 * @param level - Heading level (default 2 for ##)
 */
export function extractSection(
  content: string,
  sectionTitle: string,
  level: number = 2
): string | null {
  const headingPrefix = '#'.repeat(level)
  const pattern = new RegExp(
    `${headingPrefix}\\s+${escapeRegex(sectionTitle)}\\s*\\n([\\s\\S]*?)(?=\\n${headingPrefix}\\s|$)`,
    'i'
  )
  const match = content.match(pattern)
  return match ? match[1].trim() : null
}

/**
 * Extract all h2 sections from markdown
 */
export function extractAllSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const pattern = /##\s+([^\n]+)\n([\s\S]*?)(?=\n##\s|$)/g
  let match

  while ((match = pattern.exec(content)) !== null) {
    const title = match[1].trim()
    const sectionContent = match[2].trim()
    sections[title] = sectionContent
  }

  return sections
}

/**
 * Extract list items from a markdown section
 */
export function extractListItems(content: string): string[] {
  const lines = content.split('\n')
  const items: string[] = []

  for (const line of lines) {
    const match = line.match(/^[-*]\s+(.+)$/)
    if (match) {
      items.push(match[1].trim())
    }
  }

  return items
}

/**
 * Extract key-value pairs from markdown (like **Key**: Value format)
 */
export function extractKeyValuePairs(content: string): Record<string, string> {
  const pairs: Record<string, string> = {}
  const pattern = /\*\*([^*]+)\*\*:\s*([^\n]+)/g
  let match

  while ((match = pattern.exec(content)) !== null) {
    const key = match[1].trim()
    const value = match[2].trim()
    pairs[key] = value
  }

  return pairs
}

/**
 * Extract the first paragraph from content (for bio/summary)
 */
export function extractFirstParagraph(content: string): string | null {
  const lines = content.split('\n')
  const paragraphLines: string[] = []
  let inParagraph = false

  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Skip empty lines at the start
    if (!inParagraph && !trimmedLine) continue
    
    // Skip headings and list items
    if (trimmedLine.startsWith('#') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
      if (inParagraph) break
      continue
    }
    
    // Skip blockquotes
    if (trimmedLine.startsWith('>')) continue
    
    // Skip metadata lines
    if (trimmedLine.startsWith('**') && trimmedLine.includes(':')) continue
    
    if (trimmedLine) {
      inParagraph = true
      paragraphLines.push(trimmedLine)
    } else if (inParagraph) {
      break
    }
  }

  return paragraphLines.length > 0 ? paragraphLines.join(' ') : null
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Extract books from content (looks for book titles in specific format)
 */
export function extractBooks(content: string): Array<{
  title: string
  year?: string
  publisher?: string
  coAuthors?: string[]
}> {
  const books: Array<{
    title: string
    year?: string
    publisher?: string
    coAuthors?: string[]
  }> = []

  // Pattern for book entries like: **Book Title** (YYYY, Publisher)
  const bookPattern = /\*\*([^*]+)\*\*\s*\((\d{4}),?\s*([^)]+)?\)/g
  let match

  while ((match = bookPattern.exec(content)) !== null) {
    const title = match[1].trim()
    const year = match[2]
    const publisher = match[3]?.trim()

    books.push({
      title,
      year,
      publisher,
    })
  }

  return books
}

/**
 * Slugify a string (convert to URL-friendly format)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}
