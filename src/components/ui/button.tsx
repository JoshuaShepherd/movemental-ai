import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Button — Concept Modern pill CTA.
 *
 * `primary` is the ink-filled pill (DESIGN.md §6.3). `ghost` is the
 * hairline-bordered transparent pill. `inverse` variants flip for midnight
 * regional bands. `link` / `destructive` / `outline` / `secondary` are kept
 * as shadcn-style escape hatches for forms and UI chrome.
 *
 * `default` aliases to `primary` so existing `<Button>` usages (which all
 * depend on the default variant resolving to the brand CTA) keep working.
 */
const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "font-medium text-[0.9rem] tracking-[-0.005em] select-none",
    "border border-transparent bg-clip-padding",
    "transition-all duration-fast ease-out outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg.arrow]:transition-transform [&_svg.arrow]:duration-fast [&_svg.arrow]:ease-out",
    "hover:[&_svg.arrow]:translate-x-[3px]",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Ink pill — the canonical Concept Modern CTA. */
        default:
          "rounded-pill bg-primary text-primary-foreground hover:-translate-y-px hover:bg-primary-dim",
        primary:
          "rounded-pill bg-primary text-primary-foreground hover:-translate-y-px hover:bg-primary-dim",
        /** Ghost pill — transparent with hairline border that darkens on hover. */
        ghost:
          "rounded-pill bg-transparent text-foreground border-border hover:border-foreground",
        /** Inverse ink pill — for use inside [data-variant='midnight']. */
        "primary-inverse":
          "rounded-pill bg-inverse-foreground text-inverse-surface hover:-translate-y-px",
        /** Inverse ghost — for use inside [data-variant='midnight']. */
        "ghost-inverse":
          "rounded-pill bg-transparent text-inverse-foreground border-inverse-border hover:border-inverse-foreground",
        /** Legacy shadcn escape hatches — retained for form controls. */
        outline:
          "rounded-md border-border bg-background hover:bg-section",
        secondary:
          "rounded-md bg-secondary text-secondary-foreground hover:bg-accent",
        destructive:
          "rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/30",
        link: "rounded-none p-0 text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground",
      },
      size: {
        /** Default pill — 0.78rem y / 1.25rem x. */
        default: "h-auto px-5 py-[0.78rem] gap-[0.55rem]",
        sm: "h-auto px-4 py-[0.58rem] text-[0.82rem] gap-2",
        lg: "h-auto px-6 py-[0.95rem] text-[0.95rem] gap-[0.55rem]",
        xs: "h-auto px-3 py-[0.42rem] text-xs gap-1",
        icon: "size-10 rounded-pill p-0 gap-0",
        "icon-sm": "size-8 rounded-pill p-0 gap-0",
        "icon-xs": "size-7 rounded-pill p-0 gap-0",
        "icon-lg": "size-12 rounded-pill p-0 gap-0",
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
