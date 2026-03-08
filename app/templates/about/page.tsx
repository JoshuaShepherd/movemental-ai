"use client";

import { useState , useEffect } from "react";
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
import { useTemplateVariant } from "@/app/templates/template-variant-context";

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

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <AboutTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </>
  );
}
