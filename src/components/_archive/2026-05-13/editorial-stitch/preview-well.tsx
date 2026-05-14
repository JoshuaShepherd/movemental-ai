import * as React from "react";

import { cn } from "@/lib/utils";

export type EditorialPreviewWellProps = React.ComponentProps<"div"> & {
  /** Optional short label above the preview (Stitch gallery pattern). */
  label?: string;
};

/**
 * Tonal well for dropping nav / layout previews — matches Stitch `nav-preview-box`
 * without raw hex (`bg-section` stack).
 */
export function EditorialPreviewWell({
  label,
  className,
  children,
  ...props
}: EditorialPreviewWellProps) {
  return (
    <div className="space-y-4">
      {label ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{label}</p>
      ) : null}
      <div
        data-slot="editorial-preview-well"
        className={cn(
          "relative overflow-hidden rounded-xl bg-section px-6 py-14 sm:px-10 sm:py-16 md:py-20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
