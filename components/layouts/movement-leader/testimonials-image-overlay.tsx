"use client";

import { cn } from "@/lib/utils";

interface TestimonialsImageOverlayProps {
  className?: string;
}

/**
 * Testimonials Image Overlay — Full-width image area with floating quote card overlay
 * Tall placeholder image, gradient overlay, floating testimonial card at bottom
 */
export function TestimonialsImageOverlay({ className }: TestimonialsImageOverlayProps) {
  return (
    <section className={cn("relative w-full bg-mvmt-surface-dark", className)}>
      {/* Image Area */}
      <div className="relative w-full aspect-[16/7] min-h-[400px] bg-mvmt-surface-dark flex items-center justify-center">
        <span className="text-mvmt-on-dark-muted text-sm tracking-widest uppercase">
          Featured Image
        </span>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-mvmt-gradient-overlay-dark" />

        {/* Floating Card */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-2xl px-4">
          <div className="bg-mvmt-surface-light rounded-2xl shadow-lg px-8 py-8 md:px-10 md:py-10">
            {/* Quote */}
            <p className="text-lg md:text-xl leading-relaxed text-mvmt-on-light-primary mb-6">
              &ldquo;Multiplication is not just a strategy — it&rsquo;s the DNA of every
              healthy movement. When leaders develop leaders, the Kingdom advances
              exponentially.&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-mvmt-accent flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-mvmt-on-accent">DF</span>
              </div>
              <div>
                <p className="font-semibold text-mvmt-on-light-primary">Dave Ferguson</p>
                <p className="text-sm text-mvmt-on-light-secondary">Lead Visionary, NewThing Network</p>
              </div>
            </div>

            {/* Read Story Link */}
            <div className="mt-6">
              <a href="#" className="text-sm font-medium text-mvmt-accent hover:underline">
                Read Story &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for floating card overflow */}
      <div className="h-40 md:h-48 bg-mvmt-surface-light-muted" />
    </section>
  );
}

TestimonialsImageOverlay.displayName = "TestimonialsImageOverlay";
