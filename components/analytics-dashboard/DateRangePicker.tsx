'use client'

import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Preset {
  label: string
  value: string
}

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
  presets?: Preset[]
  className?: string
}

const DEFAULT_PRESETS: Preset[] = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last 12 months', value: '12m' },
]

export function DateRangePicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {presets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  )
}
