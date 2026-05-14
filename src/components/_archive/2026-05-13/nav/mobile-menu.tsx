"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { isGroupActive, isHrefActive, PRIMARY_CTA, PRIMARY_NAV } from "./nav-config";

/**
 * Slide-in mobile menu. Opens from the right, traps focus while open
 * (via the underlying Radix Dialog), closes on Escape and on link click.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors lg:hidden",
            "hover:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          )}
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full max-w-sm flex-col gap-0 border-border bg-card p-0"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="text-base font-semibold text-foreground">
            Movemental
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Mobile primary"
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4"
        >
          <ul className="flex flex-col gap-1">
            {PRIMARY_NAV.map((group) => {
              if (group.kind === "link") {
                const active = isHrefActive(pathname, group.href);
                return (
                  <li key={group.href}>
                    <Link
                      href={group.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-3 text-base transition-colors",
                        "text-muted-foreground hover:bg-section hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                        active && "font-medium text-foreground",
                      )}
                    >
                      {group.label}
                    </Link>
                  </li>
                );
              }

              const groupActive = isGroupActive(pathname, group);
              return (
                <li key={group.label}>
                  <p
                    className={cn(
                      "px-3 pb-1 pt-3 text-base",
                      groupActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {group.label}
                  </p>
                  <ul className="flex flex-col gap-0.5 pl-2">
                    {group.items.map((item) => {
                      const itemActive = isHrefActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            aria-current={itemActive ? "page" : undefined}
                            className={cn(
                              "flex flex-col gap-0.5 rounded-md px-3 py-2.5 transition-colors",
                              "hover:bg-section focus-visible:bg-section focus-visible:outline-none",
                              itemActive && "bg-section",
                            )}
                          >
                            <span
                              className={cn(
                                "text-sm",
                                itemActive
                                  ? "font-medium text-foreground"
                                  : "text-foreground",
                              )}
                            >
                              {item.label}
                            </span>
                            {item.description ? (
                              <span className="text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border px-6 py-5">
          <Link
            href={PRIMARY_CTA.href}
            onClick={close}
            className={cn(
              "flex w-full items-center justify-center rounded-pill bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors",
              "hover:bg-primary-dim",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            )}
          >
            {PRIMARY_CTA.label}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
