"use client";

import { AudienceClosingCta } from "@/components/studio/path/AudienceClosingCta";
import { CaseStudy } from "@/components/studio/path/CaseStudy";
import { PathFootnote } from "@/components/studio/path/PathFootnote";
import { AudienceHero } from "@/components/studio/segment/AudienceHero";
import { AudiencePathBridge } from "@/components/studio/segment/AudiencePathBridge";
import { audienceContactHref, type AudienceKind } from "@/components/studio/segment/audience-contact";

export function AudiencePage({ audience }: { audience: AudienceKind }) {
  const contactHref = audienceContactHref(audience);

  return (
    <div className="audience-page">
      <AudienceHero audience={audience} />
      <CaseStudy audience={audience} />
      <AudiencePathBridge audience={audience} />
      <AudienceClosingCta audience={audience} />
      <PathFootnote audience={audience} pathStageHrefMode="pathway" contactHref={contactHref} goFurtherLinks="slim" />
    </div>
  );
}

export type { AudienceKind } from "@/components/studio/segment/audience-contact";
