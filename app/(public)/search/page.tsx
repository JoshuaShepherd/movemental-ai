import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchContainer } from '@/components/search'

export const metadata: Metadata = {
  title: 'Search | Movemental',
  description: 'Search articles, books, courses, videos, and leaders across the Movemental network.',
}

function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <Suspense fallback={<SearchLoading />}>
          <SearchContainer />
        </Suspense>
      </div>
    </div>
  )
}
