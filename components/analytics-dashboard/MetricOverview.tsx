'use client'

import { DollarSign, Users, FileText, Sparkles } from 'lucide-react'
import { MetricTile } from './MetricTile'
import { cn } from '@/lib/utils'

interface MetricOverviewProps {
  metrics: {
    revenue: {
      value: number
      trend: number
    }
    reach: {
      value: number
      trend: number
    }
    content: {
      value: number
      trend: number
    }
    aiQuality: {
      value: number
      status: 'good' | 'warning' | 'poor'
    }
  }
  className?: string
}

export function MetricOverview({ metrics, className }: MetricOverviewProps) {
  return (
    <div className={cn('grid sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      <MetricTile
        label="Revenue"
        value={`$${metrics.revenue.value.toLocaleString()}`}
        trend={{
          direction: metrics.revenue.trend >= 0 ? 'up' : 'down',
          percentage: Math.abs(metrics.revenue.trend),
        }}
        icon={DollarSign}
      />
      <MetricTile
        label="Audience Reach"
        value={metrics.reach.value >= 1000 
          ? `${(metrics.reach.value / 1000).toFixed(1)}K` 
          : metrics.reach.value.toString()
        }
        trend={{
          direction: metrics.reach.trend >= 0 ? 'up' : 'down',
          percentage: Math.abs(metrics.reach.trend),
        }}
        icon={Users}
      />
      <MetricTile
        label="Content Pieces"
        value={metrics.content.value}
        trend={{
          direction: metrics.content.trend >= 0 ? 'up' : 'down',
          percentage: Math.abs(metrics.content.trend),
        }}
        icon={FileText}
      />
      <MetricTile
        label="AI Quality"
        value={`${metrics.aiQuality.value}%`}
        trend={{
          direction: metrics.aiQuality.status === 'good' ? 'up' : metrics.aiQuality.status === 'poor' ? 'down' : 'neutral',
          percentage: metrics.aiQuality.status === 'good' ? 5 : metrics.aiQuality.status === 'poor' ? -3 : 0,
        }}
        icon={Sparkles}
      />
    </div>
  )
}
