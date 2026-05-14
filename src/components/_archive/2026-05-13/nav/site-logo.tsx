import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Light UI: dark ink on transparent (nav uses `bg-card`). */
const WORDMARK_LIGHT_SRC =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent.webp";

/** Dark UI: light wordmark on transparent. */
const WORDMARK_DARK_SRC =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent-white.webp";

/** Intrinsic ratio matches Supabase wordmark exports (749×239). */
const WORDMARK_WIDTH = 749;
const WORDMARK_HEIGHT = 239;

export type SiteLogoSize = "sm" | "md";

type SiteLogoProps = {
  size?: SiteLogoSize;
  className?: string;
};

/**
 * Home-linked wordmark for chrome (nav, drawer header).
 * Parent link carries the accessible name; image is decorative.
 */
export function SiteLogo({ size = "md", className }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      aria-label="Movemental home"
    >
      <Image
        src={WORDMARK_LIGHT_SRC}
        alt=""
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        priority
        className={cn(
          "w-auto max-w-[min(100%,400px)] sm:max-w-none dark:hidden",
          size === "sm" ? "h-12" : "h-14"
        )}
      />
      <Image
        src={WORDMARK_DARK_SRC}
        alt=""
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        priority
        className={cn(
          "hidden w-auto max-w-[min(100%,400px)] sm:max-w-none dark:block",
          size === "sm" ? "h-12" : "h-14"
        )}
      />
    </Link>
  );
}
