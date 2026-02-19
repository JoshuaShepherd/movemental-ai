import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookDetailClient } from '@/components/book-purchase'
import { resolveAuthors, type AuthorSlug } from '@/lib/authors'

// Book data with author slugs (identity is slug-based)
// In production this would come from database
interface BookDetailData {
  slug: string
  title: string
  authorSlugs: AuthorSlug[]
  coverImage: string
  price: number | 'free'
  pageCount: number
  publishYear: number
  rating: number
  reviewCount: number
  description: string
  learningPoints: string[]
}

const BOOKS_DATA: Record<string, BookDetailData> = {
  'forgotten-ways': {
    slug: 'forgotten-ways',
    title: 'The Forgotten Ways',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/templates/library/images/books/book-the-forgotten-ways.webp',
    price: 24.99,
    pageCount: 312,
    publishYear: 2016,
    rating: 4.8,
    reviewCount: 142,
    description: `The Forgotten Ways is a groundbreaking exploration of the six elements of missional DNA that powered the early church and can transform the church today.

Drawing on his extensive experience in missional church planting and leadership development, Alan Hirsch presents a compelling case for recovering the apostolic genius that drove explosive growth in the early church.

This book challenges conventional church paradigms and offers practical pathways for activating dormant missional potential in every believer and every church community.`,
    learningPoints: [
      'Understand the six elements of mDNA (Missional DNA) that characterized the early church',
      'Discover how to activate apostolic genius in your community',
      'Learn practical strategies for missional church transformation',
      'Explore the APEST framework for developing leaders',
      'Apply incarnational theology to everyday ministry',
    ],
  },
  reframation: {
    slug: 'reframation',
    title: 'Reframation',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/templates/library/images/books/book-reframation.webp',
    price: 22.99,
    pageCount: 280,
    publishYear: 2020,
    rating: 4.8,
    reviewCount: 89,
    description: `A provocative call to reframe the way we understand and practice the Christian faith in the Western world. Drawing on decades of research into apostolic movements, Hirsch invites readers to reconsider the assumptions that shape how we gather, lead, and engage the world.`,
    learningPoints: [
      'Reframe church, leadership, and mission beyond institutional maintenance',
      'Recover theological imagination for missional engagement',
      'Explore Apostolic Genius and the DNA of movement',
    ],
  },
  untamed: {
    slug: 'untamed',
    title: 'Untamed',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/templates/library/images/books/book-untamed.webp',
    price: 21.99,
    pageCount: 320,
    publishYear: 2010,
    rating: 4.7,
    reviewCount: 76,
    description: `Reimagining the wild, dangerous, and beautiful life of discipleship beyond tame religion. Alan and Debra Hirsch call readers to untame their view of God, culture, and self for missional discipleship.`,
    learningPoints: [
      'Untame your idea of God, culture, and self',
      'Jesus-shaped discipleship and Shema spirituality',
      'Practical incarnational mission',
    ],
  },
  'on-the-verge': {
    slug: 'on-the-verge',
    title: 'On the Verge',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/templates/library/images/books/book-on-the-verge.webp',
    price: 23.99,
    pageCount: 304,
    publishYear: 2011,
    rating: 4.7,
    reviewCount: 112,
    description: `A roadmap for the church on the verge of apostolic movement. Hirsch and Ferguson explore Verge church thinking, apostolic genius, and how to move from institutional to movemental forms of church.`,
    learningPoints: [
      'Verge church and apostolic movement paradigm',
      'Apostolic Genius and mDNA in practice',
      'Both/and thinking for established and missional church',
    ],
  },
  metanoia: {
    slug: 'metanoia',
    title: 'Metanoia',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/templates/library/images/books/book-metanoia.webp',
    price: 24.99,
    pageCount: 288,
    publishYear: 2019,
    rating: 4.8,
    reviewCount: 64,
    description: `A renewal of mind and paradigm—metanoia as the doorway to transformation. Hirsch explores repentance as radical reorientation and the ever-expansive reframing of reality before God.`,
    learningPoints: [
      'Metanoia as paradigm shift and mind-blowing transformation',
      'Renewing the nous and overcoming disenchantment',
      'Ongoing conversion and horizon change',
    ],
  },
  'the-faith-of-leap': {
    slug: 'the-faith-of-leap',
    title: 'The Faith of Leap',
    authorSlugs: ['alan-hirsch'],
    coverImage: '/templates/library/images/books/book-the-faith-of-leap.webp',
    price: 22.99,
    pageCount: 256,
    publishYear: 2012,
    rating: 4.6,
    reviewCount: 58,
    description: `Embracing a theology of risk, adventure, and courage. Hirsch and Frost explore liminality, communitas, and the hero's journey as normative for the people of God in mission.`,
    learningPoints: [
      'Liminality and communitas in mission',
      'The hero\'s journey and collective adventure',
      'Missional matrix: discipleship, mobilization, communitas',
    ],
  },
  'knowledge-spine': {
    slug: 'knowledge-spine',
    title: 'The Knowledge Spine',
    authorSlugs: ['movemental'],
    coverImage: '/api/placeholder/400/600',
    price: 'free',
    pageCount: 186,
    publishYear: 2025,
    rating: 4.7,
    reviewCount: 234,
    description: `The Knowledge Spine is your foundational guide to understanding platform ownership, revenue retention, and how to create content that catalyzes lasting change.

This free resource establishes the shared language, discernment, and posture needed to use Movemental effectively. It's not a lead magnet—it's the foundation for everything we do.

Whether you're a seasoned movement leader or just beginning your journey, this book provides the conceptual framework for thriving in the digital age while maintaining theological depth and authentic voice.`,
    learningPoints: [
      'Master the vocabulary of platform ownership vs. rental',
      'Develop discernment for effective content strategies',
      'Understand network effects and amplification',
      'Learn the posture needed for creating transformational content',
      'Discover how AI can amplify authentic voice without replacing it',
    ],
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Resolve book data with authors from registry
 */
async function getBookWithAuthors(slug: string) {
  const bookData = BOOKS_DATA[slug]
  if (!bookData) return null

  // Resolve authors from registry
  const authors = await resolveAuthors(bookData.authorSlugs)
  const primaryAuthor = authors[0]

  return {
    slug: bookData.slug,
    title: bookData.title,
    author: {
      name: authors.map((a) => a.displayName).join(' & '),
      slug: primaryAuthor?.slug || bookData.authorSlugs[0],
      avatar: primaryAuthor?.avatarUrl,
    },
    coverImage: bookData.coverImage,
    price: bookData.price,
    pageCount: bookData.pageCount,
    publishYear: bookData.publishYear,
    rating: bookData.rating,
    reviewCount: bookData.reviewCount,
    description: bookData.description,
    learningPoints: bookData.learningPoints,
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookWithAuthors(slug)

  if (!book) {
    return {
      title: 'Book Not Found | Movemental',
    }
  }

  return {
    title: `${book.title} by ${book.author.name} | Movemental`,
    description: book.description.slice(0, 160),
  }
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params
  const book = await getBookWithAuthors(slug)

  if (!book) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/books">
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </Button>
      </div>

      {/* Book Detail */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <BookDetailClient book={book} />
      </div>
    </div>
  )
}
