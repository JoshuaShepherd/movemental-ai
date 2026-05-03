import * as React from "react";

import { Eyebrow } from "@/components/primitives/eyebrow";
import { cn } from "@/lib/utils";

export type IconFeatureCardProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Icon-forward feature panel on a lifted inner surface (ghost lift, no section borders).
 * Translated from Stitch card gallery §2 (“Curated Authority”).
 */
export function IconFeatureCard({
  icon,
  eyebrow,
  title,
  description,
  className,
  ...props
}: IconFeatureCardProps) {
  return (
    <div
      data-slot="icon-feature-card"
      className={cn(
        "rounded-xl bg-muted p-10 sm:p-14 md:p-16",
        className
      )}
      {...props}
    >
      <div className="mb-8 inline-block rounded-2xl bg-card p-6 text-primary [&_svg]:size-10">
        {icon}
      </div>
      <Eyebrow className="mb-3 font-bold tracking-eyebrow text-muted-foreground">
        {eyebrow}
      </Eyebrow>
      <h3 className="mb-4 text-3xl font-medium tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
