import * as React from "react";

import { cn } from "@/lib/utils";

import { SurfaceCard } from "./surface-card";

/**
 * Horizontal testimonial strip — CSS scroll-snap, no auto-advance (reduced-motion safe).
 */
export function TestimonialRail({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-rail"
      className={cn("-mx-4 px-4 sm:-mx-6 sm:px-6", className)}
      {...props}
    >
      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </ul>
    </div>
  );
}

export function TestimonialSlide({
  className,
  quote,
  name,
  role,
  ...props
}: React.ComponentProps<"li"> & {
  quote: string;
  name: string;
  role?: string;
}) {
  return (
    <li
      data-slot="testimonial-slide"
      className={cn(
        "w-[min(100vw-2rem,380px)] shrink-0 snap-start sm:w-[400px]",
        className
      )}
      {...props}
    >
      <SurfaceCard tone="on-section" className="h-full min-h-[200px]">
        <p className="text-base leading-relaxed text-foreground">&ldquo;{quote}&rdquo;</p>
        <footer className="mt-6 text-sm">
          <p className="font-semibold text-foreground">{name}</p>
          {role ? (
            <p className="mt-0.5 text-muted-foreground">{role}</p>
          ) : null}
        </footer>
      </SurfaceCard>
    </li>
  );
}
