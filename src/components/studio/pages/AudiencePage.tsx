"use client";

import React from "react";

import { PathClosingCta } from "@/components/studio/path/PathClosingCta";
import { CaseStudy } from "@/components/studio/path/CaseStudy";
import { PathFootnote } from "@/components/studio/path/PathFootnote";
import { StitchEditorialAudience } from "@/components/studio/segment/StitchEditorialAudience";
import { SegmentPathway } from "@/components/studio/segment/SegmentPathway";

export function AudiencePage({ audience }: { audience: "churches" | "nonprofits" | "institutions" }) {
  /** Nonprofit editorial already ends with a full narrative + midnight CTA; SegmentPathway would duplicate the entire pathway scroll. */
  const includeSegmentPathway = audience !== "nonprofits";

  return (
    <div className="audience-page">
      <StitchEditorialAudience audience={audience} />
      {includeSegmentPathway ? <SegmentPathway audience={audience} /> : null}
      <CaseStudy audience={audience} />
      <PathClosingCta />
      <PathFootnote
        audience={audience}
        pathStageHrefMode={includeSegmentPathway ? "hash" : "pathway"}
      />
    </div>
  );
}
