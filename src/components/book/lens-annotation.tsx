import { Building2, Church, Landmark } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AudienceLens } from "@/lib/book";

type LensAnnotationProps = {
  lens: Exclude<AudienceLens, "movement-leaders">;
  title?: string;
  body: string;
  className?: string;
};

const lensConfig = {
  churches: {
    icon: Church,
    label: "For church leaders",
  },
  nonprofits: {
    icon: Building2,
    label: "For nonprofit leaders",
  },
  institutions: {
    icon: Landmark,
    label: "For institutions",
  },
} as const;

export function LensAnnotation({
  lens,
  title,
  body,
  className,
}: LensAnnotationProps) {
  const config = lensConfig[lens];
  const Icon = config.icon;

  return (
    <div
      data-slot="lens-annotation"
      data-lens={lens}
      className={cn("rounded-lg bg-elevated p-4 text-sm", className)}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        <span className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
          {config.label}
        </span>
      </div>
      {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
      <p className="leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
