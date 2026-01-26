'use client'

import { useState } from 'react'
import { MetricOverview } from './MetricOverview'
import { RevenueChart } from './RevenueChart'
import { AudienceReachGauge } from './AudienceReachGauge'
import { ContentPerformanceTable } from './ContentPerformanceTable'
import { NetworkInsightsCard } from './NetworkInsightsCard'
import { TransparencyMetrics } from './TransparencyMetrics'
import { DateRangePicker } from './DateRangePicker'
import { ExportButton } from './ExportButton'
import { cn } from '@/lib/utils'

// Sample data - in production this would come from API
const SAMPLE_METRICS = {
  revenue: { value: 4250, trend: 12 },
  reach: { value: 28500, trend: 45 },
  content: { value: 42, trend: 8 },
  aiQuality: { value: 94, status: 'good' as const },
}

const SAMPLE_REVENUE_DATA = [
  { label: 'Jan', value: 2100 },
  { label: 'Feb', value: 2800 },
  { label: 'Mar', value: 3200 },
  { label: 'Apr', value: 3800 },
  { label: 'May', value: 4100 },
  { label: 'Jun', value: 4250 },
]

const SAMPLE_CONTENT = [
  { title: 'The Credibility Crisis', slug: 'credibility-crisis', views: 4250, shares: 342, revenue: 850 },
  { title: 'Network Effects Matter', slug: 'network-effects', views: 3100, shares: 256, revenue: 620 },
  { title: 'APEST in Practice', slug: 'apest-practice', views: 2800, shares: 198, revenue: 540 },
  { title: 'AI and Theology', slug: 'ai-theology', views: 2450, shares: 187, revenue: 480 },
  { title: 'Formation Practices', slug: 'formation-practices', views: 2100, shares: 145, revenue: 420 },
]

const SAMPLE_OVERLAPS = [
  { name: 'Alan Hirsch', slug: 'alan-hirsch', avatar: '/api/placeholder/32/32', percentage: 28 },
  { name: 'Tim Keel', slug: 'tim-keel', avatar: '/api/placeholder/32/32', percentage: 22 },
  { name: 'Mindy Caliguire', slug: 'mindy-caliguire', avatar: '/api/placeholder/32/32', percentage: 18 },
]

const SAMPLE_BADGE_DISTRIBUTION = [
  { label: 'Human-Created', percentage: 42, color: 'bg-green-500' },
  { label: 'AI-Assisted', percentage: 35, color: 'bg-blue-500' },
  { label: 'AI-Generated', percentage: 1, color: 'bg-purple-500' },
  { label: 'No Badge', percentage: 22, color: 'bg-muted-foreground' },
]

interface AnalyticsDashboardContainerProps {
  className?: string
}

export function AnalyticsDashboardContainer({
  className,
}: AnalyticsDashboardContainerProps) {
  const [dateRange, setDateRange] = useState('30d')
  const [revenuePeriod, setRevenuePeriod] = useState<'mtd' | 'qtd'>('mtd')

  const handleExport = () => {
    console.log('Exporting analytics...')
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics Overview</h1>
          <p className="text-muted-foreground">
            Track your content performance and audience engagement
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <ExportButton onExport={handleExport} />
        </div>
      </div>

      {/* Metric Overview */}
      <MetricOverview metrics={SAMPLE_METRICS} />

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart
          data={SAMPLE_REVENUE_DATA}
          total={24500}
          average={4083}
          peak={5200}
          period={revenuePeriod}
          onPeriodChange={setRevenuePeriod}
        />
        <AudienceReachGauge
          ownReach={1200}
          networkReach={33600}
          amplification={28}
        />
      </div>

      {/* Content Performance */}
      <ContentPerformanceTable
        content={SAMPLE_CONTENT}
        viewAllHref="/dashboard/analytics/content"
      />

      {/* Network and Transparency */}
      <div className="grid lg:grid-cols-2 gap-6">
        <NetworkInsightsCard
          overlapPercentage={34}
          collaborationCount={12}
          topOverlaps={SAMPLE_OVERLAPS}
        />
        <TransparencyMetrics
          badgeCoverage={78}
          distribution={SAMPLE_BADGE_DISTRIBUTION}
        />
      </div>
    </div>
  )
}
