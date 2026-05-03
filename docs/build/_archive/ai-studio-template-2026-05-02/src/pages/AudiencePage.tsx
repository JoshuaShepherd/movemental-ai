import React, { useEffect } from 'react';
import { PathClosingCta } from '@/components/path/PathClosingCta';
import { CaseStudy } from '@/components/path/CaseStudy';
import { PathFootnote } from '@/components/path/PathFootnote';
import { SegmentPathway } from '@/components/segment/SegmentPathway';

export function AudiencePage({ audience }: { audience: 'churches' | 'nonprofits' | 'institutions' }) {
  useEffect(() => {
    const metas = {
      churches: {
        title: "For Churches | Movemental",
        desc: "Lead your staff into AI without losing the mission. The Movemental AI Pathway translated into a church context."
      },
      nonprofits: {
        title: "For Nonprofits | Movemental",
        desc: "Adopt AI without losing donor trust. The Movemental AI Pathway translated into a nonprofit context."
      },
      institutions: {
        title: "For Institutions | Movemental",
        desc: "Move at the pace governance can defend. The Movemental AI Pathway translated for seminaries and training organizations."
      }
    };
    
    document.title = metas[audience].title;
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', metas[audience].desc);
  }, [audience]);
  
  return (
    <div className="audience-page">
      <SegmentPathway audience={audience} />
      <CaseStudy audience={audience} />
      <PathClosingCta />
      <PathFootnote audience={audience} />
    </div>
  );
}
