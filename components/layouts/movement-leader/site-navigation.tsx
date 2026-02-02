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
  { label: "About", href: "/templates/movement-leader/about" },
  { label: "Articles", href: "/templates/movement-leader/articles" },
  { label: "Assessments", href: "/templates/movement-leader/assessments" },
  { label: "Auth", href: "/templates/movement-leader/auth" },
  { label: "Books", href: "/templates/movement-leader/books" },
  { label: "Chat", href: "/templates/movement-leader/chat" },
  { label: "Content", href: "/templates/movement-leader/content" },
  { label: "Courses", href: "/templates/movement-leader/courses" },
  { label: "FAQ", href: "/templates/movement-leader/faq" },
  { label: "Lead Magnet", href: "/templates/movement-leader/lead-magnet" },
  { label: "Misc", href: "/templates/movement-leader/misc" },
  { label: "Pricing", href: "/templates/movement-leader/pricing" },
  { label: "Reader", href: "/templates/movement-leader/reader" },
  { label: "Search", href: "/templates/movement-leader/search" },
  { label: "Special", href: "/templates/movement-leader/special" },
  { label: "Testimonials", href: "/templates/movement-leader/testimonials" },
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
      className={cn("sticky top-0 z-50 bg-mvmt-surface-dark", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-6">
          {/* Back to main site */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wider transition-colors shrink-0 text-mvmt-on-dark-muted hover:text-mvmt-on-dark-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            MOVEMENTAL
          </Link>

          {/* Divider */}
          <div className="h-5 w-px shrink-0 bg-mvmt-border-on-dark" />

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
                    "px-3 py-2 text-xs font-medium tracking-wider transition-colors whitespace-nowrap rounded-md hover:text-mvmt-on-dark-primary",
                    isActive
                      ? "text-mvmt-on-dark-primary bg-white/10"
                      : "text-mvmt-on-dark-secondary"
                  )}
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
