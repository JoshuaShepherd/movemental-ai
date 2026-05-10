"use client";

import React from "react";
import Link from "next/link";

import { Container } from "@/components/studio/Container";
import { caseStudies } from "@/data/path-data";
import { stageMeta } from "@/data/shared-path-data";

const pathwayHrefByStageNum: Record<string, string> = {
  "01": "/pathway/safety",
  "02": "/pathway/sandbox",
  "03": "/pathway/skills",
  "04": "/pathway/solutions",
};

export type PathStageHrefMode = "hash" | "pathway";

export type GoFurtherLinksVariant = "default" | "slim";

export function PathFootnote({
  audience,
  pathStageHrefMode = "pathway",
  contactHref = "/contact",
  goFurtherLinks = "default",
}: {
  audience: "churches" | "nonprofits" | "institutions";
  pathStageHrefMode?: PathStageHrefMode;
  /** Used for “Start a conversation” on slim audience pages. */
  contactHref?: string;
  goFurtherLinks?: GoFurtherLinksVariant;
}) {
  const label = caseStudies[audience].audienceLabel;
  return (
    <aside className="band-midnight py-12" aria-label="Page wrap-up">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-12 border-b border-inverse-border pb-12 md:flex-row">
          <div className="max-w-sm">
            <div className="mb-4 font-serif-display text-2xl">Movemental</div>
            <p className="text-sm leading-relaxed text-inverse-foreground/80">
              The four-stage AI path for organizations that move at the speed of trust.
            </p>
          </div>

          <div className="flex gap-12 md:gap-24">
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground/60">The Path</h4>
              <ul className="space-y-3 text-sm">
                {stageMeta.map((s) => (
                  <li key={s.num}>
                    {pathStageHrefMode === "pathway" ? (
                      <Link href={pathwayHrefByStageNum[s.num] ?? "/path"} className="transition-colors hover:text-inverse-foreground">
                        {s.name}
                      </Link>
                    ) : (
                      <a href={`#stage-${s.num}`} className="transition-colors hover:text-inverse-foreground">
                        {s.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground/60">Go further</h4>
              {goFurtherLinks === "slim" ? (
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href={contactHref} className="transition-colors hover:text-inverse-foreground">
                      Start a conversation
                    </Link>
                  </li>
                  <li>
                    <a href="#hero" className="transition-colors hover:text-inverse-foreground">
                      Hero
                    </a>
                  </li>
                  <li>
                    <a href="#case-study" className="transition-colors hover:text-inverse-foreground">
                      Read the case study
                    </a>
                  </li>
                  <li>
                    <a href="#path-bridge" className="transition-colors hover:text-inverse-foreground">
                      Why the order matters
                    </a>
                  </li>
                  <li>
                    <a href="#closing-cta" className="transition-colors hover:text-inverse-foreground">
                      Start here
                    </a>
                  </li>
                  <li>
                    <Link href="/pricing" className="transition-colors hover:text-inverse-foreground">
                      Packages and pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="transition-colors hover:text-inverse-foreground">
                      Movemental.com
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/contact" className="transition-colors hover:text-inverse-foreground">
                      Start a conversation
                    </Link>
                  </li>
                  <li>
                    <a href="#case-study" className="transition-colors hover:text-inverse-foreground">
                      Read the case study
                    </a>
                  </li>
                  <li>
                    <Link href="/path" className="transition-colors hover:text-inverse-foreground">
                      The full path
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="transition-colors hover:text-inverse-foreground">
                      Movemental.com
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-sm text-inverse-foreground/60">
          <div className="font-serif-display text-lg italic">{label}</div>
          <div>© {new Date().getFullYear()} Movemental · The Movemental Path</div>
        </div>
      </Container>
    </aside>
  );
}
