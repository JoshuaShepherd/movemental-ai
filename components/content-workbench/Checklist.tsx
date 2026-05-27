'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check, Circle } from 'lucide-react'

interface ChecklistItem {
  id: string
  text: string
  checked?: boolean
}

interface ChecklistProps {
  /** Checklist title */
  title?: string
  /** Description/subtitle */
  description?: string
  /** Array of checklist items */
  items: ChecklistItem[]
  /** Whether items are interactive (checkable) */
  interactive?: boolean
  /** Item change handler */
  onItemChange?: (itemId: string, checked: boolean) => void
  /** Custom class name */
  className?: string
}

export function Checklist({
  title,
  description,
  items: initialItems,
  interactive = false,
  onItemChange,
  className,
}: ChecklistProps) {
  const [items, setItems] = useState(initialItems)

  const handleToggle = (itemId: string) => {
    if (!interactive) return

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    )
    const item = items.find((i) => i.id === itemId)
    if (item) {
      onItemChange?.(itemId, !item.checked)
    }
  }

  const completedCount = items.filter((i) => i.checked).length

  return (
    <div className={cn('', className)}>
      {/* Header */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="font-semibold text-lg">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Progress (if interactive) */}
      {interactive && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {completedCount} of {items.length} complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(completedCount / items.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleToggle(item.id)}
              className={cn(
                'flex items-start gap-3 w-full text-left py-2 px-3 rounded-md transition-colors',
                interactive && 'hover:bg-accent cursor-pointer',
                !interactive && 'cursor-default'
              )}
              disabled={!interactive}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors',
                  item.checked
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted-foreground/50'
                )}
              >
                {item.checked ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Circle className="h-3 w-3 opacity-0" />
                )}
              </div>

              {/* Text */}
              <span
                className={cn(
                  'text-sm',
                  item.checked && 'line-through text-muted-foreground'
                )}
              >
                {item.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
