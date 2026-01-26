'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookCatalogCardProps {
  book: {
    slug: string
    title: string
    author: string
    coverImage: string
    price: number | 'free'
    rating?: number
    reviewCount?: number
  }
  className?: string
}

export function BookCatalogCard({ book, className }: BookCatalogCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={cn(
        'block group',
        className
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[2/3] mb-3 rounded-lg overflow-hidden bg-muted shadow-md group-hover:shadow-xl transition-shadow">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center p-4">
            <span className="text-white text-center font-serif text-sm">
              {book.title}
            </span>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
          {book.price === 'free' ? 'Free' : `$${book.price}`}
        </div>
      </div>

      {/* Info */}
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
        {book.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>

      {/* Rating */}
      {book.rating !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{book.rating.toFixed(1)}</span>
          {book.reviewCount !== undefined && (
            <span className="text-muted-foreground">
              ({book.reviewCount})
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
