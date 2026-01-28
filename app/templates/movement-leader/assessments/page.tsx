"use client";

import { useState } from "react";
import {
  AssessmentsTemplatePicker,
  AssessmentsProgressQuiz,
  AssessmentsMoodGradient,
  AssessmentsBinaryChoice,
  AssessmentsDarkIntro,
  AssessmentsModalQuiz,
  AssessmentsScaleOptions,
  AssessmentsNpsScale,
  AssessmentsSectionIntro,
  AssessmentsUdemyQuiz,
  AssessmentsVisualCards,
  AssessmentsAvatarSurvey,
  AssessmentsDarkFloating,
  AssessmentsHubspotDuplicate,
  AssessmentsLongForm,
  AssessmentsTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { AssessmentVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<AssessmentVariant, React.ComponentType> = {
  "assess-template-picker": AssessmentsTemplatePicker,
  "assess-progress-quiz": AssessmentsProgressQuiz,
  "assess-mood-gradient": AssessmentsMoodGradient,
  "assess-binary-choice": AssessmentsBinaryChoice,
  "assess-dark-intro": AssessmentsDarkIntro,
  "assess-modal-quiz": AssessmentsModalQuiz,
  "assess-scale-options": AssessmentsScaleOptions,
  "assess-nps-scale": AssessmentsNpsScale,
  "assess-section-intro": AssessmentsSectionIntro,
  "assess-udemy-quiz": AssessmentsUdemyQuiz,
  "assess-visual-cards": AssessmentsVisualCards,
  "assess-avatar-survey": AssessmentsAvatarSurvey,
  "assess-dark-floating": AssessmentsDarkFloating,
  "assess-hubspot-duplicate": AssessmentsHubspotDuplicate,
  "assess-long-form": AssessmentsLongForm,
};

export default function AssessmentsTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<AssessmentVariant>("assess-template-picker");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <AssessmentsTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
