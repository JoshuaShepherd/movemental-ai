import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Same-origin links to public marketing surfaces (field guides, commitments,
 * directory). Distinct from body links: burnished amber + hairline underline.
 */
export function DashboardPublicSiteLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "font-sans text-[14px] font-medium text-pathway-accent underline decoration-[0.5px] decoration-pathway-accent/55 underline-offset-[5px] transition-colors hover:decoration-pathway-accent",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
