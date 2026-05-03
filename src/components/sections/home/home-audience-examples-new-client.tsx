"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type AudienceExampleIdNew,
  audienceExamplesNew,
  getAudienceExampleNew,
} from "@/lib/audience-examples-new-data";
import { cn } from "@/lib/utils";

import { homeAudienceExamplesNewCopy } from "./home-data";

const tabTriggerClass = cn(
  "shrink-0 rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2.5 text-xs font-medium text-muted-foreground shadow-none sm:px-4",
  "hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:font-semibold data-active:text-foreground data-active:shadow-none",
  "after:hidden focus-visible:rounded-t-sm focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0"
);

export function HomeAudienceExamplesNewClient() {
  const [tab, setTab] = React.useState<AudienceExampleIdNew>("organizations");
  const active = getAudienceExampleNew(tab);

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as AudienceExampleIdNew)}
        className="flex w-full flex-col gap-0"
        aria-label="Audience application examples"
      >
        <TabsList
          variant="line"
          className="mb-0 h-auto w-full min-w-0 justify-start gap-0 overflow-x-auto rounded-none border-0 border-b border-border bg-transparent p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {audienceExamplesNew.map((e) => (
            <TabsTrigger key={e.id} value={e.id} className={tabTriggerClass}>
              {e.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {audienceExamplesNew.map((e) => (
          <TabsContent key={e.id} value={e.id} className="mt-4 outline-none data-[state=inactive]:hidden">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{e.oneLiner}</p>
          </TabsContent>
        ))}
      </Tabs>

      {active ? (
        <div className="overflow-hidden rounded-lg bg-card p-6 shadow-ambient sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {homeAudienceExamplesNewCopy.previewCaption}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{homeAudienceExamplesNewCopy.systemNote}</p>
            </div>
            <Button asChild className="w-full shrink-0 shadow-none md:w-auto">
              <Link href={active.canonicalPath}>{homeAudienceExamplesNewCopy.exploreLabel}</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
