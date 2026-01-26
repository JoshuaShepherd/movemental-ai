import { Metadata } from 'next'
import { BookCatalogGrid } from '@/components/book-purchase'
import { resolveAuthors, type AuthorSlug } from '@/lib/authors'

export const metadata: Metadata = {
  title: 'Books | Movemental',
  description: 'Browse books from movement leaders. Deep theological content, practical wisdom, and transformational insights.',
}

// Book data with author slugs (identity is slug-based)
// In production this would come from database
interface BookData {
  slug: string
  title: string
  authorSlugs: AuthorSlug[]
  coverImage: string
  price: number | 'free'
  rating: number
  reviewCount: number
}

const BOOKS_DATA: BookData[] = [
  {
    slug: 'forgotten-ways',
    title: 'The Forgotten Ways',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/api/placeholder/200/300',
    price: 24.99,
    rating: 4.8,
    reviewCount: 142,
  },
  {
    slug: 'right-here-right-now',
    title: 'Right Here, Right Now',
    authorSlugs: ['alan-hirsch', 'lance-ford'],
    coverImage: '/api/placeholder/200/300',
    price: 19.99,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    slug: 'soul-care',
    title: 'Soul Care',
    authorSlugs: ['mindy-caliguire'],
    coverImage: '/api/placeholder/200/300',
    price: 16.99,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    slug: 'knowledge-spine',
    title: 'The Knowledge Spine',
    authorSlugs: ['movemental'],
    coverImage: '/api/placeholder/200/300',
    price: 'free',
    rating: 4.7,
    reviewCount: 234,
  },
  {
    slug: 'incarnational-church',
    title: 'The Incarnational Church',
    authorSlugs: ['michael-frost'],
    coverImage: '/api/placeholder/200/300',
    price: 21.99,
    rating: 4.5,
    reviewCount: 56,
  },
  {
    slug: 'and-bless-broken-road',
    title: 'And: The Gathered and Scattered Church',
    authorSlugs: ['hugh-halter', 'matt-smay'],
    coverImage: '/api/placeholder/200/300',
    price: 18.99,
    rating: 4.4,
    reviewCount: 78,
  },
  {
    slug: 'starfish-spider',
    title: 'The Starfish and the Spider',
    authorSlugs: ['ori-brafman'],
    coverImage: '/api/placeholder/200/300',
    price: 22.99,
    rating: 4.3,
    reviewCount: 112,
  },
  {
    slug: 'leadership-next',
    title: 'Leadership Next',
    authorSlugs: ['eddie-gibbs'],
    coverImage: '/api/placeholder/200/300',
    price: 19.99,
    rating: 4.2,
    reviewCount: 45,
  },
]

export default async function BooksPage() {
  // Collect all unique author slugs from books
  const allAuthorSlugs = [...new Set(BOOKS_DATA.flatMap((b) => b.authorSlugs))]
  
  // Resolve all authors from registry
  const authors = await resolveAuthors(allAuthorSlugs)
  const authorMap = new Map(authors.map((a) => [a.slug, a]))

  // Transform books with resolved author display names
  const books = BOOKS_DATA.map((book) => {
    const resolvedAuthors = book.authorSlugs
      .map((slug) => authorMap.get(slug))
      .filter(Boolean)
    
    // Format author display string (e.g., "Alan Hirsch & Lance Ford")
    const authorDisplay = resolvedAuthors
      .map((a) => a!.displayName)
      .join(' & ')

    return {
      slug: book.slug,
      title: book.title,
      author: authorDisplay || 'Unknown Author',
      coverImage: book.coverImage,
      price: book.price,
      rating: book.rating,
      reviewCount: book.reviewCount,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Books</h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Deep theological content, practical wisdom, and transformational insights from movement leaders.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Filters (placeholder) */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {books.length} books available
            </p>
            <select className="px-3 py-2 border rounded-lg bg-background text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Grid */}
          <BookCatalogGrid books={books} />
        </div>
      </section>
    </div>
  )
}
