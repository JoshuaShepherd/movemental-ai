import type { ComponentProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Section } from "./section";

type SectionProps = ComponentProps<typeof Section>;

type BaseProps = {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  /** `next/image` sizes hint */
  sizes?: string;
  priority?: boolean;
  /** Extra classes on the photo (e.g. opacity) */
  imageClassName?: string;
};

/**
 * Light-band hero with a full-bleed photograph, semantic scrim, and content
 * above. Parent gets a minimum height so `fill` images layout correctly.
 */
export function LightHeroPhotoBackdrop({
  children,
  imageSrc,
  imageAlt,
  sizes = "100vw",
  priority,
  imageClassName,
  className,
  ...sectionProps
}: BaseProps & Omit<SectionProps, "variant">) {
  return (
    <Section
      variant="default"
      {...sectionProps}
      className={cn(
        "relative min-h-[min(42vh,440px)] overflow-hidden bg-transparent",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "pointer-events-none object-cover object-center select-none",
          imageClassName,
        )}
      />
      <div
        className="absolute inset-0 z-1 bg-background/85"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </Section>
  );
}

/**
 * Midnight-band hero with a subtle photograph under inverse tokens.
 * Uses `bg-transparent` on the section so the scrim + photo stack read correctly.
 */
export function MidnightHeroPhotoBackdrop({
  children,
  imageSrc,
  imageAlt,
  sizes = "100vw",
  priority,
  imageClassName,
  className,
  ...sectionProps
}: BaseProps & Omit<SectionProps, "variant">) {
  return (
    <Section
      variant="midnight"
      {...sectionProps}
      className={cn(
        "relative min-h-[min(40vh,400px)] overflow-hidden bg-transparent",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "pointer-events-none object-cover object-center select-none opacity-35",
          imageClassName,
        )}
      />
      <div
        className="absolute inset-0 z-1 bg-inverse-surface/88"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </Section>
  );
}
