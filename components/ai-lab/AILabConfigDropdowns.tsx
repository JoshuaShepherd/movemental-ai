'use client'

/**
 * AI Lab configuration dropdowns (Theme, Mode, Style).
 * Same UI pattern as alan-hirsch: centered dropdowns with label + description per option.
 */

import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { Theme, Mode, Style } from '@/lib/types/ai-lab'
import {
  THEME_OPTIONS,
  MODE_OPTIONS,
  STYLE_OPTIONS,
} from '@/lib/types/ai-lab'

export interface AILabConfigDropdownsProps {
  theme: Theme
  mode: Mode
  style: Style
  onThemeChange: (theme: Theme) => void
  onModeChange: (mode: Mode) => void
  onStyleChange: (style: Style) => void
  className?: string
}

export function AILabConfigDropdowns({
  theme,
  mode,
  style,
  onThemeChange,
  onModeChange,
  onStyleChange,
  className,
}: AILabConfigDropdownsProps) {
  const selectedTheme = THEME_OPTIONS.find((t) => t.value === theme)
  const selectedMode = MODE_OPTIONS.find((m) => m.value === mode)
  const selectedStyle = STYLE_OPTIONS.find((s) => s.value === style)

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2',
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 px-3 text-sm font-medium">
            Theme: {selectedTheme?.label}
            <ChevronDown
              className="ml-2 h-4 w-4 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[400px]">
          <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {THEME_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onThemeChange(option.value)}
              className="flex flex-col items-start gap-1 py-3"
            >
              <div className="flex w-full items-center gap-2">
                <span
                  className={cn(
                    'font-medium',
                    theme === option.value && 'text-primary'
                  )}
                >
                  {option.label}
                </span>
                {theme === option.value && (
                  <span className="text-xs text-primary">●</span>
                )}
              </div>
              <p className="mt-1 text-left text-xs leading-relaxed text-muted-foreground">
                {option.description}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 px-3 text-sm font-medium">
            Mode: {selectedMode?.label}
            <ChevronDown
              className="ml-2 h-4 w-4 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[400px]">
          <DropdownMenuLabel>Select Mode</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {MODE_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onModeChange(option.value)}
              className="flex flex-col items-start gap-1 py-3"
            >
              <div className="flex w-full items-center gap-2">
                <span
                  className={cn(
                    'font-medium',
                    mode === option.value && 'text-primary'
                  )}
                >
                  {option.label}
                </span>
                {mode === option.value && (
                  <span className="text-xs text-primary">●</span>
                )}
              </div>
              <p className="mt-1 text-left text-xs leading-relaxed text-muted-foreground">
                {option.description}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 px-3 text-sm font-medium">
            Style: {selectedStyle?.label}
            <ChevronDown
              className="ml-2 h-4 w-4 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[400px]">
          <DropdownMenuLabel>Select Style</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {STYLE_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onStyleChange(option.value)}
              className="flex flex-col items-start gap-1 py-3"
            >
              <div className="flex w-full items-center gap-2">
                <span
                  className={cn(
                    'font-medium',
                    style === option.value && 'text-primary'
                  )}
                >
                  {option.label}
                </span>
                {style === option.value && (
                  <span className="text-xs text-primary">●</span>
                )}
              </div>
              <p className="mt-1 text-left text-xs leading-relaxed text-muted-foreground">
                {option.description}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
