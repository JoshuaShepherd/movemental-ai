"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FeedbackSheet } from "./FeedbackSheet"
import type { AudienceProfileData } from "@/lib/data/profile-workspace.sample"

interface AudienceProfilePanelProps {
  data: AudienceProfileData
}

export function AudienceProfilePanel({ data }: AudienceProfilePanelProps) {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Who tends to find you */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Who tends to find you</h3>
        <ul className="space-y-3">
          {data.whoFindsYou.map((item, i) => (
            <li
              key={i}
              className="text-muted-foreground leading-relaxed flex items-start gap-3"
            >
              <span className="text-primary mt-1.5 text-sm">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* Why they trust you */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Why they trust you</h3>
        <ul className="space-y-3">
          {data.whyTheyTrust.map((item, i) => (
            <li
              key={i}
              className="text-muted-foreground leading-relaxed flex items-start gap-3"
            >
              <span className="text-primary mt-1.5 text-sm">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* What they're asking for (implicitly) */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          What they&apos;re asking for{" "}
          <span className="font-normal text-muted-foreground">(implicitly)</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          These are the unspoken questions your audience carries. They may not
          say them out loud, but they&apos;re looking for someone who understands.
        </p>
        <div className="space-y-2">
          {data.implicitAsks.map((ask, i) => (
            <Card key={i} className="border-muted bg-muted/20">
              <CardContent className="py-3 px-4">
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;{ask}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Barriers to understanding / Entry points */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Barriers & entry points
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
              Barriers
            </h4>
            <ul className="space-y-2">
              {data.barriersAndEntryPoints.barriers.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-muted-foreground/50 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
              Entry Points
            </h4>
            <ul className="space-y-2">
              {data.barriersAndEntryPoints.entryPoints.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary/70 mt-0.5">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      {/* What we're uncertain about */}
      <section>
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardContent className="py-4 px-5">
            <h3 className="text-lg font-semibold mb-3">
              What we&apos;re uncertain about
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Honest uncertainty is a feature, not a bug. Here&apos;s where our
              confidence is lower:
            </p>
            <ul className="space-y-2">
              {data.uncertainties.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-amber-600 dark:text-amber-500 mt-0.5">?</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Feedback link */}
      <section className="pt-4">
        <FeedbackSheet
          context="Audience"
          trigger={
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 h-auto">
              Tell us what we got wrong →
            </Button>
          }
        />
      </section>
    </div>
  )
}
