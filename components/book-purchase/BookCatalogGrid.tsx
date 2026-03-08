'use client'

import { BookCatalogCard } from './BookCatalogCard'
import { cn } from '@/lib/utils'

interface Book {
  slug: string
  title: string
  author: string
  coverImage: string
  price: number | 'free'
  rating?: number
  reviewCount?: number
}

interface BookCatalogGridProps {
  books: Book[]
  className?: string
}

export function BookCatalogGrid({ books, className }: BookCatalogGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6',
        className
      )}
    >
      {books.map((book) => (
        <BookCatalogCard key={book.slug} book={book} />
      ))}
    </div>
  )
}
