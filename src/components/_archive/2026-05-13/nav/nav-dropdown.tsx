"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { isGroupActive, isHrefActive, type NavGroup, type NavLeaf } from "./nav-config";

type NavDropdownProps = {
  label: string;
  items: readonly NavLeaf[];
  activeWhenPathMatches: readonly string[];
};

/**
 * Hover-and-keyboard dropdown for the "Who It's For" group.
 *
 * Built on Radix NavigationMenu (via the shadcn wrapper), which:
 *   - opens the panel on pointer hover and on focus
 *   - moves focus through items with Tab and arrow keys
 *   - closes on Escape, on outside click, and on focus leaving the group
 */
export function NavDropdown({
  label,
  items,
  activeWhenPathMatches,
}: NavDropdownProps) {
  const pathname = usePathname();
  const group: NavGroup = {
    kind: "dropdown",
    label,
    items,
    activeWhenPathMatches,
  };
  const active = isGroupActive(pathname, group);

  return (
    <NavigationMenuItem className="relative">
      <NavigationMenuTrigger
        className={cn(
          "group inline-flex items-center gap-1 rounded-md bg-transparent px-3 py-2 text-sm transition-colors",
          "text-muted-foreground hover:bg-transparent hover:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          active && "font-medium text-foreground",
        )}
      >
        {label}
        <ChevronDown
          className="size-4 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="left-1/2 top-full z-50 mt-2 -translate-x-1/2 md:absolute">
        <ul className="grid w-72 gap-1 rounded-lg border border-border bg-card p-2 shadow-ambient">
          {items.map((item) => {
            const itemActive = isHrefActive(pathname, item.href);
            return (
              <li key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    aria-current={itemActive ? "page" : undefined}
                    className={cn(
                      "flex flex-col gap-0.5 rounded-md px-3 py-2.5 transition-colors",
                      "hover:bg-section focus-visible:bg-section focus-visible:outline-none",
                      itemActive && "bg-section",
                    )}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
