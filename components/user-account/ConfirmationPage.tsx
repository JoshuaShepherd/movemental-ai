'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideIcon, Mail } from 'lucide-react'
import Link from 'next/link'

interface ConfirmationPageProps {
  icon?: LucideIcon
  headline: string
  description: string
  helperText?: string
  action?: { label: string; href: string }
  className?: string
}

export function ConfirmationPage({
  icon: Icon = Mail,
  headline,
  description,
  helperText,
  action,
  className,
}: ConfirmationPageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center px-4',
        className
      )}
    >
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>

        {/* Headline */}
        <h1 className="text-2xl font-bold text-foreground mb-3">{headline}</h1>

        {/* Description */}
        <p className="text-muted-foreground mb-6">{description}</p>

        {/* Helper text */}
        {helperText && (
          <p className="text-sm text-muted-foreground mb-6">{helperText}</p>
        )}

        {/* Action */}
        {action && (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
