import { Metadata } from 'next'
import { AnalyticsDashboardContainer } from '@/components/analytics-dashboard'

export const metadata: Metadata = {
  title: 'Analytics | Dashboard | Movemental',
  description: 'Track your content performance, audience engagement, and revenue metrics.',
}

export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6 sm:p-8">
      <AnalyticsDashboardContainer />
    </div>
  )
}
