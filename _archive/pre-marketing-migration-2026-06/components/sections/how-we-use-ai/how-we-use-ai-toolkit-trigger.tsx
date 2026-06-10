import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Closing CTA on /how-we-use-ai. Routes to the canonical Field Guide
 * landing page (`/field-guides/safety`); capture happens there, not inline.
 */
export function HowWeUseAiToolkitTrigger({
  className,
}: {
  source?: string;
  className?: string;
}) {
  return (
    <Link href="/field-guides/safety" className={cn("btn-pill btn-pill--primary", className)}>
      Read the Safety Field Guide
    </Link>
  );
}
