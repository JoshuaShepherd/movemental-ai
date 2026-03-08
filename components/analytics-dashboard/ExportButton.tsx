'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExportButtonProps {
  onExport: () => void
  isExporting?: boolean
  className?: string
}

export function ExportButton({
  onExport,
  isExporting = false,
  className,
}: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onExport}
      disabled={isExporting}
      className={cn('gap-2', className)}
    >
      <Download className="h-4 w-4" />
      {isExporting ? 'Exporting...' : 'Export'}
    </Button>
  )
}
