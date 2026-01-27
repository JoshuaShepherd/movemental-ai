'use client'

import { cn } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts'
import { languageRevenueEstimates, formatCurrency } from '../data/valuation-data'

interface RevenueFlowChartProps {
  className?: string
}

export function RevenueFlowChart({ className }: RevenueFlowChartProps) {
  // Prepare data for the chart
  const chartData = languageRevenueEstimates.map((lang) => ({
    name: lang.language.split(' ')[0], // Just first word for chart
    fullName: lang.language,
    creatorRevenue: lang.revenue,
    movementalShare: lang.revenue * 0.1,
    included: lang.included,
    note: lang.note,
  }))

  const launchLanguages = chartData.filter((d) => d.included)
  const expansionLanguages = chartData.filter((d) => !d.included)

  const totalCreatorRevenue = launchLanguages.reduce((sum, d) => sum + d.creatorRevenue, 0)
  const totalMovementalShare = launchLanguages.reduce((sum, d) => sum + d.movementalShare, 0)

  return (
    <div className={cn('space-y-8', className)}>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
            Creator Revenue (Alan, 3 Languages)
          </p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatCurrency(totalCreatorRevenue)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Estimated annual, conservative
          </p>
        </div>
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
            Movemental Share (10%)
          </p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            {formatCurrency(totalMovementalShare)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Recurring revenue
          </p>
        </div>
      </div>

      {/* Chart: Launch Languages */}
      <div>
        <h4 className="text-sm font-semibold mb-4">Launch Languages (Alan Hirsch)</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={launchLanguages}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis
                type="number"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis type="category" dataKey="name" width={70} />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value as number),
                  name === 'creatorRevenue' ? 'Creator Revenue' : 'Movemental (10%)',
                ]}
                labelFormatter={(label) => {
                  const item = chartData.find((d) => d.name === label)
                  return item?.fullName || String(label)
                }}
              />
              <Bar dataKey="creatorRevenue" name="Creator Revenue" radius={[0, 4, 4, 0]}>
                {launchLanguages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(217, 91%, 60%)" fillOpacity={0.8} />
                ))}
              </Bar>
              <Bar dataKey="movementalShare" name="Movemental (10%)" radius={[0, 4, 4, 0]}>
                {launchLanguages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(160, 60%, 45%)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expansion Languages (Muted) */}
      <div className="opacity-60">
        <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
          Expansion Languages
          <span className="text-xs font-normal text-muted-foreground">(Future)</span>
        </h4>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={expansionLanguages}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis
                type="number"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis type="category" dataKey="name" width={70} />
              <Bar dataKey="creatorRevenue" name="Creator Revenue" radius={[0, 4, 4, 0]}>
                {expansionLanguages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(217, 91%, 60%)" fillOpacity={0.3} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-muted-foreground text-center italic">
        Revenue estimates are conservative projections used for modeling purposes.
      </p>
    </div>
  )
}
