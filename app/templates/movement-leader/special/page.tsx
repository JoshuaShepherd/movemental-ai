"use client";

import { useState } from "react";
import {
  SpecialNetworkMap,
  SpecialTimeline,
  SpecialCheckInbox,
  SpecialEditor,
  SpecialFounderStory,
  SpecialCourseTranscript,
  SpecialYoureIn,
  SpecialTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { SpecialVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<SpecialVariant, React.ComponentType> = {
  "special-network-map": SpecialNetworkMap,
  "special-timeline": SpecialTimeline,
  "special-check-inbox": SpecialCheckInbox,
  "special-editor": SpecialEditor,
  "special-founder-story": SpecialFounderStory,
  "special-course-transcript": SpecialCourseTranscript,
  "special-youre-in": SpecialYoureIn,
};

export default function SpecialTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<SpecialVariant>("special-network-map");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <SpecialTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
