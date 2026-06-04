"use client";

import { useState , useEffect } from "react";
import {
  ArticlesHelpCenter,
  ArticlesCaseStudy,
  ArticlesGuideHero,
  ArticlesDarkCaseStudy,
  ArticlesBoldHeader,
  ArticlesColorfulSidebar,
  ArticlesBoldEditorial,
  ArticlesCleanLongform,
  ArticlesFaqAccordion,
  ArticlesStatsHighlight,
  ArticlesDocsSidebar,
  ArticlesBlockquoteEditorial,
  ArticlesTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { ArticlesVariant } from "@/components/layouts/movement-leader";
import { useTemplateVariant } from "@/app/templates/template-variant-context";

const templateComponents: Record<ArticlesVariant, React.ComponentType> = {
  "art-help-center": ArticlesHelpCenter,
  "art-case-study": ArticlesCaseStudy,
  "art-guide-hero": ArticlesGuideHero,
  "art-dark-case-study": ArticlesDarkCaseStudy,
  "art-bold-header": ArticlesBoldHeader,
  "art-colorful-sidebar": ArticlesColorfulSidebar,
  "art-bold-editorial": ArticlesBoldEditorial,
  "art-clean-longform": ArticlesCleanLongform,
  "art-faq-accordion": ArticlesFaqAccordion,
  "art-stats-highlight": ArticlesStatsHighlight,
  "art-docs-sidebar": ArticlesDocsSidebar,
  "art-blockquote-editorial": ArticlesBlockquoteEditorial,
};

export default function ArticlesTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<ArticlesVariant>("art-clean-longform");
  const ActiveComponent = templateComponents[activeTemplate];

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <ArticlesTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </>
  );
}
