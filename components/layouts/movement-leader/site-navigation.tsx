"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface SiteNavigationProps {
  className?: string;
}

const templatePages = [
  { label: "Home", href: "/templates" },
  { label: "About", href: "/templates/about" },
  { label: "Books", href: "/templates/books" },
  { label: "Articles", href: "/templates/articles" },
  { label: "Podcasts", href: "/templates/podcasts" },
  { label: "Video", href: "/templates/video" },
  { label: "Courses", href: "/templates/courses" },
  { label: "Chat", href: "/templates/chat" },
  { label: "Assessments", href: "/templates/assessments" },
  { label: "Content", href: "/templates/content" },
];

/**
 * Template-scoped navigation bar
 * Navigates between template page types (Home, About, Books, etc.)
 * Includes a link back to the main Movemental site
 */
export function SiteNavigation({ className }: SiteNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("sticky top-0 z-50", className)}
      style={{ backgroundColor: "var(--mvmt-surface-dark)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-6">
          {/* Back to main site */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wider transition-colors shrink-0"
            style={{ color: "var(--mvmt-on-dark-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--mvmt-on-dark-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--mvmt-on-dark-muted)")
            }
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            MOVEMENTAL
          </Link>

          {/* Divider */}
          <div className="h-5 w-px shrink-0" style={{ backgroundColor: "var(--mvmt-border-on-dark)" }} />

          {/* Template page links */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {templatePages.map((item) => {
              const isActive =
                item.href === "/templates"
                  ? pathname === "/templates"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-xs font-medium tracking-wider transition-colors whitespace-nowrap rounded-md",
                    isActive && "bg-white/10"
                  )}
                  style={{
                    color: isActive
                      ? "var(--mvmt-on-dark-primary)"
                      : "var(--mvmt-on-dark-secondary)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--mvmt-on-dark-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "var(--mvmt-on-dark-primary)"
                      : "var(--mvmt-on-dark-secondary)")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

SiteNavigation.displayName = "SiteNavigation";
