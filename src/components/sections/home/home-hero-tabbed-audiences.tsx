"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { HeroTemplateIframe } from "./hero-template-iframe";
import type { HomeHeroAudienceTab } from "./home-hero-preview-urls";

export type { HomeHeroAudienceTab } from "./home-hero-preview-urls";

/**
 * Right column for §1 hero — tabbed audience previews from
 * `docs/html/home-hero-tabbed-audiences.html`. Left-column headline, body, and
 * CTAs remain in `home-hero.tsx`.
 *
 * Known tension with canonical doctrine
 * (`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`): this hero
 * shows "Movement Leaders" as the first of four tabs beside Nonprofits,
 * Churches, and Institutions. The doctrine says movement leaders are a
 * distinct trusted-voice / ecosystem layer, not a fourth parallel audience
 * segment. The tabs are a *product-preview* surface, not the `/organizations`
 * hub, so the mismatch is less severe — but the label and tab set should be
 * revisited in the next hero pass (e.g. "Authors & teachers" vs a separate
 * trusted-voice surface). Do not expand this list further without first
 * reading the doctrine doc.
 */
export function HomeHeroTabbedAudiences() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = React.useState<HomeHeroAudienceTab>("leaders");
  const [entered, setEntered] = React.useState(Boolean(reduceMotion));

  React.useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  const contentMotion = !reduceMotion &&
    "data-[state=active]:motion-safe:animate-in data-[state=active]:motion-safe:fade-in-0 data-[state=active]:motion-safe:slide-in-from-bottom-1 data-[state=active]:motion-safe:duration-300";

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[580px] lg:mx-0 lg:ml-auto lg:max-w-none",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={entered ? { transitionDelay: "200ms" } : undefined}
    >
      <p className="sr-only">
        Preview how the same system surfaces informational intelligence, relational context, and
        guided assistance for different audiences.
      </p>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as HomeHeroAudienceTab)}
        className="flex w-full flex-col gap-0"
        aria-label="Audience previews"
      >
        <TabsList
          variant="line"
          className="mb-5 h-auto w-full min-w-0 justify-start gap-0 overflow-x-auto rounded-none border-0 border-b border-border bg-transparent p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <TabsTrigger
            value="leaders"
            className={cn(
              "min-h-11 shrink-0 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 text-xs font-medium text-muted-foreground shadow-none",
              "hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none",
              "after:hidden focus-visible:rounded-t-sm focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0"
            )}
          >
            Movement Leaders
          </TabsTrigger>
          <TabsTrigger
            value="nonprofits"
            className={cn(
              "min-h-11 shrink-0 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 text-xs font-medium text-muted-foreground shadow-none",
              "hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none",
              "after:hidden focus-visible:rounded-t-sm focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0"
            )}
          >
            Nonprofits
          </TabsTrigger>
          <TabsTrigger
            value="churches"
            className={cn(
              "min-h-11 shrink-0 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 text-xs font-medium text-muted-foreground shadow-none",
              "hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none",
              "after:hidden focus-visible:rounded-t-sm focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0"
            )}
          >
            Churches
          </TabsTrigger>
          <TabsTrigger
            value="institutions"
            className={cn(
              "min-h-11 shrink-0 rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 py-3 text-xs font-medium text-muted-foreground shadow-none",
              "hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none",
              "after:hidden focus-visible:rounded-t-sm focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0"
            )}
          >
            Institutions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaders" className={cn("mt-0 outline-none data-[state=inactive]:hidden", contentMotion)}>
          <HeroTemplateIframe tab="leaders" active={tab === "leaders"} />
        </TabsContent>

        <TabsContent value="nonprofits" className={cn("mt-0 outline-none data-[state=inactive]:hidden", contentMotion)}>
          <HeroTemplateIframe tab="nonprofits" active={tab === "nonprofits"} />
        </TabsContent>

        <TabsContent value="churches" className={cn("mt-0 outline-none data-[state=inactive]:hidden", contentMotion)}>
          <HeroTemplateIframe tab="churches" active={tab === "churches"} />
        </TabsContent>

        <TabsContent
          value="institutions"
          className={cn("mt-0 outline-none data-[state=inactive]:hidden", contentMotion)}
        >
          <HeroTemplateIframe tab="institutions" active={tab === "institutions"} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
