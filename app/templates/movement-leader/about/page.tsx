"use client";

import { useState } from "react";
import {
  AboutVideoBio,
  AboutTeamGrid,
  AboutTimelineStory,
  AboutMissionValues,
  AboutStatsHero,
  AboutManifestoDark,
  AboutSplitMedia,
  AboutFounderLetter,
  AboutTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { AboutVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<AboutVariant, React.ComponentType> = {
  "about-video-bio": AboutVideoBio,
  "about-team-grid": AboutTeamGrid,
  "about-timeline-story": AboutTimelineStory,
  "about-mission-values": AboutMissionValues,
  "about-stats-hero": AboutStatsHero,
  "about-manifesto-dark": AboutManifestoDark,
  "about-split-media": AboutSplitMedia,
  "about-founder-letter": AboutFounderLetter,
};

export default function AboutTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<AboutVariant>("about-video-bio");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <AboutTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
