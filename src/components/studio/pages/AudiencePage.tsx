"use client";

import React from "react";

import { PathClosingCta } from "@/components/studio/path/PathClosingCta";
import { CaseStudy } from "@/components/studio/path/CaseStudy";
import { PathFootnote } from "@/components/studio/path/PathFootnote";
import { SegmentPathway } from "@/components/studio/segment/SegmentPathway";

export function AudiencePage({ audience }: { audience: "churches" | "nonprofits" | "institutions" }) {
  return (
    <div className="audience-page">
      <SegmentPathway audience={audience} />
      <CaseStudy audience={audience} />
      <PathClosingCta />
      <PathFootnote audience={audience} />
    </div>
  );
}
