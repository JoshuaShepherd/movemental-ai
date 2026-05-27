'use client'

import Link from 'next/link'
import { ArrowRight, Eye, Share2, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentItem {
  title: string
  slug: string
  views: number
  shares: number
  revenue: number
}

interface ContentPerformanceTableProps {
  content: ContentItem[]
  viewAllHref?: string
  className?: string
}

export function ContentPerformanceTable({
  content,
  viewAllHref,
  className,
}: ContentPerformanceTableProps) {
  return (
    <div className={cn('p-6 bg-card border rounded-xl', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Performing Content</h3>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b">
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium text-right">
                <span className="flex items-center justify-end gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  Views
                </span>
              </th>
              <th className="pb-3 font-medium text-right">
                <span className="flex items-center justify-end gap-1">
                  <Share2 className="h-3.5 w-3.5" />
                  Shares
                </span>
              </th>
              <th className="pb-3 font-medium text-right">
                <span className="flex items-center justify-end gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  Revenue
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {content.map((item, index) => (
              <tr
                key={item.slug}
                className={cn(
                  'hover:bg-muted/50 transition-colors',
                  index !== content.length - 1 && 'border-b'
                )}
              >
                <td className="py-3">
                  <Link
                    href={`/articles/${item.slug}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="py-3 text-right tabular-nums">
                  {item.views.toLocaleString()}
                </td>
                <td className="py-3 text-right tabular-nums">
                  {item.shares.toLocaleString()}
                </td>
                <td className="py-3 text-right tabular-nums">
                  ${item.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
