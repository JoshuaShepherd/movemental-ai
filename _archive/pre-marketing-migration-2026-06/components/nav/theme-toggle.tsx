"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** Larger hit target for mobile header row. */
  size?: "default" | "comfortable";
};

/**
 * Cycles light / dark / system (when enableSystem). Icons: moon = “go dark”, sun = “go light”.
 */
export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const label =
    resolvedTheme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode";

  const iconClass =
    size === "comfortable" ? "size-5 shrink-0" : "size-[1.125rem] shrink-0";

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={mounted ? label : "Theme"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-section/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "comfortable" ? "size-11 min-h-11 min-w-11" : "size-9 min-h-9 min-w-9",
        className
      )}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className={iconClass} aria-hidden />
      ) : (
        <Moon className={iconClass} aria-hidden />
      )}
    </button>
  );
}
