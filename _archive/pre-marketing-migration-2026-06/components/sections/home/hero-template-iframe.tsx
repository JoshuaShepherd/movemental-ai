"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import type { HomeHeroAudienceTab } from "./home-hero-preview-urls";
import { HOME_HERO_PREVIEW_TITLES, HOME_HERO_PREVIEW_URLS } from "./home-hero-preview-urls";

type Props = {
  tab: HomeHeroAudienceTab;
  /** When false, iframe is not mounted / has no src (lazy first activation). */
  active: boolean;
};

/**
 * Lazy-loads a full-page Stitch / exemplar HTML preview inside the hero tab panel.
 */
export function HeroTemplateIframe({ tab, active }: Props) {
  const [everActivated, setEverActivated] = React.useState(active);

  React.useEffect(() => {
    if (active) setEverActivated(true);
  }, [active]);

  const src = everActivated ? HOME_HERO_PREVIEW_URLS[tab] : undefined;
  const title = HOME_HERO_PREVIEW_TITLES[tab];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-(--radius-lg) bg-card shadow-ambient",
        "min-h-[min(70vh,520px)] w-full sm:min-h-[480px]"
      )}
    >
      {everActivated ? (
        <iframe
          title={title}
          src={src}
          className="block h-[min(70vh,520px)] w-full border-0 sm:h-[480px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="flex h-[min(70vh,520px)] w-full items-center justify-center sm:h-[480px]"
          aria-hidden
        >
          <span className="text-xs text-muted-foreground">Select this tab to load preview</span>
        </div>
      )}
    </div>
  );
}
