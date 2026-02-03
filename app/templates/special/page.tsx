"use client";

import { useState , useEffect } from "react";
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
import { useTemplateVariant } from "@/app/templates/template-variant-context";

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

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <SpecialTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </>
  );
}
