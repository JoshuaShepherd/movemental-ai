"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { isHrefActive } from "./nav-config";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = isHrefActive(pathname, href);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "inline-flex items-center rounded-md px-3 py-2 text-sm transition-colors",
            "text-muted-foreground hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            active && "font-medium text-foreground",
            className,
          )}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
