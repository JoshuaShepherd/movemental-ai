import { Suspense } from 'react'
import { PublicNavigation, PublicFooter } from '@/components/shared'
import { TourPanel } from '@/components/tour'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavigation />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
      <Suspense fallback={null}>
        <TourPanel />
      </Suspense>
    </div>
  )
}
