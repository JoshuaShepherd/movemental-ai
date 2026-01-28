"use client";

import { useState } from "react";
import { FaqDarkHero, FaqMinimalAccordion, FaqTemplateSwitcher } from "@/components/layouts/movement-leader";
import type { FaqVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<FaqVariant, React.ComponentType> = {
  "faq-dark-hero": FaqDarkHero,
  "faq-minimal-accordion": FaqMinimalAccordion,
};

export default function FaqTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<FaqVariant>("faq-dark-hero");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <FaqTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
