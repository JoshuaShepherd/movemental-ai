import Image from "next/image";

import { MOVEMENTAL_LOGO } from "@/lib/brand/assets";
import { cn } from "@/lib/utils";

type MovementalLogoProps = {
  className?: string;
  priority?: boolean;
};

/** Site-wide Movemental wordmark (transparent raster). */
export function MovementalLogo({ className, priority }: MovementalLogoProps) {
  return (
    <Image
      src={MOVEMENTAL_LOGO.src}
      alt={MOVEMENTAL_LOGO.alt}
      width={MOVEMENTAL_LOGO.width}
      height={MOVEMENTAL_LOGO.height}
      priority={priority}
      sizes="(max-width: 768px) 140px, 180px"
      className={cn("h-[clamp(1.5rem,3.4vw,1.75rem)] w-auto", className)}
    />
  );
}
