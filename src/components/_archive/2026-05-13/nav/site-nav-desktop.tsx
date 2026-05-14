"use client";

/**
 * ⚠️ Legacy desktop nav — not mounted in the live site.
 * The active header is `SiteHeader` ([./site-header.tsx]). This component is
 * only reached through the unmounted `editorial-stitch` chain consumed by
 * legacy `src/components/sections/*` page contents. See [./nav-links.ts]
 * for the full deprecation note.
 */

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import {
  isGroupActive,
  isNavActive,
  primaryNavGroups,
  type NavGroup,
  type NavItem,
  type NavSection,
} from "./nav-links";

/**
 * Desktop primary navigation — grouped mega-menu + flat links (DESIGN.md §6).
 *
 * - Dropdowns use Radix NavigationMenu for keyboard + screen-reader support.
 * - Column layouts are two-column by default; a group may add a `callout`
 *   that renders as a third featured column.
 * - Flat links render as direct anchors with no disclosure affordance.
 * - Active state: a menu trigger is active when any descendant route matches;
 *   a link is active when its href or `activeWhenPathMatches` prefixes match.
 */

const triggerClass =
  "group/trigger inline-flex h-9 items-center justify-center rounded-md px-2.5 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors duration-fast outline-none hover:bg-section/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:bg-section/80 data-[state=open]:text-foreground";

const linkClass =
  "whitespace-nowrap rounded-md px-2.5 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors duration-fast hover:bg-section/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SiteNavDesktop({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden min-w-0 flex-1 items-center justify-center nav:flex",
        className
      )}
    >
      <NavigationMenu aria-label="Main" viewport={false}>
        <NavigationMenuList className="items-center justify-center gap-0.5 sm:gap-1 xl:gap-2">
          {primaryNavGroups.map((group) => (
            <GroupEntry key={group.id} group={group} pathname={pathname} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function GroupEntry({ group, pathname }: { group: NavGroup; pathname: string }) {
  const active = isGroupActive(pathname, group);

  if (group.kind === "link") {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href={group.href}
            className={cn(linkClass, active && "text-foreground")}
          >
            {group.label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem className="[&:has([data-state=open])]:z-50">
      <NavigationMenuTrigger
        className={cn(triggerClass, active && "text-foreground")}
      >
        {group.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="left-1/2 top-full z-50 -translate-x-1/2 md:absolute">
        <MegaMenuPanel group={group} pathname={pathname} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function MegaMenuPanel({
  group,
  pathname,
}: {
  group: Extract<NavGroup, { kind: "menu" }>;
  pathname: string;
}) {
  const hasCallout = Boolean(group.callout);
  const gridClass = cn(
    "grid gap-x-6 gap-y-2 p-5",
    group.columns.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2",
    hasCallout && "md:grid-cols-[repeat(2,minmax(13rem,1fr))_minmax(15rem,1.1fr)]"
  );

  return (
    <div
      className={cn(
        "mt-1.5 overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-ambient",
        hasCallout ? "w-[min(92vw,54rem)]" : "w-[min(90vw,42rem)]"
      )}
      data-variant="default"
    >
      <div className={gridClass}>
        {group.columns.map((column) => (
          <MegaMenuColumn key={column.id} column={column} pathname={pathname} />
        ))}
        {group.callout ? (
          <aside className="flex flex-col justify-between gap-4 rounded-lg bg-section p-5">
            <div className="flex flex-col gap-2">
              <p className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                {group.callout.eyebrow}
              </p>
              <h3 className="text-base font-medium tracking-[-0.01em] text-foreground">
                {group.callout.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.5] text-muted-foreground">
                {group.callout.description}
              </p>
            </div>
            <NavigationMenuLink asChild>
              <Link
                href={group.callout.href}
                className="inline-flex items-center gap-1.5 self-start text-[0.85rem] font-medium text-primary transition-colors hover:text-primary-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-section"
              >
                {group.callout.cta}
                <ArrowRight className="size-3.5 shrink-0" aria-hidden />
              </Link>
            </NavigationMenuLink>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

function MegaMenuColumn({
  column,
  pathname,
}: {
  column: NavSection;
  pathname: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pb-1 pt-1 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
        {column.title}
      </p>
      <ul className="flex flex-col">
        {column.links.map((link) => (
          <MegaMenuLink key={link.href} link={link} pathname={pathname} />
        ))}
      </ul>
    </div>
  );
}

function MegaMenuLink({
  link,
  pathname,
}: {
  link: NavItem;
  pathname: string;
}) {
  const active = isNavActive(pathname, link.href);
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={link.href}
          data-active={active ? "" : undefined}
          className={cn(
            "flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors duration-fast hover:bg-section/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            active && "bg-section/60"
          )}
        >
          <span
            className={cn(
              "text-[0.9rem] font-medium leading-tight",
              active ? "text-foreground" : "text-foreground/90"
            )}
          >
            {link.label}
          </span>
          {link.description ? (
            <span className="text-[0.78rem] leading-[1.4] text-muted-foreground">
              {link.description}
            </span>
          ) : null}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
