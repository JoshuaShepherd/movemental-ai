'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContributorCardProps {
  contributor: {
    name: string
    slug: string
    avatar?: string
    pieceCount: number
  }
  className?: string
}

export function ContributorCard({ contributor, className }: ContributorCardProps) {
  return (
    <Link
      href={`/profile/${contributor.slug}`}
      className={cn(
        'flex flex-col items-center p-4 bg-card border rounded-xl hover:border-primary/50 hover:shadow-md transition-all group',
        className
      )}
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-muted overflow-hidden mb-3">
        {contributor.avatar ? (
          <Image
            src={contributor.avatar}
            alt={contributor.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-semibold text-sm text-center group-hover:text-primary transition-colors line-clamp-1">
        {contributor.name}
      </h3>

      {/* Piece Count */}
      <p className="text-xs text-muted-foreground mt-1">
        {contributor.pieceCount} pieces
      </p>
    </Link>
  )
}
