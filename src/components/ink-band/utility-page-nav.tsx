import Link from "next/link";
import type { ReactNode } from "react";

const crumbLinkClass =
  "transition-colors hover:text-[var(--color-ink-band-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * Ink Band utility-page navigation — breadcrumb + back link at the top, optional
 * footer links at the bottom. Matches the agent room `.crumb` vocabulary
 * (mono, uppercase, ink-blue hover) on standalone surfaces like `/enroll`.
 */
export function UtilityPageCrumb({
  backHref = "/agent",
  backLabel = "Agent room",
  currentLabel,
}: {
  backHref?: string;
  backLabel?: string;
  currentLabel: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.63rem] uppercase tracking-[0.1em] text-muted-foreground">
        <li>
          <Link href={backHref} className={crumbLinkClass}>
            ← {backLabel}
          </Link>
        </li>
        <li aria-hidden className="text-muted-foreground/40">
          ·
        </li>
        <li aria-current="page" className="text-foreground">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}

export function UtilityPageFooter({ children }: { children?: ReactNode }) {
  if (children) {
    return (
      <nav
        aria-label="Page help"
        className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-sm text-muted-foreground"
      >
        {children}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Page help"
      className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-sm text-muted-foreground"
    >
      <Link href="/agent" className={crumbLinkClass}>
        Back to the agent room
      </Link>
      <span aria-hidden className="text-muted-foreground/40">
        ·
      </span>
      <Link href="/field-guide" className={crumbLinkClass}>
        Field guide
      </Link>
      <span aria-hidden className="text-muted-foreground/40">
        ·
      </span>
      <a href="mailto:josh@movemental.ai" className={crumbLinkClass}>
        Questions?
      </a>
    </nav>
  );
}
