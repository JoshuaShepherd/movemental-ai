import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

export type DotTextureCardProps = React.ComponentProps<"div"> & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaAlt: string;
};

/**
 * Tonal “dot field” surface with supporting media — replaces Stitch’s raw `#c3c6d7` dots
 * with `var(--outline)` so the texture stays on the semantic ramp.
 * Translated from Stitch card gallery §3.
 */
export function DotTextureCard({
  title,
  description,
  mediaUrl,
  mediaAlt,
  className,
  ...props
}: DotTextureCardProps) {
  return (
    <div
      data-slot="dot-texture-card"
      className={cn(
        "group w-full rounded-xl bg-section p-10 transition-[background-color] duration-500 ease-out hover:bg-elevated/80 md:w-2/3 motion-reduce:transition-none",
        "[background-image:radial-gradient(circle,var(--outline)_1px,transparent_1px)] [background-size:20px_20px]",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-10 md:flex-row md:gap-12">
        <div className="flex-1">
          <h3 className="mb-4 text-2xl font-medium tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-lg leading-[1.75] text-muted-foreground">{description}</p>
        </div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-elevated transition-colors duration-500 group-hover:bg-primary/12 md:w-48">
          <Image
            src={mediaUrl}
            alt={mediaAlt}
            fill
            className="object-cover opacity-50 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70"
            sizes="(min-width: 768px) 12rem, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
