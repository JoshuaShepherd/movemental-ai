"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useToolkitModal } from "./toolkit-modal-context";

type Variant = "primary" | "ghost" | "midnight-primary" | "link";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> & {
  /** Surface the open is initiated from — recorded with the lead. */
  source?: string;
  variant?: Variant;
  children: ReactNode;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-pill btn-pill--primary",
  ghost: "btn-pill btn-pill--ghost",
  // Midnight bands flip the primary pill via the .band-midnight ancestor selector
  // already defined in recipes.css, so we reuse btn-pill--primary inside dark sections.
  "midnight-primary": "btn-pill btn-pill--primary",
  link: "text-sm font-medium underline decoration-1 underline-offset-4 transition-colors",
};

export function ToolkitOpenButton({
  source,
  variant = "primary",
  className,
  children,
  ...rest
}: Props) {
  const { open } = useToolkitModal();
  return (
    <button
      type="button"
      onClick={() => open(source ? { source } : undefined)}
      className={cn(VARIANT_CLASS[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
