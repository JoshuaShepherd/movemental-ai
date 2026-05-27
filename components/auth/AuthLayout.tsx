'use client'

import Link from 'next/link'
import { Send } from 'lucide-react'

/**
 * Full-page auth layout: dark gradient background, centered content area, fixed footer.
 * Matches Framer-style auth screens with Movemental palette (sage + scarlet).
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sage-950 px-4 py-8 pb-24 relative">
      {/* Gradient overlay (replaces blue/purple with sage) */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(160deg, var(--color-sage-950) 0%, var(--color-sage-900) 35%, var(--color-sage-800) 100%)',
        }}
      />

      {children}

      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3.5 bg-sage-950 border-t border-white/[0.06]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          <Send className="h-5 w-5 text-scarlet-rush-400" aria-hidden />
          Movemental
        </Link>
        <span className="text-[0.8125rem] text-bright-snow-400">
          curated by <strong className="text-white font-semibold">Movemental</strong>
        </span>
      </footer>
    </div>
  )
}
