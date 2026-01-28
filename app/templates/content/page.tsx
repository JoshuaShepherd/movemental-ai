"use client";

import { useState } from "react";
import {
  ContentAccordionFeatures,
  ContentCaseStudies,
  ContentResourceCards,
  ContentCategoryBlog,
  ContentIntegrationGuides,
  ContentComponentGallery,
  ContentDarkBrowse,
  ContentDarkPersonalized,
  ContentDarkRecordings,
  ContentFeaturePreview,
  ContentVideoTutorials,
  ContentTocIllustrated,
  ContentTemplateShowcase,
  ContentResourceHub,
  ContentDocsGrid,
  ContentTrainingResources,
  ContentProductCarousel,
  ContentInstructorCourses,
  ContentFilteredGallery,
  ContentLessonList,
  ContentTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { ContentVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<ContentVariant, React.ComponentType> = {
  "cnt-accordion-features": ContentAccordionFeatures,
  "cnt-case-studies": ContentCaseStudies,
  "cnt-resource-cards": ContentResourceCards,
  "cnt-category-blog": ContentCategoryBlog,
  "cnt-integration-guides": ContentIntegrationGuides,
  "cnt-component-gallery": ContentComponentGallery,
  "cnt-dark-browse": ContentDarkBrowse,
  "cnt-dark-personalized": ContentDarkPersonalized,
  "cnt-dark-recordings": ContentDarkRecordings,
  "cnt-feature-preview": ContentFeaturePreview,
  "cnt-video-tutorials": ContentVideoTutorials,
  "cnt-toc-illustrated": ContentTocIllustrated,
  "cnt-template-showcase": ContentTemplateShowcase,
  "cnt-resource-hub": ContentResourceHub,
  "cnt-docs-grid": ContentDocsGrid,
  "cnt-training-resources": ContentTrainingResources,
  "cnt-product-carousel": ContentProductCarousel,
  "cnt-instructor-courses": ContentInstructorCourses,
  "cnt-filtered-gallery": ContentFilteredGallery,
  "cnt-lesson-list": ContentLessonList,
};

export default function ContentTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<ContentVariant>("cnt-case-studies");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <ContentTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
