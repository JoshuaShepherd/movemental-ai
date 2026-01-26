import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookDetailClient } from '@/components/book-purchase'

// Sample books data - in production this would come from database
const BOOKS_DATA: Record<string, {
  slug: string
  title: string
  author: {
    name: string
    slug: string
    avatar?: string
  }
  coverImage: string
  price: number | 'free'
  pageCount: number
  publishYear: number
  rating: number
  reviewCount: number
  description: string
  learningPoints: string[]
}> = {
  'forgotten-ways': {
    slug: 'forgotten-ways',
    title: 'The Forgotten Ways',
    author: {
      name: 'Alan Hirsch',
      slug: 'alan-hirsch',
      avatar: '/api/placeholder/40/40',
    },
    coverImage: '/api/placeholder/400/600',
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
  'knowledge-spine': {
    slug: 'knowledge-spine',
    title: 'The Knowledge Spine',
    author: {
      name: 'Movemental',
      slug: 'movemental',
    },
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = BOOKS_DATA[slug]

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
  const book = BOOKS_DATA[slug]

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
