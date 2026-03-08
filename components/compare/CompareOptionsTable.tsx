'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Check, X, HelpCircle } from 'lucide-react'
import type { CompareRow } from '@/lib/compare-options-data'

export type { CompareRow } from '@/lib/compare-options-data'

function CellValue({
  value,
  isMovemental,
}: {
  value: string | true | false
  isMovemental?: boolean
}) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
        <Check className="h-5 w-5 shrink-0" aria-hidden />
        <span>Included</span>
      </span>
    )
  if (value === false)
    return (
      <span className="inline-flex items-center justify-center gap-1 text-muted-foreground">
        <X className="h-5 w-5 shrink-0" aria-hidden />
        <span>—</span>
      </span>
    )
  return (
    <span className={isMovemental ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
      {value}
    </span>
  )
}

interface CompareOptionsTableProps {
  rows: CompareRow[]
  showSourcesLink?: boolean
  showSubstackGuideLink?: boolean
  className?: string
}

/**
 * Movemental vs Agency vs Course platforms vs Substack comparison table.
 * Used on /compare and embedded in How It Works.
 */
export function CompareOptionsTable({
  rows,
  showSourcesLink = true,
  showSubstackGuideLink = false,
  className = '',
}: CompareOptionsTableProps) {
  const categories = Array.from(new Set(rows.map((r) => r.category)))

  return (
    <div className={className}>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold text-foreground w-[200px] sm:w-[220px]">
                Feature
              </th>
              <th className="text-center py-4 px-2 sm:px-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30 w-[100px] sm:w-[120px]">
                Movemental
              </th>
              <th className="text-center py-4 px-2 sm:px-3 font-semibold text-muted-foreground w-[90px] sm:w-[110px]">
                Agency
              </th>
              <th className="text-center py-4 px-2 sm:px-3 font-semibold text-muted-foreground w-[90px] sm:w-[120px]">
                Course platforms
              </th>
              <th className="text-center py-4 px-2 sm:px-3 font-semibold text-muted-foreground w-[90px] sm:w-[110px]">
                Substack
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <Fragment key={cat}>
                <tr className="bg-muted/40">
                  <td
                    colSpan={5}
                    className="py-2 px-4 text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border"
                  >
                    {cat}
                  </td>
                </tr>
                {rows.filter((r) => r.category === cat).map((row) => (
                  <tr
                    key={`${row.category}-${row.feature}`}
                    className="border-b border-border/80 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-foreground align-top">
                      {row.feature}
                    </td>
                    <td className="py-3 px-2 sm:px-3 text-center text-sm align-top bg-emerald-50/30 dark:bg-emerald-950/20">
                      <CellValue value={row.movemental} isMovemental />
                    </td>
                    <td className="py-3 px-2 sm:px-3 text-center text-sm align-top">
                      <CellValue value={row.agency} />
                    </td>
                    <td className="py-3 px-2 sm:px-3 text-center text-sm align-top">
                      <CellValue value={row.coursePlatforms} />
                    </td>
                    <td className="py-3 px-2 sm:px-3 text-center text-sm align-top">
                      <CellValue value={row.substack} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
        {showSourcesLink && (
          <p className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 shrink-0" />
            Agency, course platforms, and Substack figures from public pricing and industry reports
            (2024–2025). See{' '}
            <Link href="/compare#sources" className="underline hover:text-foreground">
              sources
            </Link>
            .
          </p>
        )}
        {showSubstackGuideLink && (
          <p>
            Considering Substack?{' '}
            <Link
              href="/compare/substack"
              className="underline hover:text-foreground font-medium"
            >
              Read our honest comparison
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
