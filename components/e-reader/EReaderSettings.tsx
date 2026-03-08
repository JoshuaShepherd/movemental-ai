'use client'

import { X, Minus, Plus, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Settings {
  fontSize: number
  theme: 'light' | 'sepia' | 'dark'
  lineSpacing: 'compact' | 'normal' | 'relaxed'
}

interface EReaderSettingsProps {
  settings: Settings
  onChange: (settings: Settings) => void
  onClose: () => void
  isOpen: boolean
  className?: string
}

export function EReaderSettings({
  settings,
  onChange,
  onClose,
  isOpen,
  className,
}: EReaderSettingsProps) {
  if (!isOpen) return null

  const updateFontSize = (delta: number) => {
    const newSize = Math.max(14, Math.min(24, settings.fontSize + delta))
    onChange({ ...settings, fontSize: newSize })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 w-full max-w-sm bg-background z-50 shadow-xl',
          'transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Reading Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Settings */}
        <div className="p-4 space-y-6">
          {/* Font Size */}
          <div>
            <label className="text-sm font-medium mb-3 block">Font Size</label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateFontSize(-2)}
                disabled={settings.fontSize <= 14}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-lg font-medium">{settings.fontSize}px</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateFontSize(2)}
                disabled={settings.fontSize >= 24}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="text-sm font-medium mb-3 block">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'light', label: 'Light', bg: 'bg-white', text: 'text-slate-900' },
                { value: 'sepia', label: 'Sepia', bg: 'bg-amber-50', text: 'text-amber-950' },
                { value: 'dark', label: 'Dark', bg: 'bg-slate-900', text: 'text-white' },
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() =>
                    onChange({
                      ...settings,
                      theme: theme.value as Settings['theme'],
                    })
                  }
                  className={cn(
                    'p-3 rounded-lg border-2 transition-all',
                    theme.bg,
                    theme.text,
                    settings.theme === theme.value
                      ? 'border-primary'
                      : 'border-transparent'
                  )}
                >
                  <span className="text-sm font-medium">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div>
            <label className="text-sm font-medium mb-3 block">Line Spacing</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'compact', label: 'Compact' },
                { value: 'normal', label: 'Normal' },
                { value: 'relaxed', label: 'Relaxed' },
              ].map((spacing) => (
                <button
                  key={spacing.value}
                  onClick={() =>
                    onChange({
                      ...settings,
                      lineSpacing: spacing.value as Settings['lineSpacing'],
                    })
                  }
                  className={cn(
                    'p-3 rounded-lg border-2 transition-all',
                    settings.lineSpacing === spacing.value
                      ? 'border-primary bg-primary/10'
                      : 'border-muted hover:border-muted-foreground/30'
                  )}
                >
                  <span className="text-sm font-medium">{spacing.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
