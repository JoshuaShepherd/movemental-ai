"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import type { AuthorProfileData } from "@/lib/data/profile-workspace.sample"

interface AuthorProfilePanelProps {
  data: AuthorProfileData
}

export function AuthorProfilePanel({ data }: AuthorProfilePanelProps) {
  const [soundsLikeYou, setSoundsLikeYou] = React.useState<
    "yes" | "partially" | "no" | null
  >(null)

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Executive Summary */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Executive Summary</h3>
        <div className="prose prose-sage max-w-none">
          {data.executiveSummary.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="why" className="border-none">
            <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
              Why we think this
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              This summary is synthesized from reading your published books,
              articles, and public talks. We look for recurring emphases and
              the way you frame problems and solutions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* Core Themes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Core Themes</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.coreThemes.map((theme) => (
            <Badge key={theme.label} variant="secondary" className="text-sm">
              {theme.label}
            </Badge>
          ))}
        </div>
        <div className="space-y-3">
          {data.coreThemes.map((theme) => (
            <Card key={theme.label} className="border-muted">
              <CardContent className="py-3 px-4">
                <p className="font-medium text-sm">{theme.label}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {theme.explanation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="why" className="border-none">
            <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
              Why we think this
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Themes are identified by frequency analysis of concepts and language
              patterns across your body of work, weighted toward your most
              recent and substantial pieces.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* Repeated Convictions */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Repeated Convictions</h3>
        <ul className="space-y-4">
          {data.repeatedConvictions.map((conviction, i) => (
            <li key={i} className="space-y-1">
              <p className="font-medium">&ldquo;{conviction.statement}&rdquo;</p>
              <p className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                {conviction.evidence}
              </p>
            </li>
          ))}
        </ul>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="why" className="border-none">
            <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
              Why we think this
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              These are paraphrased statements that appear in multiple places
              throughout your work. We cite evidence lines to show where the
              pattern emerged, not to claim direct quotation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* Tensions You Hold */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Tensions You Hold</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your work holds multiple perspectives in creative tension, rather than
          collapsing into easy answers.
        </p>
        <div className="space-y-3">
          {data.tensionsHeld.map((tension, i) => (
            <Card key={i} className="border-muted">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {tension.pole1}
                  </Badge>
                  <span className="text-muted-foreground">/</span>
                  <Badge variant="outline" className="text-xs">
                    {tension.pole2}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tension.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Language & Voice Notes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Language & Voice Notes</h3>
        <ul className="space-y-2">
          {data.voiceNotes.map((note, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-primary mt-1">•</span>
              <span>{note.observation}</span>
            </li>
          ))}
        </ul>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="why" className="border-none">
            <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
              Why we think this
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Voice notes are observations about your writing style and patterns,
              not evaluations or scores. They&apos;re meant to help you recognize
              your own distinctive voice.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      {/* Does this sound like you? */}
      <section className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Does this sound like you?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your response helps us calibrate. There&apos;s no wrong answer.
        </p>

        {soundsLikeYou === null ? (
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => setSoundsLikeYou("yes")}
            >
              Yes, mostly
            </Button>
            <Button
              variant="outline"
              onClick={() => setSoundsLikeYou("partially")}
            >
              Partially
            </Button>
            <Button
              variant="outline"
              onClick={() => setSoundsLikeYou("no")}
            >
              Not really
            </Button>
          </div>
        ) : soundsLikeYou === "yes" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Good to hear. If anything feels off as you continue, use the
              feedback options to let us know.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundsLikeYou(null)}
            >
              Change response
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Thanks for letting us know. Help us understand what we missed:
            </p>
            <FeedbackSheet
              context="Author"
              trigger={
                <Button variant="outline" size="sm">
                  Tell us what&apos;s off
                </Button>
              }
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundsLikeYou(null)}
              className="ml-2"
            >
              Change response
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
