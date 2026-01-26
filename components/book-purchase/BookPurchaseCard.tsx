'use client'

import { ShoppingCart, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BookPurchaseCardProps {
  price: number | 'free'
  subscriptionPrice?: number
  onPurchase?: () => void
  onReadSample?: () => void
  isPurchased?: boolean
  className?: string
}

export function BookPurchaseCard({
  price,
  subscriptionPrice,
  onPurchase,
  onReadSample,
  isPurchased = false,
  className,
}: BookPurchaseCardProps) {
  return (
    <div
      className={cn(
        'p-6 bg-card border rounded-xl',
        className
      )}
    >
      {isPurchased ? (
        <>
          <p className="text-sm text-muted-foreground mb-2">You own this book</p>
          <Button className="w-full h-12" size="lg">
            <BookOpen className="mr-2 h-5 w-5" />
            Continue Reading
          </Button>
        </>
      ) : (
        <>
          {/* Price */}
          <div className="mb-4">
            <p className="text-3xl font-bold">
              {price === 'free' ? 'Free' : `$${price}`}
            </p>
            {subscriptionPrice && price !== 'free' && (
              <p className="text-sm text-muted-foreground mt-1">
                or ${subscriptionPrice}/mo with subscription
              </p>
            )}
          </div>

          {/* Buy Button */}
          <Button
            className="w-full h-12 mb-3"
            size="lg"
            onClick={onPurchase}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {price === 'free' ? 'Get Free Book' : 'Buy Now'}
          </Button>

          {/* Sample */}
          <Button
            variant="outline"
            className="w-full"
            onClick={onReadSample}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Read Sample
          </Button>

          {/* Features */}
          <div className="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
            <p>✓ Instant digital access</p>
            <p>✓ Read on any device</p>
            <p>✓ Lifetime access</p>
            {price !== 'free' && <p>✓ 30-day money-back guarantee</p>}
          </div>
        </>
      )}
    </div>
  )
}
