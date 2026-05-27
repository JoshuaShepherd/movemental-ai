"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FeedbackSheet } from "./FeedbackSheet"
import type { ContentProfileData } from "@/lib/data/profile-workspace.sample"

interface ContentProfilePanelProps {
  data: ContentProfileData
}

export function ContentProfilePanel({ data }: ContentProfilePanelProps) {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* What exists */}
      <section>
        <h3 className="text-lg font-semibold mb-4">What exists</h3>
        <p className="text-sm text-muted-foreground mb-4">
          An inventory of your published and recorded work that we&apos;ve identified.
        </p>

        <Accordion type="multiple" className="space-y-2">
          {data.whatExists.map((group, i) => (
            <AccordionItem
              key={i}
              value={group.category}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{group.category}</span>
                  <Badge variant="secondary" className="text-xs">
                    {group.items.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pb-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="border-l-2 border-muted pl-4">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          {item.notes}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator />

      {/* Where it lives */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Where it lives</h3>
        <ul className="space-y-2">
          {data.whereLives.map((location, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-2 border-b border-muted last:border-0"
            >
              <span className="font-medium text-sm">{location.platform}</span>
              {location.url && (
                <span className="text-xs text-muted-foreground">
                  {location.url}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* Underutilized assets */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Underutilized assets</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Content that exists but may not be working as hard as it could.
        </p>

        <div className="space-y-3">
          {data.underutilizedAssets.map((asset, i) => (
            <Card key={i} className="border-muted">
              <CardContent className="py-4 px-4">
                <p className="font-medium text-sm">{asset.title}</p>
                <Accordion type="single" collapsible className="mt-2">
                  <AccordionItem value="reason" className="border-none">
                    <AccordionTrigger className="text-xs text-muted-foreground hover:text-foreground py-1 [&[data-state=open]]:pb-2">
                      Why it matters
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {asset.reason}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Next sensible moves */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Next sensible moves</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Suggestions, not prescriptions. You know your context best.
        </p>

        <ol className="space-y-4">
          {data.nextMoves.map((move, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{move.suggestion}</p>
                {move.rationale && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {move.rationale}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Feedback link */}
      <section className="pt-4">
        <FeedbackSheet
          context="Content"
          trigger={
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 h-auto">
              Something missing from this inventory? →
            </Button>
          }
        />
      </section>
    </div>
  )
}
