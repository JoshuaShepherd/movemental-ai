'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, User, BookOpen, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookMetaProps {
  author: {
    name: string
    slug: string
    avatar?: string
  }
  pageCount: number
  publishYear: number
  rating: number
  reviewCount: number
  className?: string
}

export function BookMeta({
  author,
  pageCount,
  publishYear,
  rating,
  reviewCount,
  className,
}: BookMetaProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Author */}
      <Link
        href={`/profile/${author.slug}`}
        className="flex items-center gap-3 group"
      >
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">by</p>
          <p className="font-medium group-hover:text-primary transition-colors">
            {author.name}
          </p>
        </div>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'h-5 w-5',
                star <= Math.round(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground">({reviewCount} reviews)</span>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4" />
          <span>{pageCount} pages</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{publishYear}</span>
        </div>
      </div>
    </div>
  )
}
