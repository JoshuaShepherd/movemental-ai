"use client";

import { useState , useEffect } from "react";
import {
  PricingComparisonTable,
  PricingTeamCalculator,
  PricingTierCards,
  PricingPartnerSteps,
  PricingBusinessTiers,
  PricingMembershipGrid,
  PricingTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { PricingVariant } from "@/components/layouts/movement-leader";
import { useTemplateVariant } from "@/app/templates/template-variant-context";

const templateComponents: Record<PricingVariant, React.ComponentType> = {
  "pricing-comparison-table": PricingComparisonTable,
  "pricing-team-calculator": PricingTeamCalculator,
  "pricing-tier-cards": PricingTierCards,
  "pricing-partner-steps": PricingPartnerSteps,
  "pricing-business-tiers": PricingBusinessTiers,
  "pricing-membership-grid": PricingMembershipGrid,
};

export default function PricingTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<PricingVariant>("pricing-tier-cards");
  const ActiveComponent = templateComponents[activeTemplate];

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <PricingTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </>
  );
}
