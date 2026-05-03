import Image from "next/image";
import * as React from "react";

import { ArrowLink } from "@/components/primitives/arrow-link";
import { cn } from "@/lib/utils";

export type AtmosphericMediaCardProps = React.ComponentProps<"div"> & {
  imageUrl: string;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

/**
 * “Atmospheric image” card — tonal image field, gradient scrim, icon anchor, ArrowLink CTA.
 * Translated from `docs/build/stitch/movemental_card_variation_showcase/code.html` §1.
 */
export function AtmosphericMediaCard({
  imageUrl,
  imageAlt,
  icon,
  title,
  description,
  href,
  linkLabel,
  className,
  ...props
}: AtmosphericMediaCardProps) {
  return (
    <div
      data-slot="atmospheric-media-card"
      className={cn(
        "group relative flex min-h-[28rem] items-end overflow-hidden rounded-xl bg-muted p-8 sm:p-12",
        className
      )}
      {...props}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover opacity-30 grayscale transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        sizes="(min-width: 1024px) 1200px, 100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="relative z-10 max-w-xl">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground [&_svg]:size-6">
          {icon}
        </div>
        <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ArrowLink href={href} size="md">
          {linkLabel}
        </ArrowLink>
      </div>
    </div>
  );
}
