import { Metadata } from 'next'
import { BookCatalogGrid } from '@/components/book-purchase'

export const metadata: Metadata = {
  title: 'Books | Movemental',
  description: 'Browse books from movement leaders. Deep theological content, practical wisdom, and transformational insights.',
}

// Sample books data - in production this would come from database
const BOOKS = [
  {
    slug: 'forgotten-ways',
    title: 'The Forgotten Ways',
    author: 'Alan Hirsch',
    coverImage: '/api/placeholder/200/300',
    price: 24.99,
    rating: 4.8,
    reviewCount: 142,
  },
  {
    slug: 'right-here-right-now',
    title: 'Right Here, Right Now',
    author: 'Alan Hirsch & Lance Ford',
    coverImage: '/api/placeholder/200/300',
    price: 19.99,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    slug: 'soul-care',
    title: 'Soul Care',
    author: 'Mindy Caliguire',
    coverImage: '/api/placeholder/200/300',
    price: 16.99,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    slug: 'knowledge-spine',
    title: 'The Knowledge Spine',
    author: 'Movemental',
    coverImage: '/api/placeholder/200/300',
    price: 'free' as const,
    rating: 4.7,
    reviewCount: 234,
  },
  {
    slug: 'incarnational-church',
    title: 'The Incarnational Church',
    author: 'Michael Frost',
    coverImage: '/api/placeholder/200/300',
    price: 21.99,
    rating: 4.5,
    reviewCount: 56,
  },
  {
    slug: 'and-bless-broken-road',
    title: 'And: The Gathered and Scattered Church',
    author: 'Hugh Halter & Matt Smay',
    coverImage: '/api/placeholder/200/300',
    price: 18.99,
    rating: 4.4,
    reviewCount: 78,
  },
  {
    slug: 'starfish-spider',
    title: 'The Starfish and the Spider',
    author: 'Ori Brafman',
    coverImage: '/api/placeholder/200/300',
    price: 22.99,
    rating: 4.3,
    reviewCount: 112,
  },
  {
    slug: 'leadership-next',
    title: 'Leadership Next',
    author: 'Eddie Gibbs',
    coverImage: '/api/placeholder/200/300',
    price: 19.99,
    rating: 4.2,
    reviewCount: 45,
  },
]

export default function BooksPage() {
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
              {BOOKS.length} books available
            </p>
            <select className="px-3 py-2 border rounded-lg bg-background text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Grid */}
          <BookCatalogGrid books={BOOKS} />
        </div>
      </section>
    </div>
  )
}
