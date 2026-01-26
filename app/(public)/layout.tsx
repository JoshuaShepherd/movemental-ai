import { PublicNavigation, PublicFooter } from '@/components/shared'

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
    </div>
  )
}
