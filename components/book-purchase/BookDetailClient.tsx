'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookCover } from './BookCover'
import { BookMeta } from './BookMeta'
import { BookPurchaseCard } from './BookPurchaseCard'
import { BookDescription } from './BookDescription'

interface BookData {
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
}

interface BookDetailClientProps {
  book: BookData
}

export function BookDetailClient({ book }: BookDetailClientProps) {
  const handlePurchase = () => {
    // TODO: Implement purchase flow
    console.log('Purchase:', book.title)
  }

  const handleReadSample = () => {
    // TODO: Implement sample reading
    console.log('Read sample:', book.title)
  }

  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-8 lg:gap-12">
      {/* Left Column: Cover and Purchase */}
      <div className="space-y-6">
        <BookCover
          coverImage={book.coverImage}
          title={book.title}
          className="max-w-[280px] mx-auto lg:max-w-none"
        />
        <BookPurchaseCard
          price={book.price}
          subscriptionPrice={book.price === 'free' ? undefined : 9.99}
          onPurchase={handlePurchase}
          onReadSample={handleReadSample}
        />
      </div>

      {/* Right Column: Info */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{book.title}</h1>
          <BookMeta
            author={book.author}
            pageCount={book.pageCount}
            publishYear={book.publishYear}
            rating={book.rating}
            reviewCount={book.reviewCount}
          />
        </div>

        <BookDescription
          description={book.description}
          learningPoints={book.learningPoints}
        />

        {/* Read Button (for purchased/free books) */}
        {book.price === 'free' && (
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/books/${book.slug}/read`}>
              Start Reading
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
