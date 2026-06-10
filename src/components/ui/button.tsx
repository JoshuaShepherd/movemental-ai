import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/** Ink Band pill button — ink fill on paper surfaces. */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "font-medium text-[0.9rem] select-none",
    "border border-transparent",
    "transition-all duration-fast ease-out outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "rounded-pill bg-primary text-primary-foreground hover:bg-[var(--color-ink-band-blue)]",
        primary:
          "rounded-pill bg-primary text-primary-foreground hover:bg-[var(--color-ink-band-blue)]",
        ghost:
          "rounded-pill border-border bg-transparent text-foreground hover:border-foreground",
        outline:
          "rounded-xl border-border bg-card hover:bg-section",
        secondary: "rounded-xl bg-section text-foreground hover:bg-card",
        destructive:
          "rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "rounded-none p-0 text-[var(--color-ink-band-blue)] underline underline-offset-4",
      },
      size: {
        default: "h-auto px-5 py-[0.78rem] gap-2",
        sm: "h-auto px-4 py-[0.58rem] text-[0.82rem] gap-2",
        lg: "h-auto px-6 py-[0.95rem] text-[0.95rem] gap-2",
        xs: "h-auto px-3 py-[0.42rem] text-xs gap-1",
        icon: "size-10 rounded-pill p-0",
        "icon-sm": "size-8 rounded-pill p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
