"use client";

import { useState } from "react";
import {
  HeroColorfulHeadline,
  HeroAgencyGradient,
  HeroCenteredProduct,
  HeroCenteredSerif,
  HeroChatWidget,
  HeroCircularFeature,
  HeroCleanMinimal,
  HeroCleanMinimalAlt,
  HeroDarkFeatures,
  HeroFloatingCard,
  HeroFullBleed,
  HeroGradientIllustration,
  HeroHowItWorks,
  HeroImageGrid,
  HeroPricingCard,
  HeroProductShowcase,
  HeroProductShowcaseAlt,
  HeroSplitTabs,
  HeroTemplatePreview,
  TemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { HeroVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<HeroVariant, React.ComponentType> = {
  "colorful-headline": HeroColorfulHeadline,
  "agency-gradient": HeroAgencyGradient,
  "centered-product": HeroCenteredProduct,
  "centered-serif": HeroCenteredSerif,
  "chat-widget": HeroChatWidget,
  "circular-feature": HeroCircularFeature,
  "clean-minimal": HeroCleanMinimal,
  "clean-minimal-alt": HeroCleanMinimalAlt,
  "dark-features": HeroDarkFeatures,
  "floating-card": HeroFloatingCard,
  "full-bleed": HeroFullBleed,
  "gradient-illustration": HeroGradientIllustration,
  "how-it-works": HeroHowItWorks,
  "image-grid": HeroImageGrid,
  "pricing-card": HeroPricingCard,
  "product-showcase": HeroProductShowcase,
  "product-showcase-alt": HeroProductShowcaseAlt,
  "split-tabs": HeroSplitTabs,
  "template-preview": HeroTemplatePreview,
};

export default function TemplatesHomePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<HeroVariant>("colorful-headline");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      {/* Sticky template switcher — below nav (top-14 = nav height) */}
      <div className="sticky top-14 z-40 bg-background border-b">
        <TemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>

      {/* Active hero template */}
      <ActiveComponent />
    </div>
  );
}
