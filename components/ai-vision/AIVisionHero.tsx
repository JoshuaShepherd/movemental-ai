'use client'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIVisionHeroProps {
  className?: string
}

export function AIVisionHero({ className }: AIVisionHeroProps) {
  const scrollToContent = () => {
    const firstSection = document.getElementById('scenius')
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center px-4',
        'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900',
        className
      )}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Movemental
          </span>
          <br />
          <span className="text-white">Intelligence</span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          AI that amplifies authentic voices while maintaining theological depth
        </p>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="inline-flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
