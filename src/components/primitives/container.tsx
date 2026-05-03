import * as React from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "narrow" | "reading";

/**
 * Container — Concept Modern max-width wrapper.
 *
 * `default` pins to `--container-max` (1200px). `narrow` pins to
 * `--container-narrow` (740px) for intro bands. `reading` pins to
 * `--prose-max` (640px) for long-form columns.
 *
 * Horizontal padding uses the shared `--gutter` value via a fluid clamp so
 * all rails align between nav / hero / section content.
 */
const widthClassName: Record<ContainerWidth, string> = {
  default: "max-w-(--container-max)",
  narrow: "max-w-(--container-narrow)",
  reading: "max-w-(--prose-max)",
};

export function Container({
  className,
  width = "default",
  as: Component = "div",
  ...props
}: React.ComponentProps<"div"> & {
  as?: React.ElementType;
  width?: ContainerWidth;
}) {
  return (
    <Component
      data-slot="container"
      className={cn(
        "mx-auto w-full px-[clamp(1.25rem,4vw,2.5rem)]",
        widthClassName[width],
        className
      )}
      {...props}
    />
  );
}
