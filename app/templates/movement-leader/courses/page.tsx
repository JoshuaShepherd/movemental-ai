"use client";

import { useState } from "react";
import {
  CoursesVideoPlayer,
  CoursesChapterBuilder,
  CoursesLessonSidebar,
  CoursesDarkPlayer,
  CoursesBootcampHero,
  CoursesGridCatalog,
  CoursesCertificate,
  CoursesQuizProgress,
  CoursesMasterclassDark,
  CoursesLearningPaths,
  CoursesTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { CoursesVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<CoursesVariant, React.ComponentType> = {
  "courses-video-player": CoursesVideoPlayer,
  "courses-chapter-builder": CoursesChapterBuilder,
  "courses-lesson-sidebar": CoursesLessonSidebar,
  "courses-dark-player": CoursesDarkPlayer,
  "courses-bootcamp-hero": CoursesBootcampHero,
  "courses-grid-catalog": CoursesGridCatalog,
  "courses-certificate": CoursesCertificate,
  "courses-quiz-progress": CoursesQuizProgress,
  "courses-masterclass-dark": CoursesMasterclassDark,
  "courses-learning-paths": CoursesLearningPaths,
};

export default function CoursesTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<CoursesVariant>("courses-video-player");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <CoursesTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
