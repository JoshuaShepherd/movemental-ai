"use client";

import { useState , useEffect } from "react";
import {
  CtaBoldBanner,
  CtaGradientSplit,
  CtaMinimalCentered,
  CtaDarkFullWidth,
  CtaSocialProof,
  OrgsEnterpriseTrust,
  OrgsLogoGrid,
  OrgsCaseStudyCards,
  OrgsFeatureComparison,
  OrgsContactSales,
  MiscTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { MiscVariant } from "@/components/layouts/movement-leader";
import { useTemplateVariant } from "@/app/templates/template-variant-context";

const templateComponents: Record<MiscVariant, React.ComponentType> = {
  "cta-bold-banner": CtaBoldBanner,
  "cta-gradient-split": CtaGradientSplit,
  "cta-minimal-centered": CtaMinimalCentered,
  "cta-dark-full-width": CtaDarkFullWidth,
  "cta-social-proof": CtaSocialProof,
  "orgs-enterprise-trust": OrgsEnterpriseTrust,
  "orgs-logo-grid": OrgsLogoGrid,
  "orgs-case-study-cards": OrgsCaseStudyCards,
  "orgs-feature-comparison": OrgsFeatureComparison,
  "orgs-contact-sales": OrgsContactSales,
};

export default function MiscTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<MiscVariant>("cta-bold-banner");
  const ActiveComponent = templateComponents[activeTemplate];

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <MiscTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </>
  );
}
