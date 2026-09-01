import Image from "next/image";

import { MOVEMENTAL_LOGO } from "@/lib/brand/assets";
import { cn } from "@/lib/utils";

type MovementalLogoProps = {
  className?: string;
  priority?: boolean;
};

/** Site-wide Movemental wordmark (light / dark rasters). */
export function MovementalLogo({ className, priority }: MovementalLogoProps) {
  return (
    <span className="inline-flex items-center">
      <Image
        src={MOVEMENTAL_LOGO.lightSrc}
        alt={MOVEMENTAL_LOGO.alt}
        width={MOVEMENTAL_LOGO.width}
        height={MOVEMENTAL_LOGO.height}
        priority={priority}
        sizes="(max-width: 768px) 560px, 720px"
        className={cn("h-[clamp(3.5rem,9.5vw,4.85rem)] w-auto dark:hidden", className)}
      />
      <Image
        src={MOVEMENTAL_LOGO.darkSrc}
        alt=""
        width={MOVEMENTAL_LOGO.width}
        height={MOVEMENTAL_LOGO.height}
        priority={priority}
        sizes="(max-width: 768px) 560px, 720px"
        className={cn("hidden h-[clamp(3.5rem,9.5vw,4.85rem)] w-auto dark:block", className)}
      />
    </span>
  );
}
