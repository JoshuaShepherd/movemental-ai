"use client";

import { useState } from "react";
import { AboutVideoBio, CtaBoldBanner, OrgsEnterpriseTrust, MiscTemplateSwitcher } from "@/components/layouts/movement-leader";
import type { MiscVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<MiscVariant, React.ComponentType> = {
  "about-video-bio": AboutVideoBio,
  "cta-bold-banner": CtaBoldBanner,
  "orgs-enterprise-trust": OrgsEnterpriseTrust,
};

export default function MiscTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<MiscVariant>("about-video-bio");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <MiscTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
