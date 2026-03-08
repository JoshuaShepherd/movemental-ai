'use client'

import { cn } from '@/lib/utils'
import { Twitter } from 'lucide-react'
import Image from 'next/image'

interface TestimonialQuoteProps {
  quote: string
  author: {
    name: string
    title: string
    company?: string
    avatarUrl?: string
    socialUrl?: string
    socialHandle?: string
  }
  backgroundColor?: string
  className?: string
}

export function TestimonialQuote({
  quote,
  author,
  backgroundColor = 'bg-primary',
  className,
}: TestimonialQuoteProps) {
  return (
    <section
      className={cn(
        'py-16 sm:py-24 px-4',
        backgroundColor,
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Author info with avatar */}
          <div className="flex flex-col items-center md:items-start shrink-0">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white/20 ring-4 ring-white/30">
              {author.avatarUrl ? (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Name and title */}
            <div className="mt-4 text-center md:text-left">
              <p className="font-semibold text-white">{author.name}</p>
              <p className="text-sm text-white/70">{author.title}</p>
              {author.company && (
                <p className="text-sm text-white/70">{author.company}</p>
              )}
              {author.socialHandle && (
                <p className="text-sm text-white/50 mt-1">{author.socialHandle}</p>
              )}
            </div>

            {/* Social link */}
            {author.socialUrl && (
              <a
                href={author.socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-4 w-4 text-white" />
              </a>
            )}
          </div>

          {/* Quote */}
          <blockquote className="flex-1">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
