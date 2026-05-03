"use client";

/**
 * ⚠️ Legacy mobile drawer — not mounted in the live site.
 * The active mobile menu is `MobileMenu` ([./mobile-menu.tsx]) inside
 * `SiteHeader`. This component is only reached through the unmounted
 * `editorial-stitch` chain consumed by legacy `src/components/sections/*`
 * page contents. See [./nav-links.ts] for the full deprecation note.
 */

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";
import { cn } from "@/lib/utils";

import {
  isGroupActive,
  isNavActive,
  primaryNavGroups,
  siteCtaLink,
  type NavGroup,
} from "./nav-links";
import { SiteLogo } from "./site-logo";

export type MobileNavProps = {
  /**
   * When true, the menu trigger stays visible at `nav+` (Stitch assessment flows
   * use a single ghost menu control; marketing chrome hides it on desktop).
   */
  alwaysVisible?: boolean;
  /** `ghost` matches Stitch assessment TopNavBar HTML under `docs/build/stitch/`. */
  triggerVariant?: "default" | "ghost";
};

const sheetLinkClass =
  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-section/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card";

/**
 * Featured quick links at the top of the mobile drawer. Each one resolves a
 * distinct visitor job the IA prompt called out — read the book, read the
 * field guide, start the assessment, start a conversation.
 */
const drawerFeaturedLinks = [
  {
    label: "Read the Book",
    description: "From Fragmentation to Movement",
    href: BOOK_HUB_PATH,
  },
  {
    label: "Field Guide",
    description: "The AI Stewardship Sequence for organizational leaders",
    href: SSSS_FIELD_GUIDE_PATH,
  },
  {
    label: "Begin assessment",
    description: "Formation snapshot",
    href: "/assess",
  },
  {
    label: "Start a conversation",
    description: "Contact the team",
    href: "/contact",
  },
] as const;

function defaultOpenGroupId(pathname: string): string | undefined {
  return primaryNavGroups.find(
    (group) => group.kind === "menu" && isGroupActive(pathname, group)
  )?.id;
}

export function MobileNav({
  alwaysVisible = false,
  triggerVariant = "default",
}: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const accordionDefault = defaultOpenGroupId(pathname);

  const onLinkClick = React.useCallback(() => setOpen(false), []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !alwaysVisible && "nav:hidden",
            triggerVariant === "ghost"
              ? "p-2 text-muted-foreground transition-opacity hover:opacity-80"
              : "border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground"
          )}
        >
          <Menu className={triggerVariant === "ghost" ? "h-5 w-5" : "h-4 w-4"} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[min(100vw-1rem,22rem)] flex-col overflow-hidden border-border bg-card p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <SiteLogo size="sm" />
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-6 pt-4">
          <nav aria-label="Mobile" className="flex flex-col gap-5">
            {/* Home */}
            <div>
              <Link
                href="/"
                onClick={onLinkClick}
                className={cn(
                  sheetLinkClass,
                  isNavActive(pathname, "/") ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Home
              </Link>
            </div>

            {/* Featured quick-access (visitor-jobs) */}
            <section aria-label="Quick links" className="border-t border-border pt-3">
              <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
                Start here
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {drawerFeaturedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      className={cn(
                        "group flex h-full flex-col justify-between gap-1 rounded-lg bg-section/60 px-3 py-3 transition-colors hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                        isNavActive(pathname, link.href) && "bg-section"
                      )}
                    >
                      <span className="text-[0.85rem] font-medium leading-tight text-foreground">
                        {link.label}
                      </span>
                      <span className="text-[0.72rem] leading-[1.35] text-muted-foreground">
                        {link.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Primary nav accordion */}
            <section aria-label="Site map" className="border-t border-border pt-3">
              <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
                Browse
              </p>
              <Accordion
                key={pathname}
                type="single"
                collapsible
                defaultValue={accordionDefault}
                className="w-full"
              >
                {primaryNavGroups.map((group) => (
                  <GroupRow
                    key={group.id}
                    group={group}
                    pathname={pathname}
                    onLinkClick={onLinkClick}
                  />
                ))}
              </Accordion>
            </section>

            {/* Primary CTA */}
            <div className="mt-auto border-t border-border pt-5">
              <Link
                href={siteCtaLink.href}
                onClick={onLinkClick}
                className="mx-1 flex items-center justify-center gap-2 rounded-pill bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {siteCtaLink.label}
                <ArrowRight className="size-3.5 shrink-0" aria-hidden />
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function GroupRow({
  group,
  pathname,
  onLinkClick,
}: {
  group: NavGroup;
  pathname: string;
  onLinkClick: () => void;
}) {
  const active = isGroupActive(pathname, group);

  if (group.kind === "link") {
    return (
      <div className="border-b border-border last:border-b-0">
        <Link
          href={group.href}
          onClick={onLinkClick}
          className={cn(
            "block px-3 py-3 text-sm font-semibold text-foreground hover:bg-section/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            active && "bg-section/40"
          )}
        >
          {group.label}
        </Link>
      </div>
    );
  }

  return (
    <AccordionItem value={group.id} className="border-border">
      <AccordionTrigger
        className={cn(
          "py-3 text-sm font-semibold hover:no-underline",
          active ? "text-foreground" : "text-foreground"
        )}
      >
        {group.label}
      </AccordionTrigger>
      <AccordionContent className="pb-1">
        <div className="flex flex-col gap-3">
          {group.columns.map((column) => (
            <div key={column.id}>
              <p className="px-3 pb-1 text-[0.65rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                {column.title}
              </p>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      className={cn(
                        sheetLinkClass,
                        "font-normal text-muted-foreground",
                        isNavActive(pathname, link.href) &&
                          "bg-section/50 font-medium text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {group.callout ? (
            <Link
              href={group.callout.href}
              onClick={onLinkClick}
              className="mx-1 flex items-center justify-between gap-3 rounded-lg bg-section/60 px-3 py-3 transition-colors hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-[0.68rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                  {group.callout.eyebrow}
                </span>
                <span className="text-[0.88rem] font-medium text-foreground">
                  {group.callout.title}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
            </Link>
          ) : null}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
