'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BookCoverProps {
  coverImage: string
  title: string
  className?: string
}

export function BookCover({ coverImage, title, className }: BookCoverProps) {
  return (
    <div
      className={cn(
        'relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl',
        className
      )}
    >
      {coverImage ? (
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center p-8">
          <span className="text-white text-center font-serif text-xl">
            {title}
          </span>
        </div>
      )}
    </div>
  )
}
