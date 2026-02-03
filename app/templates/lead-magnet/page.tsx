"use client";

import { useState , useEffect } from "react";
import {
  LeadMagnetSplitForm,
  LeadMagnetBookPreview,
  LeadMagnetGuideSimple,
  LeadMagnetDarkResources,
  LeadMagnetShareInvite,
  LeadMagnetEbookPreview,
  LeadMagnetChecklist,
  LeadMagnetWebinar,
  LeadMagnetToolkit,
  LeadMagnetDarkMinimal,
  LeadMagnetTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { LeadMagnetVariant } from "@/components/layouts/movement-leader";
import { useTemplateVariant } from "@/app/templates/template-variant-context";

const templateComponents: Record<LeadMagnetVariant, React.ComponentType> = {
  "lead-magnet-split-form": LeadMagnetSplitForm,
  "lead-magnet-book-preview": LeadMagnetBookPreview,
  "lead-magnet-guide-simple": LeadMagnetGuideSimple,
  "lead-magnet-dark-resources": LeadMagnetDarkResources,
  "lead-magnet-share-invite": LeadMagnetShareInvite,
  "lead-magnet-ebook-preview": LeadMagnetEbookPreview,
  "lead-magnet-checklist": LeadMagnetChecklist,
  "lead-magnet-webinar": LeadMagnetWebinar,
  "lead-magnet-toolkit": LeadMagnetToolkit,
  "lead-magnet-dark-minimal": LeadMagnetDarkMinimal,
};

export default function LeadMagnetTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<LeadMagnetVariant>("lead-magnet-split-form");
  const ActiveComponent = templateComponents[activeTemplate];

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <LeadMagnetTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </>
  );
}
