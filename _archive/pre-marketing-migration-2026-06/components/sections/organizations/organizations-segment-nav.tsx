"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/primitives";
import { cn } from "@/lib/utils";

const segments = [
  { href: "/organizations", label: "Overview" },
  { href: "/churches", label: "Churches" },
  { href: "/nonprofits", label: "Nonprofits" },
  { href: "/institutions", label: "Institutions" },
] as const;

const linkClass =
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-section";

/**
 * In-page wayfinding between the organizations hub and the three org-shaped audience routes.
 * Rendered at the top of `/organizations` and each segment page.
 */
export function OrganizationsSegmentNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-section">
      <Container className="py-2.5">
        <nav aria-label="Organization segments" className="flex flex-wrap items-center gap-1">
          {segments.map((seg) => {
            const isActive =
              seg.href === "/organizations"
                ? pathname === "/organizations"
                : pathname === seg.href || pathname.startsWith(`${seg.href}/`);

            return (
              <Link
                key={seg.href}
                href={seg.href}
                className={cn(linkClass, isActive && "bg-background text-foreground shadow-ambient")}
                aria-current={isActive ? "page" : undefined}
              >
                {seg.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
